<template>
  <el-cascader
    ref="elcascader"
    :key="isResouceShow"
    v-bind="$attrs"
    :value="value"
    :placeholder="placeholder"
    :options="cascaderData"
    :clearable="true"
    :show-all-levels="showalllevels"
    :props="{
      value: 'id',
      label: 'name',
      children: 'cities'
    }"
    v-on="$listeners"
    @expand-change="handleItemChange"
  />
</template>
<script>
export default {
  inheritAttrs: true,
  props: {
    lvl: {
      type: [String, Number],
      default: 4
    },
    showalllevels: {
      type: [Boolean, String],
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择省市区镇'
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      cascaderData: [],
      isResouceShow: 0 // 声明key值从新渲染地址组件
    }
  },
  watch: {
    value(newval, oldval) {
      this.getFirstNodes(newval)
    }
  },
  mounted() {
    if (this.value && this.value.length > 0) {
      this.getFirstNodes(this.value)
    } else {
      this.getNodes()
    }
  },
  methods: {
    getFirstNodes(value) {
      const [prvnName = '', cityName = '', dstrName = ''] = value
      this.$store.dispatch('admnarea/getFirst', { prvnName: prvnName, cityName: cityName, dstrName: dstrName, lvl: this.lvl }).then(reulst => {
        this.isResouceShow++
        this.cascaderData = reulst
      })
    },

    getNodes(val) {
      let sizeArea = 0
      if (!val) {
        sizeArea = 0
      } else if (val.length === 1) {
        sizeArea = val.length
      } else if (val.length === 2) {
        sizeArea = val.length
      } else if (val.length === 3) {
        sizeArea = val.length
      }
      if (sizeArea === 0 && this.lvl > sizeArea) {
        this.$store.dispatch('admnarea/getprvn').then(result => {
          this.cascaderData = result.map((value, i) => {
            if (this.lvl > sizeArea + 1) {
              if (!value.endFlag) {
                return {
                  id: value.areaName,
                  name: value.areaName,
                  cities: []
                }
              } else {
                return {
                  id: value.areaName,
                  name: value.areaName
                }
              }
            } else {
              return {
                id: value.areaName,
                name: value.areaName
              }
            }
          })
        })
      } else if (sizeArea === 1 && this.lvl > sizeArea) {
        this.cascaderData.map((value, i) => {
          if (value.id === val[0]) {
            if (!value.cities.length) {
              this.$store.dispatch('admnarea/getcity', { prvnName: val[0] }).then(result => {
                value.cities = result.map((cityvalue, j) => {
                  if (this.lvl > sizeArea + 1) {
                    if (!cityvalue.endFlag) {
                      return {
                        id: cityvalue.areaName,
                        name: cityvalue.areaName,
                        cities: []
                      }
                    } else {
                      return {
                        id: value.areaName,
                        name: value.areaName
                      }
                    }
                  } else {
                    return {
                      id: cityvalue.areaName,
                      name: cityvalue.areaName
                    }
                  }
                })
              })
            }
          }
        })
      } else if (sizeArea === 2 && this.lvl > sizeArea) {
        this.cascaderData.map((value, i) => {
          if (value.id === val[0]) {
            value.cities.map((value, i) => {
              if (value.id === val[1]) {
                if (!value.cities.length) {
                  this.$store.dispatch('admnarea/getdstr', { prvnName: val[0], cityName: val[1] }).then(result => {
                    value.cities = result.map((value, j) => {
                      if (this.lvl > sizeArea + 1) {
                        if (!value.endFlag) {
                          return {
                            id: value.areaName,
                            name: value.areaName,
                            cities: []
                          }
                        } else {
                          return {
                            id: value.areaName,
                            name: value.areaName
                          }
                        }
                      } else {
                        return {
                          id: value.areaName,
                          name: value.areaName
                        }
                      }
                    })
                  })
                }
              }
            })
          }
        })
      } else if (sizeArea === 3 && this.lvl > sizeArea) {
        this.cascaderData.map((value, i) => {
          if (value.id === val[0]) {
            value.cities.map((value, i) => {
              if (value.id === val[1]) {
                value.cities.map((value, i) => {
                  if (value.id === val[2]) {
                    if (value.cities && !value.cities.length) {
                      this.$store.dispatch('admnarea/gettown', { prvnName: val[0], cityName: val[1], dstrName: val[2] }).then(result => {
                        if (result && result.length > 0) {
                          value.cities = result.map((value, j) => {
                            return {
                              id: value.areaName,
                              name: value.areaName
                            }
                          })
                        } else {
                          delete value.cities
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    },
    handleItemChange(val, node) {
      this.getNodes(val)
    }
  }
}
</script>
