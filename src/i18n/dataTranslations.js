/**
 * 数据字段英文映射
 * 用于将声优/角色数据中的日文/中文值翻译为英文
 * 与 i18n 上下文配合使用
 */

// 角色/队伍定位映射
export const roleEnMap = {
  'センター（中心）': 'Center',
  '元生徒会長': 'Former Student Council President',
  '衣装担当': 'Costume Designer',
  '作詞・振付担当': 'Lyrics & Choreography',
  'パワーアップ担当': 'Power-Up',
  '作曲担当': 'Composer',
  '応援担当': 'Cheerleader',
  'アイドル研究部部長': 'Idol Research Club President',
  '副生徒会長': 'Vice Student Council President',
  '作曲・ピアノ担当': 'Composer & Piano',
  'ダイビングショップ看板娘': 'Diving Shop Poster Girl',
  '生徒会長': 'Student Council President',
  '水泳部・衣装担当': 'Swimming Club & Costume',
  '堕天使ヨハネ': 'Fallen Angel Yohane',
  '図書委員': 'Library Committee',
  'ダイヤの妹': "Dia's Younger Sister",
  '理事長娘': "Chairman's Daughter",
}

// 出身地映射（保留日本地名的罗马音常见写法）
export const birthplaceEnMap = {
  '東京都': 'Tokyo',
  '静岡県': 'Shizuoka',
  '群馬県': 'Gunma',
  '埼玉県': 'Saitama',
  '神奈川県': 'Kanagawa',
  '栃木県': 'Tochigi',
  '北海道': 'Hokkaido',
  '兵庫県': 'Hyogo',
  '愛知県': 'Aichi',
}

// 学校映射
export const schoolEnMap = {
  '音乃木坂学院': 'Otonokizaka High School',
  '浦之星女学院': 'Uranohoshi Girls\' High School',
}

// 年级映射
export const gradeEnMap = {
  '1年生': '1st Year',
  '2年生': '2nd Year',
  '3年生': '3rd Year',
}

// 颜色名映射
export const colorNameEnMap = {
  '粉色': 'Pink',
  '水蓝色': 'Aqua Blue',
  '橙色': 'Orange',
  '蓝色': 'Blue',
  '黄色': 'Yellow',
  '水色': 'Light Blue',
  '绿色': 'Green',
  '翠色': 'Emerald',
  '赤色': 'Red',
  '紫色': 'Purple',
  '蜜柑色': 'Mikan Orange',
  '樱花色': 'Sakura Pink',
  '碧色': 'Turquoise',
  '白银色': 'Silver',
}

/**
 * 通用映射取值函数
 * @param {object} map - 映射表
 * @param {string} value - 原始值
 * @returns {string} 英文值，找不到则返回原值
 */
function getEnValue(map, value) {
  if (!value) return value
  return map[value] ?? value
}

/**
 * 获取英文角色/队伍定位
 * @param {string} role
 * @returns {string}
 */
export function getRoleEn(role) {
  return getEnValue(roleEnMap, role)
}

/**
 * 获取英文出身地
 * @param {string} birthplace
 * @returns {string}
 */
export function getBirthplaceEn(birthplace) {
  return getEnValue(birthplaceEnMap, birthplace)
}

/**
 * 获取英文学校名
 * @param {string} school
 * @returns {string}
 */
export function getSchoolEn(school) {
  return getEnValue(schoolEnMap, school)
}

/**
 * 获取英文年级
 * @param {string} grade
 * @returns {string}
 */
export function getGradeEn(grade) {
  return getEnValue(gradeEnMap, grade)
}

/**
 * 获取英文颜色名
 * @param {string} colorName
 * @returns {string}
 */
export function getColorNameEn(colorName) {
  return getEnValue(colorNameEnMap, colorName)
}
