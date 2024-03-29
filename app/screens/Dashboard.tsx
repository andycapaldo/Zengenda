import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB, getAuth } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { Category } from "../components/CategorySelector";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  useFonts,
  Quicksand_400Regular
} from "@expo-google-fonts/quicksand";
import * as SplashScreen from 'expo-splash-screen';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import isEqual from 'lodash/isEqual';


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface Task {
  id: string;
  taskName: string;
  dueDate: string;
  category: string; // stores a reference to the category object, not the object itself
  categoryName?: string;
  categoryColor?: string;
  highPriority: boolean;
  isCompleted: boolean;
}

enum ViewType {
  Today,
  Categories,
}

const Dashboard = ({ navigation }: RouterProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeView, setActiveView] = useState(ViewType.Today);
  const [tasksDueToday, setTasksDueToday] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [segmentTitles, setSegmentTitles] = useState(['All']);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const showTodayView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveView(ViewType.Today);
  };

  const showCategoriesView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveView(ViewType.Categories);
  };

  const [fontsLoaded] = useFonts({
    Quicksand_400Regular
  });

  const extractCategoryId = (categoryPath) => categoryPath["_key"]["path"]["segments"][6];

  const assignCategoriesToTasks = (tasks, categories) => {
    return tasks.map(task => {
      const categoryId = extractCategoryId(task.category);
      const category = categories.find(cat => cat.id === categoryId);
      return {
        ...task,
        categoryName: category ? category.name : 'No Category',
        categoryColor: category ? category.color : '#111111'
      };
    });
  };

  useEffect(() => {
    // Fetches user categories if they exist
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(FIRESTORE_DB, "categories"),
      where("userId", "==", user.uid)
    );

    const unsubscribeCategories = onSnapshot(q, (querySnapshot) => {
      const categoryData: Category[] = querySnapshot.docs.map(
        (doc) => doc.data() as Category
      );
      setCategories(categoryData);

      const titles = ['All', ...categoryData.map(category => category.name)];
      setSegmentTitles(titles);
    });

    return () => unsubscribeCategories();
  }, []);


  useEffect(() => {
    // Fetches user tasks that have not been completed
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(FIRESTORE_DB, "tasks"),
      where("userId", "==", user.uid),
      where("isCompleted", "==", false)
    );

    const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
      const taskData: Task[] = querySnapshot.docs.map(
        (doc) => doc.data() as Task
      );
      const updatedTasks = assignCategoriesToTasks(taskData, categories);
      setTasks(updatedTasks);
    });

    return () => unsubscribeTasks();
  }, [categories]);

  const handleCheckboxChange = async (
    taskId: string,
    currentValue: boolean
  ) => {
    try {
      const taskRef = doc(FIRESTORE_DB, "tasks", taskId);
      await updateDoc(taskRef, {
        isCompleted: !currentValue,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    async function getTasksDueToday(tasks) {
      const date = new Date().toISOString().slice(0, 10);
      let count = 0;
      for (let i = 0; i < tasks.length; i++){
        if (tasks[i]['dueDate'] === date) {
          count++;
        }
      }
      setTasksDueToday(count);
    }
    if (tasks.length > 0) {
      getTasksDueToday(tasks);
    } else {
      setTasksDueToday(0)
    }
  }, [tasks])

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  })

  const date = new Date().toLocaleDateString();


  useEffect(() => {
    if (categoryFilter === 0) {
      setFilteredTasks(tasks);
    } else {
      const selectedCategoryName = segmentTitles[categoryFilter].split(' [')[0];
      const filtered = tasks.filter(task => task.categoryName === selectedCategoryName)
      setFilteredTasks(filtered);
    }
  }, [categoryFilter, tasks, segmentTitles]);

  const countTasksByCategory = (tasks, categories) => {
    const count = categories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, {});

    tasks.forEach((task) => {
      if (count.hasOwnProperty(task.categoryName)) {
        count[task.categoryName] += 1;
      }
    });

    return count;
  }

  useEffect(() => {
    const taskCounts = countTasksByCategory(tasks, categories);
    const newSegmentTitles = [`All [${tasks.length}]`, ...categories.map(category => {const count = taskCounts[category.name] || 0;
    return `${category.name} [${count}]`})];

    if (!isEqual(segmentTitles, newSegmentTitles)) {
      setSegmentTitles(newSegmentTitles)
    }

  }, [tasks, categories]);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  
  return (
    <>
      <ScrollView style={styles.component}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Image
              style={styles.headerIcons}
              source={require("../components/images2/calendar.png")}
            />
          </TouchableOpacity>
            <Text style={styles.date}>{date}</Text>
          <Image
            style={styles.headerIcons}
            source={require("../components/images2/gear.png")}
          />
        </View>
        <View style={styles.dashboardView}>
          <Text style={styles.headerText}>Today is your day, Steve! ☀️</Text>
        </View>
        <View style={styles.todayCategoryToggle}>
          <TouchableOpacity
            style={[
              styles.mainButton,
              activeView === ViewType.Today
                ? styles.activeViewButton
                : styles.inactiveViewButton,
            ]}
            onPress={showTodayView}
          >
            <View style={styles.todayDashboard}>
                <Image style={styles.dashboardIcon} source={require('../components/images2/tasklist.png')} />
                {tasksDueToday > 1 ? (
                <Text style={styles.todayDashboardText}>You've got {tasksDueToday} tasks due today</Text>)
              : (<Text style={styles.todayDashboardText}>You've got {tasksDueToday} task due today</Text>)}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sideButton,
              activeView === ViewType.Categories
                ? styles.activeViewButton
                : styles.inactiveViewButton,
            ]}
            onPress={showCategoriesView}
          >
            <Text style={styles.taskButtonText}>Categories</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dashboardButtons}>
          <View style={styles.inboxFlaggedSomeday}>
            <Pressable>
              <Image
                style={styles.icons}
                source={require("../components/images2/inbox.png")}
              />
              <Text style={styles.mainButtonText}>Inbox</Text>
            </Pressable>
          </View>
          <View style={styles.inboxFlaggedSomeday}>
            <Pressable>
              <Image
                style={styles.icons}
                source={require("../components/images2/flag.png")}
              />
              <Text style={styles.mainButtonText}>Flagged</Text>
            </Pressable>
          </View>
          <View style={styles.inboxFlaggedSomeday}>
            <Pressable>
              <Image
                style={styles.icons}
                source={require("../components/images2/thought_bubble.png")}
              />
              <Text style={styles.mainButtonText}>Someday</Text>
            </Pressable>
          </View>
        </View>
        {activeView === ViewType.Today ? (
          <View>
            <Text style={styles.today}>Today</Text>
            <View style={styles.categoryList}>
              <SegmentedControlTab
              values={segmentTitles}
              selectedIndex={categoryFilter}
              onTabPress={setCategoryFilter}
              tabStyle={{ borderColor: '#FEFEFE'}}
              tabTextStyle={{ color: '#111111', fontFamily: 'Quicksand_400Regular'}}
              activeTabStyle={{ backgroundColor: '#111111' }}
              activeTabTextStyle={{ color: '#FEFEFE' }}/>
            </View>
            {tasks.length > 0 ? (
              filteredTasks.map((task) => (
                <View
                  key={task.id}
                  style={[
                    styles.taskCard,
                    { backgroundColor: task.categoryColor },
                  ]}
                >
                  <View style={styles.taskCategoryNameContainer}>
                    <Text style={styles.taskCategoryName}>
                      {task.categoryName}
                    </Text>
                  </View>
                  <View style={styles.taskNameCheckbox}>
                    <Checkbox
                      style={styles.checkBox}
                      value={task.isCompleted}
                      onValueChange={() =>
                        handleCheckboxChange(task.id, task.isCompleted)
                      }
                    />
                    <Text style={styles.taskName}>{task.taskName}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No Tasks Today</Text>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.today}>Categories</Text>
            <View style={styles.categoryList}>
            <SegmentedControlTab
              values={segmentTitles}
              selectedIndex={categoryFilter}
              onTabPress={setCategoryFilter}
              tabStyle={{ borderColor: '#FEFEFE'}}
              tabTextStyle={{ color: '#111111', fontFamily: 'Quicksand_400Regular'}}
              activeTabStyle={{ backgroundColor: '#111111' }}
              activeTabTextStyle={{ color: '#FEFEFE' }}/>
            </View>
            {categories.length > 0 ? (
              <View>
                {categories.map((category) => (
                  <View
                    key={category.id} style={[
                      styles.taskCard,
                      { backgroundColor: category.color },
                    ]}
                  >
                    <Text
                      style={styles.taskName}
                      key={category.id}
                    >{`${category.name}`}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.smallText}>No categories</Text>
            )}
          </View>
        )}
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("Add Task")}>
            <Image
              style={styles.addTask}
              source={require("../components/images2/plus_button.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  component: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  dashboardView: {
    padding: 10,
  },
  dashboardButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  dashboardIcon: {
    flex: 1,
    height: 30,
    width: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    height: 35,
    width: 35,
  },
  date: {
    fontSize: 40,
    fontFamily: 'Quicksand_400Regular',
  },
  todayDashboard: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  categoryList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: 'Quicksand_400Regular',
  },
  icons: {
    height: 20,
    width: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#111111",
    fontFamily: 'Quicksand_400Regular',
  },
  mainButton: {
    backgroundColor: "#E9D4D4",
    borderColor: "#983F8F",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 100,
    width: "100%",
    height: 115,
  },
  sideButton: {
    backgroundColor: "#FBEECC",
    borderColor: "#FDB814",
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 100,
    width: "100%",
    height: 115,
  },
  activeViewButton: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "90%",
    flex: 1,
  },
  today: {
    fontSize: 30,
    fontFamily: 'Quicksand_400Regular',
  },
  inactiveViewButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "10%",
    zIndex: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  taskButtonText: {
    color: "#111111",
    fontSize: 20,
    fontFamily: 'Quicksand_400Regular',
  },
  mainButtonText: {
    fontFamily: 'Quicksand_400Regular',
  },
  todayCategoryToggle: {
    flexDirection: "row",
    width: "100%",
    height: 115,
    position: "relative",
  },
  todayDashboardText: {
    flex: 5,
    fontFamily: 'Quicksand_400Regular',
  },
  inboxFlaggedSomeday: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    height: 100,
    shadowColor: "black",
    marginTop: 20,
  },
  taskCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FEFEFE",
    marginBottom: 4,
    fontFamily: 'Quicksand_400Regular',
  },
  taskCategoryNameContainer: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  smallText: {
    fontFamily: 'Quicksand_400Regular',
  },
  taskCategoryName: {
    textAlign: "right",
    color: "#FEFEFE",
    fontFamily: 'Quicksand_400Regular',
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
    fontFamily: 'Quicksand_400Regular',
  },
  taskNameCheckbox: {
    display: "flex",
    flexDirection: "row",
    fontFamily: 'Quicksand_400Regular',
  },
  checkBox: {
    borderRadius: 20,
    borderColor: "#FEFEFE",
    marginRight: 20,
  },
  addTask: {
    height: 85,
    width: 85,
    position: "absolute",
    bottom: 1,
    right: 1,
  },
  container: {
    paddingTop: 100,
  },
});
