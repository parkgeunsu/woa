import { useCallback, useRef, useState } from "react";

const preventDefault = (event) => {
  if (!("touches" in event)) {
    return;
  }
  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const useLongPress = (
  clickHandler,
  longPressHandler,
) => {
  const [isLongPress, setLongPress] = useState(false);
  const timeoutRef = useRef();
  const intervalRef = useRef();
  const targetRef = useRef();

  const eventStart = useCallback((event) => {
    if (event.target) {
      event.target.addEventListener("touchend", preventDefault);
      targetRef.current = event.target;
    }
    timeoutRef.current = setTimeout(() => {
      setLongPress(true);
      longPressHandler(event);
    }, 500);
  }, [longPressHandler]);

  const eventDestroy = useCallback((event, shouldTriggerClick) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    intervalRef.current && clearInterval(intervalRef.current);
    shouldTriggerClick && !isLongPress && clickHandler(event);
    setLongPress(false);
    if (targetRef.current) {
      targetRef.current.removeEventListener("touchend", preventDefault);
    }
  }, [clickHandler, isLongPress]);

  return {
    onMouseDown: (e) => eventStart(e),
    onTouchStart: (e) => eventStart(e),
    onMouseUp: (e) => eventDestroy(e, true),
    onMouseLeave: (e) => eventDestroy(e, false),
    onTouchEnd: (e) => eventDestroy(e, true)
  };
};

export default useLongPress;