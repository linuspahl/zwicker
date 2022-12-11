import { useContext } from 'react';
import { BackendApiTokenContext } from '../contexts/BackendApiTokenProvider';

const useBackendApiToken = () => {
  const contextValue = useContext(BackendApiTokenContext);

  if (!contextValue) {
    throw Error('useBackendApiToken needs to be rendered in BackendApiTokenContext.Provider');
  }

  return contextValue;
};

export default useBackendApiToken;
