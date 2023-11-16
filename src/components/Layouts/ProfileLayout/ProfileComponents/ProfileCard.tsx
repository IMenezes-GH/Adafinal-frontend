import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAPI } from '../../../../api/fetchData';
import ProfileContainerLeft from './ProfileContainerLeft';
import ProfileContainerRight from './ProfileContainerRight';

interface IProfileContainer {
    user: User | null
    token: string
}

const ProfileCard = (props: IProfileContainer) => {

    const [profile, setProfile] = useState<User | null>(props.user);
    const params = useParams();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if (!params.userid && !props.user) return navigate('/login')
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
        <ProfileContainerLeft token={props.token} isUserProfile={props.user ? props.user._id === profile._id : false} profile={profile} />
        <div></div>
        <ProfileContainerRight profile={profile} />
      </>
      }
    </section>
  )
}

export default ProfileCard