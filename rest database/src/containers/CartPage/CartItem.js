import { Container, Row, Col } from 'reactstrap';
import classes from './CartItem.module.css'
import React, { useState, useRef, useEffect} from 'react';



const CartItem = (props) =>{
    console.log(props.shirt_image)
    console.log(props.overlayImage)
    const countRef = useRef()
    var count = props.shirt_counts

    function updateCount() {
        var newCount = countRef.current.value
        props.updateItemCount(props.id, newCount)  
        count = newCount
    }

    useEffect(()=> {
        countRef.current.value = count
    })

    return (
        <Container>

            <div> <hr className={classes.line} /></div>
            <h1 className={classes.name}>{props.shirt_name}</h1>
            <Row className={classes.row}>
                <Col className={classes.left}>
                    {/* <div className={classes.images}> */}
                        <div className={classes.back}><img style={{ width: '100%' }} src={props.shirt_image} /></div>
                        <div className={classes.overlay}><img  style={{ width: '40%' }} src={props.overlayImage} /></div>
                    {/* </div> */}
                </Col>
                    

                <Col className={classes.right}>
                    <div className={classes.quantityDiv}>
                        <div className={classes.quantityText}>Quantity:</div>
                            <select className={classes.selectButton1}  ref={countRef} onChange={updateCount}>
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

                    <div className={classes.colorDiv}>
                        <div>Color:</div>
                        <div className={classes.color}>{props.shirt_color}</div>
                    </div>

                    <div className={classes.sizeDiv}>
                        <div>Size:</div>
                        <div className={classes.size}>{props.shirt_size}</div>
                     </div>
                    
                    <div className={classes.priceDiv}>
                        <div>Price(each):</div>
                        <div className={classes.price}>{props.shirt_price}</div>
                     </div>

                    <button className={classes.removeButton} onClick={() => props.deleteItem(props.id)}><b>Remove</b></button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartItem

