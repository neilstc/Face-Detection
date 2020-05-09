import React from 'react'
import brain from './brain.png'

import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <react-tilt className="Tilt br2 shadow-3" options={{ max: 40 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                <img style= {{paddingTop: "5px"}}src = {brain} alt = 'logo'/> 
                </div>
            </react-tilt>
        </div>
    );
}
export default Logo;