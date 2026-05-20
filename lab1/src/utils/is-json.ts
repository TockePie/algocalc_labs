const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str)
  } catch {
    return false
  }
  return true
}

export default isValidJson
