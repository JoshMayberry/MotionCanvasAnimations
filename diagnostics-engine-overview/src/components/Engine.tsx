import {Layout, Node, NodeProps, Path, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {easeInOutCubic,} from '@motion-canvas/core/lib/tweening';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, delay} from '@motion-canvas/core/lib/flow';
import { Eye, EyeProps, EyePosition } from './Eye';

type EngineMode = "no_block" | "with_block"

export interface EngineProps extends EyeProps {
	color_block?: string,
	color_gear?: string,
	mode?: EngineMode,
	showLabel?: boolean,
}

export class Engine extends Node {
	private color_block;
	private color_gear;

	public readonly mainRef = createRef<Layout>();
	public readonly blockRef = createRef<Rect>();
	public readonly gearRef = createRef<Layout>();
	public readonly gearBodyRef = createRef<Path>();
	public readonly eyeRef = createRef<Eye>();
	public readonly label1Ref = createRef<Txt>();
	public readonly label2Ref = createRef<Txt>();

	private current_mode: EngineMode;

	public constructor(props?: EngineProps) {
		super({ ...props });

		this.color_block = new Color(props?.color_block || "#6D6C70");
		this.color_gear = new Color(props?.color_gear || "#A2A1A6");

		this.current_mode = props?.mode || "with_block";

		this.add(
			<Layout ref={this.mainRef}>
				<Rect ref={this.blockRef}
					width={150}
					height={150}
					fill={this.color_block}
					radius={10}
				/>
				<Layout
					x={-60}
					y={-60}
				>
					<Layout
						x={60}
						y={60}
					>
						<Layout ref={this.gearRef} >
							<Path ref={this.gearBodyRef}
								fill={this.color_gear}
								data={"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"}
								scale={7}
								x={-84}
								y={-84}
							/>
						</Layout>
						<Layout
							top={this.blockRef().bottom}
						>
							<Txt ref={this.label1Ref}
								fill={this.color_gear}
								text={props?.showLabel ? "Diagnostics" : ""}
								fontSize={30}
								y={30}
							/>
							<Txt ref={this.label2Ref}
								fill={this.color_gear}
								text={props?.showLabel ? "Engine" : ""}
								fontSize={30}
								y={65}
							/>
						</Layout>
					</Layout>
					<Eye ref={this.eyeRef} color_eye={props.color_eye}/>
				</Layout>
			</Layout>
		);

		if (this.current_mode != "with_block") {
			switch (this.current_mode) {
				
				case "no_block":
					this.blockRef().opacity(0);
					this.gearBodyRef().fill(this.color_block);
					break;
	
				default:
					throw `Unknown mode '${this.current_mode}'`;
	
			}
		}
	}

	public* changeMode(mode:EngineMode = "with_block", duration: number = 0.3) {
		if (this.current_mode == mode) {
			return;
		}

		switch (mode) {
			case "with_block":
				yield* all(
					this.blockRef().opacity(1, duration),
					this.gearBodyRef().fill(this.color_gear, duration),
				);
				break;

			case "no_block":
				yield* all(
					this.blockRef().opacity(0, duration),
					this.gearBodyRef().fill(this.color_block, duration),
				);
				break;

			default:
				throw `Unknown mode '${mode}'`;

		}

		this.current_mode = mode;
	}

	public* eyeLook(position:EyePosition = "center", duration: number = 0.2) {
		yield* this.eyeRef().eyeLook(position, duration);
	}

	public* gearSpin(duration:number = 2) {
		this.gearRef().rotation(0);
		yield* this.gearRef().rotation(easeInOutCubic(1) * 360, duration);
	}

	public* showLabel(duration:number = 1, textTop:string = "Diagnostics", textBottom:string = "Engine") {
		yield* all(
			this.label1Ref().text(textTop, duration),
			delay(duration/2, this.label2Ref().text(textBottom, duration)),
		);
	}

	public* hideLabel(duration:number = 1) {
		yield* all(
			this.label1Ref().text("", duration),
			delay(duration/2, this.label2Ref().text("", duration)),
		);
	}
}