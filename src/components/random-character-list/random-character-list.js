import './random-character-list.scss'
import shield from '../../img/shield.png'
import mjolnir from '../../img/mjolnir.png'
import RandomCharacterItem from '../random-character-item/random-character-item'
import { Component } from 'react'
import MarvelService from '../../servises/MarvelService.js'
import ErrorMessage from '../error-message/error-message'
import spinner from '../../img/spinner.gif'
class RandomCharacterList extends Component {
    
    state = {
        char: {},
        loading: true,
        error: false,
    }
    marvelService = new MarvelService();

    componentDidMount(){
        this.updateCharacter();
    }
    
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error:false
        })
    }
    onCharLoading = ()=>{
        this.setState({
            loading:true
        })
    }
    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const { char, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner_cont = loading ?<div className='spinner__wrapper'><img src={spinner} alt='spinner' /></div>: null
        const content = !(loading || error) ? <RandomCharacterItem char = {char} key = {this.state.char.id} /> : null
        
        return (
            <section className="RandomCharacterList" >
                {errorMessage}
                {spinner_cont}
                {content}
                <div className="random_character_button">
                    <div className='question'>
                        <h3>Random character for today!</h3>
                        <h3>Do you want to get to know him better?</h3>
                    </div>
                    <div className='btn'>
                        <h3>Or choose another one</h3>
                        <button className='try'
                          onClick={this.updateCharacter}  >TRY IT</button>
                    </div>
                    <img className='shield' src={shield} alt='shield'/>
                    <img className='mjolnir' src={mjolnir} alt='mjolnir'/>
                </div>
                
            </section>
        )
    }
}

export default RandomCharacterList;