export interface IMatchAttributes {
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
  startedAt: number;
}

export interface IMatch extends IMatchAttributes {
  updateScore(homeScore: number, awayScore: number): void;
  getTotalScore(): number;
  getSummary(): IMatchAttributes;
}

export interface IScoreboard {
  startMatch(homeTeam: string, awayTeam: string): IMatchAttributes;
  updateScore(matchInfo: Omit<IMatchAttributes, 'startedAt'>): void;
  finishMatch(homeTeam: string, awayTeam: string): void;
  getSummary(): IMatchAttributes[];
  hasMatch(homeTeam: string, awayTeam: string): boolean;
}
