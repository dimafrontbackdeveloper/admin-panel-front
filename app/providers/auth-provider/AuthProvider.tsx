import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'

import { AuthService } from '@/services/auth/auth.service'

import { IContext, TypeUserState } from './auth.interface'

export const AuthContext = createContext({} as IContext)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			try {
				const user = JSON.parse(localStorage.getItem('user') || '')

				setUser(user)
			} catch (error) {
				console.log(error)
			}
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken && !user) {
			AuthService.logout()
			setUser(null)
		}
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
