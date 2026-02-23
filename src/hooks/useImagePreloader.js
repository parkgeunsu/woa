import { useEffect, useRef } from 'react';

const CONCURRENCY = 3; // 안드로이드 WebView는 2~4 권장 (상황에 맞춰 조정)

const useImagePreloader = (
  urls,
  totalNumRef,
  loadingRef,
  setReady,
  options,
) => {
  const currentNum = useRef(0);
  const inFlight = useRef(0);
  const queue = useRef([]);
  const cancelled = useRef(false);

  const { crossOrigin, timeoutMs = 15000 } = options;

  // 진행률 UI 반영
  const updateProgress = () => {
    if (loadingRef.current) {
      loadingRef.current.innerHTML = `${currentNum.current} / ${totalNumRef.current}`;
    }
  };

  // 한 항목 프리로드(+디코드) - 오류도 "완료"로 집계(진행률 전진)
  const preloadOne = (url) => async () => {
    if (cancelled.current) return;
    try {
      const img = new Image();
      if (crossOrigin) img.crossOrigin = crossOrigin;
      img.decoding = 'async';
      img.loading = 'eager';

      const onErrorPromise = new Promise((_, reject) => {
        img.onerror = () => reject(new Error(`onerror: ${url}`));
      });

      const timeoutPromise = new Promise((_, reject) => {
        const t = setTimeout(() => reject(new Error(`timeout: ${url}`)), timeoutMs);
        // onload/decode 이후에는 자동 취소되므로 별도 clear 불필요(경합상 안전)
      });

      img.src = url;

      // decode 지원하지 않는 구형 환경 대비: decode 없으면 onload로 대체
      const decodePromise = img.decode ? img.decode() : new Promise((resolve) => {
        img.onload = () => resolve();
      });

      await Promise.race([decodePromise, onErrorPromise, timeoutPromise]);
    } catch (e) {
      // 실패는 진행률만 올리고 넘어감(필요 시 여기서 낮은 해상도/포맷 fallback 트리거 가능)
      // console.warn('preload fail:', e);
    } finally {
      currentNum.current += 1;
      updateProgress();
      if (currentNum.current >= totalNumRef.current) {
        setReady(true);
      }
    }
  };

  // 큐 펌프 (세마포어)
  const pump = () => {
    if (cancelled.current) return;
    while (inFlight.current < CONCURRENCY && queue.current.length > 0) {
      const task = queue.current.shift();
      inFlight.current += 1;
      task()
        .catch(() => {}) // 위에서 이미 핸들링, 여기선 무시
        .finally(() => {
          inFlight.current -= 1;
          pump();
        });
    }
  };

  useEffect(() => {
    cancelled.current = false;
    currentNum.current = 0;

    totalNumRef.current = urls.length;
    updateProgress();

    // 작업 큐 쌓기
    queue.current = urls.map((u) => preloadOne(u));
    pump();

    return () => {
      // 언마운트/의존성 변경 시 취소 플래그 설정
      cancelled.current = true;
      queue.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join('|')]); // urls 내용이 바뀌면 다시 실행

  // 필요하다면 외부에서 진행률 참조할 수 있도록 ref 반환
  return {
    getProgress: () => ({ done: currentNum.current, total: totalNumRef.current }),
  };
}

export default useImagePreloader;
