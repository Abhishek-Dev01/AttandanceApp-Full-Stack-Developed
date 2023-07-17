import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc,setDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import firebaseApp from '../config/FirebaseConfig';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [outputMessage, setOutputMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setOutputMessage('Permission to access media library denied.');
      }
    })();
  }, []);

  const handlePhotoUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // Specify base64 option to get base64-encoded image data
      });

      if (result && !result.canceled) {
        const selectedAsset = result.assets[0];
        setPhoto(selectedAsset.uri);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const handleRegistration = async () => {
    const auth = getAuth(firebaseApp);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const firestore = getFirestore(firebaseApp);
      const usersCollectionRef = collection(firestore, 'users');
  
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
  
      // Save the user data with the first name as the document ID
      const docRef = doc(usersCollectionRef, firstName);
      await setDoc(docRef, userData);
      console.log('User data saved:', docRef.id); // Access the document ID directly from docRef
  
      if (photo) {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `users/${user.uid}/profile_photo.jpg`);
  
        // Convert photo data to blob
        const response = await fetch(photo);
        const blob = await response.blob();
  
        // Upload the photo file to Firebase Storage
        await uploadBytes(storageRef, blob);
  
        // Get the download URL of the uploaded photo
        const photoURL = await getDownloadURL(storageRef);
        console.log('Photo uploaded:', photoURL);
  
        // Update the user document with the photo URL
        await updateDoc(docRef, { photoURL: photoURL }); // Use the same docRef here
      }
  
      setOutputMessage('Registration successful!');
      // Additional logic or navigation here
    } catch (error) {
      console.log('Error:', error);
      setOutputMessage(`Error: ${error.message}`);
    }
  };
  
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      {photo && (
        <Image source={{ uri: photo }} style={styles.photo} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePhotoUpload}>
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 56,
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: 'cur',
    color: '#000',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 0,
    width: 120,
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'poppins',
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

export default RegisterScreen;
