import Konva from "konva";

export const updateBlur = (stageRef, layerRef, value) => {
  // const stage = stageRef.getStage()
  // const rect = stage.find('#face-blur')
  const layer = layerRef.getLayer()
  const rect = layer.find('#face-blur')
  // console.log(rect)
  rect.map((_rect, i) => {
    _rect.cache()
    _rect.filters([Konva.Filters.Blur, Konva.Filters.HSL, Konva.Filters.Contrast])
    _rect.blurRadius(50);
    _rect.hue(value.hue);
    _rect.saturation(value.saturation);
    _rect.luminance(value.luminance);
    _rect.contrast(value.contrast);
    layer.batchDraw()
  })
}