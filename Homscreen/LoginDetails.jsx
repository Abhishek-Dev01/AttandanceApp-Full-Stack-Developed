import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const LoginDetails = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;

      if (user) {
        const firestore = getFirestore(firebaseApp);
        const userDocRef = doc(firestore, 'users', user.uid);

        try {
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log('Fetched user data:', userData);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.log('Error fetching user document:', error);
        }

        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `users/${user.uid}/profile_photo.jpg`);

        try {
          const url = await getDownloadURL(storageRef);
          console.log('Fetched photo URL:', url);
          setPhotoURL(url);
        } catch (error) {
          console.log('Error fetching user photo:', error);
        }
      } else {
        console.log('User not authenticated');
      }
    };

    fetchData();
  }, []);

  // ...
const [errorMessage, setErrorMessage] = useState('');

// ...

const handleLogout = async () => {
  const auth = getAuth(firebaseApp);
  try {
    await auth.signOut();
    navigation.navigate('Login');
  } catch (error) {
    setErrorMessage(`Error logging out: ${error.message}`);
  }
};

return (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome, {firstName} {lastName}!</Text>
    {photoURL ? (
      <Image source={{ uri: photoURL }} style={styles.photo} />
    ) : (
      <Text style={styles.photoPlaceholder}>No Photo Available</Text>
    )}
    <Text style={styles.email}>{email}</Text>
    {errorMessage ? (
      <Text style={styles.error}>{errorMessage}</Text>
    ) : null}
  </View>
);
    };
// ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: 'cur',
    color: '#000',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  photoPlaceholder: {
    fontSize: 18,
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginDetails;
