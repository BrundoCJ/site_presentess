export type Preference = "1" | "2" | "3" | "4";

export type Gift = {
  name: string;
  slug: string;
  image: string;
  description: string;
  observation?: string;
  buyUrl: string;
  price: number;
  preference: Preference;
};

export const gifts: Gift[] = [
  {
    name: "Camiseta John Mayer",
    slug: "camiseta-john-mayer",
    image: "/images/camisetajm.png",
    description: "Camiseta álbum continuum J.M.",
    observation: "Tamanho G",  // ← aqui
    buyUrl: "https://www.mooncamisetas.com/product-page/camiseta-john-mayer-continuum",
    price: 79.9,
    preference: "2",
  },
  {
    name: "Box Charizard",
    slug: "box-charizard",
    image: "/images/boxpokemon.png",
    description: "Box de pokemon TCG com carta promocional e 10 boosters.",
    buyUrl: "https://www.ligapokemon.com.br/?view=prod/view&pcode=134845&prod=(PT-BR)%20Box%20Cole%C3%A7%C3%A3o%20-%20Mega%20Charizard%20X%20ex",
    price: 135.0,
    preference: "4",
  },
  {
    name: "Cubo Magico 3x3",
    slug: "cubo-magico-3x3",
    image: "/images/cubo.png",
    observation: "Cupom: EUVOLTEI",
    description: "Cubo magnetico profissional",
    buyUrl: "https://www.oncube.com.br/cubo-magico-3x3x3-moyu-weilong-wrm-v10-magnetico",
    price: 94.9,
    preference: "4",
  },
  {
    name: "Camiseta Toji",
    slug: "camiseta-toji",
    image: "/images/camisetatoji.png",
    description: "Camiseta do Fucking TOJI",
    observation: "Tamanho G",
    buyUrl: "https://purplecomics.com.br/produtos/oversized-toji-curse-scrto/",
    price: 99.9,
    preference: "1",
  },
  {
    name: "Mini Liquidificador",
    slug: "mini-liquidificador",
    image: "/images/liquidificador.png",
    description: "Um mini liquidificador para mim poder fazer meus shakes de maromba",
    buyUrl: "https://www.amazon.com.br/dp/B0DGQR3SJK?ref=cm_sw_r_cso_wa_apin_dp_03TW4BE1GJR21MS3RHE9&ref_=cm_sw_r_cso_wa_apin_dp_03TW4BE1GJR21MS3RHE9&social_share=cm_sw_r_cso_wa_apin_dp_03TW4BE1GJR21MS3RHE9",
    price: 253.9,
    preference: "1",
  },
  {
    name: "Luz para o PC",
    slug: "luz-para-o-pc",
    image: "/images/luzpc.png",
    description: "Sou cego e preciso dessa luz para desenhar e enxergar melhor.",
    buyUrl: "https://shopee.com.br/product/1125085057/41654250095?d_id=21d28&uls_trackid=552dueje00r0&utm_content=UJdsPKQxgkwQV7JDXJ5BHwXpUQ7",
    price: 69.99,
    preference: "3",
  },
  {
    name: "Monitor Portatil",
    slug: "monitor-portatil",
    image: "/images/monitorportatil.png",
    description: "Preciso de um monitor portátil para trabalhar melhor e desenhar melhor.",
    buyUrl: "https://shopee.com.br/Monitor-Port%C3%A1til-ARZOPA-14-A1S-FHD-1080P-Tela-Externa-Com-Alto-Falantes-Duplos-Segunda-Para-Laptop-PC-Telefone-Xbox-i.1479426456.27582644505?extraParams=%7B%22display_model_id%22%3A243121476223%2C%22model_selection_logic%22%3A3%7D&sp_atk=e79aadca-7d1e-4569-a5a8-25ec4f8af61a&xptdk=e79aadca-7d1e-4569-a5a8-25ec4f8af61a",
    price: 508.99,
    preference: "1",
  },
  {
    name: "Teclado Mecânico Sem Fio",
    slug: "teclado-mecanico-sem-fio",
    image: "/images/teclado.png",
    description: "Um teclado mecânico sem fio para me ajudar a digitar melhor.",
    buyUrl: "https://shopee.com.br/FREEWOLF-M75-Teclado-Para-Jogos-Sem-Fio-RGB-Retroiluminado-Recarreg%C3%A1vel-2000mAh-Bateria-Membrana-Display-Inteligente-E-B-i.1431704062.54005190854?extraParams=%7B%22display_model_id%22%3A350475813675%2C%22model_selection_logic%22%3A3%7D&sp_atk=f532bc29-cd3d-4052-a6b4-ef88e0c11c7a&xptdk=f532bc29-cd3d-4052-a6b4-ef88e0c11c7a",
    price: 199.99,
    preference: "1",
  },
  {
    name: "Slide Adidas",
    slug: "slide-adidas",
    image: "/images/slide.png",
    observation: "Tamanho 42/43",
    description: "A muito tempo eu estou querendo comprar um slide novo, desde o acidente do Luke ter comido o meu",
    buyUrl: "https://www.adidas.com.br/chinelo-adilette-22/HP6522.html",
    price: 349.99,
    preference: "2" ,
  },
  {
    name: "Slide Adidas 2",
    slug: "slide-adidas-2",
    image: "/images/slide2.png",
    observation: "Tamanho 42/43",
    description: "A muito tempo eu estou querendo comprar um slide novo, desde o acidente do Luke ter comido o meu, e esse e uma versão mais barata",
    buyUrl: "https://www.adidas.com.br/chinelo-adilette-lumia/JP9580.html",
    price: 199.99,
    preference: "1",
  },
  {
    name: "Tatuagem",
    slug: "tatuagem",
    image: "/images/tatuagem.png",
    description: "Quero fazer minha primeira tatuagem há um tempo. Este é o link do tatuador; o tamanho seria 10 cm e o valor fica entre R$350 e R$400.",
    buyUrl: "https://www.instagram.com/_ink.andy?igsh=aHNjY3d0OWMyejRk",
    price: 400.0,
    preference: "2",
  },
  {
    name: "Booster Raio Preto",
    slug: "booster-raio-preto",
    image: "/images/raio.png",
    description: "Esse aqui não tem erro, eu vou gostar muito, a quantidade vai da que o seu coração mandar. Aqui o valor varia, de acordo com a disponibilidade em cada loja.",
    buyUrl: "https://www.ligapokemon.com.br/?view=prod/view&pcode=133792&prod=(PT-BR)%20Single%20Booster%20Pack%20-%20Scarlet%20and%20Violet%20Series%20-%20Black%20Bolt",
    price: 12.40,
    preference: "4",
  },
  {
    name: "Booster Fogo Branco",
    slug: "booster-fogo-branco",
    image: "/images/fogo.png",
    description: "Esse aqui não tem erro, eu vou gostar muito, a quantidade vai da que o seu coração mandar. Aqui o valor varia, de acordo com a disponibilidade em cada loja.",
    buyUrl: "https://www.ligapokemon.com.br/?view=prod/view&pcode=133790&prod=(PT-BR)%20Single%20Booster%20Pack%20-%20Scarlet%20and%20Violet%20Series%20-%20White%20Flare",
    price: 12.40,
    preference: "4",
  },
  {
    name: "Pix",
    slug: "pix",
    image: "/images/logo-pix.png",
    description: "Nada melhor do que um pixzinho 💵",
    buyUrl: "https://nubank.com.br/cobrar/7do1r/69b59f3e-3664-439c-a626-35ac128c2999",
    price: .0,
    preference: "2",
  },
];