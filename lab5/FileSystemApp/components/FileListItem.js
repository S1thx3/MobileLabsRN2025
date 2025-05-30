
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; // Додаємо Ionicons
import { formatBytes } from '../utils/formatters';

const FileListItem = ({ item, onPress, onDelete }) => { // Додаємо onDelete як пропс
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
      <MaterialIcons
        name={item.isDirectory ? "folder" : "insert-drive-file"}
        size={28}
        color={item.isDirectory ? "#FFCA28" : "#666"}
        style={styles.itemIcon}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="middle">{item.name}</Text>
        {item.isDirectory ? (
          <Text style={styles.itemType}>Папка</Text>
        ) : (
          <Text style={styles.itemType}>Файл ({formatBytes(item.size)})</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemIcon: {
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1, // Щоб текстовий контейнер займав доступний простір
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemType: {
    fontSize: 12,
    color: '#777',
  },
  deleteButton: {
    paddingLeft: 10, // Відступ для кнопки видалення
    paddingVertical: 5, // Для легшого натискання
  }
});

export default FileListItem;