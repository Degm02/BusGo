import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Search = () => {
	
	const navigation = useNavigation();

	const Home = () => {
    navigation.navigate('Home');
  };
	const Profile =() => {
		navigation.navigate('Profile');
	};

	return (
		<View 
		style={styles.container}
		behavior="padding"
		>	
			<Text style={styles.titulo}>Buscar</Text>

			<View style={styles.searchContainer}>
			<TextInput
			 placeholder="Buscar"
			 value={""}
			 style={styles.search}
			/>
			<View style={styles.iconSearch}>
			<Image
          source={require('../assets/SearchO.png')}
          style={styles.iconS}
        />
			</View>
			</View>

			<View style={styles.rutaContainer}>
			<Text style={styles.rutaTitulo}>Rutas mas conocidas</Text>
			<Image
          source={require('../assets/Directo.png')}
          style={styles.rutaFoto}
        />
			<Text style={styles.rutaNombre}>Directo</Text>
			</View>

			<View style={styles.rutaContainer}>
			<Text style={styles.rutaTitulo}>Rutas mas conocidas</Text>
			<Image
          source={require('../assets/FloresBorja.png')}
          style={styles.rutaFoto}
        />
			<Text style={styles.rutaNombre}>Flores Borja</Text>
			</View>

			{/*menu*/}
			<View style={styles.opciones}>
			<TouchableOpacity 
			style={[styles.opcionesContainer, {opacity:0.65}]}
			onPress={Home}
			>
			<Image
          source={require('../assets/HomeO.png')}
          style={styles.icon}
        />
			<Text style={styles.opcionesText}>Home</Text>
			</TouchableOpacity>
			<TouchableOpacity 
			style={[styles.opcionesContainer, {shadowOpacity: 0.35}]}
			>
			<Image
          source={require('../assets/SearchO.png')}
          style={styles.icon}
        />
				<Text style={styles.opcionesText}>Buscar</Text>
			</TouchableOpacity>
			<TouchableOpacity 
			style={[styles.opcionesContainer, {opacity:0.65}]}
			onPress={Profile}
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

export default Search

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	searchContainer: {
    width: '90%',
		backgroundColor: '#0C9CED',
		opacity: 0.85,
		flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
		position: 'absolute',
		top: 116,
		height: 50,
  },
	iconSearch: {
    marginRight: 10,
  },
  iconS: {
    width: 20,
    height: 20,
  },
  search: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 4,
    width: '90%',
  },
	rutaContainer: {
		width: '90%',
		height: 234,
		backgroundColor: '#DDDEDF',
		flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
		marginTop: 30,
	},
	rutaTitulo: {
		fontSize: 12,
		color: '#787878',
	},
	rutaNombre : {
    fontSize: 25,
    fontWeight: 'bold',
		color: '#2C2B34',
	},
	rutaFoto : {
		width: 230,
    height: 170,
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