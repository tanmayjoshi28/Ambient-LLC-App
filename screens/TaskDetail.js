import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button,Alert } from 'react-native';
import {useSelector} from 'react-redux';

import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import * as FileSystem from 'expo-file-system'

const TaskDetailScreen = props =>{

    const taskid = props.navigation.getParam('taskId');
    const selectedTask = useSelector(state => state.tasks.allTasks.find(task => task.taskId === taskid))
    console.log(selectedTask.comment);
    const saveFile = async (fileUri,string) =>{
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }

    const download = ()=>{
        console.log(selectedTask.attachment)
        const uri = selectedTask.attachment;
        if (uri==="null"){
            Alert.alert('No attachment','This has no associated attachment', [{text :'Okay'}]);
            return;
        }
        var object = new Date();
        var hour = object.getHours().toString();
        var minutes = object.getMinutes().toString();
        var sec = object.getSeconds().toString();
        var time = hour + minutes + sec;

        let fileUri = FileSystem.documentDirectory + time+ '.jpeg'
        try{
            FileSystem.downloadAsync(uri, fileUri).then(
                ({ uri }) => {
                    console.log(uri)
                    saveFile(uri)
                    console.log("Downloaded")
                })
                .catch(error => {
                    console.error(error);
                })
                Alert.alert('Downloaded','Check your downloads', [{text :'Okay'}])
            }catch(err){
                console.log(err);
            }
        }
        

    return(
        <View style={styles.details}>
            <Text>{selectedTask.taskId}</Text>
            <Text>{selectedTask.tenderId}</Text>
            <Text>{selectedTask.heading}</Text>
            <Text>{selectedTask.genrationTime}</Text>
            <Text>{selectedTask.genrationDate}</Text>
            <Text>{selectedTask.detail}</Text>
            <Text>{selectedTask.deadlineDate}</Text>
            <Text>{selectedTask.deadlineTime}</Text>
            <Text>{selectedTask.comment}</Text>
            <Button title='DownLoad Attachment' onPress={()=>{download()}} />
            {selectedTask.acceptance ?(
                <Text>Task Accepted</Text>
            ) : (<Text>Not Accepted</Text>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    details:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default TaskDetailScreen;