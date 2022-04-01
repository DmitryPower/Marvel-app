import './comics-info.scss'
import { useEffect, useState,lazy } from 'react'
import useMarvelService from '../../servises/MarvelService'
import spinner from '../../img/spinner.gif'
import { useParams, useNavigate } from 'react-router-dom'


const Page404 = lazy(()=>import('../pages/404'))

function ComicsInfo() {
    const { error, loading, getComics, clearError } = useMarvelService();

    const [comics, setComics] = useState({})
    const { comicId } = useParams();
    

    const onLoadComics = (comics) => {
        setComics(comics)
    }

    useEffect(() => {
        requestComicsInfo(comicId)
    }, [comicId])

    const requestComicsInfo = (comicId) => {
        clearError();
        getComics(comicId).then(onLoadComics)

    }

    const errorMessage = error ? <Page404 /> : null
    const spinner_cont = (loading) ? <div className='spinner__wrapper' style={{marginTop:'50px'}}><img src={spinner} alt='spinner' /></div> : null
    const content = !(loading || error || !comics) ? <View comics={comics} key={comicId} /> : null
    return (
        <section className='ComicsInfo' style={loading || error ? { justifyContent: 'center' } : { justifyContent: 'space-between' }}>
            {errorMessage}
            {spinner_cont}
            {content}
        </section>
    )
}
const View = ({ comics }) => {

    const navigate = useNavigate();
    const { description, language, pageCount, price, thumbnail, title } = comics
    return (
        <>
            <div className='ComicsInfo__thumbnail'>
                <img style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? { 'objectFit': 'fill' } : { 'objectFit': 'contain' }} src={thumbnail} alt={title} />
            </div>
            <div className='ComicsInfo__info'>
                <h1 className='ComicsInfo__info__title'>{title}</h1>
                <p className='ComicsInfo__info__description'>{description}</p>
                <p className='ComicsInfo__info__pageCount'>{pageCount}</p>
                <p className='ComicsInfo__info__language'>Language: {language}</p>
                <p className='ComicsInfo__info__price'>{price}</p>
            </div>
            <div className='ComicsInfo__btn'>
                <button tabIndex={0}onClick={()=>{navigate(-1)}} className='ComicsInfo__btn__back'>Back to all</button>
            </div>
        </>
    )
}
export default ComicsInfo