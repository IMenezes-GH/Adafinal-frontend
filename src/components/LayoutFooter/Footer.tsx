
import styles from './Footer.module.css';
import AdminFooter from './AdminFooter';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';

const Footer = () => {


    const {user} = useContext(UserContext);

    // Se usuário for admin, painel do admin é mostrado
    const content = (
        user?.roles === 'admin' 
        ? <AdminFooter/> 
        : <div>2023</div>
    )
    
    return (
        <footer className={styles.Footer}>
            {content}
        </footer>
    ) 
}

export default Footer