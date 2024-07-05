document.getElementById('proposalForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const resultDiv = document.getElementById('result');
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === 'No Way!') {
            resultDiv.textContent = 'Oh no, this option is no longer available :>';
        } else if (selectedOption.value === 'Yes!') {
            resultDiv.textContent = ':>';
        }
    } else {
        resultDiv.textContent = 'Please select an option.';
    }
    resultDiv.classList.add('show');
    setTimeout(() => resultDiv.classList.remove('show'), 2000);
});

const noLabel = document.getElementById('noLabel');
const moveDistance = 300; // Increase the move distance
let timer;

noLabel.addEventListener('mouseenter', function () {
    setTimeout(moveLabel, 30); // Add 0.03 second (30 milliseconds) delay before moving
});

function moveLabel() {
    const container = document.querySelector('.radio-container');
    const labelRect = noLabel.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let newLeft = Math.random() * (containerRect.width - labelRect.width);
    let newTop = Math.random() * (containerRect.height - labelRect.height);

    // Ensure the label stays within the container bounds
    if (labelRect.left < containerRect.left) newLeft = Math.min(newLeft + moveDistance, containerRect.width - labelRect.width);
    if (labelRect.right > containerRect.right) newLeft = Math.max(newLeft - moveDistance, 0);
    if (labelRect.top < containerRect.top) newTop = Math.min(newTop + moveDistance, containerRect.height - labelRect.height);
    if (labelRect.bottom > containerRect.bottom) newTop = Math.max(newTop - moveDistance, 0);

    noLabel.style.position = 'absolute';
    noLabel.style.left = `${newLeft}px`;
    noLabel.style.top = `${newTop}px`;
}

function startTimer() {
    timer = setTimeout(() => {
        noLabel.classList.add('fade-out'); // Add fade-out class for disappearing animation

        const resultDiv = document.getElementById('result');
        resultDiv.textContent = 'TOO LATE, ITS A YES';
        resultDiv.classList.add('show');
        setTimeout(() => resultDiv.classList.remove('show'), 2000);

        showConfetti(); // Show confetti animation
    }, 10000); // 10 seconds timer
}

function resetTimer() {
    clearTimeout(timer);
}

document.addEventListener('DOMContentLoaded', (event) => {
    startTimer();
    document.getElementById('noLabel').addEventListener('click', resetTimer);
    document.getElementById('yesLabel').addEventListener('click', resetTimer);
});

function showConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
    }

    setTimeout(() => {
        const confettis = document.querySelectorAll('.confetti');
        confettis.forEach(confetti => confetti.remove());
    }, 4000); // Remove confetti after 4 seconds
}

function getRandomColor() {
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
    return colors[Math.floor(Math.random() * colors.length)];
}
