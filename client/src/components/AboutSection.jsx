/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Box from "@mui/material/Box";



export default function AboutSection() {
    return (
        <>
            <Box className='about-bg'>
                <div className="about-section">
                    <h4>ABOUT US</h4>
                    <p>Have you every fancied a trip away somewhere but have no idea where you want to go?</p>
                    <p>Do you find though of trawling through travel website for a quick look at cheap flights daunting?</p>
                    <p>Well you're not alone.</p>
                    <p>Flightflavour.com was created to help you sample those sweet cheap flight deals without the hassle.</p>
                    <p>We're not a travel agent nor affiliated with any particular airline,
                     we're just here to provide some inspiration and help you plan your next trip away.</p>                     
                    <p>You can book any cheap flight deal you find with us or anyone else, It's upto you.
                     Flightflavour.com is an affiliate for <a target="_blank" rel="noopener external" href="https://www.kiwi.com/en/pages/content/about">kiwi.com</a>, who are fully regulated under EU law, so all bookings are made and confirmed by them.
                     For more information on their terms & conditions, please visit there section <a target="_blank" rel="noopener external" href="https://www.kiwi.com/en/pages/content/legal">here</a>.</p>
                    <p>If you have any questions or suggestions for our site, please visit our <a href="/contact">contact page</a>.</p>
                    <p>Thanks for stopping by, I hope you enjoyed your stay.</p>
                </div>
            </Box>
        </>
    )
}