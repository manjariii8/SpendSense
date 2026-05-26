import React, { useState, useCallback } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import API from '../services/api';
import Colors from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {

    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [userName, setUserName] = useState('');

    useFocusEffect(
        useCallback(() => {

            fetchMonthlyTotal();
            fetchUserName();

        }, [])
    );
    const fetchUserName = async () => {

        try {

            const name = await AsyncStorage.getItem('userName');

            if (name) {
                setUserName(name);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const fetchMonthlyTotal = async () => {

        try {

            const userData = await AsyncStorage.getItem('user');

            const parsedUser = JSON.parse(userData);

            const userId = parsedUser.userId;

            const response = await API.get(
                `/expenses/${userId}`
            );

            console.log('EXPENSE RESPONSE:', response.data);

            const total = response.data.reduce(
                (sum, item) => sum + Number(item.amount || 0),
                0
            );

            setMonthlyTotal(total);

        } catch (error) {

            console.log(
                'DASHBOARD ERROR:',
                error.response?.data || error.message
            );
        }
    };
    return (

        <View style={styles.mainContainer}>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.welcome}>
                    Welcome Back , {userName} 👋
                </Text>

                <Text style={styles.heading}>
                    SpendSense
                </Text>

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        Monthly Spending
                    </Text>

                    <Text style={styles.amount}>
                        ₹ {monthlyTotal}
                    </Text>

                    <Text style={styles.subtitle}>
                        Track your expenses smartly
                    </Text>

                </View>

                <PrimaryButton
                    title="➕ Add Expense"
                    onPress={() => navigation.navigate('AddExpense')}
                />

                <PrimaryButton
                    title="📋 View Expenses"
                    onPress={() => navigation.navigate('Expenses')}
                />

                <PrimaryButton
                    title="📊 Analytics"
                    onPress={() => navigation.navigate('Analytics')}
                />

            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddExpense')}
                activeOpacity={0.8}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    container: {
        flex: 1,
    },

    content: {
        padding: 20,
        paddingBottom: 120,
    },

    welcome: {
        marginTop: 10,
        color: Colors.lightText,
        fontSize: 16,
    },

    heading: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 25,
    },

    card: {
        backgroundColor: Colors.primary,

        padding: 30,
        borderRadius: 30,

        marginBottom: 30,

        shadowColor: '#7C3AED',
        shadowOpacity: 0.25,

        shadowOffset: {
            width: 0,
            height: 10,
        },

        shadowRadius: 15,

        elevation: 10,
    },

    cardTitle: {
        color: '#fff',
        fontSize: 18,
    },

    amount: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
        marginVertical: 12,
    },

    subtitle: {
        color: '#EDE9FE',
        fontSize: 14,
    },

    fab: {
        position: 'absolute',
        bottom: 25,
        right: 25,

        width: 68,
        height: 68,

        borderRadius: 40,

        backgroundColor: Colors.darkPurple,

        borderWidth: 4,
        borderColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.3,

        shadowOffset: {
            width: 0,
            height: 5,
        },

        shadowRadius: 10,

        elevation: 12,
    },

    fabText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: -2,
    },
});