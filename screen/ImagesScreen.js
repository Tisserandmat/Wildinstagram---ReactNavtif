import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, FlatList } from "react-native";
import * as FileSystem from 'expo-file-system';
import { render } from "react-dom";




const ImagesScreen = () => {
    const [imagesURI, setImagesURI] = useState([]);
    useEffect(() => {
        (async () => {

            try {
                const images = await FileSystem.readDirectoryAsync(
                    FileSystem.cacheDirectory + "ImageManipulator"
                );
                console.log(images)
                setImagesURI(images);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    if (imagesURI.length > 0) {
        return <FlatList keyExtractor={({item}) => item} style={styles.list} data = {imagesURI} renderItem = {({item})=>{return <Image style={styles.img} source={{uri:FileSystem.cacheDirectory + "ImageManipulator/" + item}}/>}}/>

    } else {
        return <Text>pas d'image</Text>
    }
}

const styles = StyleSheet.create({
    img: {
        flex: 1,

        resizeMode: "cover",

        height: 300,

        margin: 20,
    },
    list:{
        flex: 1,
    }

});

export default ImagesScreen;  // export pour pouvoir faire un import dans le App.js