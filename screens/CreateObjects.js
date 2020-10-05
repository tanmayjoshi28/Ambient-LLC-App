import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const CreateObjectsScreen = props =>{
    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('createUser')}>
                    <Text> Create User </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('createProject')}>
                    <Text> Create Project </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#003f5c',
        alignItems:"center"
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
});

export default CreateObjectsScreen;