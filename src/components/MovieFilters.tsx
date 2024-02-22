import { genres as genresJson, decades as decadesJson } from '../utils'
import styles from './MovieFilters.module.css'
import { useGetMovies } from '../context/MovieContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function MovieFilters() {
	const { movies, filteredMovies, setFilteredMovies } = useGetMovies()
	const [selectedGenre, setSelectedGenre] = useState({
		id: 0,
		genre: 'Any',
	})
	const [selectedDecade, setSelectedDecade] = useState({
		id: 0,
		decade: 'Any',
	})
	const [searchParams, setSearchParams] = useSearchParams()

	const filterMovies = () => {
		let filtered = filteredMovies

		if (selectedGenre.id === 0 && selectedDecade.id === 0) {
			filtered = movies
		} else if (selectedGenre.id !== 0 && selectedDecade.id === 0) {
			filtered = movies.filter(movie => movie.genres.some(genre => genre.id === selectedGenre.id))
		} else if (selectedGenre.id === 0 && selectedDecade.id !== 0) {
			filtered = movies.filter(
				movie =>
					movie.release_date.substring(0, 4) >= String(selectedDecade.id) &&
					movie.release_date.substring(0, 4) <= String(selectedDecade.id + 9)
			)
		} else {
			filtered = movies.filter(
				movie =>
					movie.genres.some(genre => genre.id === selectedGenre.id) &&
					movie.release_date.substring(0, 4) >= String(selectedDecade.id) &&
					movie.release_date.substring(0, 4) <= String(selectedDecade.id + 9)
			)
		}

		setFilteredMovies(filtered)
		console.log(filtered)
	}

	// Efecto para aplicar el filtro cuando cambian los valores seleccionados
	useEffect(() => {
		filterMovies()
	}, [selectedGenre, selectedDecade])

	// Efecto para actualizar los parámetros de búsqueda en la URL cuando cambian los filtros
	useEffect(() => {
		const params = new URLSearchParams()

		if (selectedGenre) {
			params.set('genre', selectedGenre.genre)
			setSelectedGenre(selectedGenre)
			filterMovies()
		}

		if (selectedDecade) {
			params.set('decade', selectedDecade.decade)
			setSelectedDecade(selectedDecade)
			filterMovies()
		}

		setSearchParams(params)
	}, [selectedGenre, selectedDecade])

	const handleGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = event.target.options[event.target.selectedIndex]
		const selectedId = selectedOption.value
		const genre = selectedOption.text

		setSelectedGenre({ id: Number(selectedId), genre: genre })
	}

	const handleDecade = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = event.target.options[event.target.selectedIndex]
		const selectedId = selectedOption.value
		const decade = selectedOption.text

		setSelectedDecade({ id: Number(selectedId), decade: decade })
	}

	return (
		<div>
			<label>
				<span>GENRE: </span>
				<select onChange={handleGenre} value={selectedGenre?.id} className={styles.selector}>
					{genresJson.map((item, index) => (
						<option key={index} value={item.id}>
							{item.name}
						</option>
					))}
				</select>
			</label>
			<label>
				<span>DECADE: </span>
				<select onChange={handleDecade} value={selectedDecade?.id} className={styles.selector}>
					{decadesJson.map((item, index) => (
						<option key={index} value={item.id}>
							{item.decade}
						</option>
					))}
				</select>
			</label>
			<div className={styles['num-movies']}>
				{selectedGenre.genre === 'Any' && selectedDecade.decade === 'Any' ? (
					<div>There are {movies.length} movies of Denzel Washington.</div>
				) : selectedGenre.genre === 'Any' ? (
					<div>
						There are {filteredMovies.length} movies of Denzel Washington from the {searchParams.get('decade')}.
					</div>
				) : selectedDecade.decade === 'Any' ? (
					<div>
						There are {filteredMovies.length} {searchParams.get('genre')} movies of Denzel Washington.
					</div>
				) : (
					<div>
						There are {filteredMovies.length} {searchParams.get('genre')} movies of Denzel Washington from the{' '}
						{searchParams.get('decade')}.
					</div>
				)}
			</div>
		</div>
	)
}

export default MovieFilters
