import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !lastName || !firstName) {
      Alert.alert('Помилка', 'Будь ласка, заповніть усі поля.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають.');
      return;
    }
    // Тут логіка реєстрації
    Alert.alert('Успіх', 'Ви успішно зареєстровані (симуляція).');
    // Очистка полів після "успішної" реєстрації
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setLastName('');
    setFirstName('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Реєстрація</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Електронна пошта"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль (ще раз)"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Прізвище"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        value={firstName}
        onChangeText={setFirstName}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Зареєструватися" onPress={handleRegister} color="#007bff" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8, // Щоб кнопка теж мала заокруглені краї на Android (Button не стилізується так просто)
    overflow: 'hidden', // Для borderRadius на Android
  }
});

export default ProfileScreen;