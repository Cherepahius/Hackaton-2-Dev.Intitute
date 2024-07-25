document.addEventListener('DOMContentLoaded', () => {
    const bubbleWrap = document.getElementById('bubble-wrap');
    const popSound = document.getElementById('pop-sound');
    const messageBox = document.getElementById('message-box');
    const maxBubbles = 15;
    const bubbleLifetime = 100000;
    let poppedCount = 0;

    const phrases = [
        "You can do it!",
        "Popping like a pop star!",
        "You popped more than a human pops in a lifetime!",
        "Keep going, you're doing great!",
        "Pop till you drop!",
        "Bubble popping master!",
        "Amazing popping skills!",
        "You're on fire!",
        "Unstoppable popper!",
        "Bubble wrap champion!"
    ];


    function createBubble() {
        if (bubbleWrap.children.length >= maxBubbles) return;

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        bubble.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        bubble.style.backgroundColor = getRandomColor();
        bubble.addEventListener('click', () => popBubble(bubble));

        bubbleWrap.appendChild(bubble);


        setTimeout(() => {
            if (bubble.parentElement) {
                bubbleWrap.removeChild(bubble);
            }
        }, bubbleLifetime);
    }


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    function popBubble(bubble) {
        if (!bubble.classList.contains('popped')) {
            bubble.classList.add('popped');
            popSound.currentTime = 0;
            popSound.play();

            poppedCount++;
            checkPoppedCount();


            setTimeout(() => {
                if (bubble.parentElement) {
                    bubbleWrap.removeChild(bubble);
                }
            }, 100);
        }
    }


    async function checkPoppedCount() {
        if (poppedCount % 10 === 0) {
            try {
                const response = await fetch('http://localhost:3000/messages');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const phrases = await response.json();
                const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)].inspiration;
                displayMessage(randomPhrase);
            } catch (error) {
                console.error('Error fetching phrases from the API:', error);
            }
        }
    }


    function displayMessage(message) {
        messageBox.textContent = message;
        messageBox.style.display = 'flex';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 2000);
    }


    setInterval(createBubble, 500);
});
