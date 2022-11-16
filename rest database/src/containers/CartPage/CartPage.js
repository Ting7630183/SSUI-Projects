import { Container, Row, Col } from 'reactstrap';
import React, { useState, useRef, useEffect} from 'react';
import CartItem from './CartItem';
import classes from './CartPage.module.css'
import { Link } from 'react-router-dom';
import appRoutes from '../../shared/appRoutes';
import Empty from './Empty'

const CartPage = (props) =>{
   console.log(props)
   console.log(props.deleteItem)
   console.log(props.itemsList)
//    console.log(props.shipping)
   var list = props.itemsList
   var shipping = 0
   var itemComponents

   if(list.length === 0) {
    itemComponents = <Empty/>
   }else{
    itemComponents = list.reverse().map((item) => {
        return (
            <CartItem 
             shirt_image={item.s.shirt_image}
             shirt_name={item.s.shirt_name}
             shirt_counts={item.s.shirt_counts}
             shirt_price={item.s.shirt_price}
             shirt_size={item.s.shirt_size}
             shirt_color={item.s.shirt_color}
             id={item.id}
             overlayImage={item.s.overlayImage}
             deleteItem =  {props.deleteItem}
             updateItemCount = {props.updateItemCount}
            />
        );
        });
   }

    const totalRef = useRef()
    const subtotalRef = useRef()
    const shippingRef = useRef()
    const totalCountRef = useRef()
    useEffect(()=> {
        var total = 0
        var total_count = 0;
        if(list.length == 0) {
            shipping = 0;
        }else{
            shipping = 6.95
        }
        shippingRef.current.innerHTML = shipping
        
        for(var i = 0; i < list.length; i++) {
            var price = parseFloat(list[i].s.shirt_price.substring(1))
            var count = parseInt(list[i].s.shirt_counts)
            total += (price * count)
            total_count = total_count + count
        }
        subtotalRef.current.innerHTML = total.toFixed(2)
        totalRef.current.innerHTML = (total + shipping).toFixed(2) 
        totalCountRef.current.innerHTML = total_count
    })

    return(
        <Container className={classes.bigContainer}>
            <div className={classes.numberDiv}>
                <h1 className={classes.cartDiv} ref={totalCountRef}>My Cart (</h1>
                <h1 ref={totalCountRef}>{}</h1>
                <h1>)</h1>
            </div>
            <Row className={classes.row}>
                <Col className={classes.col1}>
                    <div>{itemComponents}</div>
                </Col>

                <Col>
                <div >
                <div className={classes.container}>
                    <h2 className={classes.orderSummary}>Order Summary</h2>

                    <div>
                        <div className={classes.wholeSubtotalDiv}>
                            <div className={classes.subtotalDiv}>Subtotal:</div>
                            <div ref={subtotalRef} className={classes.subtotalText}>{}</div>
                        </div>

                        <div className={classes.shippingWholeDiv}>
                            <div className={classes.shippingDiv}>Est.Shipping:</div>
                            <div>
                                <div className={classes.shippmentText} ref={shippingRef}>{}</div>
                                <hr className={classes.line}/>
                            </div>
                        </div>
                        

                        <div className={classes.wholeTotalDiv}>
                            <div className={classes.totalDiv}>Total:</div>
                            <div ref={totalRef} className={classes.totalText}>{}</div>
                        </div>
                    </div>

                    <div>
                        <Link to={{pathname:appRoutes.unimplemented}}>
                            <button className={classes.checkoutButton}><a className={classes.checkout}><b>Log in and Checkout</b></a></button>
                        </Link>
                        
                    </div>
                </div>

                </div>
                    
                <div>
                    <Link to={{pathname:appRoutes.tshirts}}>
                    <button className={classes.shoppingButton} ><a className={classes.shoppingText}> <b>Continue Shopping</b></a></button>
                    </Link>
                   
                </div>
            </Col>
            </Row>
        </Container>
       
    )

}

export default CartPage;