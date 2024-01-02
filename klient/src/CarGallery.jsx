import { useState } from "react";

export default function CarGallery({ car }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Zdjęcia {car.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 shadow shadow-black bg-white text-black"
            >
              Zamknij zdjęcia
            </button>
          </div>
          {car?.photos?.length > 0 &&
            car.photos.map((photo, index) => (
              <div key={index}>
                <img src={'http://localhost:3000/uploads/' + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-3 overflow-hidden">
        {car.photos?.slice(0, 3).map((photo, index) => (
          <img
            key={index}
            onClick={() => setShowAllPhotos(true)}
            className="aspect-square cursor-pointer object-cover"
            src={'http://localhost:3000/uploads/' + photo}
            alt=""
          />
        ))}
      </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white shadow shadow-md shadow-gray-500"
        >
          Pokaż więcej zdjęć
        </button>
    </div>
  );
}
