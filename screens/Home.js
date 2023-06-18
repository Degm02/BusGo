import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../firebase-config';

const Home = () => {
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);

  useEffect(() => {
		// Obtener referencia a la tabla "ciudad" en la base de datos
		const db = getDatabase();
		const citiesRef = ref(db, 'ciudad');
	
		// Escuchar cambios en la tabla "ciudad"
		onValue(citiesRef, (snapshot) => {
			const data = snapshot.val();
	
			// Verificar si existen datos en la tabla "ciudad"
			if (data) {
				// Obtener los datos del registro 1
				const ciudadID = data[1].ciudadID;
				const ciudades = Object.values(data[1].ciudades);
				const nombre = data[1].nombre;
	
				// Crear un objeto ciudad con los datos obtenidos
				const cityObject = {
					id: ciudadID,
					name: nombre,
					coordinates: ciudades,
				};
	
				// Actualizar el estado con la ciudad
				setCities([cityObject]);
			}
		});

    // Devolver una función de limpieza para detener la escucha de cambios
    return () => {
      // Detener la escucha de cambios en la tabla "ciudad"
      // (si es necesario)
    };
  }, []);

  const Search = () => {
    navigation.navigate('Search');
  };

  const Profile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>

      <MapView style={styles.map} initialRegion={{ latitude: 26.9079, longitude: -101.42109, latitudeDelta: 0.18, longitudeDelta: 0.18 }}>
        {cities.map((city) => (
          <Marker
            key={city.id}
            coordinate={{
              latitude: city.coordinates[0][0],
              longitude: city.coordinates[0][1],
            }}
            title={city.name}
          />
        ))}
      </MapView>

			<Text style={styles.titulo}>Home</Text>

      <View style={styles.opciones}>
        <TouchableOpacity style={[styles.opcionesContainer, { shadowOpacity: 0.35 }]}>
          <Image source={require('../assets/HomeO.png')} style={styles.icon} />
          <Text style={styles.opcionesText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.opcionesContainer, { opacity: 0.65 }]} onPress={Search}>
          <Image source={require('../assets/SearchO.png')} style={styles.icon} />
          <Text style={styles.opcionesText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.opcionesContainer, { opacity: 0.65 }]} onPress={Profile}>
          <Image source={require('../assets/ProfileO.png')} style={styles.icon} />
          <Text style={styles.opcionesText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  map: {
    flex: 1,
    width: '100%',
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
});
