import styles from './ProfileLayout.module.css'
import ProfileCard from './ProfileLayout/ProfileCard'

const ProfileLayout = (props: userProps) => {

  return (
    <main className={styles.profileBento}>
     <ProfileCard token={props.token} user={props.user} />
    </main>
  )
}

export default ProfileLayout