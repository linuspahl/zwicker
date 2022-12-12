import backendApi from '../backendApi';
import useBackendApiToken from './useBackendApiToken';

const useBackendApi = () => {
  const { accessToken } = useBackendApiToken();

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken ?? '',
  };

  return {
    get: <T>(url: string) => backendApi.get<T>(url, { headers }),
    post: <T>(url: string, payload: unknown) => backendApi.post<T>(url, payload, { headers }),
  };
};

export default useBackendApi;
