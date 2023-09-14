import {makeProject} from '@motion-canvas/core';

import innovationPhoto from './scenes/innovation-photo?scene';
import innovationPhotoWhy from './scenes/innovation-photo-why?scene';

export default makeProject({
  scenes: [innovationPhotoWhy, innovationPhoto],
});
