import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, TextInput, Modal } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';

const APP_DATA_DIRECTORY = FileSystem.documentDirectory + 'AppData/';

export default function App() {
  const [totalStorage, setTotalStorage] = useState(0);
  const [freeStorage, setFreeStorage] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const getStorageInfo = useCallback(async () => {
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      setTotalStorage(total);
      setFreeStorage(free);
      setUsedStorage(total - free);
    } catch (error) {
      console.error("Error fetching storage info:", error);
      Alert.alert("Помилка", "Не вдалося отримати інформацію про сховище.");
    }
  }, []);

  const ensureAppDataDirectoryExists = useCallback(async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIRECTORY);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(APP_DATA_DIRECTORY, { intermediates: true });
        console.log('AppData directory created');
      } else {
        console.log('AppData directory already exists');
      }
    } catch (error) {
      console.error("Error ensuring AppData directory:", error);
      Alert.alert("Помилка", "Не вдалося створити або перевірити робочу директорію.");
    }
  }, []);

  useEffect(() => {
    ensureAppDataDirectoryExists();
    getStorageInfo();
  }, [ensureAppDataDirectoryExists, getStorageInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Файловий менеджер</Text>
      </View>

      <View style={styles.storageInfoContainer}>
        <Text style={styles.storageInfoText}>Загальний обсяг: {formatBytes(totalStorage)}</Text>
        <Text style={styles.storageInfoText}>Вільно: {formatBytes(freeStorage)}</Text>
        <Text style={styles.storageInfoText}>Зайнято: {formatBytes(usedStorage)}</Text>
      </View>

      <View style={styles.fileExplorerContainer}>
        <Text>Тут буде навігація по файлах...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  header: {
    padding: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  storageInfoContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  storageInfoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  fileExplorerContainer: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
});