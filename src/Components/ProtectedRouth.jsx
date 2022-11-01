import { Navigate } from "react-router-dom";

const ProtectedRouth = ({children}) => {
    
        if (!(sessionStorage.getItem("email"))) {
            return <Navigate to={"/login"}/>
        }

        return children
}
 

export default ProtectedRouth;