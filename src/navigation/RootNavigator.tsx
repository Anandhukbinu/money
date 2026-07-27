import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingScreen } from '@/screens/onboarding/OnboardingScreen';
import { useApp } from '@/context';
import { useTheme } from '@/theme';

import { MainTabNavigator } from './MainTabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { theme } = useTheme();
  const { hasCompletedOnboarding } = useApp();

  return (
    <Stack.Navigator
      initialRouteName={hasCompletedOnboarding ? 'MainTabs' : 'Onboarding'}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
