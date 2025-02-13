document.addEventListener("DOMContentLoaded", () => {
    loadSavedData();
    loadHistory(); // Ensure history loads on page load
    document.getElementById('toggleHistory').addEventListener('click', toggleHistory);
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
    addToHistory(name, gwa.toFixed(2));
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

function addToHistory(name, gwa) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ name, gwa, date: new Date().toLocaleString() });
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = "<h2 style='color: white;'>History Log</h2>";
    if (history.length === 0) {
        historyContainer.innerHTML += "<p style='color: white;'>No history available.</p>";
    } else {
        const list = document.createElement("ul");
        list.style.color = "white";
        history.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.innerText = `${entry.date} - ${entry.name}: GWA ${entry.gwa}`;
            listItem.style.color = "white";
            list.appendChild(listItem);
        });
        historyContainer.appendChild(list);
    }
    historyContainer.style.display = "none";
}

function toggleHistory() {
    const historyContainer = document.getElementById('history');
    if (historyContainer.style.display === "none" || historyContainer.style.display === "") {
        loadHistory(); // Ensure history is loaded before showing
        historyContainer.style.display = "block";
    } else {
        historyContainer.style.display = "none";
    }
}
