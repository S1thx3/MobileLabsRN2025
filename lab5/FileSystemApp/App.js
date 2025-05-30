
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';


import { APP_DATA_DIRECTORY } from './utils/formatters';
import CreateFolderModal from './components/CreateFolderModal';
import CreateFileModal from './components/CreateFileModal';
import CreateChoiceModal from './components/CreateChoiceModal';
import EditFileModal from './components/EditFileModal';
import FileInfoModal from './components/FileInfoModal'; 
import FileListItem from './components/FileListItem';
import StorageInfo from './components/StorageInfo';
import NavigationHeader from './components/NavigationHeader';


export default function App() {
  const [totalStorage, setTotalStorage] = useState(0);
  const [freeStorage, setFreeStorage] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  const [currentPath, setCurrentPath] = useState(APP_DATA_DIRECTORY);
  const [directoryItems, setDirectoryItems] = useState([]);

  const [isCreateChoiceModalVisible, setCreateChoiceModalVisible] = useState(false);
  const [isCreateFolderModalVisible, setCreateFolderModalVisible] = useState(false);
  const [isCreateFileModalVisible, setCreateFileModalVisible] = useState(false);
  
  const [isEditFileModalVisible, setEditFileModalVisible] = useState(false);
  const [editingFile, setEditingFile] = useState(null);

  const [isFileInfoModalVisible, setFileInfoModalVisible] = useState(false);
  const [selectedItemForInfo, setSelectedItemForInfo] = useState(null);



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
          const info = await FileSystem.getInfoAsync(itemPath, { size: true }); // Ensure size is requested
          return {
            name: item,
            isDirectory: info.isDirectory,
            uri: info.uri,
            size: info.size, // Розмір файлу в байтах
            modificationTime: info.modificationTime, // Час останньої модифікації (timestamp)
          };
        })
      );
      setDirectoryItems(itemsWithDetails.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) {
          return a.name.localeCompare(b.name);
        }
        return a.isDirectory ? -1 : 1;
      }));
    } catch (error)
      { 
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
      if (item.name.endsWith('.txt')) {
        setEditingFile({ uri: item.uri, name: item.name });
        setEditFileModalVisible(true);
      } else {
        // Якщо не .txt, можна просто показувати інформацію про файл
        setSelectedItemForInfo(item);
        setFileInfoModalVisible(true);
      }
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

  const handleFileCreated = (fileName) => {
    setCreateFileModalVisible(false);
    loadDirectoryContents(currentPath);
    Alert.alert("Успіх", `Файл "${fileName}" створено.`);
  };

  const handleFileSaved = (fileName) => {
    setEditFileModalVisible(false);
    setEditingFile(null);
    loadDirectoryContents(currentPath); 
    Alert.alert("Успіх", `Файл "${fileName}" збережено.`);
  };

  const handleDeleteItem = (item) => {
    Alert.alert(
      "Підтвердження видалення",
      `Ви впевнені, що хочете видалити "${item.name}"?${item.isDirectory ? "\n(УВАГА: Весь вміст папки також буде видалено!)" : ""}`,
      [
        { text: "Скасувати", style: "cancel" },
        { 
          text: "Видалити", 
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.uri, { idempotent: true });
              Alert.alert("Успіх", `"${item.name}" успішно видалено.`);
              loadDirectoryContents(currentPath); 
            } catch (error) {
              console.error("Error deleting item:", error);
              Alert.alert("Помилка", `Не вдалося видалити "${item.name}".`);
            }
          },
          style: "destructive" 
        }
      ]
    );
  };

  const showItemInfo = (item) => {
    setSelectedItemForInfo(item);
    setFileInfoModalVisible(true);
  };

  const closeItemInfoModal = () => {
    setFileInfoModalVisible(false);
    setSelectedItemForInfo(null);
  };
  
  const openCreateChoiceModal = () => setCreateChoiceModalVisible(true);
  const closeCreateChoiceModal = () => setCreateChoiceModalVisible(false);

  const openCreateFolderModal = () => {
    closeCreateChoiceModal();
    setCreateFolderModalVisible(true);
  };
  const openCreateFileModal = () => {
    closeCreateChoiceModal();
    setCreateFileModalVisible(true);
  };


  return (
    <View style={styles.container}>
      {/* ... (існуючі модальні вікна) ... */}
      <CreateChoiceModal
        visible={isCreateChoiceModalVisible}
        onClose={closeCreateChoiceModal}
        onSelectFolder={openCreateFolderModal}
        onSelectFile={openCreateFileModal}
      />
      <CreateFolderModal
        visible={isCreateFolderModalVisible}
        currentPath={currentPath}
        onClose={() => setCreateFolderModalVisible(false)}
        onFolderCreated={handleFolderCreated}
      />
      <CreateFileModal
        visible={isCreateFileModalVisible}
        currentPath={currentPath}
        onClose={() => setCreateFileModalVisible(false)}
        onFileCreated={handleFileCreated}
      />
      {editingFile && (
        <EditFileModal
            visible={isEditFileModalVisible}
            fileUri={editingFile.uri}
            fileName={editingFile.name}
            onClose={() => {
                setEditFileModalVisible(false);
                setEditingFile(null);
            }}
            onFileSaved={handleFileSaved}
        />
      )}
      {/* Додаємо нове модальне вікно інформації */}
      <FileInfoModal
        visible={isFileInfoModalVisible}
        item={selectedItemForInfo}
        onClose={closeItemInfoModal}
      />


      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Файловий менеджер</Text>
      </View>

      <StorageInfo total={totalStorage} free={freeStorage} used={usedStorage} />

      <NavigationHeader
        currentPath={currentPath}
        onNavigateUp={navigateUp}
        onShowCreateOptionsModal={openCreateChoiceModal}
      />

      <FlatList
        data={directoryItems}
        renderItem={({item}) => (
          <FileListItem 
            item={item} 
            onPress={handleItemPress}
            onDelete={handleDeleteItem}
            onShowInfo={showItemInfo} // Передаємо функцію показу інформації
          />
        )}
        keyExtractor={(item) => currentPath + item.name}
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