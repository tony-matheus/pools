import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Box, Button, Text } from '../UI'
import { colors } from '../utils/colors'

export const Question = ({ title, optionOne, optionTwo, id, avatarUrl }) => {
  return (
    <Box borderRadius='5px' border={`2px solid ${colors.blue.light}`}>
      <Box
        py={1}
        px={2}
        borderBottom={`2px solid ${colors.blue.light}`}
        bg={colors.blue.light}
      >
        <Text>{title}</Text>
      </Box>
      <Box p={1} display='flex' justifyContent='space-between'>
        <Box
          width={1 / 3}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            borderRadius='100%'
            border={`2px solid ${colors.blue.light}`}
            width={100}
            height={100}
          />
        </Box>
        <Box width={2 / 3} px={2}>
          <Text fontSize={16} fontWeight='bold'>
            Would you rather
          </Text>
          <Text>{optionOne}</Text>
          <Text>or</Text>
          <Text>{optionTwo}</Text>
          <Link to={`/questions/${id}`} style={{ textDecoration: 'none' }}>
            <Box
              width='100%'
              textAlign='center'
              borderRadius='5px'
              border={`2px solid ${colors.blue.light}`}
              py={2}
            >
              <Text as='span' color={colors.blue.dark}>
                View Pool
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

Question.propTypes = {
  title: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
}
