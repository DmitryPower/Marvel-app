import './skeleton.scss'

function Skeleton() {
    return(
       <div className='Skeleton pulsate-fwd'>
           <h3>Please select a character to see information</h3>
           <div className='blocks'>
                <div className='circle'></div>
                <div className='rect'></div>
           </div>
           <div className='block'></div>
           <div className='block'></div>
           <div className='block'></div>
       </div>
    )
}
export default Skeleton;