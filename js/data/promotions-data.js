export const promotionCalendar = [
    {
        slug: 'san-valentin-pet',
        calendarMonthIndex: 1,
        startDate: '2026-02-01',
        endDate: '2026-02-14',
        dateLabel: 'Febrero',
        eventName: 'San Valentín Pet',
        promoTitle: 'San Valentín Pet',
        description: 'Una temporada para consentir con detalles, premios y accesorios que celebren el vínculo con tu mascota.',
        highlight: 'Regalos y premios',
        highlightDetail: 'En snacks y accesorios seleccionados',
        badge: 'Temporada especial',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-san-valentin-pet.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=san-valentin-pet'
    },
    {
        slug: 'mes-del-animal',
        calendarMonthIndex: 3,
        startDate: '2026-04-15',
        endDate: '2026-04-30',
        dateLabel: 'Abril',
        eventName: 'Mes del Animal',
        promoTitle: 'Mes del Animal',
        description: 'Promoción de cuidado integral con foco en higiene, antipulgas y básicos para mantener su bienestar al día.',
        highlight: 'Cuidado preventivo',
        highlightDetail: 'En higiene y antipulgas seleccionados',
        badge: 'Salud y cuidado',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-mes-del-animal.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=mes-del-animal'
    },
    {
        slug: 'fiestas-patrias-pet',
        calendarMonthIndex: 6,
        startDate: '2026-07-15',
        endDate: '2026-07-31',
        dateLabel: 'Julio',
        eventName: 'Fiestas Patrias Pet',
        promoTitle: 'Fiestas Patrias Pet',
        description: 'Una campaña para salir, pasear y engreír con packs de temporada, grooming y productos funcionales.',
        highlight: 'Paseo y grooming',
        highlightDetail: 'En cuidado y productos de rutina',
        badge: 'Edición patria',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-fiestas-patrias-pet.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=fiestas-patrias-pet'
    },
    {
        slug: 'dia-del-gato',
        calendarMonthIndex: 7,
        startDate: '2026-08-01',
        endDate: '2026-08-08',
        dateLabel: 'Agosto',
        eventName: 'Día del Gato',
        promoTitle: 'Día del Gato',
        description: 'Una selección dedicada a michis con productos de higiene, premios y entretenimiento para casa.',
        highlight: 'Especial felino',
        highlightDetail: 'En arena, snacks y juguetes',
        badge: 'Michi week',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-dia-del-gato.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=dia-del-gato'
    },
    {
        slug: 'halloween-pet',
        calendarMonthIndex: 9,
        startDate: '2026-10-20',
        endDate: '2026-10-31',
        dateLabel: 'Octubre',
        eventName: 'Halloween Pet',
        promoTitle: 'Halloween Pet',
        description: 'Campaña de temporada con premios, juguetes y accesorios para una experiencia divertida y temática.',
        highlight: 'Diversión de temporada',
        highlightDetail: 'En juguetes y premios seleccionados',
        badge: 'Halloween',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-halloween-pet.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=halloween-pet'
    },
    {
        slug: 'navidad-pet',
        calendarMonthIndex: 11,
        startDate: '2026-12-01',
        endDate: '2026-12-24',
        dateLabel: 'Diciembre',
        eventName: 'Navidad Pet',
        promoTitle: 'Navidad Pet',
        description: 'La campaña navideña de Central Pet para regalar, premiar y cerrar el año con engreimientos útiles.',
        highlight: 'Regalos pet',
        highlightDetail: 'En snacks, juguetes y básicos seleccionados',
        badge: 'Navidad',
        image: 'img/placeholder.png',
        plannedImage: 'img/central-pet/promo-navidad-pet.jpg',
        imagePosition: 'center center',
        ctaLabel: 'Ver promoción',
        campaignUrl: 'promocion-detalle.html?promo=navidad-pet'
    }
];

export const promotionCampaigns = [
    {
        slug: 'san-valentin-pet',
        calendarMonthIndex: 1,
        startDate: '2026-02-01',
        endDate: '2026-02-14',
        title: 'San Valentín Pet',
        subtitle: 'Detalles para celebrar su compañía',
        description: 'Una campaña pensada para consentir a perros y gatos con regalos útiles, premios y pequeños engreimientos de temporada.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-san-valentin-pet.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Beneficios en regalos, snacks y accesorios seleccionados',
        supportText: 'Campaña válida del 1 al 14 de febrero de 2026 o hasta agotar stock en productos participantes.',
        terms: [
            'Promoción válida del 1 al 14 de febrero de 2026.',
            'Los beneficios aplican solo a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'alimento-premium-perro', discountLabel: '15% OFF', promoPrice: 76, originalPrice: 89 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 }
        ]
    },
    {
        slug: 'mes-del-animal',
        calendarMonthIndex: 3,
        startDate: '2026-04-15',
        endDate: '2026-04-30',
        title: 'Mes del Animal',
        subtitle: 'Cuidado integral para su bienestar',
        description: 'Campaña enfocada en rutina preventiva con productos de higiene, antipulgas y apoyo para el cuidado frecuente.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-mes-del-animal.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Beneficios en higiene, antipulgas y básicos de cuidado',
        supportText: 'Campaña válida del 15 al 30 de abril de 2026. Consulta por WhatsApp para orientación según tu mascota.',
        terms: [
            'Promoción válida del 15 al 30 de abril de 2026.',
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
        slug: 'fiestas-patrias-pet',
        calendarMonthIndex: 6,
        startDate: '2026-07-15',
        endDate: '2026-07-31',
        title: 'Fiestas Patrias Pet',
        subtitle: 'Temporada de paseo, grooming y rutina',
        description: 'Una campaña para resolver productos funcionales de la temporada con foco en paseo, higiene y cuidado práctico.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-fiestas-patrias-pet.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Promoción en cuidado, paseo y grooming seleccionado',
        supportText: 'Campaña válida del 15 al 31 de julio de 2026 y sujeta a stock disponible.',
        terms: [
            'Promoción válida del 15 al 31 de julio de 2026.',
            'Los beneficios aplican únicamente a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'alimento-premium-perro', discountLabel: '15% OFF', promoPrice: 76, originalPrice: 89 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 },
            { productId: 'pipeta-antipulgas', discountLabel: '14% OFF', promoPrice: 30, originalPrice: 35 },
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 }
        ]
    },
    {
        slug: 'dia-del-gato',
        calendarMonthIndex: 7,
        startDate: '2026-08-01',
        endDate: '2026-08-08',
        title: 'Día del Gato',
        subtitle: 'Una semana para consentir a los michis',
        description: 'Campaña especial con básicos felinos para higiene, entretenimiento y pequeños premios para el día a día.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-dia-del-gato.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Especial en arena, snacks y juguetes para gatos',
        supportText: 'Campaña válida del 1 al 8 de agosto de 2026 para productos participantes.',
        terms: [
            'Promoción válida del 1 al 8 de agosto de 2026.',
            'Los descuentos aplican únicamente a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'arena-sanitaria-gato', discountLabel: '13% OFF', promoPrice: 28, originalPrice: 32 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'shampoo-hipoalergenico', discountLabel: '10% OFF', promoPrice: 25, originalPrice: 28 }
        ]
    },
    {
        slug: 'halloween-pet',
        calendarMonthIndex: 9,
        startDate: '2026-10-20',
        endDate: '2026-10-31',
        title: 'Halloween Pet',
        subtitle: 'Premios y diversión para la temporada',
        description: 'Una campaña divertida para cerrar octubre con premios, juguetes y productos pensados para jugar y engreír.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-halloween-pet.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Promoción en juguetes y premios de temporada',
        supportText: 'Campaña válida del 20 al 31 de octubre de 2026 o hasta agotar stock.',
        terms: [
            'Promoción válida del 20 al 31 de octubre de 2026.',
            'Los beneficios aplican solo a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'arena-sanitaria-gato', discountLabel: '13% OFF', promoPrice: 28, originalPrice: 32 },
            { productId: 'pipeta-antipulgas', discountLabel: '14% OFF', promoPrice: 30, originalPrice: 35 }
        ]
    },
    {
        slug: 'navidad-pet',
        calendarMonthIndex: 11,
        startDate: '2026-12-01',
        endDate: '2026-12-24',
        title: 'Navidad Pet',
        subtitle: 'Regalos y engreimientos para cerrar el año',
        description: 'La campaña de diciembre reúne regalos útiles, premios y básicos seleccionados para celebrar con tu mascota.',
        bannerImage: 'img/placeholder.png',
        plannedBannerImage: 'img/central-pet/promo-navidad-pet.jpg',
        bannerPosition: 'center center',
        benefitLabel: 'Beneficios en regalos, snacks y juguetes seleccionados',
        supportText: 'Campaña válida del 1 al 24 de diciembre de 2026 y sujeta a stock disponible.',
        terms: [
            'Promoción válida del 1 al 24 de diciembre de 2026.',
            'Los beneficios aplican únicamente a productos participantes.',
            'La disponibilidad puede variar según stock en tienda.'
        ],
        products: [
            { productId: 'juguete-mordedor', discountLabel: '13% OFF', promoPrice: 21, originalPrice: 24 },
            { productId: 'snack-dental', discountLabel: '11% OFF', promoPrice: 16, originalPrice: 18 },
            { productId: 'alimento-premium-perro', discountLabel: '15% OFF', promoPrice: 76, originalPrice: 89 },
            { productId: 'arena-sanitaria-gato', discountLabel: '13% OFF', promoPrice: 28, originalPrice: 32 }
        ]
    }
];
