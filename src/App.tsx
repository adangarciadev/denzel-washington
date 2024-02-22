import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Filmography from './pages/Filmography'
import PageNotFound from './pages/PageNotFound'
import Layout from './ui/Layout'
import MovieProvider from './context/MovieContext'
import MovieInfo from './pages/MovieInfo'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Layout />} errorElement={<PageNotFound />}>
				<Route index element={<HomePage />} errorElement={<PageNotFound />} />
				<Route path="filmography" element={<Filmography />} errorElement={<PageNotFound />} />
				<Route path="filmography/:movieId" element={<MovieInfo />} errorElement={<PageNotFound />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Route>
	)
)

function App() {
	return (
		<MovieProvider>
			<RouterProvider router={router}></RouterProvider>
		</MovieProvider>
	)
}

export default App
