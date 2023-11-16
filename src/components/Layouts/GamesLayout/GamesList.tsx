import { useEffect, useState } from "react";
import styles from './GamesList.module.css'
import { Link } from "react-router-dom";
import CategorySelector from "../../Category/CategorySelector";
import { requestAPI } from "../../../api/fetchData";

interface Props {
  gameList: Game[],
  setGameList: CallableFunction
}

const GamesList = (props: Props) => {

  
  const [isLoaded, setIsLoaded] = useState(false);
  const [recommendedGames, setRecommendedGames] = useState<Game[]>();
  const [category, setCategory] = useState(sessionStorage.getItem('category'));
 
  useEffect(() => {

    (requestAPI('/games')).then((res) => {
      const {message, response} = res;
      if (response.ok){
        // setGameList(message);
        setRecommendedGames(message.slice(0, 2));
        setIsLoaded(true);
      }
    })

    const categorySelectElement = document.getElementById("category") as HTMLSelectElement;
    categorySelectElement.addEventListener("change", async(ev) => {
      
      const target = ev.target as HTMLSelectElement;
      sessionStorage.setItem('category', target.value);
      setCategory(target.value);

      (requestAPI('/games?category='+category)).then((res) => {
        const {message, response} = res;
        if (response.ok){
          props.setGameList(message)
        }
      })
    })
    
  }, [])

  return (
    <main className={styles.gameMain}>
        <section className={styles.pageHeader}>
          <h1 className="title">Jogos</h1>
          <CategorySelector/>
        </section>
        <section className={styles.gameListsSection}>
          <div>
            <h2>Últimos jogos adicionados:</h2>
            <ul>
              {isLoaded ? props.gameList?.map((game: Game, index) => {
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
            {isLoaded ? recommendedGames?.map((game: Game, index) => {
                return (
                <li key={index}>
                  <article className={styles.gameArticle}>
                    <h1><Link to={'/games/'+game._id}>{game.name}</Link></h1>
                    <p><Link to={'/games/'+game._id}>{game.description.length > 100 ? game.description.substring(0, 100) + '... (Ler mais)' : game.description}</Link></p>
                    <div className={styles.banner} style={{backgroundImage: `url(${game.imageURL})`}}>
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