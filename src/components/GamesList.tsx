import { useEffect, useState } from "react";
import styles from './GamesList.module.css'
import { Link } from "react-router-dom";
import CategorySelector from "./CategorySelector";

interface Props {
  category: Category[],
  gameList: Game[],
  setGameList: CallableFunction
}

const GamesList = (props: Props) => {

  
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {

    setIsLoaded(true);
  }, [props.gameList])



  return (
    <main className={styles.gameMain}>
        <section className={styles.pageHeader}>
          <h1 className="title">Jogos</h1>
          <CategorySelector />
        </section>
        <section className={styles.gameListsSection}>
          <div>
            <h2>Últimos jogos adicionados:</h2>
            <ul>
              {isLoaded ? props.gameList.map((game: Game, index) => {
                return (
                <li key={index}>
                  <article className={styles.gameArticle}>
                    <h1><Link to={'/games/'+game._id}>{game.name}</Link></h1>
                    <p><Link to={'/games/'+game._id}>{game.description.length > 45 ? game.description.substring(0, 45) + '... (Ler mais)' : game.description}</Link></p>
                  </article>
                </li>)}) : <p>Loading...</p>}
            </ul>
          </div>
          <div>
            <h2>Recomendados para você</h2>
            <ul className={styles.recommended}>
            {isLoaded ? props.gameList.slice(0, 2).map((game: Game, index) => {
                return (
                <li key={index}>
                  <article className={styles.gameArticle}>
                    <h1><Link to={'/games/'+game._id}>{game.name}</Link></h1>
                    <p><Link to={'/games/'+game._id}>{game.description.length > 100 ? game.description.substring(0, 100) + '... (Ler mais)' : game.description}</Link></p>
                    <div className={styles.banner}>
                    </div>
                  </article>
                </li>)}) : <p>Loading...</p>}
            </ul>
          </div>
        </section>
    </main>
  )
}

export default GamesList