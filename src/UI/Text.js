import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  color,
  compose,
  flexbox,
  layout,
  position,
  space,
  typography,
} from 'styled-system'

const Text = styled.p`
  ${compose(color, flexbox, layout, position, space, typography)}
`

Text.displayName = 'Text'

Text.defaultProps = {
  as: 'p',
}

Text.propTypes = {
  as: PropTypes.string,
}

export default Text
