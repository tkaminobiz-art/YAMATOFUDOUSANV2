import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  aspectMobile?: string;
  aspectDesktop?: string;
  priority?: boolean;
};

export default function PhotoBreath({
  src,
  alt,
  aspectMobile = "aspect-[4/5]",
  aspectDesktop = "md:aspect-[21/9]",
  priority = false,
}: Props) {
  return (
    <section aria-hidden={false} className="relative bg-white">
      <div className={`relative w-full ${aspectMobile} ${aspectDesktop}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
