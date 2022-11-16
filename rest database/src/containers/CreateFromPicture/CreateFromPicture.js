import React, { useState, useRef, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import blank from "../../assets/images/shirt-base.png";
import classes from './CreateFromPicture.module.css';
import DefaultPics from './DefaultPics';
import { Link } from 'react-router-dom';
import appRoutes from "../../shared/appRoutes";
import InternetPics from './InternetPics';


const CreateFromPicture = (props) =>{
    console.log(props)
    
    const ACCESS_KEY = process.env.REACT_APP_API_KEY
    const [p, setPrice] = useState("$20.00")
    const [overlayImage, setOverlayImage] = useState()
    const [count, setCount] = useState(1)
    const [size, setSize] = useState("")
    const [image, setImage] = useState(blank)
    const [ability, setAbility] = useState(true)


    function updateOverlay(image) {
        setOverlayImage(image)
    }

    const sizeRef = useRef()
    function handleSizeSelect(e) {
        let shirt_size =  sizeRef.current.value
        setSize(shirt_size)
        // console.log(size)
        setAbility(false)
     }

    const countRef = useRef()
    function handleCountSelect(e) {
       let shirt_count =  countRef.current.value
       setCount(shirt_count)
    }

    const addButtonRef = useRef()
    function addTshirt(){
        console.log("enter add shirt")
        let item = {shirt_name: props.keyword, shirt_price:p, shirt_image:image, overlayImage: overlayImage, shirt_counts: count, shirt_size:size, shirt_color:null}
        props.createItem(item)
        console.log(props.itemsList)
    }

    async function getImages() {
        // console.log(keyword)
        let res = await fetch (
            "https://api.unsplash.com/search/photos/?client_id=" + ACCESS_KEY +
            "&page=" + props.page + "&query=" + props.keyword +"&per_page=10"
        );
        let data = await res.json();
        return data;
    }

    function addToImageList(img) {
        props.addImageToList(img)
    }

    const searchRef = useRef()
    const keywordRef = useRef()
    function search() {
        let key = keywordRef.current.value
        props.searchPics(key)
    }

    function requestMore() {
        console.log("enter request more")
        props.requestMorePics()
    }


    useEffect(()=> {
        if(size === "") {
            addButtonRef.current.style.opacity = 0.3
        } else{
            addButtonRef.current.style.opacity = 1
        }
        if(props.listImages.length < props.page*10) {
            getImages().then((img) => addToImageList(img))
        }
    })

    return (
        <Container>
            <Row className={classes.row}>
                <Col className={classes.first}>
                    <div className={classes.background}><img style={{ width: '100%' }} src={blank}></img></div>
                    <div className={classes.overlay}><img  style={{ width: '40%' }} src={overlayImage}></img></div>
                </Col>
                
                <Col className={classes.second}>
                    <input className={classes.input} type="text"  size="40" placeholder={props.placeholder} ref={keywordRef}></input>
                    <button className={classes.searchbtn} ref={searchRef}  onClick={search}>Search</button>
                    {props.defaultImage? <DefaultPics updateOverlay={updateOverlay}/>:<InternetPics listImages={props.listImages} updateOverlay={updateOverlay}/>
                    }
                </Col>
            </Row>
            <Row className={classes.secondRow}>
                <Col className={classes.firstCol}>
                <div className={classes.price}>$20.00</div>
                <div className={classes.quantityDiv}>
                     <div className={classes.quantityText}>Quantity:</div>
                     <select className={classes.selectButton1} ref={countRef} onChange={handleCountSelect} >
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
                    <select className={classes.selectButton2} ref={sizeRef} onChange={handleSizeSelect} >
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
                    <Link to={{pathname:appRoutes.cart}}>
                        <button className={classes.cartButton} onClick={addTshirt} ref={addButtonRef} disabled={ability}><b>Add To Cart</b></button>
                    </Link>                  
                </div> 
                </Col>

                <Col className={classes.secondCol}>
                    <button className={classes.morebtn} onClick={requestMore}>Display More</button>
                </Col>
            </Row>
        </Container>
    );
};
export default CreateFromPicture