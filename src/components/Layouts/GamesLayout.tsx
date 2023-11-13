import { useEffect, useState } from "react";
import styles from './GamesLayout.module.css'
import { Link } from "react-router-dom";
import { requestAPI } from "../../api/fetchData";

const GamesPage = () => {


  const [gameList, setGameList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {

    const fetchGames = async () => {
      const {message} = await requestAPI('/games/all');
      return message;
    }

    if (!sessionStorage.getItem('games')){
      (async() => await fetchGames())().then((d) => {
        sessionStorage.setItem('games', JSON.stringify(d));
        setGameList(d)
        setIsLoaded(true)
      })
    }
    else {
      setGameList(JSON.parse(sessionStorage.getItem('games') || '[]'))
      setIsLoaded(true)
    }

  }, [])



  return (
    <main className={styles.gameMain}>
        <section>
          <h1>Jogos</h1>
          <p>Últimos jogos adicionados</p>
        </section>
        <section>
          <ul>
            {isLoaded ? gameList.map((game: Game, index) => {
              return (
              <li key={index}>
                <article className={styles.gameArticle}>
                  <h1><Link to={'/games/'+game._id}>{game.name}</Link><span>{game.score}/5</span></h1>
                  <p><Link to={'/games/'+game._id}>{game.description.length > 250 ? game.description.substring(0, 250) + '... (Ler mais)' : game.description}</Link></p>
                </article>
              </li>)}) : <p>Loading...</p>}
          </ul>
        </section>
    </main>
  )
}

export default GamesPage