import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function TotalCard({ total }) {

  return (
    <View style={styles.card}>

      <Text style={styles.heading}>Monthly Spending</Text>

      <Text style={styles.amount}>₹ {total}</Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#000',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center'
  },

  heading: {
    color: '#fff',
    fontSize: 18
  },

  amount: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10
  }
});