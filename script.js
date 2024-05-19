function calculate() {
    var amount = parseFloat(document.getElementById('amount').value);
    var rate = parseFloat(document.getElementById('rate').value) / 100;
    var fees = parseFloat(document.getElementById('fees').value) / 100;
    var term = parseInt(document.getElementById('term').value);

    var results = document.getElementById('results');
    results.innerHTML = '';

    var totalFees = 0;
    var feeRatioData = [];
    var returnData = [];
    var costData = [];

    for (var year = 1; year <= term; year++) {
        var beforeFees = amount * (1 + rate);
        var feeAmount = beforeFees * fees;
        var afterFees = beforeFees - feeAmount;

        results.innerHTML += '<p>Year ' + year + ': <strong>Before Fees:</strong> R' + beforeFees.toFixed(2) + ', <strong>After Fees:</strong> R' + afterFees.toFixed(2) + '</p>';

        amount = afterFees;
        totalFees += feeAmount;

        feeRatioData.push({ year: year, ratio: totalFees / afterFees });
        returnData.push({ year: year, ratio: amount });
        costData.push({ year: year, ratio: totalFees });
    }

    results.innerHTML += '<p><strong>Summary:</strong> Initial Investment: R' + document.getElementById('amount').value + ', Total Fees Deducted: R' + totalFees.toFixed(2) + ', Total After ' + term + ' Years: R' + amount.toFixed(2) + ' (after fees)' +'</p>';

    plotData(feeRatioData, 'feeRatioPlot', 'Yearly Ratio Between Fees and Returns', 'Year', "Fees Ratio");
    plotData(returnData, 'returnPlot', "Yearly Returns After Fees", 'Year', "Return After Fees");
    plotData(costData, 'costPlot', "Yearly Fees", 'Year', "Fees");
}

function plotData(data, containerId, ptitle, xa, ya) {
    var years = data.map(d => d.year);
    var ratios = data.map(d => d.ratio);

    var trace = {
        x: years,
        y: ratios,
        mode: 'markers',
        type: 'scatter'
    };

    var layout = {
        title: ptitle,
        xaxis: {
            title: xa
        },
        yaxis: {
            title: ya
        }
    };

    Plotly.newPlot(containerId, [trace], layout);
}
