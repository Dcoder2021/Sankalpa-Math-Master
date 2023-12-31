import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, } from 'react-native';
import { Text, Button, ProgressBar, Avatar, IconButton, TextInput, RadioButton } from 'react-native-paper';
import AppBa2 from '../components/appBar2';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

const ConfirmStuDE = ({ navigation, route }) => {
    const { markId } = route.params;
    const [studentData, setStudentData] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [stageId, setStageId] = useState('');

    useEffect(() => {
        fetchStudentDetails(markId);
    }, []);

    const fetchStudentDetails = async (markId) => {
        try {
            // Fetch student details using markId
            const markResponse = await axios.post('http://192.168.1.100:8000/api/markby', { _id: markId });
            const studentId = markResponse.data[0].StudentID;

            // Fetch student name and stage ID using studentId
            const studentResponse = await axios.post('http://192.168.1.100:8000/api/studentby', { _id: studentId });
            const studentDetails = studentResponse.data[0];

            setStudentData(markResponse.data[0]);
            setStudentName(studentDetails.Name);
            setStageId(studentDetails.StageId);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="inverted" />
            <AppBa2 title={' In-class activity details'} />
            <View style={styles.box1}>
                <View style={styles.box2}>
                    <ProgressBar progress={0.6} color="#002060" />
                </View>

                <View style={styles.box3}>
                    <Text style={{ textAlign: 'center' }} variant="headlineLarge">
                        Student Details
                    </Text>
                    <View style={styles.input}>
                        {/* Render student name and stage ID here */}
                        <Text style={{ marginBottom: 1 }} variant="titleLarge">
                            Student Name: {studentName}
                        </Text>
                        <Text style={{ marginBottom: 25 }} variant="titleMedium">
                            Stage : {stageId ? 'Middle School' : 'Primary School'} {stageId}
                        </Text>
                        {/* Render other student details from studentData here */}
                        {studentData && (
                            <>
                                <View style={styles.group}>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        Class Test exam Marks:
                                    </Text>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        {studentData.TestM}
                                    </Text>
                                </View>
                                <View style={styles.group}>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        Class performance Marks:
                                    </Text>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        {studentData.PerformanceM}
                                    </Text>
                                </View>
                                <View style={styles.group}>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        Class Assignment Marks:
                                    </Text>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        {studentData.AssignmentM}
                                    </Text>
                                </View>
                                <View style={styles.group}>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        Class Attendance details:
                                    </Text>
                                    <Text style={{ marginBottom: 12 }} variant="titleMedium">
                                        {studentData.AttandenceM}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>

                    <View style={styles.note}>
                        <Text variant="titleMedium">** Please confirm the student details before starting the prediction</Text>
                    </View>
                </View>

                <View style={styles.box4}>
                    <Button textColor="#ffff" onPress={() => { navigation.navigate('Loader2', { markId }) }} mode="contained">
                        CONTINUE
                    </Button>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    margin: {
        margin: 18
    },
    card: { marginTop: 15 },
    container: {
        flex: 1,


    },
    box1: {
        marginTop: 28,
        marginLeft: 23,
        marginRight: 23,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    box2: {
        height: 30,

    },
    box8: {
        height: 35
        , marginBottom: 15,

    },
    box3: {
        marginTop: 5,
        display: 'flex',
        flexdirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        height: 500,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor:'#000'  

    },

    box4: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        position: 'relative'

    },

    Headding: {
        fontSize: 19,

    },

    note: {
        marginBottom: 20

    },
    input: {
        marginTop: 5,
        display: 'flex',
        flexdirection: 'column',
        height: 350,
        width: 250,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor:'#000'  

    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'space-between',
        alignContent: 'space-around'
    },
});

export default ConfirmStuDE;