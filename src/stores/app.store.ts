import { IAIGenerate } from '@/interfaces/ai-generate.interface'
import { Vote } from '@/service/feedback.service'
import { create } from 'zustand'

type StoreType = {
  visibleMenu: boolean
  setVisibleMenu: (data: boolean) => void
  visibleFeedback: boolean
  setVisibleFeedback: (data: boolean) => void
  visibleReport: boolean
  setVisibleReport: (data: boolean) => void
  visibleFeedbackSuccess: boolean
  setVisibleFeedbackSuccess: (data: boolean) => void
  visibleReportSuccess: boolean
  setVisibleReportSuccess: (data: boolean) => void
  successFeedback: boolean
  setSuccessFeedback: (data: boolean) => void
  successReport: boolean
  setSuccessReport: (data: boolean) => void
  vote: undefined | Vote
  setVote: (data: undefined | Vote) => void
  voteReport: undefined | Vote
  setVoteReport: (data: undefined | Vote) => void
  result: undefined | IAIGenerate
  setResult: (data: undefined | IAIGenerate) => void
  visibleDisclaimer: boolean
  setVisibleDisclaimer: (data: boolean) => void
  clearStore: () => void
}

const initialState = {
  visibleMenu: false,
  visibleFeedback: false,
  visibleFeedbackSuccess: false,
  visibleReport: false,
  visibleReportSuccess: false,
  successFeedback: false,
  successReport: false,
  vote: undefined,
  voteReport: undefined,
  result: undefined,
  visibleDisclaimer: false,
}

export const appStore = create<StoreType>((set, get) => ({
  ...initialState,
  setVisibleMenu: (data) => set({ visibleMenu: data }),
  setVisibleFeedback: (data) => set({ visibleFeedback: data }),
  setVisibleFeedbackSuccess: (data) => set({ visibleFeedbackSuccess: data }),
  setVisibleReport: (data) => set({ visibleReport: data }),
  setVisibleReportSuccess: (data) => set({ visibleReportSuccess: data }),
  setSuccessFeedback: (data) => set({ successFeedback: data }),
  setSuccessReport: (data) => set({ successReport: data }),
  setVote: (data) => set({ vote: data }),
  setVoteReport: (data) => set({ voteReport: data }),
  setResult: (data) => set({ result: data }),
  setVisibleDisclaimer: (data) => set({ visibleDisclaimer: data }),
  clearStore: () => set({ ...initialState }),
}))
