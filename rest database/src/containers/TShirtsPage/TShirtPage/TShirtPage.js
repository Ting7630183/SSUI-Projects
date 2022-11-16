import React, { useState, useRef, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router';
import tshirtList from '../../../shared/shirts';
import classes from './TShirtPage.module.css';
import appRoutes from '../../../shared/appRoutes';
import { Link } from 'react-router-dom';

const TShirtPage = (props) =>{
    console.log(props)
    console.log(props.createItem)
    console.log(props.itemsList)

    const { name } = useParams();
    const Tshirt= tshirtList.filter((shirt) => shirt.name === name)[0];
    const { description, price, colors } = Tshirt;
    var array = Object.keys(colors).map((key) => [key, colors[key]])

    const [n, setName] = useState(name)
    const [p, setPrice] = useState(price)
    const [image, setImage] = useState(colors.white.front)
    const [count, setCount] = useState(1)
    const [size, setSize] = useState("")
    var [color, setColor] = useState("White")
    const [ability, setAbility] = useState(true)
    var front = true
    var picture_div
    const imageRef = useRef()
    const sizeRef = useRef()
    const addButtonRef = useRef()
    
    useEffect(()=> {
        picture_div = imageRef.current
        console.log(picture_div)
        if(size === "") {
            addButtonRef.current.style.opacity = 0.3
        } else{
            addButtonRef.current.style.opacity = 1
        }
    })
    
    const countRef = useRef()
    function handleCountSelect(e) {
       let shirt_count =  countRef.current.value
       setCount(shirt_count)
    }

    function handleSizeSelect(e) {
        let shirt_size =  sizeRef.current.value
        setSize(shirt_size)
        setAbility(false)
     }

    //  const colorRef = useRef()
     function handleColorSelect(event) {
        color = event.target.value
        picture_div.src = colors[color].front
        setColor(color)
     }
     
     function handleFrontSelect() {
        front = true;
        picture_div.src = colors[color].front
     }

     function handleBackSelect() {
        front = false;
        picture_div.src = colors[color].back        
    }

    function addTshirt(){
        console.log("enter add shirt")
        let item = {shirt_name: n, shirt_price:p, shirt_image:image, shirt_counts: count, shirt_size:size, shirt_color:color}
        props.createItem(item)
        console.log("call update shipping")
        // props.updateShipping()
        console.log(props.itemsList)
    }

    return (
        <Container>
            <h1 className={classes.title}>{name}</h1>
            <Row className={classes.row}>
                <Col className={classes.first}>
                    <img ref={imageRef} style={{ width: '100%' }} src={colors.white.front} alt={name}/>
                </Col>
                
                <Col className={classes.second}>
                <h2 className={classes.price}>{price}</h2>
                <div className={classes.description}>
                    {description}</div>  
                <div className={classes.sideDiv}>
                    <div className={classes.sideText}>Side:</div>
                    <div className={classes.selectionDiv}>
                        <button className={classes.frontButton} onClick={handleFrontSelect}><b>Front</b></button>
                        <button className={classes.backButton} onClick={handleBackSelect}><b>Back</b></button>
                    </div>
                </div>

                <div className={classes.colorDiv}>
                    <div className={classes.colorText}>Color: </div>
                    <Row>
                    {array.map((color)=>{
                    return (
                       <button 
                       style={{
                        backgroundColor: color[0]
                       }}
                       className={classes.colorButton} value={color[0]} onClick={handleColorSelect}> {color[0]}</button>
                    )
                })}
                  </Row>
                </div>
                <div className={classes.quantityDiv}>
                     <div className={classes.quantityText}>Quantity:</div>
                     <select className={classes.selectButton1} ref={countRef} onChange={handleCountSelect}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                     </select>
                </div>

                <div className={classes.sizeDiv}>
                    <div className={classes.sizeText}>Size:</div>
                    <select className={classes.selectButton2} ref={sizeRef} onChange={handleSizeSelect}>
                        <option value="Women’s XS">Women’s XS</option>
                        <option value="Women’s S">Women’s S</option>
                        <option value="Women’s M">Women’s M</option>
                        <option value="Women’s L">Women’s L</option>
                        <option value="Women’s XL">Women’s XL</option>
                        <option value="Women’s 2XL">Women’s 2XL</option>
                        <option value="Men’s XS">Men’s XS</option>
                        <option value="Men’s S">Men’s S</option>
                        <option value="Men’s M">Men’s M</option>
                        <option value="Men’s L">Men’s L</option>
                        <option value="Men’s XL">Men’s XL</option>
                        <option value="Men’s 2XL">Men’s 2XL</option>
                    </select>
                </div>

                <div className={classes.cartDiv}>
                    <Link to={{
                        pathname:appRoutes.cart
                        }}>
                        <button className={classes.cartButton} onClick={addTshirt} ref={addButtonRef} disabled={ability}><b>Add To Cart</b></button>
                    </Link>                  
                </div>                    
                </Col>
            </Row>
        </Container>
        
    )
}
export default TShirtPage;