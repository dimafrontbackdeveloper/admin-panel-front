import { FC } from 'react'

import { useMovie } from '@/screens/dashboard/movies/list/useMovie'

import Button from '@/ui/button/Button'
import Heading from '@/ui/heading/Heading'
import Layout from '@/ui/layout/Layout'
import Table from '@/ui/table/Table'

const MovieList: FC = () => {
	const { create, mutate, isLoading, response } = useMovie()

	const filteredResponse = response?.data.filter(movie => {
		return movie.name
	})

	return (
		<Layout title="Movie list">
			<div className="flex-center-between relative md:flex-col">
				<Heading isMargin={false}>Movie list</Heading>
				<Button className="md:mt-3" onClick={() => create()}>
					Create movie
				</Button>
			</div>
			<Table
				items={
					filteredResponse?.length
						? filteredResponse.map(movie => ({
								id: movie.id,
								name: movie.name,
								image: movie.poster,
								viewLink: `/movie/${movie.id}`,
								editLink: `/manage/movies/edit/${movie.id}`,
								removeHandler: () => mutate(movie.id)
						  }))
						: []
				}
				isLoading={isLoading}
			/>
		</Layout>
	)
}

export default MovieList
