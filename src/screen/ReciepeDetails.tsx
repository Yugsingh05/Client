import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../navigation/RootNavigation';

type RecipeDetailsNavigationProp = StackNavigationProp<RootStackParams, 'ReciepeDetails'>;
type RecipeDetailsRouteProp = RouteProp<RootStackParams, 'ReciepeDetails'>;

interface RecipeDetailsProps {
  navigation: RecipeDetailsNavigationProp;
  route: RecipeDetailsRouteProp;
}

const ReciepeDetails: React.FC<RecipeDetailsProps> = ({ route }) => {
  const { recipeId } = route.params;

  return (
    <View>
      <Text>Recipe Details - ID: {recipeId}</Text>
    </View>
  );
};

export default ReciepeDetails;
