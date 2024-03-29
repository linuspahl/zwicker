import React, { useCallback, useMemo, useState } from 'react';

export const BackendApiTokenContext = React.createContext<undefined | {
    accessToken: string | null,
    setAccessToken:(accessToken: string | null) => void
      }>(undefined);

type Props = {
  children: React.ReactNode,
}
const BackendApiTokenProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access-token'));
  const onSetAccessToken = useCallback((value: string | null) => {
    localStorage.setItem('access-token', value ?? '');
    setAccessToken(value);
  }, []);
  const contextValue = useMemo(
    () => ({ accessToken, setAccessToken: onSetAccessToken }),
    [accessToken, onSetAccessToken],
  );

  return (
    <BackendApiTokenContext.Provider value={contextValue}>
      {children}
    </BackendApiTokenContext.Provider>
  );
};

export default BackendApiTokenProvider;
