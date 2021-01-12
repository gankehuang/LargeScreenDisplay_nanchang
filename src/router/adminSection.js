export const releaseManagement = [
  {
    path: '/intelligentOffice/adminReleaseManagement/announcement',
    name: 'announcement',
    meta: {
      title: '通知公告管理',
      icon: 'earlyWarning'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/announcement.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/systemConstruction',
    name: 'systemConstruction',
    meta: {
      title: '制度建设管理',
      icon: 'sociology'
    },
    component: () =>
      import(
        '@/views/intelligentOffice/releaseManagement/systemConstruction.vue'
      )
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/mountains',
    name: 'mountains',
    meta: {
      title: '他山之石管理',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/mountains.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/workDynamicsReview',
    name: 'workDynamics',
    meta: {
      title: '工作动态待审核',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/workDynamics.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/dynamicsCity',
    name: 'dynamicsCity',
    meta: {
      title: '工作动态管理(市)',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/dynamicsCity.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/dynamicsArea',
    name: 'dynamicsArea',
    meta: {
      title: '工作动态管理(区)',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/dynamicsArea.vue')
  },
  {
    path: '/intelligentOffice/adminReleaseManagement/dynamicsRelease',
    name: 'dynamicsRelease',
    meta: {
      title: '工作动态发布评估',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/releaseManagement/dynamicsRelease.vue')
  }
]
export const materialSubmit = [
  {
    path: '/intelligentOffice/adminMaterialSubmit/taskIssuance',
    name: 'taskIssuance',
    meta: {
      title: '任务下发',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/materialSubmit/taskIssuance.vue')
  },
  {
    path: '/intelligentOffice/adminMaterialSubmit/agentTask',
    name: 'sysagentTask',
    meta: {
      title: '代办任务',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/materialSubmit/agentTask.vue')
  }
]
export const postManage = [
  {
    path: '/intelligentOffice/adminPostManage/unitPrefix',
    name: 'unitPrefix',
    meta: {
      title: '单位字头管理',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/postManage/unitPrefix.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/officialDocument',
    name: 'officialDocument',
    meta: {
      title: '新建公文',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/postManage/officialDocument.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/draftBox',
    name: 'draftBox',
    meta: {
      title: '草稿箱',
      icon: 'sociology'
    },
    component: () => import('@/views/intelligentOffice/postManage/draftBox.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/publishingAgent',
    name: 'publishingAgent',
    meta: {
      title: '发文代办',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/postManage/publishingAgent.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/postOffice',
    name: 'postOffice',
    meta: {
      title: '发文经办',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/postManage/postOffice.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/archive',
    name: 'archive',
    meta: {
      title: '发文归档',
      icon: 'sociology'
    },
    component: () => import('@/views/intelligentOffice/postManage/archive.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/backOfficial',
    name: 'backOfficial',
    meta: {
      title: '回收公文',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/postManage/backOfficial.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/groupManagement',
    name: 'groupManagement',
    meta: {
      title: '群组管理',
      icon: 'sociology'
    },
    component: () =>
      import('@/views/intelligentOffice/postManage/groupManagement.vue')
  },
  {
    path: '/intelligentOffice/adminPostManage/collectionAgency',
    name: 'collectionAgency',
    meta: {
      title: '收文代办',
      icon: 'sociology'
    },
    component: () =>
      import(
        '@/views/intelligentOffice/collectionManagement/collectionAgency.vue'
      )
  },
  {
    path: '/intelligentOffice/adminPostManage/receivingDocuments',
    name: 'receivingDocuments',
    meta: {
      title: '收文经办',
      icon: 'sociology'
    },
    component: () =>
      import(
        '@/views/intelligentOffice/collectionManagement/receivingDocuments.vue'
      )
  },
  {
    path: '/intelligentOffice/adminPostManage/incomingDocuments',
    name: 'incomingDocuments',
    meta: {
      title: '收文归档',
      icon: 'sociology'
    },
    component: () =>
      import(
        '@/views/intelligentOffice/collectionManagement/incomingDocuments.vue'
      )
  }
]
