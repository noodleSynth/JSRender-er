
import { useControlRegistry } from '../core/control/Control.type'
import controlsContainer from './Controls'
import previewContainer from './Preview'
import './styles.scss'

import { Render } from "../scene1/Render";
import { uiInjector } from "./UiInjector";


Render.children.push(uiInjector)