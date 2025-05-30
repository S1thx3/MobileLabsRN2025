import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { appColors } from '../constants/colors';
import TaskItem from '../components/TaskItem';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const ReminderScreen = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [reminderDateTime, setReminderDateTime] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [expoPushToken, setExpoPushToken] = useState('');


    useEffect(() => {
        loadTasks();
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
    }, []);

    useEffect(() => {
        saveTasks();
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                setTasks(JSON.parse(storedTasks).map(task => ({
                    ...task,
                    reminderTime: task.reminderTime ? new Date(task.reminderTime) : null
                })));
            }
        } catch (error) {
            console.error('Failed to load tasks.', error);
        }
    };

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks.', error);
        }
    };

    const handleAddTask = async () => {
        if (taskTitle.trim() === '') {
            Alert.alert('Input Error', 'Task title cannot be empty.');
            return;
        }
        if (!reminderDateTime || reminderDateTime <= new Date()) {
            Alert.alert('Input Error', 'Please select a future time for the reminder.');
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            title: taskTitle,
            description: taskDescription,
            reminderTime: reminderDateTime,
            notificationId: null,
        };

        try {
            const notificationId = await schedulePushNotification(newTask);
            newTask.notificationId = notificationId;
        } catch (e) {
            console.error("Failed to schedule notification", e);
            Alert.alert("Notification Error", "Could not schedule notification. Task added without reminder.");
        }


        setTasks(prevTasks => [newTask, ...prevTasks].sort((a, b) => new Date(a.reminderTime) - new Date(b.reminderTime)));
        setTaskTitle('');
        setTaskDescription('');
        setReminderDateTime(new Date(Date.now() + 60 * 60 * 1000));
        Keyboard.dismiss();
    };

    const handleDeleteTask = async (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);
        if (taskToDelete && taskToDelete.notificationId) {
            try {
                await Notifications.cancelScheduledNotificationAsync(taskToDelete.notificationId);
                console.log('Cancelled notification:', taskToDelete.notificationId);
            } catch (e) {
                console.error("Failed to cancel notification", e);
            }
        }
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate || reminderDateTime;
        setShowDateTimePicker(Platform.OS === 'ios');
        if (currentDate > new Date()) {
            setReminderDateTime(currentDate);
        } else if (event.type !== 'dismissed') {
            Alert.alert('Invalid Time', 'Please select a future time for the reminder.');
        }
    };

    const showMode = (currentMode) => {
        setShowDateTimePicker(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    async function schedulePushNotification(task) {
        if (!expoPushToken) {
            console.log("No push token, can't schedule notification on physical device this way for remote pushes, but local will work.");
        }

        const schedulingOptions = {
            content: {
                title: `🔔 Reminder: ${task.title}`,
                body: task.description || 'It is time for your task!',
                data: { taskId: task.id },
                sound: 'default',
            },
            trigger: task.reminderTime,
        };

        try {
            console.log(`Scheduling notification for: ${task.title} at ${new Date(task.reminderTime).toLocaleString()}`);
            const notificationId = await Notifications.scheduleNotificationAsync(schedulingOptions);
            console.log('Notification scheduled with ID:', notificationId);
            return notificationId;
        } catch (e) {
            console.error('Error scheduling notification:', e);
            Alert.alert('Scheduling Error', `Could not schedule notification: ${e.message}`);
            return null;
        }
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert('Permissions Required', 'Failed to get push token for push notification! Please enable notifications in settings.');
                return;
            }
            try {
                token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log('Expo Push Token:', token);
            } catch (e) {
                console.error("Failed to get Expo push token", e);
            }
        } else {
            Alert.alert('Emulator Notice', 'Must use physical device for Push Notifications (or a simulator that supports them).');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { backgroundColor: appColors.background }]}>
                <Text style={[styles.mainTitle, { color: appColors.title }]}>To-Do Reminder</Text>

                <View style={[styles.inputCard, { backgroundColor: appColors.card, shadowColor: appColors.text }]}>
                    <TextInput
                        style={[styles.input, { color: appColors.text, borderColor: appColors.border }]}
                        placeholder="Введіть завдання"
                        placeholderTextColor={appColors.placeholderText}
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                    />
                    <TextInput
                        style={[styles.input, styles.inputDescription, { color: appColors.text, borderColor: appColors.border }]}
                        placeholder="Введіть опис завдання"
                        placeholderTextColor={appColors.placeholderText}
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.input, styles.dateInputContainer, { borderColor: appColors.border }]}
                        onPress={showDatepicker}
                    >
                        <Text style={{ color: reminderDateTime ? appColors.text : appColors.placeholderText }}>
                            {reminderDateTime
                                ? new Date(reminderDateTime).toLocaleString('uk-UA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                                : 'Час нагадування (РРРР-ММ-ДД ГГ:ХХ)'}
                        </Text>
                    </TouchableOpacity>

                    {showDateTimePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={reminderDateTime || new Date(Date.now() + 5 * 60 * 1000)}
                            mode="datetime"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDateTime}
                            minimumDate={new Date()}
                        />
                    )}
                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: appColors.addTaskButtonBackground }]}
                        onPress={handleAddTask}
                    >
                        <Text style={[styles.addButtonText, { color: appColors.addTaskButtonText }]}>Додати Завдання</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={tasks}
                    renderItem={({ item }) => <TaskItem task={item} onDelete={handleDeleteTask} />}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: appColors.secondaryText, marginTop: 20 }}>No tasks yet. Add one!</Text>}
                    style={styles.list}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 40,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    inputCard: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 15,
    },
    inputDescription: {
        height: 80,
        textAlignVertical: 'top',
        paddingTop: 15,
    },
    dateInputContainer: {
        justifyContent: 'center',
    },
    addButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
    },
});

export default ReminderScreen;