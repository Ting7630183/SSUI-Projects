import classes from "./DefaultPics.module.css";
import React, { useState, useRef, useEffect} from 'react';
import { Row} from 'reactstrap';
import scotty1 from "../../assets/images/scotty.png";
import scotty2 from "../../assets/images/scotty-2.png";
import scotty3 from "../../assets/images/scotty-3.png";
import scotty4 from "../../assets/images/scotty-4.png";
import scotty5 from "../../assets/images/scotty-5.png";

const DefaultPics = (props) =>{

    function getImage(e){
        props.updateOverlay(e.target.src)
    }

    return(
        <>
        <h1 className={classes.headline}> No Search results. Maybe use a Scotty?</h1>
        <Row className={classes.row}>
            <a><img  src={scotty1} onClick={getImage} height="200px" width="200px" /></a>
            <a><img  src ={scotty2} onClick={getImage} height="200px" width="200px"/></a>
            <a><img  src ={scotty3} onClick={getImage} height="180px" width="200px"/></a>
            <a><img  src ={scotty4} onClick={getImage} height="180px" width="200px"/></a>
            <a><img  src ={scotty5} onClick={getImage} height="150px" width="200px"/></a>
        </Row>
        </>
    )

};

export default DefaultPics