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

async function fetchAndStore() {
    const data = await fetchData();
    if (data) {
        const csvContent = generateCSV(data);
        downloadCSV(csvContent);
    } else {
        console.error('Failed to fetch data.');
    }
}

function generateCSV(data) {
    let csvContent = 'activityID,startTime\n';
    for (const entry of data) {
        const activityID = entry.activityID;
        const startTime = entry.startTime;
        csvContent += `${activityID},${startTime}\n`;
    }
    return csvContent;
}

function downloadCSV(csvContent) {
    const filename = 'cme_data.csv';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndStore();
})