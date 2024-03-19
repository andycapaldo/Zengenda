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
import AddChoice from "../components/AddChoice";
import Checkbox from 'expo-checkbox';
import { Category } from "../components/CategorySelector";
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface Task {
  id: string;
  taskName: string;
  dueDate: string;
  category: Category;
  highPriority: boolean;
  isCompleted: boolean;
}

enum ViewType {
  Today,
  Categories
}

const Dashboard = ({ navigation }: RouterProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeView, setActiveView] = useState(ViewType.Today);

  const showTodayView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setActiveView(ViewType.Today);
  };

  const showCategoriesView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setActiveView(ViewType.Categories);
  };

  useEffect(() => { // Fetches user tasks that have not been completed
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const q = query(collection(FIRESTORE_DB, 'tasks'), where('userId', '==', user.uid), where('isCompleted', '==', false));

    const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
      const taskData: Task[] = querySnapshot.docs.map(doc => doc.data() as Task);
      setTasks(taskData);
    });

    return () => unsubscribeTasks();
  }, []);

  useEffect(() => { // Fetches user categories if they exist
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const q = query(collection(FIRESTORE_DB, 'categories'), where('userId', '==', user.uid),);

    const unsubscribeCategories = onSnapshot(q, (querySnapshot) => {
      const categoryData: Category[] = querySnapshot.docs.map(doc => doc.data() as Category);
      setCategories(categoryData);
    });

    return () => unsubscribeCategories();
  }, []);

  const handleCheckboxChange = async (taskId: string, currentValue: boolean) => {
    try {
    const taskRef = doc(FIRESTORE_DB, 'tasks', taskId);
    await updateDoc(taskRef, {
      isCompleted: !currentValue
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

  function addTask() {
    navigation.navigate("Add Task");
    setModalIsVisible(false);
  }

  function startAddTask() {
    setModalIsVisible(true);
  }

  function cancelAddTask() {
    setModalIsVisible(false);
  }

  return (
    <>
    <ScrollView >
      <View style={styles.dashboardView}>
        <Text style={styles.headerText}>Today is your day, Steve! ☀️</Text>
      </View>
      <View style={styles.todayCategoryToggle}>
        <TouchableOpacity 
        style={[styles.mainButton, activeView === ViewType.Today ? styles.activeViewButton : styles.inactiveViewButton,]} onPress={showTodayView}>
          <Text style={styles.taskButtonText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sideButton, activeView === ViewType.Categories ? styles.activeViewButton : styles.inactiveViewButton,]} onPress={showCategoriesView}>
          <Text style={styles.taskButtonText}>Categories</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dashboardButtons}>
        <View style={styles.inboxFlaggedSomeday}>
          <Pressable>
              <Image style={styles.icons} source={require('../components/images2/inbox.png')} />
            <Text>Inbox</Text>
          </Pressable>
        </View>
        <View style={styles.inboxFlaggedSomeday}>
          <Pressable>
          <Image style={styles.icons} source={require('../components/images2/flag.png')} />
            <Text>Flagged</Text>
          </Pressable>
        </View>
        <View style={styles.inboxFlaggedSomeday}>
          <Pressable>
          <Image style={styles.icons} source={require('../components/images2/thought_bubble.png')} />
            <Text>Someday</Text>
          </Pressable>
        </View>
      </View>
      {activeView === ViewType.Today ? (
      <View> 
        <Text>Today</Text>
        <View style={styles.categoryList}>
          <Text>All[4]</Text>
          <Text>Home[1]</Text>
          <Text>School[2]</Text>
          <Text>Finances[1]</Text>
        </View>
        {tasks.length > 0 ? ( 
          tasks.map((task) => (
            <View key={task.id} style={[styles.taskCard, { backgroundColor: task.category.color }]}>
              <View style={styles.taskCategoryNameContainer}>
                <Text style={styles.taskCategoryName}>{task.category.name}</Text>
              </View>
              <View style={styles.taskNameCheckbox}>
                <Checkbox style={styles.checkBox} value={task.isCompleted} onValueChange={() => handleCheckboxChange(task.id, task.isCompleted)} />
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
          <View style={styles.categoryList}>
            <Text>All[4]</Text>
            <Text>Home[1]</Text>
            <Text>School[2]</Text>
            <Text>Finances[1]</Text>
          </View>
          {categories.length > 0 ? (
            <View>
              {categories.map((category) => (
                <View style={[styles.taskCard, { backgroundColor: category.color }]}>
                  <Text style={styles.taskName} key={category.id}>{`${category.name}`}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No categories</Text>
          )}
        </View>
        )}
      <View style={styles.container}>
        <Button onPress={startAddTask} title="Add Task" />
        <AddChoice
          visible={modalIsVisible}
          onAddTask={addTask}
          onCancel={cancelAddTask}
        />
        <Button
          onPress={() => navigation.navigate("details")}
          title="Open Details"
        />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      </View>
    </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboardView: {
    padding: 10,
  },
  dashboardButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  categoryList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    height: 20,
    width: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#111111",
  },
  mainButton: {
    backgroundColor: "#E9D4D4",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 100,
    width: "100%",
    height: 115,
  },
  sideButton: {
    backgroundColor: "#FBEECC",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 100,
    width: "100%",
    height: 115,
  },
  activeViewButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "90%",
  },
  inactiveViewButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '10%',
    zIndex: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  taskButtonText: {
    color: "#111111",
    fontSize: 20,
  },
  todayCategoryToggle: {
    flexDirection: "row",
    width: "100%",
    height: 115,
    position: 'relative',
    padding: 10,
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
    shadowColor: 'black',
    marginTop: 20,
  },
  taskCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FEFEFE',
    marginBottom: 4,
  },
  taskCategoryNameContainer: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  taskCategoryName: {
    textAlign: 'right',
    color: '#FEFEFE',
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888'
  },
  taskNameCheckbox : {
    display: 'flex',
    flexDirection: 'row',
  },
  checkBox: {
    borderRadius: 20,
    borderColor: '#FEFEFE',
    marginRight: 20,
  },
  container: {},
});
