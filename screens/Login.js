import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';

const Login = () => {
	
	const navigation = useNavigation();
	const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('Usuario autenticado:', user.uid);
				navigation.navigate('Home');
			})
			.catch((error) => {
				// Manejo de errores en la autenticación
				console.error('Error en la autenticación:', error);
				Alert.alert(error.message);
			});
	};

	const Registro = () => {
    navigation.navigate('SignUp');
  };

	const Home =() => {
		navigation.navigate('Home');
	};

	return (
		<KeyboardAvoidingView 
		style={styles.container}
		behavior="padding"
		>	
			<Image style={styles.logo} source={require('../assets/Logo.png')} />
			<Text style={[styles.indicacion, {top:418}]}>Bienvenido de vuelta</Text>
			
			<View style={[styles.formInicio, {top:464}]}>
			<View style={styles.inputContainer}>
			<View style={styles.iconContainer}>
			<Image
          source={require('../assets/CorreoBlue.png')}
          style={styles.icon}
        />
			</View>
			<TextInput
			 placeholder="Correo Electronico"
			 value={email}
			 onChangeText={text => setEmail(text)}
			 style={styles.input}
			/>
			</View>
			<View style={styles.inputContainer}>
			<View style={styles.iconContainer}>
			<Image
          source={require('../assets/ContraBlue.png')}
          style={styles.icon}
        />
			</View>
			<TextInput
			 placeholder="Contrasena"
			 value={password}
			 onChangeText={text => setPassword(text)}
			 style={styles.input}
			 secureTextEntry
			/>
			</View>
		<View style={styles.buttonContainer}>
			<TouchableOpacity 
			onPress={handleSignIn}
			style={styles.button}
			>
				<Text style={styles.buttonText}>Iniciar Sesion</Text>
			</TouchableOpacity>
		</View>
		<TouchableOpacity 
			onPress={Registro}
			>
				<Text style={styles.littleText}>Crear cuenta nueva</Text>
			</TouchableOpacity>
		</View>
		</KeyboardAvoidingView>
)
}

export default Login

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
		top: 176,
	},
	indicacion: {
		position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
		color: 'white',
    opacity: 0.8,
  },
	formInicio: {
		position: 'absolute',
    width: '100%',
    height: '50%',
		backgroundColor: 'white',
		borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
	},
	inputContainer: {
    width: '80%',
		flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
	iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 4,
		borderColor: '#84888C',
		borderWidth: 1,
    width: '90%',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
	button: {
    backgroundColor: '#0C9CED',
    width: '100%',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
	littleText: {
		flexDirection: 'column',
    fontSize: 14,
    fontWeight: 'bold',
		color: '#84888C',
    marginTop: 15,
	},
})