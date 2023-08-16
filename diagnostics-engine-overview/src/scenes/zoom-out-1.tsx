import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, delay, easeInOutCubic, loop, loopFor, useLogger, waitFor} from '@motion-canvas/core';
import {drawArrow, catalogue_color} from "../utils";

export default makeScene2D(function* (view) {
	const logger = useLogger();
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

	const connect_platinumPro_ref = createRef<Line>();
	const connect_myAccount_ref = createRef<Line>();
	const connect_bot_ref = createRef<Line>();
	const connect_chatter_spy_ref = createRef<Line>();
	const connect_panel_ref = createRef<Line>();
	const connect_snowflake_ref = createRef<Line>();

	view.fill(catalogue_color.background);

	view.add(
		<>
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
				<Line ref={connect_platinumPro_ref}
					lineWidth={8}
					stroke={catalogue_color.outline}
					startOffset={10}
					endOffset={10}
					// radius={80}
					points={[0,0]}
				/>

				<Line ref={connect_bot_ref}
					lineWidth={8}
					stroke={catalogue_color.outline}
					startOffset={10}
					endOffset={10}
					radius={20}
					points={[0,0]}
				/>

				<Line ref={connect_myAccount_ref}
					lineWidth={8}
					stroke={catalogue_color.outline}
					startOffset={10}
					endOffset={10}
					radius={20}
					points={[0,0]}
				/>

				<Line ref={connect_chatter_spy_ref}
					lineWidth={8}
					stroke={catalogue_color.outline}
					startOffset={10}
					endOffset={10}
					radius={20}
					points={[0,0]}
				/>

				<Line ref={connect_panel_ref}
					lineWidth={8}
					stroke={catalogue_color.outline}
					startOffset={10}
					endOffset={10}
					radius={20}
					points={[0,0]}
				/>

				<Line ref={connect_snowflake_ref}
					lineWidth={8}
					stroke={catalogue_color.outline}
					startOffset={10}
					endOffset={10}
					radius={20}
					points={[0,0]}
				/>
			</Layout>
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
		drawArrow(connect_platinumPro_ref, {ref: client_platinumPro_ref, position: "bottom"}, {ref: engine_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		delay(0.3, drawArrow(connect_bot_ref, {ref: client_bot_ref, position: "bottom"}, {ref: engine_ref, position: "top", offset:[80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		delay(0.7, drawArrow(connect_myAccount_ref, {ref: client_myAccount_ref, position: "bottom"}, {ref: engine_ref, position: "top", offset:[-80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);

	yield* beginSlide("engineReplies");
	yield* all(
		engine_gear_ref().rotation(easeInOutCubic(1) * 360, 2),
		delay(1.75, all(
			drawArrow(connect_platinumPro_ref, {ref: engine_ref, position: "top"}, {ref: client_platinumPro_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start"}),
			delay(0.3, drawArrow(connect_bot_ref, {ref: engine_ref, position: "top", offset:[80, 0]}, {ref: client_bot_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start"})),
			delay(0.7, drawArrow(connect_myAccount_ref, {ref: engine_ref, position: "top", offset:[-80, 0]}, {ref: client_myAccount_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start"})),
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

	yield* drawArrow(connect_platinumPro_ref, {ref: client_platinumPro_ref, position: "bottom"}, {ref: engine_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
	yield* all(
		drawArrow(connect_chatter_spy_ref, {ref: engine_ref, position: "bottom", offset:[-80, 0]}, {ref: chatter_spy_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		delay(0.3, drawArrow(connect_panel_ref, {ref: engine_ref, position: "bottom"}, {ref: panel_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		delay(0.7, drawArrow(connect_snowflake_ref, {ref: engine_ref, position: "bottom", offset:[80, 0]}, {ref: snowflake_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);

	yield* beginSlide("helpersReply");
	// They reply with that information and the engine thinks about it all in context with eachother

	yield* all(
		chain(
			loop(2, function*() {
				yield* chatter_spy_hat_ref().y(chatter_spy_hat_ref().y() - 10, 0.1);
				yield* chatter_spy_hat_ref().y(chatter_spy_hat_ref().y() + 10, 0.1);
			}),
			drawArrow(connect_chatter_spy_ref, {ref: chatter_spy_ref, position: "top"}, {ref: engine_ref, position: "bottom", offset:[-80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		),
		delay(0.3, chain(
			loop(2, function*() {
				yield* panel_body_ref().rotation(10, 0.1);
				yield* panel_body_ref().rotation(0, 0.1);
			}),
			drawArrow(connect_panel_ref, {ref: panel_ref, position: "top"}, {ref: engine_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		)),
		delay(0.7, chain(
			loop(2, function*() {
				yield* snowflake_body_ref().rotation(10, 0.1);
				yield* snowflake_body_ref().rotation(0, 0.1);
			}),
			drawArrow(connect_snowflake_ref, {ref: snowflake_ref, position: "top"}, {ref: engine_ref, position: "bottom", offset:[80, 0]}, {timespan: 0.5, lag: 0.3, direction: "end"}),
		)),
		// delay(0.3, drawArrow(connect_panel_ref, {ref: engine_ref, position: "bottom"}, {ref: panel_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
		// delay(0.7, drawArrow(connect_snowflake_ref, {ref: engine_ref, position: "bottom", offset:[80, 0]}, {ref: snowflake_ref, position: "top"}, {timespan: 0.5, lag: 0.3, direction: "end"})),
	);
	
	yield* beginSlide("engineReplies2");
	// It then sends it's reply back.

	engine_gear_ref().rotation(0);
	yield* all(
		engine_gear_ref().rotation(easeInOutCubic(1) * 360, 2),
		delay(1.75, all(
			drawArrow(connect_platinumPro_ref, {ref: engine_ref, position: "top"}, {ref: client_platinumPro_ref, position: "bottom"}, {timespan: 0.5, lag: 0.3, direction: "start"}),
		)),
	);

	yield* beginSlide("end");
 });
