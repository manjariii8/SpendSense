import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import API from '../services/api';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {

            const response = await API.post('/auth/login', {
                email,
                password
            });

            console.log("LOGIN RESPONSE:", response.data);
            

            await AsyncStorage.setItem(
                'token',
                response.data.token
            );

            await AsyncStorage.setItem(
                'user',
                JSON.stringify(response.data)
            );
            await AsyncStorage.setItem(
                'userName',
                response.data.name
            );

            navigation.replace('Dashboard');

        } catch (error) {

            console.log(
                "FULL ERROR:",
                error.response?.data || error.message
            );

            Alert.alert(
                'Login Failed',
                error.response?.data || 'Something went wrong'
            );
        }
    };

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* Top Section */}

                <View style={styles.topSection}>

                    <Text style={styles.logo}>💰</Text>

                    <Text style={styles.appTitle}>
                        SpendSense
                    </Text>

                    <Text style={styles.subtitle}>
                        Manage your expenses smartly
                    </Text>

                </View>

                {/* Input Section */}

                <View style={styles.formContainer}>

                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor="#999"
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerText}>
                            Don't have an account? Register
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F7FB',
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 25,
    },

    topSection: {
        alignItems: 'center',
        marginBottom: 50,
    },

    logo: {
        fontSize: 75,
        marginBottom: 10,
    },

    appTitle: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#111827',
    },

    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 10,
    },

    formContainer: {
        width: '100%',
    },

    input: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 14,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontSize: 16,
        color: '#111827',

        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        elevation: 2,
    },

    button: {
        backgroundColor: '#6C63FF',
        padding: 18,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,

        shadowColor: '#6C63FF',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        elevation: 5,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },

    registerText: {
        textAlign: 'center',
        marginTop: 25,
        color: '#6C63FF',
        fontSize: 15,
        fontWeight: '600',
    },
});