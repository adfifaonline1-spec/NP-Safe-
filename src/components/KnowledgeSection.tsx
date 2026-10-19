import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Search, 
  Eye, 
  Zap,
  ArrowRight,
  ShieldAlert,
  Scale,
  GraduationCap,
  HeartHandshake,
  Coins,
  Lock,
  Globe
} from 'lucide-react';
import { KNOWLEDGE_TACTICS, HUMAN_RIGHTS_FRAMEWORK, ACADEMIC_PROJECT_INFO } from '../data/nakhonPathomData';
import { KnowledgeTactic, HumanRightsPrinciple } from '../types/scam';

interface KnowledgeSectionProps {
  onOpenPlaybook: () => void;
}

export const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({ onOpenPlaybook }) => {
  const [activeSubTab, setActiveSubTab] = useState<'tactics' | 'human_rights'>('human_rights');
  const [selectedTactic, setSelectedTactic] = useState<KnowledgeTactic>(KNOWLEDGE_TACTICS[0]);

  // Smart Analyzer state
  const [analyzerInput, setAnalyzerInput] = useState('');
  const [analyzerResult, setAnalyzerResult] = useState<{
    riskLevel: 'วิกฤต' | 'เสี่ยงสูง' | 'ระวัง' | 'ปลอดภัย';
    detectedFlags: string[];
    advice: string;
    matchedTactic?: string;
  } | null>(null);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizQuestions = [
    {
      question: 'มีสายโทรศัพท์เข้ามา อ้างเป็น "ร้อยเวร สภ.เมืองนครปฐม" บอกว่าคุณมีส่วนเกี่ยวข้องกับคดีฟอกเงิน และขอให้แอด LINE เพื่อวิดีโอคอลดูหมายจับและโอนเงินมาตรวจสอบ คุณควรทำอย่างไร?',
      options: [
        'แอด LINE แล้วเปิดกล้องดูว่าใช่ตำรวจจริงหรือไม่ เพื่อความบริสุทธิ์ใจ',
        'วางสายทันที แล้วบอกว่าจะเดินทางไปพบร้อยเวรที่ สภ.เมืองนครปฐม บนถนนเทศา ด้วยตัวเอง',
        'รีบโอนเงินไปที่บัญชีกลางของ ปปง. ตามที่เขาบอก เพราะกลัวโดนออกหมายจับ',
        'ขอเจรจาต่อรองจ่ายเงินค่าปรับเป็นเงินสดครึ่งหนึ่ง',
      ],
      correctIndex: 1,
      explanation: 'ถูกต้องที่สุด! ตำรวจจริงไม่มีการสอบปากคำหรือส่งหมายจับผ่าน LINE และไม่มีนโยบายให้ประชาชนโอนเงินมาเพื่อตรวจสอบความบริสุทธิ์เด็ดขาด การตัดบทและบอกว่าจะไปพบที่โรงพักจริงจะทำให้มิจฉาชีพตัดสายทันที',
    },
    {
      question: 'คุณกำลังหาหอพักแถวศาลายา ใกล้ ม.มหิดล เจอกลุ่มปล่อยเช่าคอนโดราคาถูกมาก แอดมินบอกว่ามีคนรอต่อคิว ให้รีบโอนมัดจำจองห้อง 5,000 บาทภายใน 15 นาที สิ่งที่ควรทำคือ?',
      options: [
        'รีบโอนทันทีเพราะกลัวหลุดคิว ห้องสวยและถูกมาก',
        'ขอรูปบัตรประชาชนของคนปล่อยเช่าก่อน แล้วจึงโอนเงิน',
        'ปฏิเสธการโอนเงิน และยืนยันว่าจะต้องไปดูห้องจริงกับนิติบุคคลหรือเจ้าของตัวจริงเท่านั้น',
        'โอนไปแค่ครึ่งหนึ่ง 2,500 บาทเพื่อดูเชิงก่อน',
      ],
      correctIndex: 2,
      explanation: 'ถูกต้อง! การขอดูบัตรประชาชนมิจฉาชีพมักใช้บัตรประชาชนของเหยื่อรายอื่นมาสวมรอย กฎเหล็กของการเช่าหอพักในศาลายาและนครปฐมคือ "ห้ามโอนเงินมัดจำก่อนเห็นห้องจริงและพบนิติบุคคล" เด็ดขาด',
    },
    {
      question: 'ได้รับ SMS จากเบอร์ 098-xxx-xxxx แจ้งว่า "การไฟฟ้าส่วนภูมิภาคนครปฐม คืนเงินประกันมิเตอร์ไฟฟ้า 2,000 บาท กดลิงก์เพื่อรับเงินทันที" คุณควรทำอย่างไร?',
      options: [
        'กดลิงก์ทันที เพราะอยากได้เงินคืน 2,000 บาท',
        'ลบ SMS หรือบล็อกเบอร์ทันที และตรวจสอบผ่านแอป PEA Smart Plus ของจริงเท่านั้น',
        'กดเข้าไปแล้วดาวน์โหลดไฟล์ .apk มาติดตั้งในเครื่อง',
        'ส่งต่อ SMS ให้ญาติพี่น้องเพื่อให้รีบไปกดรับเงินด้วยกัน',
      ],
      correctIndex: 1,
      explanation: 'ถูกต้อง! การไฟฟ้าส่วนภูมิภาค (PEA) ไม่มีนโยบายส่ง SMS แนบลิงก์ให้กดรับเงินหรือดาวน์โหลดไฟล์ .apk เด็ดขาด หากกดลิงก์จะเป็นแอปดูดเงินที่เข้าควบคุมมือถือและโอนเงินออกจากบัญชีธนาคารทั้งหมด',
    },
  ];

  const handleRunAnalyzer = (textToAnalyze?: string) => {
    const text = (textToAnalyze ?? analyzerInput).trim();
    if (!text) return;

    const lower = text.toLowerCase();
    const flags: string[] = [];
    let risk: 'วิกฤต' | 'เสี่ยงสูง' | 'ระวัง' | 'ปลอดภัย' = 'ปลอดภัย';
    let matched = '';

    if (lower.includes('apk') || lower.includes('.cc') || lower.includes('.vip') || lower.includes('โหลดแอป') || lower.includes('ติดตั้ง')) {
      flags.push('ตรวจพบการชักชวนให้ดาวน์โหลดไฟล์ภายนอกหรือไฟล์ .apk (เสี่ยงเป็นแอปดูดเงิน)');
      risk = 'วิกฤต';
      matched = 'กลโกงแอปดูดเงิน/ส่งลิงก์ปลอม';
    }

    if (lower.includes('สภ.') || lower.includes('ตำรวจ') || lower.includes('ฟอกเงิน') || lower.includes('หมายจับ') || lower.includes('ปปง.') || lower.includes('คดียาเสพติด') || lower.includes('ไปรษณีย์')) {
      flags.push('ตรวจพบการอ้างอำนาจรัฐ/ตำรวจ/คดีความฟอกเงิน เพื่อสร้างความหวาดกลัว');
      risk = 'วิกฤต';
      matched = 'แก๊งคอลเซ็นเตอร์สวมรอยตำรวจ';
    }

    if (lower.includes('มัดจำ') && (lower.includes('หอพัก') || lower.includes('คอนโด') || lower.includes('ศาลายา') || lower.includes('หลุดจอง') || lower.includes('15 นาที'))) {
      flags.push('ตรวจพบเทคนิคเร่งรัดโอนมัดจำห้องพักโดยไม่เปิดโอกาสให้ดูสถานที่จริง');
      risk = 'เสี่ยงสูง';
      matched = 'หลอกมัดจำหอพักทิพย์';
    }

    if (lower.includes('ปุ๋ย') || lower.includes('หลุดโรงงาน') || lower.includes('ราคาพิเศษ') || lower.includes('ส่งฟรีถึงแปลง') || lower.includes('สลิปโอน')) {
      flags.push('ตรวจพบข้อเสนอสินค้าเกษตรราคาถูกผิดปกติ หรือการเร่งรับผลผลิต');
      risk = 'เสี่ยงสูง';
      matched = 'หลอกซื้อขายปุ๋ยยา/ผลผลิตการเกษตร';
    }

    if (lower.includes('โอนเงินเพื่อตรวจสอบ') || lower.includes('บัญชีกลาง') || lower.includes('สำรองเงิน') || lower.includes('งานออนไลน์')) {
      flags.push('ตรวจพบคำสั่งให้ "โอนเงินออกไปก่อน" ซึ่งเป็นลักษณะเฉพาะของมิจฉาชีพ 100%');
      risk = 'วิกฤต';
    }

    if (flags.length === 0) {
      if (lower.length > 10) {
        flags.push('ยังไม่พบคำสำคัญที่เป็นภัยชัดเจน แต่ควรระมัดระวังหากมีการขอข้อมูลส่วนตัวหรือการโอนเงิน');
        risk = 'ระวัง';
      }
    }

    setAnalyzerResult({
      riskLevel: risk,
      detectedFlags: flags,
      advice: risk === 'วิกฤต' || risk === 'เสี่ยงสูง'
        ? 'อันตรายสูงมาก! ห้ามโอนเงิน ห้ามกดลิงก์ และห้ามส่งข้อมูลส่วนตัวเด็ดขาด หากเป็นสายโทรศัพท์ให้ตัดสายทันที'
        : 'โปรดตั้งสติ อย่าเพิ่งรีบเชื่อ หากไม่แน่ใจให้ตรวจสอบกับหน่วยงานต้นทางโดยตรง',
      matchedTactic: matched || undefined,
    });
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[quizStep].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizStep((prev) => prev + 1);
  };

  const handleRestartQuiz = () => {
    setQuizStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  };

  return (
    <div className="space-y-12 py-4">
      {/* Knowledge Header with Academic Badge */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
          <Scale className="w-4 h-4" />
          <span>มสสส301 สิทธิมนุษยชนและการสร้างเสริมสันติภาพ · วิทยาลัยศาสนศึกษา มหาวิทยาลัยมหิดล</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
          การบูรณาการมิติด้านสิทธิมนุษยชนและคลังความรู้กลโกง
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          การคุ้มครองสิทธิในทรัพย์สิน ความเป็นส่วนตัว การเข้าถึงความยุติธรรม และการยืนหยัดเคียงข้างผู้เสียหายตามหลักศักดิ์ศรีความเป็นมนุษย์
        </p>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setActiveSubTab('human_rights')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeSubTab === 'human_rights'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            หลักการสิทธิมนุษยชน 5 ด้าน (Human Rights Framework)
          </button>
          <button
            onClick={() => setActiveSubTab('tactics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeSubTab === 'tactics'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            คลังกลโกงเชิงลึก & แบบทดสอบ (Scam Tactics & Simulator)
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: HUMAN RIGHTS FRAMEWORK (Crucial for the assignment!) */}
      {activeSubTab === 'human_rights' && (
        <div className="space-y-8">
          {/* Academic Statement Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{ACADEMIC_PROJECT_INFO.courseName} · {ACADEMIC_PROJECT_INFO.institution}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              ทำไมปัญหาการหลอกลวงออนไลน์ จึงเป็น "ประเด็นสิทธิมนุษยชน"?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              ในยุคดิจิทัล การหลอกลวงออนไลน์ไม่ใช่เพียงแค่คดีอาชญากรรมทางเศรษฐกิจ แต่คือการ 
              <strong>ละเมิดสิทธิมนุษยชนขั้นพื้นฐานอย่างเป็นระบบ</strong> ทั้งสิทธิในทรัพย์สิน สิทธิในความเป็นส่วนตัว 
              และความมั่นคงในชีวิต การสร้างระบบช่วยเหลือนี้จึงมีเป้าหมายเพื่อเป็นเครื่องมือพลเมือง (Civic Tech) 
              ในการคุ้มครองผู้เสียหาย ลดความเหลื่อมล้ำในการเข้าถึงความยุติธรรม และฟื้นฟูศักดิ์ศรีความเป็นมนุษย์ของประชาชน
            </p>
            <div className="pt-2 text-[11px] text-amber-200/80 font-mono">
              จัดทำโดย: {ACADEMIC_PROJECT_INFO.studentCohort} ({ACADEMIC_PROJECT_INFO.campus})
            </div>
          </div>

          {/* 5 Core Human Rights Principles Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              ตารางวิเคราะห์การนำหลักสิทธิมนุษยชนมาประยุกต์ใช้ในระบบ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {HUMAN_RIGHTS_FRAMEWORK.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        หลักการที่ {idx + 1}
                      </span>
                      <Scale className="w-4 h-4 text-amber-600" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {item.academicArticle}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <strong className="text-slate-800 block text-[11px]">การนำมาใช้ในเว็บไซต์:</strong>
                      <span className="text-slate-600 leading-relaxed">{item.applicationInApp}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-700">
                      <strong className="text-slate-900 block text-[11px]">การปฏิบัติจริง:</strong>
                      <span>{item.practicalAction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anti-Victim Blaming Manifesto */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              <span>แถลงการณ์ว่าด้วยศักดิ์ศรีความเป็นมนุษย์ (Anti-Victim Blaming Manifesto)</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              "ผู้เสียหายทุกคนควรได้รับความช่วยเหลือ โดยไม่ถูกตีตราหรือตัดสิน"
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-white rounded-xl border border-amber-200/80 space-y-2">
                <strong className="text-slate-900 block font-semibold">❌ สิ่งที่สังคมมักเข้าใจผิด (การกล่าวโทษเหยื่อ):</strong>
                <p>
                  หลายคนในสังคมมักซ้ำเติมผู้เสียหายด้วยคำว่า "โลภเอง", "ไม่ระวัง", หรือ "ทำไมเชื่อคนง่าย" 
                  คำพูดเหล่านี้ทำให้ผู้เสียหายเกิดความอับอาย เก็บตัว ไม่กล้าบอกครอบครัว และไม่กล้าเข้าสู่กระบวนการแจ้งความ ซึ่งยิ่งเปิดโอกาสให้มิจฉาชีพไปหลอกลวงผู้อื่นต่อไป
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-amber-200/80 space-y-2">
                <strong className="text-slate-900 block font-semibold">✅ ความจริงตามหลักอาชญาวิทยาและสิทธิมนุษยชน:</strong>
                <p>
                  แก๊งมิจฉาชีพคือองค์กรอาชญากรรมข้ามชาติที่มีการจัดตั้ง ใช้วิศวกรรมสังคม (Social Engineering) 
                  และจิตวิทยากดดันให้เหยื่อเกิดความกลัวหรือเร่งรีบ ใครก็มีโอกาสตกเป็นเหยื่อได้ 
                  การยืนหยัดเคียงข้างและให้กำลังใจคือหัวใจสำคัญในการต่อสู้กับอาชญากรรมออนไลน์
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SCAM TACTICS & SIMULATOR */}
      {activeSubTab === 'tactics' && (
        <div className="space-y-12">
          {/* Interactive Smart Scam Analyzer Tool */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>เครื่องมือตรวจสอบข้อความ / บทสนทนาต้องสงสัย (Smart Scam Detector)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              วางข้อความ SMS หรือคำพูดที่สแกมเมอร์ใช้ เพื่อตรวจระดับความเสี่ยงทันที
            </h3>
            <p className="text-xs text-slate-500">
              ระบบจะวิเคราะห์คีย์เวิร์ดอันตราย กลยุทธ์เร่งเร้าจิตวิทยา และเทียบเคียงกับคดีที่พบบ่อยในจังหวัดนครปฐม
            </p>

            <div className="space-y-3">
              <textarea
                rows={3}
                value={analyzerInput}
                onChange={(e) => setAnalyzerInput(e.target.value)}
                placeholder="วางข้อความที่ได้รับ เช่น: 'การไฟฟ้าคืนเงินประกันมิเตอร์ กด pea-th.cc' หรือ 'สภ.เมืองนครปฐม แจ้งคุณมีคดีฟอกเงิน ให้แอดไลน์โอนเงินตรวจสอบ'..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">ลองทดสอบตัวอย่าง:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const s = 'การไฟฟ้านครปฐม คืนเงินประกันมิเตอร์ไฟฟ้า 2000 บาท กดลิงก์โหลดไฟล์ pea-smart.apk';
                      setAnalyzerInput(s);
                      handleRunAnalyzer(s);
                    }}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    SMS คืนค่าไฟ PEA
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const s = 'โทรจาก สภ.เมืองนครปฐม คุณมีพัสดุฟอกเงินตกค้าง ให้แอด LINE และโอนเงินมาตรวจสอบบัญชีกลาง ปปง.';
                      setAnalyzerInput(s);
                      handleRunAnalyzer(s);
                    }}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    ตำรวจ สภ.เมือง ปลอม
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const s = 'ห้องพักศาลายาใกล้ ม.มหิดล หลุดจองราคาถูก มีคนรอคิว โอนมัดจำ 5000 ภายใน 15 นาที';
                      setAnalyzerInput(s);
                      handleRunAnalyzer(s);
                    }}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    หอพักศาลายา ม.มหิดล
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleRunAnalyzer()}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
                >
                  วิเคราะห์ความเสี่ยง
                </button>
              </div>
            </div>

            {/* Analyzer Result Box */}
            {analyzerResult && (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">ผลการประเมินความเสี่ยง:</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    analyzerResult.riskLevel === 'วิกฤต'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : analyzerResult.riskLevel === 'เสี่ยงสูง'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    ระดับ: {analyzerResult.riskLevel}
                  </span>
                </div>

                {analyzerResult.matchedTactic && (
                  <div className="text-xs text-slate-800 font-semibold">
                    ตรงกับรูปแบบ: <span className="text-amber-800">{analyzerResult.matchedTactic}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-700">
                  {analyzerResult.detectedFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-slate-900">
                  💡 ข้อปฏิบัติแนะนำ: {analyzerResult.advice}
                </div>
              </div>
            )}
          </div>

          {/* Nakhon Pathom Tactics Master Directory */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                เจาะลึก 5 กลโกงหลักในพื้นที่นครปฐม
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                คลิกเลือกรูปแบบด้านล่างเพื่อดูประโยคเด็ดที่ใช้หลอก จิตวิทยา และวิธีแก้ปัญหา
              </p>
            </div>

            {/* Tactic Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_TACTICS.map((tactic) => {
                const isSelected = selectedTactic.id === tactic.id;
                return (
                  <button
                    key={tactic.id}
                    onClick={() => setSelectedTactic(tactic)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {tactic.title}
                  </button>
                );
              })}
            </div>

            {/* Selected Tactic Deep-Dive Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-amber-700">พื้นที่ระบาดหนัก: {selectedTactic.districtHighlight}</span>
                    <span>·</span>
                    <span className="font-mono">อันตราย: {selectedTactic.dangerLevel}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {selectedTactic.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {selectedTactic.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Triggers and Mind Games */}
                <div className="space-y-4">
                  <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>ประโยคเด็ดที่มักใช้ (Trigger Words ที่ได้ยินแล้วต้องระวังทันที):</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-rose-900">
                      {selectedTactic.triggerPhrases.map((phrase, i) => (
                        <li key={i} className="flex items-start gap-2 font-medium">
                          <span className="text-rose-400 font-bold">›</span>
                          <span>{phrase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700">
                    <div className="font-bold text-slate-900">
                      🧠 จิตวิทยาที่คนร้ายนำมาเล่นงานคุณ:
                    </div>
                    <p className="leading-relaxed">
                      {selectedTactic.psychologicalTrick}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-slate-600">
                      <strong>เหตุการณ์ในนครปฐม: </strong> {selectedTactic.localScenario}
                    </div>
                  </div>
                </div>

                {/* Right Column: Defense Protocols */}
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>วิธีตัดบท / แนวทางป้องกันที่ได้ผล 100%:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-emerald-900">
                      {selectedTactic.defenseProtocol.map((defense, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{defense}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-amber-950">
                      🚨 หากเผลอทำตาม หรือโอนเงินไปแล้ว ต้องทำอย่างไรต่อ?
                    </div>
                    <ul className="space-y-1 text-xs text-amber-900">
                      {selectedTactic.ifAlreadyTrapped.map((action, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <button
                        onClick={onOpenPlaybook}
                        className="text-xs font-bold text-amber-900 underline underline-offset-2 flex items-center gap-1 hover:text-amber-950"
                      >
                        <span>เปิดคู่มือฉุกเฉิน 72 ชม. และตัวสร้างเอกสารแจ้งความ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Scam Quiz (Simulator) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Zap className="w-4 h-4" />
                  <span>แบบทดสอบไหวพริบชุมชน (NP-Safe Quiz)</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  ทดสอบ: คุณจะรอดจากกลโกงในนครปฐมหรือไม่?
                </h3>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                ข้อที่ {quizStep + 1} จาก {quizQuestions.length} · คะแนน: {score}/{quizQuestions.length}
              </div>
            </div>

            {quizStep < quizQuestions.length ? (
              <div className="space-y-5">
                <h4 className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                  {quizQuestions[quizStep].question}
                </h4>

                <div className="space-y-2.5">
                  {quizQuestions[quizStep].options.map((option, idx) => {
                    const isChosen = selectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[quizStep].correctIndex;

                    let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
                    if (showExplanation) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                      } else if (isChosen && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={showExplanation}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="font-mono font-bold text-slate-400 shrink-0">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation box */}
                {showExplanation && (
                  <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      {selectedAnswer === quizQuestions[quizStep].correctIndex ? (
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> ถูกต้องยอดเยี่ยม!
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" /> ยังไม่ถูกต้อง (เสี่ยงตกเป็นเหยื่อ)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {quizQuestions[quizStep].explanation}
                    </p>
                    <div className="pt-1">
                      <button
                        onClick={handleNextQuiz}
                        className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
                      >
                        {quizStep + 1 < quizQuestions.length ? 'ทำข้อถัดไป' : 'ดูสรุปผลคะแนน'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <h4 className="text-2xl font-bold text-white">
                  ผลการทดสอบ: ได้ {score} จาก {quizQuestions.length} คะแนน!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {score === quizQuestions.length
                    ? 'ยอดเยี่ยมมาก! คุณมีภูมิคุ้มกันและไหวพริบรู้ทันกลโกงในนครปฐมเป็นอย่างดี อย่าลืมแชร์ความรู้นี้ให้คนรอบตัว'
                    : 'คุณเริ่มเข้าใจรูปแบบกลโกงแล้ว ศึกษาข้อมูลในคู่มือฉุกเฉินและคลังความรู้เพิ่มเติมเพื่อความปลอดภัย'}
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                >
                  ทำแบบทดสอบใหม่อีกครั้ง
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
