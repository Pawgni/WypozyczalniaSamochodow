import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import CarGallery from "../CarGallery";
import BookingDates from "./BookingDates";

export default function BookingPage() {
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id})=> _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);

    if(!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-4xl">{booking.car.title}</h1>
            <AddressLink className="my-2 block">Opis: {booking.car.description}</AddressLink>
            <h1>Miasto: {booking.car.address}</h1>
            <div className="bg-gray-200 p-6 mb-6 mt-6 rounded-2xl">
                <h2 className="text-xl mb-2">Informacje</h2>
                <BookingDates booking={booking}/>
            </div>
            <CarGallery car ={booking.car} />
        </div>
    );
}