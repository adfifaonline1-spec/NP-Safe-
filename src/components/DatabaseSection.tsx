import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  CreditCard, 
  ThumbsUp, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Share2,
  Copy,
  PlusCircle,
  Network,
  List,
  GitBranch,
  Shield,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { ScamReport, NakhonPathomDistrict, ScamCategory, ScamPatternCluster } from '../types/scam';
import { DISTRICTS, SCAM_CATEGORIES_METADATA, SCAM_PATTERN_CLUSTERS } from '../data/nakhonPathomData';

interface DatabaseSectionProps {
  reports: ScamReport[];
  selectedDistrict: NakhonPathomDistrict | 'ทั้งหมด';
  onSelectDistrict: (district: NakhonPathomDistrict | 'ทั้งหมด') => void;
  onLikeReport: (id: string) => void;
  onOpenReportModal: () => void;
  initialSearchQuery?: string;
  onResetReports?: () => void;
}

export const DatabaseSection: React.FC<DatabaseSectionProps> = ({
  reports,
  selectedDistrict,
  onSelectDistrict,
  onLikeReport,
  onOpenReportModal,
  initialSearchQuery = '',
  onResetReports,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'patterns'>('list');
  const [selectedCluster, setSelectedCluster] = useState<ScamPatternCluster | null>(SCAM_PATTERN_CLUSTERS[0]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleExportData = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reports, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `npsafe-reports-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Export failed:', e);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState<ScamCategory | 'all'>('all');
  const [filterOutcome, setFilterOutcome] = useState<'all' | 'avoided' | 'loss'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyField = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 1800);
  };

  // Sync initialSearchQuery if updated externally
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // District filter
      if (selectedDistrict !== 'ทั้งหมด' && item.district !== selectedDistrict) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Outcome filter
      if (filterOutcome === 'avoided' && !item.avoided) return false;
      if (filterOutcome === 'loss' && item.avoided) return false;

      // Text query search with smart normalization
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const cleanQueryNumbers = query.replace(/[^0-9]/g, '');

        const inTitle = item.title.toLowerCase().includes(query);
        const inPhone = item.phoneNumber ? item.phoneNumber.toLowerCase().includes(query) : false;
        const inBank = item.bankAccount ? item.bankAccount.toLowerCase().includes(query) : false;
        const inAccount = item.accountName ? item.accountName.toLowerCase().includes(query) : false;
        const inBankName = item.bankName ? item.bankName.toLowerCase().includes(query) : false;
        const inStory = item.story.toLowerCase().includes(query);
        const inCounter = item.countermeasures.toLowerCase().includes(query);
        const inHandle = item.scammerHandle ? item.scammerHandle.toLowerCase().includes(query) : false;
        const inLocation = item.locationDetail ? item.locationDetail.toLowerCase().includes(query) : false;
        const inDistrict = item.district.toLowerCase().includes(query);
        const inTags = item.tags ? item.tags.some((t) => t.toLowerCase().includes(query)) : false;

        // Number normalization check (e.g. typing 0684529182 finds 068-452-9182)
        const cleanItemPhone = item.phoneNumber ? item.phoneNumber.replace(/[^0-9]/g, '') : '';
        const cleanItemBank = item.bankAccount ? item.bankAccount.replace(/[^0-9]/g, '') : '';
        const matchCleanPhone = cleanQueryNumbers.length >= 6 && cleanItemPhone.includes(cleanQueryNumbers);
        const matchCleanBank = cleanQueryNumbers.length >= 6 && cleanItemBank.includes(cleanQueryNumbers);

        return (
          inTitle ||
          inPhone ||
          inBank ||
          inAccount ||
          inBankName ||
          inStory ||
          inCounter ||
          inHandle ||
          inLocation ||
          inDistrict ||
          inTags ||
          matchCleanPhone ||
          matchCleanBank
        );
      }

      return true;
    });
  }, [reports, selectedDistrict, selectedCategory, filterOutcome, searchQuery]);

  const handleCopyReport = async (report: ScamReport) => {
    const text = `⚠️ เตือนภัยสแกมเมอร์ใน จ.นครปฐม (${report.district}):\n${report.title}\nเบอร์คนร้าย: ${report.phoneNumber || '-'}\nบัญชีม้า: ${report.bankAccount || '-'} (${report.bankName || '-'} / ${report.accountName || '-'})\nแนวทางรับมือ: ${report.countermeasures}\nข้อมูลจาก NP-Safe นครปฐมรู้ทันสแกมเมอร์`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(report.id);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(report.id);
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <Shield className="w-4 h-4" />
            <span>ฐานข้อมูลและแผนที่ความเชื่อมโยง (Scam Database & Pattern Mapping)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            สืบค้นข้อมูลคนร้ายและแผนผังพฤติการณ์เชื่อมโยง
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            แยกแยะข้อมูลรายงานชุมชนและตรวจหาเครือข่ายบัญชีม้าที่ใช้บทพูดหรือเบอร์โทรซ้ำซ้อน
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>รายการเคส ({filteredReports.length})</span>
            </button>
            <button
              onClick={() => setViewMode('patterns')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'patterns'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-amber-600" />
              <span>แผนผังเชื่อมโยง (Pattern Map)</span>
            </button>
          </div>

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>+ แจ้งเบาะแส</span>
          </button>
        </div>
      </div>

      {/* Presumption of Innocence & Safe Data Notice */}
      <div className="p-3 bg-slate-100 rounded-xl flex items-start gap-2.5 text-xs text-slate-600 border border-slate-200">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-800 font-semibold">ข้อตกลงความเป็นธรรมและสิทธิมนุษยชน: </strong>
          ข้อมูลในฐานข้อมูลนี้เป็นเบาะแสที่รวบรวมจากประสบการณ์ของประชาชนเพื่อประโยชน์ในการเตือนภัยสาธารณะ 
          ยังมิใช่คำพิพากษาถึงที่สุดของศาล ทั้งนี้ผู้ใช้ควรตรวจสอบกับแหล่งข้อมูลของธนาคารและสถานีตำรวจท้องที่ก่อนการตัดสินใจทำนิติกรรมใดๆ
        </div>
      </div>

      {/* VIEW MODE 1: SCAM PATTERN MAPPING (Unique Feature requested by user!) */}
      {viewMode === 'patterns' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-amber-700 block">
                เครือข่ายพฤติการณ์ร่วม (Modus Operandi Clusters)
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                วิเคราะห์ความเชื่อมโยงของกลุ่มมิจฉาชีพที่ก่อเหตุในนครปฐม
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                คลิกเลือกคลัสเตอร์ด้านล่างเพื่อดูบทพูดเดียวกัน (Script), บัญชีม้าที่ใช้ร่วมกัน, และอำเภอที่ตกเป็นเป้าหมาย
              </p>
            </div>

            {/* Pattern Clusters Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SCAM_PATTERN_CLUSTERS.map((cluster) => {
                const isSelected = selectedCluster?.id === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedCluster(cluster)}
                    className={`text-left p-3.5 rounded-xl border transition-all space-y-2 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                        {cluster.safetyLevel}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
                        {cluster.victimCount} ผู้เสียหาย
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {cluster.patternName}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">
                      {cluster.centralScript}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Pattern Details Visualizer */}
            {selectedCluster && (
              <div className="p-6 bg-slate-900 text-white rounded-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-amber-400 font-bold block">
                      แผนผังความเชื่อมโยง: {selectedCluster.patternName}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      พฤติการณ์: {selectedCluster.modusOperandi}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    ความเสียหายประเมินรวม: ~{selectedCluster.totalEstimatedLoss.toLocaleString()} บาท
                  </div>
                </div>

                {/* Graph Connection Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Node 1: Script Used */}
                  <div className="p-4 bg-slate-800/90 rounded-lg border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>บทสคริปต์กลางที่ใช้หลอกซ้ำๆ:</span>
                    </span>
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      {selectedCluster.centralScript}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-700">
                      ตรวจพบครั้งแรก: {selectedCluster.firstDetected} · เคลื่อนไหวล่าสุด: {selectedCluster.lastActive}
                    </div>
                  </div>

                  {/* Node 2: Interconnected Phone Numbers */}
                  <div className="p-4 bg-slate-800/90 rounded-lg border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      <span>เบอร์โทรศัพท์ที่เกี่ยวข้องในเครือข่าย:</span>
                    </span>
                    <ul className="space-y-1 text-xs font-mono">
                      {selectedCluster.associatedPhones.map((phone, i) => (
                        <li key={i} className="flex items-center justify-between bg-slate-900/60 px-2.5 py-1.5 rounded">
                          <span className="text-slate-200">{phone}</span>
                          <span className="text-[10px] text-rose-300">รายงานแล้ว</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Node 3: Bank Accounts & Target Areas */}
                  <div className="p-4 bg-slate-800/90 rounded-lg border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      <span>บัญชีม้าที่ตรวจพบ:</span>
                    </span>
                    <ul className="space-y-1 text-xs font-mono">
                      {selectedCluster.associatedBankAccounts.map((acc, i) => (
                        <li key={i} className="bg-slate-900/60 px-2.5 py-1.5 rounded text-slate-200">
                          {acc}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 text-xs">
                      <span className="text-slate-400 block text-[11px]">อำเภอที่ถูกโจมตีในนครปฐม:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCluster.associatedDistricts.map((d) => (
                          <span key={d} className="text-[10px] bg-slate-700 text-slate-200 px-2 py-0.5 rounded">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-400">
                  <span>ช่วยให้พนักงานสอบสวนมองเห็นภาพรวมเครือข่ายบัญชีม้าเป็นกลุ่มก้อน</span>
                  <button
                    onClick={() => {
                      setViewMode('list');
                      setSearchQuery(selectedCluster.patternName.split(' ')[1] || '');
                    }}
                    className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                  >
                    <span>ค้นหาเคสในกลุ่มนี้</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: CASE LIST */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
            {/* Search input with Clear button */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาเบอร์โทร, เลขบัญชีม้า, ชื่อคนร้าย, เพจปลอม, อำเภอ หรือข้อความ..."
                className="w-full pl-9 pr-16 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-600 focus:bg-white shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 px-2 py-0.5 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
                >
                  ล้างค้นหา
                </button>
              )}
            </div>

            {/* Popular search tags for instant 1-click search */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 pt-0.5">
              <span className="font-semibold text-slate-700">คำค้นหายอดนิยม:</span>
              {[
                'หอพักศาลายา',
                'สภ.เมืองนครปฐม',
                'คืนค่าไฟ PEA',
                'งานออนไลน์ นศ.',
                'ปุ๋ยกำแพงแสน',
                'พัสดุ COD',
                'หลวงพ่อเปิ่น',
                'แอปดูดเงิน',
                'กู้เงินด่วน',
                'พร้อมเพย์',
                'ผ่อนไอโฟน',
                'ส้มโอนครชัยศรี',
              ].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => setSearchQuery(kw)}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    searchQuery === kw
                      ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* District Fast-Filter Pills with counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-700 shrink-0">เลือกอำเภอ:</span>
              <button
                type="button"
                onClick={() => onSelectDistrict('ทั้งหมด')}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedDistrict === 'ทั้งหมด'
                    ? 'bg-slate-900 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                ทุกอำเภอ ({reports.length})
              </button>
              {DISTRICTS.map((d) => {
                const count = reports.filter((r) => r.district === d).length;
                const isSelected = selectedDistrict === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onSelectDistrict(d)}
                    className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {d} ({count})
                  </button>
                );
              })}
            </div>

            {/* Secondary Filter controls */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              {/* Category selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">หมวดหมู่:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ScamCategory | 'all')}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium focus:outline-none focus:border-amber-600"
                >
                  <option value="all">ทุกรูปแบบกลโกง (ทั้งหมด)</option>
                  {Object.entries(SCAM_CATEGORIES_METADATA).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Outcome toggle */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md">
                <button
                  onClick={() => setFilterOutcome('all')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    filterOutcome === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ทั้งหมด
                </button>
                <button
                  onClick={() => setFilterOutcome('avoided')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    filterOutcome === 'avoided'
                      ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  รอดมาได้ (ไหวตัวทัน)
                </button>
                <button
                  onClick={() => setFilterOutcome('loss')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    filterOutcome === 'loss'
                      ? 'bg-white text-rose-800 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  เกิดความเสียหาย
                </button>
              </div>

              {/* Reset active filters */}
              {(searchQuery || selectedDistrict !== 'ทั้งหมด' || selectedCategory !== 'all' || filterOutcome !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSelectDistrict('ทั้งหมด');
                    setSelectedCategory('all');
                    setFilterOutcome('all');
                  }}
                  className="text-amber-800 hover:text-amber-900 font-semibold underline underline-offset-2 ml-1"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              )}

              {/* Results count indicator & Data Tools */}
              <div className="ml-auto flex items-center gap-3 text-xs">
                <span className="text-slate-700 font-mono font-semibold tabular-nums bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  แสดง {filteredReports.length} จาก {reports.length} เคส
                </span>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={handleExportData}
                  className="text-slate-600 hover:text-slate-900 underline underline-offset-2"
                  title="ส่งออกรายงานทั้งหมดเป็นไฟล์ JSON"
                >
                  ส่งออก JSON
                </button>
                {onResetReports && (
                  <>
                    <span className="text-slate-300">·</span>
                    <button
                      type="button"
                      onClick={onResetReports}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="คืนค่าเคสตัวอย่างสำหรับนำเสนอ"
                    >
                      รีเซ็ตข้อมูล
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          {filteredReports.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">ไม่พบข้อมูลที่ตรงกับคำค้นหา</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                หากคุณเพิ่งพบเบอร์โทร หรือเลขบัญชีต้องสงสัยในนครปฐม สามารถกดปุ่มด้านล่างเพื่อเพิ่มข้อมูลเตือนภัยได้ทันที
              </p>
              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>โพสต์เตือนภัยเบอร์นี้เป็นคนแรก</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => {
                const catMeta = SCAM_CATEGORIES_METADATA[report.category];
                return (
                  <div
                    key={report.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-all space-y-4"
                  >
                    {/* Header row: Title & unboxed metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            อำเภอ{report.district}
                          </span>
                          <span>·</span>
                          <span>{catMeta?.label || report.category}</span>
                          <span>·</span>
                          <span className="font-mono">{report.dateReported}</span>
                          {report.locationDetail && (
                            <>
                              <span>·</span>
                              <span className="text-slate-600">{report.locationDetail}</span>
                            </>
                          )}
                          <span>·</span>
                          {report.verificationStatus === 'verified' ? (
                            <span className="text-emerald-700 font-medium">ยืนยันข้อมูลแล้ว</span>
                          ) : (
                            <span className="text-slate-500">รายงานเบื้องต้นจากชุมชน</span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {report.title}
                        </h3>
                      </div>

                      {/* Outcome indicator */}
                      <div className="shrink-0 self-start">
                        {report.avoided ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>รอดมาได้ (ไหวตัวทัน)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>เสียหาย {report.lossAmount.toLocaleString()} บาท</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Scammer identifiers info box */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg text-xs border border-slate-200/60">
                      {report.phoneNumber && (
                        <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-md border border-slate-200/80">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <div className="truncate">
                              <span className="text-slate-500 block text-[10px]">เบอร์ที่ใช้หลอก:</span>
                              <span className="font-mono font-bold text-slate-900">{report.phoneNumber}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyField(report.phoneNumber!, `phone-${report.id}`)}
                            className="p-1 hover:bg-slate-100 text-slate-500 rounded text-[10px] shrink-0 font-medium"
                            title="คัดลอกเบอร์โทร"
                          >
                            {copiedField === `phone-${report.id}` ? (
                              <span className="text-emerald-600 font-bold">คัดลอกแล้ว!</span>
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {report.bankAccount && (
                        <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-md border border-slate-200/80">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <div className="truncate">
                              <span className="text-slate-500 block text-[10px]">บัญชีม้า ({report.bankName || 'ธนาคาร'}):</span>
                              <span className="font-mono font-bold text-slate-900">{report.bankAccount}</span>
                              {report.accountName && (
                                <span className="block text-[11px] text-slate-600 truncate">{report.accountName}</span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyField(report.bankAccount!, `bank-${report.id}`)}
                            className="p-1 hover:bg-slate-100 text-slate-500 rounded text-[10px] shrink-0 font-medium"
                            title="คัดลอกเลขบัญชี"
                          >
                            {copiedField === `bank-${report.id}` ? (
                              <span className="text-emerald-600 font-bold">คัดลอกแล้ว!</span>
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {report.scammerHandle && (
                        <div className="bg-white p-2 rounded-md border border-slate-200/80 flex flex-col justify-center">
                          <span className="text-slate-500 block text-[10px]">ช่องทาง/เพจ:</span>
                          <span className="text-slate-800 font-medium truncate block">{report.scammerHandle}</span>
                        </div>
                      )}
                    </div>

                    {/* Incident Story */}
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-700">พฤติการณ์กลโกง:</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {report.story}
                      </p>
                    </div>

                    {/* Countermeasures Section */}
                    <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        <span>แนวทางการรับมือ / วิธีเอาตัวรอด (สิ่งที่ช่วยให้รอดหรือแก้ปัญหา):</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {report.countermeasures}
                      </p>
                    </div>

                    {/* Clickable Tag Badges */}
                    {report.tags && report.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400">แท็ก:</span>
                        {report.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSearchQuery(tag)}
                            className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600 rounded-md transition-colors cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action footer: Helpful vote and share */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => onLikeReport(report.id)}
                          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                          <span>มีประโยชน์ ({report.helpfulCount})</span>
                        </button>
                        <button
                          onClick={() => handleCopyReport(report)}
                          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                        >
                          {copiedId === report.id ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span>{copiedId === report.id ? 'คัดลอกข้อความเตือนภัยแล้ว!' : 'แชร์เตือนคนใกล้ชิด'}</span>
                        </button>
                      </div>

                      <span className="text-[11px] text-slate-400 font-mono">
                        รหัสเคส #{report.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
