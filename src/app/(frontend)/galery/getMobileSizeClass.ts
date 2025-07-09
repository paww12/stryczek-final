export const getMobileSizeClass = (i: number) => {
  const pattern = [
    'col-span-2 row-span-1 h-64',
    'col-span-1 row-span-2 h-[34rem]',
    'col-span-2 row-span-1 h-64',
    'col-span-1 row-span-1 h-64',
    'col-span-2 row-span-1 h-64',
  ]
  return pattern[i % pattern.length]
}