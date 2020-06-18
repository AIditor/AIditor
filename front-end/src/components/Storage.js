import React from 'react';
export const URL = 'https://i02a301.p.ssafy.io/api'
export const Storage = React.createContext({});
export const StorageInit = {
  maxSize: 1280,
  loading: false,

  innerW: window.innerWidth,
  innerH: window.innerHeight,

  imgOrgFile: null,
  imgFileHistory: [],
  imgURL: "",
  img: null,
  imgWidth: 0,
  imgHeight: 0,
  imgHistory: [],

  allSegList: [],
  segLabels: [],
  segList: [],
  segCheckList: [],

  allFaceList: [],
  faceList: [],
  faceCheckList: [],

  tagList: [],
  tagCheckList: [],

  rotateDegree: 0,
  rotateCount: 0,
  rotateMode: "",
  rotating: false,
  tempStageHistory: {
    width: 0,
    height: 0,
    scale: 0,
    ratio: 0,
  },
  tempImgTag: null,
  beforeImg: {
    width: 0,
    height: 0,
  },
  faceLocaList: [],

  stageHistory: [
    {
      width: 0,
      height: 0,
      scale: 0,
      ratio: 0,
    },
  ],
  stageIdx: 0,

  curMode: "",

  historyIdx: 0,

  isFilter: false,
  filterHistory: [
    {
      hue: 0,
      saturation: 0,
      luminance: 0,
      contrast: 0,
      blur: 0,
    },
  ],
};

export const Msg = {
  'crop': '원하는 범위를 잘라냅니다!',
  'rotate': '원하는 방향으로 회전합니다!',
  'filter': '필터를 적용해 보세요!',
  'adjust': '원하는 채널을 조정해보세요!',
  'segment': '원본을 유지할 객체를 선택하세요!',
  'face': '블러 처리할 얼굴을 선택하세요!',
  'tag': '클립보드에 복사할 태그를 선택하세요!',
}