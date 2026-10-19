import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Phone, 
  CreditCard,
  Lock,
  Sparkles,
  ShieldCheck,
  EyeOff,
  Scale
} from 'lucide-react';
import { ScamReport, NakhonPathomDistrict, ScamCategory } from '../types/scam';
import { DISTRICTS, SCAM_CATEGORIES_METADATA } from '../data/nakhonPathomData';

interface ReportSectionProps {
  onSubmitReport: (report: Omit<ScamReport, 'id' | 'dateReported' | 'helpfulCount' | 'verificationStatus'>) => void;
  onGoToDatabase: () => void;
}

export const ReportSection: React.FC<ReportSectionProps> = ({
  onSubmitReport,
  onGoToDatabase,
}) => {
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState<NakhonPathomDistrict>('เมืองนครปฐม');
  const [locationDetail, setLocationDetail] = useState('');
  const [category, setCategory] = useState<ScamCategory>('callcenter');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [scammerHandle, setScammerHandle] = useState('');
  const [avoided, setAvoided] = useState(true);
  const [lossAmount, setLossAmount] = useState('0');
  const [story, setStory] = useState('');
  const [countermeasures, setCountermeasures] = useState('');
  
  // Safe Reporting & Privacy Consent State
  const [anonymousAlias, setAnonymousAlias] = useState('พลเมืองนครปฐม (ไม่ประสงค์ออกนาม)');
  const [consentPrivacy, setConsentPrivacy] = useState(true);
  const [consentTruth, setConsentTruth] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!title.trim() || !story.trim() || !countermeasures.trim()) {
      setFormError('กรุณากรอกหัวข้อเรื่อง, พฤติการณ์กลโกง และแนวทางการรับมือของคุณให้ครบถ้วน');
      return;
    }

    if (!consentPrivacy || !consentTruth) {
      setFormError('กรุณายินยอมเงื่อนไขการคุ้มครองความเป็นส่วนตัวและหลักสิทธิมนุษยชนก่อนส่งรายงาน');
      return;
    }

    onSubmitReport({
      title: title.trim(),
      district,
      locationDetail: locationDetail.trim() || undefined,
      category,
      phoneNumber: phoneNumber.trim() || undefined,
      bankAccount: bankAccount.trim() || undefined,
      bankName: bankName.trim() || undefined,
      accountName: accountName.trim() || undefined,
      scammerHandle: scammerHandle.trim() || undefined,
      avoided,
      lossAmount: avoided ? 0 : Number(lossAmount) || 0,
      story: story.trim(),
      countermeasures: countermeasures.trim(),
    });

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setTitle('');
    setLocationDetail('');
    setPhoneNumber('');
    setBankAccount('');
    setBankName('');
    setAccountName('');
    setScammerHandle('');
    setStory('');
    setCountermeasures('');
    setLossAmount('0');
    setAvoided(true);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          บันทึกรายงานอย่างปลอดภัยเรียบร้อยแล้ว
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          ข้อมูลของคุณได้รับการประมวลผลภายใต้มาตรฐาน <strong>Safe Reporting</strong> 
          โดยปกปิดข้อมูลส่วนบุคคลของคุณเรียบร้อยแล้ว และถูกเพิ่มเข้าสู่ฐานข้อมูลเตือนภัยเพื่อประโยชน์สาธารณะของชาวนครปฐม
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={onGoToDatabase}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            ดูข้อมูลในฐานข้อมูลเตือนภัย
          </button>
          <button
            onClick={handleResetForm}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            + โพสต์แจ้งเคสอื่นเพิ่มเติม
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
          <ShieldAlert className="w-4 h-4" />
          <span>ระบบแจ้งเหตุอย่างปลอดภัย (Safe Reporting System)</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          รายงานเบาะแสและแลกเปลี่ยนแนวทางรับมือ
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          คุ้มครองความเป็นส่วนตัวของผู้เสียหาย ปราศจากการเปิดเผยตัวตนสู่สาธารณะ เพื่อเป็นวิทยาทานแก่พี่น้องชาวนครปฐม
        </p>
      </div>

      {/* Safe Reporting & Privacy Charter */}
      <div className="p-4 bg-slate-100/90 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <EyeOff className="w-4 h-4 text-slate-600" />
          <span>หลักการ Safe Reporting ตามกรอบสิทธิมนุษยชน:</span>
        </div>
        <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">1.</span>
            <span><strong>ไม่มีการเปิดเผยตัวตนจริง:</strong> แพลตฟอร์มไม่เก็บเลขบัตรประชาชน และไม่แสดงชื่อ-นามสกุลจริงของผู้รายงานต่อสาธารณะ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">2.</span>
            <span><strong>เคารพหลักสันนิษฐานไว้ก่อนว่าเป็นผู้บริสุทธิ์:</strong> เบาะแสที่ส่งมาจะระบุสถานะเป็น "ข้อมูลรายงานโดยชุมชน" เพื่อป้องกันการกล่าวหาผิดตัว</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">3.</span>
            <span><strong>มีกลไกตรวจสอบและลบข้อมูล:</strong> หากพบข้อมูลคลาดเคลื่อนหรือมีการรายงานผิดพลาด สามารถแจ้งทีมงานเพื่อตรวจสอบและแก้ไขได้ตลอดเวลา</span>
          </li>
        </ul>
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800 font-semibold animate-shake">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Section 1: Location & Topic */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            1. ข้อมูลเหตุการณ์ในจังหวัดนครปฐม
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              หัวข้อเรื่องเตือนภัย <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น เบอร์โทรอ้าง สภ.เมืองนครปฐม ขู่เรื่องพัสดุฟอกเงิน, หลอกมัดจำหอพักศาลายา"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                อำเภอที่เกิดเหตุ (จ.นครปฐม) <span className="text-rose-500">*</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as NakhonPathomDistrict)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    อำเภอ{d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                บริเวณ / ชุมชนโดยละเอียด (ถ้ามี)
              </label>
              <input
                type="text"
                value={locationDetail}
                onChange={(e) => setLocationDetail(e.target.value)}
                placeholder="เช่น ซอยตั้งสิน ศาลายา, ตลาดสดนครชัยศรี, ใกล้ ม.เกษตรฯ"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ประเภทรูปแบบกลโกง <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ScamCategory)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
            >
              {Object.entries(SCAM_CATEGORIES_METADATA).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label} - {val.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Scammer Details */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            2. ข้อมูลของมิจฉาชีพ (เท่าที่ทราบ)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรศัพท์ที่ใช้โทรมา
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="เช่น 098-xxx-xxxx หรือ +697xxxxxx"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ชื่อเพจ / LINE ID / บัญชีโซเชียล
              </label>
              <input
                type="text"
                value={scammerHandle}
                onChange={(e) => setScammerHandle(e.target.value)}
                placeholder="เช่น Line: @police-np, เพจ FB: หอพักศาลายา"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ธนาคารของบัญชีม้า
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="เช่น กสิกรไทย, กรุงไทย"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                เลขบัญชีม้า
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="เช่น 123-x-xxxxx-x"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ชื่อบัญชีที่ให้โอน
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="เช่น นาย สมศักดิ์..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Result & Loss */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            3. ผลลัพธ์ของเหตุการณ์
          </h3>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-800">
              <input
                type="radio"
                name="avoided"
                checked={avoided}
                onChange={() => setAvoided(true)}
                className="text-emerald-600"
              />
              <span>ไหวตัวทัน รอดมาได้ ไม่เสียเงิน</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-800">
              <input
                type="radio"
                name="avoided"
                checked={!avoided}
                onChange={() => setAvoided(false)}
                className="text-rose-600"
              />
              <span>เกิดความเสียหาย (ถูกหลอกโอนเงิน)</span>
            </label>
          </div>

          {!avoided && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                มูลค่าความเสียหายโดยประมาณ (บาท)
              </label>
              <input
                type="number"
                value={lossAmount}
                onChange={(e) => setLossAmount(e.target.value)}
                placeholder="เช่น 5000"
                className="w-full sm:w-64 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono"
              />
            </div>
          )}
        </div>

        {/* Section 4: Narrative & Countermeasures */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            4. เล่าพฤติการณ์และแนวทางการรับมือของคุณ
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              พฤติการณ์กลโกง (คนร้ายใช้วิธีไหน พูดอย่างไร ข่มขู่หรือล่อลวงอย่างไร) <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="เล่ารายละเอียดเหตุการณ์ เช่น คนร้ายโทรมาอ้างเป็นพนักงานส่งพัสดุ แจ้งว่ามีพัสดุไปรษณีย์ตกค้างที่นครปฐม แล้วโอนสายให้คนแต่งเครื่องแบบตำรวจ..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
            />
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-amber-950">
              ⭐ แนวทางการรับมือของคุณ (สำคัญมาก: ช่วยเล่าว่ารับมืออย่างไร รอดมาได้อย่างไร หรือแก้ปัญหาอย่างไร) <span className="text-rose-500">*</span>
            </label>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              เช่น "เอะใจตรงที่ตำรวจจริงไม่สอบสวนทางวิดีโอคอล เลยบอกไปว่าจะเดินไปพบที่ สภ.เมืองนครปฐม เอง คนร้ายก็รีบวางสาย", หรือ "รีบโทรหาธนาคารภายใน 15 นาทีเพื่อขอ Bank Case ID แล้วไปแจ้ง สภ.พุทธมณฑล"
            </p>
            <textarea
              required
              rows={4}
              value={countermeasures}
              onChange={(e) => setCountermeasures(e.target.value)}
              placeholder="แบ่งปันวิธีเอาตัวรอด หรือข้อคิดเตือนใจที่อยากบอกต่อชาวนครปฐม..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-amber-300 rounded-lg focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        {/* Section 5: Safe Reporting Consents */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 pt-3">
          <span className="text-xs font-bold text-slate-900 block">
            5. การคุ้มครองสิทธิและความโปร่งใส (Human Rights Compliance)
          </span>

          <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={consentPrivacy}
              onChange={(e) => setConsentPrivacy(e.target.checked)}
              className="rounded text-amber-600 mt-0.5"
            />
            <span>
              ข้าพเจ้ารับทราบว่าระบบจะไม่เปิดเผยข้อมูลระบุตัวตนจริงของข้าพเจ้าต่อสาธารณะ เพื่อคุ้มครองสิทธิในความเป็นส่วนตัว (PDPA)
            </span>
          </label>

          <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={consentTruth}
              onChange={(e) => setConsentTruth(e.target.checked)}
              className="rounded text-amber-600 mt-0.5"
            />
            <span>
              ข้าพเจ้ายืนยันว่าข้อมูลที่รายงานเป็นความจริงตามเหตุการณ์ที่เกิดขึ้น มิได้มีเจตนากลั่นแกล้งหรือใส่ร้ายผู้อื่น และยอมรับว่าข้อมูลนี้จัดทำเพื่อประโยชน์ในการเตือนภัยสาธารณะ
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4 text-amber-400" />
            <span>ส่งรายงานอย่างปลอดภัยสู่เครือข่ายเตือนภัย</span>
          </button>
        </div>

      </form>
    </div>
  );
};
