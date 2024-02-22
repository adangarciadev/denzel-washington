import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
	return (
		<>
			<header className={styles.navbar}>
				<nav>
					<NavLink to="/" className={styles['nav-title']}>
						Homepage
					</NavLink>
				</nav>
				<nav>
					<NavLink to="/filmography" className={styles['nav-title']}>
						Filmografía
					</NavLink>
				</nav>
			</header>
		</>
	)
}

export default Navbar
