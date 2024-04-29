import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export interface Output {
    predicted_class_name: string;
    confidence_score: number;
    image: string;
    description: string;
    treatment: string;
}

function Final ({ route, navigation }: { route: any, navigation: any }) {
    const { data } = route.params;
    console.log(data);
    
    const { predicted_class_name, confidence_score, image } = data;
    const base64Image = `data:image/png;base64,${image}`;
    // const navigation = useNavigation();

    // Adjust the image size dynamically based on the card's dimensions
    // Assuming the card takes the full screen minus margins and paddings
    const screenWidth = Dimensions.get('window').width;
    const cardPaddingHorizontal = 40; // 20 padding on each side
    const imageWidth = screenWidth - cardPaddingHorizontal;

    return (
        <View style={styles.container}>
            <Card style={styles.fullScreen}>
                {/* <View style={styles.content}>
                    <Text style={styles.text}>Disease: {predicted_class_name || 'Unknown'}</Text>
                    <Text style={styles.text}>Confidence: {confidence_score 
                        ? `${(confidence_score * 100).toFixed(2)}%`
                        : 'Unknown'
                    }</Text>    
                    <Image
                        source={{ uri: base64Image }}
                        
                        style={[styles.image, { width: imageWidth, height: imageWidth }]} // Dynamically adjust height to maintain aspect ratio
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>Description: {data.description} Treatment: {data.treatment}</Text> */}
                {/* </View> */}
                <Card.Title title="Disease Prediction" />
                <Card.Cover source={{ uri: base64Image }} />
                <Card.Content>
                    <Text style={styles.text1}>Disease: {predicted_class_name || 'Unknown'}</Text>
                    <Text style={styles.text1}>Confidence: {confidence_score 
                        ? `${(confidence_score * 100).toFixed(2)}%`
                        : 'Unknown'
                    }</Text>
                    <Paragraph style={styles.text}>Description: {data.description} {"\n\n"}Treatment: {data.treatment}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => { navigation.navigate('Home')} }>Back</Button>
                    <Button onPress={() => navigation.navigate('Doctor')}>Consult Doctor</Button>
                </Card.Actions>
                {/* <Button onPress={() => { navigation.navigate('Home')} }>Back</Button>
                <Button onPress={() => navigation.navigate('Doctor')}>Consult Doctor</Button> */}

            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullScreen: {
        flex: 1,
        margin: 10,
        padding: 10,
    },
    content: {
        alignItems: 'center', // Center content within the card
    },
    text: {
        color: 'black',
        marginVertical: 15, // Provide some vertical space between text elements
    },
    text1: {
        marginVertical: 8, // Provide some vertical space between text elements
        color: 'red',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    image: {
        marginVertical: 8, // Provide some vertical space around the image
    },
});

export default Final;
