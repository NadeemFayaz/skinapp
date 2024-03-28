import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { ActivityIndicator, FAB, PaperProvider, Portal } from 'react-native-paper';
import { PLUS, CAMERA, IMAGE, CROSS } from '../assets';
import ImagePicker from 'react-native-image-crop-picker';
import Resizer from 'react-native-image-resizer';
import axios from 'axios';
import Final from './Final';
import { useNavigation } from '@react-navigation/native';
import { Dialog, Button } from 'react-native-paper';

interface CameraProps {
    children: React.ReactNode;

}

const Camera = ({ children }: CameraProps) => {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const processImage = (image: any, type: string) => {
        setIsLoading(true);
        try {
            Resizer.createResizedImage(image.path ? image.path : image.uri, 200, 200, 'JPEG', 100, 0, null)
                .then((response) => {
                    const data = new FormData();
                    data.append('file', {
                        uri: response.uri,
                        type: 'image/jpeg',
                        name: 'image.jpg',
                    });
                    axios.post('https://legal-rat-terminally.ngrok-free.app/' + type, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then((response) => {
                        setIsLoading(false);
                        if(response.data.error){
                            Alert.alert('Error', response.data.error);
                            return;
                        }
                        navigation.navigate('Disease Info', { data: response.data });
                    }).catch((error) => {
                        setIsLoading(false);
                        console.log(error);
                    });
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                });
        } catch (error) {
            setIsLoading(false);
            throw new Error("Failed to process image")
        }
    }

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
    };

    const handleAllergies = () => {
        setVisible(false);
        processImage(selectedImage, 'allergy');
    }

    const handleSkin = () => {
        setVisible(false);
        processImage(selectedImage, 'skin');
    }

    return (
        <PaperProvider>
            {isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" /></View>
            : (
            <Portal>
                {children}
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <Dialog.Title>Choose an option below:</Dialog.Title>
                    <Dialog.Content>
                        <Button onPress={handleAllergies}>Allergies</Button>
                        <Button onPress={handleSkin}>Skin</Button>
                    </Dialog.Content>
                </Dialog>
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
                                        setSelectedImage(response && response.assets ? response.assets[0] : null);
                                        setVisible(true);
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
                                    setSelectedImage(image);
                                    setVisible(true);
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
            )}
        </PaperProvider>
    );
}

export default Camera;