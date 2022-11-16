import React from 'react';
import classes from './Footer.module.css';
import appRoutes from '../../shared/appRoutes';
import { NavLink as RouterNavLink} from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';


const Footer = () =>{
    return (
        <div className={classes.bottom}>
            <Navbar>
            <Nav className={classes.bottomNavigation} navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                        Contact Us
                    </NavLink>
                </NavItem>


                <NavItem>
                    <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                        Site Map
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                        Privacy Policy
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                        Careers
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                        Reviews
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={RouterNavLink} to={appRoutes.unimplemented} className={classes.link}>
                        Designed by Corey Emery, Updated by Rhea Li
                    </NavLink>
                </NavItem>

            </Nav>
            </Navbar>


        </div>
        
    )
}

export default Footer;