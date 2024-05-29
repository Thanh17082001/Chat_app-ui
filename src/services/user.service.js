import createApiClient from "./config"
const user = sessionStorage.getItem('users')
class UserService{
    constructor(tagUrl = 'users') {
        this.api = createApiClient(tagUrl, user?.token)
    }

    async getAll() {
        return await this.api.get('/');
    }

    async login(data) {
        return await this.api.post('/login', data)
    }
}

export default new UserService()