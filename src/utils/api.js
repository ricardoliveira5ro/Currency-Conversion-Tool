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

export async function Convert(baseCurrency, targetCurrency, amount) {
  try {
    const baseUrl = 'https://currency-conversion-api-tool.vercel.app/convert';
    const url = new URL(baseUrl);
    
    url.searchParams.append('baseCurrency', baseCurrency);
    url.searchParams.append('targetCurrency', targetCurrency);
    url.searchParams.append('amount', amount);

    const response = await fetch(url.toString(), {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Failed to convert amount');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error converting amount:', error);
    return null;
  }
}

export async function Rates(code) {
  try {
    const response = await fetch(`https://currency-conversion-api-tool.vercel.app/real-time-rates/${code}`);

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