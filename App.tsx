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




const diseaseData = [
  {
    id: 1,
    name: 'COVID-19',
    description: 'Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.',
    image: 'https://picsum.photos/700',
  },
  {
    id: 2,
    name: 'Malaria',
    description: 'Malaria is a life-threatening disease caused by parasites that are transmitted to people through the internet.',
    image: 'https://picsum.photos/700',
  },
  {
    id: 3,
    name: 'Tuberculosis',
    description: 'Tuberculosis (TB) is caused by a bacterium called Mycobacterium tuberculosis. The bacteria usually attack the lungs, but TB bacteria can attack any part of the body such as the kidney, spine, and brain.',
    image: 'https://picsum.photos/700',
  },
  {
    id: 4,
    name: 'HIV/AIDS',
    description: 'HIV (human immunodeficiency virus) is a virus that attacks cells that help the body fight infection, making a person more vulnerable to other infections and diseases. It is spread by contact with certain bodily fluids of a person with HIV, most commonly during  unprotected',
    image: 'https://picsum.photos/700',
  }
];

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
    name: 'Abhishk G',
    usn: '1AM20CS006',
    image:ABHISHEK,
    email: 'abhishekabu0155@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abhishek-g-8a835b283/',
  }
];


import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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

  const onStateChange = ({ open }: { open : boolean}) => setState({ open });

  const { open } = state;
  return (
    <Camera>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        {diseaseData.map(function (disease) {
          return (
            <DiseaseCard key={disease.id} disease={disease} />
          );
        })}
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} 
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
