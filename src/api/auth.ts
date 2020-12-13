import http from '~/services/httpClient';
const authApi = {
    async register(data: any): Promise<any> {
        return http.post('auth/register', data);
    },
    async login(data: any): Promise<any> {
        return http.post('auth/login', data)
            .then(res => {
                if (res.token)
                    localStorage.setItem('token', res.token);
                return res;
            });
    },
    async getCurrent(): Promise<any> {
        return http.post('auth/current')
    },
    async reset(email: string): Promise<any> {
        return http.post('auth/reset', email);
    },
};
export default authApi;