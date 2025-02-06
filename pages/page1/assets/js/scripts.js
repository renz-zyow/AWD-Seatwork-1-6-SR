function calculateGWA() {
    const name = document.getElementById('name').value;
    const grades = [
        parseFloat(document.getElementById('grade1').value),
        parseFloat(document.getElementById('grade2').value),
        parseFloat(document.getElementById('grade3').value),
        parseFloat(document.getElementById('grade4').value),
        parseFloat(document.getElementById('grade5').value),
    ];

    const total = grades.reduce((acc, curr) => acc + curr, 0);
    const gwa = total / grades.length;

    document.getElementById('result').innerText = `${name}, your General Weighted Average (GWA) is: ${gwa.toFixed(2)}`;
}