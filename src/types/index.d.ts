declare global {
  interface Window {
    dataLayer?: any
  }
}

export const gtmVirtualPageView = (rest) => {
  window.dataLayer?.push({
    event: 'VirtualPageView',
    ...rest,
  })
}
