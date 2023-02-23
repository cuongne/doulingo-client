import linkRequest from "./request"

export const UserApiRequest = {
    get: (url: string) => {
        return linkRequest('http://localhost:1337/users').get(url)
    },
    post: (url: string, param = {}, config = {}) => {
        return linkRequest('http://localhost:1337/users').post(url, param, config)
    },
    put: (url: string, param = {}, config = {}) => {
        return linkRequest('http://localhost:1337/users').put(url, param, config)
    }
}
export const AuthRequest = {
    get: (url: string) => {
        return linkRequest('http://localhost:1337/auth').get(url)
    },
    post: (url: string, param = {}, config = {}) => {
        return linkRequest('http://localhost:1337/auth').post(url, param, config)
    },
    put: (url: string, param = {}, config = {}) => {
        return linkRequest('http://localhost:1337/auth').put(url, param, config)
    }
}
