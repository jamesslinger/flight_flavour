import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';


export default function ResultsPage() {
    const data  = useLoaderData();
    
    return (
        <>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data} errorElement={<p>Error loading data</p>}>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
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
        </>
    )
};