export type AuthState = {
  errors: object,
  isError: boolean,
  loading: boolean,
  user: User | null,
}

export type User = {
  id: string,
  name: string,
  email: string,
  token: string,
}
