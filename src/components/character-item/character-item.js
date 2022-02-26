
import { Component } from "react";
import './character-item.scss'
import propTypes from "prop-types";
class CharacterItem extends Component {

    render() {
        const { name, thumbnail, selected, clickCharacter } = this.props
        let clazz = 'CharacterItem'
        if (selected) {
            clazz += ' selectItem'
        }
        return (
            <li className={clazz} tabIndex={0}
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
}

CharacterItem.propTypes = {
    selected: propTypes.bool.isRequired,
    clickCharacter: propTypes.func.isRequired
}
export default CharacterItem;