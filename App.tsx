import React from 'react';
import {LogBox, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import TodoListMain from './src/screens/TodoListMain';
import {Colors} from './src/helpers/Theme';

const App: React.FC = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      <TodoListMain />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.statusbar_color,
  },
});
export default App;
