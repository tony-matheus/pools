import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import {
  border,
  bottom,
  color,
  compose,
  layout,
  left,
  position,
  right,
  shadow,
  space,
  top,
  typography,
  verticalAlign,
  zIndex,
} from 'styled-system'
import { colors } from '../../utils/colors'

const buttonTypes = {
  primary: css`
    background: ${colors.blue.default};
    color: white;
    &:hover,
    &:focus {
      background: ${colors.blue.dark};
      color: white;
    }
  `,
  secondary: css`
    background: white;
    border: 1px solid ${colors.blue.default};
    color: ${colors.blue.default};
    &:hover,
    &:focus {
      background: ${colors.blue.default};
      color: white;
    }
  `,
  negative: css`
    background: ${colors.red.default};
    color: white;
    &:hover,
    &:focus {
      background: ${colors.red.dark};
      color: white;
    }
  `,
}

export const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 4px;
  display: inline-block;
  cursor: ${({ isDisable }) => (isDisable ? 'not-allowed' : 'pointer')};
  opacity: ${({ isDisable }) => (isDisable ? 1 / 2 : 1)};
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  transition: 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:focus {
    outline: none;
  }
  ${({ primary }) => primary && buttonTypes.primary}
  ${({ secondary }) => secondary && buttonTypes.secondary}
  ${({ negative }) => negative && buttonTypes.negative}
  ${compose(
    border,
    bottom,
    color,
    layout,
    left,
    position,
    right,
    shadow,
    space,
    top,
    typography,
    verticalAlign,
    zIndex
  )}
`

Button.displayName = 'Button'

Button.defaultProps = {
  adaptive: false,
  small: false,
  primary: true,
  secondary: false,
  negative: false,
}

Button.propTypes = {
  adaptive: PropTypes.bool,
  small: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  negative: PropTypes.bool,
}

export default Button
