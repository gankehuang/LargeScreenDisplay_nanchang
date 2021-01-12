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

// 初始化南昌市、及其各项指数
const initTotalData = {
  name: '南昌市',
  scoreList: [98.99, 96.88, 90.88, 98.88, 94.88, 98.88],
  total: 90,
  code: '3601'
}

// 初始化各县区初始化月份统计变化趋势
const monthData = {
  政治安全指数: [
    97.0,
    97.3,
    97.6,
    97.9,
    98.2,
    98.4,
    98.6,
    98.8,
    99,
    99.3,
    99.6,
    99.9
  ],
  治安安全指数: [
    99,
    99.1,
    99.2,
    99.3,
    99.4,
    99.5,
    99.6,
    99.7,
    99.8,
    99.9,
    99.9,
    99.9
  ],
  经济犯罪指数: [
    97,
    97.1,
    97.2,
    97.3,
    97.4,
    97.4,
    97.6,
    97.8,
    98.2,
    98.3,
    98.6,
    98.9
  ],
  公共安全指数: [
    98,
    98.1,
    98.2,
    98.3,
    98.4,
    98.4,
    98.6,
    98.8,
    98.2,
    98.3,
    98.6,
    98.9
  ],
  矛盾纠纷指数: [
    97,
    97.3,
    97.6,
    97.9,
    98.2,
    98.4,
    98.6,
    98.8,
    99,
    99.3,
    99.6,
    99.9
  ].reverse(),
  公众安全感指数: [
    99,
    99.1,
    99.2,
    99.3,
    99.4,
    99.5,
    99.6,
    99.7,
    99.8,
    99.9,
    99.9,
    99.9
  ]
}

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

// 二级指标
const initTwoLevel = [
  {
    label: '政治安全防范',
    upLevelLabel: '政治安全'
  },
  {
    label: '暴恐犯罪',
    upLevelLabel: '政治安全'
  },
  {
    label: '防范处理邪教',
    upLevelLabel: '政治安全'
  },
  {
    label: '治安警情',
    upLevelLabel: '治安安全'
  },
  {
    label: '刑事警情',
    upLevelLabel: '治安安全'
  },
  {
    label: '主要经济犯罪安全数',
    upLevelLabel: '经济安全'
  },
  {
    label: '侵犯知识产权案事件数',
    upLevelLabel: '经济安全'
  },
  {
    label: '生产安全事故',
    upLevelLabel: '公共安全'
  },
  {
    label: '交通安全事故',
    upLevelLabel: '公共安全'
  },
  {
    label: '火灾安全事故',
    upLevelLabel: '公共安全'
  },
  {
    label: '食品药品安全',
    upLevelLabel: '公共安全'
  },
  {
    label: '人民调解',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '信访工作',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '行政复议',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '民事行政案件',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '涉稳突出问题分类归口处理机制',
    upLevelLabel: '矛盾纠纷'
  },
  {
    label: '公众安全感',
    upLevelLabel: '公众安全感'
  },
  {
    label: '政法满意度',
    upLevelLabel: '公众安全感'
  }
]

// 三级指标
const initThreeLevel = [
  {
    label: '危害国家政治安全事件',
    upLevelLabel: '政治安全防范'
  },
  {
    label: '涉恐信息收集数量',
    upLevelLabel: '暴恐犯罪'
  },
  {
    label: '涉恐犯罪案件数量',
    upLevelLabel: '暴恐犯罪'
  },
  {
    label: '邪教犯罪涉案人数',
    upLevelLabel: '防范处理邪教'
  },
  {
    label: '宗教非法聚集活动',
    upLevelLabel: '防范处理邪教'
  },
  {
    label: '治安案件受理数',
    upLevelLabel: '治安警情'
  },
  {
    label: '赌博案件受理数',
    upLevelLabel: '治安警情'
  },
  {
    label: '寻衅滋事案件受理数',
    upLevelLabel: '治安警情'
  },
  {
    label: '严重精神障碍患者强制医疗案件数',
    upLevelLabel: '治安警情'
  },
  {
    label: '群体性事件数',
    upLevelLabel: '治安警情'
  },
  {
    label: '刑事立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '命案立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '入室盗窃立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '八类案件立案数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '毒品违法犯罪人数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '未成年人犯罪人数',
    upLevelLabel: '刑事警情'
  },
  {
    label: '重复犯罪率',
    upLevelLabel: '刑事警情'
  },
  {
    label: '合同诈骗案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '电信诈骗案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '涉众型经济犯罪立案数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '传销及其他经济犯罪案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '网络借贷违法违规案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '税收违法违规案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '走私违法违规案件数',
    upLevelLabel: '主要经济犯罪案件数'
  },
  {
    label: '侵犯知识产权案事件数',
    upLevelLabel: '侵犯知识产权案事件数'
  },
  {
    label: '生产安全事故死亡人数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '较大生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '重大生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '特大生产安全事故起数',
    upLevelLabel: '生产安全事故'
  },
  {
    label: '交通事故发生数',
    upLevelLabel: '交通安全事故'
  },
  {
    label: '交通事故死亡人数',
    upLevelLabel: '交通安全事故'
  },
  {
    label: '城乡火灾',
    upLevelLabel: '火灾安全事故'
  },
  {
    label: '森林火灾',
    upLevelLabel: '火灾安全事故'
  },
  {
    label: '食品药品安全案件',
    upLevelLabel: '食品药品安全'
  },
  {
    label: '人民调解案件数量',
    upLevelLabel: '人民调解'
  },
  {
    label: '民转刑案件数量',
    upLevelLabel: '人民调解'
  },
  {
    label: '赴京进省来市非接待场所访',
    upLevelLabel: '信访工作'
  },
  {
    label: '赴京进省来市集体访',
    upLevelLabel: '信访工作'
  },
  {
    label: '极端过激行为',
    upLevelLabel: '信访工作'
  },
  {
    label: '行政复议案件受理数',
    upLevelLabel: '行政复议'
  },
  {
    label: '民事行政案件一审立案数',
    upLevelLabel: '民事行政案件'
  },
  {
    label: '涉稳突出问题主管部门分别牵头化解数量',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '影响社会稳定矛盾问题化解率',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '涉稳信息预警数量',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '稳评项目备案数量',
    upLevelLabel: '涉稳突出问题分类归口处理机制'
  },
  {
    label: '公众安全感指数',
    upLevelLabel: '公众安全感'
  },
  {
    label: '政法机关满意度',
    upLevelLabel: '政法满意度'
  }
]

// 弹框mock数据
const modalMockData = [
  {
    indexNameList: [
      { label: '政治安全防范', score: 100 },
      { label: '暴恐犯罪', score: 100 },
      { label: '防范处理邪教', score: 100 }
    ],
    tableData: [
      {
        oneLevel: '政治安全',
        twoLevel: '政治安全防范',
        threeLevel: '危害国家政治安全事件',
        weight: '4%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '政治安全',
        twoLevel: '暴恐犯罪',
        threeLevel: '涉恐信息收集数量',
        weight: '3%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '政治安全',
        twoLevel: '暴恐犯罪',
        threeLevel: '涉恐犯罪案件数量',
        weight: '4%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '政治安全',
        twoLevel: '防范处理邪教',
        threeLevel: '邪教犯罪涉案人数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '政治安全',
        twoLevel: '防范处理邪教',
        threeLevel: '宗教非法聚集活动',
        weight: '4%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      }
    ]
  },
  {
    indexNameList: [
      { label: '治安警情', score: 78 },
      { label: '刑事警情', score: 16 },
      { label: '主要经济犯罪案件数', score: 117 },
      { label: '侵犯知识产权案事件数', score: 8 }
    ],
    tableData: [
      {
        oneLevel: '治安安全',
        twoLevel: '治安警情',
        threeLevel: '治安案件受理数',
        weight: '3%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '治安警情',
        threeLevel: '赌博案件受理数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '治安警情',
        threeLevel: '寻衅滋事案件受理数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '治安警情',
        threeLevel: '严重精神障碍患者强制医疗案件数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '治安警情',
        threeLevel: '群体性事件数',
        weight: '3%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '治安警情',
        threeLevel: '群体性事件数',
        weight: '3%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '刑事警情',
        threeLevel: '刑事立案数',
        weight: '3%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '刑事警情',
        threeLevel: '命案立案数',
        weight: '3%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '治安安全',
        twoLevel: '刑事警情',
        threeLevel: '入室盗窃立案数',
        weight: '3%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      }
    ]
  },
  {
    indexNameList: [
      { label: '主要经济犯罪案件数', score: 90 },
      { label: '侵犯知识产权案事件数', score: 90 }
    ],
    tableData: [
      {
        oneLevel: '经济犯罪',
        twoLevel: '主要经济犯罪案件数',
        threeLevel: '合同诈骗案件数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '经济犯罪',
        twoLevel: '主要经济犯罪案件数',
        threeLevel: '电信诈骗案件数',
        weight: '3%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '经济犯罪',
        twoLevel: '主要经济犯罪案件数',
        threeLevel: '涉众型经济犯罪立案数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '经济犯罪',
        twoLevel: '主要经济犯罪案件数',
        threeLevel: '传销及其他经济犯罪案件数',
        weight: '3%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '经济犯罪',
        twoLevel: '侵犯知识产权案事件数',
        threeLevel: '侵犯知识产权案事件数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      }
    ]
  },
  {
    indexNameList: [
      { label: '生产安全事故', score: 90 },
      { label: '交通安全事故', score: 90 },
      { label: '火灾安全事故', score: 90 },
      { label: '食品安全事故', score: 90 }
    ],
    tableData: [
      {
        oneLevel: '公共安全',
        twoLevel: '生产安全事故',
        threeLevel: '生产安全事故死亡人数',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公共安全',
        twoLevel: '生产安全事故',
        threeLevel: '生产安全事故起数',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公共安全',
        twoLevel: '生产安全事故',
        threeLevel: '较大生产安全事故起数',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公共安全',
        twoLevel: '生产安全事故',
        threeLevel: '重大生产安全事故起数',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公共安全',
        twoLevel: '交通安全事故',
        threeLevel: '交通事故发生数',
        weight: '1%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公共安全',
        twoLevel: '火灾安全事故',
        threeLevel: '城乡火灾',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公共安全',
        twoLevel: '食品药品安全',
        threeLevel: '食品药品安全案件',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      }
    ]
  },
  {
    indexNameList: [
      { label: '人民调解', score: 90 },
      { label: '信访工作', score: 90 },
      { label: '民事行政案件', score: 90 },
      { label: '涉稳突出问题分类归口处理机制', score: 90 }
    ],
    tableData: [
      {
        oneLevel: '矛盾纠纷',
        twoLevel: '人民调解',
        threeLevel: '人民调解案件数量',
        weight: '1%',
        score: 60,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '矛盾纠纷',
        twoLevel: '人民调解',
        threeLevel: '民转刑案件数量',
        weight: '1%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '矛盾纠纷',
        twoLevel: '信访工作',
        threeLevel: '赴京进省来市非接待场所访',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '矛盾纠纷',
        twoLevel: '信访工作',
        threeLevel: '赴京进省来市集体访',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '行政复议',
        twoLevel: '人民调解',
        threeLevel: '行政复议案件受理数',
        weight: '2%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      }
    ]
  },
  {
    indexNameList: [
      { label: '公众安全感', score: 90 },
      { label: '政法满意度', score: 90 }
    ],
    tableData: [
      {
        oneLevel: '公众安全感',
        twoLevel: '公众安全感',
        threeLevel: '公众安全感指数',
        weight: '5%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      },
      {
        oneLevel: '公众安全感',
        twoLevel: '政法满意度',
        threeLevel: '政法机关满意度',
        weight: '5%',
        score: 100,
        chainRatio: '-',
        averageScore: '-'
      }
    ]
  }
]
export {
  buttonList,
  initTotalData,
  monthData,
  initListData,
  initTwoLevel,
  initThreeLevel,
  modalMockData
}
