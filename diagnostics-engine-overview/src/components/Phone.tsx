import {Circle, Layout, Node, NodeProps, Path, Rect} from '@motion-canvas/2d/lib/components';
import {Color} from '@motion-canvas/core/lib/types/Color';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, delay} from '@motion-canvas/core/lib/flow';

type PhoneApps = "blank" | "vivint" | "diagnostics" | "call";

export interface PhoneProps extends NodeProps {
	color_block?: string,
	color_blockFill?: string,
	color_vivintApp?: string,
	color_diagnosticsBlock?: string,
	color_diagnosticsLines?: string,
	color_call?: string,
	app?: PhoneApps
}

export class Phone extends Node {
	private color_block;
	private color_blockFill;
	private color_vivintApp;
	private color_diagnosticsBlock;
	private color_diagnosticsLines;
	private color_call;

	public readonly mainRef = createRef<Layout>();
	public readonly blockRef = createRef<Rect>();
	public readonly blockFillRef = createRef<Rect>();
	public readonly vivintAppRef = createRef<Layout>();
	public readonly diagnosticsRef = createRef<Layout>();
	public readonly callRef = createRef<Path>();

	private current_app: PhoneApps;
  
	public constructor(props?: PhoneProps) {
		super({ ...props });

		this.color_block = new Color(props?.color_block || "#6D6C70");
		this.color_blockFill = new Color(props?.color_blockFill || "#A2A1A6");
		this.color_vivintApp = new Color(props?.color_vivintApp || "#1E1E1F");
		this.color_diagnosticsBlock = new Color(props?.color_diagnosticsBlock || "#f7646c");
		this.color_diagnosticsLines = new Color(props?.color_diagnosticsLines || "#1E1E1F");
		this.color_call = new Color(props?.color_call || "#1E1E1F");

		this.current_app = "blank";

		this.add(
			<Layout ref={this.mainRef}>
				<Rect ref={this.blockRef}
					width={190}
					height={270}
					fill={this.color_block}
					radius={10}
				/>
				<Rect ref={this.blockFillRef}
					width={160}
					height={250}
					fill={this.color_blockFill}
					radius={10}
				/>
				<Layout ref={this.vivintAppRef}
					scale={1}
					x={0}
					y={0}
					opacity={0}
				>
					<Path
						fill={this.color_vivintApp}
						data={"M162.83,88.84l94,87.73v111h-188v-111l94-87.73m0-88.83A14.38,14.38,0,0,0,153,3.91L9.2,138.08A29,29,0,0,0,0,159.24V342a14.47,14.47,0,0,0,14.48,14.47H311.17A14.47,14.47,0,0,0,325.65,342h0V159.23a29,29,0,0,0-9.2-21.16L172.7,3.9A14.39,14.39,0,0,0,162.82,0Z"}
						scale={0.2}
						x={-40}
						y={-35}
					/>
					<Circle
						fill={this.color_vivintApp}
						width={20}
						height={20}
						x={38}
						y={25}
					/>
				</Layout>
				<Layout ref={this.diagnosticsRef}
					opacity={0}
				>
					<Rect
						width={120}
						height={90}
						fill={this.color_diagnosticsBlock}
						radius={10}
						y={-60}
					/>
					<Path
						fill={this.color_diagnosticsLines}
						data={"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}
						scale={5}
						x={-60}
						y={-30}
					/>
					<Path
						fill={this.color_diagnosticsLines}
						data={"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}
						scale={5}
						x={-60}
						y={10}
					/>
				</Layout>
				
				<Path ref={this.callRef}
					fill={this.color_call}
					data={"M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"}
					scale={5}
					x={-60}
					y={-60}
					opacity={0}
				/>
			</Layout>
		);

		if (props?.app) {
			this.setApp(props.app);
		}
	}

	public setApp(appName: PhoneApps = "blank") {
		switch (this.current_app) {
			case "blank":
				break;

			case "vivint":
				this.vivintAppRef().opacity(0);
				break;

			case "diagnostics":
				this.diagnosticsRef().opacity(0);
				break;

			case "call":
				this.callRef().opacity(0);
				break;

			default:
				throw `Unknown app '${appName}'`;
		}

		switch (appName) {
			case "blank":
				break;

			case "vivint":
				this.vivintAppRef().opacity(1);
				break;

			case "diagnostics":
				this.diagnosticsRef().opacity(1);
				break;

			case "call":
				this.callRef().opacity(1);
				break;

			default:
				throw `Unknown app '${appName}'`;
		}
	}

	public* showApp(appName: PhoneApps = "blank", duration: number = 0.5, delayTime: number = 0.3) {
		appName = appName || "blank";

		if (appName == this.current_app) {
			return;
		}

		let fromThis;
		let toThis;
		switch (this.current_app) {
			case "blank":
				break;

			case "vivint":
				fromThis = this.vivintAppRef().opacity(0, duration);
				break;

			case "diagnostics":
				fromThis = this.diagnosticsRef().opacity(0, duration);
				break;

			case "call":
				fromThis = this.callRef().opacity(0, duration);
				break;

			default:
				throw `Unknown app '${appName}'`;
		}

		switch (appName) {
			case "blank":
				break;

			case "vivint":
				toThis = this.vivintAppRef().opacity(1, duration);
				break;

			case "diagnostics":
				toThis = this.diagnosticsRef().opacity(1, duration);
				break;

			case "call":
				toThis = this.callRef().opacity(1, duration);
				break;

			default:
				throw `Unknown app '${appName}'`;
		}

		this.current_app = appName;

		if (fromThis == null) {
			yield* toThis;
			return
		}

		if (toThis == null) {
			yield* fromThis;
			return
		}

		yield* all(
			fromThis,
			delay(delayTime, toThis),
		);
	}
}