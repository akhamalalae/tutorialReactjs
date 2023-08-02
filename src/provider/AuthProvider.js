import { Navigate } from "react-router-dom";
import { accountService } from "../services/accountService";

/**
 * Fonction de vérification de token
 * Et fermetur partie admin
 * 
 * @param {Object} props{children}
 * @returns {ReactNode}
 */
const AuthProvider = ({children}) => {

    if(!accountService.isLogged()){
        return <Navigate to="/login"/>
    }

    return children
};

export default AuthProvider;