import React, { useState, useEffect, useRef } from "react";           // importe des différent hooks nécessaire
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';    // néssaisaire à la cameras
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImageManipulator from "expo-image-manipulator";





const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);                      // utilisation des différents hooks


    useEffect(() => {                                   // function useEffect qui est asynchrone     
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();   // grace a la destructuration d'object j'instancie une variable status qui                                                                                            
            setHasPermission(status === 'granted');                       // va aller chercher une réponse de l'object Camera.requestPermission

        })();                                                          // et grace a useState  je lui set un statut granted
    }, []);
    if (hasPermission === null) {                                    // permet de géré les cas ou la permission na pas le résultat attendus
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (

        <>
            <View style={styles.container}>

                <Camera style={styles.camera} ref={cameraRef} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back

                                );
                            }}>
                            <Ionicons name="camera-reverse-outline" style={styles.icone} //icone pour changer la cameras
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewPic}>
                        <Ionicons name="camera-outline" style={styles.iconePic} // icone pour prendre des photos
                            onPress={async () => {
                                try {
                                    const pictureMetadata = await cameraRef.current.takePictureAsync();
                                    console.log("pictureMetadata", pictureMetadata);
                                    console.log(
                                        await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
                                            { resize: { width: 800 } },
                                        ])
                                    );
                                } catch (err) {
                                    console.log(err)
                                }
                            }}
                        />
                        </View>
                        
                </Camera>
            </View>
        </>
    );
}

const styles = StyleSheet.create({                                   //style de la page cameraScreen
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "transparent",
        flexDirection: 'row',
        margin: 20,

    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    icone: {
        color: "#fff",
        fontSize: 30,
        backgroundColor: "transparent",

    },
    iconePic: {
        fontSize: 50,
        color: "#fff",
        marginBottom: 10,
        backgroundColor: "transparent",

    },
    viewPic: {
        flex: 1,
        backgroundColor: "transparent",
        fontSize: 30,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 10,

    },
})
export default CameraScreen;   // export pour pouvoir faire un import dans le App.js
