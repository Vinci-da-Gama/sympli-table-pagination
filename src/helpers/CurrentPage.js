export const getCurrentPageNum = (previous, next) =>
  !previous
    ? 1
    : !next
    ? Number(previous.split("=").pop()) + 1
    : Number(next.split("=").pop()) - 1;
