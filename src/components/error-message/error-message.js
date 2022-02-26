import './error-message.scss'
import error from './error.gif'
function ErrorMessage(){
    return(
    <div className='ErrorMessage' style ={{width:550, height:250}}>   
        <p className='Error'>Error! Click TRY IT!</p>
    
    </div> 
    )
}
export default ErrorMessage;