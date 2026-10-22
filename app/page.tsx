'use client'

import { useState } from 'react'
import { BarChart3, Bell, Check, ChevronRight, CircleDollarSign, Gift, Heart, Home, Package, Send, Share2, ShoppingBag, Sparkles, Ticket, TrendingUp, Truck, UserRound, Wallet, X, Zap } from 'lucide-react'

type Screen = 'customer' | 'admin'
const orange = '#f97316'

const orders = [
  { id: '#ALZ-2048', item: 'Minimal Sneaker', status: 'Kuryede', detail: 'Teslimata 18 dakika kaldı', progress: 72 },
  { id: '#ALZ-2039', item: 'Kablosuz Kulaklık', status: 'Teslim edildi', detail: 'Bugün, 12:40', progress: 100 },
]

function StatusBar({ order }: { order: typeof orders[number] }) {
  return <section className="module-card status-module"><div className="module-heading"><div><span className="eyebrow"><Truck /> Canlı sipariş durumu</span><h2>Siparişin yolda</h2></div><span className="live-badge"><i /> CANLI</span></div><div className="status-order"><div className="status-icon"><Package /></div><div><strong>{order.item}</strong><span>{order.id} · {order.detail}</span></div><ChevronRight /></div><div className="status-track"><div className="status-line"><span style={{ width: `${order.progress}%` }} /></div><div className="status-steps"><span className="done"><Check /> Hazırlanıyor</span><span className="current"><Truck /> Kuryede</span><span>Kapında</span></div></div><button className="outline-action">Kurye detaylarını gör <ChevronRight data-icon="inline-end" /></button></section>
}

function Wheel({ onClose }: { onClose: () => void }) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState('')
  const spin = () => { setSpinning(true); setResult(''); window.setTimeout(() => { setSpinning(false); setResult('%15 indirim kuponu kazandın!') }, 1200) }
  return <div className="overlay"><section className="wheel-modal"><button className="modal-close" onClick={onClose} aria-label="Kapat"><X /></button><div className="wheel-spark"><Gift /></div><span className="eyebrow">GÜNLÜK ŞANSIN</span><h2>Çarkıfelek</h2><p>Her gün bir kez çevir, indirimini yakala.</p><div className={`wheel ${spinning ? 'spinning' : ''}`}><div className="wheel-center"><Zap /></div><span>%10</span><span>%20</span><span>BEDAVA</span><span>%15</span></div>{result ? <div className="win-message"><Check /> {result}</div> : <button className="primary-action" onClick={spin} disabled={spinning}>{spinning ? 'Çevriliyor...' : 'Çarkı Çevir'}</button>}<small>Kuponun sepette otomatik uygulanır.</small></section></div>
}

function ShareButton({ label }: { label: string }) {
  const [shared, setShared] = useState(false)
  const share = async () => { if (navigator.share) await navigator.share({ title: 'Alyaz Market', text: label, url: window.location.href }); else await navigator.clipboard?.writeText(window.location.href); setShared(true); window.setTimeout(() => setShared(false), 1800) }
  return <button className="share-action" onClick={share}><Share2 /> {shared ? 'Paylaşıldı' : 'Paylaş'}</button>
}

function CustomerModules() {
  const [showWheel, setShowWheel] = useState(false)
  const [activeOrder, setActiveOrder] = useState(orders[0])
  return <>
    <header className="module-header"><div className="brand-lockup"><span className="mini-logo">a</span><span>alyaz <small>MARKET</small></span></div><div className="header-actions"><button className="notification-button" aria-label="Bildirimler"><Bell /><i /></button><div className="avatar">A</div></div></header>
    <main className="module-content"><div className="page-intro"><div><span className="eyebrow">MÜŞTERİ PANELİ</span><h1>Merhaba, Ayşe</h1><p>Bugün sana özel fırsatlar hazır.</p></div><button className="daily-gift" onClick={() => setShowWheel(true)}><Gift /><span>Günlük ödül</span></button></div>
      <div className="order-tabs">{orders.map((order) => <button className={activeOrder.id === order.id ? 'selected' : ''} key={order.id} onClick={() => setActiveOrder(order)}>{order.id}</button>)}</div><StatusBar order={activeOrder} />
      <div className="module-grid"><section className="module-card reward-card"><div className="reward-top"><div className="reward-icon"><Sparkles /></div><div><span className="eyebrow">SANA ÖZEL</span><h2>Bugün %20 indirim</h2></div></div><p>Favorilerini paylaş, arkadaşlarınla birlikte kazan.</p><div className="reward-actions"><button className="primary-action small"><Ticket /> Kuponu kullan</button><ShareButton label="Alyaz Market favorilerim" /></div></section><section className="module-card share-card"><div className="module-heading"><div><span className="eyebrow"><Heart /> KAYITLILARIN</span><h2>Favorilerim</h2></div><strong>12 ürün</strong></div><div className="share-preview"><div className="product-dots"><i /><i /><i /></div><span>Arkadaşların da keşfetsin</span></div><ShareButton label="Alyaz Market favori ürünlerim" /></section></div>
      <section className="module-card quick-card"><div><span className="eyebrow">HIZLI ERİŞİM</span><h2>Sepetini paylaş</h2><p>Sepetindeki 3 ürünü arkadaşlarına gönder.</p></div><ShareButton label="Alyaz Market sepetim" /></section>
    </main><nav className="bottom-nav"><button className="nav-item active"><Home />Ana sayfa</button><button className="nav-item"><Heart />Favoriler</button><button className="nav-item"><ShoppingBag />Sepetim</button><button className="nav-item"><UserRound />Hesabım</button></nav>{showWheel && <Wheel onClose={() => setShowWheel(false)} />}
  </>
}

function AdminPanel() {
  return <><header className="module-header admin-header"><div className="brand-lockup"><span className="mini-logo">a</span><span>alyaz <small>ADMIN</small></span></div><div className="admin-user"><span>Admin paneli</span><div className="avatar">AD</div></div></header><main className="module-content admin-content"><div className="page-intro"><div><span className="eyebrow">FİNANS MERKEZİ</span><h1>Günaydın, Admin</h1><p>Mağazanın finansal özetini incele.</p></div><button className="primary-action report-action"><BarChart3 /> Rapor indir</button></div><section className="finance-hero"><div><span>Bu ay toplam ciro</span><strong>₺248.640,50</strong><small><TrendingUp /> %18,4 geçen aya göre</small></div><CircleDollarSign /></section><div className="finance-stats"><div className="module-card finance-stat"><Wallet /><span>Net hakediş</span><strong>₺196.442</strong><small>Ödenecek: 28 Ekim</small></div><div className="module-card finance-stat"><Ticket /><span>Komisyon kesintisi</span><strong>₺52.198</strong><small>Ortalama %21</small></div><div className="module-card finance-stat"><Package /><span>Sipariş geliri</span><strong>₺224.890</strong><small>1.284 sipariş</small></div></div><section className="module-card report-card"><div className="module-heading"><div><span className="eyebrow">SON 30 GÜN</span><h2>Gelir ve komisyon raporu</h2></div><select aria-label="Rapor dönemi"><option>Son 30 gün</option><option>Bu yıl</option></select></div><div className="chart"><div className="chart-bars"><i style={{ height: '42%' }} /><i style={{ height: '58%' }} /><i style={{ height: '48%' }} /><i style={{ height: '74%' }} /><i style={{ height: '63%' }} /><i style={{ height: '88%' }} /><i style={{ height: '96%' }} /></div><div className="chart-labels"><span>24 Eyl</span><span>1 Eki</span><span>8 Eki</span><span>15 Eki</span><span>22 Eki</span></div></div><div className="report-rows"><div><span>Brüt satışlar</span><strong>₺248.640,50</strong></div><div><span>Alyaz komisyonu</span><strong className="negative">-₺52.198,50</strong></div><div><span>Hakediş tutarı</span><strong>₺196.442,00</strong></div></div></section></main><nav className="bottom-nav admin-nav"><button className="nav-item active"><BarChart3 />Raporlar</button><button className="nav-item"><Package />Siparişler</button><button className="nav-item"><TrendingUp />Satışlar</button><button className="nav-item"><UserRound />Hesabım</button></nav></>
}

export default function Page() { const [screen, setScreen] = useState<Screen>('customer'); return <div className="app-shell"><div className="screen-switch"><button className={screen === 'customer' ? 'active' : ''} onClick={() => setScreen('customer')}>Müşteri görünümü</button><button className={screen === 'admin' ? 'active' : ''} onClick={() => setScreen('admin')}>Admin paneli</button></div>{screen === 'customer' ? <CustomerModules /> : <AdminPanel />}</div> }
