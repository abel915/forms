import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define the type for our form values
interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Yup validation schema
const SignUpSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, 'Too Short!')
        .required('Full name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

const SignUpScreen = () => {
    const router = useRouter();

    const handleSignUp = (values: SignUpFormValues) => {
        console.log('Signing up with:', values);
        Alert.alert('Sign-up successful!');
        router.back(); // Go back to the sign-in screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Create Account</Text>
                <Formik<SignUpFormValues>
                    initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={SignUpSchema}
                    onSubmit={handleSignUp}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            {/* Full Name Input */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="account-outline" size={24} color="gray" style={styles.icon} />
                                <TextInput style={styles.input} placeholder="Full Name" onChangeText={handleChange('fullName')} onBlur={handleBlur('fullName')} value={values.fullName} />
                            </View>
                            {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="email-outline" size={24} color="gray" style={styles.icon} />
                                <TextInput style={styles.input} placeholder="Email Address" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} keyboardType="email-address" autoCapitalize="none" />
                            </View>
                            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            {/* Password Input */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="lock-outline" size={24} color="gray" style={styles.icon} />
                                <TextInput style={styles.input} placeholder="Password" onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} secureTextEntry />
                            </View>
                            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                            {/* Confirm Password Input */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="lock-check-outline" size={24} color="gray" style={styles.icon} />
                                <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} value={values.confirmPassword} secureTextEntry />
                            </View>
                            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

// Re-using styles from index.js
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
        marginTop: 20,
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
});

export default SignUpScreen;