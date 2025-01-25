import { Match } from './match';
import {
  IBaseMatchAttributes,
  IMatch,
  IMatchAttributes,
  IScoreboard,
} from './models';

export class Scoreboard implements IScoreboard {
  // Using a Map to store matches to optimize all the operations
  // adding, search and deletion to be O(1) on average
  private readonly matches: Map<string, IMatch>;

  constructor() {
    this.matches = new Map();
  }

  startMatch({ homeTeam, awayTeam }: IBaseMatchAttributes): IMatchAttributes {
    if (!homeTeam || !awayTeam) {
      throw new Error('Both teams must be provided');
    }
    const homeTeamFormatted = Scoreboard.formatTeamName(homeTeam);
    const awayTeamFormatted = Scoreboard.formatTeamName(awayTeam);

    if (homeTeamFormatted === awayTeamFormatted) {
      throw new Error('Teams must be different');
    }

    const matchKey = Scoreboard.generateMatchKey(homeTeam, awayTeam);

    if (this.matches.has(matchKey)) {
      throw new Error('Teams are already playing');
    }

    const match = new Match(homeTeam, awayTeam);
    this.matches.set(matchKey, match);

    return match.getSummary();
  }

  updateScore({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
  }: Omit<IMatchAttributes, 'startedAt'>): void {
    if (!homeTeam || !awayTeam) {
      throw new Error('Both teams must be provided');
    }
    const match = this.getMatch({ homeTeam, awayTeam });
    match.updateScore(homeScore, awayScore);
  }

  finishMatch({ homeTeam, awayTeam }: IBaseMatchAttributes): boolean {
    return this.matches.delete(Scoreboard.generateMatchKey(homeTeam, awayTeam));
  }

  getSummary(): IMatchAttributes[] {
    const matches = Array.from(this.matches.values());

    const sortedMatches = matches.slice().sort((matchA, matchB) => {
      const scoreDiff = matchB.getTotalScore() - matchA.getTotalScore();

      if (scoreDiff !== 0) {
        return scoreDiff;
      }
      return matchB.startedAt - matchA.startedAt;
    });

    return sortedMatches.map((match) => match.getSummary());
  }

  getMatch({ homeTeam, awayTeam }: IBaseMatchAttributes): IMatch {
    const matchKey = Scoreboard.generateMatchKey(homeTeam, awayTeam);
    const match = this.matches.get(matchKey);
    if (!match) {
      throw new Error('Match not found');
    }
    return match;
  }

  hasMatch({ homeTeam, awayTeam }: IBaseMatchAttributes): boolean {
    if (!homeTeam || !awayTeam) {
      return false;
    }
    const matchKey = Scoreboard.generateMatchKey(homeTeam, awayTeam);

    return this.matches.has(matchKey);
  }

  clearScoreboard(): void {
    this.matches.clear();
  }

  static formatTeamName(team: string): string {
    return team?.trim()?.toLowerCase();
  }

  // Alternatively we could use another deterministic hashing algorithm
  // which always produces the same hash for the same input
  static generateMatchKey(homeTeam: string, awayTeam: string): string {
    const homeTeamFormatted = Scoreboard.formatTeamName(homeTeam);
    const awayTeamFormatted = Scoreboard.formatTeamName(awayTeam);

    return `${homeTeamFormatted}-${awayTeamFormatted}`;
  }
}
