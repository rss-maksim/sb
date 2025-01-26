import React from 'react';
import { IMatchFormState } from './types';

interface IStartMatchFormProps {
  isPending: boolean;
  onSubmit: (formData: FormData) => void;
  updateMatchData: (
    setState: (scoreData: IMatchFormState) => IMatchFormState
  ) => void;
  matchData: IMatchFormState;
}

export const StartMatchForm = ({
  isPending,
  matchData,
  onSubmit,
  updateMatchData,
}: IStartMatchFormProps) => {
  return (
    <form action={onSubmit} className='space-y-4'>
      <div className='flex flex-col space-y-4'>
        <label htmlFor='home-team'>
          <span className='text-gray-700'>Home Team:</span>
          <input
            type='text'
            id='home-team'
            name='home-team'
            required
            value={matchData.homeTeam}
            onChange={(e) =>
              updateMatchData((prev) => ({
                ...prev,
                homeTeam: e.target.value,
              }))
            }
            className='mt-1 w-full rounded-md border-gray-700 shadow-sm'
          />
        </label>

        <label htmlFor='away-team'>
          <span className='text-gray-700'>Away Team:</span>
          <input
            type='text'
            id='away-team'
            name='away-team'
            required
            value={matchData.awayTeam}
            onChange={(e) =>
              updateMatchData((prev) => ({
                ...prev,
                awayTeam: e.target.value,
              }))
            }
            className='mt-1 w-full rounded-md border-gray-700 shadow-sm'
          />
        </label>
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
      >
        {isPending ? 'Starting...' : 'Start Match'}
      </button>
    </form>
  );
};
