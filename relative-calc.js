/* js/tools/relative-calc.js - 親戚稱呼計算機*/

window.ToolRelativeCalc = {
    // 核心數據庫：基於提供的圖片與廣東話傳統習慣重建
    // 代碼定義：f:父, m:母, h:夫, w:妻, s:子, d:女, xb:兄, lb:弟, xs:姐, ls:妹
    data: {
        '': '我',
        
        // ==========================================
        // 核心家庭 (Core Family)
        // ==========================================
        'f': '爸爸', 'm': '媽媽', 
        'h': '老公', 'w': '老婆',
        's': '仔', 'd': '女',
        'xb': '阿哥', 'lb': '細佬', 
        'xs': '家姐', 'ls': '阿妹',

        // ==========================================
        // 祖輩 (Grandparents & Great-Grandparents)
        // ==========================================
        // 父系
        'f,f': '爺爺', 'f,m': '嫲嫲', // 粵語核心區別
        'f,f,f': '太爺', 'f,f,m': '太嫲', // 曾祖父母
        'f,m,f': '太公', 'f,m,m': '太婆', // 嫲嫲的父母

        // 母系
        'm,f': '公公', 'm,m': '婆婆', // 粵語核心區別
        'm,f,f': '太公', 'm,f,m': '太婆', // 外曾祖父母
        'm,m,f': '太公', 'm,m,m': '太婆', // 婆婆的父母

        // ==========================================
        // 父系長輩 (Paternal Uncles/Aunts)
        // ==========================================
        'f,xb': '伯父', 'f,xb,w': '伯娘',
        'f,lb': '叔叔', 'f,lb,w': '嬸嬸',
        'f,xs': '姑媽', 'f,xs,h': '姑丈', // 爸爸的姐姐
        'f,ls': '姑姐', 'f,ls,h': '姑丈', // 爸爸的妹妹

        // ==========================================
        // 母系長輩 (Maternal Uncles/Aunts)
        // ==========================================
        'm,xb': '舅父', 'm,xb,w': '舅母',
        'm,lb': '舅父', 'm,lb,w': '舅母', // 廣東話口語舅父通常不分大小，如需區分可叫大舅父/細舅父
        'm,xs': '姨媽', 'm,xs,h': '姨丈',
        'm,ls': '阿姨', 'm,ls,h': '姨丈',

        // ==========================================
        // 旁系長輩 (Grand Uncles/Aunts - 爺爺嫲嫲的兄弟姊妹)
        // ==========================================
        // 爺爺的兄弟姊妹
        'f,f,xb': '伯公', 'f,f,lb': '叔公',
        'f,f,xs': '姑婆', 'f,f,ls': '姑婆',
        
        // 嫲嫲的兄弟姊妹 (依據圖片邏輯)
        'f,m,xb': '舅公', 'f,m,lb': '舅公',
        'f,m,xs': '姨婆', 'f,m,ls': '姨婆',

        // 公公/婆婆的兄弟姊妹
        'm,f,xb': '伯公', 'm,f,lb': '叔公', // 隨外公叫
        'm,m,xb': '舅公', 'm,m,lb': '舅公', // 隨外婆叫
        'm,m,xs': '姨婆', 'm,m,ls': '姨婆',

        // ==========================================
        // 平輩 - 兄弟姊妹的配偶
        // ==========================================
        'xb,w': '阿嫂', 
        'lb,w': '弟婦',
        'xs,h': '姐夫', 
        'ls,h': '妹夫',

        // ==========================================
        // 平輩 - 堂親 (同姓，伯叔子女)
        // ==========================================
        'f,xb,s': '堂哥/堂弟', 'f,xb,d': '堂姐/堂妹',
        'f,lb,s': '堂哥/堂弟', 'f,lb,d': '堂姐/堂妹',
        
        // 堂親的配偶
        'f,xb,s,w': '堂嫂/堂弟婦', 
        'f,lb,s,w': '堂嫂/堂弟婦',
        'f,xb,d,h': '堂姐夫/堂妹夫',
        'f,lb,d,h': '堂姐夫/堂妹夫',

        // ==========================================
        // 平輩 - 表親 (異姓，姑/舅/姨子女) - 強制保留「表」字
        // ==========================================
        // 姑表 (爸爸的姐妹的子女)
        'f,xs,s': '表哥/表弟', 'f,xs,d': '表姐/表妹',
        'f,ls,s': '表哥/表弟', 'f,ls,d': '表姐/表妹',
        
        // 姑表配偶 (USER REQUEST: 必須帶表字)
        'f,xs,s,w': '表嫂/表弟婦', 
        'f,ls,s,w': '表嫂/表弟婦',
        'f,xs,d,h': '表姐夫/表妹夫',
        'f,ls,d,h': '表姐夫/表妹夫',

        // 舅表 (媽媽的兄弟的子女)
        'm,xb,s': '表哥/表弟', 'm,xb,d': '表姐/表妹',
        'm,lb,s': '表哥/表弟', 'm,lb,d': '表姐/表妹',

        // 舅表配偶
        'm,xb,s,w': '表嫂/表弟婦',
        'm,lb,s,w': '表嫂/表弟婦',
        'm,xb,d,h': '表姐夫/表妹夫',
        'm,lb,d,h': '表姐夫/表妹夫',

        // 姨表 (媽媽的姐妹的子女)
        'm,xs,s': '表哥/表弟', 'm,xs,d': '表姐/表妹',
        'm,ls,s': '表哥/表弟', 'm,ls,d': '表姐/表妹',

        // 姨表配偶
        'm,xs,s,w': '表嫂/表弟婦',
        'm,ls,s,w': '表嫂/表弟婦',
        'm,xs,d,h': '表姐夫/表妹夫',
        'm,ls,d,h': '表姐夫/表妹夫',

        // ==========================================
        // 晚輩 (侄/甥)
        // ==========================================
        'xb,s': '侄仔', 'xb,d': '侄女',
        'lb,s': '侄仔', 'lb,d': '侄女',
        'xs,s': '外甥', 'xs,d': '外甥女', // 粵語不分男女系，姐妹子女皆稱外甥
        'ls,s': '外甥', 'ls,d': '外甥女',

        // ==========================================
        // 姻親 - 夫家 (Husband's Family)
        // ==========================================
        'h,f': '老爺', 'h,m': '奶奶', // 粵語核心區別：家婆叫奶奶
        'h,f,f': '太老爺', 'h,f,m': '太奶奶',
        'h,xb': '大伯', 'h,xb,w': '大伯娘',
        'h,lb': '叔仔', 'h,lb,w': '嬸嬸', // 或跟仔女叫
        'h,xs': '姑奶', 'h,xs,h': '姑爺',
        'h,ls': '姑仔', 'h,ls,h': '姑爺',

        // ==========================================
        // 姻親 - 妻家 (Wife's Family)
        // ==========================================
        'w,f': '外父', 'w,m': '外母', // 粵語核心區別
        'w,f,f': '太外父', 'w,f,m': '太外母',
        'w,xb': '大舅父', 'w,xb,w': '大舅母', // 隨仔女叫較多，亦可叫大舅
        'w,lb': '舅仔', 'w,lb,w': '舅母',
        'w,xs': '大姨', 'w,xs,h': '姨丈',
        'w,ls': '姨仔', 'w,ls,h': '姨丈',

        // ==========================================
        // 兒孫 (Children & Grandchildren)
        // ==========================================
        's,w': '新抱', 'd,h': '女婿',
        's,s': '孫仔', 's,d': '孫女',
        'd,s': '外孫仔', 'd,d': '外孫女',
        's,s,s': '曾孫', 's,s,d': '曾孫女'
    },

    currentChain: [], // 存放代碼: ['f', 'm']
    currentChainText: [], // 存放文字: ['父', '母']

    render: () => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px;">
                <h3 style="margin:0; font-size:1.1rem; color:var(--text-sub);" data-i18n="t_relative">親戚稱呼 (廣東話版)</h3>
                <button class="help-btn" onclick="ToolRelativeCalc.toggleHelp(true)">
                    <span style="font-size:1.2rem;">&#65281;</span>
                </button>
            </div>

            <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:12px; padding:20px; margin-bottom:20px; text-align:center; min-height:100px; display:flex; flex-direction:column; justify-content:center;">
                <div style="font-size:0.9rem; color:var(--text-sub); margin-bottom:5px; word-wrap:break-word; line-height:1.4;" id="rel-chain">
                    <span style="opacity:0.5;">(請按下方按鈕開始)</span>
                </div>
                <div style="font-size:2.2rem; font-weight:bold; color:var(--accent); margin-top:5px;" id="rel-result">我</div>
            </div>

            <div class="grid" style="grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px;">
                <button class="std-input" onclick="ToolRelativeCalc.add('f', '父')" style="font-weight:bold;">父</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('m', '母')" style="font-weight:bold;">母</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('h', '夫')">夫</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('w', '妻')">妻</button>
                
                <button class="std-input" onclick="ToolRelativeCalc.add('xb', '兄')">兄</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('lb', '弟')">弟</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('xs', '姐')">姐</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('ls', '妹')">妹</button>
                
                <button class="std-input" onclick="ToolRelativeCalc.add('s', '子')">子</button>
                <button class="std-input" onclick="ToolRelativeCalc.add('d', '女')">女</button>
                
                <button class="std-input" style="background:var(--ad-bg); color:var(--text-main);" onclick="ToolRelativeCalc.undo()">回退</button>
                <button class="std-input" style="background:#ff3b30; color:white; border:none;" onclick="ToolRelativeCalc.reset()">重置</button>
            </div>

            <div id="rel-help-modal" class="modal-overlay hidden" onclick="ToolRelativeCalc.toggleHelp(false)">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <button class="modal-close" onclick="ToolRelativeCalc.toggleHelp(false)">&times;</button>
                    <div style="text-align:left; line-height:1.6;">
                        <h4>使用說明</h4>
                        <p>1. 請依照順序點擊按鈕。例如想查「表嫂」：</p>
                        <p>點擊：<strong>父 &rarr; 姐 &rarr; 子 &rarr; 妻</strong> (即：爸爸的姐姐的兒子的老婆)</p>
                        <p>2. 本計算機專為<strong>廣東話/香港</strong>習慣設計：</p>
                        <ul>
                            <li>父親的母親稱為「嫲嫲」</li>
                            <li>母親的父親稱為「公公」</li>
                            <li>表親配偶保留「表」字 (如：表嫂)</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        return div;
    },

    init: () => {
        ToolRelativeCalc.reset();
    },

    add: (code, text) => {
        ToolRelativeCalc.currentChain.push(code);
        ToolRelativeCalc.currentChainText.push(text);
        ToolRelativeCalc.calculate();
    },

    calculate: () => {
        const chainStr = ToolRelativeCalc.currentChain.join(',');
        
        let result = ToolRelativeCalc.data[chainStr];

        if (!result) {
            // 智能推斷：如果關係鏈太長，嘗試找最近的邏輯 (這部分可根據需求擴展)
            // 這裡簡單處理：
            result = "暫未收錄 / 關係太遠";
            
            // 簡單的性別邏輯檢查
            if ((chainStr.includes('h,h') || chainStr.includes('w,w') || 
                 chainStr.includes('h,w') || chainStr.includes('w,h'))) {
                result = "關係錯誤 (重複配偶)";
            }
        }

        document.getElementById('rel-result').innerText = result;
        
        const chainDisplay = ToolRelativeCalc.currentChainText.length > 0 
            ? '我 的 ' + ToolRelativeCalc.currentChainText.join(' 的 ') 
            : '我';
        document.getElementById('rel-chain').innerText = chainDisplay;
    },

    undo: () => {
        if (ToolRelativeCalc.currentChain.length > 0) {
            ToolRelativeCalc.currentChain.pop();
            ToolRelativeCalc.currentChainText.pop();
            if (ToolRelativeCalc.currentChain.length === 0) {
                ToolRelativeCalc.reset();
            } else {
                ToolRelativeCalc.calculate();
            }
        }
    },

    reset: () => {
        ToolRelativeCalc.currentChain = [];
        ToolRelativeCalc.currentChainText = [];
        document.getElementById('rel-result').innerText = '我';
        document.getElementById('rel-chain').innerHTML = '<span style="opacity:0.5;">(請按下方按鈕開始)</span>';
    },

    toggleHelp: (show) => {
        const modal = document.getElementById('rel-help-modal');
        if (show) modal.classList.remove('hidden'); else modal.classList.add('hidden');
    }
};