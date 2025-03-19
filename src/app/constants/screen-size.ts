export enum ScreenSize {
  mobile,
  tablet,
  desktopSmall,
  desktop1,
  desktop2,
  desktop3,
  desktopWide
}

export const BREAKPOINTS: Record<ScreenSize, string> = {
  [ScreenSize.mobile]: '(max-width: 599px)',
  [ScreenSize.tablet]: '(min-width: 600px) and (max-width: 899px)',
  [ScreenSize.desktopSmall]: '(min-width: 900px) and (max-width: 1199px)',
  [ScreenSize.desktop1]: '(min-width: 1200px) and (max-width: 1349px)',
  [ScreenSize.desktop2]: '(min-width: 1350px) and (max-width: 1659px)',
  [ScreenSize.desktop3]: '(min-width: 1660px) and (max-width: 1849px)',
  [ScreenSize.desktopWide]: '(min-width: 1850px)'
}
