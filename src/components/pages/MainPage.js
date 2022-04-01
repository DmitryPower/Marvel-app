import ErrorBoundary from "../error-boundary/errorBoundary"
import RandomCharacterList from "../random-character-list/random-character-list"
import CharactersList from "../characters-list/characters-list"




function MainPage() {
    return (
        <>
            <ErrorBoundary>
                <RandomCharacterList />
            </ErrorBoundary>
            <ErrorBoundary>
                <CharactersList />
            </ErrorBoundary>
            
        </>

    )
}

export default MainPage