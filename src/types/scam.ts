export type NakhonPathomDistrict =
  | 'เมืองนครปฐม'
  | 'พุทธมณฑล'
  | 'กำแพงแสน'
  | 'นครชัยศรี'
  | 'สามพราน'
  | 'ดอนตูม'
  | 'บางเลน';

export type ScamCategory =
  | 'callcenter'
  | 'dorm_student'
  | 'job_investment'
  | 'agri_trade'
  | 'loan_fake'
  | 'cod_parcel'
  | 'app_drain'
  | 'romance';

export interface ScamReport {
  id: string;
  title: string;
  phoneNumber?: string;
  bankAccount?: string;
  bankName?: string;
  accountName?: string;
  scammerHandle?: string;
  district: NakhonPathomDistrict;
  locationDetail?: string;
  category: ScamCategory;
  lossAmount: number; // 0 if avoided
  avoided: boolean;
  dateReported: string;
  story: string;
  countermeasures: string;
  helpfulCount: number;
  verificationStatus: 'verified' | 'community';
  relatedPatternId?: string; // เชื่อมโยงกับ Pattern Mapping
  tags?: string[];
}

export interface PoliceStation {
  id: string;
  name: string;
  district: NakhonPathomDistrict;
  address: string;
  phone: string;
  phoneRaw: string;
  service: string;
  coverageAreas: string;
}

export interface BankContact {
  id: string;
  bankName: string;
  bankShort: string;
  hotline: string;
  hotlineRaw: string;
  note: string;
  badgeColor: string;
}

export interface KnowledgeTactic {
  id: string;
  title: string;
  category: ScamCategory;
  districtHighlight: string;
  dangerLevel: 'วิกฤต' | 'เสี่ยงสูง' | 'ระวังปานกลาง';
  description: string;
  triggerPhrases: string[];
  psychologicalTrick: string;
  localScenario: string;
  defenseProtocol: string[];
  ifAlreadyTrapped: string[];
  humanRightsImpact?: string; // ผลกระทบต่อสิทธิมนุษยชน
}

export interface CaseFileSummary {
  victimName: string;
  victimPhone: string;
  victimDistrict: NakhonPathomDistrict;
  incidentDate: string;
  incidentTime: string;
  scammerPhone: string;
  scammerBankName: string;
  scammerBankAccount: string;
  scammerAccountName: string;
  platformUsed: string;
  transferredAmount: number;
  bankCaseId?: string;
  onlinePoliceCaseId?: string;
  narrative: string;
  evidenceItems: string[];
}

export interface ScamPatternCluster {
  id: string;
  patternName: string;
  category: ScamCategory;
  centralScript: string;
  associatedPhones: string[];
  associatedBankAccounts: string[];
  associatedDistricts: NakhonPathomDistrict[];
  victimCount: number;
  totalEstimatedLoss: number;
  modusOperandi: string;
  firstDetected: string;
  lastActive: string;
  safetyLevel: 'อันตรายระบาดหนัก' | 'เริ่มพบเบาะแส' | 'เฝ้าระวัง';
}

export interface HumanRightsPrinciple {
  title: string;
  rightName: string;
  iconName: string;
  academicArticle: string; // อ้างอิงปฏิญญาสากลว่าด้วยสิทธิมนุษยชน (UDHR)
  applicationInApp: string;
  practicalAction: string;
}
