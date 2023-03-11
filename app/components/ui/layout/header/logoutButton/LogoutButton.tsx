import { useAuth } from '@/hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import styles from './LogoutButton.module.scss'

const LogoutButton = () => {
	const { user, setUser } = useAuth()

	const logout = () => {
		AuthService.logout()
		setUser(null)
	}

	return (
		<button className={styles.logoutButton} onClick={logout}>
			Logout
		</button>
	)
}

export default LogoutButton
