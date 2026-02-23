//animal_type 동물타입 0고양이, 1사자, 2호랑이, 3개, 4늑대, 5물개, 6너구리, 7쥐, 8토끼, 9원숭이, 10고릴라, 11캥거루, 12소, 13곰, 14말, 15사슴, 16코뿔소, 17코끼리, 18기린, 19새, 20독수리, 21뱀, 22도마뱀, 23거북이, 24개구리, 25돼지, 26양, 27하마, 28악어, 29하이에나

//element_type 없음(0), 쪼기(1),할퀴기(2),물기(3),치기(4),누르기(5),던지기(6),빛(7),어둠(8),물(9),불(10),바람(11),땅(12)

//state 통솔0(125), 체력1(200), 완력2(200), 민첩3(100), 지력4(200), 정신5(100), 매력6(100)

//job 0군주, 1마법사, 2기사, 3무사, 4학자, 5닌자, 6도술사, 7무희, 8도적, 9궁수, 10야만용사, 11상인, 12한량, 13장군, 14농부, 15의술사, 16기술자, 17어부

//animal_type 0고양이, 1사자, 2호랑이, 3개, 4늑대, 5물개, 6너구리, 7쥐, 8토끼, 9원숭이, 10고릴라, 11캥거루, 12소, 13곰, 14말, 15사슴, 16코뿔소, 17코끼리, 18기린, 19새, 20독수리, 21뱀, 22도마뱀, 23거북이, 24개구리, 25돼지, 26양, 27하마, 28악어, 29하이에나

//region japan0,1,2, korea0,1,2, mongolia0,1,2,3,4, china0,1,2,3,4,5,6,7, saudiArabia0, egypt0, greece0, italy0, france0, spain0, portugal0, unitedKingdom0,1
const randomNum = (start, max) => {
  return Math.floor(Math.random() * (max - start)) + start;
}
const hero = [//face_d 얼굴방향, expType 성장타입, awaken 각성속성, 
  {
    "idx":0,"na1":{
      ko:"유비",
      en:"Liu Bei",
      jp:"劉備"
    },"na2":{
      ko:"현덕",
      en:"Xuan De",
      jp:"玄徳"
    },"na3":{
      ko:"소열황제",
      en:"Emperor Zhaolie",
      jp:"昭烈皇帝"
    },
    "display":20,"style":20,"animal_type":24,"face_d":"center","element":[12],"grade":6,"job":[0,12],"cost":14,
    "st0":88,"st1":160,"st2":148,"st3":73,"st4":146,"st5":88,"st6":100,
    "sk":[{"idx":1}],
    "relation":[1,2,3],
    "txt": {
      ko:`유비(劉備)
생몰년: 161년 - 223년 6월 10일(음력 4월 24일)
열전: 중국 삼국시대 촉한의 초대 황제(재위: 221년 5월 15일(음력 4월 6일) - 223년 6월 10일(음력 4월 24일))이다. 자는 현덕(玄德)이다.아버지를 일찍 여의고 어머니와 돗자리를 짜고 팔아 연명하다가 청년 시절 황건적의 난이 일어났을 때 동리에서 약 500명의 의병을 모집하였다. 황제로 즉위하기 전에는 한나라의 황실 성씨였으므로 유황숙(劉皇叔)이라고도 불렸다.`,
      en:`Liu Bei (劉備)
Dates: 161 – June 10, 223 (Lunar April 24)
Biography: Liu Bei was the founding emperor of the Shu Han state during China's Three Kingdoms period (reigned: May 15, 221 – June 10, 223). His courtesy name was Xuande (玄德). Orphaned at a young age, he supported his mother by weaving straw mats. When the Yellow Turban Rebellion broke out in his youth, he rallied about 500 volunteers from his village. Before becoming emperor, he was known as Liu Huangshu (劉皇叔) because he was a distant relative of the Han imperial family.`,
      jp:`劉備(りゅうび)
生没年: 161年 - 223年6月10日(旧暦4月24日)
列伝: 中国の三国時代に蜀漢の初代皇帝（在位: 221年5月15日(旧暦4月6日) - 223年6月10日(旧暦4月24日)）となった人物。字は玄徳。幼少期に父を亡くし、母とむしろを編んで生計を立てていた。青年期に黄巾の乱が起こると、故郷で約500人の義勇兵を募った。皇帝に即位する前は漢王朝の皇族の血筋であったため、劉皇叔（りゅうこうしゅく）とも呼ばれた。`,
    },
    "region":"china4","period":5,"scenarioRegion":""
  },
  {
    "idx":1,"na1":{
      ko:"조조",
      en:"Cao Cao",
      jp:"曹操"
    },"na2":{
      ko:"맹덕",
      en:"Mengde",
      jp:"孟徳"
    },"na3":{
      ko:"난세영웅",
      en:"Hero of the Turbulent Times",
      jp:"乱世の英雄"
    },
    "display":0,"style":0,"animal_type":0,"face_d":"center","element":[9],"grade":6,"job":[0,13],"cost":15,
    "st0":97,"st1":177,"st2":135,"st3":67,"st4":184,"st5":96,"st6":95,
    "sk":[{"idx":1}],
    "relation":[0,1],
    "txt": {
      ko:`조조(曹魏)
생몰년: 155년 - 220년 음력 1월 23일)
열전: 중국 후한 말기의 정치가이자, 무장이며 시인이다. 자는 맹덕(孟德)이다. 어릴 때 이름은 길리(吉利), 소자(小字)는 아만(阿瞞)이다. 고향은 패국(沛國) 초현(譙縣)이다. 사후 위가 건국된 후 추증된 묘호는 태조(太祖), 시호는 무황제(武皇帝)이다. 위나라의 초대 황제는 조조의 아들 조비지만 실질적으로 위 건국의 기틀을 마련한 것은 조비의 아버지 조조이다. 후한이 그 힘을 잃어가던 시기에 비상하고 탁월한 재능으로 두각을 드러내, 여러 제후를 연달아 격파하고 중국 대륙의 대부분을 통일하여, 위나라가 세워질 수 있는 기틀을 닦았다. 조조는 삼국지의 영웅들 가운데 패자(覇者)로 우뚝 솟은 초세지걸(超世之傑)이라는 평가와 후한을 멸망시킨 난세의 간웅(奸雄)이자 민간인과 포로를 무자비하게 학살한 폭군이라는 상반된 평가를 받는다.`,
      en:`Cao Cao (曹魏)
Dates: 155 – January 23, 220 (Lunar January 23)
Biography: Cao Cao was a Chinese politician, military general, and poet of the late Eastern Han dynasty. His courtesy name was Mengde (孟德). His childhood name was Jili (吉利), and his nickname was Aman (阿瞞). His hometown was Qiao County (譙縣), Pei Commandery (沛國). After his death, when Wei was founded, he was posthumously honored with the temple name Taizu (太祖) and the posthumous title Emperor Wu (武皇帝). Although the first emperor of Wei was Cao Cao's son Cao Pi, Cao Cao laid the foundation for the establishment of Wei. During the period when the Eastern Han dynasty was losing its power, he emerged with extraordinary talent, defeating numerous warlords and unifying most of the Chinese continent, laying the groundwork for the establishment of Wei. Cao Cao is evaluated differently: as a transcendent hero who rose as a hegemon among the heroes of the Three Kingdoms, and as a villain of the turbulent times who destroyed the Eastern Han and a tyrant who ruthlessly massacred civilians and prisoners.`,
      jp:`曹操(そうそう)
生没年: 155年 - 220年1月23日(旧暦1月23日)
列伝: 中国後漢末期の政治家、武将、詩人。字は孟徳。幼名は吉利、小字は阿瞞。出身地は沛国譙県。死後、魏が建国されると、太祖の廟号と武皇帝の諡号が贈られた。魏の初代皇帝は曹操の息子である曹丕だが、実質的に魏建国の基礎を築いたのは曹操である。後漢の力が衰えていく中で、彼は卓越した才能で頭角を現し、数多くの諸侯を撃破して中国大陸の大部分を統一し、魏が建国されるための基盤を固めた。曹操は三国志の英雄たちの中で覇者としてそびえ立つ超世の傑という評価と、後漢を滅亡させた乱世の奸雄であり、民間人と捕虜を無慈悲に虐殺した暴君という相反する評価を受けている。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":2,"na1":{
      ko:"조비",
      en:"Cao Pi",
      jp:"曹丕"
    },"na2":{
      ko:"자환",
      en:"Zihuan",
      jp:"子桓"
    },"na3":{
      ko:"문제아",
      en:"Problem Child",
      jp:"問題児"
    },
    "display":1,"style":1,"animal_type":0,"face_d":"left","element":[9],"grade":4,"job":[0,12],"cost":11,
    "st0":71,"st1":135,"st2":64,"st3":70,"st4":174,"st5":85,"st6":45,
    "sk":[{"idx":1}],
    "relation":[0],
    "txt": {
      ko:`조비(曹丕)
생몰년: 187년 - 226년 6월 29일(음력 5월 17일)
열전: 조위의 초대 황제로, 자는 자환(子桓)이다. 무제와 무선황후의 아들로, 무제가 다진 기반을 이어받고 후한 헌제의 선양을 받아 조위를 건국하였다.`,
      en:`Cao Pi (曹丕)
Dates: 187 – June 29, 226 (Lunar May 17)
Biography: Cao Pi was the first emperor of Cao Wei. His courtesy name was Zihuan (子桓). He was the son of Emperor Wu and Empress Wuxuan. He inherited the foundation laid by Emperor Wu and established Cao Wei after receiving the abdication from Emperor Xian of the Eastern Han.`,
      jp:`曹丕(そうひ)
生没年: 187年 - 226年6月29日(旧暦5月17日)
列伝: 曹魏の初代皇帝。字は子桓。武帝と武宣皇后の息子で、武帝が築いた基盤を受け継ぎ、後漢の献帝から禅譲を受けて曹魏を建国した。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":3,"na1":{
      ko:"조식",
      en:"Cao Zhi",
      jp:"曹植"
    },"na2":{
      ko:"자건",
      en:"Zijian",
      jp:"子建"
    },"na3":{
      ko:"칠보지재",
      en:"Seven-Pace Talent",
      jp:"七歩の才"
    },
    "display":2,"style":2,"animal_type":0,"face_d":"right","element":[7],"grade":2,"job":[4,6],"cost":9,
    "st0":20,"st1":48,"st2":48,"st3":41,"st4":172,"st5":67,"st6":88,
    "sk":[{"idx":1}],
    "relation":[0],
    "txt": {
      ko:`조식(曹植)
생몰년: 192년 ~ 232년 12월 27일(음력 11월 28일[1])
열전: 후한 말기 ~ 조위의 시인이자 제후왕으로, 자는 자건(子建)이며 패국 초현(譙縣) 사람이다. 아버지 조조, 형 조비와 함께 시에 능통하여 삼조라 일컬어졌다.`,
      en:`Cao Zhi (曹植)
Dates: 192 – December 27, 232 (Lunar November 28)
Biography: Cao Zhi was a poet and prince of the late Eastern Han to Cao Wei period. His courtesy name was Z Jian (子建), and he was from Qiao County (譙縣), Pei Commandery. He was skilled in poetry along with his father Cao Cao and older brother Cao Pi, and they were collectively known as the Three Caos.`,
      jp:`曹植(そうしょく)
生没年: 192年 - 232年12月27日(旧暦11月28日)
列伝: 後漢末期から曹魏にかけての詩人であり諸侯王。字は子建で、沛国譙県出身。父の曹操、兄の曹丕と共に詩に長けており、三曹と呼ばれた。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":4,"na1":{
      ko:"조창",
      en:"Cao Zhang",
      jp:"曹彰"
    },"na2":{
      ko:"자문",
      en:"Ziwen",
      jp:"子文"
    },"na3":{
      ko:"황수아",
      en:"Yellow-Haired Child",
      jp:"黄鬚児"
    },
    "display":3,"style":3,"animal_type":0,"face_d":"left","element":[11],"grade":4,"job":[2,10],"cost":12,
    "st0":62,"st1":190,"st2":192,"st3":88,"st4":72,"st5":5,"st6":86,
    "sk":[{"idx":1}],
    "relation":[0],
    "txt": {
      ko:`조창(曹彰)
생몰년: 189년 ~ 223년
열전: 위왕 조조의 넷째 아들로, 무선황후의 소생 중에서 둘째며, 자는 자문(子文)이다. 수염이 금발이라서 사람들이 황수아(黃鬚兒)라 불렀는데 힘이 장사이고 조조의 아들들 중에 무예가 유난히 뛰어났다.`,
      en:`Cao Zhang (曹彰)
Dates: 189 – 223
Biography: Cao Zhang was the fourth son of King Wu of Wei, the second son of Empress Wuxuan, and his courtesy name was Ziwén (子文). His beard was golden, so people called him Huangxū'ér (黃鬚兒). He was strong and exceptionally skilled in martial arts among Cao Cao's sons.`,
      jp:`曹彰(そうしょう)
生没年: 189年 - 223年
列伝: 魏王・曹操の四男で、武宣皇后の第二子。字は子文。金髪の髭を持っていたため、人々から黄鬚児（こうしゅじ）と呼ばれた。怪力の持ち主で、曹操の息子たちの中で武芸が特に優れていた。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":5,"na1":{
      ko:"조충",
      en:"Cao Chong",
      jp:"曹沖"
    },"na2":{
      ko:"창서",
      en:"Cangshu",
      jp:"倉舒"
    },"na3":{
      ko:"영재",
      en:"Prodigy",
      jp:"英才"
    },
    "display":4,"style":4,"animal_type":0,"face_d":"center","element":[11],"grade":2,"job":[4],"cost":5,
    "st0":30,"st1":55,"st2":42,"st3":25,"st4":170,"st5":79,"st6":83,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`조충(曹沖)
생몰년: 196년 ~ 208년
열전: 조조의 여덟째 아들로, 13세의 어린 나이로 일찍 죽었다. 자는 창서(倉舒), 시호는 등애왕(鄧哀王)이다.`,
      en:`Cao Chong (曹沖)
Dates: 196 – 208
Biography: Cao Chong was the eighth son of Cao Cao, who died young at the age of 13. His courtesy name was Cangshu (倉舒), and his posthumous title was King Deng'ai (鄧哀王).`,
      jp:`曹沖(そうちゅう)
生没年: 196年 - 208年
列伝: 曹操の八男で、13歳で早世した。字は倉舒、諡号は鄧哀王。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":6,"na1":{
      ko:"조진",
      en:"Cao Zhen",
      jp:"曹真"
    },"na2":{
      ko:"자단",
      en:"Zidan",
      jp:"子丹"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":5,"style":5,"animal_type":0,"face_d":"right","element":[7],"grade":5,"job":[2,3],"cost":12,
    "st0":77,"st1":173,"st2":160,"st3":81,"st4":124,"st5":66,"st6":81,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`조진(曹眞)
생몰년: ? ~ 231년
열전: 중국 삼국 시대 위나라의 황족이자 장수로 자는 자단(子丹)이다. 조비가 죽을 때 진군, 사마의, 조휴와 함께 고명대신이었으며 제갈량의 북벌을 저지하였다. 공이 높으면서도 덕장이란 평을 받았다. 소설 《삼국지연의》에서는 제gal량에게 연거푸 지고 군공은 사마의가 가져가는 것으로 그렸다.`,
      en:`Cao Zhen (曹眞)
Dates: ? – 231
Biography: Cao Zhen was a member of the imperial clan and a general of the Cao Wei state during the Three Kingdoms period. His courtesy name was Zidan (子丹). When Cao Pi died, he was one of the Grand Regents along with Zhen Jun, Sima Yi, and Cao Xiu, and he repelled Zhuge Liang's Northern Expeditions. He was praised for his high achievements and virtuous character. In the novel "Romance of the Three Kingdoms," he is depicted as repeatedly losing to Zhuge Liang and having his military merits taken by Sima Yi.`,
      jp:`曹眞(そうしん)
生没年: ? - 231年
列伝: 三国時代の魏の皇族であり武将。字は子丹。曹丕が死ぬ際、甄宓、司馬懿、曹休と共に顧命大臣であり、諸葛亮の北伐を阻止した。功績が高く徳将としても評価された。小説『三国志演義』では諸葛亮に連戦連敗し、軍功は司馬懿が持っていくように描かれている。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":7,"na1":{
      ko:"조휴",
      en:"Cao Xiu",
      jp:"曹休"
    },"na2":{
      ko:"문열",
      en:"Wenlie",
      jp:"文烈"
    },"na3":{
      ko:"천리구",
      en:"Thousand-Mile Colt",
      jp:"千里駒"
    },
    "display":6,"style":6,"animal_type":0,"face_d":"left","element":[7],"grade":3,"job":[3,8],"cost":7,
    "st0":72,"st1":133,"st2":147,"st3":64,"st4":115,"st5":42,"st6":67,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`조휴(曹休)
생몰년: ? ~ 228년
열전: 중국 삼국 시대 위나라의 황족 · 장수로, 자는 문열(文烈)이며 예주(豫州) 패국(沛國) 초현(譙縣) 사람이다. 조조(曹操)의 족자로, 진군(陳群) · 사마의(司馬懿) · 조진(曹眞)과 함께 조예 대의 고명대신이다.`,
      en:`Cao Xiu (曹休)
Dates: ? – 228
Biography: Cao Xiu was a member of the imperial clan and a general of the Cao Wei state during the Three Kingdoms period. His courtesy name was Wenlie (文烈), and he was from Qiao County (譙縣), Pei Commandery (沛國), Yu Province (豫州). He was a relative of Cao Cao and one of the Grand Regents during the reign of Cao Rui, along with Zhen Jun, Sima Yi, and Cao Zhen.`,
      jp:`曹休(そうきゅう)
生没年: ? - 228年
列伝: 三国時代の魏の皇族・武将。字は文烈で、豫州沛国譙県出身。曹操の族子であり、甄宓、司馬懿、曹真と共に曹叡時代の顧命大臣である。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":8,"na1":{
      ko:"조홍",
      en:"Cao Hong",
      jp:"曹洪"
    },"na2":{
      ko:"자렴",
      en:"Zilian",
      jp:"子廉"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":7,"style":7,"animal_type":0,"face_d":"left","element":[11],"grade":3,"job":[3,11],"cost":7,
    "st0":83,"st1":141,"st2":155,"st3":63,"st4":80,"st5":24,"st6":55,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`조홍(曹洪)
생몰년: ? ~ 232년
열전: 중국 삼국 시대 위나라의 장군으로 자는 자렴(子廉)이며 예주 패국 초현(譙縣) 사람이다. 종형 조조가 거병했을 때부터 따라다니며 많은 공을 세웠다. 형양에서 조조가 위급했을 때는 ‘천하에 조홍은 없어도 되지만 조조는 없으면 안 된다’는 말을 남기며 자신의 말을 내주기도 하였다. 갑부였으며 조비와의 갈등으로 죽을 뻔하였다.`,
      en:`Cao Hong (曹洪)
Dates: ? – 232
Biography: Cao Hong was a general of the Cao Wei state during the Three Kingdoms period. His courtesy name was Zilian (子廉), and he was from Qiao County (譙縣), Pei Commandery (沛國), Yu Province (豫州). He followed his cousin Cao Cao from the time he raised his army and achieved many merits. When Cao Cao was in danger at Xingyang, he gave his horse, saying, "The world can do without Cao Hong, but it cannot do without Cao Cao." He was very wealthy and was almost executed due to a conflict with Cao Pi.`,
      jp:`曹洪(そうこう)
生没年: ? - 232年
列伝: 三国時代の魏の将軍。字は子廉で、豫州沛国譙県出身。従兄の曹操が挙兵した時から付き従い、多くの功績を立てた。邢陽で曹操が危機に陥った際には、「天下に曹洪はなくてもよいが、曹操はなくてはならない」という言葉を残して自分の馬を譲った。大金持ちであり、曹丕との対立で死にかけた。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":9,"na1":{
      ko:"조인",
      en:"Cao Ren",
      jp:"曹仁"
    },"na2":{
      ko:"자효",
      en:"Zixiao",
      jp:"子孝"
    },"na3":{
      ko:"대사마",
      en:"Grand Marshal",
      jp:"大司馬"
    },
    "display":8,"style":8,"animal_type":0,"face_d":"center","element":[11],"grade":5,"job":[2,3,13],"cost":13,
    "st0":90,"st1":183,"st2":182,"st3":77,"st4":142,"st5":49,"st6":78,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`조인(曹仁)
생몰년: 168년 ~ 223년
열전: 중국 삼국 시대 위나라의 장군으로 자는 자효(子孝)이며 예주 패국 초현(譙縣) 사람이다. 조조와 6촌 형제이다. 초반부터 조조를 따라 많은 공을 세웠으며 조조도 그 용기와 지략을 중히 여겼다. 주로 형주 전선을 담당하며 주유, 관우 등과 다투었다.`,
      en:`Cao Ren (曹仁)
Dates: 168 – 223
Biography: Cao Ren was a general of the Cao Wei state during the Three Kingdoms period. His courtesy name was Zixiao (子孝), and he was from Qiao County (譙縣), Pei Commandery (沛國), Yu Province (豫州). He was a sixth-cousin of Cao Cao. He followed Cao Cao from the early days and achieved many merits, and Cao Cao valued his courage and strategy. He was mainly in charge of the Jing Province front and fought against Zhou Yu, Guan Yu, and others.`,
      jp:`曹仁(そうじん)
生没年: 168年 - 223年
列伝: 三国時代の魏の将軍。字は子孝で、豫州沛国譙県出身。曹操とは6親等の親戚である。初期から曹操に従い多くの功績を立て、曹操もその勇気と知略を重んじた。主に荊州戦線を担当し、周瑜や関羽などと戦った。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":10,"na1":{
      ko:"견희",
      en:"Lady Zhen",
      jp:"甄氏"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"폐월미인",
      en:"Beauty Exceeding the Moon",
      jp:"絶世の美女"
    },
    "display":9,"style":9,"animal_type":19,"face_d":"left","element":[10],"grade":3,"job":[7,12],"cost":4,
    "st0":14,"st1":22,"st2":6,"st3":33,"st4":133,"st5":66,"st6":98,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`견씨(甄氏)
생몰년: 183년 1월 26일 ~ 221년 8월 4일
열전: 중국 삼국시대 위의 초대 세조 문황제(世祖 文皇帝) 조비(曹丕)의 정실(正室)이다. 상채현 현령 견일(甄逸)의 딸로써 중산군 무극현(하북성 석가장시 무극현 부근)의 태생이다. 견후 또는 견씨라고도 부르며, 일본식 표현으로 견희(甄姬)라고도 한다. 3남5녀 중의 막내딸로 오빠들의 이름은 예(豫), 엄(嚴), 요(堯)이고 언니들은 강(姜), 탈(脫), 도(道), 영(榮)이다. 황후 자신의 이름은 복(宓), 다른 설에는 낙(洛)이라는 말도 있으나, 확실하지는 않다.[2] 소설 「삼국지 연의」에서는 피부는 옥과 같고 얼굴은 꽃과 같은(玉肌花貌) 미인으로 그려진다.`,
      en:`Lady Zhen (甄氏)
Dates: January 26, 183 – August 4, 221
Biography: Lady Zhen was the principal wife of Cao Pi, the first emperor of Cao Wei during the Three Kingdoms period. She was the daughter of Zhen Yi, the county magistrate of Shangcai County, and was born in Wuji County (武極縣), Zhongshan Commandery (中山郡) (near modern-day Wuji County, Shijiazhuang City, Hebei Province). She is also called Empress Zhen or Lady Zhen, and in Japanese, she is known as Zhen Ji (甄姬). She was the youngest of three sons and five daughters. Her brothers' names were Yu (豫), Yan (嚴), and Yao (堯), and her sisters were Jiang (姜), Tuo (脫), Dao (道), and Rong (榮). Her own name is believed to be Fu (宓), though some sources suggest Luo (洛), but this is uncertain.[2] In the novel "Romance of the Three Kingdoms," she is depicted as a beauty with skin like jade and a face like a flower (玉肌花貌).`,
      jp:`甄氏(しんし)
生没年: 183年1月26日 - 221年8月4日
列伝: 三国時代の魏の初代皇帝・世祖文皇帝・曹丕の正室。上蔡県令・甄逸の娘で、中山郡武極県（現在の河北省石家荘市武極県付近）の出身。甄皇后または甄氏と呼ばれ、日本語では甄姫（しんき）とも呼ばれる。3男5女の末娘で、兄の名前は豫、厳、堯、姉の名前は姜、脱、道、栄。皇后自身の名前は宓、別の説では洛とも言われるが確実ではない。[2] 小説『三国志演義』では、肌は玉のようで顔は花のよう（玉肌花貌）な美女として描かれている。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":11,"na1":{
      ko:"하후돈",
      en:"Xiahou Dun",
      jp:"夏侯惇"
    },"na2":{
      ko:"원양",
      en:"Yuanyang",
      jp:"元譲"
    },"na3":{
      ko:"맹하후",
      en:"Fierce Xiahou",
      jp:"猛夏侯"
    },
    "display":10,"style":10,"animal_type":0,"face_d":"center","element":[8],"grade":5,"job":[2,13],"cost":13,
    "st0":81,"st1":160,"st2":155,"st3":70,"st4":125,"st5":76,"st6":93,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`하후돈(夏侯惇)
생몰년: ? ~ 220년 6월 13일
열전: 중국 후한 말 조조 휘하의 장군 겸 정치가이다. 자는 원양(元讓)이며 패국 초현(譙縣) 사람이다. 조조가 거병할 때부터 도왔고 조조와 같은 해에 죽었다. 주로 후방에서 거점 방어를 맡아 조조가 안심하고 친정할 수 있게 했다. 여포의 부하 조성의 화살로 인해 한쪽 눈을 잃은 것으로 유명하다.`,
      en:`Xiahou Dun (夏侯惇)
Dates: ? – June 13, 220
Biography: Xiahou Dun was a general and statesman under Cao Cao during the late Eastern Han dynasty. His courtesy name was Yuanrang (元讓), and he was from Qiao County (譙縣), Pei Commandery (沛國). He supported Cao Cao from the time he raised his army and died in the same year as Cao Cao. He was mainly responsible for rear-area defense, allowing Cao Cao to campaign with peace of mind. He is famous for losing one eye to an arrow shot by Cao Xing, a subordinate of Lü Bu.`,
      jp:`夏侯惇(かこうとん)
生没年: ? - 220年6月13日
列伝: 後漢末期の曹操配下の将軍兼政治家。字は元譲で、沛国譙県出身。曹操が挙兵した時から助け、曹操と同じ年に亡くなった。主に後方の拠点防衛を担当し、曹操が安心して親征できるようにした。呂布の部下・曹性の矢で片目を失ったことで有名である。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":12,"na1":{
      ko:"하후연",
      en:"Xiahou Yuan",
      jp:"夏侯淵"
    },"na2":{
      ko:"묘재",
      en:"Miaocai",
      jp:"妙才"
    },"na3":{
      ko:"귀속장군",
      en:"General of the Vanguard",
      jp:"奇襲将軍"
    },
    "display":11,"style":11,"animal_type":0,"face_d":"right","element":[10],"grade":5,"job":[9,13],"cost":13,
    "st0":86,"st1":176,"st2":182,"st3":82,"st4":101,"st5":55,"st6":89,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`하후연(夏侯淵)
생몰년: ? ~ 219년
열전: 중국 후한 말 조조 휘하의 장군으로 자는 묘재(妙才)이며 예주 패국 초현(譙縣) 사람이다. 재빠르고 과감한 기동이 장기였으며 항상 앞장서서 싸우는 용장이었다. 마초와 한수, 여러 이민족을 물리치고 농우를 평정하였다. 유비로부터 한중을 지켜내던 중 황충과의 전투에서 전사하였다.`,
      en:`Xiahou Yuan (夏侯淵)
Dates: ? – 219
Biography: Xiahou Yuan was a general under Cao Cao during the late Eastern Han dynasty. His courtesy name was Miaocai (妙才), and he was from Qiao County (譙縣), Pei Commandery (沛國). His strength was his swift and bold mobility, and he was a brave warrior who always fought at the forefront. He defeated Ma Chao, Han Sui, and various ethnic minorities, pacifying Longyou. While defending Hanzhong from Liu Bei, he was killed in battle against Huang Zhong.`,
      jp:`夏侯淵(かこうえん)
生没年: ? - 219年
列伝: 後漢末期の曹操配下の将軍。字は妙才で、豫州沛国譙県出身。素早く大胆な機動力が特徴で、常に先頭に立って戦う勇将であった。馬超、韓遂、諸異民族を撃破し、隴右を平定した。劉備から漢中を守っていたが、黄忠との戦いで戦死した。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":13,"na1":{
      ko:"장료",
      en:"Zhang Liao",
      jp:"張遼"
    },"na2":{
      ko:"문원",
      en:"Wenyuan",
      jp:"文遠"
    },"na3":{
      ko:"료래래",
      en:"Ryo Ryo",
      jp:"遼々"
    },
    "display":12,"style":12,"animal_type":20,"face_d":"right","element":[8],"grade":6,"job":[3,13],"cost":15,
    "st0":89,"st1":188,"st2":192,"st3":90,"st4":144,"st5":51,"st6":75,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`장료(張遼)
생몰년: 169년 ~ 222년
열전: 중국 후한 말과 삼국시대 위나라의 장군이다. 자는 문원(文遠)이며 병주 안문군 마읍현(馬邑縣) 사람이다. 초반에 여러 세력을 전전하다가 조조에게 귀순한 후 맹활약하였다. 특히 합비 전투에서 7,000명으로 손권의 호왈 10만이라 위세부린 수만 군사를 물리치는 등 주로 동오 전선을 담당하며 맹위를 떨쳤다. 정사에서는 조조 막하에서 가장 맹장이었으며 오나라와의 전투에서 실수가 없었고 전선에 나가 장수급을 수없이 베고 승리를 이끌어서 오나라에서는 어린 아이들도 장문원 이름만 들어도 벌벌 떨 정도였다고 한다. 정사에서 서주군 전투때는 관운장과 전투중에 수십합을 겨뤄도 밀리지가 않았고 관우가 힘겨워하자 도와주러온 부장 장익, 마상, 주원 등을 죽였다.`,
      en:`Zhang Liao (張遼)
Dates: 169 – 222
Biography: Zhang Liao was a general of the Cao Wei state during the late Eastern Han dynasty and Three Kingdoms period. His courtesy name was Wenyuan (文遠), and he was from Mayi County (馬邑縣), Yanmen Commandery (雁門郡), Bing Province (并州). After serving various warlords in his early days, he joined Cao Cao and became a prominent general. He was particularly active on the eastern front against Sun Quan, famously defeating a massive army of tens of thousands (claimed to be 100,000) with only 7,000 men at the Battle of Hefei. In the official histories, he is regarded as Cao Cao's mightiest general, never making mistakes in battles against Wu, slaying numerous high-ranking officers, and leading his troops to victory to such an extent that even children in Wu would tremble at the mere mention of his name. In the Battle of Xiapi, he fought evenly with Guan Yu for dozens of rounds, and when Guan Yu's subordinates, Zhang Yi, Ma Sang, and Zhou Yuan, came to his aid, he killed them.`,
      jp:`張遼(ちょうりょう)
生没年: 169年 - 222年
列伝: 後漢末期から三国時代の魏の将軍。字は文遠で、并州雁門郡馬邑県出身。初期には様々な勢力を渡り歩いた後、曹操に帰順し、大活躍した。特に合肥の戦いでは、7,000人で孫権の号称10万という数万の大軍を撃破するなど、主に東呉戦線を担当し、猛威を振るった。正史では曹操配下で最も猛将であり、呉との戦いでミスはなく、戦線に出ては将級の武将を数多く討ち取り、勝利を導いたため、呉では幼い子供たちも張文遠の名前を聞くだけで震え上がったという。正史の徐州軍の戦いでは、関羽と数十合も互角に戦い、関羽が苦戦すると助けに来た部下の張翼、馬相、周淵らを討ち取った。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":14,"na1":{
      ko:"전위",
      en:"Dian Wei",
      jp:"典韋"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"악래",
      en:"Yue Lai",
      jp:"悪来"
    },
    "display":13,"style":13,"animal_type":22,"face_d":"right","element":[12],"grade":5,"job":[2,10],"cost":12,
    "st0":65,"st1":190,"st2":194,"st3":74,"st4":60,"st5":19,"st6":95,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`전위(典韋)
생몰년: ? ~ 197년
열전: 중국 후한 말 조조 휘하의 군인으로 연주 진류군 기오현(己吾縣) 사람이다. 사지에 빠진 조조를 경호하다가 전사하였다.`,
      en:`Dian Wei (典韋)
Dates: ? – 197
Biography: Dian Wei was a soldier under Cao Cao during the late Eastern Han dynasty, from Jibu County (己吾縣), Chenliu Commandery (陳留郡), Yan Province (兗州). He died while protecting Cao Cao, who had fallen into a dangerous situation.`,
      jp:`典韋(てんい)
生没年: ? - 197年
列伝: 後漢末期の曹操配下の軍人。兗州陳留郡己吾県出身。危険な状況に陥った曹操を護衛中に戦死した。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":15,"na1":{
      ko:"허저",
      en:"Xu Chu",
      jp:"許褚"
    },"na2":{
      ko:"중강",
      en:"Zhongkang",
      jp:"仲康"
    },"na3":{
      ko:"호치",
      en:"Tiger Fool",
      jp:"虎痴"
    },
    "display":14,"style":14,"animal_type":25,"face_d":"center","element":[9],"grade":5,"job":[10,14],"cost":12,
    "st0":66,"st1":190,"st2":192,"st3":73,"st4":88,"st5":23,"st6":85,
    "sk":[{"idx":1}],
    "relation":[0,4],
    "txt": {
      ko:`허저(許褚)
생몰년: ? ~ ?
열전: 후한 ~ 위나라의 무장으로 자는 중강(仲康)이며 예주 초국(譙國) 초현(譙縣) 사람이다. 호치(虎癡)란 별명이 있다. 우월한 완력과 우직한 성품으로 조조의 신임을 받아 그 경호를 맡았으며 용맹을 떨쳤다.`,
      en:`Xu Chu (許褚)
Dates: ? – ?
Biography: Xu Chu was a general of the late Eastern Han and Wei periods. His courtesy name was Zhongkang (仲康), and he was from Qiao County (譙縣), Pei Commandery (沛國). He was nicknamed "Tiger Brute" (虎癡). With his superior strength and honest character, he earned Cao Cao's trust and was appointed as his bodyguard, where he displayed great bravery.`,
      jp:`許褚(きょちょ)
生没年: ? - ?
列伝: 後漢末期から魏にかけての武将。字は仲康で、豫州沛国譙県出身。虎痴（こち）というあだ名がある。卓越した怪力と誠実な人柄で曹操の信頼を得て、その護衛を務め、勇猛さを発揮した。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":16,"na1":{
      ko:"문빙",
      en:"Wen Ping",
      jp:"文聘"
    },"na2":{
      ko:"중업",
      en:"Zhongye",
      jp:"仲業"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":15,"style":15,"animal_type":4,"face_d":"left","element":[11],"grade":5,"job":[2,10],"cost":9,
    "st0":82,"st1":155,"st2":153,"st3":75,"st4":157,"st5":75,"st6":72,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`문빙(文聘)
생몰년: ? ~ ?
열전: 중국 삼국시대 위나라의 장군으로 자는 중업(仲業)이며 형주 남양군 완현(宛縣) 사람이다. 수십 년간 강하를 안정적으로 지켜냈다.`,
      en:`Wen Ping (文聘)
Dates: ? – ?
Biography: Wen Ping was a general of the Cao Wei state during the Three Kingdoms period. His courtesy name was Zhongye (仲業), and he was from Wan County (宛縣), Nanyang Commandery (南陽郡), Jing Province (荊州). He defended Jiangxia stably for decades.`,
      jp:`文聘(ぶんぺい)
生没年: ? - ?
列伝: 三国時代の魏の将軍。字は仲業で、荊州南陽郡宛県出身。数十年間、江夏を安定的に守り抜いた。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":17,"na1":{
      ko:"문흠",
      en:"Wen Qin",
      jp:"文欽"
    },"na2":{
      ko:"중약",
      en:"Zhongruo",
      jp:"仲若"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":16,"style":16,"animal_type":4,"face_d":"left","element":[10],"grade":3,"job":[2,3],"cost":7,
    "st0":73,"st1":160,"st2":166,"st3":72,"st4":80,"st5":34,"st6":22,
    "sk":[{"idx":1}],
    "relation":[4],
    "txt": {
      ko:`문흠(文欽)
생몰년: ? ~ 258년 2월
열전: 중국 삼국 시대 위나라와 오나라의 장수로, 자는 중약(仲若)이며, 예주(豫州) 초국(譙國) 초현(譙縣) 사람이다. 그의 둘째 아들 문앙은 당대 최강의 용맹을 자랑했던 맹장이다.`,
      en:`Wen Qin (文欽)
Dates: ? – February 258
Biography: Wen Qin was a general of the Cao Wei and Shu Han states during the Three Kingdoms period. His courtesy name was Zhongruo (仲若), and he was from Qiao County (譙縣), Pei Commandery (沛國). His second son, Wen Yang, was a fearsome warrior renowned for his bravery.`,
      jp:`文欽(ぶんきん)
生没年: ? - 258年2月
列伝: 三国時代の魏と蜀漢の将軍。字は仲若で、豫州沛国譙県出身。彼の次男・文鴦は、当時最強の勇猛さを誇った猛将である。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":18,"na1":{
      ko:"문앙",
      en:"Wen Yang",
      jp:"文鴦"
    },"na2":{
      ko:"차건",
      en:"Ziqian",
      jp:"次騫"
    },"na3":{
      ko:"소드마스터",
      en:"Sword Master",
      jp:"剣の達人"
    },
    "display":17,"style":17,"animal_type":4,"face_d":"right","element":[10],"grade":6,"job":[13,5],"cost":15,
    "st0":76,"st1":193,"st2":196,"st3":92,"st4":132,"st5":25,"st6":70,
    "sk":[{"idx":1}],
    "relation":[4],
    "txt": {
      ko:`문앙(文鴦)
생몰년: 238년 ~ 291년 3월 8일
열전: 중국 삼국 시대 조위 ~ 서진의 무장으로, 자는 차건(次騫)[1]이며, 예주(豫州) 초국(譙國) 초현(譙縣) 사람이다. 앙(鴦)은 아명이고, 실제로 사용한 이름은 숙(淑, 俶)이나 《삼국지(三國志)》·《진서(晉書)》 등에서는 아명으로 기록되어 있다. 조위의 무장 문흠(文欽)의 아들이다.`,
      en:`Wen Yang (文鴦)
Dates: 238 – March 8, 291
Biography: Wen Yang was a general of the Cao Wei and Western Jin dynasties during the Three Kingdoms period. His courtesy name was Chaqian (次騫), and he was from Qiao County (譙縣), Pei Commandery (沛國). Yang (鴦) was his childhood name; he actually used the name Shu (淑, 俶), but it is recorded as his childhood name in the "Records of the Three Kingdoms" and "Book of Jin." He was the son of Wen Qin, a general of Cao Wei.`,
      jp:`文鴦(ぶんおう)
生没年: 238年 - 291年3月8日
列伝: 三国時代の曹魏から西晋にかけての武将。字は次騫で、豫州沛国譙県出身。鴦（おう）は幼名で、実際に使用した名前は淑（しゅく、ちょく）だが、『三国志』や『晋書』などでは幼名として記録されている。曹魏の武将・文欽（ぶんきん）の息子である。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":19,"na1":{
      ko:"사마의",
      en:"Sima Yi",
      jp:"司馬懿"
    },"na2":{
      ko:"중달",
      en:"Zhongda",
      jp:"仲達"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":18,"style":18,"animal_type":20,"face_d":"left","element":[11],"grade":6,"job":[1,4],"cost":14,
    "st0":94,"st1":144,"st2":125,"st3":65,"st4":196,"st5":91,"st6":73,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`사마의(司馬懿)
생몰년: 179년 ~ 251년 8월 5일
열전: 중국 삼국시대 조위의 관료이자 서진의 추존 황제로, 자는 중달(仲達)이며 하내군 온현(溫縣) 사람이다. 조진 사후, 위나라의 군대를 이끌어 그의 최대의 라이벌인 제갈량과의 치열한 지략싸움 끝에 결국 제갈량의 북벌을 막아냈다. 명제 사후 실권을 장악하여 서진 건국의 토대를 마련하였다.`,
      en:`Sima Yi (司馬懿)
Dates: 179 – August 5, 251
Biography: Sima Yi was a statesman of the Cao Wei state and the posthumously honored emperor of the Western Jin dynasty. His courtesy name was Zhongda (仲達), and he was from Wen County (溫縣), Henei Commandery (河內郡). After the death of Cao Zhen, he led the Wei army and, after a fierce strategic battle against his greatest rival, Zhuge Liang, ultimately thwarted Zhuge Liang's Northern Expeditions. After the death of Emperor Ming, he seized real power and laid the foundation for the establishment of the Western Jin dynasty.`,
      jp:`司馬懿(しばい)
生没年: 179年 - 251年8月5日
列伝: 三国時代の曹魏の官僚であり、西晋の追尊皇帝。字は仲達で、河内郡温県出身。曹真の死後、魏の軍を率いて最大のライバルである諸葛亮との激しい知略戦の末、ついに諸葛亮の北伐を阻止した。明帝の死後、実権を掌握し、西晋建国の礎を築いた。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":20,"na1":{
      ko:"곽가",
      en:"Guo Jia",
      jp:"郭嘉"
    },"na2":{
      ko:"봉효",
      en:"Fengxiao",
      jp:"奉孝"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":19,"style":19,"animal_type":7,"face_d":"left","element":[7],"grade":5,"job":[1,12],"cost":13,
    "st0":40,"st1":20,"st2":20,"st3":25,"st4":190,"st5":84,"st6":78,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`곽가(郭嘉)
생몰년: 170년 ~ 207년
열전: 중국 후한 말의 책사다. 자는 봉효(奉孝)이며, 예주 영천군 양책현(陽翟縣) 사람이다. 조조가 가장 아끼던 참모로 관직은 사공군좨주(司空軍祭酒)였으며 시호는 정후(貞侯)이다. 아들은 곽혁이고, 손자는 곽심(郭深), 곽창(郭敞)이며, 고손은 곽엽(郭獵)이다.`,
      en:`Guo Jia (郭嘉)
Dates: 170 – 207
Biography: Guo Jia was a strategist of the late Eastern Han period. His courtesy name was Fengxiao (奉孝), and he was from Yangzhai County (陽翟縣), Yingchuan Commandery (潁川郡). He was Cao Cao's most cherished advisor, holding the position of Commander of the Army (司空軍祭酒). His posthumous title was Marquis Zhen (貞侯). His son was Guo He, his grandsons were Guo Shen (郭深) and Guo Chang (郭敞), and his great-grandson was Guo Lie (郭獵).`,
      jp:`郭嘉(かくか)
生没年: 170年 - 207年
列伝: 後漢末期の策士。字は奉孝で、豫州潁川郡陽翟県出身。曹操が最も寵愛した参謀で、官職は司空軍祭酒、諡号は貞侯。息子は郭獲、孫は郭深、郭敞、曾孫は郭猟である。`,
    },
    "region":"china1","period":5,"scenarioRegion":""
  },
  {
    "idx":21,"na1":{
      ko:"이순신",
      en:"Yi Sun-sin",
      jp:"李舜臣"
    },"na2":{
      ko:"여해",
      en:"Yeohae",
      jp:"汝諧"
    },"na3":{
      ko:"해신",
      en:"God of the Sea",
      jp:"海の神"
    },
    "display":21,"style":99,"animal_type":6,"face_d":"left","element":[9],"grade":6,"job":[13],"cost":15,
    "st0":120,"st1":170,"st2":138,"st3":69,"st4":190,"st5":75,"st6":95,
    "sk":[{"idx":1},{"idx":1},{"idx":2}],
    "relation":[0,0],
    "txt": {
      ko:`이순신(李舜臣)
생몰년: 1545년 4월 28일 ~ 1598년 12월 16일 (음력 11월 19일)
열전: 조선 중기의 무신이었다. 본관은 덕수(德水), 자는 여해(汝諧), 시호는 충무(忠武)였으며, 한성 출신이었다. 문반 가문 출신으로 1576년(선조 9년) 무과(武科)에 급제하여 그 관직이 동구비보 권관, 훈련원 봉사, 발포진 수군만호, 조산보 만호, 전라좌도 수군절도사를 거쳐 정헌대부 삼도수군통제사에 이르렀다.`,
      en:`Yi Sun-sin (李舜臣)
Dates: April 28, 1545 – December 16, 1598 (November 19, lunar calendar)
Biography: Yi Sun-sin was a military official of the Joseon Dynasty during the Imjin War. His clan origin was Deoksu (德水), his courtesy name was Yeohae (汝諧), and his posthumous title was Chungmu (忠武). He was from Hanseong. Born into a civil official family, he passed the military examination (武科) in 1576 (the 9th year of King Seonjo's reign). His official posts included Commander of Donggubi (동구비보 권관), Instructor at the Training Institute (훈련원 봉사), Naval Commander of Balpo (발포진 수군만호), Naval Commander of Josan (조산보 만호), and Provincial Naval Commander of Jeolla Left Flank (전라좌도 수군절도사), eventually rising to the rank of Grand Admiral and Commander-in-Chief of the Three Naval Forces (삼도수군통제사).`,
      jp:`李舜臣(り・しゅんしん)
生没年: 1545年4月28日 - 1598年12月16日（旧暦11月19日）
列伝: 朝鮮中期の武将。本貫は徳水（トクス）、字は汝諧（ヨヘ）、諡号は忠武（チュンム）。漢城出身。文官の家系に生まれ、1576年（宣祖9年）に武科に及第し、官職は東九比保権官、訓練院奉事、発浦鎮水軍万戸、造山浦万戸、全羅左道水軍節度士を歴任し、最終的に正憲大夫三道水軍統制士に昇進した。`,
    },
    "region":"korea2","period":6,"scenarioRegion":["korea2-6-0"] 
  },
  {
    "idx":22,"na1":{
      ko:"우에스기 겐신",
      en:"Uesugi Kenshin",
      jp:"上杉 謙信"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"에치고의 용",
      en:"Dragon of Echigo",
      jp:"越後の龍"
    },
    "display":22,"style":100,"animal_type":20,"face_d":"left","element":[7],"grade":6,"job":[0,3],"cost":15,
    "st0":110,"st1":160,"st2":185,"st3":95,"st4":155,"st5":60,"st6":90,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`우에스기 겐신(上杉 謙信)
생몰년: 1530년 음력 1월 21일(2월 18일) ~ 1578년 음력 3월 13일(4월 19일)
열전: 센고쿠 시대의 무장, 다이묘이다. 출가 전 이름은 나가오 가게토라(일본어: 長尾景虎)이고, 이후 개명을 통해 우에스기 마사토라(일본어: 上杉政虎), 우에스기 데루토라(일본어: 上杉 輝虎)란 이름을 가졌고, 출가 후엔 우에스기 겐신으로 불렸다. 어릴 적 이름은 도라치요이다. 형을 대신하여 당주에 자리에 앉아 주변의 다케다 신겐, 호조 우지야스, 오다 노부나가 등의 쟁쟁한 센고쿠 다이묘들과 전쟁을 벌였다. 스스로 비사문천의 화신이라 믿어 전장에서 뛰어난 군략을 보여 에치고의 용 혹은 군신이라 불렸다.`,
      en:`Uesugi Kenshin (上杉 謙信)
Dates: January 21, 1530 (February 18) – March 13, 1578 (April 19)
Biography: Uesugi Kenshin was a warlord and daimyo of the Sengoku period. His birth name was Nagao Kagetora (長尾景虎), and he later changed his name to Uesugi Masatora (上杉政虎) and then Uesugi Terutora (上杉 輝虎). After entering religious orders, he became known as Uesugi Kenshin. His childhood name was Torachiyo. He succeeded his elder brother as the head of the clan and engaged in wars with formidable Sengoku daimyo such as Takeda Shingen, Hojo Ujiyasu, and Oda Nobunaga. Believing himself to be the incarnation of Bishamonten, he displayed outstanding military strategy on the battlefield, earning him the nicknames "Dragon of Echigo" and "God of War."`,
      jp:`上杉 謙信(うえすぎ けんしん)
生没年: 1530年1月21日（2月18日） - 1578年3月13日（4月19日）
列伝: 戦国時代の武将、大名。出家前の名は長尾景虎（ながお かげとら）で、その後、上杉政虎（うえすぎ まさとら）、上杉輝虎（うえすぎ てるトラ）と改名し、出家後に上杉謙信と呼ばれるようになった。幼名は虎千代（とらちよ）。兄に代わって家督を継ぎ、武田信玄、北条氏康、織田信長といった強豪の戦国大名たちと戦った。自らを毘沙門天の化身と信じ、戦場で卓越した軍略を見せたことから、「越後の龍」あるいは「軍神」と呼ばれた。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":23,"na1":{
      ko:"리처드 1세",
      en:"Richard I",
      jp:"リチャード1世"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"사자심왕",
      en:"Lionheart",
      jp:"獅子心王"
    },
    "display":23,"style":101,"animal_type":1,"face_d":"right","element":[10],"grade":7,"job":[0,2],"cost":15,
    "st0":92,"st1":200,"st2":200,"st3":99,"st4":157,"st5":56,"st6":14,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`리처드 1세(Richard I)
생몰년: 1157년 9월 8일 ~ 1199년 4월 6일
열전: 플랜태저넷 왕가 출신으로는 잉글랜드 왕국의 두 번째 국왕이다(재위 1189년 9월 8일 - 1199년 4월 6일). 잉글랜드의 헨리 2세와 아키텐의 엘레오노르 사이에서 태어난 세 번째 아들이다. 생애의 대부분을 전쟁터에서 보냈으며, 그 용맹함으로 인해 사자심왕(프랑스어: Cœur de Lion, the Lionheart)이라는 별명을 얻었으며, 이후 중세 기사 이야기의 전형적인 영웅으로 동경의 대상이 되었다.	그러나 재위 시 본국인 잉글랜드에 체재했던 기간이 불과 6개월이었으므로 그의 통치력에 대해서는 뚜렷이 알려진 바가 없다. 치세의 대부분을 외국에서 보내고 통치자로서 무능하였으나, 용감·관용 등을 겸비한 중세의 전형적 기사였다.`,
      en:`Richard I (Richard the Lionheart)
Dates: September 8, 1157 – April 6, 1199
Biography: Richard I was the second King of England from the Plantagenet dynasty (reigned September 8, 1189 – April 6, 1199). He was the third son of Henry II of England and Eleanor of Aquitaine. He spent most of his life on the battlefield and, due to his bravery, earned the nickname "Lionheart" (French: Cœur de Lion, the Lionheart), becoming an admired archetype of a medieval knight. However, he spent only six months in his kingdom of England during his reign, so his administrative capabilities are not well known. Although he spent most of his reign abroad and was an ineffective ruler, he was a typical medieval knight possessing courage and magnanimity.`,
      jp:`リチャード1世（リチャード・ザ・ライオンハート）
生没年: 1157年9月8日 - 1199年4月6日
列伝: プランタジネット朝イングランド王国の第2代国王（在位: 1189年9月8日 - 1199年4月6日）。イングランド王ヘンリー2世とアキテーヌ公エレオノールとの間に生まれた三男。生涯の大半を戦場で過ごし、その勇猛さから「獅子心王（リシャール・クール・ド・リオン）」と呼ばれ、中世の騎士物語における典型的な英雄として憧れの対象となった。しかし、在位中にイングランドに滞在したのはわずか6ヶ月であったため、彼の統治能力については明確には知られていない。治世の大部分を国外で過ごし、統治者としては無能であったが、勇敢さと寛容さを兼ね備えた中世の典型的な騎士であった。`,
    },
    "region":"unitedKingdom0","period":2,"scenarioRegion":""
  },
  {
    "idx":24,"na1":{
      ko:"할리드 이븐 알 왈리드",
      en:"Khalid ibn al-Walid",
      jp:"ハリド・イブン・アル＝ワリード"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"신께서 뽑아든 검",
      en:"Sword of God",
      jp:"神に選ばれし剣"
    },
    "display":24,"style":102,"animal_type":0,"face_d":"center","element":[8],"grade":7,"job":[2,3,13],"cost":15,
    "st0":120,"st1":197,"st2":196,"st3":90,"st4":193,"st5":85,"st6":97,
    "sk":[{"idx":1}],
    "relation":[4],
    "txt": {
      ko:`할리드 이븐 알 왈리드(خالد إبن الوليد)
생몰년: 592년 ~ 642년
열전: 이슬람 초기의 정통 칼리파 시대의 무장이다. '알라의 검'(the Sword of God)이라는 별명으로 알려져 있다. 이슬람 확장 전쟁에서 지대한 공적을 세웠다.`,
      en:`Khalid ibn al-Walid (خالد إبن الوليد)
Dates: 592 – 642
Biography: Khalid ibn al-Walid was a military commander of the early Islamic Rashidun Caliphate. He is known by the nickname "the Sword of God" (Sayf Allah). He made significant contributions to the Islamic expansion wars.`,
      jp:`ハリード・イブン・アル＝ワリード（خالد إبن الوليد）
生没年: 592年 - 642年
列伝: イスラム初期の正統カリフ時代の武将。「アッラーの剣」（サイフ・アッラー）という異名で知られる。イスラム拡大戦争において多大な功績を挙げた。`,
    },
    "region":"saudiArabia0","period":0,"scenarioRegion":""
  },
  {
    "idx":25,"na1":{
      ko:"나폴레옹",
      en:"Napoleon",
      jp:"ナポレオン"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"보나파르트",
      en:"Bonaparte",
      jp:"ボナパルト"
    },
    "display":25,"style":103,"animal_type":19,"face_d":"center","element":[9],"grade":7,"job":[0,9],"cost":15,
    "st0":122,"st1":155,"st2":137,"st3":73,"st4":197,"st5":55,"st6":94,
    "sk":[{"idx":1}],
    "relation":[4],
    "txt": {
      ko:`나폴레옹 보나파르트(Napoléon Bonaparte)
생몰년: 1769년 8월 15일 ~ 1821년 5월 5일
열전: 프랑스 제1공화국의 군인이자 1804년부터 1814년, 1815년까지 프랑스 제1제국의 황제였다. 흔히 나폴레옹(프랑스어: Napoléon , 문화어: 나뽈레옹)으로 불린다.`,
      en:`Napoleon Bonaparte
Dates: August 15, 1769 – May 5, 1821
Biography: Napoleon Bonaparte was a French military leader and emperor of the First French Empire from 1804 to 1814 and again in 1815. He is commonly known as Napoleon.`,
      jp:`ナポレオン・ボナパルト
生没年: 1769年8月15日 - 1821年5月5日
列伝: フランス第一共和政の軍人であり、1804年から1814年、および1815年にフランス第一帝国の皇帝であった。一般にナポレオン（フランス語: Napoléon）として知られている。`,
    },
    "region":"france0","period":5,"scenarioRegion":""
  },
  {
    "idx":26,"na1":{
      ko:"잔 다르크",
      en:"Joan of Arc",
      jp:"ジャンヌ・ダルク"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"성녀",
      en:"Saint",
      jp:"聖女"
    },
    "display":26,"style":104,"animal_type":0,"face_d":"left","element":[12],"grade":7,"job":[2,13],"cost":15,
    "st0":97,"st1":172,"st2":196,"st3":94,"st4":170,"st5":52,"st6":81,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`잔 다르크(Jeanne d'Arc)
생몰년: 1412년 1월 6일 ~ 1431년 5월 30일
열전: 프랑스의 국민적 영웅이자 로마 가톨릭교회의 성인이다. 오를레앙의 처녀(la Pucelle d’Orléans)라고도 불린다.`,
      en:`Joan of Arc (Jeanne d'Arc)
Dates: January 6, 1412 – May 30, 1431
Biography: Joan of Arc was a French national heroine and a saint of the Roman Catholic Church. She is also known as the Maid of Orléans (la Pucelle d’Orléans).`,
      jp:`ジャンヌ・ダルク（Jeanne d'Arc）
生没年: 1412年1月6日 - 1431年5月30日
列伝: フランスの国民的英雄であり、ローマ・カトリック教会の聖人。オルレアンの乙女（la Pucelle d’Orléans）とも呼ばれる。`,
    },
    "region":"france0","period":5,"scenarioRegion":""
  },
  {
    "idx":27,"na1":{
      ko:"오다 노부나가",
      en:"Oda Nobunaga",
      jp:"織田 信長"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(織田信長)",
      en:"Oda Nobunaga",
      jp:""
    },
    "display":27,"style":105,"animal_type":6,"face_d":"center","element":[11],"grade":6,"job":[0,13],"cost":14,
    "st0":94,"st1":166,"st2":142,"st3":71,"st4":182,"st5":95,"st6":95,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`오다 노부나가(織田 信長)
생몰년: 1534년 6월 23일 ~ 1582년 6월 21일
열전: 센고쿠 시대를 평정한 인물로, 아즈치모모야마 시대를 연 다이묘이다. 도요토미 히데요시, 도쿠가와 이에야스와 더불어 중세 일본 삼영걸로 불린다.`,
      en:`Oda Nobunaga (織田 信長)
Dates: June 23, 1534 – June 21, 1582
Biography: Oda Nobunaga was a figure who unified Japan during the Sengoku period and opened the Azuchi-Momoyama period. He is known as one of the three great unifiers of medieval Japan, along with Toyotomi Hideyoshi and Tokugawa Ieyasu.`,
      jp:`織田 信長(おだ のぶなが)
生没年: 1534年6月23日 - 1582年6月21日
列伝: 戦国時代を統一した人物で、安土桃山時代を開いた大名。豊臣秀吉、徳川家康と共に中世日本の三英傑と呼ばれる。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":28,"na1":{
      ko:"도도 타카토라",
      en:"Todo Takatora",
      jp:"藤堂 高虎"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(藤堂高虎)",
      en:"Todo Takatora",
      jp:""
    },
    "display":28,"style":"","animal_type":19,"face_d":"left","element":[8],"grade":4,"job":[13,3],"cost":11,
    "st0":79,"st1":176,"st2":139,"st3":51,"st4":170,"st5":90,"st6":1,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`도도 다카토라(藤堂 高虎)
생몰년: 1556년 2월 16일 ~ 1630년 11월 9일
열전: 센고쿠 시대부터 에도 시대 전기에 활약한 다이묘이다. 법명은 도모요시(智吉). 주군을 여러번 바꾼 센고쿠 무장으로 잘 알려져 있다.축성술이 뛰어나 우와지마성, 이마바리성, 사사야마성, 쓰성, 이가 우에노성, 제제성, 순천왜성 등을 축성했다. 다카토라의 축성은 석벽을 높게 쌓는 것과 해자의 설계에 특징이 있다. 같은 축성의 명수 가토 기요마사(加藤清正)는 석벽의 휨을 중시한다는 것에서 대비된다.`,
      en:`Todo Takatora (藤堂 高虎)
Dates: February 16, 1556 – November 9, 1630
Biography: Todo Takatora was a daimyo who was active from the Sengoku period to the early Edo period. His Buddhist name was Tomoyoshi. He is well-known as a Sengoku warrior who served multiple lords. He was skilled in castle construction, having built Uwajima Castle, Imabari Castle, Sasayama Castle, Tsu Castle, Iga Ueno Castle, Zeze Castle, and Suncheon Japanese Castle. Takatora's castle construction is characterized by high stone walls and well-designed moats, contrasting with the castle-building master Kato Kiyomasa, who emphasized the curvature of stone walls.`,
      jp:`藤堂 高虎(とうどう たかとら)
生没年: 1556年2月16日 - 1630年11月9日
列伝: 戦国時代から江戸時代前期にかけて活躍した大名。法名は藤堂智吉。主君を何度も変えた戦国武将としてよく知られている。築城術に優れ、宇和島城、今治城、篠山城、津城、伊賀上野城、膳所城、順天倭城などを築城した。高虎の築城は、石垣を高く積むことと堀の設計に特徴がある。同じ築城の名手である加藤清正が石垣の反りを重視するのとは対照的である。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":29,"na1":{
      ko:"구루시마 미치후사",
      en:"Kurushima Michifusa",
      jp:"来島 通総"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(来島通総)",
      en:"Kurushima Michifusa",
      jp:""
    },//수군
    "display":29,"style":"","animal_type":24,"face_d":"left","element":[9],"grade":3,"job":[3,8],"cost":7,
    "st0":73,"st1":155,"st2":142,"st3":70,"st4":100,"st5":55,"st6":61,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`구루시마 미치후사(来島 通総)
생몰년: 1561년 ~ 1597년 10월 26일
열전: 아즈치 모모야마 시대의 이요 국 출신 센고쿠 무장이다.`,
      en:`Kurushima Michifusa (来島 通総)
Dates: 1561 – October 26, 1597
Biography: Kurushima Michifusa was a Sengoku period warrior from Iyo Province.`,
      jp:`来島 通総(くるしま みちふさ)
生没年: 1561年 - 1597年10月26日
列伝: 安土桃山時代の伊予国の戦国武将。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":30,"na1":{
      ko:"가메이 고레노리",
      en:"Kamei Korenori",
      jp:"亀井 茲矩"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(来島通総)",
      en:"Kurushima Michifusa",
      jp:""
    },
    "display":30,"style":"","animal_type":9,"face_d":"center","element":[11],"grade":3,"job":[0,10],"cost":7,
    "st0":40,"st1":132,"st2":157,"st3":51,"st4":141,"st5":80,"st6":55,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`가메이 고레노리(亀井玆矩)
생몰년: 1557년 ~ 1612년 2월 27일
열전: 아즈치모모야마 시대부터 에도 시대 전기에 걸쳐 활약한 무장, 다이묘이다. 이나바 시카노번 초대 번주이다. 쓰와노번 가메이가(津和野藩亀井家) 시조. 초명은 유 구니쓰나(湯国綱). 아마고씨의 가신으로, 창술에 능하여 창의 신주로(槍の新十郎)라는 별명을 가졌다.`,
      en:`Kamei Korenori (亀井玆矩)
Dates: 1557 – February 27, 1612
Biography: Kamei Korenori was a warrior and daimyo active from the Azuchi-Momoyama period to the early Edo period. He was the first lord of the Shikanon Castle in Inaba Province and the founder of the Kamei clan of Tsuwano Castle. His original name was Yu Kunitsuna. He was a retainer of the Amago clan and was skilled in spear fighting, earning the nickname "Shinjuuro of the Spear" (Yari no Shinjuuro).`,
      jp:`亀井 茲矩(かめい これのり)
生没年: 1557年 - 1612年2月27日
列伝: 安土桃山時代から江戸時代前期にかけて活躍した武将、大名。因幡鹿野藩初代藩主。津和野藩亀井家始祖。初名は湯国綱。尼子氏の家臣で、槍術に長け、槍の新十郎という異名を持った。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":31,"na1":{
      ko:"와키자카 야스하루",
      en:"Wakizaka Yasuharu",
      jp:"脇坂 安治"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(脇坂安治)",
      en:"Wakizaka Yasuharu",
      jp:""
    },
    "display":31,"style":"","animal_type":22,"face_d":"right","element":[9],"grade":2,"job":[0,3],"cost":7,
    "st0":66,"st1":144,"st2":140,"st3":45,"st4":79,"st5":55,"st6":16,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`와키자카 야스하루(脇坂 安治)
생몰년: 1554년 ~ 1626년 9월 26일
열전: 아즈치모모야마 시대부터 에도 시대 초기까지의 무장, 다이묘이다. 아와지 스모토번주, 이요 오즈번 초대 번주를 지냈다. 다쓰노번 와키자카씨의 시조.`,
      en:`Wakisaka Yasuharu (脇坂 安治)
Dates: 1554 – September 26, 1626
Biography: Wakisaka Yasuharu was a warrior and daimyo active from the Azuchi-Momoyama period to the early Edo period. He served as the lord of Awaji Sumoto Castle and the first lord of Iyo Ozu Castle. He was the founder of the Wakisaka clan of Tatsuno Castle.`,
      jp:`脇坂 安治(わきざか やすはる)
生没年: 1554年 - 1626年9月26日
列伝: 安土桃山時代から江戸時代初期にかけての武将、大名。淡路洲本藩主、伊予大洲藩初代藩主を務めた。龍野藩脇坂氏の祖。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":32,"na1":{
      ko:"구키 요시타카",
      en:"Kuki Yoshitaka",
      jp:"九鬼 嘉隆"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(九鬼嘉隆)",
      en:"Kuki Yoshitaka",
      jp:""
    },
    "display":32,"style":"","animal_type":22,"face_d":"center","element":[9],"grade":3,"job":[3,8],"cost":7,
    "st0":73,"st1":152,"st2":135,"st3":51,"st4":117,"st5":45,"st6":66,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`구키 요시타카(九鬼 嘉隆)
생몰년: 1542년 ~ 1600년 11월 17일
열전: 센고쿠 시대부터 아즈치모모야마 시대까지의 무장, 다이묘이다. 구키 수군을 이끈 수군무장이며 구키씨 제8대 당주. 자식은 모리타카 등.`,
      en:`Kuki Yoshitaka (九鬼 嘉隆)
Dates: 1542 – November 17, 1600
Biography: Kuki Yoshitaka was a warrior and daimyo active from the Sengoku period to the Azuchi-Momoyama period. He was a naval commander who led the Kuki navy and the 8th head of the Kuki clan. His children included Moritaka.`,
      jp:`九鬼 嘉隆(くき よしたか)
生没年: 1542年 - 1600年11月17日
列伝: 戦国時代から安土桃山時代までの武将、大名。九鬼水軍を率いた水軍武将であり、九鬼氏第8代当主。子に守隆など。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":33,"na1":{
      ko:"가토 요시아키",
      en:"Kato Yoshiaki",
      jp:"加藤 嘉明"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(加藤嘉明)",
      en:"Kato Yoshiaki",
      jp:""
    },
    "display":33,"style":"","animal_type":19,"face_d":"left","element":[9],"grade":3,"job":[3,14],"cost":7,
    "st0":75,"st1":144,"st2":144,"st3":43,"st4":110,"st5":50,"st6":65,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`가토 요시아키(加藤 嘉明)
생몰년: 1563년 ~ 1631년 10월 7일
열전: 일본 아즈치모모야마 시대, 에도 시대의 무장, 다이묘이다. 과거에는 가토 요시아키라였으며 다른 이름은 시게카쓰(일본어: 茂勝)이고, 통칭 마고로쿠(일본어: 孫六). 미나쿠치번 가토 가문의 시조. 시즈가타케의 일곱 자루 창 중 한명으로 유명하다.`,
      en:`Kato Yoshiaki (加藤 嘉明)
Dates: 1563 – October 7, 1631
Biography: Kato Yoshiaki was a warrior and daimyo of the Azuchi-Momoyama and Edo periods. His former name was Kato Yoshiakira, another name was Shigekatsu, and his common name was Magoroku. He was the founder of the Kato clan of Minakuchi Castle. He is famous as one of the Seven Spears of Shizugatake.`,
      jp:`加藤 嘉明(かとう よしあき)
生没年: 1563年 - 1631年10月7日
列伝: 日本の安土桃山時代、江戸時代の武将、大名。過去には加藤嘉明といい、別名に茂勝、通称孫六。水口藩加藤家の祖。賤ヶ岳の七本槍の一人として有名である。`,
    },
    "region":"japan1","period":0,"scenarioRegion":""
  },
  {
    "idx":34,"na1":{
      ko:"원균",
      en:"Won Gyun",
      jp:"元均"
    },"na2":{
      ko:"평중",
      en:"Pyeongjung",
      jp:"平仲"
    },"na3":{
      ko:"하지메 사토루",
      en:"Hajime Satoru",
      jp:"はじめ 悟"
    },
    "display":34,"style":105,"animal_type":0,"face_d":"center","element":[10],"grade":2,"job":[10,14],"cost":7,
    "st0":50,"st1":150,"st2":135,"st3":25,"st4":70,"st5":18,"st6":0,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`원균(元均)
생몰년: 1540년 2월 12일 (음력 1월 5일) ~ 1597년 8월 27일 (음력 7월 15일)
열전: 조선 중기의 무신, 군인으로 임진왜란 당시 조선의 장수 중의 한사람이다.`,
      en:`Won Gyun (元均)
Dates: February 12, 1540 – August 27, 1597
Biography: Won Gyun was a military officer of the Joseon Dynasty during the Imjin War, serving as one of the commanders of the Joseon forces.`,
      jp:`元均(ウォン・ギュン)
生没年: 1540年2月12日 - 1597年8月27日
列伝: 朝鮮中期の武臣、軍人で、壬辰倭乱当時朝鮮の将軍の一人であった。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":35,"na1":{
      ko:"권준",
      en:"Gwon Jun",
      jp:"権俊"
    },"na2":{
      ko:"언경",
      en:"Eon-gyeong",
      jp:"彦卿"
    },"na3":{
      ko:"순천부사",
      en:"Suncheonbusa",
      jp:"順天府使"
    },
    "display":35,"style":105,"animal_type":3,"face_d":"center","element":[12],"grade":4,"job":[1,8],"cost":7,
    "st0":73,"st1":110,"st2":99,"st3":70,"st4":175,"st5":77,"st6":81,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`권준(權俊)
생몰년: 1547년 ~ ?년
열전: 조선 중기의 무신으로, 본관은 안동(安東), 자는 언경(彦卿)이다. 권총(權聰)의 현손이다.`,
      en:`Gwon Jun (權俊)
Dates: 1547 – ?
Biography: Gwon Jun was a military officer of the Joseon Dynasty during the Imjin War. His clan origin was Andong, and his courtesy name was Eon-gyeong. He was a descendant of Gwon Chong.`,
      jp:`権俊(クォン・ジュン)
生没年: 1547年 - ?年
列伝: 朝鮮中期の武臣で、本貫は安東、字は彦卿。権聰の玄孫である。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":36,"na1":{
      ko:"정운",
      en:"Jeong Un",
      jp:"鄭運"
    },"na2":{
      ko:"창진",
      en:"Chang-jin",
      jp:"昌辰"
    },"na3":{
      ko:"녹도만호",
      en:"Nokdomanho",
      jp:"녹島万戸"
    },
    "display":36,"style":105,"animal_type":7,"face_d":"right","element":[12],"grade":5,"job":[3,9],"cost":7,
    "st0":85,"st1":150,"st2":159,"st3":72,"st4":140,"st5":60,"st6":91,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`정운(鄭運)
생몰년: 1543년 10월 7일(음력 9월 10일) ~ 1592년 10월 5일(음력 9월 1일))
열전: 조선 중기의 무신이다. 본관은 하동(河東), 자는 창진(昌辰)이며, 시호는 충장(忠壯).`,
      en:`Jeong Un (鄭運)
Dates: October 7, 1543 – October 5, 1592
Biography: Jeong Un was a military officer of the Joseon Dynasty during the Imjin War. His clan origin was Hadong, his courtesy name was Chang-jin, and his posthumous title was Chungjang.`,
      jp:`鄭運(チョン・ウン)
生没年: 1543年10月7日 - 1592年10月5日
列伝: 朝鮮中期の武臣。本貫は河東、字は昌辰、諡号は忠壮。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":37,"na1":{
      ko:"이순신",
      en:"Yi Sun-sin",
      jp:"李舜臣"
    },"na2":{
      ko:"입부",
      en:"Ipbu",
      jp:"立夫"
    },"na3":{
      ko:"무의공",
      en:"Mu-ui-gong",
      jp:"武毅公"
    },
    "display":37,"style":105,"animal_type":4,"face_d":"center","element":[11],"grade":5,"job":[3,13],"cost":7,
    "st0":87,"st1":172,"st2":172,"st3":67,"st4":147,"st5":76,"st6":82,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`이순신(李純信)
생몰년: 1553년 12월 27일 ~ 1611년 9월 2일
열전: 조선 중기의 왕족, 무장, 유학자이다. 임진왜란 때에 활동하던 장수로 그의 상관이기도 했던 충무공 이순신(李舜臣), 등림수 이순신(李舜臣) 등과의 구별을 위해 무의공 이순신, 입부 이순신으로 불린다. 본관은 전주. 양녕대군의 다섯째 서자 장평도정(長平都正)의 4대손이자, 대한민국 초대 대통령 이승만의 9대 방조가 된다. 시호는 무의(武毅), 자는 입부(立夫)이다.`,
      en:`Yi Sun-sin (李純信)
Dates: December 27, 1553 – September 2, 1611
Biography: Yi Sun-sin was a Joseon Dynasty royal, military officer, and Confucian scholar. He was an active commander during the Imjin War and is distinguished from his superior, Admiral Yi Sun-sin (충무공 이순신), and Yi Sun-sin of Deungnimsu (등림수 이순신) by the titles Yi Sun-sin of Mui-gong and Yi Sun-sin of Ipbu. His clan origin was Jeonju. He was the 4th generation descendant of Jangpyeong-dojeong, the fifth son of Grand Prince Yangnyeong, and the 9th generation ancestor of the first President of South Korea, Syngman Rhee. His posthumous title was Mui, and his courtesy name was Ipbu.`,
      jp:`李純信(イ・スンシン)
生没年: 1553年12月27日 - 1611年9月2日
列伝: 朝鮮中期の王族、武将、儒学者。壬辰倭乱の際に活躍した将軍で、彼の直属の上官でもあった忠武公李舜臣、登臨亭守李舜臣などとの区別のため、武毅公李純信、立夫李舜臣と呼ばれる。本貫は全州。譲寧大君の五男である長平都正の4代孫であり、大韓民国初代大統領李承晩の9代傍祖となる。諡号は武毅、字は立夫。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":38,"na1":{
      ko:"이운룡",
      en:"Yi Un-ryong",
      jp:"李雲龍"
    },"na2":{
      ko:"경현",
      en:"Gyeong-hyeon",
      jp:"景見"
    },"na3":{
      ko:"옥포만호",
      en:"Okpo-manho",
      jp:"玉浦万戸"
    },
    "display":38,"style":105,"animal_type":3,"face_d":"center","element":[7],"grade":5,"job":[3,14],"cost":7,
    "st0":75,"st1":166,"st2":130,"st3":62,"st4":175,"st5":75,"st6":85,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`이운룡(李雲龍)
생몰년: 1562년 ~ 1610년
열전: 조선 중기의 무신이다. 본관은 재령(載寧). 휘는 운룡(雲龍), 자는 경현(景見), 호는 동계(東溪). 청도출신. 아버지는 남해현령 이몽상(李夢祥)이다.`,
      en:`Yi Un-ryong (李雲龍)
Dates: 1562 – 1610
Biography: Yi Un-ryong was a military officer of the Joseon Dynasty during the Imjin War. His clan origin was Jaeryeong. His given name was Un-ryong, his courtesy name was Gyeong-hyeon, and his pen name was Dong-gye. He was from Cheongdo. His father was Yi Mong-sang, the magistrate of Namhae. `,
      jp:`李雲龍(イ・ウンリョン)
生没年: 1562年 - 1610年
列伝: 朝鮮中期の武臣。本貫は載寧。諱は雲龍、字は景見、号は東溪。清道出身。父は南海県令の李夢祥である。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":39,"na1":{
      ko:"류성룡",
      en:"Ryu Seong-ryong",
      jp:"柳成龍"
    },"na2":{
      ko:"이견",
      en:"I-gyeon",
      jp:"以見"
    },"na3":{
      ko:"영의정",
      en:"Yeonguijeong",
      jp:"領議政"
    },
    "display":39,"style":105,"animal_type":3,"face_d":"left","element":[9],"grade":6,"job":[1,6],"cost":7,
    "st0":82,"st1":150,"st2":90,"st3":53,"st4":190,"st5":92,"st6":79,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`류성룡(柳成龍)
생몰년: 1542년 11월 17일(음력 10월 1일) ~ 1607년 5월 31일(음력 5월 6일)
열전: 조선 중기의 문신, 학자, 의학자, 저술가이다. 본관은 풍산(豊山), 자는 이견(而見), 호는 서애(西厓)이고, 시호는 문충(文忠)이다. 경상도 의성의 외가에서 태어났으며, 간성군수 류공작(柳公綽)의 손자이며, 황해도 관찰사 류중영(柳仲郢)의 차남이다.`,
      en:`Ryu Seong-ryong (柳成龍)
Dates: November 17, 1542 – May 31, 1607
Biography: Ryu Seong-ryong was a Joseon Dynasty civil official, scholar, physician, and writer. His clan origin was Pungsan, his courtesy name was I-gyeon, and his pen name was Seo-ae. His posthumous title was Mun-chung. He was born at his maternal home in Uiseong, Gyeongsang Province. He was the grandson of Ryu Gong-jak, the magistrate of Ganseong, and the second son of Ryu Jung-yeong, the governor of Hwanghae Province.`,
      jp:`柳成龍(リュ・ソンニョン)
生没年: 1542年11月17日 - 1607年5月31日
列伝: 朝鮮中期の文臣、学者、医学者、著述家。本貫は豊山、字は而見、号は西厓、諡号は文忠。慶尚道義城の母方の実家で生まれた。父は黄海道観察使の柳仲郢である。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":40,"na1":{
      ko:"권율",
      en:"Gwon Yul",
      jp:"権慄"
    },"na2":{
      ko:"언신",
      en:"Eon-sin",
      jp:"彦愼"
    },"na3":{
      ko:"행주대첩",
      en:"Haengju-daechup",
      jp:"行州大捷"
    },
    "display":40,"style":105,"animal_type":4,"face_d":"center","element":[8],"grade":6,"job":[2,13],"cost":7,
    "st0":96,"st1":170,"st2":125,"st3":67,"st4":178,"st5":77,"st6":92,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`권율(權慄)
생몰년: 1537년 12월 28일 ~ 1599년 7월 6일
열전: 조선 중기의 문신, 군인, 정치인이다. 본관은 안동(安東)이고, 자(字)는 언신(彦愼), 호는 만취당(晩翠堂) 또는 모악(暮嶽), 시호는 충장(忠莊)이다.`,
      en:`Gwon Yul (權慄)
Dates: December 28, 1537 – July 6, 1599
Biography: Gwon Yul was a Joseon Dynasty civil official, military officer, and politician. His clan origin was Andong, his courtesy name was Eon-sin, and his pen names were Manchuidang and Moak. His posthumous title was Chungjang.`,
      jp:`権慄(クォン・ユル)
生没年: 1537年12月28日 - 1599年7月6日
列伝: 朝鮮中期の文臣、軍人、政治家。本貫は安東、字は彦愼、号は晩翠堂または暮嶽、諡号は忠荘。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":41,"na1":{
      ko:"이혼",
      en:"Yi Hon",
      jp:"李煴"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"광해군",
      en:"Gwanghaegun",
      jp:"光海君"
    },
    "display":41,"style":105,"animal_type":2,"face_d":"center","element":[8],"grade":5,"job":[0,3],"cost":7,
    "st0":71,"st1":181,"st2":111,"st3":75,"st4":185,"st5":88,"st6":33,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`광해군(光海君)
생몰년: 1575년 6월 4일(음력 4월 26일) ~ 1641년 8월 7일(음력 7월 1일)
열전: 조선의 제15대 국왕(재위: 1608년 ~ 1623년)이다. 임진왜란 때 세자에 책봉되었으며, 분조[1]하여 의병을 이끌었다. 즉위 후 후금과 명나라 사이에서 중립외교 노선을 취하였으며 전후 복구와 대동법의 실시 등 여러 정책을 실시하였지만, 잦은 옥사와 중립외교, 이복동생인 영창대군을 죽이고 인목왕후를 유폐한 일로 인해 서인이 주도한 인조반정에 의해 폐위되었다. 연산군에 이어 반정으로 인해 폐위된 세 번째 왕이기도 하다.`,
      en:`Gwanghaegun (光海君)
Dates: June 4, 1575 – August 7, 1641
Biography: Gwanghaegun was the 15th king of Joseon (reigned 1608–1623). He was appointed Crown Prince during the Imjin War and led the righteous armies in the Bunjo. After ascending the throne, he pursued a policy of neutrality between the Later Jin and Ming dynasties, implementing various policies such as post-war reconstruction and the implementation of the Daedongbeop. However, due to frequent political purges, his policy of neutrality, and the killing of his half-brother, Grand Prince Yeongchang, and the imprisonment of Queen Inmok, he was deposed by the Injo Restoration led by the Westerners. He was the third king to be deposed by a coup, following Yeonsangun.`,
      jp:`光海君(クァンヘグン)
生没年: 1575年6月4日 - 1641年8月7日
列伝: 朝鮮の第15代国王(在位: 1608年 - 1623年)。壬辰倭乱の際に世子に冊封され、分조して義兵を率いた。即位後、後金と明の間で中立外交路線をとり、戦後復旧と大同法の実施など多くの政策を実施したが、度重なる玉座事件、中立外交、異母弟の永昌大君を殺害し仁穆王后を幽閉したことなどから、西人が主導した仁祖反正により廃位された。燕山君に続き、反正により廃位された3番目の王でもある。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":42,"na1":{
      ko:"김시민",
      en:"Kim Si-min",
      jp:"金時敏"
    },"na2":{
      ko:"면오",
      en:"Myeon-o",
      jp:"勉吾"
    },"na3":{
      ko:"진주대첩",
      en:"Jinju-daechup",
      jp:"晋州大捷"
    },
    "display":42,"style":105,"animal_type":3,"face_d":"center","element":[7],"grade":6,"job":[13,3],"cost":7,
    "st0":94,"st1":181,"st2":180,"st3":70,"st4":155,"st5":70,"st6":94,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`김시민(金時敏)
생몰년: 1554년 9월 23일(음력 8월 27일) ~ 1592년 11월 21일(음력 10월 18일)
열전: 조선 중기의 무신이다. 본관은 (구)안동, 자는 면오(勉吾), 시호는 충무(忠武)이다. 고려 때 충렬공(忠烈公) 김방경(金方慶)의 13대손이자 지평(持平) 김충갑(金忠甲)의 셋째 아들이다.`,
      en:`Kim Si-min (金時敏)
Dates: September 23, 1554 – November 21, 1592
Biography: Kim Si-min was a military officer of the Joseon Dynasty during the Imjin War. His clan origin was (former) Andong, his courtesy name was Myeon-o, and his posthumous title was Chungmu. He was the 13th generation descendant of Kim Bang-gyeong, a meritorious subject of the Goryeo Dynasty, and the third son of Kim Chung-gap, a Jipyeong. `,
      jp:`金時敏(キム・シミン)
生没年: 1554年9月23日 - 1592年11月21日
列伝: 朝鮮中期の武臣。本貫は(旧)安東、字は勉吾、諡号は忠武。高麗時代の忠烈公金方慶の13代孫であり、持平金忠甲の三男である。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":43,"na1":{
      ko:"곽재우",
      en:"Gwak Jae-u",
      jp:"郭再祐"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"홍의장군",
      en:"Hong-ui-janggun",
      jp:"紅衣将軍"
    },
    "display":43,"style":105,"animal_type":4,"face_d":"center","element":[10],"grade":6,"job":[13,8],"cost":7,
    "st0":88,"st1":160,"st2":173,"st3":90,"st4":177,"st5":65,"st6":86,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`곽재우(郭再祐)
생몰년: 1552년 9월 16일(음력 8월 28일) ~ 1617년 5월 14일(음력 4월 10일)
열전: 조선 중기의 무신, 정치인, 군인으로 임진왜란당시 진주성전투, 화왕산성전투에 크게 활약한 의병장이다. 34세 때 문과 대과에 급제하였으나, 선조를 비판한 답안지로 선조의 명에 의해 합격이 취소되고, 이후 벼슬에 뜻을 버리고, 40세가 되도록 고향에서 학문과 낚시질로 세월을 보내고 있었다. 1592년(선조 25년) 4월 임진왜란이 일어나고 관군이 왜군에게 전멸당하자, 당시 고향인 경남 의령에서 스스로 의병을 조직, 붉은 비단으로 된 갑옷을 입고 활동하여 천강홍의장군(天降紅衣將軍)이라는 별명을 얻었으며 그의 용맹성에 놀란 왜병들은 곽재우의 이름만 들어도 두려워했다 한다. 여러번 승리한 공로로 찰방, 조방장 등을 지낸뒤 병마절도사를 역임했다.`,
      en:`Gwak Jae-u (郭再祐)
Dates: September 16, 1552 – May 14, 1617
Biography: Gwak Jae-u was a military officer, politician, and soldier of the Joseon Dynasty during the Imjin War, who played a significant role in the battles of Jinju Fortress and Hwawangsan Fortress. At the age of 34, he passed the civil service examination, but his answer, which criticized King Seonjo, led to the cancellation of his acceptance by the king's order. He then gave up his ambition for an official career and spent his time studying and fishing in his hometown until he was 40. In April 1592, when the Imjin War broke out and the government forces were annihilated by the Japanese army, he organized a righteous army in his hometown of Uiryeong, Gyeongsang Province. He wore red silk armor, earning him the nickname "Cheon-gang Hong-ui Jang-gun" (Red-Clad General Descending from Heaven). The Japanese soldiers were reportedly terrified at the mere mention of his name due to his bravery. He was appointed to various positions, including Chalbang and Jobangjang, and later served as Byeongma-jeoldosa (Provincial Commander).`,
      jp:`郭再祐(クァク・チェウ)
生没年: 1552年9月16日 - 1617年5月14日
列伝: 朝鮮中期の武臣、政治家、軍人として、壬辰倭乱当時、晋州城の戦い、華王山の戦いで大いに活躍した義兵長である。34歳で科挙の大科に合格したが、宣祖を批判した答案により宣祖の命で合格が取り消され、その後、官職に意欲を失い、40歳になるまで故郷で学問と釣りをしながら過ごしていた。1592年(宣祖25年)4月、壬辰倭乱が勃発し、官軍が倭軍に全滅させられると、当時の故郷である慶南義령で自ら義兵を組織し、赤い絹の鎧を着て活動し、天降紅衣将軍という別名を得た。その勇猛さに驚いた倭兵たちは郭再祐の名前を聞くだけで恐れたという。度重なる勝利の功労で찰방、 조방장などを歴任した後、兵馬節度士を務めた。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":44,"na1":{
      ko:"정기룡",
      en:"Jeong Gi-ryong",
      jp:"鄭起龍"
    },"na2":{
      ko:"경운",
      en:"Gyeong-un",
      jp:"景雲"
    },"na3":{
      ko:"임진왜란의 조자룡",
      en:"Imjin-waeran-ui Jo-ja-ryong",
      jp:"壬辰倭乱の趙子龍"
    },
    "display":44,"style":105,"animal_type":2,"face_d":"center","element":[11],"grade":6,"job":[13,5],"cost":7,
    "st0":96,"st1":190,"st2":186,"st3":89,"st4":138,"st5":44,"st6":86,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`정기룡(鄭起龍)
생몰년: 1562년 5월 26일(음력 4월 24일) ~ 1622년 4월 8일(음력 2월 28일)
열전: 조선의 무신이다. 본관은 진양(晋陽). 자는 경운(景雲), 호는 매헌(梅軒), 아명은 무수(茂壽)이다. 시호는 충의(忠毅)이다.`,
      en:`Jeong Gi-ryong (鄭起龍)
Dates: May 26, 1562 – April 8, 1622
Biography: Jeong Gi-ryong was a military officer of the Joseon Dynasty. His clan origin was Jin-yang, his courtesy name was Gyeong-un, his pen name was Mae-heon, and his childhood name was Mu-su. His posthumous title was Chung-ui.`,
      jp:`鄭起龍(チョン・ギリョン)
生没年: 1562年5月26日 - 1622年4月8日
列伝: 朝鮮の武臣。本貫は晋陽、字は景雲、号は梅軒、幼名は茂壽。諡号は忠毅。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":45,"na1":{
      ko:"이항복",
      en:"Yi Hang-bok",
      jp:"李恒福"
    },"na2":{
      ko:"자상",
      en:"Ja-sang",
      jp:"子常"
    },"na3":{
      ko:"오성",
      en:"Oseong",
      jp:"梧城"
    },
    "display":45,"style":105,"animal_type":8,"face_d":"left","element":[12],"grade":4,"job":[4],"cost":7,
    "st0":70,"st1":133,"st2":112,"st3":41,"st4":181,"st5":84,"st6":83,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`이항복(李恒福)
생몰년: 1556년 ~ 1618년 7월 4일(음력 5월 13일)
열전: 조선 승정원(대통령비서실) 동부승지(국토교통부) 겸 당상관(국장급 공무원) 등을 거쳐 조선 의정부 영의정(국무총리) 직책을 지낸 조선 중기의 문신·정치가·시인·작가이다. 주로 잘 알려져있는 오성과 한음 대감 중 '오성'이다.`,
      en:`Yi Hang-bok (李恒福)
Dates: 1556 – July 4, 1618
Biography: Yi Hang-bok was a Joseon Dynasty civil official, politician, poet, and writer who served in various positions, including Dongbusungji (Assistant Minister of the Secretariat) and later as Yeonguijeong (Chief State Councilor). He is well-known as "Oseong" from the famous story of "Oseong and Han-eum".`,
      jp:`李恒福(イ・ハンボク)
生没年: 1556年 - 1618年7月4日
列伝: 朝鮮の 승정원(大統領秘書室) 東部承旨(国土交通部) 兼 당상官(国長級公務員) などを経て、朝鮮 議政府 領議政(国務総理)の職を務めた朝鮮中期の文臣・政治家・詩人・作家である。主に知られている五星と韓陰大監のうち「五星」である。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":46,"na1":{
      ko:"이덕형",
      en:"Yi Deok-hyeong",
      jp:"李徳馨"
    },"na2":{
      ko:"명보",
      en:"Myeong-bo",
      jp:"明甫"
    },"na3":{
      ko:"한음",
      en:"Han-eum",
      jp:"漢陰"
    },
    "display":46,"style":105,"animal_type":8,"face_d":"left","element":[10],"grade":4,"job":[4],"cost":7,
    "st0":65,"st1":127,"st2":100,"st3":48,"st4":178,"st5":92,"st6":84,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`이덕형(李德馨)
생몰년: 1561년 ~ 1613년
열전: 조선의 문신이다. 본관은 광주이며, 이극균의 현손이다. 자는 명보(明甫), 호는 한음(漢陰)·쌍송(雙松)·포옹산인(抱雍散人)이다. 이항복하고 함께 '오성과 한음'에서 한음대감으로 유명하다. 선조하고 광해군 때 영의정(국무총리)을 역임하였다. 1608년(광해군 즉위) 정운원종공신 1등(定運功臣一等)에 책록되고, 1614년(광해군 6년) 8월 27일 위성원종공신 1등(衛聖原從功臣)에 책록되었다. 시호는 문익(文翼)이다.`,
      en:`Yi Deok-hyeong (李德馨)
Dates: 1561 – 1613
Biography: Yi Deok-hyeong was a Joseon Dynasty civil official. His clan origin was Gwangju, and he was a descendant of Yi Geuk-gyeong. His courtesy name was Myeong-bo, and his pen names were Han-eum, Ssang-song, and Po-ongsan-in. He is famous as "Han-eum" from the story of "Oseong and Han-eum" with Yi Hang-bok. He served as Yeonguijeong (Chief State Councilor) during the reigns of King Seonjo and King Gwanghae. In 1608 (the first year of King Gwanghae's reign), he was appointed as a first-class Jeong-un Wonjong Gongsin (Meritorious Subject for Establishing the Dynasty), and on August 27, 1614 (the sixth year of King Gwanghae's reign), he was appointed as a first-class Wi-seong Wonjong Gongsin (Meritorious Subject for Defending the King). His posthumous title was Mun-ik.`,
      jp:`李徳馨(イ・ドクヒョン)
生没年: 1561年 - 1613年
列伝: 朝鮮の文臣。本貫は光州であり、李極均の玄孫である。字は明甫、号は漢陰・双松・抱雍散人である。李恒福と共に「五星と韓陰」で韓陰大監として有名である。宣祖と光海君の時代に領議政(国務総理)を務めた。1608年(光海君即位) 定運功臣一等に 책록され、1614年(光海君6年) 8月27日 衛聖原從功臣一等に 책록された。諡号は文翼である。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":47,"na1":{
      ko:"이연",
      en:"Yi Yeon",
      jp:"李昖"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"선조",
      en:"Seonjo",
      jp:"宣祖"
    },
    "display":47,"style":105,"animal_type":7,"face_d":"left","element":[12],"grade":3,"job":[0,1],"cost":7,
    "st0":60,"st1":143,"st2":93,"st3":73,"st4":159,"st5":88,"st6":11,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`선조(宣祖)
생몰년: 1552년 11월 26일 (음력 11월 11일) ~ 1608년 3월 16일 (음력 2월 1일)
열전: 조선의 제14대 국왕(재위 : 1567년 음력 7월 3일 - 1608년 음력 2월 1일)이다. 휘는 연(昖), 초명은 균(鈞), 본관은 전주(全州)이며, 즉위전의 작호는 하성군(河城君)이었다.`,
      en:`King Seonjo (宣祖)
Dates: November 26, 1552 – March 16, 1608
Biography: King Seonjo was the 14th king of the Joseon Dynasty, reigning from July 3, 1567, to February 1, 1608. His personal name was Yeon, originally Kyun, and his clan origin was Jeonju. Before his enthronement, he held the title of Haseong-gun.`,
      jp:`宣祖(ソンジョ)
生没年: 1552年11月26日 - 1608年3月16日
列伝: 朝鮮の第14代国王(在位: 1567年7月3日 - 1608年2月1日)である。諱は昖、初名は鈞、本貫は全州であり、即位前の爵号は河城君であった。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":48,"na1":{
      ko:"정발",
      en:"Jeong Bal",
      jp:"鄭撥"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"흑의장군",
      en:"Heug-ui Jang-gun",
      jp:"黒衣将軍"
    },
    "display":48,"style":105,"animal_type":6,"face_d":"center","element":[9],"grade":3,"job":[3],"cost":7,
    "st0":83,"st1":159,"st2":171,"st3":67,"st4":109,"st5":44,"st6":77,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`정발(鄭撥)
생몰년: 1553년 ~ 1592년 5월 23일(음력 4월 13일)
열전: 조선 중기의 무신이다.1579년(선조 12년) 무과에 급제해 해남현감, 거제현령, 북정원수 종사관, 거제현령, 비변사낭관, 위원군수, 훈련원첨정, 사복시첨정 등을 지내고 임진왜란 당시의 벼슬이 정3품 행 절충장군 경상좌도 부산진 수군첨절제사에 이르렀다. 1592년(선조 25년) 4월 사냥 중 일본군의 침략 소식을 접하고 임진왜란 초기에 벌어진 부산진 전투에서 분전하던 중 왜군의 총에 맞고 전사하였다. 사후 증 병조판서에 증직되고 불천위(不遷位)에 지정되었으며 뒤에 의정부좌찬성겸 의금부판사에 추증되었다. 본관은 경주(慶州)이고, 자(字)는 자고(子固) 또는 자주(子周), 호는 백운(白雲), 시호는 충장(忠壯)이다. 별칭은 흑의장군이다. 경기도 출신.`,
      en:`Jeong Bal (鄭撥)
Dates: 1553 – May 23, 1592
Biography: Jeong Bal was a military officer of the Joseon Dynasty during the mid-Joseon period. He passed the military examination in 1579 (the 12th year of King Seonjo's reign) and served in various positions, including Haenam-hyeon-gam, Geoje-hyeon-ryeong, Bukjeong-wonsu Jongsa-gwan, Geoje-hyeon-ryeong, Bibyeonsa-nang-gwan, Wewon-gunsu, Hullyeonwon-cheomjeong, and Saboksi-cheomjeong. During the Imjin War, he held the position of third-rank acting Jeolcheungjanggun, Busanjin Sugun-cheomjeolsa of the Gyeongsang-jwado region. In April 1592 (the 25th year of King Seonjo's reign), while hunting, he received news of the Japanese invasion. In the early stages of the Imjin War, he fought bravely in the Battle of Busan-jin but was killed by a Japanese gunshot. Posthumously, he was promoted to Byeongjo-panseo and designated as a permanent memorial subject (Bulcheonwi). Later, he was posthumously honored as Uijeongbu-jwachanseong-gyeom Uigeumbu-panseo. His clan origin was Gyeongju, his courtesy name was Jago or Jaju, his pen name was Baek-un, and his posthumous title was Chungjang. He was also known as the "Black-Clad General" and was from Gyeonggi Province.`,
      jp:`鄭撥(チョン・バル)
生没年: 1553年 - 1592年5月23日
列伝: 朝鮮中期の武臣。1579年(宣祖12年) 武科に合格し、海南県監、巨済県令、北征元帥従事官、巨済県令、備辺司낭官、渭源郡守、訓練院 첨정、司僕寺 첨정などを歴任し、壬辰倭乱当時の官職は正3品 行 절충将軍 慶尚左道 釜山鎮 水軍節度使に達した。1592年(宣祖25年)4月、狩猟中に日本軍の侵略の知らせを受け、壬辰倭乱初期に起こった釜山鎮の戦いで奮戦中に倭軍の銃に当たり戦死した。死後、贈 兵曹判書に追贈され、不遷位に指定され、後に議政府左찬성兼義禁府判事に 추증された。本貫は慶州であり、字は子固または子周、号は白雲、諡号は忠壮である。別称は黒衣将軍である。京畿道出身。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":49,"na1":{
      ko:"송상현",
      en:"Song Sang-hyeon",
      jp:"宋象賢"
    },"na2":{
      ko:"천곡",
      en:"Cheon-gok",
      jp:"天谷"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":49,"style":105,"animal_type":4,"face_d":"center","element":[10],"grade":4,"job":[3,5],"cost":7,
    "st0":84,"st1":160,"st2":152,"st3":75,"st4":145,"st5":64,"st6":84,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`송상현(宋象賢)
생몰년: 1551년 2월 12일(음력 1월 8일) ~ 1592년 5월 25일(음력 4월 15일)
열전: 조선 중기의 문신, 작가이며 임진왜란 때의 장수이다. 임진왜란 초기 동래성 전투에서 고니시 유키나가의 군과 교전하다가 패전 살해되었다. 왜적은 그를 포로로 사로잡아 항복을 강요하였으나 항복하지 않자 처참하게 살해하였다. 자는 덕구(德求), 호는 천곡(泉谷)·한천(寒泉)이며 시호는 충렬(忠烈)이다. 본관은 여산(礪山)이다.`,
      en:`Song Sang-hyeon (宋象賢)
Dates: February 12, 1551 – May 25, 1592
Biography: Song Sang-hyeon was a Joseon Dynasty civil official, writer, and general during the Imjin War. In the early stages of the Imjin War, he fought against Konishi Yukinaga's army in the Battle of Dongnae Fortress and was killed after the defeat. The Japanese captured him and demanded his surrender, but he refused and was brutally killed. His courtesy name was Deok-gu, his pen names were Cheon-gok and Han-cheon, and his posthumous title was Chung-ryeol. His clan origin was Yeo-san.`,
      jp:`宋象賢(ソン・サンヒョン)
生没年: 1551年2月12日 - 1592年5月25日
列伝: 朝鮮中期の文臣、作家であり、壬辰倭乱時の将軍である。壬辰倭乱初期の東莱城の戦いで小西行長の軍と交戦し、敗戦後殺害された。倭敵は彼を捕虜として降伏を強要したが、降伏しなかったため惨殺された。字は徳求、号は泉谷・寒泉であり、諡号は忠烈である。本貫は礪山である。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":50,"na1":{
      ko:"박진",
      en:"Park Jin",
      jp:"朴進"
    },"na2":{
      ko:"명보",
      en:"Myeong-bo",
      jp:"明甫"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":50,"style":105,"animal_type":4,"face_d":"center","element":[9],"grade":4,"job":[3],"cost":7,
    "st0":90,"st1":162,"st2":170,"st3":72,"st4":153,"st5":70,"st6":75,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`박진(朴晉)
생몰년: 1560년 8월 25일 ~ 1597년 3월
열전: 무신, 군인으로, 여러 전투에 참가해 공을 세워 벼슬을 지냈다. 초기의 밀양성 전투에서는 패배하였으나 영천성에서 의병 주도로 벌어진 영천성 전투를 지원하여 승전을 거두었고 이후 왜적 111명의 수급을 베어 왕에게 올렸으며, 제2차 경주성 전투에서 승리를 거두었다. 이후 동지중추부사, 1594년 경상우도병마절도사, 순천부사, 그 뒤 전라도병마절도사 등을 거쳐 1596년 황해도병마절도사 겸 황주목사를 지냈다. 일본군 장수 사야가는 그를 만나 조선으로 귀순하였다. 사후 증 병조판서에 증직되고 응천군(凝川君)에 추봉되었으며, 후에 다시 의정부좌찬성에 추증되었다. 본관은 밀양, 자는 명보(明甫) 또는 명부(明夫), 여회(汝晦), 시호는 의열(毅烈)이다. 정유길(鄭惟吉)의 문인이다. 경상남도 출신`,
      en:`Park Jin (朴晉)
Dates: August 25, 1560 – March 1597
Biography: Park Jin was a military officer and soldier who served in various battles and was rewarded with official positions. In the early Battle of Miryang Fortress, he was defeated, but he supported the Battle of Yeongcheon Fortress, which was led by righteous armies, and achieved victory. He later presented 111 enemy heads to the king and won the Second Battle of Gyeongju Fortress. Afterward, he served as Dongjijungchubusa, and in 1594, he became Gyeongsang-udo Byeongma-jeoldosa, Suncheon-busa, and then Jeolla-do Byeongma-jeoldosa. In 1596, he served as Hwanghae-do Byeongma-jeoldosa and Hwangju-moksa. The Japanese general Ssaya met him and defected to Joseon. Posthumously, he was honored as Byeongjo-panseo and enfeoffed as Eungcheon-gun. Later, he was posthumously honored as Uijeongbu-jwachanseong. His clan origin was Miryang, his courtesy names were Myeong-bo or Myeong-bu, Yeo-hoe, and his posthumous title was Ui-yeol. He was a disciple of Jeong Yu-gil and was from Gyeongsangnam-do.`,
      jp:`朴晋(パク・ジン)
生没年: 1560年8月25日 - 1597年3月
列伝: 武臣、軍人として、数々の戦闘に参加し、功を立てて官職を務めた。初期の密陽城の戦いでは敗北したが、義兵主導で行われた英川城の戦いを支援して勝利を収め、その後、倭敵111人の首級を斬って王に捧げ、第2次慶州城の戦いで勝利を収めた。その後、同知中枢府事、1594年慶尚右道兵馬節度使、順天府使、その後全羅道兵馬節度使などを経て、1596年黄海道兵馬節度使兼黄州牧使を務めた。日本軍の将軍沙也可は彼に会い、朝鮮に帰順した。死後、贈 兵曹判書に追贈され、応川君に 추봉され、後に再び議政府左찬성に 추증された。本貫は密陽、字は明甫または明夫、余会、諡号は義烈である。鄭惟吉の門人である。慶尚南道出身`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":51,"na1":{
      ko:"정문부",
      en:"Jeong Mun-bu",
      jp:"鄭文孚"
    },"na2":{
      ko:"자허",
      en:"Ja-heo",
      jp:"子虚"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":51,"style":105,"animal_type":3,"face_d":"center","element":[10],"grade":4,"job":[3,10],"cost":7,
    "st0":86,"st1":170,"st2":166,"st3":65,"st4":158,"st5":66,"st6":72,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`정문부(鄭文孚)
생몰년: 1565년 3월 20일(음력 2월 19일) ~ 1624년 12월 28일(음력 11월 19일)
열전: 조선 중기의 문신이자, 임진란 일등 공신 우찬성 대제학 의병장이다. 본관은 해주(海州)이며, 자는 자허(子虛), 호는 농포(農圃), 시호는 충의(忠毅)이다. 기념비로 북관대첩비가 있다.`,
      en:`Jeong Mun-bu (鄭文孚)
Dates: March 20, 1565 – December 28, 1624
Biography: Jeong Mun-bu was a Joseon Dynasty civil official, a first-class meritorious subject of the Imjin War, and a righteous army leader who held the positions of Uichanseong and Daejehak. His clan origin was Haeju, his courtesy name was Jaho, his pen name was Nongpo, and his posthumous title was Chungui. The Bukgwan Daecheopbi (Northern Campaign Victory Stele) was erected in his honor.`,
      jp:`鄭文孚(チョン・ムンブ)
生没年: 1565年3月20日 - 1624年12月28日
列伝: 朝鮮中期の文臣であり、壬辰倭乱一等功臣、右찬성、大提学、義兵長である。本貫は 해주であり、字は子虚、号は農圃、諡号は忠毅である。記念碑として北関大捷碑がある。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":52,"na1":{
      ko:"김성일",
      en:"Kim Seong-il",
      jp:"金誠一"
    },"na2":{
      ko:"사순",
      en:"Sa-sun",
      jp:"士純"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":52,"style":105,"animal_type":3,"face_d":"right","element":[9],"grade":4,"job":[1,6],"cost":7,
    "st0":50,"st1":95,"st2":68,"st3":24,"st4":179,"st5":87,"st6":64,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`김성일(金誠一)
생몰년: 1538년 ~ 1593년
열전: 조선 중기의 문신이자 외교관, 학자이다. 본관은 의성, 호는 학봉(鶴峰), 자는 사순(士純)이다. 퇴계 이황의 제자. 시호는 문충공 서애 류성룡과 함께 퇴계의 주리론 학문을 이어받은 수제자로 영남학파의 중추 구실을 했다. 1590년 일본에 통신사 부사로 갔다와서 일본이 침략을 하지 않을 것이라는 잘못된 판단을 하여 보고함으로써 임진왜란 발발 이후 큰 비판을 받았다. 임진왜란 때 초유사로에 임명되어 경상우도관찰사 겸 순찰사를 역임하다 1593년 진주성에서 병사하였다. 안동에 자리한 학봉종택은 안동의 대표적인 양반가옥의 전형으로 유명하다. 특히 학봉 문중에서는 학봉이 남긴 '3년동안 금부도사가 찾아오지 않으면 선비 집안이 아니다.'라는 말을 가훈으로 여겨 왕에게 직언을 하는 문중으로 영남 유림의 중심 문중이 되었다. 1591년(선조 24) 종계변무가 성사되었을 때 그는 광국원종공신 1등의 한 사람으로 특별히 책록되었다. 임진왜란 당시 진주성 전투에서 초유사로 활약하다 병사한 공로로 사후 선무원종공신 1등관에 추서되었다.`,
      en:`Kim Seong-il (金誠一)
Dates: 1538 – 1593
Biography: Kim Seong-il was a Joseon Dynasty civil official, diplomat, and scholar during the mid-Joseon period. His clan origin was Uiseong, his pen name was Hakbong, and his courtesy name was Sajun. He was a disciple of Toegye Yi Hwang. His posthumous title was Munjongong. Along with Seoae Ryu Seong-ryong, he was a top disciple who inherited Toegye's Ju-ri-ron (theory of principle) philosophy and played a central role in the Yeongnam school of Neo-Confucianism. In 1590, he returned from a mission to Japan as the vice-envoy of the Joseon diplomatic mission to Japan. He was later heavily criticized after the outbreak of the Imjin War for his incorrect assessment that Japan would not invade. During the Imjin War, he was appointed as Choyu-sa and served as the governor of Gyeongsang-udo and巡察使 (Suncheolsa). He died of illness at Jinju Fortress in 1593. Hakbong's ancestral house in Andong is famous as a typical example of a noble Joseon-era residence. In particular, the Hakbong clan considers the saying left by Hakbong, "If a royal envoy does not visit for three years, it is not a scholar's family," as their family motto, making them a central clan of the Yeongnam Confucian scholars known for their direct admonitions to the king. In 1591 (the 24th year of King Seonjo's reign), when the Jonggye-byeonmu (the rectification of the royal lineage records) was achieved, he was specially recorded as one of the first-class Gwangguk-wonjonggongsin (meritorious subjects for the protection of the state). After his death, he was posthumously honored as a first-class Seonmu-wonjonggongsin for his contributions during the Jinju Fortress battles in the Imjin War.`,
      jp:`金誠一(キム・ソンイル)
生没年: 1538年 - 1593年
列伝: 朝鮮中期の文臣であり、外交官、学者である。本貫は義城、号は鶴峰、字は士純である。退渓 李滉の弟子。諡号は文忠公。西厓 柳成龍と共に退渓の主理論学問を受け継いだ首席弟子として嶺南学派の中心的な役割を果たした。1590年、日本に通信使副使として行った後、日本が侵略をしないだろうという誤った判断をして報告したため、壬辰倭乱勃発後に大きな批判を受けた。壬辰倭乱の際、初余使に任命され、慶尚右道観察使兼巡察使を務め、1593年晋州城で病死した。安東にある鶴峰宗宅は、安東の代表的な両班家屋の典型として有名である。特に鶴峰一族では、鶴峰が残した「3年間禁府都事（王の密命を受けた官僚）が訪ねてこなければ、それは 선비（士大夫）の家ではない」という言葉を家訓とし、王に直言する一族として嶺南儒林の中心的な一族となった。1591年(宣祖24年) 宗系変舞が成就した際、彼は光国原宗功臣1等の1人として特別に記録された。壬辰倭乱当時、晋州城の戦いで初余使として活躍하다 병사한功労で死後、宣武原宗功臣1等官に추서された。`,
    },
    "region":"korea1","period":6,"scenarioRegion":""
  },
  {
    "idx":53,"na1":{
      ko:"신립",
      en:"Sin Rip",
      jp:"申砬"
    },"na2":{
      ko:"입지",
      en:"Ip-ji",
      jp:"立之"
    },"na3":{
      ko:"",
      en:"",
      jp:""
    },
    "display":53,"style":105,"animal_type":3,"face_d":"center","element":[8],"grade":3,"job":[3,15],"cost":7,
    "st0":80,"st1":147,"st2":172,"st3":55,"st4":101,"st5":46,"st6":71,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`신립(申砬)
생몰년: 1546년 11월 16일(음력 10월 23일) ~ 1592년 6월 7일(음력 4월 28일)
열전: 조선의 무신이다. 신숭겸의 후손으로 본관은 평산(平山)이며, 자는 입지(立之)이다. 무과에 급제하여 오위도총부와 진주판관, 한성판윤(정2품) 등을 지냈다. 임진왜란 첫 해에 충주 탄금대에서 배수진을 펼치고 왜군과 싸우다 전사한 장군이다. 시호는 충장(忠壯)이다. 인조반정에 가담한 서인 신경진과 신경인 형제의 아버지이며, 신경희의 옥사로 죽은 신경희의 숙부이다. 대한민국의 독립운동가 겸 정치인인 해공 신익희에게는 13대조가 된다.`,
      en:`Shin Rip (申砬)
Dates: November 16, 1546 – June 7, 1592
Biography: Shin Rip was a military officer of the Joseon Dynasty. A descendant of Shin Sung-gyeom, his clan origin was Pyeongsan, and his courtesy name was Ipji. He passed the military examination and served in various positions, including the Five Garrisons Command, Jinju-pan-gwan, and Hanseong-pan-yoon (second-rank). He was a general who fought and died in the Battle of Chungju Tangeumdae, where he made a last stand (baesu-jin) against the Japanese army in the first year of the Imjin War. His posthumous title was Chungjang. He was the father of the Seoin brothers Shin Gyeong-jin and Shin Gyeong-in, who participated in the Injo Restoration, and the uncle of Shin Gyeong-hui, who died in the Shin Gyeong-hui incident. He is the 13th-generation ancestor of Shin Ik-hui, a Korean independence activist and politician. `,
      jp:`申砬(シン・リップ)
生没年: 1546年11月16日 - 1592年6月7日
列伝: 朝鮮の武臣である。申崇謙の子孫で、本貫は平山であり、字は立之である。武科に合格し、五衛都総府と晋州判官、漢城判尹(正2品)などを歴任した。壬辰倭乱の最初の年に忠州弾琴台で背水陣を敷いて倭軍と戦い戦死した将軍である。諡号は忠壮である。仁祖反正に加担した西人申景禛と申景仁兄弟の父であり、申景희の獄事で死んだ申景희の叔父である。大韓民国の独立運動家兼政治家である海公申翼熙には13代祖となる。`,
    },
    "region":"korea0","period":6,"scenarioRegion":""
  },
  {
    "idx":54,"na1":{
      ko:"호리우치 우지요시",
      en:"Horiuchi Ujiyoshi",
      jp:"堀内氏善"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(堀内氏善)",
      en:"(Horiuchi Ujiyoshi)",
      jp:""
    },
    "display":54,"style":105,"animal_type":6,"face_d":"right","element":[12],"grade":2,"job":[3,14],"cost":7,
    "st0":61,"st1":130,"st2":111,"st3":59,"st4":103,"st5":50,"st6":48,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`호리우치 우지요시(堀内氏善)
생몰년: 1549년 ~ 1615년 5월 7일
열전: 센고쿠 시대부터 에도 시대 초기까지 활약한 무장이다. 구마노 수군(熊野水軍)의 장수.`,
      en:`Horiuchi Ujiyoshi (堀内氏善)
Dates: 1549 – May 7, 1615
Biography: Horiuchi Ujiyoshi was a Japanese military commander who was active from the Sengoku period to the early Edo period. He was a commander of the Kumano Navy (熊野水軍).`,
      jp:`堀内氏善(ホリウチ・ウジヨシ)
生没年: 1549年 - 1615年5月7日
列伝: 戦国時代から江戸時代初期にかけて活躍した武将である。熊野水軍の将帥。`,
    },
    "region":"japan1","period":6,"scenarioRegion":""
  },
  {
    "idx":55,"na1":{
      ko:"나대용",
      en:"Na Dae-yong",
      jp:"羅大用"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"선박기술자",
      en:"Shipbuilder",
      jp:"造船技術者"
    },
    "display":55,"style":"","animal_type":23,"face_d":"left","element":[9],"grade":4,"job":[3,16],"cost":7,
    "st0":70,"st1":170,"st2":159,"st3":68,"st4":162,"st5":68,"st6":77,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`나대용(羅大用)
생몰년: 1556년 ~ 1612년
열전: 조선 중기의 무관이며, 거북선의 건조와 병기류 제조에 기여하였다. 과거 급제후 교동수사에 이르렀다. 전라도 나주 출신으로 본관은 금성(錦城)이다.`,
      en:`Na Dae-yong (羅大用)
Dates: 1556 – 1612
Biography: Na Dae-yong was a military officer of the Joseon Dynasty who contributed to the construction of the Turtle Ship and the manufacture of weaponry. After passing the state examination, he rose to the position of Gyodong-susa. He was from Naju, Jeolla Province, and his clan origin was Geumseong. `,
      jp:`羅大用(ナ・デヨン)
生没年: 1556年 - 1612年
列伝: 朝鮮中期の武官であり、亀甲船の建造と兵器類の製造に貢献した。科挙合格後、 교동수사(官職名)に至った。全羅道羅州出身で、本貫は金城である。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":56,"na1":{
      ko:"허준",
      en:"Heo Jun",
      jp:"許浚"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"신의",
      en:"Divine Doctor",
      jp:"神医"
    },
    "display":56,"style":"","animal_type":6,"face_d":"left","element":[7],"grade":5,"job":[15,12],"cost":7,
    "st0":54,"st1":112,"st2":71,"st3":39,"st4":181,"st5":80,"st6":90,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`허준(許浚)
생몰년: 1539년 ~ 1615년 10월 9일
열전: 조선 중기의 의관·의학자이다. 동의보감을 작성하였으며, 동의보감 외에도 선조의 명을 받아 임진왜란 종결 후, 각종 중국의서와 기존 의서의 복원, 편찬 및 정리에 힘썼다. 그밖에도 한글로 된 의서인 《언해두창집요 (諺解痘瘡集要)》, 산부인과 관련 의서인 《언해태산집요》, 기본 가정의서인 《언해구급방 (諺解救急方)》 등도 집필하였다.`,
      en:`Heo Jun (許浚)
Dates: 1539 – October 9, 1615
Biography: Heo Jun was a Joseon Dynasty physician and medical scholar. He compiled the Dongui Bogam (Comprehensive Mirror of Eastern Medicine). In addition to the Dongui Bogam, he was ordered by King Seonjo after the end of the Imjin War to focus on restoring, compiling, and organizing various Chinese medical texts and existing medical books. He also wrote medical texts in Korean, such as the Eonhae Dujang Jipyo (Illustrated Guide to Smallpox), the Eonhae Taesan Jipyo (Illustrated Guide to Obstetrics), and the Eonhae Gugupbang (Illustrated Guide to Emergency Medicine), which served as a basic home medical guide. `,
      jp:`許浚(ホ・ジュン)
生没年: 1539年 - 1615年10月9日
列伝: 朝鮮中期の医官・医学者である。東医宝鑑を作成し、東医宝鑑以外にも宣祖の命を受け、壬辰倭乱終結後、各種中国の医書と既存の医書の復元、編纂及び整理に力を入れた。その他にもハングルで書かれた医書である《諺解痘瘡集要》、産婦人科関連の医書である《諺解胎産集要》、基本家庭医書である《諺解救急方》なども執筆した。`,
    },
    "region":"korea2","period":6,"scenarioRegion":""
  },
  {
    "idx":57,"na1":{
      ko:"도쿠이 미치유키",
      en:"Tokui Michiyuki",
      jp:"得居通幸"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"(得居通幸)",
      en:"(Tokui Michiyuki)",
      jp:""
    },
    "display":57,"style":"","animal_type":0,"face_d":"left","element":[9],"grade":3,"job":[3,17],"cost":7,
    "st0":68,"st1":133,"st2":140,"st3":55,"st4":131,"st5":36,"st6":59,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`도쿠이 미치유키(得居通幸)
생몰년: 1557년 ~ 1592년 음력 6월 2일
열전: 센고쿠 시대에서 아즈치모모야마 시대에 걸쳐 활약한 무장이다. 이요국 출신. 무라카미 수군(村上水軍)의 일족인 이요 무라카미 씨(伊予村上氏)의 당주 무라카미 미치야스(村上通康)의 차남이자 구루시마 미치후사(来島通総)의 형이다. 별명으로는 미치유키(通之), 미치후사(通久), 미치토시(通年)가 있다. 사촌으로는 무라카미 가게치카(村上景親)가 있다.`,
      en:`Tokui Michiyuki (得居通幸)
Dates: 1557 – June 2, 1592 (lunar)
Biography: Tokui Michiyuki was a Japanese military commander active from the Sengoku period to the Azuchi-Momoyama period. He hailed from Iyo Province. He was the second son of Murakami Michiyasu (村上通康), the head of the Iyo Murakami clan (伊予村上氏), which was a branch of the Murakami Navy (村上水軍), and the older brother of Kurushima Michifusa (来島通総). His nicknames included Michiyuki (通之), Michifusa (通久), and Michitoshi (通年). His cousin was Murakami Kagechika (村上景親).`,
      jp:`得居通幸(トクイ・ミチユキ)
生没年: 1557年 - 1592年6月2日(旧暦)
列伝: 戦国時代から安土桃山時代にかけて活躍した武将である。伊予国出身。村上水軍の一族である伊予村上氏の当主、村上通康の次男であり、来島通総の兄である。別名としては、通之、通久、通年がある。従兄弟には村上景親がいる。`,
    },
    "region":"japan1","country":0,"period":0,"scenarioRegion":""
  },
  {
    "idx":58,"na1":{
      ko:"율리우스 카이사르",
      en:"Julius Caesar",
      jp:"ユリウス・カエサル"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"종신 독재관",
      en:"Dictator for Life",
      jp:"終身独裁官"
    },
    "display":58,"style":"","animal_type":1,"face_d":"left","element":[7],"grade":7,"job":[0,1],"cost":20,
    "st0":117,"st1":172,"st2":172,"st3":77,"st4":190,"st5":96,"st6":96,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`가이우스 율리우스 카이사르(Gaius Julius Caesar)
생몰년: 기원전 100년 ~ 기원전 44년
열전: 로마 공화정 말기의 정치가이자 장군. 삼두정치를 이끌었으며 갈리아 원정을 성공시켰다. '주사위는 던져졌다', '왔노라, 보았노라, 이겼노라' 등의 명언을 남겼다.`,
      en:`Gaius Julius Caesar
Dates: 100 BC – 44 BC
Biography: Gaius Julius Caesar was a Roman politician and general during the late Roman Republic. He led the First Triumvirate and successfully conducted the Gallic Wars. He left behind famous quotes such as "The die is cast" and "I came, I saw, I conquered."`,
      jp:`ガイウス・ユリウス・カエサル(Gaius Julius Caesar)
生没年: 紀元前100年 - 紀元前44年
列伝: ローマ共和政末期の政治家であり将軍。三頭政治を率い、ガリア遠征を成功させた。「賽は投げられた」、「来た、見た、勝った」などの名言を残した。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":59,"na1":{
      ko:"그나이우스 폼페이우스",
      en:"Gnaeus Pompeius",
      jp:"グナエウス・ポンペイウス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"마그누스",
      en:"Magnus",
      jp:"大ポンペイウス"
    },
    "display":59,"style":"","animal_type":4,"face_d":"left","element":[9],"grade":5,"job":[2,13],"cost":17,
    "st0":101,"st1":165,"st2":175,"st3":75,"st4":170,"st5":85,"st6":85,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`그나이우스 폼페이우스 마그누스(Gnaeus Pompeius Magnus)
생몰년: 기원전 106년 ~ 기원전 48년
열전: 로마의 위대한 장군이자 정치가. 카이사르, 크라수스와 함께 제1차 삼두정치를 결성했다. 후에 카이사르와 대립하여 패하였다.`,
      en:`Gnaeus Pompeius Magnus
Dates: 106 BC – 48 BC
Biography: Gnaeus Pompeius Magnus was a great Roman general and politician. He formed the First Triumvirate with Caesar and Crassus. Later, he clashed with Caesar and was defeated.`,
      jp:`グナエウス・ポンペイウス・マグヌス(Gnaeus Pompeius Magnus)
生没年: 紀元前106年 - 紀元前48年
列伝: ローマの偉大な将軍であり政治家。カエサル、クラッススと共に第一次三頭政治を結成した。後にカエサルと対立し敗れた。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":60,"na1":{
      ko:"마르쿠스 리키니우스 크라수스",
      en:"Marcus Licinius Crassus",
      jp:"マルクス・リキニウス・クラッスス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"최고의 부자",
      en:"Richest Man",
      jp:"富豪"
    },
    "display":60,"style":"","animal_type":28,"face_d":"left","element":[10],"grade":4,"job":[11],"cost":12,
    "st0":70,"st1":110,"st2":115,"st3":55,"st4":150,"st5":93,"st6":80,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`마르쿠스 리키니우스 크라수스(Marcus Licinius Crassus)
생몰년: 기원전 115년 ~ 기원전 53년
열전: 로마의 정치가이자 장군. 로마 최고의 부자로 알려져 있으며, 스파르타쿠스의 반란을 진압했다. 파르티아 원정에서 전사했다.`,
      en:`Marcus Licinius Crassus
Dates: 115 BC – 53 BC
Biography: Marcus Licinius Crassus was a Roman politician and general. Known as the richest man in Rome, he suppressed the Spartacus rebellion. He died on an expedition to Parthia.`,
      jp:`マルクス・リキニウス・クラッスス(Marcus Licinius Crassus)
生没年: 紀元前115年 - 紀元前53年
列伝: ローマの政治家であり将軍。ローマ最高の富豪として知られ、スパルタクスの反乱を鎮圧した。パルティア遠征で戦死した。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":61,"na1":{
      ko:"마르쿠스 유니우스 브루투스",
      en:"Marcus Junius Brutus",
      jp:"マルクス・ユニウス・ブルートゥス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"고상한 로마인",
      en:"Noble Roman",
      jp:"高潔なローマ人"
    },
    "display":61,"style":"","animal_type":20,"face_d":"left","element":[11],"grade":3,"job":[3,5],"cost":13,
    "st0":75,"st1":116,"st2":118,"st3":69,"st4":165,"st5":77,"st6":89,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`마르쿠스 유니우스 브루투스(Marcus Junius Brutus)
생몰년: 기원전 85년 ~ 기원전 42년
열전: 로마의 정치가. 카이사르의 암살을 주도한 인물 중 하나로, '브루투스 너마저'라는 말로 유명하다.`,
      en:`Marcus Junius Brutus
Dates: 85 BC – 42 BC
Biography: Marcus Junius Brutus was a Roman politician. He was one of the leaders of the assassination of Caesar and is famous for the saying, "Et tu, Brute?" (You too, Brutus?).`,
      jp:`マルクス・ユニウス・ブルートゥス(Marcus Junius Brutus)
生没年: 紀元前85年 - 紀元前42年
列伝: ローマの政治家。カエサルの暗殺を主導した人物の一人であり、「ブルータス、お前もか」という言葉で有名である。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":62,"na1":{
      ko:"마르쿠스 안토니우스",
      en:"Marcus Antonius",
      jp:"マルクス・アントニウス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"충직한 군인",
      en:"Loyal Soldier",
      jp:"忠実な軍人"
    },
    "display":62,"style":"","animal_type":3,"face_d":"right","element":[10],"grade":4,"job":[2,10],"cost":15,
    "st0":86,"st1":170,"st2":172,"st3":73,"st4":134,"st5":66,"st6":88,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`마르쿠스 안토니우스(Marcus Antonius)
생몰년: 기원전 83년 ~ 기원전 30년
열전: 로마의 정치가이자 장군. 카이사르의 부관으로 활약했으며, 후에 클레오파트라와 연합하여 옥타비아누스와 대립했다.`,
      en:`Marcus Antonius
Dates: 83 BC – 30 BC
Biography: Marcus Antonius was a Roman politician and general. He served as an aide to Caesar and later allied with Cleopatra to oppose Octavian.`,
      jp:`マルクス・アントニウス(Marcus Antonius)
生没年: 紀元前83年 - 紀元前30年
列伝: ローマの政治家であり将軍。カエサルの副官として活躍し、後にクレオパトラと連合してオクタウィアヌスと対立した。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":63,"na1":{
      ko:"아우구스투스",
      en:"Augustus",
      jp:"アウグストゥス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"존엄한 자",
      en:"The Venerable",
      jp:"尊厳ある者"
    },
    "display":63,"style":"","animal_type":4,"face_d":"center","element":[7],"grade":6,"job":[0,12],"cost":20,
    "st0":100,"st1":120,"st2":136,"st3":40,"st4":190,"st5":99,"st6":87,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`가이우스 율리우스 카이사르 옥타비아누스 아우구스투스(Augustus)
생몰년: 기원전 63년 ~ 14년
열전: 로마 제국의 초대 황제. 팍스 로마나 시대를 열었다.`,
      en:`Gaius Julius Caesar Octavianus Augustus
Dates: 63 BC – 14 AD
Biography: The first emperor of the Roman Empire. He ushered in the Pax Romana era.`,
      jp:`ガイウス・ユリウス・カエサル・オクタウィアヌス・アウグストゥス(Augustus)
生没年: 紀元前63年 - 14年
列伝: ローマ帝国の初代皇帝。パクス・ロマーナ時代を開いた。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":64,"na1":{
      ko:"티투스 라비에누스",
      en:"Titus Labienus",
      jp:"ティトゥス・ラビエヌス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"기병 대장",
      en:"Cavalry Commander",
      jp:"騎兵隊長"
    },
    "display":64,"style":"","animal_type":20,"face_d":"right","element":[12],"grade":5,"job":[13,3],"cost":17,
    "st0":103,"st1":189,"st2":192,"st3":80,"st4":170,"st5":71,"st6":72,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`티투스 라비에누스(Titus Labienus)
생몰년: 기원전 100년 ~ 기원전 45년
열전: 로마의 장군. 갈리아 전쟁 당시 카이사르의 가장 신뢰받는 부관이었으나, 내전 때는 폼페이우스 편에 섰다.`,
      en:`Titus Labienus
Dates: 100 BC – 45 BC
Biography: Titus Labienus was a Roman general. During the Gallic Wars, he was Caesar's most trusted aide, but during the civil war, he sided with Pompey.`,
      jp:`ティトゥス・ラビエヌス(Titus Labienus)
生没年: 紀元前100年 - 紀元前45年
列伝: ローマの将軍。ガリア戦争当時、カエサルの最も信頼される副官であったが、内戦時にはポンペイウス側に立った。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
  {
    "idx":65,"na1":{
      ko:"베르킨게토릭스",
      en:"Vercingetorix",
      jp:"ウェルキンゲトリクス"
    },"na2":{
      ko:"",
      en:"",
      jp:""
    },"na3":{
      ko:"갈리아의 왕",
      en:"King of Gaul",
      jp:"ガリアの王"
    },
    "display":65,"style":"","animal_type":15,"face_d":"center","element":[10],"grade":5,"job":[8,13],"cost":15,
    "st0":83,"st1":180,"st2":168,"st3":71,"st4":163,"st5":76,"st6":90,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`베르킨게토릭스(Vercingetorix)
생몰년: 기원전 82년 ~ 기원전 46년
열전: 갈리아의 부족장. 여러 갈리아 부족들을 통합하여 로마의 카이사르에 맞서 싸웠으나 알레시아 전투에서 패배했다.`,
      en:`Vercingetorix
Dates: 82 BC – 46 BC
Biography: Vercingetorix was a chieftain of the Gauls. He united various Gallic tribes to fight against Caesar of Rome but was defeated at the Battle of Alesia.`,
      jp:`ウェルキンゲトリクス(Vercingetorix)
生没年: 紀元前82年 - 紀元前46年
列伝: ガリアの部族長。多くのガリア部族を統合してローマのカエサルに立ち向かったが、アレシアの戦いで敗北した。`,
    },
    "region":"italy0","period":1,"scenarioRegion":""
  },
]
//김덕령, 김종서, 이숙번, 조영무, 윤흥신, 이억기, 어영담, 우치적, 황진, 휴정, 계월향, 논개
//와키자카 야스하루 脇坂安治, 
//이시다 미츠나리 石田三成(통솔 70 무력 58 지력 77 정치 95 = b급)
//우키다 히데이에 宇喜多秀家, 모리 데루모토 毛利輝元,
//타치바나 무네시게 立花宗茂(통솔 91 무력 95 지력 81 정치 62 = a급)
//고바야카와 타카카게 小早川隆景(통솔 90 무력 77 지력 93 정치 97 = a급)
//후쿠시마 마사노리 福島正則(통솔 82 무력 88 지력 56 정치 38 = a급), 
//시마즈 요시히로 島津義弘(통솔 87 무력 103 지력 80 정치 70 = a급)
//구로다 나가마사 黑田 長政(통솔 78 무력 77 지력 82 정치 87 = b급)
//가토 기요마사 加藤淸正(통솔 90 무력 92 지력 64 정치 72 = a급)
//고니시 유키나가 小西行長(통솔 74 무력 68 지력 77 정치 89 = b급)
  // {"idx":29,"na1":"호리우치 우지요시","na2":"","na3":"(堀内氏善)",//수군
  //   "display":105,"style":105,"animal_type":6,"face_d":"center","element":[11],"grade":6,"job":[0],"cost":15,
  //   "st0":94,"st1":166,"st2":142,"st3":71,"st4":182,"st5":95,"st6":95,
  //   "sk":[{"idx":1}],
  //   "relation":[4],
  //   "txt": "호리우치 우지요시(일본어: 堀内氏善, 덴분 18년(1549년) ~ 게이초 20년 음력 4월 10일(1615년 5월 7일))는 센고쿠 시대부터 에도 시대 초기까지 활약한 무장이다. 구마노 수군(熊野水軍)의 장수.",
  //   "region":""},

// + 200
const common = [
  {
    "idx":200,"na1":{
      ko:"너구리",
      en:"Raccoon",
      jp:"アライグマ"
    },"na2":{
      ko:"경비병",
      en:"Guard",
      jp:"警備兵"
    },"na3":{
      ko:"궁수",
      en:"Archer",
      jp:"弓兵"
    },
    "display":200,"style":"","animal_type":6,"face_d":"right","element":[randomNum(6,12)],"grade":1,"job":[9],"cost":5,
    "st0":randomNum(30,50),"st1":randomNum(50,100),"st2":randomNum(50,100),"st3":randomNum(30,70),"st4":randomNum(50,100),"st5":randomNum(20,50),"st6":randomNum(50,100),
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`너구리`,
      en:`Raccoon`,
      jp:`アライグマ`
    },
    "region":"","period":0,"scenarioRegion":""
  },
  {
    "idx":201,"na1":{
      ko:"독수리",
      en:"Eagle",
      jp:"アゲー"
    },"na2":{
      ko:"경비병",
      en:"Guard",
      jp:"警備兵"
    },"na3":{
      ko:"궁수",
      en:"Archer",
      jp:"弓兵"
    },
    "display":201,"style":"","animal_type":20,"face_d":"right","element":[randomNum(6,12)],"grade":1,"job":[9],"cost":5,
    "st0":randomNum(30,50),"st1":randomNum(50,100),"st2":randomNum(50,100),"st3":randomNum(30,70),"st4":randomNum(50,100),"st5":randomNum(20,50),"st6":randomNum(50,100),
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`독수리`,
      en:`Eagle`,
      jp:`アゲー`
    },
    "region":"","period":0,"scenarioRegion":""
  },
  {
    "idx":202,"na1":{
      ko:"소",
      en:"Cow",
      jp:"カウ"
    },"na2":{
      ko:"경비병",
      en:"Guard",
      jp:"警備兵"
    },"na3":{
      ko:"궁수",
      en:"Archer",
      jp:"弓兵"
    },
    "display":202,"style":"","animal_type":12,"face_d":"right","element":[randomNum(6,12)],"grade":1,"job":[9],"cost":5,
    "st0":randomNum(30,50),"st1":randomNum(50,100),"st2":randomNum(50,100),"st3":randomNum(30,70),"st4":randomNum(50,100),"st5":randomNum(20,50),"st6":randomNum(50,100),
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`소`,
      en:`Eagle`,
      jp:`アゲー`
    },
    "region":"","period":0,"scenarioRegion":""
  },
  {
    "idx":203,"na1":{
      ko:"곰",
      en:"Bear",
      jp:"クマ"
    },"na2":{
      ko:"경비병",
      en:"Guard",
      jp:"警備兵"
    },"na3":{
      ko:"창병",
      en:"Spearman",
      jp:"槍病"
    },
    "display":203,"style":"","animal_type":13,"face_d":"left","element":[randomNum(6,12)],"grade":1,"job":[9],"cost":5,
    "st0":randomNum(30,50),"st1":randomNum(50,100),"st2":randomNum(50,100),"st3":randomNum(30,70),"st4":randomNum(50,100),"st5":randomNum(20,50),"st6":randomNum(50,100),
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`곰`,
      en:`Bear`,
      jp:`クマ`
    },
    "region":"","period":0,"scenarioRegion":""
  },
  {
    "idx":204,"na1":{
      ko:"하이에나",
      en:"Hyena",
      jp:"ハイエナ"
    },"na2":{
      ko:"경비병",
      en:"Guard",
      jp:"警備兵"
    },"na3":{
      ko:"검병",
      en:"Swordman",
      jp:"剣兵"
    },
    "display":204,"style":"","animal_type":28,"face_d":"right","element":[randomNum(6,12)],"grade":1,"job":[9],"cost":5,
    "st0":randomNum(30,50),"st1":randomNum(50,100),"st2":randomNum(50,100),"st3":randomNum(30,70),"st4":randomNum(50,100),"st5":randomNum(20,50),"st6":randomNum(50,100),
    "sk":[{"idx":1}],
    "relation":[],
    "txt": {
      ko:`하이에나`,
      en:`Hyena`,
      jp:`ハイエナ`
    },
    "region":"","period":0,"scenarioRegion":""
  },
];
const ch = [...hero, 
  ...(Array.from({length: 200 - hero.length}, (_, i) => ({idx: i + hero.length,}))),
  ...common];
export { ch };

