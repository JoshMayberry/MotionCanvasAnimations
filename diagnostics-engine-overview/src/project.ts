import {makeProject} from '@motion-canvas/core';

import combined from './scenes/combined?scene';
import engineClients from './scenes/engine-clients?scene';

export default makeProject({
  // scenes: [combined],
  scenes: [engineClients],
});
