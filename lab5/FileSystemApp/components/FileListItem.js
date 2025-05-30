// components/FileListItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { formatBytes } from '../utils/formatters';

const FileListItem = ({ item, onPress }) => {
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
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemType: {
    fontSize: 12,
    color: '#777',
  },
});

export default FileListItem;