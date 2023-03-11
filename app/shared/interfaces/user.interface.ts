export interface IUser {
	id: number
	name: string
	email: string
	avatarPath: string
	role: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}
