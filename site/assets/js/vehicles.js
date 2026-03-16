// Mock Supabase client style fetch for demonstration

const PLACEHOLDER_IMAGE = "./assets/imgs/vehicle-placeholder.svg";

const mockVehicles = [
  {
    id: "v1",
    name: "Urban Shuttle Mini-Bus",
    type: "Mini-bus",
    model: "Toyota Quantum 2.5D",
    category: "Passenger",
    capacity: "14 passengers",
    workingHours: { start: "05:30", end: "21:00" },
    likes: 248,
    rating: 4.7,
    images: [
      "./assets/imgs/one.jpeg",
      "./assets/imgs/two.jpeg",
      "./assets/imgs/three.jpeg",
    ],
    owner: {
      name: "Sabelo M.",
      phone: "+268 76 123 456",
      email: "sabelo.transport@example.com",
    },
    address: "Manzini Bus Rank, Manzini, Eswatini",
    features: [
      "Daily sanitised",
      "USB charging ports",
      "Air conditioning",
      "Music system",
    ],
    certifications: {
      licenced: true,
      insured: true,
      borderCrossing: false,
    },
    description:
      "Comfortable mini-bus suited for city routes, staff shuttles, and group transfers within Eswatini.",
  },
  {
    id: "v2",
    name: "Cross-Border Cargo Truck",
    type: "Truck",
    model: "Mercedes-Benz Actros 2645",
    category: "Cargo",
    capacity: "18 tons",
    workingHours: { start: "06:00", end: "18:00" },
    likes: 132,
    rating: 4.5,
    images: [
      "./assets/imgs/four.jpeg",
      "./assets/imgs/five.jpeg",
      "./assets/imgs/six.jpeg",
    ],
    owner: {
      name: "Indabuko Logistics",
      phone: "+268 78 555 111",
      email: "bookings@indabukologistics.com",
    },
    address: "Royal Science & Technology Park, Phocweni, Manzini",
    features: [
      "GPS tracked",
      "Temperature monitoring",
      "Experienced cross-border drivers",
    ],
    certifications: {
      licenced: true,
      insured: true,
      borderCrossing: true,
    },
    description:
      "Heavy-duty truck ideal for regional deliveries, bulk goods, and cross‑border freight services.",
  },
  {
    id: "v3",
    name: "City Delivery Van",
    type: "Panel Van",
    model: "Ford Transit Custom",
    category: "Last‑mile delivery",
    capacity: "1.2 tons",
    workingHours: { start: "07:00", end: "19:00" },
    likes: 89,
    rating: 4.3,
    images: [
      "./assets/imgs/seven.jpeg",
      "./assets/imgs/eight.jpeg",
      "./assets/imgs/nine.jpeg",
    ],
    owner: {
      name: "Ncamiso D.",
      phone: "+268 79 222 890",
      email: "ncamiso.moves@example.com",
    },
    address: "Mbabane CBD, Hhohho, Eswatini",
    features: ["Same‑day deliveries", "Fragile‑items friendly", "Load securing"],
    certifications: {
      licenced: true,
      insured: true,
      borderCrossing: false,
    },
    description:
      "Compact van perfect for couriers, e‑commerce deliveries, office moves, and light logistics.",
  },
];

// Emulates an async call to Supabase
async function fetchVehiclesFromSupabaseMock() {
  // In a real implementation, you would use the Supabase JS client here:
  // const { data, error } = await supabase.from("vehicles").select("*");
  // return data;
  await new Promise((resolve) => setTimeout(resolve, 250));
  return mockVehicles;
}

function createCertificationBadges(certifications) {
  const items = [];
  if (certifications.licenced) {
    items.push('<span class="badge badge-pill badge-ok">Licenced</span>');
  }
  if (certifications.insured) {
    items.push('<span class="badge badge-pill badge-ok">Insured</span>');
  }
  if (certifications.borderCrossing) {
    items.push(
      '<span class="badge badge-pill badge-info">Cross‑border permitted</span>'
    );
  } else {
    items.push(
      '<span class="badge badge-pill badge-muted">Local routes only</span>'
    );
  }
  return items.join("");
}

function getPrimaryImage(vehicle) {
  if (Array.isArray(vehicle.images) && vehicle.images.length > 0) {
    return vehicle.images[0];
  }
  return PLACEHOLDER_IMAGE;
}

function renderVehicles(vehicles) {
  const listEl = document.getElementById("vehicles-grid");
  const emptyEl = document.getElementById("vehicles-empty");

  if (!listEl || !emptyEl) return;

  if (!vehicles.length) {
    listEl.innerHTML = "";
    emptyEl.hidden = false;
    return;
  }

  emptyEl.hidden = true;

  listEl.innerHTML = vehicles
    .map((v) => {
      const stars = "★".repeat(Math.round(v.rating));
      const emptyStars = "☆".repeat(5 - Math.round(v.rating));
      const features = v.features
        .map((f) => `<span class="badge badge-soft">${f}</span>`)
        .join("");
      const primaryImage = getPrimaryImage(v);

      return `
        <article class="vehicle-card" data-vehicle-id="${v.id}" role="button" tabindex="0" aria-label="View details for ${v.name}">
          <div class="vehicle-card__media">
            <div class="vehicle-card__img-shell">
              <img src="${primaryImage}" alt="${v.name}" loading="lazy"
                   onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'" />
            </div>
            <div class="vehicle-card__meta">
              <span class="pill">${v.category}</span>
              <span class="badge badge-soft">${v.type}</span>
            </div>
          </div>
          <div class="vehicle-card__body">
            <header class="vehicle-card__header">
              <h2>${v.name}</h2>
              <div class="vehicle-card__rating" aria-label="Rating ${v.rating} out of 5">
                <span class="vehicle-card__stars">${stars}${emptyStars}</span>
                <span class="vehicle-card__rating-number">${v.rating.toFixed(
        1
      )}</span>
                <span class="vehicle-card__likes">· ${v.likes} likes</span>
              </div>
            </header>
            <p class="vehicle-card__line">${v.model}</p>
            <p class="vehicle-card__line">
              <strong>Capacity:</strong> ${v.capacity}
            </p>
            <p class="vehicle-card__line">
              <strong>Hours:</strong> ${v.workingHours.start} – ${v.workingHours.end
        }
            </p>
            <div class="vehicle-card__chips">
              ${features}
            </div>
          </div>
          <footer class="vehicle-card__footer">
            <span class="vehicle-card__btn-label">View full details</span>
          </footer>
        </article>
      `;
    })
    .join("");
}

function openVehicleModal(vehicle) {
  const modalBackdrop = document.getElementById("vehicle-modal-backdrop");
  const modalContent = document.getElementById("vehicle-modal-content");

  if (!modalBackdrop || !modalContent) return;

  const images =
    Array.isArray(vehicle.images) && vehicle.images.length
      ? vehicle.images
      : [PLACEHOLDER_IMAGE];

  const mainImage = images[0];

  const thumbs =
    images.length > 1
      ? `<div class="modal__thumbs">
          ${images
        .map(
          (src, index) => `
            <button class="modal__thumb${index === 0 ? " is-active" : ""
            }" type="button" data-thumb-index="${index}">
              <img src="${src}" alt="${vehicle.name} image ${index + 1}" loading="lazy"
                   onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'" />
            </button>
          `
        )
        .join("")}
        </div>`
      : "";

  modalContent.innerHTML = `
    <header class="modal__header">
      <div>
        <h2>${vehicle.name}</h2>
        <p class="modal__subtitle">${vehicle.type} · ${vehicle.model}</p>
      </div>
      <button class="modal__close" type="button" data-close-modal aria-label="Close">
        ×
      </button>
    </header>
    <section class="modal__body">
      <div class="modal__layout">
        <div class="modal__media">
          <div class="vehicle-card__img-shell modal__img-shell">
            <button class="carousel__nav carousel__nav--prev" type="button" data-carousel-prev aria-label="Previous image">‹</button>
            <img id="vehicle-carousel-main" src="${mainImage}" alt="${vehicle.name}" loading="lazy"
                 onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'" />
            <button class="carousel__nav carousel__nav--next" type="button" data-carousel-next aria-label="Next image">›</button>
          </div>
          ${thumbs}
          <p class="modal__description">${vehicle.description}</p>
          <div class="modal__certs">
            ${createCertificationBadges(vehicle.certifications)}
          </div>
        </div>
        <div class="modal__details">
          <div class="modal__section">
            <h3>Quick facts</h3>
            <ul>
              <li><strong>Category:</strong> ${vehicle.category}</li>
              <li><strong>Capacity:</strong> ${vehicle.capacity}</li>
              <li><strong>Working hours:</strong> ${vehicle.workingHours.start} – ${vehicle.workingHours.end
    }</li>
              <li><strong>Likes:</strong> ${vehicle.likes}</li>
              <li><strong>Rating:</strong> ${vehicle.rating.toFixed(1)} / 5</li>
            </ul>
          </div>
          <div class="modal__section">
            <h3>Owner / Operator</h3>
            <ul>
              <li><strong>Name:</strong> ${vehicle.owner.name}</li>
              <li><strong>Phone:</strong> <a href="tel:${vehicle.owner.phone
    }">${vehicle.owner.phone}</a></li>
              <li><strong>Email:</strong> <a href="mailto:${vehicle.owner.email
    }">${vehicle.owner.email}</a></li>
              <li><strong>Base address:</strong> ${vehicle.address}</li>
            </ul>
          </div>
          <div class="modal__section">
            <h3>Highlighted features</h3>
            <div class="modal__features">
              ${vehicle.features
      .map((f) => `<span class="badge badge-soft">${f}</span>`)
      .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="modal__footer">
      <button class="btn primary" type="button" onclick="window.location.href='mailto:${vehicle.owner.email
    }?subject=Vehicle%20booking%20enquiry%20-%20${encodeURIComponent(
      vehicle.name
    )}'">
        Enquire via email
      </button>
      <button class="btn btn-ghost" type="button" data-close-modal>
        Close
      </button>
    </footer>
  `;

  // Wire up simple carousel behaviour
  let currentIndex = 0;
  const mainImgEl = modalContent.querySelector("#vehicle-carousel-main");
  const thumbButtons = Array.from(
    modalContent.querySelectorAll("[data-thumb-index]")
  );

  function updateActiveImage(nextIndex) {
    if (!mainImgEl) return;
    const clampedIndex =
      ((nextIndex % images.length) + images.length) % images.length;
    currentIndex = clampedIndex;
    const nextSrc = images[clampedIndex] || PLACEHOLDER_IMAGE;
    mainImgEl.src = nextSrc;
    thumbButtons.forEach((btn) => {
      const idx = Number(btn.getAttribute("data-thumb-index"));
      btn.classList.toggle("is-active", idx === clampedIndex);
    });
  }

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-thumb-index"));
      updateActiveImage(idx);
    });
  });

  const prevBtn = modalContent.querySelector("[data-carousel-prev]");
  const nextBtn = modalContent.querySelector("[data-carousel-next]");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      updateActiveImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      updateActiveImage(currentIndex + 1);
    });
  }

  modalBackdrop.hidden = false;
  document.body.classList.add("modal-open");
}

function closeVehicleModal() {
  const modalBackdrop = document.getElementById("vehicle-modal-backdrop");
  if (!modalBackdrop) return;
  modalBackdrop.hidden = true;
  document.body.classList.remove("modal-open");
}

function wireVehicleModalEvents(vehicles) {
  const container = document.getElementById("vehicles-grid");
  const modalBackdrop = document.getElementById("vehicle-modal-backdrop");

  if (!container || !modalBackdrop) return;

  container.addEventListener("click", (event) => {
    const card = event.target.closest(".vehicle-card");
    if (!card) return;

    const id = card.getAttribute("data-vehicle-id");
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle) return;

    openVehicleModal(vehicle);
  });

  container.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".vehicle-card");
    if (!card) return;
    event.preventDefault();
    const id = card.getAttribute("data-vehicle-id");
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle) return;
    openVehicleModal(vehicle);
  });

  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
      closeVehicleModal();
    }
  });

  modalBackdrop.addEventListener("click", (event) => {
    const closeBtn = event.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeVehicleModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVehicleModal();
    }
  });
}

async function bootstrapVehiclesPage() {
  const loadingEl = document.getElementById("vehicles-loading");
  try {
    if (loadingEl) loadingEl.hidden = false;
    const vehicles = await fetchVehiclesFromSupabaseMock();
    renderVehicles(vehicles);
    wireVehicleModalEvents(vehicles);
  } catch (e) {
    console.error("Failed to load vehicles", e);
    const emptyEl = document.getElementById("vehicles-empty");
    if (emptyEl) {
      emptyEl.textContent = "We could not load vehicles at the moment.";
      emptyEl.hidden = false;
    }
  } finally {
    if (loadingEl) loadingEl.hidden = true;
  }
}

document.addEventListener("DOMContentLoaded", bootstrapVehiclesPage);

