export const shop = {
  home: {
    name: {
      ko:"집",
      en:"Home",
      jp:"家"
    },
    greeting: {
      ko:"냐옹~ 여기는 당신의 집이에요. 무엇을 도와드릴까요?",
      en:"Meow~ This is your house. What can I help you with?",
      jp:"にゃ〜お。ここはあなたの家ですよ。何かお困りですか？"
    },
    menu: [
      {idx: 0, text: 'home_text0'},
      {idx: 1, text: 'home_text1'},
      {idx: 2, text: 'getOut'}
    ]
  },
  equipment: {
    name: {
      ko:"장비상점",
      en:"Equipment Shop",
      jp:"装備ショップ"
    },
    greeting: {
      ko:"어흥~! 어서오쇼. 장비상점에 오신걸 환영합니다. 슬슬 둘러보다 가쇼.",
      en:"Roar~! Welcome to the equipment shop. Take your time looking around.",
      jp:"ガオーッ！ようこそ、装備ショップへ。ゆっくり見ていってください。",
    },
    menu: [
      {idx: 0, text: 'equipment_text0'},
      {idx: 1, text: 'equipment_text1'},
      {idx: 2, text: 'equipment_text2'},
      {idx: 3, text: 'sell_item'},
      {idx: 4, text: 'getOut'}
    ],
  },
  tool: {
    name: {
      ko:"도구상점",
      en:"Tool Shop",
      jp:"道具屋"
    },
    greeting: {
      ko:"찍찍! 어서오세요. 물건을 사러 오셨나요? 도구상점엔 모든게 있답니다.",
      en:"Squeak! Welcome. Are you here to buy something? The tool shop has everything.",
      jp:"チクチク！ようこそ。何かお探しですか？ ドクドクショップには何でも揃っています。",
    },
    menu: [
      {idx: 0, text: 'tool_text0'},
      {idx: 1, text: 'tool_text1'},
      {idx: 3, text: 'sell_item'},
      {idx: 4, text: 'getOut'}
    ]
  },
  accessory: {
    name: {
      ko:"장신구 상점",
      en:"Accessory Shop",
      jp:"アクセサリーショップ"
    },
    greeting: {
      ko:"장신구 상점에 오신걸 환영합니다. 흠흠.. 마음에 드는게 있으신가요?",
      en:"Welcome to the Accessory Shop. Hmm.. Do you see anything you like?",
      jp:"アクセサリーショップへようこそ。ふむふむ…お気に入りのものは見つかりましたか？"
    },
    menu: [
      {idx: 0, text: 'accessory_text0'},
      {idx: 1, text: 'accessory_text1'},
      {idx: 2, text: 'sell_item'},
      {idx: 3, text: 'getOut'}
    ]
  },
  tradingPost: {
    name: {
      ko:"교역소",
      en:"Trading Post",
      jp:"交易所"
    },
    greeting: {
      ko:"여긴 교역소입니다. 꿀꿀~ 물건을 사고 파실 수 있습니다.",
      en:"Welcome to the Trading Post. Oink Oink~ You can buy and sell items here.",
      jp:"ここは交易所です。ブーブー〜アイテムの売買ができます。"
    },
    menu: [
      {idx: 0, text: 'tradingPost_text0'},
      {idx: 1, text: 'sell_item'},
      {idx: 2, text: 'getOut'}
    ]
  },
  composite: {
    name: {
      ko:"실험실",
      en:"Composite Shop",
      jp:"研究所"
    },
    greeting: {
      ko:"여긴 실험실입니다. 헝!헝! 물건을 합성 할 수 있습니다.",
      en:"Welcome to the Composite Shop. Hah! Hah! You can composite items here.",
      jp:"ここは研究所です。ハッ！ハッ！アイテムを合成することができます。"
    },
    menu: [
      {idx: 0, text: 'composite_text0'},
      {idx: 1, text: 'getOut'}
    ]
  },
  training: {
    name: {
      ko:"훈련소",
      en:"Training Center",
      jp:"訓練所"
    },
    greeting: {
      ko:"으르렁~! 훈련을 받을 준비는 되었나? 당장 시작하자구.",
      en:"Grrr~! Are you ready to train? Let's start right away.",
      jp:"ガオーッ！訓練を受ける準備はできたか？ すぐに始めよう。"
    },
    menu: [
      {idx: 0, text: 'training_text0'},
      {idx: 1, text: 'training_text1'},
      {idx: 2, text: 'training_text2'},
      {idx: 3, text: 'getOut'}
    ]
  },
  blacksmith: {
    name: {
      ko:"대장간",
      en:"Blacksmith",
      jp:"鍛冶屋"
    },
    greeting: {
      ko:"대장간에는 무슨일이야? 더 근사한 장비가 필요한가?",
      en:"What brings you to the blacksmith? Do you want your equipment to be stronger?",
      jp:"鍛冶屋には何の用だ？ 装備をさらに強くしたいのか？"
    },
    menu: [
      {idx: 0, text: 'blackMarket_text0'},
      {idx: 1, text: 'blackMarket_text1'},
      {idx: 2, text: 'getOut'}
    ]
  },
  church: {
    name: {
      ko:"교회",
      en:"Church",
      jp:"教会"
    },
    greeting: {
      ko:"참회하십시오. 당신은 구원받을 것입니다.",
      en:"Confess your sins. You will be saved.",
      jp:"罪を告白しなさい。あなたは救われるでしょう。"
    },
    menu: [
      {idx: 0, text: 'church_text0'},
      {idx: 2, text: 'getOut'}
    ]
  },
  temple: {
    name: {
      ko:"사원",
      en:"Temple",
      jp:"寺院"
    },
    greeting: {
      ko:"여긴 사원입니다만 무슨용무로 찾으셨습니까?",
      en:"This is a temple. What brings you here?",
      jp:"ここは寺院ですが、何の用で参られましたか？"
    },
    menu: [
      {idx: 0, text: 'temple_text0'},
      {idx: 2, text: 'getOut'}
    ]
  },
  mystery: {
    name: {
      ko:"비밀상점",
      en:"Mystery Shop",
      jp:"ミステリーショップ"
    },
    greeting: {
      ko:"... 비밀.",
      en:"... Secret.",
      jp:"... 秘密。"
    },
    menu: [
      {idx: 0, text: 'mystery_text0'},
      {idx: 1, text: 'mystery_text1'},
      {idx: 2, text: 'mystery_text2'},
      {idx: 3, text: 'getOut'}
    ]
  },
  tavern: {
    name: {
      ko:"주점",
      en:"Tavern",
      jp:"酒場"
    },
    greeting: {
      ko:"여긴 주점입니다. 헝!헝! 물건을 합성 할 수 있습니다.",
      en:"Welcome to the Tavern. Hah! Hah! You can composite items here.",
      jp:"ここは酒場です。ハッ！ハッ！アイテムを合成することができます。"
    },
    menu: [
      {idx: 0, text: 'tavern_text0'},
      {idx: 1, text: 'getOut'}
    ]
  },
  shipyard: {
    name: {
      ko:"조선소",
      en:"Shipyard",
      jp:"造船所"
    },
    greeting: {
      ko:"배가 필요합니까? 단숨에 만들어 드리죠.",
      en:"Need a ship? I'll make one for you in no time.",
      jp:"船が必要ですか？ すぐに作って差し上げましょう。"
    },
    menu: [
      {idx: 0, text: 'shipyard_text0'},
      {idx: 1, text: 'getOut'}
    ]
  },
  port: {
    name: {
      ko:"항구",
      en:"Port",
      jp:"港"
    },
    greeting: {
      ko:"좋은 여행 되십시오. 다음에 또 뵙겠습니다.",
      en:"Have a great trip. See you next time.",
      jp:"良い旅を。またお会いしましょう。"
    },
    menu: [
      {idx: 0, text: 'port_text0'},
      {idx: 1, text: 'getOut'}
    ]
  },
  townHall: {
    name: {
      ko:"시청",
      en:"Town Hall",
      jp:"市役所"
    },
    greeting: {
      ko:"용무가 없다면 썩 꺼져라.",
      en:"If you don't have any business here, get lost.",
      jp:"用がないなら、さっさと消え失せろ。"
    },
    menu: [
      {idx: 0, text: 'townHall_text0'},
      {idx: 1, text: 'getOut'}
    ]
  },
  guild: {
    name: {
      ko:"길드",
      en:"Guild",
      jp:"ギルド"
    },
    greeting: {
      ko:"길드 사무실에 오신것을 환영합니다.",
      en:"Welcome to the Guild Office.",
      jp:"ギルド事務所へようこそ。"
    },
    menu: [
      {idx: 0, text: 'guild_text0'},
      {idx: 1, text: 'getOut'}
    ]
  }
}