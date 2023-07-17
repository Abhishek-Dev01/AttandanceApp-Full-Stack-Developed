import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '../config/FirebaseConfig';
import { useFonts } from 'expo-font';

const Forgot = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [outputMessage, setOutputMessage] = useState('');

  const handleResetPassword = () => {
    const auth = getAuth(firebaseApp);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setOutputMessage('Password reset email sent!');
      })
      .catch((error) => {
        setOutputMessage(`Error: ${error.message}`);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [loaded] = useFonts({
    opens: require('../assets/font/open.ttf'),
    openi: require('../assets/font/openi.ttf'),
    pro: require('../assets/font/pro.ttf'),
    poppins: require('../assets/font/poppins.ttf'),
    bold: require('../assets/font/bold.ttf'),
    cur: require('../assets/font/dance.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <Text style={styles.output}>{outputMessage}</Text>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: 'cur',
    color: '#000',
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    fontFamily: 'opens',
    fontSize: 20,
    color: '#000',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'poppins',
  },
  output: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'poppins',
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 10,
  },
  goBackButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: 'poppins',
  },
});

export default Forgot;
