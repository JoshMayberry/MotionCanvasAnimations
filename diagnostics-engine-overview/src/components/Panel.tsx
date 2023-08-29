import {Node, Rect} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';
import { Block, BlockProps } from './Block';

export interface PanelProps extends BlockProps {
}

export class Panel extends Node {
	public readonly mainRef = createRef<Block>();
  
	public readonly blockRef = createRef<Rect>();

	public constructor(props?: PanelProps) {
		super({ ...props });

		this.add(
			<Block ref={this.mainRef}
				{...props}
				mode="with_fill"
				fill_offset={30}
				width={props?.width || 300}
				height={props?.height || 200}
				path="M 8.9316406,0 C 8.7311806,5.1181115e-4 8.538436,0.07733028 8.3925781,0.21484375 L 0.50390625,7.5742188 C 0.18279408,7.8746594 3.8344682e-4,8.294628 0,8.734375 v 10.025391 c 3.9968491e-4,0.438542 0.35638042,0.793648 0.79492188,0.792968 H 17.068359 c 0.437779,-3.99e-4 0.79257,-0.355189 0.792969,-0.792968 V 8.734375 C 17.861485,8.2939489 17.67903,7.8731703 17.357422,7.5722656 L 9.4726562,0.21484375 C 9.3262766,0.07691599 9.1327651,7.0278287e-5 8.9316406,0 Z m 0,4.8730469 5.1562504,4.8125 V 15.773438 H 3.7753906 V 9.6855469 Z M 21.556418,15.757812 c -1.037697,-1.2e-5 -1.878919,0.84121 -1.878906,1.878907 -1.3e-5,1.037696 0.841209,1.878918 1.878906,1.878906 1.037696,1.3e-5 1.878919,-0.841209 1.878907,-1.878906 1.3e-5,-1.037697 -0.84121,-1.87892 -1.878907,-1.878907 z"
				path_offsetX={80}
				path_offsetY={35}
				path_scale={2}
			/>
		);

		this.blockRef = this.mainRef().blockRef;
	}
}