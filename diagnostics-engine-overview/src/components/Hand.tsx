import {Layout, Node, NodeProps, Path} from '@motion-canvas/2d/lib/components';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';

export interface HandProps extends NodeProps {
	color_block?: string,
	color_path?: string,
}

export class Hand extends Node {
	public color_block;
	public color_path;

	public readonly mainRef = createRef<Layout>();
	public readonly fingerRef = createRef<Path>();
	public readonly touchRef = createRef<Path>();

	public constructor(props?: HandProps) {
		super({ ...props });

		this.color_block = new Color(props?.color_block || "#6D6C70");
		this.color_path = new Color(props?.color_path || "#1E1E1F");

		this.add(
			<Layout ref={this.mainRef}>
				<Path ref={this.fingerRef}
					fill="#C68D64"
					data={"M 18.84,15.87 14.3,13.61 C 14.13,13.54 13.95,13.5 13.76,13.5 H 13 v -6 C 13,6.67 12.33,6 11.5,6 10.67,6 10,6.67 10,7.5 V 18.24 C 6.4,17.48 6.46,17.49 6.33,17.49 c -0.31,0 -0.59,0.13 -0.79,0.33 l -0.79,0.8 4.94,4.94 C 9.96,23.83 10.34,24 10.75,24 h 6.79 c 0.75,0 1.33,-0.55 1.44,-1.28 l 0.75,-5.27 c 0.01,-0.07 0.02,-0.14 0.02,-0.2 0,-0.62 -0.38,-1.16 -0.91,-1.38 z"}
					scale={10}
					x={-120}
					y={-60}
				/>
				<Path ref={this.touchRef}
					fill="#2196f3"
					data={"M 9,11.24 V 7.5 C 9,6.12 10.12,5 11.5,5 12.88,5 14,6.12 14,7.5 v 3.74 C 15.21,10.43 16,9.06 16,7.5 16,5.01 13.99,3 11.5,3 9.01,3 7,5.01 7,7.5 c 0,1.56 0.79,2.93 2,3.74 z"}
					scale={10}
					x={-120}
					y={-60}
					opacity={0}
				/>
			</Layout>
		);
	}

	
}