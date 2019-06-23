const shortenFileName = (title: string) => {
  const lengthName = 10

  if (title.length >= lengthName) {
    return `${title.substring(0, lengthName)}...`
  }
  return title
}

export default shortenFileName
