import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { appColors } from '../constants/colors';

const TaskItem = ({ task, onDelete }) => {
    const formattedDate = task.reminderTime
        ? new Date(task.reminderTime).toLocaleString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'No reminder';

    return (
        <View style={[styles.container, { backgroundColor: appColors.card, shadowColor: appColors.text }]}>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: appColors.text }]}>{task.title}</Text>
                {task.description ? (
                    <Text style={[styles.description, { color: appColors.secondaryText }]}>
                        {task.description}
                    </Text>
                ) : null}
                <Text style={[styles.reminder, { color: appColors.secondaryText }]}>
                    Reminder: {formattedDate}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: appColors.deleteButtonBackground }]}
                onPress={() => onDelete(task.id)}
            >
                <Text style={[styles.deleteButtonText, { color: appColors.deleteButtonText }]}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 6,
    },
    reminder: {
        fontSize: 12,
    },
    deleteButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    deleteButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TaskItem;