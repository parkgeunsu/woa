//cate(스킬종류, 배열) 중복가능
// none1
// passive2,
// active3(적군), 턴제로 실행
// active4(본인), 바로실행 
// buff5(아군전체), debuff6(적군전체) 턴제로 실행
//element_type 무속성(0),찌르기(1),할퀴기(2),물기(3),치기(4),누르기(5),던지기(6),빛(7),어둠(8),물(9),불(10),바람(11),땅(12)
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 행운LUK(9), 패시브(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위, passive일 경우 1:단일, 10:전체
//num 효과
//sp 행동력
//atkCount 공격횟수
//turn 유지되는 턴수
//<u>단일</u> <b dmg>90%</b>의 <i el el0>치기</i>로 두번 공격을 한다.
//effAnimation effect종류
export const skill = [
	{idx:0,
		na:{ko:'대기',en:'Wait'},element_type:0,cate:[1],txt:{ko:'대기',en:'Stand by.'}
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:4,num:['100%','110%','125%','135%','150%']}],atkCount:[1],turn:1,sp:0},
	{idx:1,
		na:{ko:'공격',en:'Attack'},element_type:0,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 공격',en:'<u>Single</u>, <b dmg>$(0)</b> attack'}
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['100%','110%','125%','135%','150%']}],atkCount:[1],turn:1,sp:5},
	{idx:2,
		na:{ko:'방어',en:'Defense'},element_type:0,cate:[4],txt:{ko:'<u>자신</u>, <b buff>$(0)</b> 방어(DEF) <i icon up></i> 증가',en:'<u>Self</u>, <b buff>$(0)</b> Defense(DEF) <i icon up></i> increase'}
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:4,num:['50%','70%','100%','120%','150%']}],atkCount:[1],turn:1,sp:4},
	{idx:3,
		na:{ko:'침뱉기',en:'Spitting'},element_type:9,cate:[3],txt:{ko:'<u>가로한줄</u>, <b dmg>$(0)</b> <i el el4>수속성</i> 공격',en:'<u>A horizontal line</u>, <b dmg>$(0)</b> Attack of <i el el4>Water elements</i>'}
		,ta_:1,ta:6,effAnimation:3
		,eff:[{type:5,num:['70%','80%','90%','100%','110%']}],atkCount:[1],turn:1,sp:12},
	{idx:4,
		na:{ko:'학익진 강화',en:'Strengthening the formation of "Hakikjin"'},element_type:0,cate:[2],txt:{ko:'전투 참여시 <u>전체</u>, 학익진효과 <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, "Hak Ik jin" Formation Effect <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:10,effAnimation:0
		,eff:[{type:100,num:['20%','25%','30%','35%','40%']}],atkCount:[0],turn:0,sp:0}, //이순신
	{idx:5,
		na:{ko:'격려',en:'Encouragement'},element_type:0,cate:[2],txt:{ko:'전투 참여시 <u>전체</u>, 진형효과 <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, The Formative Effect <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:10,effAnimation:1
		,eff:[{type:100,num:['10%','15%','20%','25%','30%']}],atkCount:[0],turn:0,sp:0},
	{idx:6,
		na:{ko:'불정령',en:'Spirit of Fire'},element_type:10,cate:[2],txt:{ko:'전투 참여시 <u>전체</u>, 공격(ATK) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, Attack(ATK) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:10,effAnimation:0
		,eff:[{type:3,num:['10%','15%','20%','25%','30%']}],atkCount:[0],turn:0,sp:0},
	{idx:7,
		na:{ko:'빛정령',en:'Spirit of Light'},element_type:7,cate:[2],txt:{ko:'전투 참여시 <u>전체</u>, 술법공격(MAK) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, Magic Attack(MAK) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:10,effAnimation:3
		,eff:[{type:5,num:['10%','15%','20%','25%','30%']}],atkCount:[0],turn:0,sp:0},
	{idx:8,
		na:{ko:'물정령',en:'Spirit of Water'},element_type:9,cate:[2],txt:{ko:'전투 참여시 <u>전체</u>, 체력(HP) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, Health Point(HP) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:10,effAnimation:1
		,eff:[{type:0,num:['20%','25%','30%','35%','40%']}],atkCount:[0],turn:0,sp:0},
	{idx:9,
		na:{ko:'집중타',en:'Concentrated Attack'},element_type:0,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b> 강한 공격',en:'<u>Single</u>, <b dmg>$(0)</b> a strong attack'}
		,ta_:1,ta:1,effAnimation:1
		,eff:[{type:3,num:['150%','175%','200%','225%','250%']}],atkCount:[1],turn:1,sp:9},
	{idx:10,
		na:{ko:'때린데 또 까',en:'Hit again Hit'},element_type:0,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b> 2회 공격',en:'<u>Single</u>, <b dmg>$(0)</b> a two-time attacks'}
		,ta_:1,ta:1,effAnimation:2
		,eff:[{type:3,num:['80%','90%','100%','110%','120%']}],atkCount:[2],turn:1,sp:8},
	{idx:11,
		na:{ko:'연속 공격',en:'Series of Attacks'},element_type:0,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b> 2~4회 공격',en:'<u>Single</u>, <b dmg>$(0)</b> 2 to 4 attacks'}
		,ta_:1,ta:1,effAnimation:1
		,eff:[{type:3,num:['60%','65%','75%','80%','85%']}],atkCount:[3, "randomCount"],turn:1,sp:10},
	{idx:12,
		na:{ko:'무차별 공격',en:'Indiscriminate Attack'},element_type:0,cate:[3],txt:{ko:'<u>단일 랜덤</u>, <b dmg>$(0)</b> 3회 공격',en:'<u>Single Random</u>, <b dmg>$(0)</b> a three-time attack'}
		,ta_:1,ta:1,effAnimation:2
		,eff:[{type:3,num:['100%','110%','120%','130%','140%']}],atkCount:[3, "another"],turn:1,sp:9},
	{idx:13,
		na:{ko:'철벽방어',en:'Iron Defense'},element_type:0,cate:[4],txt:{ko:'<u>자신</u>, 방어(DEF) <b buff>$(0)</b>, 술법방어(MDF) <b buff>$(1)</b> <i icon up></i> 증가',en:'<u>Self</u>, Defense(DEF) <b buff>$(0)</b>, Magic Defense(MDF) <b buff>$(1)</b> <i icon up></i> increase'}
		,ta_:0,ta:1,effAnimation:2
		,eff:[{type:4,num:['40%','60%','80%','100%','130%']},{type:6,num:['40%','60%','80%','100%','130%']}],atkCount:[1],turn:1,sp:5},
	{idx:14,
		na:{ko:'마법방어',en:'Magic Defense'},element_type:0,cate:[4],txt:{ko:'<u>자신</u>, <b buff>$(0)</b> 술법방어(MDF) <i icon up></i> 증가',en:'<u>Self</u>, Magic Defense(MDF) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:1,effAnimation:1
		,eff:[{type:6,num:['50%','70%','100%','120%','150%']}],atkCount:[1],turn:1,sp:4},
	{idx:15,
		na:{ko:'나무뒤에 숨기',en:'Hiding Behind a Tree'},element_type:0,cate:[4],txt:{ko:'<u>자신</u>, <b buff>$(0)</b> 방어(DEF) <i icon up>증가</i>',en:'<u>Self</u>, Defense(MDF) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:0,ta:1,effAnimation:4
		,eff:[{type:4,num:['300','400','650','800','1000']}],atkCount:[1],turn:1,sp:5},
	{idx:16,
		na:{ko:'테스트',en:'Test'},element_type:0,cate:[6],txt:{ko:`<u>적군</u>, 방어(DEF) <b dmg>$(0)</b>, 3턴 <i icon down></i> 감소`,en:'<u>Single Enemy</u>, Defense(MDF) <b buff>$(0)</b>, a 3turn <i icon down></i> reduction'}
		,ta_:1,ta:15,effAnimation:12
		,eff:[{type:4,num:['-300','-400','-500','-600','-150']}],turn:1,atkCount:[1],sp:6},
]

export const animalSkill = [
	{idx:0,
		na:{ko:'재빠른 움직임',en:'Quick Movement'},element_type:0,cate:[2],txt:{ko:'전투 참여시 <u>자신</u>, 속도(SPD) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>Self</u>, Speed(SPD) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:1,ta:1,effAnimation:2,skillClass:0
		,eff:[{type:8,num:['5','10','15','20','25']}],atkCount:[1],turn:1,sp:0},
	{idx:1,
		na:{ko:'손톱 갈기',en:'Nail Clipper'},element_type:0,cate:[2],txt:{ko:'전투 참여시 <u>자신</u>, 공격(ATK) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>Self</u>, Attack(ATK) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:1,ta:1,effAnimation:0,skillClass:0
		,eff:[{type:8,num:['10%','20%','30%','40%','50%']}],atkCount:[1],turn:1,sp:0},
	{idx:2,
		na:{ko:'영역표시',en:'Mark the Area.'},element_type:2,cate:[2],txt:{ko:'전투 참여시 <u>전체</u>, 속도(SPD) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, Speed(SPD) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:1,ta:10,effAnimation:0,skillClass:1
		,eff:[{type:8,num:['3','6','9','12','15']}],atkCount:[1],turn:1,sp:0},
	{idx:3,
		na:{ko:'몸집 키우기',en:'Grows in Size'},element_type:2,cate:[2],txt:{ko:'전투 참여시 <u>자신</u>, 체력(HP) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>Self</u>, Heath Point(HP) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:1,ta:1,effAnimation:1,skillClass:0
		,eff:[{type:0,num:['50%','75%','100%','125%','150%']}],atkCount:[1],turn:1,sp:0},
	{idx:4,
		na:{ko:'빵굽기',en:'Baking Cat'},element_type:2,cate:[5],txt:{ko:'<u>자신</u>, 공격력(ATK) <b buff>$(0)</b>, 방어력(DEF) <b buff>$(1)</b> 3턴 <i icon up></i> 증가',en:'in battle <u>Self</u>, Attack(ATK) <b buff>$(0)</b>, 3turn Defense(DEF) <b buff>$(1)</b> <i icon up></i> increase'}
		,ta_:1,ta:1,effAnimation:2,skillClass:0
		,eff:[{type:3,num:['50%','60%','70%','80%','100%']},{type:4,num:['50%','60%','70%','80%','100%']}],atkCount:[0],turn:3,sp:10},
	{idx:5,
		na:{ko:'그루밍',en:'Grooming'},element_type:0,cate:[5],txt:{ko:'<u>단일 아군</u>, <b dmg>$(0)</b> 속도(SPD) 3턴 <i icon up></i> 증가',en:'<u>Single Ally</u>, Speed(SPD) <b buff>$(0)</b>, a 3turn <i icon up></i> increase'}
		,ta_:1,ta:1,effAnimation:11
		,eff:[{type:8,num:['50%','70','90','120','150']}],turn:1,atkCount:[1],sp:5},
	{idx:6,
		na:{ko:'포효',en:'Roar'},element_type:2,cate:[6],txt:{ko:'<u>전체</u>, 속도(SPD) <b buff>$(0)</b> <i icon up></i> 증가',en:'in battle <u>All Allies</u>, Speed(SPD) <b buff>$(0)</b> <i icon up></i> increase'}
		,ta_:1,ta:20,effAnimation:0,skillClass:1
		,eff:[{type:8,num:['-10','-15','-20','-25','-30']}],atkCount:[1],turn:1,sp:15},
	{idx:7,
		na:{ko:'하악질',en:'Animal Yells'},element_type:2,cate:[6],txt:{ko:'<u>단일 적군</u>, <b dmg>$(0)</b> 공격(ATK) 3턴 <i icon up></i> 증가',en:'<u>Single Enemy</u>, Attack(ATK) <b buff>$(0)</b>, a 3turn <i icon down></i> reduction'}
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['-30%','-35%','-40%','-45%','-50%']}],atkCount:[0],turn:1,sp:11},
	{idx:8,
		na:{ko:'꾹꾹이',en:'Cat Pokes'},element_type:2,cate:[6],txt:{ko:'<u>단일 적군</u>, 방어력(DEF) <b buff>$(0)</b> 3턴 <i icon up></i> 감소',en:''}
		,ta_:1,ta:1,effAnimation:3,skillClass:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:7},
	{idx:9,
		na:{ko:'할퀴기',en:'Scratching'},element_type:2,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:''}
		,ta_:1,ta:1,effAnimation:1,skillClass:1
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:5},
//---------------------------------------------------
	{idx:9,
		na:{ko:'후려치기',en:'Scratching'},element_type:2,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:''}
		,ta_:1,ta:1,effAnimation:1,skillClass:1
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:5},
	{idx:9,
		na:{ko:'광견병',en:'Scratching'},element_type:2,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:''}
		,ta_:1,ta:1,effAnimation:1,skillClass:1
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:5},
	{idx:9,
		na:{ko:'화염 발톱',en:'Scratching'},element_type:2,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:''}
		,ta_:1,ta:1,effAnimation:1,skillClass:1
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:5},
	{idx:9,
		na:{ko:'굶주림',en:'Scratching'},element_type:2,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:''}
		,ta_:1,ta:1,effAnimation:1,skillClass:1
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:5},
	{idx:9,
		na:{ko:'충격파',en:'Scratching'},element_type:2,cate:[3],txt:{ko:'<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.',en:''}
		,ta_:1,ta:1,effAnimation:1,skillClass:1
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:5},
];
//물리: 두번 공격, 연속 공격, 무차별 공격, 세게 공격, 몸통박치기, 침뱉기, xx펀치(속성), 기습 공격, 죽기살기, 방어, 철벽방어, 이동, 다구리,
//불: 불바다, 불침, 불대포
//물: 바다폭풍, 폭풍우, 물대포, 물안개
//땅: 땅흔들기, 흙뿌리기, 모래대포, 미세먼지,
//바랑: 소풍, 중풍, 강풍, 대풍, 돌개바람, 바람대포, 
//얼음: 고드름 화살, 눈덩이 던지기, 얼음대포
//독: 손톱갈기, 눈감고 공격, 
//번개: 자기장

//고양이: 그루밍, 빵굽기, 꾹꾹이, 하악질
//독수리: 날개치기
//사자: 갈퀴뽐내기, 물고버티기, 물어뜯기
//수달: 조개던지기, 찹찹, 고함치기
//호랑이: 물고버티기, 물어뜯기
//코끼리: 깔아뭉개기, 바위던지기
//고릴라: 가슴치기, 바위던지기
//점프, 노려보기, 짖기, 꼬리치기,