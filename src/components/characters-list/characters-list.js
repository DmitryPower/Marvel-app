
import './characters-list.scss'
import { Component } from 'react'
import CharacterItem from '../character-item/character-item'
import CharactersItemDesription from '../characters-item-description/characters-item-description'
import SearchPanel from '../search-panel/search-panel'
import MarvelService from '../../servises/MarvelService'
import ErrorMessage from '../error-message/error-message'
import spinner from '../../img/spinner.gif'
import ErrorBoundary from '../error-boundary/errorBoundary'

class CharactersList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        selectedId: null,
        charEnded: false,

    }

    marvelService = new MarvelService();
    componentDidMount() {
        this.onRequest()
        
    }
      
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters<9){
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
            
        }))
    }

    onError = () => {
        this.setState({
            error: true
        })
    }
    SavaOffset = ()=>{
        const offset = this.state.offset
        localStorage.setItem('offset', String(offset))
    }
    GetOffset = ()=>{
        return Number(localStorage.getItem('offset'))
    }
    /*loadCharacteres = () => {

        this.marvelService
            .getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }*/


    clickCharacter = (id) => {

        this.setState(({ characters }) => ({
            characters: characters.map(item => {
                if (item.selected === true && item.id !==id) {
                    return { ...item, selected: !item.selected }
                }
                if (item.id === id && item.selected === false) {
                    return { ...item, selected: !item.selected }
                }
                else {
                    return item
                }
            })
        ,
        selectedId: id}))
        

    }

    

    render() {
        const { characters, loading, error, selectedId, newItemLoading,charEnded, offset } = this.state
        

        const elements = characters.map((item) => {
            const { id, ...ItemProps } = item
            return (
                <CharacterItem
                    key={id} {...ItemProps}
                    clickCharacter={() => this.clickCharacter(id)}

                />
            )
        })
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner_cont = loading ? <div className='spinner__wrapper'><img src={spinner} alt='spinner' /></div> : null
        const content = !(loading || error) ? elements : null

        return (
            <section className='CharacterList'>
                <div className='CharacterList__form'>
                    {errorMessage}
                    {spinner_cont}

                    <ul className='CharacterList__list'>

                        {content}
                    </ul>
                    <div className='loadmore'>
                    <button className='load' 
                    disabled={newItemLoading} 
                    onClick={()=>this.onRequest(offset)}
                    style = {{'display': charEnded ? 'none':'block'}}>Load more</button>
                    </div>
                </div>
                <div className='CharacterList__description'>
                    <ErrorBoundary>
                        <CharactersItemDesription
                            selectedId={selectedId} />
                    </ErrorBoundary>
                    
                </div>
                <div className='background' />
            </section>
        )
    }
}
export default CharactersList