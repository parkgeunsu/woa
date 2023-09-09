import { actionIcon, anchor, animalType, back, bgEffect, button, cannon, chImg, control, eff, element, etc, figure, icon, iconStar, iconState, itemEtc, itemHole, itemMaterial, itemUpgrade, job, land, map, menu, passive, ringImg, sail, sringImg, ssringImg, weather, wood } from 'components/ImgSet';

export const LoadImage = () => {
  //이미지 프리로드
  back.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  for (let v in icon) {
    const img = new Image();
    img.src = icon[v];
  }
  for (let v in button) {
    const img = new Image();
    img.src = button[v];
  }
  for (let v in etc) {
    const img = new Image();
    img.src = etc[v];
  }
  animalType.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  element.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  for (let v in chImg) {
    const img = new Image();
    img.src = chImg[v];
  }
  iconState.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  itemEtc.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  itemHole.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  itemMaterial.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  itemUpgrade.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  ringImg.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  sringImg.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  ssringImg.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  land.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
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
  job.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  wood.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  anchor.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  cannon.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  sail.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  figure.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
  for (let v in control) {
    const img = new Image();
    img.src = etc[v];
  };
  for (let v in map) {
    const img = new Image();
    img.src = map[v];
  };
  return {
    back: back,
    menu: menu,
    etc: etc,
    icon: icon,
    button: button,
    iconStar: iconStar,
    chImg: chImg,
    ringImg: ringImg,
    sringImg: sringImg,
    ssringImg: ssringImg,
    animalType: animalType,
    element: element,
    iconState: iconState,
    itemEtc: itemEtc,
    itemHole: itemHole,
    itemUpgrade: itemUpgrade,
    itemMaterial: itemMaterial,
    land: land,
    bgEffect: bgEffect,
    passive: passive,
    eff: eff,
    actionIcon: actionIcon,
    weather: weather,
    job: job,
    wood: wood,
    anchor: anchor,
    sail: sail,
    cannon: cannon,
    figure: figure,
    control: control,
    map: map,
    transparent: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
  }
}
