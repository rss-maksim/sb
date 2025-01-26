'use client';

import React, { useState, useTransition } from 'react';
import { IMatchAttributes } from '@lib/scoreboard';

import { useScoreboard } from '../../scoreboard-ui/useScoreboard';
import { IMatchFormState, IScoreUpdateFormState } from './types';
import { MatchesList } from './MatchesList';
import { UpdateScoreForm } from './UpdateScoreForm';
import { StartMatchForm } from './StartMatchForm';

export const ScoreboardExample: React.FC = () => {
  const scoreboard = useScoreboard();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [matchForm, setMatchForm] = useState<IMatchFormState>({
    homeTeam: '',
    awayTeam: '',
  });
  const [isUpdatingScoreInProgress, setIsUpdatingScoreInProgress] =
    useState(false);

  const [scoreForm, setScoreForm] = useState<IScoreUpdateFormState>({
    homeTeam: '',
    awayTeam: '',
    homeScore: 0,
    awayScore: 0,
  });

  const startMatchHandler = async (formData: FormData) => {
    const homeTeam = formData.get('home-team') as string;
    const awayTeam = formData.get('away-team') as string;

    startTransition(() => {
      try {
        scoreboard.startMatch(homeTeam, awayTeam);

        setMatchForm({ homeTeam: '', awayTeam: '' });
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to start match'
        );
      }
    });
  };

  const updateScoreHandler = async (formData: FormData) => {
    const homeScore = Number(formData.get('home-score'));
    const awayScore = Number(formData.get('away-score'));

    startTransition(() => {
      try {
        scoreboard.updateScore({
          homeTeam: scoreForm.homeTeam,
          awayTeam: scoreForm.awayTeam,
          homeScore,
          awayScore,
        });

        setScoreForm({
          homeTeam: '',
          awayTeam: '',
          homeScore: 0,
          awayScore: 0,
        });
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to update score'
        );
      } finally {
        setIsUpdatingScoreInProgress(false);
      }
    });
  };

  const finishMatchHandler = (match: IMatchAttributes) => {
    const { homeTeam, awayTeam } = match;

    startTransition(() => {
      try {
        scoreboard.finishMatch(homeTeam, awayTeam);

        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to finish match'
        );
      }
    });
  };

  const updateScoreEditModeHandler = (match: IMatchAttributes) => {
    setIsUpdatingScoreInProgress(true);
    setScoreForm({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
    });
  };

  return (
    <div className='mx-auto'>
      <h1 className='text-2xl font-bold'>Football World Cup Scoreboard</h1>

      {error && (
        <div
          role='alert'
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
        >
          {error}
        </div>
      )}

      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Start Match Form</h2>
        <StartMatchForm
          isPending={isPending}
          matchData={matchForm}
          onSubmit={startMatchHandler}
          updateMatchData={setMatchForm}
        />
      </div>

      {isUpdatingScoreInProgress && (
        <div className='mt-12'>
          <h2 className='text-xl font-bold'>Update Score Form</h2>

          <UpdateScoreForm
            isPending={isPending}
            scoreData={scoreForm}
            onSubmit={updateScoreHandler}
            updateScore={setScoreForm}
          />
        </div>
      )}

      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Current Matches</h2>
        <MatchesList
          matches={scoreboard.matches}
          onEnterScoreEditMode={updateScoreEditModeHandler}
          onFinishMatch={finishMatchHandler}
        />
      </div>
    </div>
  );
};
