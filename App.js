import React from 'react';
import ReduxThunk from 'redux-thunk';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import projectreducers from './store/reducers/project';
import authreducers from './store/reducers/auth';
import taskreducers from './store/reducers/tasks';
import TasksNavigator from './Navigation/navigator';

const rootReducer = combineReducers({
  tasks:taskreducers,
  auth:authreducers,
  project:projectreducers
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return(
     <Provider store={store}>
      <TasksNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
