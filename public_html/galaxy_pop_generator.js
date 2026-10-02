document.addEventListener('DOMContentLoaded', () => {
    // UI Form Controls
    const sidebar = document.getElementById('sidebar');
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const btnModePrint = document.getElementById('btn-mode-print');
    const btnModeComplete = document.getElementById('btn-mode-complete');
    
    const modelBtns = document.querySelectorAll('.model-btn');
    const uploadGroup = document.getElementById('upload-group');
    const uploadArea = document.getElementById('upload-area');
    const inputProductImg = document.getElementById('input-product-img');
    const uploadPreviewBar = document.getElementById('upload-preview-bar');
    const uploadedFileName = document.getElementById('uploaded-file-name');
    const btnRemoveImg = document.getElementById('btn-remove-img');
    const gridRadioBtns = document.querySelectorAll('input[name="grid-size"]');
    
    const inputBadge = document.getElementById('input-badge');
    const inputMainTitle = document.getElementById('input-main-title');
    const inputSubTitle = document.getElementById('input-sub-title');
    const inputPoint1 = document.getElementById('input-point-1');
    const inputPoint2 = document.getElementById('input-point-2');
    const inputPoint3 = document.getElementById('input-point-3');
    const inputPriceLabel = document.getElementById('input-price-label');
    const inputPriceValue = document.getElementById('input-price-value');
    
    const toggleGuide = document.getElementById('toggle-guide');
    const toggleCutline = document.getElementById('toggle-cutline');
    const btnPrint = document.getElementById('btn-print');
    const btnPdfDownload = document.getElementById('btn-pdf-download');
    const btnShareLink = document.getElementById('btn-share-link');
    
    // Zoom control elements
    const zoomControlPanel = document.getElementById('zoom-control-panel');
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomValue = document.getElementById('zoom-value');
    
    // Preview Grid Container
    const printContainer = document.getElementById('print-container');
    const printContainerWrapper = document.getElementById('print-container-wrapper');
    const posterTemplate = document.getElementById('poster-template');

    // Default Content Config for Models (Updated S26 points with line breaks)
    const modelDefaults = {
        s26: {
            badge: '最 新 登場',
            mainTitle: 'その瞬間を、プロクオリティで。',
            subTitle: 'Galaxy S26 シリーズ',
            point1: '夜景も昼間のように\n明るく鮮明に写る！',
            point2: '遥か彼方までクッキリ写す\n超解像ズーム',
            point3: 'フォトアシストで被写体の\n移動やサイズ変更も自由自在',
            priceLabel: '★ NTTドコモ・特別価格で提供中 ★',
            priceValue: '月々の実質負担金など、お見積もりはスタッフへ！\n公式キービジュアルのカメラ性能を店頭で実機体験できます。',
            themeClass: 'theme-s26',
            defaultProductImg: 'galaxy_pop_assets/s26_screenshot.png'
        },
        a57: {
            badge: '新 登 場',
            mainTitle: '大画面なのに、驚きの薄さと軽さ。',
            subTitle: 'Galaxy A57 デビュー',
            point1: 'コスパ良く「かんたん・綺麗」に撮れるカメラ',
            point2: '大画面なのに薄くて軽い！持ちやすさ抜群',
            point3: 'あんしんの長持ちバッテリー＆防水防塵対応',
            priceLabel: '★ ドコモショップおすすめの１台 ★',
            priceValue: '初めてのスマホや機種変更にも最適！\n実質お支払い額の詳細は店頭スタッフにお尋ねください。',
            themeClass: 'theme-a57',
            defaultProductImg: 'galaxy_pop_assets/a57_official_kv.jpg'
        }
    };

    // State variables
    let currentModel = 's26';
    let currentGridSize = '3x3';
    let currentViewMode = 'print'; // 'print' | 'complete'
    let uploadedProductImgData = null;

    // --- Sidebar Collapse Action ---
    btnToggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed');
        
        // Toggle Icon
        const icon = btnToggleSidebar.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.className = 'fa-solid fa-chevron-right';
            btnToggleSidebar.title = '操作パネルを開く';
        } else {
            icon.className = 'fa-solid fa-bars';
            btnToggleSidebar.title = '操作パネルを閉じる';
        }

        // Adjust scale dynamically on sidebar toggles
        adjustPreviewScale();
    });

    // --- Dynamic Preview Scale Calculation (Responsive scaling) ---
    function adjustPreviewScale() {
        const overlap = toggleGuide.checked ? 15 : 0;
        const pagePrintWidth = 297;
        const pagePrintHeight = 210;
        let cols = currentGridSize === '3x3' ? 3 : 4;
        let rows = currentGridSize === '3x3' ? 3 : 4;

        // ポスターまたはグリッド全体の元サイズ（mm）を算出
        const gapMm = 5.3; // 20px gap in mm
        let totalWidthMm, totalHeightMm;

        if (currentViewMode === 'complete') {
            totalWidthMm = (pagePrintWidth - overlap) * (cols - 1) + pagePrintWidth;
            totalHeightMm = (pagePrintHeight - overlap) * (rows - 1) + pagePrintHeight;
        } else {
            totalWidthMm = pagePrintWidth * cols + gapMm * (cols - 1);
            totalHeightMm = pagePrintHeight * rows + gapMm * (rows - 1);
        }

        const totalWidthPx = totalWidthMm * 3.7795;
        const totalHeightPx = totalHeightMm * 3.7795;

        let scale;

        if (window.innerWidth > 768) {
            // PC大画面環境：手動ズームスライダーの値を優先適用
            if (zoomControlPanel) zoomControlPanel.style.display = 'flex';
            
            scale = parseFloat(zoomSlider.value) / 100;
            zoomValue.textContent = `${zoomSlider.value}%`;
        } else {
            // スマホやタブレットなどの狭い画面：自動フィット優先
            if (zoomControlPanel) zoomControlPanel.style.display = 'none';
            
            const availableWidth = window.innerWidth - 30; // 左右マージン考慮

            if (currentViewMode === 'complete') {
                scale = Math.min(availableWidth / totalWidthPx, 0.35);
            } else {
                const pageWidthPx = pagePrintWidth * 3.7795;
                scale = Math.min(availableWidth / pageWidthPx, 0.35);
            }
        }

        // 1. ビジュアル上の縮小表示をCSS変数経由で適用
        printContainer.style.setProperty('--preview-scale', scale);
        
        // 2. ポスターコンテナ自体の物理幅は「縮小前(100%)」を維持し、中の文字や画像が二重縮小で潰れるのを防止
        printContainer.style.width = `${totalWidthPx}px`;
        printContainer.style.height = `${totalHeightPx}px`;

        // 3. 親のラッパー要素の幅と高さを「縮小後のサイズ」に制限し、ブラウザのスクロール余白バグを完全に防ぐ
        if (printContainerWrapper) {
            printContainerWrapper.style.width = `${totalWidthPx * scale}px`;
            printContainerWrapper.style.height = `${totalHeightPx * scale}px`;
        }
    }

    // --- View Mode Switcher ---
    function updateViewMode(mode) {
        currentViewMode = mode;
        if (mode === 'complete') {
            btnModePrint.classList.remove('active');
            btnModeComplete.classList.add('active');
            printContainer.classList.add('completed-view');
        } else {
            btnModePrint.classList.add('active');
            btnModeComplete.classList.remove('active');
            printContainer.classList.remove('completed-view');
        }
        
        // 常にスケーリングを再計算
        adjustPreviewScale();
        
        // のりしろと切り取り線のトグル制御
        if (mode === 'complete') {
            toggleGuide.disabled = true;
            toggleCutline.disabled = true;
        } else {
            toggleGuide.disabled = false;
            toggleCutline.disabled = false;
        }
    }

    btnModePrint.addEventListener('click', () => updateViewMode('print'));
    btnModeComplete.addEventListener('click', () => updateViewMode('complete'));

    // Resize listener for fluid responsive scaling
    window.addEventListener('resize', adjustPreviewScale);

    // --- Dynamic Grid Page Generator (A4 Landscape Base) ---
    function rebuildPages() {
        // Clear existing pages
        printContainer.innerHTML = '';
        
        let cols = 3;
        let rows = 3;
        
        if (currentGridSize === '4x4') {
            cols = 4;
            rows = 4;
        }

        // ハサミでのカット作業を不要にするため、用紙マージンは常に0（フチなし）に固定
        const margin = 0; // mm (常に0)
        // のりしろガイドがONのときのみ、重ね合わせ用の15mmオーバーラップを設ける
        const overlap = toggleGuide.checked ? 15 : 0; // mm
        
        const pagePrintWidth = 297;  // A4横幅（フチなし）
        const pagePrintHeight = 210; // A4縦幅（フチなし）

        // Set layout classes on container
        printContainer.className = `print-container theme-${currentModel} grid-${currentGridSize}`;
        printContainer.classList.toggle('show-guide', toggleGuide.checked);
        printContainer.classList.toggle('show-overlap-preview', toggleGuide.checked && currentViewMode !== 'complete');
        printContainer.classList.toggle('show-cutline', toggleCutline.checked);

        // Apply view mode classes and variables if completed view is active
        if (currentViewMode === 'complete') {
            printContainer.classList.add('completed-view');
            adjustPreviewScale();
        }

        // Calculate poster total size
        const posterWidth = (pagePrintWidth - overlap) * (cols - 1) + pagePrintWidth;
        const posterHeight = (pagePrintHeight - overlap) * (rows - 1) + pagePrintHeight;

        // Apply poster size dynamically via CSS variables
        printContainer.style.setProperty('--poster-width', `${posterWidth}mm`);
        printContainer.style.setProperty('--poster-height', `${posterHeight}mm`);

        // Generate each grid page
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const pageSection = document.createElement('section');
                pageSection.className = 'print-page';
                pageSection.id = `page-${r}-${c}`;

                // Set CSS variables for page-window dimensions dynamically
                pageSection.style.setProperty('--page-margin', `${margin}mm`);
                pageSection.style.setProperty('--page-width', `${pagePrintWidth}mm`);
                pageSection.style.setProperty('--page-height', `${pagePrintHeight}mm`);
                pageSection.style.setProperty('--paste-width', `${overlap}mm`);
                pageSection.style.setProperty('--paste-height', `${overlap}mm`);

                // Add guides
                // Cutline guides
                pageSection.innerHTML = `
                    <div class="cutline-guide top-left"></div>
                    <div class="cutline-guide top-right"></div>
                    <div class="cutline-guide bottom-left"></div>
                    <div class="cutline-guide bottom-right"></div>
                `;

                // Paste guides (のりしろ)
                if (r > 0 && toggleGuide.checked) {
                    const topPaste = document.createElement('div');
                    topPaste.className = 'paste-guide top-paste';
                    topPaste.innerHTML = `<span class="paste-text"><i class="fa-solid fa-scissors"></i> ここに上段(${r}行目)を貼り合わせます</span>`;
                    pageSection.appendChild(topPaste);
                    pageSection.classList.add('has-top-paste');
                }
                if (c > 0 && toggleGuide.checked) {
                    const leftPaste = document.createElement('div');
                    leftPaste.className = 'paste-guide left-paste';
                    leftPaste.innerHTML = `<span class="paste-text" style="writing-mode: vertical-rl; transform: rotate(0deg);"><i class="fa-solid fa-scissors"></i> 左段と結合</span>`;
                    pageSection.appendChild(leftPaste);
                    pageSection.classList.add('has-left-paste');
                }

                // Page window (clipper)
                const pageWindow = document.createElement('div');
                pageWindow.className = 'page-window';
                
                // Poster wrapper
                const posterWrapper = document.createElement('div');
                posterWrapper.className = 'master-poster-wrapper';
                
                // Calculate offsets
                const offsetX = -(pagePrintWidth - overlap) * c;
                const offsetY = -(pagePrintHeight - overlap) * r;
                posterWrapper.style.setProperty('--offset-x', `${offsetX}mm`);
                posterWrapper.style.setProperty('--offset-y', `${offsetY}mm`);

                // Insert the poster template content
                const clone = document.importNode(posterTemplate.content, true);
                posterWrapper.appendChild(clone);
                pageWindow.appendChild(posterWrapper);
                pageSection.appendChild(pageWindow);

                // Add Row/Col Guide for assembly reference (non-printing guide helper on screen)
                const assemblyGuide = document.createElement('div');
                assemblyGuide.className = 'page-footer-guide';
                assemblyGuide.textContent = `A4横パーツ: [${r+1}行目 - ${c+1}列目] / のり幅:${overlap}mm`;
                pageSection.appendChild(assemblyGuide);

                printContainer.appendChild(pageSection);
            }
        }

        // Apply texts to new generated DOMs
        syncTextsToPreview();
        
        // Re-apply product image
        syncProductImageToPreview();
    }

    // --- Sync text fields from sidebar inputs to all grid clones ---
    function syncTextsToPreview() {
        const textMapping = [
            { key: 'badge', val: inputBadge.value },
            { key: 'main-title', val: inputMainTitle.value },
            { key: 'sub-title', val: inputSubTitle.value },
            { key: 'point-1', val: inputPoint1.value.replace(/\n/g, '<br>') },
            { key: 'point-2', val: inputPoint2.value.replace(/\n/g, '<br>') },
            { key: 'point-3', val: inputPoint3.value.replace(/\n/g, '<br>') },
            { key: 'price-label', val: inputPriceLabel.value },
            { key: 'price-value', val: inputPriceValue.value.replace(/\n/g, '<br>') }
        ];

        textMapping.forEach(item => {
            const targets = printContainer.querySelectorAll(`[data-target="${item.key}"]`);
            targets.forEach(target => {
                target.innerHTML = item.val;
            });
        });
    }

    // --- Sync Uploaded or Default Product Image (For S26 / A57 Layouts) ---
    function syncProductImageToPreview() {
        // A57の画像要素 [data-target="image"] と S26の画像要素 .camera-spec-img-giant の両方を対象にする
        const imageTargets = printContainer.querySelectorAll('[data-target="image"], .camera-spec-img-giant');
        const placeholderTargets = printContainer.querySelectorAll('[data-target="placeholder"]');

        const currentDefaultImg = modelDefaults[currentModel].defaultProductImg;

        if (uploadedProductImgData) {
            imageTargets.forEach(img => {
                img.src = uploadedProductImgData;
                img.style.display = 'block';
            });
            placeholderTargets.forEach(ph => {
                ph.style.display = 'none';
            });
        } else if (currentDefaultImg) {
            imageTargets.forEach(img => {
                img.src = currentDefaultImg;
                img.style.display = 'block';
            });
            placeholderTargets.forEach(ph => {
                ph.style.display = 'none';
            });
        } else {
            imageTargets.forEach(img => {
                img.src = '';
                img.style.display = 'none';
            });
            placeholderTargets.forEach(ph => {
                ph.style.display = 'flex';
            });
        }
    }

    // --- Handle File Uploading ---
    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('有効な画像ファイルを選択してください。');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedProductImgData = e.target.result;
            
            // Show preview filename bar
            uploadedFileName.textContent = file.name;
            uploadPreviewBar.style.display = 'flex';
            
            // Sync
            syncProductImageToPreview();
        };
        reader.readAsDataURL(file);
    }

    // Upload Area Listeners
    uploadArea.addEventListener('click', () => inputProductImg.click());
    
    inputProductImg.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Drag and Drop
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        }, false);
    });

    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Remove Image Button
    btnRemoveImg.addEventListener('click', () => {
        uploadedProductImgData = null;
        inputProductImg.value = '';
        uploadPreviewBar.style.display = 'none';
        syncProductImageToPreview();
    });

    // --- Set Form Data Based on Model Selection ---
    function applyModelData(model) {
        const data = modelDefaults[model];
        
        inputBadge.value = data.badge;
        inputMainTitle.value = data.mainTitle;
        inputSubTitle.value = data.subTitle;
        inputPoint1.value = data.point1;
        inputPoint2.value = data.point2;
        inputPoint3.value = data.point3;
        inputPriceLabel.value = data.priceLabel;
        inputPriceValue.value = data.priceValue;

        currentModel = model;

        // モデル切り替え時はアップロード画像を一旦リセット
        uploadedProductImgData = null;
        inputProductImg.value = '';
        uploadPreviewBar.style.display = 'none';

        // アップロードUIは常に表示
        uploadGroup.style.display = 'block';

        rebuildPages();
    }

    // Input Event Listeners for Typing
    const inputs = [
        inputBadge, inputMainTitle, inputSubTitle, 
        inputPoint1, inputPoint2, inputPoint3, 
        inputPriceLabel, inputPriceValue
    ];

    inputs.forEach(input => {
        input.addEventListener('input', syncTextsToPreview);
    });

    // Model Switcher Click Events
    modelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnElement = e.currentTarget;
            const model = btnElement.getAttribute('data-model');
            
            if (model === currentModel) return;

            modelBtns.forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            applyModelData(model);
        });
    });

    // Grid Size Radio Click Events
    gridRadioBtns.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentGridSize = e.target.value;
            rebuildPages();
        });
    });

    // Toggle Guides
    toggleGuide.addEventListener('change', () => {
        rebuildPages();
    });

    // Toggle Cutlines
    toggleCutline.addEventListener('change', () => {
        rebuildPages();
    });

    // Print Trigger Action
    btnPrint.addEventListener('click', () => {
        // LINEや各種アプリ内ブラウザ（window.printが機能しない環境）への対策
        const isAppBrowser = /line|instagram|fbav|twitter|micromessenger/i.test(navigator.userAgent);
        if (isAppBrowser) {
            alert('お使いのアプリ内ブラウザでは印刷機能（PDF保存）が制限されています。\n画面右上などのメニューから「Safariで開く」または「Chromeで開く」を選択し、標準ブラウザでご利用ください。');
            return;
        }

        const originalMode = currentViewMode;
        if (originalMode === 'complete') {
            updateViewMode('print');
        }

        // スマホ等のレンダリング遅延を考慮し、150ms 待ってから印刷を起動する
        setTimeout(() => {
            window.print();
            
            if (originalMode === 'complete') {
                // 印刷ダイアログが閉じたことを検知して安全に復元する
                if ('onafterprint' in window) {
                    const restoreMode = () => {
                        updateViewMode('complete');
                        window.removeEventListener('afterprint', restoreMode);
                    };
                    window.addEventListener('afterprint', restoreMode);
                } else {
                    // イベント非サポート of ブラウザ向けのフォールバック（少し長めに待つ）
                    setTimeout(() => {
                        updateViewMode('complete');
                    }, 1500);
                }
            }
        }, 150);
    });

    // PDF Direct Download Action
    btnPdfDownload.addEventListener('click', () => {
        // LINEや各種アプリ内ブラウザ（Blob保存などが制限されている環境）での判定
        const isAppBrowser = /line|instagram|fbav|twitter|micromessenger/i.test(navigator.userAgent);
        
        const originalMode = currentViewMode;
        
        // 印刷モードへ切り替え
        updateViewMode('print');
        
        // PDF生成用の一時クラスを付与し、縦一列の印刷用等倍レイアウトに強制する
        printContainer.classList.add('html2pdf-printing');
        
        // スマホ用プレビュースケールやインラインスタイルを一時的に完全にクリア
        printContainer.style.removeProperty('--preview-scale');
        printContainer.style.removeProperty('width');
        printContainer.style.removeProperty('height');

        // 画面に「生成中...」のインジケータ（ローディング画面）を表示
        const loadingAlert = document.createElement('div');
        loadingAlert.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(9,13,22,0.92);color:#fff;padding:25px 40px;border-radius:12px;z-index:9999;font-weight:bold;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);font-family:sans-serif;line-height:1.5;min-width:260px;';
        loadingAlert.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="font-size:32px;margin-bottom:15px;display:block;color:#10b981;"></i><span style="font-size:16px;">PDFポスターを生成中...</span><br><span style="font-size:11px;font-weight:normal;opacity:0.75;margin-top:5px;display:block;">A4用紙に分割配置しています<br>(数秒かかります)</span>';
        document.body.appendChild(loadingAlert);

        // html2pdfの設定
        const opt = {
            margin: 0,
            filename: `galaxy_pop_${currentModel}_${currentGridSize}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, // 高解像度（2倍）
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
            // 自動改ページによる白紙の挟み込みを防ぐため、CSSによる改ページ指示のみに従う設定に変更
            pagebreak: { mode: 'css' }
        };

        // レンダリング時間を考慮し、少し長めに遅延させてPDF化を実行
        setTimeout(() => {
            html2pdf().from(printContainer).set(opt).save().then(() => {
                // クラスを削除して元のプレビュー表示（スケーリング含む）に復元
                printContainer.classList.remove('html2pdf-printing');
                updateViewMode(originalMode); 
                
                document.body.removeChild(loadingAlert);
                
                // アプリ内ブラウザの警告（保存しづらいケースがあるため）
                if (isAppBrowser) {
                    alert('PDFのダウンロード処理を完了しました。\n※アプリ内ブラウザ（LINE等）の場合、ダウンロードフォルダに保存されないことがあります。その場合は右上のメニューから「Safari/Chromeで開く」を選択し、標準ブラウザから再度保存をお試しください。');
                }
            }).catch(err => {
                console.error(err);
                alert('PDFの生成中にエラーが発生しました。');
                printContainer.classList.remove('html2pdf-printing');
                updateViewMode(originalMode);
                document.body.removeChild(loadingAlert);
            });
        }, 500); // 描画リセットを確実にするため500ms待機
    });

    // --- 提案①：URLクエリパラメータの解析と適用（起動時） ---
    function loadSettingsFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        // 1. モデルの適用
        const modelParam = params.get('model');
        if (modelParam === 's26' || modelParam === 'a57') {
            currentModel = modelParam;
            // モデルボタンのactiveクラス更新
            modelBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.model === currentModel);
            });
        }

        // 2. グリッドサイズの適用
        const gridParam = params.get('grid');
        if (gridParam === '3x3' || gridParam === '4x4') {
            currentGridSize = gridParam;
            // ラジオボタンのチェック状態更新
            gridRadioBtns.forEach(radio => {
                radio.checked = (radio.value === currentGridSize);
            });
        }

        // 3. のりしろガイドの適用
        const guideParam = params.get('guide');
        if (guideParam !== null) {
            toggleGuide.checked = (guideParam === '1');
        }

        // 4. 切り取り線の適用
        const cutlineParam = params.get('cutline');
        if (cutlineParam !== null) {
            toggleCutline.checked = (cutlineParam === '1');
        }

        // 5. 表示モードの適用
        const modeParam = params.get('mode');
        if (modeParam === 'complete' || modeParam === 'print') {
            currentViewMode = modeParam;
        }

        // 設定の反映
        applyModelData(currentModel);
    }

    // --- 提案①：設定を共有する（URLコピー）アクション ---
    btnShareLink.addEventListener('click', () => {
        const params = new URLSearchParams();
        params.set('model', currentModel);
        params.set('grid', currentGridSize);
        params.set('guide', toggleGuide.checked ? '1' : '0');
        params.set('cutline', toggleCutline.checked ? '1' : '0');
        params.set('mode', currentViewMode);

        const shareURL = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        // 非セキュア環境などのためのクリップボードコピー処理とフォールバック
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareURL).then(() => {
                const originalHTML = btnShareLink.innerHTML;
                btnShareLink.innerHTML = '<i class="fa-solid fa-check"></i> リンクをコピーしました！';
                btnShareLink.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // 一時的に緑色に変更
                
                setTimeout(() => {
                    btnShareLink.innerHTML = originalHTML;
                    btnShareLink.style.background = ''; // 元に戻す
                }, 2000);
            }).catch(err => {
                window.prompt('コピーボタンからの処理が失敗したため、以下のURLを選択してコピーしてください：', shareURL);
            });
        } else {
            window.prompt('お使いの環境では自動コピーが制限されています。以下のURLを選択してコピーしてください：', shareURL);
        }
    });

    // --- 提案②：手動ズームスライダーのアクション ---
    zoomSlider.addEventListener('input', () => {
        adjustPreviewScale();
    });

    // 初期ズーム値の決定（PC環境のみ）
    if (window.innerWidth > 768) {
        zoomSlider.value = 70; // デフォルトで70%に統一
    }

    // Initialize Tool with URL parameters or defaults
    loadSettingsFromURL();
});
