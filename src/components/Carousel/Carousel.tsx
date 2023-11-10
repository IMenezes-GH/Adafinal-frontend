import { Component, MouseEventHandler, MouseEvent } from 'react'
import styles from './Carousel.module.css'

interface INewsCard {
    data: {
        content: string
    },
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export const NewsCard = (props: INewsCard) => {

    return (
      <article className={styles.card}>
   
        <div>
          <button id='leftArrow' type='button' value='subtract' onClick={(ev) => props.handleClick(ev)}>⮜</button>
          <span>{props.data.content}</span>
          <button id='RightArrow' type='button' value='add' onClick={(ev) => props.handleClick(ev)}>⮞</button>
        </div>
      </article>
    )
}

export default class Carousel extends Component {
  
    // news = 
    currentIndex = 0;
    state = {
        cards: [
            {content: 'first'}, 
            {content: 'second'}, 
            {content: 'third'}, 
            {content: 'fourth'}, 
            {content: 'fifth'}],
        currentIndex: 0
    };

  
    handleClick(ev: MouseEvent<HTMLButtonElement>){

        const target = ev.target as HTMLButtonElement;
        target.value === 'add' ?  this.setState({currentIndex: this.state.currentIndex+= 1}) :this.setState({currentIndex: this.state.currentIndex-= 1})
    
    }


    render() {
    return (
    <div id='carousel' className={styles.carousel} style={{transform: `translateX(${-50 * this.state.currentIndex}rem)` ,gridTemplateColumns: `repeat(${this.state.cards.length}, 50rem)`}}>
        {this.state.cards.map((card, index) => {
        return <NewsCard key={index} data={card} handleClick={this.handleClick.bind(this)}/>
        })}
    </div>
    )
  }
}


