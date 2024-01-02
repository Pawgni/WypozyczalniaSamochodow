import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {UserContext} from "../UserContext.jsx"
 
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault(); // Zatrzymaj domyślne zachowanie formularza
 
    try {
      const {data} = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      setUser(data);
        alert('Logowanie udane');
        setRedirect(true);
      } 
     catch (error) {
      alert('Logowanie nie powiodło się. Spróbuj ponownie później');
    }
  } 
 
  if(redirect) {
    return <Navigate to={'/'} />
  }
 
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Logowanie</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="twój@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="hasło"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" className="primary">Zaloguj się</button>
          <div className="text-center py-2 text-gray-500">
            Nie masz jeszcze konta?
            <Link className="underline text-black" to={'/register'}>
              <br></br>Rejestracja</Link>
          </div>
        </form>
      </div>
    </div>
  );
}