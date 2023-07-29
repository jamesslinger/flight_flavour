import React from "react";


export default function Footer(props) {
  const year = new Date().getFullYear();
   return (
    <>
      <footer>
        <p>ⓒ {year} | Built by <a href="https://www.jamesslinger.com">James Slinger</a></p>
      </footer> 
    </>
    
  );
}
