import { createUseStyles } from '@/hooks'
import { ResizeLit } from './types'
import { BorderStyle, TokenReturnType, useBorder, useBoxShadow, useFont, useSpacing, useToken } from '@/theme'

interface TextAreaProps {
  value?: boolean;
  isDisable?: boolean;
  error?: boolean;
  resize?: ResizeLit,
  cols?: boolean,
}

export const useTextAreaStyles = (props: TextAreaProps) => {

  const getBorderColor = () => {
    switch (true) {
      case props.error:
        return "input/color/stroke/error"
      case props.value && props.isDisable:
        return "input/color/stroke/blocked"
      case props.value:
        return "input/color/stroke/filled"
      case props.isDisable:
        return "input/color/stroke/disabled"
      default:
        return "input/color/stroke/default"
    }
  }

  const getBackgroundColor = () => {
    switch (true) {
      case props.value && props.isDisable:
        return "input/color/fill/blocked"
      case props.value:
        return "input/color/fill/filled"
      case props.isDisable:
        return "input/color/fill/disabled"
      default:
        return "input/color/fill/default"
    }
  }

  return createUseStyles({
    root: {
      resize: props.resize,
      '&::-webkit-resizer': {
        backgroundImage: `
          linear-gradient(
            135deg,
            transparent 0 50%,
            ${useToken('input/color/resizer/resizer')} 50% 60%,
            transparent 60% 75%,
            ${useToken('input/color/resizer/resizer')} 75% 85%,
            transparent 85% 100%
          )
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '8px 8px',
        backgroundPosition: 'calc(100% - 1px) calc(100% - 1px)',
      },
      minHeight: '72px',
      maxHeight: '400px',
      width: props.cols ? 'auto' : '100%',
      outline: 'none',
      borderRadius: useToken("input/corners/name5"),
      border: useBorder({
        width: useToken("input/stroke/name1"),
        style: BorderStyle.SOLID,
        color: getBorderColor(),
      }),
      padding: useSpacing({
        right: 'input/gap/name8',
        left: 'input/gap/name8',
        top: 11,
        bottom: 11,
      }),
      font: useFont({
        size: 'typography/paragraph/p4/font_size',
        weight: 'typography/paragraph/p4/font_weight',
        family: 'typography/font_family',
      }),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      background: useToken(getBackgroundColor()),
      lineHeight: useToken('typography/paragraph/p4/line_height', TokenReturnType.PX),
      letterSpacing: useToken('typography/paragraph/p4/letter_spacing', TokenReturnType.PX),
      color: useToken(props.value && props.isDisable ? "input/color/text/placeholder/blocked" : "input/color/text/placeholder/filled"),
      transitionProperty: "color, background, border-color, box-shadow",
      transitionDuration: "0.3s",
      "&::placeholder": {
        color: useToken(props.isDisable ? "input/color/text/placeholder/disabled" : "input/color/text/placeholder/default"),
        opacity: 1
      },
      ...(props.isDisable ? {} : {
        "&:hover": {
          backgroundColor: useToken("input/color/fill/hovered"),
          borderColor: !props.error && useToken("input/color/stroke/hovered"),
        }
      }),
      "&:focus, &:focus-within": {
        backgroundColor: useToken("input/color/fill/focused"),
        borderColor: !props.error && useToken("input/color/stroke/focused"),
        boxShadow: props.error ?
          useBoxShadow([{
            x: "shadow/number/position/name0",
            y: "shadow/number/position/name0",
            blur: "shadow/number/blur/name0",
            spread: "shadow/number/spread/name4",
            color: "shadow/color/red_20",
          }, {
            x: "shadow/number/position/name0",
            y: "shadow/number/position/name1",
            blur: "shadow/number/blur/name2",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/gray",
          }])
          :
          useBoxShadow([{
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name0",
          blur: "shadow/number/blur/name0",
          spread: "shadow/number/spread/name4",
          color: "shadow/color/blue_30_2",
        }, {
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }]),
      }
    }
  })
}