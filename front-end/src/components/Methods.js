export const imgUrlToTag = (_imgURL) => {
  const _img = new window.Image()
  _img.src = _imgURL
  return _img
}

export const calcStage = (imgW, imgH) => {
  const canvW = document.querySelector('#canvas-container').offsetWidth
  const canvH = document.querySelector('#canvas-container').offsetHeight

  if (imgW >= imgH) {
    const scale = canvW / imgW
    const ratio = imgW / canvW
    return {
      width: canvW,
      height: scale * imgH,
      scale: scale,
      ratio: ratio
    }
  }
  else {
    const scale = canvH / imgH
    const ratio = imgH / canvH
    return {
      width: scale * imgW,
      height: canvH,
      scale: scale,
      ratio: ratio
    }
  }
}

export const calcSegView = (_viewW, _viewH) => {
  const tempH = document.querySelector('#drawer-container').offsetHeight

  let _width, _height
  if (_viewW > _viewH) {
    _width = tempH / 2.5
    _height = (_viewH * tempH) / (2.5 * _viewW)
  }
  else {
    _width = (_viewW * tempH) / (2.5 * _viewH)
    _height = tempH / 2.5
  }

  return {
    width: _width,
    height: _height,

    style: {
      width: `${tempH / 2.5}px`,
      height: `${tempH / 2.5}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'gray'
    },
  }
}

export const calcFaceView = () => {
  const tempH = document.querySelector('#drawer-container').offsetHeight
  return {
    style: {
      width: `${tempH / 4}px`,
      height: `${tempH / 4}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
}

export const resize = (img, width, height, maxSize) => {
  const canvas = document.createElement('canvas');
  if (width > height) {
    if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
    }

  } else {
    if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
    }
  }
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(img, 0, 0, width, height);
  // console.log(canvas.toDataURL())
  return canvas.toDataURL()
}

export const dataURLtoFile = (dataurl, fileName) => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], fileName, {type:mime});
}