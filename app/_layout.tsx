import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007BFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Create Account' }} />
      <Stack.Screen name="employee-form" options={{ title: 'Employee Information' }} />
    </Stack>
  );
}