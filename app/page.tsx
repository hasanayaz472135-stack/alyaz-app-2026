'use client'

import { useEffect, useState } from 'react'
import { Bell, Camera, Check, ChevronRight, CircleDollarSign, Crown, Gift, Heart, Home, MapPin, Mic, Package, Pause, Play, Plus, Search, ShoppingBag, Sparkles, Star, TrendingDown, TrendingUp, UserRound, Volume2, X, Zap } from 'lucide-react'

type Screen = 'customer' | 'admin'
type Modal = 'gold' | 'ar' | 'voice' | null

const products = [
  { name: 'Minimal Sneaker', price: '₺1.249', old: '₺1.599', color: 'cream', emoji: '👟' },
  { name: 'AirPods Lite', price: '₺2.899', old: '₺3.299', color: 'lilac', emoji: '🎧' },
]

function PriceAlert({ product }: { product: typeof products[number] }) {
  const [enabled, setEnabled] = useState(false)
  return <button className={`price-alert ${enabled ? 'enabled' : ''}`} onClick={() => setEnabled(!enabled)}><Bell />{enabled ? 'Fiyat alarmı aktif' : 'Fiyatı düşünce haber ver'}</button>
}

function GoldCard({ onOpen }: { onOpen: () => void }) {
  return <section className="gold-card"><div className="gold-glow" /><div className="gold-content"><span className="eyebrow gold-eyebrow"><Crown /> ALYAZ GOLD</span><h2>Her alışverişte daha fazlası.</h2><p>2.480 puanın var. VIP indirimlere çok yakınsın.</p><div className="gold-progress"><span style={{ width: '68%' }} /></div><small>3.600 puanda Gold VIP ol</small></div><button className="gold-open" onClick={onOpen}>Kulübü keşfet <ChevronRight /></button></section>
}

function GoldModal({ onClose }: { onClose: () => void }) {
  return <div className="overlay"><section className="gold-modal"><button className="modal-close" onClick={onClose} aria-label="Kapat"><X /></button><div className="gold-medal"><Crown /></div><span className="eyebrow gold-eyebrow">ALYAZ GOLD KULÜBÜ</span><h2>VIP dünyaya hoş geldin.</h2><p>Alışveriş yaptıkça puan kazan, özel indirimleri herkesten önce yakala.</p><div className="gold-benefits"><div><Star /><span><strong>2.480</strong> puan bakiyesi</span></div><div><Gift /><span>Gold üyelikte <strong>%10</strong> VIP indirim</span></div><div><Zap /><span>Ücretsiz hızlı teslimat fırsatı</span></div></div><button className="primary-action" onClick={onClose}>Alışverişe devam et</button></section></div>
}

function ARModal({ onClose }: { onClose: () => void }) {
  const [cameraOn, setCameraOn] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  useEffect(() => () => stream?.getTracks().forEach(track => track.stop()), [stream])
  const startCamera = async () => { try { const next = await navigator.mediaDevices.getUserMedia({ video: true }); setStream(next); setCameraOn(true) } catch { setCameraOn(false) } }
  return <div className="overlay"><section className="ar-modal"><button className="modal-close" onClick={onClose} aria-label="Kapat"><X /></button><div className="ar-stage">{cameraOn && stream ? <video autoPlay playsInline ref={node => { if (node) node.srcObject = stream }} /> : <><div className="ar-room"><div className="ar-sofa" /><div className="ar-table" /></div><div className="ar-product">👟</div></>}<span className="ar-scan"><span /> AR ÖNİZLEME</span></div><div className="ar-copy"><span className="eyebrow"><Camera /> AR STÜDYO</span><h2>Odamda nasıl duruyor?</h2><p>Telefon kameranı aç, ürünü alanına yerleştir ve satın almadan önce keşfet.</p><button className="primary-action" onClick={startCamera}><Camera />{cameraOn ? 'Kamera aktif' : 'Kamerayı aç'}</button></div></section></div>
}

function VoiceModal({ onClose }: { onClose: () => void }) {
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('Sepetini yönetmek için konuşabilirsin')
  const listen = () => { setListening(true); setHeard('Dinliyorum... “sepetimi aç” diyebilirsin'); const Speech = (window as Window & { SpeechRecognition?: any }).SpeechRecognition; if (Speech) { const recognition = new Speech(); recognition.onresult = (event: any) => setHeard(`“${event.results[0][0].transcript}” komutunu algıladım`); recognition.onend = () => setListening(false); recognition.start() } else window.setTimeout(() => setListening(false), 1800) }
  return <div className="overlay"><section className="voice-modal"><button className="modal-close" onClick={onClose} aria-label="Kapat"><X /></button><div className={`voice-orb ${listening ? 'listening' : ''}`}><Mic /></div><span className="eyebrow"><Volume2 /> ALYAZ SESLİ ASİSTAN</span><h2>Nasıl yardımcı olayım?</h2><p>{heard}</p><button className="primary-action" onClick={listen}>{listening ? 'Dinliyorum...' : 'Konuşmaya başla'}</button><div className="voice-commands"><span>“Sepetimi aç”</span><span>“Kulaklık ara”</span><span>“Siparişimi takip et”</span></div></section></div>
}

function OrderTracker() {
  const [step, setStep] = useState(2)
  return <section className="module-card order-card"><div className="section-heading"><div><span className="eyebrow"><Package /> CANLI SİPARİŞ</span><h2>Siparişin yolda</h2></div><span className="live-badge"><i /> CANLI</span></div><div className="order-route"><div className="route-map"><div className="map-grid" /><div className="route-path" /><div className="map-pin store"><Package /></div><div className="map-pin courier"><span>●</span></div><div className="map-pin home"><Home /></div><div className="courier-card"><strong>Kurye yolda</strong><small>18 dk içinde kapında</small></div></div><div className="order-info"><strong>#ALZ-2048 · Minimal Sneaker</strong><span><MapPin /> Kadıköy, İstanbul</span></div></div><div className="order-steps"><span className={step >= 1 ? 'done' : ''}><Check /> Hazırlanıyor</span><span className={step >= 2 ? 'current' : ''}><Package /> Kuryede</span><span className={step >= 3 ? 'done' : ''}>Kapında</span></div><button className="outline-action" onClick={() => setStep(step === 3 ? 1 : step + 1)}>Simülasyonu ilerlet <ChevronRight /></button></section>
}

function CustomerPanel() {
  const [modal, setModal] = useState<Modal>(null)
  const [favorite, setFavorite] = useState(false)
  return <><header className="module-header"><div className="brand-lockup"><span className="mini-logo">a</span><span>alyaz <small>MARKET</small></span></div><div className="header-actions"><button className="notification-button" aria-label="Bildirimler"><Bell /><i /></button><div className="avatar">A</div></div></header><main className="module-content customer-content"><div className="page-intro"><div><span className="eyebrow">MÜŞTERİ PANELİ</span><h1>Merhaba, Ayşe</h1><p>Bugün sana özel fırsatlar hazır.</p></div><button className="gold-mini" onClick={() => setModal('gold')}><Crown /> GOLD</button></div><div className="smart-search"><Search /><span>Ürün, marka veya kategori ara...</span><button onClick={() => setModal('voice')} aria-label="Sesli arama"><Mic /></button><button aria-label="Görsel arama"><Camera /></button></div><div className="category-row"><button className="selected">Tümü</button><button>Moda</button><button>Elektronik</button><button>Ev & Yaşam</button><button>Kozmetik</button></div><OrderTracker /><GoldCard onOpen={() => setModal('gold')} /><div className="section-heading products-heading"><div><span className="eyebrow"><Sparkles /> SANA ÖZEL</span><h2>Popüler ürünler</h2></div><button className="text-action">Tümünü gör <ChevronRight /></button></div><div className="product-grid">{products.map((product, index) => <article className="product-card" key={product.name}><div className={`product-visual ${product.color}`}><span>{product.emoji}</span><button className={`heart-button ${favorite && index === 0 ? 'liked' : ''}`} onClick={() => setFavorite(index === 0 ? !favorite : favorite)} aria-label="Favorilere ekle"><Heart /></button>{index === 0 && <span className="product-tag"><TrendingDown /> Fiyat düştü</span>}</div><div className="product-info"><h3>{product.name}</h3><div className="price-row"><strong>{product.price}</strong><del>{product.old}</del><button className="add-button" aria-label="Sepete ekle"><Plus /></button></div><PriceAlert product={product} />{index === 0 && <button className="ar-button" onClick={() => setModal('ar')}><Camera /> Odamda dene</button>}</div></article>)}</div></main><nav className="bottom-nav"><button className="nav-item active"><Home />Ana sayfa</button><button className="nav-item"><Heart />Favoriler</button><button className="nav-item"><ShoppingBag />Sepetim</button><button className="nav-item" onClick={() => setModal('voice')}><Mic />Sesli asistan</button></nav>{modal === 'gold' && <GoldModal onClose={() => setModal(null)} />}{modal === 'ar' && <ARModal onClose={() => setModal(null)} />}{modal === 'voice' && <VoiceModal onClose={() => setModal(null)} />}</>
}

function AdminPanel() { return <><header className="module-header"><div className="brand-lockup"><span className="mini-logo">a</span><span>alyaz <small>ADMIN</small></span></div><div className="avatar">AD</div></header><main className="module-content"><div className="page-intro"><div><span className="eyebrow">FİNANS MERKEZİ</span><h1>Günaydın, Admin</h1><p>Mağazanın finansal özetini incele.</p></div></div><section className="finance-hero"><div><span>Bu ay toplam ciro</span><strong>₺248.640,50</strong><small><TrendingUp /> %18,4 geçen aya göre</small></div><CircleDollarSign /></section></main></> }

export default function Page() { const [screen, setScreen] = useState<Screen>('customer'); return <div className="app-shell"><div className="screen-switch"><button className={screen === 'customer' ? 'active' : ''} onClick={() => setScreen('customer')}>Müşteri görünümü</button><button className={screen === 'admin' ? 'active' : ''} onClick={() => setScreen('admin')}>Admin paneli</button></div>{screen === 'customer' ? <CustomerPanel /> : <AdminPanel />}</div> }
