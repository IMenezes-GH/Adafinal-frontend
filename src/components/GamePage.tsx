import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './GamePage.module.css'
import requestAPI, { requestData } from '../api/fetchData'
import Dialog from './Dialog/Dialog'
import { Link } from 'react-router-dom'

interface IProps{
    user: User,
    token: string
}

const GamePage = (props: IProps) => {

    const param = useParams();
    const [game, setGame] = useState<Game>();
    const [ratings, setRatings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchGame = async() => {
        const response = await requestData('/games/' + param.gameid);
        const data = await response.json();
        setGame(data)
    }

    const fetchRatings = async() => {
        const response = await requestData('/ratings?game=' + param.gameid);
        const ratings = await response.json();

        setRatings(ratings);
    }

    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement
        const data = {
            game: param.gameid,
            description: target.description.value,
            score: Number(target.score.value),
            user: props.user.id
        }
        await requestAPI('/ratings', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + props.token
            },
            body: JSON.stringify(data)
        })

        fetchRatings();
    }

    useEffect(() => {
        fetchGame();
        fetchRatings();
        // console.log(game, ratings)
    }, [])

  return (
    <main className={styles.gamePage}>
        {game && 
        <>
            <section>
                <div className={styles.gameBanner} role="image" style={{backgroundImage: `url(${game.imageURL})`}}>
                    <h1 className='title'>{game.name} <span>Nota: {game.score}/5</span></h1>
                </div>
                <div className={styles.gameDescription}>

                <h1><span>{game.name}</span></h1>
                <p>{game.description}</p>
                <a href={game.url}>Link para o jogo</a>
                </div>
            </section>
            <section className={styles.reviewContainer}>
                <ul>
                    {ratings.length > 0 && ratings.map((rating: Rating, index) =>{
                        console.log(rating.user)
                        return (
                            <li key={index}>
                                <article>
                                <h1>{rating.description}</h1>
                                <p><Link to={`/user/${rating.id}`}>Autor</Link></p>
                                Nota: {rating.score}/5
                                </article>
                                </li>
                        )
                    })}
                    {ratings.length === 0 && 
                    <div className={styles.emptyContainer}>
                        <h2>
                            Esse jogo não possui avaliações.
                        </h2>
                        <button onClick={() => setIsOpen(true)}>Seja o primeiro a avaliar!</button>
                    </div>
                    }
                </ul>
            </section>
            <Dialog title={'Criar Review'} isOpen={isOpen} setIsOpen={setIsOpen}>
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                    <div>
                        <input type="text" placeholder='Título' />
                    </div>
                    <div>
                        <textarea id="description" rows={3} placeholder='Descrição'></textarea>
                    </div>
                    <div>
                        <input type="number" id='score' placeholder='Nota (1-5)' min={1} max={5} />
                    </div>
                    <div className='row'>
                        <button type='button'>Cancelar</button>
                        <button type='submit'>Enviar</button>
                    </div>
                    </form>
            </Dialog>
        </>
        }

    </main>
  )
}

export default GamePage