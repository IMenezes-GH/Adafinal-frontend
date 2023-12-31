export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const requestAPI = async(slug: string, options?: RequestInit) => {

    const response = await fetch(BASE_URL + slug, options && options);
    const message = await response.json()
    return {response, message}
}

export const refreshAPI = async() => {

    const response = await fetch(BASE_URL + '/auth/refresh', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json();
    return {ok: response.ok, data}

}

interface login {
    email: string,
    password: string
}

export const loginAPI = async(loginData: login) => {

    const response = await fetch(BASE_URL + '/auth/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    const data = await response.json();
    return {ok: response.ok, data}

}

export const getCategories = async () => {
    const response = await fetch(BASE_URL + '/category');
    const message = await response.json()
    return {response, message}
}