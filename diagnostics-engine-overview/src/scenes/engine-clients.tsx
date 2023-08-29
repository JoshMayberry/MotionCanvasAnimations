import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, createSignal, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, tween, useLogger, waitFor, map, Reference} from '@motion-canvas/core';
import {catalogue_color, hopIn, hopOut} from "../utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";
import { Engine } from "../components/engine"
import { Phone } from "../components/Phone"
import { Block } from "../components/Block"
import { Panel } from "../components/Panel"
import { Clock } from "../components/Clock"
import { Hand } from "../components/Hand"
import { Arrow, Connection } from "../components/Arrow"

export default makeScene2D(function* (view) {
	const logger = useLogger();
	const camera = createRef<CameraView>();

	const scenario_panel_ref = createRef<Layout>();
	const scenario_platform_ref = createRef<Layout>();
	const scenario_phone_ref = createRef<Layout>();

	const panel_ref = createRef<Panel>();

	const engine_ref = createRef<Engine>();
	const phone_ref = createRef<Phone>();

	const wifi_ref = createRef<Block>();

	const clock_ref = createRef<Clock>();

	const history_ref = createRef<Block>();

	const salesforce_ref = createRef<Block>();

	const instructions_ref = createRef<Layout>();

	const phoneBlock_layout_ref = createRef<Block>();

	const hand_ref = createRef<Hand>();

	const operator_layout_ref = createRef<Block>();
	const operator_diagnostics_ref = createRef<Layout>();

	const connect_wrench_ref = createRef<Arrow>();
	const connect_document_ref = createRef<Arrow>();
	const connect_1_ref = createRef<Arrow>();
	const connect_2_ref = createRef<Arrow>();
	const connect_3_ref = createRef<Arrow>();

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
					<Arrow ref={connect_wrench_ref}
						payload="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
					/>

					<Panel ref={panel_ref}
						x={20 + 120}
					/>

					<Block ref={wifi_ref}
						x={-75 - 120}
						y={0}
						path="M20.2 5.9l.8-.8C19.6 3.7 17.8 3 16 3s-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2s3 .6 4.2 1.7zm-.9.8c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4l.8.8c.7-.7 1.6-1 2.5-1 .9 0 1.8.3 2.5 1l.8-.8zM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM8 18H6v-2h2v2zm3.5 0h-2v-2h2v2zm3.5 0h-2v-2h2v2z"
					/>
				</Layout>

				<Layout ref={scenario_platform_ref}>
					<Arrow ref={connect_document_ref}
						payload="M16,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V8L16,3z M7,7h5v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10 V13z M15,9V5l4,4H15z"
					/>

					<Engine ref={engine_ref}
						x={panel_ref().blockRef().x() + 175}
						y={panel_ref().blockRef().y()}
						opacity={0}
						mode="no_block"
					/>

					<Clock ref={clock_ref}
						x={500}
						y={0}
						opacity={0}
					/>

					<Block ref={salesforce_ref}
						x={300}
						y={-400 - 10}
						opacity={0}
						path="M9.01 20.5a4.642 4.642 0 0 1-4.191-2.632 5.136 5.136 0 0 1-.48.019C1.946 17.887 0 15.932 0 13.529c0-1.4.685-2.721 1.812-3.538a4.861 4.861 0 0 1-.259-1.563c0-2.717 2.224-4.928 4.956-4.928 1.374 0 2.665.547 3.613 1.516a4.555 4.555 0 0 1 2.886-1.031c1.48 0 2.875.748 3.733 1.978a5.41 5.41 0 0 1 1.815-.306c3.002 0 5.443 2.455 5.443 5.472 0 3.018-2.449 5.472-5.46 5.472a5.33 5.33 0 0 1-.727-.053 4.132 4.132 0 0 1-4.749 1.587A4.634 4.634 0 0 1 9.01 20.5zm-3.881-3.685c.206 0 .396.128.47.328.514 1.41 1.885 2.357 3.411 2.357a3.636 3.636 0 0 0 3.35-2.196.504.504 0 0 1 .666-.259c1.613.729 3.335.094 4.1-1.286a.505.505 0 0 1 .525-.25c.348.062.63.091.89.091 2.459 0 4.46-2.006 4.46-4.472s-1.993-4.472-4.443-4.472c-.652 0-1.274.132-1.8.381a.503.503 0 0 1-.649-.206c-.645-1.139-1.833-1.847-3.1-1.847-.969 0-1.9.396-2.557 1.088a.5.5 0 0 1-.692.032.622.622 0 0 1-.077-.077A4.045 4.045 0 0 0 6.509 4.5c-2.182 0-3.956 1.762-3.956 3.928 0 .538.114 1.075.329 1.554a.501.501 0 0 1-.204.637A3.384 3.384 0 0 0 1 13.529c0 1.852 1.497 3.357 3.338 3.357.291 0 .495-.018.683-.06a.565.565 0 0 1 .108-.011z"
					/>

					<Block ref={history_ref}
						x={500}
						y={-400 - 10}
						opacity={0}
						path="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
					/>

					<Block ref={instructions_ref}
						x={700}
						y={-400 - 10}
						opacity={0}
						path="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
					/>
				</Layout>

				<Layout ref={scenario_phone_ref}
					opacity={0}
					y={200}
				>
					<Phone ref={phone_ref}
						x={-580}
						y={0}
					/>
					 
					<Hand ref={hand_ref}
						x={-580}
						y={80}
						opacity={0}
					/>
				</Layout>
				
				<Block ref={operator_layout_ref}
					y={0}
					x={650}
					width={200}
					height={200}
					scale={0.8}
					opacity={0}
					path="M 18,11.03 C 17.52,8.18 15.04,6 12.05,6 9.02,6 5.76,8.51 6.02,12.45 c 2.47,-1.01 4.33,-3.21 4.86,-5.89 1.31,2.63 4,4.44 7.12,4.47 z m 3,1.19 C 21,6.73 16.74,3 12,3 7.31,3 3,6.65 3,12.28 2.4,12.62 2,13.26 2,14 v 2 c 0,1.1 0.9,2 2,2 h 1 v -6.1 c 0,-3.87 3.13,-7 7,-7 3.87,0 7,3.13 7,7 V 19 h -8 v 2 h 8 c 1.1,0 2,-0.9 2,-2 v -1.22 c 0.59,-0.31 1,-0.92 1,-1.64 v -2.3 c 0,-0.7 -0.41,-1.31 -1,-1.62 z"
					pathAnimate="m 16,13 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z m -6,0 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z"
					path_scale={8}
					path_offset={-95}
				>
					<Layout ref={operator_diagnostics_ref}
						opacity={0}
						x={200}
					>
						<Rect
							width={150}
							height={270}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Layout
							y={-90}
						>
							<Rect
								width={120}
								height={40}
								fill="#f7646c"
								radius={10}
							/>
							<Path
								fill={catalogue_color.paper}
								data={"M 3,13 H 5 V 11 H 3 Z M 3,9 H 5 V 7 H 3 Z m 4,4 H 21 V 11 H 7 Z M 7,7 V 9 H 21 V 7 Z"}
								scale={4}
								x={-60}
								y={-40}
							/>
						</Layout>
						<Layout
							y={-30}
						>
							<Rect
								width={120}
								height={40}
								fill="#f99096"
								radius={10}
							/>
							<Path
								fill={catalogue_color.paper}
								data={"M 3,13 H 5 V 11 H 3 Z M 3,9 H 5 V 7 H 3 Z m 4,4 H 21 V 11 H 7 Z M 7,7 V 9 H 21 V 7 Z"}
								scale={4}
								x={-60}
								y={-40}
							/>
						</Layout>
						<Layout
							y={30}
						>
							<Rect
								width={120}
								height={40}
								fill="#f7646c"
								radius={10}
							/>
							<Path
								fill={catalogue_color.paper}
								data={"M 3,13 H 5 V 11 H 3 Z M 3,9 H 5 V 7 H 3 Z m 4,4 H 21 V 11 H 7 Z M 7,7 V 9 H 21 V 7 Z"}
								scale={4}
								x={-60}
								y={-40}
							/>
						</Layout>
						<Layout
							y={90}
						>
							<Rect
								width={120}
								height={40}
								fill="#f99096"
								radius={10}
							/>
							<Path
								fill={catalogue_color.paper}
								data={"M 3,13 H 5 V 11 H 3 Z M 3,9 H 5 V 7 H 3 Z m 4,4 H 21 V 11 H 7 Z M 7,7 V 9 H 21 V 7 Z"}
								scale={4}
								x={-60}
								y={-40}
							/>
						</Layout>
					</Layout>
				</Block>
				
				<Block ref={phoneBlock_layout_ref}
					y={300}
					x={0}
					scale={0.8}
					opacity={0}
					width={200}
					height={200}
					text="IVR"
					text_fontSize={100}
					text_offset={10}
				/>

				<Arrow ref={connect_1_ref} />
				<Arrow ref={connect_2_ref} />
				<Arrow ref={connect_3_ref} />
			</CameraView>
		</>
	);

	function* wifiError(state=true) {
		yield* all(
			wifi_ref().blockRef().fill((state ? catalogue_color.bad_fill : catalogue_color.fill), 1),
			wifi_ref().pathRef().fill((state ? catalogue_color.bad_outline : catalogue_color.outline), 1),
		);
	}

	function* sendWrench() {
		yield* connect_wrench_ref().sendPayload({ref: panel_ref().blockRef, position: "left"}, {ref: wifi_ref().blockRef, position: "right"})
	}

	function* sendDocument(connection_source: Connection, connection_destination: Connection) {
		yield* connect_document_ref().sendPayload(connection_source, connection_destination)
	}

	// We have here a panel and a component, in this case the wifi router

	yield* beginSlide("wifiError1");
	// The router encounters an error
	yield* wifiError(true);

	yield* beginSlide("panelNoticesError");
	// It would be very cool if the panel could notice the issue
	yield* sequence(0.4,
		engine_ref().opacity(1, 0.5),
		delay(0.5, engine_ref().eyeLook("left")),
	);

	yield* beginSlide("panelFixesError");
	// and "self heal" the problem
	yield* chain(
		engine_ref().gearSpin(),
		sendWrench(),
		engine_ref().eyeLook(),
	);

	// But what logic do we use to determine if this is a problem or not?
	yield* beginSlide("moveEyeToPlatform");
	// It would be better to keep that "off panel" so it can be updated and changed more easily
	yield* all(
		scenario_panel_ref().x(-400, 1),
		engine_ref().changeMode("with_block", 0.3),
		engine_ref().x(500, 1),
		engine_ref().y(0, 1),
	);

	yield* beginSlide("eyeConstantlyWatching");
	// Having it constantly watch the panel would put a big load on our system- because we need to watch every panel
	yield* engine_ref().eyeLook("left");
	yield* engine_ref().gearSpin();
	yield* engine_ref().gearSpin();
	yield* engine_ref().gearSpin();

	yield* beginSlide("clockAppears");
	// And let's generalize this to a clock that checks the panel every so often.
	yield* all(
		clock_ref().opacity(1, 0.5),
		clock_ref().x(clock_ref().x() + 200, 0.5),
		engine_ref().eyeLook(),
		clock_ref().turnClock(2),
		delay(4.8, chain(
			engine_ref().eyeLook("left"),
			waitFor(0.5),
			engine_ref().eyeLook(),
		)),
		delay(9.8, chain(
			engine_ref().eyeLook("left"),
			waitFor(0.5),
			engine_ref().eyeLook(),
		)),
	);

	yield* beginSlide("wifiError2");
	// This could send the fix request any time it is needed
	yield* all(
		engine_ref().eyeLook(),
		clock_ref().turnClock(1),
		delay(2, all(
			wifi_ref().blockRef().fill(catalogue_color.bad_fill, 1),
			wifi_ref().pathRef().fill(catalogue_color.bad_outline, 1),
		)),
		delay(4.8, chain(
			engine_ref().eyeLook("left"),
			delay(0.4, engine_ref().eyeLook()),
			engine_ref().gearSpin(),

			sendDocument({ref: engine_ref().blockRef, position: "left"}, {ref: panel_ref().blockRef, position: "right"}),
			sendWrench(),
		)),
	);

	yield* beginSlide("resourcesAppear");
	// Inorder to tyeup our entire ecosystem and realize the category of one. We will also connect to other data sources like, salesforce historical data, and a repository of instructions on how to fix something
	yield* sequence(0.2, 
		all(
			salesforce_ref().opacity(1, 1),
			salesforce_ref().y(salesforce_ref().y() + 10, 1),
		),
		all(
			history_ref().opacity(1, 1),
			history_ref().y(history_ref().y() + 10, 1),
		),
		all(
			instructions_ref().opacity(1, 1),
			instructions_ref().y(instructions_ref().y() + 10, 1),
		),
	);

	yield* beginSlide("scenario2");
	// Self healing is ideal, but also want to 'Meet Customers where they are in their support needs"
	yield* all(
		scenario_panel_ref().y(-300, 1),
		panel_ref().opacity(0.25, 1),
		clock_ref().opacity(0.25, 1),
	)

	yield* beginSlide("wifiError4");
	// A customer notices something is wrong with their system- but they don't know what
	yield* wifiError(true),

	yield* beginSlide("phoneAppears")
	// So they pull out their phone
	yield* scenario_phone_ref().opacity(1, 1);

	yield* beginSlide("open app")
	// and use the vivint app
	yield* phone_ref().showApp("vivint", 1);

	yield* beginSlide("customerFixesIt_sendMessage");
	// to communicate with this little box
	yield* all(
		hand_ref().opacity(1, 0.5),
		hand_ref().y(hand_ref().y() - 80, 1),
		delay(1, chain(
			hand_ref().touchRef().opacity(1, 0.5),
			hand_ref().touchRef().opacity(0, 0.5),
		)),
		delay(1.2, sequence(0.5,
			all(
				hand_ref().fingerRef().y(hand_ref().fingerRef().y() + 80, 1),
				delay(0.5, all(
					hand_ref().fingerRef().opacity(0, 0.5),
					connect_1_ref().drawArrow({ref: phone_ref().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
				)),
			),
		)),
	);
		
	yield* beginSlide("customerFixesIt_lookAtPanel");
	// This box looks at the panel
	yield* engine_ref().eyeLook("topLeft");

	yield* beginSlide("customerFixesIt_lookAtResources");
	// And looks at it's resources
	yield* engine_ref().eyeLook("top");

	yield* beginSlide("customerFixesIt_sendReply");
	// Thinks about it and returns list of all the issues their system has- with links on how to fix the issue
	yield* chain(
		engine_ref().eyeLook(),
		engine_ref().gearSpin(),
		all(
			sendDocument({ref: engine_ref().blockRef, position: "left"}, {ref: phone_ref().blockRef, position: "right"}),
			delay(0.8, phone_ref().showApp("diagnostics", 0.5)),
		),
	);

	yield* beginSlide("customerFixesIt_end");
	hand_ref().y(-470);
	
	yield* all(
		hand_ref().fingerRef().opacity(1, 0.5),
		hand_ref().fingerRef().y(hand_ref().fingerRef().y() - 80, 1),
		delay(1, chain(
			hand_ref().touchRef().opacity(1, 0.5),
			hand_ref().touchRef().opacity(0, 0.5),
		)),
	);

	yield* all(
		hand_ref().fingerRef().y(hand_ref().fingerRef().y() + 80, 1),
		wifiError(false),
		delay(0.5, sequence(0.5,
			hand_ref().fingerRef().opacity(0, 0.5),
			phone_ref().showApp("blank", 0.5),
		)),
	);

	yield* beginSlide("scenario3");
	// Another customers choose to contact us is by calling directly- how can we improve that experience?
	yield* all(
		operator_layout_ref().opacity(1, 1),
		operator_layout_ref().y(300, 1),
	);

	yield* beginSlide("wifiError5");
	// Customer notices the error
	yield* wifiError(true)

	yield* beginSlide("customerCalls_begin");
	// and calls our support team
	yield* phone_ref().showApp("call", 0.5);


	yield* beginSlide("customerCalls_intercept");
	// before the call gets to the agent, a robot asks them what their service number is
	yield* all(
		phoneBlock_layout_ref().opacity(1, 0.5),
		connect_1_ref().drawArrow({ref: phone_ref().blockRef, position: "right"}, {ref: phoneBlock_layout_ref().blockRef, position: "left"}, {timespan: 0.5, lag: 0.3, direction: "end", bend: "horizontal"}),
		delay(0.5, beginSlide("customerCalls_split")),
	);

	// Now, we can get a list of issues for the agent before the call even begins
	yield* all(
		connect_2_ref().drawArrow({ref: phoneBlock_layout_ref().blockRef, position: "top"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 1, direction: "end", bend: "vertical"}),
		delay(0.8,
			chain(
				engine_ref().eyeLook("topLeft"),
				beginSlide("customerCalls_thinking"),
				engine_ref().eyeLook("top"),
				waitFor(0.5),
			)
		)
	);

	yield* all(
		chain(
			all(
				engine_ref().eyeLook(),
				engine_ref().gearSpin(),
			),
			all(
				sendDocument({ref: engine_ref().blockRef, position: "bottom"}, {ref: operator_layout_ref().blockRef, position: "top"}),
				delay(0.8, operator_diagnostics_ref().opacity(1, 0.5)),
			),
		),
		connect_3_ref().drawArrow({ref: phoneBlock_layout_ref().blockRef, position: "right"}, {ref: operator_layout_ref().blockRef, position: "left"}, {timespan: 4, lag: 0.3, direction: "end", bend: "horizontal"}),
	)

	yield* beginSlide("grayAllOut");
	// The key here is the little box- the diagnostic engine. We are working on building this.
	yield* all(
		phoneBlock_layout_ref().opacity(0.25, 1),
		wifi_ref().opacity(0.25, 1),
		history_ref().opacity(0.25, 1),
		salesforce_ref().opacity(0.25, 1),
		// instructions_ref().opacity(0.25, 1),
		scenario_phone_ref().opacity(0.25, 1),
		operator_layout_ref().blockRef().opacity(0.25, 1),
	);

	// We will start our implementation here- but it will end up helping up here.


	yield* beginSlide("end");
 });
