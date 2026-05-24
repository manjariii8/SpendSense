import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    RefreshControl
} from 'react-native';

import API from '../services/api'; // adjust path if needed

export default function DashboardScreen({ navigation }) {

    const [monthlyTotal, setMonthlyTotal] = useState(0);

    useEffect(() => {
        fetchMonthlyTotal();
    }, []);

    const fetchMonthlyTotal = async () => {

  try {

    const response = await API.get('/expenses/analytics');

    setMonthlyTotal(response.data.monthlyTotal);

  } catch (error) {
    console.log(error);
  }
};

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>
                SpendSense Dashboard
            </Text>

            <View style={styles.card}>

                <Text style={styles.amount}>
                    ₹ {monthlyTotal}
                </Text>

                <Text>Total Monthly Spending</Text>

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('AddExpense')
                }
            >

                <Text style={styles.buttonText}>
                    Add Expense
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Expenses')
                }
            >

                <Text style={styles.buttonText}>
                    View Expenses
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Analytics')
                }
            >

                <Text style={styles.buttonText}>
                    View Analytics
                </Text>

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

    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },

    card: {
        backgroundColor: '#f3f3f3',
        padding: 25,
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center'
    },

    amount: {
        fontSize: 35,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});