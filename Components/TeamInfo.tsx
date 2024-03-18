import React, {  useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Linking
} from 'react-native'

import { GMAIL, LINKEDIN } from '../assets';

export interface TeamInfo {
    id: number;
    image: any;
    name: string;
    usn: string;
    email: string;
    linkedin: string;
}

const TeamInfo = ({teamInfo}: {teamInfo: TeamInfo[]}) => {

  const sendEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`)
  }

  const openLinkedin = (linkedin: string) => {
    Linking.openURL(linkedin)
  }
  return (
    <FlatList
      data={teamInfo}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => {
        return (
          <View style={styles.box}>
            <Image style={styles.image} source={item.image} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.usn}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.view]}
                  onPress={() => sendEmail(item.email || 'iamabnadeem99@gmail.com')}>
                  <Image
                    style={styles.icon}
                    source={GMAIL}/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.profile]}
                  onPress={()=> openLinkedin(item.linkedin)}>
                  <Image
                    style={styles.icon}
                    source={LINKEDIN}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }}
    />
  )
}

export default TeamInfo

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
})
