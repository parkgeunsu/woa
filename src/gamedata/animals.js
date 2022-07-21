export const animals = [//animal_type 동물타입 0고양이, 1사자, 2호랑이,3개, 4늑대, 5물개, 6너구리, 7쥐, 8토끼, 9원숭이, 10고릴라, 11캥거루, 12소, 13곰, 14말, 15사슴, 16코뿔소, 17코끼리, 18기린, 19새, 20독수리, 21뱀, 22도마뱀, 23거북이, 24개구리
    //equip 아이템 장착착용 0없음, 1투구, 2옷, 3장비, 4반지, 5목걸이, 10짐
    //찌르기0, 할퀴기1, 물기2, 치기3, 누르기4, 던지기5
    {idx:0,na:'고양이',equip:[1,2,3,3,4,5,0,0],element:[0,20,30,15,0,0,0,0,0,0,0,0,0],talk:["냥","묘~"],
    skill:[0,8,9,10,11,12]},//1할퀴기(20), 2물기(30), 3치기(15)
    {idx:1,na:'사자',equip:[1,2,3,3,4,4,5,0],element:[0,45,50,0,0,0,0,0,0,0,0,0,0],talk:["어흥"],
    skill:[0,8,9,10,11,12]},//1할퀴기(45), 2물기(50)
    {idx:2,na:'호랑이',equip:[1,2,3,3,4,5,5,0],element:[0,50,45,0,0,0,0,0,0,0,0,0,0],talk:["어흥"],
    skill:[0,8,9,10,11,12]},//1할퀴기(50), 2물기(45)
    {idx:3,na:'개',equip:[1,2,3,4,5,10,0,0],element:[0,0,25,25,0,0,0,0,0,0,0,0,0],talk:["멍"],
    skill:[0,8,9,10,11,12]},//2물기(25), 3치기(25)
    {idx:4,na:'늑대',equip:[1,2,3,4,4,5,5,0],element:[0,0,30,30,0,0,0,0,0,0,0,0,0],talk:["아우~"],
    skill:[0,8,9,10,11,12]},//2물기(30), 3치기(30)
    {idx:5,na:'물개',equip:[1,2,3,5,10,10,0,0],element:[0,0,0,10,15,0,0,0,0,0,0,0,0],talk:["헝!헝!"],
    skill:[0,8,9,10,11,12]},//4누르기(15), 3치기(10)
    {idx:6,na:'너구리',equip:[1,2,3,4,4,5,0,0],element:[0,0,15,20,0,10,0,0,0,0,0,0,0],talk:["구리"],
    skill:[0,8,9,10,11,12]},//2물기(15), 3치기(20), 5던지기(10)
    {idx:7,na:'쥐',equip:[1,2,3,5,0,0,0,0],element:[0,0,20,0,0,0,0,0,0,0,0,0,0],talk:["찍","찍찍"],
    skill:[0,8,9,10,11,12]},//2물기(20)
    {idx:8,na:'토끼',equip:[1,2,3,4,5,0,0,0],element:[0,0,10,20,0,0,0,0,0,0,0,0,0],talk:[".."],
    skill:[0,8,9,10,11,12]},//3치기(20), 2물기(10)
    {idx:9,na:'원숭이',equip:[1,2,3,3,4,4,5,0],element:[0,0,20,25,0,20,0,0,0,0,0,0,0],talk:["끽~끽~"],
    skill:[0,8,9,10,11,12]},//3치기(25), 2물기(20), 5던지기(20)
    {idx:10,na:'고릴라',equip:[1,2,2,3,3,4,4,5],element:[0,0,0,40,20,50,0,0,0,0,0,0,0],talk:["릴라"],
    skill:[0,8,9,10,11,12]},//3치기(40), 4누르기(20), 5던지기(50)
    {idx:11,na:'캥거루',equip:[1,2,3,4,4,5,10,0],element:[0,0,0,35,0,0,0,0,0,0,0,0,0],talk:["콩콩"],
    skill:[0,8,9,10,11,12]},//3치기(35), 
    {idx:12,na:'소',equip:[1,2,2,3,5,10,10,10],element:[40,0,0,0,35,0,0,0,0,0,0,0,0],talk:["무~","음메"],
    skill:[0,8,9,10,11,12]},//4누르기(35), 0찌르기(40)
    {idx:13,na:'곰',equip:[1,2,2,3,4,5,10,10],element:[0,50,0,50,0,0,0,0,0,0,0,0,0],talk:[""],
    skill:[0,8,9,10,11,12]},//3치기(50), 1할퀴기(50)
    {idx:14,na:'말',equip:[1,2,2,3,5,10,10,10],element:[0,0,0,40,0,0,0,0,0,0,0,0,0],talk:["이힝~"],
    skill:[0,8,9,10,11,12]},//3치기(40)
    {idx:15,na:'사슴',equip:[1,2,3,5,5,10,0,0],element:[30,0,0,30,0,0,0,0,0,0,0,0,0],talk:["슴"],
    skill:[0,8,9,10,11,12]},//0찌르기(30), 3치기(30)
    {idx:16,na:'코뿔소',equip:[1,2,2,3,5,10,10,10],element:[35,0,0,0,30,0,0,0,0,0,0,0,0],talk:[""],
    skill:[0,8,9,10,11,12]},//0찌르기(35), 4누르기(30)
    {idx:17,na:'코끼리',equip:[1,2,2,3,10,10,10,10],element:[0,0,0,0,50,40,0,0,0,0,0,0,0],talk:["끼리"],
    skill:[0,8,9,10,11,12]},//4누르기(50), 6던지기(40)
    {idx:18,na:'기린',equip:[1,2,2,3,5,5,5,10],element:[0,0,0,40,40,0,0,0,0,0,0,0,0],talk:["멍"],
    skill:[0,8,9,10,11,12]},//4누르기(40), 3치기(40)
    {idx:19,na:'새',equip:[1,2,3,4,5,0,0,0],element:[25,0,10,0,0,0,0,0,0,0,0,0,0],talk:["짹"],
    skill:[0,8,9,10,11,12]},//0찌르기(25), 2물기(10)
    {idx:20,na:'독수리',equip:[1,2,3,3,4,4,5,0],element:[50,0,20,0,0,0,0,0,0,0,0,0,0],talk:[""],
    skill:[0,8,9,10,11,12]},//0찌르기(50), 2물기(20)
    {idx:21,na:'뱀',equip:[1,2,3,5,5,0,0,0],element:[0,0,20,0,0,0,0,0,0,0,0,0,0],talk:[""],
    skill:[0,8,9,10,11,12]},//2물기(20)
    {idx:22,na:'도마뱀',equip:[1,2,3,4,5,0,0,0],element:[0,10,15,0,0,0,0,0,0,0,0,0,0],talk:[""],
    skill:[0,8,9,10,11,12]},//2물기(15), 1할퀴기(10)
    {idx:23,na:'거북이',equip:[1,2,2,3,5,10,0,0],element:[0,0,25,0,0,0,0,0,0,0,0,0,0],talk:[""],
    skill:[0,8,9,10,11,12]},//2물기(25)
    {idx:24,na:'개구리',equip:[1,2,3,4,0,0,0,0],element:[0,0,0,15,0,0,0,0,0,0,0,0,0],talk:["개굴"],
    skill:[0,8,9,10,11,12]},//3치기(15)
    {idx:25,na:'돼지',equip:[1,2,2,3,4,5,10,10,0],element:[0,0,10,0,30,0,0,0,0,0,0,0,0],talk:["꿀"],
    skill:[0,8,9,10,11,12]}//4누르기(30), 2물기(10)
]