// import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
// import React, { useEffect } from 'react';
// import { Alert, View } from 'react-native';
// import { ActivityIndicator, FAB, PaperProvider, Portal } from 'react-native-paper';
// import { PLUS, CAMERA, IMAGE, CROSS } from '../assets';
// import axios from 'axios';
// import Final from './Final';
// import { useNavigation } from '@react-navigation/native';
// import { Dialog, Button } from 'react-native-paper';

// const navigation = useNavigation();
// const processImage = (image: any, type: string) => {
//     try {
//         Resizer.createResizedImage(image.path ? image.path : image.uri, 200, 200, 'JPEG', 100, 0, null)
//             .then((response) => {
//                 const data = new FormData();
//                 data.append('file', {
//                     uri: response.uri,
//                     type: 'image/jpeg',
//                     name: 'image.jpg',
//                 });
//                 axios.post('https://legal-rat-terminally.ngrok-free.app/' + type, data, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }).then((response) => {
//                     setIsLoading(false);
//                     if (response.data.error) {
//                         Alert.alert('Error', response.data.error);
//                         return;
//                     }
//                     navigation.navigate('Disease Info', { data: response.data });
//                 }).catch((error) => {
//                     setIsLoading(false);
//                     console.log(error);
//                 });
//             })
//             .catch((err) => {
//                 setIsLoading(false);
//                 console.log(err);
//             });
//     } catch (error) {
//         setIsLoading(false);
//         throw new Error("Failed to process image")
//     }
// }





