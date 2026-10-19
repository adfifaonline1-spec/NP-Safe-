import React, { useState } from 'react';
import { 
  Radio, 
  AlertCircle, 
  TrendingUp, 
  MapPin, 
  ChevronRight, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  Zap,
  Smartphone,
  CreditCard,
  Link2
} from 'lucide-react';
import { NakhonPathomDistrict } from '../types/scam';

interface DailyRadarBannerProps {
  onSelectDistrict: (district: NakhonPathomDistrict) => void;
}

export const DailyRadarBanner: React.FC<DailyRadarBannerProps> = ({ onSelectDistrict }) => {
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const dailyAlerts = [
    {
      district: 'พุทธมณฑล' as NakhonPathomDistrict,
      location: 'ศาลายา · หน้า ม.มหิดล / ซอยตั้งสิน',
      title: 'ระวังเพจหอพักทิพย์อ้าง "ห้องหลุดจอง" เร่งให้โอนมัดจำใน 15 นาที',
      level: 'ระบาดหนักวันนี้',
      urgencyBadge: 'bg-rose-600 text-white',
      advice: 'กฎเหล็ก: ต้องดูตึกจริงและเซ็นสัญญากับนิติบุคคลเท่านั้น ห้ามโอนผ่านแชทเพจ',
    },
    {
      district: 'เมืองนครปฐม' as NakhonPathomDistrict,
      location: 'พระปฐมเจดีย์ · เทศา · สนามจันทร์',
      title: 'คอลเซ็นเตอร์สวมรอย "สภ.เมืองนครปฐม" ขู่เรื่องพัสดุฟอกเงินยาเสพติด',
      level: 'เตือนภัยด่วน',
      urgencyBadge: 'bg-rose-600 text-white',
      advice: 'ตำรวจจริงไม่มีการสอบปากคำผ่านวิดีโอคอล LINE และไม่มีบัญชีกลาง ปปง.',
    },
    {
      district: 'กำแพงแสน' as NakhonPathomDistrict,
      location: 'ทุ่งบัว · ดอนข่อย · หน้า ม.เกษตรฯ',
      title: 'ระวังกลุ่ม Facebook ขายปุ๋ยเคมีราคาหลุดโรงงาน โอนแล้วบล็อกหนี',
      level: 'เฝ้าระวังเกษตรกร',
      urgencyBadge: 'bg-amber-500 text-slate-950',
      advice: 'ซื้อจากตัวแทนจำหน่ายที่มีใบอนุญาตถูกต้อง และจ่ายเงินปลายทางหลังตรวจสินค้า',
    },
    {
      district: 'สามพราน' as NakhonPathomDistrict,
      location: 'อ้อมใหญ่ · กระทุ่มล้ม · ท่าข้าม',
      title: 'SMS ปลอมอ้างการไฟฟ้า PEA นครปฐม คืนเงินประกันมิเตอร์ ให้โหลด .apk',
      level: 'แอปดูดเงิน',
      urgencyBadge: 'bg-rose-600 text-white',
      advice: 'ห้ามกดลิงก์ ห้ามติดตั้งไฟล์ .apk การไฟฟ้าไม่มีนโยบายแจกเงินผ่าน SMS',
    },
  ];

  const currentAlert = dailyAlerts[activeAlertIndex];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800 space-y-4">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 relative"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                NP-Safe Radar · เรดาร์สแกมเมอร์ประจำวัน
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                LIVE
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
              แจ้งเตือนภัยที่กำลังระบาดใน 7 อำเภอของจังหวัดนครปฐม
            </h3>
          </div>
        </div>

        {/* Quick Threat Level Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">ระดับภัยไซเบอร์วันนี้:</span>
          <span className="bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold px-2.5 py-1 rounded-md">
            ⚠️ เสี่ยงสูง (High Alert)
          </span>
        </div>
      </div>

      {/* Alert Carousel Carousel */}
      <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${currentAlert.urgencyBadge}`}>
              {currentAlert.level}
            </span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {currentAlert.location}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white">
            {currentAlert.title}
          </h4>
          <p className="text-xs text-slate-300">
            💡 {currentAlert.advice}
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end shrink-0">
          <button
            onClick={() => onSelectDistrict(currentAlert.district)}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            ดูสถิติอำเภอนี้
          </button>
          
          <div className="flex items-center gap-1">
            {dailyAlerts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAlertIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeAlertIndex === idx ? 'bg-amber-400 w-5' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`แจ้งเตือนข้อที่ ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Routine Habit Strip (ทำให้คนรู้สึกว่าใช้ประจำ!) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
          <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-300">
            <strong>มีสายแปลกโทรเข้า:</strong> วางสายแล้วเอาเบอร์มากดสแกนที่นี่
          </span>
        </div>
        <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
          <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            <strong>ก่อนโอนมัดจำหอพัก/สินค้า:</strong> ก๊อปเลขบัญชีมาเช็กความปลอดภัย
          </span>
        </div>
        <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center gap-2.5">
          <Link2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-slate-300">
            <strong>เจอ SMS แนบลิงก์:</strong> ห้ามกดเด็ดขาด วางข้อความตรวจจับที่นี่
          </span>
        </div>
      </div>
    </div>
  );
};
