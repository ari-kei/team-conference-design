export function convertPostCode(
  postCode: string,
  countryCode?: string
): string {
  switch (countryCode) {
    default:
      return "〒" + postCode.slice(0, 3) + "-" + postCode.slice(3);
  }
}
