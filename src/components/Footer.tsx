export default function Footer() {
  return (
    <footer className="bg-text-primary py-10">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)] text-center">
        <p
          className="text-white/40 text-xs tracking-wider"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          &copy; {new Date().getFullYear()} Yamato Fudousan Co., Ltd.
        </p>
      </div>
    </footer>
  );
}
