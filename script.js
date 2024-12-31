document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab content
        const selectedContent = document.getElementById(`${tabId}-content`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        // Add active class to selected tab
        const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Show/hide teacher scroll based on tab
        const teacherScroll = document.querySelector('.teacher-scroll');
        if (teacherScroll) {
            teacherScroll.style.display = (tabId === 'live-class' || tabId === 'notes') ? 'block' : 'none';
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Teacher scroll functionality
    const teacherList = document.querySelector('.teacher-list-wrapper');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    scrollLeftBtn.addEventListener('click', () => {
        teacherList.scrollBy({ left: -100, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        teacherList.scrollBy({ left: 100, behavior: 'smooth' });
    });

    // Show/hide scroll buttons based on scroll position
    function updateScrollButtons() {
        scrollLeftBtn.style.display = teacherList.scrollLeft > 0 ? 'flex' : 'none';
        scrollRightBtn.style.display =
            teacherList.scrollLeft < teacherList.scrollWidth - teacherList.clientWidth ? 'flex' : 'none';
    }

    teacherList.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // Initial call to set button visibility

    // Teacher button selection
    const teacherBtns = document.querySelectorAll('.teacher-btn');
    teacherBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            teacherBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const videoCards = document.querySelectorAll('.video-card, .note-card');

        videoCards.forEach(card => {
            const title = card.querySelector('.video-title, h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // View controls (Example: list/grid view)
    const viewControls = document.querySelectorAll('.view-controls .btn-icon');
    viewControls.forEach(control => {
        control.addEventListener('click', () => {
            const view = control.getAttribute('aria-label');
            console.log('Changing view:', view);
            // Implement actual view change logic here if needed
        });
    });

    // Back button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'https://alphanetwork.fun/next-topper'; // Replace with your desired URL
    });


    // Initial settings
    const currentType = new URLSearchParams(window.location.search).get('type') || 'live-class';
    switchTab(currentType);
});
document.addEventListener("DOMContentLoaded", function () {
    const videoCards = document.querySelectorAll(".video-card");
    videoCards.forEach(card => {
        card.addEventListener("click", function () {
            const posterUrl = encodeURIComponent(card.getAttribute("data-poster-url"));
            const id = encodeURIComponent(card.getAttribute("data-id"));
            const timeDuration = encodeURIComponent(card.getAttribute("data-time-duration"));
            const startDateTime = encodeURIComponent(card.getAttribute("data-start-date-time"));
            const lessonUrl = encodeURIComponent(card.getAttribute("data-lesson-url")); // New addition

            // Redirect to player.php with data as query parameters
            window.location.href = `player.php?posterUrl=${posterUrl}&id=${id}&timeDuration=${timeDuration}&startDateTime=${startDateTime}&lessonUrl=${lessonUrl}`;
        });
    });
});
