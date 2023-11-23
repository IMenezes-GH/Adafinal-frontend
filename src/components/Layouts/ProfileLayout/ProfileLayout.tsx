import styles from './ProfileLayout.module.css'
import ProfileCard from './ProfileComponents/ProfileCard'

const ProfileLayout = () => {
  
  return (
    <main className={styles.profileBento}>
     <ProfileCard />
    </main>
  )
}

export default ProfileLayout