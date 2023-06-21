export const MP4_SRC = {
  default: 'http://tbvideo.ixiaochuan.cn/zyvd/82/10/658d-d8f8-11ed-9d34-00163e02c2d6',
  award: 'http://tbvideo.ixiaochuan.cn/zyvd/85/4a/b48f-d8f8-11ed-81d8-00163e020689'
}

export enum MATCH_STATUS {
  prepare = 0, // 准备阶段
  betting = 1, // 投注阶段
  lottery = 2, // 开奖阶段
  show = 3, // 公示阶段
  awarding = 4, // 发奖阶段
  end = 5 // 结束阶段
}
