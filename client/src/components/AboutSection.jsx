/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';


const ease = [0.08, 0.37, 0.45, 0.89];

export default function AboutSection() {
    return (
        <>
            <AnimatePresence>
                <motion.div 
                    initial={{ opacity: 0, transition: { delay: 0.5, duration: 1, ease } }}
                    animate={{ opacity: 1, transition: { delay :0.5, duration: 1, ease } }}
                    exit={{ opacity: 0, transition: { delay: 0.5, duration: 1, ease } }}
                    >
                    <Box id='about-bg' className='about-bg' component={motion.div}>
                        <motion.h4>ABOUT US</motion.h4>
                        <motion.p>Have you ever fancied a trip away somewhere but have no idea where you want to go?</motion.p>
                        <motion.p>Do you find the thought of trawling through the internet for a quick look at cheap flight deals daunting?</motion.p>
                        <motion.p>Well you're not alone.</motion.p>
                        <motion.p>Flightflavour.com was created to help you sample those sweet cheap flight deals without the hassle.</motion.p>
                        <motion.p>We're not a travel agent nor affiliated with any particular airline,
                        we're just here to provide some inspiration and help you plan your next trip away.</motion.p>                     
                        <motion.p>You can book any cheap flight deal you find with us or anyone else, It's upto you.
                        Flightflavour.com is an affiliate for <a target="_blank" rel="noopener external" href="https://www.kiwi.com/en/pages/content/about">kiwi.com</a>, who are fully regulated under EU law, so all bookings are made and confirmed by them.
                        For more information on their terms & conditions, please visit there section <a target="_blank" rel="noopener external" href="https://www.kiwi.com/en/pages/content/legal">here</a>.</motion.p>
                        <motion.p>If you have any questions or suggestions for our site, please visit our <Link to={'/contact'}>contact page</Link>.</motion.p>
                        <motion.p>Thanks for stopping by, I hope you enjoyed your stay.</motion.p>
                    </Box>
                </motion.div>
            </AnimatePresence>    
        </>
    )
}