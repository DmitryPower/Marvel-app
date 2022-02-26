
import './app.css';
import Header from '../header/header';
import RandomCharacterList from '../random-character-list/random-character-list';
import ErrorBoundary from '../error-boundary/errorBoundary';
import CharactersList from '../characters-list/characters-list';
function App() {
  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <RandomCharacterList />
      </ErrorBoundary>
      <ErrorBoundary>
        <CharactersList />
      </ErrorBoundary>

    </div>
  );
}




export default App;
