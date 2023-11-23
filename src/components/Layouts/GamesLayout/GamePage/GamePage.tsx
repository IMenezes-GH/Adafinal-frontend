import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './GamePage.module.css'
import { requestAPI } from '../../../../api/fetchData'
import { Link } from 'react-router-dom'
import profileIcon from '../../../../assets/profile-icon.svg'
import fullStar from '../../../../assets/star_full.svg'
import ReviewDialog from '../../../Dialog/ReviewDialog'
import { UserContext } from '../../../../context/UserProvider'


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


const GamePage = () => {
    
    const {token, user} = useContext(UserContext);
    const param = useParams();
    const [game, setGame] = useState<Game>();
    const [ratings, setRatings] = useState([]);
    const [gameScore, setGameScore] = useState<number | string | '???'>('???');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    
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
                    { ratings.findIndex((rating: Rating) => rating.user === user?._id) === -1 ?

                        <div className={styles.emptyContainer}>
                        {ratings.length === 0  ?
                        <>
                            {user?.username  ?
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
                        {user
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
                        <ReviewDialog method='POST' title='Criar avaliação' isOpen={isOpen} user={user!} setIsOpen={setIsOpen} token={token}/>
                    </div>
                    :
                    <>
                        <div className={styles.emptyContainer}>
                            <h2>
                            Você já avaliou esse jogo.
                            </h2>
                            <button onClick={() => {setIsOpen(true)}}>Mudou de ideia? Mude a sua avaliação</button>
                            <ReviewDialog method='PATCH' rating={ratings.find((rating: Rating) => rating.user === user?._id)} title='Alterar avaliação' isOpen={isOpen} user={user!} setIsOpen={setIsOpen} token={token}/>
                        </div>
                    </>
                    }
                </ul>
            </section>
        </>
        }

    </main>
  )
}

export default GamePage