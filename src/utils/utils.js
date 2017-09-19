export function scrollTo(x = 0, y = 0, flag = true) {
  if (!flag) {
    window.scrollTo(x, y);
    return;
  }
  const animation = () => {
    const scrollY = window.scrollY;
    if (scrollY <= y) { return; }
    window.scrollTo(x, scrollY - 50);
    requestAnimationFrame(animation);
  };
  requestAnimationFrame(animation);
}
