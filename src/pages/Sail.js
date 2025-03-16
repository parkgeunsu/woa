import { AppContext } from 'App';
import { util } from 'components/Libs';
import 'css/map.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const TIMEOUT_SPEED = 50;
const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const Wrap = styled.div`
`;
const Ship = styled.div`
	position:absolute;
	width:16%;
	padding-top:calc(16% * 1.875);
	transform-origin:50% 50%;
	.ship{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
	}
	.ship_display{
		position:absolute;
		left:0;
		top:0;
	}
	.ship_display svg{padding:0;}
`;
const Wheel = styled.div`
	background:url(${({wheelImg}) => wheelImg}) no-repeat center center;
	background-size:100%;
`;
const Sails = styled.div`
	background:url(${({sailImg}) => sailImg}) no-repeat center center;
	background-size:100%;
`;
const shipSize = (shipIdx) => {
	if (shipIdx < 3) { //소형
		return 0;
	} else if (shipIdx < 8) { //중형
		return 1;
	} else { //대형
		return 2;
	}
}
const MapLand = styled.div`
	background-image:url(${({map}) => map});background-size:100%;background-position:center center;background-repeat:no-repeat;
`;
const WeatherIcon = styled.div`
	position:absolute;left:${({idx}) => 50 * idx}px;background-image:url(${({src}) => src});background-size:80%;background-position:center center;background-repeat:no-repeat;width:46px;height:46px;
`;
const WeatherWind = styled.div`
	.weather_arrow{background-image:url(${({src}) => src});background-size:100%;background-repeat:no-repeat;background-position:center center;transform:rotate(${({weatherInfo}) => weatherInfo.wind}deg);
	}
`;
const BgEffect = styled.div`
	.cloud{transition:all ${({gameSpd}) => 2 / gameSpd}s;}
	.cloud1{top:0;animation:cloudAnimation ${({gameSpd}) => 210 / gameSpd}s linear infinite;background-image:url(${({img1}) => img1});background-size:100%;}
	.cloud2{top:30%;animation:cloudAnimationReverse ${({gameSpd}) => 130 / gameSpd}s linear infinite;background-image:url(${({img2}) => img2});background-size:100%;opacity:1;}
`;
const BgLight = styled.div`
	&:after{
		content:'';position:absolute;left:0;top:0;height:100%;width:100%;
		background:${({type, day}) => {
			if (type === 'w0' && day) {
				return `conic-gradient(at 5% -10%, rgba(255,255,255,0.4) 25%, 25%,
			rgba(255,255,255,0.6) 26%, rgba(255,255,255,0) 27%,
			rgba(255,255,255,0) 29%, rgba(255,255,255,0.5) 30.5%, rgba(255,255,255,0) 32%,
			rgba(255,255,255,0) 37.3%, rgba(255,255,255,0.6) 37.5%, rgba(255,255,255,0) 37.8%,
			rgba(255,255,255,0) 39%, rgba(255,255,255,0.5) 39.5%, rgba(255,255,255,0) 40%,
			rgba(255,255,255,0) 44%, rgba(255,255,255,0.6) 45.5%, rgba(255,255,255,0) 47%,
			rgba(255,255,255,0) 50%);`;
			} else if ((type === 'w3' && day) || (type === 'w4' && day)) {
				return `conic-gradient(at 5% -10%, rgba(0,0,0,.5) 25%, rgba(0,0,0,0.2) 37.5%,rgba(0,0,0,0.5) 50%);`;
			}
			if (!day) {
				return `conic-gradient(at 5% -10%, rgba(0,0,0,.9) 25%, rgba(0,0,0,0.3) 37.5%,rgba(0,0,0,0.9) 50%);`;
			}
		}
	}}
	&:before{
		content:'';position:absolute;left:0;top:0;padding-top:100%;width:100%;background:${({type, day}) => {
			if (type === 'w0' && day) {
				return `radial-gradient(at 10% 0%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%),
				radial-gradient(at 10% 0%, rgba(255,220,255,0) 10%, rgba(255,255,255,0.6) 12.5%, rgba(255,255,255,0) 25%),
				radial-gradient(at 10% 0%, rgba(255,220,0,0) 18%, rgba(255,245,0,0.6) 20%, rgba(255,220,0,0) 34%),
				radial-gradient(at 10% 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.4) 38%, rgba(255,255,255,0) 60%)`;
			}
		}};
	}
`;
const getWeather = (weather) => {
	return weather.type.split('w')[1]*2 + (weather.day ? 0 : 1);
}
const changeWeather = (weather) => {
	let type = weather.type.split('w')[1]*1,
		type_ = type,
		wind = weather.wind,
		delay = weather.delay;
	const typePercent = Math.random(),
		windPercent = Math.random();
	if (typePercent < .1) {
		type = 4;
	} else if (typePercent < .3) {
		type = type - 1 < 0 ? 0 : type - 1;
	} else if (typePercent < .5) {
		type = type + 1 > 4 ? 4 : type + 1;
	}
	if (windPercent < .1) {
		wind = wind - 20 < 0 ? 0 : wind - 20;
	} else if (windPercent < .2) {
		wind = wind + 20 < 360 ? 360 : wind + 20;
	} else if (windPercent < .4) {
		wind = wind - 10 < 0 ? 0 : wind - 10;
	} else if (windPercent < .6) {
		wind = wind + 10 < 360 ? 360 : wind + 10;
	}
	if (delay <= 0) {
		return {
			type:'w' + type,
			wind:wind,
			day:weather.day === 0 ? 1 : 0,
			delay:delay,
		}
	} else {
		return {
			type:'w' + type_,
			wind:wind,
			day:weather.day,
			delay:delay - 1,
		}
	}
}
const Sail = ({
	saveData,
	changeSaveData,
}) => {
  const context = useContext(AppContext);
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
  const speed = React.useMemo(() => {
    return context.setting.speed;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
	// const [modalOn, setModalOn] = useState(false);
	// const [modalInfo, setModalInfo] = useState({});
	// const [modalType, setModalType] = useState();
	const rotateSpeed1 = useRef(0);//wheel 회전각도
	const rotateSpeed2 = useRef(0);//sail 회전각도
	const frictionCount = useRef(1);//wheel 마찰개수
	const wheelCenterRef = useRef();//wheel 중심값
	const sailCenterRef = useRef();//sail 중심값
	const wheelDegree = useRef(0);//wheel 각도
	const sailDegree = useRef(0);//sail 각도
	const sailTargetDegree = useRef(0);//sail 목표각도
	const sailShipDegree = useRef(0);//sail 목표각도
	const touchDistance1 = useRef();//wheel 터치시작점
	const touchDistance2 = useRef();//sail 터치시작점
	const [map, setMap] = useState(1);//map 번호
	const mapInfo = useRef({w:0,h:0});//맵 크기
	const mapRef = useRef();//map canvas
	const mapCtx = useRef();//map canvas ctx
	const timeoutRef = useRef();
	const timeSec = useRef(0);//시간 체크
	const wheelContainerRef = useRef(null);//wheel 선택자
	const sailContainerRef = useRef(null);//sail 선택자
	const shipContainerRef = useRef(null);//ship 선택자
	const shipRef = useRef(null);
	const shipSpeed = useRef(1);
	const shipX = useRef(100);
	const shipY = useRef(300);
	const [selectShip, setSelectShip] = useState({shipIdx:'',wood:'',figure:'',anchor:'',sail0:'',sail1:'',sail2:'',sail0Color:'#fff',sail1Color:'#fff',sail2Color:'#fff',cannon0:'',cannon1:'',cannon2:''});
	const containerRef = useRef(null);
	const bgCanvasRef = useRef();//날씨 캔버스
	const containerWH = useRef([0,0]);
	const [weather, setWeather] = useState({
		type:'w0',//w0:맑음, w1:흐림, w2:비, w3:천둥, w4:눈
		day:true,//낮 밤
		wind:0,//바람
		delay:0//턴 유지
	});//날씨
	const animation = () => {
		timeSec.current ++;
		if (timeSec.current % 1000 === 0) {
			//setWeather(changeWeather(weather));
			if (weather.delay <= 0) {
				setWeather({
					...weather,
					type:'w' + Math.floor(Math.random() * 5),
					wind:Math.floor(Math.random() * 36) * 10,
					day:true,
				});
			} else {
				setWeather({
					...weather,
					delay:weather.delay - 1,
				})
			}
		}
		//wheel
		rotateSpeed1.current *= frictionCount.current;
		if (Math.abs(rotateSpeed1.current) < 0.1) {
			frictionCount.current = 1;
			rotateSpeed1.current = 0;
		}
		shipSpeed.current = 2;
		wheelDegree.current += rotateSpeed1.current;
		wheelContainerRef.current.style.transform = `translate(-50%,-50%) rotate(${wheelDegree.current}deg)`;

		//console.log(wheelDegree.current);
		const x = Math.cos(wheelDegree.current * (Math.PI / 180)) * shipSpeed.current + shipX.current,
			y = Math.sin(wheelDegree.current * (Math.PI / 180)) * shipSpeed.current + shipY.current;
		const mapColor = mapCtx.current.getImageData(x, y, 1, 1).data;
		if (x < 0) { //맵 좌측
			console.log('left map');
			shipContainerRef.current.style.left = shipX.current + 'px';
			shipContainerRef.current.style.top = shipY.current + 'px';
		} else if (x > mapInfo.current.w) { //맵 우측
			console.log('right map');
			shipContainerRef.current.style.left = shipX.current + 'px';
			shipContainerRef.current.style.top = shipY.current + 'px';
		} else if (y < 0) { //맵 상단
			console.log('up map');
			shipContainerRef.current.style.left = shipX.current + 'px';
			shipContainerRef.current.style.top = shipY.current + 'px';
		} else if (y > mapInfo.current.h) { //맵 하단
			console.log('down map');
			shipContainerRef.current.style.left = shipX.current + 'px';
			shipContainerRef.current.style.top = shipY.current + 'px';
		} else {//맵 안쪽일 경우
			if (mapColor[0] === 195 && mapColor[1] === 128 && mapColor[2] === 0) {
				console.log('land');
				shipContainerRef.current.style.left = shipX.current + 'px';
				shipContainerRef.current.style.top = shipY.current + 'px';
			} else {
				console.log('water');
				shipContainerRef.current.style.left = x + 'px';
				shipContainerRef.current.style.top = y + 'px';
			}
		}
		shipContainerRef.current.style.transform = `translate(-50%,-50%) rotate(${90 + wheelDegree.current}deg)`;
		shipX.current = parseInt(shipContainerRef.current.style.left);
		shipY.current = parseInt(shipContainerRef.current.style.top);

		//sail
		sailDegree.current += rotateSpeed2.current;
		sailShipDegree.current += (sailTargetDegree.current - sailShipDegree.current) * 0.1;
		if (sailDegree.current > 90) {
			sailDegree.current = 90;
		} else if (sailDegree.current < -90) {
			sailDegree.current = -90;
		}
		sailContainerRef.current.style.transform = `translate(-50%,-50%) rotate(${sailDegree.current}deg)`;
		if (document.querySelector('.sail')) {
			document.querySelector('.sail').style.transform = `rotate(${sailShipDegree.current}deg)`;
		}
		timeoutRef.current = setTimeout(animation, TIMEOUT_SPEED);//애니메이션 실행
	};
	useEffect(() => {
		if (Object.keys(saveData).length !== 0) {
			const ship = saveData.ship[saveData.info.shipIdx];
			setSelectShip({
				shipIdx:ship.shipIdx,
				wood:ship.wood,
				figure:ship.figure,
				anchor:ship.anchor,
				sail0:ship.sail[0]?.type || '',
				sail1:ship.sail[1]?.type || '',
				sail2:ship.sail[2]?.type || '',
				sail0Color:ship.sail[0]?.color || '',
				sail1Color:ship.sail[1]?.color || '',
				sail2Color:ship.sail[2]?.color || '#fff',
				cannon0:ship.cannon[0] || '',
				cannon1:ship.cannon[1] || '',
				cannon2:ship.cannon[2] || '',
			});
		}
	}, [saveData]);
	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		}
	}, []);
	useEffect(() => {
		if (wheelContainerRef.current) {
			wheelCenterRef.current = wheelContainerRef.current.getBoundingClientRect().width / 2;
			sailCenterRef.current = sailContainerRef.current.getBoundingClientRect().width / 2;
			timeoutRef.current = setTimeout(animation, TIMEOUT_SPEED);
		}
	}, [wheelContainerRef.current, sailCenterRef.current]);
	useEffect(() => {
		const area = containerRef.current.getBoundingClientRect();
		mapInfo.current = {
			w:area.width,
			h:area.height,
		}
		containerWH.current = [area.width, area.height];
		//canvas
		mapRef.current.setAttribute('width', area.width + 'px');
		mapRef.current.setAttribute('height', area.height + 'px');
		mapCtx.current = mapRef.current.getContext('2d');
		const mapImg = new Image();
		mapImg.src = imgSet.map[map];
		mapImg.addEventListener('load', () => {
			mapCtx.current.drawImage(mapImg, 0, 0);
		});
	}, [containerRef.current]);
	useEffect(() => {
		if (weather.type === 'w2' || weather.type === 'w3') {
			const can = bgCanvasRef.current;
			can.setAttribute('width', containerWH.current[1]);
			can.setAttribute('height', containerWH.current[1]);
			can.style.left = (containerWH.current[0] - containerWH.current[1]) / 2 + 'px';
			can.style.transform = `rotate(${180 + weather.wind}deg)`; 
			const ctx = can.getContext('2d');
			const drops = [];
			class Drop {
        constructor(index, x, y, speed, length) {
          this.index = index;
          this.x = x;
          this.y = y;
          this.speed = speed;
          this.length = length;
          this.draw();
        }
        draw() {
          ctx.beginPath();
          ctx.strokeStyle = '#dfdfdf';
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.stroke();
          ctx.closePath();
        }
      }
			const render = () => {
				ctx.clearRect(0, 0, can.width, can.height);
				drops.forEach((drop) => {
          drop.y += drop.speed;
          if (drop.y > can.height) {
            drop.y = Math.random() * -30;
            drop.x = Math.random() * can.width;
            drop.speed = Math.random() * 3 + 1;
            drop.length = Math.random() * 7 + 2;
          }
          drop.draw();
        });
        requestAnimationFrame(render); //반복
			}
			let tempX, tempY, tempSpeed, tempLength;
			for (let i = 0; i < 250; i++) {
        tempY = Math.random() * -150;
        tempX = Math.random() * can.width;
        tempSpeed = Math.random() * 3 + 1;
        tempLength = Math.random() * 7 + 2;

        drops.push(new Drop(i, tempX, tempY, tempSpeed, tempLength));
      }
      render();
		} else if (weather.type === 'w4') {
			const can = bgCanvasRef.current;
			can.setAttribute('width', containerWH.current[1]);
			can.setAttribute('height', containerWH.current[1]);
			can.style.left = (containerWH.current[0] - containerWH.current[1]) / 2 + 'px';
			can.style.transform = `rotate(${180 + weather.wind}deg)`; 
			const ctx = can.getContext('2d');
			const drops = [];
			class Drop {
        constructor(index, x, y, speed, size, opacity) {
          this.index = index;
          this.x = x;
          this.y = y;
          this.speed = speed;
          this.size = size;
					this.opacity = opacity;
          this.draw();
        }
        draw() {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
          ctx.fill();
          ctx.closePath();
        }
      }
			const render = () => {
				ctx.clearRect(0, 0, can.width, can.height);
				drops.forEach((drop) => {
          drop.y += drop.speed;
          if (drop.y > can.height) {
            drop.y = Math.random() * -30;
            drop.x = Math.random() * can.width;
            drop.speed = Math.random() * 1.5 + 0.2;
            drop.size = Math.random() * 4 + 1;
						drop.opacity = Math.random()* 0.7 + 0.3;
          }
          drop.draw();
        });
        requestAnimationFrame(render); //반복
			}
			let tempX, tempY, tempSpeed, tempSize, tempOpacity;
			for (let i = 0; i < 250; i++) {
        tempY = Math.random() * -150;
        tempX = Math.random() * can.width;
        tempSpeed = Math.random() * 1.5 + 0.2;
        tempSize = Math.random() * 4 + 1;
				tempOpacity = Math.random()* 0.7 + 0.3;

        drops.push(new Drop(i, tempX, tempY, tempSpeed, tempSize, tempOpacity));
      }
      render();
		}
	}, [weather]);
  return (
		<>
			<Wrap className="map_wrap">
				<div className="water" ref={containerRef}>
					<svg id="svg" className="path" style={{backgroundColor: "rgb(132, 235, 228)"}}>
						<path fill="#79dfdd" stroke="#79dfdd" d="M -200 1091 L -200 0 C -169.72222222222223 0, -121.27777777777777 -18, -91 -18 C -68.22222222222223 -18, -31.77777777777778 -12, -9 -12 C 18.5 -12, 62.5 -15, 90 -15 C 116.94444444444444 -15, 160.05555555555554 -13, 187 -13 C 208.94444444444446 -13, 244.05555555555554 -10, 266 -10 C 288.5 -10, 324.5 18, 347 18 C 386.44444444444446 18, 449.55555555555554 -15, 489 -15 C 529.2777777777778 -15, 593.7222222222222 14, 634 14 L 710 0 L 710 1091 Z"></path>
						<path fill="#6ed3d5" stroke="#6ed3d5" d="M -200 1091 L -190 44 C -158.33333333333334 44, -107.66666666666666 34, -76 34 C -55.16666666666667 34, -21.833333333333332 33, -1 33 C 23.166666666666664 33, 61.833333333333336 56, 86 56 C 116.83333333333333 56, 166.16666666666666 56, 197 56 C 222.55555555555554 56, 263.44444444444446 31, 289 31 C 329.8333333333333 31, 395.1666666666667 55, 436 55 C 466.55555555555554 55, 515.4444444444445 30, 546 30 L 710 44 L 710 1091 Z"></path>
						<path fill="#64c6ce" stroke="#64c6ce" d="M -200 1091 L -180 89 C -141.66666666666666 89, -80.33333333333334 106, -42 106 C -16.166666666666668 106, 25.166666666666668 74, 51 74 C 78.5 74, 122.5 100, 150 100 C 173.61111111111111 100, 211.38888888888889 80, 235 80 C 262.5 80, 306.5 73, 334 73 C 357.3333333333333 73, 394.6666666666667 71, 418 71 C 458.27777777777777 71, 522.7222222222222 77, 563 77 L 710 89 L 710 1091 Z"></path>
						<path fill="#5bbac5" stroke="#5bbac5" d="M -200 1091 L -170 133 C -145.27777777777777 133, -105.72222222222223 121, -81 121 C -58.5 121, -22.5 117, 0 117 C 29.166666666666664 117, 75.83333333333334 120, 105 120 C 136.38888888888889 120, 186.61111111111111 146, 218 146 C 241.88888888888889 146, 280.1111111111111 148, 304 148 C 338.44444444444446 148, 393.55555555555554 148, 428 148 C 456.8888888888889 148, 503.1111111111111 121, 532 121 L 710 133 L 710 1091 Z"></path>
						<path fill="#53aebd" stroke="#53aebd" d="M -200 1091 L -160 178 C -138.33333333333334 178, -103.66666666666667 187, -82 187 C -42.833333333333336 187, 19.833333333333336 162, 59 162 C 90.94444444444444 162, 142.05555555555554 161, 174 161 C 200.11111111111111 161, 241.88888888888889 193, 268 193 C 306.6111111111111 193, 368.3888888888889 192, 407 192 C 443.94444444444446 192, 503.05555555555554 192, 540 192 L 710 178 L 710 1091 Z"></path>
						<path fill="#4ba2b4" stroke="#4ba2b4" d="M -200 1091 L -150 222 C -121.66666666666667 222, -76.33333333333333 239, -48 239 C -7.444444444444443 239, 57.44444444444444 240, 98 240 C 120.5 240, 156.5 232, 179 232 C 208.44444444444446 232, 255.55555555555554 233, 285 233 C 322.77777777777777 233, 383.22222222222223 235, 421 235 C 447.1111111111111 235, 488.8888888888889 205, 515 205 L 710 222 L 710 1091 Z"></path>
						<path fill="#4597ab" stroke="#4597ab" d="M -200 1091 L -140 267 C -106.11111111111111 267, -51.888888888888886 254, -18 254 C 12.277777777777779 254, 60.72222222222222 249, 91 249 C 120.44444444444444 249, 167.55555555555554 255, 197 255 C 226.44444444444446 255, 273.55555555555554 258, 303 258 C 343 258, 407 279, 447 279 C 482.55555555555554 279, 539.4444444444445 255, 575 255 L 710 267 L 710 1091 Z"></path>
						<path fill="#3f8ba1" stroke="#3f8ba1" d="M -200 1091 L -130 311 C -91.94444444444444 311, -31.055555555555557 301, 7 301 C 28.38888888888889 301, 62.611111111111114 325, 84 325 C 112.88888888888889 325, 159.11111111111111 327, 188 327 C 211.88888888888889 327, 250.11111111111111 326, 274 326 C 298.44444444444446 326, 337.55555555555554 324, 362 324 C 399.5 324, 459.5 302, 497 302 C 528.1111111111111 302, 577.8888888888889 322, 609 322 L 710 311 L 710 1091 Z"></path>
						<path fill="#397f97" stroke="#397f97" d="M -200 1091 L -120 356 C -81.11111111111111 356, -18.888888888888886 345, 20 345 C 54.166666666666664 345, 108.83333333333334 344, 143 344 C 178.83333333333334 344, 236.16666666666666 369, 272 369 C 302.55555555555554 369, 351.44444444444446 339, 382 339 C 415.05555555555554 339, 467.94444444444446 343, 501 343 C 529.3333333333334 343, 574.6666666666666 374, 603 374 L 710 356 L 710 1091 Z"></path>
						<path fill="#34748d" stroke="#34748d" d="M -200 1091 L -110 400 C -78.05555555555556 400, -26.944444444444443 410, 5 410 C 32.22222222222222 410, 75.77777777777777 409, 103 409 C 125.5 409, 161.5 387, 184 387 C 218.44444444444446 387, 273.55555555555554 384, 308 384 C 329.6666666666667 384, 364.3333333333333 418, 386 418 C 410.1666666666667 418, 448.8333333333333 390, 473 390 C 494.3888888888889 390, 528.6111111111111 386, 550 386 L 710 400 L 710 1091 Z"></path>
						<path fill="#306983" stroke="#306983" d="M -200 1091 L -100 445 C -63.05555555555556 445, -3.944444444444443 458, 33 458 C 56.611111111111114 458, 94.38888888888889 428, 118 428 C 149.94444444444446 428, 201.05555555555554 463, 233 463 C 271.05555555555554 463, 331.94444444444446 429, 370 429 C 407.5 429, 467.5 432, 505 432 C 538.3333333333334 432, 591.6666666666666 463, 625 463 L 710 445 L 710 1091 Z"></path>
						<path fill="#2b5e78" stroke="#2b5e78" d="M -200 1091 L -90 490 C -49.44444444444444 490, 15.444444444444443 479, 56 479 C 86.27777777777777 479, 134.72222222222223 475, 165 475 C 202.22222222222223 475, 261.77777777777777 505, 299 505 C 320.1111111111111 505, 353.8888888888889 502, 375 502 C 396.6666666666667 502, 431.3333333333333 508, 453 508 C 488.55555555555554 508, 545.4444444444445 475, 581 475 L 710 490 L 710 1091 Z"></path>
						<path fill="#27536e" stroke="#27536e" d="M -200 1091 L -80 534 C -44.166666666666664 534, 13.166666666666664 518, 49 518 C 89 518, 153 523, 193 523 C 216.88888888888889 523, 255.11111111111111 546, 279 546 C 310.1111111111111 546, 359.8888888888889 552, 391 552 C 422.1111111111111 552, 471.8888888888889 516, 503 516 C 524.6666666666666 516, 559.3333333333334 520, 581 520 L 710 534 L 710 1091 Z"></path>
						<path fill="#234963" stroke="#234963" d="M -200 1091 L -70 579 C -34.166666666666664 579, 23.166666666666664 590, 59 590 C 96.5 590, 156.5 566, 194 566 C 232.88888888888889 566, 295.1111111111111 596, 334 596 C 355.94444444444446 596, 391.05555555555554 561, 413 561 C 452.1666666666667 561, 514.8333333333334 565, 554 565 L 710 579 L 710 1091 Z"></path>
						<path fill="#1f3f58" stroke="#1f3f58" d="M -200 1091 L -60 623 C -23.611111111111114 623, 34.611111111111114 605, 71 605 C 107.94444444444444 605, 167.05555555555554 608, 204 608 C 232.05555555555554 608, 276.94444444444446 633, 305 633 C 326.6666666666667 633, 361.3333333333333 610, 383 610 C 403.55555555555554 610, 436.44444444444446 640, 457 640 C 494.5 640, 554.5 612, 592 612 L 710 623 L 710 1091 Z"></path>
						<path fill="#1b354d" stroke="#1b354d" d="M -200 1091 L -50 668 C -12.777777777777779 668, 46.77777777777778 654, 84 654 C 123.44444444444444 654, 186.55555555555554 657, 226 657 C 249.61111111111111 657, 287.3888888888889 683, 311 683 C 342.6666666666667 683, 393.3333333333333 678, 425 678 C 461.94444444444446 678, 521.0555555555555 652, 558 652 L 710 668 L 710 1091 Z"></path>
						<path fill="#172b43" stroke="#172b43" d="M -200 1091 L -40 712 C -17.22222222222222 712, 19.22222222222222 698, 42 698 C 79.22222222222223 698, 138.77777777777777 722, 176 722 C 202.11111111111111 722, 243.88888888888889 726, 270 726 C 301.3888888888889 726, 351.6111111111111 696, 383 696 C 420.77777777777777 696, 481.22222222222223 697, 519 697 L 710 712 L 710 1091 Z"></path>
						<path fill="#132238" stroke="#132238" d="M -200 1091 L -30 757 C 2.7777777777777786 757, 55.22222222222222 768, 88 768 C 119.66666666666666 768, 170.33333333333334 766, 202 766 C 237.83333333333334 766, 295.1666666666667 748, 331 748 C 351.55555555555554 748, 384.44444444444446 743, 405 743 C 425.8333333333333 743, 459.1666666666667 746, 480 746 C 514.7222222222222 746, 570.2777777777778 767, 605 767 L 710 757 L 710 1091 Z"></path>
						<path fill="#0e192e" stroke="#0e192e" d="M -200 1091 L -20 801 C 18.611111111111107 801, 80.38888888888889 819, 119 819 C 155.94444444444446 819, 215.05555555555554 819, 252 819 C 279.22222222222223 819, 322.77777777777777 785, 350 785 C 382.77777777777777 785, 435.22222222222223 815, 468 815 C 507.72222222222223 815, 571.2777777777778 816, 611 816 L 710 801 L 710 1091 Z"></path>
						<path fill="#090f23" stroke="#090f23" d="M -200 1091 L -10 846 C 20 846, 68 856, 98 856 C 136.05555555555554 856, 196.94444444444446 863, 235 863 C 269.44444444444446 863, 324.55555555555554 857, 359 857 C 387.3333333333333 857, 432.6666666666667 835, 461 835 C 487.6666666666667 835, 530.3333333333334 828, 557 828 L 710 846 L 710 1091 Z"></path>
						<path fill="#00001a" stroke="#00001a" d="M -200 1091 L 0 891 C 40.27777777777778 891, 104.72222222222223 880, 145 880 C 179.44444444444446 880, 234.55555555555554 905, 269 905 C 299 905, 347 873, 377 873 C 411.1666666666667 873, 465.8333333333333 906, 500 906 C 525 906, 565 881, 590 881 L 710 891 L 710 1091 Z"></path>
					</svg>
					<canvas className="map_land" ref={mapRef}></canvas>
					<Ship ref={shipContainerRef}>
						<div className="ship" ref={shipRef}>
						{selectShip.shipIdx !== '' && <div className={`ship_display size${shipSize(selectShip.shipIdx)} ship${selectShip.shipIdx}`}>
								<svg className="ship_body" xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[selectShip.shipIdx], imgSet.wood[selectShip.wood] || imgSet.images.transparent, gameData.ships.woodColor[gameData.ships.wood[selectShip.wood]?.woodColor ?? 4], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail0}_1`], gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail1}_2`], gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail2}_3`]], [selectShip.sail0Color, selectShip.sail1Color, selectShip.sail2Color], [gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon0}_1`], gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon1}_2`], gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon2}_3`]])}}></svg>
								{selectShip.figure !== '' && <svg className="ship_face" style={{filter:`drop-shadow(0 0 7px ${gameData.ships.figureColor[gameData.ships.figurehead[selectShip.figure].color][2]})`}} xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[gameData.ships.figurehead[selectShip.figure].display], gameData.ships.figureColor, gameData.ships.figurehead[selectShip.figure].color)}}></svg>}
							</div>}
						</div>
					</Ship>
					<BgEffect className="bgEffect" img1={imgSet.bgEffect[0]} img2={imgSet.bgEffect[1]} gameSpd={speed}>
						{weather.type === "w0" && (
							<>
								<BgLight className="bg_light" type={weather.type} day={weather.day}>
									{weather.day && (
										<div>
											<span className="circle"></span>
											<span className="circle"></span>
											<span className="circle"></span>
											<span className="circle"></span>
											<span className="circle"></span>
										</div>
									)}
								</BgLight>
							</>
						)}
						{weather.type === "w1" && (
							<>
								<BgLight className="bg_light" type={weather.type} day={weather.day}/>
								<div className="cloud cloud1" style={{filter:`brightness(${weather.day ? 1 : 0.3})`}}></div>
								<div className="cloud cloud2" style={{filter:`brightness(${weather.day ? 1 : 0.3})`}}></div>
							</>
						)}
						{weather.type === "w2" && (
							<>
								<BgLight className="bg_light" type={weather.type} day={weather.day}/>
								<canvas className="bg_rain" ref={bgCanvasRef}></canvas>
							</>
						)}
						{weather.type === "w3" && (
							<>
								<BgLight className="bg_light lightning" type={weather.type} day={weather.day}/>
								<canvas className="bg_rain" ref={bgCanvasRef}></canvas>
							</>
						)}
						{weather.type === "w4" && (
							<>
								<BgLight className="bg_light" type={weather.type} day={weather.day}/>
								<canvas className="bg_snow" ref={bgCanvasRef}></canvas>
							</>
						)}
					</BgEffect>
				</div>
				<div className="weather" src={[imgSet.weather]} >
					<div className={`weather_icon weather_type ${weather.day ? "day" : "night"}`}>
						<div className="weather_typeIcon" style={{left:`${getWeather(weather) * -50}px`}}>
							{imgSet.weather.map((data, idx) => {
								return <WeatherIcon src={data} idx={idx} key={idx}></WeatherIcon>;
							})}
						</div>
					</div>
					<WeatherWind className="weather_icon weather_wind" src={imgSet.etc.wind} weatherInfo={weather}>
						<div className="weather_arrow"></div>
					</WeatherWind>
				</div>
				<div className="control">
					<div className="wheel_control">
						<Wheel className="wheel" ref={wheelContainerRef} wheelImg={imgSet.control['wheel0']}
						onTouchStart={(e) => {
							touchDistance1.current = e.changedTouches[0].clientX;
						}} onTouchMove={(e) => {
							const distance = e.changedTouches[0].clientX - touchDistance1.current;
							rotateSpeed1.current = (distance / wheelCenterRef.current) * 5;
						}} onTouchEnd={() => {
							frictionCount.current = 0.95;
						}}></Wheel>
					</div>
					<div className="sail_control">
						<Sails className="sail_" ref={sailContainerRef} sailImg={imgSet.control['sail0']} onTouchStart={(e) => {
							touchDistance2.current = e.changedTouches[0].clientX;
						}} onTouchMove={(e) => {
							const distance = e.changedTouches[0].clientX - touchDistance2.current;
							rotateSpeed2.current = (distance / sailCenterRef.current);
						}} onTouchEnd={() => {
							rotateSpeed2.current = 0;
							sailTargetDegree.current = sailDegree.current;
						}}></Sails>
					</div>
				</div>
			</Wrap>
		</>
  );
}

export default Sail;
