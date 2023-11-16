
import styles from './ProfileCard.module.css'

interface IProfileContainer {
    profile: User
}


const ProfileContainerRight = (props: IProfileContainer) => {
    const {username, country, description, bannerImageURL} = props.profile;

    return (
      <div className={styles.rightContainer}>
        <div>
            <h1>{username}</h1>
            <h1>({country})</h1>
          </div>
          <div className={styles.about}>
            <p>{description}</p>
            <hr />
            <div className={styles.banner} style={{backgroundImage: `url(${bannerImageURL})`}}></div>
        </div>
      </div>
    )
}

export default ProfileContainerRight