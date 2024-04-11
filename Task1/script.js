var charts = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDraw();
})

var menuOpen = false;

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

async function fetchAndDraw(criteria = "year") {
    const data = await fetchData();
    charts.forEach(chart => {
        chart.destroy();
    })
    if (data) {
        charts.push(generateChart(data, 'line', 'lineChart', criteria));
        charts.push(generateChart(data, 'bar', 'barChart', criteria));
        charts.push(generateChart(data, 'pie', 'pieChart', criteria));
        charts.push(generateChart(data, 'doughnut', 'doughnutChart', criteria));
        charts.push(generateChart(data, 'polarArea', 'polarAreaChart', criteria));
        charts.push(generateChart(data, 'radar', 'radarChart', criteria));
    } else {
        console.error('Failed to fetch data.');
    }
}

function generateChart(data, chartType = 'line', canvasId, criteria = "year") {
    let labels, counts;

    if (criteria === 'year') {
        const yearCounts = {};
        data.forEach(item => {
            const year = item.activityID.substring(0, 4);
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        });
        labels = Object.keys(yearCounts);
        counts = Object.values(yearCounts);
    } else if (criteria === 'month') {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthCounts = {};
        data.forEach(item => {
            const monthNumber = parseInt(item.activityID.substring(5, 7), 10);
            const monthName = monthNames[monthNumber - 1];
            monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
        });

        labels = Object.keys(monthCounts);
        counts = Object.values(monthCounts).map(count => (count / 10));
    } else if (criteria === 'hour') {
        const hourCounts = Array(24).fill(0); // Initialize an array to hold counts for each hour
        
        data.forEach(item => {
            const hour = parseInt(item.activityID.substring(11, 13), 10); // Extract hour from activityID
            hourCounts[hour] += 1; // Increment count for the corresponding hour
        });

        labels = Array.from({length: 24}, (_, i) => `${i}:00`); // Generate labels for each hour
        counts = hourCounts.map(count => (count / 10)); // Calculate average counts for each hour
    }

    let titleText = chartType[0].toUpperCase() + chartType.slice(1) + ' Graph';
    let boringFlag = ['line', 'bar', 'scatter', 'radar'].includes(chartType) ? false : true;
    let legendPos = boringFlag ? 'right' : 'top';

    const ctx = document.getElementById(canvasId).getContext('2d');
    let config = {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: criteria === 'year' ? 'CME Count (Yearly)' : 
                       criteria === 'month' ? 'Average CME Count (Monthly)' :
                       'Average CME Count (Hourly GMT)',
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
    };
    myChart = new Chart(ctx, config);
    return myChart;
}


function openCloseNav() {
    if (!menuOpen) {
        document.getElementById("menuSidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        menuOpen = true;
    } else {
        document.getElementById("menuSidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        menuOpen = false
    }
}