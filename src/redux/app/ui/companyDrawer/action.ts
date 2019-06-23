export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'

const openDrawer = () => ({
  type: OPEN_DRAWER,
})

const closeDrawer = () => ({
  type: CLOSE_DRAWER,
})

export default {
  openDrawer,
  closeDrawer,
}
