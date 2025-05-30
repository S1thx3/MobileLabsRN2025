
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CreateFileModal = ({ visible, currentPath, onClose, onFileCreated }) => {
  const [newFileName, setNewFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleCreate = async () => {
    let trimmedName = newFileName.trim();
    if (!trimmedName) {
      Alert.alert("Помилка", "Назва файлу не може бути порожньою.");
      return;
    }
    if (!trimmedName.endsWith('.txt')) {
      trimmedName += '.txt';
    }

    try {
      const filePath = currentPath + trimmedName;
      await FileSystem.writeAsStringAsync(filePath, fileContent);
      setNewFileName('');
      setFileContent('');
      onFileCreated(trimmedName);
    } catch (error) {
      console.error("Error creating file:", error);
      Alert.alert("Помилка", `Не вдалося створити файл. ${error.message}`);
      onClose();
    }
  };

  const handleClose = () => {
    setNewFileName('');
    setFileContent('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Створити новий файл (.txt)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewFileName}
            value={newFileName}
            placeholder="Назва файлу (напр., notes.txt)"
            autoFocus={true}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            onChangeText={setFileContent}
            value={fileContent}
            placeholder="Вміст файлу..."
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonCancel]}
              onPress={handleClose}
            >
              <Text style={styles.textStyle}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonCreate]}
              onPress={handleCreate}
            >
              <Text style={styles.textStyle}>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: "#f44336",
  },
  buttonCreate: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default CreateFileModal;