// 3D Robot Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById('robot-container');

renderer.setSize(300, 300);
container.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

const loader = new THREE.GLTFLoader();
loader.load('/static/robot.glb', (gltf) => {
    const robot = gltf.scene;
    robot.scale.set(0.5, 0.5, 0.5);
    scene.add(robot);

    function animate() {
        requestAnimationFrame(animate);
        robot.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    animate();
}, undefined, (error) => {
    console.error('Fuck, robot loading broke:', error);
});

camera.position.z = 5;

// Typing Effect
function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Chat Logic
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById('chat-box');
    const typingArea = document.getElementById('typing-area');
    chatBox.innerHTML += `<p class="grok-text">You: ${message}</p>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            if (data.error) throw new Error(data.error);
            chatBox.innerHTML += `<p class="grok-text">Grok: ${data.response}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
            typeText(typingArea, data.response);
        })
        .catch(error => {
            console.error('Fetch fucked up:', error);
            chatBox.innerHTML += `<p class="grok-text">Fuck, something broke: ${error}</p>`;
            typingArea.innerHTML = 'Error, asshole.';
        });
}

document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});