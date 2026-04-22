import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiDownload, FiAlertCircle } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import toast from 'react-hot-toast';
import { getCard } from '../../api/memberApi';
import logo from '../../assets/logo.png';

const CARD_W = 440;
const CARD_H = 245;

export default function MemberCard() {
  const [card, setCard]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [scale, setScale]     = useState(1);

  const cardRef    = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    getCard()
      .then((r) => setCard(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Calculate scale based on wrapper width
  const updateScale = useCallback(() => {
    if (wrapperRef.current) {
      const available = wrapperRef.current.offsetWidth;
      setScale(Math.min(1, available / CARD_W));
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, backgroundColor: null, useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `LKP-Card-${card?.member_id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Card downloaded successfully!');
    } catch {
      toast.error('Failed to download card');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin" />
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generating Card Preview...</p>
    </div>
  );

  if (!card?.member_id) {
    return (
      <div className="max-w-xl">
        <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl flex gap-4 items-start">
          <div className="bg-amber-100 p-2 rounded-xl">
            <FiAlertCircle className="text-amber-600" size={24} />
          </div>
          <div>
            <h3 className="font-heading font-black text-amber-800 uppercase tracking-tight mb-1 text-sm sm:text-base">Profile Incomplete</h3>
            <p className="text-[12px] sm:text-sm font-medium text-amber-700/80 leading-relaxed">
              Please complete your <strong>Personal Information</strong> and <strong>Location Details</strong> to generate your official membership card.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <h2 className="font-heading text-lg font-black text-gray-800 tracking-tight">Identity Card</h2>
        <button onClick={downloadCard} disabled={downloading} className="bg-yellow-500 text-maroon-950 hover:bg-yellow-400 disabled:bg-gray-200 px-8 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg active:scale-95 flex items-center gap-2 uppercase tracking-wider mx-auto sm:mx-0">
          {downloading ? <Spinner /> : <><FiDownload size={14} /><span>Download PNG</span></>}
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm p-4 md:p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Card Preview — Responsive Scaled Container */}
          <div ref={wrapperRef} className="w-full md:w-auto md:shrink-0">
            {/* Outer box: clips the scaled card and sets correct height */}
            <div
              style={{
                width: '100%',
                maxWidth: `${CARD_W}px`,
                height: `${CARD_H * scale}px`,
                overflow: 'hidden',
                borderRadius: `${8 * scale}px`,
              }}
            >
              {/* Inner card: fixed size, scaled via transform */}
              <div
                ref={cardRef}
                style={{
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  background: 'linear-gradient(135deg, #6D0F0F 0%, #8B0000 60%, #5a0000 100%)',
                  padding: '24px',
                  fontFamily: "'Outfit', sans-serif",
                  position: 'relative',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
              >
                {/* Gold border top/bottom */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#D4AF37' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#D4AF37' }} />

                {/* Watermark */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.04, fontSize: '80px', fontWeight: 900, color: '#fff', userSelect: 'none', pointerEvents: 'none' }}>
                  LKP
                </div>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', position: 'relative' }}>
                  <div style={{ background: '#fff', padding: '5px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logo} alt="LKP" style={{ height: '32px', width: '32px', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <p style={{ color: '#D4AF37', fontWeight: 800, fontSize: '13px', letterSpacing: '0.05em', lineHeight: 1.1 }}>LOK KALYAN PARTY</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 500, fontStyle: 'italic' }}>Seva Hi Dharm</p>
                  </div>
                  <div style={{ marginLeft: 'auto', background: 'rgba(212,175,55,0.15)', padding: '4px 12px', borderLeft: '2px solid #D4AF37' }}>
                    <p style={{ color: '#D4AF37', fontSize: '9px', fontWeight: 900, letterSpacing: '1px' }}>MEMBER</p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(212,175,55,0.25)', marginBottom: '16px' }} />

                {/* Body */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {/* Photo */}
                  <div style={{ width: '80px', height: '100px', background: '#fff', border: '1.5px solid #D4AF37', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                    {card.photo_url
                      ? <img src={card.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
                      : <span style={{ color: '#6D0F0F', fontWeight: 800, fontSize: '32px' }}>{card.full_name?.charAt(0)}</span>
                    }
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#fff', fontWeight: 800, fontSize: '16px', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.full_name?.toUpperCase()}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <InfoRow label="Member ID" value={card.member_id} />
                      <InfoRow label="District"  value={`${card.district}, ${card.state}`} />
                      <InfoRow label="Mobile"    value={`+91 ${card.mobile}`} />
                    </div>
                  </div>

                  {/* QR */}
                  <div style={{ background: '#fff', padding: '4px', borderRadius: '4px', flexShrink: 0 }}>
                    <QRCodeCanvas value={`https://lokkalyanparty.in/member/${card.member_id}`} size={64} level="M" />
                  </div>
                </div>

                {/* Footer */}
                <div style={{ position: 'absolute', bottom: '16px', left: '24px', right: '24px', paddingTop: '8px', borderTop: '1px solid rgba(212,175,55,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 600 }}>lokkalyanparty.in</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 600 }}>Joined: {card.joined_at}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-5 w-full">
            <div className="space-y-2">
              <h4 className="font-heading font-black text-gray-800 text-sm uppercase tracking-wider">About your card</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                This is your official virtual identity card for the <strong>Lok Kalyan Party</strong>.
                You can download this as a high-quality PNG image to show on your mobile device or print it for physical use.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3">
              <div className="bg-maroon-700 text-white p-1 rounded-md h-fit shrink-0">
                <FiAlertCircle size={14} />
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                The QR code on the card links directly to your verified membership profile. Please ensure your personal details are accurate before sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', minWidth: '60px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}:</span>
      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '9px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || '—'}</span>
    </div>
  );
}

function Spinner() {
  return <div className="w-4 h-4 border-2 border-maroon-900 border-t-transparent rounded-full animate-spin" />;
}
