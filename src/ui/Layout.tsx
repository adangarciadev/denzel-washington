import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './Layout.module.css'
import Footer from '../components/Footer'

export default function Layout() {
	return (
		<div>
			<Navbar />

			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
