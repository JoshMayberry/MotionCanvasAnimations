import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, createSignal, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, tween, useLogger, waitFor, map, Reference} from '@motion-canvas/core';
import {drawArrow, catalogue_color, hopIn, hopOut, Connection} from "../utils";
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
	const eye_gear_ref = createRef<Layout>();
	const eye_gear_body_ref = createRef<Path>();

	const wrench_layout_ref = createRef<Layout>();
	const wrench_body_ref = createRef<Path>();
	const wrench_signal = createSignal(0);

	const document_layout_ref = createRef<Layout>();
	const document_body_ref = createRef<Path>();
	const document_signal = createSignal(0);

	const clock_layout_ref = createRef<Layout>();
	const clock_ref = createRef<Rect>();
	const clock_hand_ref = createRef<Line>();

	const history_layout_ref = createRef<Layout>();
	const history_ref = createRef<Rect>();
	const history_body_ref = createRef<Path>();

	const salesforce_layout_ref = createRef<Layout>();
	const salesforce_ref = createRef<Rect>();
	const salesforce_body_ref = createRef<Path>();

	const instructions_layout_ref = createRef<Layout>();
	const instructions_ref = createRef<Rect>();
	const instructions_body_ref = createRef<Path>();

	const phone_layout_ref = createRef<Layout>();
	const phone_ref = createRef<Rect>();
	const phone_vivintApp_ref = createRef<Layout>();
	const phone_diagnostics_ref = createRef<Layout>();
	const phone_call_ref = createRef<Path>();

	const phoneBlock_layout_ref = createRef<Layout>();
	const phoneBlock_ref = createRef<Rect>();
	const phoneBlock_body_ref = createRef<Path>();

	const finger_layout_ref = createRef<Layout>();
	const finger_body_ref = createRef<Path>();
	const finger_touch_ref = createRef<Path>();

	const operator_layout_ref = createRef<Layout>();
	const operator_ref = createRef<Rect>();
	const operator_body_ref = createRef<Path>();
	const operator_eyes_ref = createRef<Path>();
	const operator_diagnostics_ref = createRef<Layout>();

	const connect_wrench_ref = createRef<Line>();
	const connect_document_ref = createRef<Line>();
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
						<Layout
							scale={0.5}
							x={90}
							y={50}
						>
							<Path
								fill={catalogue_color.paper}
								data={"M162.83,88.84l94,87.73v111h-188v-111l94-87.73m0-88.83A14.38,14.38,0,0,0,153,3.91L9.2,138.08A29,29,0,0,0,0,159.24V342a14.47,14.47,0,0,0,14.48,14.47H311.17A14.47,14.47,0,0,0,325.65,342h0V159.23a29,29,0,0,0-9.2-21.16L172.7,3.9A14.39,14.39,0,0,0,162.82,0Z"}
								scale={0.2}
								x={-40}
								y={-35}
							/>
							<Circle
								fill={catalogue_color.paper}
								width={20}
								height={20}
								x={38}
								y={25}
							/>
						</Layout>
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
					<Layout ref={document_layout_ref}
						opacity={0}
						zIndex={100}
						position={() => connect_document_ref().getPointAtPercentage(document_signal()).position}
						// rotation={() => connect_document_ref().getPointAtPercentage(document_signal()).tangent.degrees}
					>
						<Path ref={document_body_ref}
							fill={catalogue_color.vivint_orange}
							data={"M16,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V8L16,3z M7,7h5v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10 V13z M15,9V5l4,4H15z"}
							scale={3}
							x={-40}
							y={-40}
						/>
					</Layout>
					
					<Line ref={connect_document_ref}
						lineWidth={8}
						stroke="red"
						startOffset={10}
						endOffset={10}
						radius={20}
						points={[0,0]}
						opacity={0}
					/>

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
						<Layout
							x={-60}
							y={-60}
						>
							<Layout ref={eye_gear_ref}
								x={60}
								y={60}
							>
								<Path ref={eye_gear_body_ref}
									fill={catalogue_color.outline}
									data={"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"}
									scale={7}
									x={-84}
									y={-84}
								/>
							</Layout>
							<Path ref={eye_body_ref}
								scale={5}
								fill={catalogue_color.paper}
								data={"M 12,4.5 C 7,4.5 2.73,7.61 1,12 c 1.73,4.39 6,7.5 11,7.5 5,0 9.27,-3.11 11,-7.5 C 21.27,7.61 17,4.5 12,4.5 Z M 12,17 C 9.24,17 7,14.76 7,12 7,9.24 9.24,7 12,7 c 2.76,0 5,2.24 5,5 0,2.76 -2.24,5 -5,5 z"}
							/>
								
							<Path ref={eye_pupil_ref}
								scale={5}
								fill={catalogue_color.paper}
								data={"M 14.871429,12.043987 A 2.814286,2.9582725 0 0 1 12.057143,15.00226 2.814286,2.9582725 0 0 1 9.2428572,12.043987 2.814286,2.9582725 0 0 1 12.057143,9.0857148 2.814286,2.9582725 0 0 1 14.871429,12.043987 Z"}
							/>
						</Layout>
					</Layout>

					<Layout ref={clock_layout_ref}
						x={500}
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

					<Layout ref={salesforce_layout_ref}
						x={300}
						y={-400 - 10}
						opacity={0}
					>
						<Rect ref={salesforce_ref}
							width={150}
							height={150}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Path ref={salesforce_body_ref}
							fill={catalogue_color.paper}
							data={"M9.01 20.5a4.642 4.642 0 0 1-4.191-2.632 5.136 5.136 0 0 1-.48.019C1.946 17.887 0 15.932 0 13.529c0-1.4.685-2.721 1.812-3.538a4.861 4.861 0 0 1-.259-1.563c0-2.717 2.224-4.928 4.956-4.928 1.374 0 2.665.547 3.613 1.516a4.555 4.555 0 0 1 2.886-1.031c1.48 0 2.875.748 3.733 1.978a5.41 5.41 0 0 1 1.815-.306c3.002 0 5.443 2.455 5.443 5.472 0 3.018-2.449 5.472-5.46 5.472a5.33 5.33 0 0 1-.727-.053 4.132 4.132 0 0 1-4.749 1.587A4.634 4.634 0 0 1 9.01 20.5zm-3.881-3.685c.206 0 .396.128.47.328.514 1.41 1.885 2.357 3.411 2.357a3.636 3.636 0 0 0 3.35-2.196.504.504 0 0 1 .666-.259c1.613.729 3.335.094 4.1-1.286a.505.505 0 0 1 .525-.25c.348.062.63.091.89.091 2.459 0 4.46-2.006 4.46-4.472s-1.993-4.472-4.443-4.472c-.652 0-1.274.132-1.8.381a.503.503 0 0 1-.649-.206c-.645-1.139-1.833-1.847-3.1-1.847-.969 0-1.9.396-2.557 1.088a.5.5 0 0 1-.692.032.622.622 0 0 1-.077-.077A4.045 4.045 0 0 0 6.509 4.5c-2.182 0-3.956 1.762-3.956 3.928 0 .538.114 1.075.329 1.554a.501.501 0 0 1-.204.637A3.384 3.384 0 0 0 1 13.529c0 1.852 1.497 3.357 3.338 3.357.291 0 .495-.018.683-.06a.565.565 0 0 1 .108-.011z"}
							scale={5}
							x={-60}
							y={-60}
						/>
					</Layout>

					<Layout ref={history_layout_ref}
						x={500}
						y={-400 - 10}
						opacity={0}
					>
						<Rect ref={history_ref}
							width={150}
							height={150}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Path ref={history_body_ref}
							fill={catalogue_color.paper}
							data={"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"}
							scale={5}
							x={-60}
							y={-60}
						/>
					</Layout>

					<Layout ref={instructions_layout_ref}
						x={700}
						y={-400 - 10}
						opacity={0}
					>
						<Rect ref={instructions_ref}
							width={150}
							height={150}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Path ref={instructions_body_ref}
							fill={catalogue_color.paper}
							data={"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}
							scale={5}
							x={-60}
							y={-60}
						/>
					</Layout>
				</Layout>

				<Layout ref={scenario_phone_ref}
					opacity={0}
					y={200}
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
						<Layout ref={phone_vivintApp_ref}
							scale={1}
							x={0}
							y={0}
							opacity={0}
						>
							<Path
								fill={catalogue_color.paper}
								data={"M162.83,88.84l94,87.73v111h-188v-111l94-87.73m0-88.83A14.38,14.38,0,0,0,153,3.91L9.2,138.08A29,29,0,0,0,0,159.24V342a14.47,14.47,0,0,0,14.48,14.47H311.17A14.47,14.47,0,0,0,325.65,342h0V159.23a29,29,0,0,0-9.2-21.16L172.7,3.9A14.39,14.39,0,0,0,162.82,0Z"}
								scale={0.2}
								x={-40}
								y={-35}
							/>
							<Circle
								fill={catalogue_color.paper}
								width={20}
								height={20}
								x={38}
								y={25}
							/>
						</Layout>
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
				</Layout>
				
				<Layout ref={phoneBlock_layout_ref}
					y={300}
					x={0}
					scale={0.8}
					opacity={0}
				>
					<Rect ref={phoneBlock_ref}
						width={200}
						height={200}
						fill={catalogue_color.outline}
						radius={10}
					/>
					<Txt
						fill={catalogue_color.paper}
						text={"IVR"}
						fontSize={100}
						y={10}
					/>
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

	let _eye_position = "center";
	function* eyeLook(position:"center" | "left" | "topLeft" | "top" | "topRight" | "right" | "bottomRight" | "bottom" | "bottomLeft" = "center") {
		if (position == _eye_position) {
			return;
		}

		if (_eye_position != "center") {
			yield* all(
				eye_pupil_ref().x(0, 0.2),
				eye_pupil_ref().y(0, 0.2),
			);
		}

		_eye_position = position;
		switch (position) {
			case "center":
				yield* all(
					eye_pupil_ref().x(0, 0.2),
					eye_pupil_ref().y(0, 0.2),
				);
				return;

			case "left":
				yield* eye_pupil_ref().x(-10, 0.2);
				return;
			
			case "topLeft":
				yield* all(
					eye_pupil_ref().x(-10, 0.2),
					eye_pupil_ref().y(-5, 0.2),
				);
				return;

			case "top":
				yield* eye_pupil_ref().y(-10, 0.2);
				return;
			
			case "topRight":
				yield* all(
					eye_pupil_ref().x(10, 0.2),
					eye_pupil_ref().y(-5, 0.2),
				);
				return;
			
			case "right":
				yield* all(
					eye_pupil_ref().x(10, 0.2),
				);
				return;
			
			case "bottomRight":
				yield* all(
					eye_pupil_ref().x(10, 0.2),
					eye_pupil_ref().y(5, 0.2),
				);
				return;

			case "bottom":
				yield* eye_pupil_ref().y(10, 0.2);
				return;
			
			case "bottomLeft":
				yield* all(
					eye_pupil_ref().x(-10, 0.2),
					eye_pupil_ref().y(5, 0.2),
				);
				return;
		}
	}

	function* gearSpin() {
		eye_gear_ref().rotation(0);
		yield* all(
			eye_gear_ref().rotation(easeInOutCubic(1) * 360, 2),
		);
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

	function* sendDocument(connection_source: Connection, connection_destination: Connection) {
		yield* all(
			document_layout_ref().opacity(1, 0.2),
			drawArrow(connect_document_ref, connection_source, connection_destination, {timespan: 1, lag: 0, direction: "end", signal: document_signal, bend: "none"}),
			delay(0.8, all(
				document_layout_ref().opacity(0, 0.2),
			)),
		);
	}

	// We have here a panel and a component, in this case the wifi router

	yield* beginSlide("wifiError1");
	// The router encounters an error
	yield* wifiError(true);

	yield* beginSlide("panelNoticesError");
	// It would be very cool if the panel could notice the issue
	yield* sequence(0.4,
		eye_layout_ref().opacity(1, 0.5),
		delay(0.5, eyeLook("left")),
	);

	yield* beginSlide("panelFixesError");
	// and "self heal" the problem
	yield* chain(
		gearSpin(),
		sendWrench(),
		eyeLook(),
	);

	// But what logic do we use to determine if this is a problem or not?
	yield* beginSlide("moveEyeToPlatform");
	// It would be better to keep that "off panel" so it can be updated and changed more easily
	yield* all(
		scenario_panel_ref().x(-400, 1),
		eye_ref().opacity(1, 0.3),
		eye_gear_body_ref().fill(catalogue_color.fill , 0.3),
		eye_layout_ref().x(500, 1),
		eye_layout_ref().y(0, 1),
	);

	yield* beginSlide("eyeConstantlyWatching");
	// Having it constantly watch the panel would put a big load on our system- because we need to watch every panel
	yield* eyeLook("left");
	yield* gearSpin();
	yield* gearSpin();
	yield* gearSpin();

	yield* beginSlide("clockAppears");
	// And let's generalize this to a clock that checks the panel every so often.
	clock_hand_ref().rotation(0);
	yield* all(
		clock_layout_ref().opacity(1, 0.5),
		clock_layout_ref().x(clock_layout_ref().x() + 200, 0.5),
		eyeLook(),
		tween(10, (percentage) => {
			clock_hand_ref().rotation(map(0, 360 * 2, percentage))
		}),
		delay(4.8, chain(
			eyeLook("left"),
			waitFor(0.5),
			eyeLook(),
		)),
		delay(9.8, chain(
			eyeLook("left"),
			waitFor(0.5),
			eyeLook(),
		)),
	);

	yield* beginSlide("wifiError2");
	// This could send the fix request any time it is needed
	clock_hand_ref().rotation(0);
	yield* all(
		eyeLook(),
		tween(5, (percentage) => {
			clock_hand_ref().rotation(map(0, 360, percentage))
		}),
		delay(2, all(
			wifi_ref().fill(catalogue_color.bad_fill, 1),
			wifi_body_ref().fill(catalogue_color.bad_outline, 1),
		)),
		delay(4.8, chain(
			eyeLook("left"),
			delay(0.4, eyeLook()),
			gearSpin(),

			sendDocument({ref: eye_ref, position: "left"}, {ref: panel_ref, position: "right"}),
			sendWrench(),
		)),
	);

	yield* beginSlide("resourcesAppear");
	// Inorder to tyeup our entire ecosystem and realize the category of one. We will also connect to other data sources like, salesforce historical data, and a repository of instructions on how to fix something
	yield* sequence(0.2, 
		all(
			salesforce_layout_ref().opacity(1, 1),
			salesforce_layout_ref().y(salesforce_layout_ref().y() + 10, 1),
		),
		all(
			history_layout_ref().opacity(1, 1),
			history_layout_ref().y(history_layout_ref().y() + 10, 1),
		),
		all(
			instructions_layout_ref().opacity(1, 1),
			instructions_layout_ref().y(instructions_layout_ref().y() + 10, 1),
		),
	);

	yield* beginSlide("scenario2");
	// Self healing is ideal, but also want to 'Meet Customers where they are in their support needs"
	yield* all(
		scenario_panel_ref().y(-300, 1),
		panel_layout_ref().opacity(0.25, 1),
		clock_layout_ref().opacity(0.25, 1),
	)

	yield* beginSlide("wifiError4");
	// A customer notices something is wrong with their system- but they don't know what
	yield* wifiError(true),

	yield* beginSlide("phoneAppears")
	// So they pull out their phone
	yield* scenario_phone_ref().opacity(1, 1);

	yield* beginSlide("open app")
	// and use the vivint app
	yield* phone_vivintApp_ref().opacity(1, 1),

	yield* beginSlide("customerFixesIt_sendMessage");
	// to communicate with this little box
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
				)),
			),
		)),
	);
		
	yield* beginSlide("customerFixesIt_lookAtPanel");
	// This box looks at the panel
	yield* eyeLook("topLeft");

	yield* beginSlide("customerFixesIt_lookAtResources");
	// And looks at it's resources
	yield* eyeLook("top");

	yield* beginSlide("customerFixesIt_sendReply");
	// Thinks about it and returns list of all the issues their system has- with links on how to fix the issue
	yield* chain(
		eyeLook(),
		gearSpin(),
		all(
			sendDocument({ref: eye_ref, position: "left"}, {ref: phone_ref, position: "right"}),
			delay(0.8, phone_vivintApp_ref().opacity(0, 0.5)),
			delay(1.3, phone_diagnostics_ref().opacity(1, 0.5)),
		),
	);

	yield* beginSlide("customerFixesIt_end");
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
		delay(0.5, sequence(0.5,
			finger_body_ref().opacity(0, 0.5),
			phone_diagnostics_ref().opacity(0, 0.5),
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
	yield* phone_call_ref().opacity(1, 0.5);


	yield* beginSlide("customerCalls_intercept");
	// before the call gets to the agent, a robot asks them what their service number is
	yield* all(
		phoneBlock_layout_ref().opacity(1, 0.5),
		drawArrow(connect_1_ref, {ref: phone_ref, position: "right"}, {ref: phoneBlock_ref, position: "left"}, {timespan: 0.5, lag: 0.3, direction: "end", bend: "horizontal"}),
		delay(0.5, beginSlide("customerCalls_split")),
	);

	// Now, we can get a list of issues for the agent before the call even begins
	yield* all(
		drawArrow(connect_2_ref, {ref: phoneBlock_ref, position: "top"}, {ref: eye_ref, position: "bottom"}, {timespan: 1, lag: 1, direction: "end", bend: "vertical"}),
		delay(0.8,
			chain(
				eyeLook("topLeft"),
				beginSlide("customerCalls_thinking"),
				eyeLook("top"),
				waitFor(0.5),
			)
		)
	);

	yield* all(
		chain(
			all(
				eyeLook(),
				gearSpin(),
			),
			all(
				drawArrow(connect_2_ref, {ref: eye_ref, position: "bottom"}, {ref: operator_ref, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "vertical"}),
				delay(0.8, operator_diagnostics_ref().opacity(1, 0.5)),
			),
		),
		drawArrow(connect_3_ref, {ref: phoneBlock_ref, position: "right"}, {ref: operator_ref, position: "left"}, {timespan: 4, lag: 0.3, direction: "end", bend: "horizontal"}),
	)

	yield* beginSlide("grayAllOut");
	// The key here is the little box- the diagnostic engine. We are working on building this.
	yield* all(
		phoneBlock_layout_ref().opacity(0.25, 1),
		wifi_layout_ref().opacity(0.25, 1),
		history_layout_ref().opacity(0.25, 1),
		salesforce_layout_ref().opacity(0.25, 1),
		// instructions_layout_ref().opacity(0.25, 1),
		scenario_phone_ref().opacity(0.25, 1),
		operator_ref().opacity(0.25, 1),
	);

	// We will start our implementation here- but it will end up helping up here.


	yield* beginSlide("end");
 });
