import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../navigation/RootNavigation';
import { RecipeContext } from '../context/RecipeContext';
import LinearGradient from 'react-native-linear-gradient';

type RecipeDetailsNavigationProp = StackNavigationProp<RootStackParams, 'ReciepeDetails'>;
type RecipeDetailsRouteProp = RouteProp<RootStackParams, 'ReciepeDetails'>;

interface RecipeDetailsProps {
  navigation: RecipeDetailsNavigationProp;
  route: RecipeDetailsRouteProp;
}

const ReciepeDetails: React.FC<RecipeDetailsProps> = ({ route }) => {
  const { recipeId } = route.params;
  const { isLoading, getRecipe } = useContext(RecipeContext);
  const [recipes, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await getRecipe(recipeId);
      if (res?.success) {
        setRecipe(res.data);
      }
    };
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  if (isLoading || !recipes) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#805AD5" />
        <Text style={styles.loadingText}>Fetching Deliciousness...</Text>
      </View>
    );
  }

  const { recipe, userName } = recipes;
  const { title, description, difficulty, createdAt } = recipe;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      <LinearGradient colors={['#6B46C1', '#805AD5']} style={styles.hero}>
        <Text style={styles.heroText}>{title}</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.label}>📋 Description</Text>
        <Text style={styles.text}>{description}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>🔥 Difficulty</Text>
          <Text style={styles.infoValue}>{difficulty}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>📅 Created On</Text>
          <Text style={styles.infoValue}>{new Date(createdAt).toDateString()}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>👨‍🍳 Created By</Text>
        <Text style={styles.text}>{userName}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: '#F0F4F8',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A5568',
  },
  hero: {
    height: 180,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
  },
  heroText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 4,
    shadowColor: '#4A5568',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 6,
  },
  text: {
    fontSize: 17,
    color: '#2D3748',
    lineHeight: 22,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C51BF',
  },
});

export default ReciepeDetails;
