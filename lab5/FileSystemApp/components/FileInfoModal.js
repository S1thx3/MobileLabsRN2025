
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { formatBytes } from '../utils/formatters'; 

const FileInfoModal = ({ visible, item, onClose }) => {
  if (!item) {
    return null;
  }

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop();
    if (extension === fileName) { 
      return 'Невідомий';
    }
    return extension.toUpperCase();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Невідомо';
    // Timestamp в FileSystem.getInfoAsync().modificationTime – це секунди
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString('uk-UA'); 
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle} numberOfLines={2} ellipsizeMode="middle">Інформація: {item.name}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Назва:</Text>
            <Text style={styles.infoValue} numberOfLines={3} ellipsizeMode="middle">{item.name}</Text>
          </View>
          
          {!item.isDirectory && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Тип:</Text>
              <Text style={styles.infoValue}>{getFileType(item.name)}</Text>
            </View>
          )}
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Розмір:</Text>
            <Text style={styles.infoValue}>{item.isDirectory ? '-' : formatBytes(item.size)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Дата модифікації:</Text>
            <Text style={styles.infoValue}>{formatDate(item.modificationTime)}</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'stretch', // Змінено для розтягування infoRow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // Дозволяє тексту переноситись, якщо він задовгий
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FileInfoModal;