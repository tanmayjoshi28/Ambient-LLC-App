import React, {useState,useCallback,useEffect } from 'react';
import { StyleSheet, Text, View,FlatList,Button, ActivityIndicator } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as taskActions from '../store/actions/tasks';

const AllTasksScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState();
    const [refreshing,setRefreshing] = useState(false);
    const allTask = useSelector(state=>state.tasks.allTasks)
    const dispatch = useDispatch();

    const loadTasks = useCallback(async ()=>{
        setError(null);
        setRefreshing(true);
        try{
            await dispatch(taskActions.fetchTasks());
        }catch(err){
            setError(err.message);
        }
        setRefreshing(false);
    },[dispatch,setRefreshing,setError]);

    useEffect(()=>{
        setIsLoading(true);
        loadTasks().then(()=>{
            setIsLoading(false);
        });
    }, [dispatch, loadTasks]);

    if (isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size='large' color={"#398BD9"} />
            </View>
        );
    }
    if (error){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>An error occured</Text>
                <Button title="Try Again" onPress={loadTasks} />
            </View>
        );
    }
    if (!isLoading && allTask.length === 0){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>No Tasks Active</Text>
            </View>
        );
    }
    

    return(
        <View style = {styles.screen}>
            <FlatList data={allTask} keyExtractor={item => item.taskId}
                onRefresh={loadTasks}
                refreshing={refreshing}
                renderItem={itemdData =>
                <View style={styles.card}> 
                    <Text>{itemdData.item.heading}</Text>
                    <Button title="View Detail" onPress={() => {props.navigation.navigate('TaskDetail', {taskId : itemdData.item.taskId})}} />
                </View>}
            />        
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card:{
        paddingTop:'2%'
    }
  });

  AllTasksScreen.navigationOption ={
      headerTitle:"All Tasks"
  }
  
  export default AllTasksScreen;