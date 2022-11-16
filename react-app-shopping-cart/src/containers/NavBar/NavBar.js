import React, { useState, useRef, useEffect} from 'react';
// import {Link } from 'react-router-dom';
import { NavLink as RouterNavLink} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavLink,
} from 'reactstrap';
import appRoutes from '../../shared/appRoutes';
import classes from './NavBar.module.css';
import logo from '../../assets/images/logo.png';
import cartLogo from '../../assets/images/cart.png';

const NavBar = (props) =>{
    var itemsList = props.itemsList
    const totalCountRef = useRef()

    useEffect(()=> {
        var total_count = 0;
        for(var i = 0; i < itemsList.length; i++) {            
            var count = parseInt(itemsList[i].s.shirt_counts)
            total_count = total_count + count
        }
        totalCountRef.current.innerHTML = total_count
    })
    

    return (
        <div className={classes.navigation}>

            <div className={classes.topRedBar}>
                <a className={classes.topRedBarText}>.</a>
            </div>

            <div className={classes.headTitle}>
                <NavbarBrand className={classes.logo} tag={RouterNavLink} to={appRoutes.home}>
                    <img src={logo} alt='logo' style={{ width: '100px' }} />
                </NavbarBrand>
                
                <div className={classes.companyName}>
                    <h1>Scotty Shirts U IIIlustrat(SSUI)</h1>
                </div>

                
                <NavbarBrand className={classes.cartLogo} tag={RouterNavLink} to={appRoutes.cart}>
                    <div className={classes.cartDiv}>
                        <div className={classes.cart}> <img src={cartLogo} style={{ width: '40px' }}/></div>
                        <div className={classes.cartNumber} ref={totalCountRef}>{0}</div>
                    </div>
                   
                </NavbarBrand>
                    
            </div>

            <Navbar>
            <hr className={classes.line}/>
                <Nav className={classes.topNavigation} navbar>
                    
                    <NavItem>
                        <NavLink tag={RouterNavLink} to={appRoutes.tshirts} className={classes.link}>
                            T-SHIRTS
                        </NavLink>
                    </NavItem>

                    <NavItem> 
                        <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                            CREATE FROM PICTURE
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                            CREATE YOUR OWN
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                            ABOUT US
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                            LOG IN
                        </NavLink>
                    </NavItem>

                </Nav>
                <hr className={classes.line} />
            </Navbar>
        </div>

    );
};

export default NavBar;