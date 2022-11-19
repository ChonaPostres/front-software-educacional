export interface Session {
    nickname: string,
    status: number,
    email: string,
    role: {
        slug: string,
        name: string
    }
    token: string
}
