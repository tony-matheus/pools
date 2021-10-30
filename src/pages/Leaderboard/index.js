import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from '../../UI'

export const Leaderboard = () => {
  const { authenticatedUser, all } = useSelector((data) => data.user)
  const [leaderboardList, setLeaderboardList] = useState([])

  useEffect(() => {
    const list = all.sort((a, b) => {
      const aResult = a.questions.lenght + Object.keys(a.answers).length
      const bResult = b.questions.lenght + Object.keys(b.answers).length
      return aResult - bResult
    })
    setLeaderboardList(list)
  }, [all])

  return (
    <Box>
      {leaderboardList.map((user) => (
        <Box mt={10} key={user.id}>
          {user.name}
          <Text>created questions: {user.questions.lenght}</Text>
          <Text>answered questions: {Object.keys(user.answers).length}</Text>
          <Text>
            status: {user.questions.lenght + Object.keys(user.answers).length}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
