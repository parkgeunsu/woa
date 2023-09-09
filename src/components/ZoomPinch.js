import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ActionContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  transition: transform ${({ isAnimation }) => isAnimation ? '0.3s' : '0.05s'} linear;
  transform-origin: 50% 50%;
  ${({ state }) => `transform: translate(${state.x}px, ${state.y}px) scale(${state.scale});`}
  & > * {
    transform: translate3d(0, 0, 0);
  }
`;
const ZoomPinch = ({ 
  maxScale,
  minScale,
  children,
  mapPos,
  onEnd,
  ...rest
}) => {
  const containerRef = useRef();
  const actionRef = useRef();
  // 애니메이션 on, off
  const [isAnimation, setAnimation] = useState(false);
  // min, max 비율 받아 처리
  const defaultScale = useMemo(() => {
    return { maxScale: maxScale ?? 3, minScale: minScale ?? 1 };
  }, [maxScale, minScale]);
  // rendering없이 변경된 값 저장
  const stateRef = useRef({
    x: mapPos ? mapPos[0] / (maxScale - (defaultScale.minScale - 1)) : 0,
    y: mapPos ? mapPos[1] / (maxScale - (defaultScale.minScale - 1)) : 0,
    scale: defaultScale.minScale,
    startScale: defaultScale.minScale,
  });
  // 더블클릭&핀치로 인한 x,y,scale 상태
  const [state, setState] = useState(stateRef.current);
  useEffect(() => {
    stateRef.current = {
      ...stateRef.current,
      x: mapPos !== undefined ? mapPos[0] / (maxScale - (state.scale - 1)) : stateRef.current.x,
      y: mapPos !== undefined ? mapPos[1] / (maxScale - (state.scale - 1)) : stateRef.current.y,
    }
    setState(stateRef.current);
    mapPos !== undefined ? setAnimation(true) : setAnimation(false);
  }, [mapPos]);

  // 액션 상태 체크
  const currentActionRef = useRef(""); //move, zoom
  // pinch 최초 간격
  const firstPinchDistance = useRef(0);
  // touchstart x,y
  const touchStartXY = useRef([]);
  // 터치 포인트 정보
  const prevTouchPoints = useRef([]);
  // 이전 좌표값
  const prevPos = useRef([0, 0]);
  // 최종 남은 터치 포인트 순번 및 줌으로 인해 변한 좌표
  const changedTouches = useRef({identifier:0, pos:[0,0]});
  // 거리 비율 개수
  const distanceRatio = useRef(200);
  // 더블 클릭 판단
  const timeoutRef = useRef(null);
  const lastClick = useRef(0);

  // 1개 터치: TouchStart > TouchMove > TouchEnd 순으로 호출
  // 2개 터치: TouchStart ,TouchStart > TouchMove > TouchEnd, TouchEnd
  const handleTouchStart = (e) => {
      // onEnd && onEnd();
    setAnimation(false);
    const touches = e.touches;
    prevPos.current = [stateRef.current.x, stateRef.current.y];
    touchStartXY.current = touches;
    if (touches.length === 1) {
      changedTouches.current.identifier = 0;
      return;
    }
    const xDiff = touches[0].clientX - touches[1].clientX;
    const yDiff = touches[0].clientY - touches[1].clientY;

    firstPinchDistance.current = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    stateRef.current.startScale = stateRef.current.scale;
  };

  const handleTouchMove = (e) => {
    const touches = e.touches;
    if (prevTouchPoints.current.length > touches.length) {
      changedTouches.current.identifier = prevTouchPoints.current[0].identifier === touches[0].identifier ? 0 : 1;
      if (changedTouches.current.identifier === 0) {//첫번째 touch를 뗀 경우
        changedTouches.current.pos = [touches[0].clientX - touchStartXY.current[0].clientX, touches[0].clientY - touchStartXY.current[0].clientY];
      } else {//두번째 touch를 뗀 경우
        changedTouches.current.pos = [touches[0].clientX - touchStartXY.current[1].clientX, touches[0].clientY - touchStartXY.current[1].clientY];
      }
    }
    prevTouchPoints.current = touches;
    // 상위로 슬라이더와 같은 터치가 가능한 컨테이너가 올 경우 scale 여부에 따라서 이벤트 막음
    if (touches.length > 1 || stateRef.current.scale !== 1) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (touches.length < 2) {
      //좌표이동시
      currentActionRef.current = "move";
      if (state.scale !== 1) {
        //화면 zoom이 되었을 경우
        // 시작위치를 리셋시키지 않음
        const dragX =
          touches[0].clientX - touchStartXY.current[changedTouches.current.identifier].clientX + prevPos.current[0] - changedTouches.current.pos[0];
        const dragY =
          touches[0].clientY - touchStartXY.current[changedTouches.current.identifier].clientY + prevPos.current[1] - changedTouches.current.pos[1];

        const { scale } = stateRef.current;
        //움직임 가능영역 계산
        const { width, height } = containerRef.current.getBoundingClientRect();
        const possibleX = Math.min(
          Math.max(dragX, -(width * (scale - 1)) / 2),
          (width * (scale - 1)) / 2
        );
        const possibleY = Math.min(
          Math.max(dragY, -(height * (scale - 1)) / 2),
          (height * (scale - 1)) / 2
        );
        stateRef.current = {
          ...state,
          x: possibleX,
          y: possibleY,
        };
        actionRef.current.style.transform = `translateX(${possibleX}px) translateY(${possibleY}px) scale(${scale})`;
      }
    } else {
      //줌인, 줌아웃시
      currentActionRef.current = "zoom";
      if (touches.length === 2) {
        const xDiff = touches[0].clientX - touches[1].clientX;
        const yDiff = touches[0].clientY - touches[1].clientY;

        // 두 지점 간 거리: (x1 - x2)^2 + (y1 - y2)^2
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        const { x, y, scale, startScale } = stateRef.current;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const possibleX = Math.min(
          Math.max(x, -(width * (scale - 1)) / 2),
          (width * (scale - 1)) / 2
        );
        const possibleY = Math.min(
          Math.max(y, -(height * (scale - 1)) / 2),
          (height * (scale - 1)) / 2
        );
        const changedScale = Math.min(
          Math.max(
            startScale +
              (distance - firstPinchDistance.current) / distanceRatio.current,
            1
          ),
          3
        );
        stateRef.current = {
          ...stateRef.current,
          x: possibleX,
          y: possibleY,
          scale: changedScale,
        };
        actionRef.current.style.transform = `translateX(${possibleX}px) translateY(${possibleY}px) scale(${changedScale})`;
      }
    }
  };

  const handleTouchEnd = () => {
    switch (currentActionRef.current) {
      case "zoom": //pinch zoom
        currentActionRef.current = "";
        setState({
          ...stateRef.current,
        });
        actionRef.current.style.transform = "";
        break;
      case "move": //touch move
        currentActionRef.current = "";
        if (state.scale === 1) {
          setState({
            ...state,
            x: 0,
            y: 0,
            scale: 1,
          });
        } else {
          setState({
            ...stateRef.current,
          });
        }
        actionRef.current.style.transform = "";
        break;
      default: //zoom in, zoom out
        currentActionRef.current = "";
        break;
    }
  };
  const handleZoomToogle = (e) => {
    if (
      lastClick.current &&
      e.timeStamp - lastClick.current < 250 &&
      timeoutRef.current
    ) {
      setAnimation(true);
      lastClick.current = 0;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      if (state.scale === 1) {
        zoomIn(e);
      } else {
        zoomOut();
      }
    } else {
      lastClick.current = e.timeStamp;
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 251);
    }
  };
  // 더블클릭시 Scale 최대로 고정
  const zoomIn = (e) => {
    const target = e.target.classList.value.indexOf('countryFlag') > 0 ? e.target.parentNode.parentNode : e.target;
    // 현재 이미지 사이즈
    const imageWidth = target.offsetWidth;
    const imageHeight = target.offsetHeight;

    // 이미지 내 클릭한 위치
    const clickX = e.clientX - actionRef.current.getBoundingClientRect().left;
    const clickY = e.clientY - actionRef.current.getBoundingClientRect().top;

    // 클릭된 지점을 백분율로 계산해 어느 지점을 기준으로 확대 시킬지 정함
    const zoomPercentX = clickX / imageWidth;
    const zoomPercentY = clickY / imageHeight;

    // 비율에 따른 좌표계산
    const { width, height } = containerRef.current.getBoundingClientRect();
    const zoomPosX =
      (width * (defaultScale.maxScale - 1)) / 2 -
      width * (defaultScale.maxScale - 1) * zoomPercentX;
    const zoomPosY =
      (height * (defaultScale.maxScale - 1)) / 2 -
      height * (defaultScale.maxScale - 1) * zoomPercentY;
    // 값 업데이트
    stateRef.current = {
      ...stateRef.current,
      x: zoomPosX,
      y: zoomPosY,
      scale: defaultScale.maxScale,
    };
    setState({
      ...stateRef.current,
    });
    actionRef.current.style.transform = "";
  };

  const zoomOut = () => {
    stateRef.current = {
      ...stateRef.current,
      x: 0,
      y: 0,
      scale: defaultScale.minScale,
    };
    setState({
      ...stateRef.current,
    });
    actionRef.current.style.transform = "";
  };

  // doubleClick 여부를 IOS에서 감지하기 위해서 커스텀 핸들러 추가
  // 핀치 줌들을 위한 이벤트 핸들러
  useEffect(() => {
    const actionRefCurrent = actionRef?.current;
    if (actionRefCurrent) {
      actionRefCurrent.addEventListener("click", handleZoomToogle);
      actionRefCurrent.addEventListener("touchstart", handleTouchStart);
      actionRefCurrent.addEventListener("touchmove", handleTouchMove);
      actionRefCurrent.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (actionRefCurrent) {
        actionRefCurrent.removeEventListener("click", handleZoomToogle);
        actionRefCurrent.removeEventListener("touchstart", handleTouchStart);
        actionRefCurrent.removeEventListener("touchmove", handleTouchMove);
        actionRefCurrent.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [actionRef, state]);

  return (
    <Container ref={containerRef} {...rest}>
      <ActionContainer maxScale={maxScale} isAnimation={isAnimation} ref={actionRef} state={state}>
        {children}
      </ActionContainer>
    </Container>
  );
};

export default ZoomPinch;
