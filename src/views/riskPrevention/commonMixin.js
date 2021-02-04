export default {
  data () {
    return {
      tabList: [
        // {
        //   name: '预警中心',
        //   url: '/riskPrevention/warning'
        // },
        {
          name: '政治安全',
          url: '/riskPrevention/safe'
        },
        {
          name: '社会治安',
          children: [
            {
              name: '重点人员',
              url: '/riskPrevention/importPeople'
            },
            {
              name: '流动人口',
              url: '/riskPrevention/floatingPopulation'
            },
            {
              name: '出租房屋',
              url: '/riskPrevention/rentalHousing'
            }
          ]
        },
        // {
        //   name: '矛盾纠纷',
        //   children: [
        //     {
        //       name: '特殊利益人群',
        //       url: '/riskPrevention/specialPeople'
        //     },
        //     {
        //       name: '多元调解',
        //       url: '/riskPrevention/conflictMediation'
        //     },
        //     {
        //       name: '禁渔禁捕',
        //       url: '/riskPrevention/keyWaters'
        //     }
        //   ]
        // },
        {
          name: '矛盾纠纷',
          url: '/riskPrevention/conflict'
        },
        {
          name: '公共安全',
          children: [
            {
              name: '重点区域',
              url: '/riskPrevention/keyThrong'
            },
            {
              name: '重点部位',
              url: '/riskPrevention/keyLocation'
            }
          ]
        },
        {
          name: '网络安全',
          url: '/riskPrevention/PoliticalLaw'
        },
        {
          name: 'AI研判',
          url: '/riskPrevention/AI'
        }
      ]
    }
  }
}
