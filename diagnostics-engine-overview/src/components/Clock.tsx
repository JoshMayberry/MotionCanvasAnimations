import {Circle, Layout, Line, Node, NodeProps, Path, Rect} from '@motion-canvas/2d/lib/components';
import {map, tween} from '@motion-canvas/core/lib/tweening';
import {Color} from '@motion-canvas/core/lib/types/Color';
import { Block } from './Block';
import {createRef} from '@motion-canvas/core/lib/utils';

export interface ClockProps extends NodeProps {
	color_block?: string,
	color_path?: string,
}

export class Clock extends Node {
	public color_block;
	public color_path;

	public readonly mainRef = createRef<Layout>();
	public readonly blockRef = createRef<Block>();
	public readonly pathRef = createRef<Path>();

	public constructor(props?: ClockProps) {
		super({ ...props });

		this.color_path = new Color(props?.color_path || "#1E1E1F");
		this.color_block = new Color(props?.color_block || "#6D6C70");

		this.add(
			<Layout ref={this.mainRef}>
                <Block ref={this.blockRef}
                    width={150}
                    height={150}
                    color_blockFill={props?.color_block}
                    radius={10}
                />
                <Circle
                    fill={this.color_path}
                    height={130}
                    width={130}
                />
                <Circle
                    fill={this.color_block}
                    height={100}
                    width={100}
                />
                <Line ref={this.pathRef}
                    lineWidth={16}
                    stroke={this.color_path}
                    points={[[0, 0], [0, -40]]}
                />
            </Layout>
		);
	}

    public* turnClock(revolution_count:number = 1, revolution_time:number = 5) {
        this.pathRef().rotation(0);

        yield* tween(revolution_time * revolution_count, (percentage) => {
			this.pathRef().rotation(map(0, 360 * revolution_count, percentage))
		});
    }
}