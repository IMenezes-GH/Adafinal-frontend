import Carousel from './Carousel/Carousel'

const NewsPage = () => {
  return (
    <main>
    <section className='hero'>
        <Carousel />
        <div className="bottom">
          <h1 className='title big-txt'>BestBrowserGames</h1>
          <h2>Melhores jogos para seu navegador!</h2>
        </div>
    </section>
    </main>
  )
}

export default NewsPage