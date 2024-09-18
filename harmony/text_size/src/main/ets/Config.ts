import measure, { MeasureOptions } from '@ohos.measure';
import { text } from "@kit.ArkGraphics2D";

export function config(measureText: MeasureOptions) {
  let textSize = measure.measureTextSize(measureText);
  return textSize;
};

export function measureTextParagraph(measureOptions: MeasureOptions,width: number){
  let myTextStyle: text.TextStyle = {
    fontSize: Number(measureOptions.fontSize),
    fontStyle:text.FontStyle.NORMAL,
    letterSpacing: Number(measureOptions.letterSpacing),
  };
  let myParagraphStyle: text.ParagraphStyle = {
    textStyle: myTextStyle,
    align: text.TextAlign.END,
  };
  let ParagraphGraphBuilder = new text.ParagraphBuilder(myParagraphStyle, new text.FontCollection());
  ParagraphGraphBuilder.addText(`${measureOptions.textContent}`);
  // 文字绘制
  let paragraph = ParagraphGraphBuilder.build();
  paragraph.layoutSync(width);
  // 行数
  let lines = paragraph.getLineCount();
  // 最后一行宽
  let lastLineWidth = paragraph.getLineWidth(lines - 1);
  return {
    lines: lines,
    lastLineWidth: lastLineWidth,
  };
}