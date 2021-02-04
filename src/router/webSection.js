import Layout from '@/layout'
import { releaseManagement, materialSubmit, postManage } from './adminSection'
export default [
  {
    path: '/',
    name: 'inex',
    meta: {
      title: '欢迎视频0'
    },
    component: () => import('@/views/welcomeVideo')
  },
  {
    path: '/Layout',
    component: Layout,
    redirect: '/welcomeVideo1',
    name: 'Layout',
    children: [
      {
        path: '/welcomeVideo1',
        name: 'welcomeVideo1',
        meta: {
          title: '欢迎视频1'
        },
        component: () => import('@/views/welcomeVideo/index1')
      },
      {
        path: '/VRHome',
        name: 'VRHome',
        meta: {
          title: 'VR地图'
        },
        component: () => import('@/views/VRHome')
      },
      {
        path: '/smartData/dataView',
        name: 'smartDataDataView',
        meta: {
          title: '智汇数据-数据视图'
        },
        component: () => import('@/views/smartData/dataView')
      },
      {
        path: '/smartData/dataView/part',
        name: 'smartDataDataViewPart',
        meta: {
          title: '智汇数据-数据视图-主题库模块'
        },
        component: () => import('@/views/smartData/dataView/part')
      },
      {
        path: '/smartData/gridView',
        name: 'smartDataGridView',
        meta: {
          title: '智汇数据-网格视图'
        },
        component: () => import('@/views/smartData/gridView')
      },
      {
        path: '/riskPrevention/warning',
        name: 'warning',
        meta: {
          title: '智防风险-预警处置'
        },
        component: () => import('@/views/riskPrevention/warning')
      },
      {
        path: '/riskPrevention/safe',
        name: 'safe',
        meta: {
          title: '智防风险-政治安全'
        },
        component: () => import('@/views/riskPrevention/safe')
      },
      {
        path: '/riskPrevention/importPeople',
        name: 'importPeople',
        meta: {
          title: '智防风险-社会治安-重点人群'
        },
        component: () => import('@/views/riskPrevention/importPeople')
      },
      {
        path: '/riskPrevention/trajectory',
        name: 'trajectory',
        meta: {
          title: '智防风险-社会治安-重点人群-人员轨迹'
        },
        component: () => import('@/views/riskPrevention/trajectory')
      },
      {
        path: '/riskPrevention/floatingPopulation',
        name: 'floatingPopulation',
        meta: {
          title: '智防风险-社会治安-流动人口'
        },
        component: () => import('@/views/riskPrevention/floatingPopulation')
      },
      {
        path: '/riskPrevention/rentalHousing',
        name: 'rentalHousing',
        meta: {
          title: '智防风险-社会治安-出租房屋'
        },
        component: () => import('@/views/riskPrevention/rentalHousing/index')
      },
      {
        path: '/riskPrevention/conflict',
        name: 'conflict',
        meta: {
          title: '智防风险-矛盾纠纷'
        },
        component: () => import('@/views/riskPrevention/conflict')
      },
      {
        path: '/riskPrevention/keyWaters',
        name: 'keyWaters',
        meta: {
          title: '智防风险-矛盾纠纷-重点水域'
        },
        component: () => import('@/views/riskPrevention/keyWaters')
      },
      // {
      //   path: '/riskPrevention/keyWaters',
      //   name: 'keyWaters',
      //   meta: {
      //     title: '智防风险-矛盾纠纷-重点水域'
      //   },
      //   component: () => import('@/views/riskPrevention/keyWaters')
      // },
      // {
      //   path: '/riskPrevention/conflictMediation',
      //   name: 'conflictMediation',
      //   meta: {
      //     title: '智防风险-矛盾纠纷-多元调解'
      //   },
      //   component: () => import('@/views/riskPrevention/conflictMediation')
      // },
      // {
      //   path: '/riskPrevention/specialPeople',
      //   name: 'specialPeople',
      //   meta: {
      //     title: '智防风险-矛盾纠纷-特殊利益人群'
      //   },
      //   component: () => import('@/views/riskPrevention/specialPeople')
      // },
      {
        path: '/riskPrevention/keyThrong',
        name: 'keyThrong',
        meta: {
          title: '智防风险-公共安全-重点区域'
        },
        component: () => import('@/views/riskPrevention/keyThrong')
      },
      {
        path: '/riskPrevention/keyLocation',
        name: 'keyLocation',
        meta: {
          title: '智防风险-公共安全-重点部位'
        },
        component: () => import('@/views/riskPrevention/keyLocation')
      },
      {
        path: '/riskPrevention/PoliticalLaw',
        name: 'politicalLaw',
        meta: {
          title: '智防风险-网络安全-政法舆情'
        },
        component: () => import('@/views/riskPrevention/politicalLaw')
      },
      {
        path: '/riskPrevention/AI',
        name: 'AI',
        meta: {
          title: '智防风险-AI研判'
        },
        component: () => import('@/views/riskPrevention/AI')
      },
      {
        path: '/intelligentCommand/command',
        name: 'intelligentCommandCommand',
        meta: {
          title: '智能指挥'
        },
        component: () => import('@/views/intelligentCommand/command')
      },
      {
        path: '/adminIntelligentService',
        name: 'intelligentService',
        meta: {
          title: '智惠服务'
        },
        component: () =>
          import('@/views/intelligentService/earlyWarningDisposal')
      },
      {
        path: '/adminIntelligentService/earlyWarningDisposal',
        name: 'earlyWarningDisposal',
        meta: {
          title: '智惠服务-预警处置',
          icon: 'earlyWarning'
        },
        component: () =>
          import('@/views/intelligentService/earlyWarningDisposal')
      },
      {
        path: '/adminIntelligentService/socialGovernance',
        name: 'socialGovernance',
        meta: {
          title: '智惠服务-社会治理',
          icon: 'sociology'
        },
        component: () => import('@/views/intelligentService/socialGovernance')
      },
      {
        path: '/adminIntelligentService/activityCommand',
        name: 'activityCommand',
        meta: {
          title: '智惠服务-活动指挥',
          icon: 'activity'
        },
        component: () => import('@/views/intelligentService/activityCommand')
      },
      {
        path: '/adminIntelligentService/regionSupervision',
        name: 'regionSupervision',
        meta: {
          title: '智惠服务-县区督导',
          icon: 'supervision'
        },
        component: () => import('@/views/intelligentService/regionSupervision')
      },
      {
        path: '/intelligentDecisionMaking/dataCockpit',
        name: 'intelligentDecisionMakingDataCockpit',
        meta: {
          title: '智辅决策-数据驾驶舱'
        },
        component: () => import('@/views/intelligentDecisionMaking/dataCockpit')
      },
      {
        path: '/intelligentDecisionMaking/comprehensive',
        name: 'intelligentDecisionMakingComprehensive',
        meta: {
          title: '智辅决策-综合态势'
        },
        component: () =>
          import('@/views/intelligentDecisionMaking/comprehensive')
      },
      {
        path: '/intelligentDecisionMaking/special/policeSituation',
        name: 'intelligentDecisionMakingSpecialPoliceSituation',
        meta: {
          title: '智辅决策-专项态势-警情态势'
        },
        component: () =>
          import('@/views/intelligentDecisionMaking/special/policeSituation')
      },
      {
        path: '/intelligentDecisionMaking/special/interviewSituation',
        name: 'intelligentDecisionMakingSpecialInterviewSituation',
        meta: {
          title: '智辅决策-专项态势-访情态势'
        },
        component: () =>
          import('@/views/intelligentDecisionMaking/special/interviewSituation')
      },
      // {
      //   path: '/intelligentOffice',
      //   name: 'intelligentOffice',
      //   meta: {
      //     title: '智效办公'
      //   },
      //   component: () => import('@/views/intelligentOffice'),
      //   children: intelligentOffice
      // },
      {
        path: '/intelligentOffice',
        name: 'intelligentOffice',
        meta: {
          title: '智效办公'
        },
        component: () => import('@/views/intelligentOffice/officePortalTwo')
      },
      {
        path: '/intelligentOffice/officePortal',
        name: 'officePortal',
        meta: {
          title: '智效办公-办公门户'
        },
        component: () => import('@/views/intelligentOffice/officePortalTwo')
      },
      {
        path: '/intelligentOffice/adminReleaseManagement',
        name: 'releaseManagement',
        meta: {
          title: '智效办公-信息发布'
        },
        component: () =>
          import('@/views/intelligentOffice/releaseManagement/index.vue'),
        children: releaseManagement
      },
      {
        path: '/intelligentOffice/adminMaterialSubmit',
        name: 'materialSubmit',
        meta: {
          title: '智效办公-材料报送'
        },
        component: () =>
          import('@/views/intelligentOffice/materialSubmit/index.vue'),
        children: materialSubmit
      },
      {
        path: '/adminIntelligentOffice/postManage',
        name: 'postManage',
        meta: {
          title: '智效办公-收发文'
        },
        component: () =>
          import('@/views/intelligentOffice/postManage/index.vue'),
        children: postManage
      },
      {
        path: '/intelligentOffice/leaderInspection',
        name: 'leaderInspection',
        meta: {
          title: '智效办公-领导视察'
        },
        component: () =>
          import('@/views/intelligentOffice/leaderInspection/index.vue')
      },
      {
        path: '/search',
        name: 'search',
        meta: {
          title: '搜索'
        },
        component: () => import('@/views/search')
      },
      {
        path: '/search/second',
        name: 'searchSecond',
        meta: {
          title: '搜索1'
        },
        component: () => import('@/views/search/second')
      }
    ]
  }
]
