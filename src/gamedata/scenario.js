//cate(스킬종류, 배열) 중복가능 passive1, active3, buff5
//dmg_type 무(0),독(1),빛(2),암(3),물(4),불(5),바람(6),땅(7),치기(8),쪼기(9),할퀴기(10),물기(11),누르기(12),
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위
//num 효과
//sp 행동력
export const scenario = {
	china:{
		yin:{}, //(BC1600)
		ju:{}, //(BC10세기)
		chunchu:{}, //공자
		jin:{}, //(BC221)
		han:{}, //초한지(BC206)
		three:{}, //삼국지(BC220)
		dang:{}, //서유기(618)
		song:{}, //수호지
		ming:{}, //금병매(1368)
	},
	korea:{
		gojoseon:{}, //단군(BC2333)
		threeBefore:{}, //부여,옥저&동예,삼한
		three:{}, //신라(BC57)박혁거세, 고구려(BC37)주몽, 백제(BC18)온조
		ns:{}, //남북국시대 통일신라,발해 대조영(698)
		threeAfter:[
			{
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
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:24, lv:30, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{pos:3,idx:26, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:3,idx:26, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:4,idx:27, lv:33, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
						]
					},
					{
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
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
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
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:0,idx:24, lv:50, grade:7, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:23, lv:30, grade:7, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{pos:3,idx:26, lv:50, grade:6, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
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
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:0,idx:23, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{idx:'', lv:1, },{idx:'', lv:1, },
							{idx:'', lv:1, },{idx:'', lv:1, },{pos:1,idx:24, lv:30, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
								{},
								{},
								{},
								{},
							]},{pos:3,idx:26, lv:50, grade:4, items: [
								{idx:0, slot:0, hole:[], lv:2, upgrade:1},
								{idx:1, slot:0, hole:[], lv:2, upgrade:1},
								{idx:2, slot:0, hole:[], lv:2, upgrade:1},
								{idx:4, slot:0, hole:[], lv:2, upgrade:1},
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

		], //신라, 후백제(892)견훤, 후고구려(901)궁예, 왕건
		joseon:{}, //이성계(1392)
	},
	europe:{
		ancientEgypt:{}, //(BC3000)
		//파라오, 예컨대 쿠푸, 핫셉수트, 투탕카문, 람세스
		greece:{}, //(BC1100)
		//아테네: 소크라테스,플라톤,아리스토텔레스
		//스파르타
		//페르시아 전쟁, 펠로폰네소스 전쟁
		Alexander:{}, //그리스, 마케도니아 알렉산드로스 대왕(BC356)
		roma:{}, // 율리우스 카이사르(BC100)
		//포에니 전쟁,
		middleAge:{}, //(476)
	},
}