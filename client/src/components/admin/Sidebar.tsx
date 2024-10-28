'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaUserMd, FaImage, FaStethoscope, FaQuestion, FaClinicMedical,
  FaHospital, FaBullhorn, FaComment, FaList, FaUsers, FaInfoCircle
} from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  const tables = [
    { name: 'tenaga_medis', icon: <FaUserMd className='transition-transform ease-linear duration-300' title="Tenaga Medis" /> },
    { name: 'galeri', icon: <FaImage className='transition-transform ease-linear duration-300' title="Galeri" /> },
    { name: 'layanan', icon: <FaStethoscope className='transition-transform ease-linear duration-300' title="Layanan" /> },
    { name: 'faq', icon: <FaQuestion className='transition-transform ease-linear duration-300' title="FAQ" /> },
    { name: 'fasilitas', icon: <FaHospital title="Fasilitas" /> },
    { name: 'misi', icon: <FaBullhorn className='transition-transform ease-linear duration-300' title="Misi" /> },
    { name: 'promo', icon: <FaBullhorn className='transition-transform ease-linear duration-300' title="Promo" /> },
    { name: 'testimoni', icon: <FaComment className='transition-transform ease-linear duration-300' title="Testimoni" /> },
    { name: 'sub_layanan', icon: <FaList className='transition-transform ease-linear duration-300' title="Sub Layanan" /> },
    { name: 'tentang', icon: <FaInfoCircle className='transition-transform ease-linear duration-300' title="Tentang" /> },
  ];

  return (
    <nav className="bg-gray-800 text-white w-20 md:w-64 overflow-hidden transition-linear h-full p-4">
      <Link href="/admin" className="text-2xl text-nowrap text-ellipsis hover:bg-white/30 rounded transition-ease-in-out border-b py-4 flex justify-center items-center text-center w-full font-bold mb-4">
        A<span className='hidden opacity-0 md:opacity-100 md:block'>dmin Panel</span>
      </Link>

      <ul className="space-y-2">
        {tables.map((table) => {
          const isActive = pathname === `/admin/${table.name}`;
          return (
            <li key={table.name} className="flex items-center">
              <Link
                className={`py-2 px-4 rounded flex items-center gap-2 capitalize transition-ease-in-out ${isActive ? 'bg-purple-700' : 'hover:bg-purple-700/50'}`}
                href={`/admin/${table.name}`}
              >
                {table.icon}
                <span className='opacity-0 md:opacity-100 transition-linear text-nowrap hidden md:block'>{table.name.split('_').join(' ')}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
