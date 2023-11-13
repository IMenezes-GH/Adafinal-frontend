import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './GamePage.module.css'
import requestAPI, { requestData } from '../api/fetchData'


const GamePage = () => {

    const param = useParams();
    const [game, setGame] = useState<Game>();
    const [ratings, setRatings] = useState([]);

    const fetchGame = async() => {
        const response = await requestData('/games/' + param.gameid);
        const data = await response.json();
        setGame(data)
    }

    const fetchReviews = async() => {
        const response = await requestData('/ratings?game=' + param.gameid);
        const data = await response.json();

        setRatings(data)
    }

    const addReviews = async() => {
        // const response = await requestAPI()
    }

    useEffect(() => {
        fetchGame()
        fetchReviews()
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
                        return (
                            <li key={index}>{rating.score}</li>
                        )
                    })}
                    {ratings.length === 0 && 
                    <div className={styles.emptyContainer}>
                        <h2>
                            Esse jogo não possui avaliações.
                        </h2>
                        <button>Seja o primeiro a avaliar!</button>
                    </div>
                    }
                </ul>
            </section>
        </>
        }

    </main>
  )
}

export default GamePage