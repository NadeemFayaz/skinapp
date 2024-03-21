import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
export interface Disease {
    id: number;
    name: string;
    description: string;
    image: string;
}

const DiseaseCard = ({ disease }: { disease: Disease }) => (
  <Card style={{margin: 10, justifyContent:'center'}}>
     <Card.Cover source={{ uri: disease.image }} />
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <Card.Content style={{margin:3,justifyContent:'center'}}>
      <Text variant="titleLarge">{disease.name}</Text>
      <Text variant="bodyMedium">{disease.description}</Text>
    </Card.Content>
   
    
  </Card>
);

export default DiseaseCard;