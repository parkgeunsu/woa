//cate(스킬종류, 배열) 중복가능 passive1, active3, buff5
//dmg_type 무(0),독(1),빛(2),암(3),물(4),불(5),바람(6),땅(7),치기(8),쪼기(9),할퀴기(10),물기(11),누르기(12),
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위
//num 효과
//sp 행동력
export const scenario = {
	korea:[
		{name:'gojoseon',}, //단군(BC2333) period:0
		{name:'threeBefore',}, //부여,옥저&동예,삼한 period:1
		{name:'three',}, //신라(BC57)박혁거세, 고구려(BC37)주몽, 백제(BC18)온조 period:2
		{name:'ns',}, //남북국시대 통일신라,발해 대조영(698) period:3
		{name:'threeAfter', //신라, 후백제(892)견훤, 후고구려(901)궁예, 왕건 period:4
			scenarioList:[
				{
					name:{
						ko:"후삼국전투",
						en:"후삼국전투",
						jp:"후삼국전투"
					},
					stage:[
						{
							title:{
								ko:"후삼국시대 전투1",
								en:"후삼국시대 전투1",
								jp:"후삼국시대 전투1",
							},
							lineup:0,
							map:[
								0,1,1,2,2,
								5,0,1,1,2,
								5,5,0,0,1,
								4,4,5,5,4,
								3,3,3,3,3,
								3,9,9,3,10,
								10,10,10,10,10,
								11,11,10,10,11,
								10,9,9,3,3,
								3,9,3,4,4
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:0,idx:23, lv:50, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:24, lv:30, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{pos:3,idx:26, lv:50, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:3,idx:26, lv:50, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:4,idx:27, lv:33, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },{idx:'', lv:1, },
							]
						},
						{
							title:{
								ko:"후삼국시대 전투2",
								en:"후삼국시대 전투2",
								jp:"후삼국시대 전투2",
							},
							lineup:0,
							map:[
								0,1,1,2,2,
								5,0,1,1,2,
								5,5,0,0,1,
								4,4,5,5,4,
								3,3,3,3,3,
								3,9,9,3,10,
								10,10,10,10,10,
								11,11,10,10,11,
								10,9,9,3,3,
								3,9,3,4,4
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:25, lv:20, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							]
						},
						{
							title:{
								ko:"후삼국시대 전투3",
								en:"후삼국시대 전투3",
								jp:"후삼국시대 전투3",
							},
							lineup:0,
							map:[
								0,1,1,2,2,
								5,0,1,1,2,
								5,5,0,0,1,
								4,4,5,5,4,
								3,3,3,3,3,
								3,9,9,3,10,
								10,10,10,10,10,
								11,11,10,10,11,
								10,9,9,3,3,
								3,9,3,4,4
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:0,idx:24, lv:50, grade:7, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:23, lv:30, grade:7, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{pos:3,idx:26, lv:50, grade:6, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							]
						},
						{
							title:{
								ko:"후삼국시대 전투4",
								en:"후삼국시대 전투4",
								jp:"후삼국시대 전투4",
							},
							lineup:0,
							map:[
								0,1,1,2,2,
								5,0,1,1,2,
								5,5,0,0,1,
								4,4,5,5,4,
								3,3,3,3,3,
								3,9,9,3,10,
								10,10,10,10,10,
								11,11,10,10,11,
								10,9,9,3,3,
								3,9,3,4,4
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:0,idx:23, lv:50, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:24, lv:30, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{pos:3,idx:26, lv:50, grade:4, items: [
									{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							]
						},
					]
				}
			]
		},
		{ //이성계(1392) 조선 초기 period:5
			name:'joseon1',
			scenarioList:[
				{
					name:{
						ko:"조선 초기",
						en:"조선 초기",
						jp:"조선 초기"
					},
					stage:[
					]
				}
			]
		},
		{ //이순신(1592) period:6
			name:'joseon2',
			scenarioList:[
				{
					name:{
						ko:"이순신 전기",
						en:"Biography of Lee Soon Shin",
						jp:"李舜臣伝記"
					},
					stage:[
						{
							title:{
								ko:"1592년 옥포해전",
								en:"1592 Okpo Sea Battle",
								jp:"1592年の玉浦海戦",
							},
							conversation:[
								{idx:28, team:"enemy", pos:"left", txt:{//도도 다카토라
									ko:"쯧쯧.. <br/>멍청한 조선놈들, 어짜피 조선 군부는 이나라를 포기했다. 안봐도 나 도도의 승리다.",
									en:"Tsk tsk. <br/>Stupid Joseon, the Joseon army gave up the country anyway. It's a victory for me, Dodo.",
									jp:"チッチッチッ <br/>馬鹿な朝鮮人ども、どうせ朝鮮軍部はこの国をあきらめた。見なくても俺たちの勝利だ。",
								}},
								{idx:54, team:"enemy", pos:"right", txt:{//호리노우치 우지요시
									ko:"당연한 말씀입니다.<br/> 당연히 우리 대일본제국 해군의 위력에 비할수 있겠습니까?",
									en:"Of course, <br/>nothing can compare to the might of our Imperial Japanese Navy?",
									jp:"当然のことですが、当然、我が大日本帝国海軍の威力に匹敵しますか？",
								}},
								{idx:21, team:"ally", pos:"right", txt:{//조선병사1
									ko:"대장.. <br/>일본의 적함이 상당합니다.<br/> 도도 저자는 많은 정공을 세운 일본 제일의 장수라 하옵니다. <br/>우리 수군에 승산이 있을까요?",
									en:"Captain. <br/>The Japanese have many ships.<br/>Mr. Dodo is said to be Japan's greatest general, having made many sieges. Do you think our navy has a chance?",
									jp:"大将. <br/>日本の敵は¸相当です。<br/>藤堂氏は多くの功績を残した日本一の武将と言われています。 我々の水軍に勝算はあるのでしょうか？",
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"그들은 많은 승리로 콧대가 하늘을 찌를 것이다. 오히려 이때가 우리에겐 기회다.",
									en:"Their noses will be up in the air with many victories. Rather, this is our opportunity.",
									jp:"彼らは多くの勝利で鼻筋が伸びるだろう。むしろこの時が私たちにとってチャンスだ。",
								}},
								{idx:"", team:"ally", pos:"right", txt:{//조선병사2
									ko:"... <br/>(그렇다 하기엔 적군이 너무 많다...)",
									en:"... <br/>(There are too many enemies for that...)",
									jp:"... <br/>(そうというには敵が多すぎる...)"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"가자! 나를 따르라!!",
									en:"Let's go! Follow me!",
									jp:"行くぞ！ 私について来い!",
								}},
							],
							lineup:0,
							map:[
								10,9,9,11,10,
								9,11,10,11,10,
								9,9,9,11,9,
								11,11,10,10,11,
								10,10,10,10,10,
								10,9,9,11,10,
								10,9,11,10,10,
								3,3,9,10,9,
								4,5,3,4,3,
								1,0,4,5,5,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:28, lv:50, grade:4, items: [
									{idx:0, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{pos:2,idx:54, lv:50, grade:4, items: [
									{idx:0, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
						},
						{
							title:{
								ko:"1592년 사천해전",
								en:"1592 Sichuan Sea Battle",
								jp:"1592年四川海戦",
							},
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"...<br/>...<br/>나대용장군, 거북선의 위력을 이번에 확인 할 수 있겠소?",
									en:"...<br/>...<br/>General, can you confirm the power of the turtle ship this time?",
									jp:"...<br/>...<br/>羅大龍将軍、亀甲船の威力を今回確認できるか？",
								}},
								{idx:55, team:"ally", pos:"right", txt:{//나대용
									ko:"장군.<br/>몇 척되지는 않지만 이번전투에서 위력을 확인하기에 충분합니다.",
									en:"Generals.<br/>Not many ships, but enough to see the power in this battle.",
									jp:"将軍。<br/>数は少ないですが、今回の戦闘で威力を確認するには十分です。",
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"좋소!<br/>일본군의 사기를 한번 꺽어 봅시다.",
									en:"Great!<br/>Let's try to break the morale of the Japanese army.",
									jp:"いいぞ!<br/>日本軍の士気を一発逆転させましょう。",
								}},
								{idx:57, team:"enemy", pos:"left", txt:{//도쿠이 미치유키
									ko:"도도 장군은 적을 너무 얕잡아 봤다.<br/>이번 전투를 승리로 이끌어 일본제국의 무서움을 단단히 보여주겠다.",
									en:"General Dodo has underestimated the enemy too much.<br/>We will win this battle and show the Japanese Empire what they are made of.",
									jp:"ドド将軍は敵を甘く見すぎた。<br/>この戦いを勝利に導き、日本帝国の恐ろしさをしっかりと見せつけよう。",
								}},
								{idx:"", team:"enemy", pos:"right", txt:{//일본병사1
									ko:"도쿠이 장군을 따르라!!<br/>와아~!",
									en:"Follow General Tokui!<br/>Wow!",
									jp:"徳井将軍を追え!!!<br/>わぁ～!",
								}},
								{idx:57, team:"enemy", pos:"left", txt:{//도쿠이 미치유키
									ko:"없애버려!<br/>조져버려!<br/>죽여버려!",
									en:"Destroy it!<br/>Destroy them!<br/>Kill it!",
									jp:"消してしまえ!<br/>くたばれ!<br/>殺してしまえ!",
								}},
							],
							lineup:0,
							map:[
								0,1,1,2,2,
								5,0,1,1,2,
								5,5,0,0,1,
								4,4,5,5,4,
								3,3,3,3,3,
								3,9,9,3,10,
								10,10,10,10,10,
								11,11,10,10,11,
								10,9,9,3,3,
								3,9,3,4,4
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:28, lv:50, grade:4, items: [
									{idx:0, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{pos:2,idx:54, lv:50, grade:4, items: [
									{idx:0, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:1, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:2, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{idx:4, part:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
									{},
									{},
									{},
									{},
								]},{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
						},
						{
							title:{
								ko:"1592년 당포해전",
								en:"1592 Tangpo Sea Battle",
								jp:"1592年唐浦海戦",
							},
							conversation:[

							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1592년 당항포해전",
								en:"1592 Tanghangpo Sea Battle",
								jp:"1592年の唐杭浦海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1592년 한산도대첩",
								en:"1592 Hansando Daejeon",
								jp:"1592年 韓山道大捷",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1592년 안골포해전",
								en:"1592 Angolpo Sea Battle",
								jp:"1592年の安骨浦海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1592년 부산포해전",
								en:"1592 Busanpo Sea Battle",
								jp:"1592年釜山浦海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1593년 웅포해전",
								en:"1593 Woongpo Sea Battle",
								jp:"1593年の雲浦海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1594년 제2차 당항포해전",
								en:"1594 Second Tanghangpo Sea Battle",
								jp:"1594年 第2次唐杭浦海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1594년 장문포해전",
								en:"1594 Jangmunpo Sea Battle",
								jp:"1594年 長門浦海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1597년 칠천량해전",
								en:"1597 Chilcheonryang Sea Battle",
								jp:"1597年七千両海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1597년 명량해전",
								en:"1597 Mingyuan Sea Battle",
								jp:"1597年明暦の海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1598년 절이도해전",
								en:"1598 Jeolido Sea Battle",
								jp:"1598年 節井島海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1598년 왜교성전투",
								en:"1598 Waegyoseong Battle",
								jp:"1598年の倭京城の戦い",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
						{
							title:{
								ko:"1598년 노량해전",
								en:"1598 Noryang Sea Battle",
								jp:"1598年ノリョン海戦",
							},
							conversation:[
								
							],
							lineup:0,
							map:[
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[],
						},
					],
				}
			]
		},
		{ // period 7
			name:'joseon3',
			scenarioList:[
			]
		}
	],
	japan:[
		{ // peroid 0
			name:'junkuk',
			scenarioList:[
			]
		}
	],
	china:[
		{name:'yin',}, //(BC1600) period:0
		{name:'ju',}, //(BC10세기) period:1
		{name:'chunchu',}, //공자 period:2
		{name:'jin',}, //(BC221) period:3
		{name:'han',}, //초한지(BC206) period:4
		{name:'three',}, //삼국지(BC220) period:5
		{name:'dang',}, //서유기(618) period:6
		{name:'song',}, //수호지 period:7
		{name:'ming',}, //금병매(1368) period:8
	],
	mongolia:[
		{
			name:'mongolia',
			scenarioList:[//징기즈칸
			]
		}
	],
	unitedKingdom:[
		{
			name:'unitedKingdom',
			scenarioList:[//리처드3세
			]
		}
	],
	france:[
		{
			name:'france',
			scenarioList:[//나폴레옹, 잔다르크
			]
		}
	],
	greece:[
		{
			name:'greece',//(BC1100) period 0
			scenarioList:[//아테네: 소크라테스,플라톤,아리스토텔레스
			//스파르타
			//페르시아 전쟁, 펠로폰네소스 전쟁
			]
		}
	],
	macedonia:[
		{
			name:'macedonia',//알렉산드로스 대왕(BC356) period 1
			scenarioList:[
			]
		}
	],
	italy:[
		{
			name:'italy',//로마, 율리우스 카이사르(BC100) period 2
			scenarioList:[//포에니 전쟁,
			]
		},
	],
	spain:[
		{
			name:'spain',
			scenarioList:[
			]
		},
	],
	portugal:[
		{
			name:'portugal',
			scenarioList:[
			]
		},
	],
	theMiddleEast:[
		{
			name:'theMiddleEast',//(476) period 4
			scenarioList:[
			]
		},
	],
	egypt:[
		{
			name:'egypt',//(BC3000) period 0
			scenarioList:[//파라오, 예컨대 쿠푸, 핫셉수트, 투탕카문, 람세스
			]
		},
	]
};
