import { Component } from 'react';
import './characters-item-description.scss'
import MarvelService from '../../servises/MarvelService'
import ErrorMessage from '../error-message/error-message'
import spinner from '../../img/spinner.gif'
import Skeleton from '../skeleton/skeleton';
import PropTypes from 'prop-types';


class CharactersItemDesription extends Component {

    state = {
        loading: false,
        error: false,
        character: null,

    }
    marvelService = new MarvelService();
    componentDidMount() {
        this.updateCharacter();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedId !== this.props.selectedId) {
            this.updateCharacter();
        }
    }
    
    onError = () => {
        this.setState({
            error: true
        })
    }
    onChar = (character) => {
        this.setState({
            character,
            loading: false,
            error: false
        })
    }
    updateCharacter = () => {
        const { selectedId } = this.props
        if (!selectedId) {
            return;
        }
        this.onCharLoading()
        this.marvelService
            .getCharacter(selectedId)
            .then(this.onChar)
            .catch(this.onError)
        
    }
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }


    render() {
        
        const {loading, error, character } = this.state
        
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner_cont = loading ? <div className='spinner__wrapper'><img src={spinner} alt='spinner' /></div> : null
        const content = !(loading || error || !character) ? <View character={character} /> : null
        const skeleton = character || loading || error? null : <Skeleton />

        return (
            <>
                {errorMessage}
                {spinner_cont}
                {content}
                {skeleton}
            </>
        )

    }

}

const View = ({ character }) => {
    
    const { name, thumbnail, description, homepage, wiki, comics } = character
    const elements = comics.map((item, index) => {
        if(index>9){
            return;
        }
        else if(window.innerWidth<600 && index>5){
            return;
        }
        else {
            return (
                <li className='comics__item'
                    key={index + 1}>{item.name}</li>
            )
        }
    })
    const comics_zero = comics.length===0? <li className='comics__item' key = '1'>Comics not found</li> :null
    
    let message = description
    if (message === '') {
        message = 'Information about character not found'
    }
    return (
        <div className='CharactersItemDescription'>
            <div className='block__img'>
                <img src={thumbnail} alt={name} />
                <div className='block__name'>
                    <h3>{name}</h3>
                    <a href={homepage} className='btn btn__homepage'>homepage</a>
                    <a href={wiki} className='btn btn__wiki'>wiki</a>
                </div>
            </div>
            <p className='info'>{message}</p>
            <h3 style={{ textAlign: 'left' }}>Comics:</h3>
            <ul className='comics__list'>
                {comics_zero}
                {elements}
            </ul>
        </div>
    )
}
CharactersItemDesription.propTypes = {
    selectedId: PropTypes.number.isRequired
}
export default CharactersItemDesription;