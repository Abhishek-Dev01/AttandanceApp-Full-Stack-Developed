import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TopHeader from '../Homscreen/TopHeader';
import LoginDetails from '../Homscreen/LoginDetails';
import LogoutBtn from '../Homscreen/LogoutBtn';
import { Images } from '../config/Images';
import firebaseApp from '../config/FirebaseConfig';
import HomeInButton from '../Homscreen/HomeInButton';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, stay on the home screen
        console.log('User is logged in');
      } else {
        // User is not logged in, navigate to the login screen
        console.log('User is not logged in');
        navigation.navigate('Login');
      }
    });

    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await auth.signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TopHeader />
      <View style={styles.logoutContainer}>
        <LogoutBtn onPress={handleLogout} />
      </View>
      <View style={styles.contentContainer}>
        <LoginDetails />
        <Image source={Images.line} style={styles.lineImage} />
        {/* Add additional components and functionality for attendance management */}
      </View>
      <View style={{ top: -250 }}>
        <HomeInButton />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  logoutContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:-80,
    
  },
  lineImage:{
    width:400,
    top:-10
  }
});

export default HomeScreen;
