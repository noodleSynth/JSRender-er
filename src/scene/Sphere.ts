import { mutateRenderNode } from "../node/RenderNode.type";
import { spawnSeedNode } from "../node/SeedNode.type";
import { viewport } from "./ViewPort";

const particles: {
  spawnTime: number,
  deviation: number,
}[] = []

const maxAge = 2
const distance = 1000
const maxParticles = 25
var generatorLife = 0

export const SphereNode = mutateRenderNode(spawnSeedNode("Sphere", () => {

}), (delta) => {

  // Time
  generatorLife += (generatorLife + delta)
  if (generatorLife > 10) generatorLife = 0

  // Life
  if(!(generatorLife % 5) && particles.length < maxParticles)
    particles.push({
      spawnTime: Date.now(),
      deviation: Math.random() - 0.5 
    })
  
  // Render Prep
  const draw = viewport.draw
  draw.fillStyle = "#FF0000"
  draw.strokeStyle = "#0000FF"
  
  // Each dot
  particles.forEach((p, i) => {
    // Lifespan
    const age = (Date.now() - p.spawnTime) / 1000

    // Death
    if(age > maxAge)
      return particles.splice(i, 1)
    
    // Position
    const xvar = (distance * (age / maxAge) * p.deviation)
    const yvar = 100 * Math.sin((age/(maxAge / 10)))

    // Colours
    const rgb = [Math.sin((age / (maxAge))), Math.cos((age / (maxAge))), Math.tan((age / (maxAge) - 0.5))]
    rgb.forEach((og, i) => rgb[i] = Math.round(Math.abs(og) * 255))
    draw.fillStyle = `#${rgb.map(c => c.toString(16)).join('')}`

    // Draw
    draw.beginPath();
    draw.ellipse(1000 + xvar, 200 + yvar, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
    draw.stroke();
    draw.fill();
  })

}, undefined)