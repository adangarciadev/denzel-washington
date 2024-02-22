import { Link } from 'react-router-dom'
import styles from '../pages/Filmography.module.css'

interface Movie {
	id: number
	poster_path: string
	title: string
}

export default function Movie({ movie }: { movie: Movie }) {
	return (
		<Link to={`/filmography/${movie.id}`}>
			{movie.poster_path && (
				<img
					src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
					alt={movie.title}
					className={styles.poster}
					style={{ viewTransitionName: `movie-${movie.id}` }}
				/>
			)}
		</Link>
	)
}
