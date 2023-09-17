import React from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';
import TodoListMain from './src/screens/TodoListMain';

const App: React.FC = () => {
  LogBox.ignoreAllLogs();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2A5C99'}}>
      <StatusBar barStyle={'light-content'} />
      <TodoListMain />
    </SafeAreaView>
  );
};



export default App;
