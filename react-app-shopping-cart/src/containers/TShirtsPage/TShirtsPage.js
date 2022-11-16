import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import tshirts from '../../shared/shirts';
import classes from './TShirtsPage.module.css';
import appRoutes from '../../shared/appRoutes';


const TShirtsPage = () =>{
    return (
        <Container className={classes.container}>
            <br />
            <h1 className={classes.title}>Our T-shirts</h1>
             <Row className={classes.row}>
                 {tshirts.map((shirt) => {
                    return (
                        <Col
                            key={shirt.name}
                            tag={Link}
                            to={`${appRoutes.tshirts}/${shirt.name}`}
                            
                            lg={4}
                            md={6}
                            sm={12}
                            className={classes.shirtCard}
                        >
                            <img src={shirt.colors.white.front}/>
                            <div className={classes.name}>{shirt.name}</div>
                            <div className={classes.available}>Available in { Object.keys(shirt["colors"]).length } colors</div>
                            <button className={classes.button} > <b>See Page</b></button>
                            
                        </Col>
                    );
                })}
            </Row>
        </Container>   
    );
};

export default TShirtsPage;