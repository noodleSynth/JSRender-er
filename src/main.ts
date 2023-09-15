import './style.css'

const { viewui } = Object.fromEntries(window.location.search.replace('?', '').split('&').map(e => e.split('=')))

if (viewui === undefined) {
  import('./harness/PuppeteerHarness').then((module) => {
    module.default()
  })
} else {
  import('./harness/ClientHarness').then((module) => {
    module.default()
  })
  // Promise.all([, import("./scene1/Canvas")]).then(([{ Render }, { viewContext }]) => {
  //   const handleResize = () => {
  //     const [width, height] = [window.innerWidth, window.innerHeight]
  //     viewContext.size = [width, height]
  //   }

  //   window.addEventListener('resize', handleResize)
  //   Render.initialize().then(Render.start)
  //   handleResize()
  // })
}

