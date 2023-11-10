import { Component, MouseEventHandler, MouseEvent } from 'react'
import styles from './Carousel.module.css'

interface INewsCard {
    isMiddleCard: boolean,
    content: string,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export const NewsCard = (props: INewsCard) => {

    return (
      <article className={styles.card}>
        {props.isMiddleCard ? (
        <div>
          <button id='leftArrow' type='button' value={'subtract'} onClick={(ev) => props.handleClick(ev)}>⮜</button>
          <span>{props.content}</span>
          <button id='RightArrow' type='button' value={'add'} onClick={(ev) => props.handleClick(ev)}>⮞</button>
        </div>):
        <div>
          <span></span>
          <span>{props.content}</span>
          <span></span>
        </div>}
      </article>
    )
}

export default class Carousel extends Component {
  
    news = ['first', 'second', 'third', 'fourth', 'fifth']
    currentIndex = 0;
    state = {
        cards: [this.news[0], this.news[1], this.news[2]],
        currentIndex: 0
    };

  
    handleClick(ev: MouseEvent<HTMLButtonElement>){

        const target = ev.target as HTMLButtonElement;
        const operation = target.value;

        if (operation === 'add'){
            this.currentIndex += 1;
        }
        if (operation === 'subtract'){
            if (this.currentIndex - 1 < 0) this.currentIndex = this.news.length - 1;
            else this.currentIndex -= 1;
        }

        if (this.currentIndex + 2 === this.news.length){
            return this.setState({cards: [
                this.news[this.currentIndex],
                this.news[this.currentIndex + 1],
                this.news[0]
            ]})
        }
        else if (this.currentIndex + 1 === this.news.length){
            return this.setState({cards: [
                this.news[this.currentIndex],
                this.news[0],
                this.news[1]
            ]})
        }
        else if (this.currentIndex === this.news.length){
            this.currentIndex = 0;
        }

        this.setState({cards: [
            this.news[this.currentIndex],
            this.news[this.currentIndex + 1],
            this.news[this.currentIndex + 2]
        ]})
    
    }


    render() {
    return (
    <div className={styles.carousel}>
        <NewsCard content={this.state.cards[0]} isMiddleCard={false} handleClick={this.handleClick.bind(this)}/>
        <NewsCard content={this.state.cards[1]} isMiddleCard={true} handleClick={this.handleClick.bind(this)}/>
        <NewsCard content={this.state.cards[2]} isMiddleCard={false} handleClick={this.handleClick.bind(this)}/>
      </div>
    )
  }
}


