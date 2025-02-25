const showDialog = (type: 'info' | 'error', title: string, message: string) => {
  window.api.showDialog({ type, title, message })
}

export default showDialog
