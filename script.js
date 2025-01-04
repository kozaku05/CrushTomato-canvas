/** @type {HTMLCanvasElement} */
function draw() {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    const ctx = canvas.getContext("2d");
    const tomato = new Image();
    tomato.src = "tomato.png";
    const crushTomato = new Image();
    crushTomato.src = "Crush-tomato.png";
    let positions = [];
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        positions.push({ x, y, speed: 4, isCrush: false });
    });
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        positions.forEach(pos => {
            if (!pos.isCrush) {
                pos.y += pos.speed;
                if (pos.y + 40 >= canvas.height) {
                    pos.isCrush = true;
                }
            }
            if (pos.isCrush) {
                ctx.drawImage(crushTomato, pos.x, canvas.height - 40, 50, 40);
            } else {
                ctx.drawImage(tomato, pos.x, pos.y, 50, 40);
            }
        });
        requestAnimationFrame(animate);
    }
    tomato.onload = () => {
        animate();
    };
}
draw();
