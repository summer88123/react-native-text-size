import measure, { MeasureOptions } from '@ohos.measure';
import display from '@ohos.display';
import { text } from "@kit.ArkGraphics2D";

export function config(measureText: MeasureOptions) {
  let textSize = measure.measureTextSize(measureText);
  return textSize;
};

function getWidth(width: number | undefined | null) {
  let densityWidth: number = 0;
  if (width) {
    densityWidth = width;
  } else {
    densityWidth = Math.floor(display.getDefaultDisplaySync().width / display.getDefaultDisplaySync().densityPixels);
  }
  return densityWidth;
}

export function measureTextParagraph(measureOptions: MeasureOptions, width: number) {
  let myTextStyle: text.TextStyle = {
    fontSize: Number(measureOptions.fontSize),
    fontStyle: text.FontStyle.NORMAL,
    letterSpacing: Number(measureOptions.letterSpacing) || 0,
  };
  let myParagraphStyle: text.ParagraphStyle = {
    textStyle: myTextStyle,
  };
  let ParagraphGraphBuilder = new text.ParagraphBuilder(myParagraphStyle, new text.FontCollection());
  ParagraphGraphBuilder.addText(`${measureOptions.textContent}`);
  // 文字绘制
  let paragraph = ParagraphGraphBuilder.build();
  paragraph.layoutSync(getWidth(width));
  // 行数
  let lines = paragraph.getLineCount();
  // 最后一行宽
  let lastLineWidth = paragraph.getLineWidth(lines - 1);
  return {
    lines: lines,
    lastLineWidth: lastLineWidth,
  };
}