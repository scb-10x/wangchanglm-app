import { useCallback } from 'react'

export enum EventNames {
  CLICK_GENERATE = 'click_generate',
  CLICK_GITHUB_REPO = 'click_github_repo',
  SELECT_EXAMPLE = 'select_example',
}

export const Events = {
  [EventNames.CLICK_GENERATE]: ({ page = undefined }) => ({
    page: page,
  }),
  [EventNames.CLICK_GITHUB_REPO]: ({ page = undefined, repo = undefined }) => ({
    page: page,
    repo: repo,
  }),
  [EventNames.SELECT_EXAMPLE]: ({ page = undefined, option = undefined }) => ({
    page: page,
    option: option,
  }),
}

export enum PageLocations {
  HOME = 'home',
}

export const useGTM = () => {
  const track = useCallback((eventName: EventNames, eventParams: any) => {
    try {
      const params = eventParams ? Events[eventName](eventParams) : {}

      const { dataLayer } = window

      dataLayer.push({
        event: eventName,
        ...params,
      })
    } catch (err) {}
  }, [])

  return {
    track,
  }
}
