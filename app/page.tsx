'use client'

import { useState } from 'react'

const roles = [
  { id: 'customer', label: 'Müşteri', email: 'musteri@alyaz.com', password: '123456' },
  { id: 'seller', label: 'Satıcı', email: 'satici@alyaz.com', password: '123456' },
  { id: 'admin', label: 'Admin', email: 'admin@alyaz.com', password: '123456' },
] as const

type RoleId = (typeof roles)[number]['id']

export default function Page() {
  const [activeRole, setActiveRole] = useState<RoleId>('customer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const selectedRole = roles.find((role) => role.id === activeRole) ?? roles[0]

  function selectRole(role: (typeof roles)[number]) {
    setActiveRole(role.id)
    setEmail('')
    setPassword('')
    setMessage('')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(`${selectedRole.label} hesabı için giriş hazırlanıyor.`)
  }

  function quickLogin(role: (typeof roles)[number]) {
    setActiveRole(role.id)
    setEmail(role.email)
    setPassword(role.password)
    setMessage(`${role.label} test bilgileri dolduruldu.`)
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-labelledby="welcome-title">
        <div className="brand-mark" aria-hidden="true">a</div>
        <p className="brand-name">alyaz</p>
        <h1 id="welcome-title">Alyaz&apos;a Hoş Geldiniz</h1>
        <p className="tagline">E-ticaret ve teslimat süper uygulaması</p>

        <div className="login-card">
          <div className="role-tabs" role="tablist" aria-label="Hesap türü">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={activeRole === role.id}
                className={activeRole === role.id ? 'role-tab active' : 'role-tab'}
                onClick={() => selectRole(role)}
              >
                {role.label}
              </button>
            ))}
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">E-posta adresi</label>
            <input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <label htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              placeholder="Şifrenizi girin"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button className="start-button" type="submit">Alışverişe Başla <span aria-hidden="true">→</span></button>
          </form>

          <div className="divider"><span>veya hızlı test girişi</span></div>
          <div className="quick-login-list">
            {roles.map((role) => (
              <button key={role.id} type="button" className="quick-login" onClick={() => quickLogin(role)}>
                <span className={`quick-dot ${role.id}`} aria-hidden="true" />
                {role.label} olarak dene
              </button>
            ))}
          </div>
          {message && <p className="status-message" role="status">{message}</p>}
        </div>

        <p className="footer-note">Güvenli, hızlı ve herkes için Alyaz.</p>
      </section>
    </main>
  )
}
