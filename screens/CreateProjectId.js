import React, { useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Button, Picker} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import * as projectActions from '../store/actions/project';
import {useDispatch} from 'react-redux'

const CreateProjectIdScreen = props =>{
    const [projectRef,setProjectRef] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectType, setProjectType] = useState('Project');
    const dispatch = useDispatch();

    const submitProject = ()=>{
        dispatch(projectActions.createProject(projectRef,projectTitle,projectType));
        props.navigation.navigate('AllTasks');
    }
    return(
        <View style={styles.form}>
            <View style = {styles.formControl}>
                    <Text style={styles.label}>Ref No .</Text>
                    <TextInput onChangeText={text => setProjectRef(text)} style={styles.input} />
                </View>
            <View style = {styles.formControl}>
                <Text style={styles.label}>Name</Text>
                <TextInput onChangeText={text => setProjectTitle(text)} style={styles.input} />
            </View>
            <View style = {styles.formControl}>
                    <Text style={styles.label}>Type</Text>
                <Picker selectedValue={projectType} style={styles.input} 
                            onValueChange={(itemValue, itemIndex) => setProjectType(itemValue)}>
                            <Picker.Item label="Project" value="Project" />
                            <Picker.Item label="Tender" value="Tender" />
                            <Picker.Item label="Intraoffice" value="Intraoffice"/>
                        </Picker>
            </View>
            <Button title="ok" onPress={() => submitProject()} />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        margin:20
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:2,
        borderBottomColor:'#ccc',
        borderBottomWidth:2
    },
    formControl:{
        width:'100%',
        marginVertical:8
    },
});

export default CreateProjectIdScreen;