// App.js

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './screens/WelcomeScreen';
import BottomTabs from './navigation/BottomTabs';

import { FAKE_EXPENSES } from './constants/expenses';

export default function App() {
  const [showWelcome, setShowWelcome] =
    useState(true);

  const [expenses, setExpenses] =
    useState(FAKE_EXPENSES);

  const addExpense = (newExpense) => {
    setExpenses((prev) => [
      newExpense,
      ...prev,
    ]);
  };

  if (showWelcome) {
    return (
      <>
        <StatusBar style="light" />

        <WelcomeScreen
          onGetStarted={() =>
            setShowWelcome(false)
          }
        />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <BottomTabs
          expenses={expenses}
          addExpense={addExpense}
        />
      </NavigationContainer>
    </>
  );
}