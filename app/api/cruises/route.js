// app/api/cruises/route.js
export async function GET(request) {
    try {
        // Fetch cruises data
        const cruisesResponse = await fetch(`https://jjzl6.wiremockapi.cloud/cruises`); // should really be an enviromental 
        if (!cruisesResponse.ok) throw new Error('Failed to fetch cruises object info');

        const cruiseObjectArray = await cruisesResponse.json();

        return new Response(
            JSON.stringify({cruises: cruiseObjectArray }),
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
