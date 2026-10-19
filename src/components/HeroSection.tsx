import React, { useState } from 'react';
import { Search, ShieldCheck, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, MapPin, Copy, Check, Quote, Activity, Radio, Lock } from 'lucide-react';
import { DISTRICTS } from '../data/nakhonPathomData';
import { NakhonPathomDistrict } from '../types/scam';
import { NpLogo } from './NpLogo';

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
              <NpLogo size="lg" />
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-700 tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>โครงการ มสสส301 สิทธิมนุษยชนและการสร้างเสริมสันติภาพ</span>
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
                    <span className="text-amber-700 font-semibold normal-case">มสสส301 สิทธิมนุษยชนและการสร้างเสริมสันติภาพ ม.มหิดล</span>
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
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">ค้นหายอดนิยม:</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('หอพักศาลายา'); onSearch('หอพักศาลายา'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  หอพักศาลายา
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('สภ.เมืองนครปฐม'); onSearch('สภ.เมืองนครปฐม'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  สภ.เมือง
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('PEA'); onSearch('PEA'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  คืนค่าไฟ PEA
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('งานออนไลน์'); onSearch('งานออนไลน์'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  งานออนไลน์ นศ.
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('ปุ๋ย'); onSearch('ปุ๋ย'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  ปุ๋ยเกษตร
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('พัสดุ'); onSearch('พัสดุ'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  พัสดุ COD
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('พระเครื่อง'); onSearch('พระเครื่อง'); }}
                  className="hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  พระเครื่อง
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

          {/* Right Column: Hero Graphic - Pure Vector Civic Cyber Shield */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-7 flex flex-col justify-between min-h-[360px]">
              
              {/* Background ambient decorative effects */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top Header inside card */}
              <div className="relative z-10 flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold tracking-wide text-emerald-400 uppercase">
                    ระบบเฝ้าระวังภัยออนไลน์ 24 ชม.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/40 text-[10px] text-amber-300 font-semibold shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>นครปฐม · มหิดล</span>
                </div>
              </div>

              {/* Center Emblem Visual */}
              <div className="relative z-10 my-4 flex flex-col items-center text-center">
                <div className="relative">
                  {/* Subtle pulsing concentric ring */}
                  <div className="absolute -inset-3 rounded-full border border-amber-400/20 animate-ping opacity-25 pointer-events-none" />
                  <div className="absolute -inset-1.5 rounded-full border border-amber-400/40 pointer-events-none" />
                  <NpLogo size="hero" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>NP-Safe Civic Cyber Shield</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    นครปฐมรู้ทันสแกมเมอร์
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    โครงการ มสสส301 สิทธิมนุษยชนและการสร้างเสริมสันติภาพ ม.มหิดล ศาลายา
                  </p>
                </div>
              </div>

              {/* 7 District Network Badges */}
              <div className="relative z-10 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-medium text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>เครือข่ายคุ้มครอง 7 อำเภอ:</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] font-semibold">Active · 8 สภ.</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'พุทธมณฑล',
                    'เมืองนครปฐม',
                    'กำแพงแสน',
                    'นครชัยศรี',
                    'สามพราน',
                    'ดอนตูม',
                    'บางเลน',
                  ].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => onSelectDistrict(d as NakhonPathomDistrict)}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-800/90 hover:bg-amber-950/60 hover:text-amber-300 hover:border-amber-500/50 text-slate-300 rounded-md border border-slate-700/80 transition-all cursor-pointer"
                    >
                      {d}
                    </button>
                  ))}
                </div>
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
