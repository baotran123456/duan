import { useEffect, useState } from 'react';

import '../css/add_product.css';
import Iconify from '../components/Iconify';

import Spinner from '../assets/spinner.gif';

// import {
//     Button,
// } from '@mui/material';

const LoadingSpinnerButton = ({ title, loading, onClick }) => {

    return (
        <button onClick={onClick} className='loading-spinner-button' >
            {
                loading ? <img src={Spinner} alt='spinner' /> : title + ' '
            }
        </button>
    )
}

export default LoadingSpinnerButton