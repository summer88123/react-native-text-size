/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


// useEffect:模拟声明周期
import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
  LayoutChangeEvent,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import rnTextSize from 'react-native-text-size';
import flatHeights from 'react-native-text-size';

import TextSize, {
  // typings
  TSFontInfo,
  TSFontForStyle,
  TSFontSpecs,
  TSFontStyle,
  TSFontVariant,
  TSFontWeight,
  TSMeasureResult,
  TSTextBreakStrategy,
} from 'react-native-text-size';

function App(): React.JSX.Element {

  type Props = { texts: string[] }
  type State = { heights: number[] }

  type Props1 = {}
  type State2 = { width2: number, height2: number }

  const [heights, setHeights] = useState<number[]>([]);

  const [width2, setWidth2] = useState<number>();
  const [height2, setHeight2] = useState<number>();

  const [texts, setTexts] = useState(['I ❤️ rnTextSize', 'I ❤️ rnTextSize using flatHeights', 'Thx for flatHeights', 'test123',])
  const [texts2, setTexts2] = useState('I ❤️ rnTextSize')
  const [res, setRes] = useState<string[]>([])
  const [key, setKey] = useState({})
  const [info, setInfo] = useState<TSFontInfo>()


  const fontSpecs: TSFontSpecs = {
    fontFamily: undefined,
    fontSize: 20,
    fontStyle: 'italic', //正斜
    fontWeight: 'bold',
  }
  const fontSpecs2: TSFontSpecs = {
    fontFamily: 'Android',
    textBreakStrategy: 'balanced',
  }

  const fontSpecs3: TSFontSpecs = {
    fontFamily: undefined,
    fontSize: 20,
    fontStyle: 'normal', //正斜
    fontWeight: '700',
  }

  useEffect(() => {
    const myFun = async () => {
      const resp = await rnTextSize.fontFamilyNames();
      setRes(resp)
      const keyp = await rnTextSize.specsForTextStyles();
      setKey(keyp)
      const infos = await rnTextSize.fontFromSpecs(fontSpecs2);
      setInfo(infos)

      setTexts(texts)
      const width = Dimensions.get('window').width * 0.8
      const newHeights = await rnTextSize.flatHeights({
        text: texts,      // array of texts to measure, can include symbols
        width,            // max-width of the "virtual" container
        ...fontSpecs,     // RN font specification
      })
      setHeights(newHeights);

      setTexts2(texts2)
      const width2 = Dimensions.get('window').width * 0.8
      const newHeight2 = await rnTextSize.measure({
        text: texts2,      // array of texts to measure, can include symbols
        width: width2,            // max-width of the "virtual" container
        ...fontSpecs3,     // RN font specification
      })
      setHeight2(newHeight2.height);
      setWidth2(newHeight2.width)
    }
    myFun()
  }, [])

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <View style={{ paddingLeft: 12, paddingRight: 12 }}>
        <Text>
          ------------------------------
          ---------------
          measure接口:[fontFamily: undefined,fontSize: 20,fontStyle: 'normal', 正斜fontWeight: '700']
        </Text>
        <View>
          <Text style={{
            width: width2,
            height: height2,
            ...fontSpecs3
          }}>
            {texts2}
          </Text>
        </View>
        <Text>
          ----------------
          flatHeights接口:[fontFamily: undefined,fontSize: 20,fontStyle: 'italic', fontWeight: 'bold']
        </Text>
        {texts.map(
          (text, index) => (
            <Text style={{ height: heights[index], ...fontSpecs }}>
              {text}
            </Text>
          )
        )}
        <Text>
          ----------------fontFamilyNames接口:获取系统默认配置的字体
        </Text>
        <Text>
          {res}
        </Text>

        <Text>
          ----------------specsForTextStyles接口:获取系统默认配置的字体的具体信息
        </Text>
        <Text>
          {JSON.stringify(key)}
        </Text>


        <Text>
          ----------------fontFromSpecs:返回从给定规范中获得的字体特征
        </Text>
        <Text>
          {JSON.stringify(info)}
        </Text>
      </View>
    </ScrollView>
  )

}

export default App;
