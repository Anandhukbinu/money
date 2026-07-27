import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button, ScreenContainer, SegmentedControl, TextField } from '@/components';
import { useApp } from '@/context';
import { ThemeMode, useTheme } from '@/theme';

export function SettingsScreen() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const { settings, updateSettings, addCategory, removeCategory } = useApp();
  const [dailyLimit, setDailyLimit] = useState(String(settings.dailyLimit));
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setDailyLimit(String(settings.dailyLimit));
  }, [settings.dailyLimit]);

  const handleSaveLimit = async () => {
    const parsedLimit = Number(dailyLimit);

    if (!dailyLimit || Number.isNaN(parsedLimit) || parsedLimit <= 0) {
      Alert.alert('Invalid limit', 'Enter a valid daily limit.');
      return;
    }

    await updateSettings({ dailyLimit: parsedLimit });
    Alert.alert('Saved', 'Daily limit updated.');
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      return;
    }

    await addCategory(newCategory);
    setNewCategory('');
  };

  const handleRemoveCategory = (category: string) => {
    Alert.alert('Remove category', `Remove "${category}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeCategory(category),
      },
    ]);
  };

  return (
    <ScreenContainer
      title="Settings"
      subtitle="Daily limit, categories, and theme preferences."
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Daily limit
          </Text>
          <TextField
            value={dailyLimit}
            onChangeText={setDailyLimit}
            keyboardType="number-pad"
            placeholder="300"
          />
          <Button label="Save limit" onPress={handleSaveLimit} />
        </View>

        <View style={styles.section}>
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Theme
          </Text>
          <SegmentedControl<ThemeMode>
            options={[
              { label: 'System', value: 'system' },
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
            ]}
            value={themeMode}
            onChange={setThemeMode}
          />
        </View>

        <View style={styles.section}>
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Categories
          </Text>
          <View style={styles.categoryList}>
            {settings.categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => handleRemoveCategory(category)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <Text style={[theme.typography.body, { color: theme.colors.text }]}>
                  {category}
                </Text>
                <Text
                  style={[
                    theme.typography.caption,
                    { color: theme.colors.statusOverspent },
                  ]}
                >
                  Remove
                </Text>
              </Pressable>
            ))}
          </View>
          <TextField
            value={newCategory}
            onChangeText={setNewCategory}
            placeholder="New category"
          />
          <Button label="Add category" variant="secondary" onPress={handleAddCategory} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 28,
    paddingBottom: 32,
  },
  section: {
    gap: 12,
  },
  categoryList: {
    gap: 8,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
