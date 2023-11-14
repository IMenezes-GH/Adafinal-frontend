import { useState } from 'react';
import Dialog from './Dialog/Dialog';
import styles from './Footer.module.css';
import { ReactElement } from 'react';

interface IProps {
    user: User
}

interface props {
    title: string,
    isOpen: boolean,
    setIsOpen: CallableFunction,
    children?: ReactElement | ReactElement[]
  }
  

const CategoriaDialog = (props: props) => {
    return (
    <Dialog title={'Criar Categoria'} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form action="">
            <input id='text' type='text' placeholder='Nome da categoria' />
            <div>
                <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
                <button>Cadastrar Categoria</button>
            </div>
        </form>
    </Dialog>)
}

const GameDialog = (props: props) => {
    return (
    <Dialog title={'Cadastrar Jogo'} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form action="">
            <input id='text' type='text' placeholder='Nome do jogo' />
            <input type="text" id='url' placeholder='Url do jogo' />
            <input type="text" id='imageURL' placeholder='Url da imagem do jogo' />
            <select name="category" id="category">
                <option value="idRPG">RPG (Role-Playing-Game)</option>
            </select>
            <div>
                <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
                <button>Cadastrar Jogo</button>
            </div>
        </form>
    </Dialog>)
}

const Footer = (props: IProps) => {

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
            <CategoriaDialog title='' isOpen={categoryOpen} setIsOpen={setCategoryOpen}/>
            <GameDialog title='' isOpen={gameOpen} setIsOpen={setGameOpen} />
        </footer>
    ) 
}

export default Footer