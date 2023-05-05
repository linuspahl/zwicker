import { AxiosError } from 'axios';
import backendApi from '../backendApi';
import useBackendApiToken from './useBackendApiToken';

export type FetchError = AxiosError<{ message: string }>;

const useBackendApi = () => {
  const { accessToken } = useBackendApiToken();

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken ?? '',
  };

  return {
    get: <T>(url: string) => backendApi.get<T>(url, { headers }),
    post: <T>(url: string, payload?: unknown) => backendApi.post<T>(url, payload, { headers }),
    put: <T>(url: string, payload?: unknown) => backendApi
      .put<T, { message: string}>(url, payload, { headers }),
    del: <T>(url: string) => backendApi.delete<T>(url, { headers }),
  };
};

export default useBackendApi;
