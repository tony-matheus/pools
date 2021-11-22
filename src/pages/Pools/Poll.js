/* eslint-disable react/forbid-prop-types */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../utils/colors'
import { Box, Button, Image, Text } from '../../UI'
import { Result } from './Result'

const [OPTION_ONE, OPTION_TWO] = ['optionOne', 'optionTwo']

export const Pool = ({
  title,
  optionOne,
  optionTwo,
  // id,
  avatarUrl,
  onSubmit,
  isAnswered,
  votedOption,
}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (option) => setSelectedOption(option)
  const handleSubmit = () => {
    setIsLoading(true)
    onSubmit(selectedOption)
  }

  return (
    <Box borderRadius='5px' border={`2px solid ${colors.blue.light}`}>
      <Box
        py={1}
        px={2}
        borderBottom={`2px solid ${colors.blue.light}`}
        bg={colors.blue.light}
      >
        <Text as='h3'>{title}</Text>
      </Box>
      <Box p={1} display='flex' justifyContent='space-between'>
        <Box
          width={isAnswered ? 1 / 4 : 1 / 3}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Image src={avatarUrl} borderRadius='100%' width={100} height={100} />
        </Box>
        {isAnswered ? (
          <Box width={3 / 4} px={2}>
            <Result
              votes={optionOne.votes.length}
              totalVotes={optionOne.votes.length + optionTwo.votes.length}
              text={optionOne.text}
              voted={votedOption === OPTION_ONE}
            />
            <Result
              votes={optionTwo.votes.length}
              totalVotes={optionOne.votes.length + optionTwo.votes.length}
              text={optionTwo.text}
              voted={votedOption === OPTION_TWO}
            />
          </Box>
        ) : (
          <Box width={2 / 3} p={2}>
            <Text fontSize={24} fontWeight='bold'>
              Would you Rather...
            </Text>
            <Box display='flex' alignItems='center' my={3}>
              <Text as='label'>
                <input
                  type='radio'
                  checked={selectedOption === OPTION_ONE}
                  onChange={() => onChange(OPTION_ONE)}
                  value={OPTION_ONE}
                  disabled={isLoading}
                />
                {optionOne.text}
              </Text>
            </Box>
            <Box display='flex' alignItems='center' my={3}>
              <Text as='label'>
                <input
                  type='radio'
                  checked={selectedOption === OPTION_TWO}
                  onChange={() => onChange(OPTION_TWO)}
                  value={OPTION_TWO}
                  disabled={isLoading}
                />
                {optionTwo.text}
              </Text>
            </Box>
            <Button onClick={handleSubmit} width='100%' py={2}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

Pool.propTypes = {
  title: PropTypes.string.isRequired,
  optionOne: PropTypes.object.isRequired,
  optionTwo: PropTypes.object.isRequired,
  // id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  votedOption: PropTypes.string.isRequired,
}
