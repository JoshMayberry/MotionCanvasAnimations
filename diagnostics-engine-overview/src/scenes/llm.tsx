import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, useLogger, waitFor} from '@motion-canvas/core';
import {catalogue_color, hopIn, hopOut} from "../utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";
import { CodeBlock, edit, insert, remove, lines, word } from "@motion-canvas/2d/lib/components/CodeBlock";
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
	const llmClientCode_ref = createRef<Paper>();
	const llmEngineCode_ref = createRef<Paper>();
	const llmEngineReply_ref = createRef<Paper>();
	
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
						opacity={0}
					/>

					<Engine ref={engine_ref}
						x={700}
						y={300}
						opacity={0}
						color_gear='#1E1E1F'
					/>

					<Layout
						y={200}
						x={-200}
					>
						<Block ref={llmClient_ref}
							path="m 11.13,15.07 2.54,-2.51 -0.03,-0.03 C 11.9,10.59 10.66,8.36 9.93,6 H 7 V 4 h 7 V 2 h 2 v 2 h 7 V 5.99 H 11.83 C 12.5,7.92 13.56,9.75 15,11.35 15.93,10.32 16.7,9.19 17.31,8 h 2 c -0.73,1.63 -1.73,3.17 -2.98,4.56 L 21.42,17.58 20,19 15,14 11.89,17.11 Z M 5.5,10 h 2 L 12,22 H 10 L 8.88,19 H 4.13 L 3,22 H 1 Z M 8.12,17 6.5,12.67 4.88,17 Z"
							text_fontSize={52}
							opacity={0}
						/>
						<Paper ref={llmClientCode_ref}
							name="GPT-3.5"
							language="yaml"
							fontSize={8}
							fontSize_label={8}
							name_offset_x={7}
							name_offset_y={-2}
							opacity={0}
							y={3}
							x={0}
							height={127}
							width={130}
							radius={2}
							color_text="#1E1E1F"
						/>
					</Layout>

					<Layout
						y={400}
						x={200}
					>
						<Block ref={llmEngine_ref}
							path="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
							text_fontSize={52}
							opacity={0}
						/>
						<Paper ref={llmEngineCode_ref}
							name="Input"
							language="json"
							fontSize={6}
							fontSize_label={8}
							name_offset_x={7}
							name_offset_y={-2}
							opacity={0}
							y={3}
							x={0}
							height={127}
							width={130}
							radius={2}
							color_text="#1E1E1F"
						/>
						<Paper ref={llmEngineReply_ref}
							name="Output"
							language="yaml"
							fontSize={6}
							fontSize_label={8}
							name_offset_x={7}
							name_offset_y={-2}
							opacity={0}
							y={3}
							x={0}
							height={127}
							width={90}
							radius={2}
							color_text="#1E1E1F"
						/>
					</Layout>
				</Layout>

				<Arrow ref={connect_ref} />
			</CameraView>
		</>
	);

	engine_ref().eyeBodyRef().opacity(0);
	engine_ref().eyePupilRef().opacity(0);

	//#region Why
	yield* beginSlide("start");
	// We have things that would use the diagnostics engine and the engine.
	yield* all(
		phone_ref().opacity(1, 1),
		engine_ref().opacity(1, 1),
	);

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
	//#endregion

	//#region How 1
	yield* beginSlide("zoomIn_1");
	// Let's take a closer look at how this works
	yield* camera().zoomOnto(llmClient_ref(), 1.5, 0);

	yield* beginSlide("llmAppears");
	// We are using GPT-3.5 to do the translation
	yield* all(
		// camera().shift(Vector2.left.scale(-30)),
		llmClient_ref().pathRef().opacity(0, 1),
		delay(0.5, all(
			llmClientCode_ref().opacity(1, 1),
		)),
	);

	// The first hurdle with an llm is getting consistent output
	yield* beginSlide("llmIssue");
	yield* llmClientCode_ref().codeRef().edit(1, false)`${insert('Input: "Convert this\n        to JSON: ___"')}`;
	
	yield* beginSlide("llmAnswer_1");
	yield* llmClientCode_ref().codeRef().edit(1, false)`Input: "Convert this\n        to JSON: ___"${insert('\n\nOutput: "Sure thing!\n      Here: ___."')}`;
	
	yield* beginSlide("llmAnswer_2");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "Convert this\n        to JSON: ___"\n\nOutput: "${edit('Sure thing!', 'Here it is:')}\n      ${edit('Here: ___.', '____')}"`;
	
	yield* beginSlide("llmAnswer_3");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "Convert this\n        to JSON: ___"\n\nOutput: "${edit('Here it is:', 'bash```____```')}${remove('\n      ____')}"`;

	// So, we provide it with a fake 'history' of examples so it knows how it 'pretend responded' in the past-
	yield* beginSlide("llmHistory");
	yield* llmClientCode_ref().codeRef().edit(1, true)`${edit('Input: "Convert this\n        to JSON: ___"\n\nOutput: "bash```____```"', 'Input: "Convert this: ___"\nOutput: "___"\nInput: "Here: ___"\nOutput: "___"\nInput: "___. Fix please!"\nOutput: "___"')}`;

	// making it respond the same way each time.
	yield* beginSlide("llmAnswer_4.1");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "Convert this: ___"\nOutput: "___"\nInput: "Here: ___"\nOutput: "___"\nInput: "___. Fix please!"\nOutput: "___"${insert('\n\nInput: "Make JSON: ___"')}`;
	yield* beginSlide("llmAnswer_4.2");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "Convert this: ___"\nOutput: "___"\nInput: "Here: ___"\nOutput: "___"\nInput: "___. Fix please!"\nOutput: "___"\n\nInput: "Make JSON: ___"${insert('\n\Output: "___"')}`;

	// The JSON it creates needs to match a very specific format- so we provide it with a schema for how it is supposed to be arranged
	yield* beginSlide("schemaIntro");
	yield* llmClientCode_ref().codeRef().edit(1, true)`${insert("System: [Role and Schema]\n\n")}Input: "Convert this: ___"\nOutput: "___"\nInput: "Here: ___"\nOutput: "___"\nInput: "___. Fix please!"\nOutput: "___"${remove('\n\nInput: "Make JSON: ___"\n\Output: "___"')}`;
	
	// Which part of it looks like this:
	yield* beginSlide("schemaAppears");
	yield* llmClientCode_ref().codeRef().edit(1, true)`${remove('System: [Role and Schema]\n\nInput: "Convert this: ___"\nOutput: "___"\nInput: "Here: ___"\nOutput: "___"\nInput: "___. Fix please!"\nOutput: "___"')}${insert('info:\n  type: object\n  properties:\n    service_number:\n      type: integer\n      description: _____\n  required:\n    - service_number\nfilters:\n  type: object \n  properties:\n    network:\n      type: boolean')}`;

	// Here are some examples of Input converting to JSON:
	yield* beginSlide("inputExample_1.1");
	yield* llmClientCode_ref().codeRef().edit(0.5, true)`${remove('info:\n  type: object\n  properties:\n    service_number:\n      type: integer\n      description: _____\n  required:\n    - service_number\nfilters:\n  type: object \n  properties:\n    network:\n      type: boolean')}`;
	llmClientCode_ref().codeRef().fontSize(7);
	yield* llmClientCode_ref().codeRef().edit(0.5, true)`${insert('Input: "My Service number is 12.\n       Is my doorbell camera on?"')}`;
	yield* beginSlide("inputExample_1.3");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "My Service number is 12.\n       Is my doorbell camera on?"${insert('\n\nOutput: {\n  "info": {\n    "service_number": 12,\n    "context": "Is my doorbell\n               camera on?"\n  },\n  "filters": {\n    "camera": true\n  }\n}')}`;
	yield* beginSlide("inputExample_2.1");
	yield* llmClientCode_ref().codeRef().edit(1, true)`${edit('Input: "My Service number is 12.', 'Input: "My Service number is 47.')}\n       ${edit('Is my doorbell camera on?"', 'How are my cameras and\n       thermostat doing?"')}${edit('\n\nOutput: {\n  "info": {\n    "service_number": 12,\n    "context": "Is my doorbell\n               camera on?"\n  },\n  "filters": {\n    "camera": true\n  }\n}', "\n\n\n\n\n\n\n\n\n\n\n")}`;
	yield* beginSlide("inputExample_2.2");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "My Service number is 47.\n       How are my cameras and\n       thermostat doing?"${edit("\n\n\n\n\n\n\n\n\n\n\n", '\n\nOutput: {\n  "info": {\n    "service_number": 47,\n    "context": How are my cameras\n           and thermostat doing?"\n  "filters": {\n    "camera": true,\n    "thermostat": true,\n  }\n}')}`;

	// And some error checking it passed
	yield* beginSlide("inputExample_3.1");
	yield* llmClientCode_ref().codeRef().edit(1, true)`${edit('Input:', 'Input: "')}${remove(' "My Service number is 47.\n       ')}${edit('How are my cameras and\n       thermostat doing?"', 'How are my cameras and\n       thermostat doing?" ')}${edit('\n\nOutput: {\n  "info": {\n    "service_number": 47,\n    "context": How are my cameras\n           and thermostat doing?"\n  "filters": {\n    "camera": true,\n    "thermostat": true,\n  }\n}', "\n\n\n\n\n\n\n\n\n\n\n")}`;
	yield* beginSlide("inputExample_3.2");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "How are my cameras and\n       thermostat doing?"${edit("\n\n\n\n\n\n\n\n\n\n\n", '\n\nOutput: {\n  "error": "No service\n           number given", \n  "code": 401\n}')}`;
	yield* beginSlide("inputExample_4.1");
	yield* llmClientCode_ref().codeRef().edit(1, true)`${edit('Input: "How are my cameras and\n       thermostat doing?"', 'Input: "My Service number is 98.\n        How is my dog doing?"')}${edit('\n\nOutput: {\n  "error": "No service\n           number given", \n  "code": 401\n}', "\n\n\n\n\n\n")}`;
	yield* beginSlide("inputExample_4.2");
	yield* llmClientCode_ref().codeRef().edit(1, true)`Input: "My Service number is 98.\n        How is my dog doing?"${edit("\n\n\n\n\n\n", '\n\nOutput: {\n  "error": "Invalid filter: dog",\n  "code": 400\n}\n')}`;

	yield* beginSlide("zoomOut");
	yield* all(
		llmClientCode_ref().codeRef().edit(1, true)`${remove('Input: "My Service number is 98.\n        How is my dog doing?\n\nOutput: {\n  "error": "Invalid filter: dog",\n  "code": 400\n}\n')}`,
		llmClient_ref().pathRef().opacity(1, 1),
		llmClientCode_ref().opacity(0, 1),
		camera().reset(),
	);
	//#endregion

	//#region How 2
	yield* beginSlide("zoomIn_2");
	// It works similarly for the reverse translation- but the schema is more complicated and questions can be more interesting
	yield* all(
		camera().zoomOnto(llmEngine_ref(), 1.5, 0),
		llmEngine_ref().pathRef().opacity(0, 1),
		delay(0.5, all(
			llmEngineCode_ref().opacity(1, 1),
		)),
	);
	yield* all(
		llmEngine_ref().width(270, 1),
		llmEngineCode_ref().width(160, 1),
		llmEngineCode_ref().x(-48, 1),
		llmEngineReply_ref().x(83, 1),
		llmEngineReply_ref().opacity(1, 0.5),
	);

	yield* beginSlide("outputExample_1.1");
	yield* llmEngineCode_ref().codeRef().edit(1, true)`${insert('{\n  "info": {\n    "service_number": 27,\n    "panel_type": "SmartHub Pro",\n    "context": "How are my cameras?"\n  },\n  "cameras": [\n    {\n      "name": "Doorbell",\n      "is_online": true,\n      "online_percentage": 30\n    }, {\n      "name": "Baby Cam",\n      "is_online": true,\n      "online_percentage": 99\n    }]\n}')}`;
	yield* beginSlide("outputExample_1.2");
	yield* llmEngineReply_ref().codeRef().edit(1, true)`${insert("Your Doorbell camera is\ncurrently online but has\nonly been online for 30%\nof the time in the past\n14 days.\n\nYour Baby Cam, on the\nother hand, is online\nand has been online for\n99% of the time in the\npast 14 days.")}`;

	llmEngineCode_ref().codeRef().selection(DEFAULT);
	llmEngineReply_ref().codeRef().selection(DEFAULT);

	yield* beginSlide("outputExample_2.1");
	yield* all(
		llmEngineCode_ref().codeRef().edit(1, false)`{\n  "info": {\n    "service_number": ${edit("27", "62")},\n    "panel_type": "SmartHub Pro",\n    "context": "${edit("How are my cameras?", "What is wrong with my locks?")}"\n  },\n  "${edit("cameras", "locks")}": [\n    {\n      "name": "${edit("Doorbell", "Front Door Lock")}"${insert(',\n      "color": "Nickle"')},\n      "is_online": true,\n      "${edit("online_percentage", "health")}": ${edit("30", "8")}${remove('\n    }, {')}\n      "${edit("name", "battery")}": ${edit('"Baby Cam"', "30")},\n      "${edit("is_online", "close_power")}": ${edit("true", '[90, 80, 10, 40, ...]')},${remove('\n      "online_percentage": 99')}\n    }]\n}`,
		llmEngineReply_ref().codeRef().edit(1, false)`${remove("Your Doorbell camera is\ncurrently online but has\nonly been online for 30%\nof the time in the past\n14 days.\n\nYour Baby Cam, on the\nother hand, is online\nand has been online for\n99% of the time in the\npast 14 days.")}`,
	);
	yield* beginSlide("outputExample_2.2");
	yield* llmEngineReply_ref().codeRef().edit(1, true)`${insert("The lock seems to be\njammed. Additionally, the\nbattery level is at 30%,\nwhich may be affecting its\nperformance.\n\nIt's also worth noting\nthat the power required to\nclose the lock has been\nvarying, with some\ninstances requiring as\nmuch as 90 units of power.\n\nThis could indicate\nmisalignment or other\nmechanical issues\nwith the lock.")}`;

	yield* beginSlide("outputExample_3.1");
	yield* all(
		llmEngineCode_ref().codeRef().edit(1, false)`{\n  "info": {\n    "service_number": ${edit("62", "34")},\n    "panel_type": "SmartHub Pro",\n    "context": "${edit("What is wrong with my locks?", "Is it connected to the internet")}"\n  },\n  "${edit("locks", "network")}": ${edit("[", "{")}${remove("\n    {")}\n    ${remove("  ")}"${edit("name", "panel_connection_status")}": ${edit('"Front Door Lock"', "80")},\n    ${remove("  ")}"${edit("color", "panel_connection_type")}": ${edit('"Nickle"', "2")},\n    ${remove("  ")}"${edit("is_online", "ssid")}": ${edit("true", '"XFINITY-1234"')},\n    ${remove("  ")}"${edit("health", "rssi")}": ${edit("8", "50")}\n${remove('      "battery": 30,\n      "close_power": [90, 80, 10, 40, ...],\n  ')}  }${remove("]")}\n}`,
		llmEngineReply_ref().codeRef().edit(1, true)`${remove("The lock seems to be\njammed. Additionally, the\nbattery level is at 30%,\nwhich may be affecting its\nperformance.\n\nIt's also worth noting\nthat the power required to\nclose the lock has been\nvarying, with some\ninstances requiring as\nmuch as 90 units of power.\n\nThis could indicate\nmisalignment or other\nmechanical issues\nwith the lock.")}`,
	);
	yield* beginSlide("outputExample_3.2");
	yield* llmEngineReply_ref().codeRef().edit(1, true)`${insert('Yes, your system is\nconnected to the internet.\n\nThe panel connection\nstatus is showing as\n"vpn_connected" which\nmeans it is\nsuccessfully connected\nto the Vivint server.')}`;
	
	yield* beginSlide("outputExample_4.1");
	yield* all(
		llmEngineCode_ref().codeRef().edit(1, true)`{\n  "info": {\n    "service_number": 34,\n    "panel_type": "SmartHub Pro",\n    "context": "Is it connected to the internet"\n  },\n  "network": {\n    "panel_connection_status": ${edit("80", "50")},\n    "panel_connection_type": 2,\n    "ssid": "XFINITY-1234",\n    "rssi": 50\n  }\n}`,
		llmEngineReply_ref().codeRef().edit(1, true)`${remove('Yes, your system is\nconnected to the internet.\n\nThe panel connection\nstatus is showing as\n"vpn_connected" which\nmeans it is\nsuccessfully connected\nto the Vivint server.')}`,
	);
	yield* beginSlide("outputExample_4.2");
	yield* llmEngineReply_ref().codeRef().edit(1, true)`${insert('Your system is connected\nto the router, but there\nis no internet connection.\n\nPlease check your internet\nconnection and make sure\nit is working properly.')}`;

	yield* beginSlide("zoomOut2");
	yield* all(
		llmEngineCode_ref().codeRef().edit(1, true)`${remove('{\n  "info": {\n    "service_number": 34,\n    "panel_type": "SmartHub Pro",\n    "context": "Is it connected to the internet"\n  },\n  "network": {\n    "panel_connection_status": 50,\n    "panel_connection_type": 2,\n    "ssid": "XFINITY-1234",\n    "rssi": 50\n  }\n}')}`,
		llmEngineReply_ref().codeRef().edit(1, true)`${remove('Your system is connected\nto the router, but there\nis no internet connection.\n\nPlease check your internet\nconnection and make sure\nit is working properly')}`,
		llmEngine_ref().pathRef().opacity(1, 1),
		llmEngineCode_ref().opacity(0, 1),
		llmEngineReply_ref().opacity(0, 1),
		llmEngine_ref().width(150, 1),
		camera().reset(),
	);
	//#endregion
	
	yield* beginSlide("end");
 });
