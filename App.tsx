import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Button, Card, Dialog, Icon, Text as PaperText } from 'react-native-paper';
import DiseaseCard from './Components/Card';
import TeamInfo, { TeamInfo as TeamInfoInterface } from './Components/TeamInfo';
import { createStackNavigator } from '@react-navigation/stack';
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { FAB, PaperProvider, Portal } from 'react-native-paper';
import { NADEEM, HOME, INFO, PAVAN, BANU, ABHISHEK, CAMERA, HISTORY,BLOG} from './assets';
import { Output } from './Components/Final';
import Auth from './Pages/auth';
import Final from './Components/Final';
import Doctor from './Components/Doctor';
import { Disease } from './Components/Card';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Resizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import DiseaseHistory from './Components/DiseaseHistory';

const teamDetails: TeamInfoInterface[] = [
  {
    id: 1,
    name: 'Nadeem Fayaz',
    usn: '1AM20CS123',
    image: NADEEM,
    email: 'iamabnadeem99@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nadeemfayaz99/',
  },
  {
    id: 2,
    name: 'Pavan Chowdri M',
    usn: '1AM20CS134',
    image: PAVAN,
    email: 'pavanchowdri2003@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pavan-chowdri-m-226a55212/',
  },
  {
    id: 3,
    name: 'R Banu Prakash',
    usn: '1AM20CS150',
    image: BANU,
    email: 'banu87947@gmail.com',
    linkedin: 'https://www.linkedin.com/in/r-banu-prakash-248553232/',
  },
  {
    id: 4,
    name: 'Abhishek G',
    usn: '1AM20CS006',
    image: ABHISHEK,
    email: 'abhishekabu0155@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abhishek-g-8a835b283/',
  }
];

import axios from 'axios';

import { useState, type PropsWithChildren, useCallback, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
function HomeScreen() {
  const options = {
    mediaType: 'photo' as MediaType,
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
  };

  const [state, setState] = React.useState({ open: false });
  const [isLoading, setIsLoading] = React.useState(true); // New state variable

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const [diseaseData, setDiseaseData] = useState<Disease[]>([]);

  React.useEffect(() => {
    if (diseaseData.length !== 0) {
      return;
    }
    const getDiseaseData = () => {
      setIsLoading(true); // Set loading to true before request
      axios.get('https://legal-rat-terminally.ngrok-free.app/diseases')
        .then((response) => {
          const res = response.data;
          const data = res.Diseases;
          setDiseaseData(data);
          setIsLoading(false); // Set loading to false after successful request
        })
        .catch((error) => {
          setIsLoading(false); // Set loading to false even if request fails
        });
    }
    getDiseaseData();
  }, [diseaseData]);

  const { open } = state;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        <View style={{ width: '100%', height: 100, backgroundColor: 'violet', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 20, justifyContent: 'center', textAlign: 'center' }}>Please use the plus icon at the bottom right corner to upload the image for diagonosis</Text>
        </View>
        {isLoading ? ( // Use isLoading to conditionally render
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          diseaseData.map((disease) => (
            <DiseaseCard disease={disease} key={disease.id} />
          ))
        )}
      </ScrollView>
    </View>
  );
}



function InfoScreen() {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <TeamInfo teamInfo={teamDetails} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const navigationRef = React.createRef();

const options = {
  mediaType: 'photo' as MediaType,
  includeBase64: false,
  maxHeight: 200,
  maxWidth: 200,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [email, setEmail] = useState('' as string);
  const [resetkey, setResetKey] = useState(0);

  const snapPoints = React.useMemo(() => ['25%', '30%'], []);

  const handleAllergies = (selectedImage: any) => {
    processImage(selectedImage, 'allergy');
  }

  const processImage = (image: any, type: string) => {
    try {
      Resizer.createResizedImage(image.path ? image.path : image.uri, 200, 200, 'JPEG', 100, 0, null)
        .then((response) => {
          const data = new FormData();
          data.append('file', {
            uri: response.uri,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
          data.append('email', email);
          axios.post('https://legal-rat-terminally.ngrok-free.app/' + type, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((response) => {
            setIsLoading(false);
            if (response.data.error) {
              setOpenDialog
              Alert.alert('Error', response.data.error);
              return;
            }
            console.log(response.data);
            navigationRef.current?.navigate('Disease Info', { data: response.data });
            setOpenDialog(false);
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

  const handleSkin = (selectedImage: any) => {
    processImage(selectedImage, 'skin');
  }

  const launchCameraFunction = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setSelectedImage(response && response.assets ? response.assets[0] : null);
        bottomSheetModalRef.current?.dismiss();
        setOpenDialog(true);
      }
    });
  };

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage);
    }
  }, [selectedImage]);


  const launchImagePickerFunction = () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      try {
        setSelectedImage(image);
        bottomSheetModalRef.current?.dismiss();
        setOpenDialog(true);

      } catch (error) {
        throw new Error("Failed to process image")
      }
    }).catch(err => {
      console.error(err);
    });
  };

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      {!isAuthenticated ? <Auth setIsAuthenticated={setIsAuthenticated} setEmail={setEmail} />
        : (
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <NavigationContainer ref={navigationRef}>
                <Tab.Navigator
                  screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                      position: 'absolute',
                      bottom: 10,
                      left: 20,
                      right: 20,
                      backgroundColor: '#ffff',
                      borderRadius: 15,
                      height: 60,
                      ...styles.shadow,
                    },
                  }}
                >
                  <Tab.Screen
                    name="HomeScreen"
                    component={StackNavigator}
                    options={{
                      tabBarShowLabel: false,
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Image
                            source={HOME}
                            resizeMode='contain'
                            style={{
                              width: 25,
                              height: 25,
                              tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                          />
                        </View>
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="blog"
                    component={DummyComponent}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Image
                            source={BLOG}
                            resizeMode='contain'
                            style={{
                              width: 25,
                              height: 25,
                              tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                          />
                        </View>
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Camera"
                    component={DummyComponent}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <Image
                          source={CAMERA}
                          resizeMode='contain'
                          style={{
                            width: 25,
                            height: 25,
                            tintColor: '#fff',
                          }}
                        />
                      ),
                      tabBarButton: (props) => (
                        <CustomTabBarButtom {...props} setIsCameraModalVisible={setIsCameraModalVisible} bottomSheetModalRef={bottomSheetModalRef} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Info"
                    component={InfoScreen}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Image
                            source={INFO}
                            resizeMode='contain'
                            style={{
                              width: 25,
                              height: 25,
                              tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                          />
                        </View>
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="History"
                    children={() => {
                      return <DiseaseHistory email={email} resetkey={resetkey} />;
                    }}
                    listeners={({ navigation }) => ({
                      focus: () => {
                        navigation.addListener('focus', () => {
                          setResetKey((prev) => prev + 1);
                        });
                      },
                    })}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Image
                            source={HISTORY}
                            resizeMode='contain'
                            style={{
                              width: 25,
                              height: 25,
                              tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                          />
                        </View>
                      )
                    }}
          
                  />                  
                </Tab.Navigator>
                
              </NavigationContainer>
              <Dialog visible={openDialog} onDismiss={() => setOpenDialog(false)}>
              <Dialog.Title>Choose an option below:</Dialog.Title>
              <Dialog.Content>
                <Button onPress={() => handleAllergies(selectedImage)}>Allergy Detection</Button>
                <Button onPress={() => handleSkin(selectedImage)}>Cancer Detection</Button>
              </Dialog.Content>
            </Dialog>
            </SafeAreaProvider>
            
            <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={1}
                  snapPoints={snapPoints}
                  onChange={() => console.log('callback!')}
                >
                  <BottomSheetView style={styles.contentContainer}>
                    <Button 
                      onPress={() => launchCameraFunction()} 
                      icon="camera" 
                      mode="contained"
                      buttonColor='white'
                      textColor='black'
                      style={{borderColor: 'black', borderWidth: 1, borderRadius: 10, width: 300, marginBottom: 10}}
                      contentStyle={{height: 50}}
                      labelStyle={{fontSize: 20}}
                    >
                      Camera
                    </Button>
                    <Button 
                      onPress={() => launchImagePickerFunction()} 
                      icon="image"
                      mode="contained"
                      buttonColor='white'
                      textColor='black'
                      style={{borderColor: 'black', borderWidth: 1, borderRadius: 10, width: 300, marginBottom: 30}}
                      contentStyle={{height: 50}}
                      labelStyle={{fontSize: 20}}
                    >
                      Gallery
                    </Button>
                    <Button 
                      onPress={() => bottomSheetModalRef.current?.dismiss()} 
                      icon="close"
                      mode="contained"
                      buttonColor='red'
                      textColor='white'
                      style={{borderColor: 'black', borderWidth: 1, borderRadius: 10, width: 200}}
                      contentStyle={{height: 50}}
                      labelStyle={{fontSize: 20}}
                    >
                      Close
                    </Button>
                  </BottomSheetView>
                </BottomSheetModal>
          </BottomSheetModalProvider>
        )}
    </GestureHandlerRootView>

  );
}
// Define a state to control the visibility of the modal

const DummyComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dummy Component</Text>
    </View>
  );
};



// Modify the CustomTabBarButton to open the modal instead of navigating to a new screen
const CustomTabBarButtom = ({ children, onPress, setIsCameraModalVisible, bottomSheetModalRef}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={() => {
      console.log('here');
      bottomSheetModalRef.current?.present();
      setIsCameraModalVisible(true)
    }} // Open the modal when the button is pressed
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Doctor" component={Doctor} />
      <Stack.Screen name="Disease Info" component={Final} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
