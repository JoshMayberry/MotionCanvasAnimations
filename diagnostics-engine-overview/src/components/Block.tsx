import {Img, Layout, Node, NodeProps, Path, Rect, Txt} from '@motion-canvas/2d/lib/components';
import { ReferenceReceiver, SignalValue, Vector2, all, sequence, delay } from '@motion-canvas/core';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';

type BlockMode = "no_fill" | "with_fill"
type BlockStatus = "yes" | "no" | "unknown"
type FadeDirection = "none" | "up" | "down" | "left" | "right"

export interface BlockProps extends NodeProps {
	willFadeIn?: boolean,
	color_block?: string,
	color_blockFill?: string,
	color_path?: string,
	color_label?: string,
	color_status?: Record<BlockStatus,string>,
	src?: SignalValue<string>,
	src_scale?: number,
	text?: string,
	label?: string,
	labelTop?: string, // Alias for label
	labelBottom?: string,
	path?: string,
	pathAnimate?: string,
	mode?: BlockMode
	width?: number,
	height?: number,
	radius?: number,
	radius_fill?: number,
	fill_offset?: number,
	status_offset?: number,
	status_scale?: number,
	path_scale?: number,
	path_offset?: number,
	path_offsetX?: number,
	path_offsetY?: number,
	path_opacity?: number,
	text_fontSize?: number,
	text_offset?: number,
	label_fontSize?: number,
	label_offset?: number,
}

export class Block extends Node {
	public color_block;
	public color_blockFill;
	public color_path;
	public color_label;
	public color_status: Record<BlockStatus,Color>;

	public readonly mainRef = createRef<Layout>();
	public readonly blockRef = createRef<Rect>();
	public readonly blockFillRef = createRef<Img>();
	public readonly textRef = createRef<Txt>();
	public readonly labelRef = createRef<Txt>();
	public readonly labelTopRef = this.labelRef; // Alias for labelRef
	public readonly labelBottomRef = createRef<Txt>();
	public readonly pathRef = createRef<Path>();
	public readonly pathAnimateRef = createRef<Path>();
	public readonly pathStatusRef = createRef<Path>();

	public constructor(props?: BlockProps) {
		super({ ...props });

		this.color_block = new Color(props?.color_block || "#6D6C70");
		this.color_blockFill = new Color(props?.color_blockFill || "#A2A1A6");
		this.color_path = new Color(props?.color_path || "#1E1E1F");
		this.color_label = new Color(props?.color_label || this.color_blockFill);
		this.color_status = {
			"no": new Color(props?.color_status?.no || "#f99096"),
			"yes": new Color(props?.color_status?.yes || "#96f990"),
			"unknown": new Color(props?.color_status?.unknown || "#90caf9"),
		}

		const label_fontSize = props?.label_fontSize || 30;
		const status_scale = props?.status_scale || 2;
		const src_scale = props?.src_scale || 1;

		this.add(
			<Layout ref={this.mainRef}
				opacity={props?.willFadeIn ? 0 : 1}
			>
				<Rect ref={this.blockRef}
					width={(props?.width != null) ? props.width : ((props?.src != null) ? (() => this.blockFillRef().naturalSize().x * src_scale) : 150)}
					height={(props?.height != null) ? props.height : ((props?.src != null) ? (() => this.blockFillRef().naturalSize().y * src_scale) : 150)}
					fill={this.color_block}
					radius={props?.radius ?? 10}
				/>
				{(props?.src == null) ? (
					<Rect ref={this.blockFillRef}
						width={() => this.blockRef().width() - (props?.fill_offset ?? 20)}
						height={() => this.blockRef().height() - (props?.fill_offset ?? 20)}
						fill={this.color_blockFill}
						radius={props?.radius_fill ?? props?.radius ?? 10}
						opacity={(props?.mode == "with_fill") ? 1 : 0}
					/>
				) : (
					<Img ref={this.blockFillRef}
						width={() => this.blockRef().width() - (props?.fill_offset ?? 20)}
						height={() => this.blockRef().height() - (props?.fill_offset ?? 20)}
						fill={this.color_blockFill}
						radius={props?.radius_fill ?? props?.radius ?? 10}
						opacity={1}
						src={props?.src}
					/>
				)}
				
				<Txt ref={this.textRef}
					fill={this.color_path}
					text={props?.text || ""}
					fontSize={props?.text_fontSize || 100}
					y={props?.text_offset ?? 10}
				/>
				<Layout
					top={this.blockRef().bottom}
				>
					<Txt  ref={this.labelTopRef}
						fill={this.color_label}
						text={props?.label || props?.labelBottom || ""}
						fontSize={label_fontSize}
						y={label_fontSize + (props?.label_offset || 0)}
					/>
					<Txt  ref={this.labelBottomRef}
						fill={this.color_label}
						text={props?.labelTop || ""}
						fontSize={label_fontSize}
						top={this.labelTopRef().bottom}
					/>
				</Layout>
				<Path ref={this.pathRef}
					fill={this.color_path}
					data={props?.path || ""}
					scale={props?.path_scale || 5}
					x={props?.path_offset ?? props?.path_offsetX ?? -60}
					y={props?.path_offset ?? props?.path_offsetY ?? -60}
					opacity={props?.path_opacity ?? 1}
				/>
				<Path ref={this.pathAnimateRef}
					fill={this.color_path}
					data={props?.pathAnimate || ""}
					scale={props?.path_scale || 5}
					x={props?.path_offset ?? props?.path_offsetX ?? -60}
					y={props?.path_offset ?? props?.path_offsetY ?? -60}
					opacity={props?.path_opacity ?? 1}
				/>
				
				<Path ref={this.pathStatusRef}
					scale={status_scale}
					x={() => this.blockRef().width()/2 - 20 * status_scale - (props?.status_offset ?? 5)}
					y={() => -this.blockRef().height()/2 - 0 + (props?.status_offset ?? 5)}
					data=""
				/>
			</Layout>
		);
	}

	public* pathOpacity(value:number, duration:number=0.5) {
		yield* all(
			this.pathRef().opacity(value, duration),
			this.pathAnimateRef().opacity(value, duration),
		);
	}

	// status draws a check mark, x, or question mark in the top right corner
	public* status(status:BlockStatus, duration:number=0.5) {
		var path:string;
		switch (status) {
			case "yes":
				path = "M 7,12.2 2.8,8 1.4,9.4 7,15 19,3 17.6,1.6 Z"
				break;
			case "no":
				path = "M 19,2.41 17.59,1 12,6.59 6.41,1 5,2.41 10.59,8 5,13.59 6.41,15 12,9.41 17.59,15 19,13.59 13.41,8 Z"
				break;
			case "unknown":
				path = "m 13.07,10.85 c 0.77,-1.39 2.25,-2.21 3.11,-3.44 0.91,-1.29 0.4,-3.7 -2.18,-3.7 -1.69,0 -2.52,1.28 -2.87,2.34 L 8.54,4.96 C 9.25,2.83 11.18,1 13.99,1 c 2.35,0 3.96,1.07 4.78,2.41 0.7,1.15 1.11,3.3 0.03,4.9 -1.2,1.77 -2.35,2.31 -2.97,3.45 -0.25,0.46 -0.35,0.76 -0.35,2.24 h -2.89 c -0.01,-0.78 -0.13,-2.05 0.48,-3.15 z M 16,18 c 0,1.1 -0.9,2 -2,2 -1.1,0 -2,-0.9 -2,-2 0,-1.1 0.9,-2 2,-2 1.1,0 2,0.9 2,2 z"
				break;
			default:
				throw `Unknown status ${status}`
		}

		this.pathStatusRef().start(0);
		this.pathStatusRef().end(0);
		this.pathStatusRef().data(path),
		this.pathStatusRef().lineWidth(1);

		yield* sequence(duration/2,
			all(
				this.pathStatusRef().end(1, duration),
				this.pathStatusRef().stroke(this.color_status[status], duration),
			),
			sequence(duration/3,
				this.pathStatusRef().fill(this.color_status[status], duration),
				this.pathStatusRef().lineWidth(0, duration),
			),
		);
	}

	public* fadeIn(direction:FadeDirection="up", distance:number=100, duration:number=0.5) {
		const threadList = [];
		switch (direction) {
			case "none":
				break;

			case "up":
				this.mainRef().y(distance);
				threadList.push(this.mainRef().y(0, duration))
				break;

			case "down":
				this.mainRef().y(-distance);
				threadList.push(this.mainRef().y(0, duration))
				break;
				
			case "left":
				this.mainRef().x(distance);
				threadList.push(this.mainRef().x(0, duration))
				break;

			case "right":
				this.mainRef().x(-distance);
				threadList.push(this.mainRef().x(0, duration))
				break;
		}

		yield* all(
			...threadList,
			this.mainRef().opacity(1, duration),
		);
	}

	public* fadeOut(direction:FadeDirection="up", distance:number=50, duration:number=1) {
		const threadList = [];
		switch (direction) {
			case "none":
				break;

			case "up":
				this.mainRef().y(0);
				threadList.push(this.mainRef().y(-distance, duration))
				break;

			case "down":
				this.mainRef().y(0);
				threadList.push(this.mainRef().y(distance, duration))
				break;
				
			case "left":
				this.mainRef().x(0);
				threadList.push(this.mainRef().x(-distance, duration))
				break;

			case "right":
				this.mainRef().x(0);
				threadList.push(this.mainRef().x(distance, duration))
				break;
		}

		yield* all(
			...threadList,
			this.mainRef().opacity(0, duration),
		);
	}

	public* setLabel(labelTop:string="", labelBottom:string="", duration:number=1) {
		yield* all(
			this.labelTopRef().text(labelTop, duration),
			delay(duration/2, this.labelBottomRef().text(labelBottom, duration)),
		);
	}
}