import React, {useState,useCallback,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList , Button, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {useDispatch,useSelector} from 'react-redux';
import * as taskActions from '../store/actions/tasks';

const CreatedTaskScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState();
    const [refreshing,setRefreshing] = useState(false);

    const dispatch = useDispatch();
    const allTasks = useSelector(state=>state.tasks.allTasks);
    const userId = useSelector(state=>state.auth.userId);
    const createdByCurrent = allTasks.filter(task => task.owner==userId);

    const deletionHandler = useCallback((taskId)=>{
        console.log("submitting");
        console.log(taskId);
        dispatch(taskActions.deleteTask(taskId));
    });
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

    useEffect(()=> {},[deletionHandler]);

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
    if (!isLoading && createdByCurrent.length === 0){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>No Tasks Created</Text>
            </View>
        );
    }

    return(
        <View style = {styles.screen}>
            <FlatList data={createdByCurrent} keyExtractor={item => item.taskId}
                onRefresh={loadTasks}
                refreshing={refreshing}
                renderItem={itemdData =>
                <View style={styles.card}> 
                    <Text>{itemdData.item.heading}</Text>
                    <Button title="View Detail" onPress={() => {props.navigation.navigate('TaskDetail', {taskId : itemdData.item.taskId})}}  />
                    <Button title="Delete" onPress={() => deletionHandler(itemdData.item.taskId)} />
                </View>}
            />        
        </View>
    );
}

CreatedTaskScreen.navigationOptions = (navigationData) =>{
    return{
        HeaderTitle:"TASK CREATED",
        headerRight:()=>(
            <TouchableOpacity style={styles.icons} onPress={()=>{navigationData.navigation.navigate("AddTask")}}>
                <Icon name={'ios-add-circle-outline'} color="black" size={30}/>
            </TouchableOpacity>
            )
    }
};

const styles = StyleSheet.create({
    icons:{
        paddingRight:10
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      card:{
          paddingTop:'2%'
      }
});

export default CreatedTaskScreen;