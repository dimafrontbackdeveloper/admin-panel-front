import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Loader from '@/ui/Loader'
import Button from '@/ui/button/Button'
import Field from '@/ui/field/Field'
import Heading from '@/ui/heading/Heading'
import Layout from '@/ui/layout/Layout'
import UploadField from '@/ui/upload-field/UploadField'

import { IMovieDto } from '@/shared/interfaces/movie.interface'

import { IMediaResponse } from '@/services/media.service'
import { MovieService } from '@/services/movie.service'

import Stars from '../stars/Stars'

const MovieEdit: FC = () => {
	const { query, push } = useRouter()
	const movieId = Number(query.id)

	const [activeStarId, setActiveStarId] = useState<string>('2.5')

	const changeActiveStar = (id: string) => {
		setActiveStarId(id)
	}

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		setValue
	} = useForm<IMovieDto>({
		mode: 'onChange'
	})

	const { isLoading } = useQuery(
		['get movie by id', movieId],
		() => MovieService.getMovieById(movieId),
		{
			onSuccess: ({ data }) => {
				setValue('name', data.name)
				setValue('fees', data.fees)
				setValue('poster', data.poster)
				setActiveStarId(String(data.rating))
			},
			enabled: !!movieId
		}
	)

	const { mutate } = useMutation(
		['update movie', movieId],
		(data: IMovieDto) =>
			MovieService.updateMovie(movieId, Number(activeStarId), data),
		{
			onSuccess() {
				push('/manage/movies')
			}
		}
	)

	const onSubmit: SubmitHandler<IMovieDto> = data => {
		mutate(data)
	}

	return (
		<Layout title="Movie edit">
			<Heading>Edit movie</Heading>

			{isLoading ? (
				<Loader count={4} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="w-1/3">
					<Field
						{...register('name', {
							required: 'Name is required'
						})}
						placeholder="Name"
						error={errors.name}
					/>
					<Field
						{...register('fees', {
							required: 'Fees is required',
							valueAsNumber: true
						})}
						type="number"
						placeholder="Fees ($)"
						error={errors.fees}
					/>

					<Stars
						activeStarId={activeStarId}
						changeActiveStar={changeActiveStar}
					/>

					<div className="my-8">
						<Controller
							control={control}
							name="poster"
							render={({ field: { onChange, value } }) => (
								<UploadField
									folder="posters"
									onChange={(value: IMediaResponse) => {
										onChange(value.url)
									}}
									value={value}
								/>
							)}
						/>
					</div>

					<Button>Save</Button>
				</form>
			)}
		</Layout>
	)
}

export default MovieEdit
