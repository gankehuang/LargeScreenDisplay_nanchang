export default {
  data () {
    return {
      tabList: [
        {
          name: '办公门户',
          url: '/intelligentOffice/officePortal'
        },
        {
          name: '信息发布',
          url: '/intelligentOffice/adminReleaseManagement/announcement'
        },
        {
          name: '材料报送',
          url: '/intelligentOffice/adminMaterialSubmit/taskIssuance'
        },
        {
          name: '收发文',
          url: '/intelligentOffice/adminPostManage/unitPrefix'
        },
        {
          name: '领导视察',
          url: '/intelligentOffice/leaderInspection'
        }
      ]
    }
  }
}
