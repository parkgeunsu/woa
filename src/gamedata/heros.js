//animal_type 동물타입 0고양이, 1사자, 2호랑이,3개, 4늑대, 5물개, 6너구리, 7쥐, 8토끼, 9원숭이, 10고릴라, 11캥거루, 12소, 13곰, 14말, 15사슴, 16코뿔소, 17코끼리, 18기린, 19새, 20독수리, 21뱀, 22도마뱀, 23거북이, 24개구리
//0군주, 1책사, 2기사, 3무사, 4학자, 5닌자, 6도사, 7무희, 8도적, 9궁수, 10야만용사, 11상인, 12승려
//element_type 찌르기(0),할퀴기(1),물기(2),치기(3),누르기(4),던지기(5),빛(6),어둠(7),물(8),불(9),바람(10),땅(11)
//state 통솔0(125), 체력1(200), 완력2(200), 민첩3(100), 지력4(200), 정신5(100), 매력6(100),
export const ch = [//face_d 얼굴방향, expType 성장타입, awaken 각성속성, country 국가(한국0, 일본1, 중국2, 몽골3, 영국4, 프랑스5, 그리스6, 마케도니아7, 이탈리아8, 스페인9, 포르투칼10, 중동11, 이집트12)
  {"idx":0,"na1":"유비","na2":"현덕","na3":"소열황제",
    "display":20,"style":20,"animal_type":24,"face_d":"center","element":[11],"grade":6,"job":[0,12],"cost":14,
    "st0":88,"st1":160,"st2":148,"st3":73,"st4":146,"st5":88,"st6":100,
    "sk":[{"idx":1}],
    "relation":[1,2,3],
    "txt": "한 열조 소열황제 유비(漢 烈祖 昭烈皇帝 劉備, 161년 ~ 223년 6월 10일(음력 4월 24일))는 중국 삼국시대 촉한의 초대 황제(재위: 221년 5월 15일(음력 4월 6일) ~ 223년 6월 10일(음력 4월 24일))이다. 자는 현덕(玄德)이다.아버지를 일찍 여의고 어머니와 돗자리를 짜고 팔아 연명하다가 청년 시절 황건적의 난이 일어났을 때 동리에서 약 500명의 의병을 모집하였다. 황제로 즉위하기 전에는 한나라의 황실 성씨였으므로 유황숙(劉皇叔)이라고도 불렸다.",
    "country": 2,"period":5,"scenario":""},
  {"idx":1,"na1":"조조","na2":"맹덕","na3":"난세영웅",
    "display":0,"style":0,"animal_type":0,"face_d":"left","element":[8],"grade":6,"job":[0,13],"cost":15,
    "st0":97,"st1":177,"st2":135,"st3":67,"st4":184,"st5":95,"st6":95,
    "sk":[{"idx":1},{"idx":1},{"idx":2}],
    "relation":[0,1],
    "txt": "조위 태조 무황제 조조(曹魏 太祖 武皇帝 曹操, 155년, 안휘성 박주시~220년 음력 1월 23일)는 중국 후한 말기의 정치가이자, 무장이며 시인이다. 자는 맹덕(孟德)이다. 어릴 때 이름은 길리(吉利), 소자(小字)는 아만(阿瞞)이다. 고향은 패국(沛國) 초현(譙縣)이다. 사후 위가 건국된 후 추증된 묘호는 태조(太祖), 시호는 무황제(武皇帝)이다. 위나라의 초대 황제는 조조의 아들 조비지만 실질적으로 위 건국의 기틀을 마련한 것은 조비의 아버지 조조이다. 후한이 그 힘을 잃어가던 시기에 비상하고 탁월한 재능으로 두각을 드러내, 여러 제후를 연달아 격파하고 중국 대륙의 대부분을 통일하여, 위나라가 세워질 수 있는 기틀을 닦았다. 조조는 삼국지의 영웅들 가운데 패자(覇者)로 우뚝 솟은 초세지걸(超世之傑)이라는 평가와 후한을 멸망시킨 난세의 간웅(奸雄)이자 민간인과 포로를 무자비하게 학살한 폭군이라는 상반된 평가를 받는다.",
    "country":2,"period":5,"scenario":""},
  {"idx":2,"na1":"조비","na2":"자환","na3":"문제아",
    "display":1,"style":1,"animal_type":0,"face_d":"center","element":[8],"grade":4,"job":[0,12],"cost":11,
    "st0":71,"st1":135,"st2":64,"st3":70,"st4":174,"st5":85,"st6":45,
    "sk":[{"idx":1}],
    "relation":[0],
    "txt": "위 고조 문황제 조비(魏 高祖 文皇帝 曹丕, 187년~226년 6월 29일(음력 5월 17일))는 조위의 초대 황제로, 자는 자환(子桓)이다. 무제와 무선황후의 아들로, 무제가 다진 기반을 이어받고 후한 헌제의 선양을 받아 조위를 건국하였다.",
    "country":2,"period":5,"scenario":""},
  {"idx":3,"na1":"조식","na2":"자건","na3":"칠보지재",
    "display":2,"style":2,"animal_type":0,"face_d":"center","element":[6],"grade":2,"job":[4,6],"cost":9,
    "st0":20,"st1":48,"st2":48,"st3":41,"st4":172,"st5":67,"st6":88,
    "sk":[{"idx":1}],
    "relation":[0],
    "txt": "진사왕 조식(陳思王 曹植, 192년~232년 12월 27일(음력 11월 28일[1]))은 후한 말기 ~ 조위의 시인이자 제후왕으로, 자는 자건(子建)이며 패국 초현(譙縣) 사람이다. 아버지 조조, 형 조비와 함께 시에 능통하여 삼조라 일컬어졌다.",
    "country":2,"period":5,"scenario":""},
  {"idx":4,"na1":"조창","na2":"자문","na3":"황수아",
    "display":3,"style":3,"animal_type":0,"face_d":"center","element":[10],"grade":4,"job":[2,10],"cost":12,
    "st0":62,"st1":190,"st2":192,"st3":88,"st4":72,"st5":5,"st6":86,
    "sk":[{"idx":1}],
    "relation":[0],
    "txt": "임성위왕 조창(任城威王 曹彰, 189년~223년)은 위왕 조조의 넷째 아들로, 무선황후의 소생 중에서 둘째며, 자는 자문(子文)이다. 수염이 금발이라서 사람들이 황수아(黃鬚兒)라 불렀는데 힘이 장사이고 조조의 아들들 중에 무예가 유난히 뛰어났다.",
    "country":2,"period":5,"scenario":""},
  {"idx":5,"na1":"조충","na2":"창서","na3":"영재",
    "display":4,"style":4,"animal_type":0,"face_d":"center","element":[10],"grade":2,"job":[4],"cost":5,
    "st0":30,"st1":55,"st2":42,"st3":25,"st4":170,"st5":79,"st6":83,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "조충(曹沖, 196년 ~ 208년)은 조조의 여덟째 아들로, 13세의 어린 나이로 일찍 죽었다. 자는 창서(倉舒), 시호는 등애왕(鄧哀王)이다.",
    "country": 2},
  {"idx":6,"na1":"조진","na2":"자단","na3":"",
    "display":5,"style":5,"animal_type":0,"face_d":"left","element":[6],"grade":5,"job":[2,3],"cost":12,
    "st0":77,"st1":173,"st2":160,"st3":81,"st4":124,"st5":66,"st6":81,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "조진(曹眞, ? ~ 231년)은 중국 삼국 시대 위나라의 황족이자 장수로 자는 자단(子丹)이다. 조비가 죽을 때 진군, 사마의, 조휴와 함께 고명대신이었으며 제갈량의 북벌을 저지하였다. 공이 높으면서도 덕장이란 평을 받았다. 소설 《삼국지연의》에서는 제갈량에게 연거푸 지고 군공은 사마의가 가져가는 것으로 그렸다.",
    "country":2,"period":5,"scenario":""},
  {"idx":7,"na1":"조휴","na2":"문열","na3":"천리구",
    "display":6,"style":6,"animal_type":0,"face_d":"center","element":[6],"grade":3,"job":[3,8],"cost":7,
    "st0":72,"st1":133,"st2":147,"st3":64,"st4":115,"st5":42,"st6":67,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "조휴(曹休, ? ~ 228년)는 중국 삼국 시대 위나라의 황족 · 장수로, 자는 문열(文烈)이며 예주(豫州) 패국(沛國) 초현(譙縣) 사람이다. 조조(曹操)의 족자로, 진군(陳群) · 사마의(司馬懿) · 조진(曹眞)과 함께 조예 대의 고명대신이다.",
    "country":2,"period":5,"scenario":""},
  {"idx":8,"na1":"조홍","na2":"자렴","na3":"",
    "display":7,"style":7,"animal_type":0,"face_d":"right","element":[10],"grade":3,"job":[3,11],"cost":7,
    "st0":83,"st1":141,"st2":155,"st3":63,"st4":80,"st5":24,"st6":55,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "조홍(曹洪, ? ~ 232년)은 중국 삼국 시대 위나라의 장군으로 자는 자렴(子廉)이며 예주 패국 초현(譙縣) 사람이다. 종형 조조가 거병했을 때부터 따라다니며 많은 공을 세웠다. 형양에서 조조가 위급했을 때는 ‘천하에 조홍은 없어도 되지만 조조는 없으면 안 된다’는 말을 남기며 자신의 말을 내주기도 하였다. 갑부였으며 조비와의 갈등으로 죽을 뻔하였다.",
    "country":2,"period":5,"scenario":""},
  {"idx":9,"na1":"조인","na2":"자효","na3":"대사마",
    "display":8,"style":8,"animal_type":0,"face_d":"center","element":[10],"grade":5,"job":[2,3,13],"cost":13,
    "st0":90,"st1":183,"st2":182,"st3":77,"st4":142,"st5":49,"st6":78,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "조인(曹仁, 168년 ~ 223년)은 중국 삼국 시대 위나라의 장군으로 자는 자효(子孝)이며 예주 패국 초현(譙縣) 사람이다. 조조와 6촌 형제이다. 초반부터 조조를 따라 많은 공을 세웠으며 조조도 그 용기와 지략을 중히 여겼다. 주로 형주 전선을 담당하며 주유, 관우 등과 다투었다.",
    "country":2,"period":5,"scenario":""},
  {"idx":10,"na1":"견희","na2":"","na3":"폐월미인",
    "display":9,"style":9,"animal_type":19,"face_d":"right","element":[9],"grade":3,"job":[7,12],"cost":4,
    "st0":14,"st1":22,"st2":6,"st3":33,"st4":133,"st5":66,"st6":98,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "문소황후 견씨(文昭皇后 甄氏, 183년 1월 26일 ~ 221년 8월 4일)[1]는 중국 삼국시대 위의 초대 세조 문황제(世祖 文皇帝) 조비(曹丕)의 정실(正室)이다. 상채현 현령 견일(甄逸)의 딸로써 중산군 무극현(하북성 석가장시 무극현 부근)의 태생이다. 견후 또는 견씨라고도 부르며, 일본식 표현으로 견희(甄姬)라고도 한다. 3남5녀 중의 막내딸로 오빠들의 이름은 예(豫), 엄(嚴), 요(堯)이고 언니들은 강(姜), 탈(脫), 도(道), 영(榮)이다. 황후 자신의 이름은 복(宓), 다른 설에는 낙(洛)이라는 말도 있으나, 확실하지는 않다.[2] 소설 「삼국지 연의」에서는 피부는 옥과 같고 얼굴은 꽃과 같은(玉肌花貌) 미인으로 그려진다.",
    "country":2,"period":5,"scenario":""},
  {"idx":11,"na1":"하후돈","na2":"원양","na3":"맹하후",
    "display":10,"style":10,"animal_type":0,"face_d":"right","element":[7],"grade":5,"job":[2,13],"cost":13,
    "st0":81,"st1":160,"st2":155,"st3":70,"st4":125,"st5":76,"st6":93,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "하후돈(夏侯惇, ? ~ 220년 6월 13일)은 중국 후한 말 조조 휘하의 장군 겸 정치가이다. 자는 원양(元讓)이며 패국 초현(譙縣) 사람이다. 조조가 거병할 때부터 도왔고 조조와 같은 해에 죽었다. 주로 후방에서 거점 방어를 맡아 조조가 안심하고 친정할 수 있게 했다. 여포의 부하 조성의 화살로 인해 한쪽 눈을 잃은 것으로 유명하다.",
    "country":2,"period":5,"scenario":""},
  {"idx":12,"na1":"하후연","na2":"묘재","na3":"귀속장군",
    "display":11,"style":11,"animal_type":0,"face_d":"right","element":[9],"grade":5,"job":[9,13],"cost":13,
    "st0":86,"st1":176,"st2":182,"st3":82,"st4":101,"st5":55,"st6":89,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "하후연(夏侯淵, ? ~ 219년)은 중국 후한 말 조조 휘하의 장군으로 자는 묘재(妙才)이며 예주 패국 초현(譙縣) 사람이다. 재빠르고 과감한 기동이 장기였으며 항상 앞장서서 싸우는 용장이었다. 마초와 한수, 여러 이민족을 물리치고 농우를 평정하였다. 유비로부터 한중을 지켜내던 중 황충과의 전투에서 전사하였다.",
    "country":2,"period":5,"scenario":""},
  {"idx":13,"na1":"장료","na2":"문원","na3":"료래래",
    "display":12,"style":12,"animal_type":20,"face_d":"right","element":[7],"grade":6,"job":[3,13],"cost":15,
    "st0":89,"st1":188,"st2":192,"st3":90,"st4":144,"st5":51,"st6":75,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "장료(張遼, 169년 ~ 222년)는 중국 후한 말과 삼국시대 위나라의 장군이다. 자는 문원(文遠)이며 병주 안문군 마읍현(馬邑縣) 사람이다. 초반에 여러 세력을 전전하다가 조조에게 귀순한 후 맹활약하였다. 특히 합비 전투에서 7,000명으로 손권의 호왈 10만이라 위세부린 수만 군사를 물리치는 등 주로 동오 전선을 담당하며 맹위를 떨쳤다. 정사에서는 조조 막하에서 가장 맹장이었으며 오나라와의 전투에서 실수가 없었고 전선에 나가 장수급을 수없이 베고 승리를 이끌어서 오나라에서는 어린 아이들도 장문원 이름만 들어도 벌벌 떨 정도였다고 한다. 정사에서 서주군 전투때는 관운장과 전투중에 수십합을 겨뤄도 밀리지가 않았고 관우가 힘겨워하자 도와주러온 부장 장익, 마상, 주원 등을 죽였다.",
    "country":2,"period":5,"scenario":""},
  {"idx":14,"na1":"전위","na2":"","na3":"악래",
    "display":13,"style":13,"animal_type":22,"face_d":"left","element":[11],"grade":5,"job":[2,10],"cost":12,
    "st0":65,"st1":190,"st2":194,"st3":74,"st4":60,"st5":19,"st6":95,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "전위(典韋, ? ~ 197년)는 중국 후한 말 조조 휘하의 군인으로 연주 진류군 기오현(己吾縣) 사람이다. 사지에 빠진 조조를 경호하다가 전사하였다.",
    "country":2,"period":5,"scenario":""},
  {"idx":15,"na1":"허저","na2":"중강","na3":"호치",
    "display":14,"style":14,"animal_type":0,"face_d":"center","element":[8],"grade":5,"job":[10,14],"cost":12,
    "st0":66,"st1":190,"st2":192,"st3":73,"st4":88,"st5":23,"st6":85,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "허저(許褚, ? ~ ?)는 후한 ~ 위나라의 무장으로 자는 중강(仲康)이며 예주 초국(譙國) 초현(譙縣) 사람이다. 호치(虎癡)란 별명이 있다. 우월한 완력과 우직한 성품으로 조조의 신임을 받아 그 경호를 맡았으며 용맹을 떨쳤다.",
    "country":2,"period":5,"scenario":""},
  {"idx":16,"na1":"문빙","na2":"중업","na3":"",
    "display":15,"style":15,"animal_type":4,"face_d":"center","element":[10],"grade":5,"job":[2,10],"cost":9,
    "st0":82,"st1":155,"st2":153,"st3":75,"st4":157,"st5":75,"st6":72,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "문빙(文聘, ? ~ ?)은 중국 삼국시대 위나라의 장군으로 자는 중업(仲業)이며 형주 남양군 완현(宛縣) 사람이다. 수십 년간 강하를 안정적으로 지켜냈다.",
    "country":2,"period":5,"scenario":""},
  {"idx":17,"na1":"문흠","na2":"중약","na3":"",
    "display":16,"style":16,"animal_type":4,"face_d":"center","element":[9],"grade":3,"job":[2,3],"cost":7,
    "st0":73,"st1":160,"st2":166,"st3":72,"st4":80,"st5":34,"st6":22,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "문흠(文欽, ? ~ 258년 2월)은 중국 삼국 시대 위나라와 오나라의 장수로, 자는 중약(仲若)이며, 예주(豫州) 초국(譙國) 초현(譙縣) 사람이다. 그의 둘째 아들 문앙은 당대 최강의 용맹을 자랑했던 맹장이다.",
    "country":2,"period":5,"scenario":""},
  {"idx":18,"na1":"문앙","na2":"차건","na3":"소드마스터",
    "display":17,"style":17,"animal_type":4,"face_d":"left","element":[9],"grade":6,"job":[13,5],"cost":15,
    "st0":76,"st1":193,"st2":196,"st3":92,"st4":132,"st5":25,"st6":70,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "문앙(文鴦, 238년 ~ 291년 3월 8일)은 중국 삼국 시대 조위 ~ 서진의 무장으로, 자는 차건(次騫)[1]이며, 예주(豫州) 초국(譙國) 초현(譙縣) 사람이다. 앙(鴦)은 아명이고, 실제로 사용한 이름은 숙(淑, 俶)이나 《삼국지(三國志)》·《진서(晉書)》 등에서는 아명으로 기록되어 있다. 조위의 무장 문흠(文欽)의 아들이다.",
    "country":2,"period":5,"scenario":""},
  {"idx":19,"na1":"사마의","na2":"중달","na3":"",
    "display":18,"style":18,"animal_type":20,"face_d":"left","element":[10],"grade":6,"job":[1,4],"cost":14,
    "st0":94,"st1":144,"st2":125,"st3":65,"st4":196,"st5":91,"st6":73,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "진 고조 선황제 사마의(晉 高祖 宣皇帝 司馬懿, 179년 ~ 251년 8월 5일)는 중국 삼국시대 조위의 관료이자 서진의 추존 황제로, 자는 중달(仲達)이며 하내군 온현(溫縣) 사람이다. 조진 사후, 위나라의 군대를 이끌어 그의 최대의 라이벌인 제갈량과의 치열한 지략싸움 끝에 결국 제갈량의 북벌을 막아냈다. 명제 사후 실권을 장악하여 서진 건국의 토대를 마련하였다.",
    "country":2,"period":5,"scenario":""},
  {"idx":20,"na1":"곽가","na2":"봉효","na3":"",
    "display":19,"style":19,"animal_type":7,"face_d":"left","element":[6],"grade":5,"job":[1,12],"cost":13,
    "st0":40,"st1":20,"st2":20,"st3":25,"st4":190,"st5":84,"st6":78,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "곽가(郭嘉, 170년 ~ 207년)는 중국 후한 말의 책사다. 자는 봉효(奉孝)이며, 예주 영천군 양책현(陽翟縣) 사람이다. 조조가 가장 아끼던 참모로 관직은 사공군좨주(司空軍祭酒)였으며 시호는 정후(貞侯)이다. 아들은 곽혁이고, 손자는 곽심(郭深), 곽창(郭敞)이며, 고손은 곽엽(郭獵)이다.",
    "country":2,"period":5,"scenario":""},
  {"idx":21,"na1":"이순신","na2":"여해","na3":"해신",
    "display":21,"style":99,"animal_type":6,"face_d":"right","element":[8],"grade":6,"job":[13],"cost":15,
    "st0":120,"st1":170,"st2":138,"st3":69,"st4":190,"st5":75,"st6":95,
    "sk":[{"idx":1},{"idx":1},{"idx":2}],
    "relation":[],
    "txt": "이순신(李舜臣, 1545년 4월 28일 ~ 1598년 12월 16일 (음력 11월 19일))은 조선 중기의 무신이었다. 본관은 덕수(德水), 자는 여해(汝諧), 시호는 충무(忠武)였으며, 한성 출신이었다. 문반 가문 출신으로 1576년(선조 9년) 무과(武科)에 급제[1]하여 그 관직이 동구비보 권관, 훈련원 봉사, 발포진 수군만호, 조산보 만호, 전라좌도 수군절도사를 거쳐 정헌대부 삼도수군통제사에 이르렀다.",
    "country":0,"period":6,"scenario":0},
  {"idx":22,"na1":"우에스기 겐신","na2":"","na3":"에치고의 용(上杉謙信)",
    "display":22,"style":100,"animal_type":20,"face_d":"left","element":[6],"grade":6,"job":[0,3],"cost":15,
    "st0":110,"st1":180,"st2":175,"st3":95,"st4":155,"st5":60,"st6":90,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "우에스기 겐신(上杉 謙信, 1530년 음력 1월 21일(2월 18일) ~ 1578년 음력 3월 13일(4월 19일))은 센고쿠 시대의 무장, 다이묘이다. 출가 전 이름은 나가오 가게토라(일본어: 長尾景虎)이고, 이후 개명을 통해 우에스기 마사토라(일본어: 上杉政虎), 우에스기 데루토라(일본어: 上杉 輝虎)란 이름을 가졌고, 출가 후엔 우에스기 겐신으로 불렸다. 어릴 적 이름은 도라치요이다. 형을 대신하여 당주에 자리에 앉아 주변의 다케다 신겐, 호조 우지야스, 오다 노부나가 등의 쟁쟁한 센고쿠 다이묘들과 전쟁을 벌였다. 스스로 비사문천의 화신이라 믿어 전장에서 뛰어난 군략을 보여 에치고의 용 혹은 군신이라 불렸다.",
    "country":1,"period":0,"scenario":""},
  {"idx":23,"na1":"리처드1세","na2":"","na3":"사자심왕",
    "display":23,"style":101,"animal_type":1,"face_d":"left","element":[9],"grade":7,"job":[0,2],"cost":15,
    "st0":92,"st1":200,"st2":200,"st3":99,"st4":157,"st5":56,"st6":14,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "리처드 1세(영어: Richard I, 1157년 9월 8일 ~ 1199년 4월 6일)는 플랜태저넷 왕가 출신으로는 잉글랜드 왕국의 두 번째 국왕이다(재위 1189년 9월 8일 - 1199년 4월 6일). 잉글랜드의 헨리 2세와 아키텐의 엘레오노르 사이에서 태어난 세 번째 아들이다. 생애의 대부분을 전쟁터에서 보냈으며, 그 용맹함으로 인해 사자심왕(프랑스어: Cœur de Lion, the Lionheart)이라는 별명을 얻었으며, 이후 중세 기사 이야기의 전형적인 영웅으로 동경의 대상이 되었다.	그러나 재위 시 본국인 잉글랜드에 체재했던 기간이 불과 6개월이었으므로 그의 통치력에 대해서는 뚜렷이 알려진 바가 없다. 치세의 대부분을 외국에서 보내고 통치자로서 무능하였으나, 용감·관용 등을 겸비한 중세의 전형적 기사였다.",
    "country":4,"period":2,"scenario":""},
  {"idx":24,"na1":"할리드 이븐 알 왈리드","na2":"","na3":"신께서 뽑아든 검",
    "display":24,"style":102,"animal_type":0,"face_d":"right","element":[7],"grade":7,"job":[2,3,13],"cost":15,
    "st0":120,"st1":197,"st2":196,"st3":90,"st4":193,"st5":85,"st6":97,
    "sk":[{"idx":1}],
    "relation":[4],
    "txt": "할리드 이븐 알 왈리드(592년 ~ 642년, 아랍어: خالد إبن الوليد)는 이슬람 초기의 정통 칼리파 시대의 무장이다. '알라의 검'(the Sword of God)이라는 별명으로 알려져 있다. 이슬람 확장 전쟁에서 지대한 공적을 세웠다.",
    "country":11,"period":0,"scenario":""},
  {"idx":25,"na1":"나폴레옹","na2":"","na3":"보나파르트",
    "display":25,"style":103,"animal_type":19,"face_d":"right","element":[8],"grade":7,"job":[0,9],"cost":15,
    "st0":122,"st1":155,"st2":137,"st3":73,"st4":197,"st5":55,"st6":94,
    "sk":[{"idx":1}],
    "relation":[4],
    "txt": "나폴레옹 보나파르트(프랑스어: Napoléon Bonaparte, 코르시카어: Nabulione di Buonaparte, 이탈리아어: Napoleone Bonaparte, 독일어: Napoleon Bonaparte 1769년 8월 15일 ~ 1821년 5월 5일)는 프랑스 제1공화국의 군인이자 1804년부터 1814년, 1815년까지 프랑스 제1제국의 황제였다. 흔히 나폴레옹(프랑스어: Napoléon , 문화어: 나뽈레옹)으로 불린다.",
    "country":5,"period":5,"scenario":""},
  {"idx":26,"na1":"잔다르크","na2":"","na3":"성녀",
    "display":26,"style":104,"animal_type":0,"face_d":"right","element":[11],"grade":7,"job":[2,13],"cost":15,
    "st0":97,"st1":172,"st2":196,"st3":94,"st4":170,"st5":52,"st6":81,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "잔 다르크(프랑스어: Jeanne d'Arc, 문화어: 쟝느 다르크, 1412년 1월 6일 ~ 1431년 5월 30일) 또는 아르크의 성녀 요안나(라틴어: Sancta Ioanna Arcensis)는 프랑스의 국민적 영웅이자 로마 가톨릭교회의 성인이다. 오를레앙의 처녀(la Pucelle d’Orléans)라고도 불린다.",
    "country":5,"period":5,"scenario":""},
  {"idx":27,"na1":"오다 노부나가","na2":"","na3":"(織田信長)",
    "display":27,"style":105,"animal_type":6,"face_d":"center","element":[10],"grade":6,"job":[0,13],"cost":14,
    "st0":94,"st1":166,"st2":142,"st3":71,"st4":182,"st5":95,"st6":95,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "오다 노부나가(織田 信長, 덴분 3년 음력 5월 12일(1534년 6월 23일) ~ 덴쇼 10년 음력 6월 2일(1582년 6월 21일))는 센고쿠 시대를 평정한 인물로, 아즈치모모야마 시대를 연 다이묘이다. 도요토미 히데요시, 도쿠가와 이에야스와 더불어 중세 일본 삼영걸로 불린다.",
    "country":1,"period":0,"scenario":""},
  {"idx":28,"na1":"도도 타카토라","na2":"","na3":"(藤堂高虎)",
    "display":28,"style":"","animal_type":19,"face_d":"left","element":[7],"grade":4,"job":[13,3],"cost":11,
    "st0":79,"st1":176,"st2":139,"st3":51,"st4":170,"st5":90,"st6":1,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "도도 다카토라(藤堂 高虎, 1556년 2월 16일 ~ 1630년 11월 9일)는 센고쿠 시대부터 에도 시대 전기에 활약한 다이묘이다. 법명은 도모요시(智吉). 주군을 여러번 바꾼 센고쿠 무장으로 잘 알려져 있다.축성술이 뛰어나 우와지마성, 이마바리성, 사사야마성, 쓰성, 이가 우에노성, 제제성, 순천왜성 등을 축성했다. 다카토라의 축성은 석벽을 높게 쌓는 것과 해자의 설계에 특징이 있다. 같은 축성의 명수 가토 기요마사(加藤清正)는 석벽의 휨을 중시한다는 것에서 대비된다.",
    "country":1,"period":0,"scenario":""},
  {"idx":29,"na1":"구루시마 미치후사","na2":"","na3":"(来島通総)",//수군
  "display":29,"style":"","animal_type":24,"face_d":"right","element":[8],"grade":3,"job":[3,8],"cost":7,
  "st0":73,"st1":155,"st2":142,"st3":70,"st4":100,"st5":55,"st6":61,
  "sk":[{"idx":1}],
  "relation":[],
  "txt": "구루시마 미치후사(来島 通総, 에이로쿠 4년(1561년) ~ 게이초 2년 음력 9월 16일(1597년 10월 26일))는 아즈치 모모야마 시대의 이요 국 출신 센고쿠 무장이다.",
  "country":1,"period":0,"scenario":""},
  {"idx":30,"na1":"가메이 고레노리","na2":"","na3":"(来島通総)",
    "display":30,"style":"","animal_type":9,"face_d":"right","element":[10],"grade":3,"job":[0,10],"cost":7,
    "st0":40,"st1":132,"st2":157,"st3":51,"st4":141,"st5":80,"st6":55,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "가메이 고레노리(亀井玆矩 かめい これのり[*], 고지 3년(1557년) ~ 게이초 17년 음력 1월 26일(1612년 2월 27일))는 아즈치모모야마 시대부터 에도 시대 전기에 걸쳐 활약한 무장, 다이묘이다. 이나바 시카노번 초대 번주이다. 쓰와노번 가메이가(津和野藩亀井家) 시조. 초명은 유 구니쓰나(湯国綱). 아마고씨의 가신으로, 창술에 능하여 창의 신주로(槍の新十郎)라는 별명을 가졌다.",
    "country":1,"period":0,"scenario":""},
  {"idx":31,"na1":"와키자카 야스하루","na2":"","na3":"(脇坂安治)",
    "display":31,"style":"","animal_type":22,"face_d":"left","element":[8],"grade":2,"job":[0,3],"cost":7,
    "st0":66,"st1":144,"st2":140,"st3":45,"st4":79,"st5":55,"st6":16,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "와키자카 야스하루(脇坂 安治, 덴분 23년(1554년) ~ 간에이 3년 음력 8월 6일(1626년 9월 26일))는 아즈치모모야마 시대부터 에도 시대 초기까지의 무장, 다이묘이다. 아와지 스모토번주, 이요 오즈번 초대 번주를 지냈다. 다쓰노번 와키자카씨의 시조.",
    "country":1,"period":0,"scenario":""},
  {"idx":32,"na1":"구키 요시타카","na2":"","na3":"(九鬼嘉隆)",
    "display":32,"style":"","animal_type":22,"face_d":"right","element":[8],"grade":2,"job":[3,8],"cost":7,
    "st0":73,"st1":152,"st2":135,"st3":51,"st4":117,"st5":45,"st6":66,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "구키 요시타카(九鬼 嘉隆 くき よしたか[*], 덴분 11년(1542년) ~ 게이초 5년 음력 10월 12일(1600년 11월 17일))는 센고쿠 시대부터 아즈치모모야마 시대까지의 무장, 다이묘이다. 구키 수군을 이끈 수군무장이며 구키씨 제8대 당주. 자식은 모리타카 등.",
    "country":1,"period":0,"scenario":""},
  {"idx":33,"na1":"가토 요시아키","na2":"","na3":"(加藤嘉明)",
    "display":33,"style":"","animal_type":19,"face_d":"right","element":[8],"grade":2,"job":[3,14],"cost":7,
    "st0":75,"st1":144,"st2":144,"st3":43,"st4":110,"st5":50,"st6":65,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "가토 요시아키(加藤 嘉明, 에이로쿠 6년(1563년)) ~ 간에이 8년 음력 9월 12일(1631년 10월 7일))는 일본 아즈치모모야마 시대, 에도 시대의 무장, 다이묘이다. 과거에는 가토 요시아키라였으며 다른 이름은 시게카쓰(일본어: 茂勝)이고, 통칭 마고로쿠(일본어: 孫六). 미나쿠치번 가토 가문의 시조. 시즈가타케의 일곱 자루 창 중 한명으로 유명하다.",
    "country":1,"period":0,"scenario":""},
  {"idx":34,"na1":"원균","na2":"평중","na3":"하지메 사토루",
    "display":34,"style":105,"animal_type":0,"face_d":"center","element":[9],"grade":2,"job":[10,14],"cost":7,
    "st0":50,"st1":150,"st2":135,"st3":25,"st4":70,"st5":18,"st6":0,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "원균(元均, 1540년 2월 12일 (음력 1월 5일) ~ 1597년 8월 27일 (음력 7월 15일))은 조선 중기의 무신, 군인으로 임진왜란 당시 조선의 장수 중의 한사람이다.",
    "country": 0,"period":6,"scenario":""},
  {"idx":35,"na1":"권준","na2":"언경","na3":"순천부사",
    "display":35,"style":105,"animal_type":3,"face_d":"right","element":[11],"grade":2,"job":[1,8],"cost":7,
    "st0":73,"st1":110,"st2":99,"st3":70,"st4":175,"st5":77,"st6":81,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "권준(權俊, 1547년 ~ ?년)은 조선 중기의 무신으로, 본관은 안동(安東), 자는 언경(彦卿)이다. 권총(權聰)의 현손이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":36,"na1":"정운","na2":"창진","na3":"녹도만호",
    "display":36,"style":105,"animal_type":7,"face_d":"center","element":[11],"grade":2,"job":[3,9],"cost":7,
    "st0":85,"st1":150,"st2":159,"st3":72,"st4":140,"st5":60,"st6":91,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "정운(鄭運, 1543년 10월 7일(음력 9월 10일) ~ 1592년 10월 5일(음력 9월 1일))은 조선 중기의 무신이다. 본관은 하동(河東), 자는 창진(昌辰)이며, 시호는 충장(忠壯).",
    "country":0,"period":6,"scenario":""},
  {"idx":37,"na1":"이순신","na2":"입부","na3":"무의공",
    "display":37,"style":105,"animal_type":4,"face_d":"center","element":[10],"grade":2,"job":[3,13],"cost":7,
    "st0":87,"st1":172,"st2":172,"st3":67,"st4":147,"st5":76,"st6":82,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "이순신(李純信, 1553년 12월 27일 ~ 1611년 9월 2일)은 조선 중기의 왕족, 무장, 유학자이다. 임진왜란 때에 활동하던 장수로 그의 상관이기도 했던 충무공 이순신(李舜臣), 등림수 이순신(李舜臣) 등과의 구별을 위해 무의공 이순신, 입부 이순신으로 불린다. 본관은 전주. 양녕대군의 다섯째 서자 장평도정(長平都正)의 4대손이자, 대한민국 초대 대통령 이승만의 9대 방조가 된다. 시호는 무의(武毅), 자는 입부(立夫)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":38,"na1":"이운룡","na2":"경현","na3":"옥포만호",
    "display":38,"style":105,"animal_type":3,"face_d":"center","element":[6],"grade":2,"job":[3,14],"cost":7,
    "st0":75,"st1":166,"st2":130,"st3":62,"st4":175,"st5":75,"st6":85,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "이운룡(李雲龍, 1562년 ~ 1610년)은 조선 중기의 무신이다. 본관은 재령(載寧). 휘는 운룡(雲龍), 자는 경현(景見), 호는 동계(東溪). 청도출신. 아버지는 남해현령 이몽상(李夢祥)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":39,"na1":"류성룡","na2":"이견","na3":"영의정",
    "display":39,"style":105,"animal_type":3,"face_d":"center","element":[8],"grade":2,"job":[1,6],"cost":7,
    "st0":82,"st1":150,"st2":90,"st3":53,"st4":190,"st5":92,"st6":79,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "류성룡(柳成龍, 1542년 11월 17일(음력 10월 1일) ~ 1607년 5월 31일(음력 5월 6일))은 조선 중기의 문신, 학자, 의학자, 저술가이다. 본관은 풍산(豊山), 자는 이견(而見), 호는 서애(西厓)이고, 시호는 문충(文忠)이다. 경상도 의성의 외가에서 태어났으며, 간성군수 류공작(柳公綽)의 손자이며, 황해도 관찰사 류중영(柳仲郢)의 차남이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":40,"na1":"권율","na2":"언신","na3":"행주대첩",
    "display":40,"style":105,"animal_type":4,"face_d":"right","element":[7],"grade":2,"job":[2,13],"cost":7,
    "st0":96,"st1":170,"st2":125,"st3":67,"st4":178,"st5":77,"st6":92,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "권율(權慄, 1537년 12월 28일 ~ 1599년 7월 6일)은 조선 중기의 문신, 군인, 정치인이다. 본관은 안동(安東)이고, 자(字)는 언신(彦愼), 호는 만취당(晩翠堂) 또는 모악(暮嶽), 시호는 충장(忠莊)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":41,"na1":"이혼","na2":"","na3":"광해군",
    "display":41,"style":105,"animal_type":2,"face_d":"center","element":[7],"grade":2,"job":[0,3],"cost":7,
    "st0":71,"st1":181,"st2":111,"st3":75,"st4":185,"st5":88,"st6":33,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "광해군(光海君, 1575년 6월 4일(음력 4월 26일)~1641년 8월 7일(음력 7월 1일))은 조선의 제15대 국왕(재위: 1608년 ~ 1623년)이다. 임진왜란 때 세자에 책봉되었으며, 분조[1]하여 의병을 이끌었다. 즉위 후 후금과 명나라 사이에서 중립외교 노선을 취하였으며 전후 복구와 대동법의 실시 등 여러 정책을 실시하였지만, 잦은 옥사와 중립외교, 이복동생인 영창대군을 죽이고 인목왕후를 유폐한 일로 인해 서인이 주도한 인조반정에 의해 폐위되었다. 연산군에 이어 반정으로 인해 폐위된 세 번째 왕이기도 하다.",
    "country":0,"period":6,"scenario":""},
  {"idx":42,"na1":"김시민","na2":"면오","na3":"진주대첩",
    "display":42,"style":105,"animal_type":3,"face_d":"center","element":[6],"grade":2,"job":[13,3],"cost":7,
    "st0":94,"st1":181,"st2":180,"st3":70,"st4":155,"st5":70,"st6":94,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "김시민(金時敏, 1554년 9월 23일(음력 8월 27일)~ 1592년 11월 21일(음력 10월 18일)은 조선 중기의 무신이다. 본관은 (구)안동, 자는 면오(勉吾), 시호는 충무(忠武)이다. 고려 때 충렬공(忠烈公) 김방경(金方慶)의 13대손이자 지평(持平) 김충갑(金忠甲)의 셋째 아들이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":43,"na1":"곽재우","na2":"","na3":"홍의장군",
    "display":43,"style":105,"animal_type":4,"face_d":"left","element":[9],"grade":2,"job":[13,8],"cost":7,
    "st0":88,"st1":160,"st2":173,"st3":90,"st4":177,"st5":65,"st6":86,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "곽재우(郭再祐, 1552년 9월 16일(음력 8월 28일) ~ 1617년 5월 14일(음력 4월 10일))는 조선 중기의 무신, 정치인, 군인으로 임진왜란당시 진주성전투, 화왕산성전투에 크게 활약한 의병장이다. 34세 때 문과 대과에 급제하였으나, 선조를 비판한 답안지로 선조의 명에 의해 합격이 취소되고, 이후 벼슬에 뜻을 버리고, 40세가 되도록 고향에서 학문과 낚시질로 세월을 보내고 있었다. 1592년(선조 25년) 4월 임진왜란이 일어나고 관군이 왜군에게 전멸당하자, 당시 고향인 경남 의령에서 스스로 의병을 조직, 붉은 비단으로 된 갑옷을 입고 활동하여 천강홍의장군(天降紅衣將軍)이라는 별명을 얻었으며 그의 용맹성에 놀란 왜병들은 곽재우의 이름만 들어도 두려워했다 한다. 여러번 승리한 공로로 찰방, 조방장 등을 지낸뒤 병마절도사를 역임했다.",
    "country":0,"period":6,"scenario":""},
  {"idx":44,"na1":"정기룡","na2":"경운","na3":"임진왜란의 조자룡",
    "display":44,"style":105,"animal_type":2,"face_d":"right","element":[10],"grade":2,"job":[13,5],"cost":7,
    "st0":96,"st1":190,"st2":186,"st3":89,"st4":138,"st5":44,"st6":86,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "정기룡(鄭起龍, 1562년 5월 26일(음력 4월 24일) ~ 1622년 4월 8일(음력 2월 28일))은 조선의 무신이다. 본관은 진양(晋陽). 자는 경운(景雲), 호는 매헌(梅軒), 아명은 무수(茂壽)이다. 시호는 충의(忠毅)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":45,"na1":"이항복","na2":"자상","na3":"오성",
    "display":45,"style":105,"animal_type":8,"face_d":"right","element":[11],"grade":2,"job":[4],"cost":7,
    "st0":70,"st1":133,"st2":112,"st3":41,"st4":181,"st5":84,"st6":83,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "이항복(李恒福, 1556년 ~ 1618년 7월 4일(음력 5월 13일))은 조선 승정원(대통령비서실) 동부승지(국토교통부) 겸 당상관(국장급 공무원) 등을 거쳐 조선 의정부 영의정(국무총리) 직책을 지낸 조선 중기의 문신·정치가·시인·작가이다. 주로 잘 알려져있는 오성과 한음 대감 중 '오성'이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":46,"na1":"이덕형","na2":"명보","na3":"한음",
    "display":46,"style":105,"animal_type":8,"face_d":"center","element":[9],"grade":2,"job":[4],"cost":7,
    "st0":65,"st1":127,"st2":100,"st3":48,"st4":178,"st5":92,"st6":84,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "이덕형(李德馨, 1561년 ~ 1613년)은 조선의 문신이다. 본관은 광주이며, 이극균의 현손이다. 자는 명보(明甫), 호는 한음(漢陰)·쌍송(雙松)·포옹산인(抱雍散人)이다. 이항복하고 함께 '오성과 한음'에서 한음대감으로 유명하다. 선조하고 광해군 때 영의정(국무총리)을 역임하였다. 1608년(광해군 즉위) 정운원종공신 1등(定運功臣一等)에 책록되고, 1614년(광해군 6년) 8월 27일 위성원종공신 1등(衛聖原從功臣)에 책록되었다. 시호는 문익(文翼)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":47,"na1":"이연","na2":"","na3":"",
    "display":47,"style":105,"animal_type":7,"face_d":"left","element":[11],"grade":2,"job":[0,1],"cost":7,
    "st0":60,"st1":143,"st2":93,"st3":73,"st4":159,"st5":88,"st6":11,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "선조(宣祖, 1552년 11월 26일 (음력 11월 11일) ~ 1608년 3월 16일 (음력 2월 1일))는 조선의 제14대 국왕(재위 : 1567년 음력 7월 3일 ~1608년 음력 2월 1일)이다. 휘는 연(昖), 초명은 균(鈞), 본관은 전주(全州)이며, 즉위전의 작호는 하성군(河城君)이었다.",
    "country":0,"period":6,"scenario":""},
  {"idx":48,"na1":"정발","na2":"","na3":"흑의장군",
    "display":48,"style":105,"animal_type":6,"face_d":"center","element":[8],"grade":2,"job":[3],"cost":7,
    "st0":83,"st1":159,"st2":171,"st3":67,"st4":109,"st5":44,"st6":77,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "정발(鄭撥, 1553년 ~ 1592년 5월 23일(음력 4월 13일))은 조선 중기의 무신이다.1579년(선조 12년) 무과에 급제해 해남현감, 거제현령, 북정원수 종사관, 거제현령, 비변사낭관, 위원군수, 훈련원첨정, 사복시첨정 등을 지내고 임진왜란 당시의 벼슬이 정3품 행 절충장군 경상좌도 부산진 수군첨절제사에 이르렀다. 1592년(선조 25년) 4월 사냥 중 일본군의 침략 소식을 접하고 임진왜란 초기에 벌어진 부산진 전투에서 분전하던 중 왜군의 총에 맞고 전사하였다. 사후 증 병조판서에 증직되고 불천위(不遷位)에 지정되었으며 뒤에 의정부좌찬성겸 의금부판사에 추증되었다. 본관은 경주(慶州)이고, 자(字)는 자고(子固) 또는 자주(子周), 호는 백운(白雲), 시호는 충장(忠壯)이다. 별칭은 흑의장군이다. 경기도 출신.",
    "country":0,"period":6,"scenario":""},
  {"idx":49,"na1":"송상현","na2":"천곡","na3":"",
    "display":49,"style":105,"animal_type":4,"face_d":"left","element":[9],"grade":2,"job":[3,5],"cost":7,
    "st0":84,"st1":160,"st2":152,"st3":75,"st4":145,"st5":64,"st6":84,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "송상현(宋象賢, 1551년 2월 12일(음력 1월 8일)~ 1592년 5월 25일(음력 4월 15일))은 조선 중기의 문신, 작가이며 임진왜란 때의 장수이다. 임진왜란 초기 동래성 전투에서 고니시 유키나가의 군과 교전하다가 패전 살해되었다. 왜적은 그를 포로로 사로잡아 항복을 강요하였으나 항복하지 않자 처참하게 살해하였다. 자는 덕구(德求), 호는 천곡(泉谷)·한천(寒泉)이며 시호는 충렬(忠烈)이다. 본관은 여산(礪山)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":50,"na1":"박진","na2":"명보","na3":"",
    "display":50,"style":105,"animal_type":4,"face_d":"center","element":[8],"grade":2,"job":[3],"cost":7,
    "st0":90,"st1":162,"st2":170,"st3":71,"st4":153,"st5":73,"st6":80,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "박진(朴晉, 1560년 8월 25일 ~ 1597년 3월)은 무신, 군인으로, 여러 전투에 참가해 공을 세워 벼슬을 지냈다. 초기의 밀양성 전투에서는 패배하였으나 영천성에서 의병 주도로 벌어진 영천성 전투를 지원하여 승전을 거두었고 이후 왜적 111명의 수급을 베어 왕에게 올렸으며, 제2차 경주성 전투에서 승리를 거두었다. 이후 동지중추부사, 1594년 경상우도병마절도사, 순천부사, 그 뒤 전라도병마절도사 등을 거쳐 1596년 황해도병마절도사 겸 황주목사를 지냈다. 일본군 장수 사야가는 그를 만나 조선으로 귀순하였다. 사후 증 병조판서에 증직되고 응천군(凝川君)에 추봉되었으며, 후에 다시 의정부좌찬성에 추증되었다. 본관은 밀양, 자는 명보(明甫) 또는 명부(明夫), 여회(汝晦), 시호는 의열(毅烈)이다. 정유길(鄭惟吉)의 문인이다. 경상남도 출신",
    "country":0,"period":6,"scenario":""},
  {"idx":51,"na1":"정문부","na2":"자허","na3":"",
    "display":51,"style":105,"animal_type":3,"face_d":"center","element":[9],"grade":2,"job":[3,10],"cost":7,
    "st0":86,"st1":170,"st2":166,"st3":65,"st4":158,"st5":66,"st6":72,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "정문부(鄭文孚, 1565년 3월 20일(음력 2월 19일)~ 1624년 12월 28일(음력 11월 19일))는 조선 중기의 문신이자, 임진란 일등 공신 우찬성 대제학 의병장이다. 본관은 해주(海州)이며, 자는 자허(子虛), 호는 농포(農圃), 시호는 충의(忠毅)이다. 기념비로 북관대첩비가 있다.",
    "country":0,"period":6,"scenario":""},
  {"idx":52,"na1":"김성일","na2":"사순","na3":"",
    "display":52,"style":105,"animal_type":3,"face_d":"center","element":[8],"grade":2,"job":[1,6],"cost":7,
    "st0":50,"st1":95,"st2":68,"st3":24,"st4":179,"st5":87,"st6":64,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "김성일(金誠一, 1538년 ~ 1593년 경상북도 안동 출생)은 조선 중기의 문신이자 외교관, 학자이다. 본관은 의성, 호는 학봉(鶴峰), 자는 사순(士純)이다. 퇴계 이황의 제자. 시호는 문충공 서애 류성룡과 함께 퇴계의 주리론 학문을 이어받은 수제자로 영남학파의 중추 구실을 했다. 1590년 일본에 통신사 부사로 갔다와서 일본이 침략을 하지 않을 것이라는 잘못된 판단을 하여 보고함으로써 임진왜란 발발 이후 큰 비판을 받았다. 임진왜란 때 초유사로에 임명되어 경상우도관찰사 겸 순찰사를 역임하다 1593년 진주성에서 병사하였다. 안동에 자리한 학봉종택은 안동의 대표적인 양반가옥의 전형으로 유명하다. 특히 학봉 문중에서는 학봉이 남긴 '3년동안 금부도사가 찾아오지 않으면 선비 집안이 아니다.'라는 말을 가훈으로 여겨 왕에게 직언을 하는 문중으로 영남 유림의 중심 문중이 되었다. 1591년(선조 24) 종계변무가 성사되었을 때 그는 광국원종공신 1등의 한 사람으로 특별히 책록되었다. 임진왜란 당시 진주성 전투에서 초유사로 활약하다 병사한 공로로 사후 선무원종공신 1등관에 추서되었다.",
    "country":0,"period":6,"scenario":""},
  {"idx":53,"na1":"신립","na2":"입지","na3":"",
    "display":53,"style":105,"animal_type":3,"face_d":"left","element":[7],"grade":2,"job":[3,15],"cost":7,
    "st0":80,"st1":147,"st2":172,"st3":55,"st4":101,"st5":46,"st6":71,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "신립(申砬, 1546년 11월 16일(음력 10월 23일) ~ 1592년 6월 7일(음력 4월 28일))은 조선의 무신이다. 신숭겸의 후손으로 본관은 평산(平山)이며, 자는 입지(立之)이다. 무과에 급제하여 오위도총부와 진주판관, 한성판윤(정2품) 등을 지냈다. 임진왜란 첫 해에 충주 탄금대에서 배수진을 펼치고 왜군과 싸우다 전사한 장군이다. 시호는 충장(忠壯)이다. 인조반정에 가담한 서인 신경진과 신경인 형제의 아버지이며, 신경희의 옥사로 죽은 신경희의 숙부이다. 대한민국의 독립운동가 겸 정치인인 해공 신익희에게는 13대조가 된다.",
    "country":0,"period":6,"scenario":""},
  {"idx":54,"na1":"호리우치 우지요시","na2":"","na3":"(堀内氏善)",
    "display":54,"style":105,"animal_type":6,"face_d":"center","element":[11],"grade":2,"job":[3,14],"cost":7,
    "st0":61,"st1":130,"st2":111,"st3":59,"st4":103,"st5":50,"st6":48,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "호리우치 우지요시(堀内氏善, 덴분 18년(1549년)[1] ~ 게이초 20년 음력 4월 10일(1615년 5월 7일)[2])는 센고쿠 시대부터 에도 시대 초기까지 활약한 무장이다. 구마노 수군(熊野水軍)의 장수.",
    "country":1,"period":6,"scenario":""},
  {"idx":55,"na1":"나대용","na2":"","na3":"선박기술자",//얼굴작업 필요
    "display":"","style":"","animal_type":6,"face_d":"center","element":[8],"grade":2,"job":[3,16],"cost":7,
    "st0":70,"st1":170,"st2":159,"st3":68,"st4":162,"st5":68,"st6":77,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "나대용(羅大用, 1556년 ~ 1612년)은 조선 중기의 무관이며, 거북선의 건조와 병기류 제조에 기여하였다. 과거 급제후 교동수사에 이르렀다. 전라도 나주 출신으로 본관은 금성(錦城)이다.",
    "country":0,"period":6,"scenario":""},
  {"idx":56,"na1":"허준","na2":"","na3":"신의",//얼굴작업 필요
    "display":"","style":"","animal_type":6,"face_d":"center","element":[6],"grade":2,"job":[15,12],"cost":7,
    "st0":54,"st1":112,"st2":71,"st3":39,"st4":181,"st5":80,"st6":90,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "허준(許浚, 1539년 ~ 1615년 10월 9일)은 조선 중기의 의관·의학자이다. 동의보감을 작성하였으며, 동의보감 외에도 선조의 명을 받아 임진왜란 종결 후, 각종 중국의서와 기존 의서의 복원, 편찬 및 정리에 힘썼다. 그밖에도 한글로 된 의서인 《언해두창집요 (諺解痘瘡集要)》, 산부인과 관련 의서인 《언해태산집요》, 기본 가정의서인 《언해구급방 (諺解救急方)》 등도 집필하였다.",
    "country":0,"period":6,"scenario":""},
  {"idx":57,"na1":"도쿠이 미치유키","na2":"","na3":"(得居通幸)",//얼굴작업 필요
    "display":"","style":"","animal_type":9,"face_d":"right","element":[8],"grade":2,"job":[3],"cost":3,
    "st0":55,"st1":115,"st2":120,"st3":55,"st4":97,"st5":36,"st6":31,
    "sk":[{"idx":1}],
    "relation":[],
    "txt": "구루시마 성주(来島城主)였던 무라카미 미치야스(村上通康)의 장남. 다른 이름으로는 미치토시(通年), 미치유키(通之), 미치히사(通久) 등으로도 불린다. 도쿠이 씨에 입적하여 이를 계승하였으므로, 아버지 무라카미 미치야스가 1567년에 사망한 후에도 가독을 상속받지는 못했다.",
    "country":1,"period":0,"scenario":""},
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
  //   "display":105,"style":105,"animal_type":6,"face_d":"center","element":[10],"grade":6,"job":[0],"cost":15,
  //   "st0":94,"st1":166,"st2":142,"st3":71,"st4":182,"st5":95,"st6":95,
  //   "sk":[{"idx":1}],
  //   "relation":[4],
  //   "txt": "호리우치 우지요시(일본어: 堀内氏善, 덴분 18년(1549년) ~ 게이초 20년 음력 4월 10일(1615년 5월 7일))는 센고쿠 시대부터 에도 시대 초기까지 활약한 무장이다. 구마노 수군(熊野水軍)의 장수.",
  //   "country": 1},
]