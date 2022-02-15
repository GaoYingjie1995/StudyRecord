const Sidebar4ZH = require("./config/sidebar/sidebar4zh")
const NavBar = require("./config/navbar/navbar")
module.exports = {

    // title: '空指针灬异常',
    description: '踩坑之路',
    base: '/StudyRecord/', //GitHub page部署的仓库
    themeConfig: {
        // head: [['link', { rel: 'icon', href: '/imgs/headIcon.png' }]],
        logo: '/imgs/logo.png',
        //配置 GitHub地址
        repo: 'GaoYingjie1995/StudyRecord',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'Github',
        //导航栏配置
        nav: NavBar,
        // 侧边栏
        sidebarDepth: 2,
        // 侧边栏配置
        sidebar: Sidebar4ZH
    }
}