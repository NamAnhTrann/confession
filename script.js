document.getElementById('proposalForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const resultDiv = document.getElementById('result');
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        clearInterval(countdown); // Stop the timer
        if (selectedOption.value === 'No Way!') {
            resultDiv.textContent = 'Oh no, this option is no longer available :>';
        } else if (selectedOption.value === 'Yes!') {
            resultDiv.textContent = ':>';
            noLabel.classList.add('fade-out'); // Add fade-out class for disappearing animation
            yesLabel.classList.add('center-yes'); // Add class to center the "Yes" button
        }
        showRetryButton(); // Show the retry button
    } else {
        resultDiv.textContent = 'Please select an option.';
    }
    resultDiv.classList.add('show');
    setTimeout(() => resultDiv.classList.remove('show'), 2000);
});

const noLabel = document.getElementById('noLabel');
const noRadio = document.getElementById('no');
const yesLabel = document.getElementById('yesLabel');
const moveDistance = 400; // Minimum move distance away from the cursor
let clickCount = 0;
let countdown;
const countdownElement = document.createElement('div');
countdownElement.id = 'countdown';
document.body.appendChild(countdownElement);

noLabel.addEventListener('mouseenter', moveLabel);
noLabel.addEventListener('touchstart', moveLabel);

const handleNoLabelClick = debounce(function (event) {
    clickCount++;
    console.log(`No label clicked ${clickCount} time(s)`); // Debug log
    if (clickCount === 1) {
        showTemporaryMessage('OOPS IT SLIPS AWAY');
        noRadio.checked = false; // Deselect the "No" radio button
        console.log('First click: "No" radio button deselected'); // Debug log
    } else if (clickCount === 2) {
        showTemporaryMessage('OH NO, IT SLIPS AWAY AGAIN HAHAHAHAHA');
        moveLabel(event); // Move the label on the second click
        noRadio.checked = false; // Deselect the "No" radio button
        console.log('Second click: "No" radio button deselected and moved'); // Debug log
    } else if (clickCount === 3) {
        showTemporaryMessage('OH NO, IT SLIPS AGAIN, LAST TIME :>>>');
        moveLabel(event); // Move the label on the third click
        noRadio.checked = false; // Deselect the "No" radio button
        console.log('Third click: "No" radio button deselected and moved'); // Debug log
    } else if (clickCount == 4) {
        showTemporaryMessage("YOU SERIOUS ?");
        moveLabel(event);
        noRadio.checked = false;
    }
}, 200); // Adjust the debounce delay as needed

noLabel.addEventListener('click', handleNoLabelClick);
noLabel.addEventListener('touchstart', handleNoLabelClick);

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function moveLabel(event) {
    const container = document.querySelector('.radio-container');
    const labelRect = noLabel.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let newLeft, newTop;

    do {
        newLeft = Math.random() * (containerRect.width - labelRect.width);
        newTop = Math.random() * (containerRect.height - labelRect.height);
    } while (isTooCloseToCursor(newLeft, newTop, event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY));

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
    let timeLeft = 30;
    countdownElement.textContent = `${timeLeft}s`;

    countdown = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `${timeLeft}s`;

        if (timeLeft === 20) {
            showTemporaryMessage('20 SECONDS LEFT!!');
        } else if (timeLeft === 10) {
            showTemporaryMessage('10 SECONDS LEFT!!');
        } else if (timeLeft === 5) {
            showTemporaryMessage('5 SECONDS LEFT GOGO!!');
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            noLabel.classList.add('fade-out'); // Add fade-out class for disappearing animation
            yesLabel.classList.add('center-yes'); // Add class to center the "Yes" button

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'TOO LATE, ITS A YES';
            resultDiv.classList.add('show');
            setTimeout(() => resultDiv.classList.remove('show'), 2000);

            showConfetti(); // Show confetti animation

            // Show the retry button
            showRetryButton();
        }
    }, 1000); // Update every second
}

document.addEventListener('DOMContentLoaded', (event) => {
    startTimer();
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

function showTemporaryMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.fontSize = '2em';
    messageElement.style.color = '#ff0080';
    messageElement.style.backgroundColor = '#ffe6e6';
    messageElement.style.padding = '20px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.zIndex = '1000';
    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.style.transition = 'opacity 0.3s';
        messageElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500); // Adjusted to 500ms for smooth fade-out
    }, 1000); // Adjusted to 1000ms for 1 second display
}

function showRetryButton() {
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.style.position = 'fixed';
    retryButton.style.top = '60%';
    retryButton.style.left = '50%';
    retryButton.style.transform = 'translate(-50%, -50%)';
    retryButton.style.fontSize = '1.5em';
    retryButton.style.color = '#fff';
    retryButton.style.backgroundColor = '#ff0080';
    retryButton.style.padding = '10px 20px';
    retryButton.style.border = 'none';
    retryButton.style.borderRadius = '10px';
    retryButton.style.cursor = 'pointer';
    retryButton.style.zIndex = '1000';
    document.body.appendChild(retryButton);

    retryButton.addEventListener('click', function () {
        // Reset the game
        clickCount = 0;
        countdownElement.textContent = '';
        noLabel.classList.remove('fade-out');
        yesLabel.classList.remove('center-yes');
        document.body.removeChild(retryButton);

        // Reset the form and messages
        document.getElementById('proposalForm').reset();
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = '';

        startTimer();
    });
}
