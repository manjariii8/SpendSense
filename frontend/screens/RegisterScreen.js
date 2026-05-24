import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import API from '../services/api';

export default function RegisterScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {

        try {

            await API.post('/auth/register', {
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            });


            Alert.alert('Registration Successful');

            navigation.navigate('Login');

        } catch (error) {
            console.log(error);

            console.log(error.response);

            Alert.alert(
                'Registration Failed',
                JSON.stringify(error.response?.data)
            );

        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

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
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>Register</Text>
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
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
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
        borderRadius: 10
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});