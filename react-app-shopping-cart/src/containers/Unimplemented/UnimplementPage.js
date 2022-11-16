import scotty from '../../assets/images/scotty.png'
import classes from './Unimplemented.module.css'

const UnimplementedPage = () =>{
    return(
        <div>
           <img src={scotty} width="30%" className={classes.pic}/>
        </div>
    )

}

export default UnimplementedPage;