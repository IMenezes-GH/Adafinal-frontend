import Header from './components/Header'
import './App.css'
import {Routes, Route} from 'react-router-dom'


export const Layout = () => {
  return (
    <>
    <Header />
    <main>
      <section className='hero'>
        <div>
          <h1 className='title big-txt'>BestBrowserGames</h1>
          <h2>Melhores jogos para seu navegador!</h2>
        </div>
      </section>
      <section>
      </section>
    </main>
    </>
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
