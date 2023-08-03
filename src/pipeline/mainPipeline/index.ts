import { cameraInjector } from './Camera'
import { rootInjector } from './MainPipeline'
import { mapInjector } from './Map'
import { playerInjector } from './Player'

export { mapInjector } from './Map'

const ROOT_INJECTOR = rootInjector()
const MAP_INJECTOR = mapInjector()
const PLAYER_INJECTOR = playerInjector()

MAP_INJECTOR.children.push(PLAYER_INJECTOR)

// ROOT_INJECTOR.children.push(cameraInjector())
ROOT_INJECTOR.children.push(MAP_INJECTOR)

export default ROOT_INJECTOR