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
      data={diseaseHistory}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => {
        return (
          <View style={styles.box}>
            <Image style={styles.image} source={{uri: 'data:image/png;base64,' + item.image}}/>
            <View style={styles.boxContent}>
              <Text style={styles.title}>{item.result}</Text>
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
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#151515',
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
