// utils/formatters.js
import * as FileSystem from 'expo-file-system';

export const APP_DATA_DIRECTORY_NAME = 'AppData';
export const APP_DATA_DIRECTORY = FileSystem.documentDirectory + APP_DATA_DIRECTORY_NAME + '/';


export const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getDisplayPath = (path) => {
  if (path.startsWith(FileSystem.documentDirectory)) {
    const relativePath = path.substring(FileSystem.documentDirectory.length);
    // Показуємо "внутрішнє сховище/" замість повного шляху, починаючи з AppData
    if (relativePath.startsWith(APP_DATA_DIRECTORY_NAME + '/')) {
        return `внутрішнє сховище/${relativePath}`;
    }
    return `внутрішнє сховище/${relativePath}`;
  }
  return path;
};