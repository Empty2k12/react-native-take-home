import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  NativeModules,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../components/Header';
import ModalContent from '../components/ModalContent';
import TodoCard from '../components/TodoCard';
import APIHandler from '../helpers/ApiHandler';
import {Colors} from '../helpers/Theme';

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
  const {LocalNotificationManager} = NativeModules;
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<Todo[]>([]);
  const [inCompleteTaskList, setInCompleteTaskList] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('All');
  const [userList, setUserList] = useState<User[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const fetchTodosList = async () => {
    setIsLoading(true);
    try {
      const res = await APIHandler('get', 'todos');
      setTodoList(res);
      const completeTasks = res.filter(
        (i: {completed: boolean}) => i.completed === true,
      );
      const inCompleteTasks = res.filter(
        (i: {completed: boolean}) => i.completed === false,
      );
      setCompletedTaskList(completeTasks);
      setInCompleteTaskList(inCompleteTasks);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
    return todoList;
  };

  const getUserName = (userId: number) => {
    const user = userList.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTodosList();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (Platform.OS == 'ios') {
      const scheduleNotificationForTodo = (todo: Todo) => {
        LocalNotificationManager.scheduleNotification({
          title: 'Todo Reminder',
          body: todo.title,
          notificationId: todo.id.toString(),
        });
      };

      let initialDelay = 0.1 * 60 * 1000;

      todoList.forEach(todo => {
        setTimeout(() => {
          scheduleNotificationForTodo(todo);
        }, initialDelay);

        initialDelay += 1 * 60 * 1000;
      });
    }
    return () => {};
  }, [todoList]);

  return (
    <View style={styles.container}>
      <Header
        title={'To-do List'}
        filterStatus={selectedOption}
        filterOnPress={() => setIsFilterModalVisible(true)}
      />
      <View style={styles.listContainer}>
        <View style={{height: hp(3)}}></View>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.loader_color} />
        ) : (
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            nestedScrollEnabled
            data={applyFilter()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[Colors.loader_color]}
                tintColor={Colors.loader_color}
              />
            }
            renderItem={({item}) => {
              return (
                <TodoCard
                  todoListData={item}
                  userName={getUserName(item.userId)}
                />
              );
            }}
          />
        )}
      </View>
      <Modal
        onBackdropPress={() => setIsFilterModalVisible(false)}
        isVisible={isFilterModalVisible}
        style={styles.modalContainer}>
        <ModalContent
          completedOnpress={() => {
            setSelectedOption('Completed');
            setIsFilterModalVisible(false);
          }}
          inCompletedOnPress={() => {
            setSelectedOption('Incompleted');
            setIsFilterModalVisible(false);
          }}
          allTaskOnpress={() => {
            setSelectedOption('All');
            setIsFilterModalVisible(false);
          }}
        />
      </Modal>
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
    paddingBottom: wp(36),
  },
});

export default TodoListMain;
