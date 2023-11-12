import { FormEvent, useEffect, useState } from 'react';
import styles from './ProfileLayout.module.css';
import { Link, useNavigate } from 'react-router-dom';
import EditUserDialog from '../Dialog/EditUserDialog';

interface IReview {
  title: string,
  score: number,
  link: string
}

const URL = 'http://localhost:3000';


const ReviewItem = (props:IReview) => {
  return (
    <li className={styles.reviewLink}>
        <Link to={"review"}><span>{props.title}</span> - <span>{props.score}/5</span></Link>
    </li>
  )
}

const ProfileLayout = (props: userProps) => {

  const [userReviews, setUserReviews] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const getUserRatings = async () => {
    const response = await fetch(URL + '/ratings?user=' + props.user.id);
    const data = await response.json();

    setUserReviews(data);
  }


  useEffect(() => {
    if (!props.user || !props.token || !props.setToken || !props.setUser) navigate('/');
    getUserRatings()
  }, [])
  // getUserRatings();

  const handleEditProfile = async () => {
    setIsOpen(true)
  }

  const submitModal = async(ev: FormEvent) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement;


    if (!props.user || !props.token) return;

    const data = {
      id: props.user.id,
      email: target.email.value || props.user.email,
      name: target.fullName.value || props.user.name,
      username: target.username.value || props.user.username,
      description: target.description.value || props.user.description,
      profileImageURL: target.profileImageURL.value || props.user.profileImageURL,
    }

    const response = await fetch(URL + '/users', {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer' + ' ' + props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.status === 409) setErrorMsg('Email e nome de usuário precisam ser valores únicos')
    if (response.ok){
      const updatedUser = await response.json();
      props.setUser(updatedUser.user);
      props.setToken(updatedUser.token);
      setIsOpen(false);
    }

  }

  return (
    <main className={styles.profileBento}>
      <section>
        <div className={styles.leftContainer}>
          <div>
            {/* <div className={styles.profilePicture}></div> */}
            {props.user.profileImageURL && <div style={{backgroundImage: `url(${props.user.profileImageURL})`}} className={styles.profilePicture}></div> }
            {!props.user.profileImageURL && <div style={{backgroundImage: `url(${props.user.profileImageURL})`}} className={styles.profilePicture}></div> }
            <article className={styles.profileArticle}>
              <header><span>{props.user.active ? '⬤' : '◯'}</span><span>{props.user.username}</span></header>
              <div className={styles.profileContent}>
                <p>{props.user.country}</p>
                <p>{props.user.name}</p>
                <p>{props.user.email}</p>
              </div>
            </article>
            <hr />
            <button onClick={handleEditProfile} className={styles.editProfile}>Editar Perfil</button>
          </div>
          <div className={styles.reviewsContainer}>
            <h3>Últimos reviews:</h3>
            <hr />
            <ul className={styles.profileReviewsList}>
              { 
               userReviews.length > 1 && userReviews.map((review: Review, index) => {
                  return (
                    <ReviewItem 
                      key={index} 
                      link='/' 
                      title={review.game} 
                      score={review.score}/>
                      )})}
              {userReviews.length === 0 && <p>Esse usuário não possui reviews</p>}
             
            </ul>
          </div>
        </div>
        <div>
        </div>
        <div className={styles.rightContainer}>
          <div>
            <h1>{props.user.username}</h1>
            <h1>( {props.user.country} )</h1>
          </div>
          <div className={styles.about}>
            <p>{props.user?.description}</p>
            <hr />
            <div className={styles.banner}>
              <p>{!props.user.banner && 'Escolha um banner para seu perfil'}</p>
            </div>
          </div>
        </div>
      </section>

      <EditUserDialog title={'Editar perfil'} isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>Preencha apenas os dados que serão atualizados</p>
        <form onSubmit={(ev: FormEvent) => submitModal(ev)}>
          <div className='row'>
            
            <input type="email" id='email'  placeholder='Seu novo email (email@exemplo.com)'/>
          </div>
          <div className='row'>
            
            <input type="text" id='fullName' placeholder='Novo nome'/>
          </div>
          <div className='row'>
           
            <input type="text" id='username'  placeholder='Novo nome de usuário'/>
          </div>
          <div className='row'>
            
            <textarea name="" id="description" placeholder='Descrição (máx: 500)'></textarea>
          </div>
          <div className='row'>
          
            <input type="text" id='profileImageURL' placeholder='link para imagem'/>
          </div>
          <output style={{color: '#CF4027'}}>{errorMsg}</output>
          <div className='row'>
            <button type='button' onClick={() => {setIsOpen(false)}}>Cancelar</button>
            <button type='submit'>Atualizar</button>
          </div>
        </form>
      </EditUserDialog>
    </main>
  )
}

export default ProfileLayout