import { supabase } from "./supabase";

const propertiesImages = [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561753757-d8880c5a3551?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551241090-67de81d3541c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1697299262049-e9b5fa1e9761?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1719299225324-301bad5c333c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1516095901529-0ef7be431a4f?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1720432972486-2d53db5badf0?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Les noms de propriétés réalistes
const propertyNames = [
    "Villa Élégante au Bord de Mer",
    "Appartement Contemporain au Centre-Ville",
    "Maison Familiale Spacieuse",
    "Studio Lumineux et Moderne",
    "Duplex Chic avec Terrasse",
    "Condo Haut de Gamme",
    "Maison de Campagne Rustique",
    "Appartement de Luxe avec Vue Panoramique",
    "Villa Moderne avec Piscine",
    "Studio Cosy dans Quartier Animé",
    "Maison de Ville Élégante",
    "Condo Design à Proximité des Parcs",
    "Appartement Scandinave Minimaliste",
    "Résidence de Prestige au Cœur de la Ville"
];

// Les agents disponibles
const agentIds = [
    "14800f34-f97e-486a-ab92-d8fa08cababf",
    "6354916e-91cd-43fc-b87a-95d64ece040a",
    "85a3787d-f04b-4fc0-98e9-234f49174857"
];

// Les types de logements disponibles
const typeLogementEnum = [
    'Maison', 'Condo', 'Duplex', 'Studio', 'Villa', 'Appartement', 'Maison de ville', 'Autres'
];

// Les facilities disponibles
const facilitiesEnum = [
    'Gym', 'Buanderie', 'Wifi', 'Animaux Domestiques', 'Parking'
];

// Fonction pour choisir au hasard un ou plusieurs facilities
function randomFacilities() {
    const shuffled = facilitiesEnum.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * facilitiesEnum.length) + 1;
    return shuffled.slice(0, count);
}

// Fonction principale pour ajouter les properties
export async function seedProperties() {
    const properties = propertiesImages.map((image, index) => ({
        name: propertyNames[index] || `Propriété ${index + 1}`, // fallback au cas où
        type: typeLogementEnum[Math.floor(Math.random() * typeLogementEnum.length)],
        description: 'Magnifique propriété avec toutes les commodités nécessaires pour votre confort.',
        address: `Adresse ${index + 1}, Ville Exemple`,
        price: Math.floor(Math.random() * 500000) + 50000, // Entre 50 000 et 550 000
        area: parseFloat((Math.random() * 250 + 50).toFixed(2)), // Entre 50m² et 300m²
        bedrooms: Math.floor(Math.random() * 5) + 1, // 1 à 5 chambres
        bathrooms: Math.floor(Math.random() * 3) + 1, // 1 à 3 salles de bains
        rating: parseFloat((Math.random() * 5).toFixed(1)), // Note entre 0.0 et 5.0
        facilities: randomFacilities(),
        image,
        geolocation: `geo:latitude${index + 1},longitude${index + 1}`,
        agent_id: agentIds[Math.floor(Math.random() * agentIds.length)],
    }));

    const { data, error } = await supabase
        .from('properties')
        .insert(properties);

    if (error) {
        console.error('Erreur lors de l\'insertion :', error);
    } else {
        console.log('Insertion réussie :', data);
    }
}

// Appeler la fonction pour insérer les données
//seedProperties();
