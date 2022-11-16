import { Container, Row, Col } from 'reactstrap';
import classes from "./InternetPics.module.css";

const InternetPics = (props) =>{
    console.log(props)
    const listImages = props.listImages
    console.log(listImages)
    console.log(typeof(listImages))

    function getImage(e){
        props.updateOverlay(e.target.src)
    }

    return (
//         <Container>
//         <Row className={classes.row}>
//         {listImages.map((img) => {
//            return (
//                <Col
//                    lg={4}
//                    md={6}
//                    sm={12}
//                >
//                    <img src={img}  onClick={getImage}/>
//                </Col>
//            );
//        })}
//    </Row>
//    </Container>

        <Row className={classes.row}>
                 {listImages.map((img => {
                    
                    console.log(listImages)
                    console.log(img)
                    return (
                     <img className={classes.pic} src={img} width="150px" onClick={getImage}/>
                    );
                }))}
            </Row>
    )
}

export default InternetPics