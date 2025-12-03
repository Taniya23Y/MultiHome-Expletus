const sampleProperties = [
  {
    id: 1,
    name: "Greenwood Villa",
    description:
      "Modern 3 BHK apartment with balcony and lush garden surroundings.",
    city: "Indore",
    area: "1800 sqft",
    type: "3 BHK Apartment",
    price: "₹ 45,00,000",
    images: [
      {
        title: "Modern House",
        desc: "Spacious house with wooden interior.",
        url: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
      },
      {
        title: "Kitchen",
        desc: "Modular kitchen with premium fittings.",
        url: "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      },

      {
        title: "Bedroom",
        desc: "Cozy bedroom with soft lighting.",
        url: "https://plus.unsplash.com/premium_photo-1661874810454-4405e764b706?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Garden",
        desc: "Cozy greenly garden with soft lighting.",
        url: "https://media.istockphoto.com/id/2224342823/photo/view-of-the-orangery-with-a-round-roof-in-the-royal-botanic-garden-of-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=NsPzG0IqMPIGoLG1T6Xgc-IO98SKHqE4ygwvgbJp7VU=",
      },
    ],
  },
  {
    id: 2,
    name: "Maple Residency",
    description: "Cozy 2 BHK near schools, markets, and green parks.",
    city: "Indore",
    area: "1200 sqft",
    type: "2 BHK Apartment",
    price: "₹ 28,00,000",
    images: [
      {
        title: "Modern House",
        desc: "Spacious house with wooden interior.",
        url: "https://media.istockphoto.com/id/656057742/photo/3d-rendering-black-loft-modern-house.jpg?s=612x612&w=0&k=20&c=P_ekX2f0a40uVUWaOJp3ds_zPp1AxGzgR5sbT4uKu5U=",
      },
      {
        title: "Kitchen",
        desc: "Modular kitchen with premium fittings.",
        url: "https://media.istockphoto.com/id/1456467041/photo/beautiful-kitchen-in-new-farmhouse-style-luxury-home-with-island-pendant-lights-and-hardwood.webp?a=1&b=1&s=612x612&w=0&k=20&c=QHbU4O3aJU-L6FiFx1eyb_Fa-sTUKfcMHx0o0ao1uVE=",
      },
      {
        title: "Bedroom",
        desc: "Modular Master bedroom with premium fittings.",
        url: "https://plus.unsplash.com/premium_photo-1746471641369-5ee2e0ccfff5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Parking",
        desc: "Private covered parking space.",
        url: "https://media.istockphoto.com/id/2160382184/photo/efficient-car-park-interior-design-ideas-for-a-functional-and-organized-parking-lot.webp?a=1&b=1&s=612x612&w=0&k=20&c=8kt_lLPBp2cRn4yX-JFdpNsIJYKBzH9MwYK9VmfdRZM=",
      },
    ],
  },
  {
    id: 3,
    name: "Palm Meadows",
    description: "Spacious 4 BHK villa with pool and private garden.",
    city: "Indore",
    area: "3500 sqft",
    type: "3 BHK Apartment",
    price: "₹ 1.2 Cr",
    images: [
      {
        title: "Modern Hall",
        desc: "Spacious hall with wooden interior.",
        url: "https://media.istockphoto.com/id/656057834/photo/3d-rendering-black-minimal-wood-and-black-house.jpg?s=612x612&w=0&k=20&c=bhl5XSuxNzfkPSFTM6M2K4iRL63sFs7BeerGmwDcNNM=",
      },
      {
        title: "Kitchen",
        desc: "Modular kitchen with premium fittings.",
        url: "https://plus.unsplash.com/premium_photo-1680382578871-32ce66f9ae25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=800",
      },
      {
        title: "Bedroom",
        desc: "Cozy bedroom with soft lighting.",
        url: "https://plus.unsplash.com/premium_photo-1733353309577-ebe815f18392?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Parking",
        desc: "Private covered parking space.",
        url: "https://media.istockphoto.com/id/1729780209/photo/underground-pipelines.jpg?s=612x612&w=0&k=20&c=G4e8t0VVvaLODCzDZGdfdVi1hgqSWjVfUZfFfv0u2sM=",
      },
    ],
  },
  {
    id: 4,
    name: "Luxury Villa",
    description: "Elegant villa with pool, wooden interiors, and skyline view.",
    city: "Indore",
    area: "5000 sqft",
    type: "4 BHK Apartment",
    price: "₹ 2.3 Cr",
    images: [
      {
        title: "Modern Hall",
        desc: "Spacious hall with wooden interior.",
        url: "https://plus.unsplash.com/premium_photo-1747846129339-4ccad287c92a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Living room",
        desc: "Cozy living room with soft lighting.",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Kitchen",
        desc: "Modular kitchen with premium fittings.",
        url: "https://plus.unsplash.com/premium_photo-1661963667668-f53a412a5922?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Bedroom",
        desc: "Cozy bedroom with soft lighting.",
        url: "https://plus.unsplash.com/premium_photo-1661963211494-558f6f7aa721?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      },
    ],
  },
  {
    id: 5,
    name: "Urban Loft",
    description:
      "Stylish loft apartment in Mumbai with open design and city views.",
    city: "Indore",
    area: "1500 sqft",
    type: "3 BHK Apartment",
    price: "₹ 85,00,000",
    images: [
      {
        title: "Modern Hall",
        desc: "Spacious hall with wooden interior.",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Kitchen",
        desc: "Modular kitchen with premium fittings.",
        url: "https://plus.unsplash.com/premium_photo-1683141179507-734e6157ddba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Bedroom",
        desc: "Cozy bedroom with soft lighting.",
        url: "https://plus.unsplash.com/premium_photo-1661963058256-5358560f4c6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVkcm9vbSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      },
    ],
  },
  {
    id: 6,
    name: "Beachside Bungalow",
    description: "Relaxing beachfront home with sea views and wooden deck.",
    city: "Indore",
    area: "2200 sqft",
    type: "2 BHK Apartment",
    price: "₹ 1.5 Cr",
    images: [
      {
        title: "Modern Hall",
        desc: "Spacious hall with wooden interior.",
        url: "https://media.istockphoto.com/id/2223117892/photo/modern-two-story-villa-with-black-slate-stone-facade-and-spacious-yard-in-autumn.jpg?s=612x612&w=0&k=20&c=Zz1Qxh0AicFVTU3-aB4D8vJ0dTGo89ICZSc5kQ50jWM=",
      },
      {
        title: "Kitchen",
        desc: "Modular kitchen with premium fittings.",
        url: "https://plus.unsplash.com/premium_photo-1661876219991-f9482980946a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      },
      {
        title: "Bedroom",
        desc: "Cozy bedroom with soft lighting.",
        url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

export default sampleProperties;
