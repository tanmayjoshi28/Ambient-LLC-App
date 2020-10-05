import React, {useState,useCallback,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList , Button, ActivityIndicator, TextInput} from 'react-native';

import {useDispatch,useSelector} from 'react-redux';
import * as taskActions from '../store/actions/tasks';

const AssignedTasksScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState();
    const [refreshing,setRefreshing] = useState(false);

    const [comment,setComment] = useState("");

    const dispatch = useDispatch();
    const allTasks = useSelector(state=>state.tasks.allTasks);
    const userId = useSelector(state=>state.auth.userId);
    const assignedToCurrent = allTasks.filter(task => task.userAssigned===userId);

    const statusSubmit = (status) =>{
        console.log(status);
        console.log(comment);
    }
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
    if (!isLoading && assignedToCurrent.length === 0){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>No Tasks Assigned</Text>
            </View>
        );
    }

    return(
        <View style = {styles.screen}>
            <FlatList data={assignedToCurrent} keyExtractor={item => item.taskId}
                onRefresh={loadTasks}
                refreshing={refreshing}
                renderItem={itemdData =>
                <View style={styles.card}> 
                    <Text>{itemdData.item.heading}</Text>
                    <View style = {styles.formControl}>
                        <Text style={styles.label}>Comment :-</Text>
                        <TextInput onChangeText={text => setComment(text)} style={styles.input} />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                            <Button onPress={()=>{statusSubmit(true)}} color="green" title="Accept"/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button onPress={()=>{statusSubmit(false)}} color="red" title="Reject"/>
                        </View>
                    </View>
                    <Button title="View Detail" onPress={() => {props.navigation.navigate('TaskDetail', {taskId : itemdData.item.taskId})}}  />
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
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
        flex: 1,
    },
    formControl:{
        width:'100%',
        marginVertical:8
    },
    label:{
        marginVertical: 8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:2,
        borderBottomColor:'#ccc',
        borderBottomWidth:2
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:'5%'
    },
    buttonContainer: {
        flex: 1,
        paddingVertical:'4%',
        color:'green'
    },
  });
  
  export default AssignedTasksScreen;