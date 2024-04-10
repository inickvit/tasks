document.addEventListener("DOMContentLoaded", () => {
    fetchAndDraw();
})

async function fetchData() {

    const cachedData = localStorage.getItem('cmeData');
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const apiKey = "IB7Gc05NpGEpGTXLQPepFMhOMQ4oH8G7bjSDKyJg";
    const baseUrl = 'https://api.nasa.gov/DONKI/CME';

    const startDate = '2013-01-01';
    const endDate = '2022-12-31';
    const url = `${baseUrl}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem('cmeData', JSON.stringify(data));
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

async function fetchAndDraw() {
    const data = await fetchData();
    if (data) {
        generateChart(data, 'line', 'lineChart');
        generateChart(data, 'bar', 'barChart');
        generateChart(data, 'pie', 'pieChart');
        generateChart(data, 'scatter', 'scatterPlot');
        generateChart(data, 'doughnut', 'doughnutChart');
        generateChart(data, 'polarArea', 'polarAreaChart');
        generateChart(data, 'radar', 'radarChart')
    } else {
        console.error('Failed to fetch data.');
    }
}

function generateChart(data, chartType = 'line', canvasId) {
    const yearCounts = {};
    data.forEach(item => {
        const year = item.activityID.substring(0, 4);
        yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    let titleText = chartType[0].toUpperCase() + chartType.slice(1) + ' Graph';
    let boringFlag = ['line', 'bar', 'scatter', 'radar'].includes(chartType) ? false : true;
    let legendPos = boringFlag ? 'right' : 'top';

    const labels = Object.keys(yearCounts);
    const counts = Object.values(yearCounts);

    const ctx = document.getElementById(canvasId).getContext('2d');
    const myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'CME Count',
                data: counts,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: titleText
                },
                legend: {
                    position: legendPos
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: false
        }
    });
}

function copyChart(chartId) {
    var canvas = document.getElementById(chartId);
    canvas.toBlob(function(blob) {
        try {
            navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ]);
            console.log('Image copied to clipboard successfully.');
        } catch (error) {
            console.error('Unable to copy image to clipboard:', error);
        }
    }, 'image/png');
}
