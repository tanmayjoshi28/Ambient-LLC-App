import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator  } from 'react-native';
import {useDispatch,useSelector} from 'react-redux';

const UserConfirmScreen = props =>{

    const allUsers = useSelector(state => state.auth.allUsers);
    const userId = useSelector(state => state.auth.userId);
    const currentUser = allUsers.filter(user=>user.userId === userId);

    const userConfirmation = ()=>{
        const userdata = currentUser[0];
        console.log(userdata.adminStatus);
        
        if(userdata.adminStatus === true){
            props.navigation.navigate('admin');
        }
        if(userdata.adminStatus === false){
            props.navigation.navigate('task');
        }
        else{
            props.navigation.navigate('auth');
        }
    };

    useEffect(()=>{userConfirmation()});


    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Checking User Status ...</Text>
            <ActivityIndicator size='large' color={"#398BD9"} />
        </View>
    )
}

export default UserConfirmScreen;