import { type ImgHTMLAttributes } from "react";

interface ImageWithBasePathProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const ImageWithBasePath = ({ src, className, alt, height, width, id, onError, onClick, style, ...otherProps }: ImageWithBasePathProps) => {
  // Vite uses import.meta.env.BASE_URL for public path
  const publicUrl = import.meta.env.BASE_URL || "/id/";
  const prefix = publicUrl.endsWith('/') ? publicUrl : publicUrl + '/';
  
  const isAbsoluteUrl =
    typeof src === "string" &&
    (src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("data:"));
      
  const fullSrc = isAbsoluteUrl
    ? src
    : src.startsWith("/")
    ? `${publicUrl}${src.substring(1)}`
    : `${prefix}${src}`;

  return (
    <img
      className={className}
      src={fullSrc}
      height={height}
      alt={alt}
      width={width}
      id={id}
      onError={onError}
      onClick={onClick}
      style={style}
      {...otherProps}
    />
  );
};

export default ImageWithBasePath;
