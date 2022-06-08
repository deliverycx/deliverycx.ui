import axios, {
    AxiosInstance,
    AxiosPromise,
    AxiosResponse,
    AxiosError,
    AxiosRequestConfig
} from "axios";

class AxiosCreate {
    static _instanse: null | AxiosCreate = null;
    api: AxiosInstance;

    private constructor(URL:string) {
        this.api = axios.create({
            withCredentials: true,
            baseURL: URL
        });

        this.api.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        this.api.interceptors.request.use((config: AxiosRequestConfig) => {
            const token = localStorage.getItem("authToken");

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
        /**/
    }
    static getInstance(url:string) {
			return new AxiosCreate(url)
				/*
        if (!AxiosCreate._instanse) {
            AxiosCreate._instanse = new AxiosCreate(url);
        }
        return AxiosCreate._instanse;
				*/
    }
}

export default AxiosCreate;
