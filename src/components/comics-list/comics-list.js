import './comics-list.scss'
import useMarvelService from '../../servises/MarvelService'
import avengers from '../../img/Avengers.svg'
import avengers_logo from '../../img/Avengers logo.svg'
import { useEffect, useState } from 'react'
import spinner from '../../img/spinner.gif'
import ErrorMessage from '../error-message/error-message'
import { NavLink } from 'react-router-dom'


function ComicsList() {

    const { loading, error, getAllComics } = useMarvelService();
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false)


    useEffect(() => {
        updateComics(offset, true)
    }, [])
    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics < 8) {
            ended = true;
        }
        setComics(comics => [...comics, ...newComics])
        setCharEnded(ended)
        setOffset(offset => offset + 8)
        setNewItemLoading(false)

    }
    const updateComics = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsLoaded)

    }
    
    const elements = comics.map((item,index) => {
        const {id,...itemProps } = item
        return (
            <ComicstListItem
                key={index}{...itemProps} id={id} />
        )
    })

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner_cont = (loading && !newItemLoading) ? <div className='spinner__wrapper' style={{marginTop:'45px'}}><img src={spinner} alt='spinner' /></div> : null
    return (
        <section className='ComicsList'>

            <div style={loading && !newItemLoading ? { 'justifyContent': 'center' } : null} className='ComicsList__list'>
                {errorMessage}
                {spinner_cont}
                {elements}
            </div>
            <div className='ComicsList__load'>
                <button className='ComicsList__load__btn'
                    disabled={newItemLoading}
                    onClick={() => updateComics(offset)}
                    style={{ 'display': charEnded ? 'none' : 'block' }}>Load more</button>
            </div>
        </section>
    )
}
const ComicstListItem = (props) => {
    const { title, price, thumbnail, id } = props
    return (
        <div className='ComicsList__list__item'>
            <NavLink style = {{'textDecoration':'none'}} end to={`/comics/${id}`}>
                <img className='ComicsList__list__item__img'
                 src={thumbnail} 
                 alt='thumbnail'
                 style = {thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?{objectFit:'fill'}:{objectFit:'cover'}} />
                <div className='ComicsList__list__item__title'>{title}</div>
                <div className='ComicsList__list__item__price'>{price === '' ? 'NOT AVAILABLE' : price + '$'}</div>
            </NavLink>

        </div>
    )
}
const ComicsAdvt = () => {
    return (
        <div className='ComicsList__advt'>
            <img className='ComicsList__advt__avg' src={avengers} alt='avengers' />
            <div className='ComicsList__advt__name'>New comics every week! Stay tuned!</div>
            <img className='ComicsList__advt__avg_logo' src={avengers_logo} alt='avengers_logo' />
        </div>
    )
}
export { ComicsList, ComicsAdvt }

