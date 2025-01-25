import { IMatch, IMatchAttributes } from './models';

export class Match implements IMatch {
  readonly startedAt = Date.now();

  homeTeam: string;

  homeScore: number;

  awayTeam: string;

  awayScore: number;

  constructor(homeTeam: string, awayTeam: string) {
    if (!homeTeam || !awayTeam) {
      throw new Error('Both teams must be provided');
    }
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
  }

  updateScore(homeScore: number, awayScore: number): void {
    if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) {
      throw new Error('Score must be an integer');
    }
    if (homeScore < 0 || awayScore < 0) {
      throw new Error('Score must be a positive number or zero');
    }
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }

  getTotalScore(): number {
    return this.homeScore + this.awayScore;
  }

  getSummary(): IMatchAttributes {
    return {
      homeTeam: this.homeTeam,
      homeScore: this.homeScore,
      awayTeam: this.awayTeam,
      awayScore: this.awayScore,
      startedAt: this.startedAt,
    };
  }
}
