import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import { layout, color, compose, border, boxShadow, space } from 'styled-system'

const StyledSelect = styled.select`
  background: white;
  color: #333;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 16px;
  filter: none;
  font-family: inherit;
  line-height: 1.4;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${compose(color, layout, border, boxShadow, space)}
`

export const Select = ({ options, onChange, value, name, ...restProps }) => {
  const [selectedValue, setSelectedValue] = useState(value)

  const handleChange = (e) => {
    const selectedOption = e.target.value
    setSelectedValue(selectedOption)
    onChange(selectedOption, e)
  }
  return (
    <StyledSelect
      onChange={handleChange}
      p={2}
      name={name}
      value={selectedValue}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </StyledSelect>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
