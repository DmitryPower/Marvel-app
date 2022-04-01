import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=be121c8b6819005fa3223d40fd811297';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComic)
    }

    const getCharacterbyName = async (name) => {
        const response = await request(`${_apiBase}characters/?name=${name}&${_apiKey}`)
        return _transformCharacter(response.data.results[0])

    }
    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComic(res.data.results[0])
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            selected: false,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            
        }
    }
    const _transformComic = (comic) => {
        let language = comic.textObjects.length === 0 ? 'language not found' : comic.textObjects[0].language
        let text = !comic.description ? 'Description not found' : comic.description
        let price = comic.prices[0].price === 0 ? 'Information about price not found': `${comic.prices[0].price}$`
        let pageCount = comic.pageCount === 0 ? 'Information about page count not found' : `${comic.pageCount} pages`
        
        return {
            id: comic.id,
            title: comic.title,
            price: price,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            pageCount: pageCount,
            language: language,
            description: text,
        }
    }
    
    return { loading, error, getAllCharacters, getCharacter, getCharacterbyName, clearError, getAllComics, getComics }
}

export default useMarvelService;