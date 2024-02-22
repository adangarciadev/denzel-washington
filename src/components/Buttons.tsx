import { useNavigate } from 'react-router-dom'
import classes from '../ui/homepage.module.css'

type Page = string

export default function Buttons({ currentPage }: { currentPage: Page }) {
	const navigate = useNavigate()
	return (
		<div>
			{currentPage !== 'Homepage' && (
				<button className={classes.button} onClick={() => navigate('/')}>
					Homepage
				</button>
			)}
			{currentPage !== 'Biography' && (
				<button className={classes.button} onClick={() => navigate('/biography')}>
					Biografía
				</button>
			)}
			{currentPage !== 'Filmography' && (
				<button className={classes.button} onClick={() => navigate('/filmography')}>
					Filmografía
				</button>
			)}
		</div>
	)
}
