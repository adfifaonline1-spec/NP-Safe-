import React, { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Clock, 
  Shield, 
  AlertCircle,
  HelpCircle,
  GraduationCap,
  Scale,
  Award,
  BookOpen
} from 'lucide-react';
import { POLICE_STATIONS, BANK_CONTACTS, DISTRICTS } from '../data/nakhonPathomData';
import { NakhonPathomDistrict } from '../types/scam';

export const DirectorySection: React.FC = () => {
  const [filterDistrict, setFilterDistrict] = useState<NakhonPathomDistrict | 'ทั้งหมด'>('ทั้งหมด');

  const filteredStations = POLICE_STATIONS.filter((s) => {
    if (filterDistrict === 'ทั้งหมด') return true;
    return s.district === filterDistrict;
  });

  return (
    <div className="space-y-10 py-4">
      {/* Directory Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
          <Building2 className="w-4 h-4" />
          <span>ศูนย์รวมหน่วยงานช่วยเหลือและสิทธิทางกฎหมาย (Legal Aid & Emergency Directory)</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
          เครือข่ายสถานีตำรวจ สภ. หน่วยงานกฎหมาย และสิทธิผู้เสียหาย
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          รวบรวมเบอร์ติดต่อตรง พิกัดที่ตั้ง สิทธิในการเข้าถึงความยุติธรรม และช่องทางช่วยเหลือทางคดีฟรีสำหรับชาวนครปฐม
        </p>
      </div>

      {/* Legal Aid & Human Rights Agencies Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nakhon Pathom Provincial Justice Office */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700">กระทรวงยุติธรรม</span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">ปรึกษาฟรี</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">สำนักงานยุติธรรมจังหวัดนครปฐม</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              ศูนย์ช่วยเหลือทางกฎหมายแก่ประชาชน กองทุนยุติธรรม และพิจารณาเงินเยียวยาผู้เสียหายตามกฎหมาย (ศาลากลางจังหวัดนครปฐม)
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-900">034-340-050</span>
            <a
              href="tel:034340050"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
            >
              โทรปรึกษาคดี
            </a>
          </div>
        </div>

        {/* Lawyer Council of Nakhon Pathom */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700">ทนายความอาสา</span>
              <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded">ศาลจังหวัด</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">สภาทนายความจังหวัดนครปฐม</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              บริการทนายความขอแรงและให้คำปรึกษากลั่นกรองคดีฉ้อโกงออนไลน์ สำหรับประชาชนที่ยากไร้หรือไม่สามารถจ้างทนายได้
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-900">1167 (สายด่วน)</span>
            <a
              href="tel:1167"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
            >
              โทรทนายอาสา
            </a>
          </div>
        </div>

        {/* National Human Rights Commission (กสม.) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">องค์กรอิสระตาม รธน.</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">คุ้มครองสิทธิ</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">คณะกรรมการสิทธิมนุษยชนแห่งชาติ</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              รับเรื่องร้องเรียนกรณีถูกละเมิดสิทธิมนุษยชน ถูกข่มขู่คุกคามสิทธิในความปลอดภัย หรือไม่ได้รับความเป็นธรรมจากกระบวนการรัฐ
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-900">สายด่วน 1377</span>
            <a
              href="tel:1377"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
            >
              โทรสายด่วน กสม.
            </a>
          </div>
        </div>
      </div>

      {/* Victim Rights Knowledge Strip */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
          <Scale className="w-4 h-4 text-amber-700" />
          <span>สิทธิขั้นพื้นฐานของผู้เสียหายตามกฎหมายไทย (Victim's Legal Rights):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 space-y-1">
            <strong className="text-slate-900 block font-semibold">1. สิทธิแจ้งความร้องทุกข์</strong>
            <p className="leading-relaxed">
              ผู้เสียหายมีสิทธิเข้าแจ้งความต่อพนักงานสอบสวนได้ที่ สภ. ใดก็ได้ในนครปฐม และมีสิทธิขอคัดสำเนาบันทึกประจำวันเกี่ยวกับคดีโดยไม่มีค่าใช้จ่าย
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 space-y-1">
            <strong className="text-slate-900 block font-semibold">2. สิทธิยื่นคำร้องขอคุ้มครองสิทธิ ปปง.</strong>
            <p className="leading-relaxed">
              เมื่อ ปปง. ยึดทรัพย์สินจากขบวนการบัญชีม้าได้ ผู้เสียหายมีสิทธิยื่นคำร้องเพื่อขอรับการจัดสรรเงินคืนตามสัดส่วนความเสียหาย
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 space-y-1">
            <strong className="text-slate-900 block font-semibold">3. สิทธิได้รับการปฏิบัติด้วยความเคารพ</strong>
            <p className="leading-relaxed">
              มีสิทธิได้รับการรับฟังจากเจ้าหน้าที่รัฐโดยไม่ถูกพูดจาซ้ำเติม หรือเลือกปฏิบัติ และมีสิทธิขอรับความช่วยเหลือด้านจิตวิทยาหากเกิดภาวะซึมเศร้า
            </p>
          </div>
        </div>
      </div>

      {/* Mental Health Support & Psychological First Aid (ไม่ตีตรา ไม่ซ้ำเติม) */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200/60 pb-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
            <span className="p-1.5 bg-teal-600 text-white rounded-lg">
              <PhoneCall className="w-4 h-4" />
            </span>
            <span>ศูนย์ช่วยเหลือและเยียวยาจิตใจผู้เสียหาย (Mental Health Support)</span>
          </div>
          <span className="text-[11px] font-semibold text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-full w-fit">
            บริการฟรี · ไม่ตัดสิน · เก็บความลับ 100%
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">“คุณไม่ได้โง่ คุณคือผู้เสียหาย”</strong> มิจฉาชีพทำงานเป็นองค์กรอาชญากรรมข้ามชาติที่ศึกษาวิทยาศาสตร์ทางสมองเพื่อลวงเหยื่อ คนที่ถูกหลอกมีตั้งแต่ข้าราชการ ครูอาจารย์ แพทย์ จนถึงนักศึกษา หากรู้สึกเครียด นอนไม่หลับ วิตกกังวล หรือรู้สึกอับอาย อย่าเก็บความทุกข์ไว้คนเดียว สามารถติดต่อสายด่วนสุขภาพจิตได้ทันที:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-white p-4 rounded-xl border border-teal-200/80 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">กรมสุขภาพจิต (โทรฟรี 24 ชม.)</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">สายด่วนสุขภาพจิต 1323</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                บริการให้คำปรึกษาทางจิตวิทยาสำหรับผู้ที่เผชิญวิกฤตความเครียด กังวล หรือซึมเศร้าหลังเกิดเหตุ
              </p>
            </div>
            <a
              href="tel:1323"
              className="mt-2 w-full text-center py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
            >
              โทร 1323 (ฟรี)
            </a>
          </div>

          <div className="bg-white p-4 rounded-xl border border-teal-200/80 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">สมาคมสะมาริตันส์แห่งประเทศไทย</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">สายด่วนคลายทุกข์</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                พื้นที่รับฟังอย่างเข้าใจ ไม่ตัดสิน และร่วมหาทางออกยามที่คุณรู้สึกหมดหวัง โทร: 02-113-6789
              </p>
            </div>
            <a
              href="tel:021136789"
              className="mt-2 w-full text-center py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300"
            >
              โทร 02-113-6789
            </a>
          </div>

          <div className="bg-white p-4 rounded-xl border border-teal-200/80 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">มหาวิทยาลัยมหิดล ศาลายา</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">ศูนย์ให้คำปรึกษาจิตวิทยานักศึกษา</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                บริการรับฟังและเยียวยาจิตใจสำหรับนักศึกษาและบุคลากร ม.มหิดล ติดต่อที่อาคาร MLC ศาลายา
              </p>
            </div>
            <a
              href="tel:028494500"
              className="mt-2 w-full text-center py-1.5 text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
            >
              ติดต่อฝ่ายจิตวิทยา มหิดล
            </a>
          </div>
        </div>
      </div>

      {/* Central National & Provincial Hotlines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AOC 1441 */}
        <div className="bg-rose-900 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-200">ศูนย์ปฏิบัติการ AOC</span>
              <span className="text-[11px] bg-rose-800 text-rose-100 px-2 py-0.5 rounded">24 ชั่วโมง</span>
            </div>
            <h3 className="text-xl font-bold mt-1">สายด่วน 1441</h3>
            <p className="text-xs text-rose-200 mt-1 leading-relaxed">
              ระงับบัญชีม้า อายัดเงินทันที ประสานตำรวจไซเบอร์ บช.สอท. และ ปปง. โทรฟรี 24 ชม.
            </p>
          </div>
          <a
            href="tel:1441"
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-950 bg-white rounded-lg hover:bg-rose-50 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>กดโทร 1441 ทันที</span>
          </a>
        </div>

        {/* Damrongtham Center Nakhon Pathom */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">ศูนย์ดำรงธรรมจังหวัดนครปฐม</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">ศาลากลางจังหวัด</span>
            </div>
            <h3 className="text-xl font-bold mt-1">034-340-003</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              รับเรื่องร้องเรียน ร้องทุกข์ และประสานความช่วยเหลือประชาชนผู้เดือดร้อน จ.นครปฐม
            </p>
          </div>
          <a
            href="tel:034340003"
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>โทรศูนย์ดำรงธรรมนครปฐม</span>
          </a>
        </div>

        {/* Cyber Police Online */}
        <div className="bg-blue-900 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-200">สำนักงานตำรวจแห่งชาติ</span>
              <span className="text-[11px] bg-blue-800 text-blue-100 px-2 py-0.5 rounded">ออนไลน์</span>
            </div>
            <h3 className="text-lg font-bold mt-1">ThaiPoliceOnline</h3>
            <p className="text-xs text-blue-200 mt-1 leading-relaxed">
              ระบบแจ้งความคดีออนไลน์อย่างเป็นทางการ พร้อมติดตามความคืบหน้าของคดี
            </p>
          </div>
          <a
            href="https://thaipoliceonline.go.th"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-blue-950 bg-white rounded-lg hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>เข้าเว็บไซต์ thaipoliceonline</span>
          </a>
        </div>
      </div>

      {/* Police Stations by Nakhon Pathom Districts */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              สถานีตำรวจภูธร (สภ.) ในจังหวัดนครปฐม
            </h3>
            <p className="text-xs text-slate-500">
              เดินทางไปพบพนักงานสอบสวนตามท้องที่เกิดเหตุเพื่อออกหมายอายัดบัญชี
            </p>
          </div>

          {/* District filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-700">กรองอำเภอ:</span>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value as NakhonPathomDistrict | 'ทั้งหมด')}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium focus:outline-none focus:border-amber-600"
            >
              <option value="ทั้งหมด">ทุกสถานีตำรวจในนครปฐม</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  อำเภอ{d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    อำเภอ{station.district}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {station.name}
                  </h4>
                </div>
                <a
                  href={`tel:${station.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>โทรโรงพัก</span>
                </a>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{station.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono font-medium text-slate-900">{station.phone}</span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-500">{station.service}</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  พื้นที่รับผิดชอบ: {station.coverageAreas}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* University Student Support in Nakhon Pathom */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <GraduationCap className="w-4 h-4 text-slate-700" />
          <span>หน่วยงานช่วยเหลือสำหรับนักศึกษาในจังหวัดนครปฐม (ม.มหิดล ศาลายา & ม.เกษตรฯ กำแพงแสน)</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          หากเป็นนักศึกษา ม.มหิดล (ศาลายา) หรือ ม.เกษตรศาสตร์ (กำแพงแสน) ที่ตกเป็นเหยื่อหอพักทิพย์ หรือหลอกทำงานออนไลน์ 
          สามารถประสานงานกับกองกิจการนักศึกษาเพื่อขอความช่วยเหลือทางกฎหมายและจิตวิทยาได้:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block">กองกิจการนักศึกษา มหาวิทยาลัยมหิดล (ศาลายา)</span>
            <span className="text-slate-500 block text-[11px]">อาคารศูนย์การเรียนรู้มหิดล (MLC) อ.พุทธมณฑล จ.นครปฐม</span>
            <span className="font-mono text-slate-700 block mt-1">โทร: 02-849-4500 (สายด่วนช่วยเหลือนักศึกษา)</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block">กองกิจการนิสิต ม.เกษตรศาสตร์ (กำแพงแสน)</span>
            <span className="text-slate-500 block text-[11px]">วิทยาเขตกำแพงแสน อ.กำแพงแสน จ.นครปฐม</span>
            <span className="font-mono text-slate-700 block mt-1">โทร: 034-351-400 ต่อ งานบริการนิสิตและวินัย</span>
          </div>
        </div>
      </div>

      {/* Bank Fraud Hotlines Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            สายด่วนอายัดบัญชีฉุกเฉินทุกธนาคาร (15 สถาบันการเงิน 24 ชม.)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ตามประกาศของสมาคมธนาคารไทยและ พ.ร.ก. ปราบปรามอาชญากรรมทางเทคโนโลยี
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BANK_CONTACTS.map((bank) => (
            <div
              key={bank.id}
              className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2"
            >
              <div>
                <span className="text-xs font-bold text-slate-900 block">{bank.bankName}</span>
                <span className="text-xs font-mono font-medium text-slate-700 block">{bank.hotline}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{bank.note}</span>
              </div>
              <a
                href={`tel:${bank.hotlineRaw}`}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                โทร
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
