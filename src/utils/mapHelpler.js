import { createMapMarker } from '@/common/createMapMarker'

// 聚焦地图某一点
const focusMap = (map, pos = [115.893868, 28.638082], zoom = 18) => {
  map.setCenter(pos)
  map.setZoom(zoom)
}

/*
创建不同类型事件地图Marker
typeText 事件类型
position 点坐标
return 创建的地图标记点
*/
const resultEventMarker = (typeText, position) => {
  let markerEleBoxClass = ''
  let markerEleTwinkleClass = ''
  let markerText = ''
  switch (typeText) {
    case '政治安全':
      markerEleBoxClass = 'zz-text-twinkle'
      markerEleTwinkleClass = 'zz-twinkle'
      markerText = '政治安全'
      break
    case '社会治安':
      markerEleBoxClass = 'sh-text-twinkle'
      markerEleTwinkleClass = 'sh-twinkle'
      markerText = '社会治安'
      break
    case '矛盾纠纷':
      markerEleBoxClass = 'md-text-twinkle'
      markerEleTwinkleClass = 'md-twinkle'
      markerText = '矛盾纠纷'
      break
    case '公共安全':
      markerEleBoxClass = 'gg-text-twinkle'
      markerEleTwinkleClass = 'gg-twinkle'
      markerText = '公共安全'
      break
    case '网络安全':
      markerEleBoxClass = 'wl-text-twinkle'
      markerEleTwinkleClass = 'wl-twinkle'
      markerText = '网络安全'
      break
    default:
      markerEleBoxClass = 'sh-text-twinkle'
      markerEleTwinkleClass = 'sh-twinkle'
      markerText = '社会治安'
      break
  }
  return createMapMarker({
    content: `<div
          class="${markerEleBoxClass}"
        >
          <p>${markerText}</p>
          <div class="${markerEleTwinkleClass}" />
        </div>`,
    position
  })
}

export { resultEventMarker, focusMap }
