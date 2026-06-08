import { Product } from "@/domain/product/product";
import { ProductRepository } from "@/domain/product/repository";

const sockSizes = [
  {
    label: "S",
    range: "22-24cm",
  },
  {
    label: "M",
    range: "25-27cm",
  },
];

const mockProducts: Product[] = [
  {
    name: "ANKLET",
    slug: "anklet",
    category: "basic",
    description:
      "さらりと軽い履き心地で、足首まわりをやさしく包む短め丈のソックス。室内でも外出でも使いやすい、毎日のための一足です。",
    sizes: sockSizes,
    price: "¥1,200 (税込)",
    colors: [
      {
        name: "Beige",
        value: "#d9c2a4",
        image: "/images/products/anklet_beige.jpg",
      },
      {
        name: "Brown",
        value: "#7b5238",
        image: "/images/products/anklet_brown.jpg",
      },
      {
        name: "Gray",
        value: "#8f8d87",
        image: "/images/products/anklet_gray.jpg",
      },
    ],
  },
  {
    name: "SHORT",
    slug: "short",
    category: "basic",
    description:
      "ふっくらとした編み地が足を包み込む、定番のショート丈。締め付けを抑えながら、素肌に心地よい温度感を届けます。",
    sizes: sockSizes,
    price: "¥1,850 (税込)",
    colors: [
      {
        name: "Beige",
        value: "#d8c4a7",
        image: "/images/products/short_beige.jpg",
      },
      {
        name: "Brown",
        value: "#8a5b40",
        image: "/images/products/short_brown.jpg",
      },
      {
        name: "Gray",
        value: "#8b8a86",
        image: "/images/products/short_gray.jpg",
      },
    ],
  },
  {
    name: "CREW",
    slug: "crew",
    category: "basic",
    description:
      "足元からすねまであたたかく包むクルー丈。ゆったりとしたリブと柔らかな肌あたりで、日常の動きに自然になじみます。",
    sizes: sockSizes,
    price: "¥2,140 (税込)",
    colors: [
      {
        name: "Beige",
        value: "#d7c3a4",
        image: "/images/products/crew_beige.jpg",
      },
      {
        name: "Khaki",
        value: "#777258",
        image: "/images/products/crew_khaki.jpg",
      },
      {
        name: "Pink",
        value: "#d7aaa6",
        image: "/images/products/crew_pink.jpg",
      },
    ],
  },
  {
    name: "SUNNY ANKLET",
    slug: "sunny-anklet",
    category: "summer",
    description:
      "麻を多めに入れて吸水性と通気性を高めた、夏に心地よいアンクレットソックス。さらりと涼しい肌触りで、素足に近い軽やかさを楽しめます。",
    sizes: sockSizes,
    price: "¥1,500 (税込)",
    colors: [
      {
        name: "Blue",
        value: "#6fa9cf",
        image: "/images/products/sunny_anklet_blue.jpg",
      },
      {
        name: "Orange",
        value: "#df8f50",
        image: "/images/products/sunny_anklet_orange.jpg",
      },
    ],
  },
  {
    name: "SHOWY CREW",
    slug: "showy-crew",
    category: "winter",
    description:
      "防縮加工を施したウールをふんだんに使い、ローゲージ機でゆっくりと編み上げたボリュームたっぷりの一足。しっかりとした厚みで足元を包み、非常に暖かく過ごせます。",
    sizes: sockSizes,
    price: "¥2,400 (税込)",
    colors: [
      {
        name: "Brown",
        value: "#8b5a3c",
        image: "/images/products/showy_crew_brown.jpg",
      },
      {
        name: "Ivory",
        value: "#eee6d8",
        image: "/images/products/showy_crew_ivory.jpg",
      },
    ],
  },
];

export class MockProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    return mockProducts;
  }
}
