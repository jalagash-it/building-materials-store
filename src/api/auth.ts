import http from '~/services/httpClient';
const authApi = {
    async register(data: any): Promise<any> {
        return http.post('auth/register', data);
    },
    async login(data: any): Promise<any> {
        return http.post('auth/login', data);
    },
    async getCurrent(): Promise<any> {
        return http.post('auth/current')
    },
    async reset(email: string): Promise<any> {
        return http.post('auth/reset', email);
    },
};
export default authApi;