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

            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');

            const response = await API.post(
                `/expenses/${userId}`,
                {
                    title: title.trim(),
                    amount: Number(amount),
                    category: category.trim(),
                    date: new Date().toISOString().split('T')[0]
                    
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

            console.log(error.response?.data);
            console.log(error.message);

            Alert.alert(
                'Error adding expense',
                JSON.stringify(error.response?.data || error.message)
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
        padding: 20,
        justifyContent: 'center'
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