// 使用浏览器本地存储
const LOCAL_STORAGE=window.localStorage;

// 从本地存储获取数据
function getItemFromLocalStorage(key){
  // 获取数据后：利用JSON.parse将字符串转换成对象
  return JSON.parse(LOCAL_STORAGE.getItem(key))
}

// 保存数据到本地 第一个参数是保存的变量名，第二个是赋给变量的值
function setItemToLocalStorage(key, val){
  // 存储数据前：利用JSON.stringify将对象转换成字符串
  LOCAL_STORAGE.setItem(key, JSON.stringify(val))
}

// 从本地存储删除某个已保存的数据
function removeItemFromLocalStorage(key){
  LOCAL_STORAGE.removeItem(key)
}

// 清除所有保存的数据
function clearAllItemFromLocalStorage(){
  LOCAL_STORAGE.clear();
}

export default {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  removeItemFromLocalStorage,
  clearAllItemFromLocalStorage
}
