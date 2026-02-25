import { Text, TextProps } from "react-native";

export function FittedText({ style, ...props }: TextProps) {
  return (
    <Text
      style={style}
      {...props}
      allowFontScaling={false}
      adjustsFontSizeToFit={true}
    />
  );
}
