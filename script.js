function calculate() {
    var amount = parseFloat(document.getElementById('amount').value);
    var rate = parseFloat(document.getElementById('rate').value) / 100;
    var fees = parseFloat(document.getElementById('fees').value) / 100;
    var term = parseInt(document.getElementById('term').value);

    var results = document.getElementById('results');
    results.innerHTML = '';

    var totalFees = 0;

    for (var year = 1; year <= term; year++) {
        var beforeFees = amount * (1 + rate);
        var feeAmount = amount * fees;
        var afterFees = beforeFees - feeAmount;
 
        results.innerHTML += '<p>Year ' + year + ': <strong>Before Fees:</strong> R' + beforeFees.toFixed(2) + ', <strong>After Fees:</strong> R' + afterFees.toFixed(2) + '</p>';

        amount = afterFees;
        totalFees += feeAmount;
    }
    results.innerHTML += '<p><strong>Summary:</strong> Initial Investment: R' + document.getElementById('amount').value + ', Total Fees Deducted: R' + totalFees.toFixed(2) + ', Total After ' + term + ' Years: R' + amount.toFixed(2) + ' (after fees)' +'</p>';
}
