import { back, bgEffect, button, effect, etc, images, weather } from 'components/ImgSet'; //anchor, cannon, control, figure, sail, wood
//icon100 menu0, element1~2
import { FlexBox } from 'components/Container';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Loading = styled(FlexBox)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  color: #fff;
`;
const LoadingPercent = styled.div`

`;
const App = React.lazy(() => import('./App'));
const LazyData = () => {
  //image
  const currentNum = useRef(0);
  const loadingRef = useRef(null);
  const [isReady, setReady] = useState(false);
  const totalNum = Object.keys(effect).length + Object.keys(images).length;
  useEffect(() => {
    currentNum.current = 0;
    return () => {
      currentNum.current = 0;
    }
  }, []);
  useEffect(() => {
    for (let v in back) {
      const img = new Image();
      img.src = back[v];
    }
    for (let v in button) {
      const img = new Image();
      img.src = button[v];
    }
    for (let v in etc) {
      const img = new Image();
      img.src = etc[v];
    }
    bgEffect.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    weather.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    // wood.forEach((image) => {
    //   const img = new Image();
    //   img.src = image;
    // });
    // anchor.forEach((image) => {
    //   const img = new Image();
    //   img.src = image;
    // });
    // cannon.forEach((image) => {
    //   const img = new Image();
    //   img.src = image;
    // });
    // sail.forEach((image) => {
    //   const img = new Image();
    //   img.src = image;
    // });
    // figure.forEach((image) => {
    //   const img = new Image();
    //   img.src = image;
    // });
    // for (let v in control) {
    //   const img = new Image();
    //   img.src = control[v];
    // };
    for (let v in images) {
      const img = new Image();
      img.src = images[v];
      img.onload = () => {
        currentNum.current += 1;
        if (loadingRef.current) {
          loadingRef.current.innerHTML = `${currentNum.current} / ${totalNum}`;
        }
        if (currentNum.current >= totalNum) {
          setReady(true);
        }
      }
    };
    for (let v in effect) {
      const img = new Image();
      img.src = effect[v].img;
      img.onload = () => {
        currentNum.current += 1;
        if (loadingRef.current) {
          loadingRef.current.innerHTML = `${currentNum.current} / ${totalNum}`;
        }
        if (currentNum.current >= totalNum) {
          setReady(true);
        }
      }
    };
  }, [back, bgEffect, button, effect, etc, images, weather]);
  return (
    <Suspense>
      {isReady ? <App loadData={{
        back: back,
        etc: etc,
        button: button,
        bgEffect: bgEffect,
        weather: weather,
        // wood: wood,
        // anchor: anchor,
        // sail: sail,
        // cannon: cannon,
        // figure: figure,
        // control: control,
        images: images,
        effect: effect,
      }} /> : <Loading>Loading...<LoadingPercent ref={loadingRef}></LoadingPercent></Loading>}
    </Suspense>
  )
}

export default LazyData;
