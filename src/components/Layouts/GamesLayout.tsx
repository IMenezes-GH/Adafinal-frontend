import { useEffect, useState } from "react";

// const URL = 'https://adafinal-backend.vercel.app/games';
const URL = 'http://localhost:3000/games';

const GamesPage = () => {


  const [gameList, setGameList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {

    const fetchGames = async () => {
      const fetchGames = await fetch(URL);
      const data = await fetchGames.json()
      return data;
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
    <main>
        <section>
          <h1>Jogos</h1>
          <p>Últimos jogos adicionados</p>
        </section>
        <section>
          <ul>
            {isLoaded ? gameList.map((game: Game, index) => {
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