import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './screens/Loading';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Search from './screens/Search';
import Profile from './screens/Profile';
import Delete from './screens/Delete';
import LogOut from './screens/LogOut';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Loading" component={Loading}/>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}/>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home}/>
        <Stack.Screen options={{headerShown: false}} name="Search" component={Search}/>
        <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile}/>
        <Stack.Screen options={{headerShown: false}} name="Delete" component={Delete}/>
        <Stack.Screen options={{headerShown: false}} name="LogOut" component={LogOut}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};