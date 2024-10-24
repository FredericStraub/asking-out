const gif = document.getElementById('gif');
const question = document.querySelector('.question');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

noButton.addEventListener('click', () => {
  // Move the "No" button to a random position
  const maxX = window.innerWidth - noButton.offsetWidth;
  const maxY = window.innerHeight - noButton.offsetHeight;

  noButton.style.position = 'absolute';
  noButton.style.left = `${Math.random() * maxX}px`;
  noButton.style.top = `${Math.random() * maxY}px`;
});

yesButton.addEventListener('click', () => {
  // Transform text and buttons
  question.textContent = "❤️ YAAAAY ❤️";
  yesButton.textContent = "Ich überleg mir was cooles c:";
  yesButton.style.pointerEvents = 'none'; // Disable further clicks
  noButton.style.display = 'none';

  // Change the GIF image
  gif.src = 'https://i.pinimg.com/originals/90/c5/5f/90c55f5ae837a02d9d4080cc32a04782.gif';

  // Create multiple small hearts
  createHearts();

  // Send message via server-side script
  sendTelegramMessage();
});

function sendTelegramMessage() {
  fetch('/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Bella clicked Yes on your website and wants a date with you!'
    })
  })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function createHearts() {
  const numberOfHearts = 50; // Adjust the number of hearts as desired

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('small-heart');

    // Random size between 10px and 30px
    const size = Math.random() * 20 + 10;
    heart.style.setProperty('--heart-size', `${size}px`);

    // Apply the size to the heart element
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // Random horizontal position
    heart.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 5 + 5; // Between 5s and 10s
    const delay = Math.random() * 5;        // Between 0s and 5s

    heart.style.animation = `floatUpSlowly ${duration}s ease-in ${delay}s forwards`;

    // Random color (shades of pink and red)
    const colors = ['#ff6b6b', '#ff8e72', '#ffb28b', '#ffc1a1', '#ffd0b6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.setProperty('--heart-color', color);

    document.body.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }
}