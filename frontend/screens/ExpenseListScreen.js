import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl
} from 'react-native';

import API from '../services/api';

export default function ExpenseListScreen() {

    const [expenses, setExpenses] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {

        try {
            const storedUser = await AsyncStorage.getItem('user');

            const user = JSON.parse(storedUser);

            if (!user) {
                return;
            }

            console.log('USER:', user);

            const response = await API.get(
                `/expenses/${user.userId}`
            );

            console.log(
                'EXPENSE RESPONSE:',
                response.data
            );

            setExpenses(response.data);

        } catch (error) {
            console.log(
                'EXPENSE ERROR:',
                error.response?.data || error.message
            );
        }
    };
    const onRefresh = async () => {

        setRefreshing(true);

        await fetchExpenses();

        setRefreshing(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                My Expenses
            </Text>


            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>

                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                        </View>

                        <Text style={styles.amount}>₹ {item.amount}</Text>



                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
        padding: 16
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },

    card: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3
    },

    title: {
        fontSize: 18,
        fontWeight: '600'
    },
    category: {
        color: '#777',
        marginTop: 4
    },

    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2e7d32'
    }
});