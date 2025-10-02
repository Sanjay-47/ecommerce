import Navbar from "@/components/ui/Navbar";
import React from "react";

const layout = ({
    children,
}:Readonly<{children:React.ReactNode;}>) =>
    {return(
    <div>
        <Navbar/>
        <div className="py-20">{children}</div>
    </div>);};  

    export default layout; 