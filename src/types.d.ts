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
    description?: string,
    state?: string,
    active?: boolean,
    birthDate?: string,
    country?: string,
    email?: string,
    name: string,
    roles?: string,
    username: string,
    banner?: string,
    profileImageURL?: string,
}

type Rating = {
    _id: string,
    game: string,
    user: string,
    description: string,
    score: number,
}

type Category = {
    _id?: string,
    name: string,
    active: boolean
}

interface userProps {
    user: User,
    setUser: CallableFunction
    token: string,
    setToken: CallableFunction
}