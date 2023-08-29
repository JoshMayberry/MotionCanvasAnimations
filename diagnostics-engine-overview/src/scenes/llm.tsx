import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, useLogger, waitFor} from '@motion-canvas/core';
import {catalogue_color, hopIn, hopOut} from "../utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";
import { CodeBlock, edit, insert, remove, lines } from "@motion-canvas/2d/lib/components/CodeBlock";
import { Engine } from "../components/engine"
import { Paper } from "../components/Paper"
import { Phone } from "../components/Phone"
import { Block } from "../components/Block"
import { Arrow } from "../components/Arrow";

export default makeScene2D(function* (view) {
	const logger = useLogger();
	const camera = createRef<CameraView>();
	
	const paperClient_ref = createRef<Paper>();
	const paperEngine_ref = createRef<Paper>();
	const paperLlmClient_ref = createRef<Paper>();
	const paperLlmEngine_ref = createRef<Paper>();
	
	const phone_ref = createRef<Phone>();
	const engine_ref = createRef<Engine>();
	const connect_ref = createRef<Arrow>();
	const llmClient_ref = createRef<Block>();
	const llmEngine_ref = createRef<Block>();

	view.fill(catalogue_color.background);

	view.add(
		<>
			<CameraView ref={camera} width={"100%"} height={"100%"}>
				<Paper
					name="input.json"
					language="json"
					ref={paperClient_ref}
					fontSize={40}
					opacity={0}
					y={-140}
					x={-500}
				/>
				<Paper
					name="output.json"
					language="json"
					fontSize={40}
					ref={paperEngine_ref}
					opacity={0}
					y={-140}
					x={500}
				/>
				<Paper
					name="Chat Question"
					language="json"
					ref={paperLlmClient_ref}
					fontSize={40}
					opacity={0}
					y={-140}
					x={-500}
				/>
				<Paper
					name="Chat Answer"
					language="json"
					fontSize={40}
					ref={paperLlmEngine_ref}
					opacity={0}
					y={-140}
					x={500}
				/>
				
				<Layout>
					<Phone ref={phone_ref}
						app="vivint"
						x={-700}
						y={300}
					/>

					<Engine ref={engine_ref}
						x={700}
						y={300}
					/>

					<Block ref={llmClient_ref}
						// text="LLM"
						path="m 11.13,15.07 2.54,-2.51 -0.03,-0.03 C 11.9,10.59 10.66,8.36 9.93,6 H 7 V 4 h 7 V 2 h 2 v 2 h 7 V 5.99 H 11.83 C 12.5,7.92 13.56,9.75 15,11.35 15.93,10.32 16.7,9.19 17.31,8 h 2 c -0.73,1.63 -1.73,3.17 -2.98,4.56 L 21.42,17.58 20,19 15,14 11.89,17.11 Z M 5.5,10 h 2 L 12,22 H 10 L 8.88,19 H 4.13 L 3,22 H 1 Z M 8.12,17 6.5,12.67 4.88,17 Z"
						text_fontSize={52}
						y={200}
						x={-200}
						opacity={0}
					/>

					<Block ref={llmEngine_ref}
						// text="LLM"
						path="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
						text_fontSize={52}
						y={400}
						x={200}
						opacity={0}
					/>
				</Layout>

				<Arrow ref={connect_ref} />
			</CameraView>
		</>
	);

	yield* beginSlide("start");
	// We have things that would use the diagnostics engine and the engine.

	yield* beginSlide("paperAppears");
	// These can talk to eachother by sending messages to each other in a specific format
	yield* all(
		paperClient_ref().opacity(1, 1),
		paperEngine_ref().opacity(1, 1),
	);

	yield* beginSlide("clientSends1");
	// The diagnostics engine can take a structured input query
	yield* all(
		paperClient_ref().codeRef().edit(1, false)`${insert("{\n    \"service_number\": 12345678,\n    \"only_cameras\": true\n}")}`,
		delay(0.6, connect_ref().drawArrow({ref: phone_ref().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"})),
	);
	
	yield* beginSlide("engineSends1");
	// and output a structured JSON response
	yield* all(
		engine_ref().gearSpin(2),
		delay(1.2, all(
			paperEngine_ref().codeRef().edit(1, false)`${insert("[\n    {\"name\": \"Front Yard\", \"status\": 1},\n    {\"name\": \"Living Room\", \"status\": 4},\n    {\"name\": \"Backyard\", \"status\": 0}\n]")}`,
			delay(0.6, connect_ref().drawArrow({ref: engine_ref().blockRef, position: "left"}, {ref: phone_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"})),
		)),
	);

	yield* beginSlide("naturalLanguage");
	// It would be cooler if it could take natural language and return natural language
	yield* all(
		paperClient_ref().textRef().text("Chat Question", 0.5),
		paperEngine_ref().textRef().text("Chat Answer", 0.5),
		paperClient_ref().codeRef().edit(1, false)`${remove("{\n    \"service_number\": 12345678,\n    \"only_cameras\": true\n}")}${insert("My service number is 12345678.\nHow are my cameras doing?")}`,
		paperEngine_ref().codeRef().edit(1, false)`${remove("[\n    {\"name\": \"Front Yard\", \"status\": 1},\n    {\"name\": \"Living Room\", \"status\": 4},\n    {\"name\": \"Backyard\", \"status\": 0}\n]")}${insert("The front yard's camera is doing great,\nthe living room one has low batteries,\nand your backyard's camera is offline.")}`,
	);

	yield* beginSlide("llmClientAppears");
	// To make this happen- we could introduce a middleware
	yield* all(
		llmClient_ref().opacity(1, 1),
		paperClient_ref().x(-710, 1),
		paperClient_ref().width(450, 1),

		paperLlmClient_ref().opacity(1, 1),
		paperLlmClient_ref().x(-235, 1),
		paperLlmClient_ref().width(450, 1),

		paperLlmClient_ref().textRef().text("input.json", 0.5),
		paperEngine_ref().textRef().text("output.json", 0.5),

		paperClient_ref().codeRef().edit(1, false)`${remove("My service number is 12345678.\nHow are my cameras doing?")}`,
		paperEngine_ref().codeRef().edit(1, false)`${remove("The front yard's camera is doing great,\nthe living room one has low batteries,\nand your backyard's camera is offline.")}`,
	);

	yield* beginSlide("clientSends2");
	// that would take natural language 
	yield* paperClient_ref().codeRef().edit(1, false)`${insert("My service number\nis 12345678.\nHow are my\ncameras doing?")}`;

	yield* beginSlide("clientLlmRecieves");
	// and produce a structured input query
	yield* all(
		connect_ref().drawArrow({ref: phone_ref().blockRef, position: "right"}, {ref: llmClient_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
		delay(0.7, paperLlmClient_ref().codeRef().edit(1, false)`${insert("{\n  \"service_number\":\n    12345678,\n  \"only_cameras\":\n    true\n}")}`),
	);
	
	yield* beginSlide("clientLlmSends");
	// Which is sent to the diagnostics engine
	yield* all(
		connect_ref().drawArrow({ref: llmClient_ref().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
		delay(0.8, all(
			engine_ref().gearSpin(2),
			delay(1.2, all(
				paperEngine_ref().codeRef().edit(1, false)`${insert("[\n    {\"name\": \"Front Yard\", \"status\": 1},\n    {\"name\": \"Living Room\", \"status\": 4},\n    {\"name\": \"Backyard\", \"status\": 0}\n]")}`,
			)),
		)),
	);

	yield* beginSlide("llmEngineAppears");
	// And another middleware that would take a strucured JSON response
	yield* all(
		paperEngine_ref().codeRef().fontSize(30, 0.5),
		delay(0.45, all(
			llmEngine_ref().opacity(1, 1),
			paperEngine_ref().x(710, 1),
			paperEngine_ref().width(450, 1),

			paperLlmEngine_ref().opacity(1, 1),
			paperLlmEngine_ref().x(235, 1),
			paperLlmEngine_ref().width(450, 1),
			paperEngine_ref().codeRef().edit(1, false)`[${remove("\n    ")}{${insert("\n  ")}\"name\": \"Front Yard\",${insert("\n ")} \"status\": 1${insert("\n")}},${remove("\n   ")} {${insert("\n  ")}\"name\": \"Living Room\",${insert("\n ")} \"status\": 4${insert("\n")}},${remove("\n   ")} {${insert("\n  ")}\"name\": \"Backyard\",${insert("\n ")} \"status\": 0${insert("\n")}}${remove("\n")}]`,
			// ${insert("[{\n  \"name\": \"Front Yard\",\n  \"status\": 1\n}, {\n\"name\": \"Living Room\",\n  \"status\": 4\n}}, {\n\"name\": \"Living Room\",\n  \"status\": 4\n}]")}`,
		)),
	);

	yield* beginSlide("engineSends2");
	// and produce natural language for the user
	yield* all(
		connect_ref().drawArrow({ref: engine_ref().blockRef, position: "left"}, {ref: llmEngine_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),
		delay(0.7, paperLlmEngine_ref().codeRef().edit(1, false)`${insert("The front yard's\ncamera is doing\ngreat, the living\nroom one has low\nbatteries, and your\nbackyard's camera\nis offline.")}`),
		delay(1.5, connect_ref().drawArrow({ref: llmEngine_ref().blockRef, position: "left"}, {ref: phone_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal"}),)
	);

	// I would like to use a simple LLM to do this translation; Something on our own system and light weight- not GPT-4 or something we would have to (1) pay for each query or (2) give customer data to
	
	yield* beginSlide("end");
 });
