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
  id: string,
  hasPassword: boolean,
  hostUserId: number,
  status: MatchStatus,
}

export type MatchJSON = {
  title: string,
  id: string,
  hasPassword: boolean,
  hostUserId: number,
  status: MatchStatus,
}

export type MatchState = {
  id: number,
  boardCards: Array<keyof typeof CardSet>,
  currentMoveUserId: number,
  userCards: Array<{
    userId: number,
    cards: Array<keyof typeof CardSet>,
  }>
}

export type MatchStateJSON = {
  id: number,
  cards: Array<string>,
  currentMoveUserId: number,
  boardCards: Array<keyof typeof CardSet>,
  userCards: Array<{
    userId: number,
    cards: Array<keyof typeof CardSet>,
  }>
}

export type MatchUser = {
  id: number,
  position: number,
  user: {
    username: string,
  }
}

export type Card = {
  id: string,
  value: number,
  alternativeValue: number,
}
