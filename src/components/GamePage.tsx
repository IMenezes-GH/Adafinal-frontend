import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './GamePage.module.css'
import { requestAPI } from '../api/fetchData'
import Dialog from './Dialog/Dialog'
import { Link } from 'react-router-dom'
import profileIcon from '../assets/profile-icon.svg'
import fullStar from '../assets/star_full.svg'
interface IProps{
    user: User,
    token: string,
    category: Category[]
}

interface IStarProps {
    score: number
}

const Stars = (props: IStarProps) => {

    const fullStars = []
    for (let i = 0; i < props.score; i++){
        fullStars.push(i)
    }

    return(
     fullStars.map((index) => {
        return (<img key={index} src={fullStar} />)
     })   
    )
}

const GamePage = (props: IProps) => {
    
    const param = useParams();
    const [game, setGame] = useState<Game>();
    const [ratings, setRatings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    const fetchGame = async() => {
        const {message} = await requestAPI('/games/' + param.gameid);
        const categoryObject = props.category.filter((cat: Category) => cat._id === message.category)[0]
        message.category = categoryObject.name;
        setGame(message)
    }

    const fetchRatings = async() => {
        const {message} = await requestAPI('/ratings?game=' + param.gameid);
        setRatings(message);
    }

    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement
        const data = {
            game: param.gameid,
            description: target.description.value,
            score: Number(target.score.value),
            user: props.user._id
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
    }, [])

  return (
    <main className={styles.gamePage}>
        {game && 
        <>
            <section>
                <div className={styles.gameBanner} role="image" style={{backgroundImage: `url(${game.imageURL})`}}>
                    <h1 className='title'>{game.name} </h1>
                </div>
                <div className={styles.gameDescription}>
                    <h1><span>{game.name}</span></h1>
                    <p>Categoria: {game.category}</p>
                    <p>{game.description}</p>
                    <hr />
                    <a href={game.url}>Link para o jogo</a>
                </div>
            </section>
            <section className={styles.reviewContainer}>
                <ul className={styles.reviewList}>
                    {ratings.length > 0 && ratings.map((rating: Rating, index) =>{
                        return (
                            <li id={rating.id} key={index}>
                                <article>
                                    <h1><Link to={`/profile/${rating.user}`}><img src={profileIcon} alt="" /> Autor (id:{rating.user})</Link>
                                    <span>
                                        Avaliação: <Stars score={rating.score}/>
                                    </span>
                                    </h1>
                                    <p>{rating.description}</p>
                                </article>
                            </li>
                        )
                    })}
                    { ratings.findIndex((rating: Rating) => rating.user === props.user._id) === -1 &&

                        <div className={styles.emptyContainer}>
                        {ratings.length === 0 ?
                        <>
                            <h2>
                                Esse jogo não possui avaliações.
                            </h2>
                            <button onClick={() => setIsOpen(true)}>Seja o primeiro a avaliar!</button>
                        </>
                        
                        :

                        <>
                        <h2>
                            Você ainda não avaliou esse jogo.
                        </h2>
                            <button onClick={() => setIsOpen(true)}>Avaliar esse jogo</button>
                        </>
                        }
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