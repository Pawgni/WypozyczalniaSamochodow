import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import CarGallery from "../CarGallery";
import AddressLink from "../AddressLink";

export default function MycarPage() {
    const {id} = useParams();
    const [car, setCar] = useState(null);
    useEffect(() => {
    if (!id) {
        return
    }
    axios.get(`/mycars/${id}`).then(response => {
        setCar(response.data);
    });
}, [id]);

if (!car) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{car.title}</h1>
            <AddressLink>Miasto: {car.address}</AddressLink>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1  md:grid-cols-[2fr_1fr]">
                <div>
                <div className="my-4">
            <h2 className="font-semibold text-2xl">Opis:</h2>
            {car.description}
            </div>
                    Godzina odbioru:  {car.checkIn} <br />
                    Godzina zwrotu:  {car.checkOut} <br />
                    Liczba miejsc w pojeździe:  {car.maxSeats} 
                </div>
                <div>
                    <BookingWidget car={car}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
            <h2 className="font-semibold text-2xl">Dodatkowe informacje:</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                        {car.extraInfo}
            </div>
            </div>
            <CarGallery car={car} />
            
        </div>
    )
}