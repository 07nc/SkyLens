export default function SkylensLogo({ className = "", size = 44 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', userSelect: 'none' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={size} height={size} className={className}>
        <circle cx="24" cy="24" r="20" fill="rgba(255, 42, 85, 0.1)" stroke="#FF2A55" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="24" cy="24" r="14" fill="rgba(255, 42, 85, 0.2)" stroke="#FF2A55" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="24" cy="24" r="8" fill="rgba(255, 42, 85, 0.4)" stroke="#FF2A55" strokeWidth="2" />
        <g transform="translate(12, 12) rotate(45, 12, 12)">
          <path d="M19.58,12.08,14,8.16V4a2,2,0,0,0-4,0V8.16L4.42,12.08a1,1,0,0,0-.42.81v.93a1,1,0,0,0,1.16,1L10,14v3.62l-1.71,1.7A1.05,1.05,0,0,0,8,20v1a1,1,0,0,0,1.45.89L12,20.62l2.55,1.27A1,1,0,0,0,16,21V20a1.05,1.05,0,0,0-.29-.71L14,17.62V14l4.84.81a1,1,0,0,0,1.16-1v-.93A1,1,0,0,0,19.58,12.08Z" fill="#FFFFFF" />
        </g>
      </svg>
      <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>
        Sky<span style={{ color: '#FF2A55' }}>Lens</span>
      </span>
    </div>
  );
}