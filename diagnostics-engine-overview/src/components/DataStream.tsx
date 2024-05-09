import {Layout, Node, NodeProps, Path, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {easeInOutCubic, linear,} from "@motion-canvas/core/lib/tweening";
import {Color} from "@motion-canvas/core/lib/types/Color";
import {Reference, createRef} from "@motion-canvas/core/lib/utils";
import {all, delay, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import { Length } from "@motion-canvas/2d";
import { Arrow } from "./Arrow";
import { ThreadGenerator } from "@motion-canvas/core";

type DataStreamDirection = "up" | "down" | "left" | "right"

export interface DataStreamProps extends NodeProps {
	speed?: number,
	color_text?: string,
	text_fontSize?: number,
    mask_height?: number,
    mask_width?: number,
    show_mask?: boolean,
}

export interface SendStreamProps {
    rows?: number,
    columns?: number,
    linesPerSecond?: number,
	direction?: DataStreamDirection,
    periodicSyphon_ref?: Reference<any>,
    periodicSyphon_batchCount?: number,
    periodicSyphon_callbackSequence?: () => ThreadGenerator,
}

export class DataStream extends Node {
	private color_text;

	public readonly mainRef = createRef<Layout>();
	public readonly maskRef = createRef<Rect>();
	public readonly textRef = createRef<Txt>();
	public readonly syphonPath1_ref = createRef<Arrow>();
	public readonly syphonPath2_ref = createRef<Arrow>();
	public readonly syphonPath3_ref = createRef<Arrow>();

	public constructor(props?: DataStreamProps) {
		super({ ...props });

		this.color_text = new Color(props?.color_text || "#A2A1A6");

        const mask_height = props?.mask_height || 500;
        const mask_width = props?.mask_width || 500;

		this.add(
			<Layout ref={this.mainRef}
            >
                <Rect
                    width={mask_width}
                    height={mask_height}
                    y={mask_height/2}
                    fill="#aaaa00"
                    opacity={props?.show_mask ? 1 : 0}
                />
                <Node cache>
                    <Rect ref={this.maskRef}
                        width={mask_width}
                        height={mask_height}
                        y={mask_height/2}
                        fill="#aa0000"
                        opacity={0}
                        compositeOperation={props?.show_mask ? null : "source-out"}
                    />
                    <Txt ref={this.textRef}
                        opacity={0}
                        size={12}
                        fontSize={props?.text_fontSize || 24}
                        text=""
                        textAlign="center"
                        fill={this.color_text}
                        compositeOperation={props?.show_mask ? null : "source-in"}
                    />
                </Node>
                <Arrow ref={this.syphonPath1_ref}
                    payloadText="1111"
                />
                <Arrow ref={this.syphonPath2_ref}
                    payloadText="1111"
                />
                <Arrow ref={this.syphonPath3_ref}
                    payloadText="1111"
                />
			</Layout>
		);
	}

	public* sendStream({
        columns=3, rows=100, linesPerSecond=8, direction="down",
        periodicSyphon_ref=null, periodicSyphon_batchCount=1, periodicSyphon_callbackSequence=null,
    }:SendStreamProps={}) {
        const text = generateDataStream(columns, rows)
        this.textRef().text(text)

        const duration = rows / linesPerSecond
        const fontSize = this.textRef().fontSize()
        
        // Set dimensions so it shows up in the mask
        const lineHeight = parseInt(this.textRef().lineHeight().toString())
        this.textRef().height(lineHeight * rows * 1.03)
        this.textRef().width(fontSize * 4 * columns)

        const textHalfHeight = this.textRef().height()/2

        //Set start point
        this.textRef().x(0)
        this.textRef().y(-textHalfHeight - lineHeight)

        var periodicSyphon: ThreadGenerator
        if (periodicSyphon_ref != null) {
            // Every so often, have a random group of 4 0s and 1s move from the center of *maskRef* to the center of *periodicSyphon_ref*
            const duration_syphon = duration * 0.5 / periodicSyphon_batchCount;
            const duration_wait = (duration - duration_syphon) / (2 * periodicSyphon_batchCount)

            this.syphonPath1_ref().payloadTextRef().text(`${generateDataStream(1, 1)}`);
            this.syphonPath2_ref().payloadTextRef().text(`${generateDataStream(1, 1)}`);
            this.syphonPath3_ref().payloadTextRef().text(`${generateDataStream(1, 1)}`);

            const _this = this;
            periodicSyphon = function*() {
                yield* waitFor(duration_wait);
                
               for (let i = 0; i < periodicSyphon_batchCount - 1; i++) {
                    yield* sequence(duration_syphon / periodicSyphon_batchCount,
                        _this.syphonPath1_ref().sendPayload({ref: _this.maskRef, position: "top"}, {ref: periodicSyphon_ref, position: "middle"}, {timespan: duration_syphon}),
                        _this.syphonPath2_ref().sendPayload({ref: _this.maskRef, position: "top"}, {ref: periodicSyphon_ref, position: "middle"}, {timespan: duration_syphon}),
                        _this.syphonPath3_ref().sendPayload({ref: _this.maskRef, position: "top"}, {ref: periodicSyphon_ref, position: "middle"}, {timespan: duration_syphon}),
                    );

                    if (periodicSyphon_callbackSequence != null) {
                        yield* periodicSyphon_callbackSequence()
                    }
               }
            }()
        }

        yield* this.textRef().opacity(1, 0.1)
        this.maskRef().opacity(1)
		yield* all(
            this.textRef().y(this.maskRef().height() + textHalfHeight + lineHeight, duration, linear),
            periodicSyphon,
        );
        this.maskRef().opacity(0)
        yield* this.textRef().opacity(0, 0.1)
	}
}

function generateDataStream(width:number, height:number) {
    let result = "";

    for (let i = 0; i < height; i++) {
        let line = "";

        for (let j = 0; j < width; j++) {
            let group = "";
            for (let k = 0; k < 4; k++) {
                group += Math.floor(Math.random() * 2).toString();
            }
            line += group + " ";
        }

        result += line.trim() + (i < height - 1 ? "\n" : "");
    }

    return result;
}

function roundUpToMultiple(n:number, multiple:number) {
    if (multiple === 0) {
        throw new Error("Multiple cannot be zero.");
    }
    
    const remainder = n % multiple;
    if (remainder === 0) {
        return n;
    }

    const adjustment = multiple - remainder;
    return n + adjustment;
}
