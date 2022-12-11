import React from 'react';

export const BackendApiTokenContext = React.createContext<string | null>(null);

const BackendApiTokenProvider = ({ children, accessToken }: {
    children: React.ReactNode,
    accessToken: string | null
}) => (
  <BackendApiTokenContext.Provider value={accessToken}>
    {children}
  </BackendApiTokenContext.Provider>
);

export default BackendApiTokenProvider;
