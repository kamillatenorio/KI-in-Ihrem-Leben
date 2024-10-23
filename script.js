let using = 0;
let notUsing = 0;

const cards = [
    { src: 'image_generation.png', label: 'KI-Bildgenerierungssysteme (z.B. DALL-E, Midjourney)', type: 'use' },
    { src: 'grammarly.jpeg', label: 'KI-Schreibassistenzsysteme (z.B. Grammarly)', type: 'use' },
    { src: 'translation.png', label: 'KI-Übersetzungssysteme (z.B. Google Translator, DeepL)', type: 'use' },
    { src: 'contentGenerator.png', label: 'KI-Chatbot-Systeme (z.B. ChatGPT)', type: 'use' },
    { src: 'recommendation.jpeg', label: 'KI-Empfehlungssysteme (z.B. Netflix-Empfehlungssystem)', type: 'use' },
    { src: 'personal_assistant.jpeg', label: 'KI-Sprachassistenten (z.B. Siri, Alexa, Google Assistant)', type: 'use' },
    { src: 'autonomous_vehicle.png', label: 'Autonome KI-Fahrzeuge (z.B. Tesla Autopilot, Waymo)', type: 'use' },
    { src: 'transcription.jpeg', label: 'KI-Transkriptionssysteme (z.B. OtterAI, KonchAI)', type: 'use' },
    { src: 'CoPilot.png', label: 'KI-Codierungsassistent (z.B. GitHub Copilot)', type: 'use' },
    { src: 'music_composition.png', label: 'KI-Musikkompositionssysteme (z.B. Filmora AI Music Composer, beatoven.ai)', type: 'use' },
];

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadNextCard();
});

function handleSwipe(event) {
    const card = event.target;
    let offsetX;

    if (event.type === 'dragend') {
        offsetX = event.offsetX;
    } else if (event.type === 'touchend') {
        const touch = event.changedTouches[0];
        offsetX = touch.pageX - card.getBoundingClientRect().left;
    }

    const currentCard = cards[currentIndex - 1]; // currentIndex has already been incremented
    const isuseSwipe = offsetX >= card.offsetWidth / 2;

    if (isuseSwipe && currentCard.type === 'use') {
        using++;
    } else {
        notUsing++;
    }

    loadNextCard();
}

function loadNextCard() {
    const game = document.getElementById('game');

    if (currentIndex >= cards.length) {
        // End of cards, show final message
        displayFinalMessage();
        return;
    }

    const currentCard = cards[currentIndex];

    game.innerHTML = `
        <div class="card" draggable="true" ondragend="handleSwipe(event)" ontouchend="handleSwipe(event)">
            <img src="${currentCard.src}" alt="${currentCard.label}">
            <div class="label">${currentCard.label}</div>
        </div>
    `;

    currentIndex++;
}

function displayFinalMessage() {
    const game = document.getElementById('game');
    let messages = [];

    if (using <= 3) {
        messages = [
            "Sie stehen noch ganz am Anfang Ihrer KI-Reise, aber es liegt eine ganze Welt voller Möglichkeiten vor Ihnen!",
        ];
    } else if (using <= 7) {
        messages = [
            "KI-Systeme sind großartige Verbündete in Ihrem täglichen Leben!",
        ];
    } else {
        messages = [
            "Wow! Sie sind ein Profi darin, KI-Systeme in Ihre tägliche Routine zu integrieren und so die Effizienz und Produktivität zu maximieren.",
        ];
    }

    // Randomly select a message from the chosen category
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Hide the labels and show the message with results
    document.querySelector('.label-left').style.display = 'none';
    document.querySelector('.label-right').style.display = 'none';
    
    game.innerHTML = `
        <div class="card end-message">
            <p>${message}</p>
            <!-- <div class="results">
                <p>Sie verwenden <span id="using">${using}</span> der 10 vorgestellten KI-Systeme.</p> 
            </div>!-->
        </div>
    `;
}

function updateResults() {
    document.getElementById('using').textContent = using;
    document.getElementById('notUsing').textContent = notUsing;
}
