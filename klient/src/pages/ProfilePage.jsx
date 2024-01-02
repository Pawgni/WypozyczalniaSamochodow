import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import MycarsPage from "./MycarsPage";
import AccountNavigation from "../AccountNavigation";
 
export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const{ready, user, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }
 
    async function logout() {
       await axios.post('/logout');
       setRedirect('/');
       setUser(null);
    }
 
    if(!ready) {
        return 'Loading...'
    }
 
    if(ready && !user && !redirect) {
        return <Navigate to ={'/login'}/>
    }
 
    if (redirect) {
        return <Navigate to={redirect} />
    }
 
    return (
        <div>
            <AccountNavigation/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Zalogowany jako {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm">Wyloguj się</button>
                </div> 
            )}
            {subpage === 'mycars' && (
                <MycarsPage/>
            )}
        </div>
    );
}
 