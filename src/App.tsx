import Nav from './components/Nav'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import searchIcon from './assets/search-icon.svg'


export const Layout = () => {
  return (
    <main>
      <header>
        <h2 className='title'>BestBrowserGames</h2>
        <form action="">
          <input type="search" placeholder='Buscar um jogo'/>
          <button><img src={searchIcon} alt="" /></button>
        </form>
      </header>
      <Nav />
      <div className='hero'>
        <div className='wrapper'>
          <h1>Melhores jogos para navegadores</h1>
        </div>
      </div>
    </main>
  )
}


function App() {
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}/>
    </Routes>
  )
}

export default App
