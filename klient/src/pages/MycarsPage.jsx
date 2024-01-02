import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountNavigation from "../AccountNavigation";
import CarImg from "../CarImg";

export default function MycarsPage() {
  const [mycars, setMycars] = useState([]);

  useEffect(() => {
    axios.get('/user-mycars').then(({ data }) => {
      setMycars(data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div className="text-center">
        <Link className="bg-primary text-black py-2 px-6" to={'/account/mycars/new'}>
          Dodaj nowy pojazd
        </Link>
      </div>
      <div className="mt-4">
        {mycars.length > 0 ? (
          mycars.map((car) => (
            <Link to={'/account/mycars/' + car._id} className="flex cursor-pointer gap-4 bg-primary border p-4 mt-3" key={car._id}>
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                {car.photos && car.photos.length > 0 ? (
                  <CarImg car={car} index={0} className="object-cover" />
                ) : (
                  <p>Brak zdjęcia</p>
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-bold">{car.title}</h2>
                <p className="text-sm mt-2">{car.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Nie znaleziono pojazdów</p>
        )}
      </div>
    </div>
  );
}