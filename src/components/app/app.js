
import './app.css';
import Header from '../header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(()=>import('../pages/MainPage'))
const ComicsPage = lazy(()=>import('../pages/ComicsPage'))
const ComicsInfoPage = lazy(()=>import('../pages/ComicsInfoPage'))
function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Suspense fallback = {<span>Loading...</span>}>
            <Routes>
              <Route path='/comics' element={<ComicsPage />} />
              <Route path='/comics/:comicId' element={<ComicsInfoPage />} />
              <Route path='/' element={<MainPage />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}




export default App;
