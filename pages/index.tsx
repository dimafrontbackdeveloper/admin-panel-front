// / - home page
import type { GetStaticProps, NextPage } from 'next'

import Home from '@/screens/home/Home'
import { IHome } from '@/screens/home/home.interface'

import { MovieService } from '@/services/movie.service'

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps<IHome> = async () => {
	try {
		const { data: newMovies } = await MovieService.getAll()

		return {
			props: {
				newMovies
			},
			revalidate: 60 // каждые 60 секунд будут получаться данные, и будет происходить регинерация страницы
		}
	} catch (e) {
		return {
			props: {
				newMovies: []
			}
		}
	}
}

export default HomePage
