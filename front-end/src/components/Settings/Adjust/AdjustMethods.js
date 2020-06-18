import Konva from 'konva'

export const InitDispAdjust = (_layer, _idx) => {
	const layer = _layer;
	const img = layer.find(`#${_idx}`)[0];
	img.cache();
	img.filters([Konva.Filters.Blur, Konva.Filters.HSL, Konva.Filters.Contrast]);
	img.hue(0);
	img.saturation(0);
	img.luminance(0);
	img.contrast(0);
	img.blurRadius(0);
	layer.batchDraw()
}

export const updateAdjust = (_layer, _idx, _val) => {
	const layer = _layer
	const img = layer.find(`#${_idx}`)[0]
	img.cache();
	img.filters([
	Konva.Filters.Blur, Konva.Filters.HSL, Konva.Filters.Contrast]);
	img.hue(_val.hue);
	img.saturation(_val.saturation);
	img.luminance(_val.luminance);
	img.blurRadius(_val.blur);
	img.contrast(_val.contrast);
	layer.batchDraw();
}