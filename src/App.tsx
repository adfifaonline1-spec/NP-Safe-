import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DetectorWidget } from './components/DetectorWidget';
import { DailyRadarBanner } from './components/DailyRadarBanner';
import { PlaybookSection } from './components/PlaybookSection';
import { DatabaseSection } from './components/DatabaseSection';
import { ReportSection } from './components/ReportSection';
import { DirectorySection } from './components/DirectorySection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { Footer } from './components/Footer';
import { INITIAL_REPORTS } from './data/nakhonPathomData';
import { ScamReport, NakhonPathomDistrict } from './types/scam';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('detector');
  const [selectedDistrict, setSelectedDistrict] = useState<NakhonPathomDistrict | 'ทั้งหมด'>('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reports, setReports] = useState<ScamReport[]>(() => {
    try {
      const saved = localStorage.getItem('np_safe_reports');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_REPORTS;
  });

  // Save reports to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('np_safe_reports', JSON.stringify(reports));
    } catch {
      // ignore
    }
  }, [reports]);

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('database');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSelectDistrict = (district: NakhonPathomDistrict | 'ทั้งหมด') => {
    setSelectedDistrict(district);
    setActiveTab('database');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleLikeReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleAddReport = (
    newReportData: Omit<ScamReport, 'id' | 'dateReported' | 'helpfulCount' | 'verificationStatus'>
  ) => {
    const newReport: ScamReport = {
      ...newReportData,
      id: `np-user-${Date.now().toString().slice(-5)}`,
      dateReported: new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      helpfulCount: 1,
      verificationStatus: 'community',
    };

    setReports((prev) => [newReport, ...prev]);
  };

  const handleResetReports = () => {
    try {
      localStorage.removeItem('np_safe_reports');
    } catch {
      // ignore
    }
    setReports(INITIAL_REPORTS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 3-zone Top Bar Contract Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReportModal={() => {
          setActiveTab('report');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Hero Section */}
      <HeroSection
        onSearch={handleHeroSearch}
        onSelectDistrict={handleSelectDistrict}
        onOpenReportModal={() => {
          setActiveTab('report');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPlaybook={() => {
          setActiveTab('playbook');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Content */}
        {activeTab === 'detector' && (
          <div className="space-y-8">
            {/* 1. Daily Proactive Radar & Alerts */}
            <DailyRadarBanner
              onSelectDistrict={(district) => {
                setSelectedDistrict(district);
                setActiveTab('database');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
            />

            {/* 2. Interactive Pre-Transfer Scam Detector */}
            <DetectorWidget
              reports={reports}
              onOpenReportModal={() => {
                setActiveTab('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 3. Fast Links to Crisis Playbook or Database */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-900 block font-bold text-sm">เพิ่งเผลอโอนเงินไปแล้ว หรือหน้าจอมือถือโดนล็อก?</strong>
                อย่าตกใจ กฎหมายใหม่ให้อำนาจธนาคารอายัดบัญชีม้าได้ทันที 72 ชม. ทำตามคู่มือฉุกเฉินของเราได้เลย
              </div>
              <button
                onClick={() => {
                  setActiveTab('playbook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-bold text-rose-900 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg whitespace-nowrap transition-colors shrink-0 shadow-2xs"
              >
                เปิดคู่มือฉุกเฉิน 72 ชม. ทันที
              </button>
            </div>
          </div>
        )}

        {activeTab === 'playbook' && (
          <PlaybookSection
            onGoToDirectory={() => {
              setActiveTab('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'database' && (
          <DatabaseSection
            reports={reports}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onLikeReport={handleLikeReport}
            onOpenReportModal={() => {
              setActiveTab('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialSearchQuery={searchQuery}
            onResetReports={handleResetReports}
          />
        )}

        {activeTab === 'report' && (
          <ReportSection
            onSubmitReport={handleAddReport}
            onGoToDatabase={() => {
              setActiveTab('database');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'directory' && <DirectorySection />}

        {activeTab === 'knowledge' && (
          <KnowledgeSection
            onOpenPlaybook={() => {
              setActiveTab('playbook');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
