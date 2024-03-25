import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import CategorySelector, { Category } from '../components/CategorySelector';
import DueDateSelector from '../components/DueDateSelector';
import Checkbox from 'expo-checkbox';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import { getAuth } from '../../FirebaseConfig';
import AddCategory from '../components/AddCategory';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  useFonts,
  Quicksand_400Regular
} from "@expo-google-fonts/quicksand";
import * as SplashScreen from 'expo-splash-screen';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export const styles = StyleSheet.create({
  totalView: {
    backgroundColor: '#FEFEFE',
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    fontSize: 25,
    fontFamily: 'Quicksand_400Regular',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
    fontFamily: 'Quicksand_400Regular',
  },
  taskNameContainer: {
    paddingLeft: 15,
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    fontFamily: 'Quicksand_400Regular',
  },
  nameInputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Quicksand_400Regular',
  },
  descriptionInputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FEFEFE',
  },
  descriptionInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#111111',
    fontFamily: 'Quicksand_400Regular',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
  },
  categoryButtonText: {
    fontFamily: 'Quicksand_400Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FEFEFE',
  },
  subTaskButton: {
    backgroundColor: '#E7E7E7', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subTaskButtonText: {
    color: '#111111', 
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Quicksand_400Regular',
  },
  subTaskInputContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  subTaskInput: {
    flex: 5,
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Quicksand_400Regular',
  },
  taskButton: {
    backgroundColor: '#111111',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 100,
  },
  taskButtonText: {
    color: '#E8E8E8',
    fontSize: 20,
    fontFamily: 'Quicksand_400Regular',
  },
  removeSubTaskButton: {
    flex: 1,
  },
  occurenceTabsView: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  occurenceTabs: {
    padding: 10,
  }
});

interface AddTaskProps {
  navigation: NavigationProp<any, any>;
}


const AddTask = ( {navigation}: AddTaskProps) => {

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dueDate, setDueDate] = useState(''); // Still need to create component for this
  const [occurence, setOccurence] = useState(0);
  const [isChecked, setChecked] = useState(false);
  const [subTaskPressed, setSubTaskPressed] = useState(false);
  const [subTask, setSubTask] = useState(['']);
  const [subTaskCounter, setSubTaskCounter] = useState(0);

  const addSubTask = () => {
    setSubTaskPressed(true)
    setSubTask([...subTask, ""]);
    setSubTaskCounter(subTaskCounter + 1)
  }

  const removeSubTask = (index) => {
    const newSubTask = [...subTask];
    newSubTask.splice(index, 1);
    setSubTask(newSubTask);
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSubTaskInputChange = (text, index) => {
    const newSubTask = [...subTask];
    newSubTask[index] = text;
    setSubTask(newSubTask);
  }

  const taskAdded = async () => {
    if (!taskName || !taskDescription || !selectedCategory) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const categoryRef = doc(FIRESTORE_DB, 'categories', selectedCategory.id);

      const taskRef = doc(collection(FIRESTORE_DB, 'tasks'));
      const taskId = taskRef.id;

      await setDoc(taskRef, {
        id: taskId,
        taskName: taskName,
        taskDescription: taskDescription,
        category: categoryRef,
        dueDate: dueDate,
        highPriority: isChecked,
        subTask: subTask,
        userId: user!.uid,
        isCompleted: false,
      });
      
      navigation.navigate('Dashboard');
      alert('task added!');
    } catch (error) {
      console.error('Error adding task: ', error);
    };
  };

  const [fontsLoaded] = useFonts({
    Quicksand_400Regular
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
  <>
  <KeyboardAwareScrollView>
  <ScrollView scrollToOverflowEnabled={true}>
    <View style={styles.totalView}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add Task</Text>
      </View>
      <View style={styles.taskNameContainer}>
        <Text style={styles.taskName}>Name</Text>
      </View>
      <View style={styles.nameInputContainer}>
        <TextInput 
        style={styles.nameInput} 
        placeholder='Add a task' 
        placeholderTextColor='#888' 
        value={taskName}
        onChangeText={setTaskName}/>
      </View>
      <View style={styles.taskNameContainer}>
        <Text style={styles.taskName}>Description</Text>
      </View>
      <View style={styles.descriptionInputContainer}>
        <TextInput 
        style={styles.descriptionInput}
        placeholder='Description...'
        placeholderTextColor='#888'
        multiline={true} 
        numberOfLines={4}
        value={taskDescription}
        onChangeText={setTaskDescription}/>
      </View>
      <View style={styles.taskNameContainer}>
        <Text style={styles.taskName}>Due Date</Text>
      </View>
        <DueDateSelector />
      <View style={styles.taskNameContainer}>
          <Text style={styles.taskName}>Occurence</Text>
      </View>
      <View style={styles.occurenceTabsView} >
        <SegmentedControlTab
        values={['Once', 'Daily', 'Weekly', 'Monthly']}
        selectedIndex={occurence}
        onTabPress={setOccurence}
        tabStyle={{backgroundColor: '#111111', borderColor: '#111111', }}
        tabTextStyle={{ color: '#FEFEFE', fontFamily: 'Quicksand_400Regular'}}
        activeTabStyle={{ backgroundColor: '#FEFEFE' }}
        activeTabTextStyle={{ color: '#111111' }}/>
      </View>
      <View style={styles.taskNameContainer}>
        <Text style={styles.taskName}>Category</Text>
      </View>
        <CategorySelector onCategorySelect={handleCategorySelect} ></CategorySelector>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.subTaskButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.categoryButtonText}>Add New Category</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.taskNameContainer}>
        <Text style={styles.taskName}>High Priority  <Checkbox value={isChecked} onValueChange={setChecked}/></Text> 
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.subTaskButton} onPress={addSubTask}>
        <Text style={styles.subTaskButtonText}>+ Add Subtask</Text>
      </TouchableOpacity>
      </View>
      {subTaskPressed &&
      <View style={styles.subTaskInputContainer}>
        {subTask.map((value, index) => (
          <View key={index}>
            <TextInput
              style={styles.subTaskInput}
              value={value}
              onChangeText={(text) => handleSubTaskInputChange(text, index)}
              placeholder={`Enter Subtask ${index + 1}`}
            />
              <TouchableOpacity 
                onPress={() => removeSubTask(index)}
                disabled={subTask.length === 0}
              >
                <Text style={styles.subTaskButtonText}>Remove subtask</Text>
              </TouchableOpacity>
          </View>
        ),
        )}
      </View> 
      }
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.taskButton} onPress={taskAdded}>
        <Text style={styles.taskButtonText}>Add Task</Text>
      </TouchableOpacity>
      </View>
      <AddCategory isVisible={isModalVisible} onClose={() => setModalVisible(false)}/>
    </View>
  </ScrollView>
  </KeyboardAwareScrollView>
  </>
  )
};

export default AddTask