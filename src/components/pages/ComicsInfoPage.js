import ComicsInfo from "../comics-info/comics-info";
import { ComicsAdvt } from "../comics-list/comics-list";
import ErrorBoundary from "../error-boundary/errorBoundary";


const ComicsInfoPage = () => {
    return (
        <>
            <ComicsAdvt />
            <ErrorBoundary>
                <ComicsInfo />
            </ErrorBoundary>

        </>
    )
}
export default ComicsInfoPage