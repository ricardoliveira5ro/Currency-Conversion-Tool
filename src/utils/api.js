export async function Currencies() {
    try {
        const response = await fetch('https://currency-conversion-api-tool.vercel.app/currencies');
    
        if (!response.ok) {
          throw new Error('Failed to fetch currency data');
        }
    
        const data = await response.json();
        return data;
        
      } catch (error) {
        console.error('Error fetching currency data:', error);
        return null;
      }
}