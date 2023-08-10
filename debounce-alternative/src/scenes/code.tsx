import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef} from '@motion-canvas/core/lib/utils';
import {
  CodeBlock,
  edit,
  insert,
  lines,
  range,
  word,
  remove,
} from '@motion-canvas/2d/lib/components/CodeBlock';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {DEFAULT, useLogger} from '@motion-canvas/core';

import {Switch} from '../components/Switch';

export default makeScene2D(function* (view) {
  const logger = useLogger();
  const codeRef = createRef<CodeBlock>();
  const switchRef = createRef<Switch>();

  view.add(
    <>
        <CodeBlock
            language="c#"
            ref={codeRef}
            code={`var myBool;`}
        />
        <Switch
            ref={switchRef}
            initialState={true}
            top={codeRef().bottom}
            opacity={0}
        />
    </>,
  );

  view.fill('#242424'); // set the background of this scene

  yield* all(
    switchRef().opacity(1, 1),
    codeRef().edit(1.2, false)`var myBool${insert(' = true')};`,
  );
  yield* all(
    switchRef().toggle(0.6),
    codeRef().edit(1.2)`var myBool = ${edit('true', 'false')};`,
  );
  yield* all(
    switchRef().opacity(0, 1),
    all(
        codeRef().selection(lines(0, Infinity), 1.2),
        codeRef().edit(1.2, false)`var my${edit('Bool', 'Number')} = ${edit(
        'false',
        '42',
        )};`,
    ),
  );
  yield* waitFor(0.6);
  yield* codeRef().edit(1.2, false)`var myNumber${remove(' = 42')};`;
  yield* waitFor(0.6);
  yield* codeRef().edit(1.2, false)`var my${edit('Number', 'Bool')};`;
  yield* waitFor(0.6);
});