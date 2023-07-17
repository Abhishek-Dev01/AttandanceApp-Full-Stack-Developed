import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import firebaseApp from '../config/FirebaseConfig';
import { getAuth } from 'firebase/auth';    


const OutputScreen = ({ route }) => {
  const { imageUri, date, time, location } = route.params;
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    try {
      setUploading(true);
  
      // Get the currently logged-in user's email
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      const email = user ? user.email : '';
  
      // Initialize Firebase Firestore
      const firestore = getFirestore(firebaseApp);
  
      // Save Captured Details to Firebase Firestore with the email as document ID
      await setDoc(doc(firestore, 'CapturedDetails', email), {
        image: imageUri,
        date,
        time,
        location,
      });
  
      console.log('Document written with email: ', email);
      Alert.alert('Upload Successful', 'Details uploaded to Firebase successfully.');
    } catch (error) {
      console.log('Error uploading details:', error);
      Alert.alert('Upload Failed', 'Failed to upload details to Firebase.');
    } finally {
      setUploading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>Time: {time}</Text>
        <Text style={styles.text}>
          Location: {location.latitude}, {location.longitude}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
        onPress={handleUpload}
        disabled={uploading}
      >
        <Text style={styles.uploadButtonText}>
          {uploading ? 'Uploading...' : 'Upload to Firebase'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OutputScreen;
