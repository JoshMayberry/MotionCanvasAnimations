import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {Circle, Rect, Txt, Line, Layout, Path} from "@motion-canvas/2d/lib/components";
import {createSignal} from "@motion-canvas/core/lib/signals";
import {Vector2} from "@motion-canvas/core/lib/types";
import {all, any, delay, loop, loopUntil, waitFor, waitUntil} from "@motion-canvas/core/lib/flow";
import {Logger, ThreadGenerator, beginSlide, createRef, easeInCubic, easeInOutCubic, easeOutCubic, useDuration, useLogger} from "@motion-canvas/core";
import { CodeBlock, edit, insert, lines } from "@motion-canvas/2d/lib/components/CodeBlock";
import { arcTo } from "@motion-canvas/2d";

export default makeScene2D(function* (view) {
	const packetRef = createRef<Circle>();
	const packet2Ref = createRef<Circle>();
	const panelRef = createRef<Layout>();
	const paper1Ref = createRef<Layout>();
	const paper2Ref = createRef<Layout>();
	const panelScreenRef = createRef<Rect>();
	const platformRef = createRef<Path>();
	const debounceRef = createRef<Rect>();
	const mainCodeRef = createRef<CodeBlock>();
	const filterCodeRef = createRef<CodeBlock>();
	const panelCodeRef = createRef<CodeBlock>();

	const logger = useLogger();

	const catalogue_color = {
		outline: "#6D6C70",
		fill: "#A2A1A6",
		red: "#F3212D",
		blue: "#2196f3",
		background: "#242424",
		fill_red: "#f99096",
		fill_blue: "#90caf9",
		paper: "#1E1E1F",
	}

	const catalogue_packet = {
		start: -700,
		end: 680,
		debounce: -70,
	}

	view.add(
		<>
			<Layout
				ref={paper1Ref}
				opacity={0}
				y={-140}
				x={-500}
			>
				<Rect
					width={900}
					height={400}
					fill={catalogue_color.paper}
					radius={10}
				/>
				<Txt
					size={12}
					y={-250}
					x={-440}
					fill={catalogue_color.outline}
					text={"some_file.py"}
				/>
				<CodeBlock
					language="python"
					ref={mainCodeRef}
					code={""}
				/>
			</Layout>
			
			<Layout
				ref={paper2Ref}
				opacity={0}
				y={-140}
				x={500}
			>
				<Rect
					width={900}
					height={400}
					fill={catalogue_color.paper}
					radius={10}
				/>
				<Txt
					size={12}
					y={-250}
					x={-440}
					fill={catalogue_color.outline}
					text={"default_notify_filter.json"}
				/>
				<CodeBlock
					language="python"
					ref={filterCodeRef}
					code={""}
					/>
			</Layout>

			<Layout>
				<Layout
					ref={panelRef}
					x={-700}
					y={350}
				>
					<Rect
						width={300}
						height={200}
						fill={catalogue_color.outline}
						radius={10}
					>
					</Rect>
					<Rect
						ref={panelScreenRef}
						width={250}
						height={150}
						fill={catalogue_color.fill}
						radius={10}
					/>
					<CodeBlock
						language="python"
						ref={panelCodeRef}
						code={`some_state`}
						opacity={1}
						y={-140}
					/>
				</Layout>

				<Path
					ref={platformRef}
					lineWidth={1.5}
					data="M 19.35,10.04 C 18.67,6.59 15.64,4 12,4 9.11,4 6.6,5.64 5.35,8.04 2.34,8.36 0,10.91 0,14 c 0,3.31 2.69,6 6,6 h 13 c 2.76,0 5,-2.24 5,-5 0,-2.64 -2.05,-4.78 -4.65,-4.96 z"
					x={500}
					y={160}
					scale={15}
					stroke={catalogue_color.outline}
					fill={catalogue_color.fill}
				/>

				<Circle
					ref={packetRef}
					x={catalogue_packet.start}
					y={350}
					width={140}
					height={140}
					fill={catalogue_color.blue}
					opacity={0}
				/>

				<Circle
					ref={packet2Ref}
					x={catalogue_packet.start}
					y={350}
					width={140}
					height={140}
					fill={catalogue_color.blue}
					opacity={0}
				/>

				<Rect
					ref={debounceRef}
					width={30}
					height={300}
					fill={catalogue_color.outline}
					radius={10}
					y={340}
					opacity={0}
				></Rect>
			</Layout>
		</>,
	);
	
	view.fill(catalogue_color.background);

	function* sendPacket({
		speed_send=1,
		method="none",
	}) {
		const color_fill = (_currentState ? catalogue_color.fill_blue : catalogue_color.fill_red);
		const color_packet = (_currentState ? catalogue_color.blue : catalogue_color.red);
		packetRef().fill(color_packet);
		packetRef().x(catalogue_packet.start);

		const debounce_on = !!debounceRef().opacity();
		switch (method) {
			case "none":
				yield* all(
					packetRef().opacity(1, 0.5),
					packetRef().x(catalogue_packet.end, speed_send, easeInOutCubic),
					delay(speed_send - 0.5, packetRef().opacity(0, 0.5)),
					delay(speed_send - 0.5, platformRef().fill(color_fill, 1)),
				);
				return;

			case "ignore":
				if (debounce_on) {
					speed_send /= 2;
					yield* all(
						packetRef().opacity(1, 0.5),
						packetRef().x(catalogue_packet.debounce, speed_send, easeInCubic),
					);
					yield* all(
						packetRef().x(catalogue_packet.debounce - 50, 0.5, easeOutCubic),
						delay(0.25, packetRef().opacity(0, 0.25)),
					);
					return;
				}

				yield* all(
					packetRef().opacity(1, 0.5),
					packetRef().x(catalogue_packet.end, speed_send, easeInOutCubic),
					delay(speed_send - 0.5, packetRef().opacity(0, 0.5)),
					delay(speed_send - 0.5, platformRef().fill(color_fill, 1)),
					delay(speed_send / 2 - 0.25, debounceRef().opacity(1, 1)),
				);
				return;

			case "delay":
				if (!debounce_on) {
					yield* all(
						packetRef().opacity(1, 0.5),
						packetRef().x(catalogue_packet.end, speed_send, easeInOutCubic),
						delay(speed_send - 0.5, packetRef().opacity(0, 0.5)),
						delay(speed_send - 0.5, platformRef().fill(color_fill, 1)),
						delay(speed_send / 2 - 0.25, debounceRef().opacity(1, 1)),
					);
					return;
				}
			
				yield* all(
					packetRef().opacity(1, 0.1),
					packetRef().x(catalogue_packet.debounce, speed_send, easeInCubic),
					delay(0.25, debounceRef().opacity(1, speed_send - 0.5)),
				);
				yield* all(
					packetRef().y(packetRef().y() - 250, 0.5, easeOutCubic),
					delay(0.25, packetRef().x(packetRef().x() + 69, 0.25, easeOutCubic)),
					packet2Ref().opacity(0, 0.25),
				)
				
				packet2Ref().fill(color_packet);
				packet2Ref().opacity(1),
				packet2Ref().x(packetRef().x());
				packet2Ref().y(packetRef().y());
				packetRef().opacity(0);
				packetRef().y(packetRef().y() +  250);
		}
	}

	let _currentState = true;
	function* toggleValue({
		doSendPacket=true,
		delay_start=0,
		delay_end=0,
		speed_send=2,
		method="none",
	}={}) {
		const options = arguments[0] || {};
		_currentState = !_currentState;

		if (delay_start) {
			yield* waitFor(delay_start);
		}

		yield* all(
			panelScreenRef().fill((_currentState ? catalogue_color.fill_blue : catalogue_color.fill_red), 1),
			panelCodeRef().edit(1)`some_state = ${edit((!_currentState).toString(), _currentState.toString())}`,
		);

		if (doSendPacket) {
			yield* sendPacket(options);
			
		}

		if (delay_end) {
			yield* waitFor(delay_end);
		}
	}

	function* debounceFinished({
		method="ignore",
	}) {
		switch (method) {
			case "ignore":
				yield* debounceRef().opacity(0, 1);
				break;

			case "delay":
				const speed_send = 1;
				const color_fill = (_currentState ? catalogue_color.fill_blue : catalogue_color.fill_red);

				yield* all(
					packet2Ref().opacity(1, 0.5),
					packet2Ref().x(catalogue_packet.end, speed_send, easeInOutCubic),
					delay(0.25, all(
						packet2Ref().y(packet2Ref().y() + 250, 0.25, easeInCubic),
						delay(speed_send - 0.5, packet2Ref().opacity(0, 0.5)),
						delay(speed_send - 0.75, platformRef().fill(color_fill, 1)),
						delay(speed_send / 2 - 0.25, debounceRef().opacity(0, 1)),
					)),
				);
				break;
		}
	}

	// yield* beginSlide("begin");

	yield* beginSlide("changingParameters");
	// On the panel, parameters change, such as this "some_parameter"
	yield* all(
		panelScreenRef().fill((catalogue_color.fill_blue), 1),
		panelCodeRef().edit(1)`some_state${insert(" = true")}`,
	);

	yield* beginSlide("addServiceProperty");
	// We can watch these changes
	yield* all(
		paper1Ref().opacity(1, 0.5),
		paper2Ref().opacity(1, 0.5),
		mainCodeRef().edit(1)`${insert("@service_property(notify=True)\n    def some_state(self): pass")}`,
		filterCodeRef().edit(1)`${insert('"some_state"')}`,
	);

	yield* beginSlide("firstSend");
	// and report them to platform
	yield* toggleValue({speed_send: 2});

	yield* beginSlide("flippingValues");
	// But what if a change flips back and forth qetween 2 values? We will be sending too many state changes
	yield* loop(2, () => toggleValue());

	yield* beginSlide("debounceIgnore");
	// So we can throttle them. Now, only the first change gests sent and we wait until we can send another
	yield* all(
		filterCodeRef().edit(1 )`${insert('{\n    "name": ')}"some_state"${insert(',\n    "frequency_hours": 1\n}')}`,
		mainCodeRef().selection([], 1),
	);

	yield* toggleValue({method: "ignore", speed_send: 2});
	yield* toggleValue({method: "ignore", speed_send: 2});
	yield* toggleValue({method: "ignore", speed_send: 2});
	yield* debounceFinished({method: "ignore"});
	yield* toggleValue({method: "ignore", speed_send: 2});

	yield* beginSlide("debounceIgnoreOutOfSync");
	// But this can make the panel state "out of sync" with what we have in platform
	yield* toggleValue({method: "ignore", speed_send: 2, delay_end: 0.5});
	yield* debounceRef().opacity(0, 1),

	yield* beginSlide("debounceDelay");
	// So instead, let's use a different debounce method that we will call "delayed"
	yield* all(
		filterCodeRef().edit(1)`{\n    "name": "some_state",\n    "frequency_hours": 1${insert(',\n    "debounce_method": "delayed"')}\n}`,
		platformRef().fill((catalogue_color.fill), 1),
		);

	// So instead, let's hold onto the value until the alloted time and send it on it's way after. This achieves the same effect- but allows us to be "in sync"
	yield* beginSlide("debounceDelayInSync");
	yield* toggleValue({method: "delay", speed_send: 1});
	yield* toggleValue({method: "delay", speed_send: 1});
	yield* toggleValue({method: "delay", speed_send: 1});
	yield* toggleValue({method: "delay", speed_send: 1, delay_end: 0.5});
	yield* debounceFinished({method: "delay"});
	
	yield* beginSlide("end");
});
