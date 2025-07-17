import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define the type for our form values
interface EmployeeFormValues {
    fullName: string;
    employeeId: string;
    department: string;
    email: string;
    phoneNumber: string;
}

// Yup validation schema
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const EmployeeSchema = Yup.object().shape({
    fullName: Yup.string().min(3, 'Full name is too short').required('Full name is required'),
    employeeId: Yup.string().matches(/^[A-Z0-9]{5,10}$/, 'Must be 5-10 alphanumeric characters').required('Employee ID is required'),
    department: Yup.string().required('Department is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
});

const EmployeeFormScreen = () => {
    const handleSubmitForm = (values: EmployeeFormValues, { resetForm }: FormikHelpers<EmployeeFormValues>) => {
        console.log('Employee Data:', values);
        Alert.alert('Employee information submitted successfully!');
        resetForm();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Employee Information</Text>
                <Formik<EmployeeFormValues>
                    initialValues={{ fullName: '', employeeId: '', department: '', email: '', phoneNumber: '' }}
                    validationSchema={EmployeeSchema}
                    onSubmit={handleSubmitForm}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            {/* Full Name */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="account" size={24} color="gray" style={styles.icon} />
                                <TextInput placeholder="Full Name" onChangeText={handleChange('fullName')} onBlur={handleBlur('fullName')} value={values.fullName} style={styles.input} />
                            </View>
                            {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

                            {/* Employee ID */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="card-account-details" size={24} color="gray" style={styles.icon} />
                                <TextInput placeholder="Employee ID (e.g., DEV12345)" onChangeText={handleChange('employeeId')} onBlur={handleBlur('employeeId')} value={values.employeeId} style={styles.input} />
                            </View>
                            {touched.employeeId && errors.employeeId && <Text style={styles.errorText}>{errors.employeeId}</Text>}

                            {/* Department */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="office-building" size={24} color="gray" style={styles.icon} />
                                <TextInput placeholder="Department (e.g., Engineering)" onChangeText={handleChange('department')} onBlur={handleBlur('department')} value={values.department} style={styles.input} />
                            </View>
                            {touched.department && errors.department && <Text style={styles.errorText}>{errors.department}</Text>}

                            {/* Email */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="email" size={24} color="gray" style={styles.icon} />
                                <TextInput placeholder="Email Address" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} style={styles.input} keyboardType="email-address" />
                            </View>
                            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            {/* Phone Number */}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="phone" size={24} color="gray" style={styles.icon} />
                                <TextInput placeholder="Phone Number" onChangeText={handleChange('phoneNumber')} onBlur={handleBlur('phoneNumber')} value={values.phoneNumber} style={styles.input} keyboardType="phone-pad" />
                            </View>
                            {touched.phoneNumber && errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 20,
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
        backgroundColor: '#28a745',
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

export default EmployeeFormScreen;