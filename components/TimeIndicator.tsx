import React from 'react'

interface Props {
  date: Date | string
}

const TimeIndicator: React.FC<Props> = ({ date }) => {
  const postDate = new Date(date)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - postDate.getTime()
  const timeInMinutes = Math.round(timeDifference / (1000 * 60))
  const timeInHours = Math.round(timeDifference / (1000 * 60 * 60))

  let timeIndicator
  if (timeInMinutes < 1) {
    timeIndicator = `Added just now`
  } else if (timeInMinutes === 1) {
    timeIndicator = `Added ${timeInMinutes} minute ago`
  } else if (timeInMinutes < 60) {
    timeIndicator = `Added ${timeInMinutes} minutes ago`
  } else if (timeInHours === 1) {
    timeIndicator = `Added ${timeInHours} hour ago`
  } else if (timeInHours < 24) {
    timeIndicator = `Added ${timeInHours} hours ago`
  } else {
    timeIndicator = `Added on ${postDate.toLocaleDateString()}`
  }

  return <p className="text-sm text-slate-500">{timeIndicator}</p>
}

export default TimeIndicator