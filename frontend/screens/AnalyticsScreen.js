import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { PieChart } from 'react-native-chart-kit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../services/api';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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

    } finally {
      setLoading(false);
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

  const colors = [
    '#6C63FF',
    '#22C55E',
    '#F97316',
    '#EC4899',
    '#06B6D4',
    '#EAB308'
  ];

  const chartData = Object.keys(categoryTotals).map(
    (category, index) => ({
      name: category,
      amount: categoryTotals[category],
      color: colors[index % colors.length],
      legendFontColor: '#CBD5E1',
      legendFontSize: 13
    })
  );

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.heading}>
        Spending Analytics 📊
      </Text>

      {/* Total Spending Card */}

      <View style={styles.totalCard}>

        <Text style={styles.totalLabel}>
          Total Spending
        </Text>

        <Text style={styles.totalAmount}>
          ₹ {totalSpent}
        </Text>

        <Text style={styles.totalSubtext}>
          Monitor your monthly expenses
        </Text>

      </View>

      {/* Empty State */}

      {
        chartData.length === 0 && (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyEmoji}>
              📉
            </Text>

            <Text style={styles.emptyTitle}>
              No Expenses Yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Add expenses to see analytics
            </Text>

          </View>
        )
      }

      {/* Pie Chart */}

      {
        chartData.length > 0 && (

          <View style={styles.chartCard}>

            <Text style={styles.chartTitle}>
              Category Breakdown
            </Text>

            <PieChart
              data={chartData}
              width={screenWidth - 60}
              height={240}
              chartConfig={{
                backgroundColor: '#1E293B',
                backgroundGradientFrom: '#1E293B',
                backgroundGradientTo: '#1E293B',
                color: opacity =>
                  `rgba(255,255,255,${opacity})`
              }}
              accessor={'amount'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />

          </View>
        )
      }

      {/* Category Cards */}

      {
        chartData.map((item, index) => {

          const percentage =
            ((item.amount / totalSpent) * 100).toFixed(1);

          return (

            <View
              key={index}
              style={styles.categoryCard}
            >

              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: item.color }
                ]}
              />

              <View style={{ flex: 1 }}>

                <Text style={styles.categoryName}>
                  {item.name}
                </Text>

                <Text style={styles.categoryAmount}>
                  ₹ {item.amount}
                </Text>

              </View>

              <Text style={styles.percentage}>
                {percentage}%
              </Text>

            </View>
          );
        })
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center'
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25
  },

  totalCard: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    padding: 28,
    marginBottom: 30,
    elevation: 5
  },

  totalLabel: {
    color: '#E0E7FF',
    fontSize: 16
  },

  totalAmount: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10
  },

  totalSubtext: {
    color: '#E0E7FF',
    fontSize: 14
  },

  chartCard: {
    backgroundColor: '#1E293B',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
    alignItems: 'center'
  },

  chartTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  categoryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    marginRight: 15
  },

  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },

  categoryAmount: {
    color: '#94A3B8',
    marginTop: 5
  },

  percentage: {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: 16
  },

  emptyContainer: {
    backgroundColor: '#1E293B',
    padding: 40,
    borderRadius: 25,
    alignItems: 'center'
  },

  emptyEmoji: {
    fontSize: 50,
    marginBottom: 15
  },

  emptyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },

  emptySubtitle: {
    color: '#94A3B8',
    marginTop: 10
  }

});