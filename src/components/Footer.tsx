export default function Footer() {
  return (
    <footer className="bg-text-primary py-10">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
        {/* SNS リンク */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://instagram.com/yamatonoie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-xs hover:text-white/80 transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@yamatofudosan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-xs hover:text-white/80 transition-colors"
          >
            TikTok
          </a>
          <a
            href="https://www.youtube.com/@user-ed2cw4tx9o"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-xs hover:text-white/80 transition-colors"
          >
            YouTube
          </a>
        </div>

        <p
          className="text-white/40 text-xs tracking-wider text-center"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          &copy; {new Date().getFullYear()} Yamato Fudousan Co., Ltd.
        </p>
      </div>
    </footer>
  );
}
