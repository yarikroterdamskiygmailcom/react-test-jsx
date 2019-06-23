type Key = {
  [key: string]: object
}

type Object = {
  _id: string,
}

export default (array: any[]) =>
  array.reduce((obj: Key, item: Object) => {
    obj[item._id] = item

    return obj
  },           {})
