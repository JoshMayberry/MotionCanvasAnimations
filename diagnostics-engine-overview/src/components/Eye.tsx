import {Layout, Node, NodeProps, Path, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {easeInOutCubic,} from '@motion-canvas/core/lib/tweening';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, delay} from '@motion-canvas/core/lib/flow';

export interface EyeProps extends NodeProps {
	color_eye?: string,
}

type EyePosition = "center" | "left" | "topLeft" | "top" | "topRight" | "right" | "bottomRight" | "bottom" | "bottomLeft";

export class Eye extends Node {
	private color_eye;

	public readonly mainRef = createRef<Layout>();
	public readonly eyeBodyRef = createRef<Path>();
	public readonly eyePupilRef = createRef<Path>();

	private current_eyePosition: EyePosition;

	public constructor(props?: EyeProps) {
		super({ ...props });

		this.color_eye = new Color(props?.color_eye || "#1E1E1F");

		this.current_eyePosition = "center";

		this.add(
			<Layout ref={this.mainRef}>
				<Path ref={this.eyeBodyRef}
					scale={5}
					fill={this.color_eye}
					data={"M 12,4.5 C 7,4.5 2.73,7.61 1,12 c 1.73,4.39 6,7.5 11,7.5 5,0 9.27,-3.11 11,-7.5 C 21.27,7.61 17,4.5 12,4.5 Z M 12,17 C 9.24,17 7,14.76 7,12 7,9.24 9.24,7 12,7 c 2.76,0 5,2.24 5,5 0,2.76 -2.24,5 -5,5 z"}
				/>
				<Path ref={this.eyePupilRef}
					scale={5}
					fill={this.color_eye}
					data={"M 14.871429,12.043987 A 2.814286,2.9582725 0 0 1 12.057143,15.00226 2.814286,2.9582725 0 0 1 9.2428572,12.043987 2.814286,2.9582725 0 0 1 12.057143,9.0857148 2.814286,2.9582725 0 0 1 14.871429,12.043987 Z"}
				/>
			</Layout>
		);

	}

	public* eyeLook(position:EyePosition = "center", duration: number = 0.2) {
		if (position == this.current_eyePosition) {
			return;
		}

		if (this.current_eyePosition != "center") {
			yield* all(
				this.eyePupilRef().x(0, duration),
				this.eyePupilRef().y(0, duration),
			);
		}

		this.current_eyePosition = position;
		switch (position) {
			case "center":
				yield* all(
					this.eyePupilRef().x(0, duration),
					this.eyePupilRef().y(0, duration),
				);
				return;

			case "left":
				yield* this.eyePupilRef().x(-10, duration);
				return;
			
			case "topLeft":
				yield* all(
					this.eyePupilRef().x(-10, duration),
					this.eyePupilRef().y(-5, duration),
				);
				return;

			case "top":
				yield* this.eyePupilRef().y(-10, duration);
				return;
			
			case "topRight":
				yield* all(
					this.eyePupilRef().x(10, duration),
					this.eyePupilRef().y(-5, duration),
				);
				return;
			
			case "right":
				yield* all(
					this.eyePupilRef().x(10, duration),
				);
				return;
			
			case "bottomRight":
				yield* all(
					this.eyePupilRef().x(10, duration),
					this.eyePupilRef().y(5, duration),
				);
				return;

			case "bottom":
				yield* this.eyePupilRef().y(10, duration);
				return;
			
			case "bottomLeft":
				yield* all(
					this.eyePupilRef().x(-10, duration),
					this.eyePupilRef().y(5, duration),
				);
				return;

			default:
				throw `Unknown eye position '${position}'`;
		}
	}
}