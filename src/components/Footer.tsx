import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, GraduationCap, Scale } from 'lucide-react';
import { ACADEMIC_PROJECT_INFO } from '../data/nakhonPathomData';
import { NpLogo } from './NpLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <NpLogo size="sm" />
              <span className="text-white font-bold text-sm tracking-tight">
                NP-Safe นครปฐม
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ศูนย์รวมข้อมูลและช่วยเหลือผู้เสียหายจากการหลอกลวงออนไลน์ บนฐานคิดการคุ้มครองสิทธิมนุษยชนและศักดิ์ศรีความเป็นมนุษย์
            </p>
            <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/80 text-[11px] text-amber-300 space-y-0.5">
              <div className="font-semibold flex items-center gap-1.5 text-white">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>{ACADEMIC_PROJECT_INFO.courseName}</span>
              </div>
              <p className="text-slate-300">{ACADEMIC_PROJECT_INFO.studentCohort}</p>
              <p className="text-slate-400 text-[10px]">{ACADEMIC_PROJECT_INFO.institution}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-200">เมนูหลักของระบบ</div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('playbook')}
                  className="hover:text-white transition-colors"
                >
                  คู่มือฉุกเฉิน & Recovery Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('database')}
                  className="hover:text-white transition-colors"
                >
                  ฐานข้อมูล & Scam Pattern Mapping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('report')}
                  className="hover:text-white transition-colors"
                >
                  ระบบรายงานอย่างปลอดภัย (Safe Reporting)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('directory')}
                  className="hover:text-white transition-colors"
                >
                  สถานีตำรวจ สภ. & สิทธิผู้เสียหาย
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('knowledge')}
                  className="hover:text-white transition-colors"
                >
                  มิติสิทธิมนุษยชน 5 ด้าน & คลังความรู้
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-200">สายด่วนช่วยเหลือฉุกเฉิน</div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-rose-300 font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <a href="tel:1441" className="hover:underline">AOC 1441 (ระงับบัญชีม้า 24 ชม.)</a>
              </li>
              <li>
                <a href="tel:034340003" className="hover:text-white transition-colors">
                  ศูนย์ดำรงธรรมนครปฐม: 034-340-003
                </a>
              </li>
              <li>
                <a href="tel:1323" className="hover:text-white transition-colors">
                  สายด่วนสุขภาพจิต: 1323 (โทรฟรี 24 ชม.)
                </a>
              </li>
              <li>
                <a href="tel:1377" className="hover:text-white transition-colors">
                  คณะกรรมการสิทธิมนุษยชน (กสม.): 1377
                </a>
              </li>
              <li>
                <a href="tel:028494500" className="hover:text-white transition-colors">
                  กิจการนักศึกษา ม.มหิดล ศาลายา: 02-849-4500
                </a>
              </li>
            </ul>
          </div>

          {/* District Coverage */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-200">พื้นที่ 7 อำเภอนครปฐม</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              อำเภอพุทธมณฑล (ศาลายา) · อำเภอเมืองนครปฐม · อำเภอกำแพงแสน · อำเภอนครชัยศรี · อำเภอสามพราน · อำเภอดอนตูม · อำเภอบางเลน
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              เคารพสิทธิมนุษยชนและความเป็นส่วนตัวตามมาตรฐาน PDPA
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="text-amber-300 font-semibold italic text-center sm:text-left">
            “ข้อความหวานมักมีพิษ ความโลภคือเหยื่อ เขาเก่งหลอก แต่คุณเก่งเช็ก”
          </div>
          <div className="text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()} NP-Safe ศูนย์คุ้มครองผู้เสียหายจากการหลอกลวงออนไลน์ · โครงการ มสสส301 สิทธิมนุษยชนและการสร้างเสริมสันติภาพ มหาวิทยาลัยมหิดล ศาลายา
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://thaipoliceonline.go.th"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>ThaiPoliceOnline</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a
              href="https://pct.police.go.th"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>ศปอส.ตร.</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
