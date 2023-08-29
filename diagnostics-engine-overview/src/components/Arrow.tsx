import {Layout, Line, Node, NodeProps, Path} from '@motion-canvas/2d/lib/components';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createSignal, SimpleSignal} from '@motion-canvas/core/lib/signals';
import {Reference, createRef} from '@motion-canvas/core/lib/utils';
import {all, delay} from '@motion-canvas/core/lib/flow';
import { PossibleVector2, Vector2 } from '@motion-canvas/core/lib/types/Vector';
import { ThreadGenerator } from '@motion-canvas/core/lib/threading/ThreadGenerator';

type ArrowMode = "no_payload" | "with_payload"

export interface ArrowProps extends NodeProps {
	color_line?: string,
	color_payload?: string,
	payload?: string,
	mode?: ArrowMode,
	line_offset?: number,
	line_radius?: number,
	line_width?: number,
	payload_offset?: number,
	payload_scale?: number,
}

export interface drawArrow_options {
	timespan?: number,
	lag?: number,
	direction?: "start" | "end",
	bend?: "horizontal" | "vertical" | "none",
	delta_divisior?: number,
	signal?: SimpleSignal<number, void>,
}

export interface Connection {
	ref: Reference<Layout>
	position: "middle" | "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
	offset?: PossibleVector2
}

export class Arrow extends Node {
	private color_line;
	private color_payload;

	public readonly mainRef = createRef<Layout>();
	public readonly lineRef = createRef<Line>();
	public readonly payloadRef = createRef<Layout>();
	public readonly payloadBodyRef = createRef<Path>();

	public readonly signal = createSignal(0);

	private current_mode: ArrowMode;
  
	public constructor(props?: ArrowProps) {
		super({ ...props });

		this.color_line = new Color(props?.color_line || "#6D6C70");
		this.color_payload = new Color(props?.color_payload || "#F67E20");

		this.current_mode = props?.mode || (props?.payload ? "with_payload" : "no_payload");

		this.add(
			<Layout ref={this.mainRef}
				opacity={(this.current_mode == "with_payload") ? 0 : 1}
			>
				<Layout ref={this.payloadRef}
					opacity={(this.current_mode == "with_payload") ? 1 : 0}
					zIndex={100}
					position={() => this.lineRef().getPointAtPercentage(this.signal()).position}
					// rotation={() => this.lineRef().getPointAtPercentage(this.signal()).tangent.degrees}
				>
					<Path ref={this.payloadRef}
						fill={this.color_payload}
						data={props?.payload}
						scale={props?.payload_scale || 3}
						x={props?.payload_offset || -40}
						y={props?.payload_offset || -40}
					/>
				</Layout>
				
				<Line ref={this.lineRef}
					lineWidth={props?.line_width || 8}
					stroke={this.color_line}
					startOffset={props?.line_offset || 10}
					endOffset={props?.line_offset || 10}
					radius={props?.line_radius || 20}
					points={[0,0]}
					opacity={(this.current_mode == "with_payload") ? 0 : 1}
				/>
			</Layout>
		);
	}

	private positionLocalToLocal(connection_destination:Connection): Vector2 {
		let answer: Vector2;
		if (this.lineRef == connection_destination.ref) {
			answer = connection_destination.ref()[connection_destination.position]();
		}
		else {
			answer = connection_destination.ref()[connection_destination.position]().transformAsPoint(connection_destination.ref().localToWorld()).transformAsPoint(this.lineRef().worldToLocal());
		}
	
		if (connection_destination.offset != null) {
			answer = answer.add(connection_destination.offset);
		}
	
		return answer;
	}
	
	public* drawArrow(connection_source: Connection, connection_destination: Connection, {
		timespan=0.5,
		lag=0.3,
		direction="end",
		bend="vertical",
		delta_divisior=3,
	}:drawArrow_options={}): ThreadGenerator {
		// Determine Path
		const point_source = this.positionLocalToLocal(connection_source);
		const point_destination = this.positionLocalToLocal(connection_destination);
	
		const pointList = [point_source];
	
		switch (bend) {
			case "vertical":
				if (point_source.x != point_destination.x) {
					const y_delta = (point_destination.y - point_source.y) / delta_divisior;
			
					pointList.push(point_source.add([0, y_delta]))
					pointList.push(point_destination.add([0, -y_delta]))
				}
				break;
			
			case "horizontal":
				if (point_source.y != point_destination.y) {
					const x_delta = (point_destination.x - point_source.x) / delta_divisior;
			
					pointList.push(point_source.add([x_delta, 0]))
					pointList.push(point_destination.add([-x_delta, 0]))
				}
				break;
			
			case "none":
				break;
	
		}
		pointList.push(point_destination);
	
		// Reset Line
		this.lineRef().start(0);
		this.lineRef().end(0);
	
		const is_start = (direction == "start");
		this.lineRef().startArrow(is_start);
		this.lineRef().endArrow(!is_start);
	
		this.lineRef().points(pointList);
	
		if (this.current_mode == "with_payload") {
			this.signal(0);
		}
	
		// Animate Line
		if (is_start) {
			yield* all(
				((this.current_mode == "with_payload") ? this.signal(1, timespan) : null),
				this.lineRef().end(1, timespan),
				delay(lag, this.lineRef().start(1, timespan)),
			);
		}
		else {
			yield* all(
				((this.current_mode == "with_payload") ? this.signal(1, timespan) : null),
				this.lineRef().start(1, timespan),
				delay(lag, this.lineRef().end(1, timespan)),
			);
		}
	}

	public* sendPayload(connection_source: Connection, connection_destination: Connection) {
		yield* all(
			this.mainRef().opacity(1, 0.2),
			this.drawArrow(connection_source, connection_destination, {timespan: 1, lag: 0, direction: "end", bend: "none"}),
			delay(0.8, all(
				this.mainRef().opacity(0, 0.2),
			)),
		);
	}
}