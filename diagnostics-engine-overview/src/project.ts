import {makeProject} from '@motion-canvas/core';

import zoomOut1 from './scenes/zoom-out-1?scene';
import engineDetail from './scenes/engine-detail?scene';

export default makeProject({
  scenes: [zoomOut1, engineDetail],
});
