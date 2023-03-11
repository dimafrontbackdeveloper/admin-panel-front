import { FC } from 'react'

import { IHome } from '@/screens/home/home.interface'

import Layout from '@/ui/layout/Layout'
import MovieItem from '@/ui/movie-item/MovieItem'

import styles from './Home.module.scss'

const Home: FC<IHome> = ({ newMovies }) => {
	console.log(newMovies)
	const filteredNewMovies = newMovies.filter(item => {
		return item.name
	})

	return (
		<Layout title="Movie">
			<h1 className={styles.heading}>Newest movies</h1>
			<div className={styles.catalog}>
				{filteredNewMovies.length ? (
					filteredNewMovies.map(movie => {
						return <MovieItem movie={movie} key={movie.id} />
					})
				) : (
					<div>Movies not found</div>
				)}
			</div>
		</Layout>
	)
}

export default Home
