import { createContext, useContext, ReactNode, useEffect, useState } from 'react'

type MovieProviderProps = {
	children: ReactNode
}

type Genre = {
	id: number
	name: string
}

type MovieData = {
	credits: { cast: { name: string; character: string; profile_path: string }[] }
	id: number
	runtime: number
	title: string
	overview: string
	tagline: string
	imdb_id: string
	poster_path: string
	release_date: string
	backdrop_path: string
	genres: Genre[]
	genre_ids: number[]
	cast: { name: string; character: string; profile_path: string }[]
	movies: MovieData[]
}

type MovieContext = {
	movies: MovieData[]
	filteredMovies: MovieData[]
	setFilteredMovies: React.Dispatch<React.SetStateAction<MovieData[]>>
	isLoading: boolean
	error: string
}

const MovieContext = createContext({} as MovieContext)

export function useGetMovies() {
	return useContext(MovieContext)
}

export default function MovieProvider({ children }: MovieProviderProps) {
	const [movies, setMovies] = useState<MovieData[]>([])
	const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const URL = 'https://api.themoviedb.org/3/person/5292/movie_credits?language=en-US'
	const URL_CAST = 'https://api.themoviedb.org/3/movie/'
	const URL_CAST2 = '?language=en-US&append_to_response=credits'

	///  3/movie/388?language=en-US&append_to_response=credits

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` as string,
		},
	}

	useEffect(() => {
		const controller = new AbortController()

		const fetchingMovies = async () => {
			try {
				setIsLoading(true)
				setError('')
				const response = await fetch(URL, options)

				if (!response.ok) {
					throw new Error('Something went wrong fetching movies')
				}
				const data = await response.json()

				if (data.response === 'False') {
					throw new Error('No movies found for this actor')
				}

				const movies = data.cast

				const movieIds = movies.map((movie: MovieData) => movie.id)
				const castPromises = movieIds.map(async (movieId: number) => {
					const castResponse = await fetch(`${URL_CAST}${movieId}${URL_CAST2}`, {
						...options,
						signal: controller.signal,
					})
					const castData = await castResponse.json()
					return { movieId, cast: castData }
				})

				const movieCast = await Promise.all(castPromises)
				const detailedMovies = movies.map((movie: MovieData) => {
					const cast = movieCast.find((cast: { movieId: number; cast: any }) => cast.movieId === movie.id)?.cast
					return cast
				})

				setFilteredMovies(detailedMovies)
				setMovies(detailedMovies)
				setError('')
			} catch (error) {
				if ((error as Error).name !== 'AbortError') {
					console.log((error as Error).message)
					setError((error as Error).message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchingMovies()

		return () => {
			controller.abort()
		}
	}, [])

	return (
		<MovieContext.Provider
			value={{
				movies,
				filteredMovies,
				setFilteredMovies,
				error,
				isLoading,
			}}
		>
			{children}
		</MovieContext.Provider>
	)
}
