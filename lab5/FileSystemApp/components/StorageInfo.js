// components/StorageInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatBytes } from '../utils/formatters';

const StorageInfo = ({ total, free, used }) => {
  return (
    <View style={styles.storageInfoContainer}>
      <Text style={styles.storageInfoText}>Загальний обсяг: {formatBytes(total)}</Text>
      <Text style={styles.storageInfoText}>Вільно: {formatBytes(free)}</Text>
      <Text style={styles.storageInfoText}>Зайнято: {formatBytes(used)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  storageInfoContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    elevation: 1,
  },
  storageInfoText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
});

export default StorageInfo;