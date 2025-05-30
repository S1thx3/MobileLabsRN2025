import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CreateChoiceModal = ({ visible, onClose, onSelectFolder, onSelectFile }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Що створити?</Text>
          <TouchableOpacity style={styles.choiceButton} onPress={onSelectFolder}>
            <Text style={styles.choiceText}>Нову папку</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceButton} onPress={onSelectFile}>
            <Text style={styles.choiceText}>Новий текстовий файл (.txt)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.choiceButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelText}>Скасувати</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
  },
  choiceButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  choiceText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  }
});

export default CreateChoiceModal;