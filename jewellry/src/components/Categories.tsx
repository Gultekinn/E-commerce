import Link from "next/link";

const Categories = () => {
  return (
    <div className="flex flex-wrap justify-center gap-32 mt-12 ">
      {/* Ring Button */}
      <Link href="/NavPage/Rings">
        <button className="relative group bg-black text-white p-0 rounded-lg shadow-md w-60 h-60 overflow-hidden">
          <img
            src="https://www.apm.mc/cdn/shop/files/A22037OX-1-apm-monaco-meteorites-and-circles-ring.jpg?v=1724399736&width=600"
            alt="Ring"
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-40 group-hover:opacity-70"
          />
        </button>
      </Link>

      {/* Earrings Button */}
      <Link href="/NavPage/Earrings">
        <button className="relative group bg-black text-white p-0 rounded-lg shadow-md w-60 h-60 overflow-hidden">
          <img
            src="https://www.apm.mc/cdn/shop/files/AE16017XKG-apm-monaco-pav-kaa-earrings.jpg?v=1732181066&width=600"
            alt="Earrings"
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-40 group-hover:opacity-70"
          />
        </button>
      </Link>

      {/* Necklaces Button */}
      <Link href="/NavPage/Necklaces">
        <button className="relative group bg-black text-white p-0 rounded-lg shadow-md w-60 h-60 overflow-hidden">
          <img
            src="https://www.apm.mc/cdn/shop/files/AC7810XKGR-apm-monaco-kaa-wrap-around-choker-3.jpg?v=1732180781&width=600"
            alt="Necklaces"
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-40 group-hover:opacity-70"
          />
        </button>
      </Link>

      {/* Bracelets Button */}
      <Link href="/NavPage/Bracelets">
        <button className="relative group bg-black text-white p-0 rounded-lg shadow-md w-60 h-60 overflow-hidden">
          <img
            src="https://www.apm.mc/cdn/shop/files/AB5375XKR-apm-monaco-kaa-double-wrap-around-bangle-1.jpg?v=1732180153&width=600"
            alt="Bracelets"
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-40 group-hover:opacity-70"
          />
        </button>
      </Link>
    </div>
  );
};

export default Categories;
