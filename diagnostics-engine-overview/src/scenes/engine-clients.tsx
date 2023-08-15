import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, createSignal, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, tween, useLogger, waitFor, map} from '@motion-canvas/core';
import {drawArrow, catalogue_color, hopIn, hopOut} from "./utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";

export default makeScene2D(function* (view) {
	const logger = useLogger();
	const camera = createRef<CameraView>();

	const scenario_panel_ref = createRef<Layout>();
	const scenario_platform_ref = createRef<Layout>();
	const scenario_phone_ref = createRef<Layout>();

	const panel_layout_ref = createRef<Layout>();
	const panel_ref = createRef<Rect>();

	const wifi_layout_ref = createRef<Layout>();
	const wifi_ref = createRef<Rect>();
	const wifi_body_ref = createRef<Path>();

	const eye_layout_ref = createRef<Layout>();
	const eye_ref = createRef<Rect>();
	const eye_body_ref = createRef<Path>();
	const eye_pupil_ref = createRef<Path>();

	const wrench_layout_ref = createRef<Layout>();
	const wrench_body_ref = createRef<Path>();
	const wrench_signal = createSignal(0);

	const clock_layout_ref = createRef<Layout>();
	const clock_ref = createRef<Rect>();
	const clock_hand_ref = createRef<Line>();

	const phone_layout_ref = createRef<Layout>();
	const phone_ref = createRef<Rect>();
	const phone_diagnostics_ref = createRef<Layout>();
	const phone_call_ref = createRef<Path>();

	const finger_layout_ref = createRef<Layout>();
	const finger_body_ref = createRef<Path>();
	const finger_touch_ref = createRef<Path>();

	const operator_layout_ref = createRef<Layout>();
	const operator_ref = createRef<Rect>();
	const operator_body_ref = createRef<Path>();
	const operator_eyes_ref = createRef<Path>();
	const operator_diagnostics_ref = createRef<Layout>();

	const connect_wrench_ref = createRef<Line>();
	const connect_1_ref = createRef<Line>();
	const connect_2_ref = createRef<Line>();
	const connect_3_ref = createRef<Line>();



	view.fill(catalogue_color.background);

	view.add(
		<>
			<CameraView ref={camera}
				width={"100%"}
				height={"100%"}
			>
				<Layout ref={scenario_panel_ref}
					x={-100}
					y={0}
				>
					<Layout ref={wrench_layout_ref}
						opacity={0}
						zIndex={100}
						position={() => connect_wrench_ref().getPointAtPercentage(wrench_signal()).position}
						// rotation={() => connect_wrench_ref().getPointAtPercentage(wrench_signal()).tangent.degrees}
					>
						<Path ref={wrench_body_ref}
							fill={catalogue_color.vivint_orange}
							data={"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"}
							scale={3}
							x={-40}
							y={-40}
						/>
					</Layout>
					
					<Line ref={connect_wrench_ref}
						lineWidth={8}
						stroke="red"
						startOffset={10}
						endOffset={10}
						radius={20}
						points={[0,0]}
						opacity={0}
					/>

					<Layout ref={panel_layout_ref}
						x={150 + 120}
						// y={-325}
					>
						<Rect ref={panel_ref}
							width={300}
							height={200}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Rect
							width={250}
							height={150}
							fill={catalogue_color.fill}
							radius={10}
						/>
					</Layout>

					<Layout ref={wifi_layout_ref}
						x={-75 - 120}
						y={25}
					>
						<Rect ref={wifi_ref}
							width={150}
							height={150}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Path ref={wifi_body_ref}
							fill={catalogue_color.paper}
							data={"M20.2 5.9l.8-.8C19.6 3.7 17.8 3 16 3s-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2s3 .6 4.2 1.7zm-.9.8c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4l.8.8c.7-.7 1.6-1 2.5-1 .9 0 1.8.3 2.5 1l.8-.8zM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM8 18H6v-2h2v2zm3.5 0h-2v-2h2v2zm3.5 0h-2v-2h2v2z"}
							scale={5}
							x={-60}
							y={-60}
						/>
					</Layout>
				</Layout>

				<Layout ref={scenario_platform_ref}>
					<Layout ref={eye_layout_ref}
						x={panel_ref().x() + 175}
						y={panel_ref().y()}
						opacity={0}
					>
						<Rect ref={eye_ref}
							width={150}
							height={150}
							fill={catalogue_color.outline}
							radius={10}
							opacity={0}
						/>
						<Path ref={eye_body_ref}
							fill={catalogue_color.paper}
							data={"M 12,4.5 C 7,4.5 2.73,7.61 1,12 c 1.73,4.39 6,7.5 11,7.5 5,0 9.27,-3.11 11,-7.5 C 21.27,7.61 17,4.5 12,4.5 Z M 12,17 C 9.24,17 7,14.76 7,12 7,9.24 9.24,7 12,7 c 2.76,0 5,2.24 5,5 0,2.76 -2.24,5 -5,5 z"}
							scale={5}
							x={-60}
							y={-60}
						/>
						<Path ref={eye_pupil_ref}
							fill={catalogue_color.paper}
							data={"M 14.871429,12.043987 A 2.814286,2.9582725 0 0 1 12.057143,15.00226 2.814286,2.9582725 0 0 1 9.2428572,12.043987 2.814286,2.9582725 0 0 1 12.057143,9.0857148 2.814286,2.9582725 0 0 1 14.871429,12.043987 Z"}
							scale={5}
							x={-60}
							y={-60}
						/>
					</Layout>

					<Layout ref={clock_layout_ref}
						x={800}
						y={0}
						opacity={0}
					>
						<Rect ref={clock_ref}
							width={150}
							height={150}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Circle
							fill={catalogue_color.paper}
							height={130}
							width={130}
						/>
						<Circle
							fill={catalogue_color.outline}
							height={100}
							width={100}
						/>
						<Line ref={clock_hand_ref}
							lineWidth={16}
							stroke={catalogue_color.paper}
							points={[[0, 0], [0, -40]]}
						/>
					</Layout>
				</Layout>

				<Layout ref={scenario_phone_ref}
					opacity={0}
				>
					<Layout ref={phone_layout_ref}
						x={-580}
						y={0}
					>
						<Rect ref={phone_ref}
							width={190}
							height={270}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Rect
							width={160}
							height={250}
							fill={catalogue_color.fill}
							radius={10}
						/>
						<Layout ref={phone_diagnostics_ref}
							opacity={0}
						>
							<Rect
								width={120}
								height={90}
								fill="#f7646c"
								radius={10}
								y={-60}
							/>
							<Path
								fill={catalogue_color.paper}
								data={"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}
								scale={5}
								x={-60}
								y={-30}
							/>
							<Path
								fill={catalogue_color.paper}
								data={"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}
								scale={5}
								x={-60}
								y={10}
							/>
						</Layout>
						
						<Path ref={phone_call_ref}
							fill={catalogue_color.paper}
							data={"M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"}
							scale={5}
							x={-60}
							y={-60}
							opacity={0}
						/>
					</Layout>

					<Layout ref={finger_layout_ref}
						x={-580}
						y={80}
						opacity={0}
					>
						<Path ref={finger_body_ref}
							fill="#C68D64"
							data={"M 18.84,15.87 14.3,13.61 C 14.13,13.54 13.95,13.5 13.76,13.5 H 13 v -6 C 13,6.67 12.33,6 11.5,6 10.67,6 10,6.67 10,7.5 V 18.24 C 6.4,17.48 6.46,17.49 6.33,17.49 c -0.31,0 -0.59,0.13 -0.79,0.33 l -0.79,0.8 4.94,4.94 C 9.96,23.83 10.34,24 10.75,24 h 6.79 c 0.75,0 1.33,-0.55 1.44,-1.28 l 0.75,-5.27 c 0.01,-0.07 0.02,-0.14 0.02,-0.2 0,-0.62 -0.38,-1.16 -0.91,-1.38 z"}
							scale={10}
							x={-120}
							y={-60}
						/>
						<Path ref={finger_touch_ref}
							fill="#2196f3"
							data={"M 9,11.24 V 7.5 C 9,6.12 10.12,5 11.5,5 12.88,5 14,6.12 14,7.5 v 3.74 C 15.21,10.43 16,9.06 16,7.5 16,5.01 13.99,3 11.5,3 9.01,3 7,5.01 7,7.5 c 0,1.56 0.79,2.93 2,3.74 z"}
							scale={10}
							x={-120}
							y={-60}
							opacity={0}
						/>
					</Layout>
				</Layout>
				
				<Layout ref={operator_layout_ref}
					y={0}
					x={650}
					scale={0.8}
					opacity={0}
				>
					<Rect ref={operator_ref}
						width={200}
						height={200}
						fill={catalogue_color.outline}
						radius={10}
					/>
					<Layout ref={operator_body_ref} >
						<Path
							fill={catalogue_color.paper}
							data={"M 18,11.03 C 17.52,8.18 15.04,6 12.05,6 9.02,6 5.76,8.51 6.02,12.45 c 2.47,-1.01 4.33,-3.21 4.86,-5.89 1.31,2.63 4,4.44 7.12,4.47 z m 3,1.19 C 21,6.73 16.74,3 12,3 7.31,3 3,6.65 3,12.28 2.4,12.62 2,13.26 2,14 v 2 c 0,1.1 0.9,2 2,2 h 1 v -6.1 c 0,-3.87 3.13,-7 7,-7 3.87,0 7,3.13 7,7 V 19 h -8 v 2 h 8 c 1.1,0 2,-0.9 2,-2 v -1.22 c 0.59,-0.31 1,-0.92 1,-1.64 v -2.3 c 0,-0.7 -0.41,-1.31 -1,-1.62 z"}
							scale={8}
							x={-95}
							y={-95}
						/>
					</Layout>
					<Layout ref={operator_eyes_ref} >
						<Path
							fill={catalogue_color.paper}
							data={"m 16,13 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z m -6,0 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z"}
							scale={8}
							x={-95}
							y={-95}
						/>
					</Layout>
				</Layout>

				<Layout>
					<Line ref={connect_1_ref}
						lineWidth={8}
						stroke={catalogue_color.outline}
						startOffset={10}
						endOffset={10}
						radius={20}
						points={[0,0]}
					/>
					<Line ref={connect_2_ref}
						lineWidth={8}
						stroke={catalogue_color.outline}
						startOffset={10}
						endOffset={10}
						radius={20}
						points={[0,0]}
					/>
					<Line ref={connect_3_ref}
						lineWidth={8}
						stroke={catalogue_color.outline}
						startOffset={10}
						endOffset={10}
						radius={20}
						points={[0,0]}
					/>
				</Layout>
			</CameraView>
		</>
	);

	let _eye_state = false;
	function* eyeToggleLook(state:boolean = null, is_diagonal=false) {
		if (state == null) {
			state = !_eye_state;
		}

		if (state == _eye_state) {
			return;
		}

		const myList = [
			eye_pupil_ref().x((state ? eye_pupil_ref().x() - 10 : eye_pupil_ref().x() + 10), 0.2)
		]

		if (is_diagonal) {
			myList.push(eye_pupil_ref().y((state ? eye_pupil_ref().y() - 5 : eye_pupil_ref().y() + 5), 0.2))
		}
		
		yield* all(...myList);
		_eye_state = state
	}

	function* wifiError(state=true) {
		yield* all(
			wifi_ref().fill((state ? catalogue_color.bad_fill : catalogue_color.fill), 1),
			wifi_body_ref().fill((state ? catalogue_color.bad_outline : catalogue_color.outline), 1),
		);
	}

	function* sendWrench() {
		yield* all(
			wrench_layout_ref().opacity(1, 0.2),
			drawArrow(connect_wrench_ref, {ref: panel_ref, position: "left"}, {ref: wifi_ref, position: "right"}, {timespan: 1, lag: 0, direction: "end", signal: wrench_signal}),
			delay(0.8, all(
				wrench_layout_ref().opacity(0, 0.2),
				wifiError(false),
			)),
		);
	}

	// We have here a panel and a component, in this case the wifi router

	yield* beginSlide("wifiError");
	// The router encounters an error
	yield* wifiError(true);

	yield* beginSlide("panelNoticesError");
	// It would be very cool if the panel could notice the issue
	yield* sequence(0.4,
		eye_layout_ref().opacity(1, 0.5),
		eyeToggleLook(true),
	);

	yield* beginSlide("panelFixesError");
	// and "self heal" the problem
	yield* chain(
		sendWrench(),
		eyeToggleLook(false),
	);

	// But what logic do we use to determine if this is a problem or not?
	yield* beginSlide("moveEyeToPlatform");
	// It would be better to keep that "off panel" so it can be updated and changed more easily
	yield* all(
		scenario_panel_ref().x(-400, 1),
		eye_ref().opacity(1, 0.3),
		eye_layout_ref().x(500, 1),
		eye_layout_ref().y(0, 1),
	);

	yield* beginSlide("eyeConstantlyWatching");
	// Having it constantly watch the panel would put a big load on our system- because we need to watch every panel
		yield* eyeToggleLook(true);

	// And let's generalize this to a clock that checks the panel every so often.
	yield* beginSlide("clockAppears");
	
	clock_hand_ref().rotation(0);
	yield* all(
		clock_layout_ref().opacity(1, 0.5),
		eyeToggleLook(false),
		tween(10, (percentage) => {
			clock_hand_ref().rotation(map(0, 360 * 2, percentage))
		}),
		delay(4.8, chain(
			eyeToggleLook(true),
			waitFor(0.5),
			eyeToggleLook(false),
		)),
		delay(9.8, chain(
			eyeToggleLook(true),
			waitFor(0.5),
			eyeToggleLook(false),
		)),
	);

	// This could send the fix request any time it is needed
	yield* beginSlide("wifiError2");
	clock_hand_ref().rotation(0);
	yield* all(
		eyeToggleLook(false),
		tween(5, (percentage) => {
			clock_hand_ref().rotation(map(0, 360, percentage))
		}),
		delay(2, all(
			wifi_ref().fill(catalogue_color.bad_fill, 1),
			wifi_body_ref().fill(catalogue_color.bad_outline, 1),
		)),
		delay(4.8, chain(
			eyeToggleLook(true),
			sequence(0.8,
				drawArrow(connect_1_ref, {ref: eye_ref, position: "left"}, {ref: panel_ref, position: "right"}, {timespan: 1, lag: 0.3, direction: "end"}),
				sendWrench(),
				eyeToggleLook(false),
			),
		)),
		
	);

	// This little box could be used in other scenarios, such as this one
	yield* beginSlide("scenario2");
	yield* all(
		scenario_panel_ref().y(-300, 1),
		panel_layout_ref().opacity(0.25, 1),
		clock_layout_ref().opacity(0.25, 1),
		scenario_phone_ref().opacity(1, 1),
		scenario_phone_ref().y(200, 1),
	)

	yield* beginSlide("wifiError3");
	yield* wifiError(true),
	

	yield* beginSlide("customerFixesIt");
	// A customer uses their phone to get a list of all the issues their system has- with links on how to fix the issue
	yield* all(
		finger_layout_ref().opacity(1, 0.5),
		finger_layout_ref().y(finger_layout_ref().y() - 80, 1),
		delay(1, chain(
			finger_touch_ref().opacity(1, 0.5),
			finger_touch_ref().opacity(0, 0.5),
		)),
		delay(1.2, sequence(0.5,
			all(
				finger_body_ref().y(finger_body_ref().y() + 80, 1),
				delay(0.5, all(
					finger_body_ref().opacity(0, 0.5),
					drawArrow(connect_1_ref, {ref: phone_ref, position: "right"}, {ref: eye_ref, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
					delay(1.4, chain(
						eyeToggleLook(true, true),
						waitFor(0.5),
						sequence(0.3,
							eyeToggleLook(false, true),
							all(
								drawArrow(connect_1_ref, {ref: eye_ref, position: "left"}, {ref: phone_ref, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
								delay(0.8, phone_diagnostics_ref().opacity(1, 0.5)),
							),
						)
					)),
				)),
			),
		)),
	);

	finger_layout_ref().y(-470);
	
	yield* all(
		finger_body_ref().opacity(1, 0.5),
		finger_body_ref().y(finger_body_ref().y() - 80, 1),
		delay(1, chain(
			finger_touch_ref().opacity(1, 0.5),
			finger_touch_ref().opacity(0, 0.5),
		)),
	);

	yield* all(
		finger_body_ref().y(finger_body_ref().y() + 80, 1),
		wifiError(false),
		delay(0.5, sequence(0.2,
			finger_body_ref().opacity(0, 0.5),
			phone_diagnostics_ref().opacity(0, 0.5),
		)),
	);

	// Another use-case
	yield* beginSlide("wifiError4");
	yield* all(
		operator_layout_ref().opacity(1, 1),
		operator_layout_ref().y(300, 1),
		wifiError(true),
	);

	yield* beginSlide("customerCalls");
	// Another use-case the customer calls ourt call center
	yield* all(
		phone_call_ref().opacity(1, 0.5),
		delay(0.4, all(
			drawArrow(connect_1_ref, {ref: phone_ref, position: "right"}, {ref: operator_ref, position: "left", offset: [-600, 0]}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
			delay(0.8, all(
				sequence(0.7, 
					drawArrow(connect_2_ref, {ref: operator_ref, position: "left", offset: [-600, 0]}, {ref: eye_ref, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
					delay(0.3, all(
						eyeToggleLook(true, true),
						delay(0.5, all(
							eyeToggleLook(false, true),
							all(
								drawArrow(connect_2_ref, {ref: eye_ref, position: "bottom"}, {ref: operator_ref, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "vertical"}),
								// delay(0.8, phone_diagnostics_ref().opacity(1, 0.5)),
							),
						)),
					)),
				),
				drawArrow(connect_3_ref, {ref: operator_ref, position: "left", offset: [-600, 0]}, {ref: operator_ref, position: "left"}, {timespan: 2, lag: 0.3, direction: "end", bend: "horizontal"}),
			)),
		)),
	)

	// Before the call gets to the agent- we generate this list of issues

	// Now the agent has this list available to help


	// The key here is the little box- the diagnostic engine. We are working on building this.

	// We will start our implementation here- but it will end up helping up here.


	yield* beginSlide("end");
 });
