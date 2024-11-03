import React from "react";
import { Button } from "../../ui/button";
import Nav from "./Nav";
const NavWeb = ()=>{
    return(  
        <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white min-h-screen">
        <div className="p-4">
          <img
            src="/INC-01.svg"
            alt="Logo"
            className="h-12 mb-6 justify-center"
          />
          <Nav />
        </div>
      </div>
    );
};
export default NavWeb;