'use client';
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

// Individual Adventure Card component
const CruiseCard = ({cruise}) => {
    return (
        <div id={cruise.id} className="rounded-lg overflow-hidden shadow-md m-4 min-w-60 min-h-80 text-sm">
            <div name="imageContainer" className="relative h-1/2">
                {cruise.shipImage ? (
                    <Image
                        src={cruise.shipImage}
                        fill
                        objectFit="cover"
                        alt={cruise.shipName || "Image of a cruise ship"}  // Default alt text
                        priority={false} 
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center">
                        <p>No image available</p> {/* Placeholder text */}
                    </div>
                )}
            </div>
            <div className="h-1/2 flex flex-col justify-between px-2 py-1">
                <div>
                    <p className="font-semibold">{cruise.nights} Night {cruise.name}</p>
                    <p>{cruise.shipName}</p>
                </div>
                <div>
                <p>{cruise.sailDate}</p>
                    from <span className="font-bold">{cruise.startPort}</span>
                    <div className="flex flex-row items-center justify-between w-full">
    <div>
                <p>from <span className="font-bold">£{cruise.price}pp</span></p>
                    </div>
                        <div className="flex items-center justify-center rounded-sm" style={{ backgroundColor: cruise.iconBackgroundColor}}>
                            <img src={cruise.iconOverlay} alt="Cruise line icon" className="h-8 w-8" /> {/* Adjust size as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Container for all Adventure Cards
const CruiseCardsContainer = () => {
    const [cruises, setCruises] = useState([]);
    const [error, setError] = useState(null); // State to hold error messages
    const [loading, setLoading] = useState(true);

    const fetchCardData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/cruises');
            if (!response.ok) throw new Error('Failed to fetch card data');
    
            const data = await response.json();
            console.log("Fetched data:", data);
    
            // Access the cruises array from the response
            const cruiseData = data.cruises;

            // Ensure the fetched data is an array
            if (!Array.isArray(cruiseData)) {
                throw new Error('Fetched data is not an array');
            }
    
            // Add unique IDs
            const cruiseWithIds = cruiseData
                .map(cruise => ({
                    ...cruise,
                    id: nanoid()
                }))
    
            setCruises(cruiseWithIds); // Correct variable used here
        } catch (error) {
            console.error("Error fetching card data:", error);
            setError(error.message); // Set error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCardData();
    }, []);  // Run once on mount

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
            <div className="flex flex-row overflow-x-scroll max-w-full p-4 hide-scrollbar"> 
                {error && <div className="text-red-500">{error}</div>}
                {cruises.map((cruise) => (
                    <CruiseCard 
                    key={cruise.id}
                    cruise={{
                        ...cruise,
                        sailDate: dayjs(cruise.sailDate).format('dddd, DD MMMM YYYY'), // Format the date here
                    }}
                    />
                ))}
            </div>
    );
};

const PopularCruises = () => {
    return (
        <>
            <div className="flex-col">
            <h1 className="text-black text-xl font-bold">Popular Cruises</h1>
            <CruiseCardsContainer/>
            </div>
        </>
    );
}

export default PopularCruises;
