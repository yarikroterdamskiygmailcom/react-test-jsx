type ArrayStore = {
  [key: string]: string | number | object | [],
}

class Storages {
  public get(name: string) {
    if (typeof window === 'undefined') return null

    return JSON.parse(localStorage.getItem(name) as string)
  }

  public put(name: string, value: null | object | string | [ArrayStore] | []) {
    if (typeof window === 'undefined') return

    localStorage.setItem(name, JSON.stringify(value))
  }

}

export default new Storages()
