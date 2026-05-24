import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={styles.container}>

            <Text style={styles.title}>SpendSense</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
            >
                <Text>Create Account</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 15,
        borderRadius: 10
    },

    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});