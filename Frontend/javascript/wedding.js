let totalBudget = 0;
const categoriesList = document.getElementById('categories');
const remainingBudgetElement = document.getElementById('remaining-budget');
const categoryInput = document.getElementById('category');
const suggestionsList = document.getElementById('suggestions');
const flashcardContainers = document.getElementById('flashcard-containers');

// Predefined category suggestions
const categorySuggestions = ['Venue', 'Catering', 'Decoration', 'People You Might Need'];

// Flashcards for each category
const flashcardsData = {
    'Venue': [
        { title: 'Venue Option 1', address: '123 Main St', contact: '(123) 456-7890' },
        { title: 'Venue Option 2', address: '456 Oak St', contact: '(987) 654-3210' }
    ],
    'Catering': [
        { title: 'Catering Option 1', address: '789 Maple St', contact: '(555) 123-4567' },
        { title: 'Catering Option 2', address: '234 Pine St', contact: '(789) 456-1234' }
    ],
    'Decoration': [
        { title: 'Decoration Option 1', address: '567 Birch St', contact: '(222) 333-4444' },
        { title: 'Decoration Option 2', address: '890 Elm St', contact: '(444) 555-6666' }
    ],
    'People You Might Need': [
        { title: 'Photographer', contact: '(111) 222-3333' },
        { title: 'Florist', contact: '(444) 999-8888' }
    ]
};

categoryInput.addEventListener('input', updateSuggestions);
categoryInput.addEventListener('focus', showSuggestions);

function setTotalBudget() {''
    totalBudget = parseFloat(document.getElementById('total-budget').value);

    if (isNaN(totalBudget) || totalBudget <= 0) {
        alert('Please enter a valid total budget.');
        return;
    }

    updateRemainingBudget();
}

function updateSuggestions() {
    const userInput = categoryInput.value.toLowerCase();
    const filteredSuggestions = categorySuggestions.filter(suggestion => suggestion.toLowerCase().includes(userInput));

    renderSuggestions(filteredSuggestions);
}

function showSuggestions() {
    renderSuggestions(categorySuggestions);
}

function renderSuggestions(suggestions) {
    suggestionsList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => selectSuggestion(suggestion));
        suggestionsList.appendChild(suggestionItem);
    });

    suggestionsList.style.display = 'block';
}

function selectSuggestion(suggestion) {
    categoryInput.value = suggestion;
    suggestionsList.style.display = 'none';

    // Check if flashcards data is available for the selected category and render flashcards
    if (flashcardsData.hasOwnProperty(suggestion)) {
        renderFlashcards(suggestion);
    } else {
        clearFlashcards();
    }
}

function renderFlashcards(category) {
    // Clear previous flashcards
    flashcardContainers.innerHTML = '';

    // Render new flashcards for the selected category
    flashcardsData[category].forEach(flashcard => {
        const flashcardContainer = document.createElement('div');
        flashcardContainer.className = 'flashcard';
        flashcardContainer.innerHTML = `
            <h3>${flashcard.title}</h3>
            <div class="details">
                <p>Address: ${flashcard.address || 'N/A'}</p>
                <p>Contact: ${flashcard.contact || 'N/A'}</p>
            </div>
        `;
        flashcardContainers.appendChild(flashcardContainer);
    });
}

function navigateToOptionsPage() {
    const categoryInputValue = categoryInput.value.trim();

    if (!categoryInputValue) {
        alert('Please enter a valid category name.');
        return;
    }

    window.location.href = `options.html?category=${encodeURIComponent(categoryInputValue)}`;
}

function getCategoryTotal() {
    const categoryItems = document.getElementsByClassName('category');
    let total = 0;

    for (const item of categoryItems) {
        const amountElement = item.querySelector('span:last-child');
        total += parseFloat(amountElement.textContent.slice(1));
    }

    return total;
}

function updateRemainingBudget() {
    const remainingBudget = totalBudget - getCategoryTotal();
    remainingBudgetElement.textContent = remainingBudget.toFixed(2);
}
