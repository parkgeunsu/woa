import { items } from 'gamedata/items';
//cate(스킬종류, 배열) 중복가능 passive1, active3, buff5
//dmg_type 무(0),독(1),빛(2),암(3),물(4),불(5),바람(6),땅(7),치기(8),쪼기(9),할퀴기(10),물기(11),누르기(12),
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 쪼기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위
//num 효과
//sp 행동력
export const scenario = {
	japan0:[
		{ // peroid 0
			name:'junkuk',
			scenarioList:[
			]
		}
	],
	japan1:[],
	japan2:[],
	korea0:[],
	korea1:[],
	korea2:[
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
					cardIdx:21,
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
							history:{
								ko:"임진왜란 개전 초기였던 1592년 (선조 25년) 임진년 5월 7일 낮 12시 전라좌도 수군절도사 이순신이 이끄는 조선 수군 연합함대가 옥포 앞 바다에서 도도 다카토라가 지휘하는 일본군 함대를 크게 무찌르고 승리한 해전이다. 이 해전에서 일본군은 전선 26척이 침몰되는 막대한 피해를 입었다.",
								en:"At 12 noon on May 7, 1592 (25th year of Seonjo), at the beginning of the Imjin War, a combined fleet of Korean naval forces led by Yi Sun-sin, a sailor from Jeolla Province, defeated a Japanese fleet commanded by Takatora Dodo at sea off Okpo. The Japanese suffered heavy losses in this naval battle, with 26 of their ships sunk.",
								jp:"壬辰倭乱開戦初期である1592年(宣祖25年)壬辰年5月7日昼12時、全羅座道水軍節度使李舜臣が率いる朝鮮水軍連合艦隊が、玉浦沖の海で藤堂高虎が指揮する日本軍艦隊を大きく破って勝利した海戦である。この海戦で日本軍は戦線26隻が沈没する甚大な被害を受けた。",
							},// 이순신, 원균, 정운, 무의공 이순신, 어영담, 이영남 vs 도도 다카토라, 호리노우치 우지요시
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
								11,10,10,12,11,
								10,12,11,12,11,
								10,10,10,12,10,
								12,12,11,11,12,
								11,11,11,11,11,
								11,10,10,12,11,
								11,10,12,11,11,
								10,2,10,11,2,
								2,2,1,0,1,
								1,0,0,30,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{pos:3,idx:200, lv:1, grade:1, items: [
									items.enemyItem[`armor${0}`],
									items.enemyItem[`weapon${0}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
								]},{pos:1,idx:28, lv:1, grade:4, items: [
									items.enemyItem[`armor${0}`],
									items.enemyItem[`weapon${0}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
								]},{pos:4,idx:201, lv:1, grade:1, items: [
									items.enemyItem[`armor${0}`],
									items.enemyItem[`weapon${0}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
								]},{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:54, lv:1, grade:4, items: [
									items.enemyItem[`armor${0}`],
									items.enemyItem[`weapon${0}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
									items.enemyItem[`accessory${Math.floor(Math.random() * 14)}`],
								]},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:1000},
										{type:"Etc",idx:"8"}//아이템 강화서1
									],
									[
										{type:"Gold",num:2000},
										{type:"Etc",idx:"8"}//아이템 강화서1
									],
									[
										{type:"Gold",num:3000},
										{type:"Etc",idx:"9"}//아이템 강화서2
									],
									[
										{type:"Gold",num:5000},
										{type:"Etc",idx:"9"}//아이템 강화서2
									],
								],
								always:[
									[
										{type:"Gold",num:100},
										{type:"Equip",idx:"3-0-0-2",percent:0.1,grade:2},//장도
										{type:"Equip",idx:"1-0-0-1",percent:0.1,grade:2},//두정투
										{type:"Upgrade",idx:"0",percent:0.1},//대장장이 망치I
										{type:"Material",idx:"13",num:5},//블루베리
										{type:"Etc",idx:"21",percent:0.05},//스킬 제거권
										{type:"Etc",idx:"22",percent:0.05},//보석제거 집게
										{type:"Etc",idx:"24",percent:0.01}//보물지도 조각
									],
									[
										{type:"Gold",num:200},
										{type:"Equip",idx:"3-0-0-2",percent:0.15,grade:2},//장도
										{type:"Etc",idx:"21",percent:0.05},//스킬 제거권
										{type:"Etc",idx:"22",percent:0.05},//보석제거 집게
										{type:"Etc",idx:"24",percent:0.01}//보물지도 조각
									],
									[
										{type:"Gold",num:300},
										{type:"Equip",idx:"3-0-0-2",percent:0.2,grade:3},//장도
										{type:"Etc",idx:"21",percent:0.05},//스킬 제거권
										{type:"Etc",idx:"22",percent:0.05},//보석제거 집게
										{type:"Etc",idx:"24",percent:0.01}//보물지도 조각
									],
									[
										{type:"Gold",num:400},
										{type:"Equip",idx:"3-0-0-2",percent:0.2,grade:4},//장도
										{type:"Etc",idx:"21",percent:0.05},//스킬 제거권
										{type:"Etc",idx:"22",percent:0.05},//보석제거 집게
										{type:"Etc",idx:"24",percent:0.01}//보물지도 조각
									],
								]
							},
						},
						{
							title:{
								ko:"1592년 사천해전",
								en:"1592 Sichuan Sea Battle",
								jp:"1592年四川海戦",
							},
							history:{
								ko:"임진왜란 초기였던 1592년 (선조 25년) 임진년 5월 29일 전라좌도 수군절도사 이순신이 이끄는 조선 수군 연합함대가 사천 앞 바다에서 도쿠이 미치유키가 지휘하는 일본군 함대 13척을 모두 전멸시키고 큰 승리를 거둔 해전이다. 함대 규모는 전라좌도 수군절도사 이순신이 이끄는 전라 좌수영의 함대 판옥선 23척과 거북선 2척, 경상우도 수군절도사 원균이 이끄는 경상우수영의 함대 판옥선 3척이다.",
								en:"On May 29, 1592 (25th year of Seonjo), during the early stages of the Imjin War, a combined fleet of Joseon naval forces led by Yi Sun-sin, a naval pirate from Jeolla Province, won a major victory in the waters off Sichuan, wiping out all 13 ships of the Japanese fleet commanded by Tokui Michiyuki. The fleet consisted of 23 Panok ships and two turtle ships from the Jeollanam-do left-handed fleet led by Yi Sun-sin, and three Panok ships from the Gyeongsang-woo right-handed fleet led by Won-gyun.",
								jp:"壬辰倭乱の初期だった1592年(宣祖25年)、壬辰年5月29日、全羅左道水軍節度使李舜臣が率いる朝鮮水軍連合艦隊が四川沖の海で徳井道隆が指揮する日本軍艦隊13隻をすべて全滅させ、大勝利を収めた海戦です。艦隊の規模は、全羅左道水軍節度使李舜臣が率いる全羅左水軍節度使李舜臣が率いる全羅左水軍の艦隊の判玉船23隻と亀甲船2隻、慶尚右道水軍節度使元均が率いる慶尚右水軍の艦隊の判玉船3隻である。",
							},//이순신, 원균, 권준, 무의공 이순신, 정운, 나대용, 송희립, 어영담, 김완, 이언랑.... vs 도쿠이 미치유키
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
								11,10,10,12,11,
								10,12,11,12,11,
								10,10,10,12,10,
								12,12,11,11,12,
								11,11,11,11,11,
								10,11,10,11,10,
								2,2,11,10,2,
								1,30,2,1,2,
								1,1,1,1,30,
								1,1,0,0,1
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
							drop:{
								first:[],
								always:[],
							},
						},
						{
							title:{
								ko:"1592년 당포해전",
								en:"1592 Tangpo Sea Battle",
								jp:"1592年唐浦海戦",
							},
							history:{
								ko:"사천포 해전 다음 날 척후선으로부터 당포 선창에 왜선이 정박해 있다는 정보를 입수한 이순신 함대는 곧 당포 앞바다로 나가 왜군 도쿠이 미치유키가 이끄는 대선 9척, 중선·소선 12척을 무찔렀다.",
								en:"The day after the Battle of Sacheonpo, Yi's fleet was informed by a scout ship that a Japanese warship was anchored in the dock at Dangpo, and soon sailed off Dangpo and defeated nine large ships and twelve medium and small ships led by the Japanese warship Tokui Michiyuki.",
								jp:"佐川砲海戦の翌日、斥候船から唐浦埠頭に倭船が停泊しているという情報を得た李舜臣艦隊は、すぐに唐浦沖に出撃し、倭軍の徳井道隆が率いる大船9隻、中船・小船12隻を撃破した。",
							},//충무공 이순신,원균,권준,김완 vs 가메이 고레노리, 도쿠이 미치유키
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들이 당포 선창에 정박해 있다! 기습하라!",
									en:"The enemy is anchored at Dangpo dock! Ambush them!",
									jp:"敵が唐浦の船着き場に停泊している！奇襲せよ！"
								}},
								{idx:57, team:"enemy", pos:"right", txt:{//도쿠이 미치유키
									ko:"아니, 저게 무슨 배냐? 거북? 괴물인가?",
									en:"What kind of ship is that? A turtle? Is it a monster?",
									jp:"なんだあの船は？亀？怪物か？"
								}},
								{idx:30, team:"enemy", pos:"right", txt:{//가메이 고레노리
									ko:"당황하지 마라! 응사하라! 놈들을 가까이 오게 하지 마라!",
									en:"Don't panic! Return fire! Do not let them get close!",
									jp:"慌てるな！応戦せよ！奴らを近づけるな！"
								}},
								{idx:20, team:"ally", pos:"left", txt:{//권준
									ko:"거북선이 적진을 돌파했습니다! 지금입니다!",
									en:"The Turtle Ship has breached enemy lines! Now is the time!",
									jp:"亀甲船が敵陣を突破しました！今です！"
								}},
								{idx:57, team:"enemy", pos:"right", txt:{//도쿠이 미치유키
									ko:"크헉! 대포가... 배가 부서진다! 막아라!",
									en:"Argh! The cannons... the ship is breaking! Stop them!",
									jp:"ぐわっ！大砲が…船が壊れる！防げ！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적장 도쿠이 미치유키를 쳐라! 놓치지 마라!",
									en:"Strike down the enemy commander Tokui Michiyuki! Do not let him escape!",
									jp:"敵将徳井道隆を討て！逃がすな！"
								}}
							],
							lineup:0,
							map:[
								11,10,12,10,11,
								11,12,10,12,11,
								12,11,12,12,11,
								10,10,2,11,10,
								11,10,2,2,1,
								11,11,10,1,0,
								2,11,10,11,10,
								0,2,0,10,11,
								0,1,2,1,2,
								30,0,0,1,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{pos:1,idx:30, lv:45, grade:3, items: []},{pos:3,idx:57, lv:45, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:1500},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:150},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1592년 당항포해전",
								en:"1592 Tanghangpo Sea Battle",
								jp:"1592年の唐杭浦海戦",
							},
							history:{
								ko:"이순신 함대를 주축으로 한 조선 수군의 연합함대가 제2차 출전에서 사천·당포 해전에 이어 세 번째로 치른 해전이다. 이순신의 전라 좌수영 전선 23척, 이억기의 전라 우수영 전선 25척, 원균의 경상 우수영 전선 3척등 총 51척이 참가하였다. 총지휘는 이순신이 맡았다.",
								en:"This was the third naval battle fought by the combined fleet of the Joseon Navy, led by Yi Sun-sin's fleet, in its second outing, following the Sacheon-Dangpo naval battle. A total of 51 ships participated, including 23 ships of Yi Sun-sin's Jeollanam-do Left Swimmer, 25 ships of Yi Eung-gi's Jeollanam-do Excellent, and three ships of Won Kyun's Gyeongsang Excellent. Yi Sun-sin was in overall command.",
								jp:"李舜臣艦隊を主軸とした朝鮮水軍の連合艦隊が第2回出撃で四川・唐浦海戦に続いて3回目の海戦である。李舜臣の全羅道左水泳戦線23隻、李億基の全羅道右水泳戦線25隻、元均の慶尚道右水泳戦線3隻など計51隻が参加した。総指揮は李舜臣が務めた。",
							},// 이순신, 원균, 이억기 vs 모리 무라하루, 오모리 로쿠다유, 가비시바루 우시노스케, 아와다 한시치, 와타나베 시키부
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"전군 공격하라! 단 한 척의 왜선도 돌려보내지 마라!",
									en:"All forces attack! Do not let a single Japanese ship return!",
									jp:"全軍攻撃せよ！一隻の倭船も帰すな！"
								}},
								{idx:34, team:"ally", pos:"right", txt:{//원균
									ko:"이순신! 내 공을 가로챌 생각 마라! 내가 먼저 간다!",
									en:"Yi Sun-sin! Don't you dare steal my credit! I'm going first!",
									jp:"李舜臣！俺の手柄を横取りするな！俺が先に行く！"
								}},
								{idx:23, team:"ally", pos:"left", txt:{//이억기
									ko:"적들이 바다로 빠져나가지 못하게 포위해야 합니다!",
									en:"We must surround them so they cannot escape to the sea!",
									jp:"敵が海へ逃げられないように包囲しなければなりません！"
								}},
								{idx:58, team:"enemy", pos:"right", txt:{//모리 무라하루 (가상 ID, 엔트리 참고)
									ko:"이런 좁은 곳에서 포위되다니... 뚫어라! 뚫어야 산다!",
									en:"Trapped in such a narrow place... Break through! We must break through to live!",
									jp:"こんな狭い場所で包囲されるとは…突破せよ！突破せねば生きられない！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"진형을 유지하라! 침착하게 적의 선체를 격파하라!",
									en:"Maintain formation! Calmly destroy the enemy hulls!",
									jp:"陣形を維持せよ！落ち着いて敵の船体を撃破せよ！"
								}}
							],
							lineup:0,
							map:[
								10,12,12,10,11,
								11,11,10,11,10,
								10,2,1,10,11,
								2,1,30,2,1,
								1,0,1,0,1,
								15,1,15,0,1,
								17,15,0,15,16,
								30,11,1,0,15,
								16,15,0,15,16,
								17,0,30,15,16,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:28, lv:40, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, }, //도도 다카토라 대역
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:1600},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:160},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1592년 한산도대첩",
								en:"1592 Hansando Daejeon",
								jp:"1592年 韓山道大捷",
							},
							history:{
								ko:"견내량대첩으로도 알려진 임진왜란 중 벌어졌던 이순신의 승전 중 하나로 행주대첩, 진주대첩과 함께 임진왜란 3대 대첩으로 알려져 있다.\n임진왜란의 전황이 바뀌는데 결정적인 공헌을 한 전투중 하나로 일본 수군의 수륙병진을 완전히 박살낸 대첩이다.",
								en:"One of Yi Sun-sin's victories during the Imjin War, also known as the Gyeonnam-daepa, is known as one of the three great battles of the Imjin War along with the Daejeon-daepa and Pearl-daepa.\nIt is one of the battles that made a decisive contribution to changing the course of the Imjin War and completely destroyed the Japanese navy's amphibious force.",
								jp:"見乃梁大捷とも呼ばれる壬辰倭乱の間に行われた李舜臣の勝利の一つで、行州大捷、真珠大捷と共に壬辰倭乱3大捷として知られている。\n	壬辰倭乱の戦況を変えるのに決定的な貢献をした戦いの一つで、日本水軍の水陸両用兵の進軍を完全に打ち砕いた大捷である。",
							},//이순신, 권준, 배홍립, 정운, 어영담, 김완, 우치적, 한백록, 이영남, 송희립, 기효근, 황세득 vs 와키자카 사효에, 와타나베 시치에몬, 마나베 사마노조
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"견내량의 적을 한산도 넓은 바다로 유인했다. 학익진을 펼쳐라!",
									en:"We have lured the enemy from Gyeonnaeryang to the open sea of Hansando. Deploy the Crane Wing formation!",
									jp:"見乃梁の敵を閑山島の広い海に誘き寄せた。鶴翼の陣を敷け！"
								}},
								{idx:31, team:"enemy", pos:"right", txt:{//와키자카 야스하루
									ko:"조선 수군이 학익진을? 포위당했다! 뚫어라! 전속력으로 돌파하라!",
									en:"The Joseon Navy uses the Crane Wing? We are surrounded! Break through! Full speed ahead!",
									jp:"朝鮮水軍が鶴翼の陣を？包囲された！突破せよ！全速力で突破せよ！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"일제히 발포하라! 적의 기세를 꺾어라!",
									en:"Fire all at once! Break their momentum!",
									jp:"一斉に発砲せよ！敵の気勢を挫け！"
								}},
								{idx:31, team:"enemy", pos:"right", txt:{//와키자카 야스하루
									ko:"크윽... 배가... 침몰한다... 이대로 당할 수는...",
									en:"Ugh... the ship... is sinking... I cannot be defeated like this...",
									jp:"くっ…船が…沈没する…このままやられるわけには…"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"한 놈도 살려보내지 마라! 계속 공격하라!",
									en:"Do not let a single one escape! Continue the attack!",
									jp:"一人も生かして帰すな！攻撃を続けろ！"
								}}
							],
							lineup:0,
							map:[
								10,11,12,10,10,
								12,11,11,10,11,
								10,2,10,2,10,
								1,1,2,1,1,
								0,0,1,0,0,
								1,0,2,0,2,
								0,15,0,1,1,
								15,2,0,2,30,
								0,30,1,0,16,
								0,0,15,15,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:31, lv:1, grade:5, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:2000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:200},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1592년 안골포해전",
								en:"1592 Angolpo Sea Battle",
								jp:"1592年の安骨浦海戦",
							},
							history:{
								ko:"임진왜란 초기 1592년 임진년 (선조 25년) 7월 10일 전라좌수사	이순신이 이끄는 조선수군 연합함대가 진해 땅 안골포에서 구키 요시타카와 가토 요시아키가 이끄는 일본수군 정예함대 42척을 격파하여 승리를 거둔 해전이다.",
								en:"It is a naval battle that took place on July 10, 1592, during the Imjin War, in the year of Imjin (25th ancestor), when a combined fleet of Korean naval forces led by Yi Sun-sin, a leftist fighter from Jeolla Province, defeated 42 elite Japanese naval forces led by Kuki-Yoshitaka and Kato-Yoshiaki at Angolpo in the Jinhae land.",
								jp:"壬辰倭乱初期、1592年(宣祖25年)7月10日、全羅左水師李舜臣が率いる朝鮮水軍連合艦隊が、鎮海の地安骨浦で久喜義隆と加藤嘉章が率いる日本水軍の精鋭艦隊42隻を撃破して勝利を収めた海戦です。",
							},//이순신, 원균, 이억기, 권준, 어영담, 무의공 이순신, 김완, 신호, 정운, 배홍립, 김인영, 이언량, 송희립, 나대용, 우치적.... vs 구키 요시타카, 가토 요시아키
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적선들이 안골포 깊숙히 숨어있다. 교대로 침투하여 사격하라!",
									en:"Enemy ships are hidden deep in Angolpo. Infiltrate in turns and fire!",
									jp:"敵船が安骨浦の奥深くに隠れている。交代で浸透し、射撃せよ！"
								}},
								{idx:32, team:"enemy", pos:"right", txt:{//구키 요시타카
									ko:"이순신... 집요한 놈이구나. 내 수군을 여기서 잃을 순 없다.",
									en:"Yi Sun-sin... you persistent fellow. I cannot lose my navy here.",
									jp:"李舜臣…執拗な奴だな。俺の水軍をここで失うわけにはいかない。"
								}},
								{idx:33, team:"enemy", pos:"right", txt:{//가토 요시아키
									ko:"구키님, 우리가 나설 차례입니다! 일본 수군의 저력을 보여줍시다!",
									en:"Lord Kuki, it is our turn! Let's show them the power of the Japanese Navy!",
									jp:"九鬼様、我らが出る番です！日本水軍の底力を見せつけましょう！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들이 나오지 못하게 입구를 봉쇄하고 포격하라!",
									en:"Blockade the entrance so they cannot come out, and bombard them!",
									jp:"敵が出てこられないように入口を封鎖し、砲撃せよ！"
								}},
								{idx:32, team:"enemy", pos:"right", txt:{//구키 요시타카
									ko:"으윽... 나갈 수가 없다! 이대로 당할 수밖에 없는가!",
									en:"Ugh... we cannot go out! Are we to be defeated like this!",
									jp:"うっ…出られない！このままやられるしかないのか！"
								}},
								{idx:33, team:"enemy", pos:"right", txt:{//가토 요시아키
									ko:"버텨라! 지원군이 올 때까지 버텨야 한다!",
									en:"Hold on! We must hold on unitl reinforcements arrive!",
									jp:"耐えろ！援軍が来るまで耐えねばならん！"
								}}
							],
							lineup:0,
							map:[
								11,11,12,11,11,
								12,10,2,10,12,
								11,0,0,0,11,
								10,30,0,30,10,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
								0,2,0,2,0,
								0,0,1,0,0,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{pos:1,idx:32, lv:50, grade:3, items: []},{pos:3,idx:33, lv:50, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:2500},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:250},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1592년 부산포해전",
								en:"1592 Busanpo Sea Battle",
								jp:"1592年釜山浦海戦",
							},
							history:{
								ko:"임진왜란 초기 1592년 (선조 25년) 임진년 9월 1일, 부산포에서 벌어진 해전이며, 일본군의 본영이자 전진기지가 크게 타격을 받아 전선 최소 130척이 침몰되는 막대한 피해를 입었으며 이 해전 이후 일본군은 본영이자 전진기지인 부산포 조차도 언제든지 조선 수군에게 공격을 받아 무너질 수 있다는 두려움이 생겨나 공포에 벌벌 떨게 되었다. 이 해전에서 전라좌수영 최고의 돌격장 녹도만호 정운이 왜적의 대조총에 맞아 전사했다.",
								en:"It is a naval battle that took place at Busanpo on September 1, 1592 (25th year of Seonjo), at the beginning of the Imjin War, and the Japanese army's main base and forward base was heavily damaged, and at least 130 ships were sunk. After this naval battle, the Japanese army was terrified that even their main base and forward base, Busanpo, could be attacked and destroyed by the Korean navy at any time. In this naval battle, Jeollanam-do's best assault captain, Jeong-un of the Nokdomanho, was killed by the enemy's control guns.",
								jp:"壬辰倭乱初期1592年(宣祖25年)9月1日、釜山浦で行われた海戦で、日本軍の本営であり前進基地が大きな打撃を受け、前線少なくとも130隻が沈没する甚大な被害を受け、この海戦以降、日本軍は本営であり前進基地である釜山浦もいつでも朝鮮水軍の攻撃を受け崩れる恐れが生じ、恐怖に怯えるようになった。この海戦で全羅左水軍最高の突撃隊長であった緑島湾号鄭雲(チョンウン)が敵の大台銃に当たって戦死した。",
							},// 이순신, 원균, 이억기, 정운, 권준, 어영담, 신호, 김완, 무의공 이순신, 우치적, 황세득, 나대용, 송희립, 이영남 vs 도도 다카도라, 구키 요시타카
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"여기가 적의 본거지 부산포다! 모든 화력을 집중하라!",
									en:"This is the enemy's main base, Busanpo! Concentrate all firepower!",
									jp:"ここが敵の本拠地、釜山浦だ！全火力を集中せよ！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라
									ko:"이순신이 여기까지 쳐들어오다니! 막아라! 목숨을 걸고 막아!",
									en:"Yi Sun-sin has come this far! Stop him! Stop him with your lives!",
									jp:"李舜臣がここまで攻めてくるとは！防げ！命を懸けて防げ！"
								}},
								{idx:36, team:"ally", pos:"right", txt:{//정운
									ko:"장군! 제가 선봉에 서겠습니다! 왜놈들을 쓸어버리겠습니다! 돌격!",
									en:"General! I will take the vanguard! I will sweep away the Japanese! Charge!",
									jp:"将軍！私が先鋒に立ちます！倭人どもを一掃してやります！突撃！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라
									ko:"저 놈이 선봉이다! 집중 사격하라!",
									en:"That one is the vanguard! Focus fire!",
									jp:"あいつが先鋒だ！集中射撃せよ！"
								}},
								{idx:36, team:"ally", pos:"right", txt:{//정운
									ko:"으악! ...장군... 부디 승리를...",
									en:"Argh! ...General... please achieve victory...",
									jp:"ぐわっ！…将軍…どうか勝利を…"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"정운!!! ...네 원수를 갚아주마! 전군, 적을 섬멸하라!",
									en:"Jeong Un!!! ...I will avenge you! All forces, annihilate the enemy!",
									jp:"鄭運！！！…お前の仇を討ってやる！全軍、敵を殲滅せよ！"
								}}
							],
							lineup:0,
							map:[
								11,11,11,11,11,
								12,12,12,12,12,
								10,10,10,10,10,
								0,0,2,0,0,
								0,2,1,2,0,
								0,0,2,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{pos:1,idx:28, lv:50, grade:4, items: []},{pos:3,idx:32, lv:50, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:3000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:300},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1593년 웅포해전",
								en:"1593 Woongpo Sea Battle",
								jp:"1593年の雲浦海戦",
							},
							history:{
								ko:"임진왜란 당시였던 1593년 (선조 26년) 계사년 2월 10일 ~ 3월 6일 전라좌도 수군절도사 이순신이 이끄는 조선수군 연합함대가 웅천 (웅포)에서 약 1개월 간 7번 접전을 펼친 끝에 일본군을 무찌르고 승리를 거둔 해전이자 임진왜란 최초로 이순신이 상륙전을 전개했던 해전이다.",
								en:"It is a naval battle during the Imjin War, when the combined fleet of the Joseon Navy led by Yi Sun-sin, a naval pirate from Jeolla-do, defeated the Japanese army after seven battles at Ungcheon (Ungpo) for about a month, and was the first naval battle in the Imjin War in which Yi Sun-sin conducted a landing.",
								jp:"壬辰倭乱当時である1593年(朝鮮王朝26年)癸巳年2月10日～3月6日、全羅座道水軍節度使李舜臣が率いる朝鮮水軍連合艦隊が雲川(ウンポ)で約1ヶ月間7回の接戦を繰り広げた末、日本軍を破り勝利を収めた海戦であり、壬辰倭乱で初めて李舜臣が上陸戦を展開した海戦である。",
							}, //이순신, 원균, 이억기 vs 와키자카 야스하루, 쵸소카베 치카우지, 구와나 치카카츠, 하타 치카시
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들이 상륙하려 한다. 수륙 협공으로 적을 섬멸하라!",
									en:"The enemy is trying to land. Destroy them with a coordinated amphibious attack!",
									jp:"敵が上陸しようとしている。水陸挟撃で敵を殲滅せよ！"
								}},
								{idx:31, team:"enemy", pos:"right", txt:{//와키자카 야스하루
									ko:"이순신... 이번엔 육지에서 결판을 내주마! 상륙하라!",
									en:"Yi Sun-sin... I will settle this on land this time! Land the troops!",
									jp:"李舜臣…今度は陸で決着をつけてやる！上陸せよ！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"상륙을 허용해선 안 된다! 포격하라!",
									en:"Do not allow them to land! Fire!",
									jp:"上陸を許してはならない！砲撃せよ！"
								}},
								{idx:31, team:"enemy", pos:"right", txt:{//와키자카 야스하루
									ko:"제기랄... 포격이 너무 거세다... 다가갈 수가 없다!",
									en:"Damn it... the shelling is too intense... we cannot get close!",
									jp:"くそっ…砲撃が激しすぎる…近づけない！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적의 기세가 꺾였다! 돌격하라!",
									en:"The enemy's momentum is broken! Charge!",
									jp:"敵の気勢が挫けた！突撃せよ！"
								}}
							],
							lineup:0,
							map:[
								11,11,11,11,11,
								12,12,12,12,12,
								30,0,2,0,30,
								0,2,1,2,0,
								0,0,30,0,0,
								0,0,0,0,0,
								12,0,12,0,12,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:31, lv:45, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:3000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:300},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1594년 제2차 당항포해전",
								en:"1594 Second Tanghangpo Sea Battle",
								jp:"1594年 第2次唐杭浦海戦",
							},
							history:{
								ko:"수륙 병진책이 무산된 일본 수군이 거제도 내륙을 오가며 살인·납치·약탈을 일삼던 1594년 3월 4일(양력 4월 23일)에 행해졌다. 아군 연합 전선 124척이 참가한 대규모 해전으로, 삼도 수군 통제사 이순신의 치밀하고 신속하며 정확한 전략으로 압승을 거둔 해전이다. 연합 함대의 제6차 출전이자, 전투로는 12번째 해전이다.",
								en:"It took place on March 4, 1594 (April 23, Gregorian calendar), when the Japanese navy, having failed in its amphibious assault, sailed inland from Geoje Island, killing, kidnapping, and plundering. It was a large-scale naval battle involving 124 ships from allied naval fronts, and was won by Yi Sun-sin, the naval commander of the Three Kingdoms, through his precise, swift, and accurate strategy. It was the sixth appearance of the combined fleet and the 12th naval battle.",
								jp:"水陸兵進策が失敗した日本水軍が巨済島内陸を行き来し、殺人・拉致・略奪を繰り返していた1594年3月4日(陽暦4月23日)に行われた。味方連合戦線124隻が参加した大規模な海戦で、三島水軍統制使李舜臣の緻密で迅速かつ正確な戦略で圧勝した海戦である。連合艦隊の6回目の出場であり、戦闘としては12回目の海戦である。",
							}, // 이순신, 어영담, 이억기, 김완, 무의공 이순신, 권준, 황세득, 송희립, 이언량, 신호, 배흥립 vs 나가오카 다다오키, 기무라 시게코레
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"거제도로 들어온 왜군을 소탕하라!",
									en:"Sweep away the Japanese troops that have entered Geoje Island!",
									jp:"巨済島に入ってきた倭軍を掃討せよ！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라 (Generic Commander)
									ko:"이순신이다! 또 그가 왔다!",
									en:"It's Yi Sun-sin! He is here again!",
									jp:"李舜臣だ！また彼が来た！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들의 퇴로를 차단하라! 한 놈도 놓치지 마라!",
									en:"Cut off their retreat! Do not miss a single one!",
									jp:"敵の退路を遮断せよ！一人も逃すな！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라
									ko:"도망칠 곳이 없다... 싸워라! 죽기 살기로 싸워라!",
									en:"There is nowhere to run... Fight! Fight for your lives!",
									jp:"逃げる場所がない…戦え！死に物狂いで戦え！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"승리는 우리의 것이다! 전군 돌격!",
									en:"Victory is ours! All forces charge!",
									jp:"勝利は我々のものだ！全軍突撃！"
								}}
							],
							lineup:0,
							map:[
								11,10,12,10,11,
								10,12,11,12,10,
								0,0,0,0,0,
								0,30,0,30,0,
								0,0,0,0,0,
								0,10,11,10,0,
								12,0,0,0,12,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:28, lv:40, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, }, // Generic Boss
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:3000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:300},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1594년 장문포해전",
								en:"1594 Jangmunpo Sea Battle",
								jp:"1594年 長門浦海戦",
							},
							history:{
								ko:"임진왜란 기간에 이순신이 9차례 출전해 총 17회에 걸쳐 벌인 크고 작은 해전 가운데서 가장 성과가 적었던 해전으로 일본군이 적극적으로 교전을 회피하여 싸움다운 싸움이 벌어지지도 않았다.",
								en:"Of the 17 naval battles, large and small, in which Yi Sun-sin fought nine times during the Imjin War, this was the least successful, as the Japanese actively avoided engagement and did not even come down to a fight.",
								jp:"壬辰倭乱期間中、李舜臣が9回出撃し、合計17回に渡って行った大小の海戦の中で最も成果が少なかった海戦で、日本軍が積極的に交戦を回避し、戦いらしい戦いも行われなかった。",
							}, // 이순신, 윤두수, 곽재우, 김덕령 vs 시마즈 요시히로, 시마즈 도요히사, 후쿠시마 마사노리, 조소카베 모토치카, 이코마 지카마사, 가토 기요마사
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"왜군이 성에 틀어박혀 나오질 않는다. 무리하게 공격하지 마라.",
									en:"The Japanese troops are holed up in the castle and won't come out. Do not attack recklessly.",
									jp:"倭軍が城に閉じこもって出てこない。無理に攻撃するな。"
								}},
								{idx:44, team:"ally", pos:"left", txt:{//김덕령 (의병장)
									ko:"장군! 저희가 육지에서 공격하여 저들을 끌어내겠습니다!",
									en:"General! We will attack from land and flush them out!",
									jp:"将軍！我々が陸地から攻撃して彼らを引きずり出します！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//시마즈 요시히로
									ko:"절대 나가지 마라! 성을 사수하라! 버티면 이긴다!",
									en:"Do not go out! Defend the castle! If we hold out, we win!",
									jp:"絶対に出るな！城を死守せよ！耐えれば勝つ！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들이 나올 생각이 없군... 화공으로 적을 괴롭혀라!",
									en:"They have no intention of coming out... Harass them with fire attacks!",
									jp:"敵は出てくる気がないな…火攻めで敵を苦しめろ！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//시마즈 요시히로
									ko:"끄떡없다! 자리를 지켜라!",
									en:"It's nothing! Hold your positions!",
									jp:"びくともしない！席を守れ！"
								}}
							],
							lineup:0,
							map:[
								10,11,12,11,10,
								11,12,10,12,11,
								10,11,12,11,10,
								12,0,0,0,12,
								2,2,1,2,2,
								0,0,2,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:28, lv:40, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, }, // Generic Boss
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:3000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:300},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1597년 칠천량해전",
								en:"1597 Chilcheonryang Sea Battle",
								jp:"1597年七千両海戦",
							},
							history:{
								ko:"정유재란 당시였던 1597년 (선조 30년) 7월 16일 새벽, 경상도 거제도와 칠천도 사이의 해협 '칠천량'에서 조선 수군이 일본군의 기습을 받자, 삼도수군통제사 원균이 막다른 해협으로 함대를 몰아넣고, 함대를 스스로 불사르고, 육지로 병력들을 내려 흩어지게 해 모두 학살당했다. 이때 손실된 전력은 전쟁 말기까지도 재건이 되지 못했고 당시 조정에서는 중신들이 당쟁에 휘말려 이순신을 하옥하고 원균을 수군통제사로 임명한 상태였다.",
								en:"In the early morning hours of July 16, 1597 (30th year of Seonjo), during the time of Jeonghwaejae, when the Joseon navy was ambushed by the Japanese at Chilcheonryang, a strait between Geojedo Island and Chilcheon Island in Gyeongsangnam-do, Won Gyun, the naval commander of the Three Kingdoms, drove the fleet into a dead-end strait, set the fleet on fire, sent his troops ashore to scatter, and massacred them all. At this time, the loss of power was not rebuilt until the end of the war, and at that time, the court was embroiled in a party dispute, and Yi Sun-sin was deposed and Won-gyun was appointed as the naval commander.",
								jp:"丁酉再亂当時である1597年(宣祖30年)7月16日未明、慶尚南道巨済島と七千島間の海峡「七千梁」で朝鮮水軍が日本軍の奇襲を受けると、三道水軍統制使の元均が行き止まりの海峡に艦隊を追い込み、艦隊を自ら焼却し、陸地に兵士たちを降ろして散らばらせ、全員虐殺された。この時、失われた戦力は戦争末期まで再建されず、当時の朝廷では重臣たちが党争に巻き込まれ、李舜臣を幽閉し、元均を水軍統制使に任命した状態だった。",
							},//원균, 이억기, 최호, 배설, 김완, 배홍립, 우치적 vs 시마즈 요시히로, 가토 요시아키, 와키자카 야스하루, 시마즈 토요히사, 구키 요시타카, 고니시 유키나가, 도도 다카토라, 간 미치나가
							conversation:[
								{idx:34, team:"ally", pos:"right", txt:{//원균
									ko:"으악! 기습이다! 당황하지 마라! 전군 요격하라!",
									en:"Argh! It's an ambush! Do not panic! All forces intercept!",
									jp:"うわっ！奇襲だ！慌てるな！全軍迎撃せよ！"
								}},
								{idx:33, team:"enemy", pos:"right", txt:{//가토 요시아키
									ko:"조선 수군은 독 안에 든 쥐다. 전멸시켜라!",
									en:"The Joseon Navy is a rat in a jar. Exterminate them!",
									jp:"朝鮮水軍は袋のネズミだ。全滅させろ！"
								}},
								{idx:38, team:"ally", pos:"left", txt:{//배설
									ko:"장군! 함대가 무너지고 있습니다! 후퇴해야 합니다!",
									en:"General! The fleet is collapsing! We must retreat!",
									jp:"将軍！艦隊が崩れています！撤退しなければなりません！"
								}},
								{idx:34, team:"ally", pos:"right", txt:{//원균
									ko:"무슨 소리냐! 싸워라! 도망치는 놈은 내가 베겠다!",
									en:"What are you saying! Fight! I will cut down anyone who runs!",
									jp:"何言ってるんだ！戦え！逃げる奴は俺が斬る！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신 (과거 회상 혹은 부재중 상황 묘사, 실제로는 원균이 지휘)
									ko:"(원균... 자네의 오판이 조선 수군을 위기로 몰아넣었네...)",
									en:"(Won Gyun... your misjudgment has put the Joseon Navy in crisis...)",
									jp:"(元均…お前の誤判が朝鮮水軍を危機に追い込んだ…)"
								}}
							],
							lineup:0,
							map:[
								11,11,12,11,11,
								12,10,0,10,12,
								11,0,30,0,11,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,30,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{pos:1,idx:28, lv:55, grade:5, items: []},{pos:2,idx:31, lv:55, grade:5, items: []},{pos:3,idx:33, lv:55, grade:5, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:3500},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:350},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1597년 명량해전",
								en:"1597 Mingyuan Sea Battle",
								jp:"1597年明暦の海戦",
							},
							history:{
								ko:"정유재란 당시였던 1597년 정유년 (선조 30년) 9월 16일 전라좌도 수군절도사 겸 통제사 이순신이 이끄는 조선 수군 연합함대가 명량수도에서 일본군 함대를 대파하여 망국의 위기에 처한 조선을 구해낸 기적 같은 대첩이다.\n조선 수군 판옥선 13척과 일본군 함대 133척이 맞붙어서 고작 13척이 전부였던 조선 수군이 10배가 넘는 일본군을 궤멸시키고 압도적인 승리를 거둔 대첩이다.",
								en:"It is a miraculous daring that saved the Joseon Dynasty from the brink of ruin by defeating the Japanese fleet in Myeongnyang Capital on September 16, 1597, the year of Jeongju (30th year of Seonjo), led by Yi Sun-sin, the naval commander and controller of the Joseon Dynasty.\nIt was a daring duel between 13 Joseon Dynasty Pan-Ok ships and 133 ships of the Japanese fleet, and the Joseon Dynasty, which had only 13 ships, won an overwhelming victory over the Japanese fleet, which was 10 times larger.",
								jp:"丁酉再亂当時である1597年(宣祖30年)9月16日、全羅座道水軍節度使兼統制使李舜臣が率いる朝鮮水軍連合艦隊が明凉水都で日本軍艦隊を撃破し、滅亡の危機に陥った朝鮮を救った奇跡的な大捷である。朝鮮水軍の板옥船13隻と日本軍艦隊133隻が対峙し、わずか13隻しかなかった朝鮮水軍が10倍以上の日本軍を撃破し、圧倒的な勝利を収めた大捷である。",
							}, // 이순신, 김응함, 조계종, 우수, 안위, 정응두, 김억추, 배홍립, 민정붕, 소계남, 송여종, 나대용, 이응표, 류형 vs 도도 다카토라, 구루시마 미치후사, 와키자카 야스하루, 간 마사카게, 모리 다카마사, 하타 치카시
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"신에게는 아직 12척의 배가 남아있사옵니다. 죽고자 하면 살 것이요, 살고자 하면 죽을 것이다!",
									en:"I still have 12 ships. Those who seek death shall live, and those who seek life shall die!",
									jp:"私にはまだ12隻の船が残っております。死のうとすれば生き、生きようとすれば死ぬだろう！"
								}},
								{idx:29, team:"enemy", pos:"right", txt:{//구루시마 미치후사
									ko:"고작 12척이라니... 단숨에 밟아버려라!",
									en:"Only 12 ships... Crush them at once!",
									jp:"たった12隻だと…一気に踏み潰せ！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"울돌목의 물살을 이용해 적을 섬멸하라!",
									en:"Use the currents of Uldolmok to destroy the enemy!",
									jp:"鳴梁の潮流を利用して敵を殲滅せよ！"
								}},
								{idx:24, team:"ally", pos:"left", txt:{//김응함
									ko:"장군! 적의 수가 너무 많습니다! 버틸 수가 없습니다!",
									en:"General! The enemy is too numerous! We cannot hold out!",
									jp:"将軍！敵の数が多すぎます！耐えられません！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"물러서지 마라! 내가 앞장서겠다! 적의 대장선을 쳐라!",
									en:"Do not retreat! I will lead the way! Strike the enemy flagship!",
									jp:"退くな！私が先頭に立つ！敵の大将船を討て！"
								}},
								{idx:29, team:"enemy", pos:"right", txt:{//구루시마 미치후사
									ko:"이놈들... 왜 무너지지 않는 거냐! 으악!",
									en:"You bastards... why won't you fall! Argh!",
									jp:"貴様ら…なぜ崩れないんだ！ぐわっ！"
								}}
							],
							lineup:0,
							map:[
								11,10,2,10,11,
								11,10,2,10,11,
								11,0,0,0,11,
								0,0,2,0,0,
								0,2,1,2,0,
								0,0,2,0,0,
								0,0,0,0,0,
								11,0,2,0,11,
								11,10,0,10,11,
								11,0,0,0,11,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{pos:1,idx:28, lv:60, grade:6, items: []},{pos:2,idx:29, lv:60, grade:6, items: []},{pos:3,idx:31, lv:60, grade:6, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:4000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:400},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1598년 절이도해전",
								en:"1598 Jeolido Sea Battle",
								jp:"1598年 節井島海戦",
							},
							history:{
								ko:"명량 해전 이후 함대 재건을 어느 정도 진행한 이순신의 조선 수군이 도도 다카토라, 가토 요시아키의 일본 수군과 정면으로 교전한 전투이다. 조선 수군은 일본 수군의 기습을 간파하여 전선 50여 척을 격침시켰다.",
								en:"Yi Sun-sin's Korean navy, which had somewhat rebuilt its fleet after the Battle of Myeongnyang, engaged the Japanese naval forces of Takatora Dodo and Yoshiaki Kato head-on. The Korean navy was able to recognize the Japanese naval ambush and destroyed more than 50 ships in the line.",
								jp:"明良海戦後、艦隊の再建をある程度進めた李舜臣の朝鮮水軍が、藤堂高虎、加藤嘉明の日本水軍と正面から交戦した戦いである。朝鮮水軍は日本水軍の奇襲を見破り、前線50余隻を撃沈させた。",
							}, //이순신, 무의공 이순신, 송여종, 배홍립, 우치적, 이언량, 나대용, 송희립 vs 도도 다카도라, 가토 요시아키
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들이 함대를 재건하여 다시 도전해왔다. 이번에야말로 뿌리를 뽑아야 한다.",
									en:"The enemy has rebuilt their fleet and challenged us again. We must root them out this time.",
									jp:"敵が艦隊を再建して再び挑んできた。今回こそ根絶やしにしなければならない。"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라
									ko:"이순신 네이놈! 이번엔 절대 당하지 않는다!",
									en:"Yi Sun-sin! I will not be defeated this time!",
									jp:"李舜臣！今度こそ絶対に負けない！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"적들이 우리의 유인책에 걸려들었다. 복병을 출동시켜라!",
									en:"The enemy has fallen for our lure. Send out the ambush troops!",
									jp:"敵が我々の誘引策に引っかかった。伏兵を出動させろ！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라
									ko:"복병이라고? 함정이다! 후퇴하라! 전군 후퇴!",
									en:"Ambush? It's a trap! Retreat! All forces retreat!",
									jp:"伏兵だと？罠だ！撤退せよ！全軍撤退！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"도망치게 두지 마라! 끝까지 추격하여 수장을 시켜라!",
									en:"Do not let them escape! Chase them to the end and bury them at sea!",
									jp:"逃がすな！最後まで追撃して水葬にせよ！"
								}}
							],
							lineup:0,
							map:[
								30,12,11,12,30,
								11,10,10,10,11,
								10,10,0,10,10,
								0,0,30,0,0,
								0,0,0,0,0,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
								1,0,0,0,1,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{pos:1,idx:28, lv:60, grade:5, items: []},{pos:2,idx:33, lv:60, grade:5, items: []},{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:4000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:400},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1598년 왜교성전투",
								en:"1598 Waegyoseong Battle",
								jp:"1598年の倭京城の戦い",
							},
							history:{
								ko:"임진왜란 시기 1598년 음력 9월 20일 ~ 10월 7일에 조명연합군과 일본군이 얽혀 싸운 격전. 순천왜성 전투라고도 한다. 1598년 8월 18일 도요토미 히데요시가 사망하였다. 그 직후 오대로들은 히데요시의 죽음을 비밀로 하고 조선에 주둔한 군대를 철수시킬 것을 의결한다.",
								en:"A battle fought between the forces of the Joseon Dynasty and the Japanese between September 20 and October 7, 1598, during the Imjin War. It is also known as the Battle of Suncheon Fortress. On August 18, 1598, Toyotomi Hideyoshi died. Shortly thereafter, the Five Great Houses voted to keep Hideyoshi's death a secret and to withdraw the troops stationed in Joseon.",
								jp:"壬辰倭乱の時期、1598年9月20日～10月7日に照明連合軍と日本軍が絡んで戦った激戦。順天倭城の戦いとも呼ばれる。1598年8月18日、豊臣秀吉が死亡した。その直後、大老たちは秀吉の死を秘密にし、朝鮮に駐留していた軍隊を撤退させることを議決する。",
							}, //이순신, 권율, 무의공 이순신, 황세득, 이언량, 배홍립, 방덕룡, 류형, 이영남, 우치적, 나대용, 송희립 vs 고니시 유키나가, 오야노 다네모토, 오야노 다네하카루, 마츠라 시게노부, 아리마 하루노부, 오무라 요시아키, 우치노미야 쿠니츠나, 고토 하루마사, 스모토 미치타카
							//명나라 유정, 진린, 등자룡 참전
							conversation:[
								{idx:40, team:"ally", pos:"right", txt:{//권율
									ko:"왜군이 왜교성에 고립되었다. 이순신 장군, 해상을 봉쇄해주시오.",
									en:"The Japanese are isolated in Waegyoseong. General Yi, please blockade the sea.",
									jp:"倭軍が倭京城に孤立した。李舜臣将軍、海上を封鎖してくれ。"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"알겠습니다. 단 한 척의 배도 빠져나가지 못하게 하겠습니다.",
									en:"Understood. I will not let a single ship escape.",
									jp:"分かりました。一隻の船も逃がしません。"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//고니시 유키나가 (Generic Commander)
									ko:"식량이 바닥나고 있다... 어떻게든 뚫고 나가야 한다!",
									en:"We are running out of food... We must break out somehow!",
									jp:"食糧が尽きつつある…何とかして突破しなければならない！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"포위망을 좁혀라! 적들이 말라죽게 만들어라!",
									en:"Tighten the siege! Let them starve to death!",
									jp:"包囲網を狭めろ！敵を干上がらせろ！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//고니시 유키나가
									ko:"명나라 수군 도독에게 뇌물을 보내라... 길을 열어줄지도 모른다.",
									en:"Send a bribe to the Ming naval commander... he might open a path.",
									jp:"明の水軍都督に賄賂を送れ…道を開けてくれるかもしれない。"
								}}
							],
							lineup:0,
							map:[
								11,11,11,11,11,
								12,12,12,12,12,
								10,12,11,10,10,
								0,0,0,0,0,
								0,2,0,2,0,
								0,0,0,0,0,
								11,0,0,0,11,
								0,0,0,0,0,
								30,0,0,0,30,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{pos:2,idx:28, lv:45, grade:3, items: []},{idx:'', lv:1, },{idx:'', lv:1, }, // Generic
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:4000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:400},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
						},
						{
							title:{
								ko:"1598년 노량해전",
								en:"1598 Noryang Sea Battle",
								jp:"1598年ノリョン海戦",
							},
							history:{
								ko:"정유재란 마지막 전투이다. 1598년 (선조 31년) 무술년 11월 19일 새벽 전라좌도 수군절도사 겸 삼도수군통제사 이순신과 명나라 수군도독 진린이 지휘하는 조선-명나라 연합함대가 노량해협에서 철수하는 일본군 함대 500척을 추격하여 퇴각로를 차단한 뒤 화공전술을 펼치며 맹렬하게 공격을 퍼부어 200척을 쳐부숴 불태우고 100척을 포획하는 등 일본군을 크게 무찌르고 승리를 거둔 해전이다.",
								en:"Yoo Jeong-jae is the final battle. In the early morning of November 19, 1598 (31st year of Seonjo), a combined Joseon-Ming fleet commanded by Yi Sun-sin, the naval commander of the Jeolla and Samdo navies, and Jin-lin, the naval commander of the Ming dynasty, chased a Japanese fleet of 500 ships retreating from the Noryang Strait, cut off their retreat route, and then launched a fierce attack with firepower, destroying and burning 200 ships and capturing 100 ships, greatly defeating the Japanese and achieving victory.",
								jp:"丁酉再亂は最後の戦いである。1598年(宣祖31年)武戌年(1598年)11月19日未明、全羅左道水軍節度使兼三道水軍統制使李舜臣(イ・スンシン)と明の水軍統制使秦麟(ジンリン)が指揮する朝鮮・明の連合艦隊が、老梁海峡から撤退する日本軍艦隊500隻を追撃し、退却路を遮断した後、火工戦術を駆使して猛烈な攻撃を仕掛け、200隻を打ち砕き、燃やし、100隻を捕獲するなど、日本軍を大きく打ち破り勝利を収めた海戦です。",
							}, //이순신, 진린, 무의공 이순신, 안위, 송희립, 우치적, 나대용, 이언량, 이회, 이완등.... vs 시마즈 요시히로, 고니시 유키나가, 다치바나 모네시게, 소 요시토시, 시마즈 토요히사, 시마즈 타다츠네, 테라자와 마사시게, 타카하시 무네마스, 쓰쿠시 히로카도, 모리 히데카네, 요코히라 타카시게, 마치다 히사마사, 이케베 사다마사, 키이레 세주노카미, 키바야마 쿠다카, 아리마 하루노부, 마츠라 시게노부
							conversation:[
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"이 원수만 갚을 수 있다면 죽어도 여한이 없겠습니다. 천지신명이시여, 도와주소서!",
									en:"If I can just avenge this enemy, I will die with no regrets. Heaven and earth, please help me!",
									jp:"この敵さえ討てれば、死んでも悔いはありません。天地神明よ、お助けください！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"전군 발포하라! 적들을 한 놈도 살려보내지 마라!",
									en:"All forces fire! Do not let a single enemy escape!",
									jp:"全軍発砲せよ！敵を一匹も生かして帰すな！"
								}},
								{idx:28, team:"enemy", pos:"right", txt:{//도도 다카토라 (시마즈 대역)
									ko:"후퇴하라! 이순신은 괴물이다! 도망쳐!",
									en:"Retreat! Yi Sun-sin is a monster! Run away!",
									jp:"撤退せよ！李舜臣は怪物だ！逃げろ！"
								}},
								{idx:21, team:"ally", pos:"left", txt:{//이순신
									ko:"(탐!)... 싸움이 급하다... 나의 죽음을 알리지 마라...",
									en:"(Bang!)... The battle is urgent... Do not announce my death...",
									jp:"(ターン！)…戦いが急だ…私の死を知らせるな…"
								}},
								{idx:55, team:"ally", pos:"left", txt:{//송희립/나대용 등 부관
									ko:"장군! 장군! ...장군께서 잠시 기절하셨다! 계속 싸워라!",
									en:"General! General! ...The General has just fainted! Keep fighting!",
									jp:"将軍！将軍！…将軍が少し気絶された！戦い続けろ！"
								}},
								{idx:59, team:"ally", pos:"right", txt:{//진린 (명나라 제독 - 가상 ID)
									ko:"노장군... 당신은 진정한 영웅이오... 내 남은 적을 쓸어버리리라!",
									en:"Old General... you are a true hero... I will sweep away the remaining enemies!",
									jp:"老将軍…あなたは真の英雄だ…私が残りの敵を一掃しよう！"
								}}
							],
							lineup:0,
							map:[
								11,10,2,10,11,
								10,12,1,12,10,
								30,2,0,2,30,
								0,0,30,0,0,
								2,1,2,1,2,
								0,0,30,0,0,
								30,2,0,2,30,
								0,0,0,0,0,
								11,0,0,0,11,
								0,0,0,0,0,
							],
							entry:[
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{pos:1,idx:28, lv:65, grade:6, items: []},{pos:2,idx:31, lv:65, grade:6, items: []},{pos:3,idx:33, lv:65, grade:6, items: []},{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
								{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
							],
							drop:{
								first:[
									[
										{type:"Gold",num:5000},
										{type:"Etc",idx:"8"}
									]
								],
								always:[
									[
										{type:"Gold",num:500},
										{type:"Material",idx:"13",num:3}
									]
								]
							},
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
	mongolia0:[
		{
			name:'mongolia',
			scenarioList:[//징기즈칸
			]
		}
	],
	mongolia1:[
		{
			name:'mongolia',
			scenarioList:[//징기즈칸
			]
		}
	],
	mongolia2:[
		{
			name:'mongolia',
			scenarioList:[//징기즈칸
			]
		}
	],
	mongolia3:[
		{
			name:'mongolia',
			scenarioList:[//징기즈칸
			]
		}
	],
	mongolia4:[
		{
			name:'mongolia',
			scenarioList:[//징기즈칸
			]
		}
	],
	china0:[
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
	china1:[
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
	china2:[
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
	china3:[
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
	china4:[
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
	china5:[
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
	china6:[
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
	china7:[
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
	saudiArabia0:[
		{
			name:'saudiArabia',
			scenarioList:[
			]
		}
	],
	egypt0:[
		{
			name:'egypt',//(BC3000) period 0
			scenarioList:[//파라오, 예컨대 쿠푸, 핫셉수트, 투탕카문, 람세스
			]
		},
	],
	greece0:[
		{
			name:'greece',//(BC1100) period 0
			scenarioList:[//아테네: 소크라테스,플라톤,아리스토텔레스
			//스파르타
			//페르시아 전쟁, 펠로폰네소스 전쟁
			]
		}
	],
	italy0:[
		{
			name:'italy',//로마, 율리우스 카이사르(BC100) period 2
			scenarioList:[//포에니 전쟁,
			]
		},
	],
	france0:[
		{
			name:'france',
			scenarioList:[//나폴레옹, 잔다르크
			]
		}
	],
	spain0:[
		{
			name:'spain',
			scenarioList:[
			]
		},
	],
	portugal0:[
		{
			name:'portugal',
			scenarioList:[
			]
		},
	],
	unitedKingdom0:[
		{
			name:'unitedKingdom',
			scenarioList:[//리처드3세
			]
		}
	],
	unitedKingdom1:[
		{
			name:'unitedKingdom',
			scenarioList:[//리처드3세
			]
		}
	],
	macedonia0:[
		{
			name:'macedonia',//알렉산드로스 대왕(BC356) period 1
			scenarioList:[
			]
		}
	],
};