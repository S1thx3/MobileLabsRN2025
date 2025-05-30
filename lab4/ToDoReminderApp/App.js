import { Platform, UIManager, LogBox } from 'react-native';
import ReminderScreen from './screens/ReminderScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export default function App() {
  return <ReminderScreen />;
}