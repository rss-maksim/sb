export interface IBaseMatchAttributes {
  homeTeam: string;
  awayTeam: string;
}

export interface IMatchAttributes extends IBaseMatchAttributes {
  homeScore: number;
  awayScore: number;
  startedAt: number;
}

export interface IMatch extends IMatchAttributes {
  updateScore(homeScore: number, awayScore: number): void;
  getTotalScore(): number;
  getSummary(): IMatchAttributes;
}

export interface IScoreboard {
  startMatch(matchInfo: IBaseMatchAttributes): IMatchAttributes;
  updateScore(matchInfo: Omit<IMatchAttributes, 'startedAt'>): void;
  finishMatch(matchInfo: IBaseMatchAttributes): boolean;
  getSummary(): IMatchAttributes[];
  getMatch(matchInfo: IBaseMatchAttributes): IMatch;
  hasMatch(matchInfo: IBaseMatchAttributes): boolean;
}
