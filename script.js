const AppState = {
    musicPlayed: false,
    modalOpen: false,
    canInteract: true
};

const DOM = {
    get openBtn() { return document.getElementById('openLetterBtn'); },
    get modal() { return document.getElementById('modal'); },
    get closeBtn() { return document.querySelector('.close-btn'); },
    get replayBtn() { return document.getElementById('replayBtn'); },
    get envelope() { return document.getElementById('envelope'); },
    get letter() { return document.getElementById('letter'); },
    get bgMusic() { return document.getElementById('bgMusic'); },
    get floatingHearts() { return document.querySelectorAll('.floating-hearts span'); }
};

const Events = {
    handlePlayMusic() {
        if (AppState.musicPlayed) return;
        AppState.musicPlayed = true;
        
        DOM.bgMusic.play().catch(e => {
            console.warn("Audio autoplay blocked by browser policy");
        });
        
        window.removeEventListener('click', Events.handlePlayMusic);
        window.removeEventListener('touchstart', Events.handlePlayMusic);
    },

    handleOpenLetter() {
        if (!AppState.canInteract) return;
        
        AppState.canInteract = false;
        DOM.letter.classList.add('opened');
        DOM.envelope.classList.add('opened');
        DOM.openBtn.disabled = true;
        DOM.openBtn.setAttribute('aria-busy', 'true');

        // Trigger floating hearts on click
        Effects.celebrateOpening();

        setTimeout(() => {
            DOM.modal.showModal();
            AppState.modalOpen = true;
            DOM.modal.classList.add('active');
        }, 800);
    },

    handleCloseModal() {
        DOM.modal.classList.remove('active');
        setTimeout(() => {
            DOM.modal.close();
            AppState.modalOpen = false;
            DOM.openBtn.disabled = false;
            DOM.openBtn.setAttribute('aria-busy', 'false');
            AppState.canInteract = true;
        }, 300);
    },

    handleReplayMusic() {
        DOM.bgMusic.currentTime = 0;
        DOM.bgMusic.play().catch(e => {
            console.warn("Could not replay audio");
        });
    },

    handleKeyboard(e) {
        if (e.key === 'Escape' && AppState.modalOpen) {
            Events.handleCloseModal();
        }
    }
};

const Effects = {
    celebrateOpening() {
        // Add subtle animation to floating hearts
        DOM.floatingHearts.forEach((heart, index) => {
            setTimeout(() => {
                heart.style.animation = 'none';
                setTimeout(() => {
                    heart.style.animation = '';
                }, 10);
            }, index * 50);
        });
    }
};

const UI = {
    initFloatingHearts() {
        DOM.floatingHearts.forEach((heart, index) => {
            const delayValue = heart.style.getPropertyValue('--delay') || `${index * 0.3}s`;
            heart.style.setProperty('--delay', delayValue);
        });
    },

    setupEventListeners() {
        DOM.openBtn.addEventListener('click', Events.handleOpenLetter);
        DOM.closeBtn.addEventListener('click', Events.handleCloseModal);
        DOM.replayBtn.addEventListener('click', Events.handleReplayMusic);
        
        window.addEventListener('click', Events.handlePlayMusic);
        window.addEventListener('touchstart', Events.handlePlayMusic);
        document.addEventListener('keydown', Events.handleKeyboard);
    },

    init() {
        this.initFloatingHearts();
        this.setupEventListeners();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
