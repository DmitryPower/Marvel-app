import {useEffect, useState } from 'react';
import './characters-item-description.scss'
import useMarvelService from '../../servises/MarvelService'
import ErrorMessage from '../error-message/error-message'
import spinner from '../../img/spinner.gif'
import Skeleton from '../skeleton/skeleton';
import { Link } from 'react-router-dom';



const CharactersItemDesription = (props)=> {


const [character, setCharacter] = useState(null)
const { selectedId } = props
    
const {loading, error, getCharacter, clearError} =  useMarvelService();

useEffect(()=>{
    updateCharacter()
},[selectedId])

   
   
    const onChar = (character) => {
        setCharacter(character)
        
    }
    const updateCharacter = () => {
        
        if (!selectedId) {
            return;
        }
        clearError();
        getCharacter(selectedId)
            .then(onChar)
        }
    


    
        
        
        
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner_cont = loading ? <div className='spinner__wrapper'><img src={spinner} alt='spinner' /></div> : null
        const content = !(loading || error || !character) ? <View character={character} key = {selectedId}/> : null
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
                <Link to={`/comics/${item.resourceURI.split('/').splice(6,1)}`} className='comics__item'
                    key={index + 1}>{item.name}</Link>
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

export default CharactersItemDesription;