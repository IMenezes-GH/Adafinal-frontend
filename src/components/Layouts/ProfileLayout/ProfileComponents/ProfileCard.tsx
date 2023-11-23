import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAPI } from '../../../../api/fetchData';
import ProfileContainerLeft from './ProfileContainerLeft';
import ProfileContainerRight from './ProfileContainerRight';
import { UserContext } from '../../../../context/UserProvider';


const ProfileCard = () => {

    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState<User | null>(user);
    const params = useParams();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if (!params.userid && !user) return navigate('/login')
        else {
            const getParamUser = async () => {
              const {message, response} = await requestAPI('/users?_id=' + params.userid)
              return {message, response};
            }
            if (profile === null || profile._id !== params.userid) {
              getParamUser().then((response) => {
              response.response.ok && setProfile(response.message)
            })
        }
      }
      }, [])

      
  return (
    <section>
      { profile &&
      <>
        <ProfileContainerLeft isUserProfile={user ? user._id === profile._id : false} profile={profile} />
        <div></div>
        <ProfileContainerRight profile={profile} />
      </>
      }
    </section>
  )
}

export default ProfileCard