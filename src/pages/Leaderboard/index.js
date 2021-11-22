import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Image, Text } from '../../UI'
import { colors } from '../../utils/colors'
import { Loading } from '../../UI/Loading'

export const Leaderboard = () => {
  const { all, isLoading } = useSelector((data) => data.user)
  const [leaderboardList, setLeaderboardList] = useState([])

  useEffect(() => {
    console.log(all)
    const list = all.sort((a, b) => {
      const aResult = a.questions.length + Object.keys(a.answers).length
      const bResult = b.questions.length + Object.keys(b.answers).length
      return bResult - aResult
    })
    setLeaderboardList(list)
  }, [all])

  if (isLoading) return <Loading />

  return (
    <Box display='flex' justifyContent='center'>
      <Box maxWidth={['100%', null, '75%']} minWidth={['100%', null, '50%']}>
        {leaderboardList.map((user) => {
          const createdQuestions = user.questions.length
          const answeredQuestions = Object.keys(user.answers).length
          const score = user.questions.length + Object.keys(user.answers).length
          return (
            <Box
              key={user.id}
              mt={10}
              p={2}
              display='flex'
              border={`1px solid ${colors.grey.light}`}
              borderRadius='10px'
            >
              <Box p={2} width={1 / 4}>
                <Image
                  borderRadius='100%'
                  width={100}
                  height={100}
                  src={user.avatarURL}
                  size='9rem'
                  alt=''
                  mx='auto'
                />
              </Box>
              <Box
                p={2}
                width={1 / 2}
                borderLeft={`1px solid ${colors.grey.light}`}
                borderRight={`1px solid ${colors.grey.light}`}
              >
                <Text as='h2' fontWeight='bold' mt={0}>
                  {user.name}
                </Text>
                <Box
                  display='flex'
                  fontSize='14px'
                  borderBottom={`1px solid ${colors.grey.light}`}
                  justifyContent='space-between'
                >
                  <Text my={1}>Answered questions:</Text>
                  <Text my={1}>{answeredQuestions}</Text>
                </Box>
                <Box
                  display='flex'
                  fontSize='14px'
                  justifyContent='space-between'
                >
                  <Text>Created questions: </Text>
                  <Text>{createdQuestions}</Text>
                </Box>
              </Box>
              <Box p={2} width={1 / 4}>
                <Box
                  borderRadius='10px'
                  border={`1px solid ${colors.grey.light}`}
                  height='100%'
                >
                  <Box
                    textAlign='center'
                    borderTopLeftRadius='8px'
                    borderTopRightRadius='8px'
                    borderBottom={`1px solid ${colors.grey.light}`}
                    bg={colors.grey.light}
                    height='30%'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Text my={0} fontSize={20}>
                      Score
                    </Text>
                  </Box>
                  <Box
                    textAlign='center'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    height='70%'
                  >
                    <Box
                      bg={colors.blue.default}
                      borderRadius='100%'
                      height='50px'
                      width='50px'
                      color={colors.white}
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Text my={1} fontSize={18} fontWeight='bold'>
                        {score}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
