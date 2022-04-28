import color from 'color';
import type { Theme } from '../../types';
import { black, white } from '../../styles/themes/v2/colors';
import type { ColorValue } from 'react-native';

export const getChipColors = ({
  isOutlined,
  theme,
  selectedColor,
  showSelectedOverlay,
  customBackgroundColor,
  disabled,
}: {
  isOutlined: boolean;
  theme: Theme;
  selectedColor?: string;
  showSelectedOverlay?: boolean;
  customBackgroundColor?: ColorValue;
  disabled?: boolean;
}) => {
  let borderColor;
  let textColor;
  let iconColor;
  let underlayColor;
  let backgroundColor;
  let defaultBackgroundColor;
  let selectedBackgroundColor;

  const { isV3, dark } = theme;
  const isSelectedColor = selectedColor !== undefined;

  if (isV3) {
    defaultBackgroundColor = isOutlined
      ? theme.colors.surface
      : theme.colors.secondaryContainer;
  } else {
    defaultBackgroundColor = isOutlined
      ? theme.colors?.surface
      : dark
      ? '#383838'
      : '#ebebeb';
  }

  backgroundColor =
    typeof customBackgroundColor === 'string'
      ? customBackgroundColor
      : defaultBackgroundColor;

  if (isV3) {
    if (disabled) {
      const customDisabledColor = color(theme.colors.onSurfaceVariant)
        .alpha(0.12)
        .rgb()
        .string();
      borderColor = customDisabledColor;
      textColor = iconColor = theme.colors.onSurfaceDisabled;
      backgroundColor = isOutlined ? 'transparent' : customDisabledColor;
    } else {
      borderColor = isSelectedColor
        ? color(selectedColor).alpha(0.29).rgb().string()
        : theme.colors.outline;
      textColor = iconColor = isSelectedColor
        ? selectedColor
        : isOutlined
        ? theme.colors.onSurfaceVariant
        : theme.colors.onSecondaryContainer;
      underlayColor = color(isSelectedColor ? selectedColor : textColor)
        .alpha(0.12)
        .rgb()
        .string();
      selectedBackgroundColor = color(backgroundColor)
        .mix(
          color(
            isOutlined
              ? theme.colors.onSurfaceVariant
              : theme.colors.onSecondaryContainer
          ),
          showSelectedOverlay ? 0.12 : 0
        )
        .rgb()
        .string();
    }
  } else {
    selectedBackgroundColor = (
      dark
        ? color(backgroundColor).lighten(isOutlined ? 0.2 : 0.4)
        : color(backgroundColor).darken(isOutlined ? 0.08 : 0.2)
    )
      .rgb()
      .string();
    borderColor = isOutlined
      ? color(isSelectedColor ? selectedColor : color(dark ? white : black))
          .alpha(0.29)
          .rgb()
          .string()
      : backgroundColor;
    if (disabled) {
      textColor = theme.colors.disabled;
      iconColor = theme.colors.disabled;
    } else {
      const customTextColor = isSelectedColor
        ? selectedColor
        : theme.colors.text;
      textColor = color(customTextColor).alpha(0.87).rgb().string();
      iconColor = color(customTextColor).alpha(0.54).rgb().string();
      underlayColor = selectedColor
        ? color(selectedColor).fade(0.5).rgb().string()
        : selectedBackgroundColor;
    }
  }

  return {
    borderColor,
    textColor,
    iconColor,
    underlayColor,
    backgroundColor,
    selectedBackgroundColor,
  };
};
