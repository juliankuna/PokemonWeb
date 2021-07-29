import React from 'react';
import images from "../../images/images";
import '../../App.css';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';


const Navbar = () => {

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
            {/*

            <div className="Encabezadp-Usuario">
                    <IconButton

                    >
                        <AccountCircle />
                    </IconButton>
                </div>
            */}
        </div>
    );

};

export default Navbar;