import * as React from 'react';
import { Card, Text } from 'react-native-paper';

export interface Disease {
    id: number;
    name: string;
    description: string;
    image: string;
}

const DiseaseCard = ({ disease }: { disease: Disease }) => (
  <Card style={{ margin: 6, width: 200 }}>
    <Card.Cover source={{ uri: disease.image }} />
    <Card.Content>
      <Text variant="titleMedium">{disease.name}</Text>
      <Text variant="bodySmall">{disease.description}</Text>
    </Card.Content>
  </Card>
);

export default DiseaseCard;
