// 使用記憶體存儲URL歷史
let urlHistory = [];
let inputTimer = null;

// 頁面載入時恢復歷史記錄
window.onload = function() {
    updateHistoryDisplay();
    setupInputEvents();
};

function setupInputEvents() {
    const urlInput = document.getElementById('urlInput');

    urlInput.value = localStorage.getItem("urlInput");
    
    if (urlInput.value.trim() !== '') {
      generateQR();
    }

    // 輸入框點選時全選
    urlInput.addEventListener('focus', function() {
        this.select();
    });
    
    // 輸入框點擊時全選
    urlInput.addEventListener('click', function() {
        this.select();
    });
    
    // 監聽輸入變化，3秒後自動生成QR碼
    urlInput.addEventListener('input', function() {
        // 清除之前的計時器
        if (inputTimer) {
            clearTimeout(inputTimer);
        }
        
        // 設定新的計時器
        inputTimer = setTimeout(() => {
            const url = this.value.trim();
            if (url) {
                generateQR();
            }
        }, 1000);
    });

    urlInput.addEventListener('change', function() {
        localStorage.setItem("urlInput", this.value);
    });
}

function generateQR() {
    const url = document.getElementById('urlInput').value.trim();
    
    if (!url) {
        return;
    }
    
    // 驗證URL格式
    try {
        new URL(url);
    } catch (e) {
        return;
    }
    
    // 檢查qrcode是否已載入
    if (typeof qrcode === 'undefined') {
        console.log('QRCode library is loading...');
        setTimeout(() => generateQR(), 500);
        return;
    }
    
    try {
        // 清空之前的QR碼
        const qrCodeDiv = document.getElementById('qrcode');
        qrCodeDiv.innerHTML = '';
        
        // 使用qrcode-generator庫
        const qr = qrcode(0, 'M');
        qr.addData(url);
        qr.make();
        
        // 創建canvas並設置大小
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 512;
        const moduleCount = qr.getModuleCount();
        const cellSize = size / moduleCount;
        
        canvas.width = size;
        canvas.height = size;
        
        // 白色背景
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        
        // 黑色方塊
        ctx.fillStyle = '#000000';
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }
        
        // 添加到頁面
        qrCodeDiv.appendChild(canvas);
        
        // 添加點擊下載功能
        canvas.style.cursor = 'pointer';
        canvas.style.transition = 'transform 0.3s ease';
        canvas.addEventListener('click', function() {
            downloadQR(canvas, url);
        });
        
        // 添加懸停效果
        canvas.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        canvas.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // 顯示下載提示
        const hint = document.getElementById('downloadHint');
        hint.classList.add('show');
        
        // 添加到歷史記錄
        addToHistory(url);
        
    } catch (error) {
        console.error('生成QR碼錯誤:', error);
        // 如果還是失敗，嘗試延遲重試
        setTimeout(() => generateQR(), 1000);
    }
}

function downloadQR(canvas, url) {
    try {
        // 創建下載連結
        const link = document.createElement('a');
        const timestamp = new Date().getTime();
        const hostname = new URL(url).hostname.replace(/\./g, '_');
        link.download = `qrcode_${hostname}_${timestamp}.png`;
        
        // 轉換為DataURL
        const dataURL = canvas.toDataURL('image/png');
        link.href = dataURL;
        
        // 添加到DOM並觸發點擊
        document.body.appendChild(link);
        link.click();
        
        // 清理
        document.body.removeChild(link);
        
        // 給用戶反饋
        showDownloadSuccess();
    } catch (error) {
        console.error('下載失敗:', error);
        alert('下載失敗，請重試！');
    }
}

function showDownloadSuccess() {
    const hint = document.getElementById('downloadHint');
    const originalText = hint.textContent;
    hint.textContent = '✅ 下載成功！';
    hint.style.color = '#4CAF50';
    
    setTimeout(() => {
        hint.textContent = originalText;
        hint.style.color = '#666';
    }, 2000);
}

function addToHistory(url) {
    // 檢查是否已存在
    if (!urlHistory.includes(url)) {
        urlHistory.unshift(url); // 添加到開頭
        
        // 限制歷史記錄數量
        if (urlHistory.length > 20) {
            urlHistory = urlHistory.slice(0, 20);
        }
        
        updateHistoryDisplay();
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (urlHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-history">尚無歷史記錄</div>';
        return;
    }
    
    historyList.innerHTML = urlHistory.map((url, index) => `
        <div class="history-item">
            <div class="history-url">${url}</div>
            <div class="history-actions">
                <button class="use-btn" onclick="useUrl('${url}')">使用</button>
                <button class="delete-btn" onclick="deleteUrl(${index})">刪除</button>
            </div>
        </div>
    `).join('');
}

function useUrl(url) {
    document.getElementById('urlInput').value = url;
    // 清除計時器避免重複觸發
    if (inputTimer) {
        clearTimeout(inputTimer);
    }
    generateQR();
}

function deleteUrl(index) {
    urlHistory.splice(index, 1);
    updateHistoryDisplay();
}

function clearHistory() {
    if (confirm('確定要清空所有歷史記錄嗎？')) {
        urlHistory = [];
        updateHistoryDisplay();
    }
}
