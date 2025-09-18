import Link from "next/link";
import MenuLink from "./MenuLink";
export default async function SideBar() {
  const otherMenu = [
    {
      menuItems: [
        { href: "dress", name: "dress" },
        { href: "skirt", name: "skirt" },
        { href: "blouse", name: "blouse" },
        { href: "pants", name: "pants" },
        { href: "jacket", name: "jacket" },
        { href: "coat", name: "coat" },
        { href: "sweater", name: "sweater" },
        { href: "top", name: "top" },
        { href: "jeans", name: "jeans" },
        { href: "shorts", name: "shorts" },
        { href: "scarf", name: "scarf" },
        { href: "sunglasses", name: "sunglasses" },
        { href: "hat", name: "hat" },
        { href: "heels", name: "heels" },
        { href: "flats", name: "flats" },
        { href: "boots", name: "boots" },
        { href: "sandals", name: "sandals" },
        { href: "handbag", name: "handbag" },
        { href: "clutch", name: "clutch" },
        { href: "necklace", name: "necklace" },
      ],
      menuName: "woman's fashion",
    },
    {
      menuItems: [
        { href: "shirt", name: "shirt" },
        { href: "t-shirt", name: "t-shirt" },
        { href: "polo", name: "polo" },
        { href: "sweater", name: "sweater" },
        { href: "hoodie", name: "hoodie" },
        { href: "jacket", name: "jacket" },
        { href: "coat", name: "coat" },
        { href: "blazer", name: "blazer" },
        { href: "pants", name: "pants" },
        { href: "jeans", name: "jeans" },
        { href: "shorts", name: "shorts" },
        { href: "sweatpants", name: "sweatpants" },
        { href: "suits", name: "suits" },
        { href: "tie", name: "tie" },
        { href: "bowtie", name: "bowtie" },
        { href: "belt", name: "belt" },
        { href: "socks", name: "socks" },
        { href: "shoes", name: "shoes" },
        { href: "sneakers", name: "sneakers" },
        { href: "loafers", name: "loafers" },
        { href: "boots", name: "boots" },
      ],
      menuName: "men's fashion",
    },
  ];
  const plainMenu = [
    { href: "electronics", name: "electronics" },
    { href: "home-lifestyle", name: "home & lifestyle" },
    { href: "medicine", name: "medicine" },
    { href: "sport-outdoor", name: "sport & outdoor" },
    { href: "baby-toys", name: "baby's & toys" },
    { href: "groceries-pets", name: "groceries & pets" },
    { href: "health-beauty", name: "health & beauty" },
  ];

  return (
    <aside className="text-color-text-3 text-lg z-10 flex flex-col items-start gap-4 mt-10 pr-4">
      {/* links with menu */}
      {otherMenu.map((item, i) => (
        <MenuLink key={i} {...item} />
      ))}

      {/* usual links */}
      {plainMenu.map((item, i) => (
        <Link
          href={`${item.href}`}
          className="capitalize"
          key={i}
          prefetch={false}
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
}
