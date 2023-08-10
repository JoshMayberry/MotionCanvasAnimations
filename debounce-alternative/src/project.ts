import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import code from './scenes/code?scene';
import panelSignal from './scenes/panelSignal?scene';

export default makeProject({
  scenes: [panelSignal],
});
