import { useEffect, useState } from "react";
import { getAvailableVoitures } from "../api/voiture.service";
import VoitureCard from "../components/voiture/VoitureCard";


export default function Voitures() {
    const [voitures, setVoitures] = useState([]);

    useEffect(() => {
        getAvailableVoitures()
            .then(res => setVoitures(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {voitures.map(v => (
                <VoitureCard
                    key={v.idVoiture}
                    voiture={v}
                    userId={1} // temporaire
                />
            ))}
        </div>
    );
}
