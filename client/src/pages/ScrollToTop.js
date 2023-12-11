import { useEffect, useState } from 'react';
import toTopimg from '../assets/totop.png'

import React from 'react'

function ScrollToTop() {
    const [backToTopbtn, setBackToTopbtn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopbtn(true);
            } else {
                setBackToTopbtn(false);
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <>
            {backToTopbtn && (
                <img onClick={scrollUp} src={toTopimg} alt="" style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    height: "40px",
                    width: "40px",
                    fontSize: "50px",
                    zIndex: "999",
                    border: "1px solid #ddebff",
                    borderRadius: "8px",
                    backgroundColor: "white"
                }} />
            )}
        </>
    )
}

export default ScrollToTop
