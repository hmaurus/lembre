/**
 * Testes de componentes UI: pickers, seletores e tela principal.
 * Valida renderização, interação, acessibilidade e estados.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HourPicker } from '../components/HourPicker';
import { MinutePicker } from '../components/MinutePicker';
import { AlertTypeSelector } from '../components/AlertTypeSelector';

describe('HourPicker', () => {
  const defaultProps = { selected: 1, onSelect: jest.fn(), disabled: false };

  it('renderiza 12 opções de hora', () => {
    const { getAllByRole } = render(<HourPicker {...defaultProps} />);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(12);
  });

  it('marca a hora selecionada como selected', () => {
    const { getByLabelText } = render(<HourPicker {...defaultProps} selected={3} />);
    const option = getByLabelText('3 horas');
    expect(option.props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true }),
    );
  });

  it('chama onSelect ao tocar uma hora', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <HourPicker {...defaultProps} onSelect={onSelect} />,
    );
    fireEvent.press(getByLabelText('5 horas'));
    expect(onSelect).toHaveBeenCalledWith(5);
  });

  it('não chama onSelect quando disabled', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <HourPicker {...defaultProps} onSelect={onSelect} disabled />,
    );
    fireEvent.press(getByLabelText('5 horas'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('tem accessibilityLabel no container do grupo', () => {
    const { getByLabelText } = render(<HourPicker {...defaultProps} />);
    const group = getByLabelText('Horas');
    expect(group.props.accessibilityRole).toBe('radiogroup');
  });

  it('usa singular para 1 hora', () => {
    const { getByLabelText } = render(<HourPicker {...defaultProps} />);
    expect(getByLabelText('1 hora')).toBeTruthy();
  });

  it('usa plural para 2+ horas', () => {
    const { getByLabelText } = render(<HourPicker {...defaultProps} />);
    expect(getByLabelText('2 horas')).toBeTruthy();
  });
});

describe('MinutePicker', () => {
  const defaultProps = { selected: 0, onSelect: jest.fn(), disabled: false };

  it('renderiza 4 opções (00, 15, 30, 45)', () => {
    const { getAllByRole } = render(<MinutePicker {...defaultProps} />);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(4);
  });

  it('chama onSelect ao tocar uma opção', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <MinutePicker {...defaultProps} onSelect={onSelect} />,
    );
    fireEvent.press(getByLabelText('30 minutos'));
    expect(onSelect).toHaveBeenCalledWith(30);
  });

  it('marca a opção selecionada', () => {
    const { getByLabelText } = render(
      <MinutePicker {...defaultProps} selected={15} />,
    );
    const option = getByLabelText('15 minutos');
    expect(option.props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true }),
    );
  });
});

describe('AlertTypeSelector', () => {
  const defaultProps = {
    selected: 'vibração' as const,
    onSelect: jest.fn(),
    disabled: false,
  };

  it('renderiza 3 opções de alerta', () => {
    const { getAllByRole } = render(<AlertTypeSelector {...defaultProps} />);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('tem accessibility labels sem emoji', () => {
    const { getByLabelText } = render(<AlertTypeSelector {...defaultProps} />);
    expect(getByLabelText('Silencioso')).toBeTruthy();
    expect(getByLabelText('Vibração')).toBeTruthy();
    expect(getByLabelText('Som')).toBeTruthy();
  });

  it('chama onSelect com o tipo correto', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <AlertTypeSelector {...defaultProps} onSelect={onSelect} />,
    );
    fireEvent.press(getByLabelText('Som'));
    expect(onSelect).toHaveBeenCalledWith('som');
  });

  it('não chama onSelect quando disabled', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <AlertTypeSelector {...defaultProps} onSelect={onSelect} disabled />,
    );
    fireEvent.press(getByLabelText('Som'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
