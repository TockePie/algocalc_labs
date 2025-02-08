declare global {
  interface Window {
    api: {
      showDialog: (options: {
        type: string
        title: string
        message: string
      }) => void
    }
  }
}
