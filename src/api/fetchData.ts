const requestAPI = async(url: string, options: RequestInit, errorMessage = '100') => {

    try {
        const response = await fetch(url, options);
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

export const refreshAPI = async(url: string) => {

    const response = await fetch(url + '/auth/refresh', {
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

export const loginAPI = async(url: string, loginData: login) => {

    const response = await fetch(url + '/auth/login', {
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