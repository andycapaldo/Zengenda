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
import '../'
import { Category } from "../components/CategorySelector";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

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
  const [activeView, setActiveView] = useState(ViewType.Today);

  const showTodayView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setActiveView(ViewType.Today);
  };

  const showCategoriesView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setActiveView(ViewType.Categories);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const q = query(collection(FIRESTORE_DB, 'tasks'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const taskData: Task[] = querySnapshot.docs.map(doc => doc.data() as Task);
      setTasks(taskData);
    });

    return () => unsubscribe();
  }, []);

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
              <Text style={styles.taskName}>{task.taskName}</Text>
            </View>
          ))
      ) : (
        <Text>No Tasks Today</Text>
      )}
      </View>
      <View>
        <Text>That's all for today. You go this!</Text>
      </View>
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
    backgroundColor: "pink",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 100,
    width: "100%",
    height: 115,
  },
  sideButton: {
    backgroundColor: "yellow",
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
    color: "black",
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
  container: {},
});
