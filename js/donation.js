const cashAmountText = document.querySelector('#cash-amount');
let cashAmount = parseFloat(cashAmountText.innerText);

const container = document.querySelector('#container');
const sections = container.querySelectorAll('.donation-section');

const historyContainer = document.querySelector('#history-container');

const modal = document.querySelector('#success-modal');
const closeModalButton = document.querySelector('#close-modal');

function showModal() {
    modal.classList.remove('hidden');
}

function hideModal() {
    modal.classList.add('hidden');
}

for (let i = 0; i < sections.length; i++) {
    let button = sections[i].querySelector('.donate-btn');
    button.addEventListener('click', function () {
        const inputBalance = sections[i].querySelector('.donation-amount');
        const donationAmount = parseFloat(inputBalance.value);

        const initialAmountText = sections[i].querySelector('.initial-amount');
        const initialAmount = parseFloat(initialAmountText.innerText);

        const donationArea = sections[i].querySelector('.donation-area').innerText;
        console.log(donationArea);
        if (donationAmount > 0 && cashAmount >= donationAmount) {

            const donateTk = donationAmount + initialAmount;
            initialAmountText.innerText = donateTk;

            cashAmount = cashAmount - donationAmount;
            cashAmountText.innerText = cashAmount;

            addDonationToHistory(donationAmount, donationArea, new Date());

            showModal();
            inputBalance.value = '';
        }
        else {
            alert('Invalid amount or insufficient balance');
        }
    });
}

closeModalButton.addEventListener('click', hideModal);

// History tab functionality
const donationButton = document.querySelector('#donation-button');
const historyButton = document.querySelector('#history-button');

function toggleButton(activeButton, inactiveButton) {
    activeButton.classList.add('bg-[#B4F461]');
    activeButton.classList.remove('border-2', 'border-stone-300');
    inactiveButton.classList.remove('bg-[#B4F461]');
    inactiveButton.classList.add('border-2', 'border-stone-300');
}

function toggleContainer(activeContainer, inactiveContainer) {
    activeContainer.classList.remove('hidden');
    inactiveContainer.classList.add('hidden');
}

donationButton.addEventListener('click', function () {
    toggleButton(donationButton, historyButton);
    toggleContainer(container, historyContainer);
});

historyButton.addEventListener('click', function () {
    toggleButton(historyButton, donationButton);
    toggleContainer(historyContainer, container);
});

function addDonationToHistory(amount, area, date) {
    const historyDetails = document.createElement('div');
    historyDetails.classList.add('p-4', 'rounded-md', 'border-2', 'border-stone-300', 'mb-4');

    historyDetails.innerHTML = `
        <p>${amount} Taka is ${area}</p>
        <p>Date: ${date}</p>
    `;

    historyContainer.insertBefore(historyDetails, historyContainer.firstChild);
}
