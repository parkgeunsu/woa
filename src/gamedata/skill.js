// [cate] (스킬종류, 배열) 중복가능
// none1
// passive2, (전투 시작전 실행)
// active3(적군), (턴제로 실행)
// active4(본인), 바로실행 (ex: defence)
// buff5(아군) (턴제로 실행), 
// debuff6(적군) (턴제로 실행),
// active7(적군), 적군 디버프 추가 (턴제로 실행)
// active8(적군), 아군 버프 추가 (턴제로 실행)
// active9(적군), 상태이상 추가 (턴제로 실행) 삭제예정
// weather10(날씨), 날씨 변환 (턴제로 실행)
// job11(직업)
// passive12(조건부), (조건에 맞으면 실행)
// [element_type] 무속성(0),쪼기(1),할퀴기(2),물기(3),치기(4),누르기(5),던지기(6),빛(7),어둠(8),물(9),불(10),바람(11),땅(12)
// [eff] type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 행운LUK(9), 쪼기(11), 할퀴기(12), 물기(13), 치기(14), 누르기(15), 던지기(16), 빛(17), 어둠(18), 물(19), 불(20), 바람(21), 땅(22), 출혈(50), 중독(51), 석화(52), 혼란(53), 기절(54), 변이(55), 즉사(56), 패시브(100)
// [ta_] 아군0, 적군1
// [ta] getEffectArea 효과범위, passive일 경우 1:단일, 10:전체, 100:직업
// 영역 1단일, 2가로2, 3가로3, 4세로2, 5세로3, 6가로행, 7세로열, 8십자5, 9십자9, 10대각선/, 11대각선\, 12고정세로2열, 13고정세로3열, 15└┐, 16┌┘, 17卍, 18가로2행, 19가로3행, 20전체, 21정사각형9, 22정사각형4, 23자신, 24원, 25랜덤5, 26랜덤10, 27랜덤15, 28작은마름모, 29큰마름모, 30큰링, 31랜덤세로2열, 32랜덤세로3열, 33랜덤가로2행, 34랜덤가로3행, 35x자5, 36x자9 
// [atkCount] 공격횟수
// [buffCount] 유지되는 턴수
// [effAnimation] effect종류
// [sp] 스킬 사용가능 sp
// <area>, <dmg>, <el>
// $(turn) buffCount 상황변수, $(0) eff 상황변수, $<0> buff 상황변수
export const skill = [
	{idx:0,
		na:{ko:'대기',en:'Wait',jp:'スタンバイ'},element_type:0,cate:[4],
		txt:'<area>, <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:2,num:['100%','110%','120%','130%','150%']}],atkCount:[1],sp:0},
	{idx:1,
		na:{ko:'공격',en:'Attack',jp:'攻撃'},element_type:0,cate:[3],
		txt:'<area>, <dmg>, <el>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['100%','110%','125%','135%','150%']}],atkCount:[1],sp:0},
	{idx:2,
		na:{ko:'방어',en:'Defense',jp:'防衛'},element_type:0,cate:[4],
		txt:'<area>, <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:4,num:['100%','110%','125%','135%','150%']}],atkCount:[1],sp:0},
	{idx:3,
		na:{ko:'빛의 하수인',en:'Minions of Light',jp:'光の手先'},element_type:7,cate:[11],
		txt:'<possible><area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:17,num:['20%','20%','20%','20%','20%']}],atkCount:[0],sp:0},
	{idx:4,
		na:{ko:'어둠의 하수인',en:'Minions of Darkness',jp:'暗の手先'},element_type:8,cate:[11],
		txt:'<possible><area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:18,num:['20%','20%','20%','20%','20%']}],atkCount:[0],sp:0},
	{idx:5,
		na:{ko:'물의 하수인',en:'Minions of Water',jp:'水の手先'},element_type:9,cate:[11],
		txt:'<possible><area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:19,num:['20%','20%','20%','20%','20%']}],atkCount:[0],sp:0},
	{idx:6,
		na:{ko:'불의 하수인',en:'Minions of Fire',jp:'火の手先'},element_type:10,cate:[11],
		txt:'<possible><area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:20,num:['20%','20%','20%','20%','20%']}],atkCount:[0],sp:0},
	{idx:7,
		na:{ko:'바람의 하수인',en:'Minions of Wind',jp:'風の手先'},element_type:11,cate:[11],
		txt:'<possible><area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:21,num:['20%','20%','20%','20%','20%']}],atkCount:[0],sp:0},
	{idx:8,
		na:{ko:'땅의 하수인',en:'Minions of Earth',jp:'地の手先'},element_type:12,cate:[11],
		txt:'<possible><area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:22,num:['20%','20%','20%','20%','20%']}],atkCount:[0],sp:0},
	{idx:9,
		na:{ko:'빛의 정령',en:'Spirit of Light',jp:'光の精霊'},element_type:7,cate:[2],
		txt:'<area>, <el> <buff>',
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:17,num:['10%','20%','30%','40%','50%']}],atkCount:[0],sp:0},
	{idx:10,
		na:{ko:'어둠의 정령',en:'Spirit of Dark',jp:'暗の精霊'},element_type:8,cate:[2],
		txt:'<area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:18,num:['10%','20%','30%','40%','50%']}],atkCount:[0],sp:0},
	{idx:11,
		na:{ko:'물의 정령',en:'Spirit of Water',jp:'水の精霊'},element_type:9,cate:[2],
		txt:'<area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:19,num:['10%','20%','30%','40%','50%']}],atkCount:[0],sp:0},
	{idx:12,
		na:{ko:'불의 정령',en:'Spirit of Fire',jp:'火の精霊'},element_type:10,cate:[2],
		txt:'<area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:20,num:['10%','20%','30%','40%','50%']}],atkCount:[0],sp:0},
	{idx:13,
		na:{ko:'바람의 정령',en:'Spirit of Wind',jp:'風の精霊'},element_type:11,cate:[2],
		txt:'<area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:21,num:['10%','20%','30%','40%','50%']}],atkCount:[0],sp:0},
	{idx:14,
		na:{ko:'땅의 정령',en:'Spirit of Earth',jp:'地の精霊'},element_type:12,cate:[2],
		txt:'<area>, <el> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'slash0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:22,num:['10%','20%','30%','40%','50%']}],atkCount:[0],sp:0},
	{idx:15,
		na:{ko:'언변',en:'Speech',jp:'言論'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:1,
		eff:[{type:'grade',num:['10','20','30','40','50']}],sp:5},
	{idx:16,
		na:{ko:'선박 전문',en:'Ship Specialty',jp:'船舶専門'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:2,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:17,
		na:{ko:'장비 전문',en:'Equipment Specialty',jp:'設備専門'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:3,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:18,
		na:{ko:'조각',en:'Sculpture',jp:'彫刻'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:4,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:19,
		na:{ko:'식물 재배',en:'Plant Cultivation',jp:'植物栽培'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:1,effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:5,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:20,
		na:{ko:'연금술',en:'Alchemy',jp:'錬金術'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:6,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:21,
		na:{ko:'보석 세공',en:'Jewelry',jp:'宝石細工'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:7,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:22,
		na:{ko:'관찰력',en:'Observation',jp:'観察力'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:8,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},
	{idx:23,
		na:{ko:'예술',en:'Art',jp:'アート'},element_type:0,cate:[11],
		txt:'<job>',
		skillClass:2,
		ta_:0,ta:[],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',job:9,
		eff:[{type:'grade',num:['5','10','15','20','25']}],sp:5},	
	// {idx:4,
	// 	na:{ko:'학익진 강화',en:'Strengthening the formation of "Hakikjin"',jp:'学翼陣強化'},element_type:0,cate:[2],txt:{ko:'전투 참여시 <area>, 학익진효과 <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <area>, "Hak Ik jin" Formation Effect <b buff>$(0)</b> <i icon up></i> increase',jp:'戦闘参加時 <area>, 学翼陣効果 <b buff>$(0)</b> <i icon up></i> 増加'}
	// 	,ta_:0,ta:10,effAnimation:1
	// 	,eff:[{type:100,num:['20%','25%','30%','35%','40%']}],atkCount:[0],sp:0}, //이순신
	// {idx:5,
	// 	na:{ko:'격려',en:'Encouragement',jp:'激励'},element_type:0,cate:[2],txt:{ko:'전투 참여시 <area>, 진형효과 <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <area>, The Formative Effect <b buff>$(0)</b> <i icon up></i> increase',jp:'戦闘参加時 <area>, 陣形効果 <b buff>$(0)</b> <i icon up></i> 増加'}
	// 	,ta_:0,ta:10,effAnimation:1
	// 	,eff:[{type:100,num:['10%','15%','20%','25%','30%']}],atkCount:[0],sp:0},
	// {idx:9,
	// 	na:{ko:'집중타격',en:'Concentrated Attack',jp:'集中攻撃'},element_type:0,cate:[3],txt:{ko:'<area>, <b dmg>$(0)</b> 강한 공격',en:'<area>, <b dmg>$(0)</b> a strong attack',jp:'<area>, <b dmg>$(0)</b> 強い攻撃'}
	// 	,ta_:1,ta:1,effAnimation:2
	// 	,eff:[{type:3,num:['150%','175%','200%','225%','250%']}],atkCount:[1],sp:9},
	// {idx:10,
	// 	na:{ko:'때린데 또 까',en:'Hit again Hit',jp:'再びヒット'},element_type:0,cate:[3],txt:{ko:'<area>, <b dmg>$(0)</b> 2회 공격',en:'<area>, <b dmg>$(0)</b> a two-time attacks',jp:'<area>, <b dmg>$(0)</b> 2回攻撃'}
	// 	,ta_:1,ta:1,effAnimation:3
	// 	,eff:[{type:3,num:['80%','90%','100%','110%','120%']}],atkCount:[2],sp:8},
	// {idx:11,
	// 	na:{ko:'연속 공격',en:'Series of Attacks',jp:'連続攻撃'},element_type:0,cate:[3],txt:{ko:'<area>, <b dmg>$(0)</b> 2~4회 공격',en:'<area>, <b dmg>$(0)</b> 2 to 4 attacks',jp:'<area>, <b dmg>$(0)</b> 2～4回攻撃'}
	// 	,ta_:1,ta:1,effAnimation:2
	// 	,eff:[{type:3,num:['60%','65%','75%','80%','85%']}],atkCount:[3, "randomCount"],sp:10},
	// {idx:12,
	// 	na:{ko:'무차별 공격',en:'Indiscriminate Attack',jp:'無差別攻撃'},element_type:0,cate:[3],txt:{ko:'<area>, <b dmg>$(0)</b> 3회 공격',en:'<area>, <b dmg>$(0)</b> a three-time attack',jp:'<area>, <b dmg>$(0)</b> 3回攻撃'}
	// 	,ta_:1,ta:1,effAnimation:3
	// 	,eff:[{type:3,num:['100%','110%','120%','130%','140%']}],atkCount:[3, "another"],sp:9},
	// {idx:13,
	// 	na:{ko:'철벽방어',en:'Iron Defense',jp:'鉄壁の防御'},element_type:0,cate:[4],txt:{ko:'<area>, 방어(DEF) <b buff>$(0)</b>, 술법방어(MDF) <b buff>$(1)</b> <i icon up></i> 증가',en:'<area>, Defense(DEF) <b buff>$(0)</b>, Magic Defense(MDF) <b buff>$(1)</b> <i icon up></i> increase',jp:'<area>, 防衛(DEF) <b buff>$(0)</b>, 術法防御(MDF) <b buff>$(1)</b> <i icon up></i> 増加'}
	// 	,ta_:0,ta:1,effAnimation:2
	// 	,eff:[{type:4,num:['40%','60%','80%','100%','130%']},{type:6,num:['40%','60%','80%','100%','130%']}],atkCount:[1],sp:5},
	// {idx:14,
	// 	na:{ko:'마법방어',en:'Magic Defense',jp:'魔法防御'},element_type:0,cate:[4],txt:{ko:'<area>, <b buff>$(0)</b> 술법방어(MDF) <i icon up></i> 증가',en:'<area>, Magic Defense(MDF) <b buff>$(0)</b> <i icon up></i> increase',jp:'<area>, <b buff>$(0)</b> 術法防御(MDF) <i icon up></i> 増加'}
	// 	,ta_:0,ta:1,effAnimation:1
	// 	,eff:[{type:6,num:['50%','70%','100%','120%','150%']}],atkCount:[1],sp:4},
	// {idx:15,
	// 	na:{ko:'나무뒤에 숨기',en:'Hiding Behind a Tree',jp:'木陰に隠れる'},element_type:0,cate:[4],txt:{ko:'<area>, <b buff>$(0)</b> 방어(DEF) <i icon up>증가</i>',en:'<area>, Defense(MDF) <b buff>$(0)</b> <i icon up></i> increase',jp:'<area>, <b buff>$(0)</b> 防御(DEF) <i icon up>増加</i>'}
	// 	,ta_:0,ta:1,effAnimation:4
	// 	,eff:[{type:4,num:['300','400','650','800','1000']}],atkCount:[1],sp:5},
	// {idx:16,
	// 	na:{ko:'테스트',en:'Test',jp:'test'},element_type:0,cate:[6],txt:{ko:`<area>, 방어(DEF) <b dmg>$(0)</b>, 3턴 <i icon down></i> 감소`,en:'<area>, Defense(MDF) <b buff>$(0)</b>, a 3turn <i icon down></i> reduction',jp:'test'}
	// 	,ta_:1,ta:15,effAnimation:13
	// 	,eff:[{type:4,num:['-300','-400','-500','-600','-150']}],atkCount:[1],sp:6},
	// {idx:17,
	// 	na:{ko:'반격',en:'Counter Attack',jp:'反撃'},element_type:0,cate:[3],txt:{ko:'<area>, <b dmg>$(0)</b> 반격',en:'<area>, <b dmg>$(0)</b> counter attack',jp:'<area>, <b dmg>$(0)</b> 反撃'}
	// 	,ta_:1,ta:1,effAnimation:1
	// 	,eff:[{type:3,num:['100%','110%','125%','135%','150%']}],atkCount:[1],sp:0},
	{},{},{},{},{},{},{},//30
	{},{},{},{},{},{},{},{},{},{},//40
	{},{},{},{},{},{},{},{},{},{},//50
	{},{},{},{},{},{},{},{},{},{},//60
	{},{},{},{},{},{},{},{},{},{},//70
	{},{},{},{},{},{},{},{},{},{},//80
	{},{},{},{},{},{},{},{},{},{},//90
	{},{},{},{},{},{},{},{},{},{},//100
	{},{},{},{},{},{},{},{},{},{},//110
	{},{},{},{},{},{},{},{},{},{},//120
	{},{},{},{},{},{},{},{},{},{},//130
	{},{},{},{},{},{},{},{},{},{},//140
	{},{},{},{},{},{},{},{},{},{},//150
	{},{},{},{},{},{},{},{},{},{},//160
	{},{},{},{},{},{},{},{},{},{},//170
	{},{},{},{},{},{},{},{},{},{},//180
	{},{},{},{},{},{},{},{},{},{},//190
	{},{},{},{},{},{},{},{},{},{},//200
	{idx:201,
		na:{ko:'쪼기',en:'Peck',jp:'ピグテール'},element_type:1,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'hit6',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['100%','110%','125%','135%','150%']}],
		buff:[{type:53,num:[]}],buffCount:[1,1,1,1,1],buffChance:['1%','1%','2%','2%','3%'],atkCount:[1],sp:5},
	{idx:202,
		na:{ko:'할퀴기',en:'Claw',jp:'掻き分け'},element_type:2,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'slash7',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'hue-rotate(180deg)',
		eff:[{type:3,num:['100%','110%','125%','135%','150%']}],
		buff:[{type:50,num:['-10%','-12.5%','-15%','-17%','-17%']}],buffCount:[1,1,1,1,2],buffChance:['5%','6%','8%','9%','10%'],atkCount:[1],sp:5},
	{idx:203,
		na:{ko:'물기',en:'Bite',jp:'噛むこと'},element_type:3,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'slash11',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:0,effFilter:'hue-rotate(90deg)',
		eff:[{type:3,num:['100%','110%','125%','135%','150%']}],
		buff:[{type:56,num:[]}],buffCount:[],buffChance:['0.1%','0.2%','0.3%','0.4%','0.5%'],atkCount:[1],sp:5},
	{idx:204,
		na:{ko:'치기',en:'Hit',jp:'打撃'},element_type:4,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'hit7',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['100%','110%','125%','135%','150%']}],
		buff:[{type:54,num:[]}],buffCount:[1,1,2,2,2],buffChance:['1%','2%','3%','4%','5%'],atkCount:[1],sp:5},
	{idx:205,
		na:{ko:'누르기',en:'Crush',jp:'押す'},element_type:5,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'hit5',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['100%','110%','125%','135%','150%']}],
		buff:[{type:52,num:[]}],buffCount:[1,1,1,1,2],buffChance:['3%','4%','5%','6%','7%'],atkCount:[1],sp:5},
	{idx:206,
		na:{ko:'던지기',en:'Throw',jp:'投げる'},element_type:6,cate:[3],
		txt:'<area>, <dmg>, <el>',
		skillClass:0,
		ta_:1,ta:[4,4,4,4,5],effAnimation:'hit8',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:180,effFilter:'',
		eff:[{type:3,num:['80%','90%','100%','110%','130%']}],atkCount:[1],sp:5},
	{idx:207,
		na:{ko:'재빠른 움직임',en:'Quick Movement',jp:'素早い動き'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:8,num:['5','10','15','20','25']}],atkCount:[1],sp:0},
	{idx:208,
		na:{ko:'사자의 빛나는 영광',en:'Lion\'s Shining Glory',jp:'ライオンの輝く栄光'},element_type:0,cate:[2],txt:'<area>, <buff>',
		skillClass:2,
		ta_:0,ta:[20,20,20,20,20],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:3,num:['10%','15%','20%','25%','30%']}],atkCount:[1],sp:0},
	{idx:209,
		na:{ko:'호랑이의 거친 용맹',en:'Tiger\'s Wild Bravery',jp:'虎の荒々しい勇気'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:2,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:3,num:['10%','20%','30%','40%','50%']}],atkCount:[1],sp:0},
	{idx:210,
		na:{ko:'곰의 강철 피부',en:'Bear\'s Steel Skin',jp:'クマのスチールスキン'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:2,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:4,num:['20%','25%','30%','35%','45%']}],atkCount:[1],sp:0},
	{idx:211,
		na:{ko:'독수리의 영리함',en:'Eagle\'s Cleverness',jp:'ワシの賢さ'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:2,
		ta_:0,ta:[20,20,20,20,20],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:5,num:['10%','15%','20%','25%','30%']}],atkCount:[1],sp:0},
	{idx:212,
		na:{ko:'뱀의 교활함',en:'Snake\'s Craftiness',jp:'蛇の狡猾さ'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:2,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:5,num:['10%','20%','30%','40%','50%']}],atkCount:[1],sp:0},
	{idx:213,
		na:{ko:'손톱 갈기',en:'Nail Clipper',jp:'爪研ぎ'},element_type:0,cate:[5],
		txt:'<area>, <turn> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'buff35',effAnimationRepeat:1,buffAnimation:0,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:3,num:['30%','40%','50%','60%','70%']}],buffCount:[2,2,2,2,3],atkCount:[1],sp:6},
	{idx:214,
		na:{ko:'영역표시',en:'Mark the Area',jp:'エリア表示'},element_type:0,cate:[5],
		txt:'<area>, <turn> <buff>',
		skillClass:1,
		ta_:0,ta:[20,20,20,20,20],effAnimation:'buff37',effAnimationRepeat:1,buffAnimation:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:0,effFilter:'',
		buff:[{type:8,num:['3','6','9','12','15']}],buffCount:[2,2,2,2,3],atkCount:[1],sp:6},
	{idx:215,
		na:{ko:'몸집 키우기',en:'Grows in Size',jp:'身長を伸ばす'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'buff33',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:0,num:['20%','30%','40%','50%','70%']}],atkCount:[1],sp:0},
	{idx:216,
		na:{ko:'빵굽기1',en:'Baking Cat1',jp:'パン焼き機1'},element_type:0,cate:[5],
		txt:'<area>, <turn> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'buff30',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:3,num:['10%','20%','30%','40%','50%']},{type:4,num:['10%','20%','30%','40%','50%']}],buffCount:[3,3,3,3,3],atkCount:[0],sp:8},
	{idx:217,
		na:{ko:'그루밍',en:'Grooming',jp:'グルーミング'},element_type:0,cate:[5],
		txt:'<area>, <turn> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'buff28',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:0,effFilter:'',
		buff:[{type:8,num:['10%','20%','30%','40%','50%']}],buffCount:[2,2,2,2,2],atkCount:[1],sp:6},
	{idx:218,
		na:{ko:'포효',en:'Roar',jp:'轟音'},element_type:0,cate:[6],
		txt:'<area>, <turn> <buff>',
		skillClass:1,
		ta_:1,ta:[20,20,20,20,20],effAnimation:'buff31',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:0,effFilter:'',
		buff:[{type:8,num:['-10','-15','-20','-25','-30']}],buffCount:[2,2,2,2,2],atkCount:[1],sp:10},
	{idx:219,
		na:{ko:'하악질',en:'Animal Yells',jp:'動物の雄叫び'},element_type:0,cate:[6],
		txt:'<area>, <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'buff17',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:0,effFilter:'',
		buff:[{type:3,num:['-10%','-20%','-30%','-40%','-50%']}],buffCount:[2,2,2,2,2],atkCount:[0],sp:9},
	{idx:220,
		na:{ko:'꾹꾹이',en:'Cat Pokes',jp:'もぐもぐ'},element_type:0,cate:[6],
		txt:'<area>, <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'buff5',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,1.5],effRotate:0,effFilter:'',
		buff:[{type:4,num:['-10%','-20%','-30%','-40%','-50%']}],buffCount:[2,2,2,2,2],atkCount:[0],sp:9},
	{idx:221,
		na:{ko:'화염 발톱',en:'Flame Claw',jp:'炎の爪'},element_type:10,cate:[5],
		txt:'<area>, <dmg>, <el>',
		skillClass:1,
		ta_:1,ta:[14,14,14,14,14],effAnimation:'claw3',effAnimationRepeat:1,effSize:[1.3,1.3,1.3,1.3,1.3],effRotate:0,effFilter:'hue-rotate(90deg)',
		eff:[{type:3,num:['70%','80%','100%','120%','150%']}],atkCount:[1],sp:12},
	{idx:222,
		na:{ko:'얼음 발톱',en:'Ice Claw',jp:'氷の爪'},element_type:9,cate:[5],
		txt:'<area>, <dmg>, <el>',
		skillClass:1,
		ta_:1,ta:[14,14,14,14,14],effAnimation:'claw3',effAnimationRepeat:1,effSize:[1.3,1.3,1.3,1.3,1.3],effRotate:0,effFilter:'',
		eff:[{type:3,num:['70%','80%','100%','120%','150%']}],atkCount:[1],sp:12},
	{idx:223,
		na:{ko:'바람 발톱',en:'Wind Claw',jp:'風の爪'},element_type:11,cate:[5],
		txt:'<area>, <dmg>, <el>',
		skillClass:1,
		ta_:1,ta:[14,14,14,14,14],effAnimation:'claw3',effAnimationRepeat:1,effSize:[1.3,1.3,1.3,1.3,1.3],effRotate:0,effFilter:'hue-rotate(180deg)',
		eff:[{type:3,num:['70%','80%','100%','120%','150%']}],atkCount:[1],sp:12},
	{idx:224,
		na:{ko:'고양이의 예민한 직감',en:'Cat\'s keen Intuition',jp:'猫の鋭い直感'},element_type:0,cate:[2],
		txt:'<area>, <buff>',
		skillClass:2,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		buff:[{type:3,num:['5%','7%','10%','15%','20%']}, {type:4,num:['5%','10%','15%','20%','25%']}],atkCount:[1],sp:0},
	{idx:225,
		na:{ko:'야행성',en:'Roar',jp:'夜行性'},element_type:0,cate:[12],
		txt:'<area>, <condition><buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',condition:1,
		buff:[{type:8,num:['10','15','25','30','40']}],atkCount:[1],sp:0},
	{idx:226,
		na:{ko:'빵굽기2',en:'Baking Cat2',jp:'パン焼き機2'},element_type:0,cate:[5],
		txt:'<area>, <turn> <buff>',
		skillClass:0,
		ta_:0,ta:[23,23,23,23,23],effAnimation:'buff30',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'hue-rotate(90deg)',
		buff:[{type:3,num:['20%','30%','40%','50%','60%']},{type:4,num:['20%','30%','40%','50%','60%']}],buffCount:[2,2,2,2,2],atkCount:[0],sp:10},
	{idx:227,
		na:{ko:'한손타격1',en:'One-handed Blow',jp:'片手打撃1'},element_type:2,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'claw1',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['130%','140%','170%','180%','200%']}],buff:[{type:50,num:['-10%','-12.5%','-15%','-17.5%','-20%']}],buffCount:[2,2,2,2,2],buffChance:['10%','15%','20%','25%','25%'],atkCount:[1],sp:14},
	{idx:228,
		na:{ko:'한손타격2',en:'One-handed Blow2',jp:'片手打撃2'},element_type:2,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'claw1',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'invert(100%)',
		eff:[{type:3,num:['150%','170%','190%','220%','250%']}],buff:[{type:50,num:['-10%','-12.5%','-15%','-17.7%','-20%']}],buffCount:[2,2,2,2,2],buffChance:['10%','15%','20%','25%','25%'],atkCount:[1],sp:15},
	{idx:229,
		na:{ko:'양손타격1',en:'Double-handed Blow1',jp:'両手打撃1'},element_type:2,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'claw0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['80%','90%','100%','120%','130%']}],buff:[{type:50,num:['-10%','-12.5%','-15%','-17.5%','-20%']}],buffCount:[2,2,2,2,2],buffChance:['20%','25%','30%','35%','40%'],atkCount:[2],sp:14},
	{idx:230,
		na:{ko:'양손타격2',en:'Double-handed Blow2',jp:'両手打撃2'},element_type:2,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'claw0',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'invert(100%)',
		eff:[{type:3,num:['100%','120%','130%','140%','150%']}],buff:[{type:50,num:['-10%','-12.5%','-15%','-17.5%','-20%']}],buffCount:[2,2,2,2,2],buffChance:['20%','25%','30%','35%','40%'],atkCount:[2],sp:15},
	{idx:231,
		na:{ko:'뒷발차기1',en:'Back Kick1',jp:'後ろ足蹴り1'},element_type:4,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[2,2,2,2,2],effAnimation:'hit4',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'hue-rotate(180deg)',
		eff:[{type:3,num:['120%','140%','160%','180%','200%']}],buff:[{type:54,num:[]}],buffCount:[3,3,3,3,3],buffChance:['5%','7%','10%','15%','20%'],atkCount:[1],sp:10},
	{idx:232,
		na:{ko:'뒷발차기2',en:'Back Kick2',jp:'後ろ足蹴り2'},element_type:4,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[2,2,2,2,2],effAnimation:'hit4',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['130%','150%','170%','190%','230%']}],buff:[{type:54,num:[]}],buffCount:[3,3,3,3,3],buffChance:['5%','7%','10%','15%','20%'],atkCount:[1],sp:11},
	{idx:233,
		na:{ko:'뒷발차기3',en:'Back Kick3',jp:'後ろ足蹴り3'},element_type:4,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:0,
		ta_:1,ta:[3,3,3,3,3],effAnimation:'hit4',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'hue-rotate(90deg)',
		eff:[{type:3,num:['150%','170%','190%','220%','250%']}],buff:[{type:54,num:[]}],buffCount:[3,3,3,3,3],buffChance:['5%','7%','10%','15%','20%'],atkCount:[1],sp:13},
	{idx:234,
		na:{ko:'후려치기',en:'Slap',jp:'叩きつけ'},element_type:4,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:1,
		ta_:1,ta:[1,1,1,1,1],effAnimation:'slash8',effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,effFilter:'',
		eff:[{type:3,num:['120%','130%','140%','150%','170%']}],buff:[{type:54,num:[]}],buffCount:[2,2,2,2,2],buffChance:['5%','10%','15%','20%','25%'],atkCount:[1],sp:15},
	{idx:235,
		na:{ko:'광견병',en:'Rabies',jp:'狂犬病'},element_type:3,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:1,
		ta_:1,ta:[20,20,20,20,20],effAnimation:'poison3',effAnimationRepeat:1,effSize:[5,5,5,5,5],effRotate:0,effFilter:'',
		eff:[{type:3,num:['50%','60%','70%','80%','100%']}],buff:[{type:51,num:['5%','5%','5%','5%','5%']}],buffCount:[2,2,3,3,3],buffChance:['25%','35%','50%','65%','80%'],atkCount:[1],sp:10},
	{idx:236,
		na:{ko:'송곳니 뚫기',en:'Fang piercing',jp:'牙の穴あけ'},element_type:3,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:1,
		ta_:1,ta:[10,10,10,10,10],effAnimation:'bite0',effAnimationRepeat:1,effSize:[1,1,1,1,5],effRotate:0,effFilter:'',
		eff:[{type:3,num:['150%','170%','190%','210%','240%']}],buff:[{type:56,num:[]}],buffCount:[],buffChance:['1%','2%','3%','4%','5%'],atkCount:[1],sp:20},
	{idx:237,
		na:{ko:'구토',en:'Vomiting',jp:'嘔吐'},element_type:8,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <turn> <buff>',
		skillClass:1,
		ta_:1,ta:[24,24,24,24,24],effAnimation:'blood1',effAnimationRepeat:1,effSize:[1,1,1,1,5],effRotate:0,effFilter:'',
		eff:[{type:5,num:['100%','110%','120%','130%','150%']}],buff:[{type:51,num:['5%','6%','7%','8%','9%']}],buffCount:[1,2,3,4,5],buffChance:['50%','55%','60%','65%','70%'],atkCount:[1],sp:11},
	{idx:238,
		na:{ko:'삼키기',en:'Swallow',jp:'飲み込む'},element_type:8,cate:[7],
		txt:'<area>, <dmg>, <el>, <chance> <buff>',
		skillClass:1,
		ta_:1,ta:[1,1,1,2,3],effAnimation:'blood2',effAnimationRepeat:1,effSize:[1.5,1.5,1.5,1.5,5],effRotate:0,effFilter:'',
		eff:[{type:5,num:['50%','60%','70%','80%','90%']}],buff:[{type:51,num:[]}],buffCount:[],buffChance:['2%','4%','6%','8%','10%'],atkCount:[1],sp:15},
	'','',//240
	'','','','','','','','','',//250
	'','','','','','','','','','',//260
	'','','','','','','','','','',//270
	'','','','','','','','','','',//280
	'','','','','','','','','','',//290
	'','','','','','','','','','',//300
	{idx:237,
		na:{ko:'굶주림',en:'Hunger',jp:'飢餓'},element_type:2,cate:[3],txt:{ko:'<area>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:'<area>, ',jp:'<area>, <b dmg>$(0)</b>의 두번 공격을 한다.'},skillClass:1,
		ta_:1,ta:1,effAnimation:1,effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,
		eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],sp:5},
	{idx:238,
		na:{ko:'충격파',en:'Shockwave',jp:'衝撃波'},element_type:2,cate:[7],txt:{ko:'<area>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:'<area>, Make two attacks of <b dmg>$(0)</b>',jp:'<area>, <b dmg>$(0)</b>の2回攻撃をする。'},skillClass:1,
		ta_:1,ta:22,effAnimation:1,effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,
		eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],sp:5},
	{idx:239,
		na:{ko:'개구리 기우제',en:'Frog Rainmaker',jp:'カエル祈雨祭'},element_type:0,cate:[10],txt:{ko:'<u>날씨</u>, 비오는 날씨로 밤으로 변환',en:'<u>Weather</u>, Convert to rainy weather',jp:'<u>天気</u>, 雨天で夜に変換'},skillClass:1,
		ta_:1,ta:20,effAnimation:7,effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,buffAnimation:0,
		buff:[{type:2.0,num:['70%','75%','80%','85%','90%']}],buffCount:[4,4,4,4,4],buffChance:['70%','75%','80%','85%','90%'],atkCount:[1],sp:5},
	{idx:240,
		na:{ko:'호랑이&여우 결혼식',en:'Tiger&Fox Wedding',jp:'トラ＆キツネの結婚式'},element_type:0,cate:[10],txt:{ko:'<u>날씨</u>, 비오는 날씨로 낮으로 변환',en:'<u>Weather</u>, Convert to rainy weather',jp:'<u>天気</u>, 雨天で昼間に変換'},skillClass:1,
		ta_:1,ta:20,effAnimation:7,effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,buffAnimation:0,
		buff:[{type:2.1,num:['70%','75%','80%','85%','90%']}],buffCount:[4,4,4,4,4],buffChance:['70%','75%','80%','85%','90%'],atkCount:[1],sp:5},
	{idx:241,
		na:{ko:'침뱉기',en:'Spitting',jp:'唾を吐く'},element_type:9,cate:[3],txt:{
			ko:'<area>, <b dmg>$(0)</b> <i el el4>물속성</i> 공격',
			en:'<area>, <b dmg>$(0)</b> Attack of <i el el4>Water elements</i>',
			jp:'<area>, <b dmg>$(0)</b> <i el el4>水属性</i> 攻撃'},
		ta_:1,ta:6,effAnimation:4,effAnimationRepeat:1,effSize:[1,1,1,1,1],effRotate:0,
		eff:[{type:5,num:['70%','80%','90%','100%','110%']}],atkCount:[1],sp:12},
];
// 모아치기
// 빙결, 석화, 스킬 캔슬기

// 동물타입
// * 공통
// 재빠른 움직임●, 
// * 0고양이 - 고양이의 예민한 직감(passive)●, 야행성(passive)●, 고양이과(passive)
// 할퀴기, 물기, 치기
// 하악질(buff)●, 꾹꾹이(buff)●, 그루밍(buff)●, 빵굽기2(buff)●, 가속1(buff)
// 한손타격1(치기)●, 양손타격1(치기)●, 뒷발치기1(치기)●, 바람발톱(바람)●

// * 1사자 - 사자의 빛나는 영광(passive), 밀림의왕(passive), 야행성(passive), 고양이과(passive)
// 할퀴기, 물기,
// 포효(buff)●, 하악질(buff)●, 빵굽기1(buff)●, 금빛갈기(buff), 
// 한손타격2(치기)●, 양손타격1(치기)●, 뒷발치기1(치기)●, 송곳니뚫기(물기)●, 무리 사냥(광), 얼음발톱(수)●

// * 2호랑이 - 호랑이의 거친 용맹(passive), 정글의왕(passive), 야행성(passive), 고양이과(passive)
// 할퀴기, 물기,
// 포효(buff)●, 하악질(buff)●, 빵굽기1(buff)●, 잠행(buff)
// 한손타격1(치기)●, 양손타격2(치기)●, 뒷발치기1(치기)●, 송곳니뚫기(물기)●, 앞발휘두르기(광역), 피의서약, 화염발톨(화)●, 후려치기(치기)●,

// * 3강아지 - 강아지의 충성스러운 용기(passive), 개과(passive)
// 물기, 치기
// 발달된후각(buff), 
// 송곳니뚫기(물기)●, 물어뜯기(물기), 광견병(독, 광역)●, 추격하기(반격기)

// * 4늑대 - 늑대의 강인한 의리(passive), 야행성(passive), 개과(passive)
// 물기, 치기
// 하울링(buff), 집념의추적(buff), 발달된후각(buff),
// 뼈아작내기(물기), 송곳니뚫기(물기)●, 물어뜯기(물기), 무리사냥(광), 광견병(독, 광역)●,
// [유혹(여우한정)], 

// * 5물개 - 물개의 유연한 가르기(passive), 
// 치기, 누르기
// 회전박치기(바람)(세로 일자영역), 
// [송곳니뚫기(바다사자특정)], 

// * 6너구리 - 너구리의 영특한 계산(passive), 반격(passive),
// 물기, 치기, 던지기
// 고드름던지기(수), 찹찹(회복,자신),
// [주머니털기(너구리한정)], [조개 선물(회복)(해달한정)],

// * 7쥐 - 쥐의 민첩한 은든술(passive) - 시작 두턴간 무적, 
// 물기,
// 가속2(buff), 구토(독, 광역)●,
// 민접한 스틸(아이템획득), 쥐구멍숨기(회피),

// * 8토끼 -  토끼의 뛰어난 점프력(spd, luk)(passive),
// 물기, 치기
// 가속2(buff), 구토(독, 광역)●,
// 뒷발치기1(치기)●,

// * 9원숭이 - 원숭이의 영리한 지략(passive),
// 물기, 치기, 던지기 
// 조롱하기(buff), 구토(독, 광역)●,
// 돌던지기(땅), 모래뿌리기(땅), 고드름던지기(수), 침뱉기(수, 광)●, 가속1(buff)
// [온천반신욕(일본원숭이한정)],

// * 10고릴라 - 고릴리의 막강한 파괴(atk)(passive), 
// 치기, 누르기, 던지기
// 가슴치기(buff), 돌진2(광역, 치기)
// 허리접기(5), 모래뿌리기(땅), 침뱉기(수, 광)●, 1톤 펀치(치기), 돌던지기(땅), 바위 던지기(땅), 고드름던지기(수)

// * 11캥거루 - 캥거루의 치유의 주머니(힐 기술)(passive), 매턴 10% 회복
// 치기
// 가속1(buff)
// 후려치기(치기)●, 아웃복싱(치기), 원투타격(치기), 하이킥(치기), 꼬리치기2(치기), 만능주머니 랜덤 효과

// * 12소 - 소의 우직한 전진(passive),
// 쪼기, 누르기
// 뿔갉기(buff),  
// 뿔찌르기(쪼기), 돌진3(광역, 치기), 머리박치기(치기), 발구르기(광역, 땅), 짓밟기2(누르기) 

// * 13곰 - 곰의 우렁찬 포효(hp)(passive), 
// 할퀴기, 치기
// 포효(buff), 
// 한손타격2(치기)●, 양손타격2(치기)●, 후려치기(치기)●, 휘둘러치기(광역, 치기), 나무타기(회피), 꿀빨기(회복), 발톱파고들기(할퀴기), 

// * 14말 - 말의 날쌘 이동력(spd)(passive), 반격(passive),
// 치기
// 질주(buff), 
// 뒷발치기3(치기)●, 돌진2(광역, 치기), 짓밟기1(누르기), 

// * 15사슴 - 사슴의 성스러운 보호(mdk)(passive), 
// 쪼기, 치기
// 뿔갉기(buff), 
// 뿔찌르기(쪼기), 정화(상태이상치료), 그룹정화(상태이상치료), 뒷발치기1(치기)●, 돌진1(광역, 치기)
	
// * 16코뿔소 - 코뿔소의 돌진하는 용맹(passive), 
// 쪼기, 누르기,
// 코뿔박치기(쪼기), 뚫기(), 돌진3(광역, 치기), 머리박치기(치기), 발구르기(광역, 땅)

// * 17코끼리 - 코끼리의 무거운 한방(광역공격위주)(passive), 
// 누르기, 던지기
// 포효(buff), 
// 돌진3(광역, 치기), 발구르기(광역, 땅), 돌던지기(땅), 바위던지기(광역, 땅), 물대포(광역, 수), 깔아뭉개기(광역, 누르기), 땅울림(땅, 광), 꼬리치기(치기), 짓밟기2(누르기)

// * 18기린 - 기린의 충실한 정찰력(passive), 밤샘경계(passive),
// 누르기, 치기
// 기침(buff),
// 목치기(치기), 뒷발치기2(치기)●, 돌진2(광역, 치기), 머리박치기(치기), 초저주파(광역, 빛), 발구르기(광역, 땅)

// * 19새 - 새의 청량한 노래(passive), 조류과(passive)
// 쪼기, 물기
// 가속2(buff), 
// 낙석(땅), 날개치기1(바람), 고공낙하(광역, 바람), 치유의 노래(회복, 광역), 공중부양(회피)
	
// * 20독수리 - 독수리의 영리한 전략(passive), 반격(passive), 조류과(passive)
// 쪼기, 물기
// 꽤뚫기(쪼기), 낙석(땅), 고공낙하(광역, 바람), 날개치기2(바람), 윈드커터(바람), 공중부양(회피)

// * 21뱀 - 뱀의 교활한 계략(passive), 파충류과(passive)
// 물기
// 독뿌리기(광역, 어둠), 감아쪼이기(누르기), 허물벗기(회복), 흡혈공격(물기), 삼키기(독, 단일)●
	
// * 22도마뱀 - 도마뱀의 뛰어난 은둔술(passive), 파충류과(passive)
// 물기, 할퀴기
// 혓바닥공격(치기), 허물벗기(회복), 꼬리자르기(회피),
// 위장술(카멜레온한정), 

// * 23거북이 - 거북이의 강철 피부(passive), 파충류과(passive)
// 물기,
// 절단물기(물기), 튼튼한등껍질(방어),

// * 24개구리 - 개구리의 신속한 점프력(passive), 개구리 뿔피리(passive), 파충류과(passive)
// 치기
// 뒷발치기1(치기)●, 개구리 기우제(날씨변경), 음파공격(광역, 빛), 혓바닥공격(치기), 고드름던지기(수), 점프(회피), 물기(물기)
// [청개구리 공격(한정)], [독뿌리기(암)(한정)], 

// * 25돼지 - 
// 물기, 누르기,
// 구토(독, 광역)●,

//베기
//살점 분리(ㄴㄱ자(17),베기220), 십자 베기(십자(9),스턴,베기140), 두번 베기(베기80x2), 강하게 베기(베기130), 대지 가르기(가로일자(6),출혈,베기150), 발도(세로일자(7),출혈,베기200),

//치기
//골절 공격(4칸사각(22),기절,치기160), 휘두르기(기절,치기120), 뇌진탕 공격(9칸사각(21),기절,치기150), 망치 이연격(기절,치기90x2)

//찌르기
//관통 공격(세로일자(7), 찌르기200)

//빛속성
//천둥(랜덤15(27),석화,130), 벼락(랜덤5(25),석화,160), 번개광선(랜덤 세로3(32),석화,150)

//암흑속성
//블랙홀(원(24),중독,170), 어둠광선(랜덤 세로3(32),중독,150)

//물속성
//물대포(세로한줄,140), 

//불속성
//불 덩어리(180), 화염숨결(작은 마름모(28)), 화염링(큰 링(30), 160)

//바람속성
//바람칼날(170), 회오리(4칸사각(22),160), 돌개바람(랜덤10(26), 140)

//땅속성
//낙석(랜덤5(25),기절,120), 지진(9칸사각(21),150), 대지진(전체(20),기절,150)



//군주
//빛의 정령(9), 어둠의 정령(10), 언변(15), 연금술(20), 관찰력(22),
//십자 베기, 두번 베기

//마법사
//물의 하수인(5), 불의 하수인(6), 바람의 하수인(7), 땅의 하수인(8), 물의 정령(11), 불의 정령(12), 바람의 정령(13), 땅의 정령(14), 언변(15), 아이템확인(x)

//기사
//땅의 정령(14)

//무사
//불의 정령(12), 장비 전문(17),
//대지 가르기, 발도, 살점분리

//학자
//언변(15), 연금술(20), 관찰력(22), 아이템확인(x)
//

//닌자
//어둠의 정령(10)

//도술사
//빛의 하수인(3), 어둠의 하수인(4), 빛의 정령(9), 어둠의 정령(10), 연금술(20), 아이템확인(x)
//

//무희
//언변(15), 관찰력(22), 예술(23), 
//

//도적
//언변(15), 관찰력(22),
//이단찌르기(x), 

//궁수
//관찰력(22),
//이단사격(x, 출혈), 삼단사격(x, 출혈), 폭발사격(x, 출혈)

//야만용사
//

//상인
//언변(15), 장비 전문(17), 아이템확인(x)
//

//한량
//바람의 정령(13), 언변(15), 보석 세공(21)
//

//장군
//물의 정령(11), 관찰력(22),
//

//농부
//장비 전문(17), 식물 재배(19)
//

//의술사
//언변(15), 관찰력(22), 아이템확인(x)
//

//기술자
//선박 전문(16), 장비 전문(17), 조각(18), 연금술(20), 보석 세공(21), 예술(23), 아이템확인(x)
//


//돌진: 범위3,5,7
//물기(일반), 물어뜯기(출혈), 절단물기(데미지 강력)
//가시, 반격

//물리: 두번 공격, 연속 공격, 무차별 공격, 세게 공격, 몸통박치기, xx펀치(속성), 기습 공격, 죽기살기, 방어, 철벽방어, 이동, 다구리,
//불: 불바다, 불침, 불대포
//물: 바다폭풍, 폭풍우, 물대포, 물안개
//땅: 땅흔들기, 흙뿌리기, 모래대포, 미세먼지,
//바랑: 소풍, 중풍, 강풍, 대풍, 돌개바람, 바람대포, 
//얼음: 고드름 화살, 눈덩이 던지기, 얼음대포
//독: 손톱갈기, 눈감고 공격, 
//번개: 자기장

//사자: 물고버티기, 물어뜯기
//수달: 조개던지기, 고함치기
//점프, 노려보기, 짖기, 꼬리치기,




//직업스킬
//베기, 크게베기, 십자베기, 사선베기, 이단베기
//