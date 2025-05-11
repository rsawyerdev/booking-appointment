import { Pressable, Text } from 'react-native';

export function Button(props: any) {
  const {
    title,
    onButtonPress,
    textColor,
    backgroundColor,
  }: {
    title: string;
    onButtonPress: () => void;
    textColor: string;
    backgroundColor: string;
  } = props;
  return (
    <Pressable
      onPress={onButtonPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text style={{ color: textColor, padding: 12, fontFamily: 'regular' }}>
        {title}
      </Text>
    </Pressable>
  );
}
