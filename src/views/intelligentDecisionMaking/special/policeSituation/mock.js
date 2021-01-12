// 地图县区、及其各项指数
const buttonList = [
  {
    name: '安义县',
    value: 96,
    code: '360123',
    scoreList: [99.89, 99.9, 99.89, 99.93, 99.91, 99.96],
    total: 96.3,
    style: 'top: 165px;left:205px',
    imgUrl: require('@/assets/image/dataView/anyi-map.png')
  },
  {
    name: '新建区',
    value: 90,
    code: '360122',
    scoreList: [97.89, 98.9, 98.89, 96.93, 97.91, 98.96],
    total: 94.8,
    style: 'top:100px;left:525px',
    imgUrl: require('@/assets/image/dataView/xinjian-map.png')
  },
  {
    name: '湾里局',
    value: 94,
    code: '360105',
    scoreList: [98.89, 97.9, 97.89, 98.93, 97.91, 97.96],
    total: 95.0,
    style: 'top: 205px;left:275px',
    imgUrl: require('@/assets/image/dataView/wanli-map.png')
  },
  {
    name: '经开区',
    value: 96,
    code: '360125',
    scoreList: [97.89, 99.1, 99.19, 99.23, 99.31, 99.36],
    total: 96.5,
    style: 'top: 155px;left:405px',
    imgUrl: require('@/assets/image/dataView/jingkai-map.png')
  },
  {
    name: '东湖区',
    value: 97,
    code: '360102',
    scoreList: [99.29, 99.39, 98.59, 99.73, 98.71, 99.06],
    total: 96.5,
    style: 'top:200px;left:405px',
    imgUrl: require('@/assets/image/dataView/donghu-map.png')
  },
  {
    name: '高新区',
    value: 96,
    code: '360107',
    scoreList: [98.89, 98.9, 98.89, 99.03, 99.01, 98.96],
    total: 96.2,
    style: 'top:190px;left:530px',
    imgUrl: require('@/assets/image/dataView/gaoxin-map.png')
  },
  {
    name: '西湖区',
    value: 94,
    code: '360103',
    scoreList: [99.89, 99.9, 99.89, 99.93, 99.91, 99.96],
    total: 94.5,
    style: 'top:235px;left:395px',
    imgUrl: require('@/assets/image/dataView/xihu-map.png')
  },
  {
    name: '红谷滩区',
    value: 93,
    code: '360106',
    scoreList: [99.99, 99.9, 99.19, 99.93, 99.21, 99.96],
    total: 94.3,
    style: 'top:285px;left:325px',
    imgUrl: require('@/assets/image/dataView/honggutan-map.png')
  },
  {
    name: '青云谱区',
    value: 90,
    code: '360104',
    scoreList: [98.89, 99.29, 99.49, 99.53, 99.71, 99.06],
    total: 92.9,
    style: 'top:270px;left:440px',
    imgUrl: require('@/assets/image/dataView/qingyunpu-map.png')
  },
  {
    name: '青山湖区',
    value: 99,
    code: '360111',
    scoreList: [99.89, 99.9, 99.89, 99.93, 99.91, 99.96],
    total: 98.3,
    style: 'top:230px;left:520px',
    imgUrl: require('@/assets/image/dataView/qingshanhu-map.png')
  },
  {
    name: '南昌县',
    value: 94,
    code: '360121',
    scoreList: [99.89, 98.9, 97.89, 98.93, 98.91, 98.96],
    total: 96.3,
    style: 'top:280px;left:580px',
    imgUrl: require('@/assets/image/dataView/nanchang-map.png')
  },
  {
    name: '进贤县',
    value: 96,
    code: '360124',
    scoreList: [99.89, 99.09, 98.89, 98.93, 99.01, 99.16],
    total: 96.3,
    style: 'top:320px;left:780px',
    imgUrl: require('@/assets/image/dataView/jinxian-map.png')
  }
]

const initListData = [
  {
    index: 1,
    name: '湾里局',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360105'
  },
  {
    index: 2,
    name: '红谷滩区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360106'
  },
  {
    index: 3,
    name: '东湖区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360102'
  },
  {
    index: 4,
    name: '西湖区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360103'
  },
  {
    index: 5,
    name: '青山湖区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360111'
  },
  {
    index: 6,
    name: '青云谱区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360104'
  },
  {
    index: 7,
    name: '新建区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360122'
  },
  {
    index: 8,
    name: '高新区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360107'
  },
  {
    index: 9,
    name: '经开区',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360125'
  },
  {
    index: 10,
    name: '南昌县',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360121'
  },
  {
    index: 11,
    name: '进贤县',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360124'
  },
  {
    index: 12,
    name: '安义县',
    score: 98.99,
    indexName: '总分',
    sortChange: 0,
    code: '360123'
  }
]

export { buttonList, initListData }
