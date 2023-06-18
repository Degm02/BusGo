import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const LogOut = () => {
	
	const navigation = useNavigation();

	const Login =() => {
		navigation.navigate('Login');
	};

	return (
		<View 
		style={styles.container}
		behavior="padding"
		>	
			<Image style={styles.logo} source={require('../assets/Logo.png')} />
			<Text style={[styles.indicacion, {top:102}]}>Sesion Finalizada</Text>
		
			<TouchableOpacity 
			onPress={Login}
			style={styles.button}
			>
				<Text style={styles.buttonText}>Iniciar Sesion</Text>
			</TouchableOpacity>
		</View>
)
}

export default LogOut

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#0C9CED',
    alignItems: 'center',
    justifyContent: 'center',
	},
	logo: {
		resizeMode: 'cover',
		position: 'absolute',
		height: 135,
		width: '70%',
	},
	indicacion: {
		position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
  },
	button: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
		position: 'absolute',
		top: 718,
  },
  buttonText: {
    color: '#0C9CED',
    fontWeight: '700',
    fontSize: 16,
  },
})