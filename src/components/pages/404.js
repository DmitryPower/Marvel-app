import {Link, useNavigate} from 'react-router-dom'

const Page404 = ()=>{
    const navigate = useNavigate();
    return(
        <div>
            <h1>404 Page not found</h1>
            <a style={{cursor :'pointer'}} onClick = {()=> navigate(-1)}>Click to return back</a>
        </div>
    )
}
export default Page404