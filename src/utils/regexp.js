export const regexp = {
  // 密码
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z_][A-Za-z_0-9]{4,11}$/,
  // 金额
  money: /(^[1-9](\d{1,5})?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/,
  // 邮箱
  // eslint-disable-next-line no-useless-escape
  email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/,
  // 手机号码
  tel: /^1[3|4|5|6|7|8|9]\d{9}$/,
  // 座机号码
  phone: /\d{3}-?\d{8}|\d{4}-?\d{7}|^400|^800/,
  // url
  // eslint-disable-next-line no-useless-escape
  url: /^(https?):\/\/[\w-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
}
