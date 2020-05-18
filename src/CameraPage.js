import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';


const CameraPage = () => {
    const [permissions, setPermissions] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        const fetchStatus = async () => {
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            console.log(camera.status);
            setPermissions(camera.status === 'granted');
        };
        fetchStatus();
    },[]);


    if (permissions === null) return <View/>;
    else if (permissions === false) return <Text>No access to camera</Text>;
    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 20}} type={cameraType}>

            </Camera>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                    <Ionicons
                        name="ios-photos"
                        style={{ color: "#111", fontSize: 40}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                    <FontAwesome
                        name="camera"
                        style={{ color: "#111", fontSize: 40}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                    <MaterialCommunityIcons
                        name="camera-switch"
                        style={{ color: "#111", fontSize: 40}}
                    />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default CameraPage;
