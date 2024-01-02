import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNavigation from "../AccountNavigation";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
 
export default function CarsFormPage() {
    const{id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxSeats, setmaxSeats] = useState(1);
    const [price,setPrice] = useState(1000);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {   
        if (!id) {
            return;
        }
        axios.get('/mycars/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setmaxSeats(data.maxSeats);
            setPrice(data.price);
         });
       }, [id]);
    function inputHeader(text) {
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
 
    function inputDescription(text) {
        return(
            <h2 className="text-gray-500 text-sm">{text}</h2>    
        );
    }
 
    function preInput(header, description) {
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
 
    async function saveMycars(ev) {
        ev.preventDefault();
        const mycarData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxSeats, price,};
        if (id) {
            await axios.put('/mycars', {id, ...mycarData
            });
            setRedirect(true);
        } else {
            await axios.post('/mycars', mycarData);
        setRedirect(true);
    }
}
 
    if (redirect) {
        return <Navigate to={'/account/mycars'}/>
    }
    return(
        <div>
            <AccountNavigation/>
        < form onSubmit={saveMycars}>
            {preInput('Nazwa', 'Nazwa pojazdu')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Model, na przykład Fiat Punto II"/>
            {preInput('Miasto','Miejsce na miasto' )}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Adres"/>
            {preInput('Zdjęcia','Im więcej tym lepiej' )}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Opis','Opis pojazdu' )}
            <textarea value={description} onChange={ev =>setDescription(ev.target.value)}/>
            {preInput('Wyposażenie','Wybierz elementy wyposażenia' )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput('Informacje dodatkowe','Dodatkowe informacje' )}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
            {preInput('Czas odbioru/oddania','dodaj czas odbioru/oddania pojazdu' )}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">Godzina odbioru:</h3>
                    <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="10"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Godzina oddania:</h3>
                    <input type="text"value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11"/>    
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Liczba miejsc w pojeździe:</h3>
                    <input type="number" value={maxSeats} onChange={ev => setmaxSeats(ev.target.value)}/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Cena za dobę (zł)</h3>
                    <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}/>
                </div>
            </div>
            <button className="primary my-4">Zapisz</button>
        </form>
    </div>
    );
} 