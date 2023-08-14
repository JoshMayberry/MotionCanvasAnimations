import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, useLogger, waitFor} from '@motion-canvas/core';
import {drawArrow, catalogue_color, hopIn, hopOut} from "./utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";

export default makeScene2D(function* (view) {
	const logger = useLogger();
	const camera = createRef<CameraView>();
	const client_platinumPro_layout_ref = createRef<Layout>();
	const client_platinumPro_ref = createRef<Rect>();

	const client_myAccount_layout_ref = createRef<Layout>();
	const client_myAccount_ref = createRef<Rect>();

	const client_bot_layout_ref = createRef<Layout>();
	const client_bot_ref = createRef<Rect>();

	const engine_layout_ref = createRef<Layout>();
	const engine_ref = createRef<Rect>();
	const engine_gear_ref = createRef<Layout>();

	const chatter_spy_layout_ref = createRef<Layout>();
	const chatter_spy_ref = createRef<Rect>();
	const chatter_spy_hat_ref = createRef<Layout>();

	const panel_layout_ref = createRef<Layout>();
	const panel_ref = createRef<Rect>();
	const panel_body_ref = createRef<Layout>();
	
	const snowflake_layout_ref = createRef<Layout>();
	const snowflake_ref = createRef<Rect>();
	const snowflake_body_ref = createRef<Layout>();

	const connect_1_ref = createRef<Line>();
	const connect_2_ref = createRef<Line>();
	const connect_3_ref = createRef<Line>();


	const engine_detailView_ref = createRef<Layout>();
	const operator_layout_ref = createRef<Layout>();
	const operator_ref = createRef<Rect>();
	const operator_body_ref = createRef<Path>();
	const operator_eyes_ref = createRef<Path>();
	
	const forklift_layout_ref = createRef<Layout>();
	const forklift_ref = createRef<Rect>();
	const forklift_body_ref = createRef<Path>();
	const forklift_lift_ref = createRef<Path>();
	
	const robot_layout_ref = createRef<Layout>();
	const robot_ref = createRef<Rect>();
	const robot_body_ref = createRef<Path>();
	
	const filter_layout_ref = createRef<Layout>();
	const filter_ref = createRef<Rect>();
	const filter_body_ref = createRef<Path>();
	
	const barChart_layout_ref = createRef<Layout>();
	const barChart_ref = createRef<Rect>();
	const barChart_body_ref = createRef<Path>();
	
	const scatterChart_layout_ref = createRef<Layout>();
	const scatterChart_ref = createRef<Rect>();
	const scatterChart_body_ref = createRef<Path>();
	
	const pivotChart_layout_ref = createRef<Layout>();
	const pivotChart_ref = createRef<Rect>();
	const pivotChart_body_ref = createRef<Path>();
	
	const troubleshoot_layout_ref = createRef<Layout>();
	const troubleshoot_ref = createRef<Rect>();
	const troubleshoot_body_ref = createRef<Path>();

	const connect_zoom_1_ref = createRef<Line>();
	const connect_zoom_2_ref = createRef<Line>();
	const connect_zoom_3_ref = createRef<Line>();

	view.fill(catalogue_color.background);

	view.add(
		<>
			<CameraView ref={camera} width={"100%"} height={"100%"}>
				<Layout
					y={-400}
				>
					<Layout ref={client_platinumPro_layout_ref}
						opacity={0}
					>
						<Rect ref={client_platinumPro_ref}
							width={100}
							height={100}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Txt
							width={100}
							height={100}
							fill={catalogue_color.paper}
							text={"V"}
							fontSize={80}
							y={10}
							x={25}
						/>
					</Layout>

					<Layout ref={client_myAccount_layout_ref}
						x={-200}
						opacity={0}
					>
						<Rect ref={client_myAccount_ref}
							width={100}
							height={100}
							fill={catalogue_color.outline}
							radius={10}
						/>
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

					<Layout ref={client_bot_layout_ref}
						x={200}
						opacity={0}
					>
						<Rect ref={client_bot_ref}
							width={100}
							height={100}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Path
							fill={catalogue_color.paper}
							data={"M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z"}
							scale={3.5}
							x={-40}
							y={-35}
						/>
					</Layout>
				</Layout>

				<Layout ref={engine_layout_ref}
					y={-50}
					scale={1.3}
					opacity={0}
				>
					<Rect ref={engine_ref}
						width={200}
						height={200}
						fill={catalogue_color.outline}
						radius={10}
					/>
					<Layout ref={engine_gear_ref} >
						<Path
							fill={catalogue_color.paper}
							data={"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"}
							scale={8}
							x={-95}
							y={-95}
						/>
					</Layout>
					<Layout ref={engine_detailView_ref}
						scale={0.18}
					>
						<Layout>
							<Layout ref={operator_layout_ref}
								y={-300}
								x={-400}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={operator_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={operator_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M 18,11.03 C 17.52,8.18 15.04,6 12.05,6 9.02,6 5.76,8.51 6.02,12.45 c 2.47,-1.01 4.33,-3.21 4.86,-5.89 1.31,2.63 4,4.44 7.12,4.47 z m 3,1.19 C 21,6.73 16.74,3 12,3 7.31,3 3,6.65 3,12.28 2.4,12.62 2,13.26 2,14 v 2 c 0,1.1 0.9,2 2,2 h 1 v -6.1 c 0,-3.87 3.13,-7 7,-7 3.87,0 7,3.13 7,7 V 19 h -8 v 2 h 8 c 1.1,0 2,-0.9 2,-2 v -1.22 c 0.59,-0.31 1,-0.92 1,-1.64 v -2.3 c 0,-0.7 -0.41,-1.31 -1,-1.62 z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
								<Layout ref={operator_eyes_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"m 16,13 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z m -6,0 a 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 1,1 0 0 1 1,1 z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={forklift_layout_ref}
								y={-300}
								x={400}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={forklift_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={forklift_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M 18,19 V 3 h 2 l -0.05714,15.971428 c 0,0 0.08571,-0.02857 -1.942858,0.02858 z M 16.73,15.15 C 16.9,15.57 17,16.02 17,16.5 17,18.43 15.43,20 13.5,20 12.1,20 10.9,19.18 10.34,18 H 6.83 C 6.4085479,19.20109 5.2728812,20.003682 4,20 2.34,20 1,18.66 1,17 1,16.11 1.39,15.31 2,14.76 V 10 H 4 V 4 h 8 z M 5,17 c 0,-0.55 -0.45,-1 -1,-1 -0.55,0 -1,0.45 -1,1 0,0.55 0.45,1 1,1 0.55,0 1,-0.45 1,-1 z M 13.65,13 10.68,6 H 6 v 4 l 2.92,3 z M 15,16.5 C 15,15.67 14.33,15 13.5,15 12.67,15 12,15.67 12,16.5 c 0,0.83 0.67,1.5 1.5,1.5 0.83,0 1.5,-0.67 1.5,-1.5 z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
								<Layout ref={forklift_lift_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"m 18.257143,17.485714 h 3.714286 v 1.457143 h -3.714286 z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={filter_layout_ref}
								y={300}
								x={400}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={filter_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={filter_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={robot_layout_ref}
								x={400}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={robot_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={robot_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M19.93,8.21l-3.6,1.68L14,7.7V6.3l2.33-2.19l3.6,1.68c0.38,0.18,0.82,0.01,1-0.36c0.18-0.38,0.01-0.82-0.36-1L16.65,2.6 c-0.38-0.18-0.83-0.1-1.13,0.2l-1.74,1.6C13.6,4.16,13.32,4,13,4c-0.55,0-1,0.45-1,1v1H8.82C8.34,4.65,6.98,3.73,5.4,4.07 C4.24,4.32,3.25,5.32,3.04,6.5C2.82,7.82,3.5,8.97,4.52,9.58L7.08,18H4v3h13v-3h-3.62L8.41,8.77C8.58,8.53,8.72,8.28,8.82,8H12v1 c0,0.55,0.45,1,1,1c0.32,0,0.6-0.16,0.78-0.4l1.74,1.6c0.3,0.3,0.75,0.38,1.13,0.2l3.92-1.83c0.38-0.18,0.54-0.62,0.36-1 C20.75,8.2,20.31,8.03,19.93,8.21z M6,8C5.45,8,5,7.55,5,7s0.45-1,1-1s1,0.45,1,1S6.55,8,6,8z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={barChart_layout_ref}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={barChart_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={barChart_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={pivotChart_layout_ref}
								y={300}
								x={-400}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={pivotChart_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={pivotChart_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M 14.58,19 H 13 v -2 h 1.58 C 15.91,17 17,15.92 17,14.58 V 13 h 2 v 1.58 C 19,17.02 17.02,19 14.58,19 Z M 10,8 H 21 V 5 C 21,3.9 20.1,3 19,3 H 10 Z M 3,8 H 8 V 3 H 5 C 3.9,3 3,3.9 3,5 Z M 5,21 H 8 V 10 H 3 v 9 c 0,1.1 0.9,2 2,2 z m 8,1 -4,-4 4,-4 z m 1,-9 4,-4 4,4 z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={scatterChart_layout_ref}
								y={300}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={scatterChart_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={scatterChart_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"m 19.6,17.6 a 3,3 0 0 1 -3,3 3,3 0 0 1 -3,-3 3,3 0 0 1 3,-3 3,3 0 0 1 3,3 z M 14,6 A 3,3 0 0 1 11,9 3,3 0 0 1 8,6 3,3 0 0 1 11,3 3,3 0 0 1 14,6 Z m -4,8 a 3,3 0 0 1 -3,3 3,3 0 0 1 -3,-3 3,3 0 0 1 3,-3 3,3 0 0 1 3,3 z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>

							<Layout ref={troubleshoot_layout_ref}
								x={-400}
								scale={0.8}
								opacity={0}
							>
								<Rect ref={troubleshoot_ref}
									width={200}
									height={200}
									fill={catalogue_color.background_2}
									radius={10}
								/>
								<Layout ref={troubleshoot_body_ref} >
									<Path
										fill={catalogue_color.outline}
										data={"M 8.43,9.69 9.65,15 h 1.64 l 1.26,-3.78 0.95,2.28 h 2 V 12 h -1 L 13.25,9 H 11.71 L 10.59,12.37 9.35,7 H 7.7 L 6.45,11 H 1 v 1.5 H 7.55 Z M 22,20.59 17.31,15.9 C 18.37,14.55 19,12.85 19,11 19,6.58 15.42,3 11,3 6.92,3 3.56,6.05 3.07,10 H 5.09 C 5.57,7.17 8.03,5 11,5 c 3.31,0 6,2.69 6,6 0,3.31 -2.69,6 -6,6 C 8.58,17 6.5,15.56 5.55,13.5 H 3.4 c 1.05,3.19 4.06,5.5 7.6,5.5 1.85,0 3.55,-0.63 4.9,-1.69 L 20.59,22 Z"}
										scale={8}
										x={-95}
										y={-95}
									/>
								</Layout>
							</Layout>
						</Layout>
						
						<Layout>
							<Line ref={connect_zoom_1_ref}
								lineWidth={8}
								stroke={catalogue_color.fill}
								startOffset={10}
								endOffset={10}
								radius={20}
								points={[0,0]}
							/>

							<Line ref={connect_zoom_2_ref}
								lineWidth={8}
								stroke={catalogue_color.fill}
								startOffset={10}
								endOffset={10}
								radius={20}
								points={[0,0]}
							/>

							<Line ref={connect_zoom_3_ref}
								lineWidth={8}
								stroke={catalogue_color.fill}
								startOffset={10}
								endOffset={10}
								radius={20}
								points={[0,0]}
							/>
						</Layout>
					</Layout>
				</Layout>
				
				<Layout
					y={350}
				>
					<Layout ref={chatter_spy_layout_ref}
						x={-400}
						scale={0.8}
						opacity={0}
					>
						<Rect ref={chatter_spy_ref}
							width={200}
							height={200}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Layout ref={chatter_spy_hat_ref}>
							<Path
								fill={catalogue_color.paper}
								data={"M60,34H55c0-.21.08-4.1-.07-4.15,0,0-7.86-20.73-7.86-20.74A6.35,6.35,0,0,0,36.31,8.9l-.09.15L33.63,14.9a1,1,0,0,0,1.83.81L38,10a4.36,4.36,0,0,1,7.23,0L52.55,29.2H11.4L19.16,9.94a4.37,4.37,0,0,1,7.26,0L32.1,21.44a1,1,0,0,0,1.8-.88c-.12-.15-5.67-11.51-5.79-11.65a6.37,6.37,0,0,0-10.77.18L9.07,29.63a1,1,0,0,0-.05.48s0,.06,0,.09V34H4a1,1,0,0,0,0,2H60A1,1,0,0,0,60,34Z"}
								scale={3}
								x={-95}
								y={-95}
							/>
						</Layout>
						<Path
							fill={catalogue_color.paper}
							data={"M44,39a9,9,0,0,0-9,8.82,6,6,0,0,0-6,0c-.51-11.75-17.7-11.59-18,.17,0,9.78,13.66,12.38,17.31,3.46a4,4,0,0,1,7.38,0C39.33,60.38,53,57.78,53,48A9,9,0,0,0,44,39ZM20,44a4,4,0,0,0-4,4,1,1,0,0,1-2,0,6,6,0,0,1,6-6,1,1,0,0,1,0,2Zm24,0a4,4,0,0,0-4,4,1,1,0,0,1-2,0,6,6,0,0,1,6-6,1,1,0,0,1,0,2Z"}
							scale={3}
							x={-95}
							y={-95}
						/>
					</Layout>
					
					<Layout ref={panel_layout_ref}
						scale={0.8}
						opacity={0}
					>
						<Rect ref={panel_ref}
							width={200}
							height={200}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Layout ref={panel_body_ref}>
							<Path
								fill={catalogue_color.paper}
								data={"M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z"}
								scale={7}
								x={-85}
								y={-85}
							/>
						</Layout>
					</Layout>

					<Layout ref={snowflake_layout_ref}
						x={400}
						scale={0.8}
						opacity={0}
					>
						<Rect ref={snowflake_ref}
							width={200}
							height={200}
							fill={catalogue_color.outline}
							radius={10}
						/>
						<Layout ref={snowflake_body_ref}>
							<Path
								fill={catalogue_color.paper}
								data={"M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"}
								scale={8}
								x={-95}
								y={-95}
							/>
						</Layout>
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

	yield* beginSlide("appsAppear");
	// We have lots of apps that want to know things about what is currently wrong with a specific panel
	yield* all(
		client_myAccount_layout_ref().opacity(1, 0.5),
		delay(0.1, client_platinumPro_layout_ref().opacity(1, 0.5)),
		delay(0.2, client_bot_layout_ref().opacity(1, 0.5)),
	);

	yield* beginSlide("engineAsked");
	// They will ask a service called the "Diagnostics Engine" for that information, who will reply back
	yield* engine_layout_ref().opacity(1, 0.5);
	yield* waitFor(0.5);
	yield* all(
		drawArrow(connect_1_ref, {ref: client_platinumPro_ref, position: "bottom"}, {ref: engine_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		delay(0.3, drawArrow(connect_2_ref, {ref: client_bot_ref, position: "bottom"}, {ref: engine_ref, position: "top", offset:[80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		delay(0.7, drawArrow(connect_3_ref, {ref: client_myAccount_ref, position: "bottom"}, {ref: engine_ref, position: "top", offset:[-80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);

	yield* beginSlide("engineReplies");
	yield* all(
		engine_gear_ref().rotation(easeInOutCubic(1) * 360, 2),
		delay(1.75, all(
			drawArrow(connect_1_ref, {ref: engine_ref, position: "top"}, {ref: client_platinumPro_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start "}),
			delay(0.3, drawArrow(connect_2_ref, {ref: engine_ref, position: "top", offset:[80, 0]}, {ref: client_bot_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start "})),
			delay(0.7, drawArrow(connect_3_ref, {ref: engine_ref, position: "top", offset:[-80, 0]}, {ref: client_myAccount_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start "})),
		)),
	);

	yield* beginSlide("helpersAppear");
	// But where does it get it's information?
	// The Engine has some helpers that are spread out across our network and in the panel
	yield* all(
		chatter_spy_layout_ref().opacity(1, 0.5),
		delay(0.1, panel_layout_ref().opacity(1, 0.5)),
		delay(0.2, snowflake_layout_ref().opacity(1, 0.5)),
	);

	yield* beginSlide("helpersAsked");
	// It will ask those helpers for current and historical information about the panel

	yield* drawArrow(connect_1_ref, {ref: client_platinumPro_ref, position: "bottom"}, {ref: engine_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
	yield* all(
		drawArrow(connect_1_ref, {ref: engine_ref, position: "bottom", offset:[-80, 0]}, {ref: chatter_spy_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		delay(0.3, drawArrow(connect_2_ref, {ref: engine_ref, position: "bottom"}, {ref: panel_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		delay(0.7, drawArrow(connect_3_ref, {ref: engine_ref, position: "bottom", offset:[80, 0]}, {ref: snowflake_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);

	yield* beginSlide("helpersReply");
	// They reply with that information and the engine thinks about it all in context with eachother

	yield* all(
		chain(
			loop(2, function*() {
				yield* chatter_spy_hat_ref().y(chatter_spy_hat_ref().y() - 10, 0.1);
				yield* chatter_spy_hat_ref().y(chatter_spy_hat_ref().y() + 10, 0.1);
			}),
			drawArrow(connect_1_ref, {ref: chatter_spy_ref, position: "top"}, {ref: engine_ref, position: "bottom", offset:[-80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		),
		delay(0.3, chain(
			loop(2, function*() {
				yield* panel_body_ref().rotation(10, 0.1);
				yield* panel_body_ref().rotation(0, 0.1);
			}),
			drawArrow(connect_2_ref, {ref: panel_ref, position: "top"}, {ref: engine_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		)),
		delay(0.7, chain(
			loop(2, function*() {
				yield* snowflake_body_ref().rotation(10, 0.1);
				yield* snowflake_body_ref().rotation(0, 0.1);
			}),
			drawArrow(connect_3_ref, {ref: snowflake_ref, position: "top"}, {ref: engine_ref, position: "bottom", offset:[80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		)),
		// delay(0.3, drawArrow(connect_1_ref, {ref: engine_ref, position: "bottom"}, {ref: panel_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		// delay(0.7, drawArrow(connect_2_ref, {ref: engine_ref, position: "bottom", offset:[80, 0]}, {ref: snowflake_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);
	
	yield* beginSlide("engineReplies2");
	// It then sends it's reply back.

	engine_gear_ref().rotation(0);
	yield* all(
		engine_gear_ref().rotation(easeInOutCubic(1) * 360, 2),
		delay(1.75, all(
			drawArrow(connect_1_ref, {ref: engine_ref, position: "top"}, {ref: client_platinumPro_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start "}),
		)),
	);

	yield* beginSlide("zoomIn");
	// The engine though is not a single entity- though things outside of it can treat it like one
	yield* all(
		camera().zoomOnto(engine_ref(), 1.5, 100),
		delay(0.5, engine_gear_ref().opacity(0, 1)),
	);

	yield* beginSlide("iconsAppear");
	// The engine is actually a lot of separate compnents that specialize in a specific task
	yield* all(
		hopIn(forklift_layout_ref()),
		delay(0.25, hopIn(robot_layout_ref())),
		delay(0.5, hopIn(filter_layout_ref())),
		delay(0.5, hopIn(barChart_layout_ref())),
		delay(0.75, hopIn(scatterChart_layout_ref())),
		delay(0.75, hopIn(troubleshoot_layout_ref())),
		delay(1, hopIn(operator_layout_ref())),
		delay(1, hopIn(pivotChart_layout_ref())),
	);

	yield* beginSlide("operatorGetsMessage");
	// One component recieved the message
	yield* drawArrow(connect_zoom_1_ref, {ref: operator_ref, position: "top", offset: [0, -300]}, {ref: operator_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})

	yield* beginSlide("operatorTellsForklift");
	// And tells another piece to gather the data it needs for the request
	yield* all(
		chain(
			operator_eyes_ref().x(operator_eyes_ref().x() + 10, 0.2),
			operator_eyes_ref().x(DEFAULT, 0.2),
		),
		delay(0.1, drawArrow(connect_zoom_1_ref, {ref: operator_ref, position: "right"}, {ref: forklift_ref, position: "left"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);
	yield* all(
		drawArrow(connect_zoom_1_ref, {ref: forklift_ref, position: "top"}, {ref: forklift_ref, position: "top", offset: [0, -250]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		drawArrow(connect_zoom_2_ref, {ref: forklift_ref, position: "topRight"}, {ref: forklift_ref, position: "topRight", offset: [150, -150]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		drawArrow(connect_zoom_3_ref, {ref: forklift_ref, position: "right"}, {ref: forklift_ref, position: "right", offset: [150, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
	);

	yield* beginSlide("forkliftGetsMessage");
	// It gets the information back
	yield* all(
		drawArrow(connect_zoom_1_ref, {ref: forklift_ref, position: "top", offset: [0, -250]}, {ref: forklift_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		delay(0.2, drawArrow(connect_zoom_2_ref, {ref: forklift_ref, position: "topRight", offset: [150, -150]}, {ref: forklift_ref, position: "topRight"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		delay(0.4, drawArrow(connect_zoom_3_ref, {ref: forklift_ref, position: "right", offset: [150, 0]}, {ref: forklift_ref, position: "right"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);

	yield* beginSlide("networkStart");
	// It sends the info through the network
	yield* all(
		forklift_lift_ref().y(forklift_lift_ref().y() - 20, 0.5, easeInOutCubic),
		delay(0.5, forklift_lift_ref().y(DEFAULT, 0.5, easeInOutCubic)),
		chain( 
			drawArrow(connect_zoom_1_ref, {ref: forklift_ref, position: "bottom"}, {ref: robot_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
			all(
				chain( 
					drawArrow(connect_zoom_1_ref, {ref: robot_ref, position: "left"}, {ref: barChart_ref, position: "right"}, {timespan: 0.5, lag: 0.4, direction: "end"}),
					drawArrow(connect_zoom_3_ref, {ref: barChart_ref, position: "left"}, {ref: troubleshoot_ref, position: "right"}, {timespan: 0.4, lag: 0.2, direction: "end"}),
				),
				delay(0.1, chain( 
					drawArrow(connect_zoom_2_ref, {ref: robot_ref, position: "bottom"}, {ref: filter_ref, position: "top"}, {timespan: 0.4, lag: 0.3, direction: "end"}),
					drawArrow(connect_zoom_2_ref, {ref: filter_ref, position: "left"}, {ref: scatterChart_ref, position: "right"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
					drawArrow(connect_zoom_2_ref, {ref: scatterChart_ref, position: "left"}, {ref: pivotChart_ref, position: "right"}, {timespan: 0.3, lag: 0.2, direction: "end"}),
					drawArrow(connect_zoom_2_ref, {ref: pivotChart_ref, position: "top"}, {ref: troubleshoot_ref, position: "bottom"}, {timespan: 0.4, lag: 0.3, direction: "end"}),
				)),
			),
			drawArrow(connect_zoom_1_ref, {ref: troubleshoot_ref, position: "top"}, {ref: operator_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		)
	);

	yield* beginSlide("operatorSendsAnswer");
	// Eventually, the final piece makes it to the component talking with the client and the reply is sent back to them
	engine_gear_ref().rotation(0);
	yield* all(
		chain(
			operator_eyes_ref().y(operator_eyes_ref().y() - 10, 0.2),
			operator_eyes_ref().y(DEFAULT, 0.2),
		),
		drawArrow(connect_zoom_1_ref, {ref: operator_ref, position: "top"}, {ref: operator_ref, position: "top", offset: [0, -150]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		delay(0.3, camera().reset(1.5)),
		delay(0.2, all(
			hopOut(forklift_layout_ref()),
			delay(0.25, hopOut(robot_layout_ref())),
			delay(0.5, hopOut(filter_layout_ref())),
			delay(0.5, hopOut(barChart_layout_ref())),
			delay(0.75, hopOut(scatterChart_layout_ref())),
			delay(0.75, hopOut(troubleshoot_layout_ref())),
			delay(1, hopOut(operator_layout_ref())),
			delay(1, hopOut(pivotChart_layout_ref())),
			delay(1, sequence(0.2,
				all(
					engine_gear_ref().rotation(easeOutCubic(1) * 90, 0.5),
					engine_gear_ref().opacity(1, 1),
				),
				drawArrow(connect_1_ref, {ref: engine_ref, position: "top"}, {ref: client_platinumPro_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start "}),
			))
		)),
	);

	yield* beginSlide("end");
 });
