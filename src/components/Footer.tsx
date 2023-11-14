import { FormEvent, useState } from 'react';
import Dialog from './Dialog/Dialog';
import styles from './Footer.module.css';
import { ReactElement } from 'react';
import CategorySelector from './CategorySelector';
import { requestAPI } from '../api/fetchData';

interface IFooter {
    user: User
    token: string,
    gameList: Game[],
    setGameList: CallableFunction
}

interface props {
    title: string,
    isOpen: boolean,
    token: string,
    gameList?: Game[],
    children?: ReactElement | ReactElement[]
    setIsOpen: CallableFunction,
    setGameList?: CallableFunction
  }
  

const CategoriaDialog = (props: props) => {

    const {token, setIsOpen} = {...props};

    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement;
        const data = {
            name: target.categoryName.value
        }
        const {response} = await requestAPI('/category', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization' : 'Bearer' + ' ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if (response.ok){
            setIsOpen(false)
            location.reload();
        }
        
    }

    return (
    <Dialog title={'Criar Categoria'} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form onSubmit={(ev) => handleSubmit(ev)}>
            <input id='categoryName' type='text' placeholder='Nome da categoria' />
            <div>
                <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
                <button type='submit'>Cadastrar Categoria</button>
            </div>
            <output id='output'></output>
        </form>
    </Dialog>)
}

const GameDialog = (props: props) => {

    const {token, setIsOpen} = {...props};
    
    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement;
        const data = {
            name: target.gameName.value,
            description: target.description.value,
            url: target.url.value,
            imageURL: target.imageURL.value,
            category: target.category.value
        }
        const {response, message} = await requestAPI('/games', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization' : 'Bearer' + ' ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            setIsOpen(false)
            location.reload();
        }
        else target.output.innerText = message.message
    }


    return (
    <Dialog title={'Cadastrar Jogo'} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form onSubmit={(ev) => handleSubmit(ev)}>
            <input required id='gameName' type='text' placeholder='Nome do jogo' />
            <textarea required id="description" rows={4} placeholder='Descrição do jogo'></textarea>
            <input required type="text" id='url' placeholder='Url do jogo' />
            <input required type="text" id='imageURL' placeholder='Url da imagem do jogo' />
            <CategorySelector forceOption={true}/>
            <div>
                <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
                <button>Cadastrar Jogo</button>
            </div>
            <output id='output'></output>
        </form>
    </Dialog>)
}

const Footer = (props: IFooter) => {

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [gameOpen, setGameOpen] = useState(false);

    const content = (
        props.user.roles === 'admin' ? 
        <div className={styles.adminOptions}>
            <ul>
                <li>
                    <button onClick={() => setCategoryOpen(true)} role='button'>Cadastrar Categoria</button>
                </li>
                <li>
                    <button onClick={() => setGameOpen(true)} role='button'>Cadastrar Jogo</button>
                </li>
            </ul>
        </div> 
        : 
        <div>
            2023
        </div>
    )
    return (
        <footer className={styles.Footer}>
            {/* <hr className='hr-blue'/> */}
            {content}
            <CategoriaDialog token={props.token} title='' isOpen={categoryOpen} setIsOpen={setCategoryOpen}/>
            <GameDialog gameList={props.gameList} setGameList={props.setGameList} token={props.token} title='' isOpen={gameOpen} setIsOpen={setGameOpen} />
        </footer>
    ) 
}

export default Footer