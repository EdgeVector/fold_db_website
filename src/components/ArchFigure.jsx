/** Draftsman-style figure: hand-authored SVG + uppercase caption. */
export default function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '28px 0', textAlign: 'center' }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && (
        <figcaption
          style={{
            color: '#928374',
            fontSize: '11px',
            letterSpacing: '0.06em',
            marginTop: '10px',
            textTransform: 'uppercase',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
