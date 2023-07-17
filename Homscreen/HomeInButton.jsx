import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const HomeInButton = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(null);

  const handleCapture = async () => {
    try {
      // Capture Image
      const { status: cameraPermission } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission !== 'granted') {
        Alert.alert('Camera permission denied', 'Please grant camera permission to capture an image.');
        return;
      }

      const imageResult = await ImagePicker.launchCameraAsync();
      if (imageResult.canceled) {
        return;
      }

      setImageUri(imageResult.assets[0].uri);

      // Get Date and Time
      const currentDateTime = new Date();
      const formattedDate = currentDateTime.toLocaleDateString();
      const formattedTime = currentDateTime.toLocaleTimeString();
      setDate(formattedDate);
      setTime(formattedTime);

      // Get Location
      const { status: locationPermission } = await Location.requestForegroundPermissionsAsync();
      if (locationPermission !== 'granted') {
        Alert.alert('Location permission denied', 'Please grant location permission to get the user location.');
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = locationResult.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log('Error capturing details:', error);
    }
  };

  const handleViewOutput = () => {
    navigation.navigate('OutputScreen', {
      imageUri,
      date,
      time,
      location,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCapture}>
        <Text style={styles.buttonText}>Capture Details</Text>
      </TouchableOpacity>
      {imageUri && (
        <View style={styles.imageContainer}>
        </View>
      )}
      {date && time && location && (
        <TouchableOpacity style={styles.viewOutputButton} onPress={handleViewOutput}>
          <Text style={styles.viewOutputButtonText}>View Output</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  viewOutputButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  viewOutputButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeInButton;
