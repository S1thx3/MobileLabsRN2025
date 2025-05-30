// components/CreateFolderModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CreateFolderModal = ({ visible, currentPath, onClose, onFolderCreated }) => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreate = async () => {
    const trimmedName = newFolderName.trim();
    if (!trimmedName) {
      Alert.alert("Помилка", "Назва папки не може бути порожньою.");
      return;
    }
    try {
      const folderPath = currentPath + trimmedName;
      await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
      setNewFolderName('');
      onFolderCreated(trimmedName); 
    } catch (error) {
      console.error("Error creating folder:", error);
      Alert.alert("Помилка", `Не вдалося створити папку. ${error.message}`);
      onClose();
    }
  };

  const handleClose = () => {
    setNewFolderName('');
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
          <Text style={styles.modalText}>Створити нову папку</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewFolderName}
            value={newFolderName}
            placeholder="Назва папки"
            autoFocus={true}
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
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
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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

export default CreateFolderModal;