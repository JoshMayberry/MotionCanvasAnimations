import { Layout, Line } from "@motion-canvas/2d";
import { PossibleVector2, ThreadGenerator, Vector2, all, delay } from "@motion-canvas/core";

export const catalogue_color = {
    vivint_orange: "#F67E20",
    white: "#FFFFFF",
    outline: "#6D6C70",
    fill: "#A2A1A6",
    background: "#242424",
    paper: "#1E1E1F",
}

export interface Connection {
    ref: Layout
    position: "middle" | "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
    offset?: PossibleVector2
}

export function positionLocalToLocal(ref_line:Line, connection_destination:Connection): Vector2 {
    let answer: Vector2;
    if (ref_line == connection_destination.ref) {
        answer = connection_destination.ref[connection_destination.position]();
    }
    else {
        answer = connection_destination.ref[connection_destination.position]().transformAsPoint(connection_destination.ref.localToWorld()).transformAsPoint(ref_line.worldToLocal());
    }

    if (connection_destination.offset != null) {
        answer = answer.add(connection_destination.offset);
    }

    return answer;
}

export function* drawArrow(ref_line:Line, connection_source: Connection, connection_destination: Connection, {
    timespan=0.5,
    lag=0.3,
    direction="",
    delta_divisior=3,
}={}): ThreadGenerator {
    // Determine Path
    const point_source = positionLocalToLocal(ref_line, connection_source);
    const point_destination = positionLocalToLocal(ref_line, connection_destination);

    const pointList = [point_source];
    if (point_source.x != point_destination.x) {
        const y_delta = (point_destination.y - point_source.y) / delta_divisior;

        pointList.push(point_source.add([0, y_delta]))
        pointList.push(point_destination.add([0, -y_delta]))
    }

    pointList.push(point_destination);

    // Reset Line
    ref_line.start(0);
    ref_line.end(0);

    const is_start = (direction == "start");
    ref_line.startArrow(is_start);
    ref_line.endArrow(!is_start);

    ref_line.points(pointList);

    // Animate Line
    if (is_start) {
        yield* all(
            ref_line.end(1, timespan),
            delay(lag, ref_line.start(1, timespan)),
        );
    }
    else {
        yield* all(
            ref_line.start(1, timespan),
            delay(lag, ref_line.end(1, timespan)),
        );
    }
}