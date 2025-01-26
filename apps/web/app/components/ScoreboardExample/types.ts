import { IBaseMatchAttributes, IMatchAttributes } from '@lib/scoreboard';

export interface IMatchFormState extends IBaseMatchAttributes {}

export interface IScoreUpdateFormState
  extends Omit<IMatchAttributes, 'startedAt'> {}
