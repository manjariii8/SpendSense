import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    Alert,
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

            const storedUser =
                await AsyncStorage.getItem('user');

            const user = JSON.parse(storedUser);

            if (!user) return;

            const response = await API.get(
                `/expenses/${user.userId}`
            );

            setExpenses(response.data);

        } catch (error) {

            console.log(
                'EXPENSE ERROR:',
                error.response?.data || error.message
            );
        }
    };

    const deleteExpense = async (id) => {

        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },

                {
                    text: 'Delete',

                    style: 'destructive',

                    onPress: async () => {

                        try {

                            await API.delete(
                                `/expenses/delete/${id}`
                            );

                            fetchExpenses();

                        } catch (error) {

                            console.log(error);
                        }
                    },
                },
            ]
        );
    };

    const onRefresh = async () => {

        setRefreshing(true);

        await fetchExpenses();

        setRefreshing(false);
    };

    const renderExpense = ({ item }) => (

        <View style={styles.card}>

            <View style={styles.leftSection}>

                <Text style={styles.title}>
                    {item.title}
                </Text>

                <Text style={styles.category}>
                    {item.category}
                </Text>

            </View>

            <View style={styles.rightSection}>

                <Text style={styles.amount}>
                    ₹ {item.amount}
                </Text>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteExpense(item.id)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.deleteText}>
                        Delete
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>
                My Expenses
            </Text>

            {
                expenses.length === 0 ? (

                    <View style={styles.emptyContainer}>

                        <Text style={styles.emptyEmoji}>
                            💸
                        </Text>

                        <Text style={styles.emptyText}>
                            No expenses added yet
                        </Text>

                    </View>

                ) : (

                    <FlatList
                        data={expenses}
                        keyExtractor={(item) =>
                            item.id.toString()
                        }
                        renderItem={renderExpense}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 30
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                )
            }

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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#111827',
    },

    card: {
        backgroundColor: '#fff',

        padding: 18,

        borderRadius: 20,

        marginBottom: 16,

        flexDirection: 'row',

        justifyContent: 'space-between',

        alignItems: 'center',

        shadowColor: '#000',

        shadowOpacity: 0.05,

        shadowOffset: {
            width: 0,
            height: 3,
        },

        shadowRadius: 5,

        elevation: 3,
    },

    leftSection: {
        flex: 1,
    },

    rightSection: {
        alignItems: 'flex-end',
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    category: {
        color: '#6B7280',
        marginTop: 6,
        fontSize: 14,
    },

    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6C63FF',
        marginBottom: 10,
    },

    deleteButton: {
        backgroundColor: '#EF4444',

        paddingHorizontal: 14,

        paddingVertical: 8,

        borderRadius: 12,
    },

    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },

    emptyEmoji: {
        fontSize: 70,
        marginBottom: 15,
    },

    emptyText: {
        fontSize: 18,
        color: '#777',
    },
});