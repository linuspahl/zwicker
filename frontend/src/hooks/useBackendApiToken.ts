import { useContext } from 'react';
import { BackendApiTokenContext } from '../contexts/BackendApiTokenProvider';

const useBackendApiToken = () => {
  const accessToken = useContext(BackendApiTokenContext);

  return accessToken;
};

export default useBackendApiToken;
