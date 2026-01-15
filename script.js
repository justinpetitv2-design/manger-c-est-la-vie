// --- Utils
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

// --- Mobile nav
const toggle = $(".nav__toggle");
const nav = $("#nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// --- Gallery: if you add real images, auto-apply background
$$(".ph__img").forEach(div => {
  const img = div.getAttribute("data-img");
  if (!img) return;

  // Try to load the image; if it exists, set it as cover background.
  const tester = new Image();
  tester.onload = () => {
    div.style.background = `url('${img}') center/cover no-repeat`;
  };
  tester.src = img;
});

// --- Modal content
const modal = $("#modal");
const modalContent = $("#modalContent");

const legal = {
  mentions: `
    <h3>Mentions légales</h3>
    <p class="muted small">
      Site vitrine (démo). Éditeur : Atelier Sève (projet). Contact : bonjour@atelier-seve.fr.
      Hébergement : GitHub Pages.
    </p>
  `,
  privacy: `
    <h3>Confidentialité</h3>
    <p class="muted small">
      Les informations saisies dans le formulaire sont utilisées uniquement pour répondre à votre demande.
      Ce site étant statique, l’envoi se fait via votre application mail (aucune donnée n’est stockée sur le site).
      Si un jour un formulaire Google / outil de réservation est ajouté, une mise à jour de cette page sera faite.
    </p>
  `
};

window.openModal = (key) => {
  if (!modal || !modalContent) return;
  modalContent.innerHTML = legal[key] || "<p>Contenu indisponible.</p>";
  modal.showModal();
};
window.closeModal = () => modal?.close();

// --- i18n (FR/EN/ES)
const dict = {
  fr: {
    nav_offers: "Offres", nav_menus: "Menus", nav_chef: "Le Chef", nav_planning: "Planning", nav_gallery: "Galerie", nav_contact: "Contact",
    hero_kicker: "Chef à domicile & Traiteur",
    hero_title: `Une cuisine qui ressemble à vos moments : <span class="accent">humaine</span>, précise, sans chichi.`,
    hero_lead: "Dîner chez vous, réception, brunch, événement d’entreprise : je m’occupe de tout, avec une attention sincère aux goûts, aux allergies, et à l’ambiance.",
    hero_cta_primary: "Demander un devis", hero_cta_secondary: "Voir les menus",
    badge_1: "3 menus personnalisables", badge_2: "Service attentif & discret", badge_3: "Chez vous ou en réception",
    card_info_title: "Infos rapides", card_area_label: "Zone", card_area_value: "Île-de-France & alentours (sur demande)",
    card_delay_label: "Réponse", card_delay_value: "Sous 24h ouvrées",
    card_event_label: "Types d’événements", card_event_value: "Dîners, anniversaires, mariages, entreprises",
    card_btn: "Consulter le planning", card_note: "Astuce : plus tu me donnes d’infos (date, convives, goûts), plus je personnalise.",
    offers_title: "Deux façons de travailler ensemble", offers_subtitle: "Même exigence, deux formats : chez vous ou en réception.",
    offers_home_title: "Chef à domicile",
    offers_home_text: "Un repas sur-mesure chez vous : je cuisine sur place, je dresse, et je laisse votre cuisine impeccable. Service discret, ambiance chaleureuse.",
    offers_home_li1: "Dîner intime (2 à 12 pers.)", offers_home_li2: "Expérience “comme au restaurant”", offers_home_li3: "Allergies et préférences prises au sérieux",
    offers_catering_title: "Traiteur",
    offers_catering_text: "Cocktails, buffets, repas assis : je conçois une proposition claire, livrée ou servie, avec une logistique simple et fiable.",
    offers_catering_li1: "Réceptions privées & pros", offers_catering_li2: "Option service / sans service", offers_catering_li3: "Devis transparent",
    menus_title: "3 menus (personnalisables)",
    menus_subtitle: "Les intitulés et prix sont indicatifs : on ajuste selon saison, contraintes, et niveau de prestation.",
    menu1_title: "Menu Essentiel", menu1_price: "À partir de 65€ / pers.", menu1_desc: "Entrée • Plat • Dessert",
    menu1_li1: "Idéal dîner entre amis", menu1_li2: "1 alternative végétarienne", menu1_li3: "Personnalisation goûts",
    menu2_title: "Menu Signature", menu2_price: "À partir de 95€ / pers.", menu2_desc: "2 entrées • Plat • Pré-dessert • Dessert",
    menu2_li1: "Rythme “restaurant”", menu2_li2: "Accord boissons en option", menu2_li3: "Dressage soigné",
    menu3_title: "Menu Expérience", menu3_price: "À partir de 135€ / pers.", menu3_desc: "Amuse-bouche • 2 entrées • Poisson • Viande • Dessert • Mignardises",
    menu3_li1: "Pour célébrations", menu3_li2: "Option service à table", menu3_li3: "Expérience complète",
    menus_note_strong: "Personnalisation :", menus_note_text: "allergies, goûts, restrictions, préférences de cuisson, et objectifs (léger, gourmand, festif).",
    chef_title: "Derrière Atelier Sève", chef_subtitle: "Une approche simple : écouter, cuisiner juste, et prendre soin.",
    chef_name: "Chef Noé Lambert",
    chef_bio: "Formé entre bistrots exigeants et maisons de réception, j’ai choisi le format “à domicile” pour remettre l’humain au centre : vos goûts, votre rythme, votre table, votre moment.",
    chef_li1: "Cuisine de saison & produits sourcés", chef_li2: "Élégant mais détendu", chef_li3: "Respect des lieux (zéro stress)",
    chef_values_title: "Ce que tu peux attendre",
    chef_values_text: "Une proposition claire, un échange simple, et une prestation fiable. Le but : que tu profites, vraiment.",
    faq1_q: "Tu fais aussi des options végétariennes ?", faq1_a: "Oui, et pas “par défaut” : on construit un vrai menu végétarien cohérent.",
    faq2_q: "Tu gères les allergies ?", faq2_a: "Oui — je pose les bonnes questions en amont et j’adapte sans compromis.",
    faq3_q: "Tu peux gérer un événement entreprise ?", faq3_a: "Oui, du cocktail au repas assis, avec timing et logistique carrés.",
    planning_title: "Planning (disponibilités type)",
    planning_subtitle: "Indication générale. Pour bloquer une date : envoie ta demande et je confirme par retour (sous 24h ouvrées).",
    day_mon: "Lundi", day_tue: "Mardi", day_wed: "Mercredi", day_thu: "Jeudi", day_fri: "Vendredi", day_sat: "Samedi", day_sun: "Dimanche",
    slot_lunch: "Midi", slot_evening: "Soir",
    planning_note: "Légende : Disponible / À confirmer / Complet. (Tu pourras remplacer ce planning par un Google Calendar public plus tard.)",
    gallery_title: "Galerie", gallery_subtitle: "Photos d’ambiance et assiettes. (Placeholders tant que tu n’as pas tes images.)",
    ph1: "Entrée de saison — acidulé & herbacé",
    ph2: "Plat signature — jus court, cuisson précise",
    ph3: "Dessert — gourmand mais léger",
    ph4: "Cocktail — bouchées et verrines",
    ph5: "Mise en place — propre et discrète",
    ph6: "Table — simple, élégante, chaleureuse",
    contact_title: "Contact & demande de réservation",
    contact_subtitle: "Donne-moi le maximum d’infos : date, lieu, convives, menus, allergies.",
    contact_direct_title: "Contact direct",
    contact_phone_label: "Téléphone :",
    contact_city_label: "Base :",
    contact_direct_note: "Ces coordonnées sont fictives (tu peux les remplacer quand tu veux).",
    contact_form_title: "Formulaire",
    f_name: "Nom", f_email: "Email", f_service: "Prestation", opt_home: "Chef à domicile", opt_catering: "Traiteur",
    f_date: "Date souhaitée", f_guests: "Convives",
    f_details: "Détails (lieu, goûts, allergies, budget, timing)",
    f_submit: "Envoyer la demande",
    f_note: "Ce site est statique : le bouton ouvre votre application mail avec le message pré-rempli. Plus tard, on pourra brancher un Google Form ou un backend.",
    footer_rights: "Tous droits réservés",
    footer_legal: "Mentions légales",
    footer_privacy: "Confidentialité"
  },

  // EN + ES : traductions “propres” (pas mot à mot)
  en: {
    nav_offers:"Services", nav_menus:"Menus", nav_chef:"Chef", nav_planning:"Schedule", nav_gallery:"Gallery", nav_contact:"Contact",
    hero_kicker:"Private Chef & Catering",
    hero_title:`Food that fits your moment: <span class="accent">human</span>, precise, never stiff.`,
    hero_lead:"At home dinners, receptions, brunch, corporate events: I handle everything with real care for tastes, allergies and ambiance.",
    hero_cta_primary:"Request a quote", hero_cta_secondary:"See menus",
    badge_1:"3 customizable menus", badge_2:"Attentive & discreet service", badge_3:"At home or events",
    card_info_title:"Quick info", card_area_label:"Area", card_area_value:"Paris region & nearby (on request)",
    card_delay_label:"Reply", card_delay_value:"Within 24 business hours",
    card_event_label:"Events", card_event_value:"Dinners, birthdays, weddings, corporate",
    card_btn:"Check schedule", card_note:"Tip: the more details you share (date, guests, preferences), the more tailored it gets.",
    offers_title:"Two ways to work together", offers_subtitle:"Same standards — two formats: at home or catered events.",
    offers_home_title:"Private chef at home",
    offers_home_text:"A tailored meal at your place: I cook on site, plate beautifully, and leave your kitchen spotless. Warm, discreet service.",
    offers_home_li1:"Intimate dinners (2–12 guests)", offers_home_li2:"Restaurant-like experience", offers_home_li3:"Allergies & preferences respected",
    offers_catering_title:"Catering",
    offers_catering_text:"Cocktails, buffets, seated meals: clear proposal, delivered or served, with simple and reliable logistics.",
    offers_catering_li1:"Private & corporate", offers_catering_li2:"With/without service staff", offers_catering_li3:"Transparent quote",
    menus_title:"3 menus (customizable)",
    menus_subtitle:"Names and pricing are indicative — adjusted to season, constraints and service level.",
    menu1_title:"Essential Menu", menu1_price:"From €65 / person", menu1_desc:"Starter • Main • Dessert",
    menu1_li1:"Perfect for friends", menu1_li2:"Vegetarian option", menu1_li3:"Taste customization",
    menu2_title:"Signature Menu", menu2_price:"From €95 / person", menu2_desc:"2 starters • Main • Pre-dessert • Dessert",
    menu2_li1:"Restaurant pacing", menu2_li2:"Drink pairing optional", menu2_li3:"Refined plating",
    menu3_title:"Experience Menu", menu3_price:"From €135 / person", menu3_desc:"Amuse-bouche • 2 starters • Fish • Meat • Dessert • Mignardises",
    menu3_li1:"For celebrations", menu3_li2:"Table service option", menu3_li3:"Full experience",
    menus_note_strong:"Customization:", menus_note_text:"allergies, preferences, restrictions, cooking preferences, and goals (light, indulgent, festive).",
    chef_title:"Behind Atelier Sève", chef_subtitle:"A simple approach: listen, cook with accuracy, take care.",
    chef_name:"Chef Noé Lambert",
    chef_bio:"Trained between demanding bistros and event venues, I chose the at-home format to put people first: your tastes, your rhythm, your table.",
    chef_li1:"Seasonal cooking & sourcing", chef_li2:"Elegant yet relaxed", chef_li3:"Respect for your place (zero stress)",
    chef_values_title:"What you can expect",
    chef_values_text:"A clear proposal, an easy exchange, and reliable execution. The goal: you truly enjoy.",
    faq1_q:"Vegetarian options?", faq1_a:"Yes — not as an afterthought. We build a coherent menu.",
    faq2_q:"Allergies?", faq2_a:"Yes — I ask the right questions and adapt without compromise.",
    faq3_q:"Corporate events?", faq3_a:"Yes — from cocktail bites to seated meals, with tight timing and logistics.",
    planning_title:"Schedule (typical availability)",
    planning_subtitle:"General indication. To secure a date: send your request and I confirm by reply (within 24 business hours).",
    day_mon:"Monday", day_tue:"Tuesday", day_wed:"Wednesday", day_thu:"Thursday", day_fri:"Friday", day_sat:"Saturday", day_sun:"Sunday",
    slot_lunch:"Lunch", slot_evening:"Evening",
    planning_note:"Legend: Available / To confirm / Full. (You can later replace this with a public Google Calendar.)",
    gallery_title:"Gallery", gallery_subtitle:"Atmosphere and plates. (Placeholders until you add your own images.)",
    ph1:"Seasonal starter — bright & herbal", ph2:"Signature main — precise cooking", ph3:"Dessert — indulgent yet light",
    ph4:"Cocktail — bites and verrines", ph5:"Setup — clean & discreet", ph6:"Table — simple, elegant, warm",
    contact_title:"Contact & booking request",
    contact_subtitle:"Share as many details as possible: date, location, guests, menu, allergies.",
    contact_direct_title:"Direct contact",
    contact_phone_label:"Phone:", contact_city_label:"Base:",
    contact_direct_note:"These contact details are fictional placeholders (replace anytime).",
    contact_form_title:"Form",
    f_name:"Name", f_email:"Email", f_service:"Service", opt_home:"Private chef", opt_catering:"Catering",
    f_date:"Preferred date", f_guests:"Guests",
    f_details:"Details (location, preferences, allergies, budget, timing)",
    f_submit:"Send request",
    f_note:"This is a static site: the button opens your email app with a pre-filled message. Later we can connect Google Forms or a backend.",
    footer_rights:"All rights reserved",
    footer_legal:"Legal notice",
    footer_privacy:"Privacy"
  },

  es: {
    nav_offers:"Servicios", nav_menus:"Menús", nav_chef:"Chef", nav_planning:"Agenda", nav_gallery:"Galería", nav_contact:"Contacto",
    hero_kicker:"Chef a domicilio & Catering",
    hero_title:`Cocina a tu medida: <span class="accent">humana</span>, precisa, sin rigidez.`,
    hero_lead:"Cenas en casa, recepciones, brunch, eventos de empresa: me encargo de todo con cuidado real por gustos, alergias y ambiente.",
    hero_cta_primary:"Pedir presupuesto", hero_cta_secondary:"Ver menús",
    badge_1:"3 menús personalizables", badge_2:"Servicio atento y discreto", badge_3:"En tu casa o eventos",
    card_info_title:"Info rápida", card_area_label:"Zona", card_area_value:"Región de París y alrededores (según pedido)",
    card_delay_label:"Respuesta", card_delay_value:"En 24h laborables",
    card_event_label:"Eventos", card_event_value:"Cenas, cumpleaños, bodas, empresas",
    card_btn:"Ver agenda", card_note:"Consejo: cuanto más detalles (fecha, comensales, gustos), más personalizado.",
    offers_title:"Dos formas de trabajar juntos", offers_subtitle:"Misma exigencia — dos formatos: en casa o catering.",
    offers_home_title:"Chef a domicilio",
    offers_home_text:"Comida a medida en tu casa: cocino allí, emplatado cuidado y dejo la cocina impecable. Servicio cálido y discreto.",
    offers_home_li1:"Cenas íntimas (2–12)", offers_home_li2:"Experiencia tipo restaurante", offers_home_li3:"Alergias y preferencias respetadas",
    offers_catering_title:"Catering",
    offers_catering_text:"Cócteles, buffet o menú sentado: propuesta clara, entrega o servicio, logística simple y fiable.",
    offers_catering_li1:"Privado y empresa", offers_catering_li2:"Con/sin servicio", offers_catering_li3:"Presupuesto transparente",
    menus_title:"3 menús (personalizables)",
    menus_subtitle:"Nombres y precios orientativos — se ajusta según temporada, necesidades y nivel de servicio.",
    menu1_title:"Menú Esencial", menu1_price:"Desde 65€ / persona", menu1_desc:"Entrante • Principal • Postre",
    menu1_li1:"Ideal con amigos", menu1_li2:"Opción vegetariana", menu1_li3:"Adaptación de gustos",
    menu2_title:"Menú Firma", menu2_price:"Desde 95€ / persona", menu2_desc:"2 entrantes • Principal • Pre-postre • Postre",
    menu2_li1:"Ritmo restaurante", menu2_li2:"Maridaje opcional", menu2_li3:"Emplatado fino",
    menu3_title:"Menú Experiencia", menu3_price:"Desde 135€ / persona", menu3_desc:"Aperitivo • 2 entrantes • Pescado • Carne • Postre • Petit fours",
    menu3_li1:"Para celebraciones", menu3_li2:"Opción servicio en mesa", menu3_li3:"Experiencia completa",
    menus_note_strong:"Personalización:", menus_note_text:"alergias, preferencias, restricciones, puntos de cocción y objetivo (ligero, gourmet, festivo).",
    chef_title:"Detrás de Atelier Sève", chef_subtitle:"Una idea simple: escuchar, cocinar justo, cuidar.",
    chef_name:"Chef Noé Lambert",
    chef_bio:"Formado entre bistrós exigentes y eventos, elegí el formato a domicilio para poner lo humano en el centro: tus gustos, tu ritmo, tu mesa.",
    chef_li1:"Temporada y producto", chef_li2:"Elegante y relajado", chef_li3:"Respeto por tu casa (cero estrés)",
    chef_values_title:"Qué puedes esperar",
    chef_values_text:"Propuesta clara, comunicación fácil y ejecución fiable. El objetivo: que disfrutes de verdad.",
    faq1_q:"¿Opciones vegetarianas?", faq1_a:"Sí — construimos un menú vegetariano coherente.",
    faq2_q:"¿Alergias?", faq2_a:"Sí — lo hablamos antes y adapto sin comprometer.",
    faq3_q:"¿Eventos de empresa?", faq3_a:"Sí — de cóctel a menú sentado, con tiempos y logística.",
    planning_title:"Agenda (disponibilidad tipo)",
    planning_subtitle:"Indicación general. Para reservar fecha: envía tu solicitud y confirmo por respuesta (24h laborables).",
    day_mon:"Lunes", day_tue:"Martes", day_wed:"Miércoles", day_thu:"Jueves", day_fri:"Viernes", day_sat:"Sábado", day_sun:"Domingo",
    slot_lunch:"Mediodía", slot_evening:"Noche",
    planning_note:"Leyenda: Disponible / Por confirmar / Completo. (Luego puedes usar Google Calendar público.)",
    gallery_title:"Galería", gallery_subtitle:"Ambiente y platos. (Placeholders hasta que añadas tus fotos.)",
    ph1:"Entrante de temporada — fresco y herbal", ph2:"Plato firma — cocción precisa", ph3:"Postre — goloso y ligero",
    ph4:"Cóctel — bocados y verrines", ph5:"Preparación — limpia y discreta", ph6:"Mesa — simple, elegante, cálida",
    contact_title:"Contacto y reserva",
    contact_subtitle:"Incluye detalles: fecha, lugar, comensales, menú, alergias.",
    contact_direct_title:"Contacto directo",
    contact_phone_label:"Teléfono:", contact_city_label:"Base:",
    contact_direct_note:"Datos de contacto ficticios (cámbialos cuando quieras).",
    contact_form_title:"Formulario",
    f_name:"Nombre", f_email:"Email", f_service:"Servicio", opt_home:"Chef a domicilio", opt_catering:"Catering",
    f_date:"Fecha deseada", f_guests:"Comensales",
    f_details:"Detalles (lugar, gustos, alergias, presupuesto, horarios)",
    f_submit:"Enviar solicitud",
    f_note:"Sitio estático: el botón abre tu app de correo con un mensaje pre-rellenado. Luego podemos conectar Google Forms o un backend.",
    footer_rights:"Todos los derechos reservados",
    footer_legal:"Aviso legal",
    footer_privacy:"Privacidad"
  }
};

// Apply translations
function setLanguage(lang) {
  const chosen = dict[lang] ? lang : "fr";
  document.documentElement.lang = chosen;

  // Update pressed state
  $$(".lang__btn").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === chosen)));

  // Replace text nodes / html
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = dict[chosen][key];
    if (value == null) return;

    // Some keys contain inline HTML (hero_title)
    if (String(value).includes("<")) el.innerHTML = value;
    else el.textContent = value;
  });

  // Save preference
  try { localStorage.setItem("lang", chosen); } catch {}
}

$$(".lang__btn").forEach(btn => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// Initial language: saved → browser → fr
const saved = (() => { try { return localStorage.getItem("lang"); } catch { return null; } })();
const browser = (navigator.language || "fr").slice(0,2).toLowerCase();
setLanguage(saved || (dict[browser] ? browser : "fr"));

// --- Form: open mail client with pre-filled content
const form = $("#requestForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name")?.value?.trim() || "";
    const email = $("#email")?.value?.trim() || "";
    const service = $("#service")?.value || "";
    const date = $("#date")?.value || "";
    const guests = $("#guests")?.value || "";
    const details = $("#details")?.value?.trim() || "";

    const subject = encodeURIComponent(`[Demande] ${service} — ${date} — ${guests} pers.`);
    const body = encodeURIComponent(
      `Bonjour Atelier Sève,\n\n` +
      `Nom : ${name}\n` +
      `Email : ${email}\n` +
      `Prestation : ${service}\n` +
      `Date : ${date}\n` +
      `Convives : ${guests}\n\n` +
      `Détails :\n${details}\n\n` +
      `Merci !`
    );

    // Change this email whenever you want:
    const to = "bonjour@atelier-seve.fr";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
