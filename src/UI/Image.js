import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  border,
  compose,
  flexbox,
  layout,
  opacity,
  overflow,
  position,
  space,
} from 'styled-system'

const Image = styled('img')(
  compose(border, flexbox, layout, opacity, overflow, position, space)
)

Image.displayName = 'Image'

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default Image
