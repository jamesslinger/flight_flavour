import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import ResultCard from "./ResultCard";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';


const ease = [0.08, 0.37, 0.45, 0.89];

const variants = {
    container: {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    },
    card: {
        initial: {
            opacity: 0,
            x: -50
        },

        animate: {
            opacity: 1,
            x: 0
        }
    }
};

export default function ResultsPage() {
    const data  = useLoaderData();
    
    return (
        <motion.div
            initial='initial'
            animate='animate'
            variants={variants.container}
        >
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={data} errorElement={<p>Error loading data</p>}>
                    <Grid id='result-grid' container spacing={2} justifyContent='center' alignItems='center'>
                        {Object.entries(data.searchData).map((results) => {
                            return (
                                <Grid key={uuidv4()} item xs={12} sm={6} md={4} lg={3} xl={2} >
                                    <ResultCard key={uuidv4()} cityTo={results[0]} results={results[1]} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Await>   
            </Suspense>
        </motion.div>
    )
};