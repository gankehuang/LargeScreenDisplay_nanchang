<template>
  <div
    v-if="visible"
    class="modal"
  >
    <img
      class="btn-close"
      src="@/assets/image/common/close-btn.png"
      @click="bindBtnClose"
    >
    <div class="player-container">
      <HKVideoPlay
        v-if="info"
        :camera-index-code="info.cameraIndexCode"
        layout="2x2"
      />
    </div>
  </div>
</template>

<script>
import HKVideoPlay from '@/components/HKVideoPlay'

export default {
  components: {
    HKVideoPlay
  },
  props: {
    info: Object,
    visible: Boolean
  },
  data () {
    return {}
  },
  watch: {
    info () {
      console.log(this.info.cameraIndexCode)
    }
  },
  mounted () {},
  methods: {
    bindBtnClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/image/KeyThrong/modal-bg1.png") no-repeat;
  background-size: contain;
  width: 700px; /*播放容器的宽和高设定*/
  height: 490px;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 12px 7px 6px 6px;

  .btn-close {
    position: absolute;
    top: 12px;
    right: 27px;
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
      // .ani();
    }
  }

  .player-container {
    margin-top: 20px;
    width: 100%;
    height: 428px;
    padding: 10px;
  }

  .video-box {
    padding: 10px;
    height: 476px;
    border: 1px solid #0b61a0;

    .header {
      position: relative;

      .controll-icon {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }

      .bayonet-name {
        color: #00a0e9;
        padding-left: 10px;
        font-size: 12px;
      }

      .toggle-icon {
        position: absolute;
        right: 10px;
        top: 2px;
        width: 14px;
        height: 14px;
        cursor: pointer;
      }

      .toggle-list {
        position: absolute;
        z-index: 99;
        right: 18px;
        top: 30px;
        color: #fff;
        // .ani();

        .toggle-item {
          font-size: 12px;
          background: rgba(3, 34, 60, 0.8);
          border-radius: 3px;
          margin-top: 10px;
          padding: 6px;
          cursor: pointer;

          &.active {
            color: #00a0e9;
          }
        }
      }
    }
  }
}
</style>
