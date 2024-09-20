/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { TurboModule } from "@rnoh/react-native-openharmony/ts";
import font from '@ohos.font'
import measure, { MeasureOptions } from '@ohos.measure'
import { config, measureTextParagraph } from './Config';
import display from '@ohos.display';

export class RNTextSizeTurboModule extends TurboModule {
  measure(options: TSMeasureParams): Promise<TSMeasureResult> {
    return new Promise<TSMeasureResult>((resolve, reject) => {
      try {
        let lineCount = options.lineInfoForLine || 0;
        let measureText: MeasureOptions = {
          textContent: options.text,
          fontFamily: options.fontFamily,
          fontSize: options.fontSize,
          fontWeight: options.fontWeight,
          letterSpacing: options.letterSpacing,
        }
        let textSize = config(measureText);
        let width: number = textSize.width as number;
        let height: number = textSize.height as number;
        let measureResult = measureTextParagraph(measureText, options.width);

        let result: TSMeasureResult = {
          width: width,
          height: height,
          lineCount: measureResult.lines,
        }
        if (options.usePreciseWidth) {
          result.lastLineWidth = measureResult.lastLineWidth;
        }
        resolve(result);
      } catch (e) {
        reject('measure error');
      }
    })
  };

  flatHeights(options: TSHeightsParams): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      try {
        const text = options.text;
        let width = options.width;
        let fontHeight: number[];
        fontHeight = text.reduce<number[]>((prev, value) => {
          let measureText: MeasureOptions = {
            textContent: value,
            fontFamily: options.fontFamily,
            fontSize: options.fontSize,
            fontWeight: options.fontWeight,
            letterSpacing: options.letterSpacing,
          }
          let textSize = config(measureText);
          let height: number = textSize.height as number;
          prev.push(height);
          return prev;
        }, [])
        resolve(fontHeight);
      } catch (e) {
        reject('flatHeights error')
      }
    })
  };

  specsForTextStyles(): Promise<{ [key: string]: TSFontForStyle }> {
    const promise = new Promise<{ [key: string]: TSFontForStyle }>(async (resolve, reject) => {
      try {
        let obj: { [key: string]: TSFontForStyle } = {
          largeTitle: this.makeFontSpecs("-light", 34, 0.374),
          title1: this.makeFontSpecs("-light", 28, 0.364),
          title2: this.makeFontSpecs('null', 22, 0.352),
          title3: this.makeFontSpecs('null', 20, 0.38),
          headline: this.makeFontSpecs('null', 17, -0.408),
          body: this.makeFontSpecs("-medium", 17, -0.408),
          callout: this.makeFontSpecs('null', 16, -0.32),
          subhead: this.makeFontSpecs("-medium", 15, -0.24),
          footnote: this.makeFontSpecs('null', 13, -0.78),
          caption1: this.makeFontSpecs('null', 12, 0.0),
          caption2: this.makeFontSpecs("-medium", 11, 0.066),
        }
        resolve(obj)
      } catch (error) {
        reject('specsForTextStyles error')
      }
    })
    return promise;
  };

  makeFontSpecs(fontFamily: string, fontSize: number, letterSpacing: number) {
    let fontProperties: TSFontForStyle = {
      fontFamily,
      fontSize,
      letterSpacing,
    }
    if (fontFamily == 'null') {
      fontProperties.fontFamily = 'HarmonyOS Sans SC';
    } else {
      fontProperties.fontFamily = 'HarmonyOS Sans SC' + fontFamily;
    }
    fontProperties.fontSize = fontSize;
    fontProperties.letterSpacing = letterSpacing;
    return fontProperties;
  };

  fontFromSpecs(specs: TSFontSpecs): Promise<TSFontInfo> {
    const promise = new Promise<TSFontInfo>((resolve) => {
      let displayClass = display.getDefaultDisplaySync().densityPixels;
      let fontFamily = specs.fontFamily;
      let fontWeight = specs.fontWeight;
      if (fontWeight !== 'bold') {
        fontWeight = 'normal';
      }
      let fontSize = specs.fontSize;
      if (fontSize) {
        fontSize = fontSize / displayClass;
      } else {
        fontSize = 14.153;
      }
      let fontStyle = specs.fontStyle;
      if (fontStyle !== 'italic') {
        fontStyle = 'normal';
      }
      let lineHeight = 56 / displayClass;
      let ascender = 42 / displayClass;
      let descender = 12 / displayClass;
      let bottom = 0;
      let leading = 0;
      let _hash = Number(Math.random().toString(36).substring(7));
      let res: TSFontInfo = {
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontStyle: fontStyle,
        ascender: ascender,
        descender: descender,
        bottom: bottom,
        leading: leading,
        lineHeight: lineHeight,
        _hash: _hash,
      }
      resolve(res);
    })
    return promise;
  };

  fontFamilyNames(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      try {
        let fontConfig = font.getUIFontConfig();
        let res: string[] = [];
        for (let i = 0; i < fontConfig.fallbackGroups.length; i++) {
          for (let j = 0; j < fontConfig.fallbackGroups[i].fallback.length; j++) {
            res.push(fontConfig.fallbackGroups[i].fallback[j].family)
          }
        }
        resolve(res)
      } catch (e) {
        reject('fontFamilyNames Error');
      }
    })
  };

  fontNamesForFamilyName(fontFamily: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      try {
        let res = JSON.stringify(font.getFontByName(fontFamily));
        const fontRes = res.slice(1, -1).split(',');
        resolve(fontRes);
      } catch (e) {
        reject('fontNamesForFamilyName Error');
      }
    })
  };
}

interface TSMeasureParams extends TSFontSpecs {
  text: string;
  width?: number;
  allowFontScaling?: boolean;
  usePreciseWidth?: boolean;
  lineInfoForLine?: number;
}

interface TSFontSpecs {
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: TSFontStyle;
  fontWeight?: TSFontWeight;
  fontVariant?: Array<TSFontVariant>;
  letterSpacing?: number;
  includeFontPadding?: boolean;
  textBreakStrategy?: TSTextBreakStrategy;
}

type TSFontStyle = 'normal' | 'italic'
type TSFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
type TSFontVariant = 'small-caps' | 'oldstyle-nums' | 'lining-nums' | 'tabular-nums' | 'proportional-nums'
type TSTextBreakStrategy = 'simple' | 'highQuality' | 'balanced'

type TSMeasureResult = {
  width: number;
  height: number;
  lastLineWidth?: number;
  lineCount: number;
  lineInfo?: {
    line: number;
    start: number;
    end: number;
    bottom: number;
    width: number;
  };
}

interface TSHeightsParams extends TSFontSpecs {
  text: Array<string | null>;
  width?: number;
  allowFontScaling?: boolean;
}

type TSFontForStyle = {
  fontFamily: string,
  fontSize: number,
  fontStyle?: TSFontStyle,
  fontWeight?: TSFontWeight,
  fontVariant?: Array<TSFontVariant> | null,
  letterSpacing?: number,
}

type TSFontInfo = {
  fontFamily: string | null,
  fontName?: string | null,
  fontWeight: TSFontWeight,
  fontSize: number,
  fontStyle: TSFontStyle,
  fontVariant?: TSFontVariant | null,
  ascender: number,
  descender: number,
  capHeight?: number,
  xHeight?: number,
  top?: number,
  bottom?: number,
  leading: number,
  lineHeight: number,
  _hash: number,
}