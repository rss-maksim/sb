import { describe, it, expect } from 'vitest';
import { Match } from './match';

describe('Match class tests', () => {
  describe('constructor', () => {
    it('should create a new match with initial score 0-0', () => {
      const match = new Match('Spain', 'Brazil');

      expect(match.homeTeam).toBe('Spain');
      expect(match.awayTeam).toBe('Brazil');
      expect(match.homeScore).toBe(0);
      expect(match.awayScore).toBe(0);
    });

    it('should throw error when creating match without teams', () => {
      expect(() => new Match('', 'Brazil')).toThrow();
      expect(() => new Match('Spain', '')).toThrow();
    });
  });

  describe('updateScore', () => {
    it('should update scores correctly', () => {
      const match = new Match('Spain', 'Brazil');
      match.updateScore(2, 1);

      expect(match.homeScore).toBe(2);
      expect(match.awayScore).toBe(1);
    });

    it('should throw error when input is invalid score', () => {
      const match = new Match('Spain', 'Brazil');

      expect(() => match.updateScore(-1, 0)).toThrow();
      expect(() => match.updateScore(1.5, 1)).toThrow();
    });
  });

  describe('getTotalScore', () => {
    it('should calculate total score correctly when match just started', () => {
      const match = new Match('Spain', 'Brazil');

      expect(match.getTotalScore()).toBe(0);
    });

    it('should calculate total score correctly', () => {
      const match = new Match('Spain', 'Brazil');

      match.updateScore(2, 3);
      expect(match.getTotalScore()).toBe(5);
    });
  });

  describe('getSummary', () => {
    it('should provide a match summary when match just started', () => {
      const match = new Match('Spain', 'Brazil');

      expect(match.getSummary()).toEqual({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        homeScore: 0,
        awayScore: 0,
        startedAt: match.startedAt,
      });
    });

    it('should provide a match summary', () => {
      const match = new Match('Spain', 'Brazil');

      match.updateScore(2, 3);

      expect(match.getSummary()).toEqual({
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        homeScore: 2,
        awayScore: 3,
        startedAt: match.startedAt,
      });
    });
  });
});
