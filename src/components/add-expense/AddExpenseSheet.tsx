import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useApp } from '@/context';
import { ExpenseType } from '@/types';
import { useTheme } from '@/theme';

import { Button, SegmentedControl, TextField } from '@/components/ui';

export interface AddExpenseSheetRef {
  expand: () => void;
  close: () => void;
}

interface AddExpenseSheetProps {
  onSubmitted?: () => void;
}

export const AddExpenseSheet = forwardRef<BottomSheet, AddExpenseSheetProps>(
  function AddExpenseSheet({ onSubmitted }, ref) {
    const { theme } = useTheme();
    const { settings, addExpense } = useApp();
    const snapPoints = useMemo(() => ['75%'], []);

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(settings.categories[0] ?? 'Other');
    const [expenseType, setExpenseType] = useState<ExpenseType>('need');
    const [countTowardLimit, setCountTowardLimit] = useState(true);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const resetForm = useCallback(() => {
      setAmount('');
      setCategory(settings.categories[0] ?? 'Other');
      setExpenseType('need');
      setCountTowardLimit(true);
      setNote('');
      setError('');
    }, [settings.categories]);

    const renderBackdrop = useCallback(
      (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    const handleSubmit = async () => {
      const parsedAmount = Number(amount);

      if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        setError('Enter a valid amount');
        return;
      }

      await addExpense({
        amount: parsedAmount,
        category,
        note,
        countTowardLimit,
        expenseType,
      });

      resetForm();
      onSubmitted?.();

      if (ref && 'current' in ref && ref.current) {
        ref.current.close();
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
        onChange={(index) => {
          if (index === -1) {
            resetForm();
          }
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={[
            styles.content,
            { paddingHorizontal: theme.spacing.md },
          ]}
        >
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Add Expense
          </Text>
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
            ]}
          >
            Log spending in under 5 seconds.
          </Text>

          <View style={styles.form}>
            <TextField
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0"
              error={error}
            />

            <View style={styles.field}>
              <Text style={[theme.typography.label, { color: theme.colors.text }]}>
                Category
              </Text>
              <View style={styles.chips}>
                {settings.categories.map((item, index) => {
                  const selected = item === category;

                  return (
                    <Button
                      key={`${item}-${index}`}
                      label={item}
                      variant={selected ? 'primary' : 'secondary'}
                      onPress={() => setCategory(item)}
                      style={styles.chip}
                    />
                  );
                })}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[theme.typography.label, { color: theme.colors.text }]}>
                Need or Want
              </Text>
              <SegmentedControl
                options={[
                  { label: 'Need', value: 'need' },
                  { label: 'Want', value: 'want' },
                ]}
                value={expenseType}
                onChange={setExpenseType}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchCopy}>
                <Text style={[theme.typography.label, { color: theme.colors.text }]}>
                  Count toward daily limit
                </Text>
                <Text
                  style={[
                    theme.typography.caption,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Turn off for reimbursements or shared costs.
                </Text>
              </View>
              <Switch
                value={countTowardLimit}
                onValueChange={setCountTowardLimit}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
              />
            </View>

            <TextField
              label="Note (optional)"
              value={note}
              onChangeText={setNote}
              placeholder="Coffee with friend"
            />

            <Button label="Save Expense" onPress={handleSubmit} />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  switchCopy: {
    flex: 1,
    gap: 4,
  },
});
