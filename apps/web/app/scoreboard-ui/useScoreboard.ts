import { Scoreboard, IMatchAttributes } from '@lib/scoreboard';
import { useRef, useState } from 'react';

interface IUseScoreboard {
  matches: IMatchAttributes[];
  startMatch(homeTeam: string, awayTeam: string): IMatchAttributes;
  updateScore({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
  }: Omit<IMatchAttributes, 'startedAt'>): void;
  finishMatch(homeTeam: string, awayTeam: string): void;
  hasMatch(homeTeam: string, awayTeam: string): boolean;
}

export const useScoreboard = (): IUseScoreboard => {
  const scoreboardRef = useRef<Scoreboard>(new Scoreboard());
  const scoreboard = scoreboardRef.current;
  const [matches, setMatches] = useState<IMatchAttributes[]>(
    scoreboard.getSummary()
  );

  return {
    matches,
    startMatch: (homeTeam: string, awayTeam: string): IMatchAttributes => {
      const match = scoreboard.startMatch({ homeTeam, awayTeam });

      setMatches(() => scoreboard.getSummary());

      return match;
    },
    updateScore: (matchData: Omit<IMatchAttributes, 'startedAt'>): void => {
      scoreboard.updateScore(matchData);

      setMatches(() => scoreboard.getSummary());
    },
    finishMatch: (homeTeam: string, awayTeam: string): void => {
      scoreboard.finishMatch({ homeTeam, awayTeam });

      setMatches(() => scoreboard.getSummary());
    },

    hasMatch: (homeTeam: string, awayTeam: string): boolean => {
      return scoreboard.hasMatch({ homeTeam, awayTeam });
    },
  };
};
