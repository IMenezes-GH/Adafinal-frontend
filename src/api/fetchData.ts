const BASE_URL = 'http://localhost:3000'

export const requestData = async(slug: string) => {

    const response = await fetch(BASE_URL + slug);
    if (!response.ok) throw new Error(`Algo deu errado. Por favor recarregue a página e tente novamente.`)
    return response

}


const requestAPI = async(slug: string, options: RequestInit, errorMessage = '100') => {

    try {
        const response = await fetch(BASE_URL + slug, options = {});
        if (!response.ok) throw new Error(`Algo deu errado. Por favor recarregue a página e tente novamente.`)

    }
    catch (err){
        if (err instanceof Error){
            errorMessage = err.message
        }
    }
    finally {
        // eslint-disable-next-line no-unsafe-finally
        return errorMessage
    }
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

export default requestAPI