
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import profileIcon from '../../../../assets/profile-icon.svg'
import ReviewDialog from '../../../Dialog/ReviewDialog'
import styles from './GamePage.module.css';

import fullStar from '../../../../assets/star_full.svg'

import { UserContext } from '../../../../context/UserProvider'

interface IReviewContainer {
    ratings: Rating[]
}

const ReviewContainer = ({ratings}: IReviewContainer) => {

    const {token, user} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

  return (
        <section className={styles.reviewContainer}>
            <ul className={styles.reviewList}>
                {ratings.length > 0 && ratings.map((rating: Rating, index) => {
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
                {ratings.findIndex((rating: Rating) => rating.user === user?._id) === -1 ?

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
  )
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

export default ReviewContainer