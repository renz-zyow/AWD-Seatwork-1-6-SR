document.addEventListener("DOMContentLoaded", () => {
    loadSavedData();
});

function calculateGWA() {
    const name = document.getElementById('name').value;
    const grades = [
        parseFloat(document.getElementById('grade1').value),
        parseFloat(document.getElementById('grade2').value),
        parseFloat(document.getElementById('grade3').value),
        parseFloat(document.getElementById('grade4').value),
        parseFloat(document.getElementById('grade5').value),
    ];

    if (name.trim() === "" || grades.some(isNaN)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const total = grades.reduce((acc, curr) => acc + curr, 0);
    const gwa = total / grades.length;

    const resultText = `${name}, your General Weighted Average (GWA) is: ${gwa.toFixed(2)}`;
    document.getElementById('result').innerText = resultText;

    saveData(name, grades, resultText);
}

function saveData(name, grades, resultText) {
    const studentData = {
        name: name,
        grades: grades,
        result: resultText
    };
    localStorage.setItem("studentData", JSON.stringify(studentData));
}

function loadSavedData() {
    const savedData = localStorage.getItem("studentData");
    if (savedData) {
        const { name, grades, result } = JSON.parse(savedData);
        document.getElementById('name').value = name;
        document.getElementById('grade1').value = grades[0];
        document.getElementById('grade2').value = grades[1];
        document.getElementById('grade3').value = grades[2];
        document.getElementById('grade4').value = grades[3];
        document.getElementById('grade5').value = grades[4];
        document.getElementById('result').innerText = result;
    }
}

