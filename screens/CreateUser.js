import React, { useCallback, useState, useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { or } from 'react-native-reanimated';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';


const SignUpScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email,setEmail] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [username,setUsername] = useState('');
    const dispatch = useDispatch();

    const formSubmitHandler = async () =>{
        console.log(email,password1);
        setError(null);
        setIsLoading(true);
        if (username===''){
            setError('Enter Username');
            setIsLoading(false);
            return;
        }
        if (password1 != password2){
            setError("Password Do not Match");
            setIsLoading(false);
            return;
        }
        if (password1 ==='' || password2 ===''){
            setError("Enter valid Password");
            setIsLoading(false);
            return;
        }
        try{
            await dispatch(authActions.signup(email, password1, username));
            setIsLoading(false);
            props.navigation.navigate('AllTasks');
        } catch(err){
            setError(err.message);
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        if (error){
            Alert.alert('An Error Occured',error, [{text :'Okay'}])
        }
    },[error])

        return(
        <ScrollView >
            <View style={styles.container}> 
            <Text style={styles.greeting}> 
                    {'Ambient LLC'}
            </Text>
            <View style={styles.form}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    keyboardType='email-address'
                    errorMessage="Please Enter Valid Email"
                    onChangeText={text =>setEmail(text)}
                    ></TextInput>
            </View>
            <View style={styles.form}>
                    <Text style={styles.inputTitle}>Username</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={text =>setUsername(text)}
                    ></TextInput>
            </View>

            <View style={styles.form}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    keyboardType='default'
                    errorMessage="Please Enter Valid Password"
                    onChangeText={text=> setPassword1(text)}
                    ></TextInput>
            </View>
            
            <View style={styles.form}>
                    <Text style={styles.inputTitle}>Re-Enter Password</Text>
                    <TextInput
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    keyboardType='default'
                    errorMessage="Please Enter Valid Password"
                    onChangeText={text=> setPassword2(text)}
                    ></TextInput>
            </View>
            {isLoading ? (
            <ActivityIndicator style={styles.button} style size='small' />
            ) : (
            <TouchableOpacity style={styles.button} onPress={() => formSubmitHandler()}>
                <Text> Create User </Text>
            </TouchableOpacity>)}

            </View>
        </ScrollView>
        )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#003f5c',
        alignItems:"center"
    },
    greeting:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:'15%'
    },
    errorMessage:{
        height: 72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal: 10
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize:18,
        textTransform:"uppercase"
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:2,
        borderBottomColor:'#ccc',
        borderBottomWidth:2
    },
    button:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        width:200,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    error:{
       color: "#E9446A",
        fontSize:13,
        textAlign:"center"
    }
});

export default SignUpScreen;