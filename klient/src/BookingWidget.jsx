import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";
export default function BookingWidget({car}) {
    const[checkIn,setCheckIn] = useState('');
    const[checkOut, setCheckOut] = useState('');
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user) {
            setName(user.name);
        }
    }, [user])

    let numberOfDays =0;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date (checkOut), new Date (checkIn));
    }

    async function bookThisCar() {
        const response = await axios.post('/bookings', {checkIn, checkOut, numberOfPassengers, name, phone,
            car:car._id,
            price:numberOfDays * car.price,
    
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect) {
        return <Navigate to = {redirect}/>
    }

    return (
        <div className="bg-white shadow p-4">
                        <div className="text-2xl text-center">
                        Cena: {car.price} zł / za dzień
                        </div>
                        <div className="border mt-4">
                        <div className="flex">
                            <div className=" py-3 px-4">
                            <label> Data odbioru:</label>
                            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                            </div>
                            <div className=" py-3 px-4 border-l">
                            <label> Data zwrotu:</label>
                            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                            </div>
                        </div>

                            {numberOfDays > 0 && (
                                <div className=" py-3 px-4 border-t">
                                <label> Twoje imię:</label>
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                                <label> Twój numer tel::</label>
                                <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)}/>
                                </div>
                            )}
                        </div>
                        <button onClick={bookThisCar} className="primary mt-4">Zarezerwuj
                        {numberOfDays>0 &&(
                            <span> {numberOfDays * car.price} zł</span>
                        )}
                        </button>
                    </div>
    );
}