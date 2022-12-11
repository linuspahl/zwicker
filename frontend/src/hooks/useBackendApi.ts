import backendApi from '../backendApi';
import useBackendApiToken from './useBackendApiToken';

const useBackendApi = <T>() => {
  const accessToken = useBackendApiToken();

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken ?? '',
  };

  return {
    get: (url: string) => backendApi.get<T>(url, { headers }),
  };
};

export default useBackendApi;
