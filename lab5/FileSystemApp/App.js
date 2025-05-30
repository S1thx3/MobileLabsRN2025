// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { APP_DATA_DIRECTORY } from './utils/formatters';
import CreateFolderModal from './components/CreateFolderModal';
import FileListItem from './components/FileListItem';
import StorageInfo from './components/StorageInfo';
import NavigationHeader from './components/NavigationHeader';

export default function App() {
  const [totalStorage, setTotalStorage] = useState(0);
  const [freeStorage, setFreeStorage] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  const [currentPath, setCurrentPath] = useState(APP_DATA_DIRECTORY);
  const [directoryItems, setDirectoryItems] = useState([]);

  const [isCreateFolderModalVisible, setCreateFolderModalVisible] = useState(false);

  const getStorageInfo = useCallback(async () => {
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      setTotalStorage(total);
      setFreeStorage(free);
      setUsedStorage(total - free);
    } catch (error) {
      console.error("Error fetching storage info:", error);
    }
  }, []);

  const ensureAppDataDirectoryExists = useCallback(async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIRECTORY);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(APP_DATA_DIRECTORY, { intermediates: true });
      }
    } catch (error) {
      console.error("Error ensuring AppData directory:", error);
    }
  }, []);

  const loadDirectoryContents = useCallback(async (path) => {
    try {
      const items = await FileSystem.readDirectoryAsync(path);
      const itemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const itemPath = path + item;
          const info = await FileSystem.getInfoAsync(itemPath);
          return {
            name: item,
            isDirectory: info.isDirectory,
            uri: info.uri,
            size: info.size,
            modificationTime: info.modificationTime,
          };
        })
      );
      setDirectoryItems(itemsWithDetails.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) {
          return a.name.localeCompare(b.name);
        }
        return a.isDirectory ? -1 : 1;
      }));
    } catch (error) {
      console.error(`Error loading directory contents for ${path}:`, error);
      Alert.alert("Помилка", `Не вдалося завантажити вміст директорії.`);
      if (path !== APP_DATA_DIRECTORY) {
        setCurrentPath(APP_DATA_DIRECTORY);
      } else {
        setDirectoryItems([]);
      }
    }
  }, []);

  useEffect(() => {
    ensureAppDataDirectoryExists().then(() => {
      loadDirectoryContents(currentPath);
    });
    getStorageInfo();
  }, [currentPath, ensureAppDataDirectoryExists, getStorageInfo, loadDirectoryContents]);

  const handleItemPress = (item) => {
    if (item.isDirectory) {
      setCurrentPath(item.uri + '/');
    } else {
      Alert.alert("Файл", `Ви обрали файл: ${item.name}. Функція перегляду буде додана.`);
    }
  };

  const navigateUp = () => {
    if (currentPath === APP_DATA_DIRECTORY) {
      return;
    }
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/', currentPath.length - 2) + 1);
    setCurrentPath(parentPath);
  };
  
  const handleFolderCreated = (folderName) => {
    setCreateFolderModalVisible(false);
    loadDirectoryContents(currentPath);
    Alert.alert("Успіх", `Папку "${folderName}" створено.`);
  };

  return (
    <View style={styles.container}>
      <CreateFolderModal
        visible={isCreateFolderModalVisible}
        currentPath={currentPath}
        onClose={() => setCreateFolderModalVisible(false)}
        onFolderCreated={handleFolderCreated}
      />

      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Файловий менеджер</Text>
      </View>

      <StorageInfo total={totalStorage} free={freeStorage} used={usedStorage} />

      <NavigationHeader
        currentPath={currentPath}
        onNavigateUp={navigateUp}
        onShowCreateFolderModal={() => setCreateFolderModalVisible(true)}
      />

      <FlatList
        data={directoryItems}
        renderItem={({item}) => <FileListItem item={item} onPress={handleItemPress} />}
        keyExtractor={(item) => item.uri}
        style={styles.fileList}
        ListEmptyComponent={<Text style={styles.emptyListText}>Папка порожня</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50, 
  },
  headerBar: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  fileList: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});