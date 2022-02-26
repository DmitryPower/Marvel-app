import { Component } from 'react';
import MarvelService from '../../servises/MarvelService';
import './search-panel.scss';

class SearchPanel extends Component {

    state = {
        search: 'loki',
        loading:false,
        error:false,
        char:{}
    }
    marvelService = new MarvelService();

    onChangeSearch = (e) => {
        const search = e.target.value
        this.setState(({ search }))
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error:false
        })
    }
    searchResult = (search)=>{
        this.onCharLoading();
        this.marvelService
            .getCharacterbyName(search)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    onCharLoading = ()=>{
        this.setState({
            loading:true
        })
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    render() {

        const { search } = this.state;


        return (
            <div className='SearchPanel'>
                <h3>Or find a character by name:</h3>
                <div>
                    <input type='text'
                        name='search'
                        className='search'
                        placeholder='Enter name'
                        value={search}
                        onChange={this.onChangeSearch}
                    />
                    <button type='submit' className='find'
                    >find</button>
                </div>

            </div>
        )
    }
}
export default SearchPanel;