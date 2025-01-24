'use client';

import React from 'react';
import { greet } from '@lib/scoreboard';

export const ScoreboardExample = () => {
  const hello = greet('world');
  console.log(hello);
  return <div>ScoreboardExample</div>;
};
