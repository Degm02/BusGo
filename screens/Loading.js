import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function Loading () {
	const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login');
  };

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
			<Image style={styles.logo} source={require('../assets/Logo.png')} />
			<View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Presiona cualquier lugar de la pantalla:D</Text>
      </View>
      </View>
    </TouchableWithoutFeedback>
	);  
}

export default Loading

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#0C9CED',
    alignItems: 'center',
    justifyContent: 'center',
  },
	logo: {
		resizeMode: 'cover',
		height: 135,
		width: '70%',
	},
	bottomTextContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: 'bold',
		color: 'white',
    opacity: 0.8,
  },
});