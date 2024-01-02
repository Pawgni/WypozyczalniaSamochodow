import React from "react";
import { format, differenceInCalendarDays } from "date-fns";

export default function BookingDates({ booking }) {
    return (
        <div>
            <div className="border-t border-black mt-2 py-2"> 
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')} 
            </div>
            <div>
                Ilość Dni: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br />
                Cena: {booking.price} zł
            </div>
        </div>
    );
}
