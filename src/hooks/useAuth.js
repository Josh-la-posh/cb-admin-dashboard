import { useContext } from "react";
import AuthContext from "../context/AurthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;