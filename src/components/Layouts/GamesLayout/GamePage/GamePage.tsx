import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './GamePage.module.css'
import { requestAPI } from '../../../../api/fetchData'
import Dialog from '../../../Dialog/Dialog'
import { Link } from 'react-router-dom'
import profileIcon from '../../../../assets/profile-icon.svg'
import fullStar from '../../../../assets/star_full.svg'



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

interface IGamePage{
    user: User | null,
    token: string
}

const GamePage = (props: IGamePage) => {
    
    const param = useParams();
    const [game, setGame] = useState<Game>();
    const [ratings, setRatings] = useState([]);
    const [gameScore, setGameScore] = useState<number | string | '???'>('???');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    
    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement
        
        const data = {
            game: param.gameid,
            description: target.description.value,
            score: Number(target.score.value),
            user: props.user?._id
        }

        const {response, message} = await requestAPI('/ratings', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + props.token
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            setIsOpen(false)
            location.reload();
        }
        else target.output.innerText = message;
    }
    
    const fetchGame = async() => {
        const {message} = await requestAPI('/games/' + param.gameid);
        const category: Category = (await requestAPI('/category?_id=' + message.category)).message;

        if (category){
            message.category = category.name;
            setGame(message)
        }
    }
    
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
        {game && 
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
            <section className={styles.reviewContainer}>
                <ul className={styles.reviewList}>
                    {ratings.length > 0 && ratings.map((rating: Rating, index) =>{
                        return (
                            <li key={index} id={`${rating._id}`}>
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
                    { ratings.findIndex((rating: Rating) => rating.user === props.user?._id) === -1 ?

                        <div className={styles.emptyContainer}>
                        {ratings.length === 0  ?
                        <>
                            {props.user?.username  ?
                            <>
                                <h2>
                                Esse jogo não possui avaliações.
                                </h2>
                                <button onClick={() => setIsOpen(true)}>Seja o primeiro a avaliar!</button>
                            </>
                            : 
                            <>
                            
                            <h2>
                                Esse jogo não possui avaliações.
                                </h2>
                                <button onClick={() => navigate('/login')}>Faça seu login e seja o primeiro à avaliar!</button>
                            </>
                            }
                        </>
                        
                        :

                        <>
                        {props.user
                        ?
                            <>
                            <h2>
                            Você ainda não avaliou esse jogo.
                            </h2>
                            <button onClick={() => setIsOpen(true)}>Avaliar esse jogo</button>
                            </>
                        :
                        <>
                            <h2>
                            Você ainda não avaliou esse jogo.
                            </h2>
                            <button onClick={() => navigate('/login')}>Faça seu login e faça parte da discussão!</button>
                        </>
                            }
                        </>
                        }
                    </div>
                    :
                    <>
                        <h2>
                            Você já avaliou esse jogo.
                        </h2>
                    </>
                    }
                </ul>
            </section>
            <Dialog title={'Criar Review'} isOpen={isOpen} setIsOpen={setIsOpen}>
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                    <div>
                        <textarea id="description" rows={3} placeholder='Descrição'></textarea>
                    </div>
                    <div>
                        <input type="number" id='score' placeholder='Nota (1-5)' min={1} max={5} />
                    </div>
                    <div className='row'>
                        <button type='button' onClick={() => setIsOpen(false)}>Cancelar</button>
                        <button type='submit'>Enviar</button>
                    </div>
                    <output id='output'></output>
                    </form>
            </Dialog>
        </>
        }

    </main>
  )
}

export default GamePage