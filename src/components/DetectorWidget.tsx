import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Smartphone, 
  CreditCard, 
  Link2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Zap,
  X,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { ScamReport } from '../types/scam';

interface DetectorWidgetProps {
  reports: ScamReport[];
  onFoundReportMatch?: (query: string) => void;
  onViewReportMatch?: (query: string) => void;
  onOpenReportModal: () => void;
  onOpenPlaybook?: () => void;
}

export const DetectorWidget: React.FC<DetectorWidgetProps> = ({
  reports,
  onFoundReportMatch,
  onViewReportMatch,
  onOpenReportModal,
  onOpenPlaybook,
}) => {
  const [detectMode, setDetectMode] = useState<'all' | 'phone' | 'account' | 'text'>('all');
  const [inputQuery, setInputQuery] = useState('');
  const [copiedResult, setCopiedResult] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: 'clean' | 'warning' | 'danger';
    title: string;
    description: string;
    matchedReports: ScamReport[];
    riskScore: number; // 0 to 100
    recommendation: string;
    flags: string[];
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

    // 2. Comprehensive heuristics check
    let heuristicScore = 0;
    const flags: string[] = [];

    // Phishing / APK downloads
    if (lowerQuery.includes('.apk') || lowerQuery.includes('โหลดแอป') || lowerQuery.includes('ติดตั้ง') || lowerQuery.includes('ดาวน์โหลดไฟล์')) {
      heuristicScore += 50;
      flags.push('ตรวจพบคำสั่งติดตั้งแอปพลิเคชันหรือไฟล์ .apk (เสี่ยงแอปดูดเงินและคุมจอระยะไกล 100%)');
    }

    // Police / Court impersonation
    if (
      lowerQuery.includes('สภ.') || 
      lowerQuery.includes('ตำรวจ') || 
      lowerQuery.includes('หมายจับ') || 
      lowerQuery.includes('ฟอกเงิน') || 
      lowerQuery.includes('ปปง.') ||
      lowerQuery.includes('โอนตรวจสอบ') ||
      lowerQuery.includes('ผู้กำกับ')
    ) {
      heuristicScore += 45;
      flags.push('ตรวจพบบทสนทนาอ้างคดีความ/ข่มขู่จากตำรวจ (ตำรวจจริงไม่มีสอบปากคำผ่าน LINE หรือให้โอนเงินตรวจสอบ)');
    }

    // Time pressure / urgency
    if (
      lowerQuery.includes('15 นาที') || 
      lowerQuery.includes('หลุดจอง') || 
      lowerQuery.includes('โอนมัดจำด่วน') ||
      lowerQuery.includes('มีคนรอต่อคิว') ||
      lowerQuery.includes('โอนสิทธิ์')
    ) {
      heuristicScore += 35;
      flags.push('ตรวจพบเทคนิคกดดันเวลาเร่งรัดโอนมัดจำ (พฤติกรรมยอดนิยมของเพจหอพักทิพย์ศาลายา)');
    }

    // PEA Electricity scam
    if (
      (lowerQuery.includes('คืนเงิน') || lowerQuery.includes('ค่าไฟ') || lowerQuery.includes('มิเตอร์')) &&
      (lowerQuery.includes('pea') || lowerQuery.includes('การไฟฟ้า') || lowerQuery.includes('ลงทะเบียน'))
    ) {
      heuristicScore += 45;
      flags.push('ตรวจพบกลโกงคืนเงินประกันมิเตอร์ไฟฟ้า PEA ปลอม (การไฟฟ้าไม่มีนโยบายส่ง SMS แนบลิงก์)');
    }

    // Short links & suspicious domains
    if (
      lowerQuery.includes('bit.ly') ||
      lowerQuery.includes('tinyurl') ||
      lowerQuery.includes('cutt.ly') ||
      lowerQuery.includes('t.co') ||
      lowerQuery.includes('.cc') ||
      lowerQuery.includes('.top') ||
      lowerQuery.includes('.xyz') ||
      lowerQuery.includes('.vip') ||
      lowerQuery.includes('line.me/r/ti/g')
    ) {
      heuristicScore += 35;
      flags.push('ตรวจพบลิงก์ย่อหรือโดเมนเสี่ยงสูงที่มักใช้ปกปิดปลายทางอันตราย');
    }

    // Fake jobs / Easy income
    if (
      lowerQuery.includes('งานออนไลน์') ||
      lowerQuery.includes('กดไลก์') ||
      lowerQuery.includes('คีย์ข้อมูล') ||
      lowerQuery.includes('สำรองเงิน') ||
      lowerQuery.includes('ภารกิจ')
    ) {
      heuristicScore += 40;
      flags.push('ตรวจพบพฤติการณ์ชวนทำงานออนไลน์หลอกกินเงินสำรอง (เหยื่อส่วนใหญ่เป็นนักศึกษา)');
    }

    // PromptPay identification
    if (cleanNumbers.length === 13) {
      flags.push('ข้อมูลระบุเป็นเลขบัตรประชาชน 13 หลัก (โอนพร้อมเพย์บุคคลธรรมดา ตรวจสอบชื่อปลายทางทุกครั้ง)');
    } else if (cleanNumbers.length === 10 && cleanNumbers.startsWith('0')) {
      flags.push('ข้อมูลระบุเป็นเบอร์มือถือ 10 หลัก (ตรวจจับรูปแบบเบอร์โทรศัพท์ในประเทศไทย)');
    }

    if (matched.length > 0) {
      setScanResult({
        status: 'danger',
        riskScore: 98,
        title: `🚨 ตรวจพบในฐานข้อมูลสแกมเมอร์ (${matched.length} เคสตรงกับระบบ)`,
        description: `เบอร์โทรศัพท์หรือเลขบัญชีนี้ มีการแจ้งเตือนภัยไว้ในระบบ NP-Safe นครปฐม และได้รับการยืนยันจากพลเมือง`,
        matchedReports: matched,
        recommendation: 'ห้ามโอนเงิน ห้ามกดลิงก์ และห้ามให้ข้อมูลส่วนตัวโดยเด็ดขาด! หากเผลอโอนไปแล้วให้กดเปิดคู่มือฉุกเฉิน 72 ชม. ทันที',
        flags: flags.length > 0 ? flags : ['ตรงกับประวัติผู้หลอกลวงในสารบบนครปฐม'],
      });
      if (onFoundReportMatch) onFoundReportMatch(query);
    } else if (heuristicScore >= 40) {
      setScanResult({
        status: 'danger',
        riskScore: Math.min(95, 50 + heuristicScore),
        title: '⚠️ ตรวจพบสัญญาณอันตรายระดับสูง (Red Flags Pattern)',
        description: 'ข้อความหรือเบอร์นี้มีลักษณะตรงกับแบบแผนกลโกงที่กำลังแพร่ระบาดในนครปฐมอย่างชัดเจน',
        matchedReports: [],
        recommendation: 'ตรงกับพฤติการณ์กลโกงที่กำลังระบาด ตัดบทสนทนาทันที อย่าหลงเชื่อคำขู่หรือข้อเสนอเร่งด่วน',
        flags,
      });
    } else if (heuristicScore > 0 || cleanNumbers.length === 10 || cleanNumbers.length >= 8) {
      setScanResult({
        status: 'warning',
        riskScore: 50,
        title: 'เฝ้าระวัง: ยังไม่พบประวัติในระบบ แต่ควรตรวจสอบตัวจริงให้แน่ใจ',
        description: flags.length > 0 ? flags.join(' · ') : 'ยังไม่มีรายงานเลขนี้ในฐานข้อมูล NP-Safe แต่ควรสอบถามปลายทางให้แน่ใจก่อนทำธุรกรรม',
        matchedReports: [],
        recommendation: 'หากเป็นหอพักให้โทรสอบถามนิติบุคคลอาคารจริง / หากอ้างเป็นเจ้าหน้าที่ไม่มีการขอข้อมูลลับทางโทรศัพท์',
        flags: flags.length > 0 ? flags : ['ไม่พบในบัญชีดำ แต่ไม่ควรประมาท'],
      });
    } else {
      setScanResult({
        status: 'clean',
        riskScore: 12,
        title: 'ยังไม่พบรายงานในฐานข้อมูล NP-Safe นครปฐม',
        description: 'ไม่พบเบอร์หรือเลขบัญชีนี้ในประวัติแจ้งเตือนภัยของเครือข่ายความร่วมมือพลเมือง',
        matchedReports: [],
        recommendation: 'เพื่อความปลอดภัยสูงสุด ปฏิบัติตามหลัก 3 ไม่: "ไม่เชื่อ ไม่รีบ ไม่โอน" ก่อนทำธุรกรรมทุกครั้ง',
        flags: ['ปลอดภัยเบื้องต้นตามสารบบชุมชน'],
      });
    }
  };

  const handleCopyAlert = () => {
    if (!scanResult) return;
    const shareText = `[แจ้งเตือนภัยไซเบอร์ NP-Safe นครปฐม]
ข้อความ/เบอร์ตรวจ: "${inputQuery}"
ผลการตรวจ: ${scanResult.title} (ระดับความเสี่ยง ${scanResult.riskScore}/100)
คำแนะนำ: ${scanResult.recommendation}
ตรวจสอบเพิ่มเติมได้ที่ NP-Safe รู้ทันสแกมเมอร์ นครปฐม`;
    navigator.clipboard.writeText(shareText);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2500);
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
                  : 'วางเบอร์โทร, เลขบัญชี, พร้อมเพย์, ลิงก์, หรือข้อความที่น่าสงสัย...'
              }
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-xs"
            />
            {inputQuery && (
              <button
                type="button"
                onClick={() => {
                  setInputQuery('');
                  setScanResult(null);
                }}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700 p-0.5 rounded-full"
                title="ล้างข้อมูล"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
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
            className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 rounded-md text-slate-700 font-mono transition-colors cursor-pointer"
          >
            068-452-9182 (หอพักศาลายา)
          </button>
          <button
            type="button"
            onClick={() => {
              setInputQuery('0952318840');
              handleScan(undefined, '0952318840');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-100 hover:text-rose-900 rounded-md text-slate-700 font-mono transition-colors cursor-pointer"
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
            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-100 hover:text-rose-900 rounded-md text-slate-700 transition-colors cursor-pointer"
          >
            SMS คืนเงิน PEA (.apk)
          </button>
          <button
            type="button"
            onClick={() => {
              const text = 'ห้องหลุดจองคอนโดศาลายา โอนมัดจำด่วนใน 15 นาที';
              setInputQuery(text);
              handleScan(undefined, text);
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 rounded-md text-slate-700 transition-colors cursor-pointer"
          >
            หลุดจอง 15 นาที
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

          {/* Flags identified */}
          {scanResult.flags && scanResult.flags.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-800">จุดสังเกตสำคัญ (Indicators):</span>
              <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                {scanResult.flags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3 bg-white/90 rounded-lg border border-black/5 text-xs text-slate-800 space-y-1">
            <strong className="block text-slate-900 font-semibold">💡 ข้อปฏิบัติทันที:</strong>
            <p>{scanResult.recommendation}</p>
          </div>

          {/* Action buttons (Share / Copy / Emergency Playbook / Database) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-black/10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyAlert}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                {copiedResult ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">คัดลอกคำเตือนแล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>แชร์คำเตือนนี้ให้คนใกล้ชิด</span>
                  </>
                )}
              </button>

              {onViewReportMatch && (
                <button
                  type="button"
                  onClick={() => onViewReportMatch(inputQuery)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5 text-slate-600" />
                  <span>ค้นหาในฐานข้อมูล</span>
                </button>
              )}
            </div>

            {scanResult.status === 'danger' && onOpenPlaybook && (
              <button
                type="button"
                onClick={onOpenPlaybook}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>เผลอโอนแล้ว? เปิดคู่มือฉุกเฉิน 72 ชม.</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* If reports matched, preview them */}
          {scanResult.matchedReports.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-rose-200">
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
                className="font-bold text-slate-900 underline underline-offset-2 hover:text-black cursor-pointer"
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
