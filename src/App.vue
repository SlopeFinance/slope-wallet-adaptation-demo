<template>
  <div id="app">
    <div v-if="!initing" style="margin-top: 10px">
      <div class="box">
        <m-button type="primary" @click="connect" :loading="connectLoading">connect</m-button>
        <ul class="content">
          <div class="label-title">connect result：</div>
          <div v-show="connectedResult">
            {
            <li v-for="(value, key, index) in connectedResult" :key="'connectedResult' + index">
              <span>{{ key }}：</span>
              <span v-if="typeof value !== 'object'">{{ typeof value === 'string' ? `"${value}"` : value }}</span>
              <span v-else-if="Object.keys(value).length < 1">{}</span>
              <div
                v-else
                v-for="(vall, ke, ix) in value"
                :key="ke + ix"
                class="text-indent"
              >
                {{ ke }}：
                {{
                  typeof vall === 'string' ? `"${vall}"` : vall
                }}
              </div>
            </li>
            }
          </div>
        </ul>
      </div>
      <div class="box">
        <m-button
          type="primary"
          @click="signTransaction"
          :loading="signLoading"
          >signTransaction</m-button
        >
        <ul class="content">
          <div class="label-title">signature result：</div>
          <div v-show="signatureResult">
            {
            <li v-for="(value, key, index) in signatureResult" :key="'signatureResult' + index">
              <span>{{ key }}：</span>
              <span v-if="typeof value !== 'object'">
                {{
                  typeof value === 'string' ? `"` + value + `"` : value
                }}
              </span>
              <span v-else-if="Object.keys(value).length < 1">{}</span>
              <div
                v-else
                v-for="(vall, ke, ix) in value"
                :key="ke + ix"
                class="text-indent"
              >
                {{ ke }}：
                {{
                  typeof vall === 'string' ? `"` + vall + `"` : vall
                }}
              </div>
            </li>
            }
          </div>
        </ul>
      </div>
      <div class="box">
        <m-button
          type="primary"
          @click="signAllTransaction"
          :loading="signsLoading"
          >signAllTransactions</m-button
        >
        <ul class="content">
          <div class="label-title">signatures result：</div>
          <div v-show="signaturesResult">
            {
            <li
              v-for="(value, key, index) in signaturesResult"
              :key="'signaturesResult' + index"
            >
              <span>{{ key }}：</span>
              <span v-if="typeof value !== 'object'">{{
                typeof value === 'string' ? `"` + value + `"` : value
              }}</span>
              <span v-else-if="Object.keys(value).length < 1">{}</span>
              <div
                v-else
                v-for="(vall, ke, ix) in value"
                :key="ke + ix"
                class="text-indent"
              >
                {{ ke }}：
                {{
                  typeof vall === 'string' ? `"` + vall + `"` : vall
                }}
              </div>
            </li>
            }
          </div>
        </ul>
      </div>
      <div class="box">
        <m-button
          type="primary"
          @click="disconnect"
          :loading="disconnectLoading"
          >disconnect</m-button
        >
        <ul class="content">
          <div class="label-title">disconnect result：</div>
          <div v-show="disconnectedResult">
            {
            <li
              v-for="(value, key, index) in disconnectedResult"
              :key="'disconnectedResult' + index"
            >
              <span>{{ key }}：</span>
              <span>{{
                typeof value === 'string' ? `"` + value + `"` : value
              }}</span>
            </li>
            }
          </div>
        </ul>
      </div>
      <m-button
        type="default"
        block
        @click="clear"
        :loading="disconnectLoading"
        class="clear-btn"
        >Clear log</m-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      connectedResult: null,
      signatureResult: null,
      signaturesResult: null,
      disconnectedResult: null,
      connectLoading: false,
      signLoading: false,
      signsLoading: false,
      disconnectLoading: false,
      initing: true,
      slope: null,
      hasSlope: false
    }
  },
  created () {
    window.onload = () => {
      this.initing = false
      if (window.Slope) {
        this.slope = new window.Slope()
        this.hasSlope = true
      }
    }
  },
  methods: {
    async connect () {
      if (!this.checkSlope()) return

      this.connectLoading = true
      const rp = await this.slope.connect()
      this.connectLoading = false

      console.log('this.connectedResult', rp)
      this.connectedResult = Object.assign({}, JSON.parse(JSON.stringify(rp)))
    },

    async signTransaction () {
      if (!this.checkSlope()) return

      this.signLoading = true
      this.signatureResult = ''
      const rp = await this.slope.signTransaction(
        'vXLpVi2MoyB5iMQtriNPB4ejdvrV3zRVdAKwmBR431w446dtnft1KzB5DrCu7CSRgKmYkFEAw4TjYsFTpP3LgHVvM6PxPDGmLGQbDubho2ZTMyxyjqEJ9vSqwFrGzMhLyM6u1tPP24ZfRGkaQrfKwQETFbAC7u16Dz8wqZw8qbKDKvnQNuTbD5zomjYNXDToxT7ie9QvYAaJ5jCbKj4LyzEXD8xoU3N3JEEFdsyiEzGnzEwzJsE4Lp7gprYHL56JsUYJHUC5m2c3TEadbYUAVavLqmnHj9suAsCjztbsty8GGk92WNp984PY69Q3iPQA1iHELqT2FApBA2WvA5Uv3ZMPYbDyofiNjy9cwYepY8KsXfDBsNW7kmLzGhkSjPHfFeT6w1wQMAQUhg4ZMG62tdRqW7U3E7PWK9LN5b1Bhdxp7D21DZEcTrbg3msgCXNvNSnLWkMndCZSumjLYVho6H98UoXxHdhPsaCMRptF3yE5fuj8rnbQZumaG8m6Sk1XYL8JsUbQqygVRtn2P9s2dTeMypuhvnKjt9j2Cf4UKVpg4pG1htMeg6ZXvKa6otyWa1YM63QAKRYxibiYAi4F4iHPSAd8ShihFFF3NbvsX6ArvG5DuyzJZP9XsNYzAVAy4Wr1GkvUxGHEu9z2CPb8adFxpsLqU1bvv2kpbzqhXRQ28W1HRN5F8JjdgR9P8Jh2jXeNmtiEQ4Tyc5j5rK9MsrM8SELpXwDH7D2ku25t6ggcucnEbQLfVLdGc8fvWS1Qo9bfCen2HixQhvCMi45cHTU9qwmQkmuC2XEbtcksuuBThdfJKCpSHGAFgvqFpygdBDS6BaJn5HTSsL9i63LBpMqavJ2uv4gEnYamEYDhFRav5pToMeoiVBPxCCawYoWYcwdJRCnFJrUYH9VmHVJWyetymiLFMBLoaSYAa7yvnoST1sCfcZwEv3ixWdWpEfqGaPHetvYFEagYHXERizeEiDdhbaxYUA627g5RXtgK4UjoCoX3e7DijRWkViduYSwZfzkYUKJekYQBYufTrDeTgGvmNct4JqMg5CvJRzYG4Rpe3XTpbnJzG9VW3KaxfbERVeSqGQHTwdcLuSVqckYv1tekvnzo31ZxfdkyZL9oXNpfpJGZrnpz3M3Hq5hxYyM94X3eQhFtt'
      )
      this.signLoading = false

      console.log('this.signatureResult: ', rp)
      this.signatureResult = Object.assign({}, JSON.parse(JSON.stringify(rp)))
    },

    async signAllTransaction () {
      if (!this.checkSlope()) return

      this.signsLoading = true
      this.signaturesResult = ''
      const rp = await this.slope.signAllTransactions([
        'C66kFg2Hd1oYcHVubykk9L1ATLxT7zzYNBmKDFC4WwCFJby6Eat8uqvKteZ4uHsHgysgRJo1RpdcZjzwG9gxhQTRsZBuLj2SPPSBCKYwjedh4YBasbLZ23Rx9y1h9sV6WFg4n7RKBEiFJuLa65TXpkeVZbdBE1zzBj2EmeNHdWVwk1QLxb9deCtG4p3vcnjhoAVs7tvYVLEudaUdE11URUggTVtyPdSMnvVhbVkvLGS2YfW9AwHjCyonxisPkaAUx52VkfmjeA9ufJH9431SfJQU4bp6NPRUGCytskneieSMBFjZ35XrUL2Hsr13gR8FTL46xdTE95ynqkQcPG6QmsMfL8uq89mt2DeDmagS3VfKsDSwXMmGAsYpGw5pEQnhoZPGiET8hmBs7B1sMfYtgSyerBCY17fa7ALyYjEr1PdSpT8RdVG1Gk4ejhsEhzqgLceAFaop26Zv9D',
        'NiCDnkt1cGKenoTMoFehiqGPGVGJrGZxtx1s16JfJgdeTmaukpBfybmtAcNbr7PMwEtjmNKAMKCCqj8Yi4V6a1i4NYRymuLNrdni8CX73vkhDD1ESy42Hr2d4Ek7VyUJYEnjuq7JtAVFr23YVmA2MU58RK9MWTfJe2hcyWVYmfeN1ZgxZfM2R9BiMVvKM1skCBDVtYYd6GUac83YhYoYReez6yAwGEedWW8UD5exUTbuDWCDCdH6FszDZbxpZrb4berz61yJSYSgB8NDoYeyNfY9wgiJ1rVXbwP8XF4akGQBHHL3JgRj3y7s92jBmyFuHM3fXaTi'
      ])
      this.signsLoading = false

      console.log('this.signaturesResult: ', this.rp)
      this.signaturesResult = Object.assign({}, JSON.parse(JSON.stringify(rp)))
    },

    async disconnect () {
      if (!this.checkSlope()) return

      this.disconnectLoading = true
      const rp = await this.slope.disconnect()
      this.disconnectLoading = false

      console.log('this.disconnectedResult: ', rp)
      this.disconnectedResult = Object.assign(
        {},
        JSON.parse(JSON.stringify(rp))
      )

      this.connectedResult = ''
      this.signatureResult = ''
      this.signaturesResult = ''
    },

    checkSlope () {
      if (!this.hasSlope) {
        window.open('https://www.slope.finance/#/wallet')
        return false
      } else {
        return true
      }
    },

    clear () {
      this.connectedResult = ''
      this.signatureResult = ''
      this.signaturesResult = ''
      this.disconnectedResult = ''
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}
.box {
  margin-bottom: 10px;
  width: 100%;
  .van-button {
    height: 40px;
  }
  .van-button--primary {
    line-height: 40px;
    background: #6e66fa;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    border: none;
  }
  .van-button--danger {
    line-height: 40px;
    background: #f7f8fa;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    color: #919499;
    border: none;
  }
}
.content {
  width: calc(100% - 20px);
  border: 1px solid #f3f3f5;
  min-height: 120px;
  line-height: 20px;
  color: #323233;
  font-size: 14px;
  padding: 8px 10px;
  margin-right: 10px;
  background-color: #f7f8fa;
  border-radius: 14px;
  word-wrap: break-word;
  margin-top: 10px;
}
.text-indent {
  padding-left: 12px;
}
.label-title {
  font-size: 14px;
  font-weight: bold;
  color: #292c33;
}
.van-button.clear-btn{
  border-radius: 10px;
}
</style>
