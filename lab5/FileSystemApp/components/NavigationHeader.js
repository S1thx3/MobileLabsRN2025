
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { APP_DATA_DIRECTORY, getDisplayPath } from '../utils/formatters';


const NavigationHeader = ({ currentPath, onNavigateUp, onShowCreateOptionsModal }) => {
  return (
    <View style={styles.navigationHeader}>
      <TouchableOpacity
        onPress={onNavigateUp}
        style={[styles.navButton, currentPath === APP_DATA_DIRECTORY && styles.navButtonDisabled]}
        disabled={currentPath === APP_DATA_DIRECTORY}
      >
        <AntDesign name="arrowup" size={24} color={currentPath === APP_DATA_DIRECTORY ? "#aaa" : "#007AFF"} />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pathContainerScrollView}>
        <Text style={styles.currentPathText} numberOfLines={1} ellipsizeMode="head">{getDisplayPath(currentPath)}</Text>
      </ScrollView>
      <TouchableOpacity
        onPress={onShowCreateOptionsModal} 
        style={styles.navButton}
      >
        <Ionicons name="create-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    elevation: 1,
  },
  navButton: {
    padding: 5,
  },
  navButtonDisabled: {
    // opacity: 0.5,
  },
  pathContainerScrollView: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  currentPathText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
});

export default NavigationHeader;