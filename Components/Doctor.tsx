import { Text, IconButton } from "react-native-paper";
import { Card } from "react-native-paper";
import { ActivityIndicator, Linking, View } from "react-native";
import { GMAIL,PHONE,WHATSAPP } from "../assets";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendEmail } from "./TeamInfo";

interface Doctor {
    name: string;
    specialty: string;
    location: string;
    phone: string;
    email: string;
}

const Doctor = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        const hostUrl = process.env.REACT_APP_HOST_URL
        axios.get(hostUrl+'/doctors').then((response) => {
                const res = response.data;
                const data = res.Doctors;
                setDoctors(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const openWhatsApp = (phone: string) => {
        Linking.openURL(`whatsapp://send?phone=${phone}`);
    };

    const openDialer = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    }

    
    return (
        <View>
            { isLoading ?
            <ActivityIndicator size="large" color="#0000ff" /> :
            doctors.map((doctor) => (
                <Card key={doctor.name} style={{margin: 10, justifyContent:'center'}}>
                    <Card.Content style={{margin:3,justifyContent:'center'}}>
                        <Text variant="titleLarge">{doctor.name}</Text>
                        <Text variant="bodyMedium">{doctor.specialty}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <IconButton icon={WHATSAPP} onPress={() => { openWhatsApp(doctor.phone) }} />
                            <IconButton icon={GMAIL} onPress={() => { sendEmail(doctor.email) }} />
                            <IconButton icon={PHONE} onPress={() => { openDialer(doctor.phone) }} />
                        </View>
                    </Card.Actions>
                </Card>
            ))}
        </View>
    );
}

export default Doctor;