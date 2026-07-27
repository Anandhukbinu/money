import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button, ScreenContainer, TextField } from '@/components';
import { CURRENCY_OPTIONS } from '@/constants';
import { useApp } from '@/context';
import { RootStackScreenProps } from '@/navigation';
import { useTheme } from '@/theme';

export function OnboardingScreen({
  navigation,
}: RootStackScreenProps<'Onboarding'>) {
  const { theme } = useTheme();
  const { completeOnboarding } = useApp();
  const [dailyLimit, setDailyLimit] = useState('300');
  const [currency, setCurrency] = useState<string>(CURRENCY_OPTIONS[0]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    const parsedLimit = Number(dailyLimit);

    if (!dailyLimit || Number.isNaN(parsedLimit) || parsedLimit <= 0) {
      setError('Enter a valid daily limit');
      return;
    }

    setIsSubmitting(true);
    await completeOnboarding(parsedLimit, currency);
    navigation.replace('MainTabs');
    setIsSubmitting(false);
  };

  return (
    <ScreenContainer
      title="Set your daily limit"
      subtitle="We'll help you stay on track every day."
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TextField
          label="Daily spending limit"
          value={dailyLimit}
          onChangeText={setDailyLimit}
          keyboardType="number-pad"
          placeholder="300"
          error={error}
        />

        <View style={styles.section}>
          <Text style={[theme.typography.label, { color: theme.colors.text }]}>
            Currency
          </Text>
          <View style={styles.currencyRow}>
            {CURRENCY_OPTIONS.map((option) => {
              const selected = option === currency;

              return (
                <Pressable
                  key={option}
                  onPress={() => setCurrency(option)}
                  style={[
                    styles.currencyChip,
                    {
                      backgroundColor: selected
                        ? theme.colors.primary
                        : theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      theme.typography.label,
                      {
                        color: selected
                          ? theme.colors.primaryText
                          : theme.colors.text,
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Button
          label={isSubmitting ? 'Saving...' : 'Get Started'}
          onPress={handleContinue}
          disabled={isSubmitting}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingBottom: 32,
  },
  section: {
    gap: 12,
  },
  currencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  currencyChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
