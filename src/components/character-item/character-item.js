
import './character-item.scss'
import propTypes from "prop-types";
const CharacterItem = (props) => {

    const { name, thumbnail, selected, clickCharacter } = props
    
    return (
        <li className={`CharacterItem ${selected? 'selectItem':null}`} tabIndex={0}
            onFocus={clickCharacter}>
            <div className="CharacterItem__img">
                <img src={thumbnail} alt={name}
                    style={{ 'objectFit': thumbnail.indexOf('not_available') === -1 ? 'cover' : 'fill' }} />
            </div>
            <div className="CharacterItem__name">
                <h3>{name}</h3>
            </div>
        </li>
    )
}


CharacterItem.propTypes = {
    selected: propTypes.bool.isRequired,
    clickCharacter: propTypes.func.isRequired
}
export default CharacterItem;