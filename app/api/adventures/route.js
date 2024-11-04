// app/api/adventures/route.js
export async function GET(request) {
    try {
        // Fetch adventures data
        const adventuresResponse = await fetch(`https://jjzl6.wiremockapi.cloud/adventures`); // should really be an enviromental var
        if (!adventuresResponse.ok) throw new Error('Failed to fetch adventures object info');

        const adventuresObjectArray = await adventuresResponse.json();

        return new Response(JSON.stringify(adventuresObjectArray),
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
