import { useMemo, useState } from 'react'

type WorkingHours = { start: string; end: string }

type Owner = {
  name: string
  phone: string
  email: string
}

type Certifications = {
  licenced: boolean
  insured: boolean
  borderCrossing: boolean
}

type Vehicle = {
  id: string
  name: string
  type: string
  model: string
  category: string
  capacity: string
  workingHours: WorkingHours
  likes: number
  rating: number
  images: string[]
  owner: Owner
  address: string
  features: string[]
  certifications: Certifications
  description: string
}

const PLACEHOLDER = '/vehicle-placeholder.svg'

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Urban Shuttle Mini-Bus',
    type: 'Mini-bus',
    model: 'Toyota Quantum 2.5D',
    category: 'Passenger',
    capacity: '14 passengers',
    workingHours: { start: '05:30', end: '21:00' },
    likes: 248,
    rating: 4.7,
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    owner: {
      name: 'Sabelo M.',
      phone: '+268 76 123 456',
      email: 'sabelo.transport@example.com',
    },
    address: 'Manzini Bus Rank, Manzini, Eswatini',
    features: ['Daily sanitised', 'USB charging ports', 'Air conditioning', 'Music system'],
    certifications: {
      licenced: true,
      insured: true,
      borderCrossing: false,
    },
    description:
      'Comfortable mini-bus suited for city routes, staff shuttles, and group transfers within Eswatini.',
  },
  {
    id: 'v2',
    name: 'Cross-Border Cargo Truck',
    type: 'Truck',
    model: 'Mercedes-Benz Actros 2645',
    category: 'Cargo',
    capacity: '18 tons',
    workingHours: { start: '06:00', end: '18:00' },
    likes: 132,
    rating: 4.5,
    images: [PLACEHOLDER, PLACEHOLDER],
    owner: {
      name: 'Indabuko Logistics',
      phone: '+268 78 555 111',
      email: 'bookings@indabukologistics.com',
    },
    address: 'Royal Science & Technology Park, Phocweni, Manzini',
    features: ['GPS tracked', 'Temperature monitoring', 'Experienced cross-border drivers'],
    certifications: {
      licenced: true,
      insured: true,
      borderCrossing: true,
    },
    description:
      'Heavy-duty truck ideal for regional deliveries, bulk goods, and cross‑border freight services.',
  },
  {
    id: 'v3',
    name: 'City Delivery Van',
    type: 'Panel Van',
    model: 'Ford Transit Custom',
    category: 'Last‑mile delivery',
    capacity: '1.2 tons',
    workingHours: { start: '07:00', end: '19:00' },
    likes: 89,
    rating: 4.3,
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    owner: {
      name: 'Ncamiso D.',
      phone: '+268 79 222 890',
      email: 'ncamiso.moves@example.com',
    },
    address: 'Mbabane CBD, Hhohho, Eswatini',
    features: ['Same‑day deliveries', 'Fragile‑items friendly', 'Load securing'],
    certifications: {
      licenced: true,
      insured: true,
      borderCrossing: false,
    },
    description:
      'Compact van perfect for couriers, e‑commerce deliveries, office moves, and light logistics.',
  },
]

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="vehicle-card__stars" aria-hidden="true">
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </span>
  )
}

function CertificationsBadges({ certifications }: { certifications: Certifications }) {
  return (
    <>
      {certifications.licenced && <span className="badge badge-pill badge-ok">Licenced</span>}
      {certifications.insured && <span className="badge badge-pill badge-ok">Insured</span>}
      {certifications.borderCrossing ? (
        <span className="badge badge-pill badge-info">Cross‑border permitted</span>
      ) : (
        <span className="badge badge-pill badge-muted">Local routes only</span>
      )}
    </>
  )
}

type VehicleModalProps = {
  vehicle: Vehicle
  onClose: () => void
}

function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  const [index, setIndex] = useState(0)
  const images = vehicle.images.length ? vehicle.images : [PLACEHOLDER]

  const main = images[index] ?? PLACEHOLDER

  const go = (next: number) => {
    const len = images.length
    const wrapped = ((next % len) + len) % len
    setIndex(wrapped)
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal__header">
          <div>
            <h2>{vehicle.name}</h2>
            <p className="modal__subtitle">
              {vehicle.type} · {vehicle.model}
            </p>
          </div>
          <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <section className="modal__body">
          <div className="modal__layout">
            <div className="modal__media">
              <div className="vehicle-card__img-shell modal__img-shell">
                <button
                  className="carousel__nav carousel__nav--prev"
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={main} />
                <button
                  className="carousel__nav carousel__nav--next"
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
              {images.length > 1 && (
                <div className="modal__thumbs">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      className={`modal__thumb ${i === index ? 'is-active' : ''}`}
                      onClick={() => setIndex(i)}
                    >
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <img src={src} />
                    </button>
                  ))}
                </div>
              )}
              <p className="modal__description">{vehicle.description}</p>
              <div className="modal__certs">
                <CertificationsBadges certifications={vehicle.certifications} />
              </div>
            </div>
            <div className="modal__details">
              <div className="modal__section">
                <h3>Quick facts</h3>
                <ul>
                  <li>
                    <strong>Category:</strong> {vehicle.category}
                  </li>
                  <li>
                    <strong>Capacity:</strong> {vehicle.capacity}
                  </li>
                  <li>
                    <strong>Working hours:</strong> {vehicle.workingHours.start} – {vehicle.workingHours.end}
                  </li>
                  <li>
                    <strong>Likes:</strong> {vehicle.likes}
                  </li>
                  <li>
                    <strong>Rating:</strong> {vehicle.rating.toFixed(1)} / 5
                  </li>
                </ul>
              </div>
              <div className="modal__section">
                <h3>Owner / Operator</h3>
                <ul>
                  <li>
                    <strong>Name:</strong> {vehicle.owner.name}
                  </li>
                  <li>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${vehicle.owner.phone}`}>{vehicle.owner.phone}</a>
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${vehicle.owner.email}`}>{vehicle.owner.email}</a>
                  </li>
                  <li>
                    <strong>Base address:</strong> {vehicle.address}
                  </li>
                </ul>
              </div>
              <div className="modal__section">
                <h3>Highlighted features</h3>
                <div className="modal__features">
                  {vehicle.features.map((f) => (
                    <span key={f} className="badge badge-soft">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal__footer">
          <button
            className="btn primary"
            type="button"
            onClick={() =>
              (window.location.href = `mailto:${vehicle.owner.email}?subject=${encodeURIComponent(
                `Vehicle booking enquiry - ${vehicle.name}`,
              )}`)
            }
          >
            Enquire via email
          </button>
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  )
}

export function Vehicles() {
  const [selected, setSelected] = useState<Vehicle | null>(null)

  const vehicles = useMemo(() => MOCK_VEHICLES, [])

  return (
    <>
      <section className="hero hero--compact" aria-label="Vehicles for hire overview">
        <h1>Vehicles for hire</h1>
        <p>
          Explore vehicles suited for passenger shuttles, deliveries, and cross‑border cargo. Each listing includes
          capacity, working hours, certifications, and owner contact details.
        </p>
        <div className="vehicles-toolbar" role="group" aria-label="Vehicles quick info">
          <div className="vehicles-toolbar__item">
            <span className="pill">Demo data</span>
            <span className="vehicles-toolbar__label">Mock vehicles loaded via React state.</span>
          </div>
          <div className="vehicles-toolbar__item">
            <span className="badge badge-soft">Supabase ready</span>
            <span className="vehicles-toolbar__label">
              Replace the mock array with your Supabase query.
            </span>
          </div>
        </div>
      </section>

      <section className="grid vehicles-grid" aria-label="Vehicle cards">
        {!vehicles.length && <p className="vehicles-status">No vehicles are available yet.</p>}
        <div className="vehicles-grid__inner">
          {vehicles.map((v) => {
            const primary = v.images[0] ?? PLACEHOLDER
            return (
              <article
                key={v.id}
                className="vehicle-card"
                role="button"
                tabIndex={0}
                aria-label={`View details for ${v.name}`}
                onClick={() => setSelected(v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(v)
                  }
                }}
              >
                <div className="vehicle-card__media">
                  <div className="vehicle-card__img-shell">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img src={primary} />
                  </div>
                  <div className="vehicle-card__meta">
                    <span className="pill">{v.category}</span>
                    <span className="badge badge-soft">{v.type}</span>
                  </div>
                </div>
                <div className="vehicle-card__body">
                  <header className="vehicle-card__header">
                    <h2>{v.name}</h2>
                    <div
                      className="vehicle-card__rating"
                      aria-label={`Rating ${v.rating.toFixed(1)} out of 5 with ${v.likes} likes`}
                    >
                      <Stars rating={v.rating} />
                      <span className="vehicle-card__rating-number">{v.rating.toFixed(1)}</span>
                      <span className="vehicle-card__likes">· {v.likes} likes</span>
                    </div>
                  </header>
                  <p className="vehicle-card__line">{v.model}</p>
                  <p className="vehicle-card__line">
                    <strong>Capacity:</strong> {v.capacity}
                  </p>
                  <p className="vehicle-card__line">
                    <strong>Hours:</strong> {v.workingHours.start} – {v.workingHours.end}
                  </p>
                  <div className="vehicle-card__chips">
                    {v.features.map((f) => (
                      <span key={f} className="badge badge-soft">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <footer className="vehicle-card__footer">
                  <span className="vehicle-card__btn-label">View full details</span>
                </footer>
              </article>
            )
          })}
        </div>
      </section>

      {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

