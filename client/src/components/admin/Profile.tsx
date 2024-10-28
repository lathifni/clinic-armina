import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';



export const Profile= ()=>{

    const {logout} = useAuth()
    const handleProfileClick = () => {
      Swal.fire({
        toast:true,
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
       
        position: 'top-end',
      }).then((result) => {
        if (result.isConfirmed) {
          logout()
          console.log('User logged out');
        }
      });
    };

    return     <div className="flex justify-end">
    <FaUserCircle
      className="text-3xl cursor-pointer"
      title="Profile"
      onClick={handleProfileClick}
    />
  </div>
}