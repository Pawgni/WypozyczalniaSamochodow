export default function Perks({selected, onChange}){
    function handleCbClick(ev) {
        const {checked,name} = ev.target;
        if (checked) {
            onChange([...selected,name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
    return (
        <>
        <label className="border p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('diesel')} name="diesel" onChange={handleCbClick}/>
                            <span>Diesel</span>
                        </label>
                        <label className="border p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('benzyna')} name="benzyna" onChange={handleCbClick}/>
                            <span>Benzyna</span>
                        </label>
                        <label className="border p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('lpg')} name="lpg" onChange={handleCbClick}/>
                            <span>LPG</span>
                        </label>
                        <label className="border p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('hybryda')} name="hybryda" onChange={handleCbClick}/>
                            <span>Hybryda</span>
                        </label>
                        <label className="border p-4 flex  gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('esp')} name="esp" onChange={handleCbClick}/>
                            <span>ESP</span>
                        </label>
                        <label className="border p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('kamera')} name="kamera" onChange={handleCbClick}/>
                            <span>Kamera cofania</span>
                        </label>
                        <label className="border p-4 flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes('abs')} name="abs" onChange={handleCbClick}/>
                        <span>ABS</span>
                        </label>
        </>
    );
}