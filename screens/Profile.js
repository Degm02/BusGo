import React, { useState, useEffect  } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getFirestore, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut, deleteUser  } from 'firebase/auth';

const Profile = () => {

	const navigation = useNavigation();

	const [userData, setUserData] = useState({});

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const auth = getAuth();
				onAuthStateChanged(auth, async (user) => {
					if (user) {
						// Obtener los datos del usuario
					} else {
						// No hay usuario autenticado, hacer algo (redirigir a la página de inicio de sesión, mostrar un mensaje, etc.)
					}
				});
			} catch (error) {
				console.error('Error al obtener los datos del usuario:', error);
			}
		};
	
		fetchUserData();
	}, []);
	
	const handleDeleteAccount = async () => {
		try {
			const auth = getAuth();
			const user = auth.currentUser;
	
			if (user) {
				const userId = user.uid;
	
				// Eliminar el usuario de la autenticación
				await deleteUser(user);
				navigation.navigate('Delete');
	
				// Eliminar el documento del usuario de la colección "users"
				const firestore = getFirestore();
				const userDocRef = doc(firestore, 'users', userId);
				const userDocSnapshot = await getDoc(userDocRef);
				
				if (userDocSnapshot.exists()) {
					// El documento existe, proceder con la eliminación
					await deleteDoc(userDocRef);
				} else {
					// El documento no existe, mostrar un mensaje de error o realizar alguna acción alternativa
					console.log('El documento no existe');
				}
	
			}
		} catch (error) {
			console.error('Error al eliminar la cuenta:', error);
			console.log('Código de error:', error.code); // Mostrar el código de error específico, si está disponible
		}
	};	
	

	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
	
			// Verificar el estado de autenticación
			onAuthStateChanged(auth, (user) => {
				if (!user) {
					console.log('Se cerró la sesión correctamente');
					navigation.navigate('LogOut');
				}
			});
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
		}
	};

	

	
	//Navegacion entre las opciones
	const Home = () => {
		navigation.navigate('Home');
	};
	const Search = () => {
		navigation.navigate('Search');
	};

	return (
		<View
			style={styles.container}
			behavior="padding"
		>
			<Text style={styles.titulo}>Perfil</Text>

			{/*Datos del Usuario*/}
			<View style={styles.dataContainer}>
				<View style={styles.circularImageContainer}>
					<Image
						source={require('../assets/PhotoProfile.jpg')}
						style={styles.circularImage}
					/>
				</View>
				<Text style={styles.nameComplete}>{userData?.name} {userData?.lastName}</Text>
			</View>

			{/*Info del Usuario*/}
			<View style={[styles.rectangulo, { top: 296 }]}>
  {Object.keys(userData).length > 0 ? (
    <>
      <View style={styles.rectanguloContainer}>
        <View style={styles.iconIzq}>
          <Image
            source={require('../assets/Email.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.infoText}>
          {userData['email']}
        </Text>
      </View>
      <View style={styles.rectanguloContainer}>
        <View style={styles.iconIzq}>
          <Image
            source={require('../assets/Unio.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.infoText}>
          Día de registro: {userData['createdAt']?.toDate().toLocaleDateString()}
        </Text>
      </View>
    </>
  ) : (
    <Text style={styles.infoText}>Cargando datos...</Text>
  )}
</View>

			{/*Opciones extra*/}
			<View style={[styles.rectangulo, { top: 530 }]}>
				<TouchableOpacity
 				style={styles.rectanguloContainer}
  			onPress={handleDeleteAccount}>
					<View style={styles.iconIzq}>
						<Image
      			source={require('../assets/Delete.png')}
      			style={styles.icon}
    				/>
					</View>
  				<Text style={styles.opcionesExtraText}>
    			Eliminar Cuenta
  				</Text>
  				<View style={styles.iconDer}>
    				<Image
      			source={require('../assets/Press.png')}
      			style={styles.icon}
    				/>
  				</View>
				</TouchableOpacity>

				<TouchableOpacity
  			style={styles.rectanguloContainer}
  			onPress={handleLogout}
				>
  				<View style={styles.iconIzq}>
    				<Image
      			source={require('../assets/LogOut.png')}
      			style={styles.icon}
    				/>
  				</View>
  				<Text style={styles.opcionesExtraText}>
    			Cerrar sesión
  				</Text>
  				<View style={styles.iconDer}>
   					<Image
      			source={require('../assets/Press.png')}
      			style={styles.icon}
    			/>
  				</View>
				</TouchableOpacity>
			</View>

			{/*Menu de opciones*/}
			<View style={styles.opciones}>
				<TouchableOpacity
					style={[styles.opcionesContainer, { opacity: 0.65 }]}
					onPress={Home}
				>
					<Image
						source={require('../assets/HomeO.png')}
						style={styles.icon}
					/>
					<Text style={styles.opcionesText}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.opcionesContainer, { opacity: 0.65 }]}
					onPress={Search}
				>
					<Image
						source={require('../assets/SearchO.png')}
						style={styles.icon}
					/>
					<Text style={styles.opcionesText}>Buscar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.opcionesContainer, { shadowOpacity: 0.35 }]}
				>
					<Image
						source={require('../assets/ProfileO.png')}
						style={styles.icon}
					/>
					<Text style={styles.opcionesText}>Perfil</Text>
				</TouchableOpacity>
			</View>

		</View>
	)
}

export default Profile

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titulo: {
		position: 'absolute',
		fontSize: 40,
		fontWeight: 'bold',
		color: '#444A51',
		left: 30,
		top: 30,
	},
	dataContainer: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		top: 98,
	},
	circularImageContainer: {
		width: 120,
		height: 120,
		borderRadius: 75,
		overflow: 'hidden',
	},
	circularImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	nameComplete: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#444A51',
		marginTop: 10,
	},
	location: {
		fontSize: 12,
		fontWeight: 'semibold',
		color: '#787878',
	},
	rectangulo: {
		position: 'absolute',
		padding: 20,
		width: '80%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderColor: '#84888C',
		borderRadius: 20,
		shadowOpacity: 0.5,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 5,
	},
	rectanguloContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	infoText: {
		color: '#84888C',
		opacity: 0.75,
		fontWeight: 'semibold',
		fontSize: 14,
	},
	iconIzq: {
		marginRight: 10,
	},
	iconDer: {
    alignItems: 'flex-end',
	},
	opcionesExtraText: {
		color: '#000000',
		opacity: 0.75,
		fontWeight: 'bold',
		fontSize: 14,
	},
	opciones: {
		position: 'absolute',
    width: '95%',
    height: '10%',
		backgroundColor: '#0C9CED',
		borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
		flexDirection: 'row',
		top: 718,
	},
	opcionesText: {
    color: 'white',
		opacity: 0.75,
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 5,
	},
	opcionesContainer: {
    padding: 30,
		paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
})