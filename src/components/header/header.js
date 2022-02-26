
import { Component } from 'react'
import './header.scss'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            but1_style:'select',
            but2_style:'no__select'
        }
    }
    OnClickButton=(e)=>{
        if(e.target.className == this.state.but1_style){
            this.setState(()=>({
                but1_style:'select',
                but2_style:'no__select'
            }))
        }
        if(e.target.className == this.state.but2_style){
            this.setState(()=>({
                but1_style:'no__select',
                but2_style:'select'
            }))
        }
        
    }
        
    
    render() {
        let{but1_style, but2_style} = this.state;
        return (
            <header className='Header'>
                <ul>
                    <li><a href='#'><span>Marvel</span> information portal</a></li>
                    <li><a href="#" onClick={this.OnClickButton} className={but1_style}>Characters</a> / <a href="#" className={but2_style} onClick={this.OnClickButton}>Comics</a></li>
                </ul>
            </header>
        )
    }
}

export default Header