import { useState, FormEvent } from "react";
import { requestAPI } from "../../api/fetchData";
import Dialog from "./Dialog";


interface IEditProfileDialog {
    isOpen: boolean,
    profile: User,
    setIsOpen: CallableFunction,
    token: string
}

const EditProfileDialog = (props: IEditProfileDialog) => {

    const {isOpen, setIsOpen, profile, token} = props    
    const [errorMsg, setErrorMsg] = useState('');

    const submitModal = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement;
    
        const data = {
          active: true,
          _id: profile._id,
          email: target.email.value || profile.email,
          username: target.username.value || profile.username,
          name: target.fullName.value,
          password: target.password.value,
          description: target.description.value,
          bannerImageURL: target.bannerImageURL.value,
          profileImageURL: target.profileImageURL.value,
        }
    
        const {response} = await requestAPI('/users', {
          method: 'PATCH',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer' + ' ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (response.status === 409) {setErrorMsg('Email e nome de usuário precisam ser valores únicos')}
        else {
          // const updatedUser = message;
          // setUser(updatedUser.user);
          // setToken(updatedUser.token);
          setIsOpen(false);
          // location.reload();
        }
    }


  return (
    <Dialog title={'Editar perfil'} isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>Preencha apenas os dados que serão atualizados</p>
        <form onSubmit={(ev: FormEvent) => submitModal(ev)}>
          <div className='row'>
            
            <input type="email" id='email'  placeholder='Seu novo email (email@exemplo.com)'/>
          </div>
          <div className='row'>
            
            <input type="text" id='fullName' placeholder='Nome Completo'/>
          </div>
          <div className='row'>
           
            <input type="text" id='username'  placeholder='Novo nome de usuário'/>
          </div>
          <div>
          <input type="password" id="password"  placeholder="Nova senha"/>
          </div>
          <div className='row'>
            <textarea name="" id="description" defaultValue={profile.description} maxLength={500} placeholder='Descrição (máx: 500)'></textarea>
          </div>
          <div className='row'>
            <input type="text" id='profileImageURL' placeholder='link para imagem do perfil'/>
          </div>
          <div>
            <input type="text" id='bannerImageURL' placeholder='link para imagem do banner'/>
          </div>
          <output style={{color: '#CF4027'}}>{errorMsg}</output>
          <div className='row'>
            <button type='button' onClick={() => {setIsOpen(false)}}>Cancelar</button>
            <button type='submit'>Atualizar</button>
          </div>
        </form>
      </Dialog>
  )
}

export default EditProfileDialog