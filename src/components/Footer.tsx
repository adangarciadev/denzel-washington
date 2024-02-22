import tmdb from '/tmdb.svg'
import styles from './Footer.module.css'

export default function Footer() {
	return (
		<footer>
			<div>
				<p>&#169; 2024 Ad&#225;n Garc&#237;a</p>
				This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
			</div>
			<img src={tmdb} alt="TMDB" className={styles.logo} />
		</footer>
	)
}
