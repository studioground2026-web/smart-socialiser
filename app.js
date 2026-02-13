// Data & State
let currentTab = 'tools'; 
let ledgerData = JSON.parse(localStorage.getItem('ledgerData')) || [];
let preferenceData = JSON.parse(localStorage.getItem('preferenceData')) || [];
let preferenceFilterState = { category: 'all' };
let nightModeEnabled = localStorage.getItem('nightModeEnabled') === 'true';
const ADMOB_BANNER_UNIT_ID = 'ca-app-pub-4801056831983974/2600019543';

// Wedding Gift Data
const weddingData = {
    prices: {
        hotel_high: 1500, hotel_std: 1000, club: 1000, special: 1000,
        restaurant_cn: 800, lunch: 800, restaurant_w: 800, cocktail: 800,
        ceremony: 500, cake: 300
    },
    blessings: {
        idioms: ['百年好合','白頭偕老','永結同心','永浴愛河','天作之合','鸞鳳和鳴','新婚誌喜','佳偶天成','百年偕老','神仙眷屬','才子佳人','天緣巧合','美滿良緣','琴瑟和鳴','花好月圓','郎才女貌','緣定三生','天生一對','有情成眷','鴛鴦比翼'],
        lines: ['天作之合，白頭偕老','美滿良緣，縷結同心','永結同心，百年好合','新婚愉快，幸福美滿','激情永在，永浴愛河','新婚愉快，甜甜蜜蜜','緣訂三生，佳偶天成','花好月圓，天緣巧合','新婚愉快，甜甜蜜蜜，早生貴子！','百年恩愛雙心結，千里姻緣一線牽！'],
        english: ['Always be in love！（永浴愛河）','May you live happily ever after！（永遠幸福）','Match made in heaven！（天生一對）','Be a harmonious union forever！（百年好合）','True Love Lasts Forever！（真愛直到永遠）','God bless your love and marriage！','May Heaven and Earth bless the couple！','May you two always stay in love！','The two of you make a perfect couple！','May your marriage be blessed with faith, joy, and love！']
    }
};

const greetings = [
    { text: "身體健康，龍馬精神！", mainstream: true, targets: ['elder'] },
    { text: "福如東海，壽比南山！", mainstream: true, targets: ['elder'] },
    { text: "生意興隆，財源廣進！", mainstream: true, targets: ['boss', 'client'] },
    { text: "鴻圖大展，步步高陞！", mainstream: true, targets: ['boss', 'client'] },
    { text: "心想事成，萬事勝意！", mainstream: true, targets: ['all'] },
    { text: "出入平安，大吉大利！", mainstream: true, targets: ['all'] },
    { text: "家肥屋潤，得心應手！", mainstream: true, targets: ['all'] },
    { text: "學業進步，聰明伶俐！", mainstream: true, targets: ['student'] },
    { text: "名列前茅，金榜題名！", mainstream: true, targets: ['student'] },
    { text: "工作順利，升職加薪！", mainstream: true, targets: ['friend'] },
    { text: "青春常駐，笑口常開！", mainstream: false, targets: ['friend'] },
    { text: "橫財就手，一本萬利！", mainstream: false, targets: ['friend'] }
];

const greetingTargetLabels = {
    all: '全部對象',
    elder: '長輩/父母',
    boss: '老闆/上司',
    client: '客戶/生意夥伴',
    friend: '朋友/同事',
    student: '學生/小朋友'
};

let greetingFilterState = { mainstream: 'all', target: 'all' };
// EXPANDED QA DATA (20 Questions)
const qaData = [
    // 1. æ„Ÿæƒ…台
    { q: "幾時拍拖呀？/ 點解仲係單身？", answers: [
        { type: "標準", text: "緣份嘅嘢急唔黎，最緊要識到個啱嘅，寧缺勿濫嘛。" },
        { type: "幽默", text: "單身好呀，一人食飽全家無憂，利是都逗多幾封！" },
        { type: "遊花園", text: "講開拍拖，表哥個女好似都幾大個女，係咪都好多人追？" }
    ]},
    { q: "幾時結婚呀？", answers: [
        { type: "標準", text: "想專注事業先，儲多個錢先結婚，唔想委屈對方嘛。" },
        { type: "幽默", text: "等你封封大利是俾我做首期，我就即刻結！" },
        { type: "遊花園", text: "講開結婚，表姐上次擺酒嗰間酒樓啲乳豬幾好食喎，你有冇試過？" }
    ]},
    { q: "幾時生仔 / 再生個？", answers: [
        { type: "標準", text: "隨緣啦，小朋友係天賜嘅禮物，急唔黎。" },
        { type: "幽默", text: "我而家養自己都搞唔掂，養多個驚佢跟我不幸呀！" },
        { type: "遊花園", text: "而家啲細路讀書好大壓力架，講開又講，你有冇睇最近個單新聞..." }
    ]},
    { q: "點解唔帶男/女朋友黎？", answers: [
        { type: "標準", text: "佢今日要返工/加班呀，下次有機會再帶佢黎見大家。" },
        { type: "幽默", text: "佢怕醜呀，見到咁多長輩驚講錯野嘛。" },
        { type: "遊花園", text: "係呢，表弟女朋友好似幾靚女喎，幾時帶黎見下？" }
    ]},

    // 2. è³‡ç”¢å°
    { q: "幾時買樓呀？/ 抽到居屋未？", answers: [
        { type: "標準", text: "而家樓市咁波動，息口又高，睇定啲先啦，租樓都幾好住。" },
        { type: "幽默", text: "我等緊政府派樓俾我呀，你知啦，香港地寸金尺土。" },
        { type: "遊花園", text: "講開樓，你有冇去過啟德個新商場行街？聽講好多嘢食。" }
    ]},
    { q: "人工幾多呀？/ 加咗人工未？", answers: [
        { type: "標準", text: "夠食夠住啦，而家市道咁差，有份工都偷笑啦。" },
        { type: "幽默", text: "多過最低工資少少啦，夠交稅咁囉。" },
        { type: "遊花園", text: "唔講呢啲住，我知有間茶樓點心好正，下次請你去飲茶！" }
    ]},
    { q: "有無買股票？有無冧把？", answers: [
        { type: "標準", text: "無呀，我唔識呢啲野，多數做定期存款算，穩陣嘛。" },
        { type: "幽默", text: "有呀，買咗兩手盈富基金當儲錢囉，邊有內幕消息呀。" },
        { type: "遊花園", text: "股票呢啲野好傷神，講開投資，你個孫考成點呀？那是最大投資喎。" }
    ]},

    // 3. æ¯”è¼ƒèˆ‡å¤–表台
    { q: "表弟/表妹搵好多錢喎，你呢？", answers: [
        { type: "標準", text: "係囉，佢由細到大都叻仔嘛，我都好替佢開心。" },
        { type: "幽默", text: "係咩？咁正？咁我要即刻問佢借錢先得喇！" },
        { type: "遊花園", text: "行行出狀元啫。係呢，舅母最近身體點呀？見你氣色唔錯喎。" }
    ]},
    { q: "又肥咗喎 / 嘩做咩咁瘦嘅？", answers: [
        { type: "標準", text: "最緊要身體健康啫，肥瘦都係浮雲。" },
        { type: "幽默", text: "通脹咁勁，我儲定啲脂肪/能量過冬呀，這是實力的一種。" },
        { type: "遊花園", text: "講開食，呢盆蘿蔔糕真係好足料，你要唔要試多件？" }
    ]},
    { q: "頭髮好似少咗喎？/ 有白頭髮？", answers: [
        { type: "標準", text: "係呀，最近工作壓力大少少，不過好快長返嘅。" },
        { type: "幽默", text: "俗語話「聰明絕頂」嘛，證明我用腦多囉！" },
        { type: "遊花園", text: "歲月不饒人啦，不過你保養得幾好喎，用開邊隻染髮劑？" }
    ]},

    // 4. å°æœ‹å‹/學業台 (å¦‚é©ç”¨)
    { q: "阿仔/女考成點呀？入邊間學校？", answers: [
        { type: "標準", text: "托賴啦，盡咗力就得，最緊要佢讀得開心。" },
        { type: "幽默", text: "求學不是求分數嘛，佢健康快樂我就心滿意足啦。" },
        { type: "遊花園", text: "而家讀書好辛苦架，講開又講，你記唔記得我地細個..." }
    ]},
    { q: "幾時叫佢學琴/補習呀？", answers: [
        { type: "標準", text: "睇佢興趣啦，唔想逼得太緊，會有反效果。" },
        { type: "幽默", text: "我打算教佢打麻雀先，訓練腦筋嘛！" },
        { type: "遊花園", text: "而家興學Coding寫程式呀，未來大趨勢黎架。" }
    ]},

    // 5. ç§‘æŠ€æ”¯æ´å° (é•·è¼©å¿…å•)
    { q: "電話點解無聲/上唔到網？", answers: [
        { type: "標準", text: "黎我幫你睇睇... 可能係唔小心開咗靜音/飛行模式。" },
        { type: "幽默", text: "可能佢想休息下，你試下重新開機，包醫百病！" },
        { type: "遊花園", text: "呢部機好似有啲舊喎，不如叫表哥買部新iPhone俾你？" }
    ]},
    { q: "點樣用電話睇劇/聽歌？", answers: [
        { type: "標準", text: "我幫你裝個YouTube/App，你想睇咩打個名就得。" },
        { type: "幽默", text: "你要問Siri呀，你對住電話講「我要睇劇」，佢就會搵俾你。" },
        { type: "遊花園", text: "睇劇傷眼呀，不如我地傾下計，好耐無見啦。" }
    ]},

    // 6. æ•æ„Ÿ/æ”¿æ²»å°
    { q: "幾時移民呀？/ 唔走咩？", answers: [
        { type: "標準", text: "屋企人喺晒度，暫時都係想陪下家人先，遲啲再算。" },
        { type: "幽默", text: "等你過咗去探路先嘛，你發咗達記得接埋我過去嘆世界。" },
        { type: "遊花園", text: "移民不如去旅行先啦，而家Yen咁平，你有冇諗住去日本玩返轉？" }
    ]},
    { q: "你點睇政府/某某政策？", answers: [
        { type: "標準", text: "我無留意新聞好耐囉，最緊要大家有工開有飯食。" },
        { type: "幽默", text: "國家大事留返俾特首煩啦，我淨係煩今晚食咩好。" },
        { type: "遊花園", text: "講呢啲傷感情，不如講下今期六合彩開咩號碼好過啦。" }
    ]},
    
    // 7. é›œé …/ç…©è† å°
    { q: "借部電話黎玩下/借錢？", answers: [
        { type: "標準", text: "唔好意思，部電話就黎無電，我要留返黎聽電話。" },
        { type: "幽默", text: "我剛買咗股票輸晒啦，仲諗住問你借返幾百蚊添！" },
        { type: "遊花園", text: "哎呀，突然醒起要打個電話俾老細，失陪一陣先。" }
    ]},
    { q: "有無Facebook/IG加個Friend？", answers: [
        { type: "標準", text: "我好少玩呢啲架，開咗Account都無野睇，費事悶親你。" },
        { type: "幽默", text: "我電話壞壞地，開唔到App，下次再加啦。" },
        { type: "遊花園", text: "不如加WhatsApp算啦，有咩事聯絡都方便啲嘛。" }
    ]}
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('opacity-0', 'pointer-events-none');
    }, 1500);

    renderLedger();
    renderPreferenceMemo();
    renderSurvival();
    calculateWeddingGift();
    switchWgBlessing('idioms');
    initRelativeCalc();
    updateNameSuggestions();
    setNightMode(nightModeEnabled, false);
    switchTab('tools');
    initNativeAdMobBanner();
});

function isCapacitorNative() {
    return !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform());
}

function resolveAdMobEnum(admobPlugin, enumKey, fallback) {
    if (!admobPlugin || !admobPlugin[enumKey]) return fallback;
    return admobPlugin[enumKey][fallback] || fallback;
}

async function initNativeAdMobBanner() {
    if (!isCapacitorNative()) return;
    const admob = window.Capacitor?.Plugins?.AdMob;
    if (!admob || typeof admob.initialize !== 'function' || typeof admob.showBanner !== 'function') {
        console.warn('AdMob plugin not found. Install @capacitor-community/admob first.');
        return;
    }

    try {
        await admob.initialize({
            requestTrackingAuthorization: true,
            initializeForTesting: false
        });

        const adSize = resolveAdMobEnum(admob, 'BannerAdSize', 'BANNER');
        const adPosition = resolveAdMobEnum(admob, 'BannerAdPosition', 'TOP_CENTER');

        await admob.showBanner({
            adId: ADMOB_BANNER_UNIT_ID,
            adSize,
            position: adPosition,
            margin: 0,
            isTesting: false
        });
    } catch (err) {
        console.error('Failed to initialize/show native AdMob banner:', err);
    }
}

function setNightMode(enabled, persist = true) {
    nightModeEnabled = !!enabled;
    document.body.classList.toggle('night-mode', nightModeEnabled);
    const toggle = document.getElementById('night-mode-toggle');
    if (toggle) toggle.checked = nightModeEnabled;
    if (persist) {
        localStorage.setItem('nightModeEnabled', String(nightModeEnabled));
    }
}

function toggleNightMode(enabled) {
    setNightMode(!!enabled, true);
    showToast(enabled ? '已開啟 Night Mode' : '已關閉 Night Mode');
}

function initRelativeCalc() {
    const container = document.getElementById('relative-calc-container');
    if (!container || !window.ToolRelativeCalc || typeof window.ToolRelativeCalc.render !== 'function') return;

    if (!container.dataset.initialized) {
        container.innerHTML = '';
        container.appendChild(window.ToolRelativeCalc.render());
        if (typeof window.ToolRelativeCalc.init === 'function') {
            window.ToolRelativeCalc.init();
        }
        container.dataset.initialized = '1';
        return;
    }

    if (typeof window.ToolRelativeCalc.reset === 'function') {
        window.ToolRelativeCalc.reset();
    }
}

function normalizeName(name) {
    return String(name || '').trim().toLowerCase();
}

function mergeTagText(existing, incoming) {
    const parse = (text) => String(text || '')
        .split(/[、，,;；\n]+/)
        .map(s => s.trim())
        .filter(Boolean);

    const merged = [];
    const seen = new Set();
    [...parse(existing), ...parse(incoming)].forEach(item => {
        const key = item.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            merged.push(item);
        }
    });
    return merged.join('、');
}

function setDatalistOptions(id, values) {
    const datalist = document.getElementById(id);
    if (!datalist) return;
    datalist.innerHTML = values.map(name => `<option value="${name.replace(/"/g, '&quot;')}"></option>`).join('');
}

function updateNameSuggestions() {
    const prefNames = [...new Set(preferenceData.map(item => String(item.name || '').trim()).filter(Boolean))];
    const ledgerNames = [...new Set(ledgerData.map(item => String(item.name || '').trim()).filter(Boolean))];
    setDatalistOptions('ledger-name-suggestions', prefNames.sort((a, b) => a.localeCompare(b, 'zh-HK')));
    setDatalistOptions('preference-name-suggestions', ledgerNames.sort((a, b) => a.localeCompare(b, 'zh-HK')));
}

function renderPreferenceMemo() {
    const list = document.getElementById('preference-list');
    if (!list) return;
    const categoryFilterEl = document.getElementById('preference-category-filter');
    const selectedCategory = categoryFilterEl ? categoryFilterEl.value : preferenceFilterState.category;
    preferenceFilterState.category = selectedCategory || 'all';
    if (categoryFilterEl) categoryFilterEl.value = preferenceFilterState.category;

    const filteredData = preferenceData.filter(item => (
        preferenceFilterState.category === 'all' || (item.category || '其他') === preferenceFilterState.category
    ));

    if (filteredData.length === 0) {
        list.innerHTML = `<div class="text-sm text-gray-400 text-center py-6">未有任何喜好記錄，撳「新增」開始記低人情路線圖。</div>`;
        return;
    }

    const sorted = [...filteredData].sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'zh-HK'));
    list.innerHTML = sorted.map(item => `
        <div class="border border-gray-100 rounded-xl p-3 bg-gray-50">
            <div class="flex justify-between items-start gap-2">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-base">${item.name}</span>
                        <span class="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">${item.category || '其他'}</span>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">需要：${item.needs || '未填'}</div>
                    <div class="text-[11px] text-gray-400 mt-1">記錄日期：${item.createdAt || '未記錄'}</div>
                </div>
                <div class="flex gap-2 shrink-0">
                    <button onclick="editPreference(${item.id})" class="text-xs text-blue-500 font-medium">編輯</button>
                    <button onclick="deletePreference(${item.id})" class="text-xs text-red-500 font-medium">刪除</button>
                </div>
            </div>
            <div class="mt-2 space-y-1">
                <div class="text-xs text-gray-600"><span class="text-gray-400">鍾意：</span>${item.like || '—'}</div>
                <div class="text-xs text-gray-600"><span class="text-gray-400">避雷：</span>${item.hate || '—'}</div>
                <div class="text-xs text-gray-600"><span class="text-gray-400">備忘：</span>${item.memo || '—'}</div>
            </div>
        </div>
    `).join('');
}

function resetPreferenceForm() {
    const form = document.getElementById('preference-form');
    if (form) form.reset();
    const idInput = document.getElementById('preference-id');
    if (idInput) idInput.value = '';
    const categoryInput = document.getElementById('preference-category');
    if (categoryInput) categoryInput.value = '親戚';
}

function savePreference(e) {
    e.preventDefault();
    const id = document.getElementById('preference-id').value;
    const name = document.getElementById('preference-name').value.trim();
    const category = document.getElementById('preference-category').value;
    const like = document.getElementById('preference-like').value.trim();
    const hate = document.getElementById('preference-hate').value.trim();
    const needs = document.getElementById('preference-needs').value.trim();
    const memo = document.getElementById('preference-memo').value.trim();
    if (!name) return;

    if (id) {
        const idx = preferenceData.findIndex(item => String(item.id) === String(id));
        if (idx !== -1) {
            preferenceData[idx] = { ...preferenceData[idx], name, category, like, hate, needs, memo };
        }
    } else {
        const existingIdx = preferenceData.findIndex(item => (
            normalizeName(item.name) === normalizeName(name) &&
            String(item.category || '其他') === String(category || '其他')
        ));

        if (existingIdx !== -1) {
            const existing = preferenceData[existingIdx];
            preferenceData[existingIdx] = {
                ...existing,
                name: existing.name || name,
                category: existing.category || category,
                like: mergeTagText(existing.like, like),
                hate: mergeTagText(existing.hate, hate),
                needs: mergeTagText(existing.needs, needs),
                memo: mergeTagText(existing.memo, memo),
                createdAt: existing.createdAt || new Date().toISOString().slice(0, 10)
            };
        } else {
            const createdAt = new Date().toISOString().slice(0, 10);
            preferenceData.push({
                id: Date.now(),
                name, category, like, hate, needs, memo, createdAt
            });
        }
    }

    localStorage.setItem('preferenceData', JSON.stringify(preferenceData));
    renderPreferenceMemo();
    updateNameSuggestions();
    closeModal('preference-modal');
    resetPreferenceForm();
    showToast('已儲存偏好');
}

function editPreference(id) {
    const item = preferenceData.find(row => row.id === id);
    if (!item) return;
    document.getElementById('preference-modal').classList.remove('hidden');
    document.getElementById('preference-id').value = item.id;
    document.getElementById('preference-name').value = item.name || '';
    document.getElementById('preference-category').value = item.category || '其他';
    document.getElementById('preference-like').value = item.like || '';
    document.getElementById('preference-hate').value = item.hate || '';
    document.getElementById('preference-needs').value = item.needs || '';
    document.getElementById('preference-memo').value = item.memo || '';
}

function deletePreference(id) {
    if (!confirm('確定刪除此偏好記錄？')) return;
    preferenceData = preferenceData.filter(item => item.id !== id);
    localStorage.setItem('preferenceData', JSON.stringify(preferenceData));
    renderPreferenceMemo();
    updateNameSuggestions();
}

function exportMasterCRM() {
    if (preferenceData.length === 0) {
        showToast('未有偏好資料可匯出');
        return;
    }

    const escapeCsvField = (value) => {
        const text = String(value ?? '');
        const escaped = text.replace(/"/g, '""');
        return /[",\r\n]/.test(escaped) ? `"${escaped}"` : escaped;
    };

    const rows = preferenceData.map(pref => {
        const normalized = normalizeName(pref.name);
        let income = 0;
        let outgoing = 0;

        ledgerData.forEach(entry => {
            if (normalizeName(entry.name) !== normalized) return;
            const amount = Number(entry.amount) || 0;
            if (entry.type === 'in') income += amount;
            if (entry.type === 'out') outgoing += amount;
        });

        const net = income - outgoing;
        return [
            pref.category || '其他',
            pref.name || '',
            pref.like || '',
            pref.hate || '',
            pref.needs || '',
            net,
            pref.memo || '',
            pref.createdAt || ''
        ].map(escapeCsvField).join(',');
    });

    const header = 'Category,Name,Likes,Hates,Needs,Net_Social_Value(HKD),Memo,Record_Date';
    const csvContent = "\uFEFF" + [header, ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `世界仔_人脈總表_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('CRM總表已下載');
}

// Wedding Gift Logic
function calculateWeddingGift() {
    const venue = document.getElementById('wg-venue').value;
    const attend = document.getElementById('wg-attend').value;
    let count = parseInt(document.getElementById('wg-count').value) || 1;
    if (count < 1) count = 1;
    
    const basePrice = weddingData.prices[venue];
    let resultText = '';
    let noteText = '';

    if (venue === 'cake') {
        resultText = '$' + (basePrice * count).toLocaleString();
        noteText = '只送餅卡公價';
    } else if (attend === 'no') {
        let min = Math.round((basePrice * 0.5) / 100) * 100;
        let max = Math.round((basePrice * 0.7) / 100) * 100;
        if (min < 300) min = 300;
        if (max < 300) max = 300;
        
        const totalMin = min * count;
        const totalMax = max * count;
        if (totalMin === totalMax) {
            resultText = `$${totalMin.toLocaleString()}`;
        } else {
            resultText = `$${totalMin.toLocaleString()} - $${totalMax.toLocaleString()}`;
        }
        noteText = '唔去飲 (人唔到禮到)';
    } else {
        const total = basePrice * count;
        resultText = '$' + total.toLocaleString();
        noteText = '去飲公價';
    }

    document.getElementById('wg-amount').innerText = resultText;
    document.getElementById('wg-note').innerText = noteText;
}

function switchWgBlessing(type) {
    ['idioms', 'lines', 'english'].forEach(t => {
        const btn = document.getElementById(`wg-btn-${t}`);
        if(t === type) {
            btn.classList.add('bg-white', 'shadow-sm', 'text-black');
            btn.classList.remove('text-gray-500');
        } else {
            btn.classList.remove('bg-white', 'shadow-sm', 'text-black');
            btn.classList.add('text-gray-500');
        }
    });

    const list = document.getElementById('wg-blessing-list');
    list.innerHTML = weddingData.blessings[type].map(text => `
        <div onclick="copyText('${text.replace(/'/g, "\\'")}')" class="p-3 border-b border-gray-100 last:border-0 active:bg-yellow-50 flex justify-between items-center cursor-pointer">
            <span class="text-sm">${text}</span>
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
        </div>
    `).join('');
}

// Tab Navigation
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('text-yellow-600');
        btn.classList.add('text-gray-400');
    });
    document.getElementById(`nav-${tabId}`).classList.remove('text-gray-400');
    document.getElementById(`nav-${tabId}`).classList.add('text-yellow-600');
    currentTab = tabId;
}

// Ledger Logic
function renderLedger() {
    const list = document.getElementById('ledger-list');
    list.innerHTML = '';
    let balance = 0;
    const reversedData = [...ledgerData].reverse();

    if (reversedData.length === 0) {
        list.innerHTML = `<div class="text-center text-gray-400 py-10">暫無記錄<br>點擊下方按鈕新增記錄</div>`;
    }

    reversedData.forEach((item, index) => {
        const originalIndex = ledgerData.length - 1 - index;
        const amount = parseFloat(item.amount);
        if (item.type === 'in') balance += amount;
        else balance -= amount;

        const isIncome = item.type === 'in';
        const sign = isIncome ? '+' : '-';
        const colorClass = isIncome ? 'text-green-600' : 'text-red-500';

        const row = document.createElement('div');
        row.className = 'bg-white p-4 rounded-xl flex justify-between items-center shadow-sm relative overflow-hidden group mb-3';
        row.innerHTML = `
            <div class="flex-1">
                <div class="flex items-baseline gap-2">
                    <span class="font-bold text-lg">${item.name}</span>
                    <span class="text-xs text-gray-400">${item.note || ''}</span>
                </div>
                <div class="text-xs text-gray-400 mt-1">${item.date}</div>
            </div>
            <div class="font-mono font-bold text-xl ${colorClass}">
                ${sign}$${amount.toLocaleString()}
            </div>
            <button onclick="deleteEntry(${originalIndex})" class="ml-4 text-red-500 text-sm font-medium p-2">
                刪除
            </button>
        `;
        list.appendChild(row);
    });

    const balanceEl = document.getElementById('ledger-balance');
    balanceEl.innerText = `$${balance.toLocaleString()}`;
    balanceEl.className = `text-3xl font-bold font-mono mt-1 ${balance < 0 ? 'text-red-500' : 'text-gray-900'}`;
}

function setEntryType(type) {
    document.getElementById('entry-type').value = type;
    const btnIn = document.getElementById('type-in');
    const btnOut = document.getElementById('type-out');
    
    if (type === 'in') {
        btnIn.className = 'flex-1 py-2 rounded-md font-medium bg-white shadow-sm text-green-600 transition-all';
        btnOut.className = 'flex-1 py-2 rounded-md font-medium text-gray-500 transition-all';
    } else {
        btnOut.className = 'flex-1 py-2 rounded-md font-medium bg-white shadow-sm text-red-500 transition-all';
        btnIn.className = 'flex-1 py-2 rounded-md font-medium text-gray-500 transition-all';
    }
}

function saveEntry(e) {
    e.preventDefault();
    const type = document.getElementById('entry-type').value;
    const amount = document.getElementById('entry-amount').value;
    const name = document.getElementById('entry-name').value.trim();
    const note = document.getElementById('entry-note').value;
    if(!amount || !name) return;
    const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        type, amount, name, note
    };
    ledgerData.push(newEntry);
    localStorage.setItem('ledgerData', JSON.stringify(ledgerData));
    document.getElementById('ledger-form').reset();
    setEntryType('in');
    closeModal('add-ledger-modal');
    renderLedger();
    updateNameSuggestions();
}

function deleteEntry(index) {
    if(confirm('確定刪除此記錄？')) {
        ledgerData.splice(index, 1);
        localStorage.setItem('ledgerData', JSON.stringify(ledgerData));
        renderLedger();
        updateNameSuggestions();
    }
}

function exportCSV() {
    if (ledgerData.length === 0) {
        showToast("沒有數據可匯出");
        return;
    }

    const escapeCsvField = (value) => {
        const text = String(value ?? '');
        const escaped = text.replace(/"/g, '""');
        return /[",\r\n]/.test(escaped) ? `"${escaped}"` : escaped;
    };

    const header = ['日期', '類型', '對象', '金額', '備註'];
    const rows = ledgerData.map(row => {
        const typeStr = row.type === 'in' ? '收入' : '支出';
        return [row.date, typeStr, row.name, row.amount, row.note]
            .map(escapeCsvField)
            .join(',');
    });

    const csvContent = "\uFEFF" + [header.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `世界仔數簿_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("CSV 已下載");
}

function switchSurvivalTab(subTab) {
    const btnQa = document.getElementById('btn-qa');
    const btnGreet = document.getElementById('btn-greetings');
    const contentQa = document.getElementById('content-qa');
    const contentGreet = document.getElementById('content-greetings');
    if (subTab === 'qa') {
        btnQa.classList.add('bg-white', 'shadow-sm', 'text-black');
        btnQa.classList.remove('text-gray-500');
        btnGreet.classList.remove('bg-white', 'shadow-sm', 'text-black');
        btnGreet.classList.add('text-gray-500');
        contentQa.classList.remove('hidden');
        contentGreet.classList.add('hidden');
    } else {
        btnGreet.classList.add('bg-white', 'shadow-sm', 'text-black');
        btnGreet.classList.remove('text-gray-500');
        btnQa.classList.remove('bg-white', 'shadow-sm', 'text-black');
        btnQa.classList.add('text-gray-500');
        contentGreet.classList.remove('hidden');
        contentQa.classList.add('hidden');
    }
}

function renderSurvival() {
    const qaContainer = document.getElementById('content-qa');
    qaContainer.innerHTML = `
        <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div class="relative">
                <input
                    id="qa-search-input"
                    type="search"
                    placeholder="搜尋問題或答案..."
                    class="w-full bg-gray-100 rounded-lg px-3 py-2.5 text-sm outline-none border border-transparent focus:border-yellow-400"
                    oninput="searchQa(this.value)"
                >
            </div>
            <div id="qa-search-results" class="hidden mt-3 space-y-2"></div>
        </div>
        <div id="qa-default-list" class="space-y-4"></div>
    `;
    const qaList = document.getElementById('qa-default-list');
    qaData.forEach((item, idx) => {
        const qaBox = document.createElement('div');
        qaBox.className = 'bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100';
        qaBox.innerHTML = `
            <button class="w-full text-left p-4 font-bold flex justify-between items-center active:bg-gray-50" onclick="toggleAccordion(${idx})">
                <span class="text-[15px]">${item.q}</span>
                <svg id="arrow-${idx}" class="w-4 h-4 transition-transform text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="ans-${idx}" class="hidden bg-gray-50 px-4 pb-4 space-y-2 border-t border-gray-100">
                ${item.answers.map(ans => `
                    <div class="p-3 bg-white border border-gray-200 rounded-lg text-sm relative active:bg-yellow-50 cursor-pointer" onclick="copyText('${ans.text}')">
                        <span class="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wide">${ans.type}</span>
                        ${ans.text}
                    </div>
                `).join('')}
            </div>
        `;
        qaList.appendChild(qaBox);
    });

    const greetContainer = document.getElementById('content-greetings');
    greetContainer.innerHTML = `
        <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div class="grid grid-cols-2 gap-2">
                <select id="greetings-mainstream-filter" class="bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none" onchange="renderGreetingsList()">
                    <option value="all">全部類型</option>
                    <option value="mainstream">主流祝福語</option>
                    <option value="creative">創意/較輕鬆</option>
                </select>
                <select id="greetings-target-filter" class="bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none" onchange="renderGreetingsList()">
                    <option value="all">全部對象</option>
                    <option value="elder">長輩/父母</option>
                    <option value="boss">老闆/上司</option>
                    <option value="client">客戶/生意夥伴</option>
                    <option value="friend">朋友/同事</option>
                    <option value="student">學生/小朋友</option>
                </select>
            </div>
        </div>
        <div id="greetings-list" class="grid grid-cols-1 gap-3"></div>
    `;
    document.getElementById('greetings-mainstream-filter').value = greetingFilterState.mainstream;
    document.getElementById('greetings-target-filter').value = greetingFilterState.target;
    renderGreetingsList();
}

function renderGreetingsList() {
    const listContainer = document.getElementById('greetings-list');
    const mainstreamSelect = document.getElementById('greetings-mainstream-filter');
    const targetSelect = document.getElementById('greetings-target-filter');
    if (!listContainer || !mainstreamSelect || !targetSelect) return;

    const mainstreamFilter = mainstreamSelect.value;
    const targetFilter = targetSelect.value;
    greetingFilterState = { mainstream: mainstreamFilter, target: targetFilter };

    const filtered = greetings.filter(item => {
        const mainstreamMatched = (
            mainstreamFilter === 'all' ||
            (mainstreamFilter === 'mainstream' && item.mainstream) ||
            (mainstreamFilter === 'creative' && !item.mainstream)
        );
        const targetMatched = (
            targetFilter === 'all' ||
            item.targets.includes(targetFilter) ||
            item.targets.includes('all')
        );
        return mainstreamMatched && targetMatched;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `
            <div class="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-3">
                呢個篩選條件下暫時未有祝福語，試下轉其他 Filter。
            </div>
        `;
        return;
    }

    listContainer.innerHTML = filtered.map(item => {
        const targetText = item.targets.includes('all')
            ? '全部對象'
            : item.targets.map(t => greetingTargetLabels[t]).join(' / ');
        const styleTag = item.mainstream ? '主流' : '創意';
        return `
            <div class="bg-white p-4 rounded-xl shadow-sm text-center font-medium active:scale-95 transition-transform cursor-pointer border border-gray-100" onclick="copyText('${item.text.replace(/'/g, "\\'")}')">
                <div class="text-base">${item.text}</div>
                <div class="mt-2 text-[11px] text-gray-400">${styleTag} · ${targetText}</div>
            </div>
        `;
    }).join('');
}

function searchQa(keyword) {
    const query = keyword.trim().toLowerCase();
    const resultContainer = document.getElementById('qa-search-results');
    const defaultList = document.getElementById('qa-default-list');
    if (!resultContainer || !defaultList) return;

    if (!query) {
        resultContainer.classList.add('hidden');
        resultContainer.innerHTML = '';
        defaultList.classList.remove('hidden');
        return;
    }

    const matches = qaData.filter(item => {
        const questionMatched = item.q.toLowerCase().includes(query);
        const answerMatched = item.answers.some(ans => ans.text.toLowerCase().includes(query));
        return questionMatched || answerMatched;
    });

    if (matches.length === 0) {
        resultContainer.innerHTML = `
            <div class="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-3">
                找不到相關問答，試試其他關鍵字。
            </div>
        `;
    } else {
        resultContainer.innerHTML = matches.map(item => `
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div class="font-bold text-sm mb-2">${item.q}</div>
                <div class="space-y-1.5">
                    ${item.answers.map(ans => `
                        <div class="bg-white border border-yellow-100 rounded-md p-2 text-xs cursor-pointer active:bg-yellow-100" onclick="copyText('${ans.text.replace(/'/g, "\\'")}')">
                            <span class="font-bold text-[10px] text-gray-500 uppercase tracking-wide">${ans.type}</span>
                            <div class="mt-0.5">${ans.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    defaultList.classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

function toggleAccordion(idx) {
    qaData.forEach((_, i) => {
        if (i !== idx) {
            document.getElementById(`ans-${i}`).classList.add('hidden');
            document.getElementById(`arrow-${i}`).classList.remove('rotate-180');
        }
    });
    const ans = document.getElementById(`ans-${idx}`);
    const arrow = document.getElementById(`arrow-${idx}`);
    ans.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    if (id === 'relative-modal') {
        initRelativeCalc();
    }
    if (id === 'preference-modal') {
        resetPreferenceForm();
    }
    if (id === 'preference-list-modal') {
        renderPreferenceMemo();
    }
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('已複製！');
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('opacity-0');
    setTimeout(() => {
        toast.classList.add('opacity-0');
    }, 2000);
}

function clearAllData() {
    if(confirm('警告：這將刪除所有記帳資料，無法復原！')) {
        localStorage.clear();
        ledgerData = [];
        preferenceData = [];
        renderLedger();
        renderPreferenceMemo();
        updateNameSuggestions();
        alert('資料已清除');
    }
}
