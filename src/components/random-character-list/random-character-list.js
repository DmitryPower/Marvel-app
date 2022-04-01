import './random-character-list.scss'
import shield from '../../img/shield.png'
import mjolnir from '../../img/mjolnir.png'
import RandomCharacterItem from '../random-character-item/random-character-item'
import {useEffect , useState} from 'react'
import useMarvelService from '../../servises/MarvelService'
import ErrorMessage from '../error-message/error-message'
import spinner from '../../img/spinner.gif'



const RandomCharacterList = () => {

    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(()=>{updateCharacter()},[])
    
    
    const onCharLoaded = (newCharacter)=>{
        setChar(newCharacter)
    }
    const updateCharacter = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
           
    }
    
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner_cont = loading ? <div className='spinner__wrapper'><img src={spinner} alt='spinner' /></div>: null
        const content = !(loading || error) ? <RandomCharacterItem char = {char} key = {char.id} /> : null
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
                          onClick={updateCharacter}  >TRY IT</button>
                    </div>
                    <img className='shield' src={shield} alt='shield'/>
                    <img className='mjolnir' src={mjolnir} alt='mjolnir'/>
                </div>
                
            </section>
        )
}

export default RandomCharacterList;