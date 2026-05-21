const showDialog = (type: 'info' | 'error', title: string, message: string) => {
  const prefix = type === 'error' ? 'Error' : 'Info'

  const formattedMessage = `${prefix} ${title}\n\n${message}`

  alert(formattedMessage)
}

export default showDialog
