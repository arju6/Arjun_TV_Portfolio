import { useState, useEffect } from 'react'
import {
  ArrowDownToLine, ArrowRight, Github, Linkedin, Mail, MapPin, Phone,
  Code2, BriefcaseBusiness, GraduationCap, UserRound, ExternalLink, Send,
  Database, Monitor, Layers, Brain, Wrench, Sparkles, Award, X
} from 'lucide-react'
import Navbar from './components/Navbar'
import SectionTitle from './components/SectionTitle'
import { profile, skills, education, experience, projects, certificates } from './data/portfolio'
import api from './services/api'

function Hero() {
  return (
    <section id="home" className="hero section-wrap">
      <div className="hero-copy">
        <span className="eyebrow-pill">WELCOME TO MY PORTFOLIO</span>
        <h1>Hi, I’m<br /><span>Arjun T V</span></h1>
        <p className="hero-subtitle">A passionate <strong>Computer Science Graduate</strong> exploring boundaries of minimal design and robust engineering.</p>
        <div className="hero-actions">
          <a className="button button-light" href="#projects">View Projects <ArrowRight size={19} /></a>
          <a className="button button-outline" href="/resume.pdf" download>Download Resume <ArrowDownToLine size={18} /></a>
        </div>
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-ring"><img src="/profile.jpg" alt="Portrait of Arjun T V" /></div>
      </div>
    </section>
  )
}

function About() {
  const icons = [Monitor, Layers, Database, Code2, Wrench, Brain]
  return (
    <section id="about" className="section-wrap section-block">
      <SectionTitle eyebrow="A LITTLE ABOUT ME">About Me</SectionTitle>
      <div className="about-layout">
        <div className="about-copy">
          <p>{profile.summary} I enjoy learning new tools, solving practical problems and turning ideas into useful digital experiences.</p>
          <div className="about-facts">
            <div><UserRound /><span>Name</span><strong>{profile.name}</strong></div>
            <div><MapPin /><span>Location</span><strong>{profile.location}</strong></div>
            <div><Mail /><span>Email</span><strong>{profile.email}</strong></div>
            <div><Linkedin /><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\/?/, '').replace(/\/$/, '') || 'LinkedIn'}</a></div>
            <div><Github /><span>GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace(/^https?:\/\/(www\.)?github\.com\/?/, '').replace(/\/$/, '') || 'GitHub'}</a></div>
          </div>
        </div>
        <div className="skills-area">
          <h3>My Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, i) => {
              const Icon = icons[i] || Sparkles
              return <article className="skill-card" key={skill.title}><Icon /><h4>{skill.title}</h4><p>{skill.items}</p></article>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Qualifications() {
  return (
    <section id="qualifications" className="section-wrap section-block">
      <SectionTitle eyebrow="MY JOURNEY">Qualifications</SectionTitle>
      <div className="qualification-columns">
        <div>
          <h3 className="subsection-title"><GraduationCap /> Education</h3>
          <div className="timeline">
            {education.map(item => <article className="timeline-item" key={item.title}>
              <div className="timeline-top"><h4>{item.title}</h4><span>{item.period}</span></div>
              <p>{item.place}</p><small>{item.detail}</small>
            </article>)}
          </div>
        </div>
        <div>
          <h3 className="subsection-title"><BriefcaseBusiness /> Experience</h3>
          <div className="timeline">
            {experience.map(item => <article className="timeline-item" key={item.title}>
              <div className="timeline-top"><h4>{item.title}</h4><span>{item.period}</span></div>
              <p>{item.place}</p><small>{item.detail}</small>
            </article>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const icons = [BriefcaseBusiness, Code2, UserRound]
  return (
    <section id="projects" className="section-wrap section-block">
      <SectionTitle eyebrow="WHAT I’VE BEEN BUILDING">Featured Projects</SectionTitle>
      <div className="projects-grid">
        {projects.map((project, i) => {
          const Icon = icons[i] || Code2
          return <article className="project-card" key={project.title}>
            <Icon className="project-icon" />
            <h3>{project.title}</h3>
            <span className="project-subtitle">{project.subtitle}</span>
            <p>{project.description}</p>
            <div className="tag-list">{project.tags.map(tag => <span key={tag}>#{tag.replaceAll(' ', '')}</span>)}</div>
          </article>
        })}
      </div>
    </section>
  )
}

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    if (!selectedCert) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCert])

  return (
    <section id="certificates" className="section-wrap section-block">
      <div className="section-title-row">
        <SectionTitle eyebrow="LEARNING & MILESTONES">Certificates</SectionTitle>
        <span className="muted-note">{certificates.length} credentials</span>
      </div>
      <div className="cert-grid">
        {certificates.map((cert) => (
          <article
            className="cert-card"
            key={cert.title}
            onClick={() => setSelectedCert(cert)}
            tabIndex={0}
            role="button"
            aria-label={`View certificate for ${cert.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedCert(cert)
              }
            }}
          >
            <div className="cert-preview">
              <div className="cert-mark"><Sparkles /></div>
              <span>CERTIFICATE</span>
              <small>ARJUN T V</small>
            </div>
            <div className="cert-info">
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              <small>{cert.date}</small>
              <div className="cert-card-action">
                {cert.file ? (
                  <span className="cert-link-text">
                    View certificate <ExternalLink size={14} />
                  </span>
                ) : (
                  <span className="muted-note">Credential details</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedCert && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setSelectedCert(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div className="cert-modal-title">
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.issuer} · {selectedCert.date}</p>
              </div>
              <div className="cert-modal-actions">
                {selectedCert.file && (
                  <>
                    <a
                      className="button button-outline cert-action-btn"
                      href={selectedCert.file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={15} /> New Tab
                    </a>
                    <a
                      className="button button-light cert-action-btn"
                      href={selectedCert.file}
                      download
                    >
                      <ArrowDownToLine size={15} /> Download
                    </a>
                  </>
                )}
                <button
                  className="cert-close-btn"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="cert-modal-body">
              {selectedCert.file ? (
                <object
                  data={`${selectedCert.file}#view=FitH`}
                  type="application/pdf"
                  className="cert-iframe"
                >
                  <iframe
                    src={selectedCert.file}
                    title={selectedCert.title}
                    className="cert-iframe"
                  />
                </object>
              ) : (
                <div className="cert-modal-placeholder">
                  <Award size={48} />
                  <h4>{selectedCert.title}</h4>
                  <p>Issued by <strong>{selectedCert.issuer}</strong></p>
                  <small>Completion: {selectedCert.date}</small>
                  <span className="credential-badge">
                    Verified Credential · Physical document file pending upload
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    setSending(true); setStatus('')
    try {
      await api.post('/contact', form)
      setStatus('Message sent successfully. Thank you!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Contact form submission error:', err)
      const errorMsg = err.response?.data?.message || ('Could not send right now. Please email me directly at ' + profile.email)
      setStatus(errorMsg)
    } finally { setSending(false) }
  }
  return (
    <section id="contact" className="section-wrap section-block contact-section">
      <div className="contact-copy">
        <SectionTitle eyebrow="LET’S CONNECT">Get In Touch</SectionTitle>
        <p>Have a project in mind or just want to say hello? Feel free to reach out.</p>
        <a href={`mailto:${profile.email}`}><Mail />{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin />{profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>
        <a href={profile.github} target="_blank" rel="noreferrer"><Github />{profile.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>
        <span><MapPin />{profile.location}</span>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <input name="name" value={form.name} onChange={update} placeholder="Your Name" required />
        <input name="email" type="email" value={form.email} onChange={update} placeholder="Your Email" required />
        <textarea name="message" value={form.message} onChange={update} placeholder="Your Message" rows="5" required />
        <button className="button button-light" disabled={sending}>{sending ? 'Sending…' : 'Send Message'} <Send size={16} /></button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  )
}

export default function App() {
  return <>
    <Navbar />
    <main><Hero /><About /><Qualifications /><Projects /><Certificates /><Contact /></main>
    <footer className="footer"><span>© {new Date().getFullYear()} Arjun T V</span><span>Designed with simplicity.</span><a href="#home">Back to top ↑</a></footer>
  </>
}
