import { actionIcon, back, bgEffect, button, eff, etc, images, map, passive, weather } from 'components/ImgSet'; //anchor, cannon, control, figure, sail, wood
//icon100 menu0, element1~2
export const LoadImage = () => {
  //이미지 프리로드
  back.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
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
  actionIcon.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  passive.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  eff.forEach((image) => {
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
  for (let v in map) {
    const img = new Image();
    img.src = map[v];
  };
  for (let v in images) {
    const img = new Image();
    img.src = images[v];
  };
  return {
    back: back,
    etc: etc,
    button: button,
    bgEffect: bgEffect,
    passive: passive,
    eff: eff,
    actionIcon: actionIcon,
    weather: weather,
    // wood: wood,
    // anchor: anchor,
    // sail: sail,
    // cannon: cannon,
    // figure: figure,
    // control: control,
    map: map,
    images: images,
  }
}
