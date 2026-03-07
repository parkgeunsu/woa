
const isBrightRGBA = (rgbaString, bgColor = '#fff', threshold = 0.5) => {
  const fg = parseRgba(rgbaString);
  const bg = parseRgba(normalizeToRgba(bgColor)); // 배경도 rgba로 통일

  // sRGB(비선형)에서 알파 합성
  const comp = compositeRGBAOverRGB(fg, bg);

  // 합성 결과로 상대 휘도 계산
  const Y = relativeLuminanceRGB(comp.r, comp.g, comp.b);

  return Y > threshold;
}

// -------- Helpers --------

// "rgba(r,g,b,a)" 또는 "rgb(r,g,b)" 허용, a 미지정 시 1
const parseRgba = (str) => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a CSS color string');
  }

  // rgba( r , g , b , a )  or  rgb( r , g , b )
  // 공백 구분도 허용: rgba(0 0 0 / 0.5) 형태는 이 간단 파서에선 제외
  const m = str
    .trim()
    .match(/^rgba?\(\s*([0-9]{1,3})\s*[, ]\s*([0-9]{1,3})\s*[, ]\s*([0-9]{1,3})(?:\s*[, ]\s*([0-9.]+))?\s*\)$/i);

  if (m) {
    const r = clamp255(parseInt(m[1], 10));
    const g = clamp255(parseInt(m[2], 10));
    const b = clamp255(parseInt(m[3], 10));
    const a = m[4] !== undefined ? clamp01(parseFloat(m[4])) : 1;
    return { r, g, b, a };
  }

  // #hex, color name 같은 것도 들어올 수 있다면 브라우저 파서를 이용
  // (브라우저 환경에서만 동작)
  if (typeof window !== 'undefined' && document?.createElement) {
    const el = document.createElement('div');
    el.style.color = str;
    document.body.appendChild(el);
    const cs = getComputedStyle(el).color; // "rgb(...)" or "rgba(...)"
    document.body.removeChild(el);
    const m2 = cs.match(/rgba?\(([^)]+)\)/i);
    if (!m2) throw new Error('Failed to parse color: ' + str);
    const parts = m2[1].split(',').map(v => v.trim());
    const r = clamp255(parseInt(parts[0], 10));
    const g = clamp255(parseInt(parts[1], 10));
    const b = clamp255(parseInt(parts[2], 10));
    const a = parts[3] !== undefined ? clamp01(parseFloat(parts[3])) : 1;
    return { r, g, b, a };
  }

  throw new Error('Unsupported color format: ' + str);
}

const normalizeToRgba = (cssColor) => {
  // 간단: 이미 rgba(...)면 그대로, rgb(...)면 a=1로 변환
  const m = cssColor.trim().match(/^rgba?\((.+)\)$/i);
  if (m) {
    const parts = m[1].split(',').map(v => v.trim());
    if (parts.length === 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 1)`;
    }
    return cssColor; // 이미 rgba
  }
  // hex나 이름이면 브라우저 파서 경유
  if (typeof window !== 'undefined' && document?.createElement) {
    const el = document.createElement('div');
    el.style.color = cssColor;
    document.body.appendChild(el);
    const cs = getComputedStyle(el).color; // rgb(...)
    document.body.removeChild(el);
    return cs.replace(/^rgb\(/i, 'rgba(').replace(/\)$/, ', 1)');
  }
  // 환경 제약 시 기본 흰색
  return 'rgba(255,255,255,1)';
}

const compositeRGBAOverRGB = (fg, bg) => {
  // 둘 다 sRGB 0~255 가정, bg.a는 1로 가정(불투명 배경)
  const a = fg.a;
  const outR = Math.round(fg.r * a + bg.r * (1 - a));
  const outG = Math.round(fg.g * a + bg.g * (1 - a));
  const outB = Math.round(fg.b * a + bg.b * (1 - a));
  return { r: outR, g: outG, b: outB, a: 1 };
}

const relativeLuminanceRGB = (r, g, b) => {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B; // 0~1
}

const srgbToLinear = (c) => {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

const clamp255 = (n) => Math.max(0, Math.min(255, n));
function clamp01(n)  { return Math.max(0, Math.min(1, n)); }
const useBrightColor = (rgbaString, bgColor = '#fff', threshold = 0.5) => {
  const fg = parseRgba(rgbaString);
  const bg = parseRgba(normalizeToRgba(bgColor)); // 배경도 rgba로 통일

  // sRGB(비선형)에서 알파 합성
  const comp = compositeRGBAOverRGB(fg, bg);

  // 합성 결과로 상대 휘도 계산
  const Y = relativeLuminanceRGB(comp.r, comp.g, comp.b);

  return Y > threshold;
}

export default useBrightColor;