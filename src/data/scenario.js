import { m } from "framer-motion";

export const scenarioData = [
  {
    "scene": "PROLOGUE",
    "text": "いつもと変わらない、日常。",
    "bg": "/scene/shopping_street.png",
    "style": "cinema",
    "action": "FADE_IN"
  },
  {
    "scene": "PROLOGUE",
    "text": "いつもと変わらない、光景。",
    "bg": "/scene/university_classroom.png",
    "style": "cinema",
    "action": "FADE_OUT"
  },
  {
    "scene": "PROLOGUE",
    "text": "いつもと変わらない…",
    "bg": "/scene/university_plaza.png",
    "style": "cinema",
    "action": "WAIT_SECONDS"
  },
  {
    "scene": "PROLOGUE",
    "text": "空。",
    "bg": "/scene/university_outside.png",
    "style": "cinema",
    "action": "SLOW_FADE_IN"
  },
  {
    "scene": "PROLOGUE",
    "text": "青白く光る───大きな月が、\nいつまでも、いつまでも、",
    "bg": "/scene/university_outside.png",
    "style": "cinema",
    "action": "WAIT_SECONDS_AND_MOVE_MOON"
  },
  {
    "scene": "PROLOGUE",
    "text": "私たちを、見つめている。",
    "bg": "/scene/university_outside.png",
    "style": "cinema",
    "action": "ALL_FADE_OUT"
  },
  //=============== 朔良の部屋 =============== 
  {
    "scene": "朔良の部屋",
    "speaker": "朔良",
    "text": "「ん……っ……」",
    "bg": "black",
    "style": "novel",
    "se": "+alarm.mp3"
  },
  {
    "scene": "朔良の部屋",
    "text": "耳障りなアラーム音に意識を引き戻され、私はゆっくりと目を開けた。"
  },
  {
    "scene": "朔良の部屋",
    "action": "WAKE_UP",
    "bg": "/scene/sakura_room.png"
  },
  {
    "scene": "朔良の部屋",
    "text": "ぼんやりとした視界の中で、見慣れた天井が映る。まだ夢の続きを見ているような感覚が、しばらく抜けなかった。"
  },
  {
    "scene": "朔良の部屋",
    "text": "まだ眠気の残る頭で時計を見る。午前7時。カーテンの隙間から差し込んでいるのは、凍えるような青白い光だった。 ",
    "bgm": "Room_Morning.mp3"
  },
  {
    "scene": "窓の外",
    "text": "私はベッドから身体を起こし、窓の外へ視線を向ける。薄暗い部屋の中で、その光だけが浮かび上がっている。何年経っても慣れることのない、不思議な光景。",
    "bg": "/scene/sakura_room_moon.png"
  },
  {
    "scene": "窓の外",
    "text": "そこにあるのは、巨大な人工月。人類が生み出した、第二の月。半世紀前、この星のエネルギー問題を解決するために作られた存在だ。今では電力、通信、医療。あらゆる文明の基盤を支えている。私たちの生活は、あの月なしでは成り立たない。"
  },
  {
    "scene": "窓の外",
    "text": "けれど、その力には代償もあった。人工月から放たれる未知のエネルギー、『月波』。"
  },
  {
    "scene": "窓の外",
    "text": "それを浴びた一部の人間は、常識では説明できない力を得た。炎を操る者。身体能力を強化する者。特殊な現象を引き起こす者。人々は、そんな力を持つ者たちを――能力者と呼んだ。"
  },
  {
    "scene": "窓の外 ",
    "text": "そして反対に。月波に適応できなかった生物は、異形―『キメラ』へと変貌した。"
  },
  {
    "scene": "窓の外",
    "text": "……そろそろ大学に行く準備をしないと。今日は１限だ。"
  },
  {
    "scene": "自室探索",
    "action": "TRIGGER_SEARCH_AND_LEARNING"
  },
  {
    "scene": "朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……行こう」",
    "bg": "/scene/sakura_room.png"
  },
  {
    "scene": "朔良の部屋",
    "text": "私はカバンを肩にかけ、玄関へ向かった。"
  },
  //=============== 通学路 ===============
  {
    "scene": "街（朝）",
    "text": "扉を開けると、人工月から降り注ぐ光によって、朝の街は淡い青色に染まっていた。",
    "bg": "/scene/shopping_street.png",
    "bgm": "Normal_Morning.mp3"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……今日も変わらないな」"
  },
  {
    "scene": "街（朝）",
    "text": "私は小さく呟きながら、いつもの通学路を進んでいく。"
  },
  {
    "scene": "部屋のニュース（朝）",
    "text": "ニュースでは毎日のように、月波による異常現象が報じられている。人工月の活動周期。能力者の増加。キメラの発生。",
    "bg": "/scene/tv.png",
  },
  {
    "scene": "部屋のニュース（朝）",
    "text": "どれも、この時代を生きるなら避けて通れない話題だ。けれど、それでも私はどこかで自分には関係のないことだと思っていた。"
  },
  {
    "scene": "街（朝）",
    "text": "通学路を歩く最中、持ってきたイヤホンをつけると小さな音楽が流れる。子供の頃、父と一緒に歌った曲だ。気付けば、私は無意識に口ずさんでいた。",
    "bg": "/scene/shopping_street.png",
    "bgm": ""
  },
  {
    "scene": "街（朝）",
    "text": "するとほんの少しだけ――人工月の青い光が、柔らかく揺らいだ気がした。"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "街（朝）",
    "text": "私は足を止める。街の喧騒の中で、一瞬だけ自分の声だけが響いたような気がした。\n―――その時だった。"
  },
  {
    "scene": "街（朝）",
    "text": "遠くから、何かが崩れるような音が聞こえる。低い振動が地面を伝わり、足元がわずかに揺れた。そして続く人々のざわめき。",
    "se": "+jishin.mp3",
    "bgm": "stop",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「何……？」"
  },
  {
    "scene": "街（朝）",
    "text": "私は音のした方向へ視線を向ける。通りの先。人の流れが止まっている。誰かが、震えた声で叫んだ。",
  },
  {
    "scene": "街（朝）",
    "speaker": "通行人",
    "text": "「逃げろ！！」",
    "action": "CLEAR_SHAKE",
    "se": "stop"
  },
  {
    "scene": "街（朝）",
    "text": "その声と同時に―――建物の影から、大きな影が現れた。",
    "action": "SHAKE_SCREEN",
    "showIllust": [
      "kimera13"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "獣。……と呼ぶには、あまりにも異質だった。本来あるはずの形を失った身体。不自然に発達した四肢。歪んだ輪郭。青白い月波を浴び、変貌した生物。",
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「キメラ……！？」"
  },
  {
    "scene": "街（朝）",
    "text": "ニュース画面越しにしか見たことのなかった存在が目の前にいる。理解するより先に、身体が危険を感じ取っていた。\n周囲の人々が一斉に逃げ出す。私も逃げようと足を動かす。"
  },
  {
    "scene": "街（朝）",
    "text": "キメラがこちらへ顔を向けた。",
    "bgm": "serious_2.mp3",
    "bgmVolume": 0.5
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ」"
  },
  {
    "scene": "街（朝）",
    "text": "目が合った。まずい。"
  },
  {
    "scene": "街（朝）",
    "text": "と、思った瞬間、キメラが地面を蹴る。巨大な身体がこちらへ向かって迫る。",
    "bgAnimation": "dash",
    "se": "+kimera1.mp3",
    "showIllust": [
      "kimera16"
    ]
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（……、ダメだ……っ）",
    "bgAnimation": "dash",
  },
  {
    "scene": "街（朝）",
    "text": "諦めたその時。",
    "bgAnimation": "dash"
  },
  {
    "scene": "街（朝）",
    "speaker": "？？？",
    "text": "「うぉりゃあああああっ！！」",
    "action": "WHITE_FLASH",
    "se": "+sword.mp3",
    "hideIllust": [
      "kimera1"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "突然、横から強い光が走った。誰かが勢いよくキメラへ体当たりする。鈍い衝撃が辺りに響いた。キメラは数歩よろめき、その隙に私との距離が開く。",
    "action": "CLEAR_ALL_EFFECTS"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ムッちゃん？」",
    "bg": "/character/Mutsunori/Mutsunori_CG3.png"
    //↑↑睦典CG
  },
  {
    "scene": "街（朝）",
    "text": "目の前に現れたのは、同じ大学に通う友人の睦典だった。彼にとっても、キメラを目の前にするのは初めてのはずだ。\nそれなのに、襲われている私を見るなり、迷わず飛び込んできてくれた。\n睦典は私を庇うように立ち、キメラから目を離さない。"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「怪我はない！？」"
  },
  {
    "scene": "街（朝）",
    "text": "睦典は私を庇うように立ちながら、右手を前へ向ける。"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良…下がってて」"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……」"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「大丈夫。俺が時間を稼ぐから」"
  },
  {
    "scene": "街（朝）",
    "text": "そう言って、睦典は私の前へ踏み出した。キメラを真正面から見据えるその背中は頼もしく見えるはずなのに、どこか危うくも見えた。"
  },
  {
    "scene": "街（朝）",
    "text": "逃げなきゃ。そう思っているのに、足は地面に縫い付けられたように動かない。目の前の異形への恐怖と、大切な友人を一人で戦わせてしまう罪悪感が胸の中でぐちゃぐちゃに渦巻いていた。",
    "bg": "/scene/shopping_street.png",
    "showIllust": [
      "Mutsunori_serious2",
      "kimera14"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "その時、不意に父の声が脳裏によみがえる。",
    "bgm": "stop",
    "action": "CLEAR_ALL_EFFECTS"
  },
  {
    "scene": "街（朝）",
    "speaker": "父",
    "role": "FATHER",
    "text": "『朔良。もし迷った時は、自分の声を信じなさい。\n…お前の歌は、きっと誰かを導くから』"
  },
  {
    "scene": "街（朝）",
    "text": "その言葉に導かれるように、私はゆっくりと息を吸う。",
    "bgm": ""
  },
  {
    "scene": "街（朝）",
    "text": "歌おうなんて考えたわけじゃないけれど、幼い頃から何度も口ずさんできたあの歌が、気づけば自然と唇からこぼれていた。私の歌声が静かに響き始める。最初は小さかった歌声が、不思議と辺り一帯へ広がっていく。",
    //bgm: TheSong
  },
  {
    "scene": "街（朝）",
    "text": "睦典は驚いたように自分の身体を見下ろす。全身に力が満ちていくような、不思議な感覚が駆け巡っていた。",
    "showIllust": [
      "Mutsunori_surprise2"
    ]
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「今なら……いける！」",
    "bgm": "Battle.mp3",
    "showIllust": [
      "Mutsunori_serious"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "睦典は地面を蹴り、キメラへ向かって駆け出す。私も歌を止めることなく、その背中を見つめる。",
    "action": "SPEED_EFFECT_START"
  },
  //=============== 戦闘開始(チュートリアル)==============
  {
    "scene": "街（朝）",
    "action": "FADE_TO_BLACK"
  },
  {
    "scene": "街（朝）",
    "action": "TRIGGER_BATTLE_TUTORIAL"
  },
  {
    "scene": "街（朝）",
    "text": "キメラの身体を包んでいた青白い光が徐々に薄れ、やがて異形の姿は月波の残滓だけを残して消えていった。",
    "hideIllust": [
      "kimera1"
    ],
    "action": "SPEED_EFFECT_STOP"
  },
  {
    "scene": "街（朝）",
    "text": "睦典は荒い息を吐きながら、構えていた拳をゆっくりと下ろした。",
    "showIllust": [
      "Mutsunori_pout3"
    ]
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……ふぅ。危なかったぁ……」"
  },
  {
    "scene": "街（朝）",
    "text": "いつもの軽い口調。けれど、額に浮かんだ汗と僅かに震える手が、彼も決して余裕だったわけではないことを物語っていた。",
    "bgm": "Normal_Morning.mp3"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、大丈夫？怪我してない？」"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うん。私は大丈夫」"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「そっか……よかった」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "睦典は安心したように笑う。",
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「それにしても……」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "彼は少し不思議そうな顔で、私を見る。",
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「さっきの歌……あれ、何だったんだ？」"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "街（朝）",
    "text": "答えられない。私自身にも分からない。どうして、私の歌で睦典の力が強くなったのか。"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……よく分からない。ただ……気づいたら、口が勝手に動いてた」"
  },
  {
    "scene": "街（朝）",
    "text": "そう言うと、睦典は少し驚いたように目を丸くした。けれど、すぐにいつもの笑顔に戻る。"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……すげーじゃん！。朔良のおかげで助かったんだぞ？なら、それでいいだろ！それに…綺麗な歌声だったしな！」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "そう言って、睦典は少し頬を赤く染めて、軽く私の肩を叩いた。"
  },
  {
    "scene": "街（朝）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ほら、大学行こうぜ！このままだと本当に遅れる！」"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え、ちょっと……！」",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "街（朝）",
    "text": "返事を待たずに歩き出す睦典。さっきまで命懸けで戦っていたとは思えないくらい、いつもの彼だった。"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「待ってよ、ムッちゃん！」"
  },
  {
    "scene": "街（朝）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "私は慌てて、その背中を追いかけた。"
  },
  {
    "scene": "街（朝）",
    "action": "FADE_TO_BLACK"
  },
  //=============== 大学 ===============
  {
    "scene": "月科学大講義室",
    "text": "講義終了を告げるチャイムが鳴り響く。",
    "bg": "/scene/university_classroom.png",
    "style": "novel",
    "se": "+school_bell.mp3"
  },
  {
    "scene": "月科学大講義室",
    "text": "学生たちは一斉に立ち上がり、それぞれ次の講義や昼食へと向かっていく。私も教科書をカバンへしまい、席を立った。",
    "bgm": "Normal_Morning2.mp3",
    "se": "stop"
  },
  {
    "scene": "講義室出口",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良ー！！」",
    "bgm": "Normal_Morning2.mp3"
  },
  {
    "scene": "講義室出口",
    "text": "聞き慣れた声に振り返ると、同じ学部の友人・睦典が、大きく手を振りながら駆け寄ってきた。"
  },
  {
    "scene": "講義室出口",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「今日の講義これで終わりだろ？頼む、レポート手伝ってくれ！」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "講義室出口",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「また？」",
  },
  {
    "scene": "講義室出口",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ヒルミ教授の課題、難しすぎるって！俺には暗号にしか見えないんだよ！」",
    "showIllust": [
      "Mutsunori_pout3"
    ]
  },
  {
    "scene": "講義室出口",
    "text": "実家の料理屋の手伝いで忙しいだの、新メニューを考えていただのと、いつものように言い訳を並べる睦典に、私は思わずため息をつく。"
  },
  {
    "scene": "講義室出口",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「自分でやりなよ」"
  },
  {
    "scene": "講義室出口",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「そんな冷たいこと言うなよ～！お礼に今度、ご飯ご馳走するからさ！」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "講義室出口",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「その手には乗らない」"
  },
  {
    "scene": "講義室出口",
    "text": "軽口を叩き合いながら教室を出る。"
  },
  {
    "scene": "大学の廊下",
    "text": "ついさっきまでキメラと戦っていたとは思えないほど、いつもの日常が戻ってきていた。",
    "bg": "/scene/university_hallway.png"
  },
  {
    "scene": "大学の廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「よーし、それじゃ図書館でも――」",
    "showIllust": [
      "Mutsunori_smile3"
    ],
    "bgm": "stop"
  },
  {
    "scene": "大学の廊下",
    "text": "その時、カツン、とローファーが床を蹴る音が耳に響いた。その響きを押し潰すように、頭上から低く、けれどよく通る声が降ってくる。",
    "se": "+footsteps.mp3"
  },
  {
    "scene": "大学の廊下",
    "speaker": "？？？",
    "text": "「おい、睦典。朔良のレポート、丸写しするなよ」",
    "se": "stop"
  },
  {
    "scene": "大学の廊下",
    "text": "釘を刺すような、どこか楽しげでいて逃げ道を塞ぐような鋭い声が背後から聞こえた。"
  },
  {
    "scene": "大学の廊下",
    "text": "驚いて振り返ると、そこには白衣をラフに羽織り、眼鏡をかけた若い男性が立っていた。",
    "showIllust": [
      "Hirumi_smile4"
    ],
    "bgm": "Normal_Morning2"
  },
  {
    "scene": "大学の廊下",
    "text": "この月科学エネルギー学部を担当するヒルミ教授。若くして教授に就任した天才研究者で、穏やかな物腰とは裏腹に、学生たちからは「何を考えているか分からない」と少し恐れられている人物だ。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ヒルミ教授……！？」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「げぇっ、教授！？」",
    "showIllust": [
      "Mutsunori_pout2"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "数歩先を歩いていた睦典が、まるで不意打ちの雷に打たれたように飛び上がり、大袈裟に身を縮こまらせる。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「げぇ、とはなんだ。やましいことでもあるのか？」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「うっ……！ い、いえ！ 決してそんな、滅相もないです……！」",
    "showIllust": [
      "Mutsunori_sad2"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "教授は小さく笑うと、私へ視線を向けた。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「冗談だよ。ところで、朔良に少し聞きたいことがあってね」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私に……ですか？」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「先週提出してくれた、人工月についてのレポートだ。本物の月に関する記述があっただろう。あれは、どこで知ったんだい？」"
  },
  {
    "scene": "大学の廊下",
    "text": "突然の質問に、胸が小さくざわつく。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あれは……昔、父から聞いた話です」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「父…か」",
    "showIllust": [
      "Hirumi_worried"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "そう答えると、教授は一瞬だけ目を細めた。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「そうか。興味深い内容だったよ。よく調べられていた」"
  },
  {
    "scene": "大学の廊下",
    "text": "それだけ言い残すと、教授は穏やかに笑みを浮かべる。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「それじゃあ、二人とも。レポートの締め切りは忘れないように」"
  },
  {
    "scene": "大学の廊下",
    "text": "教授は軽く手を振り、その場を後にした。",
    "hideIllust": [
      "Hirumi"
    ],
    "bgm": "stop"
  },
  {
    "scene": "大学の廊下",
    "text": "睦典は教授の背中を見送りながら、小さく口を尖らせた。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……なんか、朔良の時だけやけに優しい顔してなかったか？……セクハラ？ セクハラじゃね？」",
    "showIllust": [
      "Mutsunori_pout3"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "睦典が不満げに頬を膨らませながら、遠くなった教授に怪訝な視線を向けて小声でボヤいている。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「何ぶつぶつ言ってるの」"
  },
  {
    "scene": "大学の廊下",
    "text": "呆れながら、私は不満げな睦典の肩を軽く叩く。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんなことより、今日のレポート終わらせるよ」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「あっ、やべ！そうだった！ よし、気を取り直して図書館行こう！」",
    "showIllust": [
      "Mutsunori_serious"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "睦典は慌てて表情を引き締める。私たちは顔を見合わせて笑い、そのまま図書館へ向かった。"
  },
  //=============== 夜の帰り道 ===============
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ふぅ……」",
    "bg": "/scene/shopping_street_night.png",
    "bgm": "Normal_Night.mp3"
  },
  {
    "scene": "夜の帰り道",
    "text": "気づけば空はすっかり暗くなっていた。"
  },
  {
    "scene": "夜の帰り道",
    "text": "今日のレポートは予想以上に難しく、何度も「もう無理だ……」と机に突っ伏す睦典を励ましながら、ようやく提出できた頃には日が落ちていた。"
  },
  {
    "scene": "夜の帰り道",
    "text": "実家の店へ戻る睦典と別れ、一人で帰り道を歩く。昼間の騒ぎが嘘だったかのように、街は静まり返っていた。"
  },
  {
    "scene": "夜の帰り道",
    "text": "その時だった。",
    "bgm": "stop"
  },
  {
    "scene": "夜の帰り道",
    "text": "「……ガルルル」",
    "se": "+kimera2.mp3"
  },
  {
    "scene": "夜の帰り道",
    "text": "低く唸るような声が、暗闇の奥から聞こえてくる。",
    "bg": "/scene/rojiura.png"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……えっ？」"
  },
  {
    "scene": "夜の帰り道",
    "text": "背筋が凍りつく。ゆっくりと視線を向けると、青白い光を纏った異形の影がゆっくりと姿を現した。",
  },
  {
    "scene": "夜の帰り道",
    "text": "青白い光を纏ったキメラが、低く唸りながらじりじりと距離を詰めてくる。",
    "se": "+kimera2.mp3",
    "showIllust": [
      "kimera23"
    ]
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「くっ……！」"
  },
  {
    "scene": "夜の帰り道",
    "text": "私は咄嗟にカバンへ手を伸ばし、中に入れていた護身用のスタンロッドを構えた。昼間みたいにはいかない。逃げるだけじゃ、きっと追いつかれる。"
  },
  {
    "scene": "夜の帰り道",
    "text": "意を決して踏み込む。"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「はあっ！」",
    "se": "+swing.mp3"
  },
  {
    "scene": "夜の帰り道",
    "text": "勢いよく振るった一撃はキメラの身体を掠めるものの、ほとんど効いていない。次の瞬間。",
  },
  {
    "scene": "夜の帰り道",
    "text": "鋭い前脚が私の身体を弾き飛ばした。",
    "se": "+panchi.mp3",
    "action": "SHAKE_SCREEN",
    "hideIllust": [
      "kimera2"
    ]
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「きゃあっ……！」",
  },
  {
    "scene": "夜の帰り道",
    "text": "背中から地面へ叩きつけられ、肺の中の空気が一気に押し出される。"
  },
  {
    "scene": "夜の帰り道",
    "text": "痛みで身体が思うように動かない。それでも必死に立ち上がろうとする。だが、キメラは容赦なくこちらへ歩み寄ってくる。",
    "showIllust": [
      "kimera23"
    ]
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな……」"
  },
  {
    "scene": "夜の帰り道",
    "text": "逃げ場はない。そう思った、その瞬間だった。"
  },
  {
    "scene": "夜の帰り道",
    "se": "+sword.mp3",
    "text": "鋭い一撃がキメラを弾き飛ばす。",
    "hideIllust": [
      "kimera2"
    ]
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ！」",
    //背景アカネCG
  },
  {
    "scene": "夜の帰り道",
    "text": "見知らぬ大男が私の前に立ち、振り返ることなく静かに口を開く。"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "？？？",
    "text": "「立て」"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "？？？",
    "text": "「歌え」"
  },
  {
    "scene": "夜の帰り道",
    "text": "短く、それだけを告げる。"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "？？？",
    "text": "「早くしろ」"
  },
  {
    "scene": "夜の帰り道",
    "text": "有無を言わせない声だった。どうして、この人はそんなことを言うの。どうして、私のことを知っているような口ぶりで――。"
  },
  {
    "scene": "夜の帰り道",
    "text": "戸惑いながらも、私は震える唇をゆっくりと開いた。"
  },
  {
    "scene": "夜の帰り道",
    "action": "FADE_TO_BLACK"
  },
  //↓↓ bgm: TheSong
  //=============== 戦闘開始(2回目) ==============
  {
    "scene": "夜の帰り道",
    "action": "TRIGGER_BATTLE_AKANE_VS_KIMERA2"
  },
  {
    "scene": "夜の帰り道",
    "text": "キメラが消滅し、静寂が戻る。"
  },
  {
    "scene": "夜の帰り道",
    "text": "私は息を整えながら、目の前に立つ男を見る。見上げるほどに高い身長と、岩のようにがっしりとした分厚い体格。右目に黒い眼帯を嵌めていた。彼は何も言わず、ただ私を見つめていた。まるで、何かを確かめるように。"
  },
  {
    "scene": "夜の帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あなたは、一体――」"
  },
  {
    "scene": "夜の帰り道",
    "text": "問いかけても、返事はない。男は興味を失ったように視線を逸らすと、お礼を言う暇もなくそのまま夜の闇へと消えていった。"
  },
  //===============  朔良の部屋(夜) ===============
  {
    "scene": "朔良の部屋(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ただいま……」",
    "bg": "/scene/sakura_room_night.png"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "誰も返事をしない部屋へ帰る。静まり返ったワンルームに明かりをつけ、私は疲れた身体をベッドへ預けた。",
    "bgm": "Room_Night.mp3",
    "bgmVolume": 0.03
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "今日一日で、あまりにも多くのことが起きた。考えたいことは山ほどある。けれど、今はもう何も考えられなかった。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "気を紛らわせるようにテレビをつける。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "speaker": "ニュースキャスター",
    "text": "『――続いてのニュースです。本日18時頃、〇〇区において発生した限定的な月波のバーストにより、警戒レベル３が発令されました』",
    "bg": "/scene/sakura_room_tv.png"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "画面に映し出されたのは、黒い甲冑を身にまとった人物と、その周囲に従う複数のキメラの姿。",
  },
  {
    "scene": "朔良の部屋(夜)",
    "speaker": "ニュースキャスター",
    "text": "『これまでのキメラとは異なり、漆黒の武装を身にまとった正体不明の能力者――ネット上で【黒騎士】と呼ばれている人物によって統率されている可能性が高く、防衛局は最大限の警戒を呼びかけています』"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "（【黒騎士】……【キメラ】を引き連れる、化け物たちの王……）"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "最近、SNSのオカルト掲示板や大学の噂話でも囁かれている、最凶の都市伝説。キメラを従える、正体不明の能力者。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "いつもならどこか他人事で見ていたニュースなはずなのに、胸騒ぎがした。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "私は小さく息を吐き、テレビの電源を切った。",
    "se": "+dengen.mp3",
    "bg": "/scene/sakura_room_night.png"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "青白い月明かりだけが、静かな部屋を照らしていた。枕元のカーテンを少しだけ開け、夜空を見上げる。 ",
  },
  {
    "scene": "朔良の部屋(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……お父さん」"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "ぽつりと、今はもうここにいない家族の名前を呟いてみる。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "スマートフォンのアラームをセットし、掛け布団を頭まで被って目を閉じる。微かに聞こえる、遠くの街のサイレンの音を子守唄代わりにしながら、私は祈るような気持ちで深い眠りへと落ちていった。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "枕元のカーテンを少しだけ開け、夜空を見上げる。",
    "bg": "/scene/sakura_room_moon_night.png"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "ガラスの向こうには、太陽のいない夜の闇の中で、昼間よりも一層おどろおどろしく、傲慢なほどの青い輝きを放つ人工の月が浮かんでいた。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "その裏側にあるはずの、お父さんが教えてくれた優しくて静かな『本物の月』の姿は、影も形も見えない。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……お父さん」"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "ぽつりと、今はもうここにいない家族の名前を呟いてみる。"
  },
  {
    "scene": "朔良の部屋(夜)",
    "text": "スマートフォンのアラームをセットし、掛け布団を頭まで被って目を閉じる。微かに聞こえる、遠くの街のサイレンの音を子守唄代わりにしながら、私は祈るような気持ちで深い眠りへと落ちていった。 "
  },
  {
    "scene": "朔良の部屋(夜)",
    "action": "FADE_TO_BLACK",
    "bgm": "stop"
  },
  //=============== 翌朝 ===============
  {
    "scene": "朔良の部屋(朝)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ん……」",
    "bg": "/scene/sakura_room.png",
    "se": "+alarm.mp3"
  },
  {
    "scene": "朔良の部屋(朝)",
    "text": "聞き慣れたアラーム音で目を覚ます。ゆっくりと身体を起こし、窓の外を見る。今日も変わらず、人工月の青白い光が街を照らしていた。",
    "bgm": "Room_Morning.mp3",
    "se": "stop"
  },
  {
    "scene": "朔良の部屋(朝)",
    "text": "私は小さく息を吐き、ベッドから降りた。今日は講義もない、久しぶりの休日だった。家で過ごすことも考えたけれど、ずっと部屋に閉じこもっていても気が滅入るだけだ。"
  },
  {
    "scene": "朔良の部屋(朝)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…たまには、どこか行こうかな」"
  },
  {
    "scene": "朔良の部屋(朝)",
    "text": "そう呟きながら、出かける準備を始める。"
  },
  //=============== 探索パート1 ===============
  {
    "scene": "朔良の部屋(朝)",
    "text": "【探索パート開始】",
    "bg": "/scene/sakura_room.png",
    "style": "cinema"
  },
  {
    "scene": "朔良の部屋(朝)",
    "text": "今日は休日です。街を探索して、自由に過ごしましょう。",
    "bg": "/scene/sakura_room.png",
    "style": "popup"
  },
  {
    "label": "exploration_select",
    "scene": "朔良の部屋(朝)",
    "bg": "/scene/sakura_room.png",
    "action": "TRIGGER_EXPLORATION_PHASE"
  },
  {
    "label": "explore_street_1",
    "scene": "昼の商店街",
    "text": "昨日の戦闘現場からは少し離れているものの、街の人々はまだどこか落ち着かない様子だった。",
    "bg": "/scene/shopping_street.png"
  },
  {
    "scene": "昼の商店街",
    "text": "いつもなら賑やかな商店街も、今日は少しだけ静かに感じる。"
  },
  {
    "scene": "昼の商店街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "昼の商店街",
    "text": "何気なく歩いていると、店先に並んだテレビからニュースの音が聞こえてきた。"
  },
  {
    "scene": "昼の商店街",
    "text": "『昨日発生した月波異常区域について、防衛局は――』"
  },
  {
    "scene": "昼の商店街",
    "text": "思わず足を止める。画面に映ったのは、黒い甲冑をまとった異形の存在。"
  },
  {
    "scene": "昼の商店街",
    "text": "【黒騎士】…その名前が、再び耳に入る。"
  },
  {
    "scene": "昼の商店街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……本当に、噂じゃなかったんだ」"
  },
  {
    "scene": "昼の商店街",
    "text": "そんな私の横で、店員たちが小声で話している。"
  },
  {
    "scene": "昼の商店街",
    "speaker": "店員A",
    "text": "「最近、キメラの動きがおかしいって話だよな」"
  },
  {
    "scene": "昼の商店街",
    "speaker": "店員B",
    "text": "「黒騎士とかいう奴、本当にいるのかねぇ」"
  },
  {
    "scene": "昼の商店街",
    "speaker": "店員A",
    "text": "「怖い話だよ……」"
  },
  {
    "scene": "昼の商店街",
    "text": "私はその会話を聞きながら、静かにその場を離れた。",
    "jumpTo": "exploration_select"
  },
  {
    "label": "explore_park_1",
    "scene": "公園",
    "text": "人工月の光が降り注ぐ、静かな公園。\n子供たちが遊ぶ姿を眺めながら、私はベンチに腰掛けた。",
    "bg": "/scene/park.png"
  },
  {
    "scene": "公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……平和に見えるのに」"
  },
  {
    "scene": "公園",
    "text": "この世界では、いつ何が起こるか分からない。\n昨日だって、少し間違えば――。そこまで考えて、私は首を振る。"
  },
  {
    "scene": "公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「考えすぎだよね」"
  },
  {
    "scene": "公園",
    "text": "ふと、昔父と来た日のことを思い出す。父はいつも、この場所から空を見上げていた。"
  },
  {
    "scene": "公園",
    "text": "『朔良、本当の月はね、もっと綺麗なんだ』"
  },
  {
    "scene": "公園",
    "text": "あの頃は、ただの昔話だと思っていた。でも今は。"
  },
  {
    "scene": "公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……お父さんは、何を知ってたの？」"
  },
  {
    "scene": "公園",
    "text": "答えのない問いだけが、静かな公園に消えていった。",
    "jumpTo": "exploration_select"
  },
  {
    "label": "explore_mall_1",
    "scene": "ショッピングモール",
    "text": "久しぶりに訪れた大型ショッピングモール。",
    "bg": "/scene/shopping_mall.png"
  },
  {
    "scene": "ショッピングモール",
    "text": "店内には休日を楽しむ人々の姿があり、少しだけ肩の力が抜ける。"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「こういう普通の時間も、まだ残ってるんだな……」"
  },
  {
    "scene": "ショッピングモール",
    "text": "服屋を眺めたり、雑貨店を覗いたり。\n昨日の出来事を忘れるように歩いていると――"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "？？？",
    "text": "「朔良！？」"
  },
  {
    "scene": "ショッピングモール",
    "text": "聞き覚えのある声がした。振り返ると、そこには大きな袋を抱えた睦典が立っていた。",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "ショッピングモール",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん？」"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "睦典",
    "text": "「やっぱり朔良だ！ 偶然だな！」",
  },
  {
    "scene": "ショッピングモール",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「その荷物……何？」"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "睦典",
    "text": "「新しい食材探し！」",
  },
  {
    "scene": "ショッピングモール",
    "text": "睦典は得意げに袋を持ち上げる。"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "睦典",
    "text": "「実は新メニューの改良をしててさ！」",
  },
  {
    "scene": "ショッピングモール",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……また？」"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "睦典",
    "text": "「今回は自信あるぞ！」",
  },
  {
    "scene": "ショッピングモール",
    "text": "昨日の戦闘とは無縁な、いつもの調子。その姿を見て、少しだけ安心する。"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……平和だね」"
  },
  {
    "scene": "ショッピングモール",
    "speaker": "睦典",
    "text": "「え？ 急にどうした？」",
  },
  {
    "scene": "ショッピングモール",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ううん。なんでもない」"
  },
  {
    "scene": "ショッピングモール",
    "text": "私は小さく笑った。",
    "jumpTo": "exploration_select"
  },
  {
    "label": "explore_university_1",
    "scene": "大学",
    "text": "休日の大学は、平日の喧騒が嘘のように静かだった。",
    "bg": "/scene/university_outside.png"
  },
  {
    "scene": "大学",
    "text": "研究棟の前を通りかかった時、ふと足が止まる。昨日、ヒルミ教授に言われた言葉。"
  },
  {
    "scene": "大学",
    "text": "『本物の月について』"
  },
  {
    "scene": "大学",
    "text": "あれがずっと気になっていた。"
  },
  {
    "scene": "大学",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "大学",
    "text": "研究棟を見上げる。人工月について学ぶ場所。\nそして、父が残した謎に近づけるかもしれない場所。"
  },
  {
    "scene": "大学",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「もっと調べないと……」"
  },
  {
    "scene": "大学",
    "text": "そう決意した、その時。"
  },
  {
    "scene": "大学",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……？」"
  },
  {
    "scene": "大学",
    "text": "ふと視線を感じて、後ろを振り返る。だけどそこには誰もいなかった。…昨日のこともあって、過敏になっているのかもしれない。"
  },
  {
    "scene": "大学",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「気のせい……かな」"
  },
  {
    "scene": "大学",
    "text": "私はその場を後にした。",
    "jumpTo": "exploration_select"
  },

  //===== 探索終了 =====
  {
    "label": "exploration_end",
    "scene": "夜の街",
    "text": "帰り道を歩きながら、ふとスマートフォンを確認しようとポケットへ手を伸ばす。けれど、いつもそこにあるはずの感触がない。",
    "bg": "/scene/shopping_street_night.png",
    "action": "SLOW_FADE_IN",
    "bgm": "Normal_Night.mp3"
  },
  {
    "scene": "夜の街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あれ……？」"
  },
  {
    "scene": "夜の街",
    "text": "嫌な予感がして、カバンの中を探る。何度確認しても、見つからない。"
  },
  {
    "scene": "夜の街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……嘘。携帯、落とした……？」"
  },
  {
    "scene": "夜の街",
    "text": "今日撮った写真や、大切な連絡先。失くしたことへの焦りが一気に押し寄せる。もしかしたら、さっき立ち寄った場所からここまでの道のどこかで落としたのかもしれない。私は慌てて来た道を戻り、足元を確認しながら探し始めた。"
  },
  {
    "scene": "路地裏(夜)",
    "text": "しゃがみ込みながら、地面の隅や建物の影を一つずつ確認する。けれど、液晶の光どころか、落とした痕跡すら見つからない。",
    "bg": "/scene/rojiura.png",
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「どこ……？ さっきまでは持ってたはずなのに……」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "半ば諦めかけて顔を上げた、その時だった。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「ねぇ、君。何か探し物かい？」"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え？」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "不意に背後から聞こえた声に、私は驚いて振り返った。"
  },
  {
    "scene": "路地裏(夜)",
    "bg": "/character/Nagisa/Nagisa_CG1.png",
    "text": "突然のことに言葉を詰まらせる私を見て、彼はふっと優しげに笑った。",
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「ああ、急に話しかけてごめんよ。女の子が一人でこんな暗い場所で、顔色を悪くしながら何かを探しているから気になってね」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "にこやかで、人当たりの良い笑顔。優しそうなお兄さん――そう見える。けれど、その完璧な笑みの奥にある瞳だけが、なぜかひどく冷たく感じられた。"
  },
  {
    "scene": "路地裏(夜)",
    "text": "気のせいだと思い直し、私は慌てて頭を下げる。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あの……この辺りで、携帯を落としちゃったみたいで……」"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "role": "NAGISA",
    "text": "「携帯？ それは大変だね。大事なデータも入っているだろうし、僕も探すよ。何色？」"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え？ いいんですか？ でも……」"
  },
  {
    "scene": "路地裏(夜)",
    "bg": "/scene/rojiura.png",
    "text": "初対面の人に助けてもらうことへ戸惑っていると、彼は小さく笑った。",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「ここまで来て『頑張ってね』って帰るほど、僕は薄情じゃないよ。僕は向こうを探してくるね」"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ありがとうございます……えっと、黄色いカバーのやつです」"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「黄色……分かった」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "本物の月の色と同じ、お気に入りの色。"
  },
  {
    "scene": "路地裏(夜)",
    "text": "彼は一瞬だけ、何かを確かめるように私を見つめた。少し気になったものの、今は携帯を探すことが先だった。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "action": "FADE_TO_BLACK"
  },
  {
    "scene": "路地裏(夜)",
    "text": "数分後。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……やっぱり、警察に届けるしかないのかな」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "諦めかけた、その時だった。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「見つけたよ。これかな」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "振り返ると、彼が指先でスマートフォンを掲げていた。間違いない。私のスマホだ。",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「それです！ ありがとうございます！」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "駆け寄って手を伸ばす。しかし、彼はすぐには渡さなかった。スマホを持った手をゆっくりと引き、私から距離を取る。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ、あの……」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "先ほどまでの優しい雰囲気は消えていた。向けられた視線は、まるで何かを確かめるように冷たい。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「この携帯さ……返して欲しい？」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "彼は口元だけで笑う。その表情に背筋が凍った。次の瞬間、彼は私の腕を掴んだ。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ！」",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "text": "細身の見た目からは想像できないほど強い力だった。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「イヤ……！」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "振りほどこうとしても、びくともしない。恐怖で息が詰まる。"
  },
  {
    "scene": "路地裏(夜)",
    "text": "けれど、それ以上に気になったのは、彼の表情だった。驚きと、何かを確信したような感情が浮かんでいる。",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「……なんで」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "彼は掴んだ私の腕を見つめ、小さく呟いた。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "？？？",
    "text": "「ねぇ。君、気になるな。この携帯を返してほしかったら……僕と連絡先、交換しない？」",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "text": "怖い。けれど、このまま怯えているわけにはいかない。私は力を振り絞り、彼の腕を振りほどいた。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ」",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "text": "予想外だったのか、彼がわずかに目を見開く。"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「なんなんですか……！ 携帯なんてもういりません。もう関わらないで！」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "私はその場から逃げようと背を向ける。その時。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……凪砂」"
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え？」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "足を止め、振り返る。彼は先ほどまでのことなど何もなかったかのように、静かに立っていた。",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「僕の名前。この携帯は返すよ――きっと、また会える」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "そう言って、彼はスマートフォンを差し出すと、そのまま、青白い月明かりの中へ消えていく。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "路地裏(夜)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……なんだったの」"
  },
  {
    "scene": "路地裏(夜)",
    "text": "静かな路地裏に残った足音だけが、今の出来事が現実だったと伝えていた。私は返ってきたスマートフォンを強く握りしめた。"
  },
  {
    "scene": "路地裏(夜)",
    "action": "FADE_TO_BLACK"
  },
  //===== 朔良の部屋(夜) =====
  {
    "scene": "朔良の部屋",
    "bg": "/scene/sakura_room_night.png",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……疲れた……」",
    "bgm": "Room_Night.mp3"
  },
  {
    "scene": "朔良の部屋",
    "text": "部屋に戻ると、私は鞄を置くのもそこそこにベッドへ倒れ込んだ。知らない男――凪砂さんとの出来事。"
  },
  {
    "scene": "朔良の部屋",
    "text": "心休まる休日のはずだったのに、心身ともにすり減らしてしまった。"
  },
  {
    "scene": "朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……なんだったんだろう、あの人……」"
  },
  {
    "scene": "朔良の部屋",
    "text": "考えれば考えるほど、不安が胸の奥に残る。"
  },
  {
    "scene": "朔良の部屋",
    "text": "けれど、今はもう何も考えたくなかった。私は布団を頭まで被り、スマートフォンを枕元に置く。"
  },
  {
    "scene": "朔良の部屋",
    "text": "その時。"
  },
  {
    "scene": "朔良の部屋",
    "text": "画面を見ると、届いたばかりのメッセージが表示されていた。",
    "showItem": "/item/phone_mail.png"
    //通知音
  },
  {
    "scene": "朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "『朔良、急にごめん。明日、少しだけ会えないかな。最近街も物騒だし、顔を見て安心したくて。……あと、普通に朔良に会いたい。いつもの時計塔の前で待ってる』"
  },
  {
    "scene": "朔良の部屋",
    "text": "画面を見つめたまま、私は小さく息を吐く。",
  },
  {
    "scene": "朔良の部屋",
    "text": "満……幼い頃からずっと一緒だった、大切な幼馴染。"
  },
  {
    "scene": "朔良の部屋",
    "text": "最近は遠くに引っ越してしまって、昔ほど頻繁には会えなくなったけれど……それでも、こうして変わらず気にかけてくれる。"
  },
  {
    "scene": "朔良の部屋",
    "text": "さっきまで張り詰めていた心が、少しだけほどけていく。"
  },
  {
    "scene": "朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "『私も会いたかった。大学終わったら行くから、待ってて』"
  },
  {
    "scene": "朔良の部屋",
    "text": "連絡を終えて、改めてスマホを置く。不思議と、さっきまでの不安が少しだけ薄れていた。",
    "clearItem": true
  },
  {
    "scene": "朔良の部屋",
    "text": "私は目を閉じる。青白い月明かりが、静かな部屋を照らしていた。"
  },
  {
    "scene": "朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……おやすみ」"
  },
  {
    "scene": "朔良の部屋",
    "text": "そう呟いて、私はゆっくりと眠りへ落ちていった。",
    "bgm": "stop",
    "bgmFade": 3
  },
  //=====　翌日、大学の正門前 =====
  {
    "scene": "大学の正門前",
    "text": "午前の講義を終え、私は睦典と学食へ向かっていた。",
    "bg": "/scene/university_gate.png"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": " 「朔良、早く行こう！ 今日の日替わり定食、絶対逃したくないんだよ！」",
    "showIllust": [
      "Mutsunori_happy3"
    ],
    "bgm": "Normal_Morning.mp3"
  },
  {
    "scene": "大学の正門前",
    "text": "いつも通り食べ物の話ばかりする睦典に、思わず笑ってしまう。",
  },
  {
    "scene": "大学の正門前",
    "text": "──その時。",
    "hideIllust": [
      "Mutsunori"
    ],
    "bgm": "stop"
  },
  {
    "scene": "大学の正門前",
    "speaker": "？？？",
    "text": "「あ、見つけた」",
  },
  {
    "scene": "大学の正門前",
    "text": "聞き覚えのある声が、正面から響いた。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "？？？",
    "text": "「……やぁ、昨日の可愛い子」",
  },
  {
    "scene": "大学の正門前",
    "text": "背筋が凍る。"
  },
  {
    "scene": "大学の正門前",
    "text": "顔を上げると、そこには正門の壁にもたれかかるように立つ、一人の青年がいた。",
    "showIllust": [
      "Nagisa_smile4"
    ],
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "大学の正門前",
    "text": "整った顔立ちに、周囲の視線を集めるほどの容姿。けれど、私には分かる。この人は──昨日、夜道で私の腕を掴んだ男。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「な、なんで……ここに……」"
  },
  {
    "scene": "大学の正門前",
    "text": "私が後ずさると、隣にいた睦典がすぐに異変を察した。",
    "showIllust": [
      "Mutsunori_serious2" //驚き
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……朔良。この人、知り合い？」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "大学の正門前",
    "text": "答えられない私の代わりに、睦典は一歩前へ出る。",
    "showIllust": [
      "Mutsunori_serious"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「誰だよ、お前。朔良に何の用？」"
  },
  {
    "scene": "大学の正門前",
    "text": "いつもの明るい雰囲気は消えていた。友人を守るための、真剣な表情。"
  },
  {
    "scene": "大学の正門前",
    "text": "青年──凪砂さんは、そんな睦典を冷たい目で見下ろす。",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「お前には話しかけてない」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「は？なんだよそれ。誰でなんの用かって聞いてるんだけど」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「うるさいな……。声が大きくて頭に響く。育ちが悪いんじゃない？」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「んだと……っ！？」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「お前に用はない。僕が話したいのは、後ろの彼女」"
  },
  {
    "scene": "大学の正門前",
    "text": "その言葉に、私は息を飲む。"
  },
  {
    "label": "insight_nagisa_end",
    "scene": "大学の正門前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「どうして大学が……」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「学生証が見えてたから。ね、朔良ちゃん？」"
  },
  {
    "scene": "大学の正門前",
    "text": "淡々と答える凪砂さんに、嫌な汗が背中を伝う。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「近づくな」"
  },
  {
    "scene": "大学の正門前",
    "text": "睦典が低い声で言い、私を庇うように立ちはだかる。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……本当に、煩わしい男だね」",
    "showIllust": [
      "Nagisa_serious"
    ]
  },
  {
    "scene": "大学の正門前",
    "text": "凪砂さんは不快そうに睦典を見る。二人の間に、張り詰めた空気が流れた。一触即発……。あまりにも冷え切った二人の空気を感じて、周囲を行き交う学生たちも足を止め、遠巻きにざわつき始めたそんな時だった。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「──はいはーい、何事かな？」",
    "bgm": "stop"
  },
  {
    "scene": "大学の正門前",
    "text": "飄々とした軽い声と共に、長い白衣をなびかせたヒルミ教授がヌッと現れた。教授は二人の間に割って入ると、睦典と凪砂さん、それぞれの肩に手をポン、と置いた。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「っうわ！？ 教授！？」",
    "showIllust": [
      "Mutsunori_pout", //驚き
      "Hirumi_smile3",
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「…ッ」"
  },
  {
    "scene": "大学の正門前",
    "text": "大声を上げて飛び上がった睦典は驚愕し、凪砂さんはまるで汚物に触れられたかのように激しく不快そうに顔を歪めて、教授の手を強引に振り払う。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「一応ここ学び舎なんでね。喧嘩なら門を出たところでやってくれないかな。若いエネルギーを発散したい気持ちは分からなくもないが、問題になると色々こっちが面倒なんだよ」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「っ、いや、教授！ こいつが朔良に──」",
    "illust": "Mutsunori_serious",
    "showIllust": [
      "Mutsunori_serious"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……チッ」"
  },
  {
    "scene": "大学の正門前",
    "text": "睦典が言い募ろうとした瞬間、凪砂が盛大に舌打ちをした。"
  },
  {
    "scene": "大学の正門前",
    "text": "これ以上ここにいても面倒なだけだと判断したのか、彼はポケットに手を突っ込むと、私にだけ聞こえるような低い声でボソッと呟いた。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「またね、朔良ちゃん」",
    "showIllust": [
      "Nagisa_smile"
    ],
    "hideIllust": [
      "Hirumi",
      "Mutsunori"
    ]
  },
  {
    "scene": "大学の正門前",
    "text": "そう言い残し、凪砂さんは人混みの中へ消えていった。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "朔良",
    "role": "SAKURA",
    "bgm": "Normal_Morning.mp3",
    "text": "「あ、ありがとうございます……」",
    "bgm": "Normal_Morning.mp3"
  },
  {
    "scene": "大学の正門前",
    "text": "恐怖から解放されて、へなへなと力が抜けそうになりながら私がお礼を言うと、教授はいつも通りの朗らかな笑みを浮かべた。",
    "showIllust": [
      "Hirumi_smile3"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「大したことないよ。にしても、朔良、君って結構男たらしなのかな？」"
  },
  {
    "scene": "大学の正門前",
    "text": "あまりにも突拍子もないことを言われた。驚きでパチクリとする私を余所に、睦典がすかさず反論する。",
    "showIllust": [
      "Mutsunori_pout2"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良はそんなやつじゃないです！ アイツが昨日から勝手に付きまとってるだけで……！ 朔良は、うどんの出汁くらい一途で純粋なんです！」"
  },
  {
    "scene": "大学の正門前",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「例えはよく分からないが……まぁ冗談だって。男絡み抜きにしても、最近は物騒なんだからね。余計なエネルギーは使うなよ。じゃあ、私はお気に入りの定食が売り切れる前に学食へ行くから」"
  },
  {
    "scene": "大学の正門前",
    "text": "教授はそれだけ言うと、じゃあね、と手をヒラヒラ振って、マイペースな足取りで去っていった。",
    "hideIllust": [
      "Hirumi"
    ]
  },
  {
    "scene": "大学の正門前",
    "text": "嵐のような時間が過ぎ去り、正門前には私と、まだ興奮冷めやらぬ様子で鼻息を荒くしている睦典だけが取り残された。",
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、本当に大丈夫だった？」",
  },
  {
    "scene": "大学の正門前",
    "text": "騒ぎが収まった後、睦典は心配そうに私を見る。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「うん。ムッちゃんがいてくれたから」"
  },
  {
    "scene": "大学の正門前",
    "text": "お礼を告げると、鼻の下を指で擦ってふふん、と息を吐く。",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「まぁな！ キメラじゃなかったら俺に任せてよ！」"
  },
  {
    "scene": "大学の正門前",
    "text": "いつもの調子に戻った彼に、少しだけ安心する。"
  },
  {
    "scene": "大学の正門前",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「よし、今日は俺が奢る！ 学食行こう！」",
    "showIllust": [
      "Mutsunori_happy"
    ]
  },
  {
    "scene": "大学の正門前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ふふ……ありがとう」 "
  },
  {
    "scene": "大学の正門前",
    "text": "睦典の優しさに救われながら、私たちは学食に向けて再び歩き出す。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "大学の正門前",
    "text": "けれど──凪砂さんが残した「またね」という言葉だけが、ずっと頭から離れなかった。"
  },
  {
    "scene": "大学の正門前",
    "action": "FADE_TO_BLACK",
    "bgm": "stop",
    "bgmFade": 2
  },
  //===== 満に会う前の路地裏 =====
  {
    "scene": "夜の裏路地",
    "bg": "/scene/rojiura.png",
    "text": "講義を終え、時計台へ向かうため薄暗い路地を急ぐ。\n街灯の青い光も届かない、ゴミ箱が並ぶビルの隙間を通りかかった、その時。",
  },
  {
    "scene": "夜の裏路地",
    "speaker": "？？？",
    "text": "「……う、……っ……」 "
  },
  {
    "scene": "夜の裏路地",
    "text": "壁の影から、苦しげな呻き声が聞こえた。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "夜の裏路地",
    "text": "足を止め、恐る恐る暗がりを覗き込む。",
  },
  {
    "scene": "夜の裏路地",
    "text": "そこには、地面に膝をつき、お腹を押さえて倒れ込む一人の少年がいた。私と同じくらいの年頃だろうか。夜を溶かしたような黒髪の隙間から覗く端正な顔は、苦痛に歪んでいる。",
    "bg": "/character/Mika/Mika_CG1.png",
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ、あの……大丈夫ですか？」"
  },
  {
    "scene": "夜の裏路地",
    "text": "思わず駆け寄ると、少年はゆっくりと瞼を開いた。その顔の半分には、何かに焼かれたような痛々しい火傷の痣が刻まれている。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "？？？",
    "text": "「……誰だ」"
  },
  {
    "scene": "夜の裏路地",
    "text": "鋭く睨みつける冷たい声に、思わず一歩後ずさる。視線を落とすと、腹部の服が大きく裂け、そこから赤黒い血が溢れていた。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ひどい怪我……！ とりあえず救急車を──」",
  },
  {
    "scene": "夜の裏路地",
    "speaker": "？？？",
    "text": "「ッ、呼ぶな！」"
  },
  {
    "scene": "夜の裏路地",
    "text": "私の言葉を遮るように叫ぶ。傷口を押さえる指先は痛みで震えていた。公にできない事情があるのだろう。その必死な表情を見て、それ以上は言えなかった。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……分かりました。せめて、これを」",
    "bg": "/scene/rojiura.png"
  },
  {
    "scene": "夜の裏路地",
    "text": "私はカバンからハンカチを取り出し、さっき買った未開封のミネラルウォーターと一緒に差し出す。"
  },
  {
    "scene": "夜の裏路地",
    "text": "「少年は黙ったまま受け取り、濡らしたハンカチを傷口へ強く押し当てた。"
  },
  {
    "scene": "夜の裏路地",
    "text": "傷は気になった。けれど救急車も呼べない事情に、これ以上踏み込むべきではない気がした。それに、私には満との約束もある。"
  },
  {
    "label": "mika_merge_point",
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「それじゃあ、私はこれで」"
  },
  {
    "scene": "夜の裏路地",
    "text": "背を向けると、不意に声が掛かった。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "？？？",
    "text": "「……待ってくれ」"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「はい？」"
  },
  {
    "scene": "夜の裏路地",
    "text": "振り返ると、少年は私を真っ直ぐ見つめていた。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "？？？",
    "text": "「……アンタの名前は」"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私は朔良。あなたは？」"
  },
  {
    "scene": "夜の裏路地",
    "text": "私が名乗ると、少年は一度目を伏せ、小さく呟く。"
  },
  {
    "scene": "夜の裏路地",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……ミカ」",
  },
  {
    "scene": "夜の裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん。ちゃんと病院には行ってね」"
  },
  {
    "scene": "夜の裏路地",
    "text": "それだけ言い残し、私は待ち合わせ場所へ向かって再び歩き出した。"
  },
  {
    "scene": "夜の裏路地",
    "action": "FADE_TO_BLACK",
    "bgm": "stop",
    "bgmFade": 2
  },
  //===== 時計台 =====
  {
    "scene": "時計塔前",
    "text": "裏通りを抜けて広場へ出ると、街のランドマークである古い時計塔が、人工月の青い光に照らされ静かに佇んでいた。",
    "bg": "/scene/clock_tower.png",
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（満……！）"
  },
  {
    "scene": "時計塔前",
    "text": "息を切らせて広場を見渡すと、時計塔の真下、深い影が落ちる街灯のそばに、一人の青年が立っているのが見えた。",
    "bg": "/character/Michiru/Michiru_CG1.png",
    "bgm": "Room_Night.mp3"
  },
  {
    "scene": "時計塔前",
    "text": "時計塔の下には、一人の青年が立っている。整った顔立ちに、どこか儚げな雰囲気を纏ったその姿は、青白い月明かりの中で幻想的に映っていた。"
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……満！」"
  },
  {
    "scene": "時計塔前",
    "text": "声を掛けると、彼はゆっくり振り返り、穏やかな笑みを浮かべる。",
    "bg": "/character/Michiru/Michiru_CG2.png"
  },
  {
    "scene": "時計塔前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「よかった、来てくれたんだね。……朔良」",
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ごめんね、待たせちゃって。途中でちょっと……」"
  },
  {
    "scene": "時計塔前",
    "text": "路地裏で出会った少年のことが頭をよぎり、言葉を濁す。満は何も追及せず、安心したように微笑んだ。"
  },
  {
    "scene": "時計塔前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「僕も今来たところだよ。それに……少し見ない間に、また可愛くなった？」"
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「もう、からかわないでよ」"
  },
  {
    "scene": "時計塔前",
    "text": "昔から変わらないそのやり取りに、自然と肩の力が抜ける。"
  },
  {
    "scene": "時計塔前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「昨日のニュース、君の大学の近くだっただろう？ 本当に心配だったんだ。顔を見て安心したよ」",
    "bg": "/scene/clock_tower.png",
    "showIllust": [
      "Michiru_smile3"
    ]
  },
  {
    "scene": "時計塔前",
    "text": "そう言って、満はそっと私との距離を縮める。"
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私は大丈夫。大学の友達も一緒だったし……」"
  },
  {
    "scene": "時計塔前",
    "text": "その瞬間だった。",
  },
  {
    "scene": "時計塔前",
    "text": "ぐらり、と視界が揺れる。頭の奥が焼けるように熱くなり、立っていられないほどの眩暈が襲ってきた。",
    "bgmVolum": 0.2,
    "action": "DIZZY_EFFECT"
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ」"
  },
  {
    "scene": "時計塔前",
    "text": "思わず額を押さえる。"
  },
  {
    "scene": "時計塔前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良、大丈夫？」",
    "showIllust": [
      "Michiru_surprise"
    ]
  },
  {
    "scene": "時計塔前",
    "text": "気が付くと、満がすぐそばで私を支えていた。",
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ごめん……ちょっと目眩がしただけ」"
  },
  {
    "scene": "時計塔前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「無理してるんじゃない？」"
  },
  {
    "scene": "時計塔前",
    "text": "満は私の肩を支え、乱れた前髪をそっと払う。その冷たい手に触れられると、不思議と頭の熱が少しだけ引いていく気がした。",
    "action": "CLEAR_SHAKE",
    "bgmVolume": 1
  },
  {
    "scene": "時計塔前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「せっかく会えたんだし、少し歩こうか。温かいものでも飲みながら、朔良の話を聞かせてよ」",
    "showIllust": [
      "Michiru_happy"
    ]
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うん」"
  },
  {
    "scene": "時計塔前",
    "text": "私は小さく頷く。"
  },
  {
    "scene": "時計塔前",
    "text": "人工月に照らされた帰り道を、私たちはゆっくりと歩き始めた。満の隣だけは、この街で唯一、変わらない日常のように思えた。"
  },
  {
    "scene": "時計塔前",
    "action": "FADE_TO_BLACK",
    "hideIllust": [
      "Michiru"
    ],
    "duration": 3000,
    "bgm": "stop",
    "bgmFade": 3
  },
  //===== 満と解散後 =====
  {
    "scene": "朔良の部屋",
    "text": "満と温かいココアを飲みながら過ごした時間は、まるで夢のようだった。大学であった出来事を話し、彼と別れて家に帰る頃には、あれほど怯えていた心も嘘のように落ち着いていた。",
    "bg": "black",
    "bgm": "Normal_Morning.mp3"
  },
  {
    "scene": "時計塔前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（やっぱり、満の隣が一番安心するな……）"
  },
  {
    "scene": "朔良の部屋",
    "text": "そんな余韻のまま眠りにつき──翌朝。",
  },
  //===== 大学の講義室 =====
  {
    "scene": "大学の講義室",
    "text": "私はいつも通り大学へ向かい、一限目の講義が始まった。",
    "bg": "/scene/university_classroom.png",
  },
  {
    "scene": "大学の講義室",
    "speaker": "？？？",
    "text": "「──あ、あの、すみません。遅れました」"
  },
  {
    "scene": "大学の講義室",
    "text": "講義が始まって数分後、教室の扉が開き、一人の男子学生が慌てて入ってくる。教授に軽く注意されながら空席を探して歩くその姿を見た瞬間、私は息を呑んだ。",
    "bgm": "stop",
  },
  {
    "scene": "大学の講義室",
    "text": "（嘘……ミカくん……！？）",
    "showIllust": [
      "Mika_neutral3"
    ]
  },
  {
    "scene": "大学の講義室",
    "text": "紫色の髪。昨夜、路地裏で血を流していた少年と同じ顔だった。彼は私の数席隣へ腰を下ろすと、不意にこちらを見た。"
  },
  {
    "scene": "大学の講義室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「あ……」",
    "showIllust": [
      "Mika_surprise"
    ]
  },
  {
    "scene": "大学の講義室",
    "text": "一瞬だけ目を見開いた彼は、すぐに無表情へ戻り、小さく呟く。"
  },
  {
    "scene": "大学の講義室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……奇遇ですね、先輩。昨日は、ありがとうございました」",
    "showIllust": [
      "Mika_smile"
    ]
  },
  {
    "scene": "大学の講義室",
    "text": "素っ気なかったけれど、確かに機能のお礼だった。まさかあの少年が、同じ大学の学生だったなんて。私は講義どころではなかった。"
  },
  //===== キャンパスの裏手 =====
  {
    "label": "insight_mika_end",
    "scene": "キャンパスの裏手",
    "text": "昼休み。すぐに姿を消してしまったミカくんが気になり、私はキャンパスの裏手を歩いていた。",
    "bg": "/scene/university_back.png",
    "bgm": "Normal_Morning.mp3"
  },
  {
    "scene": "キャンパスの裏手",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん、どこ行っちゃったんだろ……」"
  },
  {
    "scene": "キャンパスの裏手",
    "text": "古い講堂の裏へ差しかかった、その時。"
  },
  {
    "scene": "キャンパスの裏手",
    "text": "スマートフォンが短く震えた。",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "キャンパスの裏手",
    "text": "満からかと思って画面を開くと、表示されていたのは見覚えのないアドレス。\n恐る恐るメールを開く。",
    "showItem": "/item/phone_mail.png",
    "bgm": "stop"
  },
  {
    "scene": "キャンパスの裏手",
    "speaker": "メール",
    "text": "『お前の父親と、お前の無能力について話したいことがある。今夜20時、三丁通り西路地裏へ一人で来い。通報すれば、その瞬間に周囲へ危害を加える』"
  },
  {
    "scene": "キャンパスの裏手",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ！？ なんで、お父さんのこと……」"
  },
  {
    "scene": "キャンパスの裏手",
    "text": "指先が震える。父の研究も、私が無能力者であることも、本来ほとんど知られていないはずだ。"
  },
  {
    "scene": "キャンパスの裏手",
    "text": "もしその事実が悪意ある能力者に知られれば、私は抵抗する術もなく狙われる。悪戯かもしれない。罠かもしれない。それでも、周りの人に危害が及ぶかもしれないと思うと、警察へ通報することすらできなかった。"
  },
  {
    "scene": "キャンパスの裏手",
    "text": "（……行くしか、ない）",
    "clearItem": true
  },
  //===== アカネ、路地裏 =====
  {
    "scene": "裏路地",
    "text": "夜20時。指定された西路地裏は、人影ひとつない。湿った空気と生ゴミの臭いが漂い、人工月の青白い光だけが路地を照らしていた。",
    "bg": "/scene/rojiura.png"
  },
  {
    "scene": "裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……誰も、いない……？」"
  },
  {
    "scene": "裏路地",
    "text": "不安に駆られ辺りを見回した、その瞬間。背後の闇から、音もなく誰かが近づく。"
  },
  {
    "scene": "裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "裏路地",
    "text": "振り向くより早く、太い腕が私の身体を拘束した。"
  },
  {
    "scene": "裏路地",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「むぐっ……！？」",
    "action": "SHAKE_SCREEN_VERY_LARGE"
  },
  {
    "scene": "裏路地",
    "text": "必死に暴れて男の腕を振り払おうとするけれど、無能力者の私の力なんて、男の鉄のような腕の前には全く歯が立たない。",
    "se": "+struggle.mp3"
  },
  {
    "scene": "裏路地",
    "text": "口元へ薬品の染み込んだ布が押し当てられる。必死にもがいても、大男の腕はびくともしない。鼻を突く匂いとともに、意識が急速に遠のいていく。",
    "action": "BLUR_EFFECT"
  },
  {
    "scene": "裏路地",
    "text": "霞む視界の中、最後に見えたのは── \n眼帯をつけた、岩のような体格の―前に私を助けてくれた男だった。",
    "showIllust": [
      "Akane_neutral3"
    ]
  },
  {
    "scene": "裏路地",
    "text": "私の身体は力なく崩れ落ち、そのまま男に抱え上げられる。抗うこともできないまま、日常は静かに奪われていった。",
  },
  {
    "scene": "裏路地",
    "text": "人工月の青い光だけが、意識を失った私を冷たく照らしていた。",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "裏路地",
    "action": "SLOW_FADE_TO_BLACK",
    "action": "CLEAR_SHAKE"
  },

  //===== アジト =====
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ、……ぅ……」",
    "action": "WAKE_UP",
    "bg": "/scene/warehouse.png",
    "bgTransitionDuration": 3500
  },
  {
    "scene": "廃倉庫",
    "text": "激しい頭痛と鼻に残る薬品の匂いで目が覚める。視界がぼやける中、自分が冷たいコンクリートの床に座らされ、手足を太いロープで縛られていることに気づいた。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「……気づいたか」",
  },
  {
    "scene": "廃倉庫",
    "text": "低い声に顔を上げる。そこは薄暗い廃倉庫だった。周囲にはガラの悪い男たち。そして中央には、路地裏で私を襲った眼帯の大男が立っていた。",
    "bgm": "serious_2.mp3",
    "bgmFade": 2,
    "bgmVolume": 0.2,
    "bg": "/character/Akane/Akane_CG1.png"
  },
  {
    "scene": "廃倉庫",
    "text": "そしてやはりというか、その男は、夜道にキメラに遭遇した時に私に「歌え」と言って助けてくれた男でもあった。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「どういうつもり……！ あなたたち、何者なの！？」"
  },
  {
    "scene": "廃倉庫",
    "text": "必死に睨み返すが、大男は表情一つ変えない。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「お前に質問がある」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「答えてよ！ ここは一体──」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ぐぅ……っ！？」",
    "action": "WHITE_FLASH_AND_SHAKE",
    "se": "+panchi.mp3",
  },
  {
    "scene": "廃倉庫",
    "text": "隣の男に顔を殴り飛ばされる。口の中に鉄の味が広がり、身体が大きく揺れた。倒れかけた私を、大男が片手で乱暴に支え直す。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「質問に答えろ」",
    "bg": "/scene/warehouse.png",
    "showIllust": [
      "Akane_serious3"
    ]
  },
  {
    "scene": "廃倉庫",
    "text": "無機質な声に、恐怖で身体が震える。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「お前の血縁者について聞く」",
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「血縁者……？ お父さんのこと……？」"
  },
  {
    "scene": "廃倉庫",
    "text": "そう問い返すと、大男は冷たく言い放った。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「お前の血縁者──'弟'について知っていることを話せ」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え？」"
  },
  {
    "scene": "廃倉庫",
    "text": "思考が止まる。弟？そんな人、いるはずがない。私にはお父さんしかいないはず…。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「どういうこと……？ 私に弟なんていない！」"
  },
  {
    "scene": "廃倉庫",
    "text": "困惑する私を見ても、大男の表情は変わらなかった。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「……とぼけるな」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「待って、本当に知らな──」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あっ……！」",
    "action": "WHITE_FLASH_AND_SHAKE",
    "se": "+panchi.mp3",
  },
  {
    "scene": "廃倉庫",
    "text": "再び頬を殴られ、視界が白く弾けた。口の端を血が伝う。何も知らないのに。どうして……。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「吐くまで殴れ」"
  },
  {
    "scene": "廃倉庫",
    "text": "冷たい命令と同時に、男たちが一斉に近づいてくる。無能力者の私に抵抗する術はない。恐怖で目を強く閉じ、次の衝撃を覚悟した、その時だった。"
  },
  {
    "scene": "廃倉庫",
    "text": "──ビーッ！！ ビーッ！！",
    "bgm": "+alert.mp3"
  },
  {
    "scene": "廃倉庫",
    "text": "けたたましい警報音が廃倉庫中に鳴り響いた。"
  },
  {
    "scene": "廃倉庫",
    "text": "続いて、外から爆発音のような轟音。建物全体が大きく揺れ、天井から砂埃がぱらぱらと落ちてくる。",
    "se": "+bakuhatsu.mp3",
    "action": "SHAKE_SCREEN_VERY_LARGE"
  },
  {
    "scene": "廃倉庫",
    "speaker": "男たち",
    "text": "「なんだ！？」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "男たち",
    "text": "「外で何が起きた！」"
  },
  {
    "scene": "廃倉庫",
    "text": "男たちが一斉に入口へ視線を向ける。眼帯の大男も舌打ちし、無線機を耳へ当てた。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「……チッ。キメラか」"
  },
  {
    "scene": "廃倉庫",
    "text": "無線の向こうから慌ただしい声が漏れる。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "男たち",
    "text": "「北側が突破されました！ 数が多すぎます！」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「全員、外へ出ろ」"
  },
  {
    "scene": "廃倉庫",
    "text": "大男の一言で男たちは慌ただしく倉庫を飛び出していく。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "大男",
    "text": "「こいつは後回しだ。逃げられる状態じゃない」",
    "bgm": "stop"
  },
  {
    "scene": "廃倉庫",
    "text": "最後に眼帯の男も私を一瞥すると、そのまま外へ消えた。\nやがて倉庫は静まり返る。",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…………」"
  },
  {
    "scene": "廃倉庫",
    "text": "残されたのは、私一人。けれど―― "
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（……縄が、少し緩んでる……？）",
  },
  {
    "scene": "廃倉庫",
    "text": "手首の縄がわずかに緩んでいた。",
    "se": "+struggle.mp3",
    "seDuration": 2
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（今しかない……！）",
  },
  {
    "scene": "廃倉庫",
    "text": "私は必死に手首を動かし始める――。",
    "se": "+struggle.mp3",
    "seDuration": 2
  },
  //=============== 探索パート2 ===============
  {
    "scene": "廃倉庫探索",
    "action": "TRIGGER_STRUGGLE_GAME"
  },
  {
    "scene": "廃倉庫探索",
    "action": "TRIGGER_WAREHOUSE_EXPLORATION"
  },
  //=============== 探索終了 ================
  {
    "scene": "廃倉庫",
    "text": "ある程度部屋を探索した私は、息を整える。とにかくここから脱出しないと。",
    "bg": "/scene/warehouse2.png"
  },
  {
    "scene": "廃倉庫",
    "se": "+knock.mp3",
    "hideWindow": true
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……？」"
  },
  {
    "scene": "廃倉庫",
    "text": "その時、ドンドンッ、と窓の向こうから激しい音が響く。",
    "se": "+Knock.mp3"
  },
  {
    "scene": "廃倉庫",
    "text": "振り返った瞬間──。",
  },
  {
    "scene": "廃倉庫",
    "se": "+window_break.mp3",
    "hideWindow": true
  },
  {
    "scene": "廃倉庫",
    "text": "割れた窓から、一人の影が飛び込んできた。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミ、ミカくん……！？」"
  },
  {
    "scene": "廃倉庫",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩！ 無事ですか」",
    "showIllust": [
      "Mika_neutral4"
    ]
  },
  {
    "scene": "廃倉庫",
    "text": "ミカくんは焦った様子で周囲を確認する。"
  },
  {
    "scene": "廃倉庫",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「事情は後で説明します。今は俺についてきてください」",
    "showIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "廃倉庫",
    "text": "そう言うと、私の手を引いて走り出した。",
  },
  //=============== 崩壊した街 ===============
  {
    "scene": "崩壊した街",
    "text": "冷たい夜風が、殴られた頬の熱を冷ましていく。ミカくんに引かれるまま外へ飛び出した私は、そこで足を止める。",
    "bg": "/scene/town_collapse.png",
    "hideIllust": [
      "Mika"
    ],
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え……」"
  },
  {
    "scene": "崩壊した街",
    "text": "目の前に広がっていたのは、崩壊した街だった。建物は炎に包まれ、瓦礫が散乱している。外では爆発音や怒号が響き、何者かが激しい戦闘を繰り広げていた。防衛隊と【キメラ】の戦闘によって、この一帯は地獄のような有様になっていた。",
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん……これって……」"
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「いいから、前だけ見て走ってください……！」"
  },
  {
    "scene": "崩壊した街",
    "text": "ミカくんに促され、私は必死に走る。"
  },
  {
    "scene": "崩壊した街",
    "text": "しかし、路地を曲がった瞬間──。 "
  },
  {
    "scene": "崩壊した街",
    "se": "+kimera2.mp3",
    "showIllust": [
      "kimera22"
    ],
    "hideWindow": true
  },
  {
    "scene": "崩壊した街",
    "text": "巨大な【キメラ】が、目の前に姿を現した。複数の生物が歪に融合したような異形の姿。\nその巨体が、私たちの進路を完全に塞ぐ。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな……！」"
  },
  {
    "scene": "崩壊した街",
    "text": "足がすくむ私とは対照的に、ミカくんは冷静に周囲を確認する。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……あそこです。隙間を抜けますよ！」",
    "showIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "崩壊した街",
    "text": "ミカくんの指示で、私たちはキメラの横をすり抜けようと走り出す。",
    "hideIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "崩壊した街",
    "text": "しかし──。"
  },
  {
    "scene": "崩壊した街",
    "text": "キメラの巨大な尾が、凄まじい勢いで振り下ろされた。",
    "se": "+wind.mp3"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（避けられない……！）"
  },
  {
    "scene": "崩壊した街",
    "text": "そう思った瞬間。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "？？？",
    "text": "「──右だ」"
  },
  {
    "scene": "崩壊した街",
    "text": "聞き覚えのある声と共に、身体が強く引き寄せられる。",
    "hideIllust": [
      "kimera2"
    ]
  },
  {
    "scene": "崩壊した街",
    "se": "+bakuhatsu.mp3",
    "hideWindow": true,
    "action": "SHAKE_SCREEN_VERY_LARGE"
  },
  {
    "scene": "崩壊した街",
    "text": "直後、先ほどまでいた場所が粉々に砕け散った。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「な、凪砂さん……？」"
  },
  {
    "scene": "崩壊した街",
    "text": "そこにいたのは、あの謎の男だった。\n凪砂さんは私を支えたまま、巨大なキメラを前にしても余裕の笑みを浮かべている。",
    "showIllust": [
      "Nagisa_smile4"
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「やぁ。また会ったね。──これも運命かな」"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「なんであなたが……！」"
  },
  {
    "scene": "崩壊した街",
    "text": "ミカくんがすぐに私を引き寄せ、警戒する。",
    "showIllust": [
      "Mika_surprise2",
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「アンタ……朔良先輩とどういう関係だ」"
  },
  {
    "scene": "崩壊した街",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「誰でもいいさ」"
  },
  {
    "scene": "崩壊した街",
    "text": "凪砂さんは軽く流し、街の奥へ視線を向ける。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「それより、お仲間が待っているんじゃないか？」",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……なぜそれを知っている」",
    "showIllust": [
      "Mika_serious",
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「さぁ？お前の顔に書いてあったから、かな」"
  },
  {
    "scene": "崩壊した街",
    "text": "こんな状況でもあっけらかんとした凪砂さんの態度に、ミカくんは険しい表情を浮かべる。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……行きますよ、先輩」"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「う、うん……！」"
  },
  {
    "scene": "崩壊した街",
    "text": "走り出す私たちの後ろから、凪砂さんもついてくる。",
    "hideIllust": [
      "Mika",
      "Nagisa"
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「おい、ついてくるな…！」",
    "showIllust": [
      "Mika_serious2",
      "Nagisa_smile4"
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「そう邪険にしないでくれよ。一応、命の恩人だろ？それに、こんな危険な街だ。男手は多い方が安心じゃないか」"
  },
  {
    "scene": "崩壊した街",
    "text": "こうして私は、ミカくんと、何を考えているのか分からない凪砂さん。\n二人の能力者と共に、崩壊した街を進むことになった。"
  },
  {
    "scene": "廃ビルへの階段",
    "text": "背後から迫る【キメラ】の気配を振り切り、私たちは寂れた廃ビルへ辿り着いた。",
    "style": "novel",
    "bg": "black",
    "bgm": "stop",
    "bgmFade": 1.5
  },
  {
    "scene": "廃ビルへの階段",
    "text": "ミカくんが3階の奥にある小さな部屋の扉を開く。\n薄暗い室内へ足を踏み入れた、その瞬間──。",
  },
  //=============== 廃ビル ===============
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「──っ、朔良！！」",
    "bg": "/scene/ajito.png",
    "showIllust": [
      "Mutsunori_pout3" //驚き
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん！？」"
  },
  {
    "scene": "廃ビルの一室",
    "text": "そこにいたのは、昼間大学で別れたはずの睦典だった。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ああ、よかった……無事だったんだな……っ！」",
    "showIllust": [
      "Mutsunori_happy"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "私の姿を見るなり、睦典は駆け寄り、安心したように肩を掴む。",
  },
  {
    "scene": "廃ビルの一室",
    "text": "監禁、拉致、【キメラ】の襲撃……あまりにも非現実的な出来事が続いていたせいか、見慣れた彼の顔を見た瞬間、張り詰めていた心が少しだけ緩んだ。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「はぁ……」",
    "showIllust": [
      "Mutsunori_happy2",
      "Nagisa_neutral4"
    ],
    "bgm": "serious_1.mp3"
  },
  {
    "scene": "廃ビルの一室",
    "text": "その空気を壊すように、背後から大きなため息が響く。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「お前……！ なんでここにいるんだよ」",
    "showIllust": [
      "Mutsunori_serious"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "睦典が振り返ると、そこには凪砂さんがいた。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「運命だよ。お前とは違ってね」"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「お前……ッ！」"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はいはい、喧嘩は後です」",
    "showIllust": [
      "Mika_serious3",
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "二人の間に、ミカくんが割って入る。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「そんなことより、今後のことを考えましょう」"
  },
  {
    "scene": "廃ビルの一室",
    "text": "その冷静な声に、睦典も凪砂さんも一度口を閉ざした。けれど、私にはまだ分からないことが多すぎた。",
    "hideIllust": [
      "Mutsunori",
      "Nagisa",
      "Mika"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん……どうして私が連れ去られた場所が分かったの？ それに、どうしてムッちゃんがここに……？」"
  },
  {
    "scene": "廃ビルの一室",
    "text": "少しの沈黙の後、ミカくんが答える。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「睦典先輩に頼まれたからです。『朔良と連絡が取れない』って」",
    "showIllust": [
      "Mika_neutral4"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……ムッちゃんが？」"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「俺、睦典先輩の店の常連なんです。それで相談を受けました」 "
  },
  {
    "scene": "廃ビルの一室",
    "text": "睦典が申し訳なさそうに口を開く。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「大学で別れてから何度連絡しても返事がなくて……嫌な予感がしたんだ。だから、たまたま店に来ていたミカに相談した。アイツが裏のツテを使って、お前のスマートフォンの電波から居場所を割り出してくれたんだよ」",
    "showIllust": [
      "Mutsunori_serious2"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「俺は何かあった時の待機係として、ミカにここを教えられて待ってたんだ」"
  },
  {
    "scene": "廃ビルの一室",
    "text": "睦典は悔しそうに拳を握る。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「でも、外が急にあんなことになって……動けなくなった。本当に、無事でよかった……」"
  },
  {
    "scene": "廃ビルの一室",
    "text": "二人が私のために動いてくれていた。その事実に、凍っていた心が少しずつ温まっていく。\nそんな私たちを見ていた凪砂さんが、壁から背を離した。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「へぇ。バカ同士の連携プレイってわけね。でも、一番大事なことを忘れてない？」",
    "showIllust": [
      "Nagisa_neutral3"
    ],
    "hideIllust": [
      "Mutsunori",
      "Mika"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "凪砂さんはスマホを取り出し、画面をこちらへ向ける。",
    "bgm": "stop"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "アナウンサー",
    "text": "『現在、〇〇区を中心に正体不明の巨大生物が多数出現しています！ 防衛班も対応していますが、街は危険な状態です！』",
    "bgm": "+alert.mp3",
    "bgmVolume": 0.3,
    "bgmFade": 1.5,
    "showItem": "/item/phone_news.png"
  },
  {
    "scene": "廃ビルの一室",
    "text": "画面に映っていたのは、炎と瓦礫に包まれた街の姿だった。街そのものが、【キメラ】によって崩壊している。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「これで分かっただろ。——もう、この世界は安全じゃない」",
    "clearItem": true,
    "bgm": "stop",
    "bgmFade": 2
  },
  {
    "scene": "廃ビルの一室",
    "text": "凪砂さんが静かに告げる。戻れると思っていた日常は、もうそこにはなかった。重苦しい沈黙が部屋を包む。その時。 "
  },
  {
    "scene": "廃ビルの一室",
    "bgm": "Phone.mp3",
    "hideIllust": [
      "Nagisa"
    ],
    "hideWindow": true
  },
  {
    "scene": "廃ビルの一室",
    "text": "ミカくんのスマホが鳴った。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……ヒルミ教授からです」",
    "showIllust": [
      "Mika_neutral3"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "ミカくんが通話に出る。",
    "bgm": "stop",
    "bgmFade": 1
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "『ミカ、朔良は救出できたか？』",
    "bgm": "serious_2.mp3",
    "bgmVolume": 0.15
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はい。今、廃ビルにいます。それより外の状況が──」",
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "『話は後だ。すぐに大学の研究室へ来なさい』"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「どういうことですか？」",
    "showIllust": [
      "Mika_surprise"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "『私にも詳しいことは分からない。ただ……今動けるのは君たちしかいない』"
  },
  {
    "scene": "廃ビルの一室",
    "text": "それだけ告げると、通話は切れた。",
    "se": "CallOut.mp3",
    "bgmVolume": 0.5
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……どうするんだ？」",
    "showIllust": [
      "Mutsunori_serious2" //驚き
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "睦典が不安そうに尋ねる。",
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「行くしかないでしょ。その教授さんのところにね」",
    "showIllust": [
      "Nagisa_neutral4"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「でも、今は危険すぎます」",
    "showIllust": [
      "Mika_serious",
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "ミカくんは慎重に言う。けれど、私は首を横に振った。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……行こう」",
    "hideIllust": [
      "Mutsunori",
      "Mika",
      "Nagisa"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「朔良先輩……」",
    "showIllust": [
      "Mika_surprise3"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「教授も、きっと怖い思いをしながら待ってる。私たちを心配してくれているなら……助けに行きたい」"
  },
  {
    "scene": "廃ビルの一室",
    "text": "怖い。またキメラや男たちに襲われるかもしれない。\nそれでも、ここで動かなければ後悔する。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良がそう言うなら、俺は朔良の盾になる。絶対に指一本触れさせない」",
    "showIllust": [
      "Mutsunori_serious2"
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "睦典が力強く言った。その言葉には、いつもの明るさとは違う強い覚悟が込められていた。"
  },
  {
    "scene": "廃ビルの一室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「それなら、急ぎましょう。今なら、【キメラ】の動きも少し落ち着いています」",
    "showIllust": [
      "Mika_serious3",
    ]
  },
  {
    "scene": "廃ビルの一室",
    "text": "私たちは覚悟を決め、ヒルミ教授の待つ大学へ向かうため、廃ビルを後にした。"
  },
  //=============== アジトを出た後 ===============
  {
    "scene": "崩壊した街",
    "text": "廃ビルを出た私たちを待っていたのは、炎と瓦礫に包まれた街だった。人工月の青白い光の下、あちこちから不気味な咆哮が響いている。",
    "bg": "/scene/town_collapse.png",
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "崩壊した街",
    "text": "──ドンッ！！ ",
    "action": "SHAKE_SCREEN_VERY_LARGE",
    "se": "rock_attack.mp3"
  },
  {
    "scene": "崩壊した街",
    "text": "近くのビルの壁が大きく崩れた。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「来ます！」"
  },
  {
    "scene": "崩壊した街",
    "text": "ミカくんの声。瓦礫の向こうから、巨大な蜘蛛のような姿をした【キメラ】が姿を現す。その瞬間、アジトで見つけた書類の一文が脳裏をよぎった。",
    "showIllust": [
      "kimera43"
    ]
  },
  {
    "scene": "崩壊した街",
    "text": "──『研究所のデータの中で、『歌』の力を持つ者の存在を確認。歌によって対象者の身体能力を向上させることができる』"
  },
  {
    "scene": "崩壊した街",
    "text": "もし、この力が本当に私のものなら。今、この場でみんなを守るために使えるのは……これしかない。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（……やるしかない）",
    "hideIllust": [
      "kimera4 "
    ]
  },
  {
    "scene": "崩壊した街",
    "text": "私は震える手を握りしめ、大声で叫んだ。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「みんな……！！ どうか私の歌に耳を貸してほしいの！！」"
  },
  {
    "scene": "崩壊した街",
    "text": "瓦礫と炎に包まれた街の中に、私の声だけが響き渡る。突然の言葉に、三人の動きが一瞬止まった。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……歌？」",
    "showIllust": [
      "Mutsunori_surprise2", //驚き
      "Mika_surprise3",
      "Nagisa_neutral4"
    ]
  },
  {
    "scene": "崩壊した街",
    "text": "戸惑ったような三人の反応。当然だ。私自身だって、この力が本当に戦いに使えるのか分からない。"
  },
  {
    "scene": "崩壊した街",
    "text": "それでも――。\n私は深く息を吸い、胸の奥に眠る何かを信じるように、ゆっくりと歌声を響かせた。",
    "hideIllust": [
      "Mutsunori",
      "Mika",
      "Nagisa"
    ]
  },
  //=============== 戦闘開始(3回目) ===============
  {
    "action": "TRIGGER_BATTLE_TEAM_VS_KIMERA"
  },
  {
    "scene": "崩壊した街",
    "text": "ある程度のキメラを蹴散らしたところで… ",
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "崩壊した街",
    "text": "（何、これ……身体が、熱い……？）",
    "action": "BLACK_DISTORTION"
  },
  {
    "scene": "崩壊した街",
    "text": "歌の力を使った直後から、身体の奥に異様な熱が広がっていく。【キメラ】たちが放つ異能の残滓が、まるで私の中へ流れ込んでくるような、不気味な感覚だった。視界が歪み、意識が遠のきそうになる。"
  },
  {
    "scene": "崩壊した街",
    "text": "（ダメ……！ ここで倒れたら、みんなの足手まといになる……！）"
  },
  {
    "scene": "崩壊した街",
    "text": "私は頬を叩き、必死に意識を繋ぎ止める。しかし、戦いは終わらなかった。"
  },
  {
    "scene": "崩壊した街",
    "text": "さらに現れた大型の【キメラ】を前に、ミカくんと凪砂さんが迎撃へ向かい、睦典も私を守りながら敵の群れへ立ち向かう。爆音、炎、舞い上がる煙。"
  },
  {
    "scene": "崩壊した街",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「──先輩、こっちです！」",
    "showIllust": [
      "Mika_serious2"
    ]
  },
  {
    "scene": "崩壊した街",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、手を伸ばせ！」",
    "showIllust": [
      "Mutsunori_serious4"
    ]
  },
  {
    "scene": "崩壊した街",
    "text": "聞こえた声に手を伸ばすけれど、目眩で足元が崩れ、私は瓦礫に躓いて倒れ込んでしまう。"
  },
  //=============== 大学(皆とはぐれた後) ===============
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "そして、煙が晴れた時。そこに三人の姿はなかった。",
    "bgm": "stop",
    "bg": "/scene/university_collapse.png",
    "hideIllust": [
      "Mutsunori",
      "Mika"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "（嘘……はぐれちゃった……？）",
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "気づけば私は、崩壊した大学構内で一人きりになっていた。身体の熱と恐怖に耐えながら、ふらふらと歩いた先。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "木々が生い茂る庭園の奥に、青い人工月の光を浴びて佇む人影が見えた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あ」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "そこにいたのは──満だった。"
    //背景　満CG(刺される前)
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「満……！！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "地獄のような有様の中で見つけた、唯一の救い。私は泣き出しそうなのを必死に堪え、彼を目掛けて一心不乱に駆け出した。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "満も私に気づいて、愛おしそうな表情でその両腕を広げてくれる。\nあと数歩で、その温かい胸の中に飛び込める──まさに、その瞬間だった。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "あと数歩で、その温かい胸の中に飛び込める──まさに、その瞬間だった。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "──グサッ。",
    "se": "Slash.mp3",
    "action": "BLOOD_SCREEN"
    //背景　満CG(刺された後)
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "静かな庭園に、嫌な音が響いた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え？」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "目の前の光景を理解できない。満の胸元から、禍々しい黒い剣が突き出していた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "その背後に立っていたのは、漆黒の鎧に身を包んだ異様な存在──【黒騎士】。",
    "bgm": "serious_4.mp3"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……さく、ら……」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "満は最後まで私へ手を伸ばそうとして、そのまま力なく崩れ落ちる。",
    "bg": "/scene/university_collapse.png",
    "action": "CLEAR_BLOOD"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いやあああああっ！！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "駆け寄ろうとした私の身体は、背後から強い力で止められた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "振り返ると、そこにいたのはアジトで私を連れ去った眼帯の大男だった。",
    "showIllust": [
      "Akane_serious3"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「離して……！！ 満が……！！」",
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "必死に抵抗する私をよそに、大男はただ【黒騎士】を睨みつけている。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "その時、煙の向こうからミカくん、睦典、凪砂さんが駆けつけた。",
    "showIllust": [
      "Mika_serious1",
      "Mutsunori_serious2",
      "Nagisa_neutral4"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「朔良先輩！！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良ーー！！……って、誰だよお前！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "睦典が大男へ怒りを向けるが、大男は鋭く言い放つ。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "大男",
    "text": "「そんなことを気にしている場合か」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "その視線の先にいる【黒騎士】。",
    "bgm": "stop ",
    "showIllust": [
      "BlackKnight3"
    ],
    "hideIllust": [
      "Akane",
      "Mutsunori",
      "Mika",
      "Nagisa"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "その圧倒的な存在感に、ミカくんも凪砂さんも警戒を露わにする。満が目の前で奪われた現実を、私は受け止めきれずにいた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "そんな時、ポケットのスマートフォンが鳴る。\n画面に表示された名前は──ヒルミ教授。",
    "se": "Phone.mp3",
    "hideIllust": [
      "BlackKnight"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "震える手で通話に出る。",
    "se": "stop",
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「教授……っ、満が……！」",
    "se": "+pi.mp3"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "『朔良か！？ その黒い鎧の奴……監視カメラで確認した。そいつは……』"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "その瞬間、【黒騎士】がゆっくりと大剣をこちらへ向ける。兜の奥の赤い瞳が、私たちを捉えた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "『──かなり危険な存在かもしれない』"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "教授の冷静な声がスピーカーから漏れた瞬間、【黒騎士】の姿がブレた。",
    "showIllust": [
      "BlackKnight_attack3"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "次の瞬間、爆発するような速度で距離を詰めた【黒騎士】が、大剣を横薙ぎに振り抜く。",
    "action": "SHAKE_SCREEN_EXTREME",
    "bgm": "serious_2"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "大男",
    "text": "「チッ、全員伏せろ！！」",
    "showIllust": [
      "Akane_serious2"
    ],
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "大男が私を抱えたまま後方へ飛び退き、睦典がその身体で衝撃を受け止める。凪砂さんとミカくんも、迫る一撃を間一髪で回避した。",
    "hideIllust": [
      "Akane",
      "BlackKnight"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "振り抜かれた剣は地面や周囲の木々を衝撃波だけで薙ぎ払い、その圧倒的な力に誰もが息を呑む。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "大男",
    "text": "「戦うな！ 走れ！！ 死ぬぞ！！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "大男の声に押され、私たちは満を残したまま、大学構内を全力で駆け出した。背後から響く、鎧の擦れる音。そして、ゆっくりと、けれど確実に迫る【黒騎士】の足音。",
    "bgAnimation": "dash",
    "bgm": "+dash.mp3"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "私は必死に走った。けれど──。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ッ……きゃっ……！！」",
    "action": "SHAKE_SCREEN",
    "bgAnimation": "stumble_zoom",
    "bgm": "stop"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "type": "choice",
    "text": "満のあの光景を思い出して、力が抜けてしまったのかどこかに足を取られてしまい、咄嗟に私は……。",
    "choices": [
      {
        "text": "見知ったを掴んだ",
        "targetLabel": "mutsunori_route_start"
      },
      {
        "text": "小綺麗な服の袖を掴んだ",
        "targetLabel": "nagisa_route_start"
      },
      {
        "text": "焦げあとのある服の袖を掴んだ",
        "targetLabel": "mika_route_start"
      },
      {
        "text": "ひたすら大きな腕に掴まった",
        "targetLabel": "akane_route_start",
        "condition": "akane_route_enabled"
      },
      {
        "text": "誰かに腕を引っ張られる",
        "targetLabel": "mitsuru_route_start",
        "condition": "mitsuru_route_enabled"
      }
    ]
  },
  //========== 睦典ルート==========
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "見知った服の袖を掴んだ。",
    "label": "mutsunori_route_start",
    "bg": "/scene/university_collapse.png"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「──朔良！！」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "action": "SHAKE_SCREEN",
    "text": "強く腕を引かれ、私は睦典の胸の中へ抱きとめられた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん……！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "周囲を見渡すと、凪砂さんも、ミカくんも、あの恐ろしい大男も、混沌としたキャンパスの残骸の中でいつの間にかはぐれてしまっていた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「話は後だ！ アイツが来る！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "bgAnimation": "dash",
    "text": "睦典に手を引かれながら、私たちは教授の研究室へ向かって必死に走った。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "研究室",
    "bg": "/scene/lab.png",
    "bgm": "stop",
    "text": "息を切らしながら研究室へ飛び込むと、睦典が防火扉を閉める。\n室内には無数のモニターが並び、中央には巨大な金属製のハッチが口を開けていた。"
  },
  {
    "scene": "研究室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「はぁ、はぁ……っ、ここまで来れば、流石に、あの化け物も──」",
    "showIllust": [
      "Mutsunori_serious2"
    ]
  },
  {
    "scene": "研究室",
    "text": "睦典が私の肩を抱きながら、激しく上下する胸を押さえていると、革靴の音が部屋に響いた。"
  },
  {
    "scene": "研究室",
    "bgm": "serious_1.mp3",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「よく無事で来たね」",
    "showIllust": [
      "Hirumi_serious4"
    ]
  },
  {
    "scene": "研究室",
    "text": "奥から現れたのはヒルミ教授だった。\n安堵する間もなく、教授はハッチを見据えたまま口を開く。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「説明している時間はない。君たちは今すぐ、このロケットで月へ向かってくれ」",
    "showIllust": [
      "Hirumi_smile"
    ]
  },
  {
    "scene": "研究室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……は？」",
    "showIllust": [
      "Mutsunori_smile" //驚く
    ]
  },
  {
    "scene": "研究室",
    "text": "突然すぎる言葉に、私も睦典も言葉を失う。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「外の怪物も、この世界の異変も、すべては人工月にある『研究所のコア』が原因だ。世界を元に戻したければ、コアを止めるしかない」"
  },
  {
    "scene": "研究室",
    "text": "その言葉を聞いて、男に拉致されたアジトで発見した文言が頭によぎった。"
  },
  {
    "scene": "研究室",
    "text": "『……異能力やキメラの発現には、政府が隠ぺいした人工月が関係している』\n『……その中の、研究所によって守られる“コア”が発生源と仮定されており……』"
  },
  {
    "scene": "研究室",
    "text": "…やっぱりあの文章に書かれていたことは本当のことだった。教授は一冊の資料を私たちへ差し出した。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「詳しいことはそこに書いてある。向こうで読みなさい」"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「教授はどうするんですか！」"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「私のことは心配しなくていい―――さぁ、時間だ」"
  },
  {
    "scene": "研究室",
    "text": "そう言うと教授は迷いなく起動スイッチを押した。"
  },
  {
    "scene": "研究室",
    "action": "SHAKE_SCREEN",
    "se": "+bakuhatsu.mp3",
    "text": "遠くから防壁を叩き割るような凄まじい爆音が響き、研究室全体が大きく揺れた。アイツが、すぐそこまで来ている。\n──黒騎士が、ここまで迫っている。"
  },
  {
    "scene": "研究室",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「もう迷ってる時間はない！ 行こう、朔良！」",
    "showIllust": [
      "Mutsunori_serious"
    ],
    "hideIllust": [
      "Hirumi"
    ]
  },
  {
    "scene": "研究室",
    "text": "睦典に手を引かれ、私はロケットへ続くハッチへ飛び込んだ。"
  },
  {
    "scene": "ロケット内部",
    "bg": "/scene/rocket.png",
    "bgm": "stop",
    "text": "ロケット内部は、無機質な計器と二人分のシートだけが並ぶ狭い空間だった。\n私たちがシートへ座りベルトを締めた瞬間、頭上のハッチが重々しい音を立てて閉まる。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『システム起動。カウントダウン、最終シークエンスへ移行』"
  },
  {
    "scene": "ロケット内部",
    "se": "+rocket_launch.mp3",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL",
    "text": "機械音声と共に機体が激しく震え、ロケットは轟音を上げて人工月へ向かって飛び立った。\n強烈な重力が身体をシートへ押し付ける。窓の外では街の灯りが遠ざかり、青白い人工月だけが大きく迫っていた。"
  },
  {
    "scene": "ロケット内部",
    "se": "stop",
    "action": "CLEAR_SHAKE",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、大丈夫！？ 気分悪くない！？」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "睦典の明るい声とは裏腹に、その横顔は緊張で青ざめていた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私は平気。ムッちゃんこそ大丈夫？」"
  },
  {
    "scene": "ロケット内部",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「俺も平気平気！」",
    "showIllust": [
      "Mutsunori_happy"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "そう笑ったあと、睦典は肩をすくめる。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「それにても教授、いきなり『月へ行け』なんて無茶苦茶だよな。レポートじゃないんだからさ」",
    "showIllust": [
      "Mutsunori_pout"
    ]
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ふふ……確かに」"
  },
  {
    "scene": "ロケット内部",
    "text": "張り詰めていた空気が少しだけ和らぐ。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「帰ったら特製うどん作ってやるよ。だから、ちゃんと帰ろう」",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うん。約束だよ」"
  },
  {
    "scene": "ロケット内部",
    "text": "その言葉に、私の胸の緊張が少しだけ解けた。\n──その瞬間だった。"
  },
  {
    "scene": "ロケット内部",
    "action": "RED_ALERT_FLASH",
    "bgm": "+alert_Rocket.mp3",
    "text": "ピピピピピッ！！",
    "showIllust": [
      "Mutsunori_happy" //驚く
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "機内にけたたましい警報が鳴り響く。"
  },

  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『警告。推進システムに致命的なエラー。機体の制御が不可能です』"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「えっ……！？」"
  },
  {
    "scene": "ロケット内部",
    "text": "身体がふわりと浮き、ロケットが大きく傾く。\n窓の外では青い月が激しく回転し、機体全体が悲鳴のような金属音を上げ始めた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「う、嘘だろ……！」"
  },
  {
    "scene": "ロケット内部",
    "action": "SHAKE_SCREEN_EXTREME",
    "text": "ガガガガガッ！！",
    "se": "Rocket_Shock.mp3"
  },
  {
    "scene": "ロケット内部",
    "text": "激しく揺れる機体の中、私は迫る死の恐怖に息を呑むことしかできなかった。"
  },
  //============== 墜落後 ===============
  {
    "scene": "ロケット内部",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……朔良！」",
    "hideIllust": [
      "Mutsunori"
    ],
    "se": "stop",
    "bgm": "stop",
    "action": "FADE_TO_BLACK",
    "bg": "black",
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "ロケット内部",
    "text": "激しい耳鳴りの向こう側で、遠くから誰かが必死に名前を呼んでいる。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「目を覚まして……！」"
  },
  {
    "scene": "ロケット内部",
    "text": "頬を叩く温もりと焦燥に駆られたその声に導かれ、私はゆっくりと目を開けた。"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "action": "WAKE_UP",
    "bg": "/scene/rocket_collapse.png",
    "text": "視界に映ったのは、ひしゃげた計器と火花を散らすロケット内部だった。コックピットを包むのは、不気味なほどの静寂と、どこか鉄の匂いが混ざった冷たい空気。"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ここは……」"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「よかった……！ ああ、本当によかった……っ！」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "私の意識が戻ったのを見て、睦典が心の底から安堵したように息をつく。"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あんな風に落ちたのに……私、生きてるの？」"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "恐る恐る身体を確かめる。かすり傷はあるものの、大きな怪我はない。"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……奇跡、だよ。あんな風に落ちたのに、二人ともかすり傷で済むなんてさ」",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "睦典は笑うが、彼の額からはタラリと冷や汗が流れていて、その笑顔はどこか無理に作ったもののようにも見えた。"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ここにいても危ない。外へ出よう」"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "歪んだハッチを押し開け、彼が手を差し伸べる。私はその手を握り、機体の外へと降り立った。"
  },
  {
    "scene": "月面",
    "bgm": "Moon.mp3",
    "bg": "/scene/moon_surface.png",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──っ、何……ここ」",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "月面",
    "text": "目の前に広がっていたのは、見慣れた街でも大学でもなかった。\n白く乾いた大地。その上には風化した巨大な廃墟が果てしなく続いている。"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……本当に、月まで来たのか？」",
    "showIllust": [
      "Mutsunori_happy3" //驚く
    ]
  },
  {
    "scene": "月面",
    "text": "睦典が呆然と呟く。\n呼吸はできる。けれど、この世界には生命の気配がまるでない。"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……朔良、あれ」"
  },
  {
    "scene": "夜空（月）",
    "bg": "/scene/yellow_moon.png",
    "text": "彼が指差した先には、青い人工月ではない、柔らかな黄金色に輝く月が静かに浮かんでいた。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "夜空（月）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「黄色い……月……」"
  },
  {
    "scene": "夜空（月）",
    "text": "ずっと伝説だと思っていた、本物の月。人工の光に汚されていない、柔らかい光を放つその姿に、私の胸は震えた。"
  },
  {
    "scene": "夜空（月）",
    "text": "…お父さんの話は、本当だった。"
  },
  {
    "scene": "夜空（月）",
    "text": "…きっと世界の真実も、お父さんの行方も、この先にある。そんな漠然とした予感だけが私の頭を駆け巡る。"
  },
  {
    "scene": "夜空（月）",
    "text": "それに、あの地球の惨劇を止めるのも私たちの行動次第なのだと思う。…怖い、だけど進まなきゃいけない。"
  },
  {
    "scene": "月面",
    "bg": "/scene/moon_surface.png",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ねぇ、ムッちゃん……」"
  },
  {
    "scene": "月面",
    "bgm": "stop",
    "text": "決意を固めるために、私は隣に立つ彼に声をかけた。"
  },
  {
    "scene": "月面",
    "bgm": "stop",
    "text": "だけど、返事がない。\n隣を見ると、睦典は虚空を見つめたまま、微動だにしていなかった。顔を覗き込んだ瞬間、息を呑む。さっきまでの彼とは別人のように顔色は青白く、生気のない瞳がどこか遠くを見つめていた。",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },

  {
    "scene": "月面",
    "bgm": "Moon.mp3",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……え？ どうかした、朔良」",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "月面",
    "text": "瞬きをした途端、彼はいつもの明るい笑顔に戻る。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ううん。行こう」"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「おう！ さっさとコアってやつを止めに行こうぜ！」",
    "showIllust": [
      "Mutsunori_happy"
    ]
  },
  {
    "scene": "月面",
    "text": "何事もなかったように歩き出す睦典の背中を見つめながら、私は胸の奥の違和感を拭えなかった。\n……何かを隠している。そんな不安だけが、小さく残った。"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……でも、コアを止めるって言われても、肝心の説明が足りないよな」",
    "showIllust": [
      "Mutsunori_pout"
    ]
  },
  {
    "scene": "月面",
    "text": "その言葉で思い出し、私はポケットから教授に渡された手記を取り出した。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あった。ムッちゃん、これ」"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「そういや教授が渡してたやつか。何か書いてあるのか？」"
  },
  {
    "scene": "月面",
    "text": "二人で紙を広げる。"
  },
  {
    "scene": "月面",
    "type": "choice",
    "text": "手記の内容を確認しますか？",
    "choices": [
      {
        "text": "確認する",
        "targetLabel": "read_professors_note1"
      },
      {
        "text": "スキップする",
        "targetLabel": "skip_professors_note1"
      }
    ],
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "label": "read_professors_note1",
    "scene": "月面",
    "text": "教授の手記には、研究所の最奥にある『コア』が【キメラ】の発生源であること、そしてそこへ辿り着くには、研究所各地に散らばる《セキュリティ解除コードの断片（フラグメント）》をすべて回収する必要があると書かれていた。",
    "showItem": "/item/Message.png",
    "se": "+paper.mp3"
  },
  {
    "scene": "月面",
    "role": "PROFESSOR",
    "text": "裏面には研究所の簡易マップと、フラグメントの配置図が記されている。"
  },
  {
    "scene": "月面",
    "text": "さらに最後のページには、教授からの注意書きが残されていた。"
  },
  {
    "scene": "月面",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "『コアは物理的には破壊できない。適応者の異能を限界まで流し込み、停止させるしかない』 \n『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』"
  },
  {
    "label": "skip_professors_note1",
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「つまり……フラグメントを集めて、コアを止めて、地下のロケットで逃げろってことか。よし！やることは決まったな」"
  },
  {
    "scene": "月面",
    "text": "睦典は手記を畳み、軽く肩を回した。"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「──行こう、朔良」",
    "hideItem": true,
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「うん」"
  },
  {
    "scene": "月面",
    "text": "返事をしながら彼の横顔を見る。…やっぱりさっきまでよりも、また少し顔色が悪い。青白い頬。どこか焦点の合わない瞳。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん、大丈夫？」"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「え？ ああ、大丈夫、大丈夫！」",
    "showIllust": [
      "Mutsunori_happy"
    ]
  },
  {
    "scene": "月面",
    "text": "私の視線に気付くと、睦典はいつもの調子で笑ってみせる。"
  },
  {
    "scene": "月面",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「こんなところで立ち止まってる方が危ないだろ？ 早く終わらせて帰ろう」",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……そうだね」"
  },
  {
    "scene": "月面",
    "text": "笑顔はいつも通りだった。けれど胸の奥に残る違和感だけは、どうしても消えなかった。 "
  },
  {
    "scene": "月面",
    "text": "私たちは手記をしまい、不気味な静寂に包まれた研究所へ歩みを進めた。"
  },
  //=============== 研究所の入口 ===============
  {
    "scene": "研究所入口",
    "text": "研究所の入り口へ辿り着いた私たちは、目の前に広がる巨大な施設を見上げた。不気味な静寂に包まれ、警告灯だけが赤く明滅している。",
    "bg": "/scene/lab_entrance.png",
    "bgm": "stop"
  },
  {
    "scene": "研究所入口",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「行こう、朔良。コアを止めて、この世界を元に戻すんだ」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "研究所入口",
    "text": "睦典の言葉に頷き、私たちはフラグメントが眠る研究所内部へと足を踏み入れた。",
  },
  //=============== 研究所内部 ===============
  {
    "scene": "フラグメントコレクト",
    "action": "TRIGGER_FRAGMENT_COLLECT",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──よしっ、これで最後のデータチップ、回収完了！」",
    "bg": "/scene/Lab_corridor.png"
  },
  {
    "scene": "廊下",
    "text": "制御端末から最後のフラグメントを抜き取り、私は大きく息を吐いた。"
  },
  {
    "scene": "廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「やったな、朔良。これで最奥のゲートが開けるはずだ」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "廊下",
    "text": "振り返った瞬間、私は眉をひそめる。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ムッちゃん」"
  },
  {
    "scene": "廊下",
    "text": "やっぱり、顔色が悪い。"
  },
  {
    "scene": "廊下",
    "text": "よく見ると、地球でもあんな惨劇に見舞われてたはずなのに、睦典の身体には傷一つ残っていない。けれど、その代わりに彼の表情はどんどん青ざめていた。"
  },
  {
    "scene": "廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「大丈夫だって。俺、昔から丈夫だからさ」",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "廊下",
    "text": "そう笑うけれど、その声にはいつもの力がない。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……本当に？」"
  },
  {
    "scene": "廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ほら、それより早く行こう。コアを止めないと」"
  },
  {
    "scene": "廊下",
    "text": "睦典はそう言って歩き出す。その背中を見つめながら、私は胸の奥に小さな不安を抱えた。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "廊下",
    "text": "その時だった。",
    "bgm": "stop"
  },
  {
    "scene": "廊下",
    "se": "+jishin.mp3",
    "action": "SHAKE_SCREEN",
    "text": "──ゴゴゴゴ……。"
  },
  {
    "scene": "廊下",
    "text": "研究所全体が大きく揺れる。"
  },
  {
    "scene": "廊下",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『警告。侵入者排除システムを起動します』"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "廊下",
    "bgm": "serious_2.mp3",
    "text": "閉ざされていた隔壁が開き、その奥から巨大な防衛個体が姿を現した。",
    "showIllust": [
      "machine4"
    ]
  },
  {
    "scene": "廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……まだ、こんなのが残ってたのかよ」",
    "showIllust": [
      "Mutsunori_serious2"
    ]
  },
  {
    "scene": "廊下",
    "text": "睦典が私の前に立つ。"
  },
  {
    "scene": "廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、下がってて」"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この先に進むためには、こいつを倒すしかない……！）"
  },
  //===============　戦闘開始(睦典中ボス) ==============
  {
    "scene": "中ボス(睦典)",
    "action": "TRIGGER_BATTLE_MIDBOSS_MACHINE"
  },
  {
    "scene": "廊下",
    "bgm": "stop",
    "text": "崩れ落ちた防衛個体を見つめながら、私は息を整える。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……終わった」"
  },
  {
    "scene": "廊下",
    "text": "だけど、安心する暇はなかった。\n隣に立つ睦典の顔色は、戦闘前よりさらに悪くなっている。",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん……」"
  },
  {
    "scene": "廊下",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……大丈夫。ほら、行こう」"
  },
  {
    "scene": "廊下",
    "text": "彼は笑って誤魔化す。でも、その笑顔の奥にある違和感は、もう隠しきれていなかった。"
  },
  {
    "scene": "廊下",
    "text": "追求したいのはやまやまだけど、とにかく今は進まないといけない。私たちは重い足取りで無言のままゲートへと向かった。"
  },
  {
    "scene": "ゲート前",
    "text": "巨大なゲートの前にたどり着く。\n中央には、集めたフラグメントを差し込むためのスロットがあった。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "ゲート前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ここ、だね……」"
  },
  {
    "scene": "ゲート前",
    "text": "私は手元のチップを握りしめる。"
  },
  {
    "scene": "ゲート前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この扉の向こうに、コアがある）"
  },
  {
    "scene": "ゲート前",
    "text": "最後の決意を固め、私はゆっくりとフラグメントを差し込んだ。"
  },
  {
    "scene": "コア部屋",
    "bgm": "CoreBGM.mp3",
    "text": "そこは、研究所の最深部。",
    "bg": "/scene/core.png"
  },
  {
    "scene": "コア部屋",
    "text": "壁面がガラス張りになっており、そこから差し込む「本当の月の光」を浴びて、それは宙に浮かんでいた。"
  },
  {
    "scene": "コア部屋",
    "text": "──『コア』。"
  },
  {
    "scene": "コア部屋",
    "text": "心臓のように脈打つそれからは、周囲を震わせるほどの莫大なエネルギーが放たれている。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これが……コア……」"
  },
  {
    "scene": "コア部屋",
    "text": "呆然と立ち尽くす私の隣で、睦典が拳を握りしめた。",
    "showIllust": [
      "Mutsunori_serious2"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「これを止めれば……世界は元に戻るんだよな」"
  },
  {
    "scene": "コア部屋",
    "text": "その横顔は、もう隠しきれないほど青ざめていた。"
  },
  {
    "scene": "コア部屋",
    "text": "私は教授の手記に書かれていた言葉を思い出す。"
  },
  {
    "scene": "コア部屋",
    "text": "『コアを停止させるには、適応者の異能を限界以上まで注ぎ込む必要がある』"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ムッちゃん」"
  },
  {
    "scene": "コア部屋",
    "text": "私は一歩前へ出る。\n私には歌の力がある。もしかしたら、私にも何かできるかもしれない。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私が……やってみる」"
  },
  {
    "scene": "コア部屋",
    "text": "けれど、睦典は静かに首を振った。",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良。お前の力は、こんな風に無理やり壊すためのものじゃない」"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「でも……！」"
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「大丈夫だよ」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "睦典は優しく笑う。"
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「俺に任せてくれ」"
  },
  {
    "scene": "コア部屋",
    "se": "+CoreCharge_Sound.mp3",
    "action": "MONOCHROME_FLASH",
    "text": "そう言って、彼はコアへ手を伸ばした。\n次の瞬間、睦典の身体から溢れた光がコアへ流れ込む。"
  },
  {
    "scene": "コア部屋",
    "bgm": "stop",
    "text": "──しかし。"
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……っ、あれ……？」",
    "showIllust": [
      "Mutsunori_pout3" //驚き
    ]
  },
  {
    "scene": "コア部屋",
    "action": "clear"
  },
  {
    "scene": "コア部屋",
    "action": "BLACK_ENERGY",
    "text": "コアに注ぎ込んだはずのエネルギーが、まるで拒絶反応を起こしたかのように暴走し、逆に睦則の体内へとなだれ込んでいく。"
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「が……あああああっ！！」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん！！」"
  },
  {
    "scene": "コア部屋",
    "text": "睦典の身体が崩れ落ちる。今まで彼を蝕んできた負荷が、限界を超える速度で彼自身を削っていく。"
  },
  {
    "scene": "コア部屋",
    "action": "SHAKE_SCREEN",
    "se": "+bakuhatsu.mp3",
    "text": "──ドォォォンッ！！",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "その時、轟音と共に天井が崩れ、煙の向こうから漆黒の甲冑を纏った異形が姿を現す。",
    "showIllust": [
      "BlackKnight3"
    ]
  },
  {
    "scene": "コア部屋",
    "bgm": "Battle1.mp3",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……黒騎士……っ」"
  },
  {
    "scene": "コア部屋",
    "text": "最悪のタイミングで現れた敵を前に、私は動けなかった。\n黒騎士が大剣を構える。",
    "showIllust": [
      "BlackKnight_attack"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「逃げろ……朔良……！」"
  },
  {
    "scene": "コア部屋",
    "text": "睦典が震える身体を起こそうとする。けれど、刃は容赦なく振り下ろされた。"
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「──朔良！！」"
  },
  {
    "scene": "コア部屋",
    "action": "RED_FLASH",
    "se": "attack_3.mp3",
    "bgm": "stop",
    "text": "次の瞬間、私は強い力で突き飛ばされる。床に倒れ込み、顔を上げた先には──。",
    "hideIllust": [
      "BlackKnight"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ」",
    "showIllust": [
      "BlackKnight_attack3",
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "私を庇い、刃を受けた睦典の姿があった。けれどーーーーー。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……嘘……」"
  },
  {
    "scene": "コア部屋",
    "text": "深い傷は、みるみるうちに塞がっていく。それはもう、「丈夫」なんて言葉では説明できない異常な回復だった。"
  },
  {
    "scene": "コア部屋",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……走れ、朔良……こっちだ…！」",
    "hideIllust": [
      "BlackKnight"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "睦典は私の手を掴むと、傷など最初からなかったかのような力で走り出した。"
  },
  {
    "scene": "瓦礫裏",
    "text": "黒騎士の追撃をかわし、私たちは崩落を免れたサーバーラックの隙間へと滑り込む。\n荒い呼吸だけが、狭い空間に響いていた。",
    "hideIllust": [
      "Mutsunori"
    ],
    "bg": "/scene/Rubble.png"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん……今の……」"
  },
  {
    "scene": "瓦礫裏",
    "text": "私は震える手で、彼の服の破れた部分に触れる。確かに刃を受けたはずなのに、そこには傷跡ひとつ残っていなかった。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……驚いたよな」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "瓦礫裏",
    "bgm": "serious_3.mp3",
    "text": "睦典は壁にもたれ、その場に座り込む。傷は消えている。"
  },
  {
    "scene": "瓦礫裏",
    "text": "けれど、彼の顔色は先ほどよりもさらに悪く、額には冷たい汗が浮かんでいた。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「俺の異能……これなんだ」"
  },
  {
    "scene": "瓦礫裏",
    "text": "睦典は力なく笑う。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「どんな傷でも、すぐに元通りになる。不死身みたいなもんだよ。でも……」"
  },
  {
    "scene": "瓦礫裏",
    "text": "彼は自分の頭に触れる。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「代わりに、治るたびに少しずつ削れていく」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「削れるって……何が……？」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「記憶、だよ」",
    "showIllust": [
      "Mutsunori_serious"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "その言葉に、胸が締め付けられた。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「傷を治すために、身体だけじゃなくて……俺の中身まで使われるんだ」"
  },
  {
    "scene": "瓦礫裏",
    "text": "睦典は震える声で続ける。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「もう、家のうどんの味も、親父の顔も……思い出せない」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな……」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ずっと、朔良のことだけは忘れないって思ってた」"
  },
  {
    "scene": "瓦礫裏",
    "text": "彼は苦しそうに笑った。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「でも今は……それすら、消えていきそうで怖いんだ」"
  },
  {
    "scene": "瓦礫裏",
    "text": "遠くから、黒騎士の足音が響く。死の気配が、少しずつ近づいていた。",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  //ここから続きだよ～
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな……っ！ 嘘だよ、ムッちゃん……！」"
  },
  {
    "scene": "瓦礫裏",
    "text": "私のために、彼の記憶や自我が少しずつ削れていたなんて。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「逃げて、朔良……っ！ 俺が……君を傷つける前に……早く……！」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "睦典は涙を流しながら叫ぶ。その瞳からは、少しずつ光が失われていた。"
  },
  {
    "scene": "瓦礫裏",
    "text": "その瞬間、道中で見た機密データの最後の一文が脳裏をよぎる。",
    "bgm": "stop"
  },
  {
    "scene": "瓦礫裏",
    "text": "──【…でももし、適応者の精神を繋ぎ止める方法があるとしたら…。それはきっと、『強い感情的な結びつきによる同調』なのかもしれない。】"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……そういうことだったんだ」"
  },
  {
    "scene": "瓦礫裏",
    "text": "私は理解した。\n私にできることがある。ムッちゃんを、この世界に繋ぎ止められるのは──私しかいない。"
  },
  {
    "scene": "瓦礫裏",
    "text": "「ガ……アアアアッ！！」",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "睦典の身体から紫黒色の霧が溢れ、異形へと変わり始める。黒騎士もまた、瓦礫を踏み砕きながらこちらへ迫っていた。それでも、もう怖くなかった。",
    "bgm": "Battle2.mp3",
    "bgmVolume": 0.3,
    "action": "BLACK_AURA_START"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「逃げない」"
  },
  {
    "scene": "瓦礫裏",
    "text": "私はサーバーラックの影から飛び出し、睦典の胸へ飛び込む。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「な、にして……っ！ 離れろ、朔良……！」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "苦しげに伸ばされた手を、それでも私は離さなかった。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「忘れるなんて、絶対に許さない……！」"
  },
  {
    "scene": "瓦礫裏",
    "text": "彼の胸に顔を埋め、涙をこらえながら叫ぶ。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「うどんの味も、大学で過ごした時間も、全部私が覚えてる！ だから……自分の名前も、私のことも、勝手に諦めないでよ……！」",
    "action": "WHITE_FLASH"
  },
  {
    "scene": "瓦礫裏",
    "text": "その瞬間──。私の身体の奥から、眩い光が溢れ出した。",
    "showIllust": [
      "Mutsunori_pout" //驚く
    ],
    "action": "BLACK_AURA_STOP"
  },
  {
    "scene": "瓦礫裏",
    "text": "温かな光は睦典を包み込み、彼を蝕んでいた霧と、失われかけていた精神の摩耗を静かに消し去っていく。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……あ……朔良……？」"
  },
  {
    "scene": "瓦礫裏",
    "text": "睦典の瞳に、いつもの光が戻る。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……………お待たせ、朔良。もう、大丈夫」",
    "showIllust": [
      "Mutsunori_smile"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "彼は弱々しく笑いながら、それでも確かな足取りで立ち上がった。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "彼の身体から溢れる力は、先ほどまでの不安定なものとは違う。澄んだ光を纏った、強く穏やかなエネルギーだった。",
    "bg": "/scene/core_hakai1.png",
    "hideIllust": [
      "Mutsunori"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "精神の拠り所である私との同調によって、睦典の異能は完全に制御されている。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "もう、力を使うたびに記憶が削れることはない。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "黒騎士",
    "text": "「ギ……ギギ……」",
    "showIllust": [
      "BlackKnight4"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "その変化を察知したのか、黒騎士が不気味な音を響かせながら大剣を構える。",
    "showIllust": [
      "BlackKnight_attack"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典は私の手を強く握った。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、俺の目になってくれ」",
    "showIllust": [
      "Mutsunori_smile2"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "いつものような、少しだけふざけた笑顔。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「二人で、あいつを倒そう」",
    "showIllust": [
      "Mutsunori_happy"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うん！」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "私は頷く。黒騎士との最後の戦いが、始まった。"
  },
  //===============　戦闘開始(睦典ラスボス) ===============
  {
    "scene": "ラスボス(睦典)",
    "action": "TRIGGER_BATTLE_FINAL_MUTSUNORI"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "勝負は決した──そう思った、次の瞬間。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "黒騎士",
    "text": "「──チッ」",
    "showIllust": [
      "BlackKnight4"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "黒騎士は残った力を振り絞り、私たちではなく研究所の巨大な支柱へ拳を叩き込んだ。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "轟音と共に天井が崩れ落ち、舞い上がった月砂と粉塵が視界を覆う。",
    "action": "SHAKE_AND_SMOKE",
    "se": "+bakuhatsu.mp3",
    "bgmVolume": 0.2,
    "clearIllust": true
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「朔良、大丈夫か！？」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典が咄嗟に私を庇う。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "やがて煙が晴れた時、そこに黒騎士の姿はなかった。残されていたのは、破壊された壁の向こうへ続く不気味な足跡だけ。",
    "bg": "/scene/core_escape.png",
    "action": "CLEAR_SMOKE"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「逃げたか……でも、今は追ってる場合じゃなさそうだ」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典が振り返る。その先で、『コア』は制御を失い、狂ったように脈動していた。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……いよいよ、本番だな」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典が静かに息を吐く。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "手記にあった通り、コアを止めるには異能の力を限界まで注ぎ込み、強制停止させるしかない。でも、さっきはそれで睦典が壊れかけた。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ムッちゃん」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "不安が胸をよぎった瞬間、彼は私の手を握る。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「大丈夫。さっきは一人だった。でも、今は朔良がいる」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典はまっすぐ私を見る。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「俺の力を全部注ぎ込む。暴走しそうになったら……お前が支えてくれ」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うん！」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "私は強く頷いた。二人でなら、きっとできる。私たちは光を放つコアへ手を伸ばす。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「いくぞ、朔良……！」",
    "bgmVolume": 0.3,
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "ブゥゥゥンッ──！！",
    "action": "WHITE_PULSE_START",
    "se": "+CoreCharge_Sound.mp3"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "触れた瞬間、眩い光と共に、莫大なエネルギーがコアへ流れ込む。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "しかし──。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ぐっ……あああああっ！！」",
    "action": "WHITE_PULSE_MID"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "コアの拒絶反応が、睦典へ逆流する。身体を蝕む負荷に、彼の表情が歪む。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「させない……！」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "私は睦典の背中に手を回し、必死に彼を支えた。押し寄せる暴走した力を受け止めながら、私は震える声で歌う。",
    "action": "WHITE_PULSE_HIGH"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典の光と、私の光が重なっていく。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「これで……終わりだぁぁぁっ！！」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "睦典が最後の力を振り絞り、コアの奥へ全ての力を叩き込む。次の瞬間──。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "se": "+window_break.mp3",
    "action": "WHITE_OUT_START",
    "bgm": "stop"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "コアを形成していたエネルギーが光の粒子となって霧散し、隔離領域を包んでいた不気味な紫色の光が、潮が引くように消えていく。",
    "clearIllust": true
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "視界を覆っていた眩い光がゆっくりと収まっていき、私たちの周りには、柔らかな静寂だけが残されていた。",
    "action": "WHITE_OUT_END_VERY_SLOW",
    "bg": "/scene/core_close_Nothing.png"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……終わった、んだな」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "静まり返った部屋の中で、睦典がふらりと私の肩に寄りかかる。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん……っ、私のこと、わかる……？」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "一番怖かった問い。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "もし、この戦いの代償で私のことまで忘れていたら──。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "けれど、睦典は少し驚いたように目を瞬かせると、いつもの笑顔を浮かべた。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「あったり前だろ。朔良を忘れるわけないじゃん。……それよりさ、なんか急に腹減ってきた」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ムッちゃん……！」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "その言葉に、張り詰めていたものが一気に溢れ出す。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "涙を拭う私に、睦典は優しく空を指差した。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ほら、上見てみろよ」",
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "見上げた先には、隔離領域を覆っていた光が消え、本来の姿を取り戻した宇宙が広がっていた。",
    "hideIllust": [
      "Mutsunori"
    ],
    "bg": "/scene/Moon_Lab.png"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "そこには、青く輝く地球と──柔らかな光を放つ、本当の月。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「綺麗……」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ああ。……これで、やっと帰れるな」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "その言葉を聞きながら、私はポケットに残っていた教授の手記の最後のページを開く。"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "――『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』",
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "直後、地面が大きく揺れ始めた。",
    "action": "SHAKE_SCREEN",
    "se": "+bakuhatsu.mp3",
    "bgm": "+alert.mp3"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ムッちゃん、急ごう！ ロケットで脱出するって！」"
  },
  {
    "scene": "コア部屋_崩壊①",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ああ、任せろ！」",
    "showIllust": [
      "Mutsunori_serious3"
    ],
    "action": "ALL_FADE_OUT"
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "崩れ落ちる研究所を背に、私たちは最下層の格納庫へ向かう。",
  },
  {
    "scene": "コア部屋_崩壊①",
    "text": "そこにあったのは、地球へ帰るための最後のロケットだった。",
    "bgm": "stop",
    "bg": "/scene/rocket_back.png",
    "action": "FADE_IN"
  },
  {
    "scene": "脱出ロケット",
    "text": "二人で乗り込み、ハッチを閉じる。",
    "se": "+rocket_launch.mp3"
  },
  {
    "scene": "脱出ロケット",
    "text": "轟音と共に機体は月面を離れ、遠ざかっていく研究所の向こうで、青い地球がゆっくりと近づいてくる。"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「地球に帰ったらさ……特製の『ルナ・エネルギーうどん』作ってやるよ」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "脱出ロケット",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ふふ……絶対、おかわりするからね」"
  },
  {
    "scene": "脱出ロケット",
    "text": "行きのロケットでは感じなかった、温かな静寂。"
  },
  {
    "scene": "脱出ロケット",
    "text": "私たちは今度こそ、失った日常へ──青い故郷へと帰っていった。",
    "action": "FADE_TO_BLACK",
    "duration": 4000
  },
  {
    "scene": "空",
    "text": "私たちの日常は、驚くほどあっけなく戻ってきた。",
    "bg": "/scene/sky.png",
    "bgm": "Normal_Morning2.mp3",
    "clearIllust": true
  },
  {
    "scene": "空",
    "text": "教授の手記とデータチップを持ち帰ったことで実習は無事成功。研究所で起きた事件も、政府の対策によって少しずつ収束へ向かっていた。"
  },
  {
    "scene": "空",
    "text": "そして、あの騒動の原因を作ったヒルミ教授はというと──。",
    "bg": "/scene/lab.png"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ",
    "role": "HIRUMI",
    "text": "「いやぁ、まさか本当にコアを止めてくるとはね。実に素晴らしい実習結果だよ」",
    "showIllust": [
      "Hirumi_smile4"
    ]
  },
  {
    "scene": "研究室",
    "text": "いつもの研究室で、何事もなかったかのようにコーヒーを飲んでいた。"
  },
  {
    "scene": "研究室",
    "text": "……あまりにもいつも通りすぎて、怒る気力すら失せてしまう。"
  },
  {
    "scene": "研究室",
    "text": "でも、その姿を見てようやく実感した。私たちは、本当に帰ってきたのだ。",
    "action": "ALL_FADE_OUT",
    "bgm": "stop"
  },
  {
    "scene": "研究室",
    "text": "そして、そんな中変わったことと言えば──。",
    "bg": "/scene/mutsu_inside.png",
    "bgm": "HappyEnd.mp3",
    "action": "FADE_IN",
    "clearIllust": true
  },
  {
    "scene": "店内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「はい、お待ちどうさま！ 当店特製、『ルナ・エネルギーうどん』改め、激ウマ月見うどんです」",
    "showIllust": [
      "Mutsunori_smile3"
    ]
  },
  {
    "scene": "店内",
    "text": "目の前に置かれたのは、湯気の立つお馴染みのうどん。黄金色の出汁の中で、卵黄が綺麗に揺れている。"
  },
  {
    "scene": "店内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「わぁ……！ 美味しそう！」"
  },
  {
    "scene": "店内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「だろ？ 記憶を取り戻すために、親父と一緒に何度も試作したんだから」"
  },
  {
    "scene": "店内",
    "text": "照れくさそうに笑う睦典。もう、月面で見たような青白い顔ではない。そこにいるのは、私の知っている優しい「ムッちゃん」だった。"
  },
  {
    "scene": "店内",
    "text": "異能の力はコアの消滅と共に失われた。でも、その代わりに──彼の記憶がこれ以上失われることもなくなった。"
  },
  {
    "scene": "店内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いただきます」"
  },
  {
    "scene": "店内",
    "text": "箸を取り、うどんを口に運ぶ。\n優しい出汁の味が広がって、胸の奥が温かくなった。"
  },
  {
    "scene": "店内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……美味しい。すごく、美味しいよ、ムッちゃん」"
  },
  {
    "scene": "店内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「よかったぁ」",
    "showIllust": [
      "Mutsunori_happy3"
    ]
  },
  {
    "scene": "店内",
    "text": "睦典は嬉しそうに笑う。"
  },
  {
    "scene": "店内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「……あのさ、うどんの味は思い出せたんだけど」",
    "showIllust": [
      "Mutsunori_serious3"
    ]
  },
  {
    "scene": "店内",
    "text": "そう言って、彼は少し真剣な顔で私の手を取った。月面で握った彼の手は、あんなにも冷たかった。\\nでも今は、確かな温もりが伝わってくる。"
  },
  {
    "scene": "店内",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「俺さ……あの時、何もかも忘れそうになってたけど、朔良だけは絶対に忘れちゃダメだって思ってた」"
  },
  {
    "scene": "店内",
    "text": "睦典は少し照れながら、まっすぐ私を見る。",
    "clearIllust": true
  },
  {
    "scene": "睦則最後CG",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「それがなんでなのか、今なら分かる。———俺、ずっと前から朔良のことが好きだったんだ」",
    "bg": "/character/Mutsunori/Mutsunori_CG2.png",
  },
  {
    "scene": "睦則最後CG",
    "text": "胸が大きく跳ねる。"
  },
  {
    "scene": "睦則最後CG",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「友達だからじゃない。お前を失うことが、一番怖かった」"
  },
  {
    "scene": "睦則最後CG",
    "text": "そう言いながら、睦則は少しだけ不安そうに笑った。"
  },
  {
    "scene": "睦則最後CG",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「これからも、俺の隣にいてほしい。……友達じゃなくて、俺の彼女として」"
  },
  {
    "scene": "睦則最後CG",
    "text": "私は繋いだ手を、強く握り返す。"
  },
  {
    "scene": "睦則最後CG",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ダメなわけないじゃん。私も、ムッちゃんが大好きだよ」"
  },
  {
    "scene": "睦則最後CG",
    "text": "その瞬間、睦典の顔がぱっと明るくなる。"
  },
  {
    "scene": "睦則最後CG",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「よっしゃ……！ じゃあ彼女の特権として、これから毎日俺のうどん食べに来てくれる？」"
  },
  {
    "scene": "睦則最後CG",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「毎日！？…って思ったけど、ムッちゃんのご飯なら美味しいし、毎日でもいいかな」"
  },
  {
    "scene": "睦則最後CG",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「よし、言ったな？ 毎食作るから覚悟しろよ！」"
  },
  {
    "scene": "睦則最後CG",
    "text": "二人で笑い合う。"
  },
  {
    "scene": "睦則最後CG",
    "text": "もう二度と、彼の手が冷たくなることはない。繋いだ手の温もりを確かめながら、私たちは新しく始まる日常へ歩き出した。"
  },
  {
    "scene": "割烹『むつ』",
    "text": "睦典ルート・ハッピーエンド",
    "action": "FADE_TO_HAPPY_END",
    "style": "cinema"
  },

  //=============== 満ルート ===============
  {
    "label": "mitsuru_route_start",
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…ぅわっ……！！」",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "転びそうになったところで、何もないはずの空間から伸びた見えない何かに、グイっと力強く腕を引っ張られた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "人間業とは思えないものすごい速さで引っ張られる。あまりの勢いに押されて前が見えない。風を切り、視界が激しく歪む。",
    "action": "SPEED_EFFECT"
  },
  {
    "scene": "大学内（崩壊）",
    "text": "倒壊しかけた建物の瓦礫を、まるで未来を予知しているかのような正確さでよけながら、あっあっという間にキャンパス内に入り、研究所までの道をたどる。",
    "bg": "/scene/university_hallway_collapse.png"
  },
  {
    "scene": "大学内（崩壊）",
    "text": "混乱と猛スピードの中、でも一瞬、その見えない影の向こうに、私の目の前で剣に貫かれ息絶えたはずの、青年の姿が見えた気がした。"
  },
  {
    "scene": "大学内（崩壊）",
    "text": "（…満……？）"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「——キャッ…！」",
    "action": "CLEAR_SPEED_EFFECT",
    "bg": "/scene/lab.png"
  },
  {
    "scene": "研究室",
    "text": "考える暇もなく、背後の自動扉が閉まる音と共に、私は頑丈な研究所のエントランスへと放り出される。"
  },
  {
    "scene": "研究室",
    "text": "息を切らしながら、必死に命を救って引っ張ってくれた人にお礼を言おうとして、隣を見て—————。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あれ…？」"
  },
  {
    "scene": "研究室",
    "text": "私の隣には誰もいなかった。誰もついてこられるはずのないスピードだった。冷たいコンクリートの床の上に、私の荒い呼吸だけが寂しく響いている。"
  },
  {
    "scene": "研究室",
    "text": "でも今、満がいたような…。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "研究室",
    "text": "網膜に焼き付く、さっきの惨劇。…そんなはずない。満は…私の目の前で黒騎士に殺されたんだ。"
  },
  {
    "scene": "研究室",
    "text": "私は立ち上がることもできず、ただ地べたに座り込んで激しく上下する肩をなだめることしかできなかった。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「やぁ朔良。ご苦労様だ」",
    "bgm": "serious_4.mp3",
    "bgmFade": 1.5,
    "showIllust": [
      "Hirumi_smile"
    ]
  },
  {
    "scene": "研究室",
    "text": "張り詰めた静寂を破り、頭上からかけられたのは、聞き慣れたのんびりとした声だった。"
  },
  {
    "scene": "研究室",
    "text": "驚いて顔を上げると、そこにはいつもの白衣をラフに羽織ったヒルミ教授が立っていた。外の惨状や、私が黒騎士に追われて命からがら逃げてきたことなど、まるで他人事のように、眼鏡の奥の瞳で地べたに座る私を飄々と見下ろしている。"
  },
  {
    "scene": "研究室",
    "text": "そのあまりにいつも通りな様子に、一瞬だけ外の恐怖が遠のくような錯覚を覚えた。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「きょ、教授……！ 外に、黒い鎧を着た化け物みたいな人がいて……！」"
  },
  {
    "scene": "研究室",
    "text": "縋るように声を絞り出す私に、教授は困ったように眉を下げて見せた。だけど、その足は私に駆け寄るでもなく、どこか冷徹な一定の距離を保ったままだ。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「あぁ、知っているよ。だから君をここに呼んだんだ。外はもう安全な場所なんてどこにもないからね」"
  },
  {
    "scene": "研究室",
    "text": "教授はそう言って、ロビーの奥、普段は学生の立ち入りが禁止されている重厚なセキュリティ扉を顎で指した。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「……説明はあまりしていられない、君にはこれからこのロケットに乗って、あの青い月まで行ってもらう」",
    "showIllust": [
      "Hirumi_serious"
    ]
  },
  {
    "scene": "研究室",
    "text": "ヒルミ教授は白衣を翻して立ち上がると、いつものマイペースな口調のまま、デスクの引き出しから鈍く光るカードキーを取り出した。画面に映し出されたのは、学部の地下に極秘裏に建造されていたらしい、巨大な鉄塊──ロケットの姿だった。"
  },
  {
    "scene": "研究室",
    "text": "ヒルミ教授は、私に、あそこの月へ行けって…？"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「わ、私ひとりで、ですか…！？」"
  },
  {
    "scene": "研究室",
    "text": "突然突きつけられた非現実的な命令に、不安からつい声を荒らげてしまう。異能を持たない、ただの大学生の私が、ひとりでロケットに乗って月に行くなんて、そんなの自殺行為に等しい。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「他の子達を待っている時間はない。一刻も争うんだ」"
  },
  {
    "scene": "研究室",
    "text": "感情を削ぎ落としたような教授の声が、無機質な部屋に冷たく響く。その頑なな態度に、私は息を呑みながらデスクの端をぎゅっと握りしめた。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「教授は……？着いて行ってくれないんですか……？」"
  },
  {
    "scene": "研究室",
    "text": "私がそう懇願すると、一瞬、教授の瞳孔だけが見開かれたような気がした。眼鏡の奥の引き結ばれた唇が、微かに震えたようにも見えた。けれど、それは本当に一瞬のことで、教授はすぐにいつもの底の知れない笑みを貼り直した。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「……すまないね、私は他にやることがある。この紙に全ての概要を記したから、よく読んで、慎重に行動しなさい」"
  },
  {
    "scene": "研究室",
    "text": "そう言って教授は、殴り書きのような字がびっしり書かれた数枚の紙を私に手渡す。それを受け取った私の手を、教授は自身の冷えた手で一瞬だけ強く握り、すぐに離した。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「さぁ、行きなさい」"
  },
  {
    "scene": "研究室",
    "text": "教授は躊躇いなくコントロールパネルの起動ボタンを押した。遠くから防壁を叩き割るような凄まじい爆音が響き、研究室全体が大きく揺れた。アイツが、すぐそこまで来ている。"
  },
  {
    "scene": "研究室",
    "text": "─迷っている暇はない。未だに混乱する私の頭を差し置いて、身体はロケットの内部へ向かっていた。"
  },
  {
    "scene": "ロケット内部",
    "text": "ロケットの内部は、無機質な計器類と二人分のシートがあるだけの、狭い空間だった。 私がシートになだれ込み、安全ベルトを締めると同時に、頭上のハッチが金属音を立てて完全に閉鎖される。 重苦しい密閉音が響き、外の音が一切聞こえなくなった。",
    "bg": "/scene/rocket.png"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…………」"
  },
  {
    "scene": "ロケット内部",
    "text": "暗闇の中で、じわじわと冷たい汗が背中を伝っていく。 どうして私がこんな目に遭わなければならないのだろう。"
  },
  {
    "scene": "ロケット内部",
    "text": "満もいない、誰もいない狭い空間で、恐怖のあまり奥歯がガタガタと震え、呼吸の仕方を忘れてしまいそうになる。"
  },
  {
    "scene": "ロケット内部",
    "text": "膝の上に置いた、教授から渡された紙を持つ手は、情けないほどに小刻みに震えていた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『システム起動。カウントダウン、最終シークエンスへ移行』"
  },
  {
    "scene": "ロケット内部",
    "text": "機械的なアナウンスが室内に鳴り響き、足元から、世界がひっくり返るような凄まじい振動が這い上がってきた。 鼓膜を圧迫する強烈なGと、目まぐるしく点滅する計器の光。",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "ロケット内部",
    "text": "私はただ、背後から迫る恐怖から逃れるように、青白い光を放つ人工月へと向かって、轟音と共に地を蹴り上げた。",
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "ロケット内部",
    "text": "──重力の檻が、私の身体をシートに深く叩きつける。窓の外は、一瞬で青い光を放つ夜空へと切り替わり、地上の喧騒がみるみる遠ざかっていく。"
  },
  {
    "scene": "ロケット内部",
    "text": "激しいGと、目まぐるしく流れる光のせいで視界がくらくらする。頭が揺さぶられる感覚のなかで、思い出したくないはずの記憶が、濁流のように脳内に流れ込んできた。"
  },
  {
    "scene": "ロケット内部",
    "text": "満が──私の目の前で、あの鋭い刃で貫かれたときの光景。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……う………」"
  },
  {
    "scene": "ロケット内部",
    "text": "せり上がる生々しい吐き気に襲われ、私は思わず口元を押さえた。胸が苦しくて、まともに息が吸えない。嫌な汗が全身から吹き出す。 とにかく、この最悪なトラウマから意識をそらさなければ。"
  },
  {
    "scene": "ロケット内部",
    "text": "狂いそうな頭を必死に宥めながら、私は視線を泳がせ、ロケットの内部を無理やり目で探索し始めた。"
  },
  {
    "scene": "ロケット内部",
    "text": "機内は全体的に、色んな機材や配線、不気味な計器類などの様々なものでごちゃごちゃと散らかっている。その無機質な空間を必死に見回していると、ふと、端の壁に一枚の写真が貼られているのが見えた。"
  },
  {
    "scene": "ロケット内部",
    "text": "あれは……。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「………………私？」"
  },
  {
    "scene": "ロケット内部",
    "text": "──ピピッ、ピピッ、ピピピピピピピッ！！！",
    "bgm": "alert_Rocket.mp3",
    "bgmFade": 0,
    "action": "RED_ALERT_FLASH"
  },
  {
    "scene": "ロケット内部",
    "text": "その瞬間、鼓膜を突き刺すような、真っ赤な緊急アラームが狭い機内に鳴り響いた。"
  },
  {
    "scene": "ロケット内部",
    "text": "冷酷な機械音声と同時に、フワリと身体が浮き上がるような感覚──重力を失い、ロケットがその推進力を完全に失ったことを意味していた。",
    "action": "SHAKE_SCREEN_EXTREME"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え…っ！？」",
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "ロケット内部",
    "text": "なんで。どうして。私…死んじゃう？ "
  },
  {
    "scene": "ロケット内部",
    "text": "ガガガガガガガッ！！！ と激しく揺れる視界の中、私は、ただ迫り来る死の恐怖に、声を上げることもできず目を見開いた。"
  },
  {
    "scene": "ロケット内部",
    "text": "窓の外では、不気味に回転する青い月が激しくきらめいていた。 世界がひっくり返るような全方位からのGと、摩擦による激しい熱、そして引き裂かれそうな金属音が機体を包み込む。"
  },
  {
    "scene": "ロケット内部(墜落後)",
    "action": "SLOW_FADE_TO_BLACK",
    "duration": 3000,
    "bgm": "stop",
    "bgmFade": 3,
    "stopSe": "Rocket_Shock.mp3"
  },
  {
    "scene": "着陸後",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「————うぅ……」",
    "bg": "/scene/rocket_collapse.png",
    "action": "WAKE_UP"
  },
  {
    "scene": "着陸後",
    "text": "喉の奥から絞り出されたのは、自分のものではないように掠れた呻き声だった。 信じられないほど重い瞼を、拒む身体に鞭打ってどうにか抉るようにして開く。",
    "action": "RED_ALERT_FLASH"
  },
  {
    "scene": "着陸後",
    "text": "網膜に飛び込んできたのは、チカチカと火花を散らす無数の配線と、ひしゃげた計器の残骸、そして視界を白く遮るように立ち込める、焦げ臭いゴムのような不快な煙だった。"
  },
  {
    "scene": "着陸後",
    "text": "ロケットは、落ちたのだ。あの絶望的な落下の衝撃が、私の全身にまだ酷い残像として張り付いている。"
  },
  {
    "scene": "着陸後",
    "text": "身体の芯にジクジクとした鈍い痛みはあれど、なんとか感覚の残る両腕を床につき、力を込めて上体を起こす。 即死してもおかしくない墜落だった。最悪の結末を覚悟しながら、恐怖に震える手で自分の身体のあちこちを触って確認する。"
  },
  {
    "scene": "着陸後",
    "text": "──だが、不思議なことに、血が流れている気配はおろか、皮膚には掠り傷一つついていなかった。服が煤で汚れているだけで、骨が折れている感覚もない。"
  },
  {
    "scene": "着陸後",
    "text": "わけがわからない。けれど、ここに留まっていれば、遠からず煙に巻かれて息が絶えてしまう。\n私はよろよろと大破したロケットの外へと這い出した。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「───っ、何、ここ……」",
    "bg": "/scene/moon_surface.png",
    "action": "CLEAR_RED_ALERT",
    "bgm": "Moon.mp3"
    ,
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "月面",
    "text": "外に足を踏み出した瞬間、私はその光景に息を呑んだ。\nそこは、私がよく知る大学のキャンパスでも、見慣れた街並みでもなかった。"
  },
  {
    "scene": "月面",
    "text": "地面は白く乾いた砂のような岩肌に覆われ、周囲にはいつの時代のものかもわからない、不気味に風化した巨大な建造物の「廃墟」が、墓標のようにどこまでも連なっている。"
  },
  {
    "scene": "月面",
    "text": "そして見上げれば──空には、私たちがさっきまでいたはずの地球が、世界のすべてを支配するかのように異常な大きさで君臨していた。青と白の、息を呑むほど美しい、私の故郷。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「———えっ…！？」",
    "bg": "/scene/yellow_moon.png"
  },
  {
    "scene": "月面",
    "text": "思わず見入ってしまった私だが、地球のすぐ傍らの天体を見て、声を上げた。\nそこには、あの禍々しい青い人工月とは明らかに違う、優しく、けれど圧倒的な存在感を放つ『黄金色の天体』が静かに浮かんでいた。"
  },
  {
    "scene": "月面",
    "text": "教科書や古い資料の中でしか見たことのなかった、本物の月。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「黄色い、月……。嘘、本当に……本当にあったんだ……」"
  },
  {
    "scene": "月面",
    "text": "人工の光に汚されていない、柔らかい光を放つその姿に、私の胸は震えた。ずっとおとぎ話だと思っていた世界の真実が、今、目の前に広がっている。"
  },
  {
    "scene": "月面",
    "text": "お父さんの言っていたことは、本当だったんだ。……お父さん。"
  },
  {
    "scene": "月面",
    "text": "私に課せられた、あまりにも重大な義務。これから向かう場所には、きっと世界の謎も、そして──突然私の前から姿を消した、お父さんの行方の手がかりも眠っているはずだ。",
    "bg": "/scene/moon_surface.png"
  },
  {
    "scene": "月面",
    "text": "だけど…怖い。足が震えるほど怖くて、身動きが取れない。…こんな時。満がいてくれたら…。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…ッ！満……！！」"
  },
  {
    "scene": "月面",
    "text": "弾かれたように叫び、縋るような思いで勢いよく後ろを振り返る。 ──けれど、そこに広がっていたのは、大破したロケットの残骸から立ち上る虚しい黒煙だけだった。"
  },
  {
    "scene": "月面",
    "text": "人影なんて、あるはずがない。私の大好きな幼馴染は、私の目の前で──。"
  },
  {
    "scene": "月面",
    "text": "（…私、やっぱり精神的に参っているのかもしれない）"
  },
  {
    "scene": "月面",
    "text": "恐怖と孤独のあまり、とうとう幻聴まで聞こえるようになってしまったのだろうか。 強く唇を噛み締め、じわりと滲みそうになる涙を必死に引っ込める。"
  },
  {
    "scene": "月面",
    "text": "そこで、私は出発の間際に教授から手渡された、あの数枚の紙のことを思い出した。 慌てて上着のポケットに手を差し入れ、固く握りしめられていたそれを取り出す。"
  },
  {
    "scene": "月面",
    "text": "あれだけの凄まじい墜落の衝撃だったのだ。どこかへ吹き飛んでしまっていたり、無残に破き裂かれていてもおかしくなかった。けれど、奇跡的に私の身体が無傷だったのと同じように、その紙もまた、端が少し折れ曲がっているだけで破れてなどいなかった。"
  },
  {
    "scene": "月面",
    "text": "私はその紙の上の端正な文字を目で追っていく。"
  },
  {
    "scene": "月面",
    "type": "choice",
    "text": "手記の内容を読みますか？",
    "choices": [
      {
        "text": "読む",
        "targetLabel": "read_professors_note"
      },
      {
        "text": "スキップする",
        "targetLabel": "skip_professors_note"
      }
    ]
  },
  {
    "label": "read_professors_note",
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "突然変なことに巻き込んで済まないね、朔良。",
    "showItem": "/item/Message.png"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "口で説明している暇はなかっただろうから、今回の“実習”の概要をここで説明しよう。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "私が手短に話した『コア』についてだが……君が降り立った研究所で、開発が進められていたものだ。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "形状として、白く輝く、手のひらサイズの球体だ。おそらく研究所の最奥―本当の月の光が当たるところに厳重に保管されているはずだ。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "この『コア』によって生み出されるのは、我々の生活を支えるエネルギーだけではない。同時に【キメラ】をも生み出している。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "当然ながら、そんなこと世間は知らない。【キメラ】騒動に関しても、この月との関係は伏せられるだろう。 …本題に入ろう。ではどのように『コア』を止めるか。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "先ほども書いたように『コア』は研究所の最奥に保管されている。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "当然ながら、そこへ至る道中には最高ランクの防衛セキュリティが敷かれているはずだ。 普通に行けば、君は最奥にたどり着く前にシステムに消去されるだろう。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "そこで、この手記の裏面を見てほしい。 私が事前にハッキングして抜き出しておいた、【研究所のセキュリティ解除コードの断片（フラグメント）】のデータ配置図が記載されているはずだ。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "最奥の扉を開くには、君がなんとか、研究所の各エリアに散らばるデータチップ（フラグメント）をすべて『収集』しなければならない。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "最後に、コアの止め方について書き添えておこう。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "あのコアは物理的な破壊は通用しない。外衝撃を与えれば、そのエネルギーが暴走し、この隔離領域ごと君は塵に還るだろう。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "コアを止める方法は唯一つ。エネルギーの「過負荷（オーバーロード）」による強制シャットダウンだ。 適応者の持つ強力な【異能の力】を、コアの許容量を超えるまで力尽くで「注ぎ込む」しかない。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "当然、それには大きなリスクが伴う。くれぐれも、選択を誤らないことだ。"
  },
  {
    "scene": "手記",
    "speaker": "ヒルミ教授の手記",
    "role": "PROFESSOR",
    "text": "健闘を祈るよ。君の輝かしい単位は、この実習の成否にかかっているからね。"
  },
  {
    "scene": "月面",
    "text": "読み終えた瞬間、私の思考は完全に停止した。 不気味なほど静まり返った白い大地の真ん中で、手にした紙が風にカサリと音を立てる。",
    "label": "skip_professors_note",
    "bg": "/scene/moon_surface.png",
    "hideItem": true
  },
  {
    "scene": "月面",
    "text": "（どういうこと……？）"
  },
  {
    "scene": "月面",
    "text": "意味が分からなかった。何度も、何度もその一節を読み返す。けれど、並んだ文字が変わるはずもない。"
  },
  {
    "scene": "月面",
    "text": "（私には異能力なんてないのに……）"
  },
  {
    "scene": "月面",
    "text": "教授が勘違いするのも無理はない。私が無能力者であることは、わざわざ周りの人に言うようなことでもないし、必死に隠して生きてきたのだから。"
  },
  {
    "scene": "月面",
    "text": "ただ問題なのは、私の隠蔽がどうこうではなく、この世界の命運がかかった重大な局面において、完全に「私に異能力がある」という前提で話が進んでしまっているという点だ。"
  },
  {
    "scene": "月面",
    "text": "コアを止める方法がそれしかないのであれば、能力を持たない私がそこへ行ったところで、一体何ができるというのだろう。"
  },
  {
    "scene": "月面",
    "text": "けれど、ここで立ち往生していても仕方がない。このまま何もせずにいれば、地球に戻ることもできず、ただこの乾いた大地で干からびて死ぬだけだ。異能を使わずに『コア』を止められる方法が書いてあるかも。"
  },
  {
    "scene": "月面",
    "text": "私は大きく息を吐き出し、混乱する頭を無理やり切り替えた。とりあえず、手記に書かれていたあの不気味な研究所まで行くしかない。"
  },
  {
    "scene": "月面",
    "text": "私は手記をポケットにしまい直すと、重い足取りで、よろよろと遠くに見える白い建物を目指して歩き始めた。"
  },
  {
    "scene": "月面",
    "action": "TRIGGER_FRAGMENT_COLLECT_SOLO",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "研究所の奧前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──よしっ、これで最後のデータチップ、回収完了」",
    "bg": "/scene/Lab_corridor.png"
  },
  {
    "scene": "研究所の奧前",
    "text": "薄暗い制御室の端末からプラスチックの小さなチップを抜き取り、私は大きく息を吐き出した。手元には、最奥のゲートを開くためのすべてのフラグメントが揃っている。"
  },
  {
    "scene": "研究所の奧前",
    "text": "けれど、さっき端末に表示されたあの実験データを見て、どうしても拭えない違和感を覚えた。"
  },
  {
    "scene": "研究所の奧前",
    "text": "（近づく適応者の異能を、その身に『吸収』する、規格外の能力者の存在――。そんな化け物みたいな人、本当にいるのかな）"
  },
  {
    "scene": "研究所の奧前",
    "text": "…今は考えていても仕方がない。まずは、この先に進まないと。",
    "bg": "/scene/gate.png"
  },
  {
    "scene": "研究所の奧前",
    "text": "私は震える手で、揃えたデータチップをスロットへと差し込んでいく。 カチリ、カチリと、ロックが解除される音が静まり返った空間に響く。 ──この扉の向こうに『コア』がある。"
  },
  {
    "scene": "研究所の奧前",
    "text": "カチリ──。最後のチップが収まり、重厚なゲートがゆっくりと左右に開き始める。\n空気の抜けるような低い音が響き、扉の向こうから、息を呑むほど美しく、そして冷徹な光が溢れ出した。"
  },
  {
    "scene": "研究所の奧",
    "text": "天井の一部がガラス張りになっており、そこから差し込む「本当の月の光」を浴びて、それは宙に浮かんでいた。",
    "bg": "/scene/core.png",
    "bgm": "CoreBGM.mp3"
  },
  {
    "scene": "研究所の奧",
    "text": "白く輝く、手のひらサイズの球体──『コア』。"
  },
  {
    "scene": "研究所の奧",
    "text": "心臓のように不規則に脈打つその球体からは、目に見えないほどの高密度なエネルギーが、波紋のように絶え間なく放出されている。周囲の計器類は狂ったように針を揺らし、部屋全体が微かにブーイングのような唸りを上げていた。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これが……コア……」"
  },
  {
    "scene": "研究所の奧",
    "text": "常識の範疇を遥かに超えるような、神聖で、同時に酷くおぞましい物体を目にして、私は思わずその場に足がすくんでしまった。全身の肌が、ビリビリとした未知のプレッシャーで粟立つ。"
  },
  {
    "scene": "研究所の奧",
    "text": "そして、私は、教授の手記に書かれていたことを思い返す。"
  },
  {
    "scene": "研究所の奧",
    "text": "コアを止める方法は唯一つ。 エネルギーの「過負荷（オーバーロード）」による強制シャットダウンだ。 適応者の持つ強力な【異能の力】を、コアの許容量を超えるまで力尽くで「注ぎ込む」しかない。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……異能の力を、注ぎ込む……」"
  },
  {
    "scene": "研究所の奧",
    "text": "その言葉を何度反芻しても、やはり自分には何もできないという冷酷な事実が突きつけられるだけだった。道中でいくらデータを集めても、ただの無能力者でもコアを壊せるような都合のいい方法は、どこにも書かれていなかった。"
  },
  {
    "scene": "研究所の奧",
    "text": "私には注ぎ込める異能なんてない。ここまで来て、私はどうすればいいんだろう……。"
  },
  {
    "scene": "研究所の奧",
    "text": "絶望に暮れ、思いあぐねていると、ふいに足元からズズズ……と不気味な地鳴りが響き、建物全体が激しく揺れていることに気がついた。",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "研究所の奧",
    "text": "ガガガガガガッ！！！ と強烈な衝撃が研究所の最奥を襲う。何かが、外からこの部屋の直上へと迫ってきている。",
    "action": "SHAKE_SCREEN_EXTREME"
  },
  {
    "scene": "研究所の奧",
    "text": "危険を察知して見上げた瞬間、大音響と共にガラス張りの天井が派手に突き破られた。",
    "bg": "/scene/core_hakai1.png",
    "action": "CLEAR_SHAKE",
    "se": "+window_break.mp3"
  },
  {
    "scene": "研究所の奧",
    "text": "凄まじい爆煙の中、確実な殺意を孕んでそこに現れたのは──。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……黒、騎士………ッ…」",
    "bgm": "Battle1.mp3",
    "showIllust": [
      "BlackKnight"
    ]
  },
  {
    "scene": "研究所の奧",
    "text": "地上のあのキャンパスで、私を執拗に追い詰めて、…満を目の前で貫いた、漆黒の凶刃だった。"
  },
  {
    "scene": "研究所の奧",
    "text": "黒騎士の巨体が、私の細い身体を容赦なく冷たいコンクリートの壁へと叩きつける。 背中に鈍い衝撃が走り、肺から強制的に空気が搾り出された。息ができない。鉄の指先が私の肩に深く食い込み、骨がきしむような悲鳴を上げる。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いや…離してッ…！！離してぇ…！！」",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "研究所の奧",
    "text": "恐怖でパニックになりながら、私は必死に手足をバタつかせた。だが、黒い鎧の質量はびくともしない。至近距離から放たれる圧倒的な殺意と、バイザーの奥の底知れない暗闇に気圧され、涙がボロボロと溢れ出す。"
  },
  {
    "scene": "研究所の奧",
    "text": "その時、暴れた私の指先が、壁際の機材ラックに引っかかった。そこに置かれていたのは、護身用か、あるいは実験用か──重々しい金属の質感を持った、光線銃のような未知の武器だった。"
  },
  {
    "scene": "研究所の奧",
    "text": "弾け飛ぶ恐怖を振り払うように、私はぎゅっと目をつぶって、とにかく黒騎士に命中するようにトリガーを夢中で引き絞り、エネルギーをぶちちまけた。"
  },
  {
    "scene": "研究所の奧",
    "text": "凄まじい発射音と、網膜を焼き焦がすような眩い光が至近距離で爆発する。",
    "action": "WHITE_FLASH_AND_SHAKE",
    "se": "shot.mp3",
    "hideIllust": [
      "BlackKnight"
    ],
    "bgm": "stop"
  },
  {
    "scene": "研究所の奧",
    "text": "──しかし、その一瞬。目をつぶる直前の視界の中で、私は妙な違和感を捉えていた。"
  },
  {
    "scene": "研究所の奧",
    "text": "黒騎士が、私の放ったその光線に、まるで“自ら当たりに行く”かのように、わざわざ顔を傾けて軌道上に頭部を晒したような気がしたのだ。"
  },
  {
    "scene": "研究所の奧",
    "text": "パキンッ、と、ガラスが粉々に砕け散るような、硬質な鎧が割れた音が室内に虚しく響き渡る。反動でよろめきながら、私は恐る恐る目を開けた。"
  },
  {
    "scene": "研究所の奧",
    "text": "そこに待ち受けていたのは、私の貧相な想像力を遥かに超えた、あまりにも信じられない残酷な現実だった。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…………ヒルミ、教授……？」",
    "bgm": "serious_3.mp3",
    "bgmSeek": 19,
    "showIllust": [
      "Hirumi_smile"
    ]
  },
  {
    "scene": "研究所の奧",
    "text": "割れた黒いヘルメットの隙間から露わになったのは、見紛うはずもない、あの気だるげで飄々とした私たちの教授の顔だった。その瞳はいつもの穏やかさを完全に失って、冷徹な光を宿して私をじっと見つめている。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「——ああ、バレてしまったかぁ」"
  },
  {
    "scene": "研究所の奧",
    "text": "教授は、ぽつりと呟いた。その声は酷くおどけた様子で、いつもの大学の講義室で、私たちが突飛な質問をした時に返すような、日常の教授と何ら変わりはないトーンだった。ただの悪戯が見つかった子供のような、軽薄な苦笑。"
  },
  {
    "scene": "研究所の奧",
    "text": "しかし、その直後──。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あぐッ……！」",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "研究所の奧",
    "text": "言葉を失う私のみぞおち目がけて、黒い鎧に包まれた拳が容赦なく叩き込まれた。内臓を強烈に押し潰されるような激痛。視界が真っ白に染まり、肺の空気がすべて口から強引に引きずり出される。"
  },
  {
    "scene": "研究所の奧",
    "text": "私は声にならない悲鳴を上げながら、苦しさに耐えかねてその場に崩れ落ち、前のめりに身体を丸めた。激しく咳き込み、床に涙と唾液が滴り落ちる。"
  },
  {
    "scene": "研究所の奧",
    "text": "そんな私の無様な様子を、教授は冷たい鉄の塊のような位置から、愉しそうにクスクスと笑いながら見下ろしていた。その笑い声は、かつて研究室で聞いたどの冗談よりも、冷酷に鼓膜を震わせる。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「まったく。こんな不躾な玩具を人に……」"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「いや———“お兄ちゃん”に向けるなんて、本当に悪い子だね、朔良」"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え…………」"
  },
  {
    "scene": "研究所の奧",
    "text": "お兄ちゃん──？ 教授の口から滑り出たその単語の意味が、酸欠の脳にうまく結びつかない。腹部の激痛さえ一瞬で彼方へと吹き飛ぶほどの、強烈な衝撃が頭の芯を殴りつけていた。"
  },
  {
    "scene": "研究所の奧",
    "text": "呆気に取られ泥人形のように硬直している私を見つめる教授の双眸には、先ほどまでの冷徹な光は消え去っていた。"
  },
  {
    "scene": "研究所の奧",
    "text": "代わりにそこに宿っていたのは、歪んだ愛着と、狂気を孕んだ慈しみ。心から愛おしむような、酷く優しい表情だった。その純粋すぎる眼差しが、何よりも恐ろしかった。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「ふふ、ここまでよくたどり着いたね。偉いよ。お兄ちゃんが花丸をあげよう」"
  },
  {
    "scene": "研究所の奧",
    "text": "教授はそう言うと、屈み込んで私の目線に合わせ、どこか誇らしげに目を細めた。血の通わない漆黒の死神のような鎧と、その隙間から覗くあまりにも身内びいた親密な笑顔。その圧倒的なアンバランスさが、閉ざされた部屋の異常性をいっそう際立たせる。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「何を……言ってるの…ッ、教授！！ねぇ！目を覚まして―――」"
  },
  {
    "scene": "研究所の奧",
    "text": "私は床に手を突いたまま、掠れた声を絞り出した。この人は狂ってしまったのだ。月からの未知のエネルギーか何かに精神を蝕まれて、妄想に囚われているに違いない。"
  },
  {
    "scene": "研究所の奧",
    "text": "だが、私の悲痛な叫びを、教授は冷ややかな、けれどどこか哀れむような眼差しで一蹴した。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「目を覚ますのは君の方だ、朔良」"
  },
  {
    "scene": "研究所の奧",
    "text": "教授の長い指先が、私の額に優しく触れる。その手袋の黒い革の冷たさが、ゾッとするほど生々しく脳を刺激した。彼は立ち上がると、白く輝くコアを見上げ、遠い日の思い出でも語るかのように、決定的な真実を紡ぎ始める。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「私と君”たち”は……この研究所で、幼いころを一緒に過ごした仲じゃないか。しかも、同じ培養ポッドでね」"
  },
  {
    "scene": "研究所の奧",
    "text": "心臓が、ドクンと嫌な音を立てて跳ねた。"
  },
  {
    "scene": "研究所の奧",
    "text": "幼い頃の記憶。お父さんと過ごした幸せな思い出の、そのさらに奥。靄がかかったように思い出せない、私の「はじまり」の記憶。"
  },
  {
    "scene": "研究所の奧",
    "text": "同じ培養ポッド。彼が言ったその言葉が、暗闇の奥に眠っていた忌まわしい光景を一瞬だけ呼び起こす。私の…隣には……。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな……嘘……嘘よ……！」"
  },
  {
    "scene": "研究所の奧",
    "text": "首を振る私の視線の先で、教授はただ、世界のすべてを包み込むような、残酷なほどに優しい微笑みを浮かべていた。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「さぁ、行こうか。『ルキ』が待っているよ」"
  },
  {
    "scene": "研究所の奧",
    "text": "教授はそう言うと、まるで子供を散歩に誘うかのように、ごく自然に手を差し伸べてきた。"
  },
  {
    "scene": "研究所の奧",
    "text": "その口から滑り出た、全く聞き覚えのない、けれど酷く耳に残る響きを持った名前に、私は凍りつく。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ルキ……？」"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「あの子と仲直りをしてほしいんだ。だからここまで来てもらう必要があったわけだけど……君たちはほんとうに手のかかる双子ちゃんだね」"
  },
  {
    "scene": "研究所の奧",
    "text": "教授は困ったように眉を下げ、ふっと自嘲気味に笑った。その表情は、不仲なきょうだいを心配する本物の兄のようだった。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「嫉妬しているだけだよ。全ての遺伝子を引き継ぎ、完全な”成功作”として外の世界で生きている君にね。だから、あの子は決して悪い子じゃないんだ。ちゃんと話し合えば、きっとわかるはずさ」"
  },
  {
    "scene": "研究所の奧",
    "text": "成功作。遺伝子。"
  },
  {
    "scene": "研究所の奧",
    "text": "おぞましい単語が、私のアイデンティティを根本からバラバラに引き裂いていく。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「そして……三人で、ここで新しく暮らそう」"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…ッ！」"
  },
  {
    "scene": "研究所の奧",
    "text": "三人で暮らす。その言葉の響きに、吐き気を催すほどの恐怖を感じた。私の本能が、「ここにいてはいけない」と激しく警鐘を鳴らしている。"
  },
  {
    "scene": "研究所の奧",
    "text": "私は床を這うようにして、なりふり構わず後ずさろうとした。しかし、その瞬間、黒い金属の籠手のような手が、私の細い手首をがっちりと掴んだ。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いや……！」",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ヒルミ教授",
    "role": "HIRUMI",
    "text": "「まだ混乱しているのかな。無理もないね。どれもこれも、あの研究員──君が『父親』だと信じ込まされていた男が、勝手に君を連れ出し、記憶を飛ばして欺いていたせいだ……」"
  },
  {
    "scene": "研究所の奧",
    "text": "教授の目が、『父親』への身勝手な憎悪で一瞬だけ昏く歪む。"
  },
  {
    "scene": "研究所の奧",
    "text": "がんじがらめだった。力でも、血の真実でも、私はこの人から逃れられない──そう絶望に身を委ねかけた、その時。",
    "bgm": "stop"
  },
  {
    "scene": "研究所の奧",
    "text": "ドゴォンッ！！！",
    "se": "bakuhatsu.mp3",
    "action": "SHAKE_SCREEN_EXTREME"
  },
  {
    "scene": "研究所の奧",
    "text": "突如として、建物の奥深くから空気を震わせるような、鈍く重い衝撃音が鳴り響いた。 教授の眉がピクリと跳ね、私の手首を掴む力がわずかに緩む。",
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "研究所の奧",
    "text": "その刹那──。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "？？？",
    "text": "「————おらぁぁぁぁぁッッ！！」"
  },
  {
    "scene": "研究所の奧",
    "text": "鼓膜を破らんばかりの猛々しい雄叫びと共に、瓦礫の煙を突き破って、一つの影が凄まじい勢いで飛び込んできた。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……ッ！」"
  },
  {
    "scene": "研究所の奧",
    "text": "不意を突かれた教授の身体に、その人影が容赦なく体当たりで組み付く。黒い巨体がわずかに体勢を崩し、よろめいた。その瞬間、私の身体が強い力で後ろへと力任せに引っ張られる。",
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…先輩ッ！」"
  },
  {
    "scene": "研究所の奧",
    "text": "聞き慣れた、けれどここでは絶対に聞こえるはずのない声。視界が急速に後ろへと遠ざかる中で、私は自分を抱きとめた乱入者の顔を凝視した。その顔は──。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん！？！それに…ムッちゃんもどうして…っ！！」",
    "showIllust": [
      "Mutsunori_serious",
      "Mika_serious"
    ]
  },
  {
    "scene": "研究所の奧",
    "text": "私のすぐ隣で、冷徹な目を光らせて周囲を警戒しているミカくんと、教授を押し止めて着地したばかりの、泥だらけの友人。 睦典は、私と目が合うと、緊張感の欠片もないいつもの調子でへへっと締まりのない笑みを浮かべた。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「そりゃ、朔良を助けに———ってうわぁ！！」"
  },
  {
    "scene": "研究所の奧",
    "text": "和やかなムードも一瞬の、刹那の出来事だった。体勢を立て直した黒騎士──教授の、容赦のない漆黒の一太刀が空を裂き、睦典の鼻先を襲う。",
    "se": "sword.mp3"
  },
  {
    "scene": "研究所の奧",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「っとと、危ねぇっ！？」"
  },
  {
    "scene": "研究所の奧",
    "text": "紙一重のところで首を後ろに反らし、鋭い斬撃を避ける睦典。"
  },
  {
    "scene": "研究所の奧",
    "text": "よく見ると、彼の耳元には、見慣れない通信用のインカムが押し込まれていた。その小さなスピーカーから、割れた大音量で聞き覚えのある…凪砂さんの怒鳴り声が漏れ聞こえてくる。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "『おい、よそ見してる場合かアホ！……ッ後ろに下がれっ！』"
  },
  {
    "scene": "研究所の奧",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「うるせーー！！お前の指示なんか聞きたくないけど……クソ、相変わらず指示だけは的確なんだもんな！？」"
  },
  {
    "scene": "研究所の奧",
    "text": "地上に残ってきたはずの仲間たちの乱入に、絶望で凍りついていた私の世界が、一気に騒がしく動き始めた。"
  },
  {
    "scene": "研究所の奧",
    "text": "呆気に取られて動けないでいる私の手を、ミカくんが力強く引いた。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「あそこは睦典先輩に任せましょう！俺たちはこっちです！」"
  },
  {
    "scene": "研究所の奧",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え、あ、うん……っ！」",
    "hideIllust": [
      "Mutsunori_serious",
      "Hirumi"
    ]
  },
  {
    "scene": "研究所の奧",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「ちょ……！！さくらーーーッ！！待ってよ！！置いてかないで！？」"
  },
  {
    "scene": "研究所の奧",
    "text": "背後で教授の猛攻を必死に防ぎながら、睦典が情けない悲鳴を上げる。すかさず彼の耳元のインカムから、凪砂さんの容赦のない怒声が爆音で響き渡った。"
  },
  {
    "scene": "研究所の奧",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "『うるさい！！黙ってろバカ囮！！！死ぬ気か！！』"
  },
  {
    "scene": "研究所の奧",
    "speaker": "睦典",
    "role": "MUTSUNORI",
    "text": "「バカって言う方がバカなんだよ詐欺師！！つーか囮って言うな！！」"
  },
  {
    "scene": "研究所の奧",
    "text": "そんな二人の騒がしい言い合いを背に受けて、私たちは白く輝く『コア』がある最奥の部屋を飛び出した。冷たい金属の通路を、ミカくんに手を引かれるまま夢中で駆け抜ける。",
    "bgAnimation": "dash"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "──そうして連れてこられたのは、いくつものモニターと、何かの制御用と思われる大きなコンソールが並んだ、少し広めの別室だった。",
    "bgm": "Moon.mp3",
    "bg": "/scene/control.png"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はぁ……はぁ……。ここまでくれば、一旦は……！」",
    "showIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "ミカくんは肩を大きく上下させながら、部屋の頑丈な隔壁のロックをガチリと閉めた。私も息が完全に上がってしまい、膝に手をついて必死に酸素を肺に送り込む。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "ふと顔を上げると、その薄暗い部屋の奥、無数のデータを映し出す巨大なモニターを食い入るように凝視している、一際大きな背中が目に飛び込んできた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……アカネさん……！？」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "思わず驚きの声を上げると、その人影──アカネさんが、ゆっくりとこちらを振り返った。いつもと変わらない、どこか超然とした、けれどどこかホッとするような落ち着いた瞳が私を捉える。",
    "showIllust": [
      "Akane_smile"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あの……どうして、みんなここに……？ロケットは私一人しか乗れなかったはずじゃ……」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "混乱する私に、ミカくんが額の汗を拭いながら、少し得意げに、けれど真剣な表情で語りかけてきた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「そもそも、俺たちがここに来られたのは…アカネさんが、教授の部屋の隠しPCから、もう一機、極秘裏に建造されていた『予備の突入艇』のデータを引っ張り出してくれたんですよ」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「あの教授には目星をつけていた。見つからないと思って油断していたのが仇になったな」",
    "showIllust": [
      "Akane_serious"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "アカネさんは静かに、けれど低く深く響く声でそう言った。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "そこまで話すと、彼はふっと口を閉ざした。どこか重苦しい沈黙が部屋を満たす。アカネさんはただ、静かに、そして真っ直ぐに私を見据えていた。",
    "bgm": "stop"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「…お前について、言わなければいけないことがある」",
    "showIllust": [
      "Akane_serious"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "その瞳の奥にある覚悟のようなものに、私は小さく身構えた。心臓が痛いほど脈打つ。けれど、お父さんの謎も、教授のあの狂気じみた言葉も、すべてが繋がろうとしている今、私は聞かなければいけない。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……なんでしょう？」 "
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "消え入りそうな声を、どうにか絞り出す。ふぅ、と深く息を吐いて、アカネさんが告げた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「お前は、研究所から生み出された存在だ。遺伝子を操作され、人工的に作られた……言ってしまえば、キメラと何ら変わらない」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そ……そんな……っ」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "胸の奥が凍りつき、息が詰まりそうになる。でも、取り乱すことはなかった。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "さっきの部屋で教授から聞かされた『同じ培養ポッド』という言葉、そして『成功作』という響き……それらが、パズルのピースのようにカチリと嵌まったからだ。なんとなく、分かっていた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "アカネさんは淡々と、しかし決定的な言葉を続けた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「あの黒騎士──ヒルミ教授の正体は、お前と同じ培養ポッドから生まれた個体。つまり、お前の兄にあたる存在だ。そして、ここにはもう一人……お前には、ルキという名の、双子の弟がいる」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「弟……」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "教授も言っていた。「君たちはほんとうに手のかかる双子ちゃんだね」、と。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "あの時に脳内にフラッシュバックした隣の誰かの感覚。勘違いじゃない。きっとあの子が、双子の弟のルキなんだ。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "とはいってもまだ実感はない。お父さんが研究員だったことも、私が作られた存在だったことも。浮足立っている感覚だけが残っている。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "だけど…"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…教えてくださって、ありがとうございます。それで私…思ったんです。兄と弟を…あの二人を、止めてみせます。こんな事態になった責任は、私にもあると思うから」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩……」",
    "showIllust": [
      "Mika_surprise"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "ミカくんのうるんだ瞳が、痛いほど私を射抜いた。自分が何者であっても、やらなきゃいけないことは変わらない。不安に震える心を必死に隠して、私はミカくんにそっと微笑みかける。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「弟がどこにいるか、分かりますか」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "アカネさんはもう一度、でも確かにこちらの決意を試すような鋭い視線を向けたあと、モニターを見ながら低くつぶやいた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「…この部屋の奥の通路にある部屋だ。本来なら厳重なセキュリティがかけられているはずだが、今はすべて解除されている」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「それって…罠なんじゃないですか……っ！」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "ミカくんが切羽詰まったように、声を荒らげて言う。 確かに罠かもしれない。私をおびき寄せるために、あえて道を開けている可能性の方が高いだろう。だけど。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「行きます。たとえこれが罠だったとしても。それに…今この瞬間も、ムッちゃんと凪砂さんが、私のために兄の足止めをしてくれているんです。一分一秒も、時間を無駄にはできません」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「…っ、じゃあ俺も行きます…！先輩一人には出来なーーー」",
    "showIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「やめておけ」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "立ち上がろうとしたミカくんの言葉を、アカネさんの重厚な声が遮った。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「ッ、どうしてですか…！ アカネさん！ 先輩を一人で行かせるなんて――」",
    "showIllust": [
      "Mika_surprise"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん、落ち着いて」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "私は一歩前に出て、ミカくんの肩にそっと手を置いた。熱くなって前に出ようとする彼を、なだめるように、優しく諭す。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「アカネさんの言う通りだよ。これは、私の……私たち家族の問題だから。それにね、ミカくん、弟が何をするか分からない。あなたまで犠牲になる必要はないよ」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「でも……っ」",
    "showIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "ミカくんは悔しそうに唇を噛み締め、握りしめた拳を震わせている。私のことを心から心配してくれている彼の優しさが、痛いほど胸に染みた。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……それじゃあ、行ってきます」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "私はもう一度だけ二人に向かって小さく微笑むと、踵を返して奥の部屋へと続く重い扉へと歩みを進めた。背後から、アカネさんの低く、確かな響きを持った声が届く。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……気を付けろ」"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「はい」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "短く答えて、私は通路へと足を踏み入れた。",
    "hideIllust": [
      "Mika_serious",
      "Akane_serious"
    ],
    "bg": "/scene/control_rouka.png"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "背後でパシューッと扉が閉まり、静寂が私を包み込む。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "ひんやりとした空気の漂う通路を一人で歩きながら、私は深く、深く呼吸を整えた。 心臓の音がうるさいくらいに耳の奥で鳴り響いている。これから起こることへの恐怖と不安が、津波のように押し寄せてきて足がすくみそうになる。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "人工的に作られた命、狂ってしまった兄、そして、まだ見ぬ双子の弟。 私の日常は完全に壊れてしまった。けれど、だからこそ、私がここで決着をつけなきゃいけない。"
  },
  {
    "scene": "研究所奥、別部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……よし」"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "自分に言い聞かせるように呟き、顔を上げる。 通路の突き当たり、まるで私を待っていたかのように、自動で音もなく左右に開いた不気味な扉。"
  },
  {
    "scene": "研究所奥、別部屋",
    "text": "私はその光の向こうへと、しっかりと足を踏み入れた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「——ずいぶん遅かったじゃない、姉さん」",
    "showIllust": [
      "Ruki_neutral"
    ],
    "bg": "/scene/ruki.png"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "その部屋の中央に、一人の人影が立っていた。 私と酷似した、けれどどこか尖った、危うい雰囲気を纏う少年。年齢も私と同じくらい。彼が、私の──。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ルキ………」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「へぇ？思い出してくれた？それとも誰かが教えてくれたのかな。家族を忘れるなんて本当に薄情だね」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキは小馬鹿にしたように鼻で笑うと、首を傾げてこちらの様子を品定めするように見てきた。その瞳には、親愛など微塵もなく、ただ冷ややかな悪意と歪んだ関心だけがギラギラと輝いている。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あなたは何が目的なの…！どうしてこんなことを…世界を滅ぼすような真似をするの……！？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私は彼を真っ直ぐに見据え、叫ぶように問いかけた。黒騎士に世界を襲わせ、コアを暴走させている元凶が、この目の前の幼い少年なのだ。何か理由があるはずだ、そう信じたかった。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "しかし、ルキは私の必死な訴えを聞くと、一瞬だけきょとんとした顔をした後、腹を抱えて大爆笑し始めた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「目的？あははは！！何かをするのに目的なんて必要？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「どういうこと……？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "狂気すら感じる笑い声に、背筋が凍りつく。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「だーかーら。目的なんてないけど？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「………え……」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「まぁ？強いて言えば……毎日毎日、のほほ～んとくだらない生活を送っているバカ地球人たちに喧嘩売ってやろうかな、みたいな？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "楽しそうに、まるで明日の遊びの予定でも話すかのような軽いトーン。 世界を崩壊の危機に陥れている理由が、ただの退屈凌ぎ、ただの気まぐれ。そのあまりにも身勝手すぎる理由に、私は言葉を失ってしまった。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「というか……何か勘違いしてないか？俺がコアを作ったって思ってる？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキはあきれたように肩をすくめ、手のひらを上に向けて大げさなジェスチャーをして見せた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そうじゃないなら……誰が作ったって言うの！？ あなたたちでしょ！？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "その問いかけに、ルキは深いため息をつき、憐れむような目で私を見た。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「そんなの、ちょっと考えれば分かるだろ。──俺たちの父さんだよ。ああ、姉さんが今まで一緒に暮らしてきた、あの優しい研究員の『偽物父さん』じゃないよ。本当に俺たちを生物兵器として”生み出した”、本物のクソ親父のほう」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……本物の、お父さん……？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「そう。あのコアはさ、あいつが最高傑作の俺たちに遺してくれた、とっておきの『おもちゃ』なんだよ。あいつは世界を壊したがってた。だから俺は、息子の義務としてその遺志を継いで、ただスイッチを押してあげただけ。ほら、目的なんてないって言った意味、分かった？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキは無邪気な笑みを浮かべながら、一歩、また一歩と私との距離を詰めてくる。その瞳の奥にある底無しの闇に、私は一歩も動くことができなかった。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「はぁ…姉さんのアホ面見るのもいい加減飽きてきちゃった。さあてと……本題に入ろうか」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキの声音から、さっきまでの軽薄な温度が綺麗に消え失せた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ッ！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "その瞬間、頭上から目に見えない巨大な鉄塊を落とされたかのような、凄まじい衝撃が全身を襲った。身体が鉛のように重くなり、私はその場にドサリとうずくまった。床に顔を押し付けられ、指一本動かすことすらできない。",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「すごいよねぇ……俺ってさ、この世界にある”全異能”を持ち合わせて生まれてきたんだよね。ちょっとチートすぎかな？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "身動きの取れない私を見下ろしながら、ルキが愉しそうにステップを踏む。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "目の前の少年から立ち上る、部屋の空気をビリビリと震わせるほど高密度で圧倒的なエネルギーの奔流。それは、先ほど最奥の部屋で見たあの『コア』の放つプレッシャーと、恐ろしいほど酷似していた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「だからさ……今の姉さんなんて、本当にちっぽけで、ゴミ同然なんだよね」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "明確な殺意と圧倒的な力の差。抗う術など何一つない。脳裏を過る「死」の一文字。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキが、冷酷な光を宿した右手を静かに天へと掲げた。その指先に、世界を容易く消し飛ばせそうな漆黒のエネルギーが収束していく。",
    "action": "DARK_ENERGY_GATHER"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「——俺をこの暗い研究所に置いて、一人だけ光のある外の世界へ行った姉さんを、俺は絶対許さない。……さよなら、朔良」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "言い放つと同時に、その手が容赦なく私に向けて振り下ろされる。私は恐怖に身体を硬直させ、ぎゅっと目を閉じた。",
    "action": "CLOSE_EYES"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "せめて、最期くらいは──。",
    "action": "CLEAR_DARK_ENERGY"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "チリン、と。",
    "se": "bell.mp3"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "破滅の光が私を飲み込む寸前、静まり返った部屋のどこかで、可憐に、けれど妙に澄んだ不思議な音が響いた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "激しい衝撃の代わりに私の身体を包んだのは、どこか懐かしい、温かな風だった。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "いつの間にか身体を押し潰していた異常な重力は消え去っている。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ハッと目を開け、弾かれたように上体を起こして、私をかばうように前に立つその人物の背中を見た。",
    "action": "WAKE_UP",
    "showIllust": [
      "Michiru_serious"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私は、息をのんだ。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「———朔良……」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……みちる………っ！！！？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "信じられない光景だった。そこに立っていたのは、間違いなく私の最愛の幼馴染だった。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "直撃すれば跡形もなく消し飛ぶはずのルキの攻撃は、彼の周囲で綺麗に霧散している。それほどの規格外の防壁を展開されてもなお、ルキは焦る風もなく、むしろ楽しそうに余裕の笑みを浮かべていた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「へぇ、こんな間近で見るのは初めてだなぁ。どうも。姉がいつもお世話になってまーす」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキの軽い挨拶を、満は冷徹な一瞥で切り捨てる。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MITSURU",
    "text": "「御託は良い。早くこの惨劇を終わらせるんだ」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "凛とした表情で、毅然と言ってのける満。そのあまりにいつも通りの、けれどあり得ない姿に、私の頭は完全にパニックを起こしていた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ど、どうして……？ 満……！？ あなた、地上で、あの黒騎士──お兄ちゃんに剣で胸を貫かれて、死んだはずじゃ……っ！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私の悲痛な叫びに、満は一瞬だけ、痛ましそうに目を伏せた。だが、すぐにいつもの静かな眼差しに戻り、私を安心させるように告げる。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……君が気にする必要は──」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「え？ 姉さん知らないの？？ あはは！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキが手を叩いて楽しそうに笑い声を上げた。満の瞳が、これまでに見たことがないほどの警戒と怒りで鋭く吊り上がる。",
    "showIllust": [
      "Michiru_surprise"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……黙っていろ」",
    "showIllust": [
      "Michiru_serious"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「最愛の幼馴染のこと、もっとしっかり覚えてやれよ。それとも……まだ忘れてることがあるんじゃない？ ほら、思い出してよ姉さん！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「…っ、いい加減にしろ……！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "いつも冷静沈着な彼が、ここまで感情を露わにして取り乱す姿なんて初めて見た──いや、違う。私は本当に、彼の何かを忘れている？ まだ私には、失われた記憶があるの……？"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良、いいかい。彼の言葉に耳を傾けてはいけない。知らなくていいことだって、この世界にはあるんだ……！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「おいおい、それじゃお前が報われないだろう？ いい機会だからここで教えてやるよ、姉さん」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……やめろ！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満の制止を振り切り、ルキの言葉に私の意識のすべてが傾いていく。ルキは最高に愉快そうに、歪んだ笑みを浮かべて言い放った。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「満は幽霊なの。だって、その満を殺したのは──他でもない、姉さんなんだからね」"
  },
  {
    "scene": "回想：公園",
    "text": "──それは、今思えば、全ての始まりの日だった。",
    "bg": "black",
    "action": "FLASHBACK_START",
    "clearIllust": true,
    "bgm": "nostalgia"
  },
  {
    "scene": "回想：公園",
    "text": "空は雲一つなく、よく晴れた日だった。"
  },
  {
    "scene": "回想：公園",
    "text": "私がいつも通り、お気に入りの公園で遊ぼうと広場へ走っていくと、賑やかな街の音に混じって、不快な罵声が聞こえてきた。",
    "bg": "/scene/park.png"
  },
  {
    "scene": "回想：公園",
    "speaker": "いじめっ子A",
    "text": "『——やーい！弱虫！！』"
  },
  {
    "scene": "回想：公園",
    "speaker": "いじめっ子B",
    "text": "『——泣き虫泣き虫！！お前なんか、どっか行っちゃえよ！』"
  },
  {
    "scene": "回想：公園",
    "speaker": "少年",
    "text": "「や…やめてよぉ……！痛いよぉ……！！」"
  },
  {
    "scene": "回想：公園",
    "text": "異様な騒ぎに足を止め、恐る恐る目を向ける。"
  },
  {
    "scene": "回想：公園",
    "text": "公園の錆びついた遊具の隅っこで、何人かのいじめっ子たちに囲まれている子がいた。地面にペタンと座り込み、小さな身体をさらに縮こまらせている。その子の髪は、まるで雪のように真っ白な髪をしていた。"
  },
  {
    "scene": "回想：公園",
    "text": "周りにいる大人たちや他の子供たちは、関わりたくないのか、見て見ぬふりをして通り過ぎていく。誰もその白い髪の子を助けようともしない。"
  },
  {
    "scene": "回想：公園",
    "text": "理不尽な光景に、私の胸の奥で、カッと熱い火が灯った。気づけば、私は考えるより先に足を踏み出し、いじめっ子たちの前に立ちはだかっていた。"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ちょっと！ 何してるの！」"
  },
  {
    "scene": "回想：公園",
    "speaker": "いじめっ子A",
    "text": "「ああん……？ なんだよお前」"
  },
  {
    "scene": "回想：公園",
    "speaker": "いじめっ子B",
    "text": "「邪魔すんなよな！ そいつ、髪の毛も変だし、すげえ不気味なんだよ！」"
  },
  {
    "scene": "回想：公園",
    "text": "リーダー格の男の子が私を睨みつけ、突き飛ばそうと手を伸ばしてくる。だけど、私は一歩も引かなかった。"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「不気味なんかじゃない！ 寄ってたかって乱暴する、あんたたちの方がよっぽど格好悪いわ！」"
  },
  {
    "scene": "回想：公園",
    "text": "私は男の子の腕を掴み、柔道の真似事のように思いきり地面に投げ飛ばした。"
  },
  {
    "scene": "回想：公園",
    "text": "ドスン、と派手な音が響く。",
    "action": "SHAKE_SCREEN",
    "se": "panchi.mp3"
  },
  {
    "scene": "回想：公園",
    "speaker": "いじめっ子A",
    "text": "「うわっ！？ 痛ぇっ！」"
  },
  {
    "scene": "回想：公園",
    "speaker": "いじめっ子B",
    "text": "「な、なんだよこいつ、強いぞ！？」"
  },
  {
    "scene": "回想：公園",
    "text": "起き上がった男の子は痛そうに泥を払いながら、私の気迫に押されてじりじりと後退りし始めた。"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これ以上いじめるなら、絶対に許さないんだから！」"
  },
  {
    "scene": "回想：公園",
    "text": "私が拳を握りしめて一歩踏み出すと、いじめっ子たちは「お、覚えてろよー！」と、一斉に逃げ出していった。"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ふぅ……」"
  },
  {
    "scene": "回想：公園",
    "text": "逃げていく背中を見届けてから、私は小さく息を吐いた。それから、まだ遊具の陰で震えている白い髪の子に向き直る。服についた砂をポンポンと払ってあげて、いつもの調子で明るく笑いかけた。"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「もう大丈夫だよ！ あいつら逃げてったから。……じゃあ、私行くね」"
  },
  {
    "scene": "回想：公園",
    "text": "元気に手を振って、その場を離れようとした時。"
  },
  {
    "scene": "回想：公園",
    "speaker": "少年",
    "text": "「ま……待って！」"
  },
  {
    "scene": "回想：公園",
    "text": "背後から、消え入りそうな、けれど必死な声が私を引き留めた。"
  },
  {
    "scene": "回想：公園",
    "text": "振り返ると、その子は涙で濡れた大きな瞳で私を見つめ、衣服の裾をぎゅっと握りしめていた。"
  },
  {
    "scene": "回想：公園",
    "speaker": "少年",
    "text": "「な、なまえ……」"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「名前？ わたしは朔良！ あなたは？」"
  },
  {
    "scene": "回想：公園",
    "text": "私が親しみやすく首を傾げると、その子は少しだけ頬を赤く染め、戸惑いながらも、小さな声を絞り出した。"
  },
  {
    "scene": "回想：公園",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「ぼ、ぼくは……満」"
  },
  {
    "scene": "回想：公園",
    "text": "それから私たちは、家が近いということもあって、本当によく遊ぶようになった。"
  },
  {
    "scene": "回想：公園",
    "text": "満の引っ込み思案で大人しい性格は相変わらずだったけれど、私と過ごすうちに、少しずつ周囲とも打ち解けていくようになった。相変わらず、彼が他の子にいじられたり困ったりしている時は、いつも私が一番に前に出て助けていたけれど。"
  },
  {
    "scene": "回想：公園",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「ほんと、朔良って心強いよ……。いつも守ってくれてありがとう」"
  },
  {
    "scene": "回想：公園",
    "text": "隣を歩く満のそんなか細い声を聞くたびに、私は思わず叱咤激励の言葉を飛ばしてしまうのだった。"
  },
  {
    "scene": "回想：公園",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ちょっと、満が気弱すぎるんだよ！ ほら！ もっと自信もって！！」"
  },
  {
    "scene": "回想：公園",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「痛いよ朔良っ……！」"
  },
  {
    "scene": "回想：公園",
    "text": "私が背中をバシバシと力任せに叩くと、満は痛そうに身をすくめながらも、嬉しそうに声を立てて笑った。私たちが並んで歩けば、いつでもどこでも、そんな賑やかな笑い声が響いていた。"
  },
  {
    "scene": "回想：中学校",
    "text": "──けれど、私たちが中学生になるころ。",
    "bg": "/scene/classroom.png",
    "action": "SLOW_FADE_IN"
  },
  {
    "scene": "回想：中学校",
    "text": "まだお互いの関係は変わらず続いていたけれど、私の身体には、少しずつ不気味な異変が起き始めていた。"
  },
  {
    "scene": "回想：中学校",
    "speaker": "クラスメイト",
    "text": "「——ら、さくら！」",
    "bg": "/scene/classroom.png"
  },
  {
    "scene": "回想：中学校",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？ あ、な、なに……？」"
  },
  {
    "scene": "回想：中学校",
    "text": "急に肩を揺さぶられて、私はハッと我に返った。目の前には、怪訝そうな顔をしたクラスメートが立っている。"
  },
  {
    "scene": "回想：中学校",
    "speaker": "クラスメイト",
    "text": "「なに？じゃなくて！ 体育祭の競技決めようって話！ ずっと聞いてなかったでしょ」"
  },
  {
    "scene": "回想：中学校",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え？ あぁ……そっか。ごめんごめん、ちょっと考え事してて」"
  },
  {
    "scene": "回想：中学校",
    "text": "慌てて取り繕うように笑ってみせるけれど、クラスメートは心配そうに、あるいは少し不気味がるように私を覗き込んできた。"
  },
  {
    "scene": "回想：中学校",
    "speaker": "クラスメイト",
    "text": "「……最近さぁ、朔良って上の空じゃない？ 急に黙り込んだり、変な方向じっと見つめてたりするし」"
  },
  {
    "scene": "回想：中学校",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……」"
  },
  {
    "scene": "回想：中学校",
    "text": "ぎょっとする。自分では普通にしているつもりだった。なのに、周りから見れば私はおかしくなっているらしい。"
  },
  {
    "scene": "回想：中学校",
    "text": "最近、時折頭の奥が酷く痛むこと。視界の端に、見たこともないガラスの筒のような、冷たい部屋の幻覚がチラつくこと。それが何なのか、自分でも怖くて仕方がなかった。"
  },
  {
    "scene": "回想：中学校",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そ、そうかなぁ……？ ちょっと寝不足なだけだよ、あはは……」"
  },
  {
    "scene": "回想：中学校",
    "text": "曖昧にごまかして、逃げるように教室を後にした。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "夕暮れ時の校門。重い足取りで歩いていると、聞き馴染んだ懐かしい声が、私の張り詰めた心をほどくように呼びかけてきた。",
    "bg": "/scene/school.png",
    "action": "SLOW_FADE_IN",
    "bgm": "mutsu_theme"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「あ！ 朔良！ 今帰り？」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "クラスは違うけれど、同じ中学校に通う満だった。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "昔より少し背が伸びて男の子らしくなった満が、校門のところで私を見つけてパッと表情を明るくする。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……満。そう、今から帰りだよ」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「タイミングよかった！ 一緒に帰ろうか！」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "夕日に染まる通学路を、私たちは並んで歩き始めた。満は今日学校であった他愛のない出来事を、少し照れくさそうに、でも本当に楽しそうに話してくれている。いつもの、大好きな帰り道のはずだった。",
    "bg": "/scene/shopping_street_evening.png"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "なのに、私の耳には、彼の声がひどく遠く、歪んで聞こえていた。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（……あ、つい……。いや、寒い……？）"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "じわじわと、身体の芯から奇妙な悪寒が這い上がってくる。視界が不自然に歪み、世界の輪郭がぐにゃりと融け出していくような感覚。頭の奥が、割れるようにズキズキと痛み始めた。",
    "action": "MONOCHROME_FLASH",
    "se": "heartbeat.mp3"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「それでさ、先生が怒っちゃって……。あ、そういえば朔良、体つくり運動のペアの時──って、朔良？ 顔色が、すごく悪いよ……？」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "満が足を止め、心配そうに私の顔を覗き込んできた。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……ううん、大丈夫、なんでも……」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "大丈夫じゃない。何かが私の中で暴れようとしている。お父さんと暮らす温かい家ではない、どこか冷徹で、無機質で、血の匂いがする『どこか』の記憶が、脳内に流れ込んでくる。私を呼ぶ、誰かの叫び声のようなものが頭をかき乱す。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「本当に大丈夫！？ ほら、荷物持つから、そこに座って──」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「触らないでっ！！」",
    "action": "CLEAR_MONOCHROME_FLASH"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "差し伸べられた手を、強く振り払ってしまった。 パチン、と夕暮れの住宅街に乾いた音が響く。満は驚いたように目を見開き、拒絶されたショックにその場に凍りついた。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……ごめん、満、私……っ！」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "謝らなきゃいけないのに、言葉がうまく紡げない。それどころか、喉の奥からせり上がってくる圧倒的な恐怖感に、身体が支配されていく。このままここにいたら、満を、大切な満を『何か』に巻き込んでしまう──そんな得体の知れない確信が背中を突いた。"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ごめん……っ！！」"
  },
  {
    "scene": "回想：夕暮れの通学路",
    "text": "私はそれだけ叫ぶと、満をその場に残し、逃げるように走り出した。後ろから私を呼ぶ声が聞こえたけれど、振り返る余裕なんてなかった。ただひたすらに、自分の身体に起きている異変から逃げ出すように足を動かした。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "息を切らし、自宅のドアをこじ開けて自分の部屋へと飛び込む。 バタン、と激しい音を立てて扉を閉め、鍵をかけた。",
    "bg": "/scene/sakura_room.png",
    "action": "SLOW_FADE_IN",
    "bgm": "stop"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「はぁっ、はぁ……っ、く、苦し……っ、あ、あぁ……っ！」"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "床に崩れ落ち、胸を掻きむしりながら荒く呼吸を繰り返す。けれど、いくら酸素を吸い込んでも、窒息しそうな苦しさは一向に収まらない。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "それどころか、奇妙な感覚が私の五感を侵食し始めていた。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（……な、に……これ……？）"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "壁の向こう、いや、この街全体から『何か』が私の身体に流れ込んでくる感覚。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "隣の家のおばさんが、風邪を治そうと無意識に使った微小な治癒の気配。遠くの路地裏で、野良猫が威嚇し合った瞬間に放たれた、かすかな威圧の波動。学校の理科室で、誰かが実験の残滓として残していった、空気中の分子をわずかに震わせる熱の残響。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "そのあまりの負担に耐え切れず、私は意識を手放した。"
  },
  {
    "action": "FADE_TO_BLACK"
  },
  {
    "scene": "回想：朔良の部屋前",
    "text": "ピンポーン、と夕方の静かな住宅街に、家のチャイムの音が鳴り響く。",
    "bg": "/scene/sakura_house.png",
    "action": "SLOW_FADE_IN",
    "bgm": "semi_yugure.mp3"
  },
  {
    "scene": "回想：朔良の部屋前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「すみません。満です。……朔良、いる？」"
  },
  {
    "scene": "回想：朔良の部屋前",
    "text": "インターホンに向かって声をかけるが、返ってくるのは不気味なほどの静寂だけだった。"
  },
  {
    "scene": "回想：朔良の部屋前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "（……やっぱり、出ないか）"
  },
  {
    "scene": "回想：朔良の部屋前",
    "text": "昨日、僕の手を狂気じみた形相で振り払い、泣きそうな顔で走り去ってしまった朔良。そして今日、彼女は学校を無断欠席した。"
  },
  {
    "scene": "回想：朔良の部屋前",
    "text": "心配で、授業中も何度も携帯で連絡を取ろうとしたけれど、一向に繋がらない。胸を騒がせる嫌な予感に耐えかねて、放課後、こうして彼女の家まで走ってきたのだった。"
  },
  {
    "scene": "回想：朔良の部屋前",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良、寝てる…？」"
  },
  {
    "scene": "回想：朔良の部屋前",
    "text": "もう一度声をかけても、応答はない。 あきらめて一度出直そうと、僕が踵を返しかけた、その時だった。"
  },
  {
    "scene": "回想：朔良の家の中",
    "text": "カチャリ、と静かにラッチが外れる音がして、玄関の扉がまるで手招きでもするように、ひとりでにゆっくりと開いた。",
    "action": "SLOW_FADE_IN",
    "bgm": "stop",
    "se": "door.mp3"
  },
  {
    "scene": "回想：朔良の家の中",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「え……？」"
  },
  {
    "scene": "回想：朔良の家の中",
    "text": "鍵はかかっていなかったのだろうか。不審に思いながらも、僕はそっと薄暗い家の中へと足を踏み入れた。"
  },
  {
    "scene": "回想：朔良の家の中",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良……？ お邪魔するよ」"
  },
  {
    "scene": "回想：朔良の家の中",
    "text": "一歩入った瞬間、肌を刺す異様な冷気に身震いした。 カーテンが閉め切られた部屋の中は真っ暗で、いつもなら綺麗に整頓されているはずのリビングの小物が、いくつか床に散らばって荒れている。それを見て僕は複雑な気分に駆られる。",
    "bg": "/scene/sakura_living.png"
  },
  {
    "scene": "回想：朔良の家の中",
    "text": "お父さんが不慮の事故で亡くなってから、朔良はずっとどこか上の空だった。お父さんの遺品を整理している時も、時折、何もない空間を怯えたように見つめていた。"
  },
  {
    "scene": "回想：朔良の家の中",
    "text": "僕はそんな彼女を支えたいとずっと思っていた。けれど、今のこの家の空気は、「元気がない」というレベルを完全に超えていた。"
  },
  {
    "scene": "回想：朔良の家の中",
    "text": "ただ事じゃない。 僕は息を呑み、朔良の部屋がある二階に急いで駆け上がった。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良……！？」",
    "bg": "/scene/sakura_room.png",
    "action": "SLOW_FADE_IN"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "彼女の部屋の扉を開けた瞬間、僕は自分の目を疑った。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "そこにいたのは、僕の知っている朔良ではなかった。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "部屋の中心にうずくまる彼女の身体からは、赤黒い不気味な光が、まるで何十人もの人間の叫び声のような禍々しい波動となって吹き荒れていた。彼女の肌の表面を異様な幾何学模様の紋様が侵食し、髪が逆立っている。それは、まるで異形の怪物に変化していく途中のような、恐ろしい姿だった。",
    "action": "BLACK_AURA_START"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「な、んだよ……これ……っ。朔良！？」"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "あまりの光景に足がすくみ、うろたえることしかできない。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "その時、完全に意識を失い、苦痛に顔を歪ませていたはずの朔良が、カチリと人形のように首を動かした。焦点の合わない、どろりと濁った瞳が僕を捉える。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……あ……っ」"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "彼女は這いずるようにして僕の足元にすがりつき、そのまま縋り付くように僕に強く抱き着いてきた。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「冷た……！？」"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "彼女の身体は、氷のように冷え切っていた。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "だが、僕に抱きついた瞬間、朔良の身体を覆っていた赤黒い光の暴走が、ほんのわずかに凪いだ。彼女の眉間の皺がわずかに緩み、苦悶の表情が少しだけ和らいだような気がしたんだ。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "（どうして……？ 待てよ、僕、は……）"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "その時、脳裏に一つの記憶が鮮烈に蘇った。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "生前、朔良のお父さんが僕にだけ打ち明けてくれた言葉。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "父親の幻聴",
    "role": "FATHER",
    "text": "『満くん。朔良には……絶対に他人に知られてはいけない、恐ろしい力が眠っている。もし彼女の精神が不安定になって、その力が暴走したら、世界は大変なことになる。どうか、朔良のそばにいて、彼女を支えてやってくれ』"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "お父さんは、朔良が『世界中のあらゆる異能を、無自覚に吸い上げて暴走させてしまう特異体質』だと言っていた。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "だとしたら、なぜ今、僕に触れて朔良の苦しみが和らいだんだ？"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "僕の身体の奥から、朔良の暴走を押し留めるような、奇妙で温かい【拒絶】の波が流れ出しているのを感じる。他人の異能をかき消し、無効化する、絶対的な結界の力──。",
    "bgm": "michiru.mp3"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "（そうか……。僕にも、あったんだ。朔良の暴走を止められる、僕だけの異能が）"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "だけど、僕の小さな力だけじゃ、彼女が世界中から吸い上げてしまった巨大なエネルギーの濁流を相殺しきれない。このままじゃ、朔良の精神も肉体も、耐えきれずに崩壊してしまう。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "彼女を救う方法は、一つしかなかった。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "僕のこの【無効化の異能】ごと、僕の存在のすべてを、彼女の器の中に注ぎ込んで、内側からその暴走を中和するしかない。"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "それは、僕という存在が、朔良の異能に完全に『取り込まれる』ことを意味していた。二度と、人間の姿には戻れないかもしれない。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……いいよ、朔良」"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "僕は覚悟を決め、愛おしい彼女の小さな身体を、強く、強く抱きしめ返した。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「今まで、いじめっ子からも、何からも、いつも僕の前に立って守ってくれたのは朔良だった。……今度は、僕が朔良を守る番だ」"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "僕の身体から、眩いほどの白い光が溢れ出す。",
    "action": "AWAKEN_MICHIRU"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "その光は、朔良の身体を包む赤黒い闇を優しく包み込み、彼女の内側へと溶けるように、吸い込まれていく。",
    "action": "BLACK_AURA_STOP"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "ゴゴゴゴ、と脳裏で世界が鳴動するような音が響く。",
    "action": "SHAKE_SCREEN_VERY_LARGE"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "僕の指先から、感覚が消えていく。身体が融けて、彼女の精神の海へと沈んでいくのがわかる。恐怖はなかった。ただ、朔良の呼吸がみるみるうちに静かになっていくのが、何よりも嬉しかった。"
  },
  {
    "scene": "回想：朔良の部屋",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "（さよなら、朔良。これからは……君の心の中から、ずっと守るからね）"
  },
  {
    "scene": "回想：朔良の部屋",
    "text": "視界が真っ白に染まり、僕は深い、深い、彼女の闇の中へと完全に取り込まれていった。",
    "action": "WHITE_OUT",
    "clearIllust": true
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……ああぁぁぁ……っ！！！」",
    "action": "CLEAR_WHITE_OUT_AND_FLASHBACK_END",
    "bg": "/scene/ruki.png"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「…朔良……！！！」",
    "showIllust": [
      "Michiru_surprise"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "頭に割れるような痛みが走る。すべて思い出した。思い出してしまった。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "あの光景を。満を、取り込む光景を。おぼろげながらに見えていた惨劇を。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「あはは！ ようやく思い出したかな？ 自分の最愛の幼馴染を自分の手で美味しく頂いちゃってた時の気分はさぁ！」",
    "showIllust": [
      "Ruki_neutral"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキの邪悪で愉悦に満ちた笑い声が、遠くで響く。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良……っ！ 僕のことはいい！ 惑わされるな、前を見るんだ……！！」",
    "showIllust": [
      "Michiru_surprise"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "消え入りそうな、けれど必死な満の声が私の耳に届く。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……う、あ……っ……」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "激しい頭痛と、あまりの真実に、視界が涙で歪む。自分の犯した罪の重さに、このまま消えてしまいたかった。",
    "action": "TEAR_BLUR_START"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "だけど、その絶望の淵で、必死に手を伸ばし、私を庇い続けている背中が目に入る。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満は、まだ私の目の前に立っている。私の罪の証であり、私のために命を捧げてくれた、かけがえのない私の幼馴染が、今もボロボロになりながら私を守ろうとしてくれている。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「朔良……！ 聞いて、くれ……っ！」",
    "showIllust": [
      "Michiru_serious"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満が私の両手を包んだ。彼の体温はとても心地よく、気分を落ち着かせた。",
    "action": "TEAR_BLUR_STOP"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「君は、僕を殺してなんかいない……！僕は君を、守りたかった……っ！ それは、僕が、僕自身の意志で選んだ未来だ……！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満の瞳から、一筋の涙がこぼれ落ちる。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「だから自分を責めないで……。君の手は、誰かを傷つけるためのものじゃない。いつだって、僕を守ってくれた、優しくて強い手だ……っ！」",
    "showIllust": [
      "Michiru_smile"
    ]
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "その言葉が、私の凍りついた心を、激しく揺さぶった。 そうだ。泣いて蹲っている場合じゃない。今、私がここで諦めたら、助けに来てくれたみんなも、私を守ってくれているこの瞬間も、すべてが無駄になってしまう。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（私は……満に守られてばかりの、弱虫じゃない……！）"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ル、キ……ッ！！」",
    "bgm": "Battle2.mp3",
    "bgmFade": 3,
    "bgmVolume": 0.4
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私は涙を乱暴に拭い、地面を強く蹴って立ち上がった。 頭痛はまだ残っている。胸の痛みも消えない。だけど、お腹の底から、今までにないほど熱い感情が湧き上がってくるのを感じた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満を、これ以上傷つけさせない。この世界を、私たちの家族の因縁で終わらせたりしない。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「姉さん、正気に戻っちゃったんだ？……じゃあ、今度こそ容赦なく、その光ごと消し飛ばしてあげるよ！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキの顔から余裕の笑みが完全に消え去った。苛立ちと共に、部屋全体を圧殺するほどの漆黒の異能が、まるで巨大な津波のように膨れ上がっていく。",
    "action": "DARK_ENERGY_GATHER"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いくよ、満……っ！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「うん。君の背中は、僕が守る！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満が私の隣へと並ぶ。その凍えるほど冷たい、愛おしい手を、今度は私の方から強く、強く握りしめた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私の内側から、満の『無効化』の異能と共鳴するように、純白の光が溢れ出す。",
    "action": "SHOW_ENERGY_AURA"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「死ねよ、二人まとめて！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキが両手を振り下ろすと同時に、漆黒の光弾が豪雨のように私たちへと降り注いだ。",
    "action": "CLEAR_DARK_ENERGY"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満が瞬時に展開した白い結界に、激しい衝撃が容赦なく叩きつけられる。轟音が部屋中に響き渡り、衝撃波で床の装甲が次々と剥がれ飛んでいく。",
    "action": "SHAKE_SCREEN_VERY_LARGE"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「くっ……！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "満の身体がその圧力に押し潰されそうになるのを見て、私は一歩前に踏み出した。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（私は、もう奪わせない！）"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "覚醒した私の器が、ルキの放つ全異能の奔流を、そして満の無効化の光を、驚異的な速度で吸い上げ、私自身の力へと変換していく。私の中に眠っていた、本物の『成功作』としての規格外の力が、今完全に目を覚まそうとしていた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「これで……終わりだよ」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキがすべての異能を一点に集束させ、世界をも穿つような巨大な漆黒の光線を放つ。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "防戦一方に見えたその瞬間、私は満の手をさらに強く握り締め、私たちのすべての力を解放した。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「満！ 私たちの力で、止めるよ……っ！！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……ああ、いこう、朔良！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私たちの間に溢れた純白の輝きが、眩い旋律となって天へと昇る。ルキの圧倒的な闇の力と、私たちの絆が紡ぎ出す光の異能が真っ向から激突し、空間そのものが激しく震え始めた。",
    "action": "SHAKE_SCREEN_EXTREME"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "まばゆい光が部屋を完全に包み込み、すべての音が消え去る。",
    "action": "WHITE_OUT_START",
    "bgm": "stop"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "……やがて、ゆっくりと光が収束していく。 強烈な残光に瞬きを繰り返し、恐る恐る目を開ける。すると、凶悪だった漆黒のエネルギーは跡形もなく霧散し、静まり返った部屋の中央で、ルキが床にうずくまっていた。",
    "action": "WHITE_OUT_END_SLOW",
    "bgm": "mutsu_theme"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ルキ……」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私が息を呑んでその名を呼ぶ。 ルキは肩を小さく震わせ、力なく下を向いたままだったが、やがて、力のない乾いた笑い声を漏らした。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「……はは……。はーあ、つまんないの」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキの表情からは、さっきまでの狂気や敵意が嘘のように消え失せ、ただ酷く退屈そうで、どこか寂しげな、年相応の子供の顔に戻っていた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「これで満足？ 姉さん。僕を殺すなら今のうちだよ。……どうせ僕には、もう何も残ってないんだから」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "自暴自棄に言い放つルキ。その姿に、私はあの日、公園の隅でいじめられていた満の姿が重なって見えた。この子もきっと、誰も助けてくれない暗闇の中で、ずっと一人で泣いていたのだ。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私は満の手をそっと離し、ゆっくりとルキの方へと歩みを進めた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私はうずくまるルキの前にしゃがみ込み、その小さな肩をそっと抱きしめた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「え……っ？ なに、して……」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "驚いて身体を硬直させるルキに、私は優しく語りかける。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「もう終わりだよ、ルキ。あなたはもう、一人で暗い場所にいる必要はないの。……生きて、自分の本当にやりたいことを見つけて」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「……馬鹿じゃないの。僕は世界を滅ぼそうとしたんだよ……？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキは信じられないものを見る目で私を見つめた。だが、私の真っ直ぐな瞳に何かを感じ取ったのか、ふっと諦めたように視線を逸らし、大きくため息をついた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「はーあ……。本当に調子狂うな、姉さんは。……ほら、早く行きなよ。もうあのコアは、僕の制御を離れて勝手に完全暴走を始めてる」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……！？」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「止める方法は一つだけ。コアの制御中枢に、姉さんとその幼馴染の『相反する二つの光』を直接流し込んで、リンクさせるんだ。それしか、あのエネルギーの暴走を相殺する手段はないよ」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキはぶっきらぼうにそう言うと、コアへと続く最奥の隔壁を指し示した。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ありがとう、ルキ」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私は彼に微笑みかけ、立ち上がった。ルキをここで置いていくことに迷いはなかった。彼はもう戦う意志を失っている。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「……ねえ、姉さん」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "踵を返そうとした私の背中に、ルキがぽつりと、掠れた声を投げかけてきた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "「その力は、すべてを元通りに『中和』する光だ。……失われたはずの命の器を、本当の形に固定することだって、あるいはできるかもしれない。もっとも、その光が最後まで消えずに残っていれば、の話だけどさ」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ルキはそれ以上何も言わず、ただふいっと顔を背けた。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "ぶっきらぼうで、歪んだ彼の、それが精一杯の優しさだったのだろう。その言葉の裏にある意味を……私は、今は知らないフリをした。"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「……行こう、朔良。世界を救いに」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「うん！」"
  },
  {
    "scene": "最奥部屋（コア無い感じの別室）",
    "text": "私は満と共に、激しく脈動する光を放つコアの間へと、迷いなく走り出した。"
  },
  {
    "scene": "コアの間",
    "text": "最奥の部屋へと飛び込むと、そこには部屋の大部分を占める巨大なコアが、今にも爆発しそうなほど不安定に明滅を繰り返していた。周囲に満ちるエネルギーの圧力が、肌をジリジリと焦がすように伝わってくる。",
    "bg": "/scene/core.png"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これが、すべての元凶……」"
  },
  {
    "scene": "コアの間",
    "text": "周囲を見渡しても、教授や黒騎士や仲間たちの姿はどこにも見当たらなかった。けれど、今はみんなの安否を気にしている暇はない。一刻も早く、この暴走を止めなければ、世界そのものが消し飛んでしまう。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「満、いくよ……！」"
  },
  {
    "scene": "コアの間",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「うん。僕たちの力を、あの中心へ」",
    "showIllust": [
      "Michiru_smile"
    ]
  },
  {
    "scene": "コアの間",
    "text": "私と満は並んで立ち、激しく明滅するコアの制御中枢へと、同時に両手をかざした。",
    "hideIllust": [
      "Michiru_smile"
    ]
  },
  {
    "scene": "コアの間",
    "text": "私の器から溢れる異能の光と、満の持つ無効化の光。二つの相反する力が指先から紡ぎ出され、コアへと伸びていく。"
  },
  {
    "scene": "コアの間",
    "text": "けれど、あまりにも巨大な世界の破壊エネルギーを前に、私の心に弱気な恐怖がよぎった。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（本当に、私なんかで止められるのかな……）"
  },
  {
    "scene": "コアの間",
    "text": "その瞬間──。"
  },
  {
    "scene": "コアの間",
    "text": "バシッ、バシッ！ と、私の背中に懐かしい、力強い衝撃が走った。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「痛っ……！」"
  },
  {
    "scene": "コアの間",
    "text": "驚いて隣を見ると、満がいたずらっぽく、けれど最高に心強い笑顔で私を見ていた。",
    "showIllust": [
      "Michiru_smile"
    ]
  },
  {
    "scene": "コアの間",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「ちょっと、気弱すぎるよ朔良！ ほら！ もっと自信もって！！」"
  },
  {
    "scene": "コアの間",
    "text": "中学生の頃、気弱だった彼に私がそっくりそのまま投げかけた言葉。それを今、満が私を奮い立たせるために、満面の笑みで返してくれたのだ。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ふふっ……あはは！ …そうだね、私たちなら、できるよね！」"
  },
  {
    "scene": "コアの間",
    "text": "張り詰めていた恐怖が、一瞬で吹き飛んだ。私たちは顔を見合わせ、声を合わせて笑い合った。そうだ、私には満がいる。二人なら、どんな未来だって変えられる。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いくよ、満！」"
  },
  {
    "scene": "コアの間",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「ああ、朔良！」"
  },
  {
    "scene": "コアの間",
    "text": "私たちは再び前を見据え、お互いの意識を極限まで集中させた。",
    "bg": "/scene/core_close2.png",
    "hideIllust": [
      "Michiru_smile"
    ]
  },
  {
    "scene": "コアの間",
    "text": "握りしめた手から、私たちの絆そのものである純白の光が爆発的に膨れ上がる。相反する二つの輝きは、美しい旋律のような光の奔流となり、まっすぐにコアの最深部へと突き刺さった。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「終わらせよう…！」"
  },
  {
    "scene": "コアの間",
    "text": "私たちのすべての想いを乗せた光が、コアの闇を中和していく。"
  },
  {
    "scene": "コアの間",
    "text": "次の瞬間、臨界点を迎えたコアは、眩い光の粒子となって音もなく弾け飛び、跡形もなく完全に破壊された。",
    "action": "WHITE_OUT_START",
    "se": "explosion.mp3"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「終わったね、満————」",
    "bg": "/scene/core_close_Nothing2.png",
    "action": "WHITE_OUT_END_SLOW"
  },
  {
    "scene": "コアの間",
    "text": "やり遂げた安堵感に包まれながら、私はそう言って隣を振り返った。 微笑みを交わし、繋いだ手の温もりを確かめ合おうとした。"
  },
  {
    "scene": "コアの間",
    "text": "だけど──そこに、誰もいなかった。"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？ 満……？」"
  },
  {
    "scene": "コアの間",
    "text": "ゴゴゴゴゴ……ッ！！",
    "action": "SHAKE_SCREEN_EXTREME"
  },
  {
    "scene": "コアの間",
    "text": "激しい地鳴りが響き、部屋の天井から火花と瓦礫が落ちてくる。コアを失った月面基地の崩壊が始まったのだ。ただ呆然と立ち尽くしていると、背後から誰かが私の肩を強く叩いた。",
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「な……凪砂さん……！？」",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "コアの間",
    "text": "振り返ると、そこには息を切らした凪砂さんが立っていた。"
  },
  {
    "scene": "コアの間",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「どうも。ミッション達成でお疲れのところ悪いけど、このままだと崩壊に巻き込まれて死んじゃうよ」"
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん……満……！ 満を知りませんか！？ さっきまで私の隣にいた……っ、白髪の男の子！！」"
  },
  {
    "scene": "コアの間",
    "text": "私は凪砂さんの腕にすがりつき、必死に叫んだ。 けれど、凪砂さんは怪訝そうな顔をして、手元の端末の画面に目を落とした。"
  },
  {
    "scene": "コアの間",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……誰の話？ ここの生体反応は、最初から5人しかいないはずだけど」",
    "showIllust": [
      "Nagisa_serious"
    ]
  },
  {
    "scene": "コアの間",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……5人……？」"
  },
  {
    "scene": "コアの間",
    "text": "頭の中で素早く指を折る。私、凪砂さん、ムッちゃん、ミカくん、アカネさん……。"
  },
  {
    "scene": "コアの間",
    "text": "思案をしていると、メキメキと不穏な音を立てて、壁が崩落を始める。"
  },
  {
    "scene": "コアの間",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ほら！ 考えるのは後！ 行くよ！ あのデカマフィアが、急いで脱出用ロケットを準備して待ってる！」"
  },
  {
    "scene": "コアの間",
    "text": "私は消えてしまった満のいた空間を最後にもう一度だけ見つめ、涙を堪えて崩れゆく通路へと走り出した。",
    "action": "FADE_TO_BLACK"
  },
  {
    "scene": "地球への帰還",
    "text": "その後のことは、あまりよく覚えていない。",
    "action": "SLOW_FADE_IN",
    "bg": "/scene/sky.png"
  },
  {
    "scene": "地球への帰還",
    "text": "ただ、凪砂さんに腕を引かれるまま、崩壊する月面基地を無我夢中で駆け抜けたこと。ムッちゃんが用意してくれた脱出用ロケットに4人の仲間たちと共に飛び乗り、激しい重力に耐えながら、いつの間にか青い地球へと戻っていたこと──"
  },
  {
    "scene": "地球への帰還",
    "text": "それだけが、古い映画の断片のように頭に残っている。"
  },
  {
    "scene": "地球への帰還",
    "text": "地球に帰還してからの数ヶ月は、怒涛のようだった。"
  },
  {
    "scene": "地球への帰還",
    "text": "あんなに街を恐怖に陥れていたキメラ騒動は、驚くべき速さで鎮圧へと向かった。対策本部が総力を挙げて開発した中和剤によって、異形化していた生物たちは次々と元の姿を取り戻し、崩壊しかけていたインフラも急速に復興を遂げている。"
  },
  {
    "scene": "地球への帰還",
    "text": "首謀者であった教授や、すべての異能を持っていた私の弟・ルキの行方は、あの崩壊以来、今も不明のままだ。どこかで生きているのか、それとも──。それを知る術は、今のところない。"
  },
  {
    "scene": "地球への帰還",
    "text": "やがて街には、かつての平穏な日常が戻るようになった。 世界が元通りになる中で、唯一変わったことといえば、あのキメラ騒動の終息とともに、この世界から『異能』という存在そのものが完全に消え去ったことだ。"
  },
  {
    "scene": "地球への帰還",
    "text": "コアの破壊と引き換えに、世界中の異能の因子が中和されたらしい。誰もが特別な力を持たない、ただの人間になった。 そのせいだろうか。心なしか、行き交う人々の表情はどこか柔らかくなり、怯えや猜疑心の消えた穏やかな空気が街を包み込んでいる。"
  },
  {
    "scene": "帰り道",
    "text": "私は、かつて満と並んで歩いた通学路を、一人で歩いていた。",
    "bg": "/scene/shopping_street_night.png",
    "bgm": "mutsu_theme"
  },
  {
    "scene": "帰り道",
    "text": "あの時は混乱していてすぐに分からなかったけれど、今ならはっきりと分かる。実体を持たない幽霊だった満は、この世界に満ちる異能の源──あのコアの強大な力によって、存在を繋ぎ止められていたのだ。"
  },
  {
    "scene": "帰り道",
    "text": "コアが壊れてしまえば、エネルギーの供給を失った彼は、この世界に存在を保っていられない。"
  },
  {
    "scene": "帰り道",
    "text": "満は、最初からそれを分かっていた。自分が消えてしまうと知っていながら、それでも私を救うために、世界を守るために、あの時迷わず一緒にコアを破壊してくれたんだ。"
  },
  {
    "scene": "帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……バカだよ、本当に」"
  },
  {
    "scene": "帰り道",
    "text": "ぽつりと呟いた声が、静まり返った夜の街に寂しく溶けていく。"
  },
  {
    "scene": "帰り道",
    "text": "歩きながら、私はそれと同時に、ルキのあの言葉を思い出していた。"
  },
  {
    "scene": "帰り道",
    "speaker": "ルキ",
    "role": "RUKI",
    "text": "『その力は、すべてを元通りに『中和』する光だ。……失われたはずの命の器を、本当の形に固定することだって、あるいはできるかもしれない。もっとも、その光が最後まで消えずに残っていれば、の話だけどさ』"
  },
  {
    "scene": "帰り道",
    "text": "失われたはずの命……きっとこれは満のことで、コアが失われれば消えしてしまうことと同義なのだと、私はあの瞬間から勘づいていた。"
  },
  {
    "scene": "帰り道",
    "text": "でもその後の言葉──本当の形に固定する。この意味だけはどうしても分からなかった。それでもひとつ確かなことは───。"
  },
  {
    "scene": "帰り道",
    "text": "もう満は、どこにもいなくなってしまった。世界がどれだけ平和になっても、あの優しい笑顔で私の背中を叩いてくれる人はいない。"
  },
  {
    "scene": "帰り道",
    "text": "だって、あの日──。彼を私の内側に取り込み、本当の意味で殺してしまったのは、他でもない私なのだから。"
  },
  {
    "scene": "帰り道",
    "text": "街灯の冷たい光が、私の影を長く、孤独に地面へと伸ばしていた。"
  },
  {
    "scene": "帰り道",
    "text": "もう二度と、私の名前を呼ぶあの声は聞こえない。そう思うと視界が急激に滲み、私は立ち止まって、下を向いたまま溢れそうになる涙を必死に堪えた。"
  },
  {
    "scene": "帰り道",
    "text": "──コツ、と。"
  },
  {
    "scene": "帰り道",
    "text": "闇に包まれた帰り道に、微かな足音が響いた。"
  },
  {
    "scene": "帰り道",
    "text": "めったに人は通らないはずの裏路地。"
  },
  {
    "scene": "帰り道",
    "text": "気のせいだと思おうとしたけれど、足音はまっすぐにこちらへ近づいてきて、私の目の前でぴたりと止まった。"
  },
  {
    "scene": "帰り道",
    "text": "私はゆっくりと、泣きそうになった顔を上げた。"
  },
  {
    "scene": "帰り道",
    "text": "そして──息をすることさえ忘れるほどの、驚くべき光景を目にした。"
  },
  {
    "scene": "帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「—————。」"
  },
  {
    "scene": "帰り道",
    "text": "そこに立っていたのは、夜の闇の中で、街灯の光に照らされた一人の青年だった。",
    "bgm": "escape.mp3",
    "showIllust": [
      "Michiru_smile"
    ]
  },
  {
    "scene": "帰り道",
    "text": "それは、かつて私の記憶の中で融けていった、あの頼りない少年の姿ではなかった。少しがっしりとした体つきに、優しげで、けれどどこか芯の通った大人の男の子の佇まい。"
  },
  {
    "scene": "帰り道",
    "text": "そして何より、月明かりを浴びてきらきらと輝くその髪は…あの日、公園の隅で見たのと同じ、純白の輝きを放っていた。"
  },
  {
    "scene": "帰り道",
    "text": "暗い夜の背景と、白くきらめく髪とのコントラストが、まるで奇跡の境界線のように美しく彼を縁取っている。"
  },
  {
    "scene": "帰り道",
    "text": "幻を見ているのかもしれない。あまりの衝撃に、私が驚いてまばたきをした瞬間、堪えきれなくなった一筋の涙が、私の頬を伝ってぽろりとこぼれ落ちた。"
  },
  {
    "scene": "帰り道",
    "text": "すると、目の前の青年が、困ったように眉を下げて、愛おしそうに目を細めた。"
  },
  {
    "scene": "帰り道",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「…………朔良」",
    "showIllust": [
      "Michiru_happy"
    ]
  },
  {
    "scene": "帰り道",
    "text": "幻じゃない。その優しくて、どこか懐かしい声が、確かに私の名前を呼んだ。"
  },
  {
    "scene": "帰り道",
    "text": "異能が消え去ったはずの世界。コアが壊れてもなお、彼は確かにそこにいて、温かい体温を持って佇んでいる。ルキの遺した言葉の意味が脳裏をよぎった。それがこの奇跡なのだとしたら────。"
  },
  {
    "scene": "帰り道",
    "speaker": "満",
    "role": "MICHIRU",
    "text": "「ただいま、朔良」"
  },
  {
    "scene": "帰り道",
    "text": "彼がいつものように、心の底から嬉そうに、眩いばかりの笑顔を咲かせる。"
  },
  {
    "scene": "帰り道",
    "text": "その笑顔を見た瞬間、私の胸の奥にたまっていた暗い絶望の霧が、一瞬で綺麗に晴れ渡っていった。"
  },
  {
    "scene": "帰り道",
    "text": "ただいま、と彼が言ってくれた。なら、私が返す言葉は、世界でたった一つしか残されていない。"
  },
  {
    "scene": "帰り道",
    "text": "思わず私の口からこぼれた言葉は、涙混じりの、剥き出しの叫びだった。"
  },
  {
    "scene": "帰り道",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…おかえり……っ、おかえり……！！満！！」"
  },
  {
    "scene": "帰り道",
    "text": "私は駆け出し、幻なんかじゃない、確かにそこに存在する彼の胸へと、思いきり飛び込んだ。"
  },
  {
    "scene": "帰り道",
    "text": "見上げれば、漆黒の空には黄色い、温かな光を宿した月が、私たちを優しく見守るように静かに輝いていた。",
    "action": "FADE_TO_HAPPY_END"
  },

  //=============== 凪砂ルート ===============

  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「おっと、危ない」",
    "label": "nagisa_route_start"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "shakeEffect": "small",
    "text": "低く穏やかな声と共に、私は誰かの腕の中へ抱き留められた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ、凪砂さん……！？」",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "息一つ乱していない凪砂さんは、背後へ視線を向ける。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "周囲を見渡すと、睦則も、ミカくんも、あの恐ろしい大男も、混沌としたキャンパスの残骸の中でいつの間にかはぐれてしまっていた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「さて、と。どうしようか」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「研究室へ……！ 教授のところへ行きましょう！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "私の言葉に頷くと、凪砂さんは私の手を掴んで走り出した。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "bgAnimation": "dash",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「──了解。とりあえず、あの鎧野郎から逃げようか」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "強く手を引かれながら、私は教授の研究室へ向かって彼を案内する。",
    "bgAnimation": "dash",
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "背後から迫るの気配に追われるように廊下を駆け抜け、研究室へ飛び込んだ。",
    "bgAnimation": "dash",
  },
  {
    "scene": "研究室",
    "bg": "/scene/lab.png",
    "bgAnimation": "stop",
    "bgm": "stop",
    "bgmFade": 1,
    "text": "扉に鍵を掛けると、静かな室内には青白いモニターの光が広がり、中央には巨大な金属製ハッチが口を開けていた。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "研究室",
    "text": "その前で待っていたのは、ヒルミ教授だった。",
    "showIllust": [
      "Hirumi_smile4"
    ]
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「おや、無事だったか。……それと、この前うちの生徒と揉めてた子かな。……まあいいや。状況はだいたい分かっているよ」"
  },
  {
    "scene": "研究室",
    "text": "教授は凪砂さんを一瞥すると、すぐ本題へ入る。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「時間がない。君たちにはこれから、このロケットで月へ向かってもらう」"
  },
  {
    "scene": "研究室",
    "text": "突然の言葉に、私たちは息を呑む。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「お言葉ですが、仰っている意味がよく分かりません。もう少し説明して頂かないと、ね」",
    "showIllust": [
      "Nagisa_neutral2"
    ]
  },
  {
    "scene": "研究室",
    "text": "凪砂さんが冷静に問い返すが、教授は首を横に振った。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「学校関係者でない君にこんなことを頼むのは心苦しいが……分かってくれないかな」"
  },
  {
    "scene": "研究室",
    "text": "白衣のポケットに手を入れ、静かに、けれど逃げ道を塞ぐような重みのある声で教授が諭す。"
  },
  {
    "scene": "研究室",
    "text": "その頑なな態度に、凪砂さんは「はぁ……」と深いため息をつき、大袈裟に肩をすくめてみせた。隠そうともしない、ひどく面倒くさそうな顔だ。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「外の黒い怪物も、この世界の異変も、すべては人工月にある『研究所のコア』が原因だ。世界を元に戻したければ、コアを止めるしかない」"
  },
  {
    "scene": "研究室",
    "text": "その言葉を聞いて、男に拉致されたアジトで発見した文言が頭によぎった。"
  },
  {
    "scene": "研究室",
    "text": "『……異能力やキメラの発現には、政府が隠ぺいした人工月が関係している』"
  },
  {
    "scene": "研究室",
    "text": "『……その中の、研究所によって守られる“コア”が発生源と仮定されており……』"
  },
  {
    "scene": "研究室",
    "text": "…やっぱりあの文章に書かれていたことは本当のことだった。"
  },
  {
    "scene": "研究室",
    "text": "教授は私たちへ一冊の手記を差し出す。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「教授は……？」"
  },
  {
    "scene": "研究室",
    "text": "私が問いかけると、教授は穏やかに微笑んだ。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「私のことは心配いらない。さあ、行きなさい」"
  },
  {
    "scene": "研究室",
    "text": "そう言うと教授は迷いなく起動スイッチを押した。"
  },
  {
    "scene": "研究室",
    "action": "SHAKE_SCREEN",
    "se": "+bakuhatsu.mp3",
    "text": "遠くから防壁を叩き割るような凄まじい爆音が響き、研究室全体が大きく揺れた。アイツが、すぐそこまで来ている。"
  },
  {
    "scene": "研究室",
    "text": "──黒騎士が、ここまで迫っている。"
  },
  {
    "scene": "研究室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……面倒だけど、行くしかないか」"
  },
  {
    "scene": "研究室",
    "text": "凪砂さんはため息をつきながらも、迷わずロケットへ向かう。",
    "showIllust": [
      "Nagisa_neutral3"
    ],
    "hideIllust": [
      "Hirumi"
    ]
  },
  {
    "scene": "研究室",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ほら、早く。置いていくよ」"
  },
  {
    "scene": "研究室",
    "text": "凪砂さんに腕を引かれ、私は機内へ飛び込む。その直後、重い金属音とともにハッチが閉じ、私たちは外の世界から完全に隔てられた。"
  },
  {
    "scene": "ロケット内部",
    "bg": "/scene/rocket.png",
    "bgm": "stop",
    "bgmFade": 1,
    "text": "ロケット内部は、無機質な計器と二人分のシートだけが並ぶ狭い空間だった。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "私たちがシートへ座りベルトを締めた瞬間"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『システム起動。カウントダウン、最終シークエンスへ移行』"
  },
  {
    "scene": "ロケット内部",
    "se": "+rocket_launch_Sound.mp3",
    "text": "機械音声と共に機体が激しく震え、ロケットは轟音を上げて人工月へ向かって飛び立った。"
  },
  {
    "scene": "ロケット内部",
    "shakeEffect": "small",
    "text": "強烈な重力が身体をシートへ押し付ける。窓の外では街の灯りが遠ざかり、青白い人工月だけが大きく迫っていた。"
  },
  {
    "scene": "ロケット内部",
    "se": "stop",
    "shakeEffect": "stop",
    "text": "狭い機内を、重苦しい沈黙が包む。隣を見ると、凪砂さんが相変わらず余裕そうな表情で座っている。"
  },
  {
    "scene": "ロケット内部",
    "text": "この人は何者なのだろう。なぜここまで私についてくるのか。その真意は分からないまま、不安だけが募っていく。\nそんな沈黙を破ったのは、凪砂さんだった。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「思ったんだけどさ。君と二人きりってことは……実質デートかな」",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「な、何言ってるんですか……！？」"
  },
  {
    "scene": "ロケット内部",
    "text": "思わず振り向くと、凪砂さんは何も答えず、ただ静かに私を見つめていた。その瞳は、笑っていない。"
  },
  {
    "scene": "ロケット内部",
    "text": "底知れない冷たさに息を呑み、思わず視線を逸らす。すると彼は小さく笑う。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……ふふ、楽しみだなぁ」"
  },
  {
    "scene": "ロケット内部",
    "text": "その言葉の意味を尋ねようとした瞬間──"
  },
  {
    "scene": "ロケット内部",
    "action": "RED_ALERT_START",
    "bgm": "+alert_Rocket.mp3",
    "text": "ピピピピピッ！！"
  },
  {
    "scene": "ロケット内部",
    "text": "機内にけたたましい警報が鳴り響く。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『警告。推進システムに致命的なエラー。機体の制御が不可能です』"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「えっ……！？」"
  },
  {
    "scene": "ロケット内部",
    "text": "身体がふわりと浮き、ロケットが大きく傾く。"
  },
  {
    "scene": "ロケット内部",
    "text": "窓の外では青い月が激しく回転し、機体全体が悲鳴のような金属音を上げ始めた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「………」",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "ロケット内部",
    "action": "SHAKE_SCREEN_EXTREME",
    "text": "ガガガガガッ！！",
    "se": "Rocket_Shock.mp3"
  },
  {
    "scene": "ロケット内部",
    "text": "激しく揺れる機体の中、私は迫る死の恐怖に息を呑むことしかできなかった。"
  },
  {
    "action": "FADE_TO_BLACK",
    "duration": 4000,
    "se": "stop",
    "bgm": "stop",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "ロケット内部（崩壊）",
    "bg": "black",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……う、ぅ……」",
    "action": "CLEAR_SHAKE"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "重い瞼を開くと、視界に映ったのは、ひしゃげた計器類と火花を散らすロケット内部だった。",
    "bg": "/scene/rocket_collapse.png",
    "action": "WAKE_UP"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "額の痛みに耐えながら身を起こすと、少し離れた場所で凪砂さんが壊れた制御パネルを調べていた。私に気づくと、静かに振り返る。",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「起きた？ 寝坊助さん」",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……私、生きてるの？」"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「不幸中の幸いだね。まさかロケットがここまでボロいとは思わなかったよ」"
  },
  {
    "scene": "ロケット内部（崩壊）",
    "text": "軽口を叩く凪砂さんとは対照的に、私は不安を抱えたまま立ち上がり、壊れた機体の外へ足を踏み出した。"
  },
  {
    "scene": "月面",
    "bgm": "Moon.mp3",
    "bg": "/scene/moon_surface.png",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──っ、何……ここ」",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "月面",
    "text": "目の前に広がっていたのは、大学でも街でもない、見知らぬ世界だった。"
  },
  {
    "scene": "月面",
    "text": "白く乾いた大地。その先には、風化した巨大な建造物の廃墟がどこまでも続いている。"
  },
  {
    "scene": "夜空（月）",
    "bg": "/scene/yellow_moon.png",
    "text": "そして空を見上げた私は、息を呑んだ。"
  },
  {
    "scene": "夜空（月）",
    "text": "青い人工月ではない、柔らかな黄金色に輝く月が静かに浮かんでいた。"
  },
  {
    "scene": "夜空（月）",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……こんな星、本当にあったんだね」"
  },
  {
    "scene": "夜空（月）",
    "text": "凪砂さんが空を見上げる。"
  },
  {
    "scene": "夜空（月）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「黄色い……月……」"
  },
  {
    "scene": "夜空（月）",
    "text": "ずっと伝説だと思っていた、本物の月。人工の光に汚されていない、柔らかい光を放つその姿に、私の胸は震えた。"
  },
  {
    "scene": "夜空（月）",
    "text": "お父さんの話は、本当だった。"
  },
  {
    "scene": "夜空（月）",
    "text": "…きっと世界の真実も、お父さんの行方も、この先にある。そんな漠然とした予感だけが私の頭を駆け巡る。"
  },
  {
    "scene": "夜空（月）",
    "text": "それに、あの地球の惨劇を止めるのも私たちの行動次第なのだと思う。\n…怖い、だけど進まなきゃいけない。"
  },
  {
    "scene": "夜空（月）",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「いつまで見惚れてるの？」"
  },
  {
    "scene": "月面",
    "bg": "/scene/moon_surface.png",
    "text": "冷たい声に我に返る。",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "月面",
    "text": "振り向くと、凪砂さんは腕を組んだまま、興味なさそうに私を見下ろしていた。本物の月を目の前にしても、その表情はどこまでも冷静だ。"
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「なんか紙渡されてたよね？ 見せて」"
  },
  {
    "scene": "月面",
    "text": "ぶっきらぼうに差し出された手に、私はポケットからヒルミ教授にもらった紙束を取り出した。"
  },
  {
    "scene": "月面",
    "text": "差し出そうとした、その瞬間。\nスッと凪砂さんが一歩踏み込み、私との距離が一気に縮まる。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "月面",
    "shakeEffect": "small",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ！？」"
  },
  {
    "scene": "月面",
    "text": "額が触れそうなほど近い。\n紙を覗き込むために身を寄せた彼の吐息が耳元をかすめ、思わず肩が跳ねた。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ち、近いですっ！」"
  },
  {
    "scene": "月面",
    "text": "身を引く私を見て、凪砂さんは小さく笑う。"
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「こうしないと読めないでしょ？」",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "月面",
    "text": "からかっているのか、本当に見えにくいだけなのか分からない。\nドキドキとうるさい鼓動をごまかしながら、私は紙へ視線を落とした。"
  },
  {
    "scene": "月面",
    "type": "choice",
    "text": "手記の内容を確認しますか？",
    "choices": [
      {
        "text": "確認する",
        "targetLabel": "read_professors_note2"
      },
      {
        "text": "スキップする",
        "targetLabel": "skip_professors_note2"
      }
    ],
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "label": "read_professors_note2",
    "scene": "月面",
    "text": "教授の手記には、研究所の最奥にある『コア』がの発生源であること、そしてそこへ辿り着くには、研究所各地に散らばる《セキュリティ解除コードの断片（フラグメント）》をすべて回収する必要があると書かれていた。",
    "hideIllust": [
      "Nagisa"
    ],
    "showItem": "/item/Message.png",
    "se": "+paper.mp3"
  },
  {
    "scene": "月面",
    "text": "裏面には研究所の簡易マップと、フラグメントの配置図が記されている。"
  },
  {
    "scene": "月面",
    "text": "さらに最後のページには、教授からの注意書きが残されていた。"
  },
  {
    "scene": "月面",
    "text": "『コアは物理的には破壊できない。適応者の異能を限界まで流し込み、停止させるしかない』"
  },
  {
    "scene": "月面",
    "text": "『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』"
  },
  {
    "label": "skip_professors_note2",
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……要するに、フラグメントを全部回収してコアを止めて、地下のロケットで帰れってことか」"
  },
  {
    "scene": "月面",
    "hideItem": true,
    "text": "お互い読み終えたことを確認して、私は手記をしまう。"
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……フラグメントねぇ。面倒くさいことになったな」",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "月面",
    "text": "手記を閉じながら、凪砂さんは露骨にため息をつく。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな言い方……。教授は私たちを助けるために、この手記を残してくれたんですよ」"
  },
  {
    "scene": "月面",
    "text": "思わず言い返すと、凪砂さんは肩をすくめた。"
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「助けるため、ね。本当にそうなら、もっと安全な方法を考えるべきだったんじゃない？」"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……！」"
  },
  {
    "scene": "月面",
    "text": "反論したいのに、言葉が出ない。\n確かに、私たちは墜落事故に遭い、右も左も分からない場所へ放り出された。"
  },
  {
    "scene": "月面",
    "text": "それでも。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「教授は……あの場で私たちを逃がしてくれました。それだけは、本当です」"
  },
  {
    "scene": "月面",
    "text": "私がそう言うと、凪砂さんは少しだけ目を細めた。",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「君って、本当に人を信じるんだね」"
  },
  {
    "scene": "月面",
    "text": "その声は呆れているようにも、どこか感心しているようにも聞こえた。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「悪いことじゃ、ありません」"
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……そういうことにしておこうか」"
  },
  {
    "scene": "月面",
    "text": "それ以上は何も言わず、凪砂さんは手記の裏面に描かれた地図へ視線を落とす。"
  },
  {
    "scene": "月面",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「研究所って、あの無駄にデカい白い塔のことだよね」"
  },
  {
    "scene": "月面",
    "text": "そう言って、彼は迷いなく歩き始める。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ちょ、ちょっと待ってください！」"
  },
  {
    "scene": "月面",
    "text": "慌てて私はその背中を追いかけた。乾いた風が白い砂を巻き上げ、静まり返った廃墟に二人の足音だけが響く。"
  },
  {
    "scene": "月面",
    "text": "地球を背に、私たちは誰もいない廃墟を抜け、その先にある研究所へと歩き始めた。"
  },
  {
    "scene": "研究所入口",
    "bg": "/scene/lab_entrance.png",
    "text": "研究所の入口へ辿り着いた私たちは、目の前にそびえる巨大な施設を見上げた。辺りは不気味な静寂に包まれ、赤い警告灯だけが規則的に明滅している。"
  },
  {
    "scene": "研究所入口",
    "text": "凪砂さんは施設を一瞥すると、小さく息をついた。",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "研究所入口",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……ここが目的地か。帰るためにも、さっさと終わらせよう」"
  },
  {
    "scene": "研究所入口",
    "text": "そう言って、迷いなく重厚な入口へ歩き出す。"
  },
  {
    "action": "FADE_TO_BLACK",
    "duration": 2000
  },
  //============== フラグメントコレクト ===============
  {
    "scene": "凪砂フラグメントコレクト",
    "action": "TRIGGER_FRAGMENT_COLLECT_NAGISA",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──よしっ、これで最後のデータチップ、回収完了！」",
    "bg": "/scene/Lab_corridor.png",
    "bgm": "Lab.mp3",
    "label": "nagisa_fragment_happy_end"
  },
  {
    "scene": "廊下",
    "text": "制御端末から最後のフラグメントを抜き取り、私は大きく息を吐いた。"
  },
  {
    "scene": "廊下",
    "text": "振り返ると、凪砂さんは壁に背を預けたまま、苛立ったように前髪をかき上げている。その表情はいつになく険しく、心なしか視線が定まっていない。激しい眩暈に耐えているかのように、その指先は小さく震えていた。",
    "showIllust": [
      "Nagisa_serious3"
    ]
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん……？ 大丈夫ですか、なんか様子が……」"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「別に。何でもないから」"
  },
  {
    "scene": "廊下",
    "text": "さっきまでなら、どんな状況でも人をからかうような笑みを浮かべていたはずなのに。今の凪砂さんは、まるで何かを必死に押し殺しているようだった。"
  },
  {
    "scene": "廊下",
    "text": "ピシャリと言い放たれ、私は言葉を失う。機密ファイルで読んだ、あの恐ろしい文字が脳裏をよぎった。"
  },
  {
    "scene": "廊下",
    "text": "──過負荷による感覚拒絶。彼は今、私の声すら、脳を焼き尽くす濁流の一部として苦しんでいるのかもしれない。そんな私の気遣いすら、今の彼には煩わしいだけのようだった。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……もしかして、具合が悪いんですか？」"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……」",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "廊下",
    "text": "一瞬だけ、凪砂さんの瞳が揺れる。けれど、すぐにいつもの薄い笑みを貼り付けた。"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「心配してくれるなんて優しいね。でも、君に気にされるほど弱くないよ」",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "廊下",
    "text": "そう言いながらも、その声にはどこか疲れが滲んでいた。"
  },
  {
    "scene": "廊下",
    "text": "――その時だった。",
    "hideIllust": [
      "Nagisa"
    ],
    "bgm": "stop"
  },
  {
    "scene": "廊下",
    "text": "──ゴゴゴゴ……。",
    "se": "+jishin.mp3",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "廊下",
    "text": "研究所全体が、大きく震え始める。天井から細かな埃が落ち、足元の床が低く唸る。"
  },
  {
    "scene": "廊下",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『警告。侵入者排除システムを起動します』",
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "廊下",
    "text": "閉ざされていた隔壁が開き、その奥から巨大な防衛個体が姿を現した。",
    "bgm": "serious_2.mp3",
    "action": "CLEAR_SHAKE",
    "showIllust": [
      "machine4"
    ],
    "se": "+robot.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……っ、はぁ……ほんと、最後まで面倒かけさせるなよ」",
    "showIllust": [
      "Nagisa_serious2"
    ]
  },
  {
    "scene": "廊下",
    "text": "凪砂さんは深くため息を吐き、ゆっくりと前へ出る。\nその表情から、いつもの余裕は消えていた。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この先に進むためには、こいつを倒すしかない……！）"
  },
  //================= 戦闘開始(凪砂中ボス) ===============
  {
    "scene": "廊下",
    "text": "崩れ落ちた防衛個体を見つめながら、私は荒い呼吸を整える。",
    "bgm": "stop",
    "hideIllust": [
      "machine"
    ]
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……終わった……」"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「まったく。廃れてるくせに、セキュリティだけは一丁前だね」",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "廊下",
    "text": "隣に立つ凪砂さんは、いつものように余裕のある笑みを浮かべている。"
  },
  {
    "scene": "廊下",
    "text": "――けれど。その表情が、どこか不自然だった。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん……」"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「何？」",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……いえ」"
  },
  {
    "scene": "廊下",
    "text": "問いかけたいことはあった。さっきからずっと、彼の様子がおかしい。\nいつもの余裕ある笑顔の奥に、何かを隠しているように見える。"
  },
  {
    "scene": "廊下",
    "text": "でも――。今、私たちが立ち止まっている時間はない。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……行きましょう」"
  },
  {
    "scene": "廊下",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ああ」"
  },
  {
    "scene": "廊下",
    "text": "短い返事。私たちはそれ以上言葉を交わすことなく、研究所の最奥へ続くゲートへと向かった。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  //================= ゲート前 ===============
  {
    "scene": "最深部",
    "bg": "/scene/gate.png",
    "text": "巨大な隔壁の前に辿り着く。\n中央には、集めたフラグメントを読み込ませるためのスロットが配置されていた。"
  },
  {
    "scene": "最深部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ここ……ですね」"
  },
  {
    "scene": "最深部",
    "text": "私は手元のチップを握り締める。"
  },
  {
    "scene": "最深部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この扉の向こうに……コアがある）"
  },
  {
    "scene": "最深部",
    "text": "最後の決意を固め、私はゆっくりとフラグメントを差し込んだ。"
  },
  //================= コアの部屋 ===============
  {
    "scene": "研究所の最奥",
    "text": "そこは、研究所の最深部。",
    "bg": "/scene/core.png",
    "bgm": "CoreBGM.mp3"
  },
  {
    "scene": "研究所の最奥",
    "text": "壁面がガラス張りになっており、そこから差し込む「本当の月の光」を浴びて、それは宙に浮かんでいた。"
  },
  {
    "scene": "研究所の最奥",
    "text": "──『コア』。"
  },
  {
    "scene": "研究所の最奥",
    "text": "心臓のように脈打つそれからは、周囲を震わせるほどの莫大なエネルギーが放たれている。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これが……コア……」"
  },
  {
    "scene": "研究所の最奥",
    "text": "呆然と立ち尽くす私の隣で、凪砂さんは静かにその光を見つめていた。恐ろしいほどのエネルギーを放つ存在を前にしても、彼の表情は変わらない。まるで、最初からこうなることを分かっていたかのようだった。"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は教授の手記に書かれていた言葉を思い出す。"
  },
  {
    "scene": "研究所の最奥",
    "text": "『コアを停止させるには、適応者の異能を限界以上まで注ぎ込む必要がある』"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……凪砂さん」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は一歩前へ出る。"
  },
  {
    "scene": "研究所の最奥",
    "text": "私には歌の力がある。もしかしたら、私にも何かできるかもしれない。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私が……やってみます」"
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんが、ゆっくりとこちらを見る。",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……君が？」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私にも力があります。もしかしたら、コアを止められるかもしれません」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "不確かな言葉。自分でも、無茶を言っていることは分かっていた。それでも、誰か一人に背負わせるなんて嫌だった。"
  },
  {
    "scene": "研究所の最奥",
    "text": "けれど――――。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「無理だよ」"
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは、迷いなくそう言った。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「君の力は、これを壊すためのものじゃない」"
  },
  {
    "scene": "研究所の最奥",
    "text": "いつもの軽い口調。けれど、その瞳だけは真剣だった。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「これは僕がやる」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「でも……！」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「朔良」"
  },
  {
    "scene": "研究所の最奥",
    "text": "名前を呼ばれて、言葉が詰まる。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「良い子で待っててよ。それに、もしこれが終わったら……僕とデートして」"
  },
  {
    "scene": "研究所の最奥",
    "text": "耳を疑うようなセリフをそれだけ言い残すと、何事もなかったかのようにまたコアへと向き直った。"
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんがコアへと手を伸ばすと、眩い光の帯がコアへと流れ込む。これで終わる──。そう信じた瞬間だった。",
    "action": "MONOCHROME_FLASH",
    "se": "+CoreCharge_Sound.mp3"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ぐ…っ………うぅ……！！」",
    "bgm": "stop",
    "showIllust": [
      "Nagisa_serious"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "突如、凪砂さんが短い悲鳴を上げて苦しみ出した。",
    "action": "clear"
  },
  {
    "scene": "研究所の最奥",
    "text": "コアに注ぎ込んだはずのエネルギーが、まるで拒絶反応を起こしたかのように暴走し、逆に凪砂さんの体内へとなだれ込んでいく。",
    "action": "BLACK_ENERGY_EDGE",
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん！！」",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "研究所の最奥",
    "text": "彼は膝をつき、苦しそうに息を吐いた。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「はぁ……っ、く……」"
  },
  {
    "scene": "研究所の最奥",
    "text": "触れた肌は、異常なほど熱い。"
  },
  {
    "scene": "研究所の最奥",
    "action": ["clear", "SHAKE_SCREEN_VERY_LARGE"],
    "text": "──ドォォォンッ！！",
    "se": "+bakuhatsu.mp3"
  },
  {
    "scene": "研究所の最奥",
    "text": "その時、轟音と共に天井が崩れ、煙の向こうから漆黒の甲冑を纏った異形が姿を現す。",
    "bgm": "Battle1.mp3",
    "bgmVolume": 0.5,
    "showIllust": [
      "BlackKnight4"
    ],
    "hideIllust": [
      "Nagisa"
    ],
    "action": ["clear"]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──黒騎士……っ！？」"
  },
  {
    "scene": "研究所の最奥",
    "text": "なぜ、ここに……。動けない凪砂さんを支えながら、私は息を呑む。",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "研究所の最奥",
    "text": "黒騎士は大剣を振り下ろし、床を粉砕する。逃げるしかない。けれど、恐怖で足が動かない。",
    "showIllust": [
      "BlackKnight_attack"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「────下がれッ！！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "いつも冷静な凪砂さんとは思えない、鋭い叫び声。"
  },
  {
    "scene": "研究所の最奥",
    "text": "次の瞬間、反射的に後退した直後、目の前の床に大剣が叩き込まれた。もし彼の声がなければ──。",
    "action": "SHAKE_SCREEN",
    "hideIllust": [
      "BlackKnight_attack"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん……行きますよ……！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は彼の腕を肩に回し、必死に走り出す。\nこのままでは二人とも殺される。だから、今は逃げるしかなかった。"
  },
  {
    "scene": "研究所の最奥",
    "text": "黒騎士の追撃を間一髪でかわし、私たちは崩落を免れたサーバーラックの隙間へと滑り込んだ。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "bg": "/scene/Rubble.png",
    "text": "「はぁ……はぁ……」",
    "showIllust": [
      "Nagisa_serious3"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "狭い空間に、荒い呼吸だけが響く。私は凪砂さんを横たえ、その身体を支えた。"
  },
  {
    "scene": "瓦礫裏",
    "text": "先ほどよりも呼吸は荒く、額に触れると、驚くほど熱がこもっている。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん……！ しっかりして……！」"
  },
  {
    "scene": "瓦礫裏",
    "text": "呼びかけると、彼はゆっくりと目を開いた。",
    "bgm": "serious_3.mp3"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「はは……さっきの指示、的確だったでしょ……僕のおかげだね……」",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "いつもの余裕ある笑みではなく、子供のような無防備な笑顔だった。その姿に胸が締め付けられる。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……前に黒騎士と会った時は分からなかった。でも今回は……あいつの声が聞こえた」",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「声……？」"
  },
  {
    "scene": "瓦礫裏",
    "text": "凪砂さんは苦しそうに息を吐く。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「僕には、人の考えていることや感情が流れ込んでくるんだ」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「相手が何を考えて、次にどう動くのか。全部、勝手に入ってくる」"
  },
  {
    "scene": "瓦礫裏",
    "text": "だから、あの猛攻の中でも正確な指示を出せたのだ。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「でもね。この力は制御できない。聞きたくなくても聞こえる。他人の怒りも、悲しみも、憎しみも……化け物の殺意だって全部」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ずっと頭の中がうるさいんだ。静かになることなんて、ほとんどない」"
  },
  {
    "scene": "瓦礫裏",
    "text": "彼は疲れ切ったように壁へ寄りかかった。\nけれど、私はどうしても聞きたいことがあった。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……それなら」"
  },
  {
    "scene": "瓦礫裏",
    "text": "私は彼の目を見る。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「今、私が考えていることも……分かりますか？」"
  },
  {
    "scene": "瓦礫裏",
    "text": "一瞬、沈黙が落ちた。遠くから、黒騎士が瓦礫を踏み砕く音が近づいてくる。"
  },
  {
    "scene": "瓦礫裏",
    "text": "凪砂さんはじっと私を見つめた。そして──。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……分からない」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「君のことだけは、何も流れてこない」"
  },
  {
    "scene": "瓦礫裏",
    "text": "彼は少し寂しそうに笑った。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「不思議だよね。君が近くにいる時だけ……世界が静かになるんだ」",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "その言葉を聞いて、私はようやく理解した。彼が私に近づいてきた理由。"
  },
  {
    "scene": "瓦礫裏",
    "text": "いつも余裕そうに笑っていた彼が、本当は誰にも見せられない苦しみを抱えていたこと。"
  },
  {
    "scene": "瓦礫裏",
    "text": "凪砂さんにとって、私の隣だけが──何も聞こえない、唯一の場所だったのだ。"
  },
  {
    "scene": "瓦礫裏",
    "text": "ガレキを踏み砕く黒騎士の足音が、すぐそこまで迫っている。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……アイツがそこまで来てる。君は僕を置いて逃げろ。その間にコアはなんとかする」",
    "bgm": "stop",
    "showIllust": [
      "Nagisa_serious"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "けれど、そう言う彼の指先は、言葉とは裏腹に小さく震えていた。まるで、暗闇の中で助けを求めるように。"
  },
  {
    "scene": "瓦礫裏",
    "text": "この人はずっと、誰にも理解されない孤独の中で耐えてきたのだ。他人の感情や思考が絶え間なく流れ込む世界で、たった一人で。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「嫌です」",
    "bgm": "Battle2.mp3",
    "bgmVolume": 0.3
  },
  {
    "scene": "瓦礫裏",
    "text": "私は彼の手を強く握り返す。",
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ここまで来て、置いていくなんて絶対にしません」"
  },
  {
    "scene": "瓦礫裏",
    "text": "そして、真っ直ぐに彼の瞳を見る。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん。私の声を聞いて」"
  },
  {
    "scene": "瓦礫裏",
    "text": "彼の手を握る。すると彼の中に流れ込んでいた濁流が少しずつ静まり、苦しみに歪んでいた表情がゆっくりと和らいでいく。",
    "action": ["WHITE_PULSE_START", "ENERGY_AURA_START"]
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「…………やっぱり、静かだ」",
    "hideIllust": [
      "Nagisa_serious"
    ],
    "showIllust": [
      "Nagisa_neutral"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "凪砂さんは小さく呟いた。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「君のそばにいると……安心する」",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "瓦礫裏",
    "text": "熱に浮かされていた瞳に、いつもの鋭い光が戻っていく。そして彼は、ふっと笑った。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「君って……ほんと、バカみたいなお人好しだね」"
  },
  {
    "scene": "瓦礫裏",
    "text": "それは、出会った頃の作られた笑顔でもない。誰かを欺くための仮面でもない。初めて見せてくれた、本当の笑顔だった。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「バカでもなんでもいいです」",
    "action": ["clear"]
  },
  {
    "scene": "瓦礫裏",
    "text": "私は震えの止まった彼の手を引く。"
  },
  {
    "scene": "瓦礫裏",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「行きましょう。私たちなら……きっと止められます」"
  },
  {
    "scene": "瓦礫裏",
    "text": "もう、彼を一人にはしない。私は凪砂さんの身体を支えながら、崩れかけた研究所の奥へ向かって歩き出した。"
  },
  {
    "scene": "研究所の最奥",
    "bg": "/scene/core_hakai1.png",
    "action": ["SHAKE_SCREEN"],
    "text": "瓦礫の隙間から飛び出した私たちの前に、黒騎士がゆっくりと立ちはだかる。",
    "hideIllust": [
      "Nagisa"
    ],
    "showIllust": [
      "BlackKnight4"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "けれど、もう先ほどまでの凪砂さんではなかった。私の声を聞き、触れ合ったことで、彼の中に渦巻いていた無数の感情や思考の濁流は消えている。"
  },
  {
    "scene": "研究所の最奥",
    "text": "今の彼から感じるのは、冷たく張り詰めたものではなく、静かで確かな力だった。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……やっと静かになった」",
    "showIllust": [
      "Nagisa_smile2"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは小さく呟き、黒騎士を真っ直ぐ見据える。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「これなら、ちゃんと戦える」"
  },
  {
    "scene": "研究所の最奥",
    "text": "黒騎士が大剣を構え、不気味な金属音を響かせる。凪砂さんは私の手を取った。",
    "se": "+sword_ready.mp3",
    "showIllust": [
      "BlackKnight_attack4"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「朔良。…僕の目になって。君がいるなら、あいつの思考も……ちゃんと受け止められる」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「わかりました」"
  },
  {
    "scene": "研究所の最奥",
    "text": "いつものような軽い笑み。けれど、その瞳にはもう迷いはなかった。"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は強く頷く。黒騎士との最後の戦いが、始まった。",
    "action": ["clear", "SHAKE_SCREEN_VERY_LARGE"]
  },
  //============== 戦闘開始(凪砂ラスボス) ===============
  {
    "scene": "研究所の最奥",
    "text": "勝負は決した──そう思った、次の瞬間。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「っ、朔良、下がって！ 相打ちを狙う気だ……！」",
    "showIllust": [
      "Nagisa_serious2",
      "BlackKnight_attack4"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんが叫び、私の身体を背後へと強く引き戻す。",
    "hideIllust": [
      "Nagisa",
      "BlackKnight"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "黒騎士は残った力を振り絞り、私たちではなく研究所の巨大な支柱へ拳を叩き込んだ。"
  },
  {
    "scene": "研究所の最奥",
    "action": ["SHAKE_SCREEN_VERY_LARGE", "FADE_IN_SMOKE"],
    "se": "+bakuhatsu.mp3",
    "bgmVolume": 0.2,
    "text": "轟音と共に天井が崩れ落ち、舞い上がった月砂と粉塵が視界を覆う。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「くっ……！」"
  },
  {
    "scene": "研究所の最奥",
    "action": ["CLEAR_SMOKE"],
    "text": "必死に耐え、ようやく煙が晴れた時──そこに黒騎士の姿はなかった。"
  },
  {
    "scene": "研究所の最奥",
    "text": "崩れた壁の向こうへ、大剣を引きずりながら消えていく漆黒の背中だけが、一瞬だけ見えた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……逃げたか」",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは小さく息を吐く。その表情には悔しさよりも、二人で生き残れたことへの安堵が滲んでいた。"
  },
  {
    "scene": "研究所の最奥",
    "text": "やがて静寂を取り戻した研究所に、再びコアの低い駆動音だけが響く。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……さて。邪魔者はいなくなったし、本来の仕事を片付けようか」"
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは中央のコアを見上げる。けれど、その横顔にはわずかな緊張が浮かんでいた。"
  },
  {
    "scene": "研究所の最奥",
    "text": "これから行うのは、異能を限界以上に注ぎ込む危険な作業。どれほど負担がかかるのか、想像するだけで胸が締め付けられる。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん。私も隣にいます。絶対に、手を離しませんから」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……うん」",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "彼は少しだけ笑った。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「君がいるなら、僕は大丈夫」"
  },
  {
    "scene": "研究所の最奥",
    "text": "そう言って、凪砂さんはコアへ手を伸ばす。"
  },
  {
    "scene": "研究所の最奥",
    "action": ["WHITE_PULSE_START"],
    "se": "+CoreCharge_Sound.mp3",
    "text": "バチバチと光が弾け、彼の異能がコアへ流れ込んでいく。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ぐ……っ……！」",
    "action": ["SHAKE_SCREEN"],
    "showIllust": [
      "Nagisa_serious"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "瞬間、凪砂さんの身体が大きく震えた。コアから流れ込む膨大な情報の奔流が、彼の五感を押し潰そうとしている。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん……！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私はすぐに彼の背後へ回り、震える身体を支えた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「大丈夫です……！ 私がいます！」"
  },
  {
    "scene": "研究所の最奥",
    "action": ["ENERGY_AURA_START"],
    "text": "触れた手から、彼の苦痛が少しずつ和らいでいく。私の力が、彼の暴走しかけた異能を繋ぎ止める。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……これで……終わらせる……！」",
    "showIllust": [
      "Nagisa_serious"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは最後の力を振り絞り、コアの奥へ全ての力を叩き込む。"
  },
  {
    "scene": "研究所の最奥",
    "action": ["clear", "WHITE_OUT_START"],
    "se": "+window_break.mp3",
    "bgm": "stop",
    "text": "その瞬間、コアの輝きが限界を迎えた電球のように、一際眩しく爆発的に膨れ上がった。視界が純白の光で埋め尽くされ、何も見えなくなる。",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "鼓膜を突き刺すような高音が響き渡り、次の瞬間、世界から全ての音が消えた。"
  },
  {
    "scene": "研究所の最奥",
    "action": ["WHITE_OUT_END"],
    "text": "ゆっくりと光が収束していく。"
  },
  {
    "scene": "研究所の最奥",
    "text": "視界を覆っていた眩い光がゆっくりと収まっていき、私たちの周りには、柔らかな静寂だけが残されていた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「…終わった、の？」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私が呟いた瞬間、支えていた凪砂さんの身体から力が抜けた。"
  },
  {
    "scene": "研究所の最奥",
    "action": ["SHAKE_SCREEN"],
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さんっ！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "崩れ落ちる彼を抱きとめる。"
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは浅い呼吸を繰り返しながら、ゆっくりと目を開いた。そこにあったのは、もう苦しみに歪んだ瞳ではない。穏やかで、初めて見るような素の表情だった。",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……静かだ」"
  },
  {
    "scene": "研究所の最奥",
    "text": "彼は小さく呟き、安心したように目を閉じる。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「こんなに静かな世界……久しぶりだよ」"
  },
  {
    "scene": "研究所の最奥",
    "text": "その言葉に、胸が締め付けられる。私たちは、ようやくやり遂げたのだ。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……これで、帰れるんだね」"
  },
  {
    "scene": "研究所の最奥",
    "text": "その言葉を聞きながら、私はポケットに残っていた教授の手記の最後のページを開く。",
    "se": "+paper.mp3"
  },
  {
    "scene": "研究所の最奥",
    "text": "――『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』"
  },
  {
    "scene": "研究所の最奥",
    "action": ["SHAKE_SCREEN"],
    "se": "+bakuhatsu.mp3",
    "bgm": "+alert.mp3",
    "text": "直後、地面が大きく揺れ始めた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「凪砂さん、立てますか？」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……君が支えてくれるなら」",
    "showIllust": [
      "Nagisa_happy"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "凪砂さんは小さく笑い、私の肩を借りて立ち上がった。"
  },
  {
    "scene": "脱出ロケット",
    "action": ["FADE_TO_BLACK"],
    "duration": 2000,
  },
  {
    "scene": "脱出ロケット",
    "text": "崩れ落ちる研究所を背に、私たちは最下層の格納庫へ向かう。",
    "hideIllust": [
      "Nagisa"
    ],
    "bg": "black"
  },
  {
    "scene": "脱出ロケット",
    "text": "そこにあったのは、地球へ帰るための最後のロケットだった。"
  },
  {
    "scene": "脱出ロケット",
    "bg": "/scene/rocket_back.png",
    "bgm": "stop",
    "action": ["FADE_IN"],
    "text": "二人で乗り込み、ハッチを閉じる。"
  },
  {
    "scene": "脱出ロケット",
    "se": "+rocket_launch.mp3",
    "text": "轟音と共に機体は月面を離れ、遠ざかっていく研究所の向こうで、青い地球がゆっくりと近づいてくる。",
  },
  {
    "scene": "脱出ロケット",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「……綺麗だね」",
    "showIllust": [
      "Nagisa_smile3"
    ]
  },
  {
    "scene": "脱出ロケット",
    "text": "隣の凪砂さんが、静かに呟く。"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「もう、何も聴こえない。誰かの憎しみも、苦しみも……全部、あそこに置いてきたみたいだ」"
  },
  {
    "scene": "脱出ロケット",
    "text": "そう言って、彼はそっと私の手を握った。"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ねえ、朔良。地球に着いたら、ちゃんと約束、守ってくれるよね？」"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「約束……？」"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「忘れたの？ デートの約束だよ。君の声しか聴こえない、この静かで最高な世界を、君と一緒に歩き回りたいんだ」",
    "showIllust": [
      "Nagisa_happy"
    ]
  },
  {
    "scene": "脱出ロケット",
    "text": "少しだけ意地悪に、けれどこれまでで一番子供みたいに純粋な笑顔を浮かべる凪砂さんに、私はもう呆れることも、突き放すこともしなかった。"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「はい。喜んで、お供します」"
  },
  {
    "scene": "脱出ロケット",
    "text": "絡めた指先にぎゅっと力を込めると、凪砂さんは満足そうに目を細めた。"
  },
  {
    "scene": "脱出ロケット",
    "text": "窓の外で、青い地球がどんどん近づいてくる。私たちの帰る場所、そして、二人で新しく始める未来の光が、すぐ目の前で輝いていた。"
  },
  {
    "scene": "脱出ロケット",
    "action": ["SLOW_FADE_TO_BLACK"],
    "duration": 4000,
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "空",
    "bg": "/scene/sky.png",
    "bgm": "Normal_Morning2.mp3",
    "text": "私たちの日常は、驚くほどあっけなく戻ってきた。"
  },
  {
    "scene": "空",
    "text": "教授の手記とデータチップを持ち帰ったことで実習は無事成功。研究所で起きた事件も、政府の対策によって少しずつ収束へ向かっていた。"
  },
  {
    "scene": "空",
    "text": "そして、あの騒動の原因を作ったヒルミ教授はというと──。"
  },
  {
    "scene": "研究室",
    "bg": "/scene/lab.png",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「いやぁ、まさか本当にコアを止めてくるとはね。実に素晴らしい実習結果だよ」",
    "showIllust": [
      "Hirumi_smile4"
    ]
  },
  {
    "scene": "研究室",
    "text": "いつもの研究室で、何事もなかったかのようにコーヒーを飲んでいた。"
  },
  {
    "scene": "研究室",
    "text": "……あまりにもいつも通りすぎて、怒る気力すら失せてしまう。"
  },
  {
    "scene": "研究室",
    "text": "でも、その姿を見てようやく実感した。"
  },
  {
    "scene": "研究室",
    "text": "私たちは、本当に帰ってきたのだ。"
  },
  {
    "scene": "研究室",
    "bg": "black",
    "bgm": "stop",
    "text": "そして、そんな中変わったことと言えば──。",
    "hideIllust": [
      "Hirumi"
    ]
  },
  {
    "scene": "駅前広場",
    "bg": "/scene/Dataspot.png",
    "bgm": "HappyEnd.mp3",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うわ、もうこんな時間！」"
  },
  {
    "scene": "駅前広場",
    "text": "私は待ち合わせ場所まで大急ぎで走っていた。"
  },
  {
    "scene": "駅前広場",
    "text": "駅前の時計台へ着くと、そこには壁にもたれながら腕時計を確認する凪砂くんの姿があった。",
    "showIllust": [
      "Nagisa_neutral3"
    ]
  },
  {
    "scene": "駅前広場",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ごめんなさい！ 凪砂くん、講義が長引い──」"
  },
  {
    "scene": "駅前広場",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「遅い」"
  },
  {
    "scene": "駅前広場",
    "text": "言葉を遮られ、私は思わず足を止める。"
  },
  {
    "scene": "駅前広場",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「だから、講義が長引いちゃって……」"
  },
  {
    "scene": "駅前広場",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「まったく。君は言い訳が好きだね」",
    "showIllust": [
      "Nagisa_smile"
    ]
  },
  {
    "scene": "駅前広場",
    "text": "呆れたように言うけれど、その表情は怒っているわけではない。むしろ、私をからかうことを楽しんでいるような、柔らかな笑みが浮かんでいた。"
  },
  {
    "scene": "駅前広場",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「というわけで、遅れてきた罰」"
  },
  {
    "scene": "駅前広場",
    "text": "凪砂くんは一歩近づき、楽しそうに目を細める。"
  },
  {
    "scene": "駅前広場",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「今日は僕が満足するまで帰さないから」"
  },
  {
    "scene": "駅前広場",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……！？」"
  },
  {
    "scene": "駅前広場",
    "text": "突然の言葉に固まる私を見て、彼は小さく笑いながら顔を近づける。"
  },
  {
    "scene": "駅前広場",
    "text": "次の瞬間。"
  },
  {
    "scene": "駅前広場",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ！？」",
    "hideIllust": [
      "Nagisa"
    ]
  },
  {
    "scene": "駅前広場",
    "text": "私の額に、柔らかく温かな感触が触れた。"
  },
  {
    "scene": "駅前広場",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え」"
  },
  {
    "scene": "駅前広場",
    "text": "完全に固まった私を見て、凪砂くんは吹き出す。"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「くっ……あはは！！！何その顔！顔真っ赤。タコみたい」",
    "bg": "/character/Nagisa/Nagisa_CG2.png"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「な、何してるんですか……！ ここ外ですよ！？」"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「僕を待たせた罰。第一弾」"
  },
  {
    "scene": "凪砂最後CG",
    "text": "悪びれる様子もなく笑う彼に、私は顔が熱くなるのを感じた。"
  },
  {
    "scene": "凪砂最後CG",
    "text": "でも──。以前の彼なら、こんなふうに誰かへ甘えることなんてなかったはずだ。"
  },
  {
    "scene": "凪砂最後CG",
    "text": "誰の感情も、誰の本音も、望まず受け取り続けていた彼が。今は、私との時間を楽しそうに笑っている。それが嬉しかった。"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ほどほどにしてくださいね」"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「善処するよ」"
  },
  {
    "scene": "凪砂最後CG",
    "text": "そう言いながら、凪砂くんは私の手を取る。"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "凪砂",
    "role": "NAGISA",
    "text": "「ほら、行くよ」"
  },
  {
    "scene": "凪砂最後CG",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ、ちょっと……待って、凪砂くん！」"
  },
  {
    "scene": "凪砂最後CG",
    "text": "繋いだ手から伝わる温度は、あの月面で感じた冷たい孤独とは違う。確かな、生きている温かさだった。"
  },
  {
    "scene": "凪砂最後CG",
    "text": "私たちは歩幅を合わせ、眩しい街の中へ歩き出す。長い悪夢のような時間は終わった。"
  },
  {
    "scene": "凪砂最後CG",
    "text": "そしてここから、私たちの新しい日常が始まる。"
  },
  {
    "scene": "凪砂最後CG",
    "text": "凪砂ルート・ハッピーエンド",
    "action": "FADE_TO_HAPPY_END",
    "style": "cinema"
  },

  //=============== ミカルート ===============
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "焦げあとのある服の袖を掴んだ。",
    "label": "mika_route_start"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「朔良先輩っ！！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "action": ["SHAKE_SCREEN"],
    "text": "私の身体が地面に叩きつけられる寸前、強い力で腕を引かれた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "焦げ跡の残る服の袖を掴んだまま顔を上げると、そこにいたのはミカくんだった。",
    "showIllust": [
      "Mika_serious3"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん……っ！ みんなは！？ 他のみんなはどこ！？」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "必死に周囲を見回すけれど、暗闇の中に仲間の姿はない。遠くから、激しい戦闘音だけが響いていた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「すみません……戦闘の混乱ではぐれました。でも、今は止まっている暇はありません。教授の指示通り、研究室へ向かいましょう」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "bgAnimation": "dash",
    "text": "私は混乱した頭のまま、彼に引かれるように走り出した。背後から感じる、冷たい気配。あの黒い鎧の存在が、まだ私たちを追っている。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "恐怖に追われながら、私たちは教授の研究室へ向かって必死に走った。",
    "bgAnimation": "dash",
  },
  {
    "scene": "教授の研究室",
    "bg": "/scene/lab.png",
    "bgm": "stop",
    "text": "最上階の扉を開け、中へ飛び込む。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "教授の研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「はぁ……はぁ……ここまで来れば……」"
  },
  {
    "scene": "教授の研究室",
    "text": "息を整える私たちへ、部屋の奥から聞き慣れた声が届いた。"
  },
  {
    "scene": "教授の研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「やあ、二人とも。待っていたよ」"
  },
  {
    "scene": "教授の研究室",
    "text": "奥から現れたのはヒルミ教授だった。外では【キメラ】や黒い鎧の化け物が暴れ回っているというのに、教授だけは落ち着き払っている。",
    "showIllust": [
      "Hirumi_smile4"
    ]
  },
  {
    "scene": "教授の研究室",
    "text": "安堵する間もなく、教授はハッチを見据えたまま口を開く。"
  },
  {
    "scene": "教授の研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「説明している時間はない。君たちは今すぐ、このロケットで月へ向かってくれ」"
  },
  {
    "scene": "教授の研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「月へ……？」"
  },
  {
    "scene": "教授の研究室",
    "text": "あまりにも突然の言葉に、私は言葉を失う。教授は静かに続けた。"
  },
  {
    "scene": "教授の研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「外の怪物も、この世界の異変も、すべては人工月にある『研究所のコア』が原因だ。世界を元に戻したければ、コアを止めるしかない」"
  },
  {
    "scene": "教授の研究室",
    "text": "その言葉を聞いて、男に拉致されたアジトで発見した文言が頭によぎった。"
  },
  {
    "scene": "教授の研究室",
    "text": "『……異能力やキメラの発現には、政府が隠ぺいした人工月が関係している』"
  },
  {
    "scene": "教授の研究室",
    "text": "『……その中の、研究所によって守られる“コア”が発生源と仮定されており……』"
  },
  {
    "scene": "教授の研究室",
    "text": "…やっぱりあの文章に書かれていたことは本当のことだった。"
  },
  {
    "scene": "教授の研究室",
    "text": "教授は一冊の資料を私たちへ差し出した。"
  },
  {
    "scene": "教授の研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「詳しいことはそこに書いてある。向こうで読みなさい」"
  },
  {
    "scene": "教授の研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「そんな……私たちに、そんなことが……」"
  },
  {
    "scene": "教授の研究室",
    "text": "戸惑う私の隣で、ミカくんが静かに息を吐いた。",
    "showIllust": [
      "Mika_serious2"
    ]
  },
  {
    "scene": "教授の研究室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……行きましょう、先輩」"
  },
  {
    "scene": "教授の研究室",
    "text": "彼は何かを飲み込むように一瞬だけ目を伏せると、そのままロケットへ向かって歩き出した。"
  },
  {
    "scene": "教授の研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん……」"
  },
  {
    "scene": "教授の研究室",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「大丈夫です。今は、進むしかありません」",
    "showIllust": [
      "Mika_smile"
    ]
  },
  {
    "scene": "教授の研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「物分かりが良くて助かるよ。さぁ、時間だ―――行きなさい」",
    "showIllust": [
      "Hirumi_serious"
    ]
  },
  {
    "scene": "教授の研究室",
    "text": "そう言うと教授は迷いなく起動スイッチを押した。"
  },
  {
    "scene": "教授の研究室",
    "action": ["SHAKE_SCREEN"],
    "se": "+bakuhatsu.mp3",
    "text": "遠くから防壁を叩き割るような凄まじい爆音が響き、研究室全体が大きく揺れた。アイツが、すぐそこまで来ている。",
    "hideIllust": [
      "Mika",
      "Hirumi"
    ]
  },
  {
    "scene": "教授の研究室",
    "text": "──黒騎士が、ここまで迫っている。"
  },
  {
    "scene": "教授の研究室",
    "text": "ミカくんに続いて、私はロケットへ続くハッチへ飛び込んだ。"
  },
  {
    "scene": "ロケット内部",
    "bg": "/scene/rocket.png",
    "bgm": "stop",
    "text": "ロケット内部は、無機質な計器と二人分のシートだけが並ぶ狭い空間だった。"
  },
  {
    "scene": "ロケット内部",
    "text": "私たちがシートへ座りベルトを締めた瞬間、頭上のハッチが重々しい音を立てて閉まる。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "text": "『システム起動。カウントダウン、最終シークエンスへ移行』"
  },
  {
    "scene": "ロケット内部",
    "se": "+rocket_launch.mp3",
    "action": ["SHAKE_SCREEN_CONTINUOUS_SMALL"],
    "text": "機械音声と共に機体が激しく震え、ロケットは轟音を上げて人工月へ向かって飛び立った。"
  },
  {
    "scene": "ロケット内部",
    "text": "強烈な重力が身体をシートへ押し付ける。\n窓の外では街の灯りが遠ざかり、青白い人工月だけが大きく迫っていた。"
  },
  {
    "scene": "ロケット内部",
    "action": ["clear"],
    "text": "私は大きく息を吐き、ようやく肩の力を抜く。",
    "se": "stop"
  },
  {
    "scene": "ロケット内部",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……大丈夫ですか、先輩」",
    "showIllust": [
      "Mika_neutral3"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "心配そうに覗き込むミカくんに、私は小さく笑った。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あはは、すごいことに巻き込まれちゃったね。ロケットで月に行くなんて、映画みたい」"
  },
  {
    "scene": "ロケット内部",
    "text": "冗談めかして笑うと、ミカくんは少し俯く。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「この間は、ありがとうございました。助けていただいて」",
    "showIllust": [
      "Mika_smile"
    ]
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え？」"
  },
  {
    "scene": "ロケット内部",
    "text": "路地裏で怪我をしていた彼に、水とハンカチを渡した夜のことを思い出す。"
  },
  {
    "scene": "ロケット内部",
    "text": "そして、その後に、満と、話しながら散歩をして——。"
  },
  {
    "scene": "ロケット内部",
    "text": "……満。"
  },
  {
    "scene": "ロケット内部",
    "text": "胸の奥が締めつけられるように痛む。それでも私は笑顔を崩さなかった。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「当然のことをしただけだよ。それに、さっきは助けてくれてありがとう」"
  },
  {
    "scene": "ロケット内部",
    "text": "その言葉に、ミカくんは少しだけ安心したように微笑む。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……だから、絶対に──」",
    "showIllust": [
      "Mika_neutral"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "ミカくんが何かを言いかけた、その時だった。"
  },
  {
    "scene": "ロケット内部",
    "action": ["RED_ALERT_FLASH"],
    "bgm": "+alert_Rocket.mp3",
    "text": "ピピピピピッ！！",
    "showIllust": [
      "Mika_surprise"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "機内にけたたましい警報が鳴り響く。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "text": "『警告。推進システムに致命的なエラー。機体の制御が不可能です』"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「えっ……！？」"
  },
  {
    "scene": "ロケット内部",
    "text": "身体がふわりと浮き、ロケットが大きく傾く。"
  },
  {
    "scene": "ロケット内部",
    "text": "窓の外では青い月が激しく回転し、機体全体が悲鳴のような金属音を上げ始めた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「朔良先輩……！！」",
    "showIllust": [
      "Mika_serious"
    ]
  },
  {
    "scene": "ロケット内部",
    "action": ["SHAKE_SCREEN_EXTREME"],
    "text": "ガガガガガッ！！",
    "se": "Rocket_Shock.mp3"
  },
  {
    "scene": "ロケット内部",
    "text": "激しく揺れる機体の中、私は迫る死の恐怖に息を呑むことしかできなかった。"
  },
  {
    "scene": "ロケット内部",
    "action": ["clear"],
    "bg": "black",
    "bgm": "stop",
    "text": "激しい衝撃と金属が裂ける轟音の中、私の意識は暗闇へと沈んでいた。どれほど時間が経ったのだろう。",
    "hideIllust": [
      "Mika"
    ]
  },
  //=============== ロケット墜落 ===============
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「──先輩……！ 朔良先輩！！」"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "悲痛な叫び声に引き戻され、重い瞼をゆっくりと開く。",
    "action": "WAKE_UP",
    "bg": "/scene/rocket_collapse.png",
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あ……」"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "最初に目に入ったのは、ひび割れた窓から差し込む人工月の青白い光だった。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "ロケット内部は無惨に潰れ、計器は破壊され、引きちぎれた配線から火花と白煙が噴き出している。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩……！ 分かりますか！？」",
    "showIllust": [
      "Mika_surprise_injured3"
    ]
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "目の前には、涙と煤で顔を汚したミカくんがいた。いつの間にかシートベルトは外され、私は床に倒れたまま彼の腕に抱き支えられている。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「よかった……本当に……」",
    "showIllust": [
      "Mika_smile_injured"
    ]
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "安堵したように肩の力を抜くミカくん。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私……生きてるの……？」"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "墜落したはずなのに、大きな怪我はない。不思議に思って視線を上げた瞬間、その理由に気づいた。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん……その怪我……！」"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "彼の服は破れ、背中や腕には擦り傷や火傷が無数に刻まれていた。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "墜落の瞬間、ミカくんは自分のシートベルトを外し、私を庇うように覆いかぶさってくれたのだ。飛び散る破片も衝撃も、すべて自分の身体で受け止めて。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「俺は平気です……先輩が無事なら、それで」"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "痛みに耐えながら微笑む姿に、胸が締め付けられる。守ってあげたいと思っていた後輩が、命懸けで私を守ってくれた。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "言葉も出ないまま立ち尽くす私に、ミカくんはゆっくりと立ち上がり、手を差し伸べる。"
  },
  {
    "scene": "ロケット内部(崩壊)",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「ここを離れましょう。いつ爆発してもおかしくありません」",
    "showIllust": [
      "Mika_neutral_injured"
    ]
  },
  {
    "scene": "ロケット内部(崩壊)",
    "text": "私はその傷だらけの手を強く握り返した。胸いっぱいに込み上げる想いを抱えながら、二人はひしゃげたハッチの隙間から外へと這い出した。"
  },
  //=============== 月面 ===============
  {
    "scene": "月面",
    "bgm": "Moon.mp3",
    "bg": "/scene/moon_surface.png",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──っ、何……ここ」",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "月面",
    "text": "目の前に広がっていたのは、見慣れた街でも大学でもなかった。\n白く乾いた大地。その上には風化した巨大な廃墟が果てしなく続いている。"
  },
  {
    "scene": "月面",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……墜落はしましたけど、一応『月』にはたどり着けたみたいですね」",
    "showIllust": [
      "Mika_neutral_injured3"
    ]
  },
  {
    "scene": "月面",
    "text": "ミカくんが、地球の光に照らされながら、ポツリと呟いた。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あれって………！」"
  },
  {
    "scene": "月面",
    "text": "はっとして、思わずある天体を指さした。"
  },
  {
    "scene": "夜空（月）",
    "bg": "/scene/yellow_moon.png",
    "text": "指さした先には、青い人工月ではない、柔らかな黄金色に輝く月が静かに浮かんでいた。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "夜空（月）",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「黄色い……月……」"
  },
  {
    "scene": "夜空（月）",
    "text": "ずっと伝説だと思っていた、本物の月。人工の光に汚されていない、柔らかい光を放つその姿に、私の胸は震えた。"
  },
  {
    "scene": "夜空（月）",
    "text": "お父さんの話は、本当だった。"
  },
  {
    "scene": "夜空（月）",
    "text": "…きっと世界の真実も、お父さんの行方も、この先にある。そんな漠然とした予感だけが私の頭を駆け巡る。"
  },
  {
    "scene": "夜空（月）",
    "text": "それに、あの地球の惨劇を止めるのも私たちの行動次第なのだと思う。\n…怖い、だけど進まなきゃいけない。"
  },
  {
    "scene": "夜空（月）",
    "text": "そう覚悟を決めて、隣のミカくんに声をかけようとした時だった。"
  },
  {
    "scene": "月面",
    "bg": "/scene/moon_surface.png",
    "action": ["SHAKE_SCREEN_SMALL"],
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「っ……う、く……っ」",
    "showIllust": [
      "Mika_serious_injured3"
    ]
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん！？」"
  },
  {
    "scene": "月面",
    "text": "隣でミカくんが突然苦しみ始め、その場に膝をついた。"
  },
  {
    "scene": "月面",
    "text": "首筋から鎖骨にかけて、不気味な黒いアザが生き物のように広がっていく。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「大丈夫！？ ミカくん！」"
  },
  {
    "scene": "月面",
    "text": "慌てて背中に手を当てると、不思議なことに黒いアザの侵食がぴたりと止まった。"
  },
  {
    "scene": "月面",
    "text": "まるで、私がその異変を吸い取っているように。荒い息を整えながら、ミカくんはかすかに笑う。"
  },
  {
    "scene": "月面",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「すみません……この場所の空気に当てられたみたいで。でも、先輩が触れてくれたら、すごく楽になりました」",
    "showIllust": [
      "Mika_smile_injured"
    ]
  },
  {
    "scene": "月面",
    "text": "その言葉で、私はポケットの中の紙束を思い出した。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あっ……教授から預かった紙！」"
  },
  {
    "scene": "月面",
    "text": "震える手で広げると、そこにはヒルミ教授の筆跡で、この場所の秘密と、私たちが進むべき道がびっしりと記されていた。",
    "se": "+paper.mp3"
  },

  {
    "scene": "月面",
    "type": "choice",
    "text": "手記の内容を読みますか？",
    "choices": [
      {
        "text": "読む",
        "targetLabel": "read_professors_note3"
      },
      {
        "text": "スキップする",
        "targetLabel": "skip_professors_note3"
      }
    ],
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "label": "read_professors_note3",
    "scene": "手記",
    "showItem": "/item/Message.png",
    "text": "教授の手記には、研究所の最奥にある『コア』が【キメラ】の発生源であること、そしてそこへ辿り着くには、研究所各地に散らばる《セキュリティ解除コードの断片（フラグメント）》をすべて回収する必要があると書かれていた。"
  },
  {
    "scene": "手記",
    "text": "裏面には研究所の簡易マップと、フラグメントの配置図が記されている。"
  },
  {
    "scene": "手記",
    "text": "さらに最後のページには、教授からの注意書きが残されていた。"
  },
  {
    "scene": "手記",
    "text": "『コアは物理的には破壊できない。適応者の異能を限界まで流し込み、停止させるしかない』"
  },
  {
    "scene": "手記",
    "text": "『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』"
  },
  {
    "label": "skip_professors_note3",
    "scene": "手記",
    "text": "つまり、まずは研究所内に散らばったフラグメントを集めて最奥への道を開き、『コア』を停止させるしかない。それが、この世界を救い、私たちが地球へ帰るための唯一の方法だった。"
  },
  {
    "scene": "月面",
    "hideItem": true,
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はぁ、はぁ……っ、く……先輩……」",
    "showIllust": [
      "Mika_serious_injured3"
    ]
  },
  {
    "scene": "月面",
    "text": "紙を読み終えた直後、ミカくんが苦しそうに膝をついた。首元の黒いアザは、顎の近くまで広がっている。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん！」"
  },
  {
    "scene": "月面",
    "text": "私は慌てて肩を支える。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「大丈夫。教授の言う通り、私たちならきっとここを突破できる。だから、一緒に行こう」"
  },
  {
    "scene": "月面",
    "text": "彼を抱き寄せると、不思議と荒かった呼吸が少しずつ落ち着いていった。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「歩ける？ 研究所には、君を治す手がかりもあるはずだから」"
  },
  {
    "scene": "月面",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……はい」"
  },
  {
    "scene": "月面",
    "text": "ミカくんは小さく頷き、私の肩を借りて立ち上がる。"
  },
  {
    "scene": "月面",
    "text": "紙の内容を考えている余裕はない。私は彼の手をしっかり握り、二人で白い砂の上を踏み出した。"
  },
  {
    "scene": "研究所入口",
    "bg": "/scene/lab_entrance.png",
    "text": "やがて、白い砂丘の向こうに、巨大な研究所のシルエットが姿を現した。"
  },
  {
    "scene": "研究所入口",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あれが、教授の言っていた研究所」"
  },
  {
    "scene": "研究所入口",
    "text": "私は息を整えながら呟く。ミカくんは苦しそうに胸を押さえながらも、小さく頷いた。"
  },
  {
    "scene": "研究所入口",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「ここからは用心して行きましょう」"
  },
  {
    "scene": "研究所入口",
    "text": "私は彼の手を握り直し、大きく息を吸った。そして私たちはゆっくりと研究所の入り土へ歩き出した。"
  },
  //=============== フラグメントコレクト ===============
  {
    "scene": "フラグメントコレクト",
    "action": "TRIGGER_FRAGMENT_COLLECT_MIKA",
    "bg": "black",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──よしっ、これで最後のデータチップ、回収完了！」",
    "bg": "/scene/Lab_corridor.png",
    "bgm": "Lab.mp3",
    "label": "mika_fragment_happy_end"
  },
  {
    "scene": "廊下",
    "text": "制御端末から最後のフラグメントを抜き取り、私は大きく息を吐いた。これで、研究所の最奥へ進むために必要なすべての鍵が揃ったはずだ。"
  },
  {
    "scene": "廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩、これで先へ進めますね」",
    "showIllust": [
      "Mika_smile_injured3"
    ]
  },
  {
    "scene": "廊下",
    "text": "隣でミカくんが安堵したように呟く。けれど、その横顔を見た瞬間、私は小さな違和感を覚えた。"
  },
  {
    "scene": "廊下",
    "text": "彼の首元に刻まれた黒い痣。それは、さっきよりも確実に広がっているように見えた。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん、そのアザ———。」"
  },
  {
    "scene": "廊下",
    "text": "そう聞こうとした瞬間だった。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "廊下",
    "text": "──ゴゴゴゴ……。",
    "se": "+jishin.mp3",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "廊下",
    "text": "研究所全体が大きく揺れる。"
  },
  {
    "scene": "廊下",
    "speaker": "システム",
    "role": 'SYSTEM',
    "text": "【警告。侵入者排除システムを起動します】",
    "action": "clear"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": 'SAKURA',
    "text": "「え……？」"
  },
  {
    "scene": "廊下",
    "text": "閉ざされていた隔壁が開き、その奥から巨大な防衛個体が姿を現した。",
    "showIllust": [
      "machine4"
    ],
    "se": "+robot.mp3",
    "bgm": "serious_2.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "ミカ",
    "role": 'MIKA',
    "text": "「く……、まだセキュリティが残っていたのか…ッ」",
    "showIllust": [
      "Mika_serious_injured2"
    ]
  },
  {
    "scene": "廊下",
    "text": "ミカくんが重い身体を引きずりながら私を庇うように前に立つ。",
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん…！」"
  },
  {
    "scene": "廊下",
    "speaker": "ミカ",
    "role": 'MIKA',
    "text": "「先輩。どうか力を貸してください」"
  },
  {
    "scene": "廊下",
    "text": "その言葉に込められたのは、助けを求める弱さではなく、私を信じて託してくれる強い意志だった。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この先に進むためには、こいつを倒すしかない……！） "
  },
  //=============== 戦闘開始(ミカ中ボス) ===============
  {
    "scene": "廊下",
    "bgm": "stop",
    "text": "戦いが終わると、ミカくんはその場に立ち尽くしたまま、肩を大きく上下させていた。",
    "showIllust": [
      "Mika_serious_injured3"
    ],
    "hideIllust": [
      "machine"
    ]
  },
  {
    "scene": "廊下",
    "text": "首元に浮かぶ黒いアザは、戦闘前よりも明らかに広がっているように見える。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん…！？ 大丈夫……っ！？ 少し休もう――――」"
  },
  {
    "scene": "廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「大丈夫です。……心配かけて、すみません。行きましょう」",
    "showIllust": [
      "Mika_smile_injured"
    ]
  },
  {
    "scene": "廊下",
    "text": "私の声を遮るように、ミカくんはそう言って歩き出す。けれど、その足取りは明らかに重く、いつもの彼からは想像できないほど弱々しかった。"
  },
  {
    "scene": "廊下",
    "text": "胸の奥に、小さな不安が芽生える。だけれど彼の剣幕に圧倒され、私たちは重い足取りのまま無言のままゲートへと向かった。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "最深部",
    "text": "巨大なゲートの前にたどり着く。\n中央には、集めたフラグメントを差し込むためのスロットがあった。",
    "bg": "/scene/gate.png"
  },
  {
    "scene": "最深部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ここ、だね……」"
  },
  {
    "scene": "最深部",
    "text": "私は手元のチップを握りしめる。"
  },
  {
    "scene": "最深部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この扉の向こうに、コアがある）"
  },
  {
    "scene": "最深部",
    "text": "最後の決意を固め、私はゆっくりとフラグメントを差し込んだ。"
  },
  {
    "scene": "研究所の最奥",
    "text": "そこは、研究所の最深部。",
    "bg": "/scene/core.png",
    "bgm": "CoreBGM.mp3"
  },
  {
    "scene": "研究所の最奥",
    "text": "壁面がガラス張りになっており、そこから差し込む「本当の月の光」を浴びて、それは宙に浮かんでいた。"
  },
  {
    "scene": "研究所の最奥",
    "text": "──『コア』。"
  },
  {
    "scene": "研究所の最奥",
    "text": "心臓のように脈打つそれからは、周囲を震わせるほどの莫大なエネルギーが放たれている。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これが……コア……」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私が圧倒されている中、ミカくんは迷うことなくコアへ歩み寄っていく。"
  },
  {
    "scene": "研究所の最奥",
    "text": "白い光に照らされた彼の瞳には、決意とも悲しみともつかない色が浮かんでいた。"
  },
  {
    "scene": "研究所の最奥",
    "text": "──教授の手記にはこうあった。\nコアを止めるには、物理的な破壊ではなく、適応者の『異能の力』を限界まで注ぎ込む必要がある。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……異能の力を、注ぎ込む……」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は息を呑んだ。私にも『歌』の力がある。もしかしたら、それで何かできるかもしれない。そう思って、私はコアへ一歩踏み出した。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私が……やってみる」"
  },
  {
    "scene": "研究所の最奥",
    "text": "けれど、その手を伸ばすより先に、ミカくんが静かに私の前へ立った。",
    "showIllust": [
      "Mika_neutral_injured3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩」"
  },
  {
    "scene": "研究所の最奥",
    "text": "振り返った彼の瞳には、迷いのない覚悟が宿っていた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「これは、俺に任せてください」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「でも……！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "ここまで来る間にも、彼の首元のアザは広がり続けていた。それでもミカくんは、優しく微笑む。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「大丈夫です。先輩がいたから、俺はここまで来られました」",
    "showIllust": [
      "Mika_smile_injured"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……でも、ミカくん……」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「俺は最初から、このために来たんです」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "研究所の最奥",
    "text": "その言葉の意味を問いかけようとした瞬間──。"
  },
  //=============== ルキ登場 ===============
  {
    "scene": "研究所の最奥",
    "text": "頭上のスピーカーから、歪んだ電子音声が響き渡った。",
    "bgm": "stop",
    "se": "+speaker.mp3",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『──ハハッ、素晴らしい。実に見事な先輩後輩の絆だね』"
  },
  {
    "scene": "研究所の最奥",
    "text": "その声を聴いた途端、ゾッと背筋が凍るほどの悪意が全身を駆け抜けた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『そこのノラ犬くん──ミカだっけ？ 彼はもう限界だよ。そのままじゃ、コアに力を注ぐ前に異能の暴走で身体が持たない』"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『……そこで提案がある。僕に服従を誓い、そのコアの破壊を今すぐ辞めるなら、彼の命だけは助けてあげてもいいよ？』"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「な……っ！あなたは誰…！？」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『研究所の関係者、とでも言っておこうか。それより僕の選択に答えなよ』"
  },
  {
    "scene": "研究所の最奥",
    "text": "突如として突きつけられた、悪魔の誘い。スピーカーの向こうの主は、ミカくんの命を盾に私に迫ってくる。けれど、ミカくんは苦しそうに首元を押さえながら、鋭い視線でスピーカーを睨みつけた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「騙されるな……先輩……っ。こいつの言葉なんて……」",
    "bgm": "serious_3.mp3",
    "showIllust": [
      "Mika_serious_injured3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『まだ吠える元気があるのかい？ 哀れだね。自分が何のために生み出され、そのアザを刻まれたのかも知らないなんて』"
  },
  {
    "scene": "研究所の最奥",
    "text": "電子音声は、楽しむように続ける。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『お前の父親は、この研究所で殺人を犯した大罪人さ。その罪を償わせるため、研究員たちは君の身体にキメラ因子を埋め込んだ。君はただの実験体なんだよ』"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「…ッ！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "ミカくんは、何も言わなかった。ただ、呆然とした表情で、自分の首元に広がる黒いアザへと触れている。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（このアザが……研究所によって植え付けられたものだったなんて）"
  },
  {
    "scene": "研究所の最奥",
    "text": "今まで彼を苦しめていたものが、彼自身の力ではなく、誰かに無理やり刻まれたものだった。その事実に、ミカくんの瞳が大きく揺れている。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（このままじゃ……ミカくんはアザに蝕まれてしまう）"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は震える手を握り締めた。"
  },
  {
    "scene": "研究所の最奥",
    "bgm": "stop",
    "text": "その時、ふと頭に浮かんだのは、研究所で見つけた資料の一文だった。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "『主任研究員██は計画の漏洩を防ぐため、殺人容疑を適用して処分した』"
  },
  {
    "scene": "研究所の最奥",
    "text": "あの時は意味が分からなかった。けれど、今なら分かる。"
  },
  {
    "scene": "研究所の最奥",
    "text": "あの資料に書かれていた「主任研究員」とは──きっと、ミカくんのお父さんのことだ。"
  },
  {
    "scene": "研究所の最奥",
    "text": "研究所は、自分たちの罪を隠すために、彼にすべての責任を押し付けた。"
  },
  {
    "scene": "研究所の最奥",
    "text": "そして、その罪の代償を……何も知らない息子にまで背負わせた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──違う！！」",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "研究所の最奥",
    "text": "気づけば、私はミカくんの前に立っていた。震える足を踏み出し、見えない敵へ向かって声を張り上げる。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あなたの言うことなんて、絶対に信じない……！ここに残されていた資料を見たわ……！ あなたたちが何をしていたのか、全部じゃなくても分かってる！」",
    "bgm": "Battle1.mp3",
    "bgmVolume": 0.4
  },
  {
    "scene": "研究所の最奥",
    "text": "拳を握り締める。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくんのお父さんは、人殺しなんかじゃない！ 研究所の秘密を守るために、罪を着せられただけ……！」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩……」",
    "showIllust": [
      "Mika_surprise_injured3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "背後で、ミカくんが小さく呟く。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「お父さんが悪くなかったなら……俺は……」"
  },
  {
    "scene": "研究所の最奥",
    "text": "その声には、今まで抱えてきた苦しみと戸惑いが滲んでいた。私は振り返らずに叫ぶ。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「だから、ミカくんが苦しむ理由なんてどこにもない！あなたたちが勝手に作ったアザも、勝手に背負わせた運命も……もう終わりにする！」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『……くだらない』"
  },
  {
    "scene": "研究所の最奥",
    "text": "スピーカーから、冷たい笑い声が響く。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『そうさ。あの男は何の罪も犯していない。…で、だから何だって言うの？どれだけ叫んだところで、コイツの身体はもう限界だよ』"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……っ」",
    "showIllust": [
      "Mika_serious_injured"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "視線を向けると、ミカくんは苦しそうに膝をついていた。黒いアザは、首元からさらに広がっている。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『選びなよ。彼を見捨てて世界を救うか。それとも、彼と一緒に消えるか』"
  },
  {
    "scene": "研究所の最奥",
    "text": "静寂が落ちる。けれど──。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……どっちも選ばない」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は、ミカくんの手を握った。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくんの力を奪うんじゃない。私が……受け止める」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩……何を……」",
    "showIllust": [
      "Mika_surprise_injured"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あなたが一人で背負ってきたもの、もう終わりにする」"
  },
  {
    "scene": "研究所の最奥",
    "text": "胸の奥で、あの時目覚めた『歌』の力が震える。キメラの力とは違う。"
  },
  {
    "scene": "研究所の最奥",
    "text": "誰かを傷つけるためじゃない。誰かを救うための力。\n私はミカくんのアザへ手を伸ばした。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくんの異能……私に預けて」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……っ、でも……！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は笑って、彼をやさしく抱きしめた。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「今度は、私があなたを守る番だから」"
  },
  {
    "scene": "研究所の最奥",
    "text": "その瞬間──。眩い光が、二人の間から溢れ出した。黒いアザがゆっくりと薄れ、代わりに私の身体へと淡い光が流れ込んでくる。",
    "action": "WHITE_FLASH_AND_SHAKE"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『…は～ぁ、めんどくさ』",
    "action": "WHITE_OUT_END_SLOW"
  },
  {
    "scene": "研究所の最奥",
    "text": "先ほどの愉快そうな影を潜め、不機嫌な子供のような声が聞こえたと同時に、部屋中に警報音が鳴り響き、閉ざされていた隔壁が開く。",
    "bgm": "+alert.mp3"
  },
  {
    "scene": "研究所の最奥",
    "text": "その奥から現れたのは、漆黒の鎧に身を包んだ異形の存在。赤い眼光が、まっすぐこちらを射抜く。\n──【黒騎士】。",
    "showIllust": [
      "BlackKnight4"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "黒騎士が、大剣をゆっくりと構えた。",
    "showIllust": [
      "BlackKnight_attack"
    ],
    "se": "+sword_ready.mp3"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……来る」",
    "showIllust": [
      "Mika_serious_injured2"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "私は息を呑み、ミカくんと並んで立ち上がる。すべての因縁を断ち切るための最後の戦いが、始まろうとしていた。"
  },
  //=============== 戦闘開始(ミカラスボス) ===============
  {
    "scene": "研究所の最奥",
    "bgm": "stop",
    "text": "勝負は決した──そう思った、次の瞬間。",
    "hideIllust": [
      "Mika"
    ],
    "showIllust": [
      "BlackKnight4"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『──はぁ……使えない奴。もう下がっていいよ』"
  },
  {
    "scene": "研究所の最奥",
    "text": "スピーカーから響く声と共に、黒騎士は何も言わず闇の中へと消えていった。\n私はゆっくりと立ち上がる。",
    "hideIllust": [
      "BlackKnight"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくんの代わりに……私がやる」",
    "showIllust": [
      "Mika_surprise_injured3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "向かう先は、白く輝く『コア』。ミカくんから受け取った異能の力を、このコアへ限界まで注ぎ込む。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩……！ そんなことをしたら、先輩の身体が……！」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「大丈夫」"
  },
  {
    "scene": "研究所の最奥",
    "text": "私は振り返って笑った。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私たちは……呼吸を合わせられるでしょ？」"
  },
  {
    "scene": "研究所の最奥",
    "text": "そして、両手をコアへ向ける。白色の光が溢れ、コアへ流れ込んだ。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──っ……！！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "凄まじい力の反発に、身体が悲鳴を上げる。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "？？？",
    "text": "『そんなことをすれば、コアの暴走に巻き込まれて君の肉体だってタダじゃ済まな———』"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「うるさい……っ！！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "視界が白く染まっていく。全身の骨が軋み、意識が遠のきそうになる。でも、ここで倒れるわけにはいかない。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩……！！一人に、させない……っ！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "背後から、ミカくんの声が響いた。アザの消えたミカくんが、私の背中に手を添える。",
    "showIllust": [
      "Mika_serious_injured3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくんっ…！！」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「俺たちの『呼吸』を合わせるんです。……一人で背負わせるなんて、絶対に嫌だ！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "その瞬間、暴れていた力が一つに重なった。\n二人分の想いが、巨大な光となってコアへ突き刺さる。",
    "se": "+CoreCharge_Sound.mp3"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "二人",
    "text": "「──いっけえええええ！！」",
    "bgm": "stop",
    "se": "+window_break.mp3",
    "action": "EXPLOSION_WHITEOUT"
  },
  {
    "scene": "研究所の最奥",
    "text": "私たちの絶叫とともに、限界を超えたエネルギーがコアの最深部へと突き刺さった。コアのまばゆい光が部屋中に放たれる。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "研究所の最奥",
    "text": "やがてその光が、潮を引くように消えていく。",
    "action": "WHITE_OUT_END_SLOW",
    "bg": "/scene/core_close_Nothing2.png"
  },
  {
    "scene": "研究所の最奥",
    "text": "コアの機能が完全に停止した今、あれほど室内を騒がせていた警告音も、不快に耳を劈いていたスピーカーからの電子音声も、もうどこからも聞こえなくなっていた。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……先輩」"
  },
  {
    "scene": "研究所の最奥",
    "text": "隣で倒れ込んだミカくんが、小さく声を漏らした。そこにはもう、あの苦しそうな表情はない。アザの消えた彼は、どこか安心したような、年相応の少年の顔をしていた。",
    "showIllust": [
      "Mika_smile_injured3"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「やったんだよね……私たち」"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はい……先輩が、俺を助けてくれたから」"
  },
  {
    "scene": "研究所の最奥",
    "text": "ミカくんはそう言って、私の手をそっと握り返す。その温もりが、私たちが無事にここまで辿り着いた何よりの証だった。"
  },
  {
    "scene": "研究所の最奥",
    "text": "その時、私は教授の手記の最後のページを思い出した。"
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "──『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』"
  },
  {
    "scene": "研究所の最奥",
    "text": "直後、地面が大きく揺れ始めた。",
    "action": "SHAKE_SCREEN_EXTREME",
    "se": "+bakuhatsu.mp3",
    "bgm": "+alert.mp3",
    "showIllust": [
      "Mika_surprise_injured"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩、急ぎましょう！」",
    "showIllust": [
      "Mika_serious_injured"
    ]
  },
  {
    "scene": "研究所の最奥",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「うん……帰ろう！」"
  },
  {
    "scene": "研究所の最奥",
    "text": "崩れ始める研究所を抜け、私たちは最下層へ向かった。",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "最下層",
    "text": "そこにあったのは、一基の脱出用ロケット。",
    "bgm": "stop",
    "bg": "/scene/rocket_back.png",
    "action": "clear"
  },
  {
    "scene": "脱出ロケット",
    "text": "二人で乗り込み、ハッチを閉めた瞬間──。"
  },
  {
    "scene": "脱出ロケット",
    "text": "轟音と共に、ロケットは崩壊する研究所を抜け、宇宙へと飛び立った。窓の外で遠ざかっていく人工月。その先に見えたのは、私たちが帰る場所──青く輝く地球だった。",
    "se": "Rocket launch_Sound.mp3",
    "action": "SHAKE_SCREEN_SMALL"
  },
  {
    "scene": "脱出ロケット",
    "text": "しばらくの沈黙の後、私はふと口を開いた。"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ねえ、ミカくん。前から気になってたこと、聞いてもいい？」"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はい、なんですか？」",
    "showIllust": [
      "Mika_neutral_injured3"
    ]
  },
  {
    "scene": "脱出ロケット",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「路地裏で会った時……どうしてあんな怪我をしていたの？」"
  },
  {
    "scene": "脱出ロケット",
    "text": "ミカくんは少しだけ目を伏せ、それから静かに答えた。"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「……あの研究所から逃げてきたんです」"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「俺はそこで、ずっと実験体として扱われていました。あの日は警備から逃げて、命からがら外へ出た直後だったんです」"
  },
  {
    "scene": "脱出ロケット",
    "text": "彼は小さく笑う。",
    "showIllust": [
      "Mika_smile_injured"
    ]
  },
  {
    "scene": "脱出ロケット",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「あの時、先輩がくれた水とハンカチ……本当に嬉しかった。だから今度は、俺が先輩を助けたかったんです」"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ミカくん……」"
  },
  {
    "scene": "脱出ロケット",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「俺を救ってくれたのは、先輩ですから」"
  },
  {
    "scene": "脱出ロケット",
    "text": "その言葉に、胸が温かくなる。やがて機体は大気圏へ突入し、窓の外が赤い光に包まれていく。"
  },
  {
    "scene": "脱出ロケット",
    "text": "でも、もう怖くなかった。隣には、もう一人で苦しむことのないミカくんがいる。"
  },
  {
    "scene": "脱出ロケット",
    "text": "私たちは今度こそ、本当の青い地球へ帰ってきた。"
  },
  {
    "scene": "大学",
    "action": "SLOW_FADE_TO_BLACK",
    "duration": 4000
  },
  {
    "scene": "大学",
    "text": "私たちの日常は、驚くほどあっけなく戻ってきた。",
    "bgm": "Normal_Morning2.mp3",
    "bg": "/scene/sky.png"
  },
  {
    "scene": "大学",
    "text": "教授の手記とデータチップを持ち帰ったことで実習は無事成功。研究所で起きた事件も、政府の対策によって少しずつ収束へ向かっていた。"
  },
  {
    "scene": "大学",
    "text": "そして、あの騒動の原因を作ったヒルミ教授はというと──。"
  },
  {
    "scene": "大学の研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「いやぁ、まさか本当にコアを止めてくるとはね。実に素晴らしい実習結果だよ」",
    "bg": "/scene/lab.png",
    "showIllust": [
      "Hirumi_smile4"
    ]
  },
  {
    "scene": "大学の研究室",
    "text": "いつもの研究室で、何事もなかったかのようにコーヒーを飲んでいた。"
  },
  {
    "scene": "大学の研究室",
    "text": "……あまりにもいつも通りすぎて、怒る気力すら失せてしまう。"
  },
  {
    "scene": "大学の研究室",
    "text": "でも、その姿を見てようやく実感した。"
  },
  {
    "scene": "大学の研究室",
    "text": "私たちは、本当に帰ってきたのだ。"
  },
  {
    "scene": "大学の研究室",
    "text": "そして、そんな中変わったことと言えば──。",
    "bgm": "stop",
    "hideIllust": [
      "Hirumi"
    ],
    "bg": "black"
  },
  {
    "scene": "大学の廊下",
    "text": "研究所での戦いから数日後。",
    "bgm": "HappyEnd.mp3",
    "bg": "/scene/university_hallway.png"
  },
  {
    "scene": "大学の廊下",
    "text": "私たちは無事に地球へ帰還し、いつもの大学生活へと戻っていた。"
  },
  {
    "scene": "大学の廊下",
    "text": "今は教授に頼まれた研究資料の整理を終え、二人で廊下を歩いているところだった。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩、その資料、俺が持ちます。……あ、手、貸してください」",
    "showIllust": [
      "Mika_neutral3"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "そう言って私の手からバインダーを受け取るミカくんの指先が、一瞬だけ触れる。\nそれだけなのに、心臓が跳ねるような感覚がした。"
  },
  {
    "scene": "大学の廊下",
    "text": "首元を覆っていた黒いアザは消え去り、実験体としての過去から解放された彼は、一人の男の子として、私の隣に並んでいる。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ、ありがとう、ミカくん。……なんだか不思議だね。数日前まで宇宙にいたなんて」"
  },
  {
    "scene": "大学の廊下",
    "text": "私は照れ隠しに、窓の外の青空を見上げた。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「不思議、ですか？ 俺は……今のほうが、ずっと夢みたいです」",
    "showIllust": [
      "Mika_smile"
    ]
  },
  {
    "scene": "大学の廊下",
    "text": "ミカくんは足を緩め、まっすぐ私を見る。",
    "bg": "/character/Mika/Mika_CG2.png",
    "hideIllust": [
      "Mika"
    ]
  },
  {
    "scene": "大学の廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「あの時、先輩が俺の手を握ってくれたから。『君を助ける』って言ってくれたから、今の俺がいるんです」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「もう……大袈裟だなぁ」"
  },
  {
    "scene": "大学の廊下",
    "text": "そう言いながら顔を逸らすと、自分でも分かるほど頬が熱くなった。"
  },
  {
    "scene": "大学の廊下",
    "text": "あの研究所で聞いた謎の声。お父さんの行方。私自身に眠る力。まだ何も終わってはいない。"
  },
  {
    "scene": "大学の廊下",
    "text": "それでも、隣にいる彼の温もりだけは、確かな現実だった。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「先輩」"
  },
  {
    "scene": "大学の廊下",
    "text": "ミカくんが、そっと私の手を握る。彼も私も、もう迷わない。人目のある大学の廊下でも、私の手を離そうとはしなかった。"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「これからは、俺が先輩を守ります。何があっても、ずっと隣にいますから」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……うん。でも、遅れるとまた教授に怒られるよ？」"
  },
  {
    "scene": "大学の廊下",
    "speaker": "ミカ",
    "role": "MIKA",
    "text": "「はい、先輩」"
  },
  {
    "scene": "大学の廊下",
    "text": "繋いだ手から伝わる温もり。"
  },
  {
    "scene": "大学の廊下",
    "text": "あの黄金色の月の下で重なった私たちの『呼吸』は、これからどんな未来が訪れても、もう離れることはない。"
  },
  {
    "scene": "大学の廊下",
    "text": "私は彼の手を握り返しながら、光に満ちたキャンパスの中へ歩き出した。"
  },
  {
    "scene": "大学の廊下",
    "text": "ミカルート・ハッピーエンド",
    "action": "FADE_TO_HAPPY_END"
  },

  //=============== アカネルート ===============
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "視界が激しく揺れ、冷たいコンクリートが迫る。\n衝撃を覚悟して目を閉じた瞬間、私の身体は硬く、圧倒的に大きな「肉壁」に受け止められていた。",
    "label": "akane_route_start",
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ」",
    "showIllust": [
      "Akane_neutral3"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "見上げると、眼帯に覆われていない片目が、暗闇の中で鋭く私を見下ろしている。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "周囲を見回しても、さっきまで一緒だったムッちゃんや他の人たちの姿はない。濃霧と【黒騎士】の猛攻によって、完全にはぐれてしまったらしい。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "恐怖で震える私を、大男は問答無用で引きずるように走り出した。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……っ、あの！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "息を切らしながら声をかけると、男がちらりと振り返る。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "大男",
    "text": "「……なんだ」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……名前……」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "大男",
    "text": "「は？」",
    "showIllust": [
      "Akane_serious"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「名前！！ 教えてください！！」"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "突然の問いに、男は眉をひそめる。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "今聞くべきことじゃないのかもしれない。けれど、この人は転びそうになった私を助けてくれた。それに、この異常な状況の中で、少しでも恐怖を紛らわせたかった。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "しばらく沈黙が続いた後、男は小さく呟いた。"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……アカネだ」",
    "showIllust": [
      "Akane_neutral"
    ]
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "text": "その声を、私はかろうじて聞き取った。"
  },
  {
    "scene": "研究室",
    "text": "その後、冷たい沈黙を保ったまま、彼が私を連れて向かった先は──誰も近寄らない大学の最奥、ヒルミ教授の研究室だった。",
    "bg": "/scene/lab.png",
    "bgm": "stop",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "研究室",
    "text": "乱暴に扉が開かれ、私たちはその中へ転がり込む。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「……遅かったね」",
    "showIllust": [
      "Hirumi_smile4"
    ]
  },
  {
    "scene": "研究室",
    "text": "白衣を翻し、眼鏡の奥の瞳で部屋の主が私たちを迎える。"
  },
  {
    "scene": "研究室",
    "text": "息を切らす私と、その隣で片目だけで部屋を睨むアカネさんを見比べ、教授は口元を歪めた。アカネさんは何も言わず、ただ私の手首を掴んだまま、鋭い威圧感を放っている。",
    "showIllust": [
      "Akane_neutral2"
    ]
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「そんなに熱い視線を送られると照れるね。私にそういう趣味はないのだが」",
    "showIllust": [
      "Hirumi_serious"
    ]
  },
  {
    "scene": "研究室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……チッ」",
    "showIllust": [
      "Akane_serious"
    ]
  },
  {
    "scene": "研究室",
    "text": "からかう教授を、アカネさんは不快そうに睨みつけ、舌打ちを漏らした。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「冗談だ。それより本題だ」",
    "showIllust": [
      "Hirumi_smile"
    ],
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "研究室",
    "text": "教授はデスクからカードキーを取り出し、画面に地下施設に隠されていた巨大なロケットを映し出す。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「君たちにはこれに乗って、あの青い月まで行ってもらう」"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「月に……？」"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「説明している時間はない。君たちは今すぐ、このロケットで月へ向かってくれ」"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「月へ……？」"
  },
  {
    "scene": "研究室",
    "text": "あまりにも突然の言葉に、私は言葉を失う。教授は静かに続けた。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「外の怪物も、この世界の異変も、すべては人工月にある『研究所のコア』が原因だ。世界を元に戻したければ、コアを止めるしかない」"
  },
  {
    "scene": "研究室",
    "text": "その言葉を聞いて、男に拉致されたアジトで発見した文言が頭によぎった。"
  },
  {
    "scene": "研究室",
    "text": "『……異能力やキメラの発現には、政府が隠ぺいした人工月が関係している』"
  },
  {
    "scene": "研究室",
    "text": "『……その中の、研究所によって守られる“コア”が発生源と仮定されており……』"
  },
  {
    "scene": "研究室",
    "text": "…やっぱりあの文章に書かれていたことは本当のことだった。"
  },
  {
    "scene": "研究室",
    "text": "教授は一冊の資料を私たちへ差し出した。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「詳しいことはそこに書いてある。向こうで読みなさい」"
  },
  {
    "scene": "研究室",
    "text": "そう告げた教授は、隣に立つアカネさんへ意味深な視線を向ける。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「……まぁ、彼がいれば何とかなるだろう」",
    "showIllust": [
      "Hirumi_serious"
    ]
  },
  {
    "scene": "研究室",
    "text": "その言葉に、部屋の空気が一瞬張り詰めた。\n教授は何かを知っているような目でアカネさんを見る。しかし本人は気にする様子もなく、黙々とロケットの確認を続けていた。"
  },
  {
    "scene": "研究室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あの……何をしているんですか？」",
    "showIllust": [
      "Akane_neutral2"
    ],
    "hideIllust": [
      "Hirumi"
    ]
  },
  {
    "scene": "研究室",
    "text": "恐る恐る尋ねると、アカネさんは鋭い視線を向ける。"
  },
  {
    "scene": "研究室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……なんでもいいだろ。早く行くぞ」"
  },
  {
    "scene": "研究室",
    "text": "冷たい言葉。しかし、その横顔を見た瞬間、私は気づいた。\n教授を見る彼の目には、ただならない敵意が宿っている。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「……ふふっ」",
    "showIllust": [
      "Hirumi_serious4"
    ],
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "研究室",
    "text": "その様子を見た教授が、小さく笑う。"
  },
  {
    "scene": "研究室",
    "text": "アカネさんの表情がわずかに強張り、二人の間に言葉では説明できない緊張感が走った。\nけれど教授は、すぐにいつもの飄々とした表情へ戻る。"
  },
  {
    "scene": "研究室",
    "speaker": "ヒルミ教授",
    "role": "PROFESSOR",
    "text": "「さぁ、時間だ―――行きなさい」"
  },
  {
    "scene": "研究室",
    "text": "そう言うと教授は迷いなく起動スイッチを押した。"
  },
  {
    "scene": "研究室",
    "text": "遠くから防壁を叩き割るような凄まじい爆音が響き、研究室全体が大きく揺れた。アイツが、すぐそこまで来ている。",
    "action": "SHAKE_SCREEN",
    "se": "+bakuhatsu.mp3"
  },
  {
    "scene": "研究室",
    "text": "──黒騎士が、ここまで迫っている。"
  },
  {
    "scene": "研究室",
    "text": "他に目もくれずロケットに乗り込んでしまったアカネさんを追いかけるように、私はロケットへ続くハッチへ飛び込んだ。",
    "hideIllust": [
      "Hirumi"
    ]
  },
  //=============== ロケット内部 ===============
  {
    "scene": "ロケット内部",
    "text": "ロケット内部は、無機質な計器と二人分のシートだけが並ぶ狭い空間だった。",
    "bg": "/scene/rocket.png",
    "bgm": "stop"
  },
  {
    "scene": "ロケット内部",
    "text": "私たちがシートへ座りベルトを締めた瞬間、頭上のハッチが重々しい音を立てて閉まる。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『システム起動。カウントダウン、最終シークエンスへ移行』"
  },
  {
    "scene": "ロケット内部",
    "text": "機械音声と共に機体が激しく震え、ロケットは轟音を上げて人工月へ向かって飛び立った。",
    "se": "+rocket_launch.mp3",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "ロケット内部",
    "text": "強烈な重力が身体をシートへ押し付ける。\n窓の外では街の灯りが遠ざかり、青白い人工月だけが大きく迫っていた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……どうして、こんなことに……」",
    "action": "clear"
  },
  {
    "scene": "ロケット内部",
    "text": "震える声で呟いても、隣のアカネさんから返事はない。彼はただ、無数に並ぶ計器と液晶画面を鋭い目で見つめ続けていた。",
    "showIllust": [
      "Akane_neutral3"
    ]
  },
  {
    "scene": "ロケット内部",
    "text": "ヒルミ教授の意味深な態度。アカネさんとの間にあった、言葉にできない緊張感。\n嫌な予感だけが、胸の奥で膨らんでいく。"
  },
  {
    "scene": "ロケット内部",
    "text": "──その時だった。"
  },
  {
    "scene": "ロケット内部",
    "text": "ピピピピピッ！！！",
    "bgm": "+alert_Rocket.mp3"
  },
  {
    "scene": "ロケット内部",
    "text": "機内にけたたましい警報が鳴り響く。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『警告。推進システムに致命的なエラー。機体の制御が不可能です』"
  },
  {
    "scene": "ロケット内部",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「えっ……！？」"
  },
  {
    "scene": "ロケット内部",
    "text": "身体がふわりと浮き、ロケットが大きく傾く。"
  },
  {
    "scene": "ロケット内部",
    "text": "窓の外では青い月が激しく回転し、機体全体が悲鳴のような金属音を上げ始めた。"
  },
  {
    "scene": "ロケット内部",
    "text": "混乱する私の横で、アカネさんは赤い警告灯に照らされながら、低く呟いた。"
  },
  {
    "scene": "ロケット内部",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……やはりか」"
  },
  {
    "scene": "ロケット内部",
    "text": "まるで、この異常を予想していたかのような表情だった。しかし、問いかける余裕はない。"
  },
  {
    "scene": "ロケット内部",
    "text": "ガガガガガッ！！",
    "action": "SHAKE_SCREEN_EXTREME",
    "se": "Rocket_Shock.mp3"
  },
  {
    "scene": "ロケット内部",
    "text": "激しく揺れる機体の中、私は迫る死の恐怖に息を呑むことしかできなかった。"
  },
  {
    "scene": "ロケット内部",
    "text": "激しい墜落の衝撃と、耳をつんざく金属の断裂音が響いた瞬間──私の意識は暗闇へ沈んでいた。",
  },
  {
    "action": "FADE_TO_BLACK",
    "duration": 4000,
    "se": "stop",
    "bgm": "stop",
    "hideIllust": [
      "Akane"
    ]
  },
  //=============== 墜落後 ===============
  {
    "scene": "暗闇",
    "text": "どれほど時間が経ったのだろう。遠くで響く金属音と、身体を襲う鈍い痛みに引き戻される。",
    "action": "clear",
    "bg": "black"
  },
  {
    "scene": "暗闇",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……ッ、おい。起きろ」"
  },
  {
    "scene": "暗闇",
    "text": "煤煙の混じった視界の中、私の肩を掴み、無理やり意識を繋ぎ止めたのは、焦燥を滲ませた低い声だった。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……アカネ、さん……？」",
    "bg": "/scene/moon_surface.png",
    "bgm": "Moon.mp3",
    "action": "WAKE_UP"
  },
  {
    "scene": "月面",
    "text": "ゆっくり目を開けると、そこにはガラスの破片と歪んだ鉄板に囲まれた、無残なロケットの残骸があった。"
  },
  {
    "scene": "月面",
    "text": "あれほどの墜落だったというのに、不思議なことに身体は動く。大きな怪我もない。"
  },
  {
    "scene": "月面",
    "text": "ふと横を見ると、アカネさんが何かを床へ投げ捨てた。それは、焼け焦げた緊急用の手動レバーだった。あの墜落の瞬間、彼は残されたわずかな制御装置を使い、機体の衝撃を少しでも抑えていたのだ。"
  },
  {
    "scene": "月面",
    "text": "それがなければ、私たちは助からなかった。冷たい夜風が吹き抜ける。"
  },
  {
    "scene": "月面",
    "text": "私たちが墜落したのは、深い霧に包まれた、使われなくなったスクラップ工場のような場所だった。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これ……一体、どうなって……」"
  },
  {
    "scene": "月面",
    "text": "私の呟きに、アカネさんは煙を上げるロケットを見つめたまま、静かに答えた。"
  },
  {
    "scene": "月面",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「このロケットは、最初から墜落するようにできていた」",
    "showIllust": [
      "Akane_neutral3"
    ]
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え？」"
  },
  {
    "scene": "月面",
    "text": "意味が理解できない。\nけれど、その言葉を聞いた瞬間、ヒルミ教授の姿が脳裏に蘇った。"
  },
  {
    "scene": "月面",
    "text": "あの時の不自然な態度。出発を急かすような、意味深な笑み。\n──教授は、この墜落を知っていた？"
  },
  {
    "scene": "月面",
    "text": "混乱する思考の中、私はあることを思い出した。教授から渡された、一枚の古びた書類。"
  },
  {
    "scene": "月面",
    "text": "震える手でポケットを探り、くしゃくしゃになった紙束を取り出す。"
  },
  {
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これ……」"
  },
  {
    "scene": "月面",
    "text": "暗闇の中、わずかな月明かりを頼りに、私はそこへ書かれた文字へ目を落とした。"
  },

  {
    "scene": "月面",
    "type": "choice",
    "text": "手記の内容を読みますか？",
    "choices": [
      {
        "text": "読む",
        "targetLabel": "read_professors_note4"
      },
      {
        "text": "スキップする",
        "targetLabel": "skip_professors_note4"
      }
    ],
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "label": "read_professors_note4",
    "scene": "月面",
    "text": "教授の手記には、研究所の最奥にある『コア』が【キメラ】の発生源であること、そしてそこへ辿り着くには、研究所各地に散らばる《セキュリティ解除コードの断片（フラグメント）》をすべて回収する必要があると書かれていた。",
    "showItem": "/item/Message.png"
  },
  {
    "scene": "月面",
    "text": "裏面には研究所の簡易マップと、フラグメントの配置図が記されている。"
  },
  {
    "scene": "月面",
    "text": "さらに最後のページには、教授からの注意書きが残されていた。"
  },
  {
    "scene": "月面",
    "speaker": "手記の記憶",
    "text": "『コアは物理的には破壊できない。適応者の異能を限界まで流し込み、停止させるしかない』"
  },
  {
    "scene": "月面",
    "speaker": "手記の記憶",
    "text": "『コア停止後、研究所は自壊を開始する。最下層の緊急離脱用ロケットで帰還しなさい』"
  },
  {
    "scene": "月面",
    "text": "つまり、まずは研究所内に散らばったフラグメントを集めて最奥への道を開き、『コア』を停止させるしかない。それが、この世界を救い、私たちが地球へ帰るための唯一の方法だった。"
  },
  {
    "label": "skip_professors_note4",
    "scene": "月面",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ッ、きゃっ！？」",
    "hideItem": true,
    "action": "SHAKE_SCREEN"
  },
  {
    "scene": "月面",
    "text": "次の瞬間、私の手元から紙の束が乱暴に奪われた。\n顔を上げると、アカネさんが月明かりに紙を翳し、険しい表情で内容を読んでいる。",
    "showIllust": [
      "Akane_serious3"
    ]
  },
  {
    "scene": "月面",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……チッ、あの野郎」"
  },
  {
    "scene": "月面",
    "text": "吐き捨てるように呟いた彼は、読み終えた紙をクシャリと握り潰し、ポケットへしまった。"
  },
  {
    "scene": "月面",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「フラグメント収集だのコアだの……。グズグズするな、行くぞ」"
  },
  {
    "scene": "月面",
    "text": "相変わらず冷たく、私を気遣う様子など微塵もない。けれど、その視線の先には、深い霧の中に佇む巨大な研究施設があった。"
  },
  {
    "scene": "月面",
    "text": "墓標のように静まり返ったその建物からは、不気味な気配が漂っている。それでも、この場に一人取り残される恐怖には抗えなかった。"
  },
  {
    "scene": "月面",
    "text": "私は歩き出したアカネさんの背中を、必死に追いかけた。",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "研究所の入口",
    "text": "霧の中を進んだ先で、ようやく巨大な研究施設の正門が姿を現した。",
    "bg": "/scene/lab_entrance.png"
  },
  {
    "scene": "研究所の入口",
    "text": "錆びついた扉の向こうからは、人の気配はおろか、機械の稼働音すら聞こえない。かつては多くの研究者がいたはずの場所は、今ではただ静寂だけが支配する廃墟と化していた。"
  },
  {
    "scene": "研究所の入口",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……中を調べるぞ」",
    "showIllust": [
      "Akane_serious3"
    ]
  },
  {
    "scene": "研究所の入口",
    "text": "アカネさんの短い言葉を合図に、私たちは閉ざされた研究所の内部へと足を踏み入れた。"
  },
  {
    "action": "FADE_TO_BLACK"
  },
  //=============== フラグメントコレクト ===============
  {
    "scene": "フラグメントコレクト",
    "action": "TRIGGER_FRAGMENT_COLLECT_AKANE",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「──よしっ、これで最後のデータチップ、回収完了！」",
    "bg": "/scene/Lab_corridor.png",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "廊下",
    "text": "制御端末から最後のフラグメントを抜き取り、私は大きく息を吐いた。これで、研究所の最奥へ進むために必要なすべての鍵が揃ったはずだ。"
  },
  {
    "scene": "廊下",
    "text": "しかし、ほっとしたのも束の間————。"
  },
  {
    "scene": "廊下",
    "text": "──ゴゴゴゴ……。",
    "se": "+jishin.mp3",
    "action": "SHAKE_SCREEN_CONTINUOUS_SMALL"
  },
  {
    "scene": "廊下",
    "text": "研究所全体が大きく揺れる。"
  },
  {
    "scene": "廊下",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "『警告。侵入者排除システムを起動します』"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？」"
  },
  {
    "scene": "廊下",
    "text": "閉ざされていた隔壁が開き、その奥から巨大な防衛個体が姿を現した。",
    "bgm": "serious_2.mp3",
    "action": "clear",
    "showIllust": [
      "machine4"
    ],
    "se": "+robot.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……チッ」",
    "showIllust": [
      "Akane_serious2"
    ]
  },
  {
    "scene": "廊下",
    "text": "アカネさんが忌々しげに舌打ちすると、私を振り返る。"
  },
  {
    "scene": "廊下",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「歌え。あの時みたいに」"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あの時……？」"
  },
  {
    "scene": "廊下",
    "text": "最初に【キメラ】へ襲われたあの日のことが脳裏をよぎる。確かあの時も、アカネさんは私に「歌え」と言った。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（どうして、この人は私の力を知っているの……？）"
  },
  {
    "scene": "廊下",
    "text": "胸に疑問が浮かぶ。けれど今は、考えている暇なんてない。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（……今は目の前の敵に集中しよう）"
  },
  {
    "scene": "廊下",
    "text": "私は静かに息を吸い込み、歌声を響かせた。"
  },
  //=============== 戦闘開始(アカネ中ボス) ===============
  {
    "scene": "廊下",
    "text": "崩れ落ちた防衛個体を前に、私は荒い呼吸を整える。",
    "bgm": "stop",
    "hideIllust": [
      "machine",
      "Akane"
    ],
    "se": "+robot_down.mp3"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……終わった……」"
  },
  {
    "scene": "廊下",
    "text": "けれど、安堵する暇もなく、アカネさんはすでに廊下の奥へと歩き出していた。"
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ちょ、ちょっと待って……！」"
  },
  {
    "scene": "廊下",
    "text": "思わず呼び止めると、アカネさんは足を止め、ゆっくりとこちらを振り返る。",
    "showIllust": [
      "Akane_serious3"
    ]
  },
  {
    "scene": "廊下",
    "text": "その片目には、先ほどまでの戦闘の緊張とは違う、焦りにも似た鋭い光が宿っていた。戦いを終えた直後だというのに、彼から放たれる殺気に、思わず背筋が凍る。"
  },
  {
    "scene": "廊下",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……早くしろ」"
  },
  {
    "scene": "廊下",
    "text": "それだけを告げると、アカネさんは再び前へ進んでいく。",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "廊下",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「何なの……もう……」"
  },
  {
    "scene": "廊下",
    "text": "思わず小さく呟く。"
  },
  {
    "scene": "廊下",
    "text": "いつも通りぶっきらぼうで、何を考えているのか分からない人。でも、今の彼の様子はどこか違っていた。"
  },
  {
    "scene": "廊下",
    "text": "黒騎士のこと。この研究所のこと。そして……私自身のこと。\nアカネさんは、きっと何かを知っている。"
  },
  {
    "scene": "廊下",
    "text": "問いただしたい気持ちはあった。けれど、今の彼に踏み込む勇気は出なかった。私は小さく息を吐き、重苦しい沈黙の中長い廊下を進む。"
  },
  {
    "scene": "ゲート前",
    "text": "巨大なゲートの前にたどり着く。\n中央には、集めたフラグメントを差し込むためのスロットがあった。",
    "bg": "/scene/gate.png"
  },
  {
    "scene": "ゲート前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ここ、だね……」"
  },
  {
    "scene": "ゲート前",
    "text": "私は手元のチップを握りしめる。"
  },
  {
    "scene": "ゲート前",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この扉の向こうに、コアがある）"
  },
  {
    "scene": "ゲート前",
    "text": "最後の決意を固め、私はゆっくりとフラグメントを差し込んだ。"
  },
  //================ コアの部屋 ===============
  {
    "scene": "コア部屋",
    "text": "そこは、研究所の最深部。",
    "bg": "/scene/core.png",
    "bgm": "CoreBGM.mp3"
  },
  {
    "scene": "コア部屋",
    "text": "壁面がガラス張りになっており、そこから差し込む「本当の月の光」を浴びて、それは宙に浮かんでいた。"
  },
  {
    "scene": "コア部屋",
    "text": "──『コア』。"
  },
  {
    "scene": "コア部屋",
    "text": "心臓のように脈打つそれからは、周囲を震わせるほどの莫大なエネルギーが放たれている。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「これが……コア……」"
  },
  {
    "scene": "コア部屋",
    "text": "呆然と呟く私の横で、アカネさんはゆっくりとコアへ近づいていく。"
  },
  {
    "scene": "コア部屋",
    "text": "その片目には、燃え上がるような憎悪が宿っていた。握りしめた拳が、怒りを押し殺すように震えている。"
  },
  {
    "scene": "コア部屋",
    "text": "──教授の手記にはこうあった。"
  },
  {
    "scene": "コア部屋",
    "text": "コアを止めるには、物理的な破壊ではなく、適応者の『異能の力』を限界まで注ぎ込む必要がある。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……異能の力を、注ぎ込む……」"
  },
  {
    "scene": "コア部屋",
    "text": "その言葉に、私はハッとする。\n私にも、歌の力がある。あの時みたいに歌えば、もしかしたら──。"
  },
  {
    "scene": "コア部屋",
    "text": "そう思って一歩踏み出そうとした、けれど———。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「無理だ」",
    "showIllust": [
      "Akane_neutral3"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え？」"
  },
  {
    "scene": "コア部屋",
    "text": "アカネさんは、私の考えを見透かしたように言った。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「お前の力じゃ、今のコアは止められない」"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「どうして……」"
  },
  {
    "scene": "コア部屋",
    "text": "問いかけても、アカネさんは答えない。ただ静かに、コアを見つめていた。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「これは……俺がやる」"
  },
  {
    "scene": "コア部屋",
    "text": "そう呟き、彼はゆっくりと手を伸ばす。"
  },
  {
    "scene": "コア部屋",
    "text": "けれど──。その姿は、いつもより明らかに弱々しく見えた。何かを削りながら、この力を使おうとしている。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「アカネさん……！」"
  },
  {
    "scene": "コア部屋",
    "text": "私が声を上げた、その瞬間だった。"
  },
  {
    "scene": "コア部屋",
    "speaker": "？？？",
    "text": "「──やめておいたら？」",
    "bgm": "stop",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "背後から、冷たい少年の声が響く。"
  },
  {
    "scene": "コア部屋",
    "speaker": "？？？",
    "text": "「危ないよ、それ」"
  },
  {
    "scene": "コア部屋",
    "text": "心臓が跳ねる。\n嫌な予感に身体を強張らせながら振り返ると──。"
  },
  {
    "scene": "コア部屋",
    "text": "ゲートの影から、一人の少年がゆっくりと姿を現した。",
    "showIllust": [
      "Ruki_neutral4"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "黒い髪。幼さの残る顔立ちと、口元のマスク。\nこの場にはあまりにも不釣り合いな出で立ちに、目を奪われる。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……誰？」"
  },
  {
    "scene": "コア部屋",
    "text": "初めて見るはずなのに。なぜか胸の奥が、締め付けられるように痛んだ。"
  },
  {
    "scene": "コア部屋",
    "text": "少年は私には目もくれず、足元に転がる【キメラ】の死骸を軽く蹴る。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「はは……必死だねぇ」",
    "bgm": "serious_4.mp3"
  },
  {
    "scene": "コア部屋",
    "text": "少年はアカネさんを見て、楽しそうに笑った。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「そんな身体に無理やり入れた“まがい物の異能”なんか使ったら、お前の方が先に壊れちゃうよ」"
  },
  {
    "scene": "コア部屋",
    "text": "その言葉に、アカネさんの片目が鋭く細まる。\n———殺意。今まで見たことのないほど冷たい感情が、その瞳に宿っていた。",
    "showIllust": [
      "Akane_serious2"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「そんな無駄な死に方するくらいならさ」"
  },
  {
    "scene": "コア部屋",
    "text": "少年は一歩近づき、愉快そうに続ける。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「もっと楽しい話をしようよ」"
  },
  {
    "scene": "コア部屋",
    "text": "そして──。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「あんたの母親が、最後に何を言ったか知ってる？」",
    "bgm": "stop"
  },
  {
    "scene": "コア部屋",
    "text": "その瞬間、アカネさんの表情が凍った。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「『アカネを助けて』って」"
  },
  {
    "scene": "コア部屋",
    "text": "少年は笑う。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「無能力者だった息子を守るために、最後まで必死に名前を呼んでたよ。でも結局、何もできなかった。あはは！！本当に可哀想だよね」"
  },
  {
    "scene": "コア部屋",
    "text": "その瞬間、部屋の空気が凍りついた。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「…………へえ」"
  },
  {
    "scene": "コア部屋",
    "text": "地を這うような低い声。ゆっくりと顔を上げたアカネさんの瞳には、今まで見たことのないほど深い憎悪が宿っていた。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「面白い冗談を言うな、ガキ」"
  },
  {
    "scene": "コア部屋",
    "text": "銃のシリンダーが、乾いた音を立てる。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「俺の母親を、お前みたいなクズが侮辱するな」"
  },
  {
    "scene": "コア部屋",
    "text": "一歩、少年へ近づく。その姿からは、普段の冷静さなど欠片も感じられなかった。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「ああ、そうだな。俺は無能力者だった。何もできなかった。……だから何だ？」"
  },
  {
    "scene": "コア部屋",
    "text": "握り締めた銃口が、少年へ向けられる。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「無能力者の引き金でも、お前を撃ち抜くくらいはできる」"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「あはは！ そんなオモチャが僕に効くわけないじゃん」"
  },
  {
    "scene": "コア部屋",
    "text": "少年は楽しそうに笑うと、軽く指を鳴らした。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "role": "RUKI",
    "text": "「さあ、おいで──僕のボディーガード」"
  },
  {
    "scene": "コア部屋",
    "text": "天井のガラスが砕け散り、漆黒の鎧に包まれた巨大な存在が、二人の間へと降り立った。",
    "bgm": "Battle1.mp3",
    "se": "+bakuhatsu.mp3",
    "action": "SHAKE_SCREEN_VERY_LARGE"
  },
  {
    "scene": "コア部屋",
    "text": "【黒騎士】。その姿を見た瞬間、アカネさんの表情が変わる。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「…………そこに、いたのか」"
  },
  {
    "scene": "コア部屋",
    "text": "震える声。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「ようやく……殺せる」"
  },
  {
    "scene": "コア部屋",
    "text": "次の瞬間、アカネさんは黒騎士へ向かって駆け出していた。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「絶対に……殺してやるッ！！」"
  },
  {
    "scene": "コア部屋",
    "text": "銃声が研究所の最深部に響き渡る。しかし、黒騎士には届かない。",
    "se": "+shot.mp3"
  },
  {
    "scene": "コア部屋",
    "text": "圧倒的な力の差に何度も弾き飛ばされても、アカネさんは立ち上がった。\n傷ついても、倒れても、ただ憎しみだけを支えにして向かっていく。",
    "se": "+panchi_akane.mp3",
    "seLoop": true,
    "action": "SHAKE_SCREEN_VERY_LARGE",
    "hideIllust": [
      "Akane",
      "Ruki"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「アカネさん……っ！！」",
    "se": "stop"
  },
  {
    "scene": "コア部屋",
    "text": "止めなきゃ。そう思うのに、身体が動かない。目の前で繰り広げられる光景。少年の笑い声。黒騎士の放つ異様な威圧感。",
    "action": "CLEAR_ALL_ALERTS_AND_SHAKES"
  },
  {
    "scene": "コア部屋",
    "text": "すべてが恐怖となって押し寄せ、私の心を押し潰していく。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「いや……やめて……っ」"
  },
  {
    "scene": "コア部屋",
    "text": "ドクン。",
    "se": "+beat.mp3",
    "action": "RED_ALERT_FLASH"
  },
  {
    "scene": "コア部屋",
    "text": "心臓とは違う、何かが身体の奥で脈打った。全身の血管を駆け巡るような熱。皮膚の内側が焼けるような感覚。"
  },
  {
    "scene": "コア部屋",
    "text": "そして──。自分の中に眠っていた「何か」が、目を覚ました。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「あ……あああああッ！！」",
    "action": "SHAKE_SCREEN_CONTINUOUS_MEDIUM"
  },
  {
    "scene": "コア部屋",
    "text": "私の口から、人間のものとは思えない叫び声が漏れる。身体の奥で異能が暴れ出し、黒い霧のような力が周囲へと溢れ出していく。",
    "action": "BLACK_AURA_START"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "role": "RUKI",
    "text": "「あはは！ 最高だよ！」",
    "showIllust": [
      "Ruki_neutral4"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "少年の愉快そうな笑い声が響く。\n黒騎士に傷つけられながらも戦っていたアカネさんが、その異変に気づいてこちらを振り返った。",
    "showIllust": [
      "Akane_serious_injured2"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「──チッ、ふざけんな……！」"
  },
  {
    "scene": "コア部屋",
    "text": "アカネさんは迫る黒騎士の攻撃を無理やり受け流し、傷だらけの身体でこちらへ駆けてくる。",
    "hideIllust": [
      "Akane",
      "Ruki"
    ],
    "action": "CLEAR_RED_ALERT"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「おい……！！ しっかりしろ！！」",
    "action": "CLEAR_ALL_ALERTS_AND_SHAKES",
    "bgm": "stop",
    "showIllust": [
      "Akane_serious_injured3"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "荒々しい声が、遠のきかけた意識を引き戻す。肩を掴む彼の手。焼けるような痛みの中で感じた、その確かな温度。"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "（この人は……私を見捨てない）"
  },
  {
    "scene": "コア部屋",
    "text": "化け物になりかけた私を、まだ「私」として見てくれている。"
  },
  {
    "scene": "コア部屋",
    "text": "その瞬間──暴走していた力の流れが、変わった。"
  },
  {
    "scene": "コア部屋",
    "text": "私の内側から溢れていた異能が、周囲に広がる力を逆に取り込み始める。黒騎士の残した異能の残滓。そして、少年が放つ莫大な力。",
    "bgm": "Battle2.mp3",
    "action": ["clear", "ENERGY_AURA_START"],
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "すべてを吸収するように、私の身体へ集まっていく。"
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "role": "RUKI",
    "text": "「……はぁ。めんどくさいことになったな。片づけるよ」",
    "showIllust": [
      "Ruki_neutral3"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "少年がそう呟いた瞬間、黒騎士がゆっくりとこちらへ向き直る。",
    "showIllust": [
      "BlackKnight3"
      //キメラ2体を左右に配置
    ],
    "hideIllust": [
      "Ruki"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "次の瞬間、研究所全体を揺るがす咆哮と共に、残されたキメラたちが一斉に襲いかかってきた",
    "action": "SHAKE_SCREEN_CONTINUOUS_MEDIUM"
  },
  //=============== 戦闘開始(アカネラスボス) ================
  {
    "scene": "コア部屋",
    "text": "激しい戦闘の末、研究所内に静寂が戻る。",
    "bgm": "stop",
    "hideIllust": [
      "BlackKnight"
    ],
    "action": "clear"
  },
  {
    "scene": "コア部屋",
    "text": "崩れ落ちたキメラたちの残骸を見下ろしながら、少年はつまらなそうに肩をすくめた。",
    "showIllust": [
      "Ruki_neutral3"
    ]
  },
  {
    "scene": "コア部屋",
    "speaker": "少年",
    "text": "「……今回はここまでか。まあいいや。まだ遊び足りないしね」"
  },
  {
    "scene": "コア部屋",
    "text": "そう言い残すと、黒騎士が無言で少年の元へ歩み寄る。",
    "showIllust": [
      "BlackKnight4"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "そして次の瞬間、その身体を抱え上げると、砕けた天井の向こうへと跳躍していった。",
    "hideIllust": [
      "Ruki",
      "BlackKnight"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "残されたのは、私たちと、激しく脈動を続ける『コア』だけだった。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……まだ、止まっていない」",
    "showIllust": [
      "Akane_neutral_injured3"
    ]
  },
  {
    "scene": "コア近い",
    "bg": "/scene/core_close2.png",
    "text": "アカネさんは傷だらけの身体を引きずりながら、ゆっくりとコアへ歩み寄る。",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "コア近い",
    "text": "そして、迷うことなく手を伸ばした。"
  },
  {
    "scene": "コア近い",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「アカネさん……」"
  },
  {
    "scene": "コア近い",
    "text": "その背中を見つめた瞬間、私は理解した。この人は最初から、こうするつもりだったのだ。自分の命を削ってでも、この力を止めるつもりだった。"
  },
  {
    "scene": "コア近い",
    "text": "──でも。違う。これは、きっと私の役目でもある。"
  },
  {
    "scene": "コア近い",
    "text": "あの時、キメラに襲われた時。誰かを守りたいと願った時。\n私の歌は、ただ力を与えるだけのものじゃない。誰かの力を繋ぎ、支えるためのものなんだ。"
  },
  {
    "scene": "コア近い",
    "text": "気づけば、私は声を出していた。静かな研究所に、歌が響き渡る。",
    "bgm": "ThaSong.mp3"
  },
  {
    "scene": "コア近い",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……！」",
    "showIllust": [
      "Akane_serious_injured3" //驚く
    ]
  },
  {
    "scene": "コア近い",
    "text": "アカネさんが驚いたように振り返る。"
  },
  {
    "scene": "コア近い",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「お前……」"
  },
  {
    "scene": "コア近い",
    "text": "けれど、私は歌うことを止めなかった。身体の奥から溢れる力が、アカネさんの異能へ重なっていく。\n荒れ狂っていたエネルギーが、少しずつ形を変えていく。"
  },
  {
    "scene": "コア近い",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……ったく」"
  },
  {
    "scene": "コア近い",
    "text": "アカネさんは小さく息を吐いた。"
  },
  {
    "scene": "コア近い",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「お前の歌は……厄介だな」",
    "showIllust": [
      "Akane_smile_injured"
    ]
  },
  {
    "scene": "コア近い",
    "text": "その声は呆れているようで、どこか諦めたようでもあった。けれど、彼はもう拒まなかった。"
  },
  {
    "scene": "コア近い",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……なら、最後まで付き合え」",
    "showIllust": [
      "Akane_neutral_injured"
    ]
  },
  {
    "scene": "コア近い",
    "text": "こうして二つの力が重なり、白い光となってコアへ流れ込んでいく。",
    "se": "+window_break.mp3",
    "action": "WHITE_OUT_START",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "コア近い",
    "text": "世界を包み込むほどの眩い光。激しく脈動していたコアは、やがて静かにその輝きを失っていった。"
  },
  {
    "scene": "コア部屋",
    "bg": "/scene/core_close_Nothing2.png",
    "text": "やがてその光が、潮を引くように消えていく。光が消えた瞬間、全身から力が抜け落ちる。",
    "action": "WHITE_OUT_END"
  },
  {
    "scene": "コア部屋",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……終わっ、た……？」"
  },
  {
    "scene": "コア部屋",
    "text": "声に出したつもりだったけれど、自分でも聞き取れないほど小さな声だった。"
  },
  {
    "scene": "コア部屋",
    "text": "張り詰めていた糸が切れたように、足元がふらつく。もう立っていることすらできない。倒れ込む身体を、彼の大きな手が支える。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……よくやった」",
    "showIllust": [
      "Akane_neutral_injured3"
    ]
  },
  {
    "scene": "コア部屋",
    "text": "いつものような冷たい声ではなかった。"
  },
  {
    "scene": "コア部屋",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「今は……眠っていろ」"
  },
  {
    "scene": "コア部屋",
    "text": "その言葉を最後に、私の意識はゆっくりと暗闇の中へ沈んでいった。"
  },
  {
    "action": "FADE_TO_BLACK",
    "duration": 3000,
    "bgm": "stop",
    "bgmFade": 3,
    "hideIllust": [
      "Akane"
    ]
  },
  //=============== アジト ===============
  {
    "scene": "アジト寝室",
    "bg": "black",
    "text": "遠くで規則的な電子音が響いている。鼻腔をくすぐるのは、消毒液の匂いと、どこか懐かしい煙草の香りだった。"
  },
  {
    "scene": "アジト寝室",
    "text": "ゆっくりと目を開けると、そこは年季の入ったアジトの一室だった。身体にはまだ重い疲労感が残っている。ぼんやりと天井を見つめていると、低く掠れた声が聞こえた。",
    "action": "WAKE_UP",
    "bg": "/scene/Ajito_Room.png"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ん……」"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「──目が覚めたか」"
  },
  {
    "scene": "アジト寝室",
    "text": "声の方へ視線を向けると、部屋の隅の椅子に座ったアカネさんがいた。全身には包帯が巻かれていて、いつもの鋭い雰囲気も少しだけ弱まっているように見える。",
    "bgm": "Room_Night.mp3"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「アカネさん……私、どうして……」",
    "showIllust": [
      "Akane_neutral3"
    ]
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「研究所が崩落した。コアは停止した」"
  },
  {
    "scene": "アジト寝室",
    "text": "短く答えた後、アカネさんは少しだけ目を伏せる。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……お前を抱えて、ここまで戻ってきた」"
  },
  {
    "scene": "アジト寝室",
    "text": "その言葉に驚く暇もなく、私はふと、あの研究所で対峙した少年と黒騎士の姿を思い出した。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……あの子と、黒騎士は？」"
  },
  {
    "scene": "アジト寝室",
    "text": "私が尋ねると、アカネさんの片目が鋭く細められる。",
    "showIllust": [
      "Akane_serious"
    ]
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「確認はできていない。死んだか、逃げたか……どちらにせよ、まだ終わっていない可能性が高い」"
  },
  {
    "scene": "アジト寝室",
    "text": "そして、しばらく沈黙した後、静かに口を開いた。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「あいつの名前は、ルキだ」"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ルキ……？」"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「あいつは、俺の母親を黒騎士と共に殺した」"
  },
  {
    "scene": "アジト寝室",
    "text": "その声には、押し殺した怒りが滲んでいた。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「そして……お前の弟でもある」"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……え？」"
  },
  {
    "scene": "アジト寝室",
    "text": "頭の中が真っ白になる。\n弟。その言葉だけが、何度も反響する。"
  },
  {
    "scene": "アジト寝室",
    "text": "けれど、どれだけ記憶を探っても、肝心な部分には霧がかかったように何も思い出せなかった。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「覚えていないのも無理はない。だが、あいつがお前の力を知っていたことは確かだ」"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私の……力？」"
  },
  {
    "scene": "アジト寝室",
    "text": "アカネさんは、私の手を見る。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「あの研究所で、お前の身体に起きたことだ」"
  },
  {
    "scene": "アジト寝室",
    "text": "コアへ流れ込んだ異能。黒騎士やルキの力を取り込み、暴走しかけた感覚。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「お前の歌は、ただ相手の身体能力を高めるだけじゃない。他者の異能に干渉できる。力を引き出し、時には吸収することもできる力だ」"
  },
  {
    "scene": "アジト寝室",
    "text": "自分でも知らなかった、自分の中に眠る力。その事実に、胸の奥がざわつく。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「じゃあ……あの時、私が自我を失いそうになったのは…」"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「分からない」"
  },
  {
    "scene": "アジト寝室",
    "text": "アカネさんは静かに遮った。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「だが、普通の異能じゃないことだけは確かだ。だから、あいつらはお前を知っていた」"
  },
  {
    "scene": "アジト寝室",
    "text": "自分の過去。弟の存在。そして、この身体に隠された力。何も分からないことばかりだった。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……今は考えても答えは出ない」",
    "showIllust": [
      "Akane_neutral"
    ]
  },
  {
    "scene": "アジト寝室",
    "text": "そう言って、アカネさんは立ち上がる。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「身体が戻るまで寝てろ」"
  },
  {
    "scene": "アジト寝室",
    "text": "ぶっきらぼうな言葉だった。けれど、その声には以前にはなかった気遣いが混じっていた。"
  },
  {
    "scene": "アジト寝室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「何があろうと、あいつらがまた現れるなら俺が止める。だから今は……余計なことを考えるな」"
  },
  {
    "scene": "アジト寝室",
    "text": "その言葉を聞いた瞬間、張り詰めていた心が少しだけ緩んだ。"
  },
  {
    "scene": "アジト寝室",
    "text": "私の過去に何が隠されているのか。この力が、一体何なのか。まだ何も分からない。"
  },
  {
    "scene": "アジト寝室",
    "text": "けれど、窓の外で青白く輝く人工月を見つめながら、私は静かに目を閉じた。"
  },
  {
    "action": "FADE_TO_BLACK",
    "duration": 4000,
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "空",
    "bg": "/scene/sky.png",
    "text": "私たちの日常は、驚くほどあっけなく戻ってきた。",
    "bgm": "Normal_Morning2.mp3",
    "action": "FADE_IN"
  },
  {
    "scene": "空",
    "text": "教授の手記とデータチップを持ち帰ったことで実習は無事成功。研究所で起きた事件も、政府の対策によって少しずつ収束へ向かっていた。"
  },
  {
    "action": "FADE_TO_BLACK",
    "duration": 1000,
    "bgm": "stop"
  },
  {
    "scene": "空",
    "bg": "black",
    "text": "──それでも、私の心にはまだ冷たい影が残っていた。",
    "action": "FADE_IN"
  },
  {
    "scene": "空",
    "text": "あの日の研究室でのヒルミ教授のことだ。"
  },
  {
    "scene": "空",
    "text": "脱出ロケットに乗る直前、アカネさんが呟いた「最初から墜落するようにできていた」という言葉。あれは本当にただの推測だったのか。それとも──教授は最初から、私たちを利用していたのか。"
  },
  {
    "scene": "空",
    "text": "疑いたいわけじゃない。\nただ、いつも飄々としていたあの人の笑顔の裏に隠された真実を、私は知りたかった。"
  },
  {
    "scene": "空",
    "text": "けれど、その答えを聞く機会は、もう失われていた。"
  },
  {
    "scene": "事務室",
    "bg": "/scene/university_office.png",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「え……？ 行方不明、ですか？」"
  },
  {
    "scene": "事務室",
    "speaker": "事務員",
    "text": "「そうなのよぉ。ヒルミ教授、あの騒動の直後から連絡が取れなくなってねぇ。研究室の荷物もそのままなの。警察にも届けは出しているんだけど……」"
  },
  {
    "scene": "事務室",
    "text": "事務員の困った声が、どこか遠くで響いているように聞こえた。"
  },
  {
    "scene": "事務室",
    "text": "教授は消えた。すべての謎を残したまま、あの研究所の闇の中へ──。"
  },
  {
    "scene": "面会室",
    "bg": "/scene/DetentionCenter.png",
    "text": "厚いアクリル板の向こう側から、重々しい錠の音が響く。",
    "bgm": "serious_3.mp3"
  },
  {
    "scene": "面会室",
    "text": "グレーの囚人服に身を包み、パイプ椅子に腰掛けていたのは、見慣れたあの巨体だった。全身にはまだ包帯が巻かれているが、剥き出しの片目は相変わらず鋭い光を宿している。",
    "showIllust": [
      "Akane_neutral_syujin3"
    ]
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……毎度毎度どうも」"
  },
  {
    "scene": "面会室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「アカネさん……」"
  },
  {
    "scene": "面会室",
    "text": "アジトで目覚めて数日後、アカネさんは警察に連行された。これまでの行動に対する罪は重かったが、コアを停止させ街を救った功績もあり、極刑だけは免れたらしい。"
  },
  {
    "scene": "面会室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「怪我、もう大丈夫なんですか？その……ちゃんと食事は取れてますか？」"
  },
  {
    "scene": "面会室",
    "text": "心配して尋ねると、アカネさんは呆れたように眉間にしわを寄せた。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……なんで俺が、こんな小娘に飯の心配されなきゃならねぇんだ」",
    "showIllust": [
      "Akane_neutral_syujin"
    ]
  },
  {
    "scene": "面会室",
    "text": "ぶっきらぼうな態度は、あの研究所での時と何も変わらない。そのことに、少しだけ安心してしまう。"
  },
  {
    "scene": "面会室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……アカネさん。教授が…行方不明になってしまって…」"
  },
  {
    "scene": "面会室",
    "text": "私の言葉に、アカネさんは静かに目を伏せた。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「そうか。……逃げられたか」",
    "showIllust": [
      "Akane_neutral_syujin"
    ]
  },
  {
    "scene": "面会室",
    "text": "黒騎士の正体も、あの少年の行方も、まだ何一つ分かっていない。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「まだ終わりそうにはないな」"
  },
  {
    "scene": "面会室",
    "text": "そう呟いた彼の目には、消えることのない復讐の炎が宿っていた。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「娑婆に戻ったら、俺はまたあいつらを追う。それが俺の生きる目的だ」"
  },
  {
    "scene": "面会室",
    "text": "そして、真っ直ぐに私を見る。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「だがな、朔良。お前はもう首を突っ込むな。ここから先は、本物の地獄だ。手に入れた普通の日常を大事に守れ」"
  },
  {
    "scene": "面会室",
    "text": "私は拳を握りしめる。"
  },
  {
    "scene": "面会室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「私の弟のことも、私自身のことも、まだ何も分かっていません」"
  },
  {
    "scene": "面会室",
    "text": "気づけば、アクリル板へ手を伸ばしていた。"
  },
  {
    "scene": "面会室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「ここまで来て終われません。邪魔にはなりませんから……私も連れていってください」"
  },
  {
    "scene": "面会室",
    "text": "アカネさんは、少し驚いたように目を見開いた。けれど、すぐにいつものような呆れた笑みを浮かべる。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「ハッ……人の忠告も聞かねぇのか」",
    "showIllust": [
      "Akane_smile_syujin"
    ]
  },
  {
    "scene": "面会室",
    "text": "そう言って、ゆっくりと立ち上がった。"
  },
  {
    "scene": "面会室",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……まぁいい。そこまで言うなら連れていく。ただし、自分の身は自分で守れるようになれ。俺がいつでも守れるとは限らねぇからな」",
    "bgm": "stop"
  },
  {
    "scene": "面会室",
    "speaker": "刑務官",
    "role": "GUARD",
    "text": "「──面会終了です」",
    "hideIllust": [
      "Akane"
    ]
  },
  {
    "scene": "面会室",
    "text": "刑務官の声が響き、アカネさんは背を向けて歩き出す。"
  },
  {
    "scene": "面会室",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……アカネさんっ！」"
  },
  {
    "scene": "アカネCG",
    "bg": "/character/Akane/Akane_CG2.png",
    "text": "思わず呼び止めると、彼は足を止めた。"
  },
  {
    "scene": "アカネCG",
    "speaker": "朔良",
    "role": "SAKURA",
    "text": "「……ありがとうございます」"
  },
  {
    "scene": "アカネCG",
    "text": "何に対する感謝なのか、自分でも分からない。"
  },
  {
    "scene": "アカネCG",
    "text": "ロケットで助けてくれたこと。研究所で化け物になりかけた私を引き戻してくれたこと。\nそして、これから先も共に進むことを選んでくれたこと。"
  },
  {
    "scene": "アカネCG",
    "text": "きっと、その全部だった。"
  },
  {
    "scene": "アカネCG",
    "text": "しばらくの沈黙の後、彼は背を向けたまま、小さく呟いた。"
  },
  {
    "scene": "アカネCG",
    "speaker": "アカネ",
    "role": "AKANE",
    "text": "「……こちらこそ、ありがとう」"
  },
  {
    "scene": "アカネCG",
    "text": "その言葉だけで、胸の奥が温かくなる。"
  },
  {
    "scene": "面会室",
    "bg": "/scene/DetentionCenter.png",
    "text": "私は、鉄格子の向こうへ消えていく彼の背中を、最後まで見送った。"
  },
  {
    "scene": "空",
    "bg": "/scene/sky.png",
    "text": "拘置所を出た私は、静かに空を見上げる。",
    "bgm": "serious_3.mp3"
  },
  {
    "scene": "空",
    "text": "私の過去。弟のルキ。消えた教授。そして、私自身の正体。待ち受ける未来は、きっと簡単なものではない。"
  },
  {
    "scene": "空",
    "text": "それでも、不思議と恐怖はなかった。"
  },
  {
    "scene": "空",
    "text": "彼が再び戻ってくるその時まで——私は私の日常を生きながら、次の戦いへ向かう覚悟を、静かに固めていく。"
  },
  {
    "scene": "空",
    "text": "アカネルート・ハッピーエンド",
    "action": "FADE_TO_HAPPY_END",
    "style": "cinema"
  },
  {
    "scene": "空",
    "jumpTo": "route_under_construction"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "（今後のアップデートをお楽しみに！ 開発中のミニゲームシステムを体験してみましょう！）",
    "choices": [
      {
        "text": "システムA：サーチ＆ラーニング（自室探索）を体験する",
        "targetLabel": "search_learning_only_trigger"
      },
      {
        "text": "システムB：リミット・タイピング（ハッキング防御）を体験する",
        "targetLabel": "typing_game_only_trigger"
      },
      {
        "text": "システムC：サイレント・スコア（波長リズムゲーム）を体験する",
        "targetLabel": "silent_score_only_trigger"
      },
      {
        "text": "システムD：タップ・コミュニケーション（拠点クリック対話）を体験する",
        "targetLabel": "tap_communication_only_trigger"
      },
      {
        "text": "システムE：アイ・オブ・プロファイラー（FPS風・視点探索）を体験する",
        "targetLabel": "eye_of_profiler_only_trigger"
      },
      {
        "text": "そのままデモを終了する",
        "targetLabel": "route_under_construction_final"
      }
    ],
    "type": "choice",
    "label": "route_under_construction"
  },
  {
    "scene": "ゲームA",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "【システムA：サーチ＆ラーニング】の体験を開始します。部屋のいくつかのポイントを調べてみてください。",
    "bg": "town_dark_1",
    "label": "search_learning_only_trigger"
  },
  {
    "scene": "ゲームA",
    "action": "TRIGGER_SEARCH_AND_LEARNING"
  },
  {
    "scene": "ゲームA",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "探索が完了しました。体験用選択肢に戻ります。",
    "jumpTo": "route_under_construction"
  },
  {
    "scene": "ゲームB",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "【システムB：リミット・タイピング】の体験を開始します。制限時間内にコマンドを正確に入力してください。",
    "bg": "town_dark_1",
    "label": "typing_game_only_trigger"
  },
  {
    "scene": "ゲームB",
    "action": "TRIGGER_TYPING_GAME"
  },
  {
    "scene": "ゲームB",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "ハッキング防御シークエンスを終了しました。体験用選択肢に戻ります。",
    "jumpTo": "route_under_construction"
  },
  {
    "scene": "ゲームC",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "【システムC：サイレント・スコア】の体験を開始します。波長を合わせてノーツを正確に入力してください。",
    "bg": "town_dark_1",
    "label": "silent_score_only_trigger"
  },
  {
    "scene": "ゲームC",
    "action": "TRIGGER_SILENT_SCORE"
  },
  {
    "scene": "ゲームC",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "波長同調シークエンスを終了しました。体験用選択肢に戻ります。",
    "jumpTo": "route_under_construction"
  },
  {
    "scene": "ゲームD",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "【システムD：タップ・コミュニケーション】の体験を開始します。放課後の特別ロビーでメンバーと対話してください。",
    "bg": "town_dark_1",
    "label": "tap_communication_only_trigger"
  },
  {
    "scene": "ゲームD",
    "action": "TRIGGER_TAP_COMMUNICATION"
  },
  {
    "scene": "ゲームD",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "拠点タップ・コミュニケーションを終了しました。体験用選択肢に戻ります。",
    "jumpTo": "route_under_construction"
  },
  {
    "scene": "ゲームE",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "【システムE：アイ・オブ・プロファイラー】の体験を開始します。暗視スコープを使い、制限時間内に4つの不審な影をエイム・スキャンしてください。",
    "bg": "town_dark_1",
    "label": "eye_of_profiler_only_trigger"
  },
  {
    "scene": "ゲームE",
    "action": "TRIGGER_EYE_OF_PROFILER"
  },
  {
    "scene": "ゲームE",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "拠点タップ・コミュニケーションを終了しました。体験用選択肢に戻ります。",
    "jumpTo": "route_under_construction"
  },
  {
    "scene": "崩壊後-大学の敷地内",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "（今後のアップデートをお楽しみに！）",
    "label": "route_under_construction_final"
  },
  {
    "action": "FADE_TO_DEMO_END"
  },
  {
    "scene": "ゲームF",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "【システムF：フラグメント・コレクト】の体験を開始します。研究所内を探索し、セキュリティコードの断片（データチップ×5）と睦典の機密ファイル（×4）を収集してください。",
    "bg": "town_dark_1",
    "label": "fragment_collect_only_trigger"
  },
  {
    "scene": "ゲームF",
    "action": "TRIGGER_FRAGMENT_COLLECT",
    "bgm": "Lab.mp3"
  },
  {
    "scene": "ゲームF",
    "speaker": "システム",
    "role": "SYSTEM",
    "text": "フラグメント・コレクトを終了しました。体験用選択肢に戻ります。",
    "jumpTo": "route_under_construction"
  }
];
