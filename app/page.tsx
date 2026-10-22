'use client'

import { useState } from 'react'
import {
  Bell,
  ChevronRight,
  Heart,
  Home,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  X,
} from 'lucide-react'

const roles = [
  { id: 'customer', label: 'Müşteri', email: 'musteri@alyaz.com', password: '123456' },
  { id: 'seller', label: 'Satıcı', email: 'satici@alyaz.com', password: '123456' },
  { id: 'admin', label: 'Admin', email: 'admin@alyaz.com', password: '123456' },
] as const

type RoleId = (typeof roles)[number]['id']

type Product = {
  name: string
  category: string
  price: string
  oldPrice?: string
  rating: string
  image: string
}

const categories = ['Tümü', 'Moda', 'Ev & Yaşam', 'Elektronik', 'Kozmetik', 'Spor']

const products: Product[] = [
  { name: 'Minimal Sneaker', category: 'Moda', price: '899,90 TL', oldPrice: '1.199 TL', rating: '4.9', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85' },
  { name: 'Seramik Vazo Seti', category: 'Ev & Yaşam', price: '349,90 TL', rating: '4.8', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=85' },
  { name: 'Kablosuz Kulaklık', category: 'Elektronik', price: '1.249,90 TL', oldPrice: '1.499 TL', rating: '4.7', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85' },
  { name: 'Günlük Çanta', category: 'Moda', price: '599,90 TL', rating: '4.9', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85' },
]

function CustomerDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Tümü' || product.category === activeCategory
    const matchesSearch = product.name.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))
    return matchesCategory && matchesSearch
  })

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  return (
    <main className="shop-page">
      <header className="shop-header">
        <div className="header-top">
          <div className="shop-brand"><span className="mini-logo">a</span><span>alyaz</span></div>
          <div className="header-actions">
            <button className="icon-button" type="button" aria-label="Bildirimler"><Bell /></button>
            <button className="icon-button cart-button" type="button" aria-label="Sepeti aç" onClick={() => setCartOpen(true)}><ShoppingCart />{cart.length > 0 && <span className="cart-count">{cart.length}</span>}</button>
            <button className="avatar-button" type="button" aria-label="Profil"><User /></button>
          </div>
        </div>
        <div className="greeting"><div><p>Günaydın, Ayşe</p><h1>Bugün ne arıyorsun?</h1></div><div className="delivery-pill"><span>●</span> 30 dk&apos;da teslimat</div></div>
        <label className="search-box"><Search /><input aria-label="Ürün ara" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ürün, kategori veya marka ara" /></label>
      </header>

      <section className="shop-content">
        <div className="section-heading"><h2>Kategoriler</h2><button type="button">Tümünü gör <ChevronRight /></button></div>
        <div className="category-row" role="tablist" aria-label="Ürün kategorileri">
          {categories.map((category, index) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={`category-chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}><span className={`category-icon category-${index}`} aria-hidden="true">{['✦', '◒', '⌂', '▣', '✧', '◉'][index]}</span>{category}</button>)}
        </div>

        <div className="promo-banner"><div><span className="promo-tag">Haftanın fırsatı</span><h2>Seçili ürünlerde<br /><strong>%30 indirim</strong></h2><button type="button" className="promo-button">Şimdi keşfet <ChevronRight /></button></div><div className="promo-orb" aria-hidden="true">%30</div></div>

        <div className="section-heading products-heading"><div><h2>Popüler ürünler</h2><p>Senin için seçtiklerimiz</p></div><button type="button">Tümünü gör <ChevronRight /></button></div>
        <div className="product-grid">
          {filteredProducts.map((product) => <article className="product-card" key={product.name}><div className="product-image-wrap"><img src={product.image} alt={product.name} /><button type="button" className={`heart-button ${favorites.includes(product.name) ? 'liked' : ''}`} onClick={() => toggleFavorite(product.name)} aria-label={`${product.name} ${favorites.includes(product.name) ? 'favorilerden çıkar' : 'favorilere ekle'}`}><Heart fill={favorites.includes(product.name) ? 'currentColor' : 'none'} /></button>{product.oldPrice && <span className="discount-badge">İndirim</span>}</div><div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><div className="rating"><Star fill="currentColor" /> {product.rating}</div><div className="price-row"><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}<button type="button" className="add-button" aria-label={`${product.name} sepete ekle`} onClick={() => { setCart((current) => [...current, product]); setCartOpen(true) }}>+</button></div></div></article>)}
        </div>
        {filteredProducts.length === 0 && <p className="empty-products">Aramana uygun ürün bulunamadı.</p>}
      </section>

      <nav className="bottom-nav" aria-label="Ana navigasyon"><button className="nav-item active" type="button"><Home /><span>Ana sayfa</span></button><button className="nav-item" type="button"><Package /><span>Siparişlerim</span></button><button className="nav-item" type="button" onClick={() => setCartOpen(true)}><ShoppingBag /><span>Sepetim</span></button><button className="nav-item" type="button" onClick={onLogout}><User /><span>Profil</span></button></nav>

      {cartOpen && <div className="drawer-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p>Alışveriş çantam</p><h2 id="cart-title">Sepetim <span>({cart.length})</span></h2></div><button className="close-button" type="button" aria-label="Sepeti kapat" onClick={() => setCartOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag /><p>Sepetin şu an boş</p><span>Beğendiğin ürünleri eklemeye başla.</span></div> : <><div className="cart-list">{cart.map((item, index) => <div className="cart-item" key={`${item.name}-${index}`}><img src={item.image} alt="" /><div><h3>{item.name}</h3><span>{item.category}</span><strong>{item.price}</strong></div><button type="button" aria-label="Ürünü çıkar" onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}>×</button></div>)}</div><div className="cart-footer"><div><span>Ara toplam</span><strong>{cart.reduce((total, item) => total + Number(item.price.replace('.', '').replace(',', '.').replace(' TL', '')), 0).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</strong></div><button type="button" className="checkout-button">Siparişi tamamla <ChevronRight /></button></div></>}</aside></div>}
    </main>
  )
}

export default function Page() {
  const [activeRole, setActiveRole] = useState<RoleId>('customer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)
  const selectedRole = roles.find((role) => role.id === activeRole) ?? roles[0]

  function selectRole(role: (typeof roles)[number]) { setActiveRole(role.id); setEmail(''); setPassword(''); setMessage('') }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (activeRole === 'customer') setShowDashboard(true); else setMessage(`${selectedRole.label} hesabı için giriş hazırlanıyor.`) }
  function quickLogin(role: (typeof roles)[number]) { setActiveRole(role.id); setEmail(role.email); setPassword(role.password); if (role.id === 'customer') setShowDashboard(true); else setMessage(`${role.label} test bilgileri dolduruldu.`) }

  if (showDashboard) return <CustomerDashboard onLogout={() => setShowDashboard(false)} />

  return <main className="login-page"><section className="login-shell" aria-labelledby="welcome-title"><div className="brand-mark" aria-hidden="true">a</div><p className="brand-name">alyaz</p><h1 id="welcome-title">Alyaz&apos;a Hoş Geldiniz</h1><p className="tagline">E-ticaret ve teslimat süper uygulaması</p><div className="login-card"><div className="role-tabs" role="tablist" aria-label="Hesap türü">{roles.map((role) => <button key={role.id} type="button" role="tab" aria-selected={activeRole === role.id} className={activeRole === role.id ? 'role-tab active' : 'role-tab'} onClick={() => selectRole(role)}>{role.label}</button>)}</div><form className="login-form" onSubmit={handleSubmit}><label htmlFor="email">E-posta adresi</label><input id="email" type="email" placeholder="ornek@email.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /><label htmlFor="password">Şifre</label><input id="password" type="password" placeholder="Şifrenizi girin" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /><button className="start-button" type="submit">Alışverişe Başla <span aria-hidden="true">→</span></button></form><div className="divider"><span>veya hızlı test girişi</span></div><div className="quick-login-list">{roles.map((role) => <button key={role.id} type="button" className="quick-login" onClick={() => quickLogin(role)}><span className={`quick-dot ${role.id}`} aria-hidden="true" />{role.label} olarak dene</button>)}</div>{message && <p className="status-message" role="status">{message}</p>}</div><p className="footer-note">Güvenli, hızlı ve herkes için Alyaz.</p></section></main>
}
