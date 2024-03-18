import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { FAB, PaperProvider, Portal } from 'react-native-paper';
import { PLUS,CAMERA,IMAGE,CROSS } from '../assets';
import ImagePicker from 'react-native-image-crop-picker';
import Resizer from 'react-native-image-resizer';

const Camera = ({children}: {children: React.ReactNode}) => {
    useEffect(() =>
    {
        console.log('Camera');
    }
    , []);
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
                                } else if (response.errorMessage) { // Fix: Replace 'response.error' with 'response.errorMessage'
                                    console.log('ImagePicker Error: ', response.errorMessage); // Fix: Replace 'response.error' with 'response.errorMessage'
                                } else {
                                    // Use the path from the response to open the cropper
                                    ImagePicker.openCropper({
                                        mediaType: 'photo',
                                        path: response.path,
                                        width: 300,
                                        height: 400,
                                    }).then(image => {
                                        console.log(image);
                                    });
                                }
                            }),
                        },
                        {
                            icon: IMAGE,
                            label: 'Choose Image',
                            onPress: () => ImagePicker.openPicker({
                                cropping: true,
                                freeStyleCropEnabled: true,
                            }).then(image => {
                                console.log(image);
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