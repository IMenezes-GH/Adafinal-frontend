import { useEffect, useState } from "react";
import fetchData from "../../api/fetchData"

const GamesPage = () => {


  const [gameList, setGameList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const url = 'https://adafinal-backend.vercel.app/games';
  
  useEffect(() => {

    if (!sessionStorage.getItem('games')){
      const fetchGames = async () => {return await fetchData(url, {method: 'GET'})}
      const data = (async() => await fetchGames())();
     
      data.then((d) => {
        sessionStorage.setItem('games', JSON.stringify(d?.message));
        setGameList(d?.message)
        setIsLoaded(true)
      })
    }
    else {
      setGameList(JSON.parse(sessionStorage.getItem('games') || '[]'))
      setIsLoaded(true)
    }

  }, [])



  return (
    <main>
        <section>
          <h1>Jogos</h1>
          <p>Últimos jogos adicionados</p>
        </section>
        <section>
          <ul>
            {isLoaded ? gameList.map((game: Game, index) => {
              console.log(gameList)
              return (
              <li key={index}>
                <article>
                  <h1>{game.name}</h1>
                  <p>{game.description} <span>{game.score}</span></p>
                </article>
              </li>)}) : <p>Loading...</p>}
          </ul>
        </section>
    </main>
  )
}

export default GamesPage