export function withImageSwap(Component, props) {
  const { src, alt, ...restProps } = props;
  const primaryImageSrc = src;
  const secondaryImageSrc = src.replace(".jpg", "-hover.jpg");

  return Component({
    ...restProps,
    src: primaryImageSrc,
    alt: alt,
    class: `w-full h-full object-cover ${props.class} `,
    "data-primary": primaryImageSrc,
    "data-secondary": secondaryImageSrc,
    onmouseover: swapImage,
    onmouseout: swapImage,
  });
}

function swapImage(event) {
  const image = event.target;
  const primaryImage = image.getAttribute("data-primary");
  const secondaryImage = image.getAttribute("data-secondary");
  image.src = event.type === "mouseover" ? secondaryImage : primaryImage;
}
