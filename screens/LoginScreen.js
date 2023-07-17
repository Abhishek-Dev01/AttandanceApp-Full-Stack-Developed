import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../config/FirebaseConfig';
import { useFonts } from 'expo-font';
import { Images } from '../config/Images';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [outputMessage, setOutputMessage] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(firebaseApp), email, password)
      .then(() => {
        setOutputMessage('Login successful!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        setOutputMessage(`Login error: ${error.message}`);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {

    navigation.navigate('Forgot');
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
      <ImageBackground source={Images.bg} style={styles.imageBackground}>
        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>Login Screen</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
          />
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.output}>{outputMessage}</Text>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Create an Account</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 56,
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: 'cur',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabelContainer: {
    marginBottom: 5,
  },
  inputLabel: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'poppins',
  },
  input: {
    width: 350,
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
    width: 200,
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
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: 'poppins',
  },
  output: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'poppins',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  registerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: 'poppins',
  },
});

export default LoginScreen;
