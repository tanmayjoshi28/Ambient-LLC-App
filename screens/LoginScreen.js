import React, {useState, useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert, Button} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';

const LoginScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();

    const formSubmitHandler = async () =>{
        console.log(email,password);
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(authActions.login(email, password));
            await dispatch(authActions.getusers())
            props.navigation.navigate('confirmation');

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
            <View style={styles.container}> 
                <Text style={styles.greeting}> 
                    {'Ambient LLC'}
                </Text>
            <View style={styles.errorMessage}>
                <Text style={styles.error}></Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    keyboardType='email-address'
                    errorMessage="Please Enter Valid Email"
                    onChangeText={text =>setEmail(text)}
                    ></TextInput>
                </View>
            </View>

            <View style={{marginTop:1}}>
                <View>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    keyboardType='default'
                    errorMessage="Please Enter Valid Password"
                    onChangeText={text=> setPassword(text)}
                    ></TextInput>
                </View>
            </View>
            
            {isLoading ? (
            <ActivityIndicator style={styles.button} style size='small' />
            ) : (
            <TouchableOpacity style={styles.button} onPress={() => formSubmitHandler()}>
                <Text> Log In </Text>
            </TouchableOpacity>)}
        </View>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#003f5c',
        justifyContent:"center",
        alignItems:"center"
    },
    greeting:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40,
        alignItems:"center",
        justifyContent:"center"
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
        borderBottomWidth:2,
        color:'#FFFFFF'
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

export default LoginScreen;