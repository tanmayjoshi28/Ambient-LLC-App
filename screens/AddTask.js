import React, {useState,useCallback,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,
         ScrollView , Picker, Button, ActivityIndicator,Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux';

import * as projectActions from '../store/actions/project';
import * as authActions from '../store/actions/auth';
import * as taskActions from '../store/actions/tasks';

const firebaseConfig = {
    apiKey: "AIzaSyCRyJqAx44495HqXFyfevb5eXYaBBe--jc",
    authDomain: "task-management-1baac.firebaseapp.com",
    databaseURL: "https://task-management-1baac.firebaseio.com",
    projectId: "task-management-1baac",
    storageBucket: "task-management-1baac.appspot.com",
    messagingSenderId: "804502336127",
    appId: "1:804502336127:web:60f9610f0dc7b80005454a"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const AddTaskScreen = props =>{
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [time,setTime] = useState(1400);
    const [newTime,setNewTime] = useState('');
    const [newDate,setNewDate] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [tenderId, setTenderid] = useState('');
    const [heading, setHeading] = useState('');
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState(4);
    const [imagetitle, setImageTitle] = useState('');
    const [userAssigned,setUserAssigned] = useState(null);

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.auth.allUsers);
    const allProjects = useSelector(state => state.project.allProjects);

    /// DISPATCHING ACTION FOR CREATING NEW TASK
    const submitHandler = useCallback((downloadlink) =>{
        setError(null);
        setIsLoading(true);
        var object = new Date();
        var date = object.getDate().toString();
        var month = object.getMonth().toString();
        var year = object.getFullYear().toString();
        var hour = object.getHours().toString();
        var minutes = object.getMinutes().toString();

        var time = hour.concat(' : ',minutes);
        var calDate = date.concat('/', month, '/', year);

        console.log("Task Creation");

        if (userAssigned===null){
            Alert.alert('An Error Occured','Please Assign Task To Someone', [{text :'Okay'}]);
            setIsLoading(false);
            return;
        }
        try{
            dispatch(taskActions.createTask(tenderId, heading, details,
                                            priority, time, calDate,
                                            downloadlink, userAssigned,
                                            newDate,newTime)
                    );
            props.navigation.navigate('CreatedTask');
        }
        catch(err){
            setError(err.message);
            setIsLoading(false);
        }
    }, [dispatch,tenderId,heading,details,priority,userAssigned]);

    useEffect(()=>{
        if (error){
            Alert.alert('An Error Occured',error, [{text :'Okay'}])
        }
    },[error])

    /// FOR UPLOADING AND GETTING DOWNLOAD LINK
    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };
    const uploadImage = async (uri,imageName) => {
        setIsLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();

        var object = new Date();
        var hour = object.getHours().toString();
        var minutes = object.getMinutes().toString();
        var sec = object.getSeconds().toString();
        var time = hour + minutes + sec;

        var ref = firebase.storage().ref().child("images/" + imageName+time);
        const task = ref.put(blob);
        task.on('state_changed',takeSnapshot=>{
            console.log(
                `${takeSnapshot.bytesTransferred} Transfered out of ${takeSnapshot.totalBytes}`
                )
        });
        task.then(imageSnapshot =>{
            console.log("Image Uploaded");
            firebase.storage().ref("images/" + imageName+time).getDownloadURL().then(
                (downloadURL) =>{
                    console.log("The download:" ,downloadURL);
                    setIsLoading(false);
                    submitHandler(downloadURL);
                }
            );
        });
    };

    /// PICKING IMAGE FROM DEVICE
    const pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
          });
          if (!result.cancelled) {
            uploadImage(result.uri,imagetitle);
          }
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

    /// LOADING OTHER USER SO THAT TASK CAN ME ASSIGNED TO THEM
    const loadUsers = useCallback(async ()=>{
        setError(null);
        try{
            await dispatch(authActions.getusers());
        }catch(err){
            setError(err.message);
        }
    },[dispatch,setError]);

    /// LOADING PROJECTS
    const loadProjects = useCallback(async ()=>{
        setError(null);
        try{
            await dispatch(projectActions.getProjects());
        }catch(err){
            setError(err.message);
        }
    },[dispatch,setError]);

    useEffect(()=> {getPermissionAsync()},[submitHandler]);
    
    useEffect(()=>{
        setIsLoading(true);
        loadUsers().then(()=>{
            setIsLoading(false);
        });
    }, [dispatch, loadUsers]);

    useEffect(()=>{
        setIsLoading(true);
        loadProjects().then(()=>{
            setIsLoading(false);
        });
    }, [dispatch, loadProjects]);
    
    const showDatepicker = () => {
        setShowDate(true);
    };
     
    const showTimepicker = () => {
        setShowTime(true);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        const convertedDate = moment(currentDate).format("YYYY-MM-DD");
        setNewDate(convertedDate);
        setShowDate(false);
        console.log(newDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        const convertedTime = moment(currentTime).format("HH:mm");
        setNewTime(convertedTime);
        setShowTime(false)
        console.log(newTime);  
    };

    if (isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size='large' color={"#398BD9"} />
            </View>
        );
    }

    return(
        <ScrollView>
            <View style={styles.form}>
                <View style = {styles.formControl}>
                    <Text style={styles.label}>Project / Tender Id</Text>
                    <Picker selectedValue={tenderId} style={styles.input} 
                            onValueChange={(itemValue) => setTenderid(itemValue)}>
                            {allProjects.map((item) => {
                                return (<Picker.Item label={item.refNo} value={item.refNo} key={item.refNo}/>) 
                            })}
                        </Picker>
                </View>
                <View style = {styles.formControl}>
                    <Text style={styles.label}>Heading</Text>
                    <TextInput onChangeText={text => setHeading(text)} style={styles.input} />
                </View>
                <View style = {styles.formControl}>
                    <Text style={styles.label}>Detail</Text>
                    <TextInput onChangeText={text => setDetails(text)} style={styles.input} />
                </View>
                <View style = {styles.formControl}>
                    <Button onPress={showDatepicker} title="Deadline Date" />
                    <Button onPress={showTimepicker} title="Deadline Time" />
                </View>
                <View style = {styles.formControl}>
                    <Text style={styles.label}>Status</Text>
                    <Picker selectedValue={priority} style={styles.input} 
                        onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
                        <Picker.Item label="Emergency" value={4} />
                        <Picker.Item label="High" value={3} />
                        <Picker.Item label="Medium" value={2}/>
                        <Picker.Item label="Low" value={1} />
                    </Picker>
                </View>
                <View style = {styles.formControl}>
                    <Text style={styles.label}>Assign Task to</Text>
                    <Picker selectedValue={userAssigned} style={styles.input} 
                        onValueChange={(itemValue) => setUserAssigned(itemValue)}>
                        {allUsers.map((item) => {
                            return (<Picker.Item label={item.username} value={item.userId} key={item.userId}/>) 
                        })}
                    </Picker>
                </View>
                    {showDate && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display="default"
                        onChange={onChangeDate}
                        />
                        )
                    }
                    {showTime &&(
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode='time'
                        display="default"
                        onChange={onChangeTime}
                        />
                        )
                    }
                <Button title="Create Without Attachment" onPress={() => submitHandler('null')} />

                <View style = {styles.formControl}>
                    <Text style={styles.label}>Attachment Name :-</Text>
                    <TextInput onChangeText={text => setImageTitle(text)} style={styles.input} />
                </View>
                {isLoading ? (
                <ActivityIndicator style={styles.button} style size='small' />
                ) : (
                    <Button title="Create with attachment" onPress={() => pickImage()} />
                )}
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        margin:20
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
    }
  });
  
  export default AddTaskScreen;