import React from "react";

const Navigation = ({signOff, isSignedIn}) => {
        if(isSignedIn) {
        return (<div>
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p className="f3 link dim black underline pa3 pointer"
                onClick={() => signOff("signin")}
                >Sign out</p>

            </nav>
        </div>);
        }
        else {
        return (
            <div>
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p className="f3 link dim black underline pa3 pointer"
            onClick={() => signOff("signin")}
            >Sign in</p>
            <p className="f3 link dim black underline pa3 pointer"
            onClick={() => signOff("register")}
            >Register</p>
        
             </nav>
             </div>)
        }

    
}

export default Navigation