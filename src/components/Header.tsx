import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Menu, X, FileText, Database, PlusCircle, Building2, BookOpen, Scale, GraduationCap } from 'lucide-react';
import { ACADEMIC_PROJECT_INFO } from '../data/nakhonPathomData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenReportModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'detector', label: 'ตรวจจับ & เรดาร์เตือนภัย', icon: ShieldAlert },
    { id: 'database', label: 'ฐานข้อมูล & แผนผังกลโกง', icon: Database },
    { id: 'playbook', label: 'คู่มือ 72 ชม. (เมื่อโดนหลอก)', icon: FileText },
    { id: 'report', label: 'แจ้งเหตุอย่างปลอดภัย', icon: PlusCircle },
    { id: 'directory', label: 'หน่วยงาน & สิทธิ', icon: Building2 },
    { id: 'knowledge', label: 'สิทธิมนุษยชน', icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Academic Sub-banner */}
      <div className="bg-slate-900 text-white text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="font-medium text-slate-300">
              โครงการบริการสังคม วิชาสิทธิมนุษยชน
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-amber-300 hidden sm:inline">
              {ACADEMIC_PROJECT_INFO.studentCohort} ({ACADEMIC_PROJECT_INFO.campus})
            </span>
          </div>
          <div className="text-slate-400 text-[10px] hidden md:block">
            Online Scam Victim Support Hub for Human Rights & Civic Protection
          </div>
        </div>
      </div>

      {/* 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div 
            onClick={() => { setActiveTab('playbook'); }}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <img 
              src="/src/assets/images/np_mahidol_scam_shield_1792037427243.jpg" 
              alt="NP-Safe นครปฐม-มหิดล สแกมเมอร์ดีเฟนส์" 
              className="w-10 h-10 rounded-lg object-cover border border-amber-500/40 shadow-sm"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  NP-Safe ศูนย์คุ้มครองผู้เสียหาย
                </span>
              </div>
              <span className="text-[11px] text-slate-500 tracking-tight whitespace-nowrap">
                เพื่อสิทธิมนุษยชนและศักดิ์ศรีความเป็นมนุษย์ จ.นครปฐม
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-line, quiet hover) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-slate-900 font-semibold border-amber-600'
                      : 'text-slate-600 hover:text-slate-900 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:1441"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap shrink-0"
              title="โทรแจ้งอายัดบัญชีม้า 24 ชม."
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>สายด่วน AOC 1441</span>
            </a>

            <button
              onClick={onOpenReportModal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              + แจ้งเหตุปลอดภัย
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md focus:outline-none"
              aria-label="เมนู"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <a
              href="tel:1441"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-md"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>โทรแจ้งอายัดบัญชีด่วน AOC 1441 (โทรฟรี 24 ชม.)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
