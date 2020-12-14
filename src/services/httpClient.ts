const baseUrl = 'http://localhost:8001/api';

const http = {
    async get(url: string): Promise<any> {
        return fetch(`${baseUrl}/${url}`)
            .then((response) => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    async post(url: string, data: any = null): Promise<any> {
        return fetch(`${baseUrl}/${url}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': String(localStorage.getItem('token'))
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status === 409 ? "409" : "400");
                }
                return response.json();
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    async put(url: string, data: any = null): Promise<any> {
        return fetch(`${baseUrl}/${url}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json()
        })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    async delete(url: string): Promise<any> {
        return fetch(`${baseUrl}/${url}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return true
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
}
export default http;