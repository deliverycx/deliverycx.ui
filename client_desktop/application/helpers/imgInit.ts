export const imgRout = (img:string) => {
  return (process.env.NODE_ENV === 'development')
    ? `${process.env.NEXT_PUBLIC_STATIC}${img}`
    : `${img}`
}

export const imgRoutDef = (img:string) => {
  return (process.env.NODE_ENV === 'development')
    ? `${process.env.NEXT_PUBLIC_STATIC}/static/shop/${img}`
    : `/static/shop/${img}`
}
