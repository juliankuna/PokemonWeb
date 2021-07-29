import React from 'react';
import images from "../../images/images";
import '../../App.css';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';


const Navbar = () => {

    // const urlImg= "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AInternational_Pok%25C3%25A9mon_logo.svg&psig=AOvVaw0TfReu3CUj4F3CZ8v2JPiQ&ust=1621368140100000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjEzpHB0fACFQAAAAAdAAAAABAD"


    return (
        <div className="Encabezado">
            <div>
                
            </div>
            <nav>
                <div className="contenedor-logo" >
                    <img src={images.img1}

                        alt="pokemon-logo"
                        className="Navbar-image"
                    />
                </div>

                

            </nav>

            <div className="Encabezadp-Usuario">
                    <IconButton

                    >
                        <AccountCircle />
                    </IconButton>
                </div>
        </div>
    );

};

export default Navbar;