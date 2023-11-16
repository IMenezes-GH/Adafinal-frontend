
import styles from './Footer.module.css';
import AdminFooter from './AdminFooter';

interface IFooter {
    user: User | null
    token: string
}

const Footer = (props: IFooter) => {

    const {token} = props;

    // Se usuário for admin, painel do admin é mostrado
    const content = (
        props.user?.roles === 'admin' 
        ? <AdminFooter token={token}/> 
        : <div>2023</div>
    )
    
    return (
        <footer className={styles.Footer}>
            {content}
        </footer>
    ) 
}

export default Footer