import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import BurgerProvider from 'providers/burger-provider/BurgerProvider'

import '@/assets/styles/globals.scss'

import AuthProvider from '../app/providers/auth-provider/AuthProvider'
import { ThemeProvider } from '../app/providers/theme-provider/ThemeProvider'

// для react query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	// pageProps - беруться из document js
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider>
					<BurgerProvider>
						<Component {...pageProps} />
					</BurgerProvider>
				</ThemeProvider>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default MyApp
