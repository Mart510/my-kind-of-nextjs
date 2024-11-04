'use client';
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";

// Individual Adventure Card component
const AdventureCard = ({ imageLink, title, id }) => {
    return (
        <div id={id} className="rounded-lg overflow-hidden shadow-md m-4 min-w-60 min-h-40">
            <div name="imageContainer" className="relative h-4/5">
                {imageLink ? (
                    <Image
                        src={imageLink}
                        fill
                        objectFit="cover"
                        alt={title || "Adventure Image"}  // Default alt text
                        priority={false} 
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center">
                        <p>No image available</p> {/* Placeholder text */}
                    </div>
                )}
            </div>
                
                    <h2 className="text-black h-1/5 text-md text-center ">{title}</h2>           
                
        </div>
    );
};

const isValidImageUrl = (url) => {
    // Check if the URL is a string, starts with 'http://' or 'https://', and is not 'https://undefined'
    return typeof url === 'string' && 
           (url.startsWith('http://') || url.startsWith('https://')) &&
           url !== 'https://undefined';
};

// Container for all Adventure Cards
const AdventureCardsContainer = () => {
    const [adventures, setAdventures] = useState([]);
    const [error, setError] = useState(null); // State to hold error messages
    const [loading, setLoading] = useState(true);

    const fetchCardData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/adventures');
            if (!response.ok) throw new Error('Failed to fetch card data');

            const data = await response.json();
            console.log("Fetched data:", data);

            // Add unique IDs
            const adventuresWithIds = data
            .map(adventure => ({
                ...adventure,
                id: nanoid()
            }))
            .filter(adventure => isValidImageUrl(adventure.image));

            setAdventures(adventuresWithIds);
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
            <div className="flex flex-row overflow-x-scroll max-w-full p-4"> 
                {error && <div className="text-red-500">{error}</div>}
                {adventures.map((adventure) => (
                    <AdventureCard 
                        key={adventure.id}
                        id={adventure.id} 
                        imageLink={adventure.image} 
                        title={adventure.name} 
                    />
                ))}
            </div>
    );
};

const MyAdventures = () => {
    return (
        <>
            <div className="flex-col">
            <h1 className="text-black text-xl font-bold">My adventures</h1>
            <AdventureCardsContainer/>
            </div>
        </>
    );
}

export default MyAdventures;
