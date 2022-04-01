
import './characters-list.scss'
import {useEffect, useState } from 'react'
import CharacterItem from '../character-item/character-item'
import CharactersItemDesription from '../characters-item-description/characters-item-description'
import SearchPanel from '../search-panel/search-panel'
import useMarvelService from '../../servises/MarvelService'
import ErrorMessage from '../error-message/error-message'
import spinner from '../../img/spinner.gif'
import ErrorBoundary from '../error-boundary/errorBoundary'

const CharactersList = () => {

    const [characters, setCharacters] = useState([])
    
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [selectedId, setSelectedId] = useState(null)
    const [charEnded, setCharEnded] = useState(false)


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => { onRequest(offset, true) }, []);


    const onRequest = (offset,initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        
        getAllCharacters(offset)
            .then(onCharactersLoaded)
            
    }
    
    const onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters < 9) {
            ended = true;
        }
        setCharacters(characters => [...characters, ...newCharacters])
        setOffset(offset => offset + 9)
        setNewItemLoading(false)
        setCharEnded(ended)
    }

    
    /*SavaOffset = () => {
        const offset = this.state.offset
        localStorage.setItem('offset', String(offset))
    }
    GetOffset = () => {
        return Number(localStorage.getItem('offset'))
    }
    /*loadCharacteres = () => {

        this.marvelService
            .getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }*/


    const clickCharacter = (id) => {
        setCharacters(characters => characters.map(item => {
            if (item.selected === true && item.id !== id) {
                return { ...item, selected: !item.selected }
            }
            if (item.id === id && item.selected === false) {
                return { ...item, selected: !item.selected }
            }
            else {
                return item
            }
        }))
        setSelectedId(id)
    }

    const elements = characters.map((item) => {
        const { id, ...ItemProps } = item
        return (
            <CharacterItem
                key={id} {...ItemProps}
                clickCharacter={() => clickCharacter(id)}

            />
        )
    })
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner_cont = (loading &&!newItemLoading) ? <div className='spinner__wrapper'><img src={spinner} alt='spinner' /></div> : null
    
    
    return (
        <section className='CharacterList'>
            <div className='CharacterList__form'>
                {errorMessage}
                {spinner_cont}

                <ul className='CharacterList__list'>

                    {elements}
                </ul>
                <div className='loadmore'>
                    <button className='load'
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset)}
                        style={{ 'display': charEnded ? 'none' : 'block' }}>Load more</button>
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

export default CharactersList