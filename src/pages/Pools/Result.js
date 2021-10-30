import PropTypes from 'prop-types'
import { Box, Text } from '../../UI'
import { colors } from '../../utils/colors'

export const Result = ({ totalVotes, votes, text }) => {
  return (
    <Box border={`2px solid ${colors.blue.light}`}>
      <Text>Would you rather {text} </Text>
      <Box>
        <Text>{(votes / totalVotes) * 100}%</Text>
        <Text>
          {votes} out of {totalVotes} votes
        </Text>
      </Box>
    </Box>
  )
}

Result.propTypes = {
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}
