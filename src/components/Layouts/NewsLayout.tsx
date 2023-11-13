import Carousel from '../Carousel/Carousel'

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
    <section className='newsdiv'> 
      <div>

        <h1>Os melhores jogos para Browser!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iure qui voluptatibus maxime eaque aspernatur neque dolores ab nobis atque.</p>
        <hr />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cum ducimus consequatur totam repellat rem obcaecati consequuntur dolor labore commodi perspiciatis dolore, error numquam, facere natus possimus deleniti eum eos libero optio mollitia expedita similique ex? Libero consequatur error quod.</p>
        <div className='div-placeholder' style={{backgroundColor: 'transparent', width: '100%', display: 'flex', gap: '1rem'}}>
          <div className='div-placeholder' style={{width: '100%', backgroundColor: '#024162'}}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, praesentium.</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
            <div className='div-placeholder' style={{flexShrink: '0',width: '100%', backgroundColor: '#48242C'}}></div>
            <div className='div-placeholder' style={{flexShrink: '2',width: '100%', backgroundColor: '#48242C'}}></div>
          </div>




        </div>
      </div>

    </section>
    </main>
  )
}

export default NewsPage