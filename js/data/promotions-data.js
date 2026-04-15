export const promotionCalendar = [
    {
        slug: 'pack-cachorro',
        monthIndex: 0,
        dateLabel: 'Enero',
        eventName: 'Pack Cachorro',
        promoTitle: 'Pack Cachorro',
        description: 'Una campaña para empezar bien la rutina de los más pequeños con básicos de alimentación, higiene y juego.',
        highlight: 'Packs de inicio',
        highlightDetail: 'En productos esenciales',
        badge: 'Nuevo engreído',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-pack-cachorro.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=pack-cachorro'
    },
    {
        slug: 'campana-antipulgas',
        monthIndex: 2,
        dateLabel: 'Marzo',
        eventName: 'Campaña Antipulgas',
        promoTitle: 'Campaña Antipulgas',
        description: 'Protección de temporada para perros y gatos, con orientación para elegir el formato adecuado.',
        highlight: 'Protección al día',
        highlightDetail: 'En antipulgas seleccionados',
        badge: 'Salud',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-antipulgas.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=campana-antipulgas'
    },
    {
        slug: 'bano-grooming',
        monthIndex: 3,
        dateLabel: 'Abril',
        eventName: 'Baño + Grooming',
        promoTitle: 'Baño + Grooming',
        description: 'Beneficios para renovar la rutina de higiene con productos suaves y atención pensada para su comodidad.',
        highlight: 'Cuidado completo',
        highlightDetail: 'En higiene y grooming',
        badge: 'Bienestar',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-bano-grooming.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=bano-grooming'
    },
    {
        slug: 'semana-del-gato',
        monthIndex: 6,
        dateLabel: 'Julio',
        eventName: 'Semana del Gato',
        promoTitle: 'Semana del Gato',
        description: 'Una selección para consentir a los michis con higiene, alimentación y productos útiles para casa.',
        highlight: 'Especial gatos',
        highlightDetail: 'En arena y básicos felinos',
        badge: 'Michi lover',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-semana-del-gato.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=semana-del-gato'
    },
    {
        slug: 'nutricion-premium',
        monthIndex: 8,
        dateLabel: 'Septiembre',
        eventName: 'Nutrición Premium',
        promoTitle: 'Nutrición Premium',
        description: 'Opciones para mejorar su alimentación diaria con productos seleccionados y asesoría rápida por WhatsApp.',
        highlight: 'Mejor nutrición',
        highlightDetail: 'En alimentos y snacks',
        badge: 'Recomendado',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-nutricion-premium.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=nutricion-premium'
    },
    {
        slug: 'navidad-pet',
        monthIndex: 11,
        dateLabel: 'Diciembre',
        eventName: 'Navidad Pet',
        promoTitle: 'Navidad Pet',
        description: 'Regalos, premios y engreimientos para cerrar el año celebrando con tu mascota.',
        highlight: 'Regalos pet',
        highlightDetail: 'En juguetes y premios',
        badge: 'Temporada',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-navidad-pet.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=navidad-pet'
    }
];

export const promotionCampaigns = [
    {
        slug: 'pack-cachorro',
        monthIndex: 0,
        title: 'Pack Cachorro',
        subtitle: 'Básicos para empezar con buen cuidado',
        description: 'Una selección temporal para familias que reciben un cachorro y necesitan resolver alimentación, higiene y juego en una sola compra.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-pack-cachorro.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Packs de inicio para cachorros',
        supportText: 'Promoción sujeta a stock disponible y recomendación según edad, tamaño y rutina de la mascota.',
        terms: [
            'Promoción válida durante la campaña Pack Cachorro.',
            'Los beneficios aplican solo a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'alimento-premium-perro', discountLabel: '15% OFF', promoPrice: 76, originalPrice: 89 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 },
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 }
        ]
    },
    {
        slug: 'campana-antipulgas',
        monthIndex: 2,
        title: 'Campaña Antipulgas',
        subtitle: 'Protección práctica para la temporada',
        description: 'Campaña enfocada en prevención de pulgas y garrapatas, con apoyo para elegir productos según peso y necesidad.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-antipulgas.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Beneficios en antipulgas seleccionados',
        supportText: 'Consulta por WhatsApp antes de comprar para validar presentación y frecuencia recomendada.',
        terms: [
            'Promoción válida durante la Campaña Antipulgas.',
            'La recomendación puede variar según talla, edad y condición de la mascota.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'pipeta-antipulgas', discountLabel: '14% OFF', promoPrice: 30, originalPrice: 35 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 }
        ]
    },
    {
        slug: 'bano-grooming',
        monthIndex: 3,
        title: 'Baño + Grooming',
        subtitle: 'Higiene y bienestar para su rutina',
        description: 'Selección pensada para mantener el pelaje limpio, cómodo y con productos suaves para el cuidado frecuente.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-bano-grooming.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Beneficios en higiene y cuidado',
        supportText: 'Campaña temporal para productos de higiene y cuidado complementario.',
        terms: [
            'Promoción válida durante la campaña Baño + Grooming.',
            'Los descuentos aplican solo a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 },
            { productId: 'arena-sanitaria-gato', discountLabel: '13% OFF', promoPrice: 28, originalPrice: 32 },
            { productId: 'pipeta-antipulgas', discountLabel: '14% OFF', promoPrice: 30, originalPrice: 35 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 }
        ]
    },
    {
        slug: 'semana-del-gato',
        monthIndex: 6,
        title: 'Semana del Gato',
        subtitle: 'Básicos para michis felices',
        description: 'Campaña dedicada a gatos con productos útiles para higiene, juego y bienestar en casa.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-semana-del-gato.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Especial en básicos felinos',
        supportText: 'Beneficios temporales para productos seleccionados de gatos.',
        terms: [
            'Promoción válida durante la Semana del Gato.',
            'Los beneficios aplican únicamente a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'arena-sanitaria-gato', discountLabel: '13% OFF', promoPrice: 28, originalPrice: 32 },
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 }
        ]
    },
    {
        slug: 'nutricion-premium',
        monthIndex: 8,
        title: 'Nutrición Premium',
        subtitle: 'Mejor alimentación para su día a día',
        description: 'Campaña enfocada en nutrición y premios funcionales para complementar la rutina de perros y gatos.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-nutricion-premium.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Beneficios en alimentos y snacks',
        supportText: 'Consulta por WhatsApp para recibir orientación según etapa y tamaño de tu mascota.',
        terms: [
            'Promoción válida durante la campaña Nutrición Premium.',
            'Los descuentos aplican únicamente a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'alimento-premium-perro', discountLabel: '15% OFF', promoPrice: 76, originalPrice: 89 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'arena-sanitaria-gato', discountLabel: '13% OFF', promoPrice: 28, originalPrice: 32 },
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 }
        ]
    },
    {
        slug: 'navidad-pet',
        monthIndex: 11,
        title: 'Navidad Pet',
        subtitle: 'Regalos y engreimientos de temporada',
        description: 'Promociones de fin de año para premiar, jugar y consentir a tu mascota con detalles útiles.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-navidad-pet.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Regalos pet de temporada',
        supportText: 'Campaña válida durante temporada navideña y hasta agotar stock.',
        terms: [
            'Promoción válida durante Navidad Pet.',
            'Los beneficios aplican únicamente a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 },
            { productId: 'alimento-premium-perro', discountLabel: '15% OFF', promoPrice: 76, originalPrice: 89 }
        ]
    }
];
