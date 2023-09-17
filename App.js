import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import TodoListMain from './src/screens/TodoListMain';

const queryClient = new QueryClient();

const App = () => {
  LogBox.ignoreAllLogs();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#2A5C99'}}>
        <StatusBar barStyle={'light-content'} />
        <TodoListMain />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
