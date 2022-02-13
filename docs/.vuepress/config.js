const Sidebar4ZH = require("./config/sidebar/sidebar4zh")
const NavBar = require("./config/navbar/navbar")
module.exports = {
    title: '空指针灬异常',
    description: '学习之路',
    themeConfig: {
        // head: [['link', { rel: 'icon', href: '/imgs/headIcon.png' }]],
        // logo: '/img/logo.png',

        //导航栏配置
        nav: NavBar,
        // 侧边栏
        sidebarDepth: 2,
        // 侧边栏配置
        sidebar: Sidebar4ZH
    }
}