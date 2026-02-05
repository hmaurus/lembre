import { Pressable, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { AlertType } from '../types/alarm';

interface AlertTypeSelectorProps {
  selected: AlertType;
  onSelect: (type: AlertType) => void;
  disabled: boolean;
}

const ALERT_OPTIONS: { type: AlertType; label: string }[] = [
  { type: 'silencioso', label: 'Silencioso' },
  { type: 'vibração', label: 'Vibração' },
  { type: 'som', label: 'Som' },
];

export function AlertTypeSelector({
  selected,
  onSelect,
  disabled,
}: AlertTypeSelectorProps) {
  const handleSelect = (type: AlertType) => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de alerta</Text>
      <View style={styles.options}>
        {ALERT_OPTIONS.map(({ type, label }) => (
          <Pressable
            key={type}
            style={[
              styles.option,
              type === selected && styles.optionSelected,
              disabled && styles.optionDisabled,
            ]}
            onPress={() => handleSelect(type)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.optionText,
                type === selected && styles.optionTextSelected,
                disabled && styles.optionTextDisabled,
              ]}
            >
              {label}
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
    fontSize: 14,
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
