import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Smartphone, 
  CreditCard, 
  Link2, 
  MessageSquareWarning, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { ScamReport } from '../types/scam';

interface DetectorWidgetProps {
  reports: ScamReport[];
  onFoundReportMatch?: (query: string) => void;
  onOpenReportModal: () => void;
}

export const DetectorWidget: React.FC<DetectorWidgetProps> = ({
  reports,
  onFoundReportMatch,
  onOpenReportModal,
}) => {
  const [detectMode, setDetectMode] = useState<'all' | 'phone' | 'account' | 'text'>('all');
  const [inputQuery, setInputQuery] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'clean' | 'warning' | 'danger';
    title: string;
    description: string;
    matchedReports: ScamReport[];
    riskScore: number; // 0 to 100
    recommendation: string;
  } | null>(null);

  const handleScan = (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const query = (directText ?? inputQuery).trim();
    if (!query) return;

    const lowerQuery = query.toLowerCase();
    const cleanNumbers = query.replace(/[^0-9]/g, '');

    // 1. Search database for direct match
    const matched = reports.filter((r) => {
      const pClean = r.phoneNumber ? r.phoneNumber.replace(/[^0-9]/g, '') : '';
      const bClean = r.bankAccount ? r.bankAccount.replace(/[^0-9]/g, '') : '';

      const matchPhone = cleanNumbers.length >= 8 && pClean && (pClean.includes(cleanNumbers) || cleanNumbers.includes(pClean));
      const matchBank = cleanNumbers.length >= 6 && bClean && (bClean.includes(cleanNumbers) || cleanNumbers.includes(bClean));
      const matchText = r.story.toLowerCase().includes(lowerQuery) || r.title.toLowerCase().includes(lowerQuery);
      const matchHandle = r.scammerHandle && r.scammerHandle.toLowerCase().includes(lowerQuery);

      return matchPhone || matchBank || matchText || matchHandle;
    });

    // 2. Heuristic check for phishing links and scam scripts
    let heuristicScore = 0;
    const flags: string[] = [];

    if (lowerQuery.includes('.apk') || lowerQuery.includes('โหลดแอป') || lowerQuery.includes('ติดตั้ง')) {
      heuristicScore += 45;
      flags.push('ตรวจพบคำสั่งติดตั้งแอปหรือไฟล์ .apk (เสี่ยงแอปดูดเงินสูงสุด)');
    }
    if (lowerQuery.includes('สภ.') || lowerQuery.includes('ตำรวจ') || lowerQuery.includes('หมายจับ') || lowerQuery.includes('ฟอกเงิน') || lowerQuery.includes('ปปง.')) {
      heuristicScore += 40;
      flags.push('ตรวจพบบทสนทนาอ้างคดีความ/ข่มขู่จากตำรวจ');
    }
    if (lowerQuery.includes('15 นาที') || lowerQuery.includes('หลุดจอง') || lowerQuery.includes('โอนมัดจำด่วน')) {
      heuristicScore += 30;
      flags.push('ตรวจพบเทคนิคกดดันเวลาและเร่งรัดโอนมัดจำ');
    }
    if (lowerQuery.includes('คืนเงิน') && (lowerQuery.includes('ค่าไฟ') || lowerQuery.includes('มิเตอร์') || lowerQuery.includes('ประกัน'))) {
      heuristicScore += 40;
      flags.push('ตรวจพบกลโกงคืนเงินประกันมิเตอร์ไฟฟ้า PEA ปลอม');
    }

    if (matched.length > 0) {
      setScanResult({
        status: 'danger',
        riskScore: 95,
        title: `🚨 ตรวจพบในฐานข้อมูลสแกมเมอร์ (${matched.length} เคสที่ตรงกัน)`,
        description: `เบอร์โทรศัพท์หรือเลขบัญชีนี้ มีการแจ้งเตือนภัยไว้ในระบบ NP-Safe นครปฐม`,
        matchedReports: matched,
        recommendation: 'ห้ามโอนเงิน ห้ามกดลิงก์ และห้ามให้ข้อมูลส่วนตัวโดยเด็ดขาด!',
      });
    } else if (heuristicScore >= 40) {
      setScanResult({
        status: 'danger',
        riskScore: Math.min(90, 50 + heuristicScore),
        title: '⚠️ ตรวจพบสัญญาณอันตรายระดับสูง (Red Flags)',
        description: flags.join(' · '),
        matchedReports: [],
        recommendation: 'ตรงกับพฤติการณ์กลโกงที่กำลังระบาดในนครปฐม ควรตัดบททันทีและตรวจสอบกับหน่วยงานจริง',
      });
    } else if (heuristicScore > 0 || cleanNumbers.length === 10) {
      setScanResult({
        status: 'warning',
        riskScore: 45,
        title: 'เฝ้าระวัง: ยังไม่พบประวัติในระบบ แต่ควรตรวจสอบเพิ่มเติม',
        description: flags.length > 0 ? flags.join(' · ') : 'ยังไม่มีรายงานในฐานข้อมูล NP-Safe แต่ควรสอบถามปลายทางให้แน่ใจก่อนทำธุรกรรม',
        matchedReports: [],
        recommendation: 'หากเป็นหอพักให้ไปดูห้องจริงกับนิติบุคคล / หากเป็นตำรวจไม่มีการสอบปากคำทางโทรศัพท์',
      });
    } else {
      setScanResult({
        status: 'clean',
        riskScore: 10,
        title: 'ยังไม่พบรายงานในฐานข้อมูล NP-Safe นครปฐม',
        description: 'ไม่พบเบอร์หรือเลขบัญชีนี้ในประวัติแจ้งเตือนภัยของเครือข่าย',
        matchedReports: [],
        recommendation: 'เพื่อความปลอดภัยสูงสุด ให้ปฏิบัติตามหลัก "ไม่เชื่อ ไม่รีบ ไม่โอน" ก่อนทำธุรกรรมทุกครั้ง',
      });
    }
  };

  return (
    <div className="bg-white border-2 border-slate-900/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wide">
            <Zap className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>ระบบตรวจจับความเสี่ยงก่อนโอน (Live Pre-Transfer Scanner)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            “เขาเก่งหลอก แต่คุณเก่งเช็ก” · ตรวจจับความเสี่ยงก่อนโอน
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            ข้อความหวานมักมีพิษ ความโลภคือเหยื่อ — วางเบอร์โทรต้องสงสัย, บัญชีม้า, หรือข้อความ SMS สแกนความปลอดภัยได้ตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setDetectMode('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              detectMode === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ตรวจทั้งหมด
          </button>
          <button
            onClick={() => setDetectMode('phone')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              detectMode === 'phone' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เบอร์โทร
          </button>
          <button
            onClick={() => setDetectMode('account')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              detectMode === 'account' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เลขบัญชี
          </button>
          <button
            onClick={() => setDetectMode('text')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              detectMode === 'text' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ข้อความ SMS
          </button>
        </div>
      </div>

      {/* Input Scanner Form */}
      <form onSubmit={(e) => handleScan(e)} className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => {
                setInputQuery(e.target.value);
                if (!e.target.value) setScanResult(null);
              }}
              placeholder={
                detectMode === 'phone'
                  ? 'พิมพ์เบอร์โทรที่โทรเข้ามา เช่น 095-231-8840...'
                  : detectMode === 'account'
                  ? 'พิมพ์เลขบัญชี หรือชื่อเจ้าของบัญชีก่อนโอน...'
                  : detectMode === 'text'
                  ? 'วางข้อความ SMS หรือประโยคที่คนร้ายพิมพ์มา...'
                  : 'วางเบอร์โทร, เลขบัญชี, ชื่อบัญชี, ลิงก์, หรือข้อความที่น่าสงสัย...'
              }
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-xs"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>ตรวจจับความเสี่ยง</span>
          </button>
        </div>

        {/* Quick test buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
          <span className="font-semibold text-slate-700">ทดลองสแกนเคสจริงในนครปฐม:</span>
          <button
            type="button"
            onClick={() => {
              setInputQuery('0684529182');
              handleScan(undefined, '0684529182');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 font-mono transition-colors"
          >
            068-452-9182 (หอพักศาลายา)
          </button>
          <button
            type="button"
            onClick={() => {
              setInputQuery('0952318840');
              handleScan(undefined, '0952318840');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 font-mono transition-colors"
          >
            095-231-8840 (สภ.เมืองปลอม)
          </button>
          <button
            type="button"
            onClick={() => {
              const text = 'การไฟฟ้าส่วนภูมิภาค คืนเงินประกันมิเตอร์ กดดาวน์โหลด pea.apk';
              setInputQuery(text);
              handleScan(undefined, text);
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors"
          >
            SMS คืนเงิน PEA (แอปดูดเงิน)
          </button>
        </div>
      </form>

      {/* Result Display Box */}
      {scanResult && (
        <div
          className={`p-5 rounded-xl border transition-all space-y-4 ${
            scanResult.status === 'danger'
              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
              : scanResult.status === 'warning'
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-3">
            <div className="flex items-center gap-2.5">
              {scanResult.status === 'danger' && <XCircle className="w-6 h-6 text-rose-600 shrink-0" />}
              {scanResult.status === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />}
              {scanResult.status === 'clean' && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {scanResult.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {scanResult.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold">ดัชนีความเสี่ยง:</span>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                scanResult.status === 'danger'
                  ? 'bg-rose-600 text-white'
                  : scanResult.status === 'warning'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-emerald-600 text-white'
              }`}>
                {scanResult.riskScore} / 100
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/90 rounded-lg border border-black/5 text-xs text-slate-800 space-y-1">
            <strong className="block text-slate-900 font-semibold">💡 ข้อปฏิบัติทันที:</strong>
            <p>{scanResult.recommendation}</p>
          </div>

          {/* If reports matched, preview them */}
          {scanResult.matchedReports.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-800 block">
                เคสที่ถูกรายงานในนครปฐม:
              </span>
              <div className="space-y-2">
                {scanResult.matchedReports.map((r) => (
                  <div key={r.id} className="p-3 bg-white rounded-lg border border-rose-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{r.title}</span>
                      <span className="text-rose-700">อำเภอ{r.district}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-2">{r.story}</p>
                    <div className="text-[11px] text-amber-900 font-medium pt-1">
                      แนวทางรับมือของผู้ประสบเหตุ: {r.countermeasures}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {scanResult.status === 'danger' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-rose-900 font-medium">เคยพบเบอร์หรือบัญชีนี้เหมือนกันใช่ไหม?</span>
              <button
                onClick={onOpenReportModal}
                className="font-bold text-slate-900 underline underline-offset-2 hover:text-black"
              >
                + ร่วมรายงานเพื่ออัปเดตสถิติเตือนภัย
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
