import logo from 'assets/other/logo4.png';
import React from 'react';
export const Logo = ({ w, h }) => {
    return (
        <img
            src={logo}
            alt="Logo"
            width={w}
            height={h}
        />
    );
};
