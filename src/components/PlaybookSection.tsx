import React, { useState } from 'react';
import { 
  AlertCircle, 
  PhoneCall, 
  ShieldAlert, 
  Clock, 
  FileCheck2, 
  CheckCircle2, 
  Copy, 
  Printer, 
  HeartHandshake, 
  Building, 
  ExternalLink,
  ChevronRight,
  Info,
  Sliders,
  CheckSquare,
  Square,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BANK_CONTACTS, DISTRICTS, SCAM_CATEGORIES_METADATA } from '../data/nakhonPathomData';
import { NakhonPathomDistrict, ScamCategory } from '../types/scam';

interface PlaybookSectionProps {
  onGoToDirectory: () => void;
}

export const PlaybookSection: React.FC<PlaybookSectionProps> = ({ onGoToDirectory }) => {
  // Wizard state for "Scam Recovery Checklist"
  const [wizardCategory, setWizardCategory] = useState<ScamCategory>('callcenter');
  const [wizardPaymentStatus, setWizardPaymentStatus] = useState<
    'recent_72h' | 'past_72h' | 'app_drain' | 'not_transferred'
  >('recent_72h');
  const [hasSlip, setHasSlip] = useState(true);
  const [hasChat, setHasChat] = useState(true);
  const [hasPhone, setHasPhone] = useState(true);
  const [hasBankAcc, setHasBankAcc] = useState(true);
  const [wizardGenerated, setWizardGenerated] = useState(true);

  // Case statement builder state
  const [victimName, setVictimName] = useState('');
  const [victimPhone, setVictimPhone] = useState('');
  const [district, setDistrict] = useState<NakhonPathomDistrict>('เมืองนครปฐม');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState('14:30');
  const [scammerPhone, setScammerPhone] = useState('');
  const [scammerBank, setScammerBank] = useState('');
  const [scammerAccount, setScammerAccount] = useState('');
  const [scammerName, setScammerName] = useState('');
  const [amount, setAmount] = useState('');
  const [bankCaseId, setBankCaseId] = useState('');
  const [onlinePoliceId, setOnlinePoliceId] = useState('');
  const [scamStory, setScamStory] = useState('');
  const [evidenceReceipt, setEvidenceReceipt] = useState(true);
  const [evidenceChat, setEvidenceChat] = useState(true);
  const [evidenceCallLog, setEvidenceCallLog] = useState(true);
  const [evidenceLink, setEvidenceLink] = useState(false);

  const [copied, setCopied] = useState(false);

  const generateStatementText = () => {
    return `เอกสารสรุปข้อเท็จจริงและพยานหลักฐานเบื้องต้นเพื่อร้องทุกข์ต่อพนักงานสอบสวน
สถานที่รับผิดชอบ: สถานีตำรวจภูธรในพื้นที่จังหวัดนครปฐม (สภ.ประจำพื้นที่ ${district})
วันที่จัดทำเอกสาร: ${new Date().toLocaleDateString('th-TH')}

1. ข้อมูลผู้เสียหาย:
- ชื่อ-นามสกุล: ${victimName || '[ยังไม่ได้ระบุ]'}
- เบอร์โทรศัพท์: ${victimPhone || '[ยังไม่ได้ระบุ]'}
- พื้นที่พักอาศัย/เกิดเหตุ: อำเภอ${district} จังหวัดนครปฐม

2. ข้อมูลการเกิดเหตุและความเสียหาย:
- วันที่และเวลาเกิดเหตุ: วันที่ ${incidentDate} เวลาประมาณ ${incidentTime} น.
- จำนวนเงินความเสียหายรวม: ${amount ? Number(amount).toLocaleString() + ' บาท' : '[ยังไม่ได้ระบุ]'}
- เลขรับแจ้งเหตุจากธนาคาร (Bank Case ID): ${bankCaseId || '[ยังไม่ได้ระบุ / ต้องรีบขอจาก Call Center ธนาคาร]'}
- เลขรับแจ้งความออนไลน์ (ThaiPoliceOnline): ${onlinePoliceId || '[ยังไม่ได้ระบุ]'}

3. ข้อมูลบัญชีและช่องทางติดต่อของคนร้าย:
- เบอร์โทรศัพท์ของคนร้าย: ${scammerPhone || '-'}
- บัญชีม้าปลายทาง: ธนาคาร ${scammerBank || '-'} เลขที่บัญชี ${scammerAccount || '-'}
- ชื่อเจ้าของบัญชีปลายทาง: ${scammerName || '-'}

4. พฤติการณ์แห่งคดีโดยย่อ:
${scamStory || '[โปรดระบุพฤติการณ์ เช่น คนร้ายโทรมาอ้างเป็นใคร หลอกลวงอย่างไร และให้โอนเงินไปยังบัญชีใด]'}

5. รายการพยานหลักฐานที่แนบส่งมอบ:
${evidenceReceipt ? '- สำเนาสลิปหลักฐานการโอนเงิน (มี QR Code ชัดเจน)\n' : ''}${evidenceChat ? '- ภาพถ่ายบันทึกหน้าจอการสนทนา (แชท LINE, ข้อความ SMS หรือ Facebook)\n' : ''}${evidenceCallLog ? '- ภาพบันทึกประวัติการโทรเข้า-ออก และเบอร์ที่ติดต่อ\n' : ''}${evidenceLink ? '- ลิงก์เว็บไซต์ปลอม หรือไฟล์ .apk ที่ถูกหลอกให้ติดตั้ง\n' : ''}
ลงชื่อผู้แจ้ง/ผู้เสียหาย .....................................................
( ${victimName || '.....................................................'} )`;
  };

  const handleCopy = async () => {
    const text = generateStatementText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 py-4">
      {/* Golden Window Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/30 border border-rose-300/40 rounded-full text-xs font-semibold text-rose-100">
            <Clock className="w-3.5 h-3.5" />
            <span>ช่วงนาทีทอง 72 ชั่วโมงแรก (Golden Window)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            หากเพิ่งรู้ตัวว่าถูกหลอกโอนเงิน อย่าเพิ่งตกใจ ทำตาม 4 ขั้นตอนนี้ทันที!
          </h2>
          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
            กฎหมายใหม่ (พ.ร.ก. มาตรการป้องกันและปราบปรามอาชญากรรมทางเทคโนโลยี พ.ศ. 2566) 
            ให้อำนาจธนาคารระงับการทำธุรกรรมและอายัดบัญชีม้าได้ทันที 72 ชั่วโมง โดยไม่ต้องรอใบแจ้งความจากตำรวจในชั่วโมงแรก!
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="tel:1441"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-rose-900 font-bold text-sm rounded-lg hover:bg-rose-50 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>กดโทรศูนย์ AOC 1441 ทันที</span>
            </a>
            <a
              href="https://thaipoliceonline.go.th"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-700/80 hover:bg-rose-700 text-white font-medium text-sm rounded-lg transition-colors border border-rose-400/30"
            >
              <span>แจ้งความออนไลน์ thaipoliceonline</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* FEATURE 1: Interactive Scam Recovery Checklist (Required by prompt) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <Sparkles className="w-4 h-4" />
            <span>ฟีเจอร์เด่น: ระบบประมวลผลแผนฟื้นฟูสิทธิเฉพาะบุคคล</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Scam Recovery Checklist (เช็กลิสต์ขั้นตอนรับมือตามสถานการณ์ของคุณ)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ตอบคำถาม 3 ข้อสั้นๆ ด้านล่าง ระบบจะคำนวณแผนการปฏิบัติตัวและแนวทางกอบกู้สิทธิที่ตรงกับเคสของคุณทันที
          </p>
        </div>

        {/* Wizard Question Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Question 1: Type of Scam */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              1. คุณถูกหลอกในลักษณะใด?
            </label>
            <select
              value={wizardCategory}
              onChange={(e) => setWizardCategory(e.target.value as ScamCategory)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
            >
              {Object.entries(SCAM_CATEGORIES_METADATA).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Question 2: Payment status */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              2. สถานะการโอนเงิน/ความเสียหาย
            </label>
            <select
              value={wizardPaymentStatus}
              onChange={(e) =>
                setWizardPaymentStatus(
                  e.target.value as 'recent_72h' | 'past_72h' | 'app_drain' | 'not_transferred'
                )
              }
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
            >
              <option value="recent_72h">เพิ่งโอนเงินไป (ยังไม่เกิน 72 ชั่วโมง) ⭐ นาทีทอง</option>
              <option value="past_72h">โอนเงินไปแล้วเกิน 72 ชั่วโมง</option>
              <option value="app_drain">เผลอติดตั้งแอป .apk / หน้าจอค้างโดนดูดเงิน</option>
              <option value="not_transferred">ยังไม่ได้โอนเงิน / ไหวตัวทันรอดมาได้</option>
            </select>
          </div>

          {/* Question 3: Evidence checklist */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              3. คุณมีหลักฐานใดอยู่ในมือแล้วบ้าง?
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSlip}
                  onChange={(e) => setHasSlip(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>สลิปโอนเงิน</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasChat}
                  onChange={(e) => setHasChat(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>แชท/เพจ</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPhone}
                  onChange={(e) => setHasPhone(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>เบอร์โทรเข้า</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBankAcc}
                  onChange={(e) => setHasBankAcc(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>เลขบัญชีม้า</span>
              </label>
            </div>
          </div>
        </div>

        {/* Dynamic Action Plan Output */}
        <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-700" />
              <span className="text-sm font-bold text-slate-900">
                แผนปฏิบัติการกอบกู้สิทธิเฉพาะเคสของคุณ (Action Plan)
              </span>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
              {wizardPaymentStatus === 'recent_72h' && 'สถานะ: วิกฤต 72 ชม. แรก'}
              {wizardPaymentStatus === 'app_drain' && 'สถานะ: ตัดการเชื่อมต่อทันที'}
              {wizardPaymentStatus === 'past_72h' && 'สถานะ: เร่งกระบวนการทางคดี'}
              {wizardPaymentStatus === 'not_transferred' && 'สถานะ: ปลอดภัย / แจ้งเตือนภัย'}
            </span>
          </div>

          <div className="space-y-3">
            {/* Step-by-step custom tailored guidance */}
            {wizardPaymentStatus === 'recent_72h' && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-2 text-rose-950">
                <div className="font-bold flex items-center gap-1.5 text-rose-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>ขั้นตอนด่วนที่สุด (ทำทันทีใน 1 ชั่วโมงนี้):</span>
                </div>
                <p>
                  1. โทรสายด่วนธนาคารต้นทางของคุณทันที (ดูเบอร์ด้านล่าง) แจ้งขอ <strong>"Bank Case ID"</strong> เพื่ออายัดเงิน 72 ชม. ตาม พ.ร.ก. อาชญากรรมทางเทคโนโลยี
                </p>
                <p>
                  2. โทรแจ้ง AOC 1441 หรือกรอกเว็บไซต์ <strong>thaipoliceonline.go.th</strong> เพื่อออกหมายเลขเคสออนไลน์
                </p>
              </div>
            )}

            {wizardPaymentStatus === 'app_drain' && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-2 text-rose-950">
                <div className="font-bold flex items-center gap-1.5 text-rose-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>โทรศัพท์ถูกควบคุม/ติดตั้งแอปดูดเงิน (ทำทันที):</span>
                </div>
                <p>
                  1. <strong>ตัดสัญญาณเน็ตทันที:</strong> ปิด Wi-Fi, ปิดเน็ตมือถือ, หรือถอดซิมการ์ดออกจากเครื่องทันที
                </p>
                <p>
                  2. <strong>ใช้เครื่องอื่นโทรอายัดบัญชี:</strong> โทรหา Call Center ของทุกธนาคารที่คุณมีแอปในเครื่องเพื่อระงับการโอนเงิน
                </p>
                <p>
                  3. <strong>ล้างเครื่อง:</strong> นำโทรศัพท์ไปกู้คืนค่าโรงงาน (Factory Reset) อย่าเพิ่งกรอกรหัสผ่านใดๆ
                </p>
              </div>
            )}

            {wizardCategory === 'dorm_student' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-950 space-y-1">
                <strong>คำแนะนำเฉพาะนักศึกษา (ม.มหิดล ศาลายา / ม.เกษตรฯ กำแพงแสน):</strong>
                <p>
                  เคสหอพักทิพย์มักใช้รูปปลอม ให้รวบรวมลิงก์เพจและสลิป ติดต่อ <strong>สภ.พุทธมณฑล</strong> หรือ <strong>กองกิจการนักศึกษา ม.มหิดล (MLC ศาลายา โทร 02-849-4500)</strong> ทางมหาวิทยาลัยมีฝ่ายนิติการคอยให้คำปรึกษาฟรีแก่นักศึกษา
                </p>
              </div>
            )}

            {/* Evidence Audit */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-2">
              <span className="font-bold text-slate-800 block">การประเมินความพร้อมของพยานหลักฐาน:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div className="flex items-center gap-1.5">
                  {hasSlip ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{hasSlip ? 'มีสลิปโอนเงิน (พร้อม QR Code)' : '⚠️ ขาดสลิป: ให้เปิด Statement จากแอปธนาคาร'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasChat ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{hasChat ? 'มีภาพแคปหน้าจอการสนทนา' : '⚠️ ขาดแชท: รีบแคปก่อนมิจฉาชีพกดยกเลิกข้อความ'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasPhone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{hasPhone ? 'มีประวัติเบอร์โทรคนร้าย' : 'ไม่มีเบอร์โทร (ติดต่อผ่านแชทล้วน)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasBankAcc ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{hasBankAcc ? 'มีเลขบัญชีและชื่อบัญชีม้า' : '⚠️ ขาดเลขบัญชี: ตรวจสอบจากสลิปโอนเงิน'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">
                นำข้อมูลเหล่านี้ไปกรอกในระบบสร้างเอกสารแจ้งความด้านล่างได้ทันที
              </span>
              <a
                href="#police-builder"
                className="font-bold text-amber-800 underline underline-offset-2 hover:text-amber-950 inline-flex items-center gap-1"
              >
                <span>ไปยังตัวสร้างเอกสารแจ้งความ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Action Flow */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-900">
            ขั้นตอนปฏิบัติการฉุกเฉินเมื่อตกเป็นเหยื่อ
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            เรียงตามลำดับความเร่งด่วน เพื่อโอกาสในการระงับเงินในบัญชีม้าก่อนถูกโอนออกนอกประเทศ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                ขั้นตอนที่ 1 (นาทีที่ 0 - 60)
              </span>
              <PhoneCall className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              โทรอายัดบัญชีธนาคารทันที
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              โทรหา Call Center ของธนาคารที่คุณใช้โอนเงินออกทันที แจ้งว่า 
              <strong> "ต้องการแจ้งเหตุภัยทางการเงินเพื่อขอระงับธุรกรรมและขอรับ Bank Case ID"</strong>
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">สำคัญ:</span> จดบันทึก 
              <span className="text-amber-800 font-mono font-bold"> Bank Case ID</span> เพื่อนำไปแจ้งความต่อไป
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                ขั้นตอนที่ 2 (ชั่วโมงที่ 1 - 24)
              </span>
              <FileCheck2 className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              แจ้งความออนไลน์หรือโทร 1441
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              เข้าไปที่เว็บไซต์ <strong>thaipoliceonline.go.th</strong> เพื่อกรอกข้อมูล หรือโทรสายด่วน AOC 1441 ให้เจ้าหน้าที่ประสานงานระบบฐานข้อมูลตำรวจและ ปปง.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              ระบบจะออกเลขรับแจ้งความออนไลน์ เพื่อส่งเรื่องต่อไปยัง สภ. ในนครปฐม
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                ขั้นตอนที่ 3 (เตรียมหลักฐาน)
              </span>
              <Printer className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              รวบรวมพยานหลักฐาน
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              แคปหน้าจอแชททั้งหมด, สลิปโอนเงิน (ห้ามตัดขอบ), เบอร์โทรที่โทรเข้า, ลิงก์หรือชื่อเพจ 
              ใช้เครื่องมือด้านล่างนี้สร้างใบสรุปสำนวนคดี
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              พิมพ์ออกมาหรือบันทึกรูปไว้ในมือถือเพื่อพร้อมยื่นพนักงานสอบสวน
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                ขั้นตอนที่ 4 (พบร้อยเวร)
              </span>
              <Building className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              พบร้อยเวร สภ. ในนครปฐม
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              เดินทางไปพบพนักงานสอบสวนที่ สภ. ท้องที่เกิดเหตุ เช่น สภ.เมืองนครปฐม, สภ.พุทธมณฑล, สภ.กำแพงแสน 
              เพื่อให้ร้อยเวรออกหมายอายัดบัญชีถาวร
            </p>
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={onGoToDirectory}
                className="text-xs text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>ดูเบอร์และที่ตั้ง สภ. ทั้งหมด</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Bank Hotline Dial Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              เบอร์โทรด่วนอายัดบัญชีธนาคาร (กดโทรได้ทันทีตลอด 24 ชม.)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              กดปุ่มโทรด้านล่างตามธนาคารของบัญชีต้นทางที่คุณใช้โอนเงิน
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BANK_CONTACTS.map((bank) => (
            <div
              key={bank.id}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{bank.bankName}</div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">{bank.hotline}</div>
              </div>
              <a
                href={`tel:${bank.hotlineRaw}`}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                โทรด่วน
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Police Statement Builder (Interactive Tool) */}
      <div id="police-builder" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-20">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <FileCheck2 className="w-4 h-4" />
            <span>เครื่องมือช่วยผู้เสียหาย</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            สร้างเอกสารสรุปข้อเท็จจริงแจ้งความ สภ. ในนครปฐม
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            กรอกข้อมูลสั้นๆ ด้านล่าง ระบบจะจัดพิมพ์เป็นเอกสารสรุปข้อเท็จจริงสำหรับส่งให้พนักงานสอบสวน 
            ลดความสับสนและช่วยให้ร้อยเวรดำเนินการออกหนังสืออายัดได้อย่างรวดเร็ว
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-sm font-semibold text-slate-900">
              1. ข้อมูลของคุณและสถานที่เกิดเหตุ
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ชื่อ-นามสกุล ของคุณ
                </label>
                <input
                  type="text"
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  placeholder="เช่น นายสมชาย ใจดี"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เบอร์โทรศัพท์ของคุณ
                </label>
                <input
                  type="tel"
                  value={victimPhone}
                  onChange={(e) => setVictimPhone(e.target.value)}
                  placeholder="เช่น 081-234-5678"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                อำเภอที่เกิดเหตุ / พักอาศัย (จ.นครปฐม)
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as NakhonPathomDistrict)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    อำเภอ{d} (สภ.ประจำพื้นที่)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  วันที่เกิดเหตุ
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เวลาโดยประมาณ
                </label>
                <input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div className="text-sm font-semibold text-slate-900 pt-2 border-t border-slate-100">
              2. ข้อมูลคนร้ายและบัญชีปลายทาง
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เบอร์โทรที่คนร้ายใช้ติดต่อ
                </label>
                <input
                  type="text"
                  value={scammerPhone}
                  onChange={(e) => setScammerPhone(e.target.value)}
                  placeholder="เช่น 098-xxx-xxxx"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ยอดเงินที่ถูกหลอกโอน (บาท)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="เช่น 15000"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ธนาคารคนร้าย
                </label>
                <input
                  type="text"
                  value={scammerBank}
                  onChange={(e) => setScammerBank(e.target.value)}
                  placeholder="เช่น กสิกรไทย"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เลขบัญชีคนร้าย
                </label>
                <input
                  type="text"
                  value={scammerAccount}
                  onChange={(e) => setScammerAccount(e.target.value)}
                  placeholder="เช่น 123-x-xxxxx-x"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ชื่อบัญชีคนร้าย
                </label>
                <input
                  type="text"
                  value={scammerName}
                  onChange={(e) => setScammerName(e.target.value)}
                  placeholder="เช่น นาย ก..."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เลขรับแจ้งจากธนาคาร (Bank Case ID)
                </label>
                <input
                  type="text"
                  value={bankCaseId}
                  onChange={(e) => setBankCaseId(e.target.value)}
                  placeholder="เลขที่ได้จากโทรแจ้งธนาคาร"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เลขแจ้งความ thaipoliceonline (ถ้ามี)
                </label>
                <input
                  type="text"
                  value={onlinePoliceId}
                  onChange={(e) => setOnlinePoliceId(e.target.value)}
                  placeholder="เช่น รหัสคดีออนไลน์"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                พฤติการณ์โดยย่อ (คนร้ายหลอกว่าอย่างไร)
              </label>
              <textarea
                rows={3}
                value={scamStory}
                onChange={(e) => setScamStory(e.target.value)}
                placeholder="เช่น คนร้ายโทรเข้ามาอ้างเป็นตำรวจ สภ.เมืองนครปฐม บอกว่าชื่อผู้แจ้งไปพัวพันยาเสพติด และให้โอนเงินเพื่อตรวจสอบ..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                พยานหลักฐานที่มีพร้อมส่งมอบ:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evidenceReceipt}
                    onChange={(e) => setEvidenceReceipt(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>สลิปโอนเงิน (มี QR Code)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evidenceChat}
                    onChange={(e) => setEvidenceChat(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>ภาพแคปแชทการสนทนา</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evidenceCallLog}
                    onChange={(e) => setEvidenceCallLog(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>ประวัติเบอร์โทรที่โทรเข้า</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evidenceLink}
                    onChange={(e) => setEvidenceLink(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>ลิงก์เว็บปลอม / ไฟล์ APK</span>
                </label>
              </div>
            </div>
          </div>

          {/* Document Preview & Actions Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <span className="text-xs font-bold text-slate-800">
                  ตัวอย่างเอกสารส่งร้อยเวร (Preview)
                </span>
                <span className="text-xs text-slate-500">
                  สภ.ประจำพื้นที่ {district}
                </span>
              </div>
              <pre className="text-[11px] leading-relaxed font-mono text-slate-800 whitespace-pre-wrap max-h-96 overflow-y-auto bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                {generateStatementText()}
              </pre>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 mt-4">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'คัดลอกเรียบร้อยแล้ว!' : 'คัดลอกข้อความไปส่งไลน์/พิมพ์'}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>พิมพ์เอกสาร</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Against Fake Recovery Scams (Crucial human rights & consumer protection rule!) */}
      <div className="bg-rose-50 border border-rose-300 rounded-2xl p-5 flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
        <div className="text-xs text-rose-950 space-y-1">
          <strong className="text-rose-900 block font-bold">
            ⚠️ คำเตือนภัยซ้ำเติม: ระวังมิจฉาชีพแอบอ้าง "รับจ้างดึงเงินคืน / ทนายความทิพย์"
          </strong>
          <p className="leading-relaxed">
            ไม่มีหน่วยงานเอกชน ทนายความ หรือบุคคลใดสามารถ "แฮกเงินคืน" หรือ "ดึงเงินคืนจากบัญชีม้าให้คุณได้ทันที" 
            มิจฉาชีพมักสร้างเพจปลอมรับจ้างดึงเงินคืนแล้วเรียกเก็บ "ค่าธรรมเนียมทนาย" หรือ "ค่าปลดล็อกระบบ" ซ้ำอีกรอบ 
            การอายัดและติดตามเงินต้องดำเนินการผ่านธนาคารเจ้าของบัญชีและพนักงานสอบสวน สภ. อย่างเป็นทางการเท่านั้น!
          </p>
        </div>
      </div>

      {/* Mental Health & Human Dignity Support */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              ข้อคิดด้านสิทธิและศักดิ์ศรีความเป็นมนุษย์: คุณคือผู้เสียหาย ไม่ใช่ผู้กระทำผิด
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
              เราปฏิเสธการตีตราและกล่าวโทษผู้เสียหาย (Victim Blaming) คนร้ายคือเครือข่ายอาชญากรรมข้ามชาติที่ฝึกฝนจิตวิทยาหลอกลวง 
              หากคุณรู้สึกเครียด สิ้นหวัง หรือถูกกดดัน โทรปรึกษาสายด่วนสุขภาพจิต 1323 ได้ตลอด 24 ชั่วโมงโดยไม่มีค่าใช้จ่าย
            </p>
          </div>
        </div>
        <a
          href="tel:1323"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-amber-900 bg-white border border-amber-300 rounded-lg hover:bg-amber-100/50 whitespace-nowrap shrink-0 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
          <span>สายด่วนสุขภาพจิต 1323</span>
        </a>
      </div>
    </div>
  );
};
