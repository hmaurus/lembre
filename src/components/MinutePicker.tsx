import { Pressable, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { MINUTE_OPTIONS } from '../constants/alarm';

interface MinutePickerProps {
  selected: number;
  onSelect: (minute: number) => void;
  disabled: boolean;
}

export function MinutePicker({ selected, onSelect, disabled }: MinutePickerProps) {
  const handleSelect = (minute: number) => {
    if (disabled) return;
    Haptics.selectionAsync();
    onSelect(minute);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Minutos</Text>
      <View style={styles.options}>
        {MINUTE_OPTIONS.map((minute) => (
          <Pressable
            key={minute}
            style={[
              styles.option,
              minute === selected && styles.optionSelected,
              disabled && styles.optionDisabled,
            ]}
            onPress={() => handleSelect(minute)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.optionText,
                minute === selected && styles.optionTextSelected,
                disabled && styles.optionTextDisabled,
              ]}
            >
              {minute.toString().padStart(2, '0')}
            </Text>
          </Pressable>
        ))}
      </View>
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
  options: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  option: {
    flex: 1,
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
