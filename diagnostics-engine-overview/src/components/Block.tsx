import {Layout, Node, NodeProps, Path, Rect, Txt} from '@motion-canvas/2d/lib/components';
import { all } from '@motion-canvas/core';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';

type BlockMode = "no_fill" | "with_fill"

export interface BlockProps extends NodeProps {
	color_block?: string,
	color_blockFill?: string,
	color_path?: string,
	text?: string,
	path?: string,
	pathAnimate?: string,
	mode?: BlockMode
	width?: number,
	height?: number,
	fill_offset?: number,
	path_scale?: number,
	path_offset?: number,
	path_offsetX?: number,
	path_offsetY?: number,
	text_fontSize?: number,
	text_offset?: number,
}

export class Block extends Node {
	public color_block;
	public color_blockFill;
	public color_path;

	public readonly mainRef = createRef<Layout>();
	public readonly blockRef = createRef<Rect>();
	public readonly blockFillRef = createRef<Rect>();
	public readonly pathRef = createRef<Path>();
	public readonly pathAnimateRef = createRef<Path>();
  
	public constructor(props?: BlockProps) {
		super({ ...props });

		this.color_block = new Color(props?.color_block || "#6D6C70");
		this.color_blockFill = new Color(props?.color_blockFill || "#A2A1A6");
		this.color_path = new Color(props?.color_path || "#1E1E1F");

		this.add(
			<Layout ref={this.mainRef}>
				<Rect ref={this.blockRef}
					width={props?.width || 150}
					height={props?.height || 150}
					fill={this.color_block}
					radius={10}
				/>
				<Rect
					ref={this.blockFillRef}
					width={() => this.blockRef().width() - (props?.fill_offset || 20)}
					height={() => this.blockRef().height() - (props?.fill_offset || 20)}
					fill={this.color_blockFill}
					radius={10}
					opacity={(props?.mode == "with_fill") ? 1 : 0}
				/>
				<Txt
					fill={this.color_path}
					text={props?.text || ""}
					fontSize={props?.text_fontSize || 100}
					y={props?.text_offset || 10}
				/>
				<Path ref={this.pathRef}
					fill={this.color_path}
					data={props?.path || ""}
					scale={props?.path_scale || 5}
					x={props?.path_offset || props?.path_offsetX || -60}
					y={props?.path_offset || props?.path_offsetY || -60}
				/>
				<Path ref={this.pathAnimateRef}
					fill={this.color_path}
					data={props?.pathAnimate || ""}
					scale={props?.path_scale || 5}
					x={props?.path_offset || props?.path_offsetX || -60}
					y={props?.path_offset || props?.path_offsetY || -60}
				/>
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