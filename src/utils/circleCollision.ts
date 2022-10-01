interface Circle {
  x: number
  y: number
  radius: number
}

export default function isColliding(circle1: Circle, circle2: Circle) {
  const distX = circle1.x + circle1.radius - (circle2.x + circle2.radius)
  const distY = circle1.y + circle1.radius - (circle2.y + circle2.radius)
  const distance = Math.sqrt(distX * distX + distY * distY)
  return distance <= circle1.radius + circle2.radius
}
