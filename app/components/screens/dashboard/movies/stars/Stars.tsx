import { FC } from 'react'

import styles from './Stars.module.scss'

interface IStar {
	id: string
	value: string
}

interface IStars {
	activeStarId: string
	changeActiveStar: (id: string) => void
}

const Stars: FC<IStars> = ({ activeStarId, changeActiveStar }) => {
	const stars: Array<IStar> = [
		{ id: '4.5', value: '4.5' },
		{ id: '4', value: '4' },
		{ id: '3.5', value: '3.5' },
		{ id: '3', value: '3' },
		{ id: '2.5', value: '2.5' },
		{ id: '2', value: '2' },
		{ id: '1.5', value: '1.5' },
		{ id: '1', value: '1' },
		{ id: '0.5', value: '0.5' }
	]

	return (
		<fieldset className={`${styles.rating}`}>
			<input type="radio" id="star5" name="rating" value="5" />
			<label
				htmlFor="star5"
				className={`${styles.full}`}
				title="Awesome"
			></label>
			{stars.map((star, i) => {
				return (
					<>
						<input
							type="radio"
							id={star.id}
							name="rating"
							value={star.value}
							checked={star.id === activeStarId ? true : false}
							onClick={() => changeActiveStar(star.id)}
						/>
						<label
							htmlFor={star.id}
							className={i % 2 === 0 ? `${styles.half}` : `${styles.full}`}
						></label>
					</>
				)
			})}
		</fieldset>
	)
}

export default Stars
