import { NextResponse } from 'next/server';

// In-memory store (Vercel uchun moslashtirilgan)
// Production'da Supabase yoki PlanetScale ishlatish tavsiya etiladi
let products = [
  {
    "id": "1",
    "name": "Sony WH-1000XM5",
    "price": 350,
    "description": "Eng yuqori darajadagi shovqinni yutuvchi naushnik.",
    "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 10
  },
  {
    "id": "2",
    "name": "Nike Air Force 1",
    "price": 120,
    "description": "Klassik va qulay oq krossovkalar.",
    "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "category": "Kiyim-kechak",
    "stock": 25
  },
  {
    "id": "3",
    "name": "MacBook Pro 14\"",
    "price": 1999,
    "description": "M3 Pro chipli kuchli noutbuk dizaynerlar va dasturchilar uchun.",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 5
  },
  {
    "id": "4",
    "name": "iPhone 15 Pro Max",
    "price": 1199,
    "description": "Titan korpusli va A17 Pro chipli eng kuchli smartfon.",
    "image": "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 12
  },
  {
    "id": "5",
    "name": "PlayStation 5",
    "price": 499,
    "description": "Next-gen o'yin konsoli 4K va 120fps imkoniyati bilan.",
    "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80",
    "category": "O'yinlar",
    "stock": 8
  },
  {
    "id": "6",
    "name": "Samsung Galaxy S24 Ultra",
    "price": 1299,
    "description": "AI imkoniyatlari va S Pen ga ega Premium Android smartfon.",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 15
  },
  {
    "id": "7",
    "name": "Nike Dunk Low Retro",
    "price": 115,
    "description": "Ko'cha uslubidagi mashhur krossovka, Black/White rangi.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
    "category": "Kiyim-kechak",
    "stock": 30
  },
  {
    "id": "8",
    "name": "Apple iPad Pro M4",
    "price": 999,
    "description": "OLED ekranli eng yupqa va kuchli planshet.",
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 20
  },
  {
    "id": "9",
    "name": "Logitech MX Master 3S",
    "price": 99,
    "description": "Dasturchilar va dizaynerlar uchun eng zo'r simsiz sichqoncha.",
    "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80",
    "category": "Aksessuar",
    "stock": 45
  },
  {
    "id": "10",
    "name": "Apple AirPods Pro (2nd Gen)",
    "price": 249,
    "description": "Ajoyib ovoz sifati va mukammal shovqin yutish tizimi (ANC).",
    "image": "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 50
  },
  {
    "id": "11",
    "name": "Nintendo Switch OLED",
    "price": 349,
    "description": "Kattalashtirilgan OLED ekranli portativ o'yin konsoli.",
    "image": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=500&q=80",
    "category": "O'yinlar",
    "stock": 18
  },
  {
    "id": "12",
    "name": "Dyson Airwrap",
    "price": 599,
    "description": "Sochni quritish va har xil turmaklash uchun eng qulay premium moslama.",
    "image": "https://images.unsplash.com/photo-1634458712792-747353f47c09?auto=format&fit=crop&w=500&q=80",
    "category": "Go'zallik",
    "stock": 10
  },
  {
    "id": "13",
    "name": "GoPro HERO12 Black",
    "price": 399,
    "description": "HDR video oladigan, professional harakat kamerasi.",
    "image": "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=500&q=80",
    "category": "Kameralar",
    "stock": 25
  },
  {
    "id": "14",
    "name": "ASUS ROG Zephyrus G14",
    "price": 1599,
    "description": "O'yinlar va 3D dizayn uchun ixcham hamda o'ta kuchli noutbuk.",
    "image": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 7
  },
  {
    "id": "15",
    "name": "DJI Mini 4 Pro",
    "price": 759,
    "description": "Yengil, ixcham va 4K formatda video oluvchi zamonaviy dron.",
    "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80",
    "category": "Kameralar",
    "stock": 14
  },
  {
    "id": "16",
    "name": "Samsung Odyssey G9 Monitor",
    "price": 1499,
    "description": "49 dyuymli, 240Hz kavisli super gaming monitor.",
    "image": "https://images.unsplash.com/photo-1616763355548-1b606f439fce?auto=format&fit=crop&w=500&q=80",
    "category": "Elektronika",
    "stock": 4
  }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: Date.now().toString(),
      ...body
    };
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
