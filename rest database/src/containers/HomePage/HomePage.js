import React from 'react';
import classes from './HomePage.module.css';
import banner from '../../assets/images/banner.png'

const HomePage = () =>{
    return (
        <div>
            <div className={classes.mainPage}>
                <img src={banner} width="100%" />
            </div>

            <div className={classes.notice}>
                <div className={classes.shippment}>
                    <div className={classes.firstSentence}>
                        <a className={classes.first}>We don't ship. We're not real.</a>
                    </div>

                    <div>
                        <a>We sell shirts. We are passionate about selling shirts. But keep in mind we have no infrastructure, 
                            supply chain, or mechanism to actually produce these shirts or fullfill the orders. But the shirts will 
                            always be real in your imagination.</a>
                    </div>
                </div>

                <div className={classes.design}>
                    <div className={classes.firstSentence}>
                        <a>Design your own shirt! But help us do that...</a>
                    </div>

                    <div>
                        <a>Not only do we not sell shirts, but we let you design your own! Eventually. We actually kinda need your help 
                            implementing that. If you could build an actual paint-style interface that you can make designs in that would be great:)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
   
};

export default HomePage;