import { NavLink, useRouteError } from 'react-router-dom'

export default function PageNotFound() {
	const error = useRouteError()
	console.log(error)

	return (
		<div>
			<h1>404</h1>
			<p>Page not found</p>
			<p>
				Go to the <NavLink to="/">Homepage</NavLink>
			</p>
			{/* <p>{error.statusText || error.message}</p> */}
		</div>
	)
}
