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
    id?: string,
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

type Review = {
    id: string,
    game: string,
    user: string,
    description: string,
    score: number,
}

interface userProps {
    user: User,
    setUser: CallableFunction
    token: string,
    setToken: CallableFunction
}

