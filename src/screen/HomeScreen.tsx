import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
    Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure this is installed
import CreateRecipeForm from '../components/CreateRecipeForm';
import { RecipeContext } from '../context/RecipeContext';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

interface RecipeInterface {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdBy: string;
  createdAt: string;
__v : number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const { token, logout} = useContext(AuthContext);
  const [isvisible,setIsVisible] = useState(false);
  const {getRecipes,isLoading} = useContext(RecipeContext);
  const [Recipes,setRecipes] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
    }
  }, [token, navigation]);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleGetReciepe = async () : Promise<void> => {
    const res = await getRecipes();

    if(res.success){
      setRecipes(res.data);
    }
  }

  useEffect(() => {

    if(!isLoading){
      handleGetReciepe();
    }
    
  },[isLoading])

  return (
    <View style={styles.container}>
      {/* 🔵 Custom Header */}
      <View style={styles.header}>
        <TextInput
          placeholder="Search for the receipe..."
          placeholderTextColor="#ccc"
          style={styles.searchInput}
        />

        <TouchableOpacity style={styles.iconButton} onPress={() => setIsVisible(true)}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔵 Body */}
      <View style={styles.body}>
        <Text style={styles.title}>HomeScreen</Text>
        <TouchableOpacity onPress={() => hanndleGetReciepe()}>
          <Text >get Recipe</Text>
        </TouchableOpacity>
      </View>
      
      {Recipes && <FlatList
  data={Recipes}
  keyExtractor={(item) => item._id}
  contentContainerStyle={styles.recipeList}
  renderItem={({item}) => (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDescription}>{item.description}</Text>
      <View style={styles.recipeFooter}>
        <Text style={[styles.difficulty, styles[`difficulty_${item.difficulty.toLowerCase()}` as 'difficulty_easy' | 'difficulty_medium' | 'difficulty_hard']]}>
          {item.difficulty}
        </Text>
        <Text style={styles.updatedAt}>
  {new Date(item.createdAt).toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })}
</Text>

      </View>
    </View>
  )}
/>
}

      <Modal
      visible={isvisible} transparent={true} onRequestClose={() => setIsVisible(false)}>
        <CreateRecipeForm onCancel={() => setIsVisible(false)}/>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#1e3a8a', // Navy Blue
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#3b5998',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: '#4f46e5',
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  recipeList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#4b5563', // Neutral gray
    marginBottom: 10,
  },
  recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficulty: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
    color: '#fff',
  },
  difficulty_easy: {
    backgroundColor: '#10b981', // Emerald
  },
  difficulty_medium: {
    backgroundColor: '#f59e0b', // Amber
  },
  difficulty_hard: {
    backgroundColor: '#ef4444', // Red
  },
  updatedAt: {
    fontSize: 12,
    color: '#6b7280', // Light gray
  },

});
