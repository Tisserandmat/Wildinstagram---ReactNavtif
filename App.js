import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImagesScreen from './screen/ImagesScreen';                                         //import de toutes les différentes pages
import CameraScreen from './screen/CameraScreen';
import FeedScreen from './screen/FeedScreen';
import { NavigationContainer } from '@react-navigation/native';                        // les différents packages installé
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";                                   // néssaisaire a l'icone


const Tab = createBottomTabNavigator();                                             // création des boutons de navigation

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({                           //Utilisation du tab navigator pour pouvoir naviger entre les différentes pages
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;                                                       // variable pour l'icones
          if (route.name === 'FeedScreen') {                               // récupére la route du ficher FeedScreen depuis le name de
                                                                           //  <Tab.Screen name="FeedScreen" component={FeedScreen} />  
            iconName = focused ? 'home' : 'home-outline';                   // utilisation du ternaire pour focus ou non l'icone
          }
          else if (route.name === 'CameraScreen')                         // récupére la route du ficher CameraScreen qui correspond au name de 
                                                                         // <Tab.Screen name="CameraScreen" component={CameraScreen} />
          { iconName = focused ? 'camera' : 'camera-outline'; }          // utilisation du ternaire pour focus ou non l'icone

          else if (route.name === 'ImagesScreen')                      //récupére la route du ficher ImagesScreen qui correspond au name de 
                                                                      //  <Tab.Screen name="ImagesScreen" component={ImagesScreen} />

           { iconName = focused ? 'image' : 'image-outline'; }       // utilisation du ternaire pour focus ou non l'icone 
                                                                    

          return <Ionicons name={iconName} size={size} color={color} />;
        }, tabBarActiveTintColor: '#ed6c6d', tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="FeedScreen" component={FeedScreen} />          
        <Tab.Screen name="CameraScreen" component={CameraScreen} />
        <Tab.Screen name="ImagesScreen" component={ImagesScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
