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
import { Arrow, Connection, ConnectionPosition } from "../components/Arrow"
import { DataStream } from "../components/DataStream";

const isGifCapture = false; // Slightly changes the animation to make getting gifs easier

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
	const instructions_1_ref = createRef<Block>();
	const instructions_2_ref = createRef<Block>();
	const instructions_3_ref = createRef<Block>();
	const hand_ref = createRef<Hand>();
	const platform_ref = createRef<Block>();
	const infoStream_ref = createRef<DataStream>();
	const apiForApp_ref = createRef<Block>();
	const apiForPlatinumPro_ref = createRef<Block>();
	const apiForSelfHeal_ref = createRef<Block>();

	const operator_layout_ref = createRef<Block>();
	const operator_diagnostics_ref = createRef<Layout>();

	const connect_wrench_ref = createRef<Arrow>();
	const connect_document_1_ref = createRef<Arrow>();
	const connect_document_2_ref = createRef<Arrow>();
	const connect_document_3_ref = createRef<Arrow>();
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
					>
						<DataStream ref={infoStream_ref}
							mask_width={300}
							mask_height={600}
							show_mask={false}
						/>
					</Panel>

					<Block ref={wifi_ref}
						color_block={catalogue_color.fill}
						color_path={catalogue_color.outline}
						x={-75 - 120}
						y={0}
						path="M20.2 5.9l.8-.8C19.6 3.7 17.8 3 16 3s-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2s3 .6 4.2 1.7zm-.9.8c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4l.8.8c.7-.7 1.6-1 2.5-1 .9 0 1.8.3 2.5 1l.8-.8zM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM8 18H6v-2h2v2zm3.5 0h-2v-2h2v2zm3.5 0h-2v-2h2v2z"
					/>
				</Layout>

				<Layout ref={scenario_platform_ref}>
					<Arrow ref={connect_document_1_ref}
						payload="M16,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V8L16,3z M7,7h5v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10 V13z M15,9V5l4,4H15z"
					/>
					<Arrow ref={connect_document_2_ref}
						payload="M16,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V8L16,3z M7,7h5v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10 V13z M15,9V5l4,4H15z"
					/>
					<Arrow ref={connect_document_3_ref}
						payload="M16,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V8L16,3z M7,7h5v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10 V13z M15,9V5l4,4H15z"
					/>

					<Engine ref={engine_ref}
						x={panel_ref().blockRef().x() + 175}
						y={panel_ref().blockRef().y()}
						opacity={0}
						mode="no_block"
						showLabel={false}
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
						label="Salesforce"
					/>

					<Block ref={history_ref}
						x={500}
						y={-400 - 10}
						opacity={0}
						path="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
						labelTop="Historical"
						labelBottom="Data"
					/>

					<Block ref={instructions_1_ref}
						x={700}
						y={-400 - 10}
						opacity={0}
						path="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
						labelTop="Troubleshoot"
						labelBottom="Steps"
					/>

					<Block ref={instructions_2_ref}
						x={200}
						y={100}
						scale={0.7}
						opacity={0}
						path="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
						labelTop="Troubleshoot Steps"
						labelBottom="And Wording"
					/>

					<Block ref={instructions_3_ref}
						x={200}
						y={400}
						scale={0.7}
						opacity={0}
						path="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
						labelTop="Troubleshoot Steps"
						labelBottom="And Wording"
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
					y={350}
					x={500}
					// width={200}
					// height={200}
					// scale={0.8}
					opacity={0}
					path="M 18,11.03 C 17.52,8.18 15.04,6 12.05,6 9.02,6 5.76,8.51 6.02,12.45 c 2.47,-1.01 4.33,-3.21 4.86,-5.89 1.31,2.63 4,4.44 7.12,4.47 z m 3,1.19 C 21,6.73 16.74,3 12,3 7.31,3 3,6.65 3,12.28 2.4,12.62 2,13.26 2,14 v 2 c 0,1.1 0.9,2 2,2 h 1 v -6.1 c 0,-3.87 3.13,-7 7,-7 3.87,0 7,3.13 7,7 V 19 h -8 v 2 h 8 c 1.1,0 2,-0.9 2,-2 v -1.22 c 0.59,-0.31 1,-0.92 1,-1.64 v -2.3 c 0,-0.7 -0.41,-1.31 -1,-1.62 z"
					pathAnimate="m 16,13 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z m -6,0 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z"
					path_scale={6}
					path_offset={-75}
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

				<Block ref={apiForApp_ref}
					x={0}
					y={-300}
					opacity={0}
					path="M18,2H6C4.9,2,4,2.9,4,4v18h16V4C20,2.9,19.1,2,18,2z M15.5,13.5c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5 S17,11.17,17,12S16.33,13.5,15.5,13.5z"
					labelTop="Vivint App"
					labelBottom="API Endpoint"
				/>

				<Block ref={apiForPlatinumPro_ref}
					x={0}
					y={0}
					opacity={0}
					path="M18,2H6C4.9,2,4,2.9,4,4v18h16V4C20,2.9,19.1,2,18,2z M15.5,13.5c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5 S17,11.17,17,12S16.33,13.5,15.5,13.5z"
					labelTop="Platinum Pro"
					labelBottom="API Endpoint"
				/>

				<Block ref={apiForSelfHeal_ref}
					x={0}
					y={300}
					opacity={0}
					path="M18,2H6C4.9,2,4,2.9,4,4v18h16V4C20,2.9,19.1,2,18,2z M15.5,13.5c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5 S17,11.17,17,12S16.33,13.5,15.5,13.5z"
					labelTop="Panel Self Heal"
					labelBottom="API Endpoint"
				/>

				<Block ref={platform_ref}
					x={-660}
					y={300}
					width={200}
					opacity={0}
					path="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
					label="Platform"
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

	function* sendWrench(pauseLabel="", pauseTimespan:number=null) {
		yield* all( connect_wrench_ref().sendPayload({ref: panel_ref().blockRef, position: "left"}, {ref: wifi_ref().blockRef, position: "right"}, {pauseLabel, pauseTimespan}),
			delay(0.7, wifiError(false)),
		);
	}

	
	interface sendDocument_options {
		pauseLabel?: string
		pauseTimespan?: number,
		color?: string,
		document_ref?: Reference<Arrow>,
	}

	function* sendDocument(connection_source: Connection, connection_destination: Connection, {
		pauseLabel="", pauseTimespan=null, color="", document_ref=null,
	}:sendDocument_options = {}) {
		if (document_ref == null) {
			document_ref = connect_document_1_ref
		}
		yield* document_ref().sendPayload(connection_source, connection_destination, {pauseLabel, pauseTimespan, color})
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
		sendWrench("panelFixesError.2"),
		engine_ref().eyeLook(),
	);

	if (isGifCapture) {
		yield* engine_ref().opacity(0, 0.5);
		yield* beginSlide("pause");
		yield* engine_ref().opacity(1, 0.5);
	}

	// But what logic do we use to determine if this is a problem or not?
	yield* beginSlide("moveEyeToPlatform");
	// It would be better to keep that "off panel" so it can be updated and changed more easily
	yield* all(
		scenario_panel_ref().x(-400, 1),
		engine_ref().changeMode("with_block", 0.3),
		engine_ref().x(500, 1),
		engine_ref().y(0, 1),
		delay(0.5, engine_ref().showLabel(1)),
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
		clock_ref().y(clock_ref().y() + 320, 0.5),
		delay(0.3, clock_ref().blockRef().setLabel("Check Panel", "Trigger", 1)),
		engine_ref().eyeLook(),
		clock_ref().turnClock(2, 5, () => {
			return chain(
				connect_1_ref().drawArrow({ref: clock_ref().blockRef().blockRef, position: "top"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
				engine_ref().eyeLook("left"),
				waitFor(0.5),
				engine_ref().eyeLook(),
				connect_1_ref().drawArrow({ref: engine_ref().blockRef, position: "bottom"}, {ref: clock_ref().blockRef().blockRef, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
			);
		}),
	);

	yield* beginSlide("wifiError2");
	// This could send the fix request any time it is needed
	yield* all(
		engine_ref().eyeLook(),
		clock_ref().turnClock(1, 5, () => {
			return chain(
				connect_1_ref().drawArrow({ref: clock_ref().blockRef().blockRef, position: "top"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
				engine_ref().eyeLook("left"),
				delay(0.4, engine_ref().eyeLook()),
				engine_ref().gearSpin(),

				sendDocument({ref: engine_ref().blockRef, position: "bottom"}, {ref: clock_ref().blockRef().blockRef, position: "top"}, {pauseLabel: "wifiError3"}),
				sendDocument({ref: clock_ref().blockRef().blockRef, position: "left"}, {ref: panel_ref().blockRef, position: "right"}, {pauseLabel: "wifiError3.2"}),
				sendWrench("wifiError4"),
			);
		}),
		delay(2, all(
			wifi_ref().blockRef().fill(catalogue_color.bad_fill, 1),
			wifi_ref().pathRef().fill(catalogue_color.bad_outline, 1),
		)),
	);

	yield* beginSlide("resourcesAppear");
	// Inorder to tyeup our entire ecosystem and realize the category of one. We will also connect to other data sources like, salesforce historical data, and a repository of instructions on Troubleshoot Steps something
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
			instructions_1_ref().opacity(1, 1),
			instructions_1_ref().y(instructions_1_ref().y() + 10, 1),
		),
	);

	yield* beginSlide("scenario2");
	// Self healing is ideal, but also want to 'Meet Customers where they are in their support needs"
	yield* all(
		scenario_panel_ref().y(-300, 1),
		panel_ref().opacity(0.25, 1),
		clock_ref().opacity(0.25, 1),
		clock_ref().y(clock_ref().y() - 320, 0.5),
		clock_ref().x(clock_ref().x() + 220, 0.5),
		clock_ref().blockRef().setLabel("", "", 0.5),
	)

	yield* beginSlide("wifiError6");
	// A customer notices something is wrong with their system- but they don't know what
	yield* wifiError(true),

	yield* beginSlide("phoneAppears")
	// So they pull out their phone
	yield* scenario_phone_ref().opacity(1, 1);

	yield* beginSlide("open app")

	// and use the vivint app
	yield* phone_ref().showApp("vivint", 1);

	if (isGifCapture) {
		yield* phone_ref().blockRef().setLabel("App on", "Customer Phone", 1);
	}

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
					connect_1_ref().drawArrow({ref: phone_ref().blockRef().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal", pauseLabel: "customerFixesIt_lookAtPanel"}),
				)),
			),
		)),
	);
		
	// yield* beginSlide("customerFixesIt_lookAtPanel");
	// This box looks at the panel
	yield* engine_ref().eyeLook("topLeft");
	yield* waitFor(0.8);

	yield* beginSlide("customerFixesIt_lookAtResources");
	// And looks at it's resources
	yield* engine_ref().eyeLook("top");
	yield* waitFor(0.8);

	yield* beginSlide("customerFixesIt_sendReply");
	// Thinks about it and returns list of all the issues their system has- with links on Troubleshoot Steps the issue
	yield* chain(
		engine_ref().eyeLook(),
		engine_ref().gearSpin(),
		all(
			sendDocument({ref: engine_ref().blockRef, position: "left"}, {ref: phone_ref().blockRef().blockRef, position: "right"}, {pauseLabel: "customerFixesIt_sendReply.2"}),
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

	if (isGifCapture) {
		yield* phone_ref().opacity(0, 0.5);
		yield* beginSlide("pause");
		yield* operator_layout_ref().setLabel("Call Center", "", 0);
	}

	yield* beginSlide("scenario3");
	// Another customers choose to contact us is by calling directly- how can we improve that experience?
	yield* all(
		operator_layout_ref().opacity(1, 1),
	);

	yield* beginSlide("wifiError5");
	// Customer notices the error
	yield* wifiError(true);
	
	if (isGifCapture) {
		yield* phone_ref().blockRef().setLabel("", "", 0);
		yield* phone_ref().opacity(1, 0.5);
	}

	yield* beginSlide("customerCalls_begin");
	// and calls our support team
	yield* phone_ref().showApp("call", 0.5);

	if (isGifCapture) {
		yield* phone_ref().blockRef().setLabel("Customer", "Calling Vivint", 1);
	}

	yield* beginSlide("customerCalls_intercept");
	// before the call gets to the agent, a robot asks them what their service number is, which could ask the engine about the system
	yield* all(
		connect_1_ref().drawArrow({ref: phone_ref().blockRef().blockRef, position: "right"}, {ref: operator_layout_ref().blockRef, position: "left"}, {timespan: 0.5, lag: 0.3, direction: "end", bend: "horizontal", pauseLabel: "careAgentTurn.1", pauseTimespan: 0.4}),
	);

	// The engine looks at it's sources and thinks about it
	// yield* beginSlide("careAgentTurn")
	yield* all(
		connect_2_ref().drawArrow({ref: operator_layout_ref().blockRef, position: "top"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 1, direction: "end", bend: "horizontal", pauseLabel: "careAgentTurn.2", pauseTimespan: 1}),
		delay(1, engine_ref().eyeLook("topLeft")),
		delay(1.8, engine_ref().eyeLook("top")),
		delay(2.6, all(
			engine_ref().eyeLook(),
			engine_ref().gearSpin(),
		)),
	);

	// The care agent can then have a conversation armed with knowledge of what is wrong before the call even begins
	yield* beginSlide("customerCalls_reply")
	yield* all(
		chain(
			sendDocument({ref: engine_ref().blockRef, position: "bottom"}, {ref: operator_layout_ref().blockRef, position: "top"}, {pauseLabel: "customerCalls_reply.2"}),
			operator_diagnostics_ref().opacity(1, 0.5),
			connect_2_ref().drawArrow({ref: operator_layout_ref().blockRef, position: "left"}, {ref: phone_ref().blockRef().blockRef, position: "right"}, {timespan: 1, lag: 1, direction: "end", bend: "horizontal", pauseLabel: "customerCalls_reply.3", pauseTimespan: 1}),
		),
	);

	if (isGifCapture) {
		yield* wifiError(false);
		yield* phone_ref().opacity(0, 0.5);
		yield* operator_diagnostics_ref().opacity(0, 0.5),
		yield* beginSlide("pause");
		yield* operator_layout_ref().setLabel("", "", 0);
	}


	yield* beginSlide("grayAllOut");
	// The key here is the little box- the diagnostic engine. This produces the same message for all clients, but they apply it in different ways.
	yield* all(
		wifiError(false),
		wifi_ref().opacity(0.25, 1),
		history_ref().opacity(0.25, 1),
		salesforce_ref().opacity(0.25, 1),
		instructions_1_ref().opacity(0.25, 1),
		scenario_phone_ref().opacity(0.25, 1),
		operator_layout_ref().opacity(0.25, 1),
		operator_diagnostics_ref().opacity(0.25, 1),
	);

	// So, how does this actually work?
	yield* beginSlide("howItWorks");
	yield* all(
		engine_ref().x(0, 1),
		wifi_ref().opacity(0, 1),
		history_ref().opacity(0, 1),
		salesforce_ref().opacity(0, 1),
		instructions_1_ref().opacity(0, 1),
		scenario_phone_ref().opacity(0, 1),
		operator_layout_ref().opacity(0, 1),
		operator_diagnostics_ref().opacity(0, 1),
		panel_ref().opacity(0, 1),
		clock_ref().opacity(0, 1),
		engine_ref().hideLabel(0.5),
	);

	// The engine is actually made up of multiple parts. There are 2 main ones. One that watches the panel and one that thinks about things.
	yield* beginSlide("engineSplit");
	yield* all(
		engine_ref().eyeRef().standalone(true, 1),
		engine_ref().eyeRef().x(-540, 1),
		engine_ref().x(300, 1),
		engine_ref().showLabel(1, "Thinker", ""),
		engine_ref().eyeRef().showLabel(1, "Observer", ""),
	);
	
	// The panel is constantly sending data to our Platform.
	panel_ref().x(-400)
	yield* beginSlide("panelWillSendData");
	yield* all(
		panel_ref().opacity(1, 1),
		platform_ref().opacity(1, 1),
		infoStream_ref().opacity(1, 1),
	);

	// The observer can watch this data stream and copy pieces of the data that it cares about.
	yield* beginSlide("dataStream");
	yield* all(
		infoStream_ref().sendStream({columns:3, rows:50, linesPerSecond:8, periodicSyphon_ref: engine_ref().eyeRef().blockRef().mainRef, periodicSyphon_batchCount: 2}),
		delay(1, engine_ref().eyeLook("left")),
		history_ref().setLabel("Mongo DB", "", 0),
		clock_ref().blockRef().setLabel("Client Program", "", 0),
	);
	yield* engine_ref().eyeLook(),

	// These values get stored in our database so the thinker can reference them later
	history_ref().x(0)
	yield* beginSlide("storeInDatabase.1");
	yield* history_ref().opacity(1, 1)
	yield* engine_ref().eyeLook("topRight")
	yield* connect_1_ref().drawArrow({ref: engine_ref().eyeRef().blockRef().blockRef, position: "top"}, {ref: history_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", pauseLabel: "storeInDatabase.2"})
	yield* engine_ref().eyeLook()

	if (isGifCapture) {
		yield* all(
			history_ref().opacity(0, 0.5),
			panel_ref().opacity(0, 0.5),
			platform_ref().opacity(0, 0.5),
		)
	}

	// Clients ask the thinker questions
	clock_ref().y(300);
	yield* beginSlide("clientAppears.1");
	yield* all(
		(isGifCapture ? history_ref().opacity(1, 1) : null),
		clock_ref().opacity(1, 1),
	);
	yield* connect_1_ref().drawArrow({ref: clock_ref().blockRef().blockRef, position: "top"}, {ref: engine_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", pauseLabel: "clientAppears.2"});

	// The thinking portion then ask the database about what the system currently looks like
	yield* connect_1_ref().drawArrow({ref: engine_ref().blockRef, position: "top"}, {ref: history_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", pauseLabel: "clientAppears.3"});
	yield* connect_1_ref().drawArrow({ref: history_ref().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "counter_clockwise_90", pauseLabel: "clientAppears.4"});

	// It can then think about the information and reply to the client with detailed instructions
	yield* engine_ref().gearSpin();
	yield* sendDocument({ref: engine_ref().blockRef, position: "bottomRight"}, {ref: clock_ref().blockRef().blockRef, position: "topLeft"}, {pauseLabel: "clientAppears.5"});

	
	if (isGifCapture) {
		yield* all(
			history_ref().opacity(0, 0.5),
			clock_ref().opacity(0, 0.5),
		)
		yield* beginSlide("pause");
		yield* all(
			panel_ref().opacity(1, 0),
			platform_ref().opacity(1, 0),
			history_ref().opacity(1, 0),
			clock_ref().opacity(1, 0),
		);
	}

	function* doStreamSection() {
		yield* connect_2_ref().drawArrow({ref: clock_ref().blockRef().blockRef, position: "top"}, {ref: engine_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90"});
		yield* connect_2_ref().drawArrow({ref: engine_ref().blockRef, position: "top"}, {ref: history_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90"});
		yield* connect_2_ref().drawArrow({ref: history_ref().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "counter_clockwise_90"});
		yield* engine_ref().gearSpin();
		yield* sendDocument({ref: engine_ref().blockRef, position: "bottomRight"}, {ref: clock_ref().blockRef().blockRef, position: "topLeft"});
		yield* waitFor(0.4);
	};

	// All the while, the observer is constantly updating what is in the database so when the thinker is asked- it can use the latest information.
	yield* all(
		delay(1, engine_ref().eyeLook("left")),
		infoStream_ref().sendStream({columns:3, rows:200, linesPerSecond:8, periodicSyphon_ref: engine_ref().eyeRef().blockRef().mainRef, periodicSyphon_batchCount: 4, periodicSyphon_callbackSequence:() => {
			return chain(
				(isGifCapture ? chain(
					engine_ref().eyeLook(),
					waitFor(0.4),
				 ) : waitFor(0)),
				engine_ref().eyeLook("top"),
				connect_1_ref().drawArrow({ref: engine_ref().eyeRef().blockRef().blockRef, position: "top"}, {ref: history_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90"}),
				engine_ref().eyeLook("left"),
				);
		}}),
		delay(1, chain(
			doStreamSection(),
			doStreamSection(),
			doStreamSection(),
		)),
	);
	yield* engine_ref().eyeLook();

	// The clients don't actually talk directly to the engine either though.
	yield* beginSlide("apiLayer_clientsAppear");
	yield* all(
		panel_ref().opacity(0, 1),
		platform_ref().opacity(0, 1),
		infoStream_ref().opacity(0, 1),
		history_ref().opacity(0, 1),
		engine_ref().eyeRef().opacity(0, 1),
		phone_ref().showApp("vivint", 0),
	);

	operator_layout_ref().x(700)
	operator_layout_ref().y(20)
	phone_ref().x(700)
	phone_ref().y(-500)
	yield* all(
		engine_ref().x(-600, 1),
		delay(0.5, sequence(0.1,
			operator_layout_ref().opacity(1, 1),
			scenario_phone_ref().opacity(1, 1),
			phone_ref().opacity(1, 1),
			all(
				operator_layout_ref().setLabel("Platinum Pro", "", 1),
				phone_ref().blockRef().setLabel("Vivint App", "", 1),
				clock_ref().blockRef().setLabel("Panel Self Heal", "", 1),
			),
		)),
	);

	// We actually have curated endpoints for them to ask
	yield* beginSlide("apiLayer_doorsAppear");
	yield* sequence(0.1,
		apiForApp_ref().opacity(1, 1),
		apiForPlatinumPro_ref().opacity(1, 1),
		apiForSelfHeal_ref().opacity(1, 1),
		instructions_1_ref().setLabel("Troubleshoot Steps", "And Wording", 0)
	);

	// A client will ask it's specific api endpoint
	yield* beginSlide("apiLayer_askApi");
	yield* connect_1_ref().drawArrow({ref: clock_ref().blockRef().blockRef, position: "left"}, {ref: apiForSelfHeal_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "none", pauseLabel: "apiLayer_askApi.2"});

	// The api endpoint then asks the thinker, which replies back
	yield* connect_1_ref().drawArrow({ref: apiForSelfHeal_ref().blockRef, position: "left"}, {ref: engine_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal", pauseLabel: "apiLayer_askApi.3"});
	yield* engine_ref().gearSpin();
	yield* sendDocument({ref: engine_ref().blockRef, position: "bottomRight"}, {ref: apiForSelfHeal_ref().blockRef, position: "topLeft"}, {pauseLabel: "apiLayer_askApi.4", color: "#d1d1d1"});

	// The endpoint then can customize the shape, namings, and add instructions for their specific client to fix the issue
	instructions_1_ref().x(200);
	instructions_1_ref().y(-200);
	instructions_1_ref().scale(0.7);
	yield* sequence(0.1,
		instructions_1_ref().opacity(1, 1),
		instructions_2_ref().opacity(1, 1),
		instructions_3_ref().opacity(1, 1),
	);
	yield* sendDocument({ref: apiForSelfHeal_ref().blockRef, position: "right"}, {ref: instructions_3_ref().blockRef, position: "topLeft"}, {pauseLabel: "apiLayer_replyApi.1", color: "#d1d1d1"});
	yield* sendDocument({ref: instructions_3_ref().blockRef, position: "topLeft"}, {ref: apiForSelfHeal_ref().blockRef, position: "right"}, {pauseLabel: "apiLayer_replyApi.2"});

	// The personalized payload is then sent to the client
	yield* sendDocument({ref: apiForSelfHeal_ref().blockRef, position: "right"}, {ref: clock_ref().blockRef().blockRef, position: "left"}, {pauseLabel: "apiLayer_replyApi.3"});

	interface doClientSection_params {
		client_ref: Reference<Layout>
		api_ref: Reference<Layout>
		instructions_ref: Reference<Layout>
		connect_ref: Reference<Arrow>
		document_ref: Reference<Arrow>
		document_color: string
		document_target: ConnectionPosition
		document_source: ConnectionPosition
	}
	function* doClientSection({client_ref, api_ref, instructions_ref, connect_ref, document_ref, document_color, document_source, document_target}:doClientSection_params, loopTimes:number=1) {
		for (let i = 0; i < loopTimes; i++) {
			if (isGifCapture) {
				yield* beginSlide("pause");
			}
			yield* connect_ref().drawArrow({ref: client_ref, position: "left"}, {ref: api_ref, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "none"});
			yield* connect_ref().drawArrow({ref: api_ref, position: "left"}, {ref: engine_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"});
			yield* engine_ref().gearSpin();
			yield* sendDocument({ref: engine_ref().blockRef, position: document_source}, {ref: api_ref, position: document_target}, {color: "#d1d1d1", document_ref});
			yield* sendDocument({ref: api_ref, position: "right"}, {ref: instructions_ref, position: "topLeft"}, {color: "#d1d1d1", document_ref});
			yield* sendDocument({ref: instructions_ref, position: "topLeft"}, {ref: api_ref, position: "right"}, {color: document_color, document_ref});
			yield* sendDocument({ref: api_ref, position: "right"}, {ref: client_ref, position: "left"}, {color: document_color, document_ref});
		}
	};

	// This allows for each client to have a customized experience
	yield* all(
		doClientSection({
			client_ref: clock_ref().blockRef().blockRef,
			api_ref: apiForSelfHeal_ref().blockRef,
			instructions_ref: instructions_3_ref().blockRef,
			connect_ref: connect_3_ref,
			document_ref: connect_document_3_ref,
			document_color: "#F67E20",
			document_source: "right",
			document_target: "left",
		}, 3),
		
		delay(2.4, doClientSection({
			client_ref: operator_layout_ref().blockRef,
			api_ref: apiForPlatinumPro_ref().blockRef,
			instructions_ref: instructions_2_ref().blockRef,
			connect_ref: connect_2_ref,
			document_ref: connect_document_2_ref,
			document_color: "#2196f3",
			document_source: "right",
			document_target: "left",
		}, 3)),
		
		delay(4.6, doClientSection({
			client_ref: phone_ref().blockRef().blockRef,
			api_ref: apiForApp_ref().blockRef,
			instructions_ref: instructions_1_ref().blockRef,
			connect_ref: connect_1_ref,
			document_ref: connect_document_1_ref,
			document_color: "#7E21F3",
			document_source: "right",
			document_target: "left",
		}, 3)),
	);

	yield* beginSlide("end");
 });
