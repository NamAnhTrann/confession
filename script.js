document.getElementById('proposalForm').addEventListener('submit', function(event) {
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
const moveDistance = 50;

noLabel.addEventListener('mouseenter', function() {
    moveLabel();
});

function moveLabel() {
    const container = document.querySelector('.radio-container');
    const labelRect = noLabel.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let newLeft = Math.random() * (containerRect.width - labelRect.width);
    let newTop = Math.random() * (containerRect.height - labelRect.height);

    if (labelRect.left < containerRect.left) newLeft += moveDistance;
    if (labelRect.right > containerRect.right) newLeft -= moveDistance;
    if (labelRect.top < containerRect.top) newTop += moveDistance;
    if (labelRect.bottom > containerRect.bottom) newTop -= moveDistance;

    noLabel.style.position = 'absolute';
    noLabel.style.left = `${newLeft}px`;
    noLabel.style.top = `${newTop}px`;
}
