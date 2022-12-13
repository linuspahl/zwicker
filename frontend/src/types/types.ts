export type User = {
  id: string,
  username: string,
}

export type UserJSON = {
  id: string,
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
