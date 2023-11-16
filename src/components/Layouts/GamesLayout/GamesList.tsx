import { useEffect, useState } from "react";
import styles from './GamesList.module.css'
import { Link } from "react-router-dom";
import CategorySelector from "../../Category/CategorySelector";
import { requestAPI } from "../../../api/fetchData";


const GamesList = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [recommendedGames, setRecommendedGames] = useState<Game[]>();
  const [selectedCategory, setSelectedCategory] = useState(sessionStorage.getItem('category') || 'all');
  const [games, setGames] = useState([]);

  useEffect(() => {

    (requestAPI('/games')).then((res) => {
      const {message, response} = res;
      if (response.ok){
        
        setGames(message);
        sessionStorage.setItem('allGames', JSON.stringify(message));

        setRecommendedGames(message.slice(0, 2));
        setIsLoaded(true);
      }
    })

  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setGames(JSON.parse(sessionStorage.getItem('allGames') || '[]'))
    }
    else (requestAPI('/games?category=' + selectedCategory)).then((res) => {
      const {message, response} = res;
      if (response.ok){
        setGames(message);
      }
    })

  }, [selectedCategory])

  return (
    <main className={styles.gameMain}>
        <section className={styles.pageHeader}>
          <h1 className="title">Jogos</h1>
          <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        </section>
        <section className={styles.gameListsSection}>
          <div>
            <h2>Últimos jogos adicionados:</h2>
            <ul>
              {isLoaded ? games.map((game: Game, index) => {
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