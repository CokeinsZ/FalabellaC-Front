//atomos
export const CategoriesCardToken = {
  container:
    "flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition",
  image: "w-20 h-20 object-cover rounded-full mb-3",
  title: "text-sm font-medium text-gray-700",
};

export const ProductCardToken = {
  container:
    "border rounded-2xl p-4 flex flex-col items-center bg-white hover:shadow-lg transition-all duration-200 cursor-pointer",
  imageWrapper: "w-36 h-36 relative mb-3",
  image: "object-contain",
  brand: "text-xs text-gray-500",
  name: "text-sm font-medium text-center line-clamp-2",
  pricesWrapper: "mt-2 text-center",
  price: "text-red-600 font-bold block",
  oldPrice: "text-gray-400 line-through text-xs",
  discount: "bg-red-500 text-white text-xs px-2 py-0.5 rounded mt-1",
  ratingWrapper: "flex items-center mt-2",
  star: "text-yellow-400",
  rating: "text-xs ml-1",
};

export const TextLinkToken = {
  link: "text-sm text-gray-700 hover:underline",
};

export const SearchInputToken = {
  input: "w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500",
  container: "relative w-full items-center",
  icon: "absolute right-2 h-4 w-4 items-center justify-center rounded-full bg-gray-400",
};

//moleculas
export const CategoriesGridToken = {
  section: "px-8 py-10",
  title: "text-2xl font-semibold mb-6",
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6",
  card: "flex flex-col items-center bg-white shadow-md rounded-lg p-4",
  image: "w-24 h-24 object-cover rounded-full mb-4",
  name: "text-center text-lg font-medium",
};

export const LatestProductsGridToken = {
  section: "px-8 py-10",
  title: "text-2xl font-semibold mb-6",
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6",
  card: "bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 hover:border hover:border-gray-200",
  image: "rounded-md object-cover w-full h-40",
  name: "mt-3 font-medium text-gray-800",
  brand: "text-sm text-gray-500",
  price: "mt-1 text-green-600 font-semibold",
};

export const LocationBarToken = {
  container: "flex justify-between items-center px-6 py-2 text-sm text-gray-600 border-t",
  left: "flex items-center gap-2 cursor-pointer",
  right: "flex gap-4",
  link: "hover:underline",
};

export const LogoGroupToken = {
  container: "flex items-center gap-6",
};

export const ProductDetailToken = {
  container: "container max-w-6xl mx-auto bg-white rounded-lg shadow my-12",
  nav_categories: "text-sm text-gray-500 mb-4",
  category: "mx-2 hover:underline cursor-pointer",
  mainImage: "object-contain max-h-[520px]",
  thumbnails: "flex gap-3 mt-4",
  thumbnailImg:
    "rounded border object-cover w-20 h-20 cursor-pointer hover:scale-105 transition",
  refunds: "mt-6 flex items-center gap-3 text-sm text-gray-600",
  title: "text-3xl font-bold mb-3",
  sku: "text-gray-500",
  rating: "mt-3 flex items-center gap-4",
  stars: "flex items-center gap-2 text-yellow-400",
  ratingText: "ml-2 text-sm text-gray-500",

  priceContainer: "mt-4",
  price: "text-green-600 text-2xl font-semibold",

  specsContainer: "mt-6 border-t pt-4",
  specsTitle: "font-semibold mb-2",
  specsList: "list-disc ml-6 text-gray-600",

  button:
    "mt-6 w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition",
};

export const TopSalesToken = {
  section: "px-8 py-10",
  title: "text-2xl font-semibold mb-6",
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6",
};

export const UserMenuToken = {
  container: "flex items-center gap-6 text-sm",
  link: "cursor-pointer",
};

//organisms
export const CarouselToken = {
  container:
    "relative w-full h-64 md:h-96 max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg",
  empty: "w-full max-w-6xl mx-auto h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow",
  emptyText: "text-gray-500",

  imagesWrapper: "flex transition-transform ease-out duration-500",
  imageItem: "relative w-full h-64 md:h-96 flex-shrink-0 bg-gray-100",
  image: "object-contain",

  buttonBase:
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black",
  buttonLeft: "left-2",
  buttonRight: "right-2",

  indicators: "absolute bottom-4 flex w-full justify-center space-x-2",
  indicatorBase: "h-3 w-3 rounded-full",
  indicatorActive: "bg-yellow-400",
  indicatorInactive: "bg-gray-400",
};

export const HeaderToken = {
  container: "w-full bg-white z-50",

  topBar: "flex bg-white border border-gray-200 overflow-hidden",
  topLinks: "hidden md:flex items-center gap-6 text-gray-600",
  mainBar: "flex items-center justify-between h-17 px-6 bg-[#fafafa]",

  logoWrapper: "flex items-center ", //falabella.com

  menuWrapper: "flex items-center gap-x-4 flex-1 m-10 ",
  menuButton: "flex items-center gap-2 py-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium text-[24px]",

  searchWrapper: "flex items-center w-234 h-11.5 m-9.5 border border-black rounded-full bg-white overflow-hidden ",
  searchInput: "flex-1 px-5 py-2 text-[18px] m-2 text-[#6d7987] placeholder:text-[#6d7987] outline-none",
  searchButton:
    "flex items-center justify-center w-11.5 h-11.5 mr-1 rounded-full bg-[#343a40] text-white hover:bg-[#000000] transition-colors ml-auto mr-[-1px]",

  actionsWrapper: "flex items-center mr-0",
  loginButton: "text-left text-[18px] font-semibold text-[#1a1a1a] -ml-7 leading-tight px-0 ",
  purchasesButton: "text-sm ",

  cartWrapper: "relative",
  cartBadge: "absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1",
};

export const LoginToken = {
  overlay: "fixed inset-0 flex items-center justify-center bg-black/50 z-50",
  container: "bg-white rounded-[5] shadow-lg w-full max-w-md p-6 relative",

  closeButton: "absolute top-2 right-2 text-gray-500 hover:text-gray-700",

  logo: "mb-4 flex",

  title: "text-xl font-semibold mb-4",

  form: "space-y-4",
  inputError: "text-red-500 text-sm mt-1",

  submit: "w-full bg-[#343e49] text-white py-2 rounded-md",

  message: "text-sm text-center mt-4 text-gray-700",

  registerWrapper: "text-sm text-center mt-4",
  registerLink: "text-black underline",
};

export const OffersToken = {
  section: "px-8 py-12",
  title: "text-center text-3xl font-bold mb-8",
  highlight: "text-red-600",

  grid: "grid md:grid-cols-3 gap-6",

  card: "relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform",
  imageWrapper: "relative h-64 w-full",
  image: "object-cover",

  overlay: "absolute inset-0 bg-black/20 group-hover:bg-black/40 transition",

  content: "absolute bottom-0 p-4 text-white",
  discount: "bg-red-600 px-3 py-1 rounded-full font-bold text-lg",
  titleCard: "mt-2 text-xl font-semibold",
  price: "text-sm",
  normal: "line-through opacity-80",

  brand: "absolute top-3 left-3 bg-white px-3 py-1 text-black font-semibold rounded-md shadow",
};

export const OldHeaderToken = {
  container: "border-b border-gray-200 shadow-sm",

  topLogos: "px-6 py-2 border-b flex justify-start",

  mainBar: "flex items-center justify-between px-6 py-3",

  searchWrapper: "flex w-1/2 items-center",
};

export const RegistroToken = {
  container: "min-h-screen bg-gray-50 flex items-center justify-center",
  card: "bg-white shadow-lg rounded-xl p-10 w-full max-w-3xl grid md:grid-cols-2 gap-10",

  formWrapper: "",
  title: "text-xl font-semibold mb-2",
  subtitle: "text-gray-500 text-sm mb-6",
  form: "space-y-4",
  label: "text-sm font-medium",
  input: "w-full border rounded-md p-2 mt-1",
  button: "w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700",
  message: "mt-4 text-center text-sm text-gray-700",

  benefitsWrapper: "space-y-6",
  benefitsTitle: "font-semibold",
  benefitsList: "text-sm text-gray-600 space-y-2 mt-3",
};

//ui


