import React from 'react';
import { IScoreUpdateFormState } from './types';

interface IScoreUpdateFormProps {
  isPending: boolean;
  onSubmit: (formData: FormData) => void;
  updateScore: (
    setState: (scoreData: IScoreUpdateFormState) => IScoreUpdateFormState
  ) => void;
  scoreData: IScoreUpdateFormState;
}

export const UpdateScoreForm = ({
  isPending,
  scoreData,
  onSubmit,
  updateScore,
}: IScoreUpdateFormProps) => {
  return (
    <form action={onSubmit} className='space-y-4 mt-2'>
      <div className='grid grid-cols-2 gap-4'>
        <span className='text-gray-700 font-bold'>{scoreData.homeTeam}</span>

        <span className='text-gray-700 font-bold'>{scoreData.awayTeam}</span>

        <label htmlFor='home-score' className='block'>
          <span className='text-gray-700'>Home Score:</span>
          <input
            type='number'
            id='home-score'
            name='home-score'
            required
            value={scoreData.homeScore}
            onChange={(event) =>
              updateScore((prev) => ({
                ...prev,
                homeScore: Number(event.target.value),
              }))
            }
            className='m-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>

        <label htmlFor='away-score' className='block'>
          <span className='text-gray-700'>Away Score:</span>
          <input
            type='number'
            id='away-score'
            name='away-score'
            required
            value={scoreData.awayScore}
            onChange={(event) =>
              updateScore((prev) => ({
                ...prev,
                awayScore: Number(event.target.value),
              }))
            }
            className='m-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'
      >
        Update Score
      </button>
    </form>
  );
};
