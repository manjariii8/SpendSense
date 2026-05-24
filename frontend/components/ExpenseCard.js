import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
export default function ExpenseCard({ expense }) {

  return (
    <View style={styles.card}>

      <Text style={styles.title}>{expense.title}</Text>

      <Text>₹ {expense.amount}</Text>

      <Text>{expense.category}</Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});