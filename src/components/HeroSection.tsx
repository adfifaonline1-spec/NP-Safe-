import React, { useState } from 'react';
import { Search, ShieldCheck, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, MapPin, Copy, Check, Quote } from 'lucide-react';
import { DISTRICTS } from '../data/nakhonPathomData';
import { NakhonPathomDistrict } from '../types/scam';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectDistrict: (district: NakhonPathomDistrict | 'ทั้งหมด') => void;
  onOpenReportModal: () => void;
  onOpenPlaybook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectDistrict,
  onOpenReportModal,
  onOpenPlaybook,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [sloganCopied, setSloganCopied] = useState(false);

  const sloganText = 'ข้อความหวานมักมีพิษ ความโลภคือเหยื่อ เขาเก่งหลอก แต่คุณเก่งเช็ก';

  const handleCopySlogan = () => {
    navigator.clipboard.writeText(sloganText);
    setSloganCopied(true);
    setTimeout(() => setSloganCopied(false), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className="relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mission, Search & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Context meta label with logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/src/assets/images/np_mahidol_scam_shield_1792037427243.jpg" 
                alt="ตราสัญลักษณ์ นครปฐม มหิดล" 
                className="w-12 h-12 rounded-xl object-cover border border-amber-400/60 shadow-sm shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-700 tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>โครงการวิชาสิทธิมนุษยชน</span>
                  <span className="text-slate-300">/</span>
                  <span>วิทยาลัยศาสนศึกษา ม.มหิดล ศาลายา</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  จังหวัดนครปฐม · เพื่อสังคมปลอดภัยไร้สแกมเมอร์
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2] text-balance">
              ตรวจก่อนโอน · เช็กก่อนกด <br />
              <span className="text-amber-600">เรดาร์ตรวจจับสแกมเมอร์</span> นครปฐม
            </h1>

            {/* Powerful Slogan Banner */}
            <div className="relative p-4 bg-gradient-to-r from-amber-500/10 via-amber-50 to-amber-100/60 border-2 border-amber-400/80 rounded-2xl max-w-2xl shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                    <Quote className="w-3.5 h-3.5 text-amber-600 fill-amber-600 shrink-0" />
                    <span>คติเตือนสติประจำเว็บของเรา</span>
                    <span className="text-amber-400">·</span>
                    <span className="text-amber-700 font-semibold normal-case">วิชาสิทธิมนุษยชน ม.มหิดล</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    “ข้อความหวานมักมีพิษ ความโลภคือเหยื่อ เขาเก่งหลอก แต่คุณเก่งเช็ก”
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopySlogan}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-amber-900 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-colors shadow-2xs"
                  title="คัดลอกสโลแกนเพื่อแชร์เตือนคนในครอบครัว"
                >
                  {sloganCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">คัดลอกแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-700" />
                      <span>แชร์สโลแกน</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
              เครื่องมือตรวจจับความเสี่ยงและเรดาร์เตือนภัยประจำวัน เพื่อให้ชาวนครปฐมและนักศึกษาใช้เช็กเบอร์โทร, เลขบัญชี, ลิงก์ และ SMS เป็นประจำก่อนทำธุรกรรม 
              เปลี่ยนจากการตั้งรับเมื่อถูกหลอก เป็นการป้องกันเชิงรุกร่วมกันในชุมชน
            </p>

            {/* Quick Search Box */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="flex items-center p-1.5 bg-slate-50 border border-slate-300 rounded-xl focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all shadow-xs">
                <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="พิมพ์เบอร์โทร, เลขบัญชี, ชื่อบัญชี หรือคำค้นหา..."
                  className="w-full px-3 py-2 text-sm bg-transparent border-0 focus:outline-none text-slate-800 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  ค้นหากลโกง
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700">ค้นหายอดนิยม:</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('หอพักศาลายา'); onSearch('หอพักศาลายา'); }}
                  className="hover:text-amber-700 underline underline-offset-2"
                >
                  หอพักศาลายา
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('สภ.เมืองนครปฐม'); onSearch('สภ.เมืองนครปฐม'); }}
                  className="hover:text-amber-700 underline underline-offset-2"
                >
                  สภ.เมือง
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('ปุ๋ย'); onSearch('ปุ๋ย'); }}
                  className="hover:text-amber-700 underline underline-offset-2"
                >
                  ปุ๋ยเกษตร
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('พัสดุ'); onSearch('พัสดุ'); }}
                  className="hover:text-amber-700 underline underline-offset-2"
                >
                  พัสดุ COD
                </button>
              </div>
            </form>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenPlaybook}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-500 transition-colors shadow-xs"
              >
                <AlertTriangle className="w-4 h-4 text-slate-900" />
                <span>เพิ่งโดนหลอก? ดูวิธีรับมือด่วน (72 ชม.)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-slate-500" />
                <span>แชร์ประสบการณ์ / แนวทางรับมือ</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
              {/* Floating Mahidol & Nakhon Pathom Anti-Scam Crest Badge */}
              <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-amber-400/50 shadow-md">
                <img
                  src="/src/assets/images/np_mahidol_scam_shield_1792037427243.jpg"
                  alt="ตราสัญลักษณ์ นครปฐม มหิดล"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div className="text-[10px] text-white font-bold leading-tight">
                  <span className="block text-amber-300">นครปฐม · มหิดล</span>
                  <span className="block text-slate-300 font-normal">Civic Cyber Shield</span>
                </div>
              </div>

              <img
                src="/src/assets/images/nakhon_pathom_shield_1792033755075.jpg"
                alt="NP-Safe นครปฐมรู้ทันสแกมเมอร์ พิทักษ์ชุมชนองค์พระปฐมเจดีย์"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover opacity-95 hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>นครปฐม ปลอดภัย มั่นใจ ไร้สแกมเมอร์</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  เครือข่ายความร่วมมือพลเมืองและสถานีตำรวจท้องที่
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  สภ.เมืองนครปฐม · สภ.พุทธมณฑล · สภ.กำแพงแสน · สภ.นครชัยศรี · สภ.สามพราน · สภ.ดอนตูม · สภ.บางเลน
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Tabular Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">7 อำเภอ</div>
            <div className="text-xs text-slate-500 mt-0.5">ครอบคลุมทุกตำบลทั่วทั้งนครปฐม</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">8 สถานี</div>
            <div className="text-xs text-slate-500 mt-0.5">สถานีตำรวจ สภ. พร้อมเบอร์ตรง 24 ชม.</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">15 ธนาคาร</div>
            <div className="text-xs text-slate-500 mt-0.5">สายด่วนอายัดบัญชีม้ากดโทรได้ทันที</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <div className="text-2xl font-bold text-amber-600 font-mono tabular-nums">100% ชุมชน</div>
            <div className="text-xs text-slate-500 mt-0.5">แชร์บทเรียนจริงเพื่อเป็นวิทยาทาน</div>
          </div>
        </div>

        {/* District Quick Filter Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs">
          <span className="font-semibold text-slate-700 whitespace-nowrap">เลือกอำเภอ:</span>
          <button
            onClick={() => onSelectDistrict('ทั้งหมด')}
            className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-medium whitespace-nowrap transition-colors"
          >
            ทุกอำเภอ
          </button>
          {DISTRICTS.map((district) => (
            <button
              key={district}
              onClick={() => onSelectDistrict(district)}
              className="px-3 py-1 bg-white hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 border border-slate-200 rounded-md text-slate-700 font-medium whitespace-nowrap transition-colors"
            >
              {district}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
