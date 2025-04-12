/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {AuthContext} from './AuthContext';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdBy: string;
  createdAt: string;
  email : string
}

interface getRecipeResponse {
  success: boolean;
  recipe: Recipe;
}
const API_URL = 'http://10.0.2.2:5000';



export interface RecipeData {
  recipes: Recipe[];
  createReceipe: (recipe: {
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }) => Promise<void>;
  getRecipes: () => Promise<void>;
  isLoading: boolean;
  deleteRecipes: (id: string) => Promise<boolean>;
  updateRecipe: (recipe: Recipe) => Promise<boolean>;

  getRecipe: (id: string) => Promise<getRecipeResponse>;
}

export const RecipeContext = createContext<RecipeData>({} as RecipeData);

export const RecipeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const {token} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const createReceipe = async (recipe: {
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }) => {
    console.log(recipe, 'from context');
    setIsLoading(true);

    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/recipes/create-recipe`,
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Response:', res.data);
      return res.data; // return if needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error!');
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error message:', error.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipes = async () => {
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/recipes/get-recipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', res.data);
      setRecipes(res.data);
      return res.data; // return if needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error!');
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error message:', error.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
    }
  };

  const deleteRecipes = async (id: string) => {
    setIsLoading(true);
    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return false;
    }

    try {
      const res = await axios.delete(
        `${API_URL}/api/recipes/delete-recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Response:', res.data);
      return res.data; // return if needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error!');
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error message:', error.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipe = async (recipe: Recipe) => {
    setIsLoading(true);
    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return false;
    }
    try {
      const res = await axios.put(
        `${API_URL}/api/recipes/update-recipe/${recipe._id}`,
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Response:', res.data);
      return res.data; // return if needed
    }catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error!');
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error message:', error.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

   const getRecipe = async (id: string) => {
    if (!token) {
      console.error('Token not found');
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/api/recipes/get-recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', res.data);
      return res.data; // return if needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error!');
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error message:', error.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getRecipes();
      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RecipeContext.Provider
      value={{recipes, createReceipe, getRecipes, isLoading, deleteRecipes,updateRecipe,getRecipe}}>
      {children}
    </RecipeContext.Provider>
  );
}