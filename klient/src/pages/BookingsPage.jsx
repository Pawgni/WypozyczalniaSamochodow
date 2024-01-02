import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AccountNavigation from "../AccountNavigation";
import CarImg from "../CarImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data)
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 border bg-primary overflow-hidden mb-4 p-4">
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl font-bold">{booking.car.title}</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="w-48">
              <CarImg car={booking.car} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
