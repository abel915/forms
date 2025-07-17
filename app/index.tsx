import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define the type for our form values
interface SignInFormValues {
  email: string;
  password: string;
}

// Yup validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignInScreen = () => {
  const router = useRouter();

  const handleSignIn = (values: SignInFormValues) => {
    console.log('Signing in with:', values);
    // On success, navigate to the employee form
    router.push('/employee-form');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Formik<SignInFormValues>
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email-outline" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
            </View>
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Link href="/sign-up" asChild>
        <TouchableOpacity>
          <Text style={styles.switchText}>Dont have an account? Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

// Common styles for all screens
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
    marginLeft: 10,
  },
  switchText: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
    fontWeight: '600',
  }
});

export default SignInScreen;