import { useEffect } from 'react';
import requestAPI from '../../api/fetchData';
import styles from './ProfileLayout.module.css';
import { Link, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.user || !props.token || !props.setToken || !props.setUser) navigate('/');
  }, [])

  const handleEditProfile = async () => {
    if (!props.user || !props.token) return;

    const data = {
      username: props.user.username,
      id: props.user.id,
      description: 'Banana banana 6'
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
    
      const updatedUser = await response.json();
      props.setUser(updatedUser.user);
      props.setToken(updatedUser.token);
    
  }

  return (
    <main className={styles.profileBento}>
      <section>
        <div className={styles.leftContainer}>
          <div>
            <div className={styles.profilePicture}>
              {/* <img src="./" alt="No profile" /> */}
            </div>
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
              <ReviewItem link='/' title='Test game here' score={0}/>
            </ul>
          </div>
        </div>
        <div>
        </div>
        <div className={styles.rightContainer}>
          <header>
            <h1>{props.user.username}</h1>
            <h1>( {props.user.name} )</h1>
          </header>
          <div className={styles.about}>
            <p>{props.user?.description}</p>
            <hr />
            <div className={styles.banner}>
              <p>Insert banner here</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProfileLayout