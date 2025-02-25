document.addEventListener('DOMContentLoaded', () => {
    const bubbleWrap = document.getElementById('bubble-wrap');
    const popSound = document.getElementById('pop-sound');
    const messageBox = document.getElementById('message-box');
    const bubbleSizeInput = document.getElementById('bubbleSize');
    const bubbleFrequencyInput = document.getElementById('bubbleFrequency');
    const ideasText = document.getElementById("ideasText");
    const submitIdeas = document.getElementById("submitIdeas");
    const colorGrid = document.getElementById('colorGrid');
    const randomColorCheckbox = document.getElementById('randomColor');
    const maxBubbles = 30;
    const bubbleLifetime = 100000;
    const headerHeight = 60;
    let poppedCount = 0;
    let bubbleSize = parseInt(bubbleSizeInput.value, 10);
    let bubbleFrequency = parseInt(bubbleFrequencyInput.value, 10);
    let selectedColor = null;

    function createBubble() {
        if (bubbleWrap.children.length >= maxBubbles) return;
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.width = `${bubbleSize}px`;
        bubble.style.height = `${bubbleSize}px`;
        bubble.style.top = `${headerHeight + Math.random() * (window.innerHeight - headerHeight - bubbleSize)}px`;
        bubble.style.left = `${Math.random() * (window.innerWidth - bubbleSize)}px`;

        if (randomColorCheckbox.checked || !selectedColor) {
            bubble.style.backgroundColor = getRandomColor();
        } else {
            bubble.style.backgroundColor = selectedColor;
        }

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

    async function addNewComment(e) {
        e.preventDefault();
        let newComment = ideasText.value;

        try {
            const response = await fetch('http://localhost:3000/messages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inspiration: newComment })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            alert("New message added");
            ideasText.value = '';
            return ideasText.value;
        } catch (error) {
            console.error('Error posting the comment:', error);
        }
        alert("New message added");
    }

    submitIdeas.addEventListener("click", function (e) {
        addNewComment(e);
    });

    setInterval(createBubble, 500);

    bubbleSizeInput.addEventListener('input', (event) => {
        bubbleSize = parseInt(event.target.value, 10);
        console.log('Bubble Size Updated:', bubbleSize); // Debug line
    });

    bubbleFrequencyInput.addEventListener('input', (event) => {
        bubbleFrequency = parseInt(event.target.value, 10);
        console.log('Bubble Frequency Updated:', bubbleFrequency); // Debug line
        clearInterval(bubbleInterval);
        const maxInterval = 5000;
        const minInterval = 100;
        const interval = maxInterval - bubbleFrequency * (maxInterval - minInterval) / 100;
        bubbleInterval = setInterval(createBubble, interval);
    });

    const maxInterval = 5000;
    const minInterval = 100;
    let bubbleInterval = setInterval(createBubble, maxInterval - bubbleFrequency * (maxInterval - minInterval) / 100);

    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeControl = document.getElementById('volumeControl');

    const tracks = [
        'music/track1.mp3',
        'music/track2.mp3',
        'music/track3.mp3',
        'music/track4.mp3',
        'music/track5.mp3'
    ];
    let currentTrackIndex = 0;

    function loadTrack(index) {
        if (tracks[index]) {
            audioPlayer.src = tracks[index];
            audioPlayer.load();
        } else {
            console.error('Track not found: ', tracks[index]);
        }
    }

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            playPauseBtn.textContent = 'Pause';
            audioPlayer.loop = true;
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
            audioPlayer.loop = false;
        }
    });

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        playPauseBtn.textContent = 'Pause';
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        playPauseBtn.textContent = 'Pause';
    });

    volumeControl.addEventListener('input', (event) => {
        audioPlayer.volume = event.target.value;
    });

    loadTrack(currentTrackIndex);


    colorGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-option')) {
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            event.target.classList.add('selected');
            selectedColor = event.target.getAttribute('data-color');
            randomColorCheckbox.checked = false;
        }
    });

    randomColorCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            selectedColor = null;
        }
    });
});
