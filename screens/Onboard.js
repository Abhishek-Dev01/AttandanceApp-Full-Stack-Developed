import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../config/Images';
import { useFonts } from 'expo-font';

const Onboard = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Handle sign up navigation
    navigation.navigate('Login');
  };

  const handleRegistration = () => {
    // Handle registration navigation
    navigation.navigate('Register');
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
      <Video
        source={Images.Vide}
        style={styles.backgroundVideo}
        shouldPlay
        isLooping
        resizeMode="cover"
        useNativeControls={false}
      />
      <View style={styles.contentContainer}>
      
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to the Attendance App!</Text>
          <Text style={styles.description}>This app is for staff members only.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 46,
    marginBottom: 16,
    color: '#fff',
    fontFamily: 'bold',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Onboard;
