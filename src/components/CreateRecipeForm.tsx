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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { Recipe, RecipeContext } from '../context/RecipeContext';

const recipeSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string()
    .min(5, 'Description too short')
    .required('Description is required'),
  difficulty: Yup.string()
    .oneOf(['Easy', 'Medium', 'Hard'], 'Choose a difficulty')
    .required('Difficulty is required'),
});

interface CreateRecipeFormProps {
  onCancel: () => void;
  RecipeToUpdate?: Recipe;
}

const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({ onCancel, RecipeToUpdate }) => {
  const { createReceipe, updateRecipe } = useContext(RecipeContext);
  const isUpdate = !!RecipeToUpdate;

  const formik = useFormik({
    initialValues: {
      title: RecipeToUpdate?.title || '',
      description: RecipeToUpdate?.description || '',
      difficulty: RecipeToUpdate?.difficulty || '',
    },
    enableReinitialize: true, // this line makes sure form updates when props change
    validationSchema: recipeSchema,
    onSubmit: async (values) => {
      const recipeData = {
        title: values.title,
        description: values.description,
        difficulty: values.difficulty as 'Easy' | 'Medium' | 'Hard',
      };

      const response = isUpdate
        ? await updateRecipe({
            ...recipeData,
            _id: RecipeToUpdate!._id,
            createdBy: RecipeToUpdate!.createdBy,
            createdAt: RecipeToUpdate!.createdAt,
          })
        : await createReceipe(recipeData);

      if (response?.success) {
        Alert.alert('Success', `Recipe ${isUpdate ? 'updated' : 'created'} successfully!`);
        formik.resetForm();
        onCancel();
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {isUpdate ? '✏️ Update Your Recipe' : '🍽️ Create a Delicious Recipe'}
      </Text>

      <View style={styles.form}>
        {/* Title Input */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Chocolate Cake"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          onBlur={formik.handleBlur('title')}
        />
        {formik.touched.title && formik.errors.title && (
          <Text style={styles.error}>{formik.errors.title}</Text>
        )}

        {/* Description Input */}
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

        {/* Difficulty Picker */}
        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formik.values.difficulty}
            onValueChange={(value) => formik.setFieldValue('difficulty', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select difficulty" value="" />
            <Picker.Item label="Easy 🍳" value="Easy" />
            <Picker.Item label="Medium 🧑‍🍳" value="Medium" />
            <Picker.Item label="Hard 🔥" value="Hard" />
          </Picker>
        </View>
        {formik.touched.difficulty && formik.errors.difficulty && (
          <Text style={styles.error}>{formik.errors.difficulty}</Text>
        )}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.submitBtn} onPress={() => formik.handleSubmit()}>
            <Text style={styles.btnText}>{isUpdate ? 'Update' : 'Submit'}</Text>
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
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
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
    borderColor: '#d1d5db',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
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
    marginTop: 18,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CreateRecipeForm;
