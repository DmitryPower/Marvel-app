

class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=be121c8b6819005fa3223d40fd811297';
    _baseOffset = 210;
    getResource = async (url)=>{
        let responce = await fetch(url);

        if(!responce.ok){
            throw new Error(`Could not fetch ${url}, status: ${responce.status}`)
        }

        return await responce.json();
    }

    getAllCharacters = async (offset = this._baseOffset)=>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id)=>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    
    getCharacterbyName = async (name)=>{
        const responce = await this.getResource(`${this._apiBase}characters/?name=${name}&${this._apiKey}`)
        return this._transformCharacter(responce.data.results[0])

    }
    _transformCharacter = (char)=>{
        return {    id: char.id,
                    selected: false,
                    name: char.name,
                    description: char.description,
                    thumbnail:char.thumbnail.path+'.'+char.thumbnail.extension,
                    homepage:char.urls[0].url,
                    wiki:char.urls[1].url,
                    comics:char.comics.items
        }
    }
}

export default MarvelService;