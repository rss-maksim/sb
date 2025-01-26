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

export const useScoreboard = (): IUseScoreboard => {};
