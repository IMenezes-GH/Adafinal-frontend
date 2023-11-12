type Game = {
    _id: string,
    active: boolean,
    category: string,
    description: string,
    imageURL: string,
    name: string,
    score: number,
    ratings: string[],
    url: string
}

type User = {
    _id?: string,
    active?: boolean,
    birthDate?: string,
    country?: string,
    email?: string,
    name: string,
    roles?: string,
    username: string
}

interface userProps {
    user: User,
    setUser: CallableFunction
    token: string,
    setToken: CallableFunction
}