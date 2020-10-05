import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import CreatedTaskScreen from '../screens/CreatedTasks';
import SignUpScreen from '../screens/CreateUser';
import LoginScreen from '../screens/LoginScreen';
import TaskDetailScreen from '../screens/TaskDetail.js';
import AddTaskScreen from '../screens/AddTask.js';
import AllTasksScreen from '../screens/AllTasks.js';
import AssignedTasksScreen from '../screens/AssignedTasks.js';
import UserConfirmScreen from '../screens/UserConfirmation';
import CreateObjectsScreen from '../screens/CreateObjects';
import CreateProjectIdScreen from '../screens/CreateProjectId';


const AllTaskNavigation = createStackNavigator({
    AllTasks:{
        screen:AllTasksScreen,
        navigationOptions:{
            headerTitle:"All Tasks"
        }
    },
    TaskDetail:{
        screen:TaskDetailScreen,
        navigationOptions:{
            headerTitle:"Task Details"
        }
    }
});

const AddTaskNavigation = createStackNavigator({
    CreatedTask:{
        screen:CreatedTaskScreen,
        navigationOptions:{
            headerTitle:"Tasks Created",
        }
    },
    AddTask:{
        screen:AddTaskScreen,
        navigationOptions:{
            headerTitle:"Add Task",
        }
    }
});

const AssignedTaskNavigation = createStackNavigator({
    AssignedTask:{
        screen:AssignedTasksScreen,
        navigationOptions:{
            headerTitle:"Tasks Assigned",
        }
    },
    AssignedDetail:{
        screen:TaskDetailScreen,
        navigationOptions:{
            headerTitle:"Details"
        }
    }
})

const TasksNavigatorBottom = createMaterialBottomTabNavigator({
    AllTasks:{
        screen:AllTaskNavigation,
        navigationOptions:{
            tabBarLabel:'All Tasks',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-apps' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:"#2F5F8D",
        }
    },
    CreateTask:{
        screen:AddTaskNavigation,
        navigationOptions:{
            tabBarLabel:'Add Task',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-add-circle' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:"#101820FF",
        }
    },
    AssignedTasks:{
        screen:AssignedTaskNavigation,
        navigationOptions:{
            tabBarLabel:'Assigned',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-clock' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:"#006B38FF",
        }
    }
},  {
    activeColor:"#FFFFFF",
    shifting:true,
});
const CreateObjectsNavigation = createStackNavigator({
    createObjects:{
        screen:CreateObjectsScreen,
        navigationOptions:{
            headerTitle:"Create",
        }
    },
    createUser:{
        screen:SignUpScreen,
        navigationOptions:{
            headerTitle:"Create User",
        }
    },
    createProject:{
        screen:CreateProjectIdScreen,
        navigationOptions:{
            headerTitle:"Create Project",
        }
    },
});

const AdminNavigation = createMaterialBottomTabNavigator({
    AllTasks:{
        screen:AllTaskNavigation,
        navigationOptions:{
            tabBarLabel:'All Tasks',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-apps' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:"#2F5F8D",
        }
    },
    CreateTask:{
        screen:AddTaskNavigation,
        navigationOptions:{
            tabBarLabel:'Add Task',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-add-circle' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:"#101820FF",
        }
    },
    CreateObjects:{
        screen:CreateObjectsNavigation,
        navigationOptions:{
            tabBarLabel:'Create',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='md-create' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:"#006B38FF",
        }
    },
},{
    activeColor:"#FFFFFF",
    shifting:true,
})


const MainNavigator = createSwitchNavigator({
    Auth:LoginScreen,
    task:TasksNavigatorBottom,
    admin:AdminNavigation,
    confirmation:UserConfirmScreen
})
export default createAppContainer(MainNavigator);