//직업스킬
export const job = [
  //군주
  {idx:0,
    na:{
      ko:'군주',
      en:'Lords',
      jp:'君主',
    },
    txt:{
      ko:'한 나라를 통히하는 리더입니다.',
      en:'He is a leader who leads a country.',
      jp:'一国を通じるリーダーです。',
    },
    skill:{//단검,검,양손검,둔기,창,도끼,활,타격,방패,
      type:'random',
      initialCounts:3,
      basic:[],
      lv0:[], //45%
      lv1:[15,20,22], //40%
      lv2:[], //15%
      lv3:[9,10], //10%
      maxLv:[0,1,2,9,10,15,20,22],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-1', '1-0-0-4', '1-0-0-6',
        '2-0-0-6', '2-0-0-8', '2-0-0-10',
        '3-0-1', '3-0-5', '3-0-8',
        '4-0-0',
        '5-0-0',
      ],
      hole:[],
    }},
  //마법사
  {idx:1,
    na:{
      ko:'마법사',
      en:'Wizards',
      jp:'ウィザード',
    },
    txt:{
      ko:'자연계 속성을 연구하는 학자입니다.',
      en:'A scholar who studies the properties of nature.',
      jp:'自然界の属性を研究する学者です。',
    },
    skill:{//단검,검,한손둔기,보조,
      type:'choose', //물, 불, 바람, 땅
      initialCounts:2,
      basic:[5,6,7,8],
      lv0:[],
      lv1:[15],
      lv2:[],
      lv3:[11,12,13,14],
      maxLv:[0,1,2,11,12,13,14,15],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-0', '1-0-0-2',
        '2-0-0-3', '2-0-0-6',
        '3-0-8', 
      ],
      hole:[],
    }},
  //기사
  {idx:2,
    na:{
      ko:'기사',
      en:'Knight',
      jp:'騎士',
    },
    txt:{
      ko:'중장비를 착용하여 대부분의 공격을 무효화 시킵니다.',
      en:'Wearing heavy equipment nullifies most attacks.',
      jp:'重機を着用してほとんどの攻撃を無効にします。',
    },
    skill:{//검,양손검,둔기,창,도끼,방패,
      type:'choose', //방어스킬, 공격스킬
      initialCounts:2,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[52],
      lv3:[14],
      maxLv:[0,1,2,14],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-6', '1-0-0-7',
        '2-0-0-8', '2-0-0-10', '2-0-0-11',
        '3-0-1', '3-0-2', '3-0-4', '3-0-8',
      ],
      hole:[],
    }},
  //무사
  {idx:3,
    na:{
      ko:'무사',
      en:'Warrior',
      jp:'武士',
    },
    txt:{
      ko:'1:1에 능하고 다양한 무기를 사용합니다.',
      en:'He is good at 1:1 and uses a variety of weapons.',
      jp:'1:1に堪能で様々な武器を使用します。',
    },
    skill:{//단검,검,양손검,한손둔기,창,
      type:'random',
      initialCounts:1,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[17],
      lv3:[12],
      maxLv:[0,1,2,12,17],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-1', '1-0-0-4',
        '2-0-0-5', '2-0-0-6', '2-0-0-9',
        '3-0-1', '3-0-2', '3-0-8',
      ],
      hole:[],
    }},
  //학자
  {idx:4,
    na:{
      ko:'학자',
      en:'Scholar',
      jp:'学者',
    },
    txt:{
      ko:'다양한 분야의 학문을 연구합니다.',
      en:'We study a variety of fields of study.',
      jp:'さまざまな分野の学問を研究します。',
    },
    skill:{//단검,검,타격,방패,보조,
      type:'choose',//전투스킬, 직업스킬
      initialCounts:1,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[15,20,22],
      lv3:[],
      maxLv:[0,1,2,15,20,22],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-0','1-0-0-2',
        '2-0-0-1',
        '3-0-0', '3-0-9',
      ],
      hole:[],
    }},
  //닌자
  {idx:5,
    na:{
      ko:'닌자',
      en:'Ninja',
      jp:'忍者',
    },
    txt:{
      ko:'암살과 정보수집을 위해 훈련된 직업입니다.',
      en:'A profession trained for assassination and intelligence gathering.',
      jp:'暗殺と情報収集のために訓練された職業です。',
    },
    skill:{//단검,검,한손둔기,한손도끼,타격,
      type:'random',
      initialCounts:1,
      basic:[10,],
      lv0:[],
      lv1:[],
      lv2:[],
      lv3:[10],
      maxLv:[0,1,2,10],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-0',
        '2-0-0-2', '2-0-0-4',
        '3-0-0', '3-0-1', '3-0-7',//쌍수
      ],
      hole:[4],
    }},
  //도술사
  {idx:6,
    na:{
      ko:'도술사',
      en:'Shaman',
      jp:'占い師',
    },
    txt:{
      ko:'선/악의 연구를 끊임없이 하는 학자입니다.',
      en:'A scholar who continuously studies good and evil.',
      jp:'善・悪の研究を絶えずする学者です。',
    },
    skill:{//한손둔기,타격,보조,
      type:'choose',//빛, 어둠
      initialCounts:1,
      basic:[3,4],
      lv0:[],
      lv1:[],
      lv2:[20],
      lv3:[9,10],
      maxLv:[0,1,2,9,10,20],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-0', '1-0-0-5',
        '2-0-0-1', '2-0-0-2',
        '3-0-3', '3-0-7', '3-0-9',
        '5-0-0',
      ],
      hole:[],
    }},
  //무희
  {idx:7,
    na:{
      ko:'무희',
      en:'Dancer',
      jp:'踊り子',
    },
    txt:{
      ko:'화려한 언변을 통해 이성의 마음을 사로잡습니다.',
      en:'Captivate the heart of the opposite sex with flowery speech.',
      jp:'華やかな言葉で異性の心を魅了します。',
    },
    skill:{//단검,검,활,타격,보조,
      type:'random',
      initialCounts:1,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[15,22,23],
      lv3:[],
      maxLv:[0,1,2,15,22,23],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-0',
        '2-0-0-0', '2-0-0-1', '2-0-0-2',
        '3-0-0', '3-0-7', '3-0-9',
        '4-0-0',
        '5-0-0',
      ],
      hole:[],
    }},
  //도적
  {idx:8,
    na:{
      ko:'도적',
      en:'Rogue',
      jp:'盗賊',
    },
    txt:{
      ko:'재빠른 손놀림으로 물건을 훔칩니다.',
      en:'TSteal things with quick hands.',
      jp:'素早い手のひらで物を盗む。',
    },
    skill:{//단검,검,한손둔기,활,타격,
      type:'choose',//활, 단검
      initialCounts:1,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[15,22],
      lv3:[],
      maxLv:[0,1,2,15,22],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-1', '1-0-0-2',
        '2-0-0-1', '2-0-0-2', '2-0-0-4',
        '3-0-0', '3-0-3', '3-0-5', '3-0-6',//쌍수
        '4-0-0',
      ],
      hole:[],
    }},
  //궁수
  {idx:9,
    na:{
      ko:'궁수',
      en:'Archer',
      jp:'射手',
    },
    txt:{
      ko:'원거리에서 공격을 할 수 있는 직업입니다.',
      en:'This is a job that can attack from a distance.',
      jp:'遠距離で攻撃ができる職業です。',
    },
    skill:{//단검,검,활,타격,방패,
      type:'random',
      initialCounts:1,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[],
      lv3:[],
      maxLv:[0,1,2],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-1',
        '2-0-0-2', '2-0-0-4', '2-0-0-5',
        '3-0-0', '3-0-6',//쌍수
      ],
      hole:[],
    }},
  //야만인
  {idx:10,
    na:{
      ko:'야만인',
      en:'Barbarian',
      jp:'野蛮人',
    },
    txt:{
      ko:'도시문명 보다는 자연과 어우러져 살아갑니다.',
      en:'We live in harmony with nature rather than in urban civilization.',
      jp:'都市文明よりも自然と調和して生きていきます。',
    },
    skill:{//단검,검,양손검,둔기,창,도끼,활,타격,방패,
      type:'choose',//도끼, 창, 양손검
      initialCounts:1,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[],
      lv3:[],
      maxLv:[0,1,2],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-3', '1-0-0-5',
        '2-0-0-7', '2-0-0-8',
        '3-0-2', '3-0-3', '3-0-5', '3-0-8',
      ],
      hole:[],
    }},
  //상인
  {idx:11,
    na:{
      ko:'상인',
      en:'Merchant',
      jp:'商人',
    },
    txt:{
      ko:'물건을 사고 파는 능력이 월등합니다.',
      en:'The ability to buy and sell things is outstanding.',
      jp:'物を買って売る能力が優れています。',
    },
    skill:{//단검,검,양손검,둔기,도끼,활,타격,방패,
      type:'random',
      initialCounts:3,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[15,17],
      lv3:[],
      maxLv:[0,1,2,15,17],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-2',
        '2-0-0-3', '2-0-0-7',
        '3-0-3', '3-0-7', '3-0-8',
        '4-0-0',
        '5-0-0',
      ],
      hole:[],
    }},
  //한량
  {idx:12,
    na:{
      ko:'한량',
      en:'Scammers',
      jp:'詐欺師',
    },
    txt:{
      ko:'특별한 직업없이 도박과 풍류만을 즐깁니다.',
      en:'He has no particular occupation and only enjoys gambling and pleasure.',
      jp:'特別な仕事なしでギャンブルと風流だけを楽しんでください。',
    },
    skill:{//단검,둔기,창,도끼,타격,
      type:'random',
      initialCounts:2,
      basic:[13],
      lv0:[],
      lv1:[],
      lv2:[15,21],
      lv3:[13],
      maxLv:[0,1,2,13,15,21],
    },
    drop:{
      gold:100,
      equip:[
        '2-0-0-0', '2-0-0-4', 
        '3-0-5', '3-0-7', '3-0-9'//쌍수
      ],
      hole:[],
    }},
  //장군
  {idx:13,
    na:{
      ko:'장군',
      en:'General',
      jp:'将軍',
    },
    txt:{
      ko:'한 부대를 이끄는 리더로서 전쟁의 승패를 결정합니다.',
      en:'As a leader leading a unit, you determine the outcome of the war.',
      jp:'一部隊を率いるリーダーとして戦争の勝敗を決める。',
    },
    skill:{//단검,검,양손검,둔기,창,도끼,활,타격,방패,
      type:'random',
      initialCounts:3,
      basic:[],
      lv0:[],
      lv1:[52],
      lv2:[22],
      lv3:[11],
      maxLv:[0,1,2,11,22],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-3', '1-0-0-4',
        '2-0-0-6', '2-0-0-10',
        '3-0-1', '3-0-2', '3-0-8',
      ],
      hole:[],
    }},
  //농부
  {idx:14,
    na:{
      ko:'농부',
      en:'Farmer',
      jp:'農家',
    },
    txt:{
      ko:'땅에서 식물을 재배하고 체력이 좋습니다.',
      en:'Grow plants on the ground and have good stamina.',
      jp:'地面で植物を栽培し、体力が良いです。',
    },
    skill:{//단검,검,둔기,창,도끼,타격,
      type:'random',
      initialCounts:2,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[17,19],
      lv3:[],
      maxLv:[0,1,2,17,19],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-2', '1-0-0-3',
        '2-0-0-1', '2-0-0-3', '2-0-0-5',
        '3-0-3', '3-0-4', '3-0-5', '3-0-9',
      ],
      hole:[],
    }},
  //의술사
  {idx:15,
    na:{
      ko:'의술사',
      en:'Physician',
      jp:'医術師',
    },
    txt:{
      ko:'치료에 특화된 직업으로 전투시 보조를 담당합니다.',
      en:'A profession specializing in healing, it provides assistance during battle.',
      jp:'治療に特化した職業で戦闘時補助を担当します。',
    },
    skill:{//단검,검,둔기,도끼,보조,
      type:'random',
      initialCounts:2,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[15,22],
      lv3:[],
      maxLv:[0,1,2,15,22],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-0',
        '2-0-0-1', '2-0-0-3',
        '3-0-0', '3-0-9',
      ],
      hole:[],
    }},
  //기술자
  {idx:16,
    na:{
      ko:'기술자',
      en:'Technician',
      jp:'技術者',
    },
    txt:{
      ko:'도구 및 장비에 대한 높은 지식을 바탕으로 생산적인 역할을 담당합니다.',
      en:'Takes on a productive role based on your high level of knowledge of tools and equipment.',
      jp:'ツールと機器の高い知識に基づいて生産的な役割を果たします。',
    },
    skill:{//단검,둔기,도끼,타격,방패,보조,
      type:'random',
      initialCounts:2,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[16,17,18,20,21,23],
      lv3:[],
      maxLv:[0,1,2,16,17,18,20,21,23],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-3', '1-0-0-6',
        '2-0-0-5', '2-0-0-7',
        '3-0-3', '3-0-5', '3-0-8',
      ],
      hole:[],
    }},
  //어부
  {idx:17,
    na:{
      ko:'어부',
      en:'Fisherman',
      jp:'漁師',
    },
    txt:{
      ko:'바다에서 주로 생할을 하는 직업으로 물에 대한 이해도가 높습니다.',
      en:'Since this is a job that mainly involves living in the ocean, they have a high level of understanding of water.',
      jp:'海で主に生きることをする職業で、水に対する理解度が高いです。',
    },
    skill:{//단검,검,둔기,창,도끼,타격,
      type:'random',
      initialCounts:2,
      basic:[],
      lv0:[],
      lv1:[],
      lv2:[17,19],
      lv3:[],
      maxLv:[0,1,2,17,19],
    },
    drop:{
      gold:100,
      equip:[
        '1-0-0-2', '1-0-0-3',
        '2-0-0-1', '2-0-0-3', '2-0-0-5',
        '3-0-3', '3-0-4', '3-0-5', '3-0-9',
      ],
      hole:[],
    }},
]

// * 0군주 - 빛의정령, 어둠의정령
// * 1마법사 - (불의정령, 물의정령, 바람의정령, 땅의정령 중 3가지 종류만 제공) 택1,
// * 2기사 -
// * 3무사 -
// * 4학자 -
// * 5닌자 - 어둠의정령
// * 6도인 - (빛의정령, 어둠의정령) 택1
// * 7무희 - 빛의정령
// * 8도적 -
// * 9궁수 -
// * 10야만용사 -
// * 11상인 -
// * 12한량 -
// * 13장군 -
// * 14농부 -
// * 15의술사 -
// * 16기술자 -

//해적, 항해사, 