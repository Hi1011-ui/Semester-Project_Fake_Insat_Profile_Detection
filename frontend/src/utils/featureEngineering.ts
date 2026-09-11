export function usernameNumericRatio(username: string): number {
  if (!username) return 0;
  const digitCount = usernameDigitCount(username);
  return digitCount / username.length;
}

export function usernameDigitCount(username: string): number {
  if (!username) return 0;
  const matches = username.match(/\d/g);
  return matches ? matches.length : 0;
}

export function fullnameWordCount(fullname: string): number {
  if (!fullname) return 0;
  return fullname.trim().split(/\s+/).length;
}

export function fullnameNumericRatio(fullname: string): number {
  if (!fullname) return 0;
  const matches = fullname.match(/\d/g);
  const digitCount = matches ? matches.length : 0;
  return digitCount / fullname.length;
}

export function nameEqualsUsername(fullname: string, username: string): boolean {
  if (!fullname || !username) return false;
  return fullname.trim().toLowerCase() === username.trim().toLowerCase();
}

export function descriptionLength(bio: string): number {
  if (!bio) return 0;
  return bio.length;
}
