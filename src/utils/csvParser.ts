import Papa from 'papaparse'

export const fetchAndParseCSV = async <T>(filePath: string): Promise<T[]> => {
  const response = await fetch(filePath)
  const text = await response.text()

  return new Promise<T[]>((resolve, reject) => {
    Papa.parse<T>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (error: Error) => reject(error),
    })
  })
}
