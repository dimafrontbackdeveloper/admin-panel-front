import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@/shared/interfaces/movie.interface'

import styles from './MovieItem.module.scss'

const MovieItem: FC<{ movie: IMovie; variant?: 'sm' | 'md' }> = ({
	movie,
	variant = 'md'
}) => {
	return (
		<Link href={`/movie/${movie.id}`}>
			<a
				className={cn(styles.item, {
					[styles.small]: variant === 'sm'
				})}
			>
				{movie.rating && (
					<div className={styles.rating}>{movie.rating.toFixed(1)}</div>
				)}
				<div className={styles.poster}>
					<Image
						src={movie.poster}
						alt={movie.name}
						width={220}
						height={330}
						layout="responsive"
					/>
				</div>
				<div className={styles.heading}>{movie.name}</div>
			</a>
		</Link>
	)
}

export default MovieItem
