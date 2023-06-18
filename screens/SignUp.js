import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const SignUp = () => {
	
	const navigation = useNavigation();
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	const Login = () => {
    navigation.navigate('Login');
  };

	const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const auth = getAuth(initializeApp(firebaseConfig));
      const firestore = getFirestore(initializeApp(firebaseConfig));
      const usersCollectionRef = collection(firestore, 'users');

      // Crear el usuario en la autenticación de Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crea un nuevo documento en la colección 'users' con los datos proporcionados
      await addDoc(usersCollectionRef, {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
				userId: user.uid,
      });

      console.log('Usuario registrado y datos guardados en Firestore');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al registrar el usuario y guardar los datos en Firestore:', error);
			Alert.alert(error.message);
    }
  };

	return (
		<KeyboardAvoidingView 
		style={styles.container}
		behavior="padding"
		>	
			<Image style={styles.logo} source={require('../assets/Logo.png')} />
			<Text style={[styles.indicacion, {top:318}]}>Creando nueva cuenta</Text>
			
			<View style={[styles.formInicio, {top:368}]}>
			<View style={styles.inputContainer}>
			<View style={styles.iconContainer}>
			<Image
          source={require('../assets/ContactBlue.png')}
          style={styles.icon}
        />
			</View>
			<TextInput
			 placeholder="Nombre"
			 value={name}
			 onChangeText={text => setName(text)}
			 style={styles.input}
			/>
			</View><View style={styles.inputContainer}>
			<View style={styles.iconContainer}>
			<Image
          source={require('../assets/ContactBlue.png')}
          style={styles.icon}
        />
			</View>
			<TextInput
			 placeholder="Apellido"
			 value={lastName}
			 onChangeText={text => setLastName(text)}
			 style={styles.input}
			/>
			</View>
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
			<View style={styles.inputContainer}>
			<View style={styles.iconContainer}>
			<Image
          source={require('../assets/ContraBlue.png')}
          style={styles.icon}
        />
			</View>
			<TextInput
			 placeholder="Repita Contrasena"
			 value={confirmPassword}
			 onChangeText={text => setConfirmPassword(text)}
			 style={styles.input}
			 secureTextEntry
			/>
			</View>
		<View style={styles.buttonContainer}>
			<TouchableOpacity 
			onPress={handleSignUp}
			style={styles.button}
			>
				<Text style={styles.buttonText}>Crear cuenta</Text>
			</TouchableOpacity>
		</View>
		<TouchableOpacity 
			onPress={Login}
			>
				<Text style={styles.littleText}>Ya tienes cuenta? Inicia Sesion</Text>
			</TouchableOpacity>
		</View>
		</KeyboardAvoidingView>
		
)
}

export default SignUp

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
    height: '60%',
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