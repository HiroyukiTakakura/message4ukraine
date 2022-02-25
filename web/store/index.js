const initSchema = ()=>{
  return {
    version: 1, // このスキームのバージョン
    error: false,
    isMatchedProject: false,
    coin: 0,
    flag: 0,
    coupon: [],
    quizList: [],
    enqueteList: [],
    quiz: {},
    enquete: {},
    cleared: {},
    enqueteCleared: {},
    scores: {},
    answer: {},
    project_id: "",
    updated_at: (d=>{
      return +`${d.getFullYear()}${("00"+(d.getMonth()+1)).slice(-2)}${d.getDate()}`
    })( new Date() ),
    reelImages: {
      reel_01: null, reel_02: null, reel_03: null
    },
    reelYPos: {
      reel_01: 0, reel_02: 0, reel_03: 0
    },
    reelAnimationTime: {
      reel_01a: 0, reel_02: 0, reel_03: 0
    }
  }
}

export const state = () => initSchema()
export const mutations = {

    // project_introduction(state, project_introduction) {
    //   state.project_introduction = project_introduction
    // },

    // use_coupon(state, bool) {
    //   state.use_coupon = bool
    // },

    // use_quiz(state, bool) {
    //   state.use_quiz = bool
    // },

    project_policy(state, project_policy) {
      state.project_policy = project_policy
    },

    error(state, bool) {
      state.error = bool
    },

    reelImages(state, { key, src }) {
      state.reelImages[key] = src
    },

    reelYPos(state, { key, y }) {
      state.reelYPos[key] = y
    },

    reelAnimationTime(state, { key, second }) {
      state.reelAnimationTime[key] = second
    },

    isMatchedProject(state, bool) {
      state.isMatchedProject = bool
    },

    coin(state, { coin }) {
      state.coin += coin
    },

    flag(state, { flag }) {
      state.flag += flag
    },

    scores(state, scores) {
      state.scores = scores
    },

    answer(state, { q_id, value }) {
      state.answer[q_id] = value
    },

    addCoupon(state, { coupon_id, expired_at }) {
      state.coupon.push({
        coupon_id, expired_at
      })
    },

    removeCoupon(state, { coupon_id }) {
      state.coupon = state.coupon.filter(_=>_.coupon_id !== coupon_id)
    },

    enqueteCleared(state, { enquete_id, time }){
      state.enqueteCleared[enquete_id] = time
    },

    resetEnqueteCleared(state, { enquete_id }){
      delete state.cleared[enquete_id]
    },

    cleared(state, { quiz_id, time }){
      state.cleared[quiz_id] = time
    },

    resetCleared(state, { quiz_id }){
      delete state.cleared[quiz_id]
    },

    reset(state){
      state = Object.assign(state,initSchema())
    },

    enquete(state,enquete){
      state.enquete = enquete
    },

    quiz(state,quiz){
      state.quiz = quiz
    },

    enqueteList(state,enqueteList){
      state.enqueteList = enqueteList
    },

    quizList(state,quizList){
      state.quizList = quizList
    },

    enqueteAnswer(state,{ q_id, value }){
      if(!Array.isArray(state.enquete.questions)) return false
      const q = state.enquete.questions.find(_=>_.q_id === q_id)
      q.value = value
    },

    correctness(state,{ correctness }){
      state.quiz?.questions.forEach((c,i)=>c.correct = correctness[i])
    },

    project_id(state,{ project_id }){
      state.project_id = project_id
    }

}

export const actions = {
  nuxtClientInit({ commit },{ route }){
    commit("project_id",{ project_id: route.query.project_id })
  }
}
