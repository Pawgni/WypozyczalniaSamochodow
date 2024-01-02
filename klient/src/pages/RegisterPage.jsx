import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/register', {
                name,
                email,
                password,
            });
            alert('Registration successful. Now you can log in');
        } 
        catch (e) {
            alert('Registration failed. Please try again later');
        }
    }

    return (
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Rejestracja</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="imię i nazwisko"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="twój@email.pl"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="hasło"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button className="primary">Rejestracja</button>
                    <div className="text-center py-2 text-gray-500">
                        Masz już konto? <Link className="underline text-black" to={'/login'}>Zaloguj się</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
