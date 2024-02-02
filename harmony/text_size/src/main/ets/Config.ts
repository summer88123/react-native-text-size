import measure, { MeasureOptions } from '@ohos.measure';

export function config(measureText: MeasureOptions) {
  let textSize = measure.measureTextSize(measureText);
  return textSize;
};