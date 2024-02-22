import noImage from '/no-image.png'
import styles from './Card.module.css'

// import { useGetMovies } from '../context/MovieContext'

type CardProps = {
	title: string
	release_date: string
	poster_path: string
}

export default function Card({ title, release_date, poster_path }: CardProps) {
	let poster = ''

	if (poster_path !== null) {
		poster = `https://image.tmdb.org/t/p/w300/${poster_path}`
	} else {
		poster = noImage
	}

	return (
		<>
			<img src={poster} alt={title} className={styles.poster} />
			<div>
				<span className={styles.title}>{title}</span>
			</div>
			<span className={styles.release}>({release_date.substring(0, 4)})</span>
		</>
	)
}
