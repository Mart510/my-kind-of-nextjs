import { useEffect } from "react";

const fetchCardData = async () => {
  try {
      const response = await fetch('/api/getCardInfo');
      if (!response.ok) throw new Error('Failed to fetch card data');

      const data = await response.json();
      console.log("Fetched data:", data);  // { adventures: [...], cruises: [...] }
  } catch (error) {
      console.error("Error fetching card data:", error);
  }
};

useEffect(() => {
  fetchCardData();
}, []);