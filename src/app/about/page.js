import Link from 'next/link';
import { Target, Eye, ShieldCheck, Rocket } from 'lucide-react';

export default function AboutPage() {
  const cards = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To simplify HR processes through smart technology and create a better work experience for everyone.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'To be the most trusted HRMS platform that empowers organizations to grow and succeed.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Reliable',
      desc: 'We prioritize data security and provide a reliable platform you can always trust.',
    },
    {
      icon: Rocket,
      title: 'Built for Growth',
      desc: 'Dayflow grows with your organization and adapts to your changing business needs.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            About <span className="text-[#6D36F6]">Dayflow</span>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Dayflow is a modern Human Resource Management System designed to simplify HR operations and empower organizations to manage their most valuable asset – their people.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            From attendance tracking to payroll management, Dayflow provides a seamless and secure experience for both employees and HR teams.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-block bg-[#6D36F6] hover:bg-[#5F3DC4] text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D36F6] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}