// components/EditFileModal.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';

const EditFileModal = ({ visible, fileUri, fileName, onClose, onFileSaved }) => {
  const [originalContent, setOriginalContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFileContent = useCallback(async () => {
    if (!fileUri) return;
    setIsLoading(true);
    setError('');
    try {
      const content = await FileSystem.readAsStringAsync(fileUri);
      setOriginalContent(content);
      setEditedContent(content);
    } catch (e) {
      console.error("Error reading file:", e);
      setError('Не вдалося завантажити вміст файлу.');
      Alert.alert("Помилка", "Не вдалося завантажити вміст файлу.");
    } finally {
      setIsLoading(false);
    }
  }, [fileUri]);

  useEffect(() => {
    if (visible) {
      loadFileContent();
    } else {
      // Скидання стану при закритті, щоб уникнути показу старого вмісту на мить
      setOriginalContent('');
      setEditedContent('');
      setError('');
    }
  }, [visible, loadFileContent]);

  const handleSave = async () => {
    if (!fileUri) return;
    setIsLoading(true);
    try {
      await FileSystem.writeAsStringAsync(fileUri, editedContent);
      setIsLoading(false);
      onFileSaved(fileName); 
    } catch (e) {
      console.error("Error saving file:", e);
      Alert.alert("Помилка", "Не вдалося зберегти файл.");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Якщо є незбережені зміни, запитати підтвердження
    if (originalContent !== editedContent) {
      Alert.alert(
        "Незбережені зміни",
        "Ви маєте незбережені зміни. Ви впевнені, що хочете закрити?",
        [
          { text: "Скасувати", style: "cancel" },
          { text: "Закрити", onPress: onClose, style: "destructive" }
        ]
      );
    } else {
      onClose();
    }
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
          <Text style={styles.modalTitle} numberOfLines={1} ellipsizeMode="middle">{fileName || 'Редагування файлу'}</Text>
          {isLoading && <ActivityIndicator size="large" color="#007AFF" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {!isLoading && !error && (
            <TextInput
              style={styles.textInput}
              value={editedContent}
              onChangeText={setEditedContent}
              multiline
              placeholder="Вміст файлу..."
              textAlignVertical="top" 
            />
          )}
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonClose]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.textStyle}>Закрити</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonSave]}
              onPress={handleSave}
              disabled={isLoading || originalContent === editedContent}
            >
              <Text style={styles.textStyle}>Зберегти</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    flex: 1, // Дозволяє TextInput зайняти доступний простір
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonSave: {
    backgroundColor: '#007AFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  }
});

export default EditFileModal;