import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos, onChange}) {
    const [photoLink,setPhotolink] = useState('');
    async function addPhotoByLink(ev) {
        ev.preventDefault();
      const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
      onChange(prev => {
        return[...prev, filename];
      });
      setPhotolink('');
    }

    function removePhoto(ev,filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
}

    function selectAsMainPhoto(ev,filename) {
        ev.preventDefault();
        onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
  }

    return (
        <>
        <div className="flex gap-2">
            <input type="text" value={photoLink} onChange={ev => setPhotolink(ev.target.value)} placeholder={'Dodaj za pomocą linku ....jpg'}/>
                <button onClick={addPhotoByLink} className="bg-primary grow px-4 round-2xl">Dodaj&nbsp;zdjęcie</button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div className="h-32 flex relative" key={link}>
                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:3000/uploads/'+link} alt=""/>
                    <button onClick={ev => removePhoto(ev,link)} className="cursor-pointer absolute top-1 right-1 text-black bg-primary bg-opacity-50 rounded-2xl py-2 px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

            </button>
            <button onClick={ev => selectAsMainPhoto(ev,link)} className="cursor-pointer absolute top-1 left-1 text-black bg-primary bg-opacity-50 rounded-2xl py-2 px-3">
              {link === addedPhotos[0] && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
              
              )}
              {link !== addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              
              )}
            </button>
                </div>
        ))}

        </div>
        </>
    );
}