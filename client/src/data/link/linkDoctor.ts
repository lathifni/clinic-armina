export const linkDoctor = (path:string|number)=>{
  return  [
    
    {
      label: "home",
      href: "/"+path,
    },
    {
      label: "Layanan",
      href: "/"+path+ "/service",
    },
    {
      label: "Galeri",
      href: "/"+path+ "/gallery",
    },
 
  ];
} 
