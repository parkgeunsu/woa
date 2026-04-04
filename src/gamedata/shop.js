export const shop = {
  home: {
    name: {
      ko:"집",
      en:"Home",
      jp:"家"
    },
    greeting: {
      ko: "어서 오십시오, 주인님. 고양이 집사가 정성껏 맞이하겠습니다.",
      en: "Welcome, my master. Your feline butler is at your service.",
      jp: "いらっしゃいませ、ご主人様。猫執事が心を込めてお迎えいたします。"
    },
    menu: [
      {idx: 0, text: 'home_text0'},
      {idx: 1, text: 'home_text1'},
      {idx: 2, text: 'home_text2'},
      {idx: 3, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "오늘 기분은 어떠신가요? 필요한 것이 있다면 언제든 말씀만 하세요.",
        en: "How are you feeling today? If you need anything, just let me know.",
        jp: "本日のご気分はいかがでしょうか？必要なものがあれば何でもお申し付けください。"
      },
      {
        ko: "모든 준비는 끝났습니다. 주인님이 편히 지내시도록 제가 돌보겠습니다.",
        en: "Everything is prepared. I will ensure your comfort in every way.",
        jp: "すべての準備は整っております。ご主人様が快適に過ごせるようお世話いたします。"
      },
      {
        ko: "주인님을 위해 차를 준비해두었습니다. 따뜻할 때 드시지요.",
        en: "I’ve prepared tea for you, my master. Please enjoy it while it's warm.",
        jp: "ご主人様のためにお茶をご用意しました。温かいうちにお召し上がりください。"
      }
    ]
  },
  equipment: {
    name: {
      ko:"장비상점",
      en:"Equipment Shop",
      jp:"装備ショップ"
    },
    greeting: {
      ko: "장비 상점에 온 걸 환영한다! 사자의 눈으로 너에게 맞는 장비를 골라주지.",
      en: "Welcome to the equipment shop! With a lion’s eye, I’ll find the gear that suits you.",
      jp: "装備屋へようこそ！ライオンの眼で君に合う装備を選んでやろう。"
    },
    menu: [
      {idx: 0, text: 'equipment_text0'},
      {idx: 1, text: 'equipment_text1'},
      {idx: 2, text: 'equipment_text2'},
      {idx: 3, text: 'sell_item'},
      {idx: 4, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "강해지고 싶다면 제대로 왔다. 좋은 장비는 용맹함을 더해주지.",
        en: "If you wish to grow stronger, you’ve come to the right place. Good gear adds courage.",
        jp: "強くなりたいならここで正解だ。良い装備は勇気を与えてくれる。"
      },
      {
        ko: "오늘은 특히 강력한 장비가 많이 들어왔다. 네 실력에 걸맞는 걸 골라보지.",
        en: "We received some especially powerful gear today. Choose something worthy of your skills.",
        jp: "今日は特に強力な装備が入荷したぞ。君の腕にふさわしい物を選ぶといい。"
      },
      {
        ko: "필요한 게 있다면 말해라. 사자는 동료의 힘을 아끼지 않는다.",
        en: "If you need anything, just tell me. A lion never holds back when helping allies.",
        jp: "必要なものがあれば言いなさい。仲間を助ける時、ライオンは力を惜しまない。"
      }
    ]
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
    ],
    randomText: [
      {
        ko:"도구 상점에 온 걸 환영한다 찍찍! 음, 마음에 드는 물건은 있어?", 
        en:"Welcome to my tool shop, squeak! See anything you like?", 
        jp:"道具屋へようこそチュー！気に入ったものはあるかい？"
      },
      {
        ko:"내가 고른 물건들은 전부 최고 품질이야. 믿고 써도 된다구!", 
        en:"Everything here is top quality. You can trust my selection!", 
        jp:"ここにある道具は全部一級品だよ。安心して使っておくれ！"
      },
      {
        ko:"가격이 궁금하면 언제든지 물어봐! 쥐 사장님이 친절히 알려줄게!", 
        en:"If you’re curious about the price, just ask! I’ll explain everything!", 
        jp:"値段が気になるなら遠慮なく聞いてね！ちゃんと説明するよ！"
      },
      {
        ko:"오늘만 특별한 도구가 들어왔어. 놓치지 않는 게 좋을걸?", 
        en:"A special item came in today. You won’t want to miss it!", 
        jp:"今日は特別な道具が入荷したんだ。見逃さない方がいいよ！"
      }
    ]
  },
  accessory: {
    name: {
      ko:"장신구 상점",
      en:"Accessory Shop",
      jp:"アクセサリーショップ"
    },
    greeting: {
      ko: "장신구 상점에 오신 걸 환영해요! 반짝반짝 예쁜 것들만 모아뒀답니다, 토끼♪",
      en: "Welcome to the accessory shop! I’ve gathered only the prettiest, sparkliest items, hop♪",
      jp: "アクセサリー屋へようこそ！きらきら可愛いものだけ集めたよ、ぴょん♪"
    },
    menu: [
      {idx: 0, text: 'accessory_text0'},
      {idx: 1, text: 'accessory_text1'},
      {idx: 2, text: 'sell_item'},
      {idx: 3, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "음~ 손님께 딱 어울릴 장신구가 있을 것 같은데요. 한번 둘러보세요!",
        en: "Hmm~ I think I have an accessory that suits you perfectly. Take a look around!",
        jp: "うーん、お客さんにぴったりのアクセサリーがありそうだよ。ゆっくり見ていってね！"
      },
      {
        ko: "오늘은 특별히 인기 상품도 재입고했어요! 놓치지 마세요, 토끼!",
        en: "I restocked some popular items today! Don’t miss them, hop!",
        jp: "今日は特に人気のアクセサリーを再入荷したよ！見逃さないでね、ぴょん！"
      },
      {
        ko: "혹시 코디가 고민되시면 말씀해 주세요! 토끼가 살짝 추천해드릴게요.",
        en: "If you’re unsure how to coordinate your outfit, just ask! I can give you a cute recommendation.",
        jp: "コーデに迷ったら声をかけてね！うさぎのボクが可愛くおすすめするよ。"
      }
    ]

  },
  tradingPost: {
    name: {
      ko:"교역소",
      en:"Trading Post",
      jp:"交易所"
    },
    greeting: {
      ko: "교역소에 온 걸 환영해 꿀꿀! 네가 가져온 물건, 한번 살펴볼까 꿀꿀?",
      en: "Welcome to the trading post! Let's take a look at what you've brought, oink.",
      jp: "交易所へようこそブー！持ってきた品を見せてもらおうかブー。"
    },
    menu: [
      {idx: 0, text: 'tradingPost_text0'},
      {idx: 1, text: 'sell_item'},
      {idx: 2, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "흠, 뭔가 교환할 게 있나? 좋은 물건이라면 내가 꽤 쳐줄 수도 있지.",
        en: "Hmm, got something to trade? If it’s good quality, I might give you a nice deal.",
        jp: "ふむ、交換したい物はあるかブー？いい品なら高く買ってやるブー。"
      },
      {
        ko: "오늘은 먼 곳에서 특별한 물건이 들어왔지! 관심 있나 꿀?",
        en: "A special item came from far away today! Interested, oink?",
        jp: "今日は遠い国から特別な品が入荷したブー！興味あるかブー？"
      },
      {
        ko: "가격이 궁금하면 편하게 물어봐! 돼지 사장이 정직하게 알려주지.",
        en: "If you're curious about the price, feel free to ask! I’ll give you an honest answer.",
        jp: "値段が気になるなら気軽に聞くブー！正直に教えてあげるブー。"
      }
    ]
  },
  composite: {
    name: {
      ko:"연금술 상점",
      en:"Alchemy Shop",
      jp:"錬金術のお店"
    },
    greeting: {
      ko: "연금술 상점에 오신 걸 환영해요~! 오늘도 버블버블한 실험이 가득해요, 뿌우!",
      en: "Welcome to the alchemy shop! Lots of bubbly experiments are brewing today, awooo!",
      jp: "錬金術のお店へようこそ〜！今日もぷくぷくの実験がいっぱいだよ、ぷぅ〜！"
    },
    menu: [
      {idx: 0, text: 'composite_text0'},
      {idx: 1, text: 'composite_text1'},
      {idx: 2, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "혹시 필요한 물약 있어요? 회복약부터 강화 비약까지 다 만들 수 있다구요!",
        en: "Looking for a potion? I can brew anything—from healing tonics to powerful elixirs!",
        jp: "何か欲しいポーションはある？回復薬から強化エリクサーまで何でも作れるよ！"
      },
      {
        ko: "재료만 가져오면 특별한 비밀 레시피도 만들어 드릴게요! 물개 보증입니다!",
        en: "Bring me the materials and I’ll craft even secret recipes! Seal-certified quality!",
        jp: "材料を持ってきてくれたら特別な秘伝レシピも作ってあげるよ！アザラシ保証付き！"
      },
      {
        ko: "조금 위험한 향이 나도 걱정 마세요~ 성공률은… 음, 꽤 높답니다! 아마도?",
        en: "If it smells a bit dangerous, don’t worry~ The success rate is… pretty high! Probably!",
        jp: "ちょっと危ない匂いがしても心配しないでね〜成功率は…まあまあ高いよ！たぶん？"
      }
    ]
  },
  training: {
    name: {
      ko:"훈련소",
      en:"Training Center",
      jp:"訓練所"
    },
    greeting: {
      ko: "훈련소에 온 걸 환영하지. 몸을 단련할 준비가 되었나, 그르르…",
      en: "Welcome to the training grounds. Ready to sharpen your body and mind? Grrr…",
      jp: "訓練場へようこそ。鍛える準備はできているか…グルル。"
    },
    menu: [
      {idx: 0, text: 'training_text0'},
      {idx: 1, text: 'training_text1'},
      {idx: 2, text: 'training_text2'},
      {idx: 3, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "한계는 스스로 정하는 법이 아니다. 내가 끌어올려 주겠다.",
        en: "Limits aren’t decided by yourself. I’ll push you beyond them.",
        jp: "限界は自分で決めるものじゃない。俺がその先へ引き上げてやる。"
      },
      {
        ko: "오늘의 훈련은 조금 거칠 수도 있다. 하지만 그만큼 효과는 확실하지.",
        en: "Today's training might be tough, but the results are guaranteed.",
        jp: "今日の訓練は少し厳しいぞ。でもその分、効果は確実だ。"
      },
      {
        ko: "준비가 됐다면 말해라. 언제든 바로 시작해줄 테니.",
        en: "Tell me when you're ready. We can start anytime.",
        jp: "準備ができたら言え。いつでも始めてやる。"
      }
    ]
  },
  blacksmith: {
    name: {
      ko:"대장간",
      en:"Blacksmith",
      jp:"鍛冶屋"
    },
    greeting: {
      ko: "대장간에 온 걸 환영한다! 뜨거운 쇳물처럼 열정적인 하루가 되길 바란다, 으흠.",
      en: "Welcome to the forge! May your day burn as bright as molten steel. Hrmm.",
      jp: "鍛冶屋へようこそ！溶けた鋼のように熱い一日になるよう願っているぞ、ふむ。"
    },
    menu: [
      {idx: 0, text: 'blacksmith_text0'},
      {idx: 1, text: 'blacksmith_text1'},
      {idx: 2, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "오랜만이군. 새 장비가 필요하면 말해라. 곰 장인이 직접 챙겨주지.",
        en: "Good to see you. If you need new gear, just say the word. I’ll handle it myself.",
        jp: "久しぶりだな。新しい装備が必要なら言え。熊の鍛冶師が直々に用意してやる。"
      },
      {
        ko: "수리가 필요하다고? 맡겨라! 곰의 힘으로 단단하게 고쳐주지.",
        en: "Need repairs? Leave it to me! I'll fix it solid with bear strength.",
        jp: "修理が必要か？任せておけ！熊の力でしっかり直してやる。"
      },
      {
        ko: "오늘은 질 좋은 광석이 들어왔어. 더 강한 장비를 만들 기회지!",
        en: "Some fine ore came in today. Perfect chance to craft stronger gear!",
        jp: "今日は良質な鉱石が入荷したぞ。もっと強い装備を作る絶好の機会だな！"
      },
      {
        ko: "강화를 원하면 말해! 단단한 건 곰이 제일 잘 아니까.",
        en: "If you want an upgrade, just say the word! No one knows toughness better than a bear.",
        jp: "強化したいなら言ってくれ！頑丈さなら熊の俺に任せろ。"
      }
    ]

  },
  church: {
    name: {
      ko:"교회",
      en:"Church",
      jp:"教会"
    },
    greeting: {
      ko: "어서 오십시오… 마음이 지친 이들에게 교회는 언제나 열려 있습니다. 천천히 오세요, 후우…",
      en: "Welcome… The church is always open for weary hearts. Take your time, hmm…",
      jp: "ようこそ…疲れた心には、教会はいつでも開かれているよ。ゆっくりおいで…ふぅ…"
    },
    menu: [
      {idx: 0, text: 'church_text0'},
      {idx: 1, text: 'church_text1'},
      {idx: 2, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "기도가 필요하다면 언제든 말씀하세요. 느리지만 깊은 기도로 도와드리겠습니다.",
        en: "If you need a prayer, just tell me. I may be slow, but my prayers run deep.",
        jp: "祈りが必要なら言いなさい。ゆっくりだが、深い祈りで助けよう。"
      },
      {
        ko: "오늘도 평온한 하루가 되길… 서두를 필요는 없습니다. 한 걸음씩이면 충분하지요.",
        en: "May your day be peaceful… There is no need to rush. One step at a time is enough.",
        jp: "今日も平和な一日でありますように…急ぐ必要はないよ。一歩ずつで十分さ。"
      },
      {
        ko: "상처 받은 마음이라면 이곳에서 쉬어도 됩니다. 천천히 숨을 고르세요.",
        en: "If your heart is wounded, you may rest here. Breathe slowly and gently.",
        jp: "心が傷ついているなら、ここで休んでいくといい。ゆっくり…息を整えてね。"
      }
    ]

  },
  temple: {
    name: {
      ko:"사원",
      en:"Temple",
      jp:"寺院"
    },
    greeting: {
      ko: "절에 오신 걸 환영하오… 마음을 비우고 한 걸음 들여놓아 보시겠습니까, 음…",
      en: "Welcome to the temple… Empty your mind and take a gentle step within, hmm…",
      jp: "寺へようこそ…心を空にして、そっと一歩踏み入れてみませんか…ふむ。"
    },
    menu: [
      {idx: 0, text: 'temple_text0'},
      {idx: 1, text: 'temple_text1'},
      {idx: 2, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "평온을 찾고자 한다면 언제든 이곳을 찾으시오. 기린 스님이 도와드리겠소.",
        en: "If you seek tranquility, come here anytime. I, the giraffe monk, will guide you.",
        jp: "安らぎを求めるなら、いつでもここへ来なさい。キリンの僧が導こう。"
      },
      {
        ko: "높은 곳에서 바라보면 마음도 조금은 가벼워진다오. 답답하다면 제게 말씀해보시지요.",
        en: "From a higher view, the heart often feels lighter. If you’re troubled, you may speak to me.",
        jp: "高いところから眺めると、心も少し軽くなるものです。悩みがあれば話してごらん。"
      },
      {
        ko: "욕심을 내려놓는 법은 어렵지 않소. 천천히, 아주 천천히 익혀가면 됩니다.",
        en: "Letting go of desire isn’t difficult. Slowly… very slowly, you will learn.",
        jp: "欲を手放すのは難しくないよ。ゆっくり…本当にゆっくり学べばいい。"
      },
      {
        ko: "마음이 흔들릴 땐 숨을 깊이 들이쉬어 보시오. 기린의 숨처럼 길고 고요하게.",
        en: "When your heart wavers, take a long breath. Long and calm, like a giraffe’s.",
        jp: "心が揺れたときは深く息を吸ってみなさい。キリンの息のように、長く静かに。"
      }
    ]

  },
  mystery: {
    name: {
      ko:"비밀상점",
      en:"Mystery Shop",
      jp:"ミステリーショップ"
    },
    greeting: {
      ko: "…왔군. 여기가 비밀상점이라는 걸 알았다는 건, 네가 그럴 만한 자격이 있다는 뜻이지.",
      en: "…So you found your way here. Knowing about this secret shop means you’re worthy.",
      jp: "…来たか。秘密の店に辿り着いたということは、それだけの資格があるということだ。"
    },
    menu: [
      {idx: 0, text: 'mystery_text0'},
      {idx: 1, text: 'mystery_text1'},
      {idx: 2, text: 'mystery_text2'},
      {idx: 3, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "조용히 해. 여기서 파는 물건은 조금… 특별하거든. 눈치를 챙겨.",
        en: "Keep your voice down. The items here are… special. Stay sharp.",
        jp: "静かにしろ。ここで扱う品は…特別なんだ。気をつけろよ。"
      },
      {
        ko: "오늘만 들어온 희귀 물건이 있다. 관심 있다면… 거래하지.",
        en: "A rare item came in today. If you're interested… we can make a deal.",
        jp: "今日は珍しい品が入った。興味があるなら…取引しようか。"
      },
      {
        ko: "필요한 게 있다면 말해라. 늑대는 거래를 좋아하거든… 특히 조용한 거래를.",
        en: "If you need something, speak up. Wolves enjoy trading… especially discreet trades.",
        jp: "欲しい物があるなら言え。狼は取引が好きでね…静かな取引ならなおさらだ。"
      }
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
    ],
    randomText: [
      {
        ko: "크흥! 조선소에 잘 왔구리! 배가 필요하다면 뭐든 맡겨보구리!",
        en: "Ribbit! Welcome to the shipyard! If you need a vessel, leave it to me!",
        jp: "ゲコッ！造船所へようこそだケロ！船が必要なら何でも任せるケロ！"
      },
      {
        ko: "오늘은 풍랑에도 끄떡없는 튼튼한 선체가 들어왔구리!",
        en: "Today, a hull strong enough to resist any storm just arrived!",
        jp: "今日はどんな嵐にも負けない頑丈な船体が入荷したケロ！"
      },
      {
        ko: "수리가 필요하면 말하구리! 개구리 장인이 확실하게 고쳐주지!",
        en: "Need repairs? Tell me! This frog craftsman will fix it perfectly!",
        jp: "修理が必要なら言うケロ！カエル職人の私が完璧に直すケロ！"
      },
      {
        ko: "바다로 떠날 준비가 되었는가구리? 언제든 배를 띄워주지!",
        en: "Ready to set sail? I can launch your ship anytime!",
        jp: "海へ出る準備はできてるケロ？いつでも船を出してあげるケロ！"
      }
    ]

  },
  port: {
    name: {
      ko:"항구",
      en:"Port",
      jp:"港"
    },
    greeting: {
      ko: "멈춰. 항구 구역은 위험하다. 허가받은 자만 들어올 수 있다, 크아악.",
      en: "Stop. The harbor area is dangerous. Only those with permission may enter, hisss.",
      jp: "止まれ。港は危険だ。許可のある者だけが入れる、グワァッ。"
    },
    menu: [
      {idx: 0, text: 'port_text0'},
      {idx: 1, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "수상한 짐을 싣고 있다면 바로 말해라. 악어 지킴이는 다 보고 있다.",
        en: "If you're carrying anything suspicious, say it now. The crocodile warden sees everything.",
        jp: "怪しい荷物を積んでいるなら今言え。港のワニ番はすべて見ているぞ。"
      },
      {
        ko: "오늘은 파도가 거칠다. 배를 띄우려면 각오해야 할 거다.",
        en: "The waves are rough today. If you plan to set sail, be prepared.",
        jp: "今日は波が荒いぞ。出航するなら覚悟しておけ。"
      },
      {
        ko: "문제가 생기면 나를 찾아라. 이 항구는 내가 지킨다.",
        en: "If any trouble comes up, find me. I protect this harbor.",
        jp: "問題が起きたら俺を呼べ。この港は俺が守っている。"
      },
      {
        ko: "여긴 위험한 곳이다. 조심해서 다니도록 해라.",
        en: "This area can be dangerous. Move carefully.",
        jp: "ここは危険な場所だ。気をつけて進め。"
      }
    ]

  },
  townHall: {
    name: {
      ko:"시청",
      en:"Town Hall",
      jp:"市役所"
    },
    greeting: 
    {
      ko: "시청에 잘 왔다. 바쁜 중에도 이곳을 찾아온 것을 환영하지.",
      en: "Welcome to City Hall. I appreciate you coming here despite your busy schedule.",
      jp: "市庁舎へようこそ。忙しい中ここまで来てくれたことを歓迎する。"
    },
    menu: [
      {idx: 0, text: 'townHall_text0'},
      {idx: 1, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "시청에 잘 왔다. 바쁜 일정 속에서도 여기까지 온 걸 높이 평가하지.",
        en: "Welcome to City Hall. I appreciate that you made time to come despite your busy schedule.",
        jp: "市庁舎へようこそ。忙しい中ここまで来たことを高く評価しよう。"
      },
      {
        ko: "도시의 문제라면 무엇이든 말하게. 독수리의 눈으로 정확히 판단해주지.",
        en: "If it concerns the city, speak freely. I’ll assess it precisely with an eagle’s eye.",
        jp: "街に関わることなら何でも言いなさい。鷲の目で正確に見極めてやろう。"
      },
      {
        ko: "오늘도 보고서가 산더미군… 하지만 도시를 위해서라면 기꺼이 처리하지.",
        en: "Another mountain of reports today… but for the sake of this city, I’ll handle them gladly.",
        jp: "今日も報告書の山だ…だが街のためなら喜んで片付けよう。"
      },
      {
        ko: "협조가 필요하면 언제든 찾아오게. 시청 간부로서 도울 준비가 되어 있다.",
        en: "If you need assistance, come anytime. As an official, I’m prepared to help.",
        jp: "助けが必要ならいつでも来なさい。市庁の幹部として手を貸す準備はできている。"
      },
    ]

  },
  guild: {
    name: {
      ko:"길드",
      en:"Guild",
      jp:"ギルド"
    },
    greeting: {
      ko: "길드에 온 걸 환영한다. 네 실력을 다시 한번 보여줄 준비가 되었나, 아우우…",
      en: "Welcome to the guild. Are you ready to show your skills once more? Awooo…",
      jp: "ギルドへようこそ。もう一度腕前を見せる準備はできているか…アオォン。"
    },
    menu: [
      {idx: 0, text: 'guild_text0'},
      {idx: 1, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "길드에 온 걸 환영한다. 너의 실력을 보여줄 준비는 되었나, 아우우…",
        en: "Welcome to the guild. Are you ready to show me your skills? Awooo…",
        jp: "ギルドへようこそ。腕前を見せる準備はできているか…アオォン。"
      },
      {
        ko: "의뢰를 받고 싶다면 말해라. 늑대 길드마스터가 직접 선정해주지.",
        en: "If you want a quest, just say the word. I’ll choose one myself.",
        jp: "依頼を受けたいなら言え。ギルドマスターの俺が選んでやろう。"
      },
      {
        ko: "길드의 명예는 가볍지 않다. 맡은 일을 끝까지 완수해라.",
        en: "The guild’s honor isn’t something taken lightly. Finish every mission you take.",
        jp: "ギルドの名誉は軽くない。受けた任務は最後まで果たせ。"
      },
      {
        ko: "강해지고 싶다면 언제든 찾아와라. 늑대는 강한 동료를 환영한다.",
        en: "If you seek strength, come anytime. A wolf always welcomes strong allies.",
        jp: "強さを求めるならいつでも来い。狼は強い仲間を歓迎する。"
      },
      {
        ko: "왔군. 오늘도 새로운 임무가 널 기다리고 있다.",
        en: "You’ve arrived. A new mission awaits you today.",
        jp: "来たな。今日も新しい任務がお前を待っている。"
      },
      {
        ko: "길드의 문은 늘 열려 있다. 하지만 강한 자만이 그 안으로 걸어들어올 수 있지.",
        en: "The guild’s doors are always open, but only the strong can walk through them.",
        jp: "ギルドの扉は常に開いている。だが、踏み入れるのは強者だけだ。"
      },
      {
        ko: "준비가 됐다면 말해라. 늑대 길드마스터가 힘이 되어주지.",
        en: "If you’re ready, speak up. The wolf guild master will support you.",
        jp: "準備ができたなら言え。狼のギルドマスターが力になってやる。"
      }
    ]
  },
  tavern: {
    name: {
      ko:"주점",
      en:"Tavern",
      jp:"酒場"
    },
    greeting: {
      ko: "어서 오세요~ 여행자님! 편하게 쉬어가세요. 따뜻한 술 한 잔 준비해드릴게요.",
      en: "Welcome, traveler! Make yourself comfortable. I’ll prepare a warm drink for you.",
      jp: "いらっしゃいませ、旅人さん！ゆっくりしていってね。温かい一杯を用意するよ。"
    },
    menu: [
      {idx: 0, text: 'tavern_text0'},
      {idx: 1, text: 'getOut'}
    ],
    randomText: [
      {
        ko: "주점에 온 걸 환영해요~ 편하게 앉으세요. 따뜻한 한 잔 준비해드릴게요.",
        en: "Welcome to the tavern~ Have a seat. I’ll get you a warm drink.",
        jp: "酒場へようこそ〜。ゆっくり座ってね。温かい一杯を用意するよ。"
      },
      {
        ko: "오늘은 향 좋은 술이 들어왔어요. 한 번 맛보고 가시겠어요?",
        en: "We got a wonderfully aromatic drink today. Care to try it?",
        jp: "今日は香りのいいお酒が入ったよ。試してみないかい？"
      },
      {
        ko: "여기는 여행자들이 쉬어가는 곳이죠. 고민이 있다면 술과 함께 털어놓아요.",
        en: "This is where travelers rest. If something’s on your mind, share it over a drink.",
        jp: "ここは旅人が休む場所さ。悩みがあるなら一杯飲みながら話してごらん。"
      },
      {
        ko: "밤이 길어질 것 같다면 말해주세요. 사슴 주인이 분위기 좋은 술을 추천해드릴게요.",
        en: "If you think it’ll be a long night, let me know. I’ll recommend something special.",
        jp: "今夜が長くなりそうなら言ってね。雰囲気に合うお酒をおすすめするよ。"
      }
    ]
  },
}