import useTitle from '../hooks/useTitle'
import styles from './HomePage.module.css'

export default function HomePage() {
	useTitle('Denzel Washington Fanpage')

	return (
		<div className={styles['container-home']}>
			<div className={styles.denzel}>
				<h1 className={styles.title}>
					DENZEL <br />
					WASHINGTON
					<div className={styles.info}>(Actor, Director & Producer)</div>
				</h1>
			</div>
		</div>
	)
}
