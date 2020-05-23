import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const CameraPage = () => {
    const [permissions, setPermissions] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {

            if (Platform.OS === 'ios') {
                const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (cameraRoll.status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }

            const camera = await Permissions.askAsync(Permissions.CAMERA);
            setPermissions(camera.status === 'granted');
        };
        fetchStatus();
    },[]);

    const handleCameraType = () => {
        if (cameraType === Camera.Constants.Type.back) {setCameraType(Camera.Constants.Type.front)}
        else setCameraType(Camera.Constants.Type.back)
    };

    const takePicture = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
    }

    if (permissions === null) return <View/>;
    else if (permissions === false) return (<Text>No access to camera</Text>);
    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 1}} type={cameraType}
                    ref={ref => {setCameraRef(ref)}}>
                <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={()=>pickImage()}>
                        <Ionicons
                            name="ios-photos"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={()=>takePicture()}>
                        <FontAwesome
                            name="camera"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={()=>handleCameraType()}>
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

export default CameraPage;
