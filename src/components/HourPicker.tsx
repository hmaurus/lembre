import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { HOUR_OPTIONS } from '../constants/alarm';

interface HourPickerProps {
  selected: number;
  onSelect: (hour: number) => void;
  disabled: boolean;
}

export function HourPicker({ selected, onSelect, disabled }: HourPickerProps) {
  const handleSelect = (hour: number) => {
    if (disabled) return;
    Haptics.selectionAsync();
    onSelect(hour);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horas</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {HOUR_OPTIONS.map((hour) => (
          <Pressable
            key={hour}
            style={[
              styles.option,
              hour === selected && styles.optionSelected,
              disabled && styles.optionDisabled,
            ]}
            onPress={() => handleSelect(hour)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.optionText,
                hour === selected && styles.optionTextSelected,
                disabled && styles.optionTextDisabled,
              ]}
            >
              {hour}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  scrollContent: {
    gap: 8,
    paddingHorizontal: 4,
  },
  option: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderCurve: 'continuous',
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#007AFF',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  optionTextDisabled: {
    color: '#999',
  },
});
