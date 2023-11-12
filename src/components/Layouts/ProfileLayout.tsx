import styles from './ProfileLayout.module.css';

interface props {
  user: User,
  setUser : CallableFunction
}

const ProfileLayout = (props: props) => {

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
            <button className={styles.editProfile}>Editar Perfil</button>
          </div>
          <div>
            <p>Últimos reviews:</p>
            <ul className={styles.profileReviewsList}>
              <li>
                1
              </li>
              <li>
                2
              </li>
            </ul>
          </div>
        </div>
        <div>
        </div>
        <div className={styles.rightContainer}>

        </div>
      </section>
    </main>
  )
}

export default ProfileLayout