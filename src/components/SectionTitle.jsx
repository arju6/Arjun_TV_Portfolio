export default function SectionTitle({ eyebrow, children }) {
  return <div className="section-heading">{eyebrow && <span>{eyebrow}</span>}<h2>{children}</h2></div>
}
