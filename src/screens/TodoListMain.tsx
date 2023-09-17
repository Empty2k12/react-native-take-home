import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../components/Header';
import ResponsiveText from '../components/ResponsiveText';
import TodoCard from '../components/TodoCard';
import APIHandler from '../helpers/ApiHandler';
import { Colors } from '../helpers/Theme';
import { typography } from '../helpers/Typograpgy';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
}

const TodoListMain: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<Todo[]>([]);
  const [inCompleteTaskList, setInCompleteTaskList] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('All');
  const [userList, setUserList] = useState<User[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(
    false
  );

  const fetchTodosList = async () => {
    try {
      const res = await APIHandler('get', 'todos');
      setTodoList(res);
      const completeTasks = res.filter((i: { completed: boolean; }) => i.completed === true);
      const inCompleteTasks = res.filter((i: { completed: boolean; }) => i.completed === false);
      setCompletedTaskList(completeTasks);
      setInCompleteTaskList(inCompleteTasks);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await APIHandler('get', 'users');
      setUserList(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodosList();
    fetchUsers();
  }, []);

  const applyFilter = () => {
    if (selectedOption === 'All') {
      return todoList;
    } else if (selectedOption === 'Completed') {
      return completedTaskList;
    } else if (selectedOption === 'Incompleted') {
      return inCompleteTaskList;
    }
    return todoList; // Default to show all if none of the above matches
  };

  const getUserName = (userId: number) => {
    const user = userList.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <View style={styles.container}>
      <Modal
        onBackdropPress={() => setIsFilterModalVisible(false)}
        isVisible={isFilterModalVisible}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              setSelectedOption('Completed');
              setIsFilterModalVisible(false);
            }}
            style={styles.modalOption}>
            <ResponsiveText
              text={'Completed Tasks'}
              style={styles.modalOptionText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedOption('Incompleted');
              setIsFilterModalVisible(false);
            }}
            style={styles.modalOption}>
            <ResponsiveText
              text={'Incompleted Tasks'}
              style={styles.modalOptionText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedOption('All');
              setIsFilterModalVisible(false);
            }}
            style={styles.modalOption}>
            <ResponsiveText text={'Cancel'} style={styles.modalOptionText} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Header
        title={'To-do List'}
        filterStatus={selectedOption}
        filterOnPress={() => setIsFilterModalVisible(true)}
      />
      <View style={styles.listContainer}>
        <View style={{ height: hp(3) }}></View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          nestedScrollEnabled
          data={applyFilter()}
          renderItem={({ item }) => {
            return (
              <TodoCard todoListData={item} userName={getUserName(item.userId)} />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.header_color,
  },

  modalContainer: {
    flexDirection: 'row',
    height: hp(100),
    alignItems: 'center',
    alignContent: 'center',
  },
  modalContent: {
    height: hp(20),
    width: wp(100),
    borderRadius: wp(4),
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  modalOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: wp(0.15),
  },
  modalOptionText: {
    fontSize: typography.size_normal,
    fontWeight: '500',
  },
  listContainer: {
    borderTopRightRadius: wp(7),
    backgroundColor: 'white',
    borderTopLeftRadius: wp(7),
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: wp(7),
    backgroundColor: 'white',
    borderTopLeftRadius: wp(7),
    paddingBottom: wp(32),
  },
});

export default TodoListMain;
