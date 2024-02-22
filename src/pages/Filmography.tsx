import styles from './Filmography.module.css'

import MovieFilters from '../components/MovieFilters'
import { useGetMovies } from '../context/MovieContext'
import Loader from '../components/Loader'
import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'

const Card = lazy(() => import('../components/Card'))

export default function Filmography() {
	const { filteredMovies, error } = useGetMovies()

	useTitle('Filmography')

	return (
		<div className={styles['container-movies']}>
			<MovieFilters />

			{error && (
				<h2
					style={{
						color: 'red',
						textAlign: 'center',
						fontSize: '2rem',
					}}
				>
					{error}
				</h2>
			)}
			<div className={styles.card}>
				{filteredMovies.map(movie => (
					<Suspense fallback={<Loader />} key={movie.id}>
						<Link to={`/filmography/${movie.id}`} style={{ textDecoration: 'none' }}>
							<Card
								key={movie.id}
								title={movie.title}
								release_date={movie.release_date.substring(0, 4)}
								poster_path={movie.poster_path}
							/>
						</Link>
					</Suspense>
				))}
			</div>
		</div>
	)
}
