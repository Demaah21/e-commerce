import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { SwiperProps } from "swiper/react";

// ! children
export interface IChildren {
  children: React.ReactNode;
}

// ! className
export interface IClassName {
  className?: string;
}


// ! header nav link
export interface IHeaderLink {
  text: string;
  href: string;
}

// ! footer nav link
export interface IFooterLink {
  text: string;
  href: string;
  isIndependent?: boolean;
}

// ! product card
export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
}

export interface IProductCard extends IProduct {
  discount?: number;
  isFavorite?: boolean;
  isNew?: boolean;
}

// ! category card
export interface ICategoryCard {
  _id: string;
  title: string;
  image: string;
}

// ! primary button
export interface IPrimaryButton extends IChildren, IClassName {
  buttonProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

// ! banner button
export interface IBannerButton {
  text: string;
}

// ! service card
export interface IServiceCard {
  image: string;
  title: string;
  subtitle: string;
}

// ! navigation train
export interface INavigationTrain {
  isNotFound?: boolean;
  isError?: boolean;
}

// ! input without label
export interface IInputWithoutLabel {
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

// ! about card
export interface IAboutCard {
  title: string;
  i: number;
  subtitle: string;
}

// ! about swiper card
interface IAboutEmplayeeCardHref {
  twitter: string;
  instagram: string;
  linkedin: string;
}
export interface IAboutEmployeeCard {
  image: string;
  name: string;
  status: string;
  href: IAboutEmplayeeCardHref;
}

// ! arrow button
export interface IArrowButton extends IClassName {
  direction: "left" | "right" | "up";
  isScrolling?: boolean;
}

// ! banners content
export interface IBannerContent extends IClassName {
  title: string;
  description: string;
}

// ! main divider
type TDirection = "horizontal" | "vertical";
export interface IMainDivider extends IClassName {
  dir: TDirection;
}

// ! home banner section > sidebar > menu link
export interface IHomeSideBarMenuLink {
  menuName: string;
  menuItems: { href: string; name: string }[];
}

// ! name and href
export interface INameAndHref {
  name: string;
  href: string;
}

// ! product swiper
export interface IProductSwiper {
  swiperProps: SwiperProps;
  data: IProductCard[];
  itemsCentered?: boolean;
  prevEl?: HTMLElement | null;
  nextEl?: HTMLElement | null;
}

// ! time type
export type TTime = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

// ! home category swiper home > category section
export interface ICategorySwiper {
  swiperProps: SwiperProps;
  data: ICategoryCard[];
  prevEl?: HTMLElement | null; // Update type to accept HTMLElement or null
  nextEl?: HTMLElement | null; // Update type to accept HTMLElement or null
}

// ! brand card
export interface IBrandCard {
  _id: string;
  title: string;
  image: string;
}

// ! home brand swiper home > brand section
export interface IBrandSwiper {
  swiperProps: SwiperProps;
  data: IBrandCard[];
  prevEl?: HTMLElement | null;
  nextEl?: HTMLElement | null;
}

// ! home page section title with Quadrant
export interface ISectionTitleWithQuadrant extends IClassName {
  text: string;
  withoutQuadrant?: boolean;
}

// ! just text interface with className?
export interface ITextWithClassName extends IClassName {
  text: string;
}

// ! cartProducts atom interface recoil
export interface ICartProductCard extends IProductCard {
  amount: number;
}

// ! checkout > inputs, input with label component
export interface IInputWithLabel extends IClassName {
  label: string;
  labelSpan?: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  error?: string;
}

// ! checkout > checkout card component
export interface ICheckoutCard {
  image: string;
  name: string;
  price: number;
}

// ! cart > total card section
export type TPrice = {
  subTotal: number;
  deliveryPrice: number;
  total: number;
};

// ! checkout form inputs
export interface ICredentials {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  city: string;
  phoneNumber: string;
  email: string;
  password: string;
}


// ! sign up form inputs
export interface SignUp {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword?: string;
}

// ! sign in form inputs
export interface SignIn {
  email: string;
  password?: string;
}
