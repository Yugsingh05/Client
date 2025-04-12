import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import { RecipeContext } from '../context/RecipeContext';

const recipeSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string()
    .min(1, 'Description too short')
    .required('Description is required'),
  difficulty: Yup.string()
    .oneOf(['Easy', 'Medium', 'Hard'], 'Choose a difficulty')
    .required('Required'),
});

interface CreateRecipeFormProps {
  onCancel: () => void;
}

const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({onCancel}) => {

    const {createReceipe } = useContext(RecipeContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      difficulty: '',
    },
    validationSchema: recipeSchema,
    onSubmit: async(values) => {
    
      const res = await createReceipe({
        title: values.title,
        description: values.description,
        difficulty: values.difficulty as 'Easy' | 'Medium' | 'Hard',
      });

      console.log('red from clinrt' , res);

      if(res?.success){
        Alert.alert('Success', 'Recipe submitted!');
        formik.resetForm();
        onCancel();
      }
      else {
        Alert.alert('Error', 'Recipe submission failed. Please try again.');
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.heading}>✨ Create a Delicious Recipe</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Recipe Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe title"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          onBlur={formik.handleBlur('title')}
        />
        {formik.touched.title && formik.errors.title && (
          <Text style={styles.error}>{formik.errors.title}</Text>
        )}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your recipe..."
          multiline
          numberOfLines={4}
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          onBlur={formik.handleBlur('description')}
        />
        {formik.touched.description && formik.errors.description && (
          <Text style={styles.error}>{formik.errors.description}</Text>
        )}

        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formik.values.difficulty}
            onValueChange={(value) => formik.setFieldValue('difficulty', value)}
            style={styles.picker}>
            <Picker.Item label="Select difficulty" value="" />
            <Picker.Item label="Easy 🍳" value="Easy" />
            <Picker.Item label="Medium 🧑‍🍳" value="Medium" />
            <Picker.Item label="Hard 🔥" value="Hard" />
          </Picker>
        </View>
        {formik.touched.difficulty && formik.errors.difficulty && (
          <Text style={styles.error}>{formik.errors.difficulty}</Text>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.submitBtn} onPress={() => formik.handleSubmit()}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      padding:20,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f0f4f8',
    },
    heading: {
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center',
      color: '#0d47a1',
      marginBottom: 25,
    },
    form: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: {width: 0, height: 4},
      shadowRadius: 6,
      elevation: 4,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      color: '#374151',
    },
    input: {
      borderWidth: 1,
      borderColor: '#cbd5e1',
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
      marginBottom: 12,
      backgroundColor: '#fefefe',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#cbd5e1',
      borderRadius: 10,
      marginBottom: 12,
      backgroundColor: '#fff',
    },
    picker: {
      height: 55,
      paddingHorizontal: 10,
    },
    error: {
      fontSize: 13,
      color: '#dc2626',
      marginBottom: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    submitBtn: {
      flex: 1,
      backgroundColor: '#10b981',
      paddingVertical: 12,
      borderRadius: 10,
      marginRight: 10,
      alignItems: 'center',
    },
    cancelBtn: {
      flex: 1,
      backgroundColor: '#ef4444',
      paddingVertical: 12,
      borderRadius: 10,
      marginLeft: 10,
      alignItems: 'center',
    },
    btnText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });

export default CreateRecipeForm;
