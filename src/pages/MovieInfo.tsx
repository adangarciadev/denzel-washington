import { useParams } from 'react-router-dom'
import { useGetMovies } from '../context/MovieContext'
import imdb from '/imdb.svg'

import styles from './MovieInfo.module.css'
import Loader from '../components/Loader'
import useTitle from '../hooks/useTitle'

export default function MovieInfo() {
	const { movieId } = useParams()
	const { filteredMovies } = useGetMovies()
	const movie = filteredMovies.filter(movie => movie.id === Number(movieId))

	if (filteredMovies.length > 0) {
		useTitle(`${movie[0].title} (${movie[0].release_date.substring(0, 4)}) `)
	}

	if (!filteredMovies || !filteredMovies.length) {
		document.title = 'Actualizando...'
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		)
	}

	return (
		<div className={styles['container-movie']}>
			<div className={styles.image}>
				<img src={`https://image.tmdb.org/t/p/original/${movie[0]?.backdrop_path}`} alt={movie[0].title} />
			</div>
			<div className={styles['movie-header']}>
				<div>
					<span className={styles.title}>{movie[0].title}</span>
					<span className={styles.release}>({movie[0].release_date.substring(0, 4)})</span>
					<span className={styles.genres}>
						{movie[0].genres.map(genre => (
							<span className={styles.genre} key={genre.name}>
								{genre.name}
							</span>
						))}
						<p style={{ marginLeft: '20px' }}>{movie[0].runtime} minutes</p>
					</span>
					<img
						src={imdb}
						alt="Imdb"
						className={styles.imdb}
						onClick={() => window.open(`https://www.imdb.com/title/${movie[0].imdb_id}`, '_blank')}
					/>
				</div>
				<div className={styles.overview}>
					<p>{movie[0].overview}</p>
				</div>
				<div className={styles.cast}>
					{movie[0].credits.cast.slice(0, 10).map(cast => (
						<span key={cast.name} className={styles.names}>
							{cast.name}
						</span>
					))}
				</div>
			</div>

			<div className={styles['poster-container']}>
				<img src={`https://image.tmdb.org/t/p/original/${movie[0].poster_path}`} alt={movie[0].title} />
				<p>"{movie[0].tagline}"</p>
			</div>
		</div>
	)
}
