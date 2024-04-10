async function fetchData() {

    const apiKey = "IB7Gc05NpGEpGTXLQPepFMhOMQ4oH8G7bjSDKyJg";
    const baseUrl = 'https://api.nasa.gov/DONKI/CME';

    const startDate = '2022-01-01';
    const endDate = '2022-12-31';
    const url = `${baseUrl}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    fetchAndStore();
})