import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useScoreboard } from './useScoreboard';

describe('useScoreboard', () => {
  it('should initialize with an empty scoreboard', () => {
    const { result } = renderHook(() => useScoreboard());

    expect(result.current.matches).toEqual([]);
  });

  it('should start a match and update matches state', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startMatch('Uruguay', 'Italy');
    });

    expect(result.current.matches).toHaveLength(1);
    expect(result.current.matches[0]).toMatchObject({
      homeTeam: 'Uruguay',
      awayTeam: 'Italy',
      homeScore: 0,
      awayScore: 0,
    });
  });

  it('should update the score of a match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startMatch('Poland', 'France');
    });

    act(() => {
      result.current.updateScore({
        homeTeam: 'Poland',
        awayTeam: 'France',
        homeScore: 2,
        awayScore: 1,
      });
    });

    expect(result.current.matches[0]).toMatchObject({
      homeTeam: 'Poland',
      awayTeam: 'France',
      homeScore: 2,
      awayScore: 1,
    });
  });

  it('should finish a match and remove it from the list of matches', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startMatch('Poland', 'France');
    });

    act(() => {
      result.current.finishMatch('Poland', 'France');
    });

    expect(result.current.matches).toEqual([]);
  });

  it('should correctly check if a match exists', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startMatch('Poland', 'France');
    });

    expect(result.current.hasMatch('Poland', 'France')).toBe(true);
    expect(result.current.hasMatch('Sweden', 'Norway')).toBe(false);
  });
});
