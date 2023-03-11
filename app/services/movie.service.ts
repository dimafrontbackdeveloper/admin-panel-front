import { IMovie, IMovieDto } from '@/shared/interfaces/movie.interface'

import interceptor, { axiosClassic } from '../api/interceptor'

export const MovieService = {
	async getMovieById(id: number) {
		return axiosClassic.get<IMovie>(`/movie/${id}`)
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(`/movie`, {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},

	async createMovie() {
		return interceptor.post<number>('/movie')
	},

	async updateMovie(id: number, rating: number, body: IMovieDto) {
		return interceptor.put<IMovie>(`/movie/${id}`, { ...body, rating })
	},

	async deleteMovie(id: number) {
		return interceptor.delete(`/movie/${id}`)
	}
}
