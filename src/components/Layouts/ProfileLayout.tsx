import { FormEvent, useEffect, useState } from 'react';
import styles from './ProfileLayout.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import { requestAPI } from '../../api/fetchData';

interface IReview {
  title: string,
  score: number,
  link: string,
  reviewID: string
}


const ReviewItem = (props:IReview) => {
  return (
    <li className={styles.reviewLink}>
        <Link to={`/games/${props.link}#${props.reviewID}`}><span>{props.title}</span> - <span>{props.score}/5</span></Link>
    </li>
  )
}

const ProfileLayout = (props: userProps) => {

  const [userReviews, setUserReviews] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [profile, setProfile] = useState<User>(props.user);
  const [isUserProfile, setIsUserProfile] = useState(false);

  const params = useParams();

  const navigate = useNavigate();
  
  
  
  useEffect(() => {
    
    const getUserRatings = async () => {
      if (profile._id || profile.id){
        const {message} = await requestAPI('/ratings?user=' + profile._id);
      
        setUserReviews(message);
      }
    }

    const getUser = async () => {
      const {message, response} = await requestAPI('/users?id=' + params.userid)
      return {message, response};
    }
    
    if (!params.userid && !props.user.name) navigate('/login');
    
    if (!params.userid || params.userid === props.user._id){
      setIsUserProfile(true);
      setProfile(props.user);
    }
    else {
      getUser().then((res) => {
        if (!res.response.ok) return;
        setIsUserProfile(false);
        setProfile(res.message);
      });
    }
    
    // if (!profile || !props.token || !props.setToken || !props.setUser) navigate('/');
    getUserRatings()
  }, [params.userid, props.user, navigate, profile._id, profile.id])

  const handleEditProfile = async () => {
    setIsOpen(true)
  }
  
  const submitModal = async(ev: FormEvent) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement;

    if (!profile || !props.token) return;

    const data = {
      active: true,
      id: profile._id || profile.id,
      email: target.email.value || profile.email,
      name: target.fullName.value || profile.name,
      username: target.username.value || profile.username,
      description: target.description.value || profile.description,
      profileImageURL: target.profileImageURL.value || profile.profileImageURL,
    }

    const {response, message} = await requestAPI('/users', {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer' + ' ' + props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.status === 409) {setErrorMsg('Email e nome de usuário precisam ser valores únicos')}
    else {
      const updatedUser = message;
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
            {profile.profileImageURL && <div style={{backgroundImage: `url(${profile.profileImageURL})`}} className={styles.profilePicture}></div> }
            {!profile.profileImageURL && <div style={{backgroundImage: `url(${profile.profileImageURL})`}} className={styles.profilePicture}></div> }
            <article className={styles.profileArticle}>
              <header><span>{profile.active ? '⬤' : '◯'}</span><span className={profile.roles === 'admin' ? 'admin' : ''}>{profile.username}</span></header>
              <div className={styles.profileContent}>
                <p>{profile.country}</p>
                <p>{profile.name}</p>
                <p>{profile.email}</p>
              </div>
            </article>
            <hr />
            {isUserProfile && 
              <button onClick={handleEditProfile} className={styles.editProfile}>Editar Perfil</button>
            }
          </div>
          <div className={styles.reviewsContainer}>
            <h3>Últimos reviews:</h3>
            <hr />
            <ul className={styles.profileReviewsList}>
              { 
               userReviews.length >= 1 && userReviews.map((review: Rating, index) => {
                  return (
                    <ReviewItem 
                      key={index}
                      reviewID={review._id} 
                      link={review.game}
                      title={review.description.length > 12 ? review.description.substring(0,12) + '(...)' : review.description} 
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
            <h1>{profile.username}</h1>
            <h1>( {profile.country} )</h1>
          </div>
          <div className={styles.about}>
            <p>{profile?.description}</p>
            <hr />
            <div className={styles.banner}>
              {/* BANNER */}
            </div>
          </div>
        </div>
      </section>

      <Dialog title={'Editar perfil'} isOpen={isOpen} setIsOpen={setIsOpen}>
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
      </Dialog>
    </main>
  )
}

export default ProfileLayout