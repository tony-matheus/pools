/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components'
import { border, boxShadow, compose, space } from 'styled-system'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import Box from './Box'
import Text from './Text'
import { colors } from '../utils/colors'

export const StyledInput = styled.input`
  background: white;
  color: #333;
  border: none;
  border-radius: 4px;
  display: block;
  font-size: 16px;
  filter: none;
  font-family: inherit;
  line-height: 1.4;
  box-sizing: border-box;
  -webkit-appearance: none;
  width: 100%;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'initial')};
  box-shadow: ${(props) =>
    props.error
      ? `0 0 0 2px ${colors.red.default}`
      : `0 0 0 2px ${colors.grey.default}`};
  &:focus {
    box-shadow: 0 0 0 2px ${colors.blue.default};
    outline: none;
  }
  transition: box-shadow 0.125s linear;
  ${compose(border, boxShadow, space)}
`

export const Input = forwardRef(
  ({ isDisabled, type, label, ...props }, ref) => (
    <Box as='label' display='block' position='relative'>
      {label && (
        <Text
          as='span'
          fontWeight='600'
          fontSize='12px'
          position='absolute'
          top='4px'
          zIndex={1}
          left={2}
        >
          {label}
        </Text>
      )}
      <StyledInput
        isDisabled={isDisabled}
        type={type || 'text'}
        pt={label ? '24px' : 2}
        pb={2}
        px={2}
        ref={ref}
        {...props}
      />
    </Box>
  )
)

Input.displayName = 'Input'

Input.defaultProps = {
  isDisabled: false,
  error: false,
  type: 'text',
  label: '',
}

Input.propTypes = {
  isDisabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.node,
  ]),
  type: PropTypes.oneOf(['date', 'email', 'text', 'password']),
  label: PropTypes.string,
}
