import styles from './ProfileCard.module.css'
import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { requestAPI } from '../../../../api/fetchData'
import EditProfileDialog from '../../../Dialog/EditProfileDialog'


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
  
  
interface IProfileContainer {
  profile: User,
  isUserProfile: boolean
}
const ProfileContainerLeft = (props: IProfileContainer) => {

    const {profile} = props;
    const isUserProfile = props.isUserProfile;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const handleEditProfile = async () => {setIsOpen(true)}
    
    const EditProfileButton = () => {
       return (
        <>
       <button onClick={handleEditProfile} className={styles.editProfile}>Editar Perfil</button>
        <EditProfileDialog isOpen={isOpen} profile={profile} setIsOpen={setIsOpen}/>
        </>
       )
    }
        
    const ProfileInfo = () => {
      
    return (
      <div>
      {profile.profileImageURL && <div style={{backgroundImage: `url(${profile.profileImageURL})`}} className={styles.profilePicture}></div> }
      {!profile.profileImageURL && <div style={{backgroundImage: `url(${profile.profileImageURL})`}} className={styles.profilePicture}></div> }
      <article className={styles.profileArticle}>
        <header><span>{profile.active ? '⬤' : '◯'}</span><span className={profile.roles === 'admin' ? 'admin' : ''}>{profile.username}</span></header>
        <div className={styles.profileContent}>
          <p>{profile.country}</p>
          <p>{profile.name}</p>
          {/* <p>{profile.email}</p> */}
        </div>
      </article>
      <hr />
      {isUserProfile && <EditProfileButton />}
    </div>
    )
}

    const LastReviewsContainer = () => {

      const [userReviews, setUserReviews] = useState<Rating[]>([]);

      useEffect(() => {
        const getReviews = async() => {
          await requestAPI('/ratings?user='+ profile._id).then((r) => {
            setUserReviews(r.message)
          })
        }
        getReviews()
      }, [])

      return (
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
      )
    }

    return (
    <div className={styles.leftContainer}>
      <ProfileInfo />
      <LastReviewsContainer />
    </div>
    )
}

export default ProfileContainerLeft