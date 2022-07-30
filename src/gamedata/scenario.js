//cate(스킬종류, 배열) 중복가능 passive1, active3, buff5
//dmg_type 무(0),독(1),빛(2),암(3),물(4),불(5),바람(6),땅(7),치기(8),쪼기(9),할퀴기(10),물기(11),누르기(12),
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위
//num 효과
//sp 행동력
export const scenario = {
	china:{
		yin:{}, //(BC1600) period:0
		ju:{}, //(BC10세기) period:1
		chunchu:{}, //공자 period:2
		jin:{}, //(BC221) period:3
		han:{}, //초한지(BC206) period:4
		three:{}, //삼국지(BC220) period:5
		dang:{}, //서유기(618) period:6
		song:{}, //수호지 period:7
		ming:{}, //금병매(1368) period:8
	},
	korea:{
		gojoseon:{}, //단군(BC2333) period:0
		threeBefore:{}, //부여,옥저&동예,삼한 period:1
		three:{}, //신라(BC57)박혁거세, 고구려(BC37)주몽, 백제(BC18)온조 period:2
		ns:{}, //남북국시대 통일신라,발해 대조영(698) period:3
		threeAfter:{ //신라, 후백제(892)견훤, 후고구려(901)궁예, 왕건 period:4
			xx: {
				name:"후삼국시대",
				stage:[
					{
						title:"후삼국시대 전투1",
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
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:24, lv:30, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{pos:3,idx:26, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:3,idx:26, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:4,idx:27, lv:33, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
						]
					},
					{
						title:"후삼국시대 전투2",
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
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
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
						title:"후삼국시대 전투3",
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
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:23, lv:30, grade:7, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{pos:3,idx:26, lv:50, grade:6, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
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
						title:"후삼국시대 전투4",
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
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:24, lv:30, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{pos:3,idx:26, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
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
			},
		},
		joseon1:{ //이성계(1392) 조선 초기 period:5
			xx:{
				name:"조선 초기",
				stage:[
				]
			}
		},
		joseon2:{ //이순신(1592) period:6
			LSS:{
				name:"이순신",
				stage:[
					{
						title:"1592년 옥포해전",
						conversation:[
							{idx:28, team:"enemy", pos:"left", txt: "쯧쯧.. <br/>멍청한 조선놈들, 어짜피 조선 군부는 이나라를 포기했다. 안봐도 나 도도의 승리다."},// 도도 다카토라
							{idx:54, team:"enemy", pos:"right", txt:"당연한 말씀입니다.<br/> 당연히 우리 대일본제국 해군의 위력에 비할수 있겠습니까?"},// 호리노우치 우지요시
							{idx:"", team:"ally", pos:"right", txt:"대장.. <br/>일본의 적함이 상당합니다.<br/> 도도 저자는 많은 정공을 세운 일본 제일의 장수라 하옵니다. <br/>우리 수군에 승산이 있을까요?"},// 조선병사1
							{idx:21, team:"ally", pos:"left", txt:"그들은 많은 승리로 콧대가 하늘을 찌를 것이다. 오히려 이때가 우리에겐 기회다."},// 이순신
							{idx:"", team:"ally", pos:"right", txt:"... <br/>(그렇다 하기엔 적군이 너무 많다..)"},// 조선병사2
							{idx:21, team:"ally", pos:"left", txt: "가자! 나를 따르라!!"},// 이순신
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
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{},
								{},
								{},
								{},
							]},{pos:2,idx:54, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:1, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:2, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
								{idx:4, slot:0, hole:[], lv:2, grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
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
						title:"1592년 사천해전",
						conversation:{
							
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
						entry:[],
					},
					{
						title:"1592년 당포해전",
						conversation:{
							
						},
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
						title:"1592년 당항포해전",
						conversation:{
							
						},
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
						title:"1592년 한산도대첩",
						conversation:{
							
						},
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
						title:"1592년 안골포해전",
						conversation:{
							
						},
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
						title:"1592년 부산포해전",
						conversation:{
							
						},
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
						title:"1593년 웅포해전",
						conversation:{
							
						},
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
						title:"1594년 제2차 당항포해전",
						conversation:{
							
						},
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
						title:"1594년 장문포해전",
						conversation:{
							
						},
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
						title:"1597년 칠천량해전",
						conversation:{
							
						},
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
						title:"1597년 명량해전",
						conversation:{
							
						},
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
						title:"1598년 절이도해전",
						conversation:{
							
						},
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
						title:"1598년 왜교성전투",
						conversation:{
							
						},
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
						title:"1598년 노량해전",
						conversation:{
							
						},
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
		},
		joseon3:{ // period 7

		}
	},
	japan:{
		junkuk:{} // peroid 0
	},
	europe:{
		ancientEgypt:{}, //(BC3000) period 0
		//파라오, 예컨대 쿠푸, 핫셉수트, 투탕카문, 람세스
		greece:{}, //(BC1100) period 1
		//아테네: 소크라테스,플라톤,아리스토텔레스
		//스파르타
		//페르시아 전쟁, 펠로폰네소스 전쟁
		Alexander:{}, //그리스, 마케도니아 알렉산드로스 대왕(BC356) period 2
		roma:{}, // 율리우스 카이사르(BC100) period 3
		//포에니 전쟁,
		middleAge:{}, //(476) period 4
	},
	asia:{
		
	}
}