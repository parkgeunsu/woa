//cate(스킬종류, 배열) 중복가능 
// passive1, 
// active3(적군), 턴제로 실행
// active4(본인), 바로실행 
// buff5(아군전체), debuff6(적군전체) 턴제로 실행
//element_type 무속성(0),찌르기(1),할퀴기(2),물기(3),치기(4),누르기(5),던지기(6),빛(7),어둠(8),물(9),불(10),바람(11),땅(12)
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 행운LUK(9), 패시브(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위
//num 효과
//sp 행동력
//atkCount 공격횟수
//turn 유지되는 턴수
//<u>단일</u> <b dmg>90%</b>의 <i el el0>치기</i>로 두번 공격을 한다.
//effAnimation effect종류
export const skill = [
	{idx:0,
		na:'대기',element_type:0,cate:[1],txt:`<u>단일</u>, <b dmg>$(0)</b>의 대기한다.`
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:4,num:['100%','110%','125%','135%','150%']}],atkCount:[1],turn:1,sp:0},
	{idx:1,
		na:'공격',element_type:0,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['100%','110%','125%','135%','150%']}],atkCount:[1],turn:1,sp:0},
	{idx:2,
		na:'방어',element_type:0,cate:[4],txt:'<u>자신</u> <b buff>$(0)</b>의 방어(DEF)가 <i icon up>증가</i>한다.'
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:4,num:['150%','170%','200%','220%','250%']}],atkCount:[1],turn:1,sp:0},
	{idx:3,
		na:'침뱉기',element_type:9,cate:[3],txt:'<u>가로한줄</u>, <b dmg>$(0)</b>의 <i el el4>수</i>속성 공격을 한다.'
		,ta_:1,ta:6,effAnimation:3
		,eff:[{type:5,num:['70%','80%','90%','100%','110%']}],atkCount:[1],turn:1,sp:7},
	{idx:4,
		na:'학익진 강화',element_type:0,cate:[1],txt:'<u>전체</u> 학익진효과가 <b buff>$(0)</b> <i icon up>증가</i> 한다.'
		,ta_:0,ta:20,effAnimation:0
		,eff:[{type:100,num:['20%','25%','30%','35%','40%']}],atkCount:[0],turn:0,sp:0}, //이순신
	{idx:5,
		na:'격려',element_type:0,cate:[1],txt:'<u>전체</u> 진형효과가 <b buff>$(0)</b> <i icon up>증가</i> 한다.'
		,ta_:0,ta:20,effAnimation:0
		,eff:[{type:100,num:['10%','15%','20%','25%','30%']}],atkCount:[0],turn:0,sp:0},
	{idx:6,
		na:'불정령',element_type:10,cate:[1],txt:'<u>전체</u> 물리 공격력(ATK)이 <b buff>$(0)</b> <i icon up>증가</i> 한다.'
		,ta_:0,ta:3,effAnimation:0
		,eff:[{type:100,num:['10%','15%','20%','25%','30%']}],atkCount:[0],turn:0,sp:0},
	{idx:7,
		na:'빛정령',element_type:7,cate:[1],txt:'<u>전체</u> 술법 공격력(MAK)이 <b buff>$(0)</b> <i icon up>증가</i> 한다.'
		,ta_:0,ta:5,effAnimation:0
		,eff:[{type:100,num:['10%','15%','20%','25%','30%']}],atkCount:[0],turn:0,sp:0},
	{idx:8,
		na:'물정령',element_type:9,cate:[1],txt:'<u>전체</u> 체력(HP)이 <b buff>$(0)</b> <i icon up>증가</i> 한다.'
		,ta_:0,ta:20,effAnimation:0
		,eff:[{type:100,num:['20%','25%','30%','35%','40%']}],atkCount:[0],turn:0,sp:0},
	{idx:9,
		na:'집중타',element_type:0,cate:[3],txt:'<u>단일</u>, <b dmg>$(0)</b>의 강한 공격을 한다.'
		,ta_:1,ta:1,effAnimation:1
		,eff:[{type:3,num:['150%','175%','200%','225%','250%']}],atkCount:[1],turn:1,sp:10},
	{idx:10,
		na:'때린데 또 까',element_type:0,cate:[3],txt:'<u>단일</u> <b dmg>$(0)</b>의 2회 공격을 한다.'
		,ta_:1,ta:1,effAnimation:2
		,eff:[{type:3,num:['80%','90%','100%','110%','120%']}],atkCount:[2],turn:1,sp:10},
	{idx:11,
		na:'연속 공격',element_type:0,cate:[3],txt:'<u>단일</u> <b dmg>$(0)</b>의 2~4회 공격을 한다.'
		,ta_:1,ta:1,effAnimation:1
		,eff:[{type:3,num:['60%','65%','75%','80%','85%']}],atkCount:[3, "randomCount"],turn:1,sp:12},
	{idx:12,
		na:'무차별 공격',element_type:0,cate:[3],txt:'<u>단일 랜덤</u> <b dmg>$(0)</b>의 3회 공격을 한다.'
		,ta_:1,ta:1,effAnimation:2
		,eff:[{type:3,num:['100%','110%','120%','130%','140%']}],atkCount:[3, "another"],turn:1,sp:9},
	{idx:13,
		na:'철벽방어',element_type:0,cate:[4],txt:'<u>자신</u> <b buff>$(0)</b>의 방어(DEF)와 <b buff>$(1)</b>의 술법방어(MDF)가 <i icon up>증가</i>한다.'
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:4,num:['140%','160%','180%','200%','230%']},{type:6,num:['140%','160%','180%','200%','230%']}],atkCount:[1],turn:1,sp:0},
	{idx:14,
		na:'마법방어',element_type:0,cate:[4],txt:'<u>자신</u> <b buff>$(0)</b>의 술법방어(MDF)가 <i icon up>증가</i>한다.'
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:6,num:['150%','170%','200%','220%','250%']}],atkCount:[1],turn:1,sp:0},
	{idx:15,
		na:'나무뒤에 숨기',element_type:0,cate:[4],txt:'<u>자신</u> <b buff>$(0)</b>의 방어(DEF)가 <i icon up>증가</i>한다.'
		,ta_:0,ta:1,effAnimation:0
		,eff:[{type:4,num:['300','400','650','800','1000']}],atkCount:[1],turn:1,sp:0},
	{idx:16,
		na:'그루밍',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 속도(SPD)를 3턴 감소시킨다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['50','70','90','120','150']}],atkCount:[1],turn:3,sp:0},
]

export const skillAnimal = [
	{idx:0,
		na:'할퀴기',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:0},
	{idx:1,
		na:'그루밍',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:2,
		na:'빵굽기',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:3,
		na:'꾹꾹이',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:4,
		na:'하악질',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:5,
		na:'할퀴기1',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[2],turn:1,sp:0},
	{idx:6,
		na:'그루밍1',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:7,
		na:'빵굽기1',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:8,
		na:'꾹꾹이1',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
	{idx:9,
		na:'하악질1',element_type:2,cate:[3],txt:`<u>단일</u>, <b dmg>$(0)</b>의 두번 공격을 한다.`
		,ta_:1,ta:1,effAnimation:0
		,eff:[{type:3,num:['150%','160%','170%','180%','200%']}],atkCount:[0],turn:1,sp:0},
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