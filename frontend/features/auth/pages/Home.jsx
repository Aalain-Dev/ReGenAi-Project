import React, { useContext } from "react";
import { AuthContext } from "../../auth/context/auth.context";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      
    </div>
   
  )
}

export default Home