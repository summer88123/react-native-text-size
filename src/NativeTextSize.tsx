import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
import { TurboModuleRegistry } from "react-native";

 interface Spec extends TurboModule {
    measure(options: TSMeasureParams): Promise<TSMeasureResult>
    flatHeights(options: TSHeightsParams): Promise<number[]>
    specsForTextStyles(): Promise<{ [key: string]: TSFontForStyle }>
    fontFromSpecs(specs: TSFontSpecs): Promise<TSFontInfo>
    fontFamilyNames(): Promise<string[]>
    fontNamesForFamilyName(fontFamily: string): Promise<string[]>
}

export type TSFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type TSFontStyle = 'normal' | 'italic'
export type TSFontVariant = 'small-caps' | 'oldstyle-nums' | 'lining-nums' | 'tabular-nums' | 'proportional-nums'
export type TSTextBreakStrategy = 'simple' | 'highQuality' | 'balanced'

export type TSFontSize = {
 readonly default: number,
 readonly button: number,
 readonly label: number,
 readonly smallSystem: number,
 readonly system: number,
}

export type TSMDStyleSpec =
| 'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
| 'subtitle1'
| 'subtitle2'
| 'body1'
| 'body2'
| 'button'
| 'caption'
| 'overline'

export type TSTextStyle =
| 'body'
| 'callout'
| 'caption1'
| 'caption2'
| 'footnote'
| 'headline'
| 'subheadline'
| 'largeTitle'
| 'title1'
| 'title2'
| 'title3'

export type TSFontInfo = {
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

export interface TSFontSpecs {
 fontFamily?: string;
 fontSize?: number;
 fontStyle?: TSFontStyle;
 fontWeight?: TSFontWeight;
 fontVariant?: Array<TSFontVariant>;
 letterSpacing?: number;
 includeFontPadding?: boolean;
 textBreakStrategy?: TSTextBreakStrategy;
}

export type TSFontForStyle = {
 fontFamily: string,
 fontSize: number,
 fontStyle?: TSFontStyle,
 fontWeight?: TSFontWeight,
 fontVariant?: Array<TSFontVariant> | null,
 letterSpacing?: number,
}

export interface TSHeightsParams extends TSFontSpecs {
 text: Array<string | null>;
 width?: number;
 allowFontScaling?: boolean;
}
export interface TSMeasureParams extends TSFontSpecs {
 text: string;
 width?: number;
 allowFontScaling?: boolean;
 usePreciseWidth?: boolean;
 lineInfoForLine?: number;
}

export type TSMeasureResult = {
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

export default TurboModuleRegistry.get<Spec>("RTNTextSize") as Spec;