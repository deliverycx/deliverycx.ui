import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';

class AxiosCreate {
  static _instanse: null | AxiosCreate = null;
  private URL: string = process.env.REACT_APP_API_URL as string;
  api: AxiosInstance;

  private constructor(URL: string) {
    this.api = axios.create({
      withCredentials: true,
      baseURL: URL,
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (err) => {
        return Promise.reject(err);
      },
    );
    /**/
    this.api.interceptors.request.use((config: any) => {
      const token = localStorage.getItem('authToken');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers.localhost = `${document.location.protocol}//${document.location.host}`;
      return config;
    });
  }
  static getInstance(url: string) {
    return new AxiosCreate(url);
  }
}

export default AxiosCreate;
