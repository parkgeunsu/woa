import { back, bgEffect, button, effect, etc, images, weather } from 'components/ImgSet'; //anchor, cannon, control, figure, sail, wood
//icon100 menu0, element1~2
import { FlexBox } from 'components/Container';
import useImagePreloader from 'hooks/useImagePreloader';
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
  const totalNum = useRef(Object.keys(effect).length + Object.keys(images).length);

  
  // 1) 모든 이미지 URL 평탄화 + 중복 제거
  const allUrls = React.useMemo(() => {
    const urls = [];

    // 객체들은 values만 추출
    urls.push(...Object.values(back ?? {}));
    urls.push(...Object.values(button ?? {}));
    urls.push(...Object.values(etc ?? {}));
    // 배열은 그대로 push
    urls.push(...(bgEffect ?? []));
    urls.push(...(weather ?? []));
    // urls.push(...(wood ?? []));
    // urls.push(...(anchor ?? []));
    // urls.push(...(cannon ?? []));
    // urls.push(...(sail ?? []));
    // urls.push(...(figure ?? []));
    urls.push(...Object.values(images ?? {}));
    // effect는 객체 배열로 보이므로 .img만
    urls.push(...(Array.isArray(effect) ? effect.map(e => e?.img).filter(Boolean) : []));

    // 문자열만, 빈값 제거, 중복 제거
    const uniq = Array.from(new Set(urls.filter((u) => typeof u === 'string' && u.length > 0)));

    return uniq;
  }, [back, bgEffect, button, effect, etc, images, weather]);

  // 2) 프리로드 훅 호출 (필요 시 crossOrigin 지정)
  useEffect(() => {
    // 화면 진입 시 카운터 초기화
    currentNum.current = 0;
    totalNum.current = 0;
    setReady(false);
    return () => {
      // 화면 이탈 시 초기화
      currentNum.current = 0;
      totalNum.current = 0;
    };
  }, []);

  useImagePreloader(
    allUrls,
    totalNum,
    loadingRef,
    setReady,
    {
      crossOrigin: undefined, // 필요하면 'anonymous'
      timeoutMs: 15000,
    }
  );

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
