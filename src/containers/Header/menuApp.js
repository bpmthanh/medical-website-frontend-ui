export const adminMenu = [
  {
    //quản lý nguời dùng
    name: 'menu.admin.manage-user',
    menus: [
      // {
      //   name: 'menu.admin.manage-admin',
      //   link: '/system/admin-manage',
      // },
      // {
      //   name: 'menu.admin.crud',
      //   link: '/system/crud-manage',
      // },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/doctor-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      {
        //quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule',
      },
    ],
  },
  {
    //quản lý phòng khám
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
    ],
  },
];

export const doctorMenu = [
  {
    //quản lý nguời dùng
    name: 'menu.doctor.manage-schedule',
    menus: [
      {
        name: 'menu.doctor.schedule',
        link: '/doctor/manage-schedule',
      },
    ],
  },
];
