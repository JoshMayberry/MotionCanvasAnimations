import {makeScene2D, Txt, Layout, Rect, Path, Line, Circle} from '@motion-canvas/2d';
import { CodeBlock, insert } from '@motion-canvas/2d/lib/components/CodeBlock';
import {Reference, ThreadGenerator, all, beginSlide, chain, createRef, delay, sequence} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
	const Arrow = createRef<Line>();
	const Input = createRef<Layout>();
	const InputRect = createRef<Rect>();
	const PersonMail = createRef<Layout>();
	const PersonMailPath = createRef<Path>();
	const PersonMailCircle = createRef<Circle>();
	const PersonParty = createRef<Layout>();
	const PersonPartyPath = createRef<Path>();
	const PersonPartyCircle = createRef<Circle>();
	const PersonTheif = createRef<Layout>();
	const PersonTheifPath = createRef<Path>();
	const PersonTheifCircle = createRef<Circle>();
	const Label = createRef<Txt>();

	const color_catalogue = {
		// background: "#EDF2F2",
		background: "#242424",
		paper: "#1E1E1F",
		color_1: "#99A596",
		color_2: "#9baba9",
		color_3: "#909999",
		color_4: "#d1aeb1",
		skin: "#ffdbac",
		shirt_red: "#d1aeb1",
	}

	view.fill(color_catalogue.background)

	view.add(
		<Layout>
			<Layout ref={Input} 
				opacity={0}
				x={0}
				y={300}
			> 
				<Rect
					ref={InputRect} 
					width={200}
					height={200}
					fill={color_catalogue.color_1}
					radius={10}
				/>
				<Path 
					data={"M480-80q-83 0-141.5-58.5T280-280v-400q0-83 58.5-141.5T480-880q83 0 141.5 58.5T680-680v400q0 83-58.5 141.5T480-80Zm0-80q50 0 85-35t35-85v-400q0-50-35-85t-85-35q-50 0-85 35t-35 85v400q0 50 35 85t85 35Zm0-400q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 80Zm0 240q33 0 56.5-23.5T560-320q0-33-23.5-56.5T480-400q-33 0-56.5 23.5T400-320q0 33 23.5 56.5T480-240Zm0-40q-17 0-28.5-11.5T440-320q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320q0 17-11.5 28.5T480-280Z"}
					fill={color_catalogue.background}
					scale={0.2}
					x={-95}
					y={95}
				/>
				<Layout
					bottom={InputRect().top}
				>
					<Txt ref={Label}
						text={""}
						fill={color_catalogue.color_1}
						fontSize={70}
						y={-80}
						textAlign={"center"}
					/>
				</Layout>
			</Layout>
			<Layout ref={PersonMail} 
				opacity={0}
				x={-500}
				y={-300}
			> 
				<Rect
					width={200}
					height={80}
					fill={color_catalogue.color_4}
					radius={10}
					y={120}
				/>
				<Circle ref={PersonMailCircle} 
					width={200}
					height={200}
					fill={color_catalogue.skin}
				/>
				<Path ref={PersonMailPath}
					opacity={0}
					data={"M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"}
					fill={color_catalogue.background}
					scale={6}
					x={-70}
					y={-70}
				/>
			</Layout>
			<Layout ref={PersonParty} 
				opacity={0}
				x={0}
				y={-300}
			> 
				<Rect
					width={200}
					height={80}
					fill={color_catalogue.color_4}
					radius={10}
					y={120}
				/>
				<Circle ref={PersonPartyCircle} 
					width={200}
					height={200}
					fill={color_catalogue.skin}
				/>
				<Path ref={PersonPartyPath}
					opacity={0}
					data={"M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"}
					fill={color_catalogue.background}
					scale={6}
					x={-70}
					y={-70}
				/>
			</Layout>
			<Layout ref={PersonTheif} 
				opacity={0}
				x={500}
				y={-300}
			> 
				<Rect
					width={200}
					height={80}
					fill={color_catalogue.color_4}
					radius={10}
					y={120}
				/>
				<Circle ref={PersonTheifCircle} 
					width={200}
					height={200}
					fill={color_catalogue.skin}
				/>
				<Path ref={PersonTheifPath}
					opacity={0}
					data={"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}
					fill={color_catalogue.background}
					scale={6}
					x={-70}
					y={-70}
				/>
			</Layout>

			<Line ref={Arrow}
				stroke={color_catalogue.color_4}
				startOffset={10}
				endOffset={10}
				radius={20}
				points={[0,0]}
				lineWidth={8}
			/>
		</Layout>
	);

	type position = "middle" | "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"

	function* DrawArrow(RefFrom: Reference<Rect>, RefTo: Reference<Rect>, PositionFrom: position = "bottom", PositionTo: position = "top", lagTime: number = 0.3, lengthTime: number = 1) {
		Arrow().stroke(RefFrom().fill());

		Arrow().endArrow(true);
		Arrow().points([
			RefFrom()[PositionFrom]().transformAsPoint(RefFrom().localToWorld()).transformAsPoint(Arrow().worldToLocal()),
			RefTo()[PositionTo]().transformAsPoint(RefTo().localToWorld()).transformAsPoint(Arrow().worldToLocal())
		]);

		Arrow().start(0);
		Arrow().end(0);
		yield* all(
			Arrow().start(1,lengthTime),
			delay(lagTime, Arrow().end(1,lengthTime))
		);
	};


	// Take a doorbell camera
	yield* beginSlide("start");
	yield* Input().opacity(1, 1);
	
	// It sees lots of people every day
	yield* beginSlide("peopleAppear");
	yield* sequence(0.3,
		PersonMail().opacity(1, 1),
		PersonParty().opacity(1, 1),
		PersonTheif().opacity(1, 1),
	);

	// We want it to not deter the wrong people
	yield* beginSlide("mailApproaches");
	yield* all(
		PersonMail().y(-100, 1),
		PersonMail().x(-300, 1),
		delay(0.75, chain(
			Label().text("Umm...", 1),
			sequence(0.5,
				Label().text("Go Away!", 1),
				all(
					PersonMail().y(-300, 0.5),
					PersonMail().x(-500, 0.5),
			)),
			delay(0.1, Label().text("", 0.5)),
		)),
	);

	// We also don't want it to allow the wrong people
	yield* beginSlide("theifApproaches");
	yield* all(
		PersonTheif().y(100, 1),
		PersonTheif().x(300, 1),
		delay(0.75, chain(
			Label().text("Umm...", 1),
			sequence(0.5,
				Label().text("Welcome?", 1),
				all(
					PersonTheif().y(700, 1),
			)),
			delay(0.1, Label().text("", 0.5)),
		)),
	);

	PersonTheif().opacity(0);
	PersonTheif().y(-300);
	PersonTheif().x(500);

	// It would be really cool if instead-
	yield* beginSlide("buildup");
	yield* all(
		PersonTheif().opacity(1, 1),
	);

	// The camera could be smart about who it tries to deter
	yield* beginSlide("sees1");
	yield* sequence(0.3,
		PersonMailPath().opacity(1, 1),
		PersonPartyPath().opacity(1, 1),
		PersonTheifPath().opacity(1, 1),
	);

	yield* beginSlide("sees2");
	yield* sequence(0.3,
		PersonMailPath().opacity(0, 1),
		PersonPartyPath().opacity(0, 1),
		PersonTheifPath().opacity(0, 1),
	);

	// And give a personalized greeting
	yield* beginSlide("mailApproaches2");
	yield* all(
		PersonMail().y(-100, 1),
		PersonMail().x(-300, 1),
		delay(0.75, chain(
			all(
				chain(
					Label().text(".", 0.33),
					Label().text("..", 0.33),
					Label().text("...", 0.33),
					PersonMailPath().opacity(1, 1),
				),
			),
			sequence(0.75,
				Label().text("Thank you!", 1),
				all(
					PersonMail().y(-300, 1),
					PersonMail().x(-500, 1),
			)),
			delay(0.1, all(
				Label().text("", 0.5),
				PersonMailPath().opacity(0, 1),
			))
		)),
	);
	
	yield* beginSlide("partyAproaches");
	yield* all(
		PersonParty().y(-100, 1),
		delay(0.75, chain(
			all(
				chain(
					Label().text(".", 0.33),
					Label().text("..", 0.33),
					Label().text("...", 0.33),
					PersonPartyPath().opacity(1, 1),
				),
			),
			sequence(0.75,
				Label().text("Party is Downstairs!", 1),
				PersonParty().y(800, 2),
			),
			delay(0.1, all(
				Label().text("", 0.5),
				PersonPartyPath().opacity(0, 1),
			))
		)),
	);
	
	yield* beginSlide("theifAproaches2");
	yield* all(
		PersonTheif().y(-100, 1),
		PersonTheif().x(300, 1),
		delay(0.75, chain(
			all(
				chain(
					Label().text(".", 0.33),
					Label().text("..", 0.33),
					Label().text("...", 0.33),
					PersonTheifPath().opacity(1, 1),
				),
			),
			sequence(0.75,
				Label().text("I see you\nred shirt guy!", 1),
				all(
					PersonTheif().y(-300, 0.5),
					PersonTheif().x(500, 0.5),
			)),
			delay(0.1, all(
				Label().text("", 0.5),
				PersonTheifPath().opacity(0, 1),
			))
		)),
	);

	yield* beginSlide("End");
});