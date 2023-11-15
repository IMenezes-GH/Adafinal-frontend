
import styles from './Footer.module.css';
import AdminFooter from './AdminFooter';

interface IFooter {
    user: User
    token: string,
    gameList: Game[],
    setGameList: CallableFunction
}

const Footer = (props: IFooter) => {

    const {token, gameList, setGameList} = props;

    // Se usuário for admin, painel do admin é mostrado
    const content = (
        props.user.roles === 'admin' 
        ? <AdminFooter token={token} gameList={gameList} setGameList={setGameList}/> 
        : <div>2023</div>
    )
    
    return (
        <footer className={styles.Footer}>
            {content}
        </footer>
    ) 
}

export default Footer