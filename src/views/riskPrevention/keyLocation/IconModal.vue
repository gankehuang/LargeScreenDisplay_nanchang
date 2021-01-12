<template>
  <transition name="fade">
    <div class="modal-container" v-if="visible">
      <img
        class="modal-close"
        src="@/assets/image/KeyThrong/close.png"
        @click="closeModal"
      />
      <div class="modal-content">
        <!--人脸设备-->
        <div v-if="info && info.typeName === 'face'" class="left-content">
          <div class="item">
            <span class="label-text">设备名称：</span>
            <span class="value-text">{{ info.deviceName }}</span>
          </div>
          <div class="item">
            <span class="label-text">生产单位：</span>
            <span class="value-text">{{ info.produceUnitName || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">归属单位：</span>
            <span class="value-text">{{ info.belongUnitName || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">数据上传单位：</span>
            <span class="value-text">{{ info.uploadUnit || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人名称：</span>
            <span class="value-text">{{ info.responsorName | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
        </div>

        <div class="right-content" v-if="info && info.typeName === 'face'">
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
        </div>

        <!--重要路线-->
        <div v-if="info && info.typeName === 'connection'" class="left-content">
          <div class="item">
            <span class="label-text">设备名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">路线类型：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人：</span>
            <span class="value-text">{{ info.principal | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">管理单位：</span>
            <span class="value-text">{{ info.gname || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">所属区域：</span>
            <span class="value-text">{{ info.regionName || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">所属区域：</span>
            <span class="value-text">{{ info.regionName || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'connection'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />

          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--重点路口，城市易涝点、交通拥堵点、应急避难场所、危险源-->
        <div v-if="info && info.typeName === 'safe'" class="left-content">
          <div class="item">
            <span class="label-text">名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">类别：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人：</span>
            <span class="value-text">{{ info.principal | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
        </div>

        <div class="right-content" v-if="info && info.typeName === 'safe'">
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--重点防护单位-->
        <div
          v-if="info && info.typeName === 'protectionUnit'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">类别：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">所属区域：</span>
            <span class="value-text">{{ info.name1 || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">行政区域：</span>
            <span class="value-text">{{ info.gname || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人：</span>
            <span class="value-text">{{ info.principal || hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">传真：</span>
            <span class="value-text">{{ info.fax || "-" }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'protectionUnit'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--重点消防单位-->
        <div
          v-if="info && info.typeName === 'fireControl'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">类别：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">防护等级：</span>
            <span class="value-text">{{ info.keyType || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">行政区域：</span>
            <span class="value-text">{{ info.gname || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">描述：</span>
            <span class="value-text">{{ info.remarks || "-" }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'fireControl'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--重点项目-->
        <div
          v-if="info && info.typeName === 'keyProjects'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">类别：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">防护等级：</span>
            <span class="value-text">{{ info.keyType || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">行政区域：</span>
            <span class="value-text">{{ info.gname || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">描述：</span>
            <span class="value-text">{{ info.remarks || "-" }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'keyProjects'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--值守人员-->
        <div
          v-if="info && info.typeName === 'onDutyPerson'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">值守人员：</span>
            <span class="value-text">{{ info.personName }}</span>
          </div>
          <div class="item">
            <span class="label-text">性别：</span>
            <span class="value-text">{{ info.sex || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">年龄：</span>
            <span class="value-text">{{ info.age || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">手机号码：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">所属网格：</span>
            <span class="value-text">{{ info.gridCode || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">单位名称：</span>
            <span class="value-text">{{ info.unitName || "-" }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'onDutyPerson'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--警员-->
        <div v-if="info && info.typeName === 'policeman'" class="left-content">
          <div class="item">
            <span class="label-text">姓名：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">类型：</span>
            <span class="value-text">{{ info.type }}</span>
          </div>
          <div class="item">
            <span class="label-text">警员编号：</span>
            <span class="value-text">{{ info.number }}</span>
          </div>
          <div class="item">
            <span class="label-text">电话：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">工作单位：</span>
            <span class="value-text">{{ info.jobsUnit || "-" }}</span>
          </div>
        </div>

        <div class="right-content" v-if="info && info.typeName === 'policeman'">
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--应急专家-->
        <div
          v-if="info && info.typeName === 'emergencyExpert'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">工作单位：</span>
            <span class="value-text">{{ info.jobsUnit || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">专长：</span>
            <span class="value-text">{{
              info.technologyStrengths || "-"
            }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'emergencyExpert'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--应急物资-->
        <div
          v-if="info && info.typeName === 'emergencySupplies'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">应急物资：</span>
            <span class="value-text">{{ info.name }}</span>
          </div>
          <div class="item">
            <span class="label-text">数量：</span>
            <span class="value-text">{{ info.number || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">管理单位：</span>
            <span class="value-text">{{ info.gname || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人：</span>
            <span class="value-text">{{ info.principal | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">物资类型：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'emergencySupplies'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--应急车辆-->
        <div
          v-if="info && info.typeName === 'emergencyVehicles'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">车牌号：</span>
            <span class="value-text">{{ info.vehicleNumber }}</span>
          </div>
          <div class="item">
            <span class="label-text">车辆类别：</span>
            <span class="value-text">{{ info.type || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">品牌：</span>
            <span class="value-text">{{ info.brand || "-" }}</span>
          </div>
        </div>
        <div
          class="right-content"
          v-if="info && info.typeName === 'emergencyVehicles'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>

        <!--应急队伍-->
        <div
          v-if="info && info.typeName === 'meetAnEmergency'"
          class="left-content"
        >
          <div class="item">
            <span class="label-text">队伍名称：</span>
            <span class="value-text">{{ info.name | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人：</span>
            <span class="value-text">{{ info.principal | hideName }}</span>
          </div>
          <div class="item">
            <span class="label-text">负责人联系方式：</span>
            <span class="value-text">{{ info.phone | hidePhone }}</span>
          </div>
          <div class="item">
            <span class="label-text">所属区域：</span>
            <span class="value-text">{{ info.regionName || "-" }}</span>
          </div>
          <div class="item">
            <span class="label-text">地址：</span>
            <span class="value-text">{{ info.address || "-" }}</span>
          </div>
        </div>

        <div
          class="right-content"
          v-if="info && info.typeName === 'meetAnEmergency'"
        >
          <img
            :src="needImg(info.photoUrl)"
            style="height:138px;width:110px;"
          />
          <div class="look-trajectory" @click="openVideo(info.deviceId)">
            查看视频
          </div>
        </div>
      </div>

      <BatchVideoPlay
        :visible.sync="videoModal.visible"
        :info="videoModal.info"
      ></BatchVideoPlay>
    </div>
  </transition>
</template>

<script>
import BatchVideoPlay from '@/components/BatchVideoPlay'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    }
  },
  components: {
    BatchVideoPlay
  },
  data() {
    return {
      videoModal: {
        visible: false,
        info: null
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:visible', false)
    },
    needImg(photoUrl) {
      if (photoUrl) {
        return photoUrl
      } else {
        return require('@/assets/image/KeyThrong/no-avatar.png')
      }
    },
    openVideo(deviceIds) {
      if (!deviceIds) {
        this.$message.warning('暂无关联的视频资源')
        return
      }
      this.videoModal.visible = true
      this.videoModal.info = {
        cameraIndexCode: deviceIds
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.modal-container {
  width: 686px;
  height: 252px;
  background: url("~@/assets/image/KeyThrong/details-bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 9999;

  .modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    cursor: pointer;
  }

  .modal-content {
    display: flex;
    padding: 15px;
    .left-content {
      color: #fff;
      display: flex;
      flex-wrap: wrap;
      flex: 0 0 77%;
      align-self: flex-start;
      .item {
        flex: 0 0 50%;
        margin-top: 10px;
        .value-text {
          color: #01aae5;
        }
      }
    }

    .look-trajectory {
      width: 110px;
      height: 28px;
      line-height: 28px;
      background: rgba(3, 35, 63, 0.2);
      border: 1px solid rgba(1, 170, 229, 1);
      border-radius: 20px;
      text-align: center;
      color: #17cbf8;
      margin-top: 20px;
      cursor: pointer;
    }
  }
}
</style>
