import {Circle, Img, Layout, Line, Path, Rect, Txt, Video, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, PossibleVector2, SimpleVector2Signal, ThreadGenerator, Vector2, all, beginSlide, chain, createRef, createSignal, delay, easeInOutCubic, easeOutCubic, loop, loopFor, sequence, tween, useLogger, waitFor, map, Reference} from '@motion-canvas/core';
import {catalogue_color, hopIn, hopOut} from "../utils";
import { CameraView } from "@ksassnowski/motion-canvas-camera";
import { Person } from "../components/Person"
import { Block } from "../components/Block"
import { Arrow } from "../components/Arrow"

import qrCode_src from "../media/rfc_qr.svg"
import introMovie_src from "../media/llmRfc_intro.mp4"
import splash1_src from "../media/llmRfc_splatter_1.png"
import splash2_src from "../media/llmRfc_splatter_2.png"
import splash3_src from "../media/llmRfc_splatter_3.png"
import splash4_src from "../media/llmRfc_splatter_4.png"

import bingChatImg1_src from "../media/llmRfc_bingChat_1.png"
import bingChatImg2_src from "../media/llmRfc_bingChat_2.png"
import copilotImg_src from "../media/llmRfc_githubCopilot.png"
import einsteinImg_src from "../media/llmRfc_einstein.gif"
import selfHostImg1_src from "../media/llmRfc_redpajama.png"
import selfHostImg2_src from "../media/llmRfc_server.jpg"
import openaiImg_src from "../media/llmRfc_openai_2.png"

import whatIsIt_bookPile_src from "../media/llRfc_whatIsIt_books.png"
import whatIsIt_bookWorm_src from "../media/llmRfc_whatIsIt_bookWorm.png"
import whatIsIt_question_src from "../media/llmRfc_whatIsIt_question.png"
import whatIsIt_answer_src from "../media/llmRfc_whatIsIt_answer.png"


export default makeScene2D(function* (view) {
	const rfc_ref = createRef<Block>();
	const person_1 = createRef<Person>();
	const person_2 = createRef<Person>();
	const person_3 = createRef<Person>();
	const person_4 = createRef<Person>();
	const person_5 = createRef<Person>();
	const person_6 = createRef<Person>();
	const person_7 = createRef<Person>();
	const person_8 = createRef<Person>();

	const bingChat_ref = createRef<Block>();
	const copilot_ref = createRef<Block>();
	const einstein_ref = createRef<Block>();
	const selfHost_ref = createRef<Block>();
	const openai_ref = createRef<Block>();

	const qrCode_ref = createRef<Block>();
	const splash1_ref = createRef<Block>();
	const splash2_ref = createRef<Block>();
	const splash3_ref = createRef<Block>();
	const splash4_ref = createRef<Block>();
	const introMovie_ref = createRef<Video>();

	const bingChatImg1_ref = createRef<Block>();
	const bingChatImg2_ref = createRef<Block>();
	const copilotImg_ref = createRef<Block>();
	const einsteinImg_ref = createRef<Block>();
	const selfHostImg1_ref = createRef<Block>();
	const selfHostImg2_ref = createRef<Block>();
	const openaiImg1_ref = createRef<Block>();
	const openaiImg2_ref = createRef<Block>();

	const whatIsIt_bookPile_ref = createRef<Block>();
	const whatIsIt_bookWorm_ref = createRef<Block>();
	const whatIsIt_question_ref = createRef<Block>();
	const whatIsIt_answer_ref = createRef<Block>();

	const arrow1_ref = createRef<Arrow>();
	const arrow2_ref = createRef<Arrow>();

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
			<Block ref={whatIsIt_bookPile_ref}
				opacity={0}
				x={600}
				label="Training Data"
				label_fontSize={50}
				src={whatIsIt_bookPile_src}
				color_label="#A2A1A6"
				color_block="#00000000"
				color_blockFill="#00000000"
			/>
			<Block ref={whatIsIt_bookWorm_ref}
				opacity={0}
				label="LLM"
				label_fontSize={50}
				src={whatIsIt_bookWorm_src}
				color_label="#A2A1A6"
				color_block="#00000000"
				color_blockFill="#00000000"
				/>
			<Block ref={whatIsIt_question_ref}
				opacity={0}
				label="Chat Question"
				label_fontSize={50}
				src={whatIsIt_question_src}
				color_label="#A2A1A6"
				color_block="#00000000"
				color_blockFill="#00000000"
				x={-600}
			/>
			<Block ref={whatIsIt_answer_ref}
				opacity={0}
				label="Chat Answer"
				label_fontSize={50}
				src={whatIsIt_answer_src}
				color_label="#A2A1A6"
				color_block="#00000000"
				color_blockFill="#00000000"
				x={600}
			/>
			<Block ref={openaiImg2_ref}
				willFadeIn={true}
				src={openaiImg_src}
				src_scale={0.6}
			/>

			<Block ref={rfc_ref}
				scale={2}
				opacity={0}
				label="RFC"
				path="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
			/>
			<Person ref={person_1}
				x={500}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_2}
				x={-500}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_3}
				y={350}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_4}
				y={-350}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_5}
				x={350}
				y={250}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_6}
				x={-350}
				y={-250}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_7}
				x={350}
				y={-250}
				scale={0.8}
				opacity={0}
			/>
			<Person ref={person_8}
				x={-350}
				y={250}
				scale={0.8}
				opacity={0}
			/>

			<Block ref={bingChat_ref}
				opacity={0}
				x={-700}
				y={-300}
				scale={2}
				path_opacity={0}
				path_scale={0.12}
				path="M 499.1875 0 C 374.2795 1.06335 260.20306 48.245556 172.66406 125.59766 C 145.79506 149.78366 120.7923 177.28461 97.658203 208.09961 C 54.932103 266.83761 24.278946 335.18247 9.4160156 409.35547 C 3.5667356 442.90147 0.82144975 478.4972 1.0273438 516.6582 C 1.3552937 577.7652 4.8015263 602.88411 21.378906 665.03711 C 32.355506 706.18511 41.332031 753.83387 41.332031 770.92188 C 41.332031 788.00987 31.095531 843.46248 18.582031 894.14648 C -3.9498188 985.44048 -4.0534662 986.47455 7.9648438 1002.5605 C 25.133784 1025.5405 47.742362 1025.6502 132.10156 1003.1602 C 226.96856 977.86316 266.69545 977.94714 362.31445 1003.6191 C 377.72258 1007.7566 393.0676 1011.2624 408.32617 1014.1367 C 411.37789 1014.7116 414.42611 1015.2607 417.4707 1015.7852 C 447.91661 1021.0297 477.99711 1023.7555 507.52148 1023.9805 C 712.44948 1022.3605 888.26972 896.59175 965.63672 717.09375 C 968.21022 711.12125 970.67434 705.09128 973.02734 699.00391 C 970.67474 705.09048 968.21184 711.12152 965.63867 717.09375 C 888.43667 896.22175 713.19145 1021.8502 508.81445 1023.9902 C 604.66345 1024.5002 694.62059 998.70728 772.18359 947.48828 C 885.27059 872.82028 969.69936 753.78809 996.94336 630.62109 C 1002.5304 605.37209 1005.8507 573.51284 1006.9707 540.08984 C 1007.6907 518.86584 1007.5205 497.0095 1006.4805 475.8125 C 989.20747 224.5705 793.43384 23.285558 547.08984 1.8671875 C 531.17784 0.7437405 515.0105 0.112814 499.1875 0 z M 503.50195 44.503906 C 757.38395 44.503906 963.19727 253.80619 963.19727 511.99219 C 963.19727 619.29619 927.65005 718.15473 867.87305 797.05273 C 853.93305 813.45473 837.83442 831.04466 822.60742 846.22266 C 775.86742 892.82466 754.11905 909.15989 709.62305 931.08789 C 669.28105 950.96689 634.29503 963.37609 596.08203 969.99609 C 566.17603 976.21609 535.21595 979.47852 503.50195 979.47852 C 459.18395 979.47852 416.3293 973.10327 375.7793 961.19727 C 368.5913 959.38127 361.2938 957.35294 353.7168 955.08594 C 305.4378 940.62094 268.44841 935.15384 224.94141 938.83984 C 197.11441 941.19984 166.62369 947.30222 128.80469 957.19922 C 86.730587 968.21422 50.063719 977.22266 47.324219 977.22266 C 44.585219 977.22266 51.260556 944.84077 62.160156 905.25977 C 73.134056 865.41177 79.759316 828.12534 82.041016 793.15234 C 85.033916 747.28534 80.553034 705.40747 68.615234 666.98047 C 62.180834 646.26347 56.9557 625.91552 52.9375 605.85352 L 52.496094 602.92578 C 46.794094 573.51378 43.804688 543.10919 43.804688 511.99219 C 43.804688 253.80619 249.61895 44.503906 503.50195 44.503906 z M 353.65625 213.11719 C 352.74497 213.10806 351.83761 213.15009 350.94336 213.24609 C 340.51736 214.36409 332.17291 221.84186 330.00391 232.00586 C 329.66591 233.58786 329.60361 254.63242 329.59961 368.85742 L 329.59375 503.84375 L 329.66602 587.16797 L 329.74805 670.49219 L 329.93555 671.32617 C 329.88784 672.00544 330.23818 675.30065 330.81055 679.44922 C 331.49855 684.43122 332.96402 691.64464 334.54102 697.80664 C 346.75202 745.52164 381.49911 784.33192 428.53711 802.79492 C 442.08211 808.11092 455.75109 811.45856 470.62109 813.10156 C 476.20909 813.72056 492.02738 813.9703 497.85938 813.5293 C 524.60838 811.5173 547.89416 803.69812 571.78516 788.70312 C 573.91316 787.36713 577.91187 784.86167 580.67188 783.13867 C 583.42787 781.41567 586.91016 779.22058 588.41016 778.26758 C 589.90616 777.31058 591.71388 776.18472 592.42188 775.76172 C 593.12987 775.33872 594.55022 774.45197 595.57422 773.79297 C 596.59822 773.13397 600.98431 770.37888 605.32031 767.67188 L 622.65234 756.79883 L 628.60156 753.0625 L 628.81445 752.92969 L 629.47461 752.51953 L 629.78516 752.32422 L 634.16602 749.57227 L 649.30859 740.07617 C 668.60559 728.03317 674.35722 723.80794 683.32422 715.08594 C 687.05922 711.45294 692.69666 705.24503 692.97266 704.45703 C 693.02942 704.30043 693.99787 702.81509 695.13281 701.14453 C 692.57281 704.91553 693.46159 704.28445 697.18359 699.68945 C 707.71759 686.68445 718.44392 664.45873 723.91992 644.30273 C 730.54492 619.90873 731.44572 593.71188 726.51172 568.92188 C 716.90872 520.64188 686.21809 478.97625 642.99609 455.53125 C 640.28009 454.05725 629.93611 448.67559 615.91211 441.43359 C 613.78411 440.33459 610.8868 438.82884 609.4668 438.08984 C 608.0468 437.34884 605.14753 435.84509 603.01953 434.74609 C 600.89153 433.64809 594.7653 430.47812 589.4043 427.70312 C 584.0433 424.92713 578.05113 421.82273 576.07812 420.80273 C 570.07213 417.69273 566.04211 415.60106 563.03711 414.03906 C 549.14111 406.81506 543.26189 403.89567 541.58789 403.38867 C 539.82889 402.85767 535.35833 402.17462 534.23633 402.26562 C 534.00033 402.28463 532.92652 402.40334 531.85352 402.52734 C 520.70552 403.81334 512.20606 412.80458 511.41406 424.14258 C 511.07106 429.02858 511.18108 429.35947 522.33008 457.85547 C 547.69908 522.68947 553.84395 538.29023 554.87695 540.49023 C 557.38295 545.80623 560.90169 550.80973 565.30469 555.30273 C 568.67969 558.74873 570.90587 560.60066 574.67188 563.09766 C 581.28887 567.48766 584.57222 568.70434 610.32422 576.27734 C 629.49028 581.90975 641.99542 586.1051 652.10547 590.36523 C 651.66496 590.2037 651.33167 590.09605 651.21875 590.10156 C 650.95675 590.11456 634.81666 599.91491 615.34766 611.87891 C 595.88166 623.84191 578.98869 634.22212 577.80469 634.95312 C 576.62469 635.68313 574.59006 636.91241 573.28906 637.69141 L 562.1543 644.55273 C 561.3843 645.00673 560.30395 645.66177 559.75195 646.00977 C 559.19995 646.35677 557.97439 647.11241 557.02539 647.69141 C 553.55739 649.80541 544.32353 655.45636 536.39453 660.31836 C 531.18053 663.51536 530.40516 663.99122 523.78516 668.07422 C 521.42116 669.53022 518.90536 671.06637 518.19336 671.48438 C 517.48536 671.90738 514.45489 673.76052 511.46289 675.60352 C 508.46689 677.45052 503.24347 680.65266 499.85547 682.72266 C 496.46747 684.78866 490.40272 688.50166 486.38672 690.97266 C 482.36572 693.44366 477.07672 696.68097 474.63672 698.16797 C 472.19272 699.65897 469.93514 701.09128 469.61914 701.36328 C 469.61384 701.36776 469.45601 701.46488 469.44531 701.47266 L 469.44531 602.70508 L 469.44531 503.84375 L 469.44141 413.40234 C 469.44141 355.70234 469.33534 321.43605 469.15234 318.74805 C 467.99434 301.85405 460.88097 286.32317 448.91797 274.57617 C 445.24897 270.97117 442.10962 268.56373 432.76562 262.17773 C 428.11563 258.99873 419.60261 253.17823 413.84961 249.24023 C 408.09661 245.30223 398.61716 238.81522 392.78516 234.82422 C 386.95316 230.83322 378.63578 225.13988 374.30078 222.17188 C 365.27078 215.98888 364.56494 215.55789 361.83594 214.58789 C 359.17269 213.64139 356.39009 213.14456 353.65625 213.11719 z M 1000.8672 596.50195 C 1000.015 601.71331 999.09771 606.90366 998.0918 612.06055 C 999.09787 606.90316 1000.0149 601.71384 1000.8672 596.50195 z M 668.79297 598.58398 C 669.05528 598.73655 669.31132 598.89151 669.57031 599.04492 C 669.31243 598.89122 669.05383 598.73663 668.79297 598.58398 z M 671.11719 599.97656 C 675.77149 602.8382 679.86077 605.84948 683.42578 609.03125 C 684.0591 609.59648 684.6753 610.16786 685.27539 610.74414 C 684.67317 610.1699 684.0622 609.59642 683.42578 609.03125 C 679.85127 605.85691 675.73341 602.83212 671.11719 599.97656 z M 685.78125 611.22656 C 686.12404 611.56272 686.45733 611.90221 686.78906 612.24219 C 686.45557 611.90322 686.12648 611.56257 685.78125 611.22656 z M 994.36719 629.54102 C 993.69766 632.43573 993.00479 635.31977 992.28711 638.19531 C 991.56943 641.07086 990.82789 643.93707 990.0625 646.79297 C 988.86325 651.26777 987.58643 655.70965 986.27148 660.13477 C 986.74701 658.53454 987.23289 656.93883 987.69336 655.33203 C 990.13133 646.82476 992.35852 638.22512 994.36719 629.54102 z M 699.47461 632.93945 C 701.33372 638.14453 702.89743 644.06057 703.98828 650.125 C 702.91092 644.23878 701.30778 638.18201 699.47461 632.93945 z M 704.14258 650.99805 C 704.26881 651.73232 704.3863 652.46833 704.49805 653.20508 C 704.3863 652.47329 704.27218 651.73988 704.14258 650.99805 z M 983.58984 668.875 C 983.23703 669.98926 982.89919 671.10979 982.53906 672.2207 C 982.53906 672.2207 982.53711 672.22266 982.53711 672.22266 C 982.89746 671.11106 983.2368 669.98995 983.58984 668.875 z M 979.75195 680.57227 C 977.62395 686.77177 975.38217 692.91458 973.0293 699.00195 C 975.38197 692.91534 977.62373 686.77147 979.75195 680.57227 z M 342.53906 702.44531 C 343.81136 704.20083 345.17144 705.91595 346.65039 707.59375 C 345.52973 706.36194 344.56641 705.22448 343.87891 704.30273 C 343.42027 703.68761 342.97486 703.06693 342.53906 702.44531 z M 460.39453 707.11328 C 452.99552 711.67789 443.02723 717.78999 436.51953 721.72852 C 434.0925 723.19657 431.5431 724.50237 428.91992 725.67578 C 431.77667 724.37269 434.62432 722.86347 437.49219 721.12305 C 439.54119 719.88105 447.57203 714.96984 455.33203 710.21484 L 460.39453 707.11328 z M 355.79102 716.4707 C 356.16878 716.78264 356.54514 717.09327 356.92383 717.39062 C 356.55937 717.10317 356.19486 716.81184 355.79102 716.4707 z M 357.0957 717.52539 C 357.47119 717.81795 357.85205 718.09948 358.23242 718.38086 C 358.03583 718.23818 357.83591 718.10184 357.64062 717.95703 C 357.47552 717.83467 357.27278 717.66321 357.0957 717.52539 z M 427.03711 726.5 C 426.90295 726.55546 426.77127 726.61524 426.63672 726.66992 C 426.77017 726.61449 426.90373 726.55636 427.03711 726.5 z M 412.68164 730.7793 C 412.58134 730.79829 412.48124 730.81736 412.38086 730.83594 C 412.48159 730.81847 412.58105 730.79722 412.68164 730.7793 z M 411.74219 730.93945 C 410.78065 731.10854 409.81852 731.27238 408.85156 731.40234 C 407.19392 731.6253 404.99378 731.76494 402.65234 731.82617 C 405.76499 731.71898 408.78479 731.42318 411.74219 730.93945 z M 388.23828 730.96289 C 391.22536 731.44176 394.27315 731.73044 397.38672 731.83203 C 395.00763 731.77311 392.77306 731.63103 391.0957 731.40625 C 390.13649 731.27757 389.18544 731.12666 388.23828 730.96289 z"
			/>
			<Block ref={copilot_ref}
				opacity={0}
				x={-350}
				y={-300}
				scale={2}
				path_opacity={0}
				path_scale={1.25}
				path="M 48 8 C 39.145 8 31.008672 10.627438 25.013672 15.023438 C 21.372672 17.693437 18.459375 21.073359 16.734375 24.943359 C 15.119375 27.687359 14.621578 30.884797 14.767578 34.341797 L 10.869141 43.367188 L 10.513672 43.4375 A 10.998 10.998 0 0 0 3.7207031 47.830078 L 1.3046875 51.212891 A 7 7 0 0 0 0 55.28125 L 0 65 C 2.9605947e-16 67.116 1.2378125 68.946875 2.2578125 70.171875 C 3.3798125 71.517875 4.8059531 72.78675 6.1269531 73.84375 A 52.918 52.918 0 0 0 9.7734375 76.496094 A 54.57 54.57 0 0 0 10.974609 77.273438 L 11.318359 77.488281 L 11.378906 77.525391 L 11.416016 77.548828 L 11.417969 77.548828 L 11.441406 77.564453 A 34.102 34.102 0 0 0 12.175781 78.011719 A 55.966 55.966 0 0 0 14.314453 79.210938 A 76.495 76.495 0 0 0 22.082031 82.789062 C 28.618031 85.377062 37.755 88 48 88 C 58.245 88 67.381969 85.376062 73.917969 82.789062 A 76.495 76.495 0 0 0 81.685547 79.210938 C 82.407547 78.826937 83.120219 78.426719 83.824219 78.011719 C 84.073219 77.864719 84.266391 77.745109 84.400391 77.662109 L 84.558594 77.564453 L 84.582031 77.548828 L 84.583984 77.548828 L 84.619141 77.525391 L 84.681641 77.488281 C 85.202641 77.166281 85.716562 76.836094 86.226562 76.496094 A 52.899 52.899 0 0 0 89.873047 73.84375 C 91.194047 72.78675 92.620188 71.516922 93.742188 70.169922 C 94.762187 68.946922 96 67.116 96 65 L 96 55.28125 A 7 7 0 0 0 94.695312 51.212891 L 92.279297 47.830078 A 10.996 10.996 0 0 0 85.486328 43.4375 L 85.130859 43.367188 L 81.232422 34.341797 C 81.378422 30.884797 80.880625 27.687359 79.265625 24.943359 C 77.540625 21.073359 74.626328 17.693438 70.986328 15.023438 C 64.991328 10.627437 56.855 8 48 8 z M 35.230469 22.359375 C 38.120969 22.226297 39.699594 22.919187 40.589844 23.773438 C 41.871844 25.005438 42.739688 27.505328 42.554688 32.111328 C 42.404688 35.830328 41.733641 38.8295 40.306641 40.9375 A 7.8 7.8 0 0 1 37.324219 43.564453 C 36.126219 44.177453 34.606297 44.61025 32.654297 44.78125 C 32.312297 44.81125 31.982109 44.834516 31.662109 44.853516 C 26.872109 45.137516 24.612344 44.217453 23.402344 43.064453 C 23.322344 42.988453 23.244922 42.910125 23.169922 42.828125 C 22.640922 42.251125 22.199797 41.498672 21.841797 40.513672 C 21.364797 39.200672 21.032984 37.473266 20.833984 35.197266 C 20.488984 31.251266 21.123719 28.813094 22.511719 27.121094 C 23.954719 25.361094 26.687906 23.817969 31.878906 22.792969 C 33.157156 22.540469 34.266969 22.403734 35.230469 22.359375 z M 59.431641 22.359375 C 60.666844 22.297494 62.203719 22.414219 64.121094 22.792969 C 69.312094 23.817969 72.045281 25.361094 73.488281 27.121094 C 74.876281 28.813094 75.511016 31.251266 75.166016 35.197266 C 74.966016 37.474266 74.636203 39.199672 74.158203 40.513672 C 73.749203 41.639672 73.231656 42.460453 72.597656 43.064453 C 71.306656 44.294453 68.820703 45.26025 63.345703 44.78125 C 61.393703 44.61025 59.873781 44.177453 58.675781 43.564453 A 7.8 7.8 0 0 1 55.693359 40.9375 C 54.266359 38.8295 53.595312 35.830328 53.445312 32.111328 C 53.260312 27.505328 54.128156 25.005437 55.410156 23.773438 C 56.152031 23.061563 57.372969 22.46251 59.431641 22.359375 z M 47.994141 31.746094 A 9.504 9.504 0 0 1 50.304688 32.029297 L 50.363281 32.044922 A 1.498 1.498 0 0 1 51.099609 34.556641 A 1.498 1.498 0 0 1 49.636719 34.955078 L 49.576172 34.939453 A 6.498 6.498 0 0 0 46.423828 34.939453 L 46.363281 34.955078 A 1.5 1.5 0 0 1 44.90625 34.552734 A 1.498 1.498 0 0 1 45.636719 32.044922 L 45.695312 32.029297 A 9.504 9.504 0 0 1 47.994141 31.746094 z M 45.488281 43.976562 C 47.162281 44.007563 48.837719 44.007562 50.511719 43.976562 A 13.9 13.9 0 0 0 50.724609 44.300781 C 53.200609 47.957781 57.164266 50.262813 62.822266 50.757812 C 68.900266 51.289813 73.569328 50.426156 76.736328 47.410156 A 11.56 11.56 0 0 0 79.017578 44.345703 L 80 46.619141 L 80 73.291016 C 79.674 73.475016 79.293328 73.684062 78.861328 73.914062 A 70.406 70.406 0 0 1 71.707031 77.210938 C 65.617031 79.621938 57.255 82 48 82 C 38.745 82 30.381969 79.622938 24.292969 77.210938 A 70.399 70.399 0 0 1 17.138672 73.914062 C 16.706672 73.684063 16.326 73.475016 16 73.291016 L 16 46.619141 L 16.982422 44.345703 A 11.586 11.586 0 0 0 19.263672 47.410156 C 22.430672 50.426156 27.100734 51.289812 33.177734 50.757812 C 38.835734 50.262812 42.799391 47.957781 45.275391 44.300781 C 45.347391 44.193781 45.418281 44.085563 45.488281 43.976562 z M 37.939453 54 A 4 4 0 0 0 34 58 L 34 66 A 4 4 0 0 0 42 66 L 42 58 A 4 4 0 0 0 38 54 A 4 4 0 0 0 37.939453 54 z M 58.060547 54 A 4 4 0 0 0 54 58 L 54 66 A 4 4 0 0 0 62 66 L 62 58 A 4 4 0 0 0 58.060547 54 z"
			/>
			<Block ref={einstein_ref}
				opacity={0}
				y={-300}
				scale={2}
				path_opacity={0}
				path="M9.01 20.5a4.642 4.642 0 0 1-4.191-2.632 5.136 5.136 0 0 1-.48.019C1.946 17.887 0 15.932 0 13.529c0-1.4.685-2.721 1.812-3.538a4.861 4.861 0 0 1-.259-1.563c0-2.717 2.224-4.928 4.956-4.928 1.374 0 2.665.547 3.613 1.516a4.555 4.555 0 0 1 2.886-1.031c1.48 0 2.875.748 3.733 1.978a5.41 5.41 0 0 1 1.815-.306c3.002 0 5.443 2.455 5.443 5.472 0 3.018-2.449 5.472-5.46 5.472a5.33 5.33 0 0 1-.727-.053 4.132 4.132 0 0 1-4.749 1.587A4.634 4.634 0 0 1 9.01 20.5zm-3.881-3.685c.206 0 .396.128.47.328.514 1.41 1.885 2.357 3.411 2.357a3.636 3.636 0 0 0 3.35-2.196.504.504 0 0 1 .666-.259c1.613.729 3.335.094 4.1-1.286a.505.505 0 0 1 .525-.25c.348.062.63.091.89.091 2.459 0 4.46-2.006 4.46-4.472s-1.993-4.472-4.443-4.472c-.652 0-1.274.132-1.8.381a.503.503 0 0 1-.649-.206c-.645-1.139-1.833-1.847-3.1-1.847-.969 0-1.9.396-2.557 1.088a.5.5 0 0 1-.692.032.622.622 0 0 1-.077-.077A4.045 4.045 0 0 0 6.509 4.5c-2.182 0-3.956 1.762-3.956 3.928 0 .538.114 1.075.329 1.554a.501.501 0 0 1-.204.637A3.384 3.384 0 0 0 1 13.529c0 1.852 1.497 3.357 3.338 3.357.291 0 .495-.018.683-.06a.565.565 0 0 1 .108-.011z"
			/>
			<Block ref={selfHost_ref}
				opacity={0}
				x={350}
				y={-300}
				scale={2}
				path_opacity={0}
				path_scale={0.15}
				path="m794.87 343.82c2.39.45 4.35 2.8 4.34 5.25l-.01 100.98c0 2.43-1.96 4.81-4.35 5.24l-95.68 17.81c-2.4.44-4.94 2.71-5.68 5.03l-29.87 74.64c-1.06 2.19-.81 5.61.56 7.62l54.35 79.21c1.38 2.01 1.1 5.06-.63 6.79l-71.4 71.4c-1.71 1.71-4.76 1.99-6.77.63l-77.8-53.41c-2-1.38-5.36-1.48-7.46-.25l-34.31 18.32c-2.18 1.1-4.71.18-5.64-2.07l-70.74-170.99c-.93-2.25.01-5.12 2.08-6.39l8.59-5.26c1.58-.97 3.74-2.64 5.42-4.16 30.98-19.84 51.53-54.54 51.53-94.07 0-61.68-49.99-111.68-111.65-111.68s-111.65 50-111.65 111.68c0 39.53 20.55 74.23 51.53 94.07 1.69 1.53 3.84 3.19 5.43 4.16l8.59 5.26c2.08 1.27 3.01 4.14 2.08 6.39l-70.75 170.98c-.93 2.25-3.47 3.19-5.64 2.07l-34.31-18.32c-2.09-1.22-5.45-1.12-7.46.26l-77.8 53.41c-2.01 1.37-5.06 1.09-6.78-.63l-71.4-71.4c-1.72-1.73-2-4.78-.63-6.79l54.35-79.22c1.38-2 1.63-5.43.56-7.62l-29.87-74.64c-.73-2.32-3.29-4.6-5.68-5.03l-95.68-17.81c-2.39-.44-4.35-2.8-4.35-5.24v-100.98c0-2.43 1.95-4.79 4.35-5.24l98.09-18.25c2.4-.45 5-2.69 5.8-4.99l30.07-70.16c1.12-2.17.9-5.57-.47-7.59l-57.16-83.32c-1.38-2-1.09-5.05.63-6.78l71.39-71.4c1.72-1.72 4.77-2 6.78-.63l84.76 58.18c2 1.38 5.43 1.62 7.62.55l68.01-27.84c2.31-.76 4.56-3.35 5.01-5.74l18.88-101.49c.44-2.39 2.8-4.35 5.23-4.35h100.96c2.43 0 4.79 1.96 5.23 4.36l18.89 101.48c.45 2.39 2.7 4.98 5.01 5.74l68 27.84c2.18 1.08 5.61.83 7.62-.55l84.76-58.18c2-1.38 5.05-1.1 6.77.63l71.39 71.4c1.72 1.73 1.99 4.78.63 6.78l-57.15 83.33c-1.39 2.02-1.6 5.42-.48 7.59l30.07 70.16c.81 2.3 3.42 4.55 5.81 4.99l98.09 18.25"
			/>
			<Block ref={openai_ref}
				opacity={0}
				x={700}
				y={-300}
				scale={2}
				path_opacity={0}
				path_scale={0.05}
				path={"M 1107.3008 299.09961 C 909.30198 299.09961 733.39955 426.40058 672.09961 614.40039 L 671.96875 615.16992 C 545.47035 642.07709 436.47878 721.65742 372.34961 833.92773 C 273.35021 1005.3997 295.64399 1221.3854 427.80664 1368.4727 L 428.4082 1368.9727 C 388.46169 1491.9768 402.88464 1626.1558 468.04883 1737.8281 C 567.04823 1909.3002 765.24444 1997.9848 958.70703 1957.0723 L 959.44141 1956.8008 C 1045.9929 2052.898 1169.4057 2107.498 1298.6992 2106.9004 C 1496.698 2106.9004 1672.6005 1979.5994 1733.9004 1791.5996 L 1734.0312 1790.8301 C 1860.5304 1763.9233 1969.5209 1684.3431 2033.6504 1572.0723 C 2132.6498 1400.6002 2110.3559 1184.6146 1978.1934 1037.5273 L 1977.5918 1037.0273 C 2017.5384 914.02318 2003.1154 779.84427 1937.9512 668.17188 C 1838.9518 496.69988 1640.7555 408.01514 1447.293 448.92773 L 1446.5586 449.19922 C 1360.0071 353.10204 1236.5943 298.50195 1107.3008 299.09961 z M 1107.3008 416.59961 L 1106.6992 417.19922 C 1186.0259 417.19922 1262.2604 444.48313 1323.416 494.92773 L 953.86719 708.28711 C 949.13093 711.02159 944.90639 714.31381 941.21094 718.03711 C 929.90654 728.99265 923.40039 744.29604 923.40039 760.69922 L 923.40039 1248 L 769.16797 1159.0996 L 769.10156 756.53516 C 769.05426 717.57715 775.86583 679.10401 788.84375 642.68359 L 787.75586 642.42188 C 834.36207 511.04203 959.73458 416.83584 1107.3008 416.59961 z M 1549.6055 557.51172 C 1664.0533 560.04687 1774.5326 620.5161 1836.1934 726.92188 L 1835.373 726.70117 C 1875.0365 795.40032 1889.5247 875.06318 1876.416 953.24805 L 1506.8672 739.88867 C 1502.1291 737.15312 1497.1641 735.13947 1492.0898 733.80078 C 1476.9513 729.49062 1460.4462 731.50833 1446.2422 739.70898 L 1024.2285 983.35938 L 1024.1016 805.3418 L 1372.6992 604 C 1406.4142 584.48002 1443.14 571.14287 1481.1699 564.17188 L 1480.8535 563.09766 C 1503.6923 558.87787 1526.7256 557.0049 1549.6055 557.51172 z M 650 744.68164 L 650 1171.4004 C 650 1176.8727 650.73878 1182.1793 652.11719 1187.2441 C 655.95466 1202.5075 665.95382 1215.7905 680.15625 1223.9902 L 1102.1719 1467.6406 L 948.06641 1556.7598 L 599.40039 1355.5352 C 565.63811 1336.0971 535.72587 1310.9612 510.67383 1281.5117 L 509.90234 1282.3223 C 419.42698 1176.2702 400.52885 1020.592 474.10742 892.67773 L 474.32812 893.49805 C 513.99164 824.79882 575.73548 772.42159 650 744.68164 z M 1457.9336 849.24023 L 1806.5996 1050.4648 C 1840.3619 1069.9029 1870.2741 1095.0388 1895.3262 1124.4883 L 1896.0977 1123.6777 C 1986.573 1229.7298 2005.4712 1385.408 1931.8926 1513.3223 L 1931.6719 1512.502 C 1892.0084 1581.2011 1830.2645 1633.5784 1756 1661.3184 L 1756 1234.5996 C 1756 1229.1273 1755.2612 1223.8207 1753.8828 1218.7559 C 1750.0454 1203.4925 1740.0462 1190.2095 1725.8438 1182.0098 L 1303.8281 938.35938 L 1457.9336 849.24023 z M 1203 996.19336 L 1382.0996 1099.5957 L 1382.0996 1306.4043 L 1203 1409.8066 L 1023.9004 1306.4043 L 1023.9004 1099.5957 L 1203 996.19336 z M 1482.5996 1158 L 1636.832 1246.9004 L 1636.9004 1649.4648 C 1636.9474 1688.4229 1630.1341 1726.8959 1617.1562 1763.3164 L 1618.2441 1763.5781 C 1571.6379 1894.958 1446.2654 1989.1642 1298.6992 1989.4004 L 1299.3008 1988.8008 C 1219.9741 1988.8008 1143.7396 1961.5169 1082.584 1911.0723 L 1452.1328 1697.7129 C 1456.8691 1694.9784 1461.0936 1691.6862 1464.7891 1687.9629 C 1476.0935 1677.0074 1482.5996 1661.704 1482.5996 1645.3008 L 1482.5996 1158 z M 1381.7715 1422.6406 L 1381.8984 1600.6582 L 1033.3008 1802 C 999.58581 1821.52 962.86004 1834.8571 924.83008 1841.8281 L 925.14648 1842.9023 C 788.06517 1868.23 643.79625 1806.756 569.80859 1679.0781 L 570.62695 1679.2988 C 530.96348 1610.5997 516.4753 1530.9369 529.58398 1452.752 L 899.13281 1666.1113 C 903.87093 1668.8469 908.83588 1670.8605 913.91016 1672.1992 C 929.04871 1676.5094 945.55387 1674.4917 959.75781 1666.291 L 1381.7715 1422.6406 z "}
			/>

			<Block ref={qrCode_ref}
				y={-30}
				src={qrCode_src}
				willFadeIn={true}
				radius_fill={0}
				color_blockFill="white"
				color_block="white"
				label="https://vivint.atlassian.net/wiki/x/4gHXx"
				label_fontSize={60}
			/>

			<Video ref={introMovie_ref}
				opacity={0}
				src={introMovie_src}
			/>
			<Block ref={splash1_ref}
				opacity={0}
				src={splash1_src}
			/>
			<Block ref={splash2_ref}
				opacity={0}
				src={splash2_src}
			/>
			<Block ref={splash3_ref}
				opacity={0}
				src={splash3_src}
			/>
			<Block ref={splash4_ref}
				opacity={0}
				src={splash4_src}
			/>
			
			<Block ref={bingChatImg1_ref}
				x={-400}
				y={200}
				willFadeIn={true}
				src={bingChatImg1_src}
				src_scale={0.5}
			/>
			<Block ref={bingChatImg2_ref}
				x={400}
				y={200}
				willFadeIn={true}
				src={bingChatImg2_src}
				src_scale={0.5}
			/>
			<Block ref={copilotImg_ref}
				y={200}
				willFadeIn={true}
				src={copilotImg_src}
				src_scale={0.9}
			/>
			<Block ref={einsteinImg_ref}
				y={200}
				willFadeIn={true}
				src={einsteinImg_src}
				src_scale={1.8}
			/>
			
			<Block ref={selfHostImg1_ref}
				x={-500}
				y={200}
				willFadeIn={true}
				src={selfHostImg1_src}
				src_scale={0.3}
			/>
			<Block ref={selfHostImg2_ref}
				x={350}
				y={200}
				willFadeIn={true}
				src={selfHostImg2_src}
				src_scale={1.67}
			/>
			
			<Block ref={openaiImg1_ref}
				y={200}
				willFadeIn={true}
				src={openaiImg_src}
				src_scale={0.4}
			/>

			<Arrow ref={arrow1_ref} />
			<Arrow ref={arrow2_ref} />
		</Layout>
	);

	// In this presentaion, I will be talking a lot about LLMs.
	whatIsIt_bookWorm_ref().blockFillRef().opacity(0)
	whatIsIt_bookWorm_ref().labelRef().fontSize(150)
	yield* beginSlide("What is an LLM.0.1");
	yield* whatIsIt_bookWorm_ref().opacity(1, 1);

	// Also known as Large Language Models
	// For those who don't know what that is, here is an over-simplified explanation.
	yield* beginSlide("What is an LLM.0.2");
	yield* whatIsIt_bookWorm_ref().labelRef().text("Large Language Model", 1);

	// Immagine you have a special bookworm
	yield* beginSlide("What is an LLM.1");
	yield* whatIsIt_bookWorm_ref().labelRef().text("LLM", 1),
	yield* all(
		whatIsIt_bookWorm_ref().blockFillRef().opacity(1, 1),
		delay(0.3, whatIsIt_bookWorm_ref().labelRef().fontSize(50, 1)),
	);

	// It has spent its entire life reading every book it could find.
	yield* beginSlide("What is an LLM.2");
	yield* sequence(0.25,
		whatIsIt_bookPile_ref().opacity(1, 1),
		chain(
			arrow1_ref().drawArrow({ref: whatIsIt_bookPile_ref().blockRef, position: "left"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {timespan: 0.5, lag: 0.25, direction: "end", bend: "horizontal"}),
			arrow1_ref().drawArrow({ref: whatIsIt_bookPile_ref().blockRef, position: "left"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {timespan: 0.5, lag: 0.25, direction: "end", bend: "horizontal"}),
			arrow1_ref().drawArrow({ref: whatIsIt_bookPile_ref().blockRef, position: "left"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {timespan: 0.5, lag: 0.25, direction: "end", bend: "horizontal"}),
			arrow1_ref().drawArrow({ref: whatIsIt_bookPile_ref().blockRef, position: "left"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {timespan: 0.5, lag: 0.25, direction: "end", bend: "horizontal"}),
			arrow1_ref().drawArrow({ref: whatIsIt_bookPile_ref().blockRef, position: "left"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {timespan: 0.5, lag: 0.25, direction: "end", bend: "horizontal"}),
			arrow1_ref().drawArrow({ref: whatIsIt_bookPile_ref().blockRef, position: "left"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {timespan: 0.5, doEnd: false, direction: "end", bend: "horizontal"}),
		),
	);

	// Now, imagine you could talk to this bookworm
	yield* beginSlide("What is an LLM.3");
	yield* sequence(0.1,
		arrow1_ref().resolve(),
		whatIsIt_bookPile_ref().opacity(0, 1),
		delay(0.5, whatIsIt_question_ref().opacity(1, 1)),
	);

	// and ask it questions about what it has read.
	yield* beginSlide("What is an LLM.3.2");
	yield* arrow1_ref().drawArrow({ref: whatIsIt_question_ref().blockRef, position: "right"}, {ref: whatIsIt_bookWorm_ref().blockRef, position: "left"}, {timespan: 0.5, doEnd: false, direction: "end", bend: "horizontal"})

	// With its vast reading experience,
	yield* beginSlide("What is an LLM.4");
	yield* whatIsIt_answer_ref().opacity(1, 1);

	// it can give you helpful answers, suggest ideas, or even write something for you.
	yield* beginSlide("What is an LLM.4.2");
	yield* arrow2_ref().drawArrow({ref: whatIsIt_bookWorm_ref().blockRef, position: "right"}, {ref: whatIsIt_answer_ref().blockRef, position: "left"}, {timespan: 0.5, doEnd: false, direction: "end", bend: "horizontal"});

	// The past 3 innovation weeks, including this one, there have been a project that leverages The LLM GPT-3.5.
	yield* beginSlide("What is an LLM.5");
	yield* sequence(0.1,
		arrow1_ref().resolve(),
		arrow2_ref().resolve(),
		whatIsIt_question_ref().opacity(0, 1),
		whatIsIt_bookWorm_ref().opacity(0, 1),
		whatIsIt_answer_ref().opacity(0, 1),
		openaiImg2_ref().fadeIn(),
	);
	
	// Here are a few clips from those presentations:
	yield* beginSlide("show clips");
	introMovie_ref().play();
	yield* all(
		openaiImg2_ref().fadeOut(),
		introMovie_ref().opacity(1, 0.5),
	);
	yield* waitFor(43);
	yield* introMovie_ref().opacity(0, 0.5);
	
	// These projects were amazing, and the future looks very bright with such innovative ideas.
	yield* beginSlide("end clips");
	yield* sequence(0.1,
		all(
			splash1_ref().opacity(1, 1),
			splash1_ref().x(-600, 1),
			splash1_ref().rotation(-30, 1),
		),
		all(
			splash3_ref().opacity(1, 1),
			splash3_ref().x(-200, 1),
			splash3_ref().rotation(-10, 1),
		),
		all(
			splash4_ref().opacity(1, 1),
			splash4_ref().x(200, 1),
			splash4_ref().rotation(10, 1),
		),
		all(
			splash2_ref().opacity(1, 1),
			splash2_ref().x(600, 1),
			splash2_ref().rotation(30, 1),
		),
	);

	// But, when it comes to what options are available for scaling these proofs of concept to production- there is a bit of confusion.
	// So, rather than present on an amazing application for an LLM, I researched every option people would bring up.
	// My hope is this presentation starts a serious conversation which eventually results in providing more resources for these kinds of projects.
	yield* beginSlide("only a poc");
	yield* sequence(0.1,
		all(
			splash1_ref().opacity(0, 1),
			splash1_ref().x(0, 1),
			splash1_ref().rotation(0, 1),
		),
		all(
			splash3_ref().opacity(0, 1),
			splash3_ref().x(0, 1),
			splash3_ref().rotation(0, 1),
		),
		all(
			splash4_ref().opacity(0, 1),
			splash4_ref().x(0, 1),
			splash4_ref().rotation(0, 1),
		),
		all(
			splash2_ref().opacity(0, 1),
			splash2_ref().x(0, 1),
			splash2_ref().rotation(0, 1),
		),
	);

	// And what better way drive a conversation than to create an RFC.
	// For the uninitiated, RFC stands for "Request for Comment". It lays out various thoughts on a matter and helps transparently track a discussion as well as the eventual decision that was reached.
	yield* beginSlide("definitions.1");
	yield* rfc_ref().opacity(1, 1),

	yield* beginSlide("definitions.2");
	yield* rfc_ref().labelRef().text("Request For Comment", 0.5)
	
	yield* beginSlide("definitions.3");
	yield* sequence(0.1,
		rfc_ref().labelRef().text("RFC", 0.5),
		person_1().opacity(1, 1),
		person_2().opacity(1, 1),
		person_3().opacity(1, 1),
		person_4().opacity(1, 1),
		person_5().opacity(1, 1),
		person_6().opacity(1, 1),
		person_7().opacity(1, 1),
		person_8().opacity(1, 1),
	);

	yield* beginSlide("definitions.4");
	yield* sequence(0.4,
		person_4().hasIdea(1),
		person_8().hasIdea(1),
		person_1().hasIdea(1),
		person_3().hasIdea(1),
	);

	// I will show 5 options that I investigated, the last being the one I think should be used.
	// To be clear, my goal here is NOT to decide which LLM service to use, or how we should use it. NOR is my goal to say what we can or cannot do.
	// I just want to start the conversation and cleat up any misunderstandings.
	yield* beginSlide("show empty spots");
	yield* sequence(0.1,
		rfc_ref().opacity(0, 1),
		person_1().opacity(0, 1),
		person_2().opacity(0, 1),
		person_3().opacity(0, 1),
		person_4().opacity(0, 1),
		person_5().opacity(0, 1),
		person_6().opacity(0, 1),
		person_7().opacity(0, 1),
		person_8().opacity(0, 1),
		bingChat_ref().opacity(1, 1),
		copilot_ref().opacity(1, 1),
		einstein_ref().opacity(1, 1),
		selfHost_ref().opacity(1, 1),
		openai_ref().opacity(1, 1),
	);

	// First of all, today, you can use bing chat enterprise with your work email.
	yield* beginSlide("bing chat enterprise.1");
	yield* sequence(0.5,
		bingChat_ref().pathOpacity(1, 1),
		bingChatImg1_ref().fadeIn(),
	);

	// But, this interface is only for humans to use- not programs.
	// Programs need an "Application Program Interface", or API. Bing Chat Enterprise does not offer an API- so this does not work for our current purpose.
	yield* beginSlide("bing chat enterprise.2");
	yield* sequence(0.5,
		bingChatImg2_ref().fadeIn(),
		bingChat_ref().status("no", 1),
	);

	// NRG is looking at geting some GitHub Copilot licenses- Could we try to use that?
	yield* beginSlide("copilot.1");
	yield* sequence(0.25,
		bingChatImg1_ref().fadeOut(),
		bingChatImg2_ref().fadeOut(),
		copilot_ref().pathOpacity(1, 1),
	);
	
	// Unfortunately, Copilot is not meant to be used this way. It is a tool that helps software engineers write code.
	yield* beginSlide("copilot.2");
	yield* sequence(0.5,
		copilotImg_ref().fadeIn(),
		copilot_ref().status("no", 1),
	);

	// CX is looking into using SalesForce's Einstein GPT, which is a wrapper around ChatGPT for use in SalesForce. Could we hijack it?
	yield* beginSlide("einstein.1");
	yield* sequence(0.25,
		copilotImg_ref().fadeOut(),
		einstein_ref().pathOpacity(1, 1),
		einsteinImg_ref().fadeIn(),
	);
	
	// Maybe- but (1) Einstein would be running on the CX budget, not the Innovation budget. And (2) This solution might be more of a hack than an actual solution.
	yield* beginSlide("einstein.2");
	yield* einstein_ref().status("unknown", 1);

	// We could also try just hosting our own OpenSource LLM such as LLaMA2 or RedPajama. The RFC explains the costs associated with this idea.
	yield* beginSlide("self host.1");
	yield* sequence(0.25,
		einsteinImg_ref().fadeOut(),
		selfHost_ref().pathOpacity(1, 1),
		selfHostImg1_ref().fadeIn(),
		selfHostImg2_ref().fadeIn(),
	);

	yield* beginSlide("self host.2");
	yield* selfHost_ref().status("unknown", 1);

	// I think easiest forward for innovation would be to use OpenAI's ChatGPT API.
	yield* beginSlide("openai");
	yield* sequence(0.25,
		selfHostImg1_ref().fadeOut(),
		selfHostImg2_ref().fadeOut(),
		openai_ref().pathOpacity(1, 1),
	);

	// Any data sent to their API will not be used for trraining their model (that only applies to their chat bot interface online).
	// There are different price options that tackle how often keys would be used that are detailed in the RFC.

	// My suggestion would be to purchase a handfull of the cheapest API tokens for developers to use for proof of concept work.
	// Then, when a project is ready to move forward, for specific keys of the appropriate tier to be purchased specifically for that project.
	yield* beginSlide("openai.2");
	yield* openaiImg1_ref().fadeIn();

	// I like this option, but I am not the decision maker here though. Perhaps there is another option that was not listed here- or perhaps you have something to say about one of the options covered.
	yield* beginSlide("conclusion");
	yield* openai_ref().status("yes", 1);
	
	// :) On screen now is a QR code that will take you to the RFC on Confluence. Give it a read, comment, and share it with others.
	yield* beginSlide("qr");
	yield* sequence(0.1,
		openaiImg1_ref().fadeOut(),
		bingChat_ref().fadeOut(),
		copilot_ref().fadeOut(),
		einstein_ref().fadeOut(),
		selfHost_ref().fadeOut(),
		openai_ref().fadeOut(),
		qrCode_ref().fadeIn(),
	);

	// Hopefully this gets the ball rolling and we can see some of the previous LLM innovation week ideas made a reality, as well as plenty more to come.
	yield* beginSlide("end");
});