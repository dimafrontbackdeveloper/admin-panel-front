import { FC } from 'react'

import Logo from '@/ui/layout/header/Logo'
import LoginForm from '@/ui/layout/header/login-form/LoginForm'
import Search from '@/ui/layout/header/search/Search'

import styles from './Header.module.scss'
import BurgerButton from './burger-button/BurgerButton'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<BurgerButton />
			<Logo />
			<Search />
			<LoginForm />
		</header>
	)
}

export default Header
