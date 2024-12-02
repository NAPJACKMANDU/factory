document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.sub-category li'); // 드래그 가능한 항목
    const dropzones = document.querySelectorAll('.camera'); // 드롭할 카메라 화면
    const layoutButtons = document.querySelectorAll('.layout-btn'); // 화면 분할 버튼
    const resetButton = document.querySelector('.reset-btn'); // 전체 리셋 버튼
    const cameraGrid = document.getElementById('cameraGrid');

    // Drag start
    items.forEach((item) => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('image', item.dataset.img); // 이미지 경로 저장
        });
    });

    // Drag over (allow drop)
    dropzones.forEach((zone) => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over'); // 드래그 시 효과
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        // Drop event
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');

            const imgSrc = e.dataTransfer.getData('image'); // 드래그한 이미지 경로 가져오기
            if (imgSrc) {
                const existingNumber = zone.querySelector('.camera-number'); // 기존 번호 확인
                zone.innerHTML = ''; // 기존 내용 제거
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = 'Camera Feed';
                img.style.width = '100%';
                img.style.height = '100%';
                zone.appendChild(img); // 이미지 추가

                if (existingNumber) {
                    zone.appendChild(existingNumber); // 기존 번호 다시 추가
                }
            }
        });

        // Add right-click event to clear the dropzone
        zone.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // 브라우저 기본 컨텍스트 메뉴 비활성화
            const existingNumber = zone.querySelector('.camera-number');
            zone.innerHTML = ''; // 드롭된 이미지 제거
            if (existingNumber) {
                zone.appendChild(existingNumber); // 번호 유지
            }
        });
    });

    // Reset all dropzones
    resetButton.addEventListener('click', () => {
        dropzones.forEach((zone) => {
            const existingNumber = zone.querySelector('.camera-number');
            zone.innerHTML = ''; // 모든 드롭존 초기화
            if (existingNumber) {
                zone.appendChild(existingNumber); // 번호 유지
            }
        });
    });

    // Layout configurations
    const layouts = {
        16: 'repeat(4, 1fr)',
        4: 'repeat(2, 1fr)',
        1: '1fr',
    };

    // Update layout
    layoutButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const layout = button.dataset.layout;
            const visibleCameras = parseInt(layout);

            cameraGrid.style.gridTemplateColumns = layouts[visibleCameras];

            dropzones.forEach((zone, index) => {
                zone.style.display = index < visibleCameras ? 'block' : 'none';
            });
        });
    });

    // Initialize with 16 cameras
    document.querySelector('[data-layout="16"]').click();
});
