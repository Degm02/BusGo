import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Delete = () => {
	
	const navigation = useNavigation();

	const Loading =() => {
		navigation.navigate('Loading');
	};

	return (
		<View 
		style={styles.container}
		behavior="padding"
		>	
			<Image style={styles.logo} source={require('../assets/Trash.png')} />
			<Text style={[styles.indicacion, {top:351}]}>Tu cuenta a sido eliminada</Text>
		
			<TouchableOpacity 
			onPress={Loading}
			style={styles.button}
			>
				<Text style={styles.buttonText}>Ir al inicio</Text>
			</TouchableOpacity>
		</View>
)
}

export default Delete

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
		width: 150,
		height: 150,
		top: 181,
	},
	indicacion: {
		position: 'absolute',
    fontSize: 40,
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