import { Component, MouseEventHandler, MouseEvent } from 'react'
import styles from './Carousel.module.css'

interface INewsCard {
    data: {
        content: string
    },
    handleClick: MouseEventHandler<HTMLButtonElement>
    num: number
}

export const NewsCard = (props: INewsCard) => {

    return (
      <article className={styles.card}>
   
        <div>
          {props.num !== 0 ?  <button id='leftArrow' type='button' value='subtract' onClick={(ev) => props.handleClick(ev)}>⮜</button> : <div></div>}
          <span>{props.data.content}</span>
          {props.num !== 4 ? <button id='RightArrow' type='button' value='add' onClick={(ev) => props.handleClick(ev)}>⮞</button>: <div></div>}
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
        return <NewsCard key={index} num={index} data={card} handleClick={this.handleClick.bind(this)}/>
        })}
    </div>
    )
  }
}


