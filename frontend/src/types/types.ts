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
  has_password: boolean,
  host_user_id: number,
  status: MatchStatus,
}

export type MatchUser = {
  id: number,
  username: string,
  position: number,
}

export type Card = {
  id: string,
  value: number,
  alternativeValue: number,
}
