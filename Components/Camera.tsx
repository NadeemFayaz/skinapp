import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { FAB, PaperProvider, Portal } from 'react-native-paper';
import { PLUS,CAMERA,IMAGE,CROSS } from '../assets';
import ImagePicker from 'react-native-image-crop-picker';
import Resizer from 'react-native-image-resizer';
import axios from 'axios';
import Final from './Final';
import { useNavigation } from '@react-navigation/native';

interface CameraProps {
    children: React.ReactNode;
   
}

const Camera = ({ children }: CameraProps) => {
    const navigation = useNavigation();

    const processImage = (image: any) => {
        try {
            Resizer.createResizedImage(image.path ? image.path : image.uri, 200, 200, 'JPEG', 100, 0, null)
                .then((response) => {
                    const data = new FormData();
                    data.append('file', {
                        uri: response.uri,
                        type: 'image/jpeg',
                        name: 'image.jpg',
                    });
                    axios.post('https://legal-rat-terminally.ngrok-free.app/skin', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then((response) => {
                        navigation.navigate('Disease Info', { data: response.data});
                    }).catch((error) => {
                        console.log(error);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            throw new Error("Failed to process image")
        }
    }
    const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open : boolean}) => setState({ open });

  const { open } = state;

    const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
    };

    return (
        <PaperProvider>
      <Portal>
        {children}
                <FAB.Group
                    visible={true}
                    open={open}
                    icon={open ? CROSS : PLUS}
                    actions={[
                        {
                            icon: CAMERA,
                            label: 'Take Photo',
                            onPress: () => launchCamera(options, (response) => {
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.errorCode) {
                                    console.log('ImagePicker Error: ', response.errorMessage);
                                } else {
                                    try {
                                        console.log(response);
                                        processImage(response && response.assets ? response.assets[0] : null);
                                    } catch (error) {
                                        throw new Error("Failed to process image")
                                    }
                                }
                            })
                        },
                        {
                            icon: IMAGE,
                            label: 'Choose Image',
                            onPress: () => ImagePicker.openPicker({
                                cropping: true,
                                freeStyleCropEnabled: true,
                            }).then(image => {
                                try {
                                    processImage(image);
                                } catch (error) {
                                    throw new Error("Failed to process image")
                                }
                            }).catch(err => {
                                console.error(err);
                            })
                        }
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
            </PaperProvider>
    );
}

export default Camera;