//cate(스킬종류, 배열) 중복가능 passive1, active3, buff5
//dmg_type 무(0),독(1),빛(2),암(3),물(4),불(5),바람(6),땅(7),치기(8),쪼기(9),할퀴기(10),물기(11),누르기(12),
//eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MATK(5), 술방MDEF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
//ta_ 아군0, 적군1
//ta getEffectArea 효과범위
//num 효과
//sp 행동력
const skill = [
    {idx:0,na:'강타',cate:[3],txt:'<u>단일</u>, <b dmg>200%</b>의 <i el el0>치기</i>로 강한 타격을 한다.',eff:[{ta_:1,ta:1,type:13,num:'200%'}],sp:4},
    {idx:1,na:'물대포',cate:[3],txt:'<u>가로한줄</u>, <b dmg>70%</b>의 <i el el4>수</i>속성 공격을 한다.',eff:[{ta_:1,ta:6,type:22,num:'70%'}],sp:6},
    {idx:2,na:'학익진 강화',cate:[1],txt:'<u>학익진</u> 사용시 효과가 <b buff>20%</b> <i icon up>증가</i> 한다.',eff:[{ta_:0,ta:20,type:100,num:'20%'}],sp:0},
]