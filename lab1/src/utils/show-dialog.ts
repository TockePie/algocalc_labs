const showDialog = (type: 'info' | 'error', title: string, message: string) => {
  // Add a simple context emoji based on the severity type
  const prefix = type === 'error' ? '❌' : 'ℹ️'

  // Format the title and message clearly with line breaks
  const formattedMessage = `${prefix} ${title}\n\n${message}`

  // Trigger the native web browser dialog popup
  alert(formattedMessage)
}

export default showDialog
