import ErrorBoundary from "../error-boundary/errorBoundary"
import { ComicsList, ComicsAdvt } from "../comics-list/comics-list"




function ComicsPage() {
    
    return (
        <>
            <ComicsAdvt />
            <ErrorBoundary>
                    <ComicsList/>
            </ErrorBoundary>
        </>
            
        
    )
}
export default ComicsPage