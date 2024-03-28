import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Button, Card, Text as PaperText } from 'react-native-paper';
import DiseaseCard from './Components/Card';
import TeamInfo, { TeamInfo as TeamInfoInterface } from './Components/TeamInfo';
import Camera from './Components/Camera';
import { createStackNavigator } from '@react-navigation/stack';
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { FAB, PaperProvider, Portal } from 'react-native-paper';
import { NADEEM, HOME, INFO, PAVAN, BANU, ABHISHEK } from './assets';
import { Output } from './Components/Final';
import Auth from './Pages/auth';
import Final from './Components/Final';
import Doctor from './Components/Doctor';
import { Disease } from './Components/Card';
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
    image:BANU,
    email: 'banu87947@gmail.com',
    linkedin: 'https://www.linkedin.com/in/r-banu-prakash-248553232/',
  },
  {
    id: 4,
    name: 'Abhishek G',
    usn: '1AM20CS006',
    image:ABHISHEK,
    email: 'abhishekabu0155@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abhishek-g-8a835b283/',
  }
];

import axios from 'axios';

import {useState, type PropsWithChildren} from 'react';
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
function HomeScreen() {
  const options = {
    mediaType: 'photo' as MediaType,
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
};

const [state, setState] = React.useState({ open: false });
const [isLoading, setIsLoading] = React.useState(true); // New state variable

const onStateChange = ({ open }: { open : boolean}) => setState({ open });
const [diseaseData, setDiseaseData] = useState<Disease[]>([]);  

React.useEffect(() => {    
  if(diseaseData.length !== 0) {
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
  <Camera>
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
  </Camera>
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // check if the user is authenticated
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Auth navigation={null} />;
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Main" component={StackNavigator} 
            options={
              {
                tabBarIcon: () => (
                  <Image source={HOME} style={{backgroundColor: 'transparent', width: 25, height: 25}} />
                ),
              }
            }
          />
          <Tab.Screen name="Info" component={InfoScreen}
            options={
              {
                tabBarIcon: () => (
                  <Image source={INFO} style={{backgroundColor: 'transparent', width: 25, height: 25}} />
                ),
              }
            }
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Doctor" component={Doctor} />
      <Stack.Screen name="Disease Info" component={Final} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
