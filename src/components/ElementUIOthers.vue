<template>
  <div>
    <el-transfer v-model="value1" :data="data1"></el-transfer>
    <hr>
    <el-transfer filterable :left-default-checked="[2, 3]" :right-default-checked="[1]"
                 :filter-method="filterMethod" :render-content="renderFunc" :button-texts="['到左边', '到右边']"
                 filter-placeholder="请输入城市拼音" v-model="value" :data="transformData" :titles="['左边列表' ,'右边列表']"
                 :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}' }"
                 @change="handleChange" :props="{ key: 'k', label: 'n'}">
      <el-button slot="left-footer" size="small">操作</el-button>
      <el-button slot="right-footer" size="small">操作</el-button>
    </el-transfer>
  </div>

</template>

<script type="text/jsx">
    export default {
      name: "ElementUIOthers",
      data() {
        const generateData1 = () => {
          const data1 = [];
          for (let i = 1; i <= 15; i++) {
            data1.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data1;
        };

        const generateData2 = _ => {
          const data2 = [];
          const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
          const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
          cities.forEach((city, index) => {
            data2.push({
              n: city,
              k: index,
              disabled: false,
              pinyin: pinyin[index]
            });
          });
          return data2;
        };

        return {
          data1: generateData1(),
          value1: [1, 4],
          transformData: generateData2(),
          value: [], // 存放右侧数据
          filterMethod(query, item) {
            return item.pinyin.indexOf(query) > -1;
          },
          renderFunc(h, option) {
            // jsx 语法
            // return <span>{ option.k } - { option.n } - { option.pinyin }</span>;
            return <span>{ option.n } - { option.pinyin }</span>;
          }
        }
      },
      methods: {
        // 右侧列表元素变化时触发
        // 当前值、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组
        handleChange(value, direction, movedKeys) {
          console.log(value, direction, movedKeys);
        }
      }
    }
</script>

<style scoped>

</style>
