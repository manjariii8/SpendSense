import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Colors from '../theme/colors';

export default function ExpenseCard({
    expense,
    onDelete,
}) {

    return (

        <View style={styles.card}>

            <View style={styles.leftSection}>

                <Text style={styles.title}>
                    {expense.title}
                </Text>

                <Text style={styles.category}>
                    {expense.category}
                </Text>

            </View>

            <View style={styles.rightSection}>

                <Text style={styles.amount}>
                    ₹ {expense.amount}
                </Text>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(expense.id)}
                >
                    <Text style={styles.deleteText}>
                        Delete
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#fff',

        padding: 20,

        borderRadius: 22,

        marginBottom: 16,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#F3F4F6',

        shadowColor: '#000',
        shadowOpacity: 0.04,

        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowRadius: 6,

        elevation: 3,
    },

    leftSection: {
        flex: 1,
    },

    rightSection: {
        alignItems: 'flex-end',
    },

    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.text,
    },

    category: {
        marginTop: 5,
        color: Colors.lightText,
    },

    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.danger,
        marginBottom: 10,
    },

    deleteButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },

    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});