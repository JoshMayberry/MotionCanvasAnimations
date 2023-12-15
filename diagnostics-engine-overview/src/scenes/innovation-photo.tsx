import {makeScene2D, Txt, Layout, Rect, Path, Line, Img, Video} from '@motion-canvas/2d';
import { CodeBlock, edit, insert, remove } from '@motion-canvas/2d/lib/components/CodeBlock';
import {Reference, ThreadGenerator, all, beginSlide, createRef, delay, fadeTransition, sequence, slideTransition, waitFor} from '@motion-canvas/core';

import demoPhoto_src from "../media/photo2audio_photo.png"
import demoAudio_src from "../media/photo2Audio_audio.mp4"

export default makeScene2D(function* (view) {
	const DemoImage = createRef<Img>();
	const DemoAudio = createRef<Video>();

	const ImageProcessor = createRef<Layout>();
	const ChatGPT = createRef<Layout>();
	const AudioGen = createRef<Layout>();
	const OurCode = createRef<Layout>();
	const Arrow = createRef<Line>();
	const ImageProcessorRect = createRef<Rect>();
	const ChatGPTRect = createRef<Rect>();
	const AudioGenRect = createRef<Rect>();
	const OurCodeRect = createRef<Rect>();
	const Input = createRef<Layout>();
	const InputRect = createRef<Rect>();
	const Output = createRef<Layout>();
	const OutputRect = createRef<Rect>();
	const Label = createRef<Txt>();
	const Paper = createRef<Layout>();
	const PaperLabel = createRef<Txt>();
	const PaperRect = createRef<Rect>();
	const PaperCode = createRef<CodeBlock>();

	const color_catalogue = {
		// background: "#EDF2F2",
		background: "#242424",
		paper: "#1E1E1F",
		color_1: "#99A596",
		color_2: "#9baba9",
		color_3: "#909999",
		color_4: "#d1aeb1",
	}

	view.fill(color_catalogue.background)

	view.add(
		<Layout>
			<Img ref={DemoImage}
				width={1800}
				height={1000}
				opacity={0}
				src={demoPhoto_src}
			/>
			<Video ref={DemoAudio}
				// opacity={0}
				width={1}
				height={1}
				src={demoAudio_src}
			/>
			<Layout
				x={-400}
			>
				<Layout ref={Input} 
					opacity={0}
					x={-400}
					y={-300}
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
				</Layout>
				<Layout ref={Output} 
					opacity={0}
					x={400}
					y={-300}
				> 
					<Rect
						ref={OutputRect} 
						width={200}
						height={200}
						fill={color_catalogue.color_2}
						radius={10}
					/>
					<Path 
						data={"M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm100-280Zm260 134v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM160-520v80h182l98 58v-196l-98 58H160Z"}
						fill={color_catalogue.background}
						scale={0.2}
						x={-95}
						y={95}
					/>
				</Layout>
				<Layout ref={ImageProcessor} 
					opacity={0}
					x={-400}
					y={100}
				> 
					<Rect
						ref={ImageProcessorRect} 
						width={200}
						height={200}
						fill={color_catalogue.color_3}
						radius={10}
					/>
					<Path 
						data={"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"}
						fill={color_catalogue.background}
						scale={0.2}
						x={-95}
						y={95}
					/>
				</Layout>
				<Layout ref={ChatGPT} 
					opacity={0}
					x={0}
					y={100}
				> 
					<Rect 
						ref={ChatGPTRect}
						width={200}
						height={200}
						fill={color_catalogue.color_3}
						radius={10}
					/>
					<Path 
						data={"M 1107.3008 299.09961 C 909.30198 299.09961 733.39955 426.40058 672.09961 614.40039 L 671.96875 615.16992 C 545.47035 642.07709 436.47878 721.65742 372.34961 833.92773 C 273.35021 1005.3997 295.64399 1221.3854 427.80664 1368.4727 L 428.4082 1368.9727 C 388.46169 1491.9768 402.88464 1626.1558 468.04883 1737.8281 C 567.04823 1909.3002 765.24444 1997.9848 958.70703 1957.0723 L 959.44141 1956.8008 C 1045.9929 2052.898 1169.4057 2107.498 1298.6992 2106.9004 C 1496.698 2106.9004 1672.6005 1979.5994 1733.9004 1791.5996 L 1734.0312 1790.8301 C 1860.5304 1763.9233 1969.5209 1684.3431 2033.6504 1572.0723 C 2132.6498 1400.6002 2110.3559 1184.6146 1978.1934 1037.5273 L 1977.5918 1037.0273 C 2017.5384 914.02318 2003.1154 779.84427 1937.9512 668.17188 C 1838.9518 496.69988 1640.7555 408.01514 1447.293 448.92773 L 1446.5586 449.19922 C 1360.0071 353.10204 1236.5943 298.50195 1107.3008 299.09961 z M 1107.3008 416.59961 L 1106.6992 417.19922 C 1186.0259 417.19922 1262.2604 444.48313 1323.416 494.92773 L 953.86719 708.28711 C 949.13093 711.02159 944.90639 714.31381 941.21094 718.03711 C 929.90654 728.99265 923.40039 744.29604 923.40039 760.69922 L 923.40039 1248 L 769.16797 1159.0996 L 769.10156 756.53516 C 769.05426 717.57715 775.86583 679.10401 788.84375 642.68359 L 787.75586 642.42188 C 834.36207 511.04203 959.73458 416.83584 1107.3008 416.59961 z M 1549.6055 557.51172 C 1664.0533 560.04687 1774.5326 620.5161 1836.1934 726.92188 L 1835.373 726.70117 C 1875.0365 795.40032 1889.5247 875.06318 1876.416 953.24805 L 1506.8672 739.88867 C 1502.1291 737.15312 1497.1641 735.13947 1492.0898 733.80078 C 1476.9513 729.49062 1460.4462 731.50833 1446.2422 739.70898 L 1024.2285 983.35938 L 1024.1016 805.3418 L 1372.6992 604 C 1406.4142 584.48002 1443.14 571.14287 1481.1699 564.17188 L 1480.8535 563.09766 C 1503.6923 558.87787 1526.7256 557.0049 1549.6055 557.51172 z M 650 744.68164 L 650 1171.4004 C 650 1176.8727 650.73878 1182.1793 652.11719 1187.2441 C 655.95466 1202.5075 665.95382 1215.7905 680.15625 1223.9902 L 1102.1719 1467.6406 L 948.06641 1556.7598 L 599.40039 1355.5352 C 565.63811 1336.0971 535.72587 1310.9612 510.67383 1281.5117 L 509.90234 1282.3223 C 419.42698 1176.2702 400.52885 1020.592 474.10742 892.67773 L 474.32812 893.49805 C 513.99164 824.79882 575.73548 772.42159 650 744.68164 z M 1457.9336 849.24023 L 1806.5996 1050.4648 C 1840.3619 1069.9029 1870.2741 1095.0388 1895.3262 1124.4883 L 1896.0977 1123.6777 C 1986.573 1229.7298 2005.4712 1385.408 1931.8926 1513.3223 L 1931.6719 1512.502 C 1892.0084 1581.2011 1830.2645 1633.5784 1756 1661.3184 L 1756 1234.5996 C 1756 1229.1273 1755.2612 1223.8207 1753.8828 1218.7559 C 1750.0454 1203.4925 1740.0462 1190.2095 1725.8438 1182.0098 L 1303.8281 938.35938 L 1457.9336 849.24023 z M 1203 996.19336 L 1382.0996 1099.5957 L 1382.0996 1306.4043 L 1203 1409.8066 L 1023.9004 1306.4043 L 1023.9004 1099.5957 L 1203 996.19336 z M 1482.5996 1158 L 1636.832 1246.9004 L 1636.9004 1649.4648 C 1636.9474 1688.4229 1630.1341 1726.8959 1617.1562 1763.3164 L 1618.2441 1763.5781 C 1571.6379 1894.958 1446.2654 1989.1642 1298.6992 1989.4004 L 1299.3008 1988.8008 C 1219.9741 1988.8008 1143.7396 1961.5169 1082.584 1911.0723 L 1452.1328 1697.7129 C 1456.8691 1694.9784 1461.0936 1691.6862 1464.7891 1687.9629 C 1476.0935 1677.0074 1482.5996 1661.704 1482.5996 1645.3008 L 1482.5996 1158 z M 1381.7715 1422.6406 L 1381.8984 1600.6582 L 1033.3008 1802 C 999.58581 1821.52 962.86004 1834.8571 924.83008 1841.8281 L 925.14648 1842.9023 C 788.06517 1868.23 643.79625 1806.756 569.80859 1679.0781 L 570.62695 1679.2988 C 530.96348 1610.5997 516.4753 1530.9369 529.58398 1452.752 L 899.13281 1666.1113 C 903.87093 1668.8469 908.83588 1670.8605 913.91016 1672.1992 C 929.04871 1676.5094 945.55387 1674.4917 959.75781 1666.291 L 1381.7715 1422.6406 z "}
						fill={color_catalogue.background}
						scale={0.09}
						x={-106}
						y={-105}
					/>
				</Layout>
				<Layout ref={AudioGen} 
					opacity={0}
					x={400}
					y={100}
				> 
					<Rect 
						ref={AudioGenRect}
						width={200}
						height={200}
						fill={color_catalogue.color_3}
						radius={10}
					/>
					<Path 
						data={"m798-322-62-62q44-41 69-97t25-119q0-63-25-118t-69-96l62-64q56 53 89 125t33 153q0 81-33 153t-89 125ZM670-450l-64-64q18-17 29-38.5t11-47.5q0-26-11-47.5T606-686l64-64q32 29 50 67.5t18 82.5q0 44-18 82.5T670-450Zm-310 10q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-120v-112q0-33 17-62t47-44q51-26 115-44t141-18q77 0 141 18t115 44q30 15 47 44t17 62v112H40Zm80-80h480v-32q0-11-5.5-20T580-266q-36-18-92.5-36T360-320q-71 0-127.5 18T140-266q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-600q0-33-23.5-56.5T360-680q-33 0-56.5 23.5T280-600q0 33 23.5 56.5T360-520Zm0-80Zm0 400Z"}
						fill={color_catalogue.background}
						scale={0.19}
						x={-94}
						y={94}
					/>
				</Layout>
				<Layout ref={OurCode} 
					opacity={0}
					x={0}
					y={-300}
				> 
					<Rect 
						ref={OurCodeRect}
						width={200}
						height={200}
						fill={"#d1aeb1"}
						radius={10}
					/>
					<Path 
						data={"M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"}
						fill={color_catalogue.background}
						scale={0.20}
						x={-95}
						y={95}
					/>
				</Layout>
				
				<Txt ref={Label}
					text={""}
					fill={color_catalogue.color_1}
					y={400}
					fontSize={100}
				/>
			</Layout>

			<Layout ref={Paper}
				opacity={0}
			>
				<Rect ref={PaperRect}
					width={750}
					height={900}
					fill={color_catalogue.paper}
					radius={10}
					x={550}
					y={50}
				>
					<CodeBlock ref={PaperCode}
						language={"python"}
						code={""}
						fontSize={48}
					/>
				</Rect>
				<Txt ref={PaperLabel}
					text={"code.py"}
					fill={color_catalogue.color_4}
					fontSize={60}
					bottomLeft={PaperRect().topLeft}
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

	function* UpdateLabel(RefFrom: Reference<Rect>, text: string, lengthTime: number = 1) {
		yield* all(
			Label().text(text, lengthTime),
			Label().fill(RefFrom().fill(), lengthTime),
		);
	}

	function* UpdateCode(RefFrom: Reference<Rect>, code: ThreadGenerator, lengthTime: number = 1) {
		yield* all(
			Label().fill(RefFrom().fill(), lengthTime),
			code,
		);
	}	

	// Here's a demo of that working:
	yield* fadeTransition(1);
	yield* DemoImage().opacity(1, 1);

	yield* beginSlide("playAudio");
	DemoAudio().play();
	yield* waitFor(10);

	// Here's how this process works
	yield* beginSlide("demoFadeOut");
	yield* all(
		DemoImage().opacity(0, 1),
		DemoAudio().opacity(0, 1),
	)

	// The doorbell camera takes a picture
	yield* beginSlide("doorbellAppears");
	yield* sequence(0.25,
		Input().opacity(1, 1),
		UpdateLabel(InputRect, "Image Taken"),
		Paper().opacity(1, 1),
		UpdateCode(InputRect, PaperCode().edit(1, false)`${insert("imagePath")}`),
	);

	// The camera sends snapshot images to our server, which are intercepted by our code
	yield* beginSlide("Cam2Code");
	yield* all(
		OurCode().opacity(1, 1),
		delay(0.5, all(
			DrawArrow(InputRect, OurCodeRect, "right", "left"),
			delay(0.5, all(
				UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${insert("description = \n getDescription(")}imagePath${insert(")\n\nmessage = \n  askLLM(description)\n\naudioPath = \n  testToAudio(message)")}`),
				UpdateLabel(InputRect, "Trigger Our Code"),
			)),
		)),
	);
	
	// First, we want to interpret the image; things like what color of clothes they are wearing and what they are doing
	yield* beginSlide("code1")
	yield* all(
		UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${edit("description =\n getDescription(", "import requests\n\nbase64Image = encodeImage(\n  ")}imagePath${edit(")\n\nmessage = \n  askLLM(description)\n\naudioPath = \n  testToAudio(message)", "\n)\n\nheaders = { ... }\n\npayload = {\n  \"model\": \"gpt-4-vision\",\n  ...\n  \"image\": base64Image\n}")}`),
		UpdateLabel(OurCodeRect, "Prep Request"),
	);

	// So we ask open ai to do that for us
	yield* beginSlide("Code2Img")
	yield* all(
		ImageProcessor().opacity(1, 1),
		delay(0.5, all(
			DrawArrow(OurCodeRect, ImageProcessorRect, "bottomLeft", "topRight"),
			UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${edit("import", "response =")} requests${edit("\n\nbase64Image = encodeImage", ".post")}(\n  ${edit("imagePath", "\"\"\"\n    https://")}\n${edit(")", "    api.openai.com/")}\n${insert("    v1/chat/completions\n  \"\"\",")}\n${insert("  headers=")}headers${insert(",")}${remove(" = { ... }\n")}\n${insert("  json=")}payload${remove(" = {\n  \"model\": \"gpt-4-vision\",\n  ...\n  \"image\": base64Image")}\n)`),
			delay(0.5, UpdateLabel(OurCodeRect, "Image Sent to Processor")),
		)),
	);

	// Which returns a list of attributes to us
	yield* beginSlide("Img2Code.1")
	yield* all(
		DrawArrow(ImageProcessorRect, OurCodeRect, "topRight", "bottomLeft"),
		delay(0.5, all(
			UpdateCode(ImageProcessorRect, PaperCode().edit(1, false)`${insert("text = ")}response${remove(" = requests")}.${edit("post", "get")}(\n  \"${edit("\"","choices")}\"${insert(", [{}]")}\n${edit("    https://", ")[0].get(")}\n  ${edit("  api.openai.com/", "\"message\", {}")}\n${edit("    v1/chat/completions", ").get(")}\n  "${insert("content\", ")}""${remove(",")}\n${edit("  headers=headers,", ")")}\n${remove("  json=payload")}\n${edit(")", "description = [\n  line.strip() for line in\n  text.split('\\n')\n  if line.startswith('-')\n]")}`),
			UpdateLabel(ImageProcessorRect, "Image Processed"),
		)),
	);

	// Now, let's generate a message of what to say
	yield* beginSlide("Img2Code.3")
	yield* all(
		UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${remove("text = response.get(\n  \"choices\", [{}]\n)[0].get(\n  \"message\", {}\n).get(\n  \"content\", \"\"\n)\n\n")}description = ${edit("[\n  line.strip() for line in\n  text.split('\\n')\n  if line.startswith('-')\n]", "\n  getDescription(imagePath)\n\nmessage = \n  askLLM(description)\n\naudioPath = \n  testToAudio(message)")}`),
	);

	// We prep the prompt
	yield* beginSlide("code2.1")
	yield* all(
		UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${edit("description =\n  getDescription(imagePath)\n\nmessage = \n  askLLM(", "prompt = f\"\"\"\n  Here is a person with the\n  following attributes:\n  {', '.join(")}description${edit(")\n\naudioPath = \n  testToAudio(message)", ")}.\n  Please confront them as\n  they are entering your\n  property, mentioning\n  some of their attributes\n  so they know you are\n  talking to them\n  but do not ask questions.\n\"\"\"")}`),
		UpdateLabel(OurCodeRect, "Compose Prompt"),
	);

	// Then also ask open ai to do that
	yield* beginSlide("Code2Gpt")
	yield* all(
		ChatGPT().opacity(1, 1),
		delay(0.5, all(
			DrawArrow(OurCodeRect, ChatGPTRect, "bottom", "top"),
			UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${insert("response =\nopenai.Completion.create(\n  engine=\"text-davinci-003\",\n  prompt=")}prompt${edit(" = f\"\"\"\n  Here is a person with the\n  following attributes:\n  {', '.join(description)}.\n  Please confront them as\n  they are entering your\n  property, mentioning\n  some of their attributes\n  so they know you are\n  talking to them\n  but do not ask questions.\n\"\"\"", ",\n  max_tokens=1024,\n  n=1,\n  stop=None,  \n  temperature=0.5,\n)")}`),
			delay(0.5, UpdateLabel(OurCodeRect, "Prompt sent to LLM")),
		)),
	);

	// It replies back with what to say
	yield* beginSlide("Gpt2Code")
	yield* all(
		DrawArrow(ChatGPTRect, OurCodeRect, "top", "bottom"),
		delay(1, all(
			UpdateCode(ChatGPTRect, PaperCode().edit(1, false)`${insert("message = \n  ")}response${edit(" =\nopenai.Completion.create(\n  engine=\"text-davinci-003\",\n  prompt=prompt,\n  max_tokens=1024,\n  n=1,\n  stop=None,  \n  temperature=0.5,\n)", ".choices[0].text")}`),
			delay(0.5, UpdateLabel(ChatGPTRect, "LLM Generates Message")),
		)),
	);
	
	// So now, let's synthesize some audio
	yield* beginSlide("code3")
	yield* all(
		UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${insert("description =\n  getDescription(imagePath)\n\n")}message = \n  ${edit("response.choices[0].text", "askLLM(description)\n\naudioPath = \n  testToAudio(message)")}`),
	);

	// Same thing; prep the request
	yield* beginSlide("code3.2")
	yield* all(
		UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${edit("description =\n  getDescription(imagePath)\n\nmessage = \n  askLLM(description)\n\naudioPath = \n  testToAudio(", "import requests\n\nheaders = {\n  \"Content-Type\":\n    \"application/json\",\n  \"Authorization\":\n    f\"Bearer {api_key}\"\n}\n\npayload = {\n  \"model\": \"tts-1\",\n  \"voice\": \"onyx\",\n  \"input\": ")}message${edit(")", "\n}")}`),
		UpdateLabel(OurCodeRect, "Prep Request"),
	);

	// And send it to open ai once more
	yield* beginSlide("Code2Aud")
	yield* all(
		AudioGen().opacity(1, 1),
		delay(0.5, all(
			DrawArrow(OurCodeRect, AudioGenRect, "bottomRight", "topLeft"),
			UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${edit("import", "response =")} requests${edit("\n\n", ".post(\n  \"\"\"\n    https://\n    api.openai.com/\n    v1/audio/speech\n  \"\"\",\n  headers=")}headers${edit(" = {\n  \"Content-Type\":\n    \"application/json\",\n  \"Authorization\":\n    f\"Bearer {api_key}\"\n}\n\n", ",\n  json=")}payload${edit(" = {\n  \"model\": \"tts-1\",\n  \"voice\": \"onyx\",\n  \"input\": message\n}", "\n)")}`),
			delay(0.5, UpdateLabel(OurCodeRect, "Script sent to\nAudio Generator")),
		)),
	);

	// It returns the audio file to play
	yield* beginSlide("Aud2Code")
	yield* all(
		DrawArrow(AudioGenRect, OurCodeRect, "topLeft", "bottomRight"),
		delay(1, all(
			UpdateCode(AudioGenRect, PaperCode().edit(1, false)`${insert("with open(\n  audioPath, \"wb\"\n) as f:\n  f.write(")}response${edit(" = requests.post(\n  \"\"\"\n    https://\n    api.openai.com/\n    v1/audio/speech\n  \"\"\",\n  headers=headers,\n  json=payload\n)", ".content)")}`),
			delay(0.5, Label().text("Audio Generated", 1)),
		)),
	);

	// And that is the end of our code
	yield* beginSlide("ourCode.3");
	yield* all(
		UpdateCode(OurCodeRect, PaperCode().edit(1, false)`${edit("with open(\n  ", "description =\n  getDescription(imagePath)\n\nmessage = \n  askLLM(description)\n\n")}audioPath${edit(", \"wb\"\n) as f:\n  f.write(response.content)", " = \n  testToAudio(message)")}`),
	);

	// So we can send that audio to the speaker
	yield* beginSlide("Code2Out")
	yield* all(
		Output().opacity(1, 1),
		delay(1, all(
			DrawArrow(OurCodeRect, OutputRect, "right", "left"),
			delay(0.5, Label().text("Audio Sent", 1)),
		)),
	);

	yield* beginSlide("End");
});