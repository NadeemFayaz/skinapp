import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native'

interface DiseaseHistory {
    id: number;
    image: any;
    result: string;
    timestamp: string;
}

const DiseaseHistory = ({email, resetkey}: {email: string, resetkey: number}) => {

  const [diseaseHistory, setDiseaseHistory] = useState<DiseaseHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const getDiseaseHistory = async () => {
    try {
      axios.get('https://legal-rat-terminally.ngrok-free.app/history', {
        params: {
          email: email
        }
      })
        .then((response) => {
            console.log(response)
            setDiseaseHistory(response.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setIsLoading(false)
        })

    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getDiseaseHistory()
  }, [resetkey])

  useEffect(() => {
    console.log(diseaseHistory.length )
  }, [diseaseHistory])

  return (
    isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
    diseaseHistory.length == 0 ? <Text style={styles.noHistory}>No History</Text> :
    <FlatList
      style={{marginBottom:80}}
      data={diseaseHistory}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => {
        return (
          <View style={styles.box}>
            <Image style={styles.image} source={{uri: 'data:image/png;base64,' + item.image}}/>
            <View style={styles.boxContent}>
              <Text style={styles.title}>{item.result ? item.result : 'No DIsease Detected'}</Text>
              <Text style={styles.description}>{item.timestamp}</Text>
            </View>
          </View>
        )
      }}
    />
    )
  )
}

export default DiseaseHistory

const styles = StyleSheet.create({
    image: {
      width: 170,
      height: 190,
      borderRadius: 10,
      borderColor:'red',
      borderWidth:2, // Add rounded corners to the image
    },
    box: {
      padding: 20,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: '#f8f8f8', // Change the background color to a light gray
      flexDirection: 'row',
      borderRadius: 10, // Add rounded corners to the card
      shadowColor: "#000", // Add a shadow to the card
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    boxContent: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 20,
    },
    title: {
      fontSize: 18,
      color: '#151515',
      fontWeight: 'bold', // Make the title bold
    },
    description: {
      fontSize: 15,
      color: '#646464',
    },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: '#eee',
  },
  profile: {
    backgroundColor: '#1E90FF',
  },
  message: {
    backgroundColor: '#228B22',
  },
  noHistory: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 26,
    color: '#000',
  }
})
