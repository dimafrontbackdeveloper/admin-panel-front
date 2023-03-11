import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import Reviews from '@/screens/movie/reviews/Reviews'

import Layout from '@/ui/layout/Layout'

import { MovieService } from '@/services/movie.service'
import { ViewsService } from '@/services/views.service'

import styles from './Movie.module.scss'

const Movie: FC = () => {
	const { query } = useRouter() // query - чтобы взять id из запроса. Может еще принимать push чтобы сделать редирект
	const movieId = Number(query?.id)

	// получаем фильм
	const {
		refetch,
		data: movie,
		isLoading
	} = useQuery(
		['get movie', query?.id],
		() => MovieService.getMovieById(movieId),
		{
			enabled: !!movieId, // происходит загрузка данных только когда подгрузился id страницы (например подгрузка конкретного юзера и тд)
			select: ({ data }) => data // трансформация данных (например мы можем data.map)
		}
	) // ['get movie', query?.id] - уникальный ключ. refetch - когда данные нужно загрузить например при клике по кнопке, тогда мы можем вызвать refetch. Если нам не нужно чтобы данные изначально подгрузились, а только с помощью refetch, то ставим enabled:false

	// обновляем число views у фильма
	const { mutate } = useMutation(['update count opened'], () =>
		ViewsService.updateViews(movieId.toString())
	) // () => - колбек может принимать данные

	useEffect(() => {
		if (movieId) {
			console.log('update')
			mutate()
		}

		return localStorage.setItem('isWasUpdateViews', 'false')
	}, [movieId])

	return (
		<Layout title={`${movie?.name} - Movie`}>
			<div className={styles.wrapper}>
				<div className={styles.poster}>
					{movie?.poster && (
						<Image
							src={movie?.poster}
							alt={movie?.name}
							width={220}
							height={330}
							layout="responsive"
							className={styles.image}
						/>
					)}
				</div>

				<div className={styles.detail}>
					<h1 className={styles.heading}>{movie?.name}</h1>
					<div className={styles.rating}>{movie?.rating?.toFixed(1)}</div>
					<div className={styles.title}>About movie</div>
					<ul>
						<li>
							<span>Fees in the world</span>
							<span>${movie?.fees.toLocaleString()}</span>
						</li>
					</ul>
					<Reviews
						movieId={movieId}
						reviews={movie?.reviews || []}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</Layout>
	)
}

export default Movie
