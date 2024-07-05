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
const yesLabel = document.querySelector('label[for="yes"]');
const moveDistance = 300; // Minimum move distance away from the cursor
let timer;
let countdown;
const countdownElement = document.createElement('div');
countdownElement.id = 'countdown';
document.body.appendChild(countdownElement);

noLabel.addEventListener('mouseenter', function (event) {
    moveLabel(event);
});

function moveLabel(event) {
    const container = document.querySelector('.radio-container');
    const labelRect = noLabel.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let newLeft, newTop;

    do {
        newLeft = Math.random() * (containerRect.width - labelRect.width);
        newTop = Math.random() * (containerRect.height - labelRect.height);
    } while (isTooCloseToCursor(newLeft, newTop, event.clientX, event.clientY));

    noLabel.style.position = 'absolute';
    noLabel.style.left = `${newLeft}px`;
    noLabel.style.top = `${newTop}px`;
}

function isTooCloseToCursor(newLeft, newTop, cursorX, cursorY) {
    const labelCenterX = newLeft + noLabel.offsetWidth / 2;
    const labelCenterY = newTop + noLabel.offsetHeight / 2;

    const distance = Math.sqrt(
        Math.pow(labelCenterX - cursorX, 2) +
        Math.pow(labelCenterY - cursorY, 2)
    );

    return distance < moveDistance;
}

function startTimer() {
    let timeLeft = 10;
    countdownElement.textContent = `${timeLeft}s`;

    countdown = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            noLabel.classList.add('fade-out'); // Add fade-out class for disappearing animation
            yesLabel.classList.add('center-yes'); // Add class to center the "Yes" label

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'TOO LATE, ITS A YES';
            resultDiv.classList.add('show');
            setTimeout(() => resultDiv.classList.remove('show'), 2000);

            showConfetti(); // Show confetti animation
        }
    }, 1000); // Update every second
}

function resetTimer() {
    clearTimeout(timer);
    clearInterval(countdown);
    countdownElement.textContent = '';
}

document.addEventListener('DOMContentLoaded', (event) => {
    startTimer();
    document.getElementById('noLabel').addEventListener('click', resetTimer);
    document.getElementById('yes').addEventListener('click', resetTimer);
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
    }, 4000); // Remove confetti
}
