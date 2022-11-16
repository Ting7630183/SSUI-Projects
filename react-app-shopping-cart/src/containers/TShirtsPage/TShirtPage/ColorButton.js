import { Container, Row, Col } from 'reactstrap';
import classes from './ColorButton.module.css';

const ColorButton = (props) =>{
    // console.log(props["props"])
    var color_array = props["props"];
    var array = Object.keys(color_array).map((key) => [key, color_array[key]])
    // console.log(array)
    // console.log(Object.prototype.toString.apply(color_array))
    // console.log(Object.keys(color_array).length)

    // console.log(Object.keys(color_array)[0])
    // console.log(Object.keys(color_array)[1])
    // var color1 = (Object.keys(color_array)[0])
    // console.log(color1)
    // console.log(color_array[color1].front)
    // console.log(color_array[color1].back)

    // console.log(Object.keys(props)[0])
    // console.log(Object.keys(props)[1])
    // console.log(Object.keys(props)[2])
    // console.log(Object.keys(props)[3])
    // console.log(Object.prototype.toString.apply(props))
    // console.log(Object.keys(props)[1])
    return (
        <Container>
            <Row>
                {array.map((color)=>{
                    return (
                       <button 
                       style={{
                        backgroundColor: color[0]
                       }}
                       className={classes.colorButton}>{color[0]}</button>
                    )
                })
                    
                }

            </Row>

        </Container>
    );
};

export default ColorButton;