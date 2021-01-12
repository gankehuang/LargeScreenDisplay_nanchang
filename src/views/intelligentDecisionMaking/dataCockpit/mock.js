// 地图县区、及其各项指数
const buttonList = [
  {
    name: '安义县',
    totalScore: 90.38,
    code: '360123',
    style: 'top: 165px;left:205px',
    imgUrl: require('@/assets/image/dataView/anyi-map.png')
  },
  {
    name: '新建区',
    code: '360122',
    style: 'top:100px;left:525px',
    imgUrl: require('@/assets/image/dataView/xinjian-map.png')
  },
  {
    name: '湾里局',
    code: '360105',
    style: 'top: 205px;left:275px',
    imgUrl: require('@/assets/image/dataView/wanli-map.png')
  },
  {
    name: '经开区',
    code: '360125',
    style: 'top: 155px;left:405px',
    imgUrl: require('@/assets/image/dataView/jingkai-map.png')
  },
  {
    name: '东湖区',
    code: '360102',
    style: 'top:200px;left:405px',
    imgUrl: require('@/assets/image/dataView/donghu-map.png')
  },
  {
    name: '高新区',
    code: '360107',
    style: 'top:190px;left:530px',
    imgUrl: require('@/assets/image/dataView/gaoxin-map.png')
  },
  {
    name: '西湖区',
    code: '360103',
    style: 'top:235px;left:395px',
    imgUrl: require('@/assets/image/dataView/xihu-map.png')
  },
  {
    name: '红谷滩区',
    code: '360106',
    style: 'top:285px;left:325px',
    imgUrl: require('@/assets/image/dataView/honggutan-map.png')
  },
  {
    name: '青云谱区',
    code: '360104',
    style: 'top:270px;left:440px',
    imgUrl: require('@/assets/image/dataView/qingyunpu-map.png')
  },
  {
    name: '青山湖区',
    code: '360111',
    style: 'top:230px;left:520px',
    imgUrl: require('@/assets/image/dataView/qingshanhu-map.png')
  },
  {
    name: '南昌县',
    code: '360121',
    style: 'top:280px;left:580px',
    imgUrl: require('@/assets/image/dataView/nanchang-map.png')
  },
  {
    name: '进贤县',
    code: '360124',
    style: 'top:320px;left:780px',
    imgUrl: require('@/assets/image/dataView/jinxian-map.png')
  }
]

// 初始化南昌市、及其各项指数
const initTotalData = {
  name: '南昌市',
  code: '3601'
}

// 涉稳数据
const sheWenList = [
  { label: '中华情', number: 32, percentage: 7.56 },
  { label: '融创望江府', number: 28, percentage: 6.61 },
  { label: '万科天空之城', number: 20, percentage: 4.72 }
]

//  信访数据
const xinFangList = [
  { label: '城乡建设', number: 3532, percentage: 23.56 },
  { label: '房地产', number: 2210, percentage: 18.34 },
  { label: '安置补偿', number: 2094, percentage: 16.78 }
]

// 类型最多
const typeMostList = [
  {
    date: '矛盾纠纷',
    name: '275863件',
    address: '29.54%'
  },
  {
    date: '城市管理',
    name: '228429件',
    address: '25.36%'
  },
  {
    date: '城市建设',
    name: '129180件',
    address: '15.28%'
  }
]

// 来源最多
const originMostList = [
  {
    date: '村社PC端上报',
    name: '492644件',
    address: '61.88%'
  },
  {
    date: '社会治理APP上报',
    name: '203988件',
    address: '25.36%'
  },
  {
    date: '部门系统流转',
    name: '95647件',
    address: '12.01%'
  }
]
export {
  buttonList,
  initTotalData,
  sheWenList,
  xinFangList,
  typeMostList,
  originMostList
}
