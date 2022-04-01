

import './random-character-item.scss'

function RandomCharacterItem({char}) {

    const { name, description, thumbnail, homepage, wiki, } = char
    let message = description

    if (message === '') {
        message = 'Information about character not found'
    }

    return (
        <div className='RandomCharacterItem'>
            <div className='img_character'>
                <img src={thumbnail} alt={name}
                    style={{ 'objectFit': thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? 'cover' : 'fill' }} />
            </div>

            <div className='form__character'>
                <h2>{name}</h2>
                <p>{message}</p>
                <div className='buttons'>
                    <a href={homepage} className='btn btn__homepage'>homepage</a>
                    <a href={wiki} className='btn btn__wiki'>wiki</a>
                </div>
            </div>
        </div>
    )

}

export default RandomCharacterItem;