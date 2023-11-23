import { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import styles from './GamePage.module.css'
import { requestAPI } from '../../../../api/fetchData'

import ReviewContainer from './ReviewContainer'




const GamePage = () => {
    
    const param = useParams();
    const [game, setGame] = useState<Game>();
    const [ratings, setRatings] = useState([]);
    const [gameScore, setGameScore] = useState<number | string | '???'>('???');
    
    // Jogo da página
    const fetchGame = async() => {
        const {message} = await requestAPI('/games/' + param.gameid);
        const category: Category = (await requestAPI('/category?_id=' + message.category)).message;

        if (category){
            message.category = category.name;
            setGame(message)
        }
    }
    
    // Avaliações do jogo da página, calcula o score baseado nas reviews.
    const fetchRatings = async() => {

        const {message} = await requestAPI('/ratings?game=' + param.gameid);
        const score = message.reduce((prev: number, curr: Rating) => {
            return prev + curr.score
        }, 0)
        setGameScore(score > 0 ? ((score / message?.length).toFixed(1)) : '???')
        setRatings(message);
    }

    useEffect(() => {
        fetchGame();
        fetchRatings();
    }, [])

  return (
    <main className={styles.gamePage}>
        {game ? 
        <>
            <section>
                <div className={styles.gameBanner} role="image" style={{backgroundImage: `url(${game.imageURL})`}}>
                    <h1 className='title'>{game.name} {gameScore}/5</h1>
                </div>
                <div className={styles.gameDescription}>
                    <h1><span>{game.name}</span></h1>
                    <p>Categoria: <span className={styles.category}>{game.category}</span></p>
                    <p>{game.description}</p>
                    <hr />
                    <a href={game.url}>Link para o jogo</a>
                </div>
            </section>
            <ReviewContainer ratings={ratings}/>
        </>
        :
        <p>Loading...</p>
        }

    </main>
  )
}

export default GamePage