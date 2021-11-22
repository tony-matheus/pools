import PropTypes from 'prop-types'
import { Box, Text } from '../../UI'
import { colors } from '../../utils/colors'

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ percentage }) => {
  return (
    <Box width='100%' bg={colors.grey.light} borderRadius='8px'>
      <Box
        bg={colors.blue.default}
        textAlign='center'
        width={`${percentage}%`}
        borderRadius='8px'
      >
        {percentage}
      </Box>
    </Box>
  )
}

export const Result = ({ totalVotes, votes, text, voted }) => {
  const percentage =
    (Math.round((votes / totalVotes + Number.EPSILON) * 100) / 100) * 100
  return (
    <Box
      border={`2px solid ${colors.blue.light}`}
      px={2}
      my={2}
      bg={voted ? colors.blue.lightest : 'transparent'}
    >
      <Text color={colors.blue.default}>Would you rather {text}?</Text>
      <Box>
        <ProgressBar percentage={percentage} />
        <Text textAlign='center'>
          {votes} out of {totalVotes} votes
        </Text>
      </Box>
    </Box>
  )
}

Result.defaultProps = {
  voted: false,
}

Result.propTypes = {
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  voted: PropTypes.bool,
}
