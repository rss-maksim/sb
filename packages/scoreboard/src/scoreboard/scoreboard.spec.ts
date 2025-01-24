import { describe, it, expect, beforeEach } from 'vitest';
import { Scoreboard } from './scoreboard';

describe('ScoreBoard class tests', () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe('startMatch', () => {
    it('should start a new match', () => {
      const match = scoreboard.startMatch({
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
      });

      expect(match.homeTeam).toBe('Mexico');
      expect(match.awayTeam).toBe('Canada');
      expect(match.homeScore).toBe(0);
      expect(match.awayScore).toBe(0);
    });

    it('should throw error when starting match with a team already playing', () => {
      scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' });

      expect(() =>
        scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' })
      ).toThrow();
    });

    it('should throw error when team is empty', () => {
      expect(() =>
        scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: '' })
      ).toThrow();
    });

    it('should throw error when teams are the same', () => {
      expect(() =>
        scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: 'Mexico' })
      ).toThrow();
    });
  });

  describe('updateScore', () => {
    const matchInfo = { homeTeam: 'Mexico', awayTeam: 'Canada' };

    it('should update match score', () => {
      scoreboard.startMatch(matchInfo);
      scoreboard.updateScore({
        ...matchInfo,
        homeScore: 0,
        awayScore: 5,
      });

      const match = scoreboard.getMatch(matchInfo);

      expect(match).toMatchObject({
        ...matchInfo,
        homeScore: 0,
        awayScore: 5,
      });
    });

    it('should throw error when updating non-existent match', () => {
      expect(() =>
        scoreboard.updateScore({
          homeTeam: 'Mexico',
          awayTeam: 'Canada',
          homeScore: 0,
          awayScore: 5,
        })
      ).toThrow();
    });
  });

  describe('finishMatch', () => {
    it('should finish a match', () => {
      scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' });

      expect(
        scoreboard.hasMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' })
      ).toBeTruthy();

      const isMatchFinished = scoreboard.finishMatch({
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
      });

      expect(isMatchFinished).toBeTruthy();
      expect(
        scoreboard.hasMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' })
      ).toBeFalsy();
    });

    it('should throw error when finishing non-existent match', () => {
      expect(
        scoreboard.finishMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' })
      ).toBeFalsy();
    });
  });

  describe('getSummary', () => {
    it('should return an empty array when no matches', () => {
      expect(scoreboard.getSummary()).toEqual([]);
    });

    it('should ongoing matches ordering by total score and start time', async () => {
      const matches = [
        ['Scotland', 'Poland', 0, 0],
        ['Italy', 'France', 0, 5],
        ['Spain', 'England', 10, 2],
        ['Germany', 'Greece', 2, 2],
        ['Uruguay', 'Brazil', 6, 6],
        ['Argentina', 'Peru', 3, 1],
      ] as const;

      for (const [homeTeam, awayTeam, homeScore, awayScore] of matches) {
        scoreboard.startMatch({ homeTeam, awayTeam });
        scoreboard.updateScore({ homeTeam, awayTeam, homeScore, awayScore });
        // Small delay to ensure different start times
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const summary = scoreboard.getSummary();

      expect(summary).toEqual([
        {
          homeTeam: 'Uruguay',
          homeScore: 6,
          awayTeam: 'Brazil',
          awayScore: 6,
          startedAt: expect.any(Number),
        },
        {
          homeTeam: 'Spain',
          homeScore: 10,
          awayTeam: 'England',
          awayScore: 2,
          startedAt: expect.any(Number),
        },
        {
          homeTeam: 'Italy',
          homeScore: 0,
          awayTeam: 'France',
          awayScore: 5,
          startedAt: expect.any(Number),
        },
        {
          homeTeam: 'Argentina',
          homeScore: 3,
          awayTeam: 'Peru',
          awayScore: 1,
          startedAt: expect.any(Number),
        },
        {
          homeTeam: 'Germany',
          homeScore: 2,
          awayTeam: 'Greece',
          awayScore: 2,
          startedAt: expect.any(Number),
        },
        {
          homeTeam: 'Scotland',
          homeScore: 0,
          awayTeam: 'Poland',
          awayScore: 0,
          startedAt: expect.any(Number),
        },
      ]);
    });
  });

  describe('getMatch', () => {
    it('should return match', () => {
      scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' });

      expect(
        scoreboard.getMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' })
      ).toEqual({
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: 0,
        awayScore: 0,
        startedAt: expect.any(Number),
      });
    });

    it('should throw error when match does not exist', () => {
      expect(() =>
        scoreboard.getMatch({ homeTeam: 'Spain', awayTeam: 'France' })
      ).toThrow();
    });
  });

  describe('hasMatch', () => {
    it('should return true when match exists', () => {
      scoreboard.startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' });

      expect(scoreboard.hasMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' }))
        .toBeTruthy;
    });

    it('should return false when match does not exist', () => {
      expect(
        scoreboard.hasMatch({ homeTeam: 'Spain', awayTeam: 'France' })
      ).toBeFalsy();
    });
  });
});
