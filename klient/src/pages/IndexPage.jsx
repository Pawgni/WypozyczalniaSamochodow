import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [mycars, setMycars] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get('/mycars').then(response => {
      setMycars(response.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filterCars = (car) => {
    const carTitle = car.title.toLowerCase();
    const searchTerm = searchText.toLowerCase();
    return carTitle.includes(searchTerm);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mt-5 border-b">
        <div></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
        </svg>
        <input
          type="text"
          placeholder="Wyszukaj"
          value={searchText}
          onChange={handleSearchChange}
          className="border border-gray-500 py-1 px-2"
          style={{ width: "300px" }}
        />
      </div>

      <div className="mt-8">
        {mycars.length > 0 &&
          mycars
            .filter(filterCars)
            .map((car) => (
              <Link to={`/mycars/${car._id}`} key={car._id} className="flex items-start mb-6 p-4 border bg-blue-50 ">
                {car.photos?.[0] && (
                  <img className="object-cover w-32 h-32 mr-4 rounded-lg" src={'http://localhost:3000/uploads/'+car.photos?.[0]} alt=""/>
                )}
                <div>
                  <h2 className="text-lg font-semibold mb-2">{car.title}</h2>
                  <p className="text-sm mb-2">{car.extraInfo}</p>
                  <div>
                    <span className="font-bold text-lg">{car.price}zł/h </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
