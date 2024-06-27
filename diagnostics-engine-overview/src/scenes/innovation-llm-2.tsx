import {Circle, Layout, Line, Path, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, createSignal, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, tween, useLogger, waitFor, map, Reference} from '@motion-canvas/core';
import {catalogue_color, hopIn, hopOut} from "../utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";
import { Engine } from "../components/engine"
import { Paper } from "../components/Paper"
import { Block } from "../components/Block"
import { Arrow, Connection, ConnectionPosition } from "../components/Arrow"
import { CodeBlock, edit, insert, remove, lines, word } from "@motion-canvas/2d/lib/components/CodeBlock";

const isGifCapture = false; // Slightly changes the animation to make getting gifs easier

export default makeScene2D(function* (view) {
    const logger = useLogger();
	const camera = createRef<CameraView>();

    const chatGpt_ref = createRef<Block>();
	const phone_ref = createRef<Block>();
	const engine_ref = createRef<Block>();
	const engineCore_ref = createRef<Engine>();
	const toolGetProblems_ref = createRef<Block>();
	const toolGetDeviceNames_ref = createRef<Block>();
	const toolGetCurrentState_ref = createRef<Block>();
	const paper_ref = createRef<Paper>();
	const connect_1_ref = createRef<Arrow>();

    view.fill(catalogue_color.background);

	view.add(
		<>
			<CameraView ref={camera}
				width={"100%"}
				height={"100%"}
			>
                <Block ref={phone_ref}
                    x={-475}
                    y={-420}
                    opacity={0}
					path="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
                    label="Phone"
                />

                <Block ref={engine_ref}
                    x={-475}
                    y={0}
                    width={900}
                    height={240}
                    opacity={0}
                    label="Diagnostics Engine Chat"
                >
                </Block>
                <Block ref={toolGetProblems_ref}
                    x={-780}
                    y={-20}
                    opacity={0}
                    invertColors={true}
                    path="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
                    label="Get Problems"
                />
                <Block ref={toolGetDeviceNames_ref}
                    x={-475}
                    y={-20}
                    opacity={0}
                    invertColors={true}
                    path="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z"
                    label="Get Device Names"
                />
                <Block ref={toolGetCurrentState_ref}
                    x={-160}
                    y={-20}
                    opacity={0}
                    invertColors={true}
                    path="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
                    label="Get Current State"
                />
                
                <Engine ref={engineCore_ref}
                    x={-830}
                    y={360}
                    opacity={0}
                    mode="with_block"
                    showLabel={true}

                />
                
                <Block ref={chatGpt_ref}
                    x={-120}
                    y={360}
                    opacity={0}
					path="M 1107.3008 299.09961 C 909.30198 299.09961 733.39955 426.40058 672.09961 614.40039 L 671.96875 615.16992 C 545.47035 642.07709 436.47878 721.65742 372.34961 833.92773 C 273.35021 1005.3997 295.64399 1221.3854 427.80664 1368.4727 L 428.4082 1368.9727 C 388.46169 1491.9768 402.88464 1626.1558 468.04883 1737.8281 C 567.04823 1909.3002 765.24444 1997.9848 958.70703 1957.0723 L 959.44141 1956.8008 C 1045.9929 2052.898 1169.4057 2107.498 1298.6992 2106.9004 C 1496.698 2106.9004 1672.6005 1979.5994 1733.9004 1791.5996 L 1734.0312 1790.8301 C 1860.5304 1763.9233 1969.5209 1684.3431 2033.6504 1572.0723 C 2132.6498 1400.6002 2110.3559 1184.6146 1978.1934 1037.5273 L 1977.5918 1037.0273 C 2017.5384 914.02318 2003.1154 779.84427 1937.9512 668.17188 C 1838.9518 496.69988 1640.7555 408.01514 1447.293 448.92773 L 1446.5586 449.19922 C 1360.0071 353.10204 1236.5943 298.50195 1107.3008 299.09961 z M 1107.3008 416.59961 L 1106.6992 417.19922 C 1186.0259 417.19922 1262.2604 444.48313 1323.416 494.92773 L 953.86719 708.28711 C 949.13093 711.02159 944.90639 714.31381 941.21094 718.03711 C 929.90654 728.99265 923.40039 744.29604 923.40039 760.69922 L 923.40039 1248 L 769.16797 1159.0996 L 769.10156 756.53516 C 769.05426 717.57715 775.86583 679.10401 788.84375 642.68359 L 787.75586 642.42188 C 834.36207 511.04203 959.73458 416.83584 1107.3008 416.59961 z M 1549.6055 557.51172 C 1664.0533 560.04687 1774.5326 620.5161 1836.1934 726.92188 L 1835.373 726.70117 C 1875.0365 795.40032 1889.5247 875.06318 1876.416 953.24805 L 1506.8672 739.88867 C 1502.1291 737.15312 1497.1641 735.13947 1492.0898 733.80078 C 1476.9513 729.49062 1460.4462 731.50833 1446.2422 739.70898 L 1024.2285 983.35938 L 1024.1016 805.3418 L 1372.6992 604 C 1406.4142 584.48002 1443.14 571.14287 1481.1699 564.17188 L 1480.8535 563.09766 C 1503.6923 558.87787 1526.7256 557.0049 1549.6055 557.51172 z M 650 744.68164 L 650 1171.4004 C 650 1176.8727 650.73878 1182.1793 652.11719 1187.2441 C 655.95466 1202.5075 665.95382 1215.7905 680.15625 1223.9902 L 1102.1719 1467.6406 L 948.06641 1556.7598 L 599.40039 1355.5352 C 565.63811 1336.0971 535.72587 1310.9612 510.67383 1281.5117 L 509.90234 1282.3223 C 419.42698 1176.2702 400.52885 1020.592 474.10742 892.67773 L 474.32812 893.49805 C 513.99164 824.79882 575.73548 772.42159 650 744.68164 z M 1457.9336 849.24023 L 1806.5996 1050.4648 C 1840.3619 1069.9029 1870.2741 1095.0388 1895.3262 1124.4883 L 1896.0977 1123.6777 C 1986.573 1229.7298 2005.4712 1385.408 1931.8926 1513.3223 L 1931.6719 1512.502 C 1892.0084 1581.2011 1830.2645 1633.5784 1756 1661.3184 L 1756 1234.5996 C 1756 1229.1273 1755.2612 1223.8207 1753.8828 1218.7559 C 1750.0454 1203.4925 1740.0462 1190.2095 1725.8438 1182.0098 L 1303.8281 938.35938 L 1457.9336 849.24023 z M 1203 996.19336 L 1382.0996 1099.5957 L 1382.0996 1306.4043 L 1203 1409.8066 L 1023.9004 1306.4043 L 1023.9004 1099.5957 L 1203 996.19336 z M 1482.5996 1158 L 1636.832 1246.9004 L 1636.9004 1649.4648 C 1636.9474 1688.4229 1630.1341 1726.8959 1617.1562 1763.3164 L 1618.2441 1763.5781 C 1571.6379 1894.958 1446.2654 1989.1642 1298.6992 1989.4004 L 1299.3008 1988.8008 C 1219.9741 1988.8008 1143.7396 1961.5169 1082.584 1911.0723 L 1452.1328 1697.7129 C 1456.8691 1694.9784 1461.0936 1691.6862 1464.7891 1687.9629 C 1476.0935 1677.0074 1482.5996 1661.704 1482.5996 1645.3008 L 1482.5996 1158 z M 1381.7715 1422.6406 L 1381.8984 1600.6582 L 1033.3008 1802 C 999.58581 1821.52 962.86004 1834.8571 924.83008 1841.8281 L 925.14648 1842.9023 C 788.06517 1868.23 643.79625 1806.756 569.80859 1679.0781 L 570.62695 1679.2988 C 530.96348 1610.5997 516.4753 1530.9369 529.58398 1452.752 L 899.13281 1666.1113 C 903.87093 1668.8469 908.83588 1670.8605 913.91016 1672.1992 C 929.04871 1676.5094 945.55387 1674.4917 959.75781 1666.291 L 1381.7715 1422.6406 z "
                    label="GPT 3.5"
                    path_scale={0.07}
                    path_offset={-84}
                />

                <Paper
					name="chat.go"
					language="go"
					ref={paper_ref}
					fontSize={32}
					opacity={0}
					y={20}
					x={475}
                    width={930}
                    height={1000}
				/>

				<Arrow ref={connect_1_ref} />

            </CameraView>
		</>
	);

    engineCore_ref().eyeRef().opacity(0)
    yield* engineCore_ref().showLabel(0, "Diagnostics", "Engine Core")

    // We have a customer on their Vivint App
	yield* beginSlide("phone appears");
    yield* phone_ref().opacity(1, 1);

    // Which is connected to our chat service
	yield* beginSlide("engine appears");
    yield* engine_ref().opacity(1, 1)

    // They type in a message, which gets sent to our service
	yield* beginSlide("phone sends message.1");
    yield* connect_1_ref().drawArrow({ref: phone_ref().blockRef, position: "bottom"}, {ref: engine_ref().blockRef, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal", method: "partial"});

    // Our service prepares 2 things before sending the initial message to OpenAI
	yield* beginSlide("phone sends message.2");
    yield* connect_1_ref().drawArrowFinish({timespan: 1, lag: 0.3, direction: "end", method: "partial"});

    paper_ref().codeRef().code("toolList := []openai.Tool{\n  ...\n}\n\nmessageList := []openai.ChatCompletionMessage{\n  ...\n}\n\nresp, err := client.CreateChatCompletion(\n  ctx, openai.ChatCompletionRequest{\n    Model:       openai.GPT3Dot5Turbo,\n    Temperature: 0.5,\n    Tools:       toolList,\n    Messages:    messageList,\n  }\n)");
    yield* all(
        chatGpt_ref().opacity(1, 1),
        paper_ref().opacity(1, 1),
    );
    yield* paper_ref().codeRef().selection([
        ...lines(0),
        ...lines(2),
        ...lines(4),
        ...lines(6),
        ...lines(12),
        ...lines(13),
    ], 1);
   
    // First, we want to avoid the LLM making up things about a system. So, we create an outline of capabilities that the code has, which OpenAI calls a 'Tool'. More on this later.
	yield* beginSlide("prepMessage.1");
    yield* paper_ref().codeRef().selection(DEFAULT, 1);
    yield* paper_ref().codeRef().edit(3, false)`toolList := []openai.Tool{\n${edit("  ...", " {\n    Type: openai.ToolTypeFunction\n    Function: &openai.FunctionDefinition{\n      Name:        \"get_problems\",\n      Description: \"...\",\n    },\n  }, {\n    Type: openai.ToolTypeFunction\n    Function: &openai.FunctionDefinition{\n      Name:        \"get_device_names\",\n      Description: \"...\",\n    },\n  }, {\n    Type: openai.ToolTypeFunction\n    Function: &openai.FunctionDefinition{\n      Name:        \"get_current_state\",\n      Description: \"...\",\n      Parameters:  jsonschema.Definition{ ... },\n    },\n  },")}\n}\n\nmessageList := []openai.ChatCompletionMessage{\n  ...\n}${remove("\n\nresp, err := client.CreateChatCompletion(\n  ctx, openai.ChatCompletionRequest{\n    Model:       openai.GPT3Dot5Turbo,\n    Temperature: 0.5,\n    Tools:       toolList,\n    Messages:    messageList,\n  }\n)")}`,
    yield* paper_ref().codeRef().selection([
        ...lines(0),
        ...lines(4),
        ...lines(10),
        ...lines(16),
        ...lines(21),
    ], 1);

    // Second, we take the message they sent and put it in a list of messages. The first message in the list explains what the LLM will be doing.
	yield* beginSlide("prepMessage.2");
    yield* paper_ref().codeRef().selection(DEFAULT, 1);
    yield* paper_ref().codeRef().edit(3, false)`${insert("//go:embed chat_system_message.txt\nvar chatSystemMessage string\n\n")}toolList := []openai.Tool{${edit("\n {\n    Type: openai.ToolTypeFunction\n    Function: &openai.FunctionDefinition{\n      Name:        \"get_problems\",\n      Description: \"...\",\n    },\n  }, {\n    Type: openai.ToolTypeFunction\n    Function: &openai.FunctionDefinition{\n      Name:        \"get_device_names\",\n      Description: \"...\",\n    },\n  }, {\n    Type: openai.ToolTypeFunction\n    Function: &openai.FunctionDefinition{\n      Name:        \"get_current_state\",\n      Description: \"...\",\n      Parameters:  jsonschema.Definition{ ... },\n    },\n  },\n", "\n  ...\n")}}\n\nmessageList := []openai.ChatCompletionMessage{\n${edit("  ...\n", "  {\n    Role:    openai.ChatMessageRoleSystem,\n    Content: chatSystemMessage,\n  },\n  request.GetHistoryMessages()...\n  {\n    Role:    openai.ChatMessageRoleUser,\n    Content: request.GetQuestion(),\n  },\n")}}`;
    yield* paper_ref().codeRef().selection([
        ...lines(0,1),
        ...lines(8,11),
    ], 1);

    // Here is a few snippets of this message. We tell it to only use the data and steps from the tools- we don't want it to make stuff up.
    yield* beginSlide("systemMessage.1");
    yield* all(
        paper_ref().codeRef().selection(DEFAULT, 1),
        paper_ref().codeRef().edit(1, false)`${remove("//go:embed chat_system_message.txt\nvar chatSystemMessage string\n\ntoolList := []openai.Tool{\n  ...\n}\n\nmessageList := []openai.ChatCompletionMessage{\n  {\n    Role:    openai.ChatMessageRoleSystem,\n    Content: chatSystemMessage,\n  },\n  request.GetHistoryMessages()...\n  {\n    Role:    openai.ChatMessageRoleUser,\n    Content: request.GetQuestion(),\n  },\n}")}`,
    );
    paper_ref().codeRef().language("yaml");
    yield* all(
        paper_ref().textRef().text("chat_system_message.txt", 2),
        paper_ref().codeRef().edit(2, false)`${insert("Imagine you are a chat interface that talks to\nvivint customers about their system.\n\nDO NOT make up data- only tell them things about\ntheir system if you have the data to back it up\nfrom one of your tool calls.\n\nWhen responding to customers, create empathetic\n(but not TOO empathetic) and clear messages that\naddress their issues and provide reasonable\nexplanations. Ensure you\n  1. Only use tools for panel and camera metrics.\n  2. If the customer asks about anything else,\n     apologize and direct them to call\n     customer care at 800-678-2635.\n\nYou should NOT list instructions on how to fix\nthings- direct them to the provided url instead.\nDO NOT make up your own urls. ONLY use a url\nyou get from the `get_problems` tool, or provide\nthem with the customer care number.")}`
    );
    yield* paper_ref().codeRef().selection([
        ...word(3, 21, 27),
        ...lines(4),
        ...word(8, 5, 18),
        ...word(14, 22, 12),
        ...word(17, 8, 31),
    ], 1);

    // We also give it some background on what the different tool inputs mean, and what their corresponding outputs mean.
    yield* beginSlide("systemMessage.2");
    yield* all(
        paper_ref().codeRef().selection(DEFAULT, 1),
        paper_ref().codeRef().edit(2, false)`${remove("Imagine you are a chat interface that talks to\nvivint customers about their system.\n\nDO NOT make up data- only tell them things about\ntheir system if you have the data to back it up\nfrom one of your tool calls.\n\nWhen responding to customers, create empathetic\n(but not TOO empathetic) and clear messages that\naddress their issues and provide reasonable\nexplanations. Ensure you\n  1. Only use tools for panel and camera metrics.\n  2. If the customer asks about anything else,\n     apologize and direct them to call\n     customer care at 800-678-2635.\n\nYou should NOT list instructions on how to fix\nthings- direct them to the provided url instead.\nDO NOT make up your own urls. ONLY use a url\nyou get from the `get_problems` tool, or provide\nthem with the customer care number.")}${insert("Below is a json schema for the available metrics\n(When a tool function needs a 'metric_name'- they\nare asking for the top-level name of one of these)'.\n\npanel__network_connection_status:\n  type: object\n  description: ...\n  properties:\n    current_value:\n      type: integer\n      description: ...\n      enum:\n        0: Low Power Mode\n        10: No Wi-Fi Configuration\n        20: SSID Unavailable\n        40: Ethernet Not Working\n        50: No Internet\n        60: VPN Unreachable\n        70: VPN Misconfigured\n        80: VPN Connected\npanel__ac_power: ...\npanel__ssid: ...\ncamera__availability_network: ...\ncamera__rssi: ...\ncamera__iperf: ...\ncamera__ssid: ...")}`,
    );
    yield* paper_ref().codeRef().selection([
        ...lines(4),
        ...lines(6),
        ...lines(11),
        ...lines(18, 19),
    ], 1);

    // To allow for a continuing conversation, we then add in any message history that the phone says there has been.
    yield* beginSlide("systemMessage.3");
    yield* paper_ref().codeRef().edit(1, false)`${remove("Below is a json schema for the available metrics\n(When a tool function needs a 'metric_name'- they\nare asking for the top-level name of one of these)'.\n\npanel__network_connection_status:\n  type: object\n  description: ...\n  properties:\n    current_value:\n      type: integer\n      description: ...\n      enum:\n        0: Low Power Mode\n        10: No Wi-Fi Configuration\n        20: SSID Unavailable\n        40: Ethernet Not Working\n        50: No Internet\n        60: VPN Unreachable\n        70: VPN Misconfigured\n        80: VPN Connected\npanel__ac_power: ...\npanel__ssid: ...\ncamera__availability_network: ...\ncamera__rssi: ...\ncamera__iperf: ...\ncamera__ssid: ...")}`
    paper_ref().codeRef().language("go"),
    yield* all(
        paper_ref().codeRef().selection(DEFAULT, 1),
        paper_ref().textRef().text("chat.go", 1),
        paper_ref().codeRef().edit(3, false)`${insert("//go:embed chat_system_message.txt\nvar chatSystemMessage string\n\ntoolList := []openai.Tool{\n  ...\n}\n\nmessageList := []openai.ChatCompletionMessage{\n  {\n    Role:    openai.ChatMessageRoleSystem,\n    Content: chatSystemMessage,\n  },\n  request.GetHistoryMessages()...\n  {\n    Role:    openai.ChatMessageRoleUser,\n    Content: request.GetQuestion(),\n  },\n}")}`,
    );
    yield* paper_ref().codeRef().selection([
        ...lines(12),
    ], 1);

    // Finally, the message list gets the question the user just typed in
    yield* beginSlide("systemMessage.4");
    yield* paper_ref().codeRef().selection([
        ...lines(13,16),
    ], 1);
   
   // Both the message list and the list of capabilities are sent to OpenAI.
	yield* beginSlide("prepMessage.3");
    yield* paper_ref().codeRef().selection(DEFAULT, 1);
    yield* paper_ref().codeRef().edit(3, false)`${remove("//go:embed chat_system_message.txt\nvar chatSystemMessage string\n\n")}toolList := []openai.Tool{\n  ...\n}\n\nmessageList := []openai.ChatCompletionMessage{\n${edit("  {\n    Role:    openai.ChatMessageRoleSystem,\n    Content: chatSystemMessage,\n  },\n  request.GetHistoryMessages()...\n  {\n    Role:    openai.ChatMessageRoleUser,\n    Content: request.GetQuestion(),\n  },", "  ...")}\n}${insert("\n\nresp, err := client.CreateChatCompletion(\n  ctx, openai.ChatCompletionRequest{\n    Model:       openai.GPT3Dot5Turbo,\n    Temperature: 0.5,\n    Tools:       toolList,\n    Messages:    messageList,\n  }\n)")}`;
    yield* paper_ref().codeRef().selection([
        ...lines(8),
        ...lines(12),
        ...lines(13),
        ...lines(15),
    ], 1);
    yield* connect_1_ref().drawArrow({ref: engine_ref().blockRef, position: "bottom"}, {ref: chatGpt_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", method: "partial"});

    // If the user asked for something that did NOT require the use of one of our tools- OpenAI will send us a message back for the user.
	yield* beginSlide("message openai 1");
    yield* connect_1_ref().drawArrowFinish({timespan: 1, lag: 0.3, direction: "end", method: "partial"});

    yield* all(
        connect_1_ref().drawArrow({ref: chatGpt_ref().blockRef, position: "left"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "counter_clockwise_90", method: "partial"}),
        paper_ref().codeRef().selection(DEFAULT, 1),
    );

    yield* paper_ref().codeRef().edit(3, false)`toolList := []openai.Tool{${edit("\n  ...\n", "...")}}${edit("\n\n", "\n")}messageList := []openai.ChatCompletionMessage{${edit("\n  ...\n", "...")}}${edit("\n\n", "\n")}resp, err := client.CreateChatCompletion(${edit("\n  ctx, openai.ChatCompletionRequest{\n    Model:       openai.GPT3Dot5Turbo,\n    Temperature: 0.5,\n    Tools:       toolList,\n    Messages:    messageList,\n  }\n", "...")})${insert("\n\nmessage := resp.Choices[0].Message\nif len(message.ToolCalls) == 0 {\n  return message.Content, nil\n}")}`,
    yield* paper_ref().codeRef().selection([
        ...lines(2),
        ...lines(5, 7),
    ], 1);

    // But if the user DID ask something that would require one of our tool, OpenAI will NOT send us a reply for the user, but a request for the output of a particular tool.
    yield* beginSlide("tool reply.1");
    yield* paper_ref().codeRef().selection(DEFAULT, 1)
    yield* paper_ref().codeRef().edit(3, false)`toolList := []openai.Tool{...}\nmessageList := []openai.ChatCompletionMessage{...}\nresp, err := client.CreateChatCompletion(...)\n\nmessage := resp.Choices[0].Message\nif len(message.ToolCalls) == 0 {\n  return message.Content, nil\n}${insert("\n\nvar toolReplies []openai.ChatCompletionMessage\nfor _, toolCall := range message.ToolCalls {\n  switch toolCall.Function.Name {\n    case \"get_problems\":\n      toolReply = ToolGetProblems(...)\n    case \"get_device_names\":\n      toolReply = ToolGetDeviceNames(...)\n    case \"get_current_state\":\n      toolReply = ToolGetCurrentState(...)\n  }\n  toolReplies = append(toolReplies, toolReply)\n}")}`,
    yield* paper_ref().codeRef().selection([
        ...lines(2),
        ...lines(10),
        ...lines(20),
    ], 1);

    // The names of the tools that we provided OpenAI with in our original message matches the names in our switch/case here.
    yield* beginSlide("tool reply.2");
    yield* all(
        connect_1_ref().drawArrowFinish({timespan: 1, lag: 0.3, direction: "end", method: "partial"}),
        paper_ref().codeRef().selection(DEFAULT, 1),
    );

    yield* all(
        paper_ref().codeRef().edit(3, false)`toolList := []openai.Tool{${edit("...", "\n  { Name: \"get_problems\" },\n  { Name: \"get_device_names\" },\n  { Name: \"get_current_state\", Parameters:  ... },\n")}}\nmessageList := []openai.ChatCompletionMessage{...}\nresp, err := client.CreateChatCompletion(...)\n\nmessage := resp.Choices[0].Message\nif len(message.ToolCalls) == 0 {\n  return message.Content, nil\n}\n\nvar toolReplies []openai.ChatCompletionMessage\nfor _, toolCall := range message.ToolCalls {\n  switch toolCall.Function.Name {\n    case \"get_problems\":\n      toolReply = ToolGetProblems(...)\n    case \"get_device_names\":\n      toolReply = ToolGetDeviceNames(...)\n    case \"get_current_state\":\n      toolReply = ToolGetCurrentState(...)\n  }\n  toolReplies = append(toolReplies, toolReply)\n}`,
        delay(0.8, sequence(0.3,
            toolGetDeviceNames_ref().opacity(1, 1),
            toolGetCurrentState_ref().opacity(1, 1),
            toolGetProblems_ref().opacity(1, 1),
        )),
    );

    yield* paper_ref().codeRef().selection([
        ...lines(1,3),
        ...lines(16),
        ...lines(18),
        ...lines(20),
    ], 1);
    
    // The tools use data from the Diagnostics Engine, so before any tools are ran we get the data the tools will be making use of
    yield* beginSlide("tool reply.3");
    yield* paper_ref().codeRef().selection(DEFAULT, 1);
    yield* paper_ref().codeRef().edit(3, false)`toolList := []openai.Tool{${edit("\n  { Name: \"get_problems\" },\n  { Name: \"get_device_names\" },\n  { Name: \"get_current_state\", Parameters:  ... },\n", "...")}}\nmessageList := []openai.ChatCompletionMessage{...}\nresp, err := client.CreateChatCompletion(...)\n\nmessage := resp.Choices[0].Message\nif len(message.ToolCalls) == 0 {\n  return message.Content, nil\n}\n\n${edit("var ", "if diagnosticsEngineReply == nil {\n  diagnosticsEngineReply = GetDiagnosticsReply(...)\n}\n\n")}toolReplies${edit(" []openai.ChatCompletionMessage\nfor _, toolCall := range message.ToolCalls {\n  switch toolCall.Function.Name {\n    case \"get_problems\":\n      toolReply = ToolGetProblems(...)\n    case \"get_device_names\":\n      toolReply = ToolGetDeviceNames(...)\n    case \"get_current_state\":\n      toolReply = ToolGetCurrentState(...)\n  }\n  toolReplies = append(toolReplies, toolReply)\n}", " := RunTools(diagnosticsEngineReply, ...)")}`,
    yield* all(
        engineCore_ref().opacity(1, 1),
        paper_ref().codeRef().selection([
            ...lines(9, 13),
        ], 1),
    );
    yield* connect_1_ref().drawArrow({ref: engine_ref().blockRef, position: "bottom"}, {ref: engineCore_ref().blockRef, position: "right"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", method: "partial"});

    // The tool replies are added to the message list, and we then repeatedly send the message back to OpenAI.
    yield* beginSlide("tool reply.4");
    yield* all(
        connect_1_ref().drawArrowFinish({timespan: 1, lag: 0.3, direction: "end", method: "partial"}),
        paper_ref().codeRef().selection(DEFAULT, 1),
    );
    yield* paper_ref().codeRef().edit(3, false)`${insert("func sendChat(...) (string, error) {\n  if nestedLevel > MaxNestedLevels {\n    return \"\", \"too many tool calls\"\n  }\n\n  ")}toolList := []openai.Tool{...}\nmessageList := []openai.ChatCompletionMessage{...}\n${insert("  ")}${insert("  ")}resp, err := client.CreateChatCompletion(...)\n\n${insert("  if err != nil {\n    return \"\", err\n  }\n\n  ")}message := resp.Choices[0].Message\n${insert("  ")}if len(message.ToolCalls) == 0 {\n${insert("  ")}  return message.Content, nil\n${insert("  ")}}\n\n${remove("if diagnosticsEngineReply == nil {\n  diagnosticsEngineReply = GetDiagnosticsReply(...)\n}\n\n")}${edit("toolReplies := ", "  messageList = append(messageList, message)\n  messageList = append(messageList, ")}RunTools(${remove("diagnosticsEngineReply, ")}...)${insert(")\n\n  return sendChat(ctx, messageList, nestedLevel+1)\n}")}`,
    yield* all(
        paper_ref().codeRef().selection([
            ...lines(0),
            ...lines(19),
            ...lines(21, 22),
        ], 1),
        connect_1_ref().drawArrow({ref: engineCore_ref().blockRef, position: "right"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "counter_clockwise_90", method: "partial"}),
    );

    // This back and forth happens until either we return an error for too many tool calls or OpenAI has finally crafted an answer to give the user
    yield* beginSlide("end.1");
    yield* all(
        paper_ref().codeRef().selection([
            ...lines(1,3),
            ...lines(14,16),
        ], 1),
        chain(
            connect_1_ref().drawArrowFinish({timespan: 1, lag: 0.3, direction: "end", method: "partial"}),
            connect_1_ref().drawArrow({ref: engine_ref().blockRef, position: "bottom"}, {ref: chatGpt_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", method: "complete"}),

            connect_1_ref().drawArrow({ref: chatGpt_ref().blockRef, position: "left"}, {ref: toolGetProblems_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal_clockwise", method: "complete"}),
            connect_1_ref().drawArrow({ref: toolGetProblems_ref().blockRef, position: "bottom"}, {ref: chatGpt_ref().blockRef, position: "left"}, {timespan: 1, lag: 0.3, direction: "end", bend: "horizontal_counter_clockwise", method: "complete"}),

            connect_1_ref().drawArrow({ref: chatGpt_ref().blockRef, position: "top"}, {ref: toolGetCurrentState_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "vertical", method: "complete"}),
            connect_1_ref().drawArrow({ref: toolGetCurrentState_ref().blockRef, position: "bottom"}, {ref: chatGpt_ref().blockRef, position: "top"}, {timespan: 1, lag: 0.3, direction: "end", bend: "vertical", method: "complete"}),

            connect_1_ref().drawArrow({ref: chatGpt_ref().blockRef, position: "left"}, {ref: engine_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "counter_clockwise_90", method: "complete"}),
            connect_1_ref().drawArrow({ref: engine_ref().blockRef, position: "top"}, {ref: phone_ref().blockRef, position: "bottom"}, {timespan: 1, lag: 0.3, direction: "end", bend: "clockwise_90", method: "partial"}),
        ),
    );

	yield* beginSlide("end.2");
    yield* connect_1_ref().drawArrowFinish({timespan: 1, lag: 0.3, direction: "end", method: "partial"});
    yield* sequence(0.3,
        paper_ref().opacity(0, 1),
        chatGpt_ref().opacity(0, 1),
        engineCore_ref().opacity(0, 1),
        toolGetCurrentState_ref().opacity(0, 0.5),
        toolGetDeviceNames_ref().opacity(0, 0.5),
        toolGetProblems_ref().opacity(0, 0.5),
        engine_ref().opacity(0, 1),
        phone_ref().opacity(0, 1),
    )
});