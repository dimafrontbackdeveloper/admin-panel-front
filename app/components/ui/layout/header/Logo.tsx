import Link from 'next/link'
import { FC } from 'react'

import styles from './Header.module.scss'

const Logo: FC = () => {
	return (
		<Link href="/">
			<a className={styles.logo}>Movie</a>
		</Link>
	)
}

export default Logo
