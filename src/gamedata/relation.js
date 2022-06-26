//공1,방2,술공3,술방4,hp5,sp6,회복속도7,속도8,명중9,속성10,진형20,
//ta 대상(0자신, 1파티전원, 2상대파티전원, 해당이름)
//num 효과
//member 활성화 조건인물 0없음
//limit 최소 인원 0없음
//eff type(효과 dmg_type&buff_type) 체력(HP)(0), 행동SP(1), 행동회복(RSP)(2), 물리 공격(ATK)(3), 물리 방어(DEF)(4), 술법 공격(MAK)(5), 술법 방어(MDF)(6), 회복(RCV)(7), 속도(SPD)(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
export const relation = [
    // {idx:0,na:'해군3대장',tag:'<em link="relation_0">해군3대장</em>',txt:'HP <b buff>30%</b> <i icon up>증가</i>, SP <b buff>1</b> <i icon up>증가</i> 한다.',eff:[{ta:0,type:0,num:'30%'},{ta:0,type:26,num:'1'}],member:[0,1],limit:[0]},
    // {idx:1,na:'임진왜란 영웅',tag:'<em link="relation_1">임진왜란 영웅</em>',txt:'<em link="relation_2"><u>임진왜란 참전</u></em>대상 데미지 <b dmg>100%</b> <i icon up>증가</i> 한다.',eff:[{ta:0,type:0,num:'30%'},{ta:'임진왜란 참전',type:3,num:'100%'}],member:[0],limit:[0]},
    // {idx:2,na:'임진왜란 참전',tag:'<em link="relation_2">임진왜란 참전</em>',txt:'명중 <b buff>10%</b> <i icon up>증가</i> 한다.',eff:[{ta:0,type:5,num:'10%'}],member:[0,1,2,3,4],limit:[5]},
    {idx:0,na:'조(曹)씨가문',tag:'<em link="relation_0"></em>',txt:'<b buff>30%</b>의 체력(HP) <i icon up>증가</i>, <b buff>10</b>의 속도(SPD) <i icon up>증가</i> 한다.',eff:[{ta:0,type:0,num:'30%'},{ta:0,type:8,num:'10'}],member:[1,2,3,4],limit:[0]},
    {idx:1,na:'삼국지 라이벌I',tag:'<em link="relation_0"></em>',txt:'<b buff>10%</b>의 물리 공격(ATK) <i icon up>증가</i>, <b buff>10%</b>의 술법 공격(MAK) <i icon up>증가</i> 한다.',eff:[{ta:0,type:3,num:'10%'},{ta:0,type:5,num:'10%'}],member:[0,1],limit:[0]},
    {idx:2,na:'수어지교',tag:'<em link="relation_0"></em>',txt:'HP <b buff>30%</b> <i icon up>증가</i>, SP <b buff>1</b> <i icon up>증가</i> 한다.',eff:[{ta:0,type:0,num:'30%'},{ta:0,type:26,num:'1'}],member:[0,"제갈량"],limit:[0]},
    {idx:3,na:'보디가드(촉)',tag:'<em link="relation_0"></em>',txt:'HP <b buff>30%</b> <i icon up>증가</i>, SP <b buff>1</b> <i icon up>증가</i> 한다.',eff:[{ta:0,type:0,num:'30%'},{ta:0,type:26,num:'1'}],member:[0,"조운"],limit:[0]},
    {idx:4,na:'Test',tag:'<em link="relation_0"></em>',txt:'HP <b buff>30%</b> <i icon up>증가</i>, SP <b buff>1</b> <i icon up>증가</i> 한다.',eff:[{ta:0,type:0,num:'30%'},{ta:0,type:26,num:'1'}],member:[23,24,27],limit:[0]},
];