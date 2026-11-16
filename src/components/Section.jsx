export default function Section({ variant, id, children }) {
  return (
    <div className={`section section-${variant}`} id={id}>
      {children}
    </div>
  );
}
