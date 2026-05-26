import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert
} from 'react-native';

import API from '../services/api';

export default function AddExpenseScreen() {

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleAddExpense = async () => {

        try {

            const storedUser =
                await AsyncStorage.getItem('user');

            const user = JSON.parse(storedUser);

            const token = user.token;
            const userId = user.userId;

            const response = await API.post(
                `/expenses/${userId}`,
                {
                    title: title.trim(),
                    amount: Number(amount),
                    category: category.trim(),
                    date: new Date()
                        .toISOString()
                        .split('T')[0]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            Alert.alert('Expense Added');

            setTitle('');
            setAmount('');
            setCategory('');

        } catch (error) {

            console.log(
                'ADD EXPENSE ERROR:',
                error.response?.data || error.message
            );

            Alert.alert(
                'Error adding expense',
                JSON.stringify(
                    error.response?.data || error.message
                )
            );
        }
    };

    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Amount"
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <TextInput
                placeholder="Category"
                style={styles.input}
                value={category}
                onChangeText={setCategory}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleAddExpense}
            >
                <Text style={styles.buttonText}>Save Expense</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FB',
        padding: 20,
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#111827',
    },

    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontSize: 16,
    },

    button: {
        backgroundColor: '#6C63FF',
        padding: 18,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});