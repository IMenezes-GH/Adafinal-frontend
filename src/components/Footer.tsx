import styles from './Footer.module.css';

interface IProps {
    user: User
}

const Footer = (props: IProps) => {

    const content = (
        <div>{props.user.roles === 'admin' ? 'Admin' : 'member'}</div>
    )
    return (
        <footer className={styles.Footer}>
            <hr className='hr-blue'/>
            {content}
        </footer>
    ) 
}

export default Footer