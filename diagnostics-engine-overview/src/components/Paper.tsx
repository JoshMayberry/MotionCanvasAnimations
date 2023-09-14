import {Circle, Layout, Node, NodeProps, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {easeInOutCubic, tween} from '@motion-canvas/core/lib/tweening';
import {
	Color,
	ColorSignal,
	PossibleColor,
} from '@motion-canvas/core/lib/types/Color';
import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {
	createSignal,
	SignalValue,
	SimpleSignal,
} from '@motion-canvas/core/lib/signals';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';
import { CodeBlock } from '@motion-canvas/2d/lib/components/CodeBlock';

export interface PaperProps extends NodeProps {
	name?: string,
	name_offset_x?: number,
	name_offset_y?: number,
	color_paper?: string,
	color_text?: string,
	language?: string,
	fontSize?: number,
	fontSize_label?: number,
	height?: number,
	width?: number,
	radius?: number,
}

export class Paper extends Node {
	private color_paper;
	private color_text;

	public readonly mainRef = createRef<Layout>();
	public readonly codeRef = createRef<CodeBlock>();
	public readonly textRef = createRef<Txt>();
	public readonly blockRef = createRef<Rect>();
  
	public constructor(props?: PaperProps) {
		super({ ...props });

		this.color_paper = new Color(props?.color_paper || '#1E1E1F');
		this.color_text = new Color(props?.color_text || '#6D6C70');

		const fontSize_label = props?.fontSize_label || 48;

		this.add(
			<Layout ref={this.mainRef}>
				<Rect ref={this.blockRef}
					width={props?.width || 900}
					height={props?.height || 400}
					fill={this.color_paper}
					radius={props?.radius || 10}
				>
					<CodeBlock ref={this.codeRef}
						language={props?.language || "python"}
						code={""}
						fontSize={props?.fontSize || 48}
					/>
				</Rect>
				<Layout
					bottom={this.blockRef().topLeft}
				>
					<Txt ref={this.textRef}
						size={12}
						fontSize={fontSize_label}
						x={(props?.name_offset_x != null) ? props.name_offset_x : 10}
						y={(props?.name_offset_y != null) ? props.name_offset_y : -fontSize_label}
						fill={this.color_text}
						text={props?.name || ""}
					/>
				</Layout>
			</Layout>
		);
	}

	public* width(size:number, duration:number) {
		yield* all(
			this.blockRef().width(size, duration),
		);
	}

	public* height(size:number, duration:number) {
		yield* all(
			this.blockRef().height(size, duration),
		);
	}
}