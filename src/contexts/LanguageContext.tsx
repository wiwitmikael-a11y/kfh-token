'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

export type Language = 'en' | 'zh' | 'ko' | 'ar'

interface Translations {
    [key: string]: string
}

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
    isRTL: boolean
}

const translations: Record<Language, Translations> = {
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.tokenomics': 'Tokenomics',
        'nav.pfp': 'PFP Generator',
        'nav.memes': 'Memes',
        'nav.chart': 'Chart',
        'nav.community': 'Community',
        'nav.buy': 'Buy $KFH',

        // Hero
        'hero.badge': 'Live on Solana',
        'hero.title1': 'KUNG FU',
        'hero.title2': 'HAMSTER',
        'hero.tagline': 'KFH is ACTUALLY viral and belongs on Pumpfun',
        'hero.ca': 'Contract Address',
        'hero.copy': 'Copy',
        'hero.copied': 'Copied!',
        'hero.buyPump': 'Buy on Pump.fun',
        'hero.viewChart': 'View Chart',
        'hero.scroll': 'Scroll to explore',

        // About
        'about.label': 'About KFH',
        'about.title': 'The Legend of the Kung Fu Hamster',
        'about.desc': 'From a simple meme to a global phenomenon. KFH is not just a token - it is a lifestyle. Join the martial arts master of Solana!',
        'about.origin': 'The Origin Story',
        'about.story1': 'It all started with a single image - a tiny hamster standing in a perfect kung fu stance, paws raised, ready to take on the world.',
        'about.story2': 'Now, Kung Fu Hamster (KFH) has evolved from a beloved meme into the most exciting community-driven token on Solana.',
        'about.story3': 'KFH is ACTUALLY viral - and it belongs right here on Pumpfun where legends are born!',
        'about.community': 'Community Owned',
        'about.tax': 'Tax',
        'about.lp': 'LP Burned',

        // Features
        'feature.legend.title': 'The Viral Legend',
        'feature.legend.desc': 'Born from the legendary kung fu hamster meme that took the internet by storm.',
        'feature.master.title': 'Master of Memes',
        'feature.master.desc': 'With its iconic martial arts stance, KFH has become the symbol of strength.',
        'feature.community.title': 'Community Driven',
        'feature.community.desc': 'Built by the community, for the community. Join thousands of KFH warriors!',
        'feature.diamond.title': 'Diamond Paws',
        'feature.diamond.desc': 'True KFH holders never sell. We train our paws to hold through any market.',

        // Tokenomics
        'tokenomics.label': 'Tokenomics',
        'tokenomics.title': 'Fair Launch Distribution',
        'tokenomics.desc': 'No presale. No team tokens. 100% fair launch on Pump.fun',
        'tokenomics.supply': 'Total Supply',
        'tokenomics.billion': 'Billion',
        'tokenomics.taxLabel': 'Buy/Sell Tax',
        'tokenomics.lpStatus': 'LP Status',
        'tokenomics.burned': 'Burned',
        'tokenomics.contract': 'Contract',
        'tokenomics.renounced': 'Renounced',
        'tokenomics.distribution': 'Distribution',
        'tokenomics.communityNote': '100% of tokens were launched on Pump.fun',

        // PFP Generator
        'pfp.label': 'PFP Generator',
        'pfp.title': 'Create Your KFH Avatar',
        'pfp.desc': 'Stand out as a true KFH warrior! Layer backgrounds, accessories, and outfits.',
        'pfp.coming': 'COMING SOON',
        'pfp.construction': 'PFP Generator is Under Construction',
        'pfp.cooking': 'We are cooking up something special! Soon you will be able to create custom KFH profile pictures.',
        'pfp.backgrounds': 'Custom Backgrounds',
        'pfp.accessories': 'Head Accessories',
        'pfp.outfits': 'Outfits & More',
        'pfp.follow': 'Follow our community for updates!',

        // Meme Gallery
        'memes.label': 'Meme Gallery',
        'memes.title': 'Community Memes',
        'memes.desc': 'The best KFH memes from our community. Vote for your favorites!',
        'memes.hot': 'Hot',
        'memes.new': 'New',
        'memes.top': 'Top',
        'memes.submit': 'Submit Meme',
        'memes.votes': 'votes',

        // Chart
        'chart.label': 'Live Chart',
        'chart.title': 'Price Chart',
        'chart.desc': 'Track KFH price action in real-time',
        'chart.powered': 'Powered by DexScreener',

        // Community
        'community.label': 'Community',
        'community.title': 'Join the KFH Army',
        'community.desc': 'Connect with fellow kung fu hamster warriors. Share memes, discuss strategies!',
        'community.xCommunity': 'X Community',
        'community.xDesc': 'Join our viral community on X',
        'community.dexDesc': 'Track live price & charts',
        'community.pumpDesc': 'Buy KFH on Pumpfun',
        'community.visit': 'Visit',
        'community.members': 'Community Members',
        'community.holders': 'Holders',
        'community.growing': 'Growing',
        'community.memes': 'Memes Created',
        'community.ready': 'Ready to become a KFH Warrior?',
        'community.dontMiss': 'Do not miss out on the most viral meme token on Solana.',
        'community.buyNow': 'Buy $KFH Now',
        'community.join': 'Join Community',

        // Footer
        'footer.desc': 'The most viral meme token on Solana. Join the kung fu hamster army!',
        'footer.links': 'Quick Links',
        'footer.resources': 'Resources',
        'footer.disclaimer': 'Disclaimer',
        'footer.disclaimerText': '$KFH is a meme token with no intrinsic value. Always do your own research.',
        'footer.rights': 'All rights reserved.',
        'footer.madeWith': 'Made with',
        'footer.by': 'by the KFH Community',

        // Settings
        'settings.sound': 'Sound',
        'settings.theme': 'Theme',
        'settings.language': 'Language',
    },
    zh: {
        // Navbar
        'nav.home': '首页',
        'nav.about': '关于',
        'nav.tokenomics': '代币经济',
        'nav.pfp': '头像生成器',
        'nav.memes': '表情包',
        'nav.chart': '图表',
        'nav.community': '社区',
        'nav.buy': '购买 $KFH',

        // Hero
        'hero.badge': 'Solana 链上',
        'hero.title1': '功夫',
        'hero.title2': '仓鼠',
        'hero.tagline': 'KFH 真的很火爆，属于 Pumpfun',
        'hero.ca': '合约地址',
        'hero.copy': '复制',
        'hero.copied': '已复制！',
        'hero.buyPump': '在 Pump.fun 购买',
        'hero.viewChart': '查看图表',
        'hero.scroll': '滚动探索',

        // About
        'about.label': '关于 KFH',
        'about.title': '功夫仓鼠的传奇',
        'about.desc': '从简单的表情包到全球现象。KFH 不仅仅是代币，更是一种生活方式！',
        'about.origin': '起源故事',
        'about.story1': '一切始于一张图片 - 一只小仓鼠完美的功夫姿势，双爪举起，准备征服世界。',
        'about.story2': '现在，功夫仓鼠（KFH）已从一个网红表情包发展成为 Solana 上最令人兴奋的社区代币。',
        'about.story3': 'KFH 真的很火爆 - 它属于传奇诞生的 Pumpfun！',
        'about.community': '社区持有',
        'about.tax': '税率',
        'about.lp': 'LP 已销毁',

        // Features
        'feature.legend.title': '病毒式传播',
        'feature.legend.desc': '诞生于席卷互联网的传奇功夫仓鼠表情包。',
        'feature.master.title': '表情包大师',
        'feature.master.desc': '凭借标志性的武术姿势，KFH 已成为力量的象征。',
        'feature.community.title': '社区驱动',
        'feature.community.desc': '由社区建立，为社区服务。加入数千名 KFH 战士！',
        'feature.diamond.title': '钻石之爪',
        'feature.diamond.desc': '真正的 KFH 持有者从不卖出。我们训练爪子穿越任何市场。',

        // Tokenomics
        'tokenomics.label': '代币经济',
        'tokenomics.title': '公平启动分配',
        'tokenomics.desc': '无预售。无团队代币。100% 在 Pump.fun 公平启动',
        'tokenomics.supply': '总供应量',
        'tokenomics.billion': '十亿',
        'tokenomics.taxLabel': '买卖税',
        'tokenomics.lpStatus': 'LP 状态',
        'tokenomics.burned': '已销毁',
        'tokenomics.contract': '合约',
        'tokenomics.renounced': '已放弃',
        'tokenomics.distribution': '分配',
        'tokenomics.communityNote': '100% 代币在 Pump.fun 上启动',

        // PFP Generator
        'pfp.label': '头像生成器',
        'pfp.title': '创建你的 KFH 头像',
        'pfp.desc': '成为真正的 KFH 战士！添加背景、配件和服装。',
        'pfp.coming': '即将推出',
        'pfp.construction': '头像生成器正在建设中',
        'pfp.cooking': '我们正在准备特别的东西！很快你就能创建自定义 KFH 头像。',
        'pfp.backgrounds': '自定义背景',
        'pfp.accessories': '头部配件',
        'pfp.outfits': '服装等',
        'pfp.follow': '关注我们的社区获取更新！',

        // Meme Gallery
        'memes.label': '表情包画廊',
        'memes.title': '社区表情包',
        'memes.desc': '来自社区的最佳 KFH 表情包。为你最喜欢的投票！',
        'memes.hot': '热门',
        'memes.new': '最新',
        'memes.top': '最佳',
        'memes.submit': '提交表情包',
        'memes.votes': '票',

        // Chart
        'chart.label': '实时图表',
        'chart.title': '价格图表',
        'chart.desc': '实时跟踪 KFH 价格走势',
        'chart.powered': '由 DexScreener 提供支持',

        // Community
        'community.label': '社区',
        'community.title': '加入 KFH 军团',
        'community.desc': '与功夫仓鼠战士们联系。分享表情包，讨论策略！',
        'community.xCommunity': 'X 社区',
        'community.xDesc': '加入我们的病毒式社区',
        'community.dexDesc': '追踪实时价格和图表',
        'community.pumpDesc': '在 Pumpfun 购买 KFH',
        'community.visit': '访问',
        'community.members': '社区成员',
        'community.holders': '持有者',
        'community.growing': '增长中',
        'community.memes': '表情包创作',
        'community.ready': '准备好成为 KFH 战士了吗？',
        'community.dontMiss': '不要错过 Solana 上最火爆的表情包代币。',
        'community.buyNow': '立即购买 $KFH',
        'community.join': '加入社区',

        // Footer
        'footer.desc': 'Solana 上最火爆的表情包代币。加入功夫仓鼠军团！',
        'footer.links': '快速链接',
        'footer.resources': '资源',
        'footer.disclaimer': '免责声明',
        'footer.disclaimerText': '$KFH 是没有内在价值的表情包代币。请务必自行研究。',
        'footer.rights': '保留所有权利。',
        'footer.madeWith': '用',
        'footer.by': '由 KFH 社区制作',

        // Settings
        'settings.sound': '声音',
        'settings.theme': '主题',
        'settings.language': '语言',
    },
    ko: {
        // Navbar
        'nav.home': '홈',
        'nav.about': '소개',
        'nav.tokenomics': '토큰노믹스',
        'nav.pfp': 'PFP 생성기',
        'nav.memes': '밈',
        'nav.chart': '차트',
        'nav.community': '커뮤니티',
        'nav.buy': '$KFH 구매',

        // Hero
        'hero.badge': 'Solana 라이브',
        'hero.title1': '쿵푸',
        'hero.title2': '햄스터',
        'hero.tagline': 'KFH는 정말 바이럴하고 Pumpfun에 속합니다',
        'hero.ca': '컨트랙트 주소',
        'hero.copy': '복사',
        'hero.copied': '복사됨!',
        'hero.buyPump': 'Pump.fun에서 구매',
        'hero.viewChart': '차트 보기',
        'hero.scroll': '스크롤하여 탐색',

        // About
        'about.label': 'KFH 소개',
        'about.title': '쿵푸 햄스터의 전설',
        'about.desc': '간단한 밈에서 글로벌 현상으로. KFH는 토큰이 아닌 라이프스타일입니다!',
        'about.origin': '기원 스토리',
        'about.story1': '모든 것은 하나의 이미지에서 시작되었습니다 - 완벽한 쿵푸 자세의 작은 햄스터.',
        'about.story2': '이제 쿵푸 햄스터(KFH)는 사랑받는 밈에서 Solana의 가장 흥미로운 커뮤니티 토큰으로 진화했습니다.',
        'about.story3': 'KFH는 정말 바이럴합니다 - 전설이 탄생하는 Pumpfun에 속합니다!',
        'about.community': '커뮤니티 소유',
        'about.tax': '세금',
        'about.lp': 'LP 소각됨',

        // Features
        'feature.legend.title': '바이럴 레전드',
        'feature.legend.desc': '인터넷을 강타한 전설적인 쿵푸 햄스터 밈에서 탄생.',
        'feature.master.title': '밈의 마스터',
        'feature.master.desc': '상징적인 무술 자세로 KFH는 힘의 상징이 되었습니다.',
        'feature.community.title': '커뮤니티 주도',
        'feature.community.desc': '커뮤니티에 의해, 커뮤니티를 위해. 수천 명의 KFH 전사에 합류하세요!',
        'feature.diamond.title': '다이아몬드 발',
        'feature.diamond.desc': '진정한 KFH 홀더는 절대 팔지 않습니다. 어떤 시장도 버틸 수 있도록 훈련합니다.',

        // Tokenomics
        'tokenomics.label': '토큰노믹스',
        'tokenomics.title': '페어 런치 배분',
        'tokenomics.desc': '프리세일 없음. 팀 토큰 없음. 100% Pump.fun 페어 런치',
        'tokenomics.supply': '총 공급량',
        'tokenomics.billion': '십억',
        'tokenomics.taxLabel': '매수/매도 세금',
        'tokenomics.lpStatus': 'LP 상태',
        'tokenomics.burned': '소각됨',
        'tokenomics.contract': '컨트랙트',
        'tokenomics.renounced': '포기됨',
        'tokenomics.distribution': '배분',
        'tokenomics.communityNote': '100% 토큰이 Pump.fun에서 런칭됨',

        // PFP Generator
        'pfp.label': 'PFP 생성기',
        'pfp.title': 'KFH 아바타 만들기',
        'pfp.desc': '진정한 KFH 전사가 되세요! 배경, 액세서리, 의상을 추가하세요.',
        'pfp.coming': '곧 출시',
        'pfp.construction': 'PFP 생성기 구축 중',
        'pfp.cooking': '특별한 것을 준비하고 있습니다! 곧 커스텀 KFH 프로필 사진을 만들 수 있습니다.',
        'pfp.backgrounds': '커스텀 배경',
        'pfp.accessories': '머리 액세서리',
        'pfp.outfits': '의상 등',
        'pfp.follow': '업데이트를 위해 커뮤니티를 팔로우하세요!',

        // Meme Gallery
        'memes.label': '밈 갤러리',
        'memes.title': '커뮤니티 밈',
        'memes.desc': '커뮤니티의 최고의 KFH 밈. 좋아하는 것에 투표하세요!',
        'memes.hot': '인기',
        'memes.new': '최신',
        'memes.top': '최고',
        'memes.submit': '밈 제출',
        'memes.votes': '투표',

        // Chart
        'chart.label': '실시간 차트',
        'chart.title': '가격 차트',
        'chart.desc': 'KFH 가격 움직임을 실시간으로 추적',
        'chart.powered': 'DexScreener 제공',

        // Community
        'community.label': '커뮤니티',
        'community.title': 'KFH 군대 합류',
        'community.desc': '동료 쿵푸 햄스터 전사들과 연결하세요. 밈을 공유하고 전략을 논의하세요!',
        'community.xCommunity': 'X 커뮤니티',
        'community.xDesc': '바이럴 커뮤니티에 합류',
        'community.dexDesc': '실시간 가격 및 차트 추적',
        'community.pumpDesc': 'Pumpfun에서 KFH 구매',
        'community.visit': '방문',
        'community.members': '커뮤니티 멤버',
        'community.holders': '홀더',
        'community.growing': '성장 중',
        'community.memes': '밈 생성',
        'community.ready': 'KFH 전사가 될 준비가 되셨나요?',
        'community.dontMiss': 'Solana에서 가장 바이럴한 밈 토큰을 놓치지 마세요.',
        'community.buyNow': '지금 $KFH 구매',
        'community.join': '커뮤니티 합류',

        // Footer
        'footer.desc': 'Solana에서 가장 바이럴한 밈 토큰. 쿵푸 햄스터 군대에 합류하세요!',
        'footer.links': '빠른 링크',
        'footer.resources': '리소스',
        'footer.disclaimer': '면책 조항',
        'footer.disclaimerText': '$KFH는 내재 가치가 없는 밈 토큰입니다. 항상 직접 조사하세요.',
        'footer.rights': '모든 권리 보유.',
        'footer.madeWith': '',
        'footer.by': 'KFH 커뮤니티가 ❤️으로 제작',

        // Settings
        'settings.sound': '소리',
        'settings.theme': '테마',
        'settings.language': '언어',
    },
    ar: {
        // Navbar
        'nav.home': 'الرئيسية',
        'nav.about': 'حول',
        'nav.tokenomics': 'اقتصاديات الرمز',
        'nav.pfp': 'مولد الصور',
        'nav.memes': 'الميمات',
        'nav.chart': 'الرسم البياني',
        'nav.community': 'المجتمع',
        'nav.buy': 'شراء $KFH',

        // Hero
        'hero.badge': 'مباشر على سولانا',
        'hero.title1': 'كونغ فو',
        'hero.title2': 'هامستر',
        'hero.tagline': 'KFH منتشر فعلاً وينتمي إلى Pumpfun',
        'hero.ca': 'عنوان العقد',
        'hero.copy': 'نسخ',
        'hero.copied': 'تم النسخ!',
        'hero.buyPump': 'شراء على Pump.fun',
        'hero.viewChart': 'عرض الرسم البياني',
        'hero.scroll': 'مرر للاستكشاف',

        // About
        'about.label': 'حول KFH',
        'about.title': 'أسطورة هامستر الكونغ فو',
        'about.desc': 'من ميم بسيط إلى ظاهرة عالمية. KFH ليس مجرد رمز - إنه أسلوب حياة!',
        'about.origin': 'قصة الأصل',
        'about.story1': 'بدأ كل شيء بصورة واحدة - هامستر صغير في وضعية كونغ فو مثالية.',
        'about.story2': 'الآن، تطور هامستر الكونغ فو من ميم محبوب إلى أكثر رمز مجتمعي إثارة على سولانا.',
        'about.story3': 'KFH منتشر فعلاً - وينتمي هنا في Pumpfun حيث تولد الأساطير!',
        'about.community': 'ملكية المجتمع',
        'about.tax': 'الضريبة',
        'about.lp': 'LP محروق',

        // Features
        'feature.legend.title': 'الأسطورة المنتشرة',
        'feature.legend.desc': 'ولد من ميم هامستر الكونغ فو الأسطوري الذي اجتاح الإنترنت.',
        'feature.master.title': 'سيد الميمات',
        'feature.master.desc': 'بوضعية الفنون القتالية الشهيرة، أصبح KFH رمزاً للقوة.',
        'feature.community.title': 'بقيادة المجتمع',
        'feature.community.desc': 'بناه المجتمع، للمجتمع. انضم إلى آلاف محاربي KFH!',
        'feature.diamond.title': 'مخالب الماس',
        'feature.diamond.desc': 'حاملو KFH الحقيقيون لا يبيعون أبداً. ندرب مخالبنا للصمود.',

        // Tokenomics
        'tokenomics.label': 'اقتصاديات الرمز',
        'tokenomics.title': 'توزيع الإطلاق العادل',
        'tokenomics.desc': 'لا بيع مسبق. لا رموز فريق. 100% إطلاق عادل على Pump.fun',
        'tokenomics.supply': 'إجمالي العرض',
        'tokenomics.billion': 'مليار',
        'tokenomics.taxLabel': 'ضريبة الشراء/البيع',
        'tokenomics.lpStatus': 'حالة LP',
        'tokenomics.burned': 'محروق',
        'tokenomics.contract': 'العقد',
        'tokenomics.renounced': 'تم التخلي عنه',
        'tokenomics.distribution': 'التوزيع',
        'tokenomics.communityNote': '100% من الرموز أُطلقت على Pump.fun',

        // PFP Generator
        'pfp.label': 'مولد الصور',
        'pfp.title': 'أنشئ صورتك الرمزية KFH',
        'pfp.desc': 'تميز كمحارب KFH حقيقي! أضف خلفيات وإكسسوارات وملابس.',
        'pfp.coming': 'قريباً',
        'pfp.construction': 'مولد الصور قيد الإنشاء',
        'pfp.cooking': 'نحن نحضر شيئاً مميزاً! قريباً ستتمكن من إنشاء صور KFH مخصصة.',
        'pfp.backgrounds': 'خلفيات مخصصة',
        'pfp.accessories': 'إكسسوارات الرأس',
        'pfp.outfits': 'ملابس وأكثر',
        'pfp.follow': 'تابع مجتمعنا للتحديثات!',

        // Meme Gallery
        'memes.label': 'معرض الميمات',
        'memes.title': 'ميمات المجتمع',
        'memes.desc': 'أفضل ميمات KFH من مجتمعنا. صوّت لمفضلاتك!',
        'memes.hot': 'رائج',
        'memes.new': 'جديد',
        'memes.top': 'الأفضل',
        'memes.submit': 'إرسال ميم',
        'memes.votes': 'تصويتات',

        // Chart
        'chart.label': 'رسم بياني مباشر',
        'chart.title': 'رسم السعر',
        'chart.desc': 'تتبع حركة سعر KFH في الوقت الفعلي',
        'chart.powered': 'مدعوم من DexScreener',

        // Community
        'community.label': 'المجتمع',
        'community.title': 'انضم إلى جيش KFH',
        'community.desc': 'تواصل مع محاربي هامستر الكونغ فو. شارك الميمات وناقش الاستراتيجيات!',
        'community.xCommunity': 'مجتمع X',
        'community.xDesc': 'انضم إلى مجتمعنا المنتشر على X',
        'community.dexDesc': 'تتبع الأسعار والرسوم البيانية',
        'community.pumpDesc': 'شراء KFH على Pumpfun',
        'community.visit': 'زيارة',
        'community.members': 'أعضاء المجتمع',
        'community.holders': 'الحاملون',
        'community.growing': 'في نمو',
        'community.memes': 'ميمات منشأة',
        'community.ready': 'مستعد لتصبح محارب KFH؟',
        'community.dontMiss': 'لا تفوت أكثر رمز ميم منتشر على سولانا.',
        'community.buyNow': 'اشترِ $KFH الآن',
        'community.join': 'انضم للمجتمع',

        // Footer
        'footer.desc': 'أكثر رمز ميم منتشر على سولانا. انضم إلى جيش هامستر الكونغ فو!',
        'footer.links': 'روابط سريعة',
        'footer.resources': 'موارد',
        'footer.disclaimer': 'إخلاء المسؤولية',
        'footer.disclaimerText': '$KFH هو رمز ميم بدون قيمة جوهرية. قم دائماً ببحثك الخاص.',
        'footer.rights': 'جميع الحقوق محفوظة.',
        'footer.madeWith': 'صنع بـ',
        'footer.by': 'بواسطة مجتمع KFH',

        // Settings
        'settings.sound': 'الصوت',
        'settings.theme': 'المظهر',
        'settings.language': 'اللغة',
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('kfh-language') as Language
        if (saved && translations[saved]) {
            setLanguageState(saved)
        } else {
            // Detect browser language
            const browserLang = navigator.language.split('-')[0]
            if (browserLang === 'zh') setLanguageState('zh')
            else if (browserLang === 'ko') setLanguageState('ko')
            else if (browserLang === 'ar') setLanguageState('ar')
        }
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('kfh-language', language)
            // Set RTL direction for Arabic
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
        }
    }, [language, mounted])

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang)
    }, [])

    const t = useCallback((key: string): string => {
        return translations[language][key] || translations.en[key] || key
    }, [language])

    const isRTL = language === 'ar'

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}
