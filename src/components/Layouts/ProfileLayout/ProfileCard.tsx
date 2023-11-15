import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAPI } from '../../../api/fetchData';
import ProfileContainerLeft from './ProfileContainerLeft';
import ProfileContainerRight from './ProfileContainerRight';



interface IProfileContainer {
    user: User
    token: string
}

const ProfileCard = (props: IProfileContainer) => {

    const [profile, setProfile] = useState<User>(props.user);
    const params = useParams();
    const navigate = useNavigate();
    
    if (!params.userid && !props.user.name) navigate('/login');

    useEffect(() => {
        
        const getParamUser = async () => {
          const {message, response} = await requestAPI('/users?_id=' + params.userid)
          return {message, response};
        }
        
        if (params.userid !== profile._id) {
            getParamUser().then((response) => {
                response.response.ok && setProfile(response.message)
            })
        }

      }, [])

      
  return (
    <section>
    <ProfileContainerLeft token={props.token} isUserProfile={props.user._id === profile._id} profile={profile} />
    <div></div>
    <ProfileContainerRight profile={profile} />
    </section>
  )
}

export default ProfileCard