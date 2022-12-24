import CardSet from '../card-set';

export type User = {
  id: number,
  username: string,
}

export type UserJSON = {
  id: number,
  username: string,
}

type MatchStatus = 'running' | 'lobby' | 'ended'

export type Match = {
  title: string,
  id: number,
  hasPassword: boolean,
  hostUserId: number,
  status: MatchStatus,
}

export type MatchJSON = {
  title: string,
  id: number,
  hasPassword: boolean,
  hostUserId: number,
  status: MatchStatus,
}

export type MatchState = {
  id: number,
  boardCards: Array<Array<{ cardId: keyof typeof CardSet, value?: number }>>,
  currentMoveUserId: number,
  matchStateUsers: Array<{
    cards: Array<keyof typeof CardSet>,
    userId: number,
  }>
}

export type MatchStateJSON = {
  id: number,
  cards: Array<string>,
  currentMoveUserId: number,
  boardCards: Array<Array<{ cardId: keyof typeof CardSet, value?: number }>>,
  matchStateUsers: Array<{
    cards: Array<keyof typeof CardSet>,
    userId: number,
  }>
}

export type MatchUser = {
  id: number,
  position: number,
  userId: number,
  user: {
    username: string,
  }
}

export type Card = {
  value: number,
  image: React.FunctionComponent,
  alternativeValue?: number,
}

export type CurrentMove = {
  sourceCardId?: keyof typeof CardSet,
  sourceCardValue?: number,
  targetCardValue?: number,
  targetCardId?: keyof typeof CardSet,
  type?: 'dropping' | 'building' | 'picking',
}
