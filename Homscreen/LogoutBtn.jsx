import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


const LogoutBtn = () => {
    const navigation = useNavigation();
  
    const handleLogout = async () => {
        const auth = getAuth(firebaseApp);
        await auth.signOut();
        navigation.navigate('Login');
      };
    
  return (
    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogoutBtn

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: '#f4511e',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width:90,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
      },
      logoutButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
      },
})