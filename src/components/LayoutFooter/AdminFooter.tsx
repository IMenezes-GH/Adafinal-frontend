import { useState } from "react";
import CreateCategoryDialog from "../Dialog/CreateCategoryDialog";
import CreateGameDialog from "../Dialog/CreateGameDialog";

import styles from './Footer.module.css'

const AdminFooter = () => {

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [gameOpen, setGameOpen] = useState(false);

    return (
    <div className={styles.adminOptions}>
        <ul>
            <li>
                <button onClick={() => setCategoryOpen(true)} role='button'>Cadastrar Categoria</button>
            </li>
            <li>
                <button onClick={() => setGameOpen(true)} role='button'>Cadastrar Jogo</button>
            </li>
        </ul>
        <CreateCategoryDialog title='' isOpen={categoryOpen} setIsOpen={setCategoryOpen}/>
        <CreateGameDialog title='' isOpen={gameOpen} setIsOpen={setGameOpen} />
    </div>
  )
}

export default AdminFooter