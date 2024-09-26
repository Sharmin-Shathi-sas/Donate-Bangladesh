document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        homeButton.addEventListener('click', function () {
            window.location.href = '../index.html';
        });
    }

    const cashAmountText = document.querySelector('#cash-amount');
    let cashAmount = parseFloat(cashAmountText ? cashAmountText.innerText : 0);

    const container = document.querySelector('#container');
    const historyContainer = document.getElementById('history-container');
    const sections = container.getElementsByClassName('donation-section');

    const modal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal');

    function showModal() {
        modal.classList.remove('hidden');
    }

    function hideModal() {
        modal.classList.add('hidden');
    }

    let donationHistory = []; // Array to store donation history

    if (sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
            const button = sections[i].querySelector('.donate-btn');
            const inputBalance = sections[i].querySelector('.donation-amount');
            const initialAmountText = sections[i].querySelector('.initial-amount');
            let initialAmount = parseFloat(initialAmountText ? initialAmountText.innerText : 0);

            if (button && inputBalance) {
                button.addEventListener('click', function () {
                    let donationAmount = parseFloat(inputBalance.value);

                    // Validate the donation amount
                    if (isNaN(donationAmount) || donationAmount <= 0) {
                        alert('Invalid donation amount. Please enter a valid number.');
                        return;
                    }

                    // Check if there's enough cash
                    if (cashAmount >= donationAmount) {
                        initialAmount += donationAmount;

                        // Update donation amount in the current section
                        initialAmountText.innerText = initialAmount;

                        // Deduct from available cash
                        cashAmount -= donationAmount;
                        cashAmountText.innerText = cashAmount;

                        // Add this donation to history
                        donationHistory.push({
                            amount: donationAmount,
                            time: new Date().toLocaleString()
                        });

                        // Show success modal
                        showModal();

                        // Reset the input
                        inputBalance.value = '';
                    } else {
                        alert('Insufficient balance. Please enter a smaller amount.');
                    }
                });
            }
        }
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', hideModal);
    }

    // History tab functionality
    const donationButton = document.getElementById('donation-button');
    const historyButton = document.getElementById('history-button');

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

    if (donationButton && historyButton && container && historyContainer) {
        donationButton.addEventListener('click', function () {
            toggleButton(donationButton, historyButton);
            toggleContainer(container, historyContainer);
        });

        historyButton.addEventListener('click', function () {
            toggleButton(historyButton, donationButton);
            toggleContainer(historyContainer, container);

            // Clear previous history content
            historyContainer.innerHTML = '';

            // Add each donation to the history container
            donationHistory.forEach((donation) => {
                const historyDetails = document.createElement('div');
                historyDetails.classList.add('p-4', 'rounded-md', 'border-2', 'border-stone-300');
                historyDetails.innerHTML = `<p>Donated ${donation.amount} BDT at ${donation.time}</p>`;

                // Insert the history at the top
                historyContainer.insertBefore(historyDetails, historyContainer.firstChild);
            });
        });
    }

    // Blog button functionality
    const blogButton = document.getElementById('blog-button');
    if (blogButton) {
        blogButton.addEventListener('click', function () {
            window.location.href = './html/blog.html';
        });
    }
});
