import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';

import { PieChart } from 'react-native-chart-kit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {

    try {

      const user = JSON.parse(
        await AsyncStorage.getItem('user')
      );

      const response = await API.get(
        `/expenses/${user.userId}`
      );

      setExpenses(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const categoryTotals = {};

  expenses.forEach(expense => {

    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const chartData = Object.keys(categoryTotals).map(
    (category, index) => ({
      name: category,
      amount: categoryTotals[category],
      color: [
        '#6C63FF',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ][index % 5],
      legendFontColor: '#fff',
      legendFontSize: 14
    })
  );

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Spending Analytics
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Total Spent
        </Text>

        <Text style={styles.amount}>
          ₹ {totalSpent}
        </Text>
      </View>

      {
        chartData.length > 0 && (
          <PieChart
            data={chartData}
            width={screenWidth - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#0F172A',
              backgroundGradientFrom: '#0F172A',
              backgroundGradientTo: '#0F172A',
              color: opacity => `rgba(255,255,255,${opacity})`
            }}
            accessor={'amount'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            absolute
          />
        )
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 15
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30
  },

  cardTitle: {
    color: '#94A3B8',
    fontSize: 16
  },

  amount: {
    color: '#22C55E',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10
  }
});