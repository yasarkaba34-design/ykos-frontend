function animateFlux(ctx) {
  const particles = [];
  const particleCount = 40;

  // Akış hattı boyunca partikül oluştur
  flowLines.forEach(line => {
    const start = atlasCoords[line.from];
    const end = atlasCoords[line.to];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: start.x + 60,
        y: start.y + 60,
        dx: (end.x - start.x) / particleCount,
        dy: (end.y - start.y) / particleCount,
        color: line.color,
        progress: i / particleCount,
      });
    }
  });

  function drawParticles() {
    ctx.clearRect(0, 0, 1000, 600);
    drawFlowLines(ctx);
    particles.forEach(p => {
      p.x += p.dx * 0.5;
      p.y += p.dy * 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      if (p.x > 1000 || p.y > 600) {
        p.x = 0;
        p.y = 0;
      }
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}
