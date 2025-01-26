import React from 'react';
import { IMatchAttributes } from '@lib/scoreboard';

interface MatchesListProps {
  matches: IMatchAttributes[];
  onEnterScoreEditMode: (match: IMatchAttributes) => void;
  onFinishMatch: (match: IMatchAttributes) => void;
}

export const MatchesList = ({
  matches,
  onEnterScoreEditMode,
  onFinishMatch,
}: MatchesListProps) => {
  if (!matches.length) {
    return <p className='text-gray-500'>No matches in progress</p>;
  }

  return (
    <ul className='space-y-2'>
      {matches.map((match) => (
        <li
          key={`${match.homeTeam}-${match.awayTeam}}`}
          className='flex justify-between items-center bg-gray-100 p-3 rounded'
        >
          <span>
            <span>{match.homeTeam}</span>
            <span className='ml-2 font-bold'>{match.homeScore}</span>
            <span className='ml-2 mr-2'>-</span>
            <span className='mr-2 font-bold'>{match.awayScore}</span>
            <span>{match.awayTeam}</span>
          </span>

          <button
            onClick={() => onEnterScoreEditMode(match)}
            className='text-green-500 hover:bg-red-100 px-2 py-1 rounded'
          >
            Update Score
          </button>
          <button
            onClick={() => onFinishMatch(match)}
            className='text-red-500 hover:bg-red-100 px-2 py-1 rounded'
          >
            Finish Match
          </button>
        </li>
      ))}
    </ul>
  );
};
