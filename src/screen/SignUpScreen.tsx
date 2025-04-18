import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import { RootStackParams } from '../navigation/RootNavigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';


type signupType = NativeStackNavigationProp<RootStackParams, 'SignUpScreen'>;

interface SignUpScreenProps {
  navigation: signupType;
}

const SignUpSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {signUp, userId} = useContext(AuthContext);


  useEffect(() => {
    if(userId) navigation.navigate('HomeScreen');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSignup  =async (values: { email: string, password: string ,userName : string}) => {
    console.log(values);
    // TODO: Sign-up logic
    const success = await signUp(values.email, values.password,values.userName);
    console.log('sign up response',success);

    if (success) {
      Alert.alert('Success', 'Sign-up successful!');
      navigation.navigate('Login');
    }
    else {
      console.log(success);
      Alert.alert('Error', 'Sign-up failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <Formik
  initialValues={{ email: '', password: '', userName: '' }}
  validationSchema={SignUpSchema}
  onSubmit={handleSignup}
>

          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>

<TextInput
  value={values.userName}
  onChangeText={handleChange('userName')}
  onBlur={handleBlur('userName')}
  placeholder="Enter username ..."
  placeholderTextColor="#aaa"
  style={styles.input}
/>
{touched.userName && errors.userName && (
  <Text style={styles.errorText}>{errors.userName}</Text>
)}


              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.passwordContainer}>
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showPassword}
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />

                </Pressable>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.signupButton} onPress={handleSubmit as any}>
                <Text style={styles.signupText}>SIGN UP</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginRedirect}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 380,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1A73E8',
  },
  input: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
  signupButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  loginRedirect: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  loginLink: {
    color: '#1A73E8',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
});
