/**
 * 根据class获得元素
 * @param {className} class名称
 * @param {tagName} 标签名称
 */
export function test () {
  console.log('test')
}

export function phoneTest (phone) {
  let reg = /^1[13456789]\d{9}$/
  if (!reg.test(phone)) {
    return false
  }
}
