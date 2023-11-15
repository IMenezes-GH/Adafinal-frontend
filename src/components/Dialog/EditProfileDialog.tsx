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
          name: target.fullName.value || profile.name,
          username: target.username.value || profile.username,
          description: target.description.value || profile.description,
          profileImageURL: target.profileImageURL.value || profile.profileImageURL,
        }
    
        const {response, message} = await requestAPI('/users', {
          method: 'PATCH',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer' + ' ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        console.log(response, message)
        if (response.status === 409) {setErrorMsg('Email e nome de usuário precisam ser valores únicos')}
        else {
          // const updatedUser = message;
          // setUser(updatedUser.user);
          // setToken(updatedUser.token);
          setIsOpen(false);
          location.reload();
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
          <div className='row'>
            
            <textarea name="" id="description" placeholder='Descrição (máx: 500)'></textarea>
          </div>
          <div className='row'>
          
            <input type="text" id='profileImageURL' placeholder='link para imagem'/>
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