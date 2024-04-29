import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Button, Card, Dialog, Icon, Text as PaperText, Paragraph } from 'react-native-paper';
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

interface userData {
  email: string;
  image: string;
  name: string;
}

interface recentData {
  noOfUploads: number;
  lastUpload: string;
}

function HomeScreen({ user }: { user: userData }) {
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
  const [recentData, setRecentData] = useState<recentData>({ noOfUploads: 0, lastUpload: '' });

  React.useEffect(() => {
    if (diseaseData.length !== 0) {
      return;
    }
    const getDiseaseData = () => {
      const hostUrl = process.env.REACT_APP_HOST_URL
      setIsLoading(true); // Set loading to true before request
      axios.get(hostUrl+'/diseases')
        .then((response) => {
          const res = response.data;
          const data = res.Diseases;
          setDiseaseData(data);
          axios.get(hostUrl+'/userinfo', {
            params: {
              email: user.email,
            },
          }).then((response) => {
            const res = response.data;
            setRecentData({
              noOfUploads: res.noOfUploads,
              lastUpload: res.lastUpload,
            });
            ///
          });
          setIsLoading(false); // Set loading to false after successful request
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); // Set loading to false even if request fails
        });
    }
    getDiseaseData();
  }, [diseaseData]);

  const { open } = state;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
  {isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
            <View>
              <Card>
                <Card.Content>
                  <Image source={{ uri: user.image }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }} />
                  <Text style={{ fontSize: 20, textAlign: 'center', color: 'black' }}>User Info</Text>
                  <Text style={{ fontSize: 15, textAlign: 'left', color: 'black' }}>Email: {user.email}</Text>
                  <Text style={{ fontSize: 15, textAlign: 'left', color: 'black' }}>Name: {user.name}</Text>
                  <Text style={{ fontSize: 15, textAlign: 'left', color: 'black' }}>No of Uploads: {recentData.noOfUploads}</Text>
                  <Text style={{ fontSize: 15, textAlign: 'left', color: 'black' }}>Last Upload: {recentData.lastUpload}</Text>
                  <View>
                    <Button onPress={() => navigationRef.current?.navigate('blog')}>
                      Read More
                    </Button>
                  </View>
                </Card.Content>
              </Card>
              <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row' }}>
                {diseaseData.map((disease) => (
                  <DiseaseCard disease={disease} key={disease.id} />
                ))}
              </ScrollView>
              
            </View>
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = useState<userData>();
  const [resetkey, setResetKey] = useState(0);

  const snapPoints = React.useMemo(() => ['25%', '30%'], []);

  const processImage = (image: any) => {
    try {
      Resizer.createResizedImage(image.path ? image.path : image.uri, 300, 300, 'JPEG', 100, 0, null)
        .then((response) => {
          const data = new FormData();
          data.append('file', {
            uri: response.uri,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
          data.append('email', user?.email);
          const hostUrl = process.env.REACT_APP_HOST_URL
          axios.post(hostUrl+'/detect', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((response) => {
            setIsLoading(false);
            if (response.data.error) {
              Alert.alert('Error', response.data.error);
              return;
            }
            navigationRef.current?.navigate('Disease Info', { data: response.data });
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

  const handleDiseaseFunction = (selectedImage: any) => {
    processImage(selectedImage);
  }

  const launchCameraFunction = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setIsLoading(true);
        handleDiseaseFunction(response && response.assets ? response.assets[0] : null);
        bottomSheetModalRef.current?.dismiss();
      }
    });
  };



  const launchImagePickerFunction = () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      try {
        setIsLoading(true);
        handleDiseaseFunction(image);
        bottomSheetModalRef.current?.dismiss();
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
      {!isAuthenticated ? <Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        : (
          <BottomSheetModalProvider>
             <>
              {isLoading && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', zIndex: 1000 }}>
                <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
              </View>}
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
                    children={() => <StackNavigator user={user} />}
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
                    component={BlogComponent}
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
                      return <DiseaseHistory email={user?.email || ''} resetkey={resetkey} />;
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
            </SafeAreaProvider>
            </>
            
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

interface BlogData {
  title: string;
  content: string;
}

const BlogComponent = () => {
  const [blogdata, setBlogData] = useState<BlogData[]>([]);

  useEffect(() => {
    if(blogdata.length === 0) {
      const hostUrl = process.env.REACT_APP_HOST_URL
      axios.get(hostUrl+'/blog')
        .then((response) => {
          const res = response.data;
          setBlogData(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [blogdata]);

  return (
    <View>
      {blogdata.length === 0 ? <ActivityIndicator size="large" color="#0000ff" /> :
      <ScrollView>
        {blogdata.map((blog, index) => (
          <Card key={index} style={{ margin: 10, width: '100%' }}>
            <Card.Title title={blog.title} style={{ padding: 10 }} titleStyle={{ color: '#e32f45' }} />
            <Card.Content>
              <Paragraph style={{textAlign: 'justify'}}>{blog.content}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
}
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

function StackNavigator({ user }: { user: userData }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" children={() => <HomeScreen user={user} />} />
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
