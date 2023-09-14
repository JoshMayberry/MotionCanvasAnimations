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
	const how_codeLlm = createRef<Paper>();
	const how_zoomPoint_1 = createRef<Rect>();
	const how_llm = createRef<Block>();
	
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
					/>

					<Layout
						y={200}
						x={-200}
					>
						<Rect ref={how_zoomPoint_1}
							fill="green"
							width={155}
							height={80}
							y={-33}
							opacity={0}
						/>
						<Block ref={llmClient_ref}
							path="m 11.13,15.07 2.54,-2.51 -0.03,-0.03 C 11.9,10.59 10.66,8.36 9.93,6 H 7 V 4 h 7 V 2 h 2 v 2 h 7 V 5.99 H 11.83 C 12.5,7.92 13.56,9.75 15,11.35 15.93,10.32 16.7,9.19 17.31,8 h 2 c -0.73,1.63 -1.73,3.17 -2.98,4.56 L 21.42,17.58 20,19 15,14 11.89,17.11 Z M 5.5,10 h 2 L 12,22 H 10 L 8.88,19 H 4.13 L 3,22 H 1 Z M 8.12,17 6.5,12.67 4.88,17 Z"
							text_fontSize={52}
							opacity={0}
						/>
						<Paper ref={how_codeLlm}
							name="prompt"
							language="yaml"
							fontSize={4}
							fontSize_label={8}
							name_offset_x={7}
							name_offset_y={-2}
							opacity={0}
							y={-30}
							x={-35}
							height={60}
							width={60}
							radius={2}
							color_text="#1E1E1F"
						/>
						<Block ref={how_llm}
							path="M 1107.3008 299.09961 C 909.30198 299.09961 733.39955 426.40058 672.09961 614.40039 L 671.96875 615.16992 C 545.47035 642.07709 436.47878 721.65742 372.34961 833.92773 C 273.35021 1005.3997 295.64399 1221.3854 427.80664 1368.4727 L 428.4082 1368.9727 C 388.46169 1491.9768 402.88464 1626.1558 468.04883 1737.8281 C 567.04823 1909.3002 765.24444 1997.9848 958.70703 1957.0723 L 959.44141 1956.8008 C 1045.9929 2052.898 1169.4057 2107.498 1298.6992 2106.9004 C 1496.698 2106.9004 1672.6005 1979.5994 1733.9004 1791.5996 L 1734.0312 1790.8301 C 1860.5304 1763.9233 1969.5209 1684.3431 2033.6504 1572.0723 C 2132.6498 1400.6002 2110.3559 1184.6146 1978.1934 1037.5273 L 1977.5918 1037.0273 C 2017.5384 914.02318 2003.1154 779.84427 1937.9512 668.17188 C 1838.9518 496.69988 1640.7555 408.01514 1447.293 448.92773 L 1446.5586 449.19922 C 1360.0071 353.10204 1236.5943 298.50195 1107.3008 299.09961 z M 1107.3008 416.59961 L 1106.6992 417.19922 C 1186.0259 417.19922 1262.2604 444.48313 1323.416 494.92773 L 953.86719 708.28711 C 949.13093 711.02159 944.90639 714.31381 941.21094 718.03711 C 929.90654 728.99265 923.40039 744.29604 923.40039 760.69922 L 923.40039 1248 L 769.16797 1159.0996 L 769.10156 756.53516 C 769.05426 717.57715 775.86583 679.10401 788.84375 642.68359 L 787.75586 642.42188 C 834.36207 511.04203 959.73458 416.83584 1107.3008 416.59961 z M 1549.6055 557.51172 C 1664.0533 560.04687 1774.5326 620.5161 1836.1934 726.92188 L 1835.373 726.70117 C 1875.0365 795.40032 1889.5247 875.06318 1876.416 953.24805 L 1506.8672 739.88867 C 1502.1291 737.15312 1497.1641 735.13947 1492.0898 733.80078 C 1476.9513 729.49062 1460.4462 731.50833 1446.2422 739.70898 L 1024.2285 983.35938 L 1024.1016 805.3418 L 1372.6992 604 C 1406.4142 584.48002 1443.14 571.14287 1481.1699 564.17188 L 1480.8535 563.09766 C 1503.6923 558.87787 1526.7256 557.0049 1549.6055 557.51172 z M 650 744.68164 L 650 1171.4004 C 650 1176.8727 650.73878 1182.1793 652.11719 1187.2441 C 655.95466 1202.5075 665.95382 1215.7905 680.15625 1223.9902 L 1102.1719 1467.6406 L 948.06641 1556.7598 L 599.40039 1355.5352 C 565.63811 1336.0971 535.72587 1310.9612 510.67383 1281.5117 L 509.90234 1282.3223 C 419.42698 1176.2702 400.52885 1020.592 474.10742 892.67773 L 474.32812 893.49805 C 513.99164 824.79882 575.73548 772.42159 650 744.68164 z M 1457.9336 849.24023 L 1806.5996 1050.4648 C 1840.3619 1069.9029 1870.2741 1095.0388 1895.3262 1124.4883 L 1896.0977 1123.6777 C 1986.573 1229.7298 2005.4712 1385.408 1931.8926 1513.3223 L 1931.6719 1512.502 C 1892.0084 1581.2011 1830.2645 1633.5784 1756 1661.3184 L 1756 1234.5996 C 1756 1229.1273 1755.2612 1223.8207 1753.8828 1218.7559 C 1750.0454 1203.4925 1740.0462 1190.2095 1725.8438 1182.0098 L 1303.8281 938.35938 L 1457.9336 849.24023 z M 1203 996.19336 L 1382.0996 1099.5957 L 1382.0996 1306.4043 L 1203 1409.8066 L 1023.9004 1306.4043 L 1023.9004 1099.5957 L 1203 996.19336 z M 1482.5996 1158 L 1636.832 1246.9004 L 1636.9004 1649.4648 C 1636.9474 1688.4229 1630.1341 1726.8959 1617.1562 1763.3164 L 1618.2441 1763.5781 C 1571.6379 1894.958 1446.2654 1989.1642 1298.6992 1989.4004 L 1299.3008 1988.8008 C 1219.9741 1988.8008 1143.7396 1961.5169 1082.584 1911.0723 L 1452.1328 1697.7129 C 1456.8691 1694.9784 1461.0936 1691.6862 1464.7891 1687.9629 C 1476.0935 1677.0074 1482.5996 1661.704 1482.5996 1645.3008 L 1482.5996 1158 z M 1381.7715 1422.6406 L 1381.8984 1600.6582 L 1033.3008 1802 C 999.58581 1821.52 962.86004 1834.8571 924.83008 1841.8281 L 925.14648 1842.9023 C 788.06517 1868.23 643.79625 1806.756 569.80859 1679.0781 L 570.62695 1679.2988 C 530.96348 1610.5997 516.4753 1530.9369 529.58398 1452.752 L 899.13281 1666.1113 C 903.87093 1668.8469 908.83588 1670.8605 913.91016 1672.1992 C 929.04871 1676.5094 945.55387 1674.4917 959.75781 1666.291 L 1381.7715 1422.6406 z"
							text_fontSize={52}
							opacity={0}
							color_path="#1E1E1F"
							color_block="#A2A1A6"
							path_scale={0.06}
							path_offset={-70}
							scale={0.3}
							y={-30}
							x={45}
						/>
					</Layout>

					<Block ref={llmEngine_ref}
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

	//#region How
	yield* beginSlide("zoomIn");
	// Let's take a closer look at how this works
	yield* all(
		chain(
			camera().zoomOnto(how_zoomPoint_1(), 1.5, 0),
		),
	);

	yield* beginSlide("llmAppears");
	// We are using GPT-3.5 to do the translation
	yield* all(
		// camera().shift(Vector2.left.scale(-30)),
		llmClient_ref().pathRef().opacity(0, 1),
		delay(0.5, all(
			how_llm().opacity(1, 1),
			how_codeLlm().opacity(1, 1),
		)),
	);

	yield* beginSlide("llmIssue");
	// The first hurdle with an llm is getting consistent output
	yield* how_codeLlm().codeRef().edit(1, false)`${insert('Human: "Convert this\n        to JSON: ___"')}`;
	
	yield* beginSlide("llmAnswer_1");
	yield* how_codeLlm().codeRef().edit(1, false)`Human: "Convert this\n        to JSON: ___"${insert('\n\nBot: "Sure thing!\n      Here: ___."')}`;
	
	yield* beginSlide("llmAnswer_2");
	yield* how_codeLlm().codeRef().edit(1, true)`Human: "Convert this\n        to JSON: ___"\n\nBot: "${edit('Sure thing!', 'Here it is:')}\n      ${edit('Here: ___.', '____')}"`;
	
	yield* beginSlide("llmAnswer_3");
	yield* how_codeLlm().codeRef().edit(1, true)`Human: "Convert this\n        to JSON: ___"\n\nBot: "${edit('Here it is:', 'bash```____```')}${remove('\n      ____')}"`;

	yield* beginSlide("llmHistory");
	// So, we provide it with a fake 'history' of examples so it knows how it 'pretend responded' in the past-
	yield* how_codeLlm().codeRef().edit(1, true)`${edit('Human: "Convert this\n        to JSON: ___"\n\nBot: "bash```____```"', 'Human: "___"\nBot: "___"\nHuman: "___"\nBot: "___"\nHuman: "___"\nBot: "___"')}`;

	yield* beginSlide("llmAnswer_4.1");
	// making it respond the same way each time.
	yield* how_codeLlm().codeRef().edit(1, true)`Human: "___"\nBot: "___"\nHuman: "___"\nBot: "___"\nHuman: "___"\nBot: "___"${insert('\n\nHuman: "___"')}`;
	yield* beginSlide("llmAnswer_4.2");
	yield* how_codeLlm().codeRef().edit(1, true)`Human: "___"\nBot: "___"\nHuman: "___"\nBot: "___"\nHuman: "___"\nBot: "___"\n\nHuman: "___"${insert('\n\Bot: "___"')}`;

	yield* beginSlide("schemaIntro");
	// The JSON it creates needs to match a very specific format- so we provide it with a schema for how it is supposed to be arranged
	yield* how_codeLlm().codeRef().edit(1, true)`${insert("System: [Role and\n        JSON schema]\n\n")}Human: "___"\nBot: "___"\nHuman: "___"\nBot: "___"\nHuman: "___"\nBot: "___"${remove('\n\nHuman: "___"\n\Bot: "___"')}`;
	
	yield* beginSlide("schemaAppears");





	//#endregion

	// I would like to use a simple LLM to do this translation; Something on our own system and light weight- not GPT-4 or something we would have to (1) pay for each query or (2) give customer data to

	
	yield* beginSlide("end");
 });
