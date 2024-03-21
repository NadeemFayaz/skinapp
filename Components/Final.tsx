import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export interface Output {
    predicted_class_name: string;
    confidence_score: number;
    image: string;
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
                <View style={styles.content}>
                    <Text style={styles.text}>Disease: {predicted_class_name}</Text>
                    <Text style={styles.text}>Confidence: {`${confidence_score.toFixed(2)}%`}</Text>
                    <Image
                        source={{ uri: base64Image }}
                        
                        style={[styles.image, { width: imageWidth, height: imageWidth }]} // Dynamically adjust height to maintain aspect ratio
                        resizeMode="contain"
                    />
                </View>
                <Button onPress={() => { navigation.navigate('Home')} }>Back</Button>
                <Button onPress={() => navigation.navigate('Doctor')}>Consult Doctor</Button>

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
    image: {
        marginVertical: 8, // Provide some vertical space around the image
    },
});

export default Final;
