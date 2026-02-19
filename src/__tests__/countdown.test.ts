/**
 * Testes para o hook useCountdown.
 * Valida cálculo de próximo alarme e countdown restante.
 */
import { renderHook, act } from '@testing-library/react-native';
import { useCountdown } from '../hooks/useCountdown';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useCountdown', () => {
  it('retorna null/0 quando inativo', () => {
    const { result } = renderHook(() => useCountdown(undefined, 3600, false));

    expect(result.current.nextAlarmDate).toBeNull();
    expect(result.current.remainingSeconds).toBe(0);
  });

  it('retorna null/0 quando sem startTimestamp', () => {
    const { result } = renderHook(() => useCountdown(undefined, 3600, true));

    expect(result.current.nextAlarmDate).toBeNull();
    expect(result.current.remainingSeconds).toBe(0);
  });

  it('calcula próximo alarme corretamente no início', () => {
    const now = Date.now();
    const intervalSeconds = 3600; // 1 hora

    const { result } = renderHook(() => useCountdown(now, intervalSeconds, true));

    // Acabou de começar: próximo alarme em ~3600s
    expect(result.current.nextAlarmDate).toBeInstanceOf(Date);
    expect(result.current.remainingSeconds).toBeGreaterThanOrEqual(3599);
    expect(result.current.remainingSeconds).toBeLessThanOrEqual(3600);
  });

  it('atualiza countdown a cada segundo', () => {
    const now = Date.now();
    const { result } = renderHook(() => useCountdown(now, 3600, true));

    const initialSeconds = result.current.remainingSeconds;

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Após 2 segundos, deve ter reduzido ~2s
    expect(result.current.remainingSeconds).toBeLessThan(initialSeconds);
  });

  it('reseta ao desativar', () => {
    const now = Date.now();
    const { result, rerender } = renderHook(
      ({ isActive }: { isActive: boolean }) => useCountdown(now, 3600, isActive),
      { initialProps: { isActive: true } },
    );

    expect(result.current.nextAlarmDate).not.toBeNull();

    rerender({ isActive: false });

    expect(result.current.nextAlarmDate).toBeNull();
    expect(result.current.remainingSeconds).toBe(0);
  });

  it('não retorna remainingSeconds negativo', () => {
    // startTimestamp muito no passado (alarme já deveria ter disparado)
    const pastTimestamp = Date.now() - 7200 * 1000; // 2h atrás
    const { result } = renderHook(() => useCountdown(pastTimestamp, 3600, true));

    expect(result.current.remainingSeconds).toBeGreaterThanOrEqual(0);
  });
});
