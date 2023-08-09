import './style.css'

const { viewui } = Object.fromEntries(window.location.search.replace('?', '').split('&').map(e => e.split('=')))
console.log(viewui)
if (viewui === undefined) {
  Promise.all(
    [
      import('./scene1/Render'),
      import('./ui/MainPage')
    ]
  ).then(([{ Render }]) => {
    console.log("Mounting ui")
    Render.initialize().then(Render.start)
  })
} else {
  Promise.all([import('./scene1/Render'), import("./scene1/Canvas")]).then(([{ Render }, { viewContext }]) => {
    const handleResize = () => {
      const [width, height] = [window.innerWidth, window.innerHeight]
      viewContext.size = [width, height]
    }

    window.addEventListener('resize', handleResize)
    Render.initialize().then(Render.start)
    handleResize()
  })
}

