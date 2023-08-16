import { Layout, Line } from "@motion-canvas/2d";
import { DEFAULT, PossibleVector2, Reference, SimpleSignal, ThreadGenerator, Vector2, all, delay } from "@motion-canvas/core";

export const catalogue_color = {
	vivint_orange: "#F67E20",
	white: "#FFFFFF",
	outline: "#6D6C70",
	fill: "#A2A1A6",
	background: "#242424",
	background_2: "#3C3B3D",
	paper: "#1E1E1F",
	bad_fill: "#f99096",
	bad_outline: "#83070e",
}

export interface Connection {
	ref: Reference<Layout>
	position: "middle" | "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
	offset?: PossibleVector2
}

export function positionLocalToLocal(ref_line:Reference<Line>, connection_destination:Connection): Vector2 {
	let answer: Vector2;
	if (ref_line == connection_destination.ref) {
		answer = connection_destination.ref()[connection_destination.position]();
	}
	else {
		answer = connection_destination.ref()[connection_destination.position]().transformAsPoint(connection_destination.ref().localToWorld()).transformAsPoint(ref_line().worldToLocal());
	}

	if (connection_destination.offset != null) {
		answer = answer.add(connection_destination.offset);
	}

	return answer;
}

export interface drawArrow_options {
	timespan?: number,
	lag?: number,
	direction?: "start" | "end",
	bend?: "horizontal" | "vertical" | "none",
	delta_divisior?: number,
	signal?: SimpleSignal<number, void>,
}

export function* drawArrow(ref_line:Reference<Line>, connection_source: Connection, connection_destination: Connection, {
	timespan=0.5,
	lag=0.3,
	direction="end",
	bend="vertical",
	delta_divisior=3,
	signal,
}:drawArrow_options ={}): ThreadGenerator {
	// Determine Path
	const point_source = positionLocalToLocal(ref_line, connection_source);
	const point_destination = positionLocalToLocal(ref_line, connection_destination);

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
	ref_line().start(0);
	ref_line().end(0);

	const is_start = (direction == "start");
	ref_line().startArrow(is_start);
	ref_line().endArrow(!is_start);

	ref_line().points(pointList);

	if (signal != null) {
		signal(0);
	}

	// Animate Line
	if (is_start) {
		yield* all(
			(signal == null ? null : signal(1, timespan)),
			ref_line().end(1, timespan),
			delay(lag, ref_line().start(1, timespan)),
		);
	}
	else {
		yield* all(
			(signal == null ? null : signal(1, timespan)),
			ref_line().start(1, timespan),
			delay(lag, ref_line().end(1, timespan)),
		);
	}
}

export function* hopIn(layout_ref: Layout, time: number = 1, distance: number = 10): ThreadGenerator {
	layout_ref.opacity(0);
	layout_ref.y(layout_ref.y() - distance);

	yield* all(
		layout_ref.opacity(1, time),
		layout_ref.y(layout_ref.y() + distance, time),
	);
}

export function* hopOut(layout_ref: Layout, time: number = 1, distance: number = 10): ThreadGenerator {
	layout_ref.opacity(1);
	yield* all(
		layout_ref.opacity(0, time),
		layout_ref.y(layout_ref.y() - distance, time),
	);

	layout_ref.y(layout_ref.y() + distance);
}