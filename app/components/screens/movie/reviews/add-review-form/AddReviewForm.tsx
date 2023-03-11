import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'

import Field from '@/ui/field/Field'

import { IReviewDto } from '@/shared/interfaces/review.interface'

import { ReviewService } from '@/services/review.service'

import styles from './AddReviewForm.module.scss'

const AddReviewForm: FC<{ movieId: number }> = ({ movieId }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<IReviewDto>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation(
		['add review'],
		(data: IReviewDto) => ReviewService.createReview({ ...data, movieId }),
		{
			onSuccess() {
				reset()
				queryClient.invalidateQueries(['get movie', movieId.toString()]) // чтобы автоматические обновились данные во всем приложении. queryClient.invalidateQueries - это метод библиотеки React Query, который позволяет инвалидировать (очищать) кэш запросов. При использовании кэширования данных в React Query, кэшированные данные могут стать устаревшими, если источник данных изменился. В таких случаях вы можете вызвать метод invalidateQueries, чтобы удалить кэшированные данные и принудительно повторно запросить данные с сервера.
			}
		}
	)

	const onSubmit: SubmitHandler<IReviewDto> = async data => {
		await mutateAsync(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.description}>
				<Field
					{...register('description', {
						required: 'Description is required'
					})}
					placeholder="Add a public review"
					error={errors.description}
				/>

				<button className={styles.button}>
					<MdSend />
				</button>
			</div>
		</form>
	)
}

export default AddReviewForm
