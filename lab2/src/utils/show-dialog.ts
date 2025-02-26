declare global {
  interface Window {
    api?: {
      showDialog: (options: {
        type: string
        title: string
        message: string
      }) => void
    }
  }
}

const showDialog = (type: 'info' | 'error', title: string, message: string) => {
  window.api!.showDialog({ type, title, message })
}

export default showDialog
