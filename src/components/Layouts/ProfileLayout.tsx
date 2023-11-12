interface props {
  user: User,
  setUser : CallableFunction
}


const ProfileLayout = (props: props) => {

  console.log(props.user)

  return (
    <main>
        <p>{props.user.username}
        </p>
    </main>
  )
}

export default ProfileLayout