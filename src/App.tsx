import Header from './components/Header'
import './App.css'
import {Routes, Route} from 'react-router-dom'


export const Layout = () => {
  return (
    <>
    <Header />
    <main>
      <div className='hero'>
        <div className='wrapper'>
          <h1>Melhores jogos para navegadores</h1>
        </div>
      </div>

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
