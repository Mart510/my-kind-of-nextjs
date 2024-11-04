// app/api/getCardInfo/route.js
export async function GET(request) {
    try {
        // Fetch adventures data
        const adventuresResponse = await fetch(`https://jjzl6.wiremockapi.cloud/adventures`); // should really be an enviromental var
        if (!adventuresResponse.ok) throw new Error('Failed to fetch adventures object info');

        const adventuresObjectArray = await adventuresResponse.json();

        // Fetch cruises data
        const cruisesResponse = await fetch(`https://jjzl6.wiremockapi.cloud/cruises`); // should really be an enviromental 
        if (!cruisesResponse.ok) throw new Error('Failed to fetch cruises object info');

        const cruiseObjectArray = await cruisesResponse.json();

        return new Response(
            JSON.stringify({ adventures: adventuresObjectArray, cruises: cruiseObjectArray }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Error fetching data" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
