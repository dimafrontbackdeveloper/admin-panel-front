import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { menu } from '@/ui/layout/sidebar/menu.data'
import Switcher from '@/ui/layout/sidebar/switcher/Switcher'

import { useAuth } from '@/hooks/useAuth'
import { useBurger } from '@/hooks/useBurger'

import styles from './Sidebar.module.scss'
import Close from './close/Close'

const Sidebar: FC = () => {
	const { asPath } = useRouter()
	const { user } = useAuth()
	const { isOpenBurger, closeBurger } = useBurger()

	return (
		<aside
			className={`${styles.sidebar} ${isOpenBurger && styles.sidebarOpen}`}
		>
			<div>
				<Close />
				<Link href="/">
					<a className={styles.logo} onClick={closeBurger}>
						M
					</a>
				</Link>

				<nav className={styles.menu}>
					<ul>
						{user?.role === 'admin' &&
							menu.map(item => (
								<li
									onClick={closeBurger}
									key={item.link}
									className={cn(styles.item, {
										[styles.active]: item.link === asPath
									})}
								>
									<Link href={item.link}>
										<a>
											<item.Icon />
										</a>
									</Link>
								</li>
							))}
					</ul>
				</nav>

				<Switcher />
			</div>
		</aside>
	)
}

export default Sidebar
