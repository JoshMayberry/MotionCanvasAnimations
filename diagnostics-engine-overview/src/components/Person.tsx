import {Circle, Layout, Node, NodeProps, Path, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {easeInOutCubic,} from '@motion-canvas/core/lib/tweening';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, delay} from '@motion-canvas/core/lib/flow';

export interface PersonProps extends NodeProps {
	job_path?: string,
	color_job?: string,
	color_idea?: string,
	color_skin?: string,
	color_shirt?: string,
}

type PersonPosition = "center" | "left" | "topLeft" | "top" | "topRight" | "right" | "bottomRight" | "bottom" | "bottomLeft";

export class Person extends Node {
	private color_job;
	private color_idea;
	private color_skin;
	private color_shirt;

	public readonly mainRef = createRef<Layout>();
	public readonly jobRef = createRef<Path>();
	public readonly ideaRef = createRef<Path>();
	public readonly headRef = createRef<Circle>();
	public readonly shirtRef = createRef<Rect>();

	private current_PersonPosition: PersonPosition;

	public constructor(props?: PersonProps) {
		super({ ...props });

		this.color_job = new Color(props?.color_job || "#242424");
		this.color_skin = new Color(props?.color_skin || "#ffdbac");
		this.color_idea = new Color(props?.color_skin || "#f9f390");
		this.color_shirt = new Color(props?.color_shirt || "#d1aeb1");

		this.current_PersonPosition = "center";

		this.add(
			<Layout ref={this.mainRef}>
				<Rect ref={this.shirtRef}
					width={200}
					height={80}
					fill={this.color_shirt}
					radius={10}
					y={120}
				/>
				<Circle ref={this.headRef} 
					width={200}
					height={200}
					fill={this.color_skin}
				/>
				<Path ref={this.jobRef}
					data={props?.job_path || ""}
					fill={this.color_job}
					scale={6}
					x={-70}
					y={-70}
				/>
				<Path ref={this.ideaRef}
					data={"M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"}
					fill={this.color_idea}
					scale={4}
					opacity={0}
					x={-50}
					y={-200}
				/>
			</Layout>
		);
	}

	public* hasIdea(duration: number = 0.5) {
		yield* all(
			this.ideaRef().opacity(1, duration/2),
			delay(duration/2, all(
				this.ideaRef().opacity(0, duration/2),
			)),
			this.ideaRef().y(-220, duration),
		)
	}
}